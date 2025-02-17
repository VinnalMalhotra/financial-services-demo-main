import { ComplexImage } from "@yext/types";
// import { photo as importedLogo } from "./data";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { ImageType } from "@yext/pages-components";
import Cta from "../cta";

interface HeroProps {
    backgroundImage?: boolean;
    contentPosition?: "left" | "center" | "right";
    imageLeft?: boolean;
    name: string;
    c_backgroundImage: ImageType;
    cta?: CTA;
    yextDisplayCoordinate?: { latitude: number; longitude: number };
    getGoogleMapsLink?: (coords: { latitude: number; longitude: number }) => string;
}

interface CTA {
    label: string;
    link: string;
    linkType: "URL" | "internal" | "external"; // Modify if needed

}


const Hero = ({
    backgroundImage = false,
    contentPosition = "center",
    imageLeft = false,
    name = "default",
    c_backgroundImage,
    cta,
    yextDisplayCoordinate,
    getGoogleMapsLink,
}: HeroProps) => {
    // const photo = importedLogo;

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
                            {yextDisplayCoordinate && getGoogleMapsLink && (
                                <Cta
                                    cta={{
                                        label: "Get Directions",
                                        link: getGoogleMapsLink(yextDisplayCoordinate),
                                        linkType: "URL",

                                    }}
                                    ctaType="secondaryCta"
                                    aria-label="Secondary call to action"

                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
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
                            {yextDisplayCoordinate && getGoogleMapsLink && (
                                <Cta
                                    cta={{
                                        label: "Get Directions",
                                        link: getGoogleMapsLink(yextDisplayCoordinate),
                                        linkType: "URL",
                                    }}
                                    ctaType="secondaryCta"
                                    aria-label="Secondary call to action"
                                />
                            )}
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