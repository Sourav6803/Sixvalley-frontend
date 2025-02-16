import React from "react";

const CreateAccount = () => {
  return (
    <div className="bg-white py-10 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-4">
            Creating your Flipkart seller account is a quick process, taking less than 10 minutes, and requires only 3 documents. Follow the checklist to ensure a seamless account creation experience. By having these documents ready, you can streamline the account creation process and get started on Flipkart as an online seller in no time.
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            * for selling in all categories except for books <br />
            ** for selling under the books category
          </p>
        </div>

        {/* Steps Section */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-900">
              Don’t have a GSTIN?
            </h3>
            <p className="text-gray-600 mt-2">
              Follow the steps below to generate for your online business.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l-7-7 7-7"></path>
                  <path d="M5 12h14"></path>
                </svg>
              </div>
              <p className="text-gray-600 mt-2 text-center">Register / Login to<br />www.gst.gov.in</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <path d="M8 2v4m8-4v4m-8 4h8"></path>
                </svg>
              </div>
              <p className="text-gray-600 mt-2 text-center">
                Fill in the GST Enrolment<br />Application Form
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19v-7"></path>
                  <path d="M15 16l-3 3-3-3"></path>
                  <path d="M19 12H5"></path>
                </svg>
              </div>
              <p className="text-gray-600 mt-2 text-center">
                Submit Enrolment<br />Application
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8">
          <p className="text-gray-600">
            Flipkart offers a diverse range of over 3000+ categories where you can sell your products. These categories represent just a fraction of the wide variety available on Flipkart, providing ample opportunities for sellers to showcase their products to a large customer base. Here are some popular categories to consider for online selling:
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
