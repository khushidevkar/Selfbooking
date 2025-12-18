

const Bus: React.FC = () => {


  return (
<div className="bg-white rounded-2xl shadow-lg pt-6 pb-12 px-6">
      
  

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border rounded-xl overflow-hidden">

        {/* COMPANY */}
        <div className="p-4 border-r">
          <p className="text-xs font-semibold text-gray-500">COMPANY Name</p>
          <p className="text-gray-400">Select Company</p>
        </div>

        {/* City */}
        <div className="p-4 border-r relative">
          <p className="text-xs font-semibold text-gray-500">City</p>
          <p className="font-bold">Delhi (DEL)</p>
          <p className="text-sm text-gray-500">
            Indira Gandhi International Airport
          </p>

        
        </div>

        {/* CHECK-IN */}
        <div className="p-4 border-r">
          <p className="text-xs font-semibold text-gray-500">Check-In</p>
          <p className="font-bold">Dubai (DXB)</p>
          <p className="text-sm text-gray-500">
            Dubai International Airport
          </p>
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

export default Bus;
