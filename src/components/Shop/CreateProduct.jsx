

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { colorNames } from "../../static/data";
import { toast } from "react-toastify";

import Loader from "../../pages/Loader";
import ProductPng from "../../components/Admin/icon/products.png";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaUser } from "react-icons/fa";
import Select from 'react-select';

import axios from "axios";
import { server } from "../../server";
import { htmlToText } from 'html-to-text';
import ImageModal from "../../utils/ImageModal";

const CreateProduct = () => {
    const { seller } = useSelector((state) => state.seller);
    const { allCategory } = useSelector((state) => state?.category);
    const { isLoading, success, error } = useSelector((state) => state.products);
    const { allSubCategory } = useSelector((state) => state?.subCategory);
    const { allSubSubCategory } = useSelector((state) => state?.subSubCategory);
    const { allBrand } = useSelector((state) => state?.brand);
    const { allAttribute } = useSelector((state) => state?.attribute);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [otherDetails, setOtherDetails] = useState([{ key: '', value: '' }]);
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mainCategory, setMainCategory] = useState("")
    const [subCategory, setSubCategory] = useState("");
    const [subSubCategory, setSubSubCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [productType, setProductType] = useState("")
    const [sku, setSku] = useState("")
    const [unit, setUnit] = useState("");
    const [tags, setTags] = useState("");
    const [customize, setCustomize] = useState('')
    const [originalPrice, setOriginalPrice] = useState();
    const [discountType, setDiscountType] = useState("")
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();
    const [taxAmount, setTaxAmount] = useState();
    const [shippingCost, setShippingCost] = useState("")
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [filteredSubSubCategories, setFilteredSubSubCategories] = useState([]);

    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});
    const [variations, setVariations] = useState([]);
    const [attributeOptions, setAttributeOptions] = useState([])
    const [colorImages, setColorImages] = useState({});
    const [imageFiles, setImageFiles] = useState({});
    const [bulletPoints, setBulletPoints] = useState([]);
    const [bulltLoading, setBulletLoading] = useState(false)
    const [keyPoints, setKeyPoints] = useState("")
    const [imageUploadLoading, setImageUploadLoading] = useState(false)

    const [afterDiscountPrice, setAfterDiscountPrice] = useState()
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
        setModalOpen(true);
    };

    useEffect(() => {
        if (discountType === "Flat") {
            setAfterDiscountPrice(originalPrice - discountPrice)
        } else {
            setAfterDiscountPrice(originalPrice - Math.ceil((discountPrice / 100) * originalPrice))
        }
    }, [discountPrice, originalPrice, discountType])


    useEffect(() => {
        const data = allAttribute?.map((item) => ({
            value: item.name,
            label: item.name,
        }));
        setAttributeOptions(data);
    }, [allAttribute]);

    const handleAttributeChange = (selectedOptions) => {
        setSelectedAttributes(selectedOptions);
        setAttributeValues({});
        setVariations([]);
    };

    const handleAttributeValueChange = (e, attribute) => {
        const value = e.target.value;
        setAttributeValues((prevValues) => ({
            ...prevValues,
            [attribute]: value,
        }));
    };

    const handleAddAttributeValue = (attribute) => {
        if (!attributeValues[attribute]) return;

        const newValues = {
            ...attributeValues,
            [attribute]: '',
            [attribute + 'List']: [...(attributeValues[attribute + 'List'] || []), attributeValues[attribute]],
        };

        setAttributeValues(newValues);
        updateVariations(selectedAttributes, newValues);
    };

    const updateVariations = (attributes, attributeValues) => {
        const newVariations = [];
        const attributeLists = attributes.map(
            (attr) => attributeValues[attr.value + "List"] || []
        );

        // Check if all attribute lists are empty
        if (attributeLists.every((list) => list.length === 0)) {
            return;
        }

        const generateCombinations = (lists, prefix = []) => {
            if (!lists.length) {
                newVariations.push([...prefix, { originalPrice: "", discountType: "", discountAmount: "", afterDiscountPrice: "", sku: "", stock: "", images: [] }]);
                return;
            }
            lists[0].forEach((item) => generateCombinations(lists.slice(1), [...prefix, item]));
        };

        generateCombinations(attributeLists);

        setVariations((prevVariations) => {
            const combinedVariations = [...prevVariations, ...newVariations];
            const uniqueVariations = Array.from(
                new Set(combinedVariations.map((v) => JSON.stringify(v)))
            ).map((e) => JSON.parse(e));
            return uniqueVariations.filter((variation) => {
                return selectedAttributes.every(
                    (attr) => variation[selectedAttributes.indexOf(attr)] !== ""
                );
            });
        });
    };

    const handleVariationChange = (index, field, value) => {
        const updatedVariations = [...variations];

        // Convert value to a number if field is originalPrice or discountAmount
        if (field === 'originalPrice' || field === 'discountAmount') {
            const numValue = parseFloat(value);
            updatedVariations[index][updatedVariations[index].length - 1][field] = isNaN(numValue) ? 0 : numValue;
        } else {
            updatedVariations[index][updatedVariations[index].length - 1][field] = value;
        }

        setVariations(updatedVariations);
    }

    const addMoreVariations = () => {
        const hasValidData = selectedAttributes.every(
            (attr) => attributeValues[attr.value + "List"]?.length > 0
        );

        if (hasValidData) {
            setVariations((prevVariations) => [
                ...prevVariations,
                [
                    ...selectedAttributes.map((attr) => ""), // Clear the selected attributes' values
                    { originalPrice: "", discountType: "", discountAmount: "", afterDiscountPrice: "", sku: "", stock: "", images: [] }, // Reset variation fields
                ],
            ]);

            setAttributeValues((prevValues) => {
                const clearedValues = {};
                selectedAttributes.forEach((attr) => {
                    clearedValues[attr.value] = ""; // Clear the input fields for the new row
                    clearedValues[attr.value + "List"] = []; // Clear the list of added values
                });
                return {
                    ...prevValues,
                    ...clearedValues,
                };
            });

            // Optionally, clear selected colors if `showColors` is true
            // setSelectedColors([]);
        } else {
            toast.info("Please enter valid attribute values before adding more.");
        }
    };

    const getVariationKey = useCallback((variation) => {
        return selectedAttributes
            .map((attr) => variation[selectedAttributes.indexOf(attr)])
            .join("-");
    }, [selectedAttributes]);

    const existingSKUs = new Set();

    const generateSKU = () => {
        const length = 8;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let sku = '';

        while (sku.length < length) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            sku += chars[randomIndex];
        }

        // Ensure uniqueness
        if (existingSKUs.has(sku)) {
            return generateSKU();
        }

        existingSKUs.add(sku);
        // return sku;
        setSku(sku)
    }

    const handleImageChange = (e) => {
        e.preventDefault()
        const files = Array.from(e?.target?.files);

        setImages((prevImages) => [...prevImages, ...files]);
    };

    const fileInputRef = useRef(null);

    const handleImageUpload = (event, variationKey) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        const fileURLs = fileArray.map((file) => URL.createObjectURL(file));

        setColorImages((prevImages) => ({
            ...prevImages,
            [variationKey]: [...(prevImages[variationKey] || []), ...fileURLs],
        }));

        setImageFiles((prevFiles) => ({
            ...prevFiles,
            [variationKey]: [...(prevFiles[variationKey] || []), ...fileArray],
        }));

        setVariations((prevVariations) =>
            prevVariations.map((variation) => {
                if (getVariationKey(variation) === variationKey) {
                    const updatedVariation = [...variation];
                    const lastIndex = updatedVariation.length - 1;
                    updatedVariation[lastIndex] = {
                        ...updatedVariation[lastIndex],
                        images: [...(updatedVariation[lastIndex].images || []), ...fileURLs],
                    };
                    return updatedVariation;
                }
                return variation;
            })
        );
    };

    const removeImage = (variationKey, index) => {
        setColorImages((prevImages) => {
            const updatedImages = [...prevImages[variationKey]];
            updatedImages.splice(index, 1);
            return {
                ...prevImages,
                [variationKey]: updatedImages,
            };
        });
    };

    const handleCategoryChange = useCallback((e) => {
        const selectedMainCategory = e.target.value;
        setMainCategory(selectedMainCategory);
        const filteredSubCategories = allSubCategory?.filter(subCat => subCat.mainCategory === selectedMainCategory);
        setFilteredSubCategories(filteredSubCategories);
    }, [setMainCategory, allSubCategory]);

    const handleDescriptionChange = (html) => {
        // Convert HTML to plain text
        const plainText = htmlToText(html, {
            wordwrap: 130, // You can adjust this value as needed
        });
        setDescription(plainText);
    };

    const handleSubCategoryChange = useCallback((e) => {
        const selectedSubCategory = e.target.value;
        setSubCategory(selectedSubCategory);
        const filteredSubCategories = allSubSubCategory.filter(subCat => subCat.subCategory === selectedSubCategory);
        setFilteredSubSubCategories(filteredSubCategories);
    }, [setSubCategory, allSubSubCategory]);


    const handleSubSubCategoryChange = useCallback((e) => {
        setSubSubCategory(e.target.value)
    }, [])

    const handleAddField = () => {
        setOtherDetails([...otherDetails, { key: '', value: '' }]);
    };

    const handleRemoveField = (index) => {
        const newDetails = otherDetails.filter((_, i) => i !== index);
        setOtherDetails(newDetails);
    };

    const handleInputChange = (index, field, value) => {
        const newDetails = otherDetails.map((detail, i) =>
            i === index ? { ...detail, [field]: value } : detail
        );
        setOtherDetails(newDetails);
    };

    const generateBulletPoints = async (e) => {

        e.preventDefault();
        setBulletLoading(true)
        try {
            const response = await axios.post(`${server}/product/generate-summary`, {
                name, brand, mainCategory, subCategory
            });
            console.log("res", response)

            setBulletPoints(response.data.bulletPoints);

            setBulletLoading(false)

        } catch (error) {
            console.error('Error generating bullet points:', error);
            setBulletLoading(false)
        }
    };

    useEffect(() => {
        let updated = false;
        const newVariations = variations.map((variation, index) => {
            const lastIndex = variation.length - 1;
            const { originalPrice, discountAmount, discountType } = variation[lastIndex];
            const afterDiscountPrice = calculateAfterDiscountPrice(originalPrice, discountAmount, discountType);

            if (variation[lastIndex].afterDiscountPrice !== afterDiscountPrice) {
                updated = true;
                return [
                    ...variation.slice(0, -1),
                    { ...variation[lastIndex], afterDiscountPrice }
                ];
            }
            return variation;
        });

        if (updated) {
            setVariations(newVariations);
        }
    }, [variations]);


    const calculateAfterDiscountPrice = (originalPrice, discountAmount, discountType) => {
        const originalPriceNum = Number(originalPrice);
        const discountAmountNum = Number(discountAmount);
        let afterDiscountPrice;

        if (isNaN(originalPriceNum) || isNaN(discountAmountNum)) {
            return '';
        }

        if (discountType === "Flat") {
            afterDiscountPrice = originalPriceNum - discountAmountNum;
        } else {
            afterDiscountPrice = originalPriceNum - Math.ceil((discountAmountNum / 100) * originalPriceNum);
        }

        return Math.max(afterDiscountPrice, 0);
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true); // Show general loading spinner

        const newForm = new FormData();
        const [uploadedMainImages, variantsData] = await Promise.all([
            (async () => {
                try {
                    // Upload main product images
                    const mainImagesForm = new FormData();
                    images.forEach((image) => {
                        mainImagesForm.append("images", image);
                    });

                    // Show loading spinner specific to image upload
                    setImageUploadLoading(true);
                    const mainImageUploadResponse = await axios.post(`${server}/product/uploadImages`, mainImagesForm, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    const uploadedMainImages = mainImageUploadResponse?.data;
                    setImageUploadLoading(false); // Hide loading spinner

                    newForm.append("images", JSON.stringify(uploadedMainImages));
                    return uploadedMainImages;
                } catch (error) {
                    setImageUploadLoading(false);
                    console.error("Error uploading main images:", error);
                    toast.error("Error uploading main images: " + (error.response?.data?.message || error.message));
                    throw error;
                }
            })(),

            (async () => {
                try {
                    // Proceed with uploading variant images and other product details
                    return await Promise.all(variations.map(async (variation) => {
                        const attributesArray = selectedAttributes.map((attr, i) => ({
                            key: attr.value,
                            value: variation[i],
                        }));
                        const variationKey = getVariationKey(variation);

                        const variantImagesForm = new FormData();
                        if (imageFiles[variationKey]) {
                            imageFiles[variationKey].forEach((image) => {
                                variantImagesForm.append("images", image);
                            });
                        }

                        // Upload variant images
                        const variantImageUploadResponse = await axios.post(`${server}/product/uploadImages`, variantImagesForm, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                        const uploadedVariantImages = variantImageUploadResponse.data;

                        return {
                            attributes: JSON.stringify(attributesArray),
                            originalPrice: variation[variation.length - 1].originalPrice,
                            discountType: variation[variation.length - 1].discountType,
                            discountAmount: variation[variation.length - 1].discountAmount,
                            afterDiscountPrice: variation[variation.length - 1].afterDiscountPrice,
                            sku: variation[variation.length - 1].sku,
                            stock: variation[variation.length - 1].stock,
                            images: uploadedVariantImages,  // Ensure this is an array of objects
                        };
                    }));
                } catch (error) {
                    console.error("Error uploading variant images:", error);
                    toast.error("Error uploading variant images: " + (error.response?.data?.message || error.message));
                    throw error;
                }
            })()
        ]);

        try {
            // Append product details
            newForm.append("name", name);
            newForm.append("description", description);
            newForm.append("category", mainCategory);
            newForm.append("subCategory", subCategory);
            newForm.append("subSubCategory", subSubCategory);
            newForm.append("brand", brand);
            newForm.append("productType", productType);
            newForm.append("sku", sku);
            newForm.append("unit", unit);
            newForm.append("tags", tags);
            newForm.append("keyPoints", keyPoints);
            newForm.append("customize", customize);
            newForm.append("originalPrice", originalPrice);
            newForm.append("dicountType", discountType);
            newForm.append("discountAmount", discountPrice);
            newForm.append("shippingCost", shippingCost);
            newForm.append("stock", stock);
            seller && newForm.append("shopId", seller._id);
            seller && newForm.append("productSource", "Seller");

            newForm.append("variants", JSON.stringify(variantsData));

            // Collect otherDetails from the form
            const otherDetail = otherDetails.map(detail => ({
                key: detail.key,
                value: detail.value
            }));

            // Append otherDetails as a JSON string
            newForm.append("otherDetails", JSON.stringify(otherDetail));

            // Dispatch the create product action
            await dispatch(createProduct(newForm));
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false); // Hide general loading spinner
        }
    }, [images, variations, getVariationKey, selectedAttributes, seller, imageFiles, name, description, mainCategory, subCategory, subSubCategory, brand, productType, sku, unit, tags, keyPoints, customize, originalPrice, discountType, discountPrice, shippingCost, stock, otherDetails, dispatch]);


    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        if (isLoading) {
            <Loader />
        }

        if (success) {
            toast.success("Product created successfully!");
            
            setTimeout(() => navigate("/dashboard-products"), 800)
        }
    }, [dispatch, error, success, isLoading, navigate]);


    return (
        <div className="w-full px-1 md:px-3 bg-gray-200">
            {/* create product form */}

            <div className='flex items-center gap-2'>
                <img src={ProductPng} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Add New Product</h3>
            </div>

            {/* first div */}

            <div className="w-full mt-2 bg-white p-3  rounded-md h-[60vh]">
                <div>
                    <label className="pb-2">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your product name..."
                    />
                </div>

                <div className="mt-3 ">
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>

                    <ReactQuill theme="snow" className="  md:h-[25vh] h-[20vh]" value={description} onChange={handleDescriptionChange} />
                </div>
            </div>

            {/* General setup */}

            <div className="w-full mt-2 bg-white p-3  rounded-md hover:shadow-md">
                <div className='flex items-center gap-2 mt-2 rounded-md bg-slate-200 p-3'>
                    <FaUser className="" size={25} />
                    <h3 className="text-[20px] text-slate-600 font-Poppins font-medium">General Setup</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 mt-3  gap-3">
                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md ">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full text-slate-500 mt-2 border h-[35px] rounded-[5px]" value={mainCategory} onChange={handleCategoryChange} >
                            <option value="Choose a category" className="text-slate-500">Choose a category</option>
                            {allCategory &&
                                allCategory.map((i) => (
                                    <option className="text-gray-600" value={i.name} key={i._id}>
                                        {i.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">Sub Category</label>

                        <select className="w-full text-slate-500 mt-2 border h-[35px] rounded-[5px]" value={subCategory} onChange={handleSubCategoryChange}>
                            <option >Choose a Sub category</option>
                            {filteredSubCategories?.map(category => (
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">Sub Sub-Category</label>
                        <select className="w-full text-slate-500 mt-2 border h-[35px] rounded-[5px]" value={subSubCategory} onChange={handleSubSubCategoryChange}>
                            <option value="" >Choose a Sub Sub-category</option>
                            {filteredSubSubCategories?.map(category => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div >
                        <label className="pb-2 text-slate-700 font-medium text-md">Brand</label>
                        <select className="w-full text-slate-500 mt-2 border h-[35px] rounded-[5px]" value={brand} onChange={(e) => setBrand(e.target.value)} >
                            <option value="Choose a category">Select Brand</option>
                            {allBrand &&
                                allBrand.map((i) => (
                                    <option className="text-gray-600" value={i.brandName} key={i._id}>
                                        {i.brandName}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div  >
                        <label className="pb-2 text-slate-700 font-medium text-md" for="type">Product Type</label>
                        <select id="type" className="w-full text-slate-500 mt-2 border h-[35px] rounded-[5px]" value={productType} onChange={(e) => setProductType(e.target.value)}>
                            <option value="" >Choose an type</option>
                            <option value="Physical" >Physical</option>
                            <option value="Digital" >Digital</option>
                        </select>
                    </div>

                    <div className="">
                        <label className="flex items-center justify-between mx-2  text-slate-700 font-medium text-md">
                            <div className=""> SKU</div>
                            <div className="text-blue-500 cursor-pointer text-sm hover:text-blue-600" onClick={generateSKU}>Generate sku</div>
                        </label>
                        <input
                            type="text"
                            name="sku"
                            value={sku}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            // onChange={(e) => setS(e.target.value)}
                            placeholder="Ex: 254677"
                        />
                    </div>

                    <div className="">
                        <label className="pb-2 text-slate-700 font-medium text-md">Unit</label>
                        <select id="type" className="w-full text-slate-500 mt-2 border h-[35px] rounded-[5px]" value={unit} onChange={(e) => setUnit(e.target.value)}>
                            <option value="" >Choose an Unit</option>
                            <option value="kg" >Kg</option>
                            <option value="gm" >Gm</option>
                            <option value="pc" >pc</option>
                            <option value="inch" >Inch</option>
                            <option value="m" >m</option>
                            <option value="cm" >cm</option>
                            <option value="ltrs" >ltrs</option>
                            <option value="pairs" >Pairs</option>
                        </select>
                    </div>

                    <div className="">
                        <label className="pb-2 text-slate-700 font-medium text-md">Search Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={tags}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter your product tags..."
                        />
                    </div>

                    <div className="">

                        <label className="pb-2 text-slate-700 font-medium text-md">Customize (Optional)</label>
                        <div className="border border-gray-300 rounded-[3px] mt-2">
                            <select
                                className="ml-2 border-none text-slate-700  rounded-[3px] h-[35px] px-2"
                                value={customize}
                                onChange={(e) => setCustomize(e.target.value)}
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                    </div>
                </div>


                {/* <button
                    type="button"
                    onClick={generateBulletPoints}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {bulltLoading ? <Loader /> : "Generate Bullet Points"}
                </button>

                {bulletPoints.length > 0 && (
                    <div className="mt-3">
                        <h4 className="text-lg font-medium">Generated Bullet Points:</h4>
                        <ul className="list-disc pl-5">
                            {bulletPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                )} */}


            </div>

            {/* Key points */}
            {/* <div className="w-full mt-2 bg-white p-3  rounded-md hover:shadow-md">
                <div>
                    <label className="pb-2">
                        Key Points: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        type="text"
                        cols={10}
                        rows={10}
                        name=""
                        value={keyPoints}
                        className="mt-2 appearance-none block w-full px-3  border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setKeyPoints(e.target.value)}
                        placeholder="Enter your product key points..."
                    />
                </div>
            </div> */}


            {/* Pricing & Others */}

            <div className="w-full mt-2 bg-white p-3  rounded-md hover:shadow-md">
                <div className='flex items-center gap-2 mt-2 rounded-md bg-slate-200 p-3'>
                    <FaUser className="" size={25} />
                    <h3 className="text-[20px] text-slate-600 font-Poppins font-medium">Pricing & Others</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 mt-3  gap-3">
                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">
                            Original Price
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={originalPrice}
                            min={0}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setOriginalPrice(e.target.value)}
                            placeholder="Enter your product price..."
                        />
                    </div>

                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">
                            Discount Type <span className="text-red-500">*</span>
                        </label>
                        <select id="type" className="w-full mt-2 border h-[35px] text-slate-600 rounded-[5px]" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                            <option className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value="" >Choose an type</option>
                            <option value="Flat" >Flat</option>
                            <option value="Percent" >Percent</option>
                        </select>
                    </div>

                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">
                            Discount Amount ({discountType === "Flat" ? "₹" : "%"}) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            min={0}
                            value={discountPrice}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            placeholder="Enter your product price with discount..."
                        />
                    </div>

                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">
                            Price After Discount
                        </label>
                        <input
                            type="number"
                            name="price"
                            min={0}
                            value={afterDiscountPrice}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            readOnly
                            placeholder="Ex: 300"
                        />
                    </div>

                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">
                            Product Stock <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            min={0}
                            value={stock}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="ex: 10"
                        />
                    </div>

                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">
                            Tax amount (%) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={taxAmount}
                            min={0}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setTaxAmount(e.target.value)}
                            placeholder="Enter your product tax amount"
                        />
                    </div>

                    <div>
                        <label className="pb-2 text-slate-700 font-medium text-md">
                            Shipping Cost <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            min={0}
                            value={shippingCost}
                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setShippingCost(e.target.value)}
                            placeholder="Enter your shipping cost..."
                        />
                    </div>

                </div>
            </div>

            {/* Other details setup */}

            <div className="w-full mt-2 bg-white p-3 rounded-md hover:shadow-md">
                <div className='flex items-center gap-2 mt-2 rounded-md bg-slate-200 p-3'>
                    <FaUser className="" size={25} />
                    <h3 className="text-[20px] text-slate-600 font-Poppins font-medium">Other details setup</h3>
                </div>

                {otherDetails.map((detail, index) => (
                    <div className="flex items-center gap-3 mt-3" key={index}>
                        <div className="flex-1">
                            <label className="pb-2 text-slate-700 font-medium text-md">
                                Enter key <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={detail.key}
                                onChange={(e) => handleInputChange(index, 'key', e.target.value)}
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
                                onChange={(e) => handleInputChange(index, 'value', e.target.value)}
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

                {/* <div className="mt-3">
                    <button
                        type="button"
                        className="bg-green-500 text-white rounded-md px-3 py-2"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div> */}
            </div>

            {/* Product  variation setup */}

            <div className="w-full mt-2 bg-white p-3 rounded-md hover:shadow-md">
                <div className="flex items-center gap-2 mt-2 rounded-md bg-slate-200 p-3">
                    <FaUser size={25} />
                    <h3 className="text-[20px] text-slate-600 font-Poppins font-medium">Variation Setup</h3>
                </div>

                <div className="items-center justify-around grid grid-cols-1 lg:grid-cols-2 gap-1 mt-2">


                    <div className="mb-2">
                        <label
                            htmlFor="attribute"
                            className="block text-lg font-medium text-gray-700"
                        >
                            Select Attributes :
                        </label>
                        <Select
                            options={attributeOptions}
                            value={selectedAttributes}
                            onChange={handleAttributeChange}
                            isMulti
                        />
                    </div>

                    {selectedAttributes.map((attribute) => (
                        <div key={attribute.value} className="mb-2">
                            <label
                                className="block text-lg font-medium text-gray-700"
                                htmlFor={attribute.value}
                            >
                                {attribute.label} :
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={attributeValues[attribute.value] || ''}
                                    onChange={(e) => handleAttributeValueChange(e, attribute.value)}
                                    placeholder={`Enter ${attribute.label}`}
                                    className="mt-1 block w-full px-4 py-1.5 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleAddAttributeValue(attribute.value)}
                                    className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {(attributeValues[attribute.value + 'List'] || []).map(
                                    (value, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-200 text-gray-700"
                                        >
                                            {value}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {variations.length > 0 && (
                    <div className="border-2 md:w-[80vw] w-full rounded-md overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {selectedAttributes.map((attribute) => (
                                        <th
                                            key={attribute.value}
                                            className="px-3  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {attribute.label}
                                        </th>
                                    ))}

                                    <th className="px-3 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        originalPrice
                                    </th>
                                    <th className="px-3 py-3    text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        discountType
                                    </th>
                                    <th className="px-3 py-3   text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        discountAmount
                                    </th>
                                    <th className="px-3 py-3   text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        afterDiscountPrice
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        SKU
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>


                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>

                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {variations.map((variation, index) => {
                                    const lastIndex = variation.length - 1;
                                    return (
                                        <tr key={index}>
                                            {variation.slice(0, -1).map((value, idx) => (
                                                <td
                                                    key={idx}
                                                    className="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {value}
                                                </td>
                                            ))}
                                            <td className="px-3 py-4  whitespace-nowrap text-sm text-gray-500">
                                                <input
                                                    type="number"
                                                    placeholder="Original Price.."
                                                    value={variation[lastIndex].originalPrice}
                                                    min={0}
                                                    onChange={(e) =>
                                                        handleVariationChange(
                                                            index,
                                                            'originalPrice',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border  w-[100px] rounded px-2 py-1"
                                                />
                                            </td>

                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div>

                                                    <select
                                                        value={variation[lastIndex].discountType}
                                                        onChange={(e) =>
                                                            handleVariationChange(
                                                                index,
                                                                'discountType',
                                                                e.target.value
                                                            )
                                                        }
                                                        className=" appearance-none block  w-[130px] px-3 h-[30px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    >
                                                        <option value="" disabled>Discount type</option>
                                                        <option value="Flat">Flat</option>
                                                        <option value="Percent">Percentage</option>
                                                        {/* Add more options as needed */}
                                                    </select>
                                                </div>
                                            </td>

                                            <td className="px-3 py-4  whitespace-nowrap text-sm text-gray-500">
                                                <input
                                                    type="number"
                                                    placeholder="Discount amount.."
                                                    value={variation[lastIndex].discountAmount}
                                                    min={0}
                                                    onChange={(e) =>
                                                        handleVariationChange(
                                                            index,
                                                            'discountAmount',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border  w-[100px] rounded px-2 py-1"
                                                />
                                            </td>

                                            <td className="px-3 py-4  whitespace-nowrap text-sm text-gray-500">
                                                <input
                                                    type="number"
                                                    placeholder="Ex: 500"
                                                    value={variation[lastIndex].afterDiscountPrice}
                                                    readOnly
                                                    className="border  w-[100px] rounded px-2 py-1 bg-gray-100"
                                                />
                                            </td>

                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <input
                                                    type="text"
                                                    value={variation[lastIndex].sku}
                                                    placeholder="Enter sku.."
                                                    onChange={(e) =>
                                                        handleVariationChange(
                                                            index,
                                                            'sku',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border  w-[100px] rounded px-2 py-1"
                                                />
                                            </td>


                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <input
                                                    type="number"
                                                    placeholder="Enter stock..."
                                                    min={0}
                                                    value={variation[lastIndex].stock}
                                                    onChange={(e) =>
                                                        handleVariationChange(
                                                            index,
                                                            'stock',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border  w-[100px] rounded px-2 py-1"
                                                />
                                            </td>


                                            <td className="px-4  whitespace-nowrap text-gray-500">
                                                <div className="flex items-center gap-2  rounded-md p-2">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => handleImageUpload(e, getVariationKey(variation))}
                                                        className="hidden"
                                                        ref={fileInputRef}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current.click()}
                                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Add Image
                                                    </button>
                                                    <div className="flex gap-2 overflow-x-auto">
                                                        {colorImages[getVariationKey(variation)]?.map((url, imgIndex) => (
                                                            <div key={imgIndex} className="relative w-[60px] h-[50px]" >
                                                                <img
                                                                    src={url}
                                                                    alt={`Color ${variation[selectedAttributes.length]}-${imgIndex}`}
                                                                    className="w-full h-full object-cover rounded-md cursor-pointer"
                                                                    onClick={(e) => handleImageClick(url)}
                                                                />

                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeImage(getVariationKey(variation), imgIndex)}
                                                                    className="absolute  top-0 right-0 flex items-center j bg-red-600 text-white rounded-full px-[4px]"
                                                                >
                                                                    &times;
                                                                </button>

                                                                
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}



                <div className="mt-5 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={addMoreVariations}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add More
                    </button>
                </div>
            </div>

            {/* product image */}

            <div className="w-full mt-2 bg-white p-3  rounded-md hover:shadow-md">
                <div className='flex items-center gap-2 mt-2 rounded-md bg-slate-200 p-3'>
                    <FaUser className="" size={25} />
                    <h3 className="text-[20px] text-slate-600 font-Poppins font-medium">Upload Images</h3>
                </div>

                <div>
                    <label className="pb-2">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input type="file" name="" id="upload" className="hidden" multiple onChange={handleImageChange} />
                    <div className="w-full flex items-center flex-wrap">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                        </label>
                        {images && images.map((i) => (
                            <img src={URL.createObjectURL(i)} key={i} alt="" className="h-[150px] w-[130px] object-cover m-2 border-2" />
                        ))}
                    </div>

                </div>

            </div>

            <div className="w-full  flex items-center justify-center">
                <button className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 " onClick={handleSubmit} >
                    {isLoading || loading || imageUploadLoading ? (<Loader />) : "Submit"}
                </button>
            </div>


            {modalOpen && (
                <ImageModal open={open} onClose={() => setOpen(false)} image={selectedImage} />
            )}
        </div>
    );
};

export default CreateProduct;



