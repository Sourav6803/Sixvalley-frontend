const CompensationAdsCost = () => {
  return (
    <div className="p-2 bg-gray-50  flex flex-col items-center">
      <div className="w-full  bg-white shadow-lg rounded-2xl p-2">
        {/* Three Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Compensation & Recoveries */}
          <div className="bg-white border rounded-2xl p-2 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-600 text-sm font-medium">
                Compensation & Recoveries
              </h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                View Details
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              The data is from Feb 4 - Mar 5
            </p>
            <p className="mt-4 text-gray-800 font-medium">Compensations</p>
            <p className="text-xl font-semibold mt-1">₹0</p>
          </div>

          {/* Ads Cost */}
          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-600 text-sm font-medium">Ads Cost</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                View Details
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              The data is from Feb 4 - Mar 5
            </p>
            <p className="mt-4 text-gray-800 font-medium">Deducted</p>
            <p className="text-xl font-semibold mt-1 text-red-600">
              -₹7,650.08
            </p>
          </div>

          {/* Other Links - Referral Payments */}
          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium">Other Links</h3>
            <p className="mt-4 text-gray-800 font-medium">Referral Payments</p>
            <p className="text-xs text-gray-500 mt-1">
              You received ₹0 in the last 30 days!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompensationAdsCost;
