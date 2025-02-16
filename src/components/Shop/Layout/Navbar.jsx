

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import logo from "./mainlogo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = (e) => {
    if (e.target.id === "screen") {
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Sell Online", path: "/shop/sell-online" },
    { name: "Pricing & Commission", path: "/shop/shop-commission" },
    { name: "Shipping & Return", path: "/shop/shipping-return" },
    
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-gray-200 fixed h-[70px] w-full bg-white top-0 left-0 z-10 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="w-[10%]">
          <Link to="/shop-welcome" className="flex items-center">
            <img src={logo} className="h-[50px] w-[60px]" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-gray-900 transition duration-300 ease-in-out ${
                isActive(link.path)
                  ? "text-blue-700 font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-700 after:bottom-0 after:left-0"
                  : "hover:text-blue-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Buttons for Desktop */}
        <div className="hidden md:flex space-x-4">
          <button onClick={()=>navigate("/shop-login")} className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary transition duration-300">
            Login
          </button>
          <button onClick={()=>navigate("/shop-create")} className="bg-accent text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
            Start Selling
          </button>
        </div>

        {/* Mobile Menu Button + Start Selling Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button onClick={()=> navigate("/shop-create")} className="bg-accent text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
            Start Selling
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {isMenuOpen ? (
              <BiX className="w-6 h-6 text-gray-700" />
            ) : (
              <BiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="screen"
          onClick={handleClose}
          className="fixed w-full bg-[#0000005f] z-20 h-full top-0 transition duration-800"
        >
          <div className="fixed w-[60%] bg-[#fff] h-screen top-0 right-0 z-10 overflow-y-scroll transition-transform duration-800 transform translate-x-0">
            <div className="w-full justify-between items-center flex my-2">
              <div className="ml-2">
                <Link to="/">
                  <img
                    src={logo}
                    alt=""
                    className="cursor-pointer"
                    height={50}
                    width={50}
                  />
                </Link>
              </div>
              <BiX
                size={35}
                className="border-2 mr-2 rounded-md hover:border-red-500 cursor-pointer focus:ring-2 focus:ring-gray-200"
                onClick={toggleMenu}
              />
            </div>
            <ul className="flex flex-col h-screen space-y-2 p-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`block text-gray-900 py-2 px-3 rounded transition duration-300 hover:bg-gray-200 ${
                      isActive(link.path)
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <div className="mt-2">
                <button className="w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary transition duration-300">
                  Login
                </button>
              </div>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

