import React from "react";

// Import SVG images as URL strings
import FlightIconDefault from "../assets/images/Flight_01.svg";
import FlightIconHover from "../assets/images/Flight_Hover.svg";
import HotelIconDefault from "../assets/images/Hotel_01.svg";
import HotelIconHover from "../assets/images/Hotel_Hover.svg";
import CabIconDefault from "../assets/images/Cab_Black.svg";
import CabIconHover from "../assets/images/Cab_Hover-03.svg";
import BusIconDefault from "../assets/images/Bus_icon.svg";
import BusIconHover from "../assets/images/Bus_Hover.svg";

interface TabsNavigationProps {
  activeTab: "flight" | "hotel" | "cab" | "bus";
  onTabChange: (tab: "flight" | "hotel" | "cab" | "bus") => void;
}

export const TabsNavigation: React.FC<TabsNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: "flight",
      label: "Flight",
      defaultIcon: FlightIconDefault,
      hoverIcon: FlightIconHover,
    },
    {
      id: "hotel",
      label: "Hotel",
      defaultIcon: HotelIconDefault,
      hoverIcon: HotelIconHover,
    },
    {
      id: "cab",
      label: "Cab",
      defaultIcon: CabIconDefault,
      hoverIcon: CabIconHover,
    },
    {
      id: "bus",
      label: "Bus",
      defaultIcon: BusIconDefault,
      hoverIcon: BusIconHover,
    },
  ];

  return (
    <div className="inline-flex bg-white rounded-md shadow-md ml-6 -mt-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as any)}
          className={`
    flex items-center gap-2 px-3 py-2 rounded-lg
    transition-all duration-200
    ${
      activeTab === tab.id
        ? " main_text_color "
        : "text-gray-600 hover:bg-gray-100 "
    }
  `}
        >
          <img
            src={activeTab === tab.id ? tab.hoverIcon : tab.defaultIcon}
            // alt={`${tab.label} icon`}
            className="w-5 h-5"
            // style={{
            //   filter: activeTab === tab.id ? 'grayscale(0%)' : 'grayscale(100%)',
            //   opacity: activeTab === tab.id ? 1 : 0.7
            // }}
          />
          <span className="text-lg font-semibold">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
