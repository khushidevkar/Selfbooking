
import { components, hotelHooks } from '@/index';


const HotelSearchBootstrap = () => {
  const { loading, step } = hotelHooks.useHotelInitializer();
  return loading ? <components.HotelLoader step={step} /> : null;
};

export default HotelSearchBootstrap;