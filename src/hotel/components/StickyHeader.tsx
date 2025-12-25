import React from 'react';
import { hotelDetailsTypes } from '@/index';

interface StickyHeaderProps {
  showHeader: boolean;
  activeSection: hotelDetailsTypes.SectionKey;
  hasMultipleRooms: boolean;
  onNavigate: (section: hotelDetailsTypes.SectionKey) => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  showHeader,
  activeSection,
  hasMultipleRooms,
  onNavigate,
}) => {
  if (!showHeader) return null;

  const sections: { id: hotelDetailsTypes.SectionKey; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  ...(hasMultipleRooms ? [{ id: 'rooms', label: 'Rooms' } as { id: hotelDetailsTypes.SectionKey; label: string }] : []),
  { id: 'location', label: 'Location' },
];


  return (
    <div
      className="fixed w-full bg-[#e8e4ff] shadow-md z-50 flex h-10"
      style={{ top: '52px' }}
    >
      <div className="flex gap-5">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`${
              activeSection === section.id
                ? 'font-bold text-[#785ef7]'
                : 'text-white-600'
            } transition-colors duration-200 hover:text-[#785ef7]`}
            style={{ marginLeft: '17%' }}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StickyHeader;