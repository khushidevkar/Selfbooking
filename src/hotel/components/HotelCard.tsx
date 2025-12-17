
// import { motion } from 'framer-motion';
// import { FaStar, FaRegStar } from 'react-icons/fa';

// interface HotelCardProps {
//   hotel: any;
//   booknow: string;
//   agent_portal: string;
//   onViewPrice: (hotel: any) => void;
//   onBookNow: (hotel: any) => void;
//   onViewImages: (images: string[]) => void;
//   extractAttraction: (description: string) => string;
//   formatCancelPolicies: (policies: any[]) => string[];
// }

// export const HotelCard: React.FC<HotelCardProps> = ({
//   hotel,
//   booknow,
//   agent_portal,
//   onViewPrice,
//   onBookNow,
//   onViewImages,
//   extractAttraction,
//   formatCancelPolicies
// }) => {
//   const rooms = hotel?.Rooms || [];
//   const lowestFareRoom = rooms.reduce(
//     (min: any, room: any) => (room.TotalFare < min.TotalFare ? room : min),
//     rooms[0]
//   );

//   const renderStars = (rating: number) => {
//     const maxStars = 5;
//     const fullStars = Math.floor(rating);
//     const emptyStars = maxStars - fullStars;

//     return (
//       <>
//         {Array.from({ length: fullStars }, (_, index) => (
//           <FaStar key={`full-${index}`} className="text-yellow-500" />
//         ))}
//         {Array.from({ length: emptyStars }, (_, index) => (
//           <FaRegStar key={`empty-${index}`} className="text-gray-300" />
//         ))}
//       </>
//     );
//   };

//   return (
//     <div className="w-full py-2 px-3 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
//       <div className="w-full bg-white shadow-md rounded border border-white-light flex flex-col md:flex-row gap-3">
        
//         {/* Hotel Images */}
//         <div className="py-3 px-3 w-full md:w-1/3">
//           <div className="photos-container">
//             {Array.isArray(hotel.Images) && hotel.Images.length > 0 ? (
//               <>
//                 <img
//                   src={hotel.Images[0]}
//                   alt="Hotel"
//                   className="hotel-photo"
//                 />
//                 <div className="grid grid-cols-4 gap-2 py-1">
//                   {hotel.Images.slice(1, 5).map((image: string, index: number) => (
//                     <div key={index} className="image-container relative">
//                       <img
//                         src={image}
//                         alt={`Hotel ${index + 1}`}
//                         className={`hotel-photos ${index === 3 ? "blur-sm" : ""}`}
//                       />
//                       {index === 3 && (
//                         <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
//                           <span
//                             className="text-white text-xs font-semibold cursor-pointer"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               onViewImages(hotel.Images);
//                             }}
//                           >
//                             View All
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <img alt="" src="./img/image_NA05.png" className="h-full" />
//             )}
//           </div>
//         </div>

//         {/* Hotel Details */}
//         <div className="w-full md:w-1/2 py-3 px-1">
//           <h3 className="text-lg font-semibold">
//             {hotel.HotelName || "No Name Available"}
//           </h3>
//           <p className="text-sm font-semibold hotel-form-text-color">
//             {hotel.CityName || "No City Available"} |{" "}
//             <span className="text-xs text-gray-500">
//               {extractAttraction(hotel.Description)}
//             </span>
//           </p>

//           {/* Facilities */}
//           <div className="flex flex-wrap gap-3 text-xs mb-2">
//             {hotel?.HotelFacilities && (
//               <>
//                 {[
//                   { keyword: "restaurant", label: "Restaurant", icon: "/img/Food.svg" },
//                   { keyword: "elevator", label: "Elevator", icon: "/img/Elevator.svg" },
//                   { keyword: "conference", label: "Conference Space", icon: "/img/Conference_Room.svg" },
//                 ]
//                   .filter(({ keyword }) =>
//                     hotel.HotelFacilities.some((facility: string) =>
//                       facility.toLowerCase().includes(keyword)
//                     )
//                   )
//                   .map(({ icon, label }, index) => (
//                     <span key={index} className="flex items-center gap-2">
//                       <img src={icon} alt={label} className="w-5 h-5" />
//                       {label}
//                     </span>
//                   ))}
//               </>
//             )}
//           </div>

//           {/* Inclusions */}
//           <div className="mb-3">
//             {hotel?.Rooms?.[0]?.Inclusion && (
//               <div className="text-xs mt-1 flex gap-2 flex-wrap">
//                 {hotel.Rooms[0].Inclusion.split(",")
//                   .slice(0, 3)
//                   .map((item: string, index: number) => (
//                     <div key={index} className="flex items-center">
//                       <span className="text-black-500 mr-1">✓</span>
//                       <span>{item.trim()}</span>
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>

//           {/* Cancellation Policy */}
//           <div className="text-xs text-green-700">
//             {formatCancelPolicies(hotel?.Rooms?.[0]?.CancelPolicies || []).length > 0 ? (
//               formatCancelPolicies(hotel?.Rooms?.[0]?.CancelPolicies || []).map(
//                 (policy: string, index: number) => (
//                   <div key={index} className="flex gap-2">
//                     <img src="../img/tick.svg" className="w-3 h-5" alt="✔" />
//                     {policy}
//                   </div>
//                 )
//               )
//             ) : (
//               <p className="text-xs text-red-600 flex gap-2">Non Cancellable</p>
//             )}
//           </div>
//         </div>

//         {/* Price & Actions */}
//         <div className="w-full md:w-1/4 py-3 px-3 flex flex-col items-start md:items-end md:border-l border-gray-300 mt-3 md:mt-0">
//           <div className="flex items-center space-x-1 mb-4">
//             {renderStars(hotel.HotelRating)}
//           </div>

