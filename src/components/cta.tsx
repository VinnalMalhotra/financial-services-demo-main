import { Link, CTA, AnalyticsScopeProvider } from "@yext/pages-components";
import { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import ModalComponent from "./ModalComponent";

interface CTAProps {
  cta?: CTA;
  ctaType: "primaryCta" | "secondaryCta";
  otherStyles?: string;
  eventName?: string;
  hours?: any;
  name?: string;
  isBookAnAppointment?: boolean;
}

// const buildCTAStyles = (ctaType: CTAProps["ctaType"]) => {
//   return ctaType === "primaryCta"
//     ? `bg-skin-base text-skin-banner border-skin-base font-medium hover:bg-skin-base/80 hover::border-skin-base/80`
//     : `bg-skin-banner text-skin-base/80 font-medium border-skin-base/50 hover:border-skin-base hover:text-skin-base`;
// };

const buildCTAStyles = (ctaType: CTAProps["ctaType"]) => {
  return ctaType === "primaryCta"
    ? `bg-green-600 text-white border-green-600 font-medium hover:bg-green-700 hover:border-green-700`
    : `bg-gray-200 text-gray-700 font-medium border-gray-400 hover:border-gray-600 hover:text-gray-900`;
};


const Cta = ({
  cta,
  ctaType,
  otherStyles = "rounded-md",
  eventName,
  hours,
  name,
  isBookAnAppointment = false,
}: CTAProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  return (
    <AnalyticsScopeProvider name="ctas">
      <Link
        onClick={isBookAnAppointment ? handleOpenModal : undefined}
        className={`w-full uppercase text-sm  border-2 p-2 flex justify-center md:max-w-[200px] ${buildCTAStyles(ctaType)} ${otherStyles}`}
        cta={{
          link: cta?.link || "#",
          label: cta?.label || "",
          linkType: cta?.linkType,
        }}
      />
      {open && (
        <ModalComponent modalWidth="1/3" open={open} onClose={handleCloseModal}>
          <CalendarComponent hours={hours} name={name!} />
        </ModalComponent>
      )}
    </AnalyticsScopeProvider>
  );
};

export default Cta;
