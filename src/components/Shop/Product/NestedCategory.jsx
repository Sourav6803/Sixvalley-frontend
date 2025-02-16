import React, { useEffect, useState } from "react";
import { MdInfo, MdUpload } from "react-icons/md";
import ProductUploadModal from "./ProductUploadModal";
import ProductForm from "./ProductForm";

const MultilevelDropdown = ({
  categories,
  path,
  primaryImage,
  setPrimaryImage,
  selectedCategory,
  setSelectedCategory,
  productFormOpen,
  setProductFormOpen,
}) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [imgModalOpen, setImgModalOpen] = useState(false);
  

  const handleFileinputChange = (e) => {
    const file = e.target.files[0];
    setPrimaryImage(file);
    setImgModalOpen(true);
  };

  useEffect(() => {
    if (path && path.length > 0) {
      const updatedCategories = [categories];
      let currentLevelCategories = categories;

      path.forEach((levelName) => {
        const matchedCategory = currentLevelCategories.find(
          (category) => category.name === levelName
        );
        if (matchedCategory) {
          updatedCategories.push(matchedCategory.children || []);
          currentLevelCategories = matchedCategory.children || [];

          // 🚀 Stop pushing empty arrays if category is a leaf
          if (matchedCategory.isLeaf) return;
        }
      });

      setSelectedPath(path);
      setCurrentCategories(updatedCategories.filter((arr) => arr.length > 0));
    } else {
      setCurrentCategories([categories]);
    }
  }, [path, categories]);

  // 🟢 useEffect to update selected category when path changes
  useEffect(() => {
    if (path?.length > 0 && categories?.length > 0) {
      let updatedCategories = [categories];
      let currentLevelCategories = categories;
      let selectedCat = null;

      path.forEach((levelName) => {
        const matchedCategory = currentLevelCategories.find(
          (category) => category.name === levelName
        );

        if (matchedCategory) {
          selectedCat = matchedCategory;
          updatedCategories.push(matchedCategory.children || []);
          currentLevelCategories = matchedCategory.children || [];

          if (matchedCategory.isLeaf) return;
        }
      });

      setSelectedPath(path);
      setCurrentCategories(updatedCategories.filter((arr) => arr.length > 0));

      // Store last category if it's a leaf (for image rendering)
      if (selectedCat?.isLeaf) {
        setSelectedCategory(selectedCat);
      }
    } else {
      setCurrentCategories([categories]);
    }
  }, [path, categories, setSelectedCategory]);

  const handleCategorySelect = (category, level) => {
    const updatedPath = selectedPath.slice(0, level);
    updatedPath.push(category.name);
    setSelectedPath(updatedPath);

    const updatedCategories = currentCategories.slice(0, level + 1);

    // 🚀 Only push children if `isLeaf` is `false`
    if (!category.isLeaf && category.children?.length > 0) {
      updatedCategories.push(category.children);
    }

    setCurrentCategories(updatedCategories);
    // Store last category if it's a leaf
    if (category?.isLeaf) {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-2 ">
      {/* Left Section: Categories (60-70% width) */}
      <div className="w-full md:w-[65%] bg-white  rounded-lg p-3 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b">
          Select Category
        </h3>
        <div className="flex gap-3 mt-3 overflow-x-auto">
          {currentCategories.map((categories, level) => (
            <div
              key={level}
              className="flex flex-col w-52 max-h-[450px] overflow-y-auto bg-gray-50 shadow-md rounded-md p-2 border border-gray-300"
            >
              {categories?.map((category) => (
                <div
                  key={category._id}
                  className={`py-2 px-3 border-b rounded-md cursor-pointer text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-all ${
                    selectedPath[level] === category.name
                      ? "bg-blue-200 font-semibold"
                      : ""
                  }`}
                  onClick={() => handleCategorySelect(category, level)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Category Details (Remaining 30-35% width) */}
      {selectedCategory && (
        <div className="w-full md:w-[35%] bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col">
          <div className="rounded-md bg-gray-100 p-3 text-center">
            <p className="text-base font-semibold text-gray-800">
              {selectedPath.join(" > ")}
            </p>
          </div>

          {selectedCategory.image && (
            <div className="flex items-center justify-center mt-4">
              <img
                src={selectedCategory.image?.url}
                alt={selectedCategory.name}
                className="w-40 h-40 object-cover rounded-md shadow-md"
              />
            </div>
          )}

          <p className="mt-3 text-sm text-gray-600 text-center">
            This is a reference image for the selected category.
          </p>

          <div className="flex items-center justify-center mt-4">
            <button
              onClick={() => document.getElementById("file-input").click()}
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-blue-800 transition-all cursor-pointer"
            >
              <MdUpload className="text-lg" /> Add Product Images
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              name="primaryImage"
              id="file-input"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileinputChange}
              className="hidden"
            />
          </div>

          <hr className="mt-4 border-gray-300" />

          {/* Additional Content */}
          <div className="mt-4 p-3 rounded-lg bg-yellow-100 flex items-start gap-3 border-l-4 border-yellow-400 shadow-sm">
            <MdInfo className="text-yellow-500 text-xl" />
            <p className="text-sm text-gray-700 font-medium">
              Follow guidelines to reduce quality check failure.
            </p>
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            {/* General Guidelines */}
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              General Guidelines
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li>
                You can add a minimum of 1 and a maximum of 7 images for a
                product.
              </li>
              <li>
                Upload products only from the same category that you have
                chosen.
              </li>
            </ul>
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            {/* Image Guidelines */}
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Image Guidelines
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li>Primary images should not contain text or watermarks.</li>
              <li>Product images should be clear and well-lit.</li>
              <li>Avoid any additional text in product images.</li>
            </ul>
          </div>
        </div>
      )}

      {imgModalOpen && (
        <ProductUploadModal
          isOpen={imgModalOpen}
          onClose={() => setImgModalOpen(false)}
          image={primaryImage}
          setProductFormOpen={setProductFormOpen}
          setImgModalOpen={setImgModalOpen}
        />
      )}

      {productFormOpen && <ProductForm />}
    </div>
  );
};

export default MultilevelDropdown;
