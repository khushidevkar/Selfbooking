import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/cotrav_logo.svg"


interface NavbarProps {}

interface DropdownItem {
  label: string;
  href?: string;
  subItems?: DropdownItem[];
}

const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Services dropdown items
  const servicesItems: DropdownItem[] = [
    { label: "Hotel Booking", href: "#" },
    { label: "Cabs", href: "#" },
    { label: "Ticketing - Train, Bus & Flight", href: "#" },
    { label: "Logistics", href: "#" },
    { label: "FRRO/FRO Consultancy", href: "#" },
  ];

  // Navigation items
  const navItems = [
    { label: "HOME", href: "/", isLink: true },
    { 
      label: "Services", 
      href: "#", 
      isLink: false,
      dropdownItems: servicesItems 
    },
    { label: "About Us", href: "#", isLink: false },
    { label: "CONTACTS", href: "#", isLink: false },
  ];

  useEffect(() => {
    const isSearchHotelPage = location.pathname === "/SearchHotel";
    
    const handleScroll = () => {
      if (isSearchHotelPage) {
        setIsScrolled(window.scrollY > 0);
      }
    };

    setIsScrolled(isSearchHotelPage ? window.scrollY > 0 : false);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Header */}
      <header className={`w-full transition-all duration-300 ${
        isScrolled ? "opacity-0 invisible h-0" : "opacity-100 visible h-auto"
      }`}>
        <div className="max-w-[1325px] mx-auto px-5">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => sessionStorage.clear()}>
                <img 
                  src={logo} 
                  alt="CoTrav Logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.isLink ? (
                    <Link
                      to={item.href || "#"}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                      onClick={item.label === "HOME" ? () => sessionStorage.clear() : undefined}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center gap-1">
                        {item.label}
                        {item.dropdownItems && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      {/* Dropdown Menu */}
                      {item.dropdownItems && (
                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="py-2">
                            {item.dropdownItems.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <img 
                src="img/taxivaxi/logo/cotrav_logo.svg" 
                alt="CoTrav Logo"
                className="h-8 w-auto"
              />
              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.isLink ? (
                    <Link
                      to={item.href || "#"}
                      className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                      onClick={() => {
                        if (item.label === "HOME") sessionStorage.clear();
                        toggleMobileMenu();
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <div className="py-2 text-gray-700 font-medium">
                        {item.label}
                      </div>
                      {item.dropdownItems && (
                        <div className="ml-4 space-y-2 border-l border-gray-200 pl-4">
                          {item.dropdownItems.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block py-1 text-gray-600 hover:text-blue-600 text-sm"
                              onClick={toggleMobileMenu}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;