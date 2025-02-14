import { useState } from "react";
import { servicetitlecarousel } from "./data"; // 

// Define prop types for ServiceTitleCarousel component
interface ServiceTitleCarouselProps {
    photo: string;
    name: string;
    category: string;
    description: string;
    alignments?: {
        container?: string;
        photo?: string;
        name?: string;
        category?: string;
        description?: string;
        button?: string;
        text?: string; //
    };
}

function ServiceTitleCarousel({ photo, name, category, description, alignments = {} }: ServiceTitleCarouselProps) {
    return (
        <div className={`p-6 bg-white text-black rounded-2xl shadow-lg flex flex-col ${alignments.container || "items-start"} text-${alignments.text || "text-left"}`}>
            <img src={photo} alt={name} className={`w-20 h-20 rounded-full object-cover mb-4 ${alignments.photo || ""}`} />
            <h3 className={`text-xl font-bold ${alignments.name || "text-left"}`}>{name}</h3>
            <p className={`text-gray-600 ${alignments.category || "text-left"}`}>{category}</p>
            <p className={`text-gray-500 mt-2 ${alignments.description || alignments.text || "text-left"}`}>{description}</p>
            <button className={`mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition ${alignments.button || ""}`}>
                Learn More
            </button>
        </div>
    );
}

// Define prop types for FeaturedServiceTitleCarousel component
interface FeaturedCarouselProps {
    gridCols?: number;
    alignments?: ServiceTitleCarouselProps["alignments"];
}

export default function FeaturedServiceTitleCarousel({ gridCols = 3, alignments = {} }) {
    const gridClass = gridCols === 1 ? "grid-cols-1" : gridCols === 2 ? "grid-cols-2" : "grid-cols-3";

    return (
        <section className="bg-gray-100 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center items-center mb-6">
                    <h2 className="text-2xl font-bold text-black text-center">
                    Products/Services/Etc. Carousel at Business Geomodifier
                    </h2>
                </div>
                <div className={`grid ${gridClass} gap-6 transition-all`}>
                    {servicetitlecarousel.map((servicetitlecarousel, index) => (
                        <ServiceTitleCarousel key={index} {...servicetitlecarousel} alignments={alignments} />
                    ))}
                </div>
            </div>
        </section>
    );
}


export { ServiceTitleCarousel };
