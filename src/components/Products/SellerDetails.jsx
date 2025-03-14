import { AiOutlineMessage } from "react-icons/ai";
import { MdStar, MdStorefront, MdOutlineShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";

const SellerDetails = ({ data, seller, averageRating, handleMessageSubmit }) => {
  return (
    <div className="flex items-center justify-between mt-2 bg-white p-4 rounded-lg shadow-md border border-gray-200">
      {/* Seller Info */}
      <div className="flex items-center">
        <img
          src={seller?.avatar?.url}
          alt={data?.shop?.shoName}
          className="w-[60px] h-[60px] rounded-full border border-gray-300 shadow-sm"
        />
        <div className="ml-3">
          <Link
            to={`/shop/preview/${data?.shopId}`}
            className="hover:underline"
          >
            <h3 className="text-base font-normal text-gray-600 flex items-center">
              <MdStorefront className="mr-1 text-indigo-600" />
              {data?.shop?.shopName}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm flex items-center">
                <MdStar className="text-yellow-500 mr-1" />
                {averageRating}/5 Ratings
              </p>
              <p className="text-gray-600 text-sm flex items-center">
                <MdOutlineShoppingBag className="text-green-500 mr-1" />
                1k Products Sold
              </p>
            </div>

            <div className="md:hidden flex items-center ml-4">
              <Link to={`/shop/preview/${data?.shop._id}`}>
                <button
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                  onClick={handleMessageSubmit}
                >
                  Chat Now <AiOutlineMessage className="ml-2 text-lg" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="hidden md:flex items-center gap-3">
        <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
          Follow
        </button>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
            onClick={handleMessageSubmit}
          >
            Chat Now <AiOutlineMessage className="ml-2 text-lg" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SellerDetails;