//           <div className="relative text-left md:text-right">
//             <span className="text-lg font-semibold hotel-form-text-color block">
//               ₹ {lowestFareRoom?.TotalFare || "N/A"}
//             </span>
//             <span className="text-xs block">
//               + ₹ {lowestFareRoom?.TotalTax || "0"} taxes & fees
//             </span>
//           </div>

//           <div className="flex mt-5 justify-end md:justify-end gap-2 w-full flex-wrap">
//             {booknow === "0" && (
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onViewPrice(hotel);
//                 }}
//                 className="bg-[#785ef7] w-full md:w-[110px] h-8 text-white px-2 rounded-md font-semibold text-xs transition duration-300 hover:bg-[#5a3ec8]"
//               >
//                 View Price
//               </button>
//             )}

//             {agent_portal === "0" && booknow === "1" && (
//               <button
//                 className="button_book text-xs w-[91px] h-7"
//                 onClick={() => onBookNow(hotel)}
//               >
//                 Book Now
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




import { hotelTypes } from '@/index';
import { motion } from 'framer-motion';
import {
  Star,
  Utensils,
  Building2,
  ArrowUpDown
} from 'lucide-react';

interface Room {
  TotalFare: number;
  TotalTax: number;
  Inclusion?: string;
  // CancelPolicies?: any[];
  CancelPolicies?: hotelTypes.CancellationPolicy[];
}

interface Hotel {
  HotelName: string;
  CityName: string;
  Description: string;
  HotelRating: number;
  Images: string[];
  Rooms: Room[];
  HotelFacilities?: string[];
}

interface HotelCardProps {
  hotel: Hotel;
  booknow: string;
  agent_portal: string;
  onViewPrice: (hotel: Hotel) => void;
  onBookNow: (hotel: Hotel) => void;
  onViewImages: (images: string[]) => void;
  extractAttraction: (description: string) => string;
  formatCancelPolicies: (policies: any[]) => string[];
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  booknow,
  agent_portal,
  onViewPrice,
  onBookNow,
  onViewImages,
  extractAttraction,
  formatCancelPolicies
}) => {
  const rooms = hotel.Rooms ?? [];

  const lowestFareRoom = rooms.reduce(
    (min, room) => (room.TotalFare < min.TotalFare ? room : min),
    rooms[0]
  );

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < rating
            ? 'fill-yellow-400 stroke-yellow-400'
            : 'stroke-gray-300'
        }
      />
    ));

  const hasFacility = (keyword: string) =>
    hotel.HotelFacilities?.some(f =>
      f.toLowerCase().includes(keyword)
    );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="w-full py-2 px-3 cursor-pointer"
    >
      <div className="bg-white rounded shadow border flex flex-col md:flex-row gap-3">

        {/* Images */}
        <div className="w-full md:w-1/3 p-3">
          {hotel.Images?.length ? (
            <>
              <img
                src={hotel.Images[0]}
                alt={hotel.HotelName}
                className="w-full h-44 object-cover rounded"
              />

              <div className="grid grid-cols-4 gap-2 mt-2">
                {hotel.Images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt=""
                      className={`h-16 w-full object-cover rounded ${
                        i === 3 ? 'blur-sm' : ''
                      }`}
                    />
                    {i === 3 && (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold bg-black/40"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewImages(hotel.Images);
                        }}
                      >
                        View All
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <img src="/img/image_NA05.png" alt="NA" />
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 p-3">
          <h3 className="text-lg font-semibold">{hotel.HotelName}</h3>

          <p className="text-sm text-gray-600">
            {hotel.CityName} ·{' '}
            <span className="text-xs text-gray-500">
              {extractAttraction(hotel.Description)}
            </span>
          </p>

          {/* Facilities */}
          <div className="flex flex-wrap gap-4 text-xs my-3">
            {hasFacility('restaurant') && (
              <span className="flex items-center gap-1">
                <Utensils size={14} /> Restaurant
              </span>
            )}
            {hasFacility('conference') && (
              <span className="flex items-center gap-1">
                <Building2 size={14} /> Conference
              </span>
            )}
            {hasFacility('elevator') && (
              <span className="flex items-center gap-1">
                <ArrowUpDown size={14} /> Elevator
              </span>
            )}
          </div>

          {/* Inclusions */}
          {rooms[0]?.Inclusion && (
            <div className="flex flex-wrap gap-2 text-xs">
              {rooms[0].Inclusion.split(',').slice(0, 3).map((item, i) => (
                <span key={i}>✓ {item.trim()}</span>
              ))}
            </div>
          )}

          {/* Cancellation */}
          <div className="text-xs mt-2 text-green-700">
            {formatCancelPolicies(rooms[0]?.CancelPolicies ?? []).length ? (
              formatCancelPolicies(rooms[0].CancelPolicies!).map((p, i) => (
                <div key={i}>✓ {p}</div>
              ))
            ) : (
              <span className="text-red-600">Non Cancellable</span>
            )}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="w-full md:w-1/4 p-3 flex flex-col items-end border-l">
          <div className="flex mb-3">{renderStars(hotel.HotelRating)}</div>

          <div className="text-right">
            <p className="text-lg font-semibold">
              ₹ {lowestFareRoom?.TotalFare ?? 'N/A'}
            </p>
            <p className="text-xs">
              + ₹ {lowestFareRoom?.TotalTax ?? 0} taxes & fees
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            {booknow === '0' && (
              <button
                onClick={() => onViewPrice(hotel)}
                className="bg-purple-600 text-white text-xs px-3 py-1 rounded"
              >
                View Price
              </button>
            )}

            {agent_portal === '0' && booknow === '1' && (
              <button
                onClick={() => onBookNow(hotel)}
                className="bg-green-600 text-white text-xs px-3 py-1 rounded"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
