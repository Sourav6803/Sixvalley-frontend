import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import { BsFillStarFill } from "react-icons/bs";
import axios from "axios";
import { server } from "../../../server";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count] = useState(1); // Keeping it constant for now
  const dispatch = useDispatch();

   // Default to first variant if available
   const [selectedVariant] = useState(data?.variants?.[0] || {});

  useEffect(() => {
    setClick(wishlist?.some((i) => i?._id === data?._id));
  }, [wishlist, data?._id]);

  const removeFromWishlistHandler = useCallback(() => {
    setClick((prev) => !prev);
    dispatch(removeFromWishlist(data));
  }, [dispatch, data]);

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
        const campaignId = data?.campaignInfo[0]?.campaignId || null;
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

  const addToWishlistHandler = useCallback(async () => {
    setClick((prev) => !prev);
    dispatch(addToWishlist(data));
    await logActivity("click", data?._id);
    await trackInteraction("click", data?._id);
  }, [dispatch, data, logActivity, trackInteraction]);

  const addToCartHandler = async () => {
    const isItemExists = cart?.find((i) => i?._id === data?._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
      return;
    }

    if (data.stock < count) {
      toast.error("Product stock limited!");
      return;
    }

    try {
      await logActivity("click", data?._id);
      await trackInteraction("view", data?._id); // Now this should always execute
      await trackInteraction("click", data?._id); // Now this should always execute

      // Dispatch action only after tracking is complete
      const cartData = { ...data, qty: count };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error(
        "Error tracking cart click:",
        error.response?.data || error.message
      );
    }
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleProductClick = async (id) => {
    setLoading(true);
    try {
      await logActivity("view", id);
      await trackInteraction("view", id);

      setTimeout(() => {
        navigate(`/product/${id}`);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error logging product view:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="loader"></div>
        </div>
      )}
      <div className="w-full h-[310px] bg-white rounded-lg shadow-sm relative cursor-pointer">
        <div className="p-2 border rounded-md shadow-md">
          <div onClick={() => handleProductClick(data?._id)}>
            {" "}
            {/* Handle click for product navigation */}
            <img
              src={`${data?.images && data?.images[0]?.url}`}
              alt=""
              className="w-full h-[180px] object-cover rounded-md"
            />
          </div>
        </div>

        <div className="p-1">
          <Link to={`/shop/preview/${data?.shop?._id}`}>
            <p className={`${styles.shop_name} sm:text-base font-medium`}>
              {data?.shop?.name}
            </p>
          </Link>
          <p className="text-[12px] sm:text-base font-semibold">
            {data?.name?.length > 20
              ? data?.name?.slice(0, 20) + "..."
              : data.name}
          </p>

          <div className="py-1 flex items-center justify-between">
            <div className="flex">
              <p className={`${styles.productDiscountPrice} !text-[14px]`}>
                ₹{selectedVariant?.afterDiscountPrice ? selectedVariant?.afterDiscountPrice : data.afterDiscountPrice}
              </p>
              <p className={`${styles.price} !text-[12px]`}>
                {selectedVariant?.originalPrice ? selectedVariant?.originalPrice : data.originalPrice }
              </p>
            </div>
            <span className="font-[600] text-[12px] text-[#267c3d]">
              {selectedVariant?.sold_out ? selectedVariant?.sold_out : data?.sold_out} sold
            </span>
          </div>

          <div className="text-green-700 flex justify-between !text-[14px] font-semibold">
            <div>
              {selectedVariant?.dicountType ? selectedVariant?.dicountType : data?.dicountType === "Flat" ? (
                <p>Flat ₹{selectedVariant?.discountAmount ? selectedVariant?.discountAmount : data?.discountAmount} off</p>
              ) : (
                <p>{selectedVariant?.discountAmount? selectedVariant?.discountAmount : data?.discountAmount}% off</p>
              )}
            </div>
            <div className="flex bg-green-600 rounded-sm">
              <span className="ml-1 text-white text-xs font-semibold rounded mr-1 mt-[2px]">
                {data?.ratings?.totalRating ? data?.ratings?.totalRating : 3}
              </span>
              <BsFillStarFill color="white" className="mt-[2px]" />
            </div>
          </div>

          {/* <div className="flex items-center gap-2 mt-1 pb-2">
            {selectedVariant?.attributes?.map((attr, index) => (
              <p
                key={index}
                className={`px-2 py-1 text-xs `}
                
                disabled={selectedVariant.stock <= 0}
              >
                {`${attr.key}: ${attr.value}`}
              </p>
              
            ))}
          </div> */}

          <div className="text-white">
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5 pr-1"
                color={click ? "red" : "white"}
                onClick={() => removeFromWishlistHandler(data)}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5 pr-1"
                color={click ? "red" : "white"}
                onClick={() => addToWishlistHandler(data)}
                title="Add to wishlist"
              />
            )}
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-14 pr-1"
              color="white"
              onClick={() => addToCartHandler(data?._id)}
              title="Add to cart"
            />

            {open && (
              <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
