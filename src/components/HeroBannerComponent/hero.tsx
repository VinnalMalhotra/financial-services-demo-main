import { ComplexImage } from "@yext/types";
import { photo as importedLogo } from "./data";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { ImageType } from "@yext/pages-components";
import { CTA } from "@yext/pages-components";

interface HeroProps {
    backgroundImage?: boolean;
    contentPosition?: "left" | "center" | "right";
    imageLeft?: boolean;
    name: string;
    c_backgroundImage: ImageType
    cta?: CTA;
}

const Hero = ({
    backgroundImage = false,
    contentPosition = "center",
    imageLeft = false,
    name = "default",
    c_backgroundImage,
    cta,
}: HeroProps) => {
    const photo = importedLogo;

    // Map content position to Tailwind classes
    const justifyClass =
        contentPosition === "left" ? "justify-start" :
            contentPosition === "right" ? "justify-end" :
                "justify-center";

    return (
        <div
            className={`flex items-center justify-center p-6 w-full border border-gray-200 ${backgroundImage ? "relative h-96 bg-cover bg-center" : "flex-row"
                } ${imageLeft && !backgroundImage ? "flex-row-reverse" : ""}`}
            style={backgroundImage ? { backgroundImage: `url(${c_backgroundImage.url})` } : {}}
        >
            {backgroundImage ? (
                // Content over background image
                <div
                    className={`absolute inset-0 flex items-center ${justifyClass} p-10 bg-black bg-opacity-40 text-white`}
                >
                    <div className="max-w-lg">
                        <h2 className="text-sm font-semibold">Parkside Bank</h2>
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <p className="text-sm font-semibold text-green-400 mt-2">Open Now</p>
                        <p className="text-sm">Closes at 5:00 PM</p>

                        <div className="flex items-center mt-3">
                            <span className="text-lg font-bold">4.5</span>
                            <div className="flex ml-2 text-green-400">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                            </div>
                            <span className="ml-2 text-sm">(21 reviews)</span>
                        </div>

                        <div className="flex space-x-4 mt-4">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600">
                                Get Directions
                            </button>
                            <button className="border border-green-500 text-green-500 py-2 px-4 rounded-lg font-semibold hover:bg-green-100">
                                Call to Action
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                // Standard layout with separate image
                <>
                    <div className="w-1/2 p-10">
                        <h2 className="text-sm font-semibold text-gray-700">Parkside Bank</h2>
                        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                        <p className="text-sm font-semibold text-green-600 mt-2">Open Now</p>
                        <p className="text-sm text-gray-600">Closes at 5:00 PM</p>

                        <div className="flex items-center mt-3">
                            <span className="text-lg font-bold">4.5</span>
                            <div className="flex ml-2 text-green-600">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                            </div>
                            <span className="ml-2 text-gray-500 text-sm">(21 reviews)</span>
                        </div>

                        <div className="flex space-x-4 mt-4">
                            <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700">
                                Get Directions
                            </button>
                            <button className="border border-green-600 text-green-600 py-2 px-4 rounded-lg font-semibold hover:bg-green-100">
                                Call to Action
                            </button>
                        </div>
                    </div>
                    <div className="w-96 h-64 flex items-center justify-center rounded-lg">
                        <img
                            src={c_backgroundImage.url}
                            alt="Hero Logo"
                            className="rounded-lg w-96 object-cover h-64"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Hero;
