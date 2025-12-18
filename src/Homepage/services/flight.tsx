import { useState } from "react";

const Flight: React.FC = () => {
  const [bookingType, setBookingType] =
    useState<"one-way" | "return">("one-way");

  return (
    <div className="bg-white rounded-2xl shadow-lg pt-6 pb-12 px-6">
      {/* ONE WAY / RETURN */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setBookingType("one-way")}
          className={`px-6 py-2 rounded-lg font-semibold ${
            bookingType === "one-way"
              ? "bg-[#7B61FF] text-white"
              : "bg-gray-100"
          }`}
        >
          One-Way
        </button>

        <button
          onClick={() => setBookingType("return")}
          className={`px-6 py-2 rounded-lg font-semibold ${
            bookingType === "return"
              ? "bg-[#7B61FF] text-white"
              : "bg-gray-100"
          }`}
        >
          Return
        </button>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 border rounded-xl overflow-hidden bg-white">
        <div className="p-4 border-r">
          <p className="text-xs font-semibold text-gray-500">COMPANY</p>
          <p className="text-gray-400">Select Company</p>
        </div>

        <div className="p-4 border-r relative">
          <p className="text-xs font-semibold text-gray-500">FROM</p>
          <p className="font-bold">Delhi (DEL)</p>
          <p className="text-sm text-gray-500">
            Indira Gandhi International Airport
          </p>
        </div>

        <div className="p-4 border-r">
          <p className="text-xs font-semibold text-gray-500">TO</p>
          <p className="font-bold">Dubai (DXB)</p>
          <p className="text-sm text-gray-500">
            Dubai International Airport
          </p>
        </div>

        <div className="p-4 border-r">
          <p className="text-xs font-semibold text-gray-500">DEPARTURE</p>
          <p className="font-bold">16/12/2025</p>
        </div>

        <div className="p-4 border-r">
          <p className="text-xs font-semibold text-gray-500">RETURN</p>
          <p className="text-gray-400">Return Date</p>
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold text-gray-500">
            TRAVELLERS & CLASS
          </p>
          <p className="font-bold">Adult: 1, Child: 0, Infant: 0</p>
          <p className="text-sm text-gray-500">Cabin Class: Economy</p>
        </div>
      </div>

      {/* BUTTON ROW (NORMAL FLOW) */}
        <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 ">
        <button className="bg-[#7B61FF] hover:bg-[#6a52e0] text-white px-14 py-4 rounded-full font-semibold shadow-xl tracking-wide">
          SEARCH
        </button>
      </div>
    </div>
  );
};
export default Flight;