import React from "react";

const UploadTips = () => {
  const tips = [
    "Use clear and high-quality images (min. resolution: 800x800).",
    "Provide detailed and accurate product descriptions.",
    "Categorize products correctly for better visibility.",
    "Ensure pricing and stock information are accurate.",
  ];

  return (
    <div className="bg-yellow-50 p-3 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-yellow-700">Best Practices for Uploading Products</h2>
      <ul className="mt-4 space-y-1">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="text-yellow-600 font-bold mr-2">•</span>
            <p className="text-gray-700 text-xs md:text-sm">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadTips;
