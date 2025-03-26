import React, { useState, useEffect, useCallback } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdInfo, MdRemove } from "react-icons/md";
import { toast } from "react-toastify";
import AttributeInputs from "./AttributesInputs";
import PricingDetails from "./PricingDetails";
import { FcAddImage } from "react-icons/fc";
import ImageModal from "../../../utils/ImageModal";
import { server } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../redux/actions/product";
import socketIO from "socket.io-client";
import { LoadingModal } from "./LoadingModal";
import { FaQuestionCircle, FaTimes } from "react-icons/fa";

import ProductHighlights from "./ProductHighlights";
import { v4 as uuidv4 } from "uuid";
import ReturnPolicyForm from "./ReturnPolicyForm";

const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const ProductForm = ({ selectedCategory, primaryImage }) => {
  const { seller } = useSelector((state) => state.seller);
  const { isLoading, success, error } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state?.products);
  const [attributes, setAttributes] = useState(
    selectedCategory?.variantAttributes?.map((attr) => ({
      key: attr.name,
      type: attr.type,
      values: [],
    })) || []
  );
  const [attributesBySection, setAttributesBySection] = useState({});
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [styleCode, setStyleCode] = useState("");
  const [weight, setWeight] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [importerDetails, setImporterDetails] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountType, setDiscountType] = useState("Flat");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [afterDiscountPrice, setAfterDiscountPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [warrentyPeriod, setWarrentyPeriod] = useState();
  const [sku, setSku] = useState("");
  const [tags, setTags] = useState([]);
  const [maxPurchaseLimit, setMaxPurchaseLimit] = useState("");
  const [otherDetails, setOtherDetails] = useState([{ key: "", value: "" }]);
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
  });
  const [isDimensinonOpen, setIsDimensionOpen] = useState(false); // To toggle the collapsible input
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [attributeKeyValuePairs, setAttributeKeyValuePairs] = useState({});
  const [highlights, setHighlights] = useState([]);
  const [returnPolicy, setReturnPolicy] = useState({
    isReturnable: false,
    returnWindowDays: null,
    isReplaceable: false,
    replacementWindowDays: null,
    returnReason: [],
  });
  
  const [load, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tagInput, setTagInput] = useState("");

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };
  
  // const handleKeyDown = (e) => {
  //   if (e.key === "," || e.key === "Enter") {
  //     e.preventDefault(); // Prevent form submission (if Enter is pressed)
  
  //     // Add new tag if not empty
  //     if (tagInput.trim() !== "") {
  //       setTags([...tags, tagInput.trim()]);
  //       setTagInput(""); // Clear input after adding
  //     }
  //   }
  // };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || tagInput.endsWith(",")) {
      e.preventDefault(); // Prevent form submission (if Enter is pressed)
  
      // Add new tag if not empty
      const newTag = tagInput.trim().replace(/,$/, ""); // Remove trailing comma
      if (newTag !== "") {
        setTags([...tags, newTag]);
        setTagInput(""); // Clear input after adding
      }
    }
  };
  
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  console.log("tags", tags)

  const handleInputChange =
    (setter, fieldName, isNested = false) =>
    (e) => {
      const value = e.target.value;

      setter((prev) => {
        const updatedState = isNested
          ? { ...prev, [fieldName]: value } // Handle nested state like dimensions
          : value; // Handle simple state updates
        return updatedState;
      });

      // Remove error dynamically if it exists
      if (errors[fieldName]) {
        setErrors((prevErrors) => {
          const { [fieldName]: _, ...rest } = prevErrors; // Remove specific error
          return rest;
        });
      }
    };

  useEffect(() => {
    if (primaryImage) {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((img) => img !== primaryImage);
        return [primaryImage, ...updatedImages].slice(0, 5); // Ensure max 5 images
      });
    }
  }, [primaryImage]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    // Check if total images exceed 5
    if (images.length + files.length > 5) {
      toast.info("You can upload a maximum of 5 images.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Remove uploaded image
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!selectedCategory || !Array.isArray(selectedCategory.attributeSections))
      return;

    setAttributesBySection((prev) => {
      const newAttributes = {};

      selectedCategory.attributeSections.forEach((section) => {
        newAttributes[section.sectionName] =
          section.attributes?.map(({ values, ...attr }) => attr) || [];
      });

      return newAttributes;
    });
  }, [selectedCategory]);

  const handleAttributeChanges = (e, sectionName, attrIndex) => {
    const { value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setAttributesBySection((prev) => {
      // Ensure section exists before updating
      if (!prev[sectionName]) {
        console.warn(
          `Section ${sectionName} not found in attributesBySection, prev`
        );
        return prev;
      }

      // Create a new array to avoid mutating state
      const updatedSection = [...prev[sectionName]];

      // Ensure attribute index exists
      if (!updatedSection[attrIndex]) {
        console.warn(
          `Attribute index ${attrIndex} not found in section ${sectionName}`
        );
        return prev;
      }

      // Update specific attribute value
      updatedSection[attrIndex] = {
        ...updatedSection[attrIndex],
        value: newValue,
      };

      return { ...prev, [sectionName]: updatedSection };
    });
  };

  useEffect(() => {
    if (discountType === "Flat") {
      setAfterDiscountPrice(originalPrice - discountPrice);
    } else {
      setAfterDiscountPrice(
        originalPrice - Math.ceil((discountPrice / 100) * originalPrice)
      );
    }
  }, [discountPrice, originalPrice, discountType]);

  const existingSKUs = new Set();

  const generateSKU = () => {
    const length = 8;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newSku = "";

    while (newSku.length < length) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newSku += chars[randomIndex];
    }

    // Ensure uniqueness
    if (existingSKUs.has(newSku)) {
      return generateSKU();
    }

    existingSKUs.add(newSku);

    // Create a synthetic event object to use with handleInputChange
    const syntheticEvent = {
      target: { value: newSku },
    };

    handleInputChange(setSku, "sku")(syntheticEvent); // Properly call handleInputChange

    // Remove error dynamically if it exists
    if (errors.sku) {
      setErrors((prevErrors) => {
        const { sku, ...rest } = prevErrors; // Remove specific error
        return rest;
      });
    }
  };

  const handleAddField = () => {
    setOtherDetails([...otherDetails, { key: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const newDetails = otherDetails.filter((_, i) => i !== index);
    setOtherDetails(newDetails);
  };

  const handleOtherDetailsChange = (index, field, value) => {
    const newDetails = otherDetails.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setOtherDetails(newDetails);
  };

  // Updates attribute values (for text, number, or select)
  const handleAttributeChange = (index, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].values = value.split(",").map((v) => v.trim());
    setAttributes(updatedAttributes);
  };

  // Handles boolean attribute toggle
  const handleBooleanChange = (index, checked) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].values = [checked ? "Yes" : "No"];
    setAttributes(updatedAttributes);
  };

  const isVariationReady = () => {
    return attributes.some((attr) => attr?.values.length > 0);
  };

  const generateVariations = () => {
    // Filter attributes that have at least one value
    const filteredAttributes = attributes.filter(attr => attr.values.length > 0);
    
    // If no attributes have values, prevent variation generation
    if (filteredAttributes.length === 0) {
      toast.error("Please select or enter values for at least one attribute.");
      return;
    }
  
    // Cartesian product to generate all possible combinations
    const cartesianProduct = (arrays) => 
      arrays.reduce(
        (acc, val) => acc.flatMap((x) => val.map((y) => [...x, y])),
        [[]]
      );
  
    // Get values only from attributes that have values
    const attributeValues = filteredAttributes.map(attr => attr.values);
    const combinations = cartesianProduct(attributeValues);
  
    // Generate new variation objects
    const newVariations = combinations.map((combo) => ({
      _id: uuidv4(),
      sku: `SKU-${uuidv4().slice(0, 8)}`,
      attributes: filteredAttributes.map((attr, i) => ({
        key: attr.key,
        value: combo[i],
      })),
      originalPrice: 0,
      discountType: "Flat",
      discountAmount: 0,
      afterDiscountPrice: 0,
      stock: 0,
      images: [],
    }));
  
    // ✅ Append new variations instead of replacing them
    setVariations((prevVariations) => [...prevVariations, ...newVariations]);
  
    // ✅ Keep attribute keys but clear values
    setAttributes(
      selectedCategory?.variantAttributes.map((attr) => ({
        key: attr.name,
        type: attr.type,
        values: [],
      }))
    );
  };
  
  // Handles changes in variation inputs (price, stock, discount)
  const handleVariationChange = (id, field, value) => {
    const updatedVariations = variations.map((variation) =>
      variation._id === id
        ? {
            ...variation,
            [field]: value,
            afterDiscountPrice: calculateDiscount(variation, field, value),
          }
        : variation
    );
    setVariations(updatedVariations);
    
  };

  // Calculates afterDiscountPrice dynamically
  const calculateDiscount = (variation, field, value) => {
    const { originalPrice, discountType, discountAmount } =
      field === "originalPrice"
        ? { ...variation, originalPrice: value }
        : field === "discountType"
        ? { ...variation, discountType: value }
        : field === "discountAmount"
        ? { ...variation, discountAmount: value }
        : variation;

    return discountType === "Percent"
      ? Math.round(originalPrice - (originalPrice * discountAmount) / 100)
      : Math.round(originalPrice - discountAmount);
  };

  const handleImageUpload = (id, event) => {
    const files = Array.from(event.target.files);
  
    setVariations((prev) => {
      if (!Array.isArray(prev)) return prev || []; // Ensure prev is always an array
  
      return prev.map((variation) =>
        variation._id === id
          ? {
              ...variation,
              images: [...(variation.images || []), ...files].slice(0, 3), // Keep max 3 images
            }
          : variation
      );
    });
  };
  
  
  const removeVariationImage = (id, index) => {
    setVariations((prev) =>
      prev.map((variation) =>
        variation._id === id
          ? {
              ...variation,
              images: variation.images.filter((_, i) => i !== index),
            }
          : variation
      )
    );
  };
  
  const attributeKeys = [...new Set(variations.flatMap(variation => 
    variation.attributes.map(attr => attr.key)
  ))];

  useEffect(() => {
    const extractAttributes = () => {
      const newAttributes = {};

      Object.entries(attributesBySection).forEach(
        ([sectionName, attributes]) => {
          attributes.forEach(({ name, value }) => {
            newAttributes[name] = value;
          });
        }
      );

      setAttributeKeyValuePairs(newAttributes);
    };

    extractAttributes();
  }, [attributesBySection]); // Runs when `attributesBySection` changes

  const formattedAttributes = Object.entries(attributeKeyValuePairs)
    .map(([key, value]) => `- **${key}**: ${value}`)
    .join("\n");

  const generateProductHighlights = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${server}/product/generate-highlights`,
        {
          productName: name,
          category: selectedCategory?.name,
          brand: brand,
          attributes: formattedAttributes,
        }
      );

      if (response.data.success) {
        const highlightsArray = response.data.highlights
          .split("\n") // Split by new lines
          .map((point) => {
            const match = point.match(/^\d+\.\s*\*\*(.*?)\*\*\s*[:-]?\s*(.*)$/);
            return match
              ? { key: match[1].trim(), value: match[2].trim() }
              : null;
          })
          .filter((item) => item !== null); // Remove null values

        console.log("highlights array-->", highlightsArray); // Now should log correct values
        setHighlights(highlightsArray);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false); // Stop loading after API call
    }
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      selectedCategory?.name?.trim() !== "" &&
      brand.trim() !== "" &&
      Object.keys(attributesBySection)?.length > 0 && // Ensure attributesBySection has sections
      Object.values(attributesBySection).every((attributes) =>
        attributes.every(
          (attr) => attr.value && attr.value.toString().trim() !== ""
        )
      )
    );
  };

  console.log("return policy-->", returnPolicy)

  // Auto-trigger the function when all conditions are met
  useEffect(() => {
    if (isFormValid()) {
      generateProductHighlights();
    }
  }, [selectedCategory?.name, brand, attributes]);

  const validateProductForm = () => {
    const maxLimit = parseInt(maxPurchaseLimit, 10);

    let newErrors = {};

    // Validate product attributes
    attributes.forEach((attr, index) => {
      if (!attr.value || attr.value === "") {
        newErrors[`attribute_${index}`] = `${attr.name} is required.`;
      }
    });

    if (!name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!weight.trim()) {
      newErrors.weight = "Weight is required";
    }

    if (!sku.trim()) {
      newErrors.sku = "SKU is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    // if (!warrentyPeriod ) {
    //   newErrors.warrentyPeriod = "Warranty period must be a valid number.";
    // }

    if (
      typeof maxLimit !== "number" ||
      isNaN(maxLimit) ||
      maxLimit < 0 ||
      maxLimit > 5
    ) {
      newErrors.maxPurchaseLimit =
        "Max PurchaseLimit must be a number between 0 and 5.";
    }

    if (
      dimensions.length === "" ||
      dimensions.width === "" ||
      dimensions.height === ""
    ) {
      newErrors.dimensions =
        "All dimensions (length, width, height) are required.";
    }

    if (!tags) {
      newErrors.tags = "Tags are required";
    }

    if (!importerDetails.trim()) {
      newErrors.importerDetails = "Importer details are required";
    }

    if (variations.length === 0) {
      if (!originalPrice || isNaN(originalPrice) || originalPrice <= 0) {
        errors.originalPrice = "Original price must be greater than 0.";
      }

      if (
        discountType &&
        (!discountPrice || isNaN(discountPrice) || discountPrice < 0)
      ) {
        errors.discountPrice = "Invalid discount value.";
      }

      if (!stock || isNaN(stock) || stock < 1) {
        errors.stock = "Stock must be at least 1.";
      }
    }

    if (variations.length > 0) {
      variations.forEach((variation, index) => {
        if (!variation.originalPrice || variation.originalPrice <= 0) {
          newErrors[`variation_${index}_price`] = `Invalid original price.`;
        }
        if (!variation.discountType) {
          newErrors[`variation_${index}_discountType`] = `Select discount type`;
        }
        if (!variation.stock || variation.stock < 1) {
          newErrors[`variation_${index}_stock`] = ` Stock must be at least 1.`;
        }
        if (!variation.sku || variation.sku.trim() === "") {
          newErrors[`variation_${index}_sku`] = ` SKU is required.`;
        }
        if (
          variation.discountType &&
          (!variation.discountAmount || variation.discountAmount < 0)
        ) {
          newErrors[`variation_${index}_discountAmount`] = `Variation ${
            index + 1
          }: Invalid discount amount.`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };



  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const newForm = new FormData();
  
        const variationsArray = Array.isArray(variations)
          ? variations
          : Object.values(variations);

         
  
        // Format attributes with sections
        const formattedAttributes = Object.entries(attributesBySection).map(
          ([sectionName, attributes]) => ({
            sectionName,
            attributes: attributes.map((attr) => ({
              name: attr.name,
              type: attr.type,
              value:
                attr.type === "number"
                  ? Number(attr.value)
                  : attr.type === "boolean"
                  ? Boolean(attr.value)
                  : attr.value,
              unit: attr.unit || "",
              ...(attr.options ? { options: attr.options } : {}), // Include options if available
            })),
          })
        );
  
        // Format highlights as key-value pairs
        const formattedHighlights =
          highlights?.length > 0
            ? highlights.map((highlight) => ({
                key: highlight.key,
                value: highlight.value,
              }))
            : [];
  
        // Function to upload images and return URLs
        const uploadImages = async (imageFiles) => {
          if (!imageFiles || imageFiles.length === 0) return [];
          const formData = new FormData();
          imageFiles.forEach((image) => formData.append("images", image));
  
          const response = await axios.post(
            `${server}/product/uploadImages`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
  
          return response?.data || [];
        };
  
        // Upload main product images
        const uploadedMainImages = await uploadImages(images);
  
        // Upload variation images and include variation attributes properly
        const variantsData = await Promise.all(
          variationsArray.map(async (variation) => {
            const {
              originalPrice,
              discountType,
              discountAmount,
              afterDiscountPrice,
              sku,
              stock,
              images,
              attributes, // Ensure this field exists
            } = variation;

            console.log("variant images->>>", images)
  
            const uploadedVariantImages = await uploadImages(images || []);

            console.log("uploadedVariantImages-->", uploadedVariantImages)
            // console.log("variantAttributes-->", attributes)
  
            return {
              
              originalPrice,
              discountType,
              discountAmount,
              afterDiscountPrice,
              sku,
              stock,
              images: uploadedVariantImages, // ✅ Ensure images are correctly added
              attributes: attributes || [], // ✅ Ensure attributes are included
              
            };
          })
        );
  
        // Ensure images are uploaded successfully
        if (!uploadedMainImages.length) {
          toast.error("Image upload failed.");
          setLoading(false);
          return;
        }
  
        // Append product details
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("categoryId", selectedCategory?._id);
        newForm.append("brand", brand);
        newForm.append("weight", weight);
        newForm.append("sku", sku);
        newForm.append("tags", JSON.stringify(tags));
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountType", discountType);
        newForm.append("discountAmount", discountPrice);
        newForm.append("stock", stock);
        newForm.append("category", selectedCategory?.name);
        newForm.append("warrantyPeriod", warrentyPeriod);
        newForm.append("maxPurchaseLimit", maxPurchaseLimit);
        newForm.append("dimensions", JSON.stringify(dimensions));
        newForm.append("variants", JSON.stringify(variantsData)); // ✅ Correctly include variations with images & attributes
        newForm.append("images", JSON.stringify(uploadedMainImages));
        newForm.append("attributeSection", JSON.stringify(formattedAttributes));
        newForm.append("returnPolicy", JSON.stringify(returnPolicy))
  
        if (highlights?.length > 0) {
          newForm.append("keyPoints", JSON.stringify(formattedHighlights));
        }
  
        if (seller) {
          newForm.append("shopId", seller._id);
          newForm.append("productSource", "Seller");
        }
  
        newForm.append(
          "otherDetails",
          JSON.stringify(
            otherDetails.map((detail) => ({
              key: detail.key,
              value: detail.value,
            }))
          )
        );
  
        // Dispatch the API request
        await dispatch(createProduct(newForm));
        toast.success("Product created successfully!");
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    },
    [
      images,
      variations,
      highlights,
      seller,
      name,
      description,
      selectedCategory?._id,
      brand,
      sku,
      tags,
      originalPrice,
      discountType,
      discountPrice,
      stock,
      maxPurchaseLimit,
      dimensions,
      otherDetails,
      attributesBySection,
      dispatch,
      server,
    ]
  );
  
  useEffect(() => {
    // Handle error toast
    if (error) {
      toast.error(error);
    }

    // Handle success logic
    if (success) {
      toast.success("Product created successfully!");

      const adminTitle = "New product approval request";
      const adminContent = `A new product "${name}" has been created by ${seller?.shopName}. Please review and approve.`;

      // Emit socket notification to the admin
      socketId.emit("notification", {
        title: adminTitle,
        content: adminContent,
        image: product ? product?.images[0].url : "", // Ensure safe access to image URL
      });

      // Navigate to the dashboard after success and cleanup socket
      // setTimeout(() => {
      //   navigate("/dashboard-products");
      // }, 800);

      setTimeout(()=> {window.location.reload()}, 800)

      // Clean up function to remove socket listener
      return () => {
        socketId.off("notification");
      };
    }

    // Dependency array
  }, [
    dispatch,
    error,
    success,
    isLoading,
    navigate,
    name,
    seller?.shopName,
    product,
  ]);


  return (
    <div className="w-full  bg-white rounded-lg shadow-lg mt-3">
      <LoadingModal loading={loading} message={"Creating your product..."} />

      {/* Primary Image Display */}
      {primaryImage && (
        <div className="mt-3 bg-gray-100 rounded-lg p-2 flex flex-col md:flex-row gap-4">
          {/* Left Section - Image Upload & Preview */}
          <div className="w-full md:w-[65%] bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <label className="pb-2 block text-sm font-medium text-gray-600">
              Upload Images <span className="text-red-500">*</span>
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />

            {/* Upload Button */}
            <label
              htmlFor="upload"
              className="cursor-pointer inline-block mb-3"
            >
              <AiOutlinePlusCircle
                size={35}
                className="text-gray-600 hover:text-gray-800 transition"
              />
            </label>

            {/* Image Scrollable Container */}
            <div className="w-full overflow-x-auto flex gap-3 p-2">
              {images.map((i, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <img
                    src={typeof i === "string" ? i : URL.createObjectURL(i)}
                    alt={`Image ${index + 1}`}
                    onClick={(e) => handleImageClick(URL.createObjectURL(i))}
                    className="object-cover cursor-pointer rounded-md border-2
                        h-[80px] w-[70px] 
                        sm:h-[90px] sm:w-[80px] 
                        md:h-[110px] md:w-[100px] 
                        lg:h-[130px] lg:w-[120px]"
                  />
                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs shadow"
                  >
                    <MdRemove />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Guidelines */}
          <div className="w-full md:w-[35%]">
            {/* Warning Box */}
            <div className="p-3 rounded-lg bg-yellow-100 flex items-start gap-3 border-l-4 border-yellow-500 shadow-sm">
              <MdInfo className="text-yellow-600 text-xl" />
              <p className="text-sm text-gray-700 font-medium">
                Follow guidelines to reduce quality check failure.
              </p>
            </div>

            {/* Guidelines Box */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Image Guidelines
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-gray-700 list-disc pl-5">
                <li>You can upload between 1 and 5 images.</li>
                <li>Primary images should not contain text or watermarks.</li>
                <li>Product images should be clear and well-lit.</li>
                <li>Avoid any additional text in product images.</li>
                <li>Provide a clear view of the product from all angle.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center p-2">
        <div className="w-full">
          <h2 className="text-lg text-slate-700 font-semibold mb-4 mt-5">
            Product, Inventory, & Size
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-6 p-2 bg-white rounded-lg shadow-lg">
            {/* Product Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange(setName, "name")}
                placeholder="Enter product name"
                className={`mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Product Weight */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Product Weight <span className="text-gray-500">(gm)</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="weight"
                value={weight}
                // onChange={(e) => setWeight(e.target.value)}
                onChange={handleInputChange(setWeight, "weight")}
                placeholder="Enter weight in gm"
                className={`mt-2 text-xs w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.weight ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight}</p>
              )}
            </div>

            {/* Style Code */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Style Code <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                name="styleCode"
                value={styleCode}
                onChange={(e) => setStyleCode(e.target.value)}
                placeholder="Enter style-code or ID"
                className="mt-2 text-xs w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="">
              <label className="flex items-center justify-between mx-2  text-slate-700 font-medium text-sm">
                <div className="">
                  {" "}
                  SKU <span className="text-red-500">*</span>
                </div>
                <div
                  className="text-blue-500 cursor-pointer text-sm hover:text-blue-600"
                  onClick={generateSKU}
                >
                  Generate sku
                </div>
              </label>
              <input
                type="text"
                name="sku"
                defaultValue={sku}
                className={`mt-2 text-xs appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                // onChange={(e) => setS(e.target.value)}
                placeholder="Ex: 254677"
              />

              {errors.sku && (
                <p className="text-red-500 text-sm">{errors.sku}</p>
              )}
            </div>

            {selectedCategory?.variantAttributes?.map((attr, index) => (
              <div key={index} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  {attr.name} <span className="text-red-500">*</span>
                </label>

                {attr.type === "text" || attr.type === "number" ? (
                  <input
                    type={attr.type}
                    className="mt-2 w-full text-xs p-2 border rounded-md"
                    placeholder={`Enter ${attr.name} `}
                    value={attributes[index]?.values.join(", ") || ""}
                    onChange={(e) =>
                      handleAttributeChange(index, e.target.value)
                    }
                  />
                ) : attr.type === "boolean" ? (
                  <div className="mt-2 flex items-center">
                    <span className="mr-2 text-xs text-gray-600">No</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={attributes[index]?.values[0] === "Yes"}
                        onChange={(e) =>
                          handleBooleanChange(index, e.target.checked)
                        }
                      />
                      <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500"></div>
                    </label>
                    <span className="ml-2 text-xs text-gray-600">Yes</span>
                  </div>
                ) : attr.type === "select" ? (
                  <select
                    className="mt-2 w-full text-xs p-2 border rounded-md"
                    value={attributes[index]?.values[0] || ""}
                    onChange={(e) =>
                      handleAttributeChange(index, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    {attr.values.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            ))}

            <div className="col-span-2 md:col-span-4 flex justify-end">
              <button
                onClick={generateVariations}
                disabled={!isVariationReady()}
                className={`mt-2 py-2 px-4 rounded text-white ${
                  isVariationReady()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Generate Variations
              </button>
            </div>
          </div>

          {Object.keys(variations).length > 0 && (
            <div className="border-2 mt-3 md:w-full w-full rounded-md overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-sm md:text-base uppercase tracking-wide">
                  <tr>
                    {/* Dynamically Render Attribute Columns */}
                    {attributeKeys.map((key, index) => (
                      <th
                        key={index}
                        className="px-3 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                    <th className="px-3 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original Price
                    </th>
                    <th className="px-3 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount Type
                    </th>
                    <th className="px-3 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount Amount
                    </th>
                    <th className="px-3 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Final Price
                    </th>
                    <th className="px-3 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-3 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-3 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variations.map((variation, index) => (
                    <tr
                      key={index}
                      className="border bg-white hover:bg-gray-50 transition"
                    >
                      {variation.attributes.map((attr, index) => (
                        <td
                          className="border px-3 py-4 whitespace-nowrap text-sm text-gray-500"
                          key={index}
                        >
                          {attr.value}
                        </td>
                      ))}

                      <td className="border px-1 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-gray-500 text-sm">
                            ₹
                          </span>
                          <input
                            type="number"
                            className="w-[130px] border rounded-lg py-2 pl-8 pr-2 text-gray-700 focus:outline-none focus:ring-1"
                            placeholder="Enter price"
                            value={variation.originalPrice}
                            onChange={(e) =>
                              handleVariationChange(
                                variation?._id,
                                "originalPrice",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="border px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={variation.discountType}
                          onChange={(e) =>
                            handleVariationChange(
                              variation?._id,
                              "discountType",
                              e.target.value
                            )
                          }
                          className="appearance-none block w-[120px] px-3 h-[30px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="" disabled>
                            Choose Type
                          </option>
                          <option value="Flat">Flat</option>
                          <option value="Percent">Percentage</option>
                        </select>
                      </td>
                      <td className="border px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                            ₹
                          </span>
                          <input
                            type="number"
                            className="border w-[120px] rounded px-4 py-1 pl-7"
                            placeholder="Discount amount"
                            value={variation.discountAmount}
                            onChange={(e) =>
                              handleVariationChange(
                                variation?._id,
                                "discountAmount",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="border px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="number"
                          placeholder="Ex: 500"
                          // defaultValue={variation.afterDiscountPrice}
                          value={variation.afterDiscountPrice ?? ""}
                          readOnly
                          className="border w-[100px] rounded px-2 py-1 bg-gray-100"
                        />
                      </td>
                      <td className="border px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="number"
                          className="border w-[60px] rounded px-2 py-1"
                          value={variation.stock}
                          placeholder="Ex. 35"
                          onChange={(e) =>
                            handleVariationChange(
                              variation?._id,
                              "stock",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="border px-3 py-2 md:px-4 md:py-3">
                        <input
                          type="text"
                          className="border w-[100px] rounded px-2 py-1 text-gray-500 text-sm"
                          value={variation.sku}
                          onChange={(e) =>
                            handleVariationChange(index, "sku", e.target.value)
                          }
                        />
                      </td>

                      <td className="px-4 whitespace-nowrap text-gray-500">
                        <div className="flex flex-col items-center gap-2 p-2">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            ref={(ref) => (variation.fileInputRef = ref)}
                            onChange={(e) =>
                              // handleImageUpload(variation?._id, e.target.files)
                              handleImageUpload(variation?._id, e)
                            }
                            disabled={variation.images.length >= 3}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => variation.fileInputRef?.click()}
                            disabled={variation.images.length >= 3}
                            className="text-3xl cursor-pointer"
                          >
                            <FcAddImage />
                          </button>
                          <div className="mt-2 w-full overflow-x-auto flex gap-2">
                            {variation.images.map((img, imgIndex) => (
                              <div key={imgIndex} className="relative group">
                                <img
                                  src={URL.createObjectURL(img)} // ✅ Use stored `url` instead of creating a new one
                                  alt="Uploaded"
                                  className="w-12 cursor-pointer h-12 md:w-16 md:h-16 object-cover border rounded-md shadow-sm"
                                  onClick={(e) =>
                                    handleImageClick(
                                      URL.createObjectURL(img)
                                    )
                                  }
                                />
                                <button
                                  onClick={() =>
                                    removeVariationImage(
                                      variation?._id,
                                      imgIndex
                                    )
                                  }
                                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition"
                                >
                                  X
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Dynamic Attribute Inputs */}

          <AttributeInputs
            attributesBySection={attributesBySection}
            handleAttributeChange={handleAttributeChanges}
            selectedCategory={selectedCategory}
            handleInputChange={handleInputChange}
            errors={errors}
          />

          {variations?.length === 0 && (
            <PricingDetails
              originalPrice={originalPrice}
              setOriginalPrice={setOriginalPrice}
              discountType={discountType}
              setDiscountType={setDiscountType}
              discountPrice={discountPrice}
              setDiscountPrice={setDiscountPrice}
              afterDiscountPrice={afterDiscountPrice}
              stock={stock}
              setStock={setStock}
            />
          )}

          <h2 className="text-lg text-slate-700 font-semibold mb-4 mt-5">
            General Details
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-6 p-2 bg-white rounded-lg shadow-lg">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Max Purchase Limit (Max 5)
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="maxPurchaseLimit"
                value={maxPurchaseLimit}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    // Allow only whole numbers (digits only)
                    setMaxPurchaseLimit(value);
                  }
                }}
                min={0}
                max={5}
                step={1} // Prevents decimal inputs
                placeholder="Ex. 1 to 5"
                className={`mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.maxPurchaseLimit ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.maxPurchaseLimit && (
                <p className="text-red-500 text-sm">
                  {errors.maxPurchaseLimit}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="text-xs font-semibold text-gray-700">
                Dimension
              </label>
              <span className="text-red-500">*</span>
              <div
                className={`cursor-pointer bg-gray-50 border mt-2  rounded-md p-2 flex items-center justify-between text-xs ${
                  errors.dimensions ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => setIsDimensionOpen(!isDimensinonOpen)}
              >
                <span className="text-gray-700 font-medium">
                  Package Dimensions
                </span>
                <span className="text-gray-500">
                  {isDimensinonOpen ? "▲" : "▼"}
                </span>
              </div>

              {isDimensinonOpen && (
                <div className="absolute top-15 z-20 left-0 mt-2 border border-gray-300 rounded-lg p-3 bg-white shadow-sm transition-all">
                  {["Length", "Width", "Height"].map((dim) => (
                    <div
                      key={dim}
                      className="flex items-center justify-between mb-2"
                    >
                      <label className="w-1/4 text-xs font-medium text-gray-600">
                        {dim}
                      </label>
                      <div className="flex items-center w-3/4">
                        <input
                          type="number"
                          name={dim.toLowerCase()}
                          value={dimensions[dim.toLowerCase()]}
                          // onChange={handleDimensionChange}
                          onChange={handleInputChange(
                            setDimensions,
                            dim.toLowerCase(),
                            true
                          )}
                          placeholder={`${dim} (cm)`}
                          className={`border border-gray-300 text-xs px-2 py-1 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                            errors.dimensions
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.dimensions && (
                        <p className="text-red-500 text-sm">
                          {errors.dimensions}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Product Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleInputChange(setDescription, "description")}
                placeholder="Enter product description"
                className={`mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand"
                className={`mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.brand ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand}</p>
              )}
            </div>

            <div className="w-full ">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Search Tags <span className="text-red-500">*</span>
                </label>

                {/* Tooltip Wrapper */}
                <div className="relative group">
                  <FaQuestionCircle className="cursor-pointer text-gray-600 hover:text-gray-800" />

                  {/* Tooltip Box */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-gray-900 text-white text-xs rounded-md px-3 py-1 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
                    Enter keywords separated by commas. Helps in product search.
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              </div>

              {/* Tag Container */}
              <div className="flex flex-wrap mt-3 items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg bg-white focus-within:ring-1 focus-within:ring-blue-500 transition">
                {/* Render tags */}
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full shadow-sm transition hover:bg-blue-600"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(index)}
                      className="ml-2 p-1 rounded-full hover:bg-blue-700 transition"
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}

                {/* Input Field */}
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleTagInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Type & press ',' or 'Enter'..."
                  className="flex-grow outline-none text-sm px-2 py-1 bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Importer Details <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="importerDetails"
                value={importerDetails}
                onChange={handleInputChange(
                  setImporterDetails,
                  "importerDetails"
                )}
                placeholder="Enter Importer details"
                className={`mt-2 w-full text-xs p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.importerDetails ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.importerDetails}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Warrenty Period
              </label>

              <div className="border border-gray-300 rounded-[3px] mt-2">
                <select
                  className="ml-2 text-xs border-none text-slate-700 rounded-[3px] h-[35px] px-2"
                  value={warrentyPeriod}
                  onChange={(e) => setWarrentyPeriod(e.target.value)}
                >
                  {["No warranty", "3 Month", "6 Month", "1 year"].map(
                    (option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            
          </div>

          <ReturnPolicyForm returnPolicy={returnPolicy} setReturnPolicy={setReturnPolicy} />

          {highlights?.length > 0 && (
            <ProductHighlights highlights={highlights} />
          )}

          <h2 className="text-lg text-slate-700 font-semibold mb-4 mt-5">
            Other detail Setup
          </h2>

          <div className="w-full mt-2 bg-white  rounded-md ">
            {otherDetails.map((detail, index) => (
              <div className="flex items-center gap-3 mt-3" key={index}>
                <div className="flex-1">
                  <label className="pb-2 text-slate-700 font-medium text-md">
                    Enter key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={detail.key}
                    onChange={(e) =>
                      handleOtherDetailsChange(index, "key", e.target.value)
                    }
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ex: Model"
                  />
                </div>

                <div className="flex-1">
                  <label className="pb-2 text-slate-700 font-medium text-md">
                    Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={detail.value}
                    onChange={(e) =>
                      handleOtherDetailsChange(index, "value", e.target.value)
                    }
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ex: M2 pro"
                  />
                </div>

                <button
                  type="button"
                  className="mt-7 bg-red-500 text-white rounded-md px-3 py-1 h-[35px]"
                  onClick={() => handleRemoveField(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-3">
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md px-3 py-2"
                onClick={handleAddField}
              >
                Add another detail
              </button>
            </div>
          </div>

          <div className="w-full  flex items-center justify-end mt-5">
            <button
              className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <ImageModal
          open={open}
          onClose={() => setOpen(false)}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default ProductForm;
