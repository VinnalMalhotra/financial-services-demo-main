import { Appstorelogo, Googleplaylogo, photo as uploadedImage } from "./data"; // Update this path

interface PromotionProps {
    backgroundImage?: boolean;
    contentPosition?: "left" | "center" | "right";
    imageLeft?: boolean;
}

const Promotion = ({
    backgroundImage = false,
    contentPosition = "center",
    imageLeft = false,
}: PromotionProps) => {
    const justifyClass = contentPosition === "left" ? "justify-start" :
        contentPosition === "right" ? "justify-end" :
            "justify-center";

    return (
        <div
            className={`flex items-center justify-center p-6 w-full border border-gray-200 ${backgroundImage ? "relative h-96 bg-cover bg-center" : "flex-row"
                } ${imageLeft && !backgroundImage ? "flex-row-reverse" : ""}`}
            style={backgroundImage ? { backgroundImage: `url(${uploadedImage})` } : {}}
        >
            {backgroundImage ? (
                <div
                    className={`absolute inset-0 flex items-center ${justifyClass} p-10 bg-black bg-opacity-40 text-white`}
                >
                    <div className="max-w-lg">
                        <h2 className="text-sm font-semibold">Featured Promotion</h2>
                        <h1 className="text-2xl font-bold">Parkside Bank MobileBanking App</h1>
                        <p className="text-sm font-semibold text-green-400 mt-2">Learn More</p>
                        <p className="text-sm">Bank anytime, anywhere with Parkside Bank! Access all banking services—transfers, bill payments, deposits,  planning with your advisor and more—right from your phone. Secure, fast, and convenient. Download the app today!</p>

                        <div className="flex items-center mt-3">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600">
                                Learn More
                            </button>
                        </div>

                        <div className="flex space-x-4 mt-4">
                            <img src={Appstorelogo} alt="App Store" className="h-10" />
                            <img src={Googleplaylogo} alt="Google Play" className="h-10" />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-96 h-64 flex items-center justify-center rounded-lg">
                        <img
                            src={uploadedImage}
                            alt="Promotion"
                            className="rounded-lg w-96 object-cover h-64"
                        />
                    </div>
                    <div className="w-1/2 p-10">
                        <h2 className="text-sm font-semibold text-gray-700">Featured Promotion</h2>
                        <h1 className="text-2xl font-bold text-gray-900">Parkside Bank MobileBanking App</h1>
                        <p className="text-sm text-gray-600 mt-2">
                        Bank anytime, anywhere with Parkside Bank! Access all banking services—transfers, bill payments, deposits,  planning with your advisor and more—right from your phone. Secure, fast, and convenient. Download the app today!</p>
                        {/* <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 mt-4">
                            Learn More
                        </button> */}

                        <div className="flex space-x-4 mt-4 -ml-4">
                            <img src={Appstorelogo} alt="App Store" className="h-20" />
                            <img src={Googleplaylogo} alt="Google Play" className="h-20" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Promotion;
