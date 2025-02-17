import { FC } from "react";
import { ImageType } from "@yext/pages-components";

interface BusinessProps {
    photoGallery: { image: { url: string } }[];
    name: string;
    description: string;
    id: string;
    c_primaryCTA: string;
    imageLeft?: boolean;
}

const Business: FC<BusinessProps> = ({ photoGallery, name, description, c_primaryCTA, imageLeft = true }) => {
    return (
        <div className={`flex flex-col md:flex-row items-center p-8 bg-white ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="flex space-x-4 overflow-x-auto">
                    {photoGallery.map((photoGallery, index) => (
                        <div key={index} className="w-96 h-64 flex items-center justify-center rounded-lg">
                            <img 
                                src={photoGallery.image.url} 
                                alt={`${name} - Image ${index + 1}`} 
                                className="rounded-lg w-96 object-cover h-64" 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6">
                <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                <p className="text-gray-700 mt-4">{description}</p>
                <div className="mt-6">
                    {/* {c_primaryCTA && (
                        <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-100">
                            {c_primaryCTA}
                        </button>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Business;
