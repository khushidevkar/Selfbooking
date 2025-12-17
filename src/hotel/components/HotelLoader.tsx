
import { hotelTypes } from "@/index";

export const HotelLoader = ({ step }: hotelTypes.HotelLoaderProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40">
      <div className="bg-white p-6 rounded shadow">
        <img src="/img/cotravloader.gif" alt="Loading" />
        <p>Processing step {step} of 5</p>
      </div>
    </div>
  );
};
