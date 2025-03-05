// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import { MdDelete } from "react-icons/md";
// import {
//   addLeafCategory,
//   addSubcategory,
//   createMainCategory,
// } from "../../../api/categoryApi";
// import { LoadingModal } from "../../Shop/Product/LoadingModal";

// const CategoryForm = ({ parentCategory }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [keywords, setKeywords] = useState([]);
//   const [isLeaf, setIsLeaf] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [attributes, setAttributes] = useState([
//     { name: "", type: "text", unit: "", values: [], options: [] },
//   ]);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     if (parentCategory) {
//       setIsLeaf(parentCategory?.level === 3 ? true : false);
//     }
//   }, [parentCategory]);

//   const attributesRef = useRef(attributes);

//   // Update the ref whenever attributes change
//   useEffect(() => {
//     attributesRef.current = attributes;
//   }, [attributes]);

//   const handleFileInputChange = useCallback((e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   }, []);

//   useEffect(() => {
//     if (name?.length > 1 && image) {
//       setIsDisabled(false);
//     } else {
//       setIsDisabled(true);
//     }
//   }, [name, image]);

//   const addNewAttribute = () => {
//     setAttributes([
//       ...attributes,
//       { name: "", type: "text", unit: "", values: [], options: [] },
//     ]);
//   };

//   const handleAttributeChange = (index, key, value) => {
//     const updatedAttributes = [...attributes];
//     updatedAttributes[index][key] = value;

//     if (key === "type" && value === "select") {
//       updatedAttributes[index].options = [];
//     }
//     if (key === "type" && value !== "select") {
//       updatedAttributes[index].options = undefined;
//     }
//     setAttributes(updatedAttributes);
//   };

//   const validateForm = () => {
//     // Basic fields validation
//     if (!name.trim() || !image) return false;

//     // If it's not a leaf category, no need to validate attributes
//     if (!isLeaf) return true;

//     // If it's a leaf category, validate attributes
//     const isValid = attributes.every((attr) => {
//       if (attr.name.trim().length === 0) return false;
//       if (
//         attr.type === "select" &&
//         (!attr.options || attr.options.length === 0)
//       )
//         return false;
//       return true;
//     });

//     return isValid;
//   };

//   useEffect(() => {
//     setIsFormValid(validateForm());
//   }, [name, image, attributes, isLeaf]);

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();

//       setLoading(true);

//       if (!name || !image || !keywords) {
//         toast.error("Please fill in all required fields.");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("image", image);

//       if (keywords) {
//         keywords
//           .split(",")
//           .map((keyword) => formData.append("keywords[]", keyword?.trim()));
//       }

//       if (parentCategory) {
//         formData.append("parentId", parentCategory?._id);
//       }

//       // Use the ref to ensure the latest attributes are used
//       if (isLeaf && attributesRef.current.length > 0) {
//         formData.append("attributes", JSON.stringify(attributesRef.current));
//       }

//       setIsDisabled(true);

//       try {
//         let response;
//         if (parentCategory) {
//           if (isLeaf && attributesRef.current.length > 0) {
//             response = await addLeafCategory(formData);
//           } else {
//             response = await addSubcategory(formData);
//           }
//         } else {
//           response = await createMainCategory(formData);
//         }
//         toast.success("Category added successfully!");
//         setTimeout(() => {
//           window.location.reload();
//         }, 1500);
//         setName("");
//         setImage(null);
//         setKeywords("");
//         setAttributes([]);
//         setIsLeaf(false);
//       } catch (error) {
//         console.error("Error adding category:", error?.message);
//         toast.error(error?.response?.data.message || "Failed to add category");
//       } finally {
//         setIsDisabled(false);
//         setLoading(false);
//       }
//     },
//     [name, image, keywords, parentCategory, isLeaf]
//   );

//   const removeAttribute = (index) => {
//     const updatedAttributes = attributes.filter((_, i) => i !== index);
//     setAttributes(updatedAttributes);
//   };

//   return (
//     <div className="w-full bg-white shadow-md rounded-lg p-6 md:p-8 mt-8">
//       {loading && (
//         <LoadingModal loading={loading} message={"Creating your category..."} />
//       )}

