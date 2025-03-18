import { useState } from "react";

const ReturnPolicyForm = ({ returnPolicy, setReturnPolicy }) => {
  const [newReason, setNewReason] = useState("");

  const handleChange = (field, value) => {
    setReturnPolicy((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddReason = () => {
    if (newReason.trim() && !returnPolicy.returnReason.includes(newReason)) {
      setReturnPolicy((prev) => ({
        ...prev,
        returnReason: [...prev.returnReason, newReason.trim()],
      }));
      setNewReason("");
    }
  };

  const handleRemoveReason = (reason) => {
    setReturnPolicy((prev) => ({
      ...prev,
      returnReason: prev.returnReason.filter((r) => r !== reason),
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Return & Replacement Policy</h2>

      {/* Is Returnable */}
      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={returnPolicy.isReturnable}
          onChange={(e) => handleChange("isReturnable", e.target.checked)}
          className="w-5 h-5"
        />
        <span className="text-gray-700">This product is returnable</span>
      </label>

      {/* Return Window Days */}
      {returnPolicy.isReturnable && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Return Window (Days)
          </label>
          <input
            type="number"
            value={returnPolicy.returnWindowDays || ""}
            onChange={(e) => handleChange("returnWindowDays", Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            min="1"
            placeholder="Enter days (e.g., 7)"
          />
        </div>
      )}

      {/* Return Reasons */}
      {returnPolicy.isReturnable && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Allowed Return Reasons
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Add a reason (e.g., Defective)"
            />
            <button
              type="button"
              onClick={handleAddReason}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <ul>
            {returnPolicy.returnReason.map((reason, index) => (
              <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-1">
                <span className="text-gray-700">{reason}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveReason(reason)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Is Replaceable */}
      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={returnPolicy.isReplaceable}
          onChange={(e) => handleChange("isReplaceable", e.target.checked)}
          className="w-5 h-5"
        />
        <span className="text-gray-700">This product is replaceable</span>
      </label>

      {/* Replacement Window Days */}
      {returnPolicy.isReplaceable && (
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Replacement Window (Days)
          </label>
          <input
            type="number"
            value={returnPolicy.replacementWindowDays || ""}
            onChange={(e) => handleChange("replacementWindowDays", Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            min="1"
            placeholder="Enter days (e.g., 7)"
          />
        </div>
      )}
    </div>
  );
};

export default ReturnPolicyForm;
