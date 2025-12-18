import React from "react";
import logo from "../assets/images/Cotrav_Logo.png";
import eamil from "../assets/images/Email.png";
import phone from "../assets/images/Phone.png";
import location from "../assets/images/Location_123.png";
import facebook from "../assets/images/Facebook.png";
import instagram from "../assets/images/Instagram.png";
import angel from "../assets/images/angel.png"
import Thread from "../assets/images/Thread.png"


const Footer = () => {
  return (
    <footer className="bg-[#0B0E2D] text-gray-300 pt-8 p-5">
      <div className="max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LEFT */}
        <div>
        <img src={logo} alt="CoTrav Logo" className="mb-4 w-32" />
          <p className="text-sm leading-relaxed">
            Simplifying your Business Travel
            <br />
            Navigating your corporate travel needs,
            <br />
            from Takeoff to Touchdown.
          </p>

          <div className="flex gap-4 mt-4 text-white">
          <img src={facebook} alt="Facebook" className="w-2 h-3" />
            <img src={instagram} alt="Instagram" className="w-3 h-3" />
            <img src={Thread} alt="Thread" className="w-3 h-3" />
          </div>
        </div>

        {/* CENTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-3 text-sm gap-10">
            <li>
              <img src={location} alt="Location" className="inline w-2 h-3" />
               6th floor, Unit no. 603, GLOBAL BUSINESS PARK, Tower B,
              Gurugram, Haryana 122002
            </li>
            <li><img src={phone} alt="Phone" className="inline w-3 h-3" /> 0124-423-4958</li>
            <li><img src={eamil} alt="Email" className="inline w-3 h-2" /> info@taxivaxi.com</li>
            <li><img src={angel} alt="Angel" className="inline w-3 h-3" /> angelotours</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-3 text-sm">
            <li>Cab Rentals</li>
            <li>Hotel Bookings</li>
            <li>Ticket Bookings</li>
            <li>FRRO Consultancy</li>
            <li>Logistics</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>Copyright © 2023 - BAI Infosolutions Private Limited</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy policy</span>
            <span>Terms of use</span>
            <span>Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
