import { FC } from "react";

// Define prop types for Carousel component
interface CarouselProps {
    primaryPhoto: { image: { url: string } };
    name: string;
    category: string;
    description: string;
    id: string;
    c_primaryCTA: string;
}
// Carousel Component
const Carousel: FC<CarouselProps> = ({ primaryPhoto, name, category, description, id, c_primaryCTA }) => {
    return (
        <div className="p-6 bg-white text-black rounded-2xl shadow-lg flex flex-col items-start">
            <img src={primaryPhoto.image.url} alt={name} className="w-80 h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-600">{id}</p>
            <p className="text-gray-600">{category}</p>
            <p className="text-gray-500 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.{description}</p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                Learn More
            {c_primaryCTA}</button>
        </div>
    );
}

// Define prop types for FeaturedCarousel component
interface FeaturedCarouselProps {
    gridCols?: number;
    _carousel: CarouselProps[]; // 
}

// FeaturedCarousel Component
const FeaturedCarousels: FC<FeaturedCarouselProps> = ({ gridCols = 3, _carousel = [] }) => {
    const gridClass = gridCols === 1 ? "grid-cols-1" : gridCols === 2 ? "grid-cols-2" : "grid-cols-3";

    return (
        <section className="bg-gray-100 py-12 px-6 w-full">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center items-center mb-6">
                    <h2 className="text-2xl font-bold text-black text-center">
                    Products/Services/Etc. Carousel at Business Geomodifier
                    </h2>
                </div>
                <div className={`grid ${gridClass} gap-6 transition-all`}>
                    {_carousel?.map((product, index) => (
                        <Carousel key={index} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Carousel, FeaturedCarousels };
export default FeaturedCarousels;

