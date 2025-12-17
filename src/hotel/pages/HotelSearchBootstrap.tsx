
// import { useNavigate } from "react-router-dom";
// import {hotelHooks, components} from '@/index'

// const params = new URLSearchParams(window.location.search);
// const rawData = params.get("taxivaxidata");
// const initialFormData = rawData ? JSON.parse(decodeURIComponent(rawData)) : null;

// const HotelSearchBootstrap = () => {
//   const navigate = useNavigate();
//   const { loading, step } = hotelHooks.useHotelInitializer();

//   return loading ? <components.HotelLoader step={step} /> : null;
// };

// export default HotelSearchBootstrap;



import { components, hotelHooks } from '@/index';


const HotelSearchBootstrap = () => {
  const { loading, step } = hotelHooks.useHotelInitializer();
  return loading ? <components.HotelLoader step={step} /> : null;
};

export default HotelSearchBootstrap;