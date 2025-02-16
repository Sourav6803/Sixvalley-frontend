import React from "react";

const UploadCatalogSection = () => {
  const steps = [
    {
      step: 1,
      title: "Prepare Your Data",
      description: "Organize product details and images in our template format.",
      color: "blue",
    },
    {
      step: 2,
      title: "Upload the Catalog",
      description: "Use our bulk upload tool for hassle-free listing.",
      color: "green",
    },
    {
      step: 3,
      title: "Start Selling",
      description: "Once approved, your products will be live for customers.",
      color: "purple",
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">How to Upload Your Catalog</h2>
        <p className="text-center text-gray-600 mt-4">
          Follow these easy steps to list your products and start selling.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center">
              <div className={`bg-${step.color}-100 p-4 rounded-full inline-block`}>
                <span className={`text-3xl text-${step.color}-600 font-bold`}>{step.step}</span>
              </div>
              <h3 className="text-lg font-semibold mt-4">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500">
            View Upload Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCatalogSection;
