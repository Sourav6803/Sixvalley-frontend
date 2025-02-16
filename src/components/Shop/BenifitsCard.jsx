import React from "react";
import { FaPercent, FaHandHoldingUsd, FaChartLine, FaHandshake } from "react-icons/fa";

const BenefitsCard = () => {
  const benefits = [
    {
      id: 1,
      title: "0% Commission Fee",
      description: "Suppliers keep 100% of their profit without paying commission fees.",
      icon: <FaPercent className="text-pink-500 w-8 h-8" />,
    },
    {
      id: 2,
      title: "No Penalty for Cancellations",
      description: "Enjoy freedom from penalties on order cancellations or late dispatches.",
      icon: <FaHandHoldingUsd className="text-blue-500 w-8 h-8" />,
    },
    {
      id: 3,
      title: "Growth Opportunities",
      description: "Scale from small to large, branded or unbranded businesses seamlessly.",
      icon: <FaChartLine className="text-green-500 w-8 h-8" />,
    },
    {
      id: 4,
      title: "Ease of Business",
      description: "Quick product listing, low shipping costs, and 7-day payment cycles.",
      icon: <FaHandshake className="text-purple-500 w-8 h-8" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-12">
        {/* Left Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-600 mb-4">
            Why Suppliers Choose Jamalpur Bazar
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We empower suppliers to grow their businesses efficiently with no
            hidden costs, flexible processes, and growth-focused tools.
          </p>
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium transition duration-300">
            Get Started
          </button>
        </div>

        {/* Right Section: Cards */}
        <div className="md:w-1/2 grid grid-cols-1 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-start p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <div className="mr-4">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsCard;
