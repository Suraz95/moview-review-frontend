import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useNotificationContext } from "../context/NotiContext";
import { useAuthContext } from "../context/authContext";
import { deleteReview, getReviewsByMovie } from "../api/review";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { ConfirmModal, EditRatingModal } from "../components";
import ReviewsSkeleton from "../components/Skeletons/ReviewsSkeleton";

const getIntitialName = (name = "") => {
  return name[0].toUpperCase();
};

const Reviews = () => {
  const { updateNotification } = useNotificationContext();
  const { authInfo } = useAuthContext();
  const { movieId } = useParams();
  const profileId = authInfo.profile?.id;

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myReview, setMyReview] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data, error } = await getReviewsByMovie(movieId);
    if (error) {
      setIsLoading(false);
      return updateNotification("error", error);
    }
    setReviews(data.reviews);
    setMovieTitle(data.title);
    setIsLoading(false);
  };

  // Finding profile owner reviews
  const findProfileOwnerReview = () => {
    if (myReview) return setMyReview(null);
    const reviewfound = reviews.find((r) => r.ownerId === profileId);
    if (!reviewfound)
      return updateNotification(
        "error",
        `No Reviews found against your profile`
      );
    setMyReview(reviewfound);
  };

  // Open Confirm Modal
  const showConfirmModal = () => window.confirm_modal.showModal();
  // Delete Review
  const handleDeleteReview = async () => {
    setIsLoading(true);
    const { msg, error } = await deleteReview(myReview.reviewId);
    if (error) {
      setIsLoading(false);
      return updateNotification("error", error);
    }
    updateNotification("info", msg);
    const updatedReviews = reviews.filter(
      (r) => r.reviewId !== myReview.reviewId
    );
    setReviews(updatedReviews);
    setMyReview(null);
    setIsLoading(false);
  };
  // Edit Review
  const handleEditReview = () => {
    const { reviewId, content, rating } = myReview;
    setSelectedReview({ reviewId, content, rating });
    window.edit_rating_modal.showModal();
  };

  const handleUpdateRatingSuccess = (data) => {
    const updatedReview = {
      ...myReview,
      content: data.content,
      rating: data.rating,
    };
    setMyReview({ ...updatedReview });
    const mutatedReviewList = reviews.map((r) => {
      if (r.reviewId === updatedReview.reviewId) return updatedReview;
      return r;
    });
    setReviews([...mutatedReviewList]);
  };

  useEffect(() => {
    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <ReviewsSkeleton />
      ) : (
        <>
          <main className="max-w-screen-xl mx-auto">
            {/* Header */}
            <div className="px-2 py-4 flex items-center justify-between">
              <h1 className="md:text-xl">
                Showing Reviews for:{" "}
                <span className="text-primary"> {movieTitle} </span>
              </h1>
              <button
                className="link link-primary"
                type="button"
                onClick={findProfileOwnerReview}
              >
                {myReview ? "View All Reviews" : "  Show my Review"}
              </button>
            </div>
            {/* Review Container */}
            {!reviews.length ? (
              <h1 className="text-xl text-primary px-2">No Reviews Found</h1>
            ) : myReview ? (
              <div>
                <ReviewCard review={myReview} />
                <div className="flex justify-end">
                  <button
                    className="btn btn-sm btn-ghost text-red-500"
                    type="button"
                    onClick={showConfirmModal}
                  >
                    <FaTrash size={22} />
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    type="button"
                    onClick={handleEditReview}
                  >
                    <FaRegEdit size={22} />
                  </button>
                </div>
              </div>
            ) : (
              reviews?.map((r) => {
                return <ReviewCard key={r.reviewId} review={r} />;
              })
            )}
          </main>
        </>
      )}

      <ConfirmModal
        title={"Attention Required"}
        subtitle={"Do You want to delete your Review?"}
        onConfirm={handleDeleteReview}
        loading={isLoading}
      />
      <EditRatingModal
        onSuccess={handleUpdateRatingSuccess}
        initialState={selectedReview}
      />
    </>
  );
};

const ReviewCard = ({ review }) => {
  if (!review) return null;
  const { name, content, rating } = review;
  return (
    <div className="m-2 p-2 mt-6 bg-base-200 rounded-md shadow-md">
      <div className="flex space-x-3">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary text-2xl">
          {getIntitialName(name)}
        </div>
        <div className="w-4/5">
          <h1 className="text-xl">{name}</h1>

          <div className="flex items-center gap-x-2">
            <p className="text-primary">{rating}</p>
            <AiFillStar size={16} className="text-primary" />
          </div>

          <p className="text-gray-500">{content}</p>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
