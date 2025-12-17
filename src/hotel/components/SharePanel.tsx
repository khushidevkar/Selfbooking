
import { X, Share2 } from 'lucide-react';
import '../../styles/scrollbar.css';


interface SharePanelProps {
  selectedRooms: any[];
  onClose: () => void;
  onShare: () => void;
  onRemoveRoom: (bookingCode: string) => void;
  extractAttraction: (description: string) => string;
}

export const SharePanel: React.FC<SharePanelProps> = ({
  selectedRooms,
  onClose,
  onShare,
  onRemoveRoom,
  extractAttraction
}) => {
  if (selectedRooms.length === 0) return null;

  const groupedHotels = Object.values(
    selectedRooms.reduce((acc: any, room) => {
      const key = room.HotelCode + "_" + room.HotelName + "_" + (room.CityName || "");
      if (!acc[key]) {
        acc[key] = {
          HotelCode: room.HotelCode,
          HotelName: room.HotelName,
          CityName: room.CityName,
          Description: room.Description,
          rooms: []
        };
      }
      acc[key].rooms.push(room);
      return acc;
    }, {})
  );

  return (
    <div className="fixed bottom-0 right-0 m-2 bg-white rounded-lg shadow-xl border border-gray-200 sm:w-80 md:w-85 max-h-[60vh] flex flex-col overflow-hidden z-50 custom-scrollbar">
      

      {/* Header */}
      <div className="flex bg-[#785ef7] px-3 py-2 items-center justify-between">
        <h3 className="text-xs font-semibold text-white">Selected Hotels / Rooms</h3>
        <button
          className="text-white/80 hover:text-white hover:bg-white/10 rounded p-1 transition-all"
          onClick={onClose}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 custom-scrollbar">
        {groupedHotels.map((hotelGroup: any, index: number) => (
          <div key={index} className="bg-gray-50 rounded-md border border-gray-200 p-2">
            {/* Hotel Header */}
            <div className="flex items-start gap-2 mb-2">
              <div className="shrink-0 w-6 h-6 bg-[#785ef7] rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-gray-900 truncate">
                  {hotelGroup.HotelName}
                </h4>
                <p className="text-xs text-gray-600 truncate mt-0.5">
                  {hotelGroup.CityName || "No City Available"}
                  {hotelGroup.Description && (
                    <span className="text-gray-500"> | {extractAttraction(hotelGroup.Description)}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Rooms List */}
            <div className="space-y-1.5 pl-8">
              {hotelGroup.rooms.map((room: any, rIndex: number) => (
                <div
                  key={rIndex}
                  className="flex items-center justify-between gap-2 bg-white rounded border border-gray-100 p-2 hover:border-[#785ef7] transition-colors group"
                >
                  <span className="text-xs font-medium text-gray-800 truncate flex-1">
                    {room.Name}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs font-semibold text-[#785ef7]">
                      ₹{Number(room.TotalFare.toFixed(2) || 0).toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => onRemoveRoom(room.BookingCode)}
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Room count */}
            <div className="mt-1.5 pl-8">
              <span className="text-xs text-[#785ef7] font-medium">
                {hotelGroup.rooms.length} {hotelGroup.rooms.length === 1 ? 'room' : 'rooms'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-3 py-2">
        <button
          type="button"
          className="w-full bg-[#785ef7] hover:bg-[#6b4ee6] text-white font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 text-xs"
          onClick={onShare}
        >
          <Share2 className="w-3.5 h-3.5" />
          Share hotel options
          {selectedRooms.length > 0 && (
            <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full ml-1">
              {selectedRooms.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};