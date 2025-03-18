import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";

const StickyActionBar = ({
  click,
  isAuthenticated,
  addToWishlistHandler,
  removeFromWishlistHandler,
  addToCartHandler,
  data,
  currentVariant,
  cart
}) => {

    
    const getStockStatus = () => {
        // Check if the product is already in the cart
        const isInCart = cart?.length && cart?.some((item) =>
        
          currentVariant ? item.currentVariant._id === currentVariant._id : item.productId === data?._id
        );

        // console.log("isInCart-->", currentVariant)
      
        if (isInCart) {
          return "GO TO CART";
        }
      
        if (currentVariant) {
          return currentVariant.stock > 0 ? "ADD TO CART" : "OUT OF STOCK";
        }
      
        return data?.stock > 0 ? "ADD TO CART" : "OUT OF STOCK";
      };
      
      
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t p-3 flex justify-around items-center z-50 md:hidden">
      {/* Wishlist Button */}
      <div
        className={`w-[48%] flex justify-center items-center py-1 rounded-md font-semibold text-lg ${
          click
            ? "bg-red-100 border border-red-500 text-red-600"
            : "bg-white border border-gray-300 text-gray-600"
        } cursor-pointer transition-all`}
        onClick={
          click
            ? () => removeFromWishlistHandler(data)
            : () => addToWishlistHandler(data)
        }
        title={click ? "Remove from wishlist" : "Add to wishlist"}
      >
        <AiFillHeart
          size={22}
          className="mr-2"
          color={click ? "red" : "gray"}
        />
        WISHLIST
      </div>

      {/* Add to Cart Button */}
      <div
        className={`w-[48%] flex justify-center items-center py-1 rounded-md font-semibold text-lg text-white cursor-pointer transition-all ${
          getStockStatus() === "ADD TO CART"
            ? "bg-[#ff5722] hover:bg-[#e64a19]"
            : getStockStatus() === "GO TO CART"
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={
          isAuthenticated
            ? getStockStatus() === "ADD TO CART"
              ? () => addToCartHandler(data?._id)
              : getStockStatus() === "GO TO CART"
              ? ()=> {}
              : () => {}
            : () => toast.info("Login to add items to the cart.")
        }
      >
        <AiOutlineShoppingCart size={22} className="mr-2" />
        {getStockStatus()}
      </div>
    </div>
  );
};

export default StickyActionBar;
