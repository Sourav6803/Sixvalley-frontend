import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { BsFillCameraFill } from "react-icons/bs";

export default function ReviewPopup({
  open,
  setOpen,
  selectedItem,
  reviewHandler,
  rating,
  setRating,
  comment,
  setComment,
  images,
  setImages,
  loading,
}) {
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  // Get the first image from currentVariant if available, otherwise fallback to product image
  const variantImage = selectedItem?.currentVariant?.images?.[0]?.url || selectedItem?.images?.[0]?.url;
  const variantPrice = selectedItem?.currentVariant?.afterDiscountPrice || selectedItem?.discountPrice;
  const variantAttributes = selectedItem?.currentVariant?.attributes || []; // Array of key-value objects

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Give a Review</h2>
            <RxCross1 size={24} className="cursor-pointer" onClick={() => setOpen(false)} />
          </div>

          {/* Product Details */}
          <div className="flex items-center gap-4">
            <img src={variantImage} alt="Product" className="w-20 h-20 object-cover rounded-md" />
            <div>
              <p className="font-semibold text-gray-800">{selectedItem?.name}</p>
              <p className="text-green-600 font-bold">
                ₹{variantPrice} x {selectedItem?.qty}
              </p>

              {/* Display Variant Attributes */}
              {variantAttributes.length > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  {variantAttributes.map((attr, index) => (
                    <p key={index}>
                      <span className="font-semibold">{attr.key}:</span> {attr.value}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-4">
            <h5 className="text-sm font-semibold">Overall Rating</h5>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                rating >= i ? (
                  <AiFillStar key={i} className="text-yellow-400 text-2xl cursor-pointer" onClick={() => setRating(i)} />
                ) : (
                  <AiOutlineStar key={i} className="text-gray-400 text-2xl cursor-pointer" onClick={() => setRating(i)} />
                )
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-4">
            <label className="block text-sm font-semibold">Write a Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts"
              className="w-full mt-2 p-2 border rounded-md outline-none"
              rows="4"
            />
          </div>

          {/* Image Upload Section */}
          <div className="mt-4">
            <label className="block text-sm font-semibold">Upload Photos</label>
            <div className="mt-2 flex gap-2">
              <label className="w-16 h-16 flex items-center justify-center border rounded-md cursor-pointer">
                <BsFillCameraFill className="text-gray-600 text-xl" />
                <input type="file" multiple hidden accept="image/*,video/*" onChange={handleImageUpload} />
              </label>
              {images.map((img, index) => (
                <img key={index} src={URL.createObjectURL(img)} className="w-16 h-16 object-cover rounded-md" alt="" />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full font-semibold hover:bg-green-700"
            onClick={rating > 1 ? () => reviewHandler(rating, comment, images) : null}
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Loading..." : "Submit Review"}
          </button>
        </div>
      </div>
    )
  );
}
