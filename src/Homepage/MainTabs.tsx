import React from 'react';
import Flight from '../Homepage/services/flight';
import Hotel from '../Homepage/services/hotel';
import Cab from '../Homepage/services/cab';
import Bus from '../Homepage/services/bus';

interface MainContainerProps {
  activeTab: 'flight' | 'hotel' | 'cab' | 'bus';
}

export const MainContainer: React.FC<MainContainerProps> = ({ activeTab }) => {
  switch (activeTab) {
    case 'flight':
      return <Flight />;
    case 'hotel':
      return <Hotel />;
    case 'cab':
      return <Cab />;
    case 'bus':
      return <Bus />;
    default:
      return <Flight />;
  }
};
