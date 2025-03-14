import { useState } from "react";
import { AiFillStar, AiOutlineLike, AiOutlineDislike, AiOutlineFlag } from "react-icons/ai";
import Ratings from "../Products/Ratings";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";



export default function ReviewSection({ ratingData }) {
  const [sortType, setSortType] = useState("latest");
  const [reviews, setReviews] = useState(ratingData.reviews);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === "highest") return b.rating - a.rating;
    if (sortType === "lowest") return a.rating - b.rating;
    if (sortType === "mostHelpful") return b.helpfulVotes - a.helpfulVotes;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleVote = async (reviewId, type) => {
    try {
      const response = await axios.post(`${server}/product/vote-review`, {
        reviewId,
        voteType: type, // 'helpful' or 'notHelpful'
      });

      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId
              ? {
                  ...review,
                  helpfulVotes: type === "helpful" ? review.helpfulVotes + 1 : review.helpfulVotes,
                  notHelpfulVotes: type === "notHelpful" ? review.notHelpfulVotes + 1 : review.notHelpfulVotes,
                }
              : review
          )
        );
        toast.success(`You marked this review as ${type}!`);
      }
    } catch (error) {
      toast.error("Error voting on the review. Try again.");
    }
  };

  // ✅ Handle Reporting
  const handleReport = async (reviewId) => {
    try {
      const response = await axios.post(`${server}/product/report-review`, { reviewId });

      if (response.data.success) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? { ...review, reported: review.reported + 1 } : review
          )
        );
        toast.success("Review reported successfully!");
      }
    } catch (error) {
      toast.error("Error reporting the review.");
    }
  };

  

  return (
    <div className="w-full p-4 bg-white ">
      <h2 className="text-lg font-bold">Ratings & Reviews</h2>

      <div className="flex items-center gap-4 my-4">
        <div className="text-3xl font-bold">{ratingData.averageRating}</div>
        <Ratings rating={ratingData.averageRating} />
        <span className="text-gray-600">
          ({ratingData.totalRatings} reviews)
        </span>
      </div>

      <div className="my-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-green-500">
              {" "}
              {ratingData?.averageRating}{" "}
            </h2>
            <AiFillStar className="text-green-500 " />
          </div>
          <p className="text-xs text-gray-500">{ratingData?.totalRatings} ratings</p>
          <p className="text-xs text-gray-500">{ratingData?.averageRating?.length} reviews</p>
        </div>

        <div>
          {Object.entries(ratingData.ratingBreakdown).map(([star, count]) => (
            <div key={star} className="flex items-center gap-2">
              <span className=" font-bold">{star}★</span>
              <div className="w-40 h-2 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-2 bg-green-400"
                  style={{
                    width: `${(count / ratingData.totalRating) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-gray-600">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 my-2">
        <button
          className={`px-3 py-1 border rounded ${
            sortType === "latest" && "bg-gray-200"
          }`}
          onClick={() => setSortType("latest")}
        >
          Latest
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            sortType === "highest" && "bg-gray-200"
          }`}
          onClick={() => setSortType("highest")}
        >
          Highest
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            sortType === "lowest" && "bg-gray-200"
          }`}
          onClick={() => setSortType("lowest")}
        >
          Lowest
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            sortType === "mostHelpful" && "bg-gray-200"
          }`}
          onClick={() => setSortType("mostHelpful")}
        >
          Most Helpful
        </button>
      </div>

      {sortedReviews.length > 0 ? (
        sortedReviews.map((review, index) => (
          <div key={index} className="border-b py-4">
            <div className="flex items-center gap-3">
              <img
                src={review.userAvatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{review.userName} </h4>
                <div className="flex items-center gap-3">
                  <Ratings rating={review.rating} />
                </div>
                {review.purchaseVerified && (
                  <span className="text-green-600 text-sm">
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>
            <p className="my-2">{review.comment}</p>
            {review.images.length > 0 && (
              <div className="flex gap-2">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <button
                className="flex items-center gap-1 text-sm"
                onClick={() => handleVote(review._id, "like")}
              >
                <AiOutlineLike /> {review.helpfulVotes}
              </button>
              <button
                className="flex items-center gap-1 text-sm"
                onClick={() => handleVote(review._id, "dislike")}
              >
                <AiOutlineDislike /> {review.notHelpfulVotes}
              </button>
              <button
                className="flex items-center gap-1 text-sm text-red-500"
                onClick={() => handleReport(review._id)}
              >
                <AiOutlineFlag /> Report
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No reviews available.</p>
      )}
    </div>
  );
}
