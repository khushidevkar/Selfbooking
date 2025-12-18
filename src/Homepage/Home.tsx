import React, { useState } from "react";
import Navbar from "../Layouts/header";
import { TabsNavigation } from "./tabs";
import { MainContainer } from "./MainTabs";
// import SearchButton from "./searchbutton";
import WhyChooseCotrav from "./WhyChooseCotrav";  
import hero from "../assets/images/Home_Page.png";
import Footer from "../Layouts/footer";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "flight" | "hotel" | "cab" | "bus"
  >("flight");

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img src={hero} alt="Flight" className="w-full h-full object-cover" />
      </div>

      {/* Booking Card */}
      <div className="max-w-6xl mx-auto -mt-32 px-2 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl">
          {/* FIRST CONTAINER: Tabs Only */}
          <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* SECOND CONTAINER: Main Content */}
          <MainContainer activeTab={activeTab} />
          {/* <SearchButton /> */}
        </div>
      </div>
      <WhyChooseCotrav/>
      <Footer />
    </div>
  );
};

export default Home;
