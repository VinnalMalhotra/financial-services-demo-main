import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { ImageType } from "@yext/pages-components";
import Cta from "../cta";
import { HoursStatus } from "@yext/pages-components";

interface HeroProps {
    backgroundImage?: boolean;
    contentPosition?: "left" | "center" | "right";
    imageLeft?: boolean;
    name: string;
    c_backgroundImage: ImageType;
    cta?: CTA;
    yextDisplayCoordinate?: { latitude: number; longitude: number };
    getGoogleMapsLink?: (coords: { latitude: number; longitude: number }) => string;
    hours: number;
}

interface CTA {
    label: string;
    link: string;
    linkType: "URL" | "internal" | "external";
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
    hours,
}: HeroProps) => {
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
                        <div className="flex items-center mt-3">
                            <HoursStatus hours={hours}></HoursStatus>

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

                        <div className="flex items-center mt-3">
                            <HoursStatus hours={hours}></HoursStatus>

                        </div>

                        <div className="flex space-x-4 mt-4">
                            {yextDisplayCoordinate && getGoogleMapsLink && (
                                <a
                                    href={getGoogleMapsLink(yextDisplayCoordinate)}
                                    className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Get Directions
                                </a>
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