//       <h3 className="text-xl font-bold text-slate-600 mb-6 text-center md:text-left">
//         {parentCategory ? (
//           <>
//             Add Subcategory to{" "}
//             <span className="text-blue-600">{parentCategory.name}</span>
//           </>
//         ) : (
//           "Create Main Category"
//         )}
//       </h3>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Category Name */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="name"
//               className="text-sm font-medium text-gray-700 mb-2"
//             >
//               Category Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
//               placeholder="Enter category name"
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="image"
//               className="text-sm font-medium text-gray-700 mb-2"
//             >
//               Image Upload
//             </label>
//             <input
//               className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
//               id="file_input"
//               type="file"
//               accept=".jpg, .jpeg, .png"
//               onChange={handleFileInputChange}
//             />
//           </div>

//           {/* Keywords */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="keywords"
//               className="text-sm font-medium text-gray-700 mb-2"
//             >
//               Keywords (comma-separated)
//             </label>
//             <input
//               id="keywords"
//               type="text"
//               value={keywords}
//               onChange={(e) => setKeywords(e.target.value)}
//               className="border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
//               placeholder="Enter keywords"
//             />
//           </div>

//           {/* Last Category Checkbox */}
//           {parentCategory &&
//             parentCategory.level !== 3 &&
//             parentCategory.level !== 1 && (
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={isLeaf}
//                   onChange={(e) => setIsLeaf(e.target.checked)}
//                   className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <label className="text-sm text-gray-700">
//                   This is the last category (no child categories allowed)
//                 </label>
//               </div>
//             )}

//           {/* Attributes Section */}
//           {isLeaf && (
//             <div>
//               {attributes.map((attr, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-wrap gap-4 items-center text-gray-800 mb-4"
//                 >
//                   <input
//                     type="text"
//                     value={attr.name}
//                     onChange={(e) =>
//                       handleAttributeChange(index, "name", e.target.value)
//                     }
//                     placeholder="Attribute Name"
//                     className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
//                   />
//                   <select
//                     value={attr.type}
//                     onChange={(e) =>
//                       handleAttributeChange(index, "type", e.target.value)
//                     }
//                     className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
//                   >
//                     <option value="text">Text</option>
//                     <option value="number">Number</option>
//                     <option value="boolean">Boolean</option>
//                     <option value="select">Dropdown</option>
//                   </select>
//                   {attr.type === "select" && (
//                     <input
//                       type="text"
//                       placeholder="Options (comma-separated)"
//                       value={attr.options?.join(", ")}
//                       onChange={(e) =>
//                         handleAttributeChange(
//                           index,
//                           "options",
//                           e.target.value.split(",").map((opt) => opt.trim())
//                         )
//                       }
//                       className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
//                     />
//                   )}
//                   <input
//                     type="text"
//                     placeholder="Unit (optional)"
//                     value={attr.unit}
//                     onChange={(e) =>
//                       handleAttributeChange(index, "unit", e.target.value)
//                     }
//                     className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeAttribute(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <MdDelete size={24} />
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addNewAttribute}
//                 className="text-blue-600 hover:underline"
//               >
//                 + Add Attribute
//               </button>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={!isFormValid}
//               className={`px-5 py-3 rounded-lg ${
//                 isFormValid
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-gray-400 text-gray-200 cursor-not-allowed"
//               }`}
//             >
//               {parentCategory === null
//                 ? "Add Category"
//                 : isLeaf
//                 ? "Add Child"
//                 : "Add Sub-Category"}
//             </button>
//           </div>
//         </form>

//         {/* Image Preview Section */}
//         <div className="flex justify-center">
//           <div className="border p-3 rounded-lg overflow-hidden shadow-md">
//             {image ? (
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <img
//                 src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
//                 alt="Placeholder"
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryForm;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import { MdDelete } from "react-icons/md";
// import {
//   addLeafCategory,
//   addSubcategory,
//   createMainCategory,
// } from "../../../api/categoryApi";
// import { LoadingModal } from "../../Shop/Product/LoadingModal";
// import axios from "axios";

// const CategoryForm = ({ parentCategory }) => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [keywords, setKeywords] = useState([]);
//   const [isLeaf, setIsLeaf] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [attributes, setAttributes] = useState([
//     { name: "", type: "text", unit: "", values: [], options: [] },
//   ]);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isFormValid, setIsFormValid] = useState(false);

//   const [sections, setSections] = useState([]); // New attribute sections

