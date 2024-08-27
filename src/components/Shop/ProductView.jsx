import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProducts } from '../../redux/actions/product';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';

const ProductView = () => {
    const { id } = useParams();
    console.log("id:", id)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { singleProduct } = useSelector((state) => state.products);

    console.log("singleProduct;", singleProduct)

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    // Fetch category on mount
    useEffect(() => {
        if (id) {
            dispatch(getSingleProducts(id));
        }
    }, [id, dispatch]);



    // Update state when singleCategory is fetched
    useEffect(() => {
        if (singleProduct) {
            setName(singleProduct?.name);
            setDescription(singleProduct?.description);
            setBrand(singleProduct?.brand)
            setMainCategory(singleProduct.category)
            setSubCategory(singleProduct.subcategory)
            setProductType(singleProduct?.productType)
            setSku(singleProduct?.sku)
            setDiscountPrice(singleProduct?.afterDiscountPrice)
            setDiscountType(singleProduct?.discountType)
            setUnit(singleProduct?.unit)
            setStock(singleProduct?.stock)
            setTaxAmount(singleProduct?.taxAmount)
            setShippingCost(singleProduct?.shippingCost)
            setImages(singleProduct?.images.map(img => img.url))
        }
    }, [singleProduct]);

    // Enable or disable submit button based on form validation
    useEffect(() => {
        if (name.length > 1 && images) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [name, images]);

    

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
            {/* <!-- Header --> */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Product Details</h2>
                <button className="text-sm text-blue-600 hover:underline">Edit</button>
            </div>

            {/* <!-- Product Overview --> */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* <!-- Product Image and Live View Button --> */}
                <div className="flex flex-col items-center lg:w-1/3  ">
                    {
                        singleProduct && singleProduct?.images?.length && (
                            <Carousel showArrows={true} autoPlay infiniteLoop>

                                {singleProduct.images.map((img, index) =>
                                    <div key={index} className="relative h-[40vh] w-full p-3">
                                        <img
                                            src={img.url}
                                            alt={singleProduct?.title}
                                            className=" object-cover h-full w-full"
                                        />
                                    </div>
                                )}


                            </Carousel>
                        )
                    }
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>navigate(`/product/${singleProduct?._id}`)}>View live</button>
                </div>

                {/* <!-- Product Details --> */}
                <div className="lg:w-2/3">


                    {/* <!-- Product Information --> */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">{name}</h3>
                        <p className="text-gray-700 mb-4">
                            Description: {description}
                        </p>
                    </div>

                    {singleProduct?.otherDetails && (
                        <div className="text-slate-600 font-[450] mt-2 text-[12px]">
                            {singleProduct.otherDetails.map((detail, index) => (
                                <div key={index}>
                                    <span className="font-semibold text-[14px]">{detail.key}:</span> {detail.value}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* <!-- Orders and Reviews --> */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="text-gray-700">{singleProduct?.sold_out} Sold</div>
                            <div className="text-blue-600">★ {singleProduct?.ratings ? singleProduct?.ratings : 1}</div>
                            <div className="text-gray-700">{singleProduct?.reviews.length ? singleProduct?.reviews.length : "No "} Reviews</div>
                        </div>
                        <div>
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">{singleProduct?.approved}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Product Statistics --> */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* <!-- Left Column (Sales Data) --> */}
                <div className="lg:w-1/3 bg-gray-100 p-4 rounded-lg">
                    <div className="mb-4">
                        <span className="block text-gray-600">Total Sold:</span>
                        <span className="text-xl font-bold">{singleProduct?.sold_out}</span>
                    </div>
                    <div>
                        <span className="block text-gray-600">Total Sold Amount:</span>
                        <span className="text-2xl font-bold text-blue-600">₹{singleProduct?.sold_out * singleProduct?.afterDiscountPrice}</span>
                    </div>
                </div>


                <div className="lg:w-2/3 flex flex-col gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-lg font-bold mb-2">General Information</h4>
                        <div className="grid md:grid-cols-2 md:gap-4 gap-2">
                            <div><span className="text-gray-600">Brand:</span> <span>{singleProduct?.brand}</span></div>
                            <div><span className="text-gray-600">Category:</span> <span>{singleProduct?.category}</span></div>
                            <div><span className="text-gray-600">Product type:</span> <span>{singleProduct?.productType}</span></div>
                            <div><span className="text-gray-600">Product Unit:</span> <span>{singleProduct?.unit}</span></div>
                            <div><span className="text-gray-600">Current Stock:</span> <span>{singleProduct?.stock}</span></div>
                            <div><span className="text-gray-600">Product SKU:</span> <span>{singleProduct?.sku}</span></div>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-lg font-bold mb-2">Price Information</h4>
                        <div className="grid md:grid-cols-2 md:gap-4 gap-2">
                            <div><span className="text-gray-600">Original Price:</span> <span>₹{singleProduct?.originalPrice}</span></div>
                            <div><span className="text-gray-600">Discount Amount:</span> <span>{singleProduct?.discountAmount} {singleProduct?.discountType === "Flat" ? "Rupees" : "%"}</span></div>
                            <div><span className="text-gray-600">After Discount Price:</span> <span>₹{singleProduct?.afterDiscountPrice} </span></div>
                            {/* <div><span className="text-gray-600">Tax:</span> <span>{singleProduct?.tax}% (exclude)</span></div> */}
                            <div><span className="text-gray-600">Shipping Cost:</span> <span>₹{singleProduct?.shippingCost}</span></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView