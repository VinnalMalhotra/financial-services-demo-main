import { Image, PhotoGallery } from "@yext/pages-components";
import ResponseComponent from "../ResponseComponent";
import { ComplexImage } from "@yext/types";
import { Time } from "../../types/events";

interface relatedProductProps {
  c_shortDescriptionV2: {
    json: any;
  };
  id: string;
  name: string;
  primaryPhoto: ComplexImage;
  photoGallery: PhotoGallery;
  slug: string;
  description: string;
  time: Time;
}

interface relatedProductsProps {
  relatedItems: relatedProductProps[];
  title: string;
  titleAlignment?: "center" | "left";
}

const ThreeGridLayout = ({
  relatedItems,
  title,
  titleAlignment = "left",
}: relatedProductsProps) => {
  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-skin-base text-2xl md:text-3xl font-medium mx-auto text-center mb-8 ${titleAlignment === "center" ? "text-center" : "text-left"}`}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all">
          {relatedItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white text-black rounded-2xl shadow-lg flex flex-col items-start"
            >
              {item.primaryPhoto ? (
                <Image
                  image={item.primaryPhoto}
                  className="w-20 h-20 rounded-xs object-cover mb-4"
                />
              ) : (
                <Image
                  image={item.photoGallery[0]}
                  className="w-20 h-20 rounded-xs object-cover mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-left">{item.name}</h3>
              {item.time && <p className="text-gray-600 text-left">{buildTimeRange(item.time)}</p>}
              <p className="text-gray-500 mt-2 text-left">
                <ResponseComponent
                  response={item.c_shortDescriptionV2 || item.description}
                />
              </p>
              <button className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeGridLayout;

const buildTimeRange = (time: Time) => {
  const sDate = new Date(time.start);
  const eDate = new Date(time.end);
  const startDate = `${(sDate.getMonth() + 1).toString().padStart(2, "0")}.${sDate.getDate().toString().padStart(2, "0")}.${sDate.getFullYear()}`;
  const endDate = `${(eDate.getMonth() + 1).toString().padStart(2, "0")}.${eDate.getDate().toString().padStart(2, "0")}.${eDate.getFullYear()}`;
  return (
    <>
      {startDate === endDate
        ? `${startDate} | ${buildTime(sDate)} - ${buildTime(eDate)}`
        : `${startDate} ${buildTime(sDate)} - ${endDate} ${buildTime(eDate)}`}
    </>
  );
};

const buildTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};