//   // Handle Adding a New Section
//   const addSection = () => {
//     setSections([...sections, { sectionName: "", attributes: [] }]);
//   };

//   useEffect(() => {
//     if (parentCategory) {
//       setIsLeaf(parentCategory?.level === 3 ? true : false);
//     }
//   }, [parentCategory]);

//   const attributesRef = useRef(attributes);

//   // Update the ref whenever attributes change
//   useEffect(() => {
//     attributesRef.current = attributes;
//   }, [attributes]);

//   const handleFileInputChange = useCallback((e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   }, []);

//   useEffect(() => {
//     if (name?.length > 1 && image) {
//       setIsDisabled(false);
//     } else {
//       setIsDisabled(true);
//     }
//   }, [name, image]);

//   const addNewAttribute = () => {
//     setAttributes([
//       ...attributes,
//       { name: "", type: "text", unit: "", values: [], options: [] },
//     ]);
//   };

//   const handleAttributeChange = (index, key, value) => {
//     const updatedAttributes = [...attributes];
//     updatedAttributes[index][key] = value;

//     if (key === "type" && value === "select") {
//       updatedAttributes[index].options = [];
//     }
//     if (key === "type" && value !== "select") {
//       updatedAttributes[index].options = undefined;
//     }
//     setAttributes(updatedAttributes);
//   };

//   const validateForm = () => {
//     // Basic fields validation
//     if (!name.trim() || !image) return false;

//     // If it's not a leaf category, no need to validate attributes
//     if (!isLeaf) return true;

//     // If it's a leaf category, validate attributes
//     const isValid = attributes.every((attr) => {
//       if (attr.name.trim().length === 0) return false;
//       if (
//         attr.type === "select" &&
//         (!attr.options || attr.options.length === 0)
//       )
//         return false;
//       return true;
//     });

//     return isValid;
//   };

//   useEffect(() => {
//     setIsFormValid(validateForm());
//   }, [name, image, attributes, isLeaf]);

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();

//       setLoading(true);

//       if (!name || !image || !keywords) {
//         toast.error("Please fill in all required fields.");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("image", image);

//       if (keywords) {
//         keywords
//           .split(",")
//           .map((keyword) => formData.append("keywords[]", keyword?.trim()));
//       }

//       if (parentCategory) {
//         formData.append("parentId", parentCategory?._id);
//       }

//       // Use the ref to ensure the latest attributes are used
//       if (isLeaf && attributesRef.current.length > 0) {
//         formData.append("attributes", JSON.stringify(attributesRef.current));
//       }

//       setIsDisabled(true);

//       try {
//         let response;
//         if (parentCategory) {
//           if (isLeaf && attributesRef.current.length > 0) {
//             response = await addLeafCategory(formData);
//           } else {
//             response = await addSubcategory(formData);
//           }
//         } else {
//           response = await createMainCategory(formData);
//         }
//         toast.success("Category added successfully!");
//         setTimeout(() => {
//           window.location.reload();
//         }, 1500);
//         setName("");
//         setImage(null);
//         setKeywords("");
//         setAttributes([]);
//         setIsLeaf(false);
//       } catch (error) {
//         console.error("Error adding category:", error?.message);
//         toast.error(error?.response?.data.message || "Failed to add category");
//       } finally {
//         setIsDisabled(false);
//         setLoading(false);
//       }
//     },
//     [name, image, keywords, parentCategory, isLeaf]
//   );

//   const removeAttribute = (index) => {
//     const updatedAttributes = attributes.filter((_, i) => i !== index);
//     setAttributes(updatedAttributes);
//   };

//   return (
//     <div className="w-full bg-white shadow-md rounded-lg p-6 md:p-8 mt-8">
//       {loading && (
//         <LoadingModal loading={loading} message={"Creating your category..."} />
//       )}

//       <h3 className="text-xl font-bold text-slate-600 mb-6 text-center md:text-left">
//         {parentCategory ? (
//           <>
//             Add Subcategory to{" "}
//             <span className="text-blue-600">{parentCategory.name}</span>
//           </>
//         ) : (
//           "Create Main Category"
//         )}
//       </h3>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Category Name */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="name"
//               className="text-sm font-medium text-gray-700 mb-2"
//             >
//               Category Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
//               placeholder="Enter category name"
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="image"
//               className="text-sm font-medium text-gray-700 mb-2"
//             >
//               Image Upload
//             </label>
//             <input
//               className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
//               id="file_input"
//               type="file"
//               accept=".jpg, .jpeg, .png"
//               onChange={handleFileInputChange}
//             />
//           </div>

