import React, { useEffect, useState } from "react";
import TopSection from "./TopSection";
import CategorySelector from "./CategorySelector";
import {
  BsArrowLeft,
  BsArrowRight,
  BsInfoCircle,
  BsYoutube,
} from "react-icons/bs";
import TabSection from "./TabSection";
import ProductForm from "./ProductForm";
import { Info } from "lucide-react";

const UploadProduct = ({ sidebarOpen }) => {
  const [singlelistingOpen, setSingleListingOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // console.log("selected category--->", selectedCategory)

  const [primaryImage, setPrimaryImage] = useState(null);
  const [productFormOpen, setProductFormOpen] = useState(false);

  const steps = [
    { id: 1, label: "Select Category" },
    { id: 2, label: "Add Product Details" },
  ];

  useEffect(() => {
    if (productFormOpen) {
      setActiveStep(2);
    }
  }, [productFormOpen]);

  return (
    <div
      className={`w-full ${
        sidebarOpen ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] overflow-y-auto p-1 md:p-3 `}
    >
      {/* Heading Section (Always Visible) */}
      <div className=" w-full ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-2 py-4 rounded-md">
          {/* Left Section - Add Single Product */}
          <div className="flex items-center gap-2 justify-between px-3">
            <div className="flex items-center gap-2">
              <BsArrowLeft
                onClick={() => setSingleListingOpen(false)}
                className="cursor-pointer text-gray-600 hover:text-black transition"
                size={18}
              />
              <span className="text-lg font-semibold text-gray-700">
                Add Single Product
              </span>
            </div>

            {/* Info Icon with Tooltip */}
            <div className="relative group md:hidden">
              <BsInfoCircle
                className="text-gray-500 cursor-pointer hover:text-blue-500 transition"
                size={16}
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-gray-900 text-white text-xs rounded-md px-3 py-1 opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                Add a single product with all necessary details.
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Divider for Mobile */}
          <hr className="md:hidden w-full border-gray-300" />

          {/* Right Section - Learn to Upload */}
          <div className="flex items-center justify-between px-3 gap-2">
            <div className="flex items-center gap-2">
              <BsYoutube className="text-red-500 text-lg" />
              <span className="text-gray-600 text-sm font-medium">
                Learn to upload a single product?
              </span>
            </div>

            <div className="sm:hidden">
              <BsArrowRight
                className="text-gray-500 hover:text-black transition"
                size={16}
              />
            </div>
          </div>

          {/* Divider for Mobile */}
          <hr className="md:hidden w-full border-gray-300" />
        </div>

        <TabSection
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>

      {/* Conditionally render CategorySelector or TopSection */}
      {!productFormOpen &&
        (singlelistingOpen ? (
          <CategorySelector
            singlelistingOpen={singlelistingOpen}
            setSingleListingOpen={setSingleListingOpen}
            primaryImage={primaryImage}
            setPrimaryImage={setPrimaryImage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            productFormOpen={productFormOpen}
            setProductFormOpen={setProductFormOpen}
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        ) : (
          <TopSection
            singlelistingOpen={singlelistingOpen}
            setSingleListingOpen={setSingleListingOpen}
          />
        ))}

      {/* Show ProductForm if open */}

      {productFormOpen && (
        <div className="w-full flex justify-center">
          <div className="w-full ">
            <ProductForm
              selectedCategory={selectedCategory}
              primaryImage={primaryImage}
            />
          </div>
        </div>
      )}

      {!productFormOpen && !singlelistingOpen && (
        <div className="flex items-start gap-3 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg shadow-md max-w-xl">
          <Info className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <p className="text-sm font-semibold text-blue-900">
              You have to dispatch this product within{" "}
              <span className="font-bold">2 days</span>.
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Improve your <span className="font-semibold">quality score</span>{" "}
              by ensuring timely dispatch. Meeting deadlines consistently will
              enhance your seller rating.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadProduct;
