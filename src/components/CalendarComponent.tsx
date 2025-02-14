import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Hours } from "@yext/types";

type DayName =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface CalendarComponentProps {
  hours: Hours;
  name: string;
}

const CalendarComponent = ({ hours, name }: CalendarComponentProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [showTimes, setShowTimes] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const handleMonthChange = (next: boolean) => {
    setCurrentDate((prev) => {
      const newMonth = prev.getMonth() + (next ? 1 : -1);
      return new Date(prev.getFullYear(), newMonth, 1);
    });
    setSelectedDate(null);
    setShowTimes(false);
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    setShowTimes(true);
    setFormVisible(false);
  };

  const combineDateTime = (
    selectedDate: Date | null,
    selectedTime: string | null
  ): string | null => {
    if (!selectedDate || !selectedTime) return null;

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const dateTime = new Date(selectedDate);
    dateTime.setHours(hours, minutes, 0, 0);

    return dateTime.toISOString().slice(0, 16);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const body = JSON.stringify({
    //   body: `This is a test message`,
    //   to_number: "8062828554",
    //   user_id: 700781,
    // });

    const body = JSON.stringify({
      body: `Hi ${formData.firstname}, you have an appointment scheduled with ${name} on ${selectedDate!.toLocaleDateString()} at ${selectedTime}`,
      to_number: formData.phone,
      user_id: 764009,
    });

    try {
      const response = await fetch(`/api/postSchedule?body=${body}`);
      const resp = await response.json();
      alert("Form submitted successfully!");
      setFormVisible(false);
      setFormData({ firstname: "", lastname: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the form.");
    }
  };

  const renderDays = () => {
    const totalDays = daysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const days = Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isClosed = hours[getDayName(date)]?.isClosed || date < today;

      return (
        <button
          key={day}
          aria-disabled={isClosed}
          className={`p-2 text-sm border text-center ${
            isClosed ? "bg-gray-200 cursor-not-allowed" : "cursor-pointer"
          } ${
            selectedDate?.getDate() === day
              ? "bg-skin-base text-skin-banner"
              : ""
          }`}
          onClick={() => !isClosed && handleDateClick(day)}
        >
          {day}
        </button>
      );
    });
    return days;
  };

  const handleCollapseTimes = () => {
    setShowTimes(false);
    setSelectedDate(null);
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
    setFormVisible(true);
  };

  const renderTimes = () => {
    if (!selectedDate) return null;

    const openIntervals = hours[getDayName(selectedDate)]?.openIntervals || [];
    if (openIntervals.length === 0)
      return <p className="text-gray-500">Closed</p>;

    const timeSlots = openIntervals.flatMap((interval) => {
      const startTime = parseInt(interval.start.split(":")[0]);
      const endTime = parseInt(interval.end.split(":")[0]);

      return Array.from({ length: endTime - startTime }, (_, i) => {
        const time = new Date();
        time.setHours(startTime + i, 0, 0, 0);
        const formattedTime = time.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        const endTimeFormatted = new Date(time);
        endTimeFormatted.setHours(time.getHours() + 1);
        const formattedEndTime = endTimeFormatted.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        return (
          <button
            name="Time Ranges"
            key={formattedTime}
            className={`p-1.5 text-center cursor-pointer text-sm border rounded ${
              selectedTime === formattedTime
                ? "bg-skin-base text-skin-banner"
                : ""
            }`}
            onClick={() => handleTimeSlotClick(formattedTime)}
          >
            {formattedTime}-{formattedEndTime}
          </button>
        );
      });
    });

    return (
      <section
        aria-label="Available Times"
        className="flex flex-col gap-2 mt-4"
      >
        <button name="Time slots" onClick={handleCollapseTimes}>
          Available Times
        </button>
        <article className="grid grid-cols-3 gap-2 mt-4">{timeSlots}</article>
      </section>
    );
  };

  const getDayName = (date: Date): DayName => {
    const days: DayName[] = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[date.getDay()];
  };

  return (
    <section
      className="bg-skin-banner p-5 max-w-[30rem] w-full shadow-md mx-auto my-0"
      aria-labelledby="calendar-heading"
    >
      <header className="flex justify-between items-center mb-5">
        <button
          name="Previous Month"
          onClick={() => handleMonthChange(false)}
          aria-label="Go to Previous Month"
          className="p-2"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h2 id="calendar-heading" className="text-lg font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          name="Next Month"
          onClick={() => handleMonthChange(true)}
          aria-label="Go to Next Month"
          className="p-2"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>
      </header>

      <section
        aria-label="Days of the Week"
        className="grid grid-cols-7 text-center mb-2 font-semibold"
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <span key={day} role="columnheader">
            {day}
          </span>
        ))}
      </section>

      <section aria-label="Calendar Dates" className="grid grid-cols-7 gap-1">
        {renderDays()}
      </section>

      {showTimes && renderTimes()}

      {formVisible && (
        <form
          id="ctaForm"
          onSubmit={handleSubmit}
          className="mt-4"
          aria-labelledby="form-heading"
        >
          <h3 id="form-heading" className="sr-only">
            Appointment Form
          </h3>

          <label htmlFor="firstname" className="sr-only">
            First Name
          </label>
          <input
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            placeholder="First Name"
            required
            className="p-2 border rounded w-full mb-2"
          />

          <label htmlFor="lastname" className="sr-only">
            Last Name
          </label>
          <input
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
            className="p-2 border rounded w-full mb-2"
          />

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            type="email"
            required
            className="p-2 border rounded w-full mb-2"
          />

          <label htmlFor="phone" className="sr-only">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            type="tel"
            required
            className="p-2 border rounded w-full mb-2"
          />

          <label
            htmlFor="consentCheckbox"
            className="flex gap-2 items-base text-sm my-4"
          >
            <input
              type="checkbox"
              id="consentCheckbox"
              name="agree"
              value="yes"
              required
              className="mt-1 w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-primary focus:ring-primary"
            />
            I consent to receive text messages from Capital Fins Bank at the
            number provided. Message and data rates may apply. Reply STOP to
            unsubscribe. See our Privacy Policy for details.
          </label>

          <button
            name="Submit form"
            id="submitButton"
            type="submit"
            className="bg-skin-base text-skin-banner rounded p-2 w-full "
          >
            Submit
          </button>
        </form>
      )}
    </section>
  );
};

export default CalendarComponent;