//           {/* Keywords */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="keywords"
//               className="text-sm font-medium text-gray-700 mb-2"
//             >
//               Keywords (comma-separated)
//             </label>
//             <input
//               id="keywords"
//               type="text"
//               value={keywords}
//               onChange={(e) => setKeywords(e.target.value)}
//               className="border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 sm:text-base p-3"
//               placeholder="Enter keywords"
//             />
//           </div>

//           {/* Last Category Checkbox */}
//           {parentCategory &&
//             parentCategory.level !== 3 &&
//             parentCategory.level !== 1 && (
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={isLeaf}
//                   onChange={(e) => setIsLeaf(e.target.checked)}
//                   className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <label className="text-sm text-gray-700">
//                   This is the last category (no child categories allowed)
//                 </label>
//               </div>
//             )}

//           {/* Attributes Section */}
//           {isLeaf && (
//             <div>
//               {attributes.map((attr, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-wrap gap-4 items-center text-gray-800 mb-4"
//                 >
//                   <input
//                     type="text"
//                     value={attr.name}
//                     onChange={(e) =>
//                       handleAttributeChange(index, "name", e.target.value)
//                     }
//                     placeholder="Attribute Name"
//                     className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
//                   />
//                   <select
//                     value={attr.type}
//                     onChange={(e) =>
//                       handleAttributeChange(index, "type", e.target.value)
//                     }
//                     className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
//                   >
//                     <option value="text">Text</option>
//                     <option value="number">Number</option>
//                     <option value="boolean">Boolean</option>
//                     <option value="select">Dropdown</option>
//                   </select>
//                   {attr.type === "select" && (
//                     <input
//                       type="text"
//                       placeholder="Options (comma-separated)"
//                       value={attr.options?.join(", ")}
//                       onChange={(e) =>
//                         handleAttributeChange(
//                           index,
//                           "options",
//                           e.target.value.split(",").map((opt) => opt.trim())
//                         )
//                       }
//                       className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
//                     />
//                   )}
//                   <input
//                     type="text"
//                     placeholder="Unit (optional)"
//                     value={attr.unit}
//                     onChange={(e) =>
//                       handleAttributeChange(index, "unit", e.target.value)
//                     }
//                     className="flex-grow border border-gray-300 rounded-lg p-3 shadow-sm text-sm"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeAttribute(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <MdDelete size={24} />
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addNewAttribute}
//                 className="text-blue-600 hover:underline"
//               >
//                 + Add Attribute
//               </button>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={!isFormValid}
//               className={`px-5 py-3 rounded-lg ${
//                 isFormValid
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-gray-400 text-gray-200 cursor-not-allowed"
//               }`}
//             >
//               {parentCategory === null
//                 ? "Add Category"
//                 : isLeaf
//                 ? "Add Child"
//                 : "Add Sub-Category"}
//             </button>
//           </div>
//         </form>

//         {/* Image Preview Section */}
//         <div className="flex justify-center">
//           <div className="border p-3 rounded-lg overflow-hidden shadow-md">
//             {image ? (
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <img
//                 src="https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
//                 alt="Placeholder"
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryForm;

import React, { useCallback, useEffect, useState } from "react";
import { MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";
import { toast } from "react-toastify";
import { addLeafCategory, addSubcategory, createMainCategory } from "../../../api/categoryApi";
import { LoadingModal } from "../../Shop/Product/LoadingModal";

const CategoryForm = ({ parentCategory }) => {
  const [isLeaf, setIsLeaf] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    image: null,
    keywords: [],
    isLeaf: isLeaf,
    attributeSections: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [keywords, setKeywords] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (parentCategory) {
      setCategory({
        ...category,
        isLeaf: parentCategory.level === 3,
        keywords: parentCategory.keywords || [],
      });
    }
  }, [parentCategory]);

  useEffect(() => {
    if (parentCategory) {
      setIsLeaf(parentCategory?.level === 3 ? true : false);
    }
  }, [parentCategory]);

  const handleFileInputChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setCategory({ ...category, image: file });
        setImagePreview(URL.createObjectURL(file));
      }
    },
    [category]
  );

  const addSection = () => {
    setCategory({
      ...category,
      attributeSections: [
        ...category.attributeSections,
        { sectionName: "", attributes: [] },
      ],
    });
  };

  const removeSection = (index) => {
    const updatedSections = category.attributeSections.filter(
      (_, i) => i !== index
    );
    setCategory({ ...category, attributeSections: updatedSections });
  };

  const addAttribute = (sectionIndex) => {
    const updatedSections = [...category.attributeSections];
  
    if (!updatedSections[sectionIndex].sectionName.trim()) return;
  
    // Lock the section name input when the first attribute is added
    updatedSections[sectionIndex].sectionLocked = true;
  
    updatedSections[sectionIndex].attributes.push({
      name: "",
      type: "text",
      values: [],
      unit: "",
      options: [],
    });
  
    setCategory({ ...category, attributeSections: updatedSections });
  }; 
  
  const removeAttribute = (sectionIndex, attrIndex) => {
    const updatedSections = [...category.attributeSections];
    updatedSections[sectionIndex].attributes.splice(attrIndex, 1);
    setCategory({ ...category, attributeSections: updatedSections });
  };

  const handleIsLeafChange = (e) => {
    const newIsLeaf = e.target.checked;
    setIsLeaf(newIsLeaf);
    setCategory((prevCategory) => ({
      ...prevCategory,
      isLeaf: newIsLeaf,
    }));
  };


  const handleChange = (e, sectionIndex, attrIndex, field) => {
    const { value } = e.target;
    const updatedSections = [...category.attributeSections];

    if (field === "options" && attrIndex !== undefined) {
      updatedSections[sectionIndex].attributes[attrIndex][field] = value
        .split(",")
        .map((opt) => opt.trim());
    } else if (attrIndex !== undefined) {
      updatedSections[sectionIndex].attributes[attrIndex][field] = value;
    } else {
      updatedSections[sectionIndex][field] = value;
    }

    setCategory({ ...category, attributeSections: updatedSections });
  };

  console.log("category-->", category)
  console.log("isLeaf-->", isLeaf)

  const validateForm = () => {
    let errors = {};
    if (!category.name.trim()) errors.name = "Category name is required";
    category.attributeSections.forEach((section, secIndex) => {
      if (!section.sectionName.trim()) {
        errors[`section_${secIndex}`] = "Section name is required";
      }
      section.attributes.forEach((attr, attrIndex) => {
        if (!attr.name.trim()) {
          errors[`attr_${secIndex}_${attrIndex}`] =
            "Attribute name is required";
        }
      });
    });
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
  
      // Validate form fields before submission
      if (!validateForm()) {
        toast.error("Please fix the errors before submitting.");
        setLoading(false);
        return;
      }
  
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("isLeaf", category.isLeaf);
      
      if (category.image) {
        formData.append("image", category.image);
      }
  
      category.keywords.forEach((keyword) =>
        formData.append("keywords[]", keyword.trim())
      );
  
      if (parentCategory) {
        formData.append("parentId", parentCategory?._id);
      }
  
      if (category.isLeaf && category.attributeSections.length > 0) {
        formData.append(
          "attributeSections",
          JSON.stringify(category.attributeSections)
        );
      }
  
      formData.forEach((value, key) => console.log(key, value));
      setIsDisabled(true);
  
      try {
        let response;
        if (parentCategory) {
          if (category.isLeaf && category.attributeSections.length > 0) {
            console.log("leaf category call")
            response = await addLeafCategory(formData);
          } else {
            console.log("sub category call")
            response = await addSubcategory(formData);
          }
        } else {
          console.log("root category call")
          response = await createMainCategory(formData);
        }
  
        toast.success("Category added successfully!");
  
        // Reset form without page reload
        setCategory({
          name: "",
          image: null,
          keywords: [],
          isLeaf: false,
          attributeSections: [],
        });
        setImagePreview(null);
        setIsLeaf(false);
        setErrors({});
        setIsFormValid(false);
      } catch (error) {
        console.error("Error adding category:", error?.message);
        toast.error(error?.response?.data.message || "Failed to add category");
      } finally {
        setIsDisabled(false);
        setLoading(false);
      }
    },
    [category, parentCategory]
  );
  

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-md">

       {loading && (
         <LoadingModal loading={loading} message={"Creating your category..."} />
       )}
      <h3 className="text-xl font-bold text-slate-600 mb-6 text-center md:text-left">
        {parentCategory ? (
          <>
            Add Subcategory to{" "}
            <span className="text-blue-600">{parentCategory.name}</span>
          </>
        ) : (
          "Create Main Category"
        )}
      </h3>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-1">Category Name</label>
        <input
          type="text"
          placeholder="Enter category name"
          className="w-full p-2 border rounded-md mb-2"
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

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
        <div className="flex flex-col mt-3">
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
        {parentCategory && parentCategory.level >= 2 && (
          <div className="flex items-center gap-3 mt-5">
            <input
              type="checkbox"
              checked={isLeaf}
              // onChange={(e) => setIsLeaf(e.target.checked)}
              onChange={handleIsLeafChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              This is the last category (no child categories allowed)
            </label>
          </div>
        )}

        {isLeaf && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">Attribute Sections</h3>
            {category?.attributeSections?.map((section, secIndex) => (
              <div
                key={secIndex}
                className="border p-4 rounded-md mt-2 bg-gray-100"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {section.sectionLocked
                      ? section.sectionName
                      : `Section ${secIndex + 1}`}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSection(secIndex)}
                    >
                      {expandedSections[secIndex] ? (
                        <MdExpandLess size={20} />
                      ) : (
                        <MdExpandMore size={20} />
                      )}
                    </button>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeSection(secIndex)}
                    >
                      ✖
                    </button>
                  </div>
                </div>

                {expandedSections[secIndex] && (
                  <div>
                    {!section.sectionLocked && (
                      <input
                        type="text"
                        className="w-full md:w-[80%] p-2 border rounded-md"
                        placeholder="Section Name"
                        value={section.sectionName}
                        onChange={(e) =>
                          handleChange(e, secIndex, undefined, "sectionName")
                        }
                      />
                    )}

                    {errors[`section_${secIndex}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`section_${secIndex}`]}
                      </p>
                    )}

                    <div className="mt-2">
                      {section.attributes.map((attr, attrIndex) => (
                        <div
                          key={attrIndex}
                          className="flex gap-2 flex-col md:flex-row md:items-center md:space-x-2 mt-2"
                        >
                          <input
                            type="text"
                            className="p-2 border rounded-md w-full md:w-[20%]"
                            placeholder="Attribute Name"
                            value={attr.name}
                            onChange={(e) =>
                              handleChange(e, secIndex, attrIndex, "name")
                            }
                          />
                          <select
                            className="p-2 border rounded-md w-full md:w-[20%]"
                            value={attr?.type}
                            onChange={(e) =>
                              handleChange(e, secIndex, attrIndex, "type")
                            }
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="select">Select</option>
                          </select>

                          {attr?.type === "select" && (
                            <input
                              type="text"
                              placeholder="Options (comma-separated)"
                              value={attr.options?.join(", ")}
                              onChange={(e) =>
                                handleChange(e, secIndex, attrIndex, "options")
                              }
                              className="w-full md:w-[30%] border border-gray-300 rounded-lg p-2 shadow-sm text-sm"
                            />
                          )}

                          <input
                            type="text"
                            placeholder="Unit (optional)"
                            value={attr.unit}
                            onChange={(e) =>
                              handleChange(e, secIndex, attrIndex, "unit")
                            }
                            className="w-full md:w-[15%] border border-gray-300 rounded-lg p-2 shadow-sm text-sm"
                          />
                          <button
                            type="button"
                            className="mt-2 md:mt-0 text-red-500"
                            onClick={() => removeAttribute(secIndex, attrIndex)}
                          >
                            <MdDelete size={24} />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className={`mt-2 px-3 ${
                          section.sectionName.trim()
                            ? "text-blue-500"
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => addAttribute(secIndex)}
                        disabled={!section.sectionName.trim()}
                      >
                        + Add Attribute
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="button"
                className="mt-2 text-blue-500 px-3"
                onClick={addSection}
              >
                + Add Section
              </button>
            </div>
          </div>
        )}

        {imagePreview && (
          <div className="flex items-center justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-5 w-32 border h-32 object-cover"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            // disabled={!isFormValid}
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
    </div>
  );
};

export default CategoryForm;
