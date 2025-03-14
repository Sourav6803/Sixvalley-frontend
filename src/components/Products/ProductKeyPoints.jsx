import { useState } from "react";

const ProductKeyPoints = ({ keyPoints = [] }) => {
  const [showAll, setShowAll] = useState(false);

  // Ensure keyPoints is a valid array and filter out invalid data
  const filteredKeyPoints = Array.isArray(keyPoints)
    ? keyPoints.filter(point => typeof point?.key === "string" && typeof point?.value === "string")
    : [];

  const visiblePoints = showAll ? filteredKeyPoints : filteredKeyPoints.slice(0, 3);

  return (
    <div className="  bg-white w-full mt-2">
      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
      {visiblePoints.length > 0 ? (
        <ul className="list-disc pl-5">
          {visiblePoints.map((point, index) => (
            <li key={index} className="text-sm text-gray-700 mb-1">
              <span className="font-semibold text-gray-900">{point.key}:</span> {point.value}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No key points available.</p>
      )}
      
      {filteredKeyPoints.length > 3 && (
        <button
          className="mt-2 text-blue-600 hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ProductKeyPoints;
