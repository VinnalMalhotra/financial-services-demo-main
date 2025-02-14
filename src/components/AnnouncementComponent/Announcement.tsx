import { useState } from "react";

interface AnnouncementBannerProps {
  message?: boolean;
  text?: string;
  position?: "left" | "right" | "center";
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  message = true,
  text = "This location is currently closed due to Inclement Weather",
  position = "center",
}) => {
  const [isVisible, setIsVisible] = useState(message);

  if (!isVisible) return null;

  const getPositionClass = () => {
    switch (position) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      case "center":
      default:
        return "justify-center";
    }
  };

  return (
    <div className="bg-green-700 text-white p-3 text-center relative flex items-center">
      <div className={`flex w-full ${getPositionClass()}`}>
        <span className="text-sm font-medium">{text}</span>
      </div>
      <button
        className="absolute right-4 text-white hover:text-gray-300"
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
      >
        ✖
      </button>
    </div>
  );
};

export default AnnouncementBanner;
