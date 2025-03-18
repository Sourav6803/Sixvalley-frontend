import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import axios from "axios";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { TbMoneybag } from "react-icons/tb";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Rating, ThinStar } from "@smastrom/react-rating";
import Loader from "../../pages/Loader";
import "@smastrom/react-rating/style.css";
import insurence from "../../Assests/insurance.png";
import ProductAttributes from "./ProductAttributes";
import ProductKeyPoints from "./ProductKeyPoints";
import ReviewsSection from "../Review/ReviewSection";
import SellerDetails from "./SellerDetails";
import StickyActionBar from "./StickyActionBar";
import ProductVariations from "./ProductVariants";


const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state?.wishlist);
  const { products } = useSelector((state) => state?.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state?.cart);
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [invalidCombo, setInvalidCombo] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [currentVariant, setCurrentVariant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allCoupons, setAllCoupons] = useState([]);

  const reviews = data?.reviews || [];

  const ratingData = {
    reviews: data?.reviews?.map((review) => ({
      userName: review.user?.name || "Anonymous",
      userAvatar: review.user?.avatar?.url || "/default-avatar.png",
      rating: review.rating,
      comment: review.comment,
      images: review.images?.map((img) => img.url) || [],
      pros: review.pros || [],
      cons: review.cons || [],
      purchaseVerified: review.purchaseVerified,
      helpfulVotes: review.helpfulVotes,
      notHelpfulVotes: review.notHelpfulVotes,
      reported: review.reported,
      createdAt: new Date(review.createdAt).toLocaleDateString(),
    })) || [],
    
    ratingBreakdown: data?.ratings?.ratingBreakdown || {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  
    totalRatings: data?.ratings?.totalRating || 0,
    averageRating: data?.ratings?.averageRating || 0,
  };

  const productArr = [data];

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${day.toString().padStart(2, "0")} ${
      monthNames[month]
    }, ${year.toString().slice(-2)}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(`${server}/cupon/active`, {
          withCredentials: true,
        });
        setAllCoupons(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, [user?._id]);

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "green",
    inactiveFillColor: "#fbf1a9",
  };

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop?._id));
    if (wishlist && wishlist.find((i) => i?._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, dispatch]);

  // Extract unique attribute keys
  const attributeKeys = (data?.variants || []).reduce((keys, variant) => {
    variant.attributes.forEach((attr) => {
      if (!keys.includes(attr.key)) {
        keys.push(attr.key);
      }
    });
    return keys;
  }, []);


  useEffect(() => {
    // Update current variant and check combo validity
    const matchingVariant = data?.variants.find((variant) =>
      variant.attributes.every(
        (attr) => selectedAttributes[attr.key] === attr.value
      )
    );
    if (matchingVariant) {
      setCurrentVariant(matchingVariant);
      setInvalidCombo(false);
    } else {
      setCurrentVariant(null);
      setInvalidCombo(true);
    }
  }, [selectedAttributes, data]);

  const handleAttributeChange = (key, value) => {
    const updatedAttributes = { ...selectedAttributes, [key]: value };
    setSelectedAttributes(updatedAttributes);

    // Find the matching variant based on the selected attributes
    const matchingVariant = data.variants.find((variant) =>
      variant.attributes.every(
        (attr) => updatedAttributes[attr.key] === attr.value
      )
    );

    setCurrentVariant(matchingVariant || null);
  };

  useEffect(() => {
    if (data?.variants?.length > 0) {
      const firstVariant = data.variants[0];
      
      // Extract default selected attributes from the first variant
      const defaultAttributes = firstVariant.attributes.reduce((acc, attr) => {
        acc[attr.key] = attr.value;
        return acc;
      }, {});
  
      setSelectedAttributes(defaultAttributes);
      setCurrentVariant(firstVariant);
    }
  }, [data?.variants]);
  

  // Reusable function to log user activity
  const logActivity = useCallback(
    async (type, productId) => {
      try {
        if (productId && user?._id) {
          await axios.post(`${server}/activity/logActivity`, {
            userId: user._id,
            type,
            productId,
          });
        }
      } catch (error) {
        console.error(`Error logging ${type} activity:`, error.message);
      }
    },
    [user]
  );

  // Reusable function to track campaign interactions
  const trackInteraction = useCallback(
    async (interactionType, productId) => {
      try {
        const campaignId = data?.campaignInfo?.campaignId || null;
        await axios.post(`${server}/campaign/trackInteraction`, {
          productId,
          campaignId,
          interactionType,
        });
      } catch (error) {
        console.error(
          `Error tracking ${interactionType} interaction:`,
          error.message
        );
      }
    },
    [data]
  );

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = async (id) => {

    const isItemExists = cart?.some((item) =>
      currentVariant ? item.variantId === currentVariant._id : item.productId === data?._id
    );
    // Check if a variant is selected
    if (currentVariant) {
      // Create the cart item with the selected variant details

      // Ensure variant has stock
      if (currentVariant.stock < count) {
        toast.error("Selected variant is out of stock!");
        return;
      }
      const cartData = {
        
        currentVariant,
        ...data, // Include current variant details
        qty: count, // Include quantity
      };

      // Check if the item already exists in the cart
      const isItemExists =
        cart &&
        cart?.some((item) =>
          currentVariant ? item.currentVariant._id === currentVariant._id : item.productId === data?._id
        );;
      if (isItemExists) {
        toast.error("Item with the selected variant is already in the cart!");
      } else {
        if (currentVariant.stock < count) {
          toast.error("Product stock limited!");
        } else {
          dispatch(addTocart(cartData));
          toast.success("Item added to cart successfully!");
          user?._id &&
            data._id &&
            (await axios.post(`${server}/activity/logActivity`, {
              userId: user?._id,
              type: "add_to_cart",
              productId: data._id, // Make sure `data` holds the current product details
            }));
        }
      }
    } else {
      // Handle the case where no variant is selected
      const isItemExists = cart && cart.find((item) => item._id === id);
      if (isItemExists) {
        toast.error("Item already in cart!");
      } else {
        if (data.stock < count) {
          toast.error("Product stock limited!");
        } else {
          await logActivity("click", data?._id);
          await trackInteraction("click", data?._id); // Now this should always execute
          const cartData = { ...data, qty: count };
          dispatch(addTocart(cartData));
          toast.success("Item added to cart successfully!");
          user?._id &&
            data?._id &&
            (await axios.post(`${server}/activity/logActivity`, {
              userId: user._id,
              type: "add_to_cart",
              productId: data._id, // Make sure `data` holds the current product details
            }));
        }
      }
    }
  };

  const decreamentCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increamentCount = () => {
    if (count <= 4) {
      setCount(count + 1);
    }
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data?.name;
      const userId = user?._id;
      const sellerId = data?.shopId;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data?.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const totalReviewsLength =
  products?.reduce((acc, product) => acc + (product?.reviews?.length || 0), 0) || 0;

  const totalRatings =
    products?.reduce(
      (acc, product) =>
        acc + (product?.reviews?.reduce((sum, review) => sum + (review?.rating || 0), 0) || 0),
      0
    ) || 0;

  const averageRating = totalReviewsLength > 0 ? Math.ceil(totalRatings / totalReviewsLength) : 0;

  const date = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const logProductView = async () => {
      if (data?._id && user?._id) {
        // Check if product and user data exist
        try {
          await axios.post(`${server}/activity/logActivity`, {
            userId: user?._id,
            type: "view",
            productId: data?._id,
          });
        } catch (error) {
          console.error("Error logging product view:", error.message);
        }
      }
    };

    logProductView();
  }, [data?._id, user?._id]);

  useEffect(() => {
    // Set a timer to log the view event after 6 seconds (6000ms)
    const timer = setTimeout(() => {
      logProductView();
    }, 6000);

    // Function to log the product view
    const logProductView = async () => {
      if (data?._id && user?._id) {
        // Check if product and user data exist
        try {
          await axios.post(`${server}/activity/logActivity`, {
            userId: user?._id,
            type: "view",
            productId: data?._id,
          });
        } catch (error) {
          console.error("Error logging product view:", error.message);
        }
      }
    };

    // Clean up the timer if the user leaves the page before 6 seconds
    return () => clearTimeout(timer);
  }, [data?._id, user?._id]);

 
  return (
    <div className="bg-white ">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {data ? (
            <div className={`${styles.section} w-[100%] 80px:w-[80%] `}>
              <div className="w-full py-0">
                <div className="block w-full 800px:flex">

                  <div className="w-full p-2 rounded-md 800px:w-[50%]">
                    {data && data?.images?.length && (
                      <Carousel
                        showArrows={true}
                        autoPlay
                        infiniteLoop
                        className="w-full flex flex-col items-center"
                      >
                        {(currentVariant?.images?.length ? currentVariant.images : data.images).map((img, index) => (
                          <div key={index} className="relative w-full flex justify-center">
                            <img
                              src={img.url}
                              alt={data?.title}
                              className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] object-contain rounded-lg"
                            />
                          </div>
                        ))}
                      </Carousel>
                    )}
                  </div>


                  <div className="w-full 800px:w-[50%] ml-1 p-3">
                    {/* <h1 className={`${styles.productTitle} mt-3 !text-[18px] !text-slate-700`}>{data.name } ({currentVariant && currentVariant?.Size} {currentVariant && currentVariant?.Color}) </h1> */}
                    <h1
                      className={`${styles.productTitle} mt-3 !text-[18px] !text-slate-700`}
                    >
                      {data?.name}
                      {currentVariant
                        ? ` (${currentVariant.attributes
                            .map((attr) => `${attr.key} ${attr.value}`)
                            .join(", ")})`
                        : ""}
                    </h1>

                    <h3 className={`${styles.shop_name} pb-1 pt-1 `}>
                      <span className="!text-slate-700 font-medium ">
                        Seller:
                      </span>{" "}
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        {data?.shop?.shopName}
                      </Link>
                    </h3>

                    <div className="flex items-center gap-3 ">
                      <Rating
                        itemStyles={myStyles}
                        className="h-[30px] w-[30px] text-green-500"
                        style={{ maxWidth: 100 }}
                        readOnly
                        value={Math.ceil(data?.ratings?.averageRating)}
                      />
                      <p className="text-[14px] font-semibold text-blue-500">
                        ( {data?.reviews?.length} ratings)
                      </p>
                    </div>

                    <div className="flex pt-1">
                      <h4 className={`${styles.productDiscountPrice} mt-1`}>
                        ₹
                        {currentVariant?.afterDiscountPrice ??
                          data?.afterDiscountPrice}
                      </h4>
                      <h3 className={`${styles.price} !mt-1`}>
                        ₹{currentVariant?.originalPrice ?? data?.originalPrice}
                      </h3>

                      {currentVariant?.discountType ? (
                        currentVariant.discountType === "Flat" ? (
                          <p className="mt-1 ml-3 font-bold text-green-800">
                            Flat ₹{currentVariant.discountAmount} off
                          </p>
                        ) : (
                          <p className="mt-1 ml-3 font-bold text-green-800">
                            {currentVariant.discountAmount}% off
                          </p>
                        )
                      ) : data?.dicountType === "Flat" ? (
                        <p className="mt-1 ml-3 font-bold text-green-800">
                          Flat ₹{data.discountAmount} off
                        </p>
                      ) : (
                        <p className="mt-1 ml-3 font-bold text-green-800">
                          {data?.discountAmount}% off
                        </p>
                      )}
                    </div>

                    <div className="mt-2">
                      {attributeKeys.map((key) => (
                        <div key={key} className="mb-4">
                          <label className="block text-base text-slate-600 font-semibold mb-2">
                            {key}:
                          </label>
                          <div className="flex gap-2">
                            {[
                              ...new Set(
                                data?.variants.map(
                                  (variant) =>
                                    variant.attributes.find(
                                      (attr) => attr.key === key
                                    )?.value
                                )
                              ),
                            ]
                              .filter(Boolean)
                              .map((value) => {
                                // Find the corresponding variant stock
                                const matchedVariant = data?.variants.find(
                                  (variant) =>
                                    variant.attributes.every((attr) =>
                                      selectedAttributes[attr.key]
                                        ? selectedAttributes[attr.key] ===
                                          attr.value
                                        : true
                                    )
                                );

                                const stock = matchedVariant?.stock || 0;
                                const isOutOfStock = stock === 0;
                                const isLowStock = stock > 0 && stock < 5;

                                return (
                                  <button
                                    key={value}
                                    onClick={() =>
                                      !isOutOfStock &&
                                      handleAttributeChange(key, value)
                                    }
                                    className={`py-1 px-3 rounded-md flex items-center justify-center cursor-pointer border
                      ${
                        selectedAttributes[key] === value
                          ? " bg-blue-700 text-white"
                          : "border-gray-300 bg-gray-100"
                      }
                      ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}
                      ${isLowStock ? "border-yellow-500 bg-yellow-100" : ""}
                    `}
                                    disabled={isOutOfStock}
                                  >
                                    {key === "Color" ? (
                                      <span
                                        className="w-5 h-5 !rounded-full"
                                        style={{
                                          backgroundColor: value?.toLowerCase(),
                                        }}
                                      />
                                    ) : (
                                      value
                                    )}

                                   
                                    {isLowStock && (
                                      <span className="text-xs text-yellow-600 ml-2">
                                        (Low Stock)
                                      </span>
                                    )}
                                    {isOutOfStock && (
                                      <span className="text-xs text-red-600 ml-2">
                                        (Out of Stock)
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>


                    {/* Product Variations Component */}
      <ProductVariations
        data={data}
        attributeKeys={attributeKeys}
        selectedAttributes={selectedAttributes}
        handleAttributeChange={handleAttributeChange}
      />

                    {invalidCombo && currentVariant !== null && (
                      <div className="mt-4 text-red-500">
                        <p>Selected combination is not available.</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 sm:gap-4 mt-4">
                      {/* Decrease Button */}
                      <button
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-xl 
                                  rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={decreamentCount}
                        disabled={count <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      {/* Quantity Display */}
                      <span
                        className="w-12 h-10 sm:w-16 sm:h-12 flex items-center justify-center bg-white text-gray-900 font-semibold 
                                    text-lg border border-gray-300 rounded-lg shadow-sm select-none"
                      >
                        {count}
                      </span>

                      {/* Increase Button */}
                      <button
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-teal-500 text-white font-bold text-xl 
                                  rounded-lg hover:bg-teal-600 active:scale-95 transition-all duration-200"
                        onClick={increamentCount}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="py-2 mt-1">
                      {allCoupons &&
                      allCoupons.some((coupon) => {
                        const eligibleItems = productArr.filter(
                          (item) =>
                            coupon.couponCategory === "All" ||
                            item.category === coupon.couponCategory
                        );
                        const eligiblePrice = eligibleItems.reduce(
                          (acc, item) => acc + item.afterDiscountPrice,
                          0
                        );
                        return eligiblePrice >= coupon.minPurchase;
                      }) ? (
                        <div>
                          <div className="text-slate-700 font-medium text-lg mb-3">
                            <h1>Offers for you</h1>
                          </div>

                          <div className="bg-gray-100 p-3 rounded-lg shadow-md border border-gray-300">
                            {allCoupons
                              .filter((coupon) => {
                                const eligibleItems = productArr.filter(
                                  (item) =>
                                    coupon.couponCategory === "All" ||
                                    item.category === coupon.couponCategory
                                );
                                const eligiblePrice = eligibleItems.reduce(
                                  (acc, item) => acc + item.afterDiscountPrice,
                                  0
                                );
                                return eligiblePrice >= coupon.minPurchase; // Filter out non-eligible coupons
                              })
                              .map((coupon, index) => {
                                const handleCopy = () => {
                                  navigator.clipboard
                                    .writeText(coupon.couponCode)
                                    .then(() => {
                                      toast.success(
                                        `Coupon code ${coupon.couponCode} copied to clipboard!`
                                      );
                                    })
                                    .catch((err) => {
                                      toast.error("Failed to copy text: ", err);
                                    });
                                };

                                return (
                                  <div key={index} className="mb-4">
                                    <h3 className="text-sm font-bold text-gray-700">
                                      Get ₹{coupon?.discountAmount} Off on
                                      orders above ₹{coupon?.minPurchase}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                      Valid until{" "}
                                      {formatDate(coupon?.expireDate)}
                                    </p>
                                    {coupon.couponType === "First Order" && (
                                      <p className="text-sm text-green-700 italic">
                                        First-time customers only
                                      </p>
                                    )}
                                    {coupon?.couponCategory !== "All" && (
                                      <p className="text-sm text-green-700 italic">
                                        Valid for {coupon?.couponCategory}{" "}
                                        category
                                      </p>
                                    )}

                                    <div className="flex justify-between items-center mt-2">
                                      <div className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-lg border border-green-300">
                                        {coupon.couponCode}
                                      </div>
                                      <button
                                        className="bg-blue-100 text-blue-600 border border-blue-400 px-3 py-1 rounded-lg ml-2 hover:bg-blue-200"
                                        onClick={handleCopy}
                                      >
                                        Copy Code
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500 italic">
                          No available offers for this product at the moment.
                        </div>
                      )}
                    </div>

                    <div className="py-2 mt-1">
                      <div className="text-slate-700 font-medium text-base">
                        Return & Exchange Policy
                      </div>

                      <div className="text-slate-600 font-[450] mt-2 text-[12px]">
                        <p className="leading-[14px]">
                          This product is eligable for returns and size
                          reolacement. Plese initiate return/replacement from
                          the "My Orders" section in the app within 7 days of
                          delivery. Please ensure the product is in its original
                          condition with all tags attached.
                        </p>
                      </div>
                    </div>

                    <div className="py-2 mt-1">
                      {/* Product title */}
                      <div className="text-slate-700 font-medium text-base">
                        Description
                      </div>

                      {/* Product description */}
                      <div className="text-slate-600 font-[450] mt-2 text-[12px]">
                        {data?.description}
                      </div>

                      <ProductKeyPoints keyPoints={data?.keyPoints} />

                      <ProductAttributes
                        attributeSection={data?.attributeSection}
                      />

                      {data?.otherDetails?.length > 1 && (
                        <h1 className="text-slate-700 font-medium text-base">
                          Additional Information
                        </h1>
                      )}

                      {data?.otherDetails?.length > 1 && (
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                            Other Details
                          </h3>
                          <div className="divide-y">
                            {data.otherDetails.map((detail, index) => (
                              <div
                                key={index}
                                className="flex justify-between py-2 border-b border-gray-200"
                              >
                                <span className="font-medium text-gray-600">
                                  {detail?.key}:
                                </span>
                                <span className="text-gray-800">
                                  {detail?.value || "N/A"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:flex hidden">
                      {click ? (
                        <div
                          className={`${styles.button} !bg-white !border-2 !border-red-500 !mt-3  !rounded !h-11 flex items-center`}
                          onClick={() => removeFromWishlistHandler(data)}
                          title="Remove from wishlist"
                        >
                          <span className="text-[#070707] flex items-center">
                            {" "}
                            <AiFillHeart
                              size={20}
                              color={click ? "red" : "#333"}
                              className="mr-3"
                            />{" "}
                            WISHLIST{" "}
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`${styles.button} !bg-white !border-2 !border-red-500  !mt-3  !rounded !h-11 flex items-center`}
                          onClick={() => addToWishlistHandler(data)}
                          title="Add to wishlist"
                        >
                          <span className="text-[#070707] flex items-center">
                            {" "}
                            <AiFillHeart
                              size={20}
                              color={click ? "red" : "#333"}
                              className="mr-3"
                            />{" "}
                            WISHLIST{" "}
                          </span>
                        </div>
                      )}

                      {isAuthenticated ? (
                        <div
                          className={`${styles.button} !mt-3 !rounded !h-11 flex items-center ml-3`}
                          onClick={() => addToCartHandler(data?._id)}
                        >
                          <span className="text-[#fff] flex items-center">
                            Add to Cart{" "}
                            <AiOutlineShoppingCart className="ml-1" />
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`${styles.button} !mt-3 !rounded !h-11 flex items-center ml-3`}
                          onClick={() =>
                            toast.info(
                              "You need to log in to add items to the cart."
                            )
                          }
                        >
                          <span className="text-[#fff] flex items-center">
                            Add to Cart{" "}
                            <AiOutlineShoppingCart className="ml-1" />
                          </span>
                        </div>
                      )}
                    </div>

                    <StickyActionBar
                      click={click}
                      isAuthenticated={isAuthenticated}
                      addToWishlistHandler={addToWishlistHandler}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                      data={data}
                      currentVariant={currentVariant}
                      cart={cart}
                    />

                    <div className="mt-1">
                      {data && data.stock <= 9 ? (
                        <p className="text-red-500 font-normal text-sm">
                          Hurry Up! Only few prodcts are left
                        </p>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="mt-3">
                      <h5 className="flex">
                        <TbTruckDelivery
                          size={30}
                          className="inline-block ms-3"
                        />
                        {data.discountPrice >= 399 ? (
                          <p className="text-green-600  font-bold  ml-5">
                            FREE Delivery{" "}
                            <span className="line-through text-black">40</span>
                          </p>
                        ) : (
                          <span className="flex mt-1 ml-3 ">
                            {" "}
                            <FaRupeeSign className="mt-1" /> 40
                          </span>
                        )}
                      </h5>
                    </div>

                    <div>
                      <p className="text-slate-700">
                        Expected Delivery Date {date.toDateString()}
                      </p>
                    </div>

                    <div className=" mt-3 flex mr-3">
                      <CiLocationOn size={20} />
                      <p className="ml-3 text-slate-700">
                        {" "}
                        Deliver to {user?.name} - {user?.addresses[0]?.address1}{" "}
                        {user?.addresses[0]?.zipCode}
                      </p>
                    </div>

                    <div className="mt-3 flex">
                      <TbMoneybag size={20} className="mr-3 text-yellow-600" />
                      <p className="text-slate-700">
                        Pay On Delivery Available
                      </p>
                    </div>

                    <div className="mt-3 flex  item-center gap-3 text-slate-700">
                      <div className="flex items-center">
                        <img src={insurence} alt="" height={60} width={30} />
                      </div>

                      <div className="text-slate-600 mt-1  ">
                        <p>100% Original Products</p>
                        <p>With Assured Brand Warrenty</p>
                      </div>
                    </div>

                    <SellerDetails data={data} seller={seller} averageRating={averageRating} handleMessageSubmit={handleMessageSubmit} />

                    <ReviewsSection reviews={reviews} ratingData={ratingData} />
                  </div>
                </div>
              </div>
             
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};


export default ProductDetails;
