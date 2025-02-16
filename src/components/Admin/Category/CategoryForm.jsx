import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import {
  addLeafCategory,
  addSubcategory,
  createMainCategory,
} from "../../../api/categoryApi";

const CategoryForm = ({ parentCategory }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [isLeaf, setIsLeaf] = useState(false);
  const [attributes, setAttributes] = useState([
    { name: "", type: "text", unit: "", values: [], options: [] },
  ]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (parentCategory) {
      setIsLeaf(parentCategory?.level === 3 ? true : false);
    }
  }, [parentCategory]);

  const attributesRef = useRef(attributes);

  // Update the ref whenever attributes change
  useEffect(() => {
    attributesRef.current = attributes;
  }, [attributes]);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  useEffect(() => {
    if (name?.length > 1 && image) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, image]);

  const addNewAttribute = () => {
    setAttributes([
      ...attributes,
      { name: "", type: "text", unit: "", values: [], options: [] },
    ]);
  };

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;

    if (key === "type" && value === "select") {
      updatedAttributes[index].options = [];
    }
    if (key === "type" && value !== "select") {
      updatedAttributes[index].options = undefined;
    }
    setAttributes(updatedAttributes);
  };

  const validateForm = () => {
    // Basic fields validation
    if (!name.trim() || !image) return false;
  
    // If it's not a leaf category, no need to validate attributes
    if (!isLeaf) return true;
  
    // If it's a leaf category, validate attributes
    const isValid = attributes.every((attr) => {
      if (attr.name.trim().length === 0) return false;
      if (attr.type === "select" && (!attr.options || attr.options.length === 0)) return false;
      return true;
    });
  
    return isValid;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [name, image, attributes, isLeaf]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!name || !image || !keywords) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      if (keywords) {
        keywords
          .split(",")
          .map((keyword) => formData.append("keywords[]", keyword?.trim()));
      }

      if (parentCategory) {
        formData.append("parentId", parentCategory?._id);
      }

      // Use the ref to ensure the latest attributes are used
      if (isLeaf && attributesRef.current.length > 0) {
        formData.append("attributes", JSON.stringify(attributesRef.current));
      }

      setIsDisabled(true);

      try {
        let response;
        if (parentCategory) {
          if (isLeaf && attributesRef.current.length > 0) {
            response = await addLeafCategory(formData);
          } else {
            response = await addSubcategory(formData);
          }
        } else {
          response = await createMainCategory(formData);
        }
        toast.success("Category added successfully!");
        setName("");
        setImage(null);
        setKeywords("");
        setAttributes([]);
        setIsLeaf(false);
      } catch (error) {
        console.error("Error adding category:", error?.message);
        toast.error(error.response || "Failed to add category");
      } finally {
        setIsDisabled(false);
      }
    },
    [name, image, keywords, parentCategory, isLeaf]
  );

  const removeAttribute = (index) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 md:p-8 mt-8">
      <h3 className="text-2xl font-bold text-slate-700 mb-6 text-center md:text-left">
        {parentCategory
          ? `Add Subcategory to ${parentCategory.name}`
          : "Create Main Category"}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
              placeholder="Enter category name"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Image Upload
            </label>
            <input
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              id="file_input"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileInputChange}
            />
          </div>

          {/* Keywords */}
          <div className="flex flex-col">
            <label
              htmlFor="keywords"
              className="text-sm font-medium text-gray-700 mb-2"
            >
              Keywords (comma-separated)
            </label>
            <input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
              placeholder="Enter keywords"
            />
          </div>

          {/* Last Category Checkbox */}
          {parentCategory &&
            parentCategory.level !== 3 &&
            parentCategory.level !== 1 && (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isLeaf}
                  onChange={(e) => setIsLeaf(e.target.checked)}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">
                  This is the last category (no child categories allowed)
                </label>
              </div>
            )}

          {/* Attributes Section */}
          {isLeaf && (
            <div>
              {attributes.map((attr, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-4 items-center text-gray-800 mb-4"
                >
                  <input
                    type="text"
                    value={attr.name}
                    onChange={(e) =>
                      handleAttributeChange(index, "name", e.target.value)
                    }
                    placeholder="Attribute Name"
                    className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
                  />
                  <select
                    value={attr.type}
                    onChange={(e) =>
                      handleAttributeChange(index, "type", e.target.value)
                    }
                    className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="select">Dropdown</option>
                  </select>
                  {attr.type === "select" && (
                    <input
                      type="text"
                      placeholder="Options (comma-separated)"
                      value={attr.options?.join(", ")}
                      onChange={(e) =>
                        handleAttributeChange(
                          index,
                          "options",
                          e.target.value.split(",").map((opt) => opt.trim())
                        )
                      }
                      className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Unit (optional)"
                    value={attr.unit}
                    onChange={(e) =>
                      handleAttributeChange(index, "unit", e.target.value)
                    }
                    className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttribute(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addNewAttribute}
                className="text-blue-600 hover:underline"
              >
                + Add Attribute
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-5 py-3 rounded-lg ${
                isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {parentCategory === null
                ? "Add Category"
                : isLeaf
                ? "Add Child"
                : "Add Sub-Category"}
            </button>
          </div>
        </form>

        {/* Image Preview Section */}
        <div className="flex justify-center">
          <div className="border p-3 rounded-lg overflow-hidden shadow-md">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;

// <div className="w-full  bg-white shadow-lg rounded-lg p-3 mt-8">
//   <h3 className="text-xl font-semibold text-slate-700 mb-6 text-center md:text-left">
//     {parentCategory
//       ? `Add Subcategory to ${parentCategory.name}`
//       : "Create Main Category"}
//   </h3>
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     {/* Form Section */}
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="flex flex-col">
//         <label
//           htmlFor="name"
//           className="text-sm font-medium text-gray-700 mb-2"
//         >
//           Category Name
//         </label>
//         <input
//           id="name"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="border-gray-700 rounded-md text-slate-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
//           placeholder="Enter category name"
//         />
//       </div>
//       <div className="flex flex-col">
//         <label
//           htmlFor="image"
//           className="text-sm font-medium text-gray-700 mb-2"
//         >
//           Image Upload
//         </label>
//         <input
//           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
//           id="file_input"
//           type="file"
//           accept=".jpg, .jpeg, .png"
//           onChange={handleFileInputChange}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label
//           htmlFor="keywords"
//           className="text-sm font-medium text-gray-700 mb-2"
//         >
//           Keywords (comma-separated)
//         </label>
//         <input
//           id="keywords"
//           type="text"
//           value={keywords}
//           onChange={(e) => setKeywords(e.target.value)}
//           className="border-gray-700 rounded-md text-slate-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
//           placeholder="Enter keywords"
//         />
//       </div>

//       {parentCategory &&
//         parentCategory.level !== 3 &&
//         parentCategory.level !== 1 && (
//           <div>
//             <label className="text-slate-600 text-sm flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={isLeaf}
//                 onChange={(e) => setIsLeaf(e.target.checked)}
//               />
//               This is the last category (no child categories allowed)
//             </label>
//           </div>
//         )}

//       {isLeaf && (
//         <div>
//           {attributes.map((attr, index) => (
//             <div key={index} className="flex gap-2 mb-2 text-slate-600 ">
//               <input
//                 type="text"
//                 value={attr.name}
//                 onChange={(e) =>
//                   handleAttributeChange(index, "name", e.target.value)
//                 }
//                 placeholder="Attribute Name"
//                 className="w-[32%] border border-gray-700 rounded-md p-2 text-sm"
//               />
//               <select
//                 value={attr.type}
//                 onChange={(e) =>
//                   handleAttributeChange(index, "type", e.target.value)
//                 }
//                 className="w-[32%]  border border-gray-300 rounded-md p-2 text-slate-600 text-sm"
//               >
//                 <option value="text" className="text-slate-600 text-sm">
//                   Text
//                 </option>
//                 <option value="number" className="text-slate-600 text-sm">
//                   Number
//                 </option>
//                 <option value="boolean" className="text-slate-600 text-sm">
//                   Boolean
//                 </option>
//                 <option value="select" className="text-slate-600 text-sm">
//                   Dropdown
//                 </option>
//               </select>
//               {attr.type === "select" && (
//                 <input
//                   type="text"
//                   placeholder="(comma-separated)"
//                   value={attr.options?.join(", ")}
//                   onChange={(e) =>
//                     handleAttributeChange(
//                       index,
//                       "options",
//                       e.target.value.split(",").map((opt) => opt.trim())
//                     )
//                   }
//                   className="w-[32%]  border border-gray-300 rounded-md p-2 text-sm"
//                 />
//               )}
//               <input
//                 type="text"
//                 placeholder="Unit (optional)"
//                 value={attr.unit}
//                 onChange={(e) =>
//                   handleAttributeChange(index, "unit", e.target.value)
//                 }
//                 className="w-[32%]  border border-gray-300 rounded-md p-2 text-sm"
//               />

//               <button
//                 type="button"
//                 onClick={() => removeAttribute(index)}
//                 className="text-red-500  rounded-md p-1 hover:scale-110 "
//               >
//                 <MdDelete size={30} />
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addNewAttribute}
//             className="text-blue-600 font-medium"
//           >
//             + Add Attribute
//           </button>
//         </div>
//       )}

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={!isFormValid} // Disable if the form is invalid
//           className={`px-4 py-2 rounded ${
//             isFormValid
//               ? "bg-blue-600 text-white"
//               : "bg-gray-400 text-gray-200 cursor-not-allowed"
//           }`}
//         >
//           {parentCategory === null
//             ? "Add Category"
//             : isLeaf
//             ? "Add Child"
//             : "Add Sub-Category"}
//         </button>
//       </div>
//     </form>

//     {/* Image Preview Section */}
//     <div className="flex items-center justify-center">
//       <div className="border p-2 md:h-[250px] h-[200px] w-full md:w-[250px] rounded-md overflow-hidden">
//         {image ? (
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Preview"
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <img
//             src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
//             alt="Placeholder"
//             className="h-full w-full object-cover"
//           />
//         )}
//       </div>
//     </div>
//   </div>
// </div>
