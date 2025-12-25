
import React from 'react';
import { icons } from '@/index';

interface HotelAmenitiesProps {
  facilities: string[];
  onShowMore: () => void;
}

type AmenityIcon = React.ComponentType<{ className?: string }> | string;

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({
  facilities,
  onShowMore,
}) => {
  if (!facilities || facilities.length === 0) return null;

  const predefinedAmenities: {
    keyword: string;
    label: string;
    icon: AmenityIcon;
  }[] = [
    {
      keyword: 'restaurant',
      label: 'Restaurant',
      icon: icons.Utensils,
    },
    {
      keyword: 'parking',
      label: 'Parking Available',
      icon: icons.Car,
    },
    {
      keyword: 'wifi',
      label: 'Free WiFi',
      icon: icons.Wifi,
    },
    {
      keyword: 'conference',
      label: 'Conference Space',
      icon: icons.Presentation,
    },
  ];

  // If less than 5 facilities, show all with checkmarks
  if (facilities.length < 5) {
    return (
      <div className="flex flex-wrap gap-3 text-xs mb-3 px-2">
        {facilities.map((facility, index) => (
          <span key={index} className="flex items-center gap-2">
            <span className="text-black">✓</span>
            {facility}
          </span>
        ))}
      </div>
    );
  }

  // Find matching predefined amenities
  const matchedFacilities = predefinedAmenities.filter(({ keyword }) =>
    facilities.some((facility) =>
      facility.toLowerCase().includes(keyword)
    )
  );

  // If we have matches, show icons + "more" button
  if (matchedFacilities.length > 0) {
    return (
      <div className="flex flex-wrap gap-3 text-xs mb-3 px-2">
        {/* {matchedFacilities.map(({ icon, label }, index) => {
          const IconComponent =
            typeof icon === 'string' ? null : icon;

          return (
            <span key={index} className="flex items-center gap-2">
              {IconComponent ? (
                <IconComponent className="w-5 h-5 text-gray-700" />
              ) : (
                <img
                  src={icon as string}
                  alt={label}
                  className="w-5 h-5"
                />
              )}
              {label}
            </span>
          );
        })} */}

        {matchedFacilities.map(({ icon, label }, index) => {
  const Icon = typeof icon === 'string' ? null : icon;

  return (
    <span key={index} className="flex items-center gap-2">
      {Icon ? (
        <Icon className="w-5 h-5 text-gray-700" />
      ) : (
        <img
          src={icon as string}
          alt={label}
          className="w-5 h-5"
        />
      )}
      {label}
    </span>
  );
})}


        {facilities.length > matchedFacilities.length && (
          <span
            className="information_button text-sm cursor-pointer"
            onClick={onShowMore}
          >
            +{facilities.length - matchedFacilities.length} more
          </span>
        )}
      </div>
    );
  }

  // No matches, show first 4 with checkmarks
  const displayedFacilities = facilities.slice(0, 4);
  const remainingCount = facilities.length - displayedFacilities.length;

  return (
    <div className="flex flex-wrap gap-3 text-xs mb-3 px-2">
      {displayedFacilities.map((facility, index) => (
        <span key={index} className="flex items-center gap-2">
          <span className="text-black">✓</span>
          {facility}
        </span>
      ))}

      {remainingCount > 0 && (
        <span
          className="information_button text-sm cursor-pointer"
          onClick={onShowMore}
        >
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};

export default HotelAmenities;
