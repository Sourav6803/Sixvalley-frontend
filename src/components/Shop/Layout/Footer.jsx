import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-300 mx-auto">
      <div className="w-[90%] mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand Section */}
        <div>
          <h2 className="text-pink-600 text-2xl font-bold mb-3">Jamalpur Bazar </h2>
          <p className="text-gray-600 mb-4">
            Sell your products to crores of customers on Jamalpur Bazar  at 0% commission.
          </p>
          <button onClick={()=> navigate("/shop-create")} className="bg-pink-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-pink-700 transition duration-300">
            Start Selling
          </button>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Sell on Jamalpur Bazar </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-pink-600 transition duration-200">
              <a href="#">Sell Online</a>
            </li>
            <li className="hover:text-pink-600 transition duration-200">
              <a href="#">Pricing & Commission</a>
            </li>
            <li className="hover:text-pink-600 transition duration-200">
              <a href="#">How it works</a>
            </li>
            <li className="hover:text-pink-600 transition duration-200">
              <a href="#">Shipping & Returns</a>
            </li>
            <li className="hover:text-pink-600 transition duration-200">
              <a href="#">Grow Your Business</a>
            </li>
            <li className="hover:text-pink-600 transition duration-200">
              <a href="#">Learning Hub</a>
            </li>
            <li className="hover:text-pink-600 transition duration-200">
              <a href="#">Jamalpur Bazar  Ads</a>
            </li>
            <li className="hover:text-pink-600 transition duration-200">
              <a href="#">Shop Online on Jamalpur Bazar </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Contact Us</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <a href="mailto:sell@Jamalpur Bazar .com" className="hover:text-pink-600 transition duration-200">
                sell@Jamalpur Bazar .com
              </a>
            </li>
            <li className="flex space-x-3">
              <a
                href="#"
                className="hover:text-pink-600 transition duration-200"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="#"
                className="hover:text-pink-600 transition duration-200"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a
                href="#"
                className="hover:text-pink-600 transition duration-200"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-2xl"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Jamalpur Bazar . All rights reserved. |{" "}
          <a
            href="#"
            className="hover:text-pink-600 transition duration-200"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="#"
            className="hover:text-pink-600 transition duration-200"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
