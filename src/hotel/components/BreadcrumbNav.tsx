
import React from 'react';

interface BreadcrumbProps {
  cityName: string;
  hotelName: string;
  showHome?: boolean;
  onNavigateHome?: () => void;
  onNavigateSearch?: () => void;
}

const BreadcrumbNav: React.FC<BreadcrumbProps> = ({
  cityName,
  hotelName,
  showHome = true,
  onNavigateHome,
  onNavigateSearch,
}) => {
  return (
    <div className="text-sm text-gray-600 flex gap-2 py-4 px-5">
      {showHome && onNavigateHome && (
        <>
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={onNavigateHome}
          >
            Home
          </span>
          <span>&gt;</span>
        </>
      )}
      {onNavigateSearch && (
        <>
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={onNavigateSearch}
          >
            Hotels In {cityName}
          </span>
          <span>&gt;</span>
        </>
      )}
      <span className="text-gray-900 font-semibold">{hotelName}</span>
    </div>
  );
};

export default BreadcrumbNav;