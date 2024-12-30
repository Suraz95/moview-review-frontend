import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../api/movie";
import { useNotificationContext } from "../context/NotiContext";
import Loader from "../components/misc/Loader";
import RatingStar from "../components/RatingStar";
import RelatedMovies from "../components/RelatedMovies";
import { useAuthContext } from "../context/authContext";
import AddRatingModal from "../components/admin/modals/AddRatingModal";
import { ActorProfileModal } from "../components";
import SingleMoviePageSkeleton from "../components/Skeletons/SingleMoviePageSkeleton";

const SingleMovie = () => {
  const { updateNotification } = useNotificationContext();
  const { authInfo } = useAuthContext();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [selectedProfile, setSelectedProfile] = useState("");

  const fetchSingleMovie = async () => {
    setLoading(true);
    const { data, error } = await getSingleMovie(movieId);
    if (error) {
      setLoading(false);
      return updateNotification("error", error);
    }
    setMovie(data);
    setLoading(false);
  };

  useEffect(() => {
    if (movieId) fetchSingleMovie();
  }, [movieId]);

  const handleRateMovie = () => {
    if (!authInfo.isLoggedIn) {
      return navigate("/auth/signIn");
    }
    window.add_rating_modal.showModal();
  };

  const handleRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: reviews });
  };

  const handleOpenActorProfile = (actorId) => {
    setSelectedProfile(actorId);
    window.actor_profile_modal.showModal();
  };

  const {
    title,
    poster,
    trailer,
    reviews = {},
    _id,
    storyLine,
    director = {},
    writers = [],
    cast = [],
    language,
    releaseDate,
    type,
    genres = [],
  } = movie;

  return (
    <>
      {loading ? (
        <SingleMoviePageSkeleton />
      ) : (
        <main className="max-w-screen-xl mx-auto p-2 ">
          {/* Hero Section */}
          <div>
            {/* Movie Trailer */}
            <video
              poster={poster}
              controls
              src={trailer}
              className="w-full md:h-[600px] aspect-video object-fill"
            ></video>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-semibold text-primary py-3">
              {title}
            </h1>
            {/* Reviews */}
            <div className="md:items-end">
              <RatingStar rating={reviews.ratingAvg} />
              <Link
                to={`/movie/reviews/` + _id}
                className="link link-primary link-hover block"
              >
                {reviews.reviewCount} Reviews
              </Link>
              <button
                className="link link-accent"
                type="button"
                onClick={handleRateMovie}
              >
                Rate the Movie
              </button>
            </div>
          </div>
          {/* Movie Details */}
          <div className="space-y-3">
            {/* Storyline */}
            <p className="text-gray-500">{storyLine}</p>
            {/* Language */}
            <div className="flex space-x-2">
              <p className="text-gray-500">Language :</p>
              <p className="text-primary hover:underline cursor-pointer">
                {language}
              </p>
            </div>
            {/* Release Date */}
            <div className="flex space-x-2">
              <p className="text-gray-500">Release Date :</p>
              <p className="text-primary hover:underline cursor-pointer">
                {releaseDate?.split("T")[0]}
              </p>
            </div>
            {/* Type */}
            <div className="flex space-x-2">
              <p className="text-gray-500">Type :</p>
              <p className="text-primary hover:underline cursor-pointer">
                {type}
              </p>
            </div>
            {/* Genres */}
            <div className="flex space-x-2">
              <p className="text-gray-500">Genres :</p>
              {genres?.map((g) => (
                <span
                  className="space-x-3 text-primary hover:underline cursor-pointer"
                  key={g}
                >
                  {g}
                </span>
              ))}
            </div>
            {/* Director */}
            <div className="flex space-x-2">
              <p className="text-gray-500">Director:</p>
              <p
                className="text-primary hover:underline cursor-pointer"
                onClick={() => handleOpenActorProfile(director._id)}
              >
                {director.name}
              </p>
            </div>
            {/* Writers */}
            <div className="flex space-x-2">
              <p className="text-gray-500">Writers:</p>
              <div className="space-x-2">
                {writers.map((w) => (
                  <p
                    key={w._id}
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => handleOpenActorProfile(w._id)}
                  >
                    {w.name}
                  </p>
                ))}
              </div>
            </div>
            {/* Cast */}
            <p className="text-gray-500">Cast:</p>
            <div className="space-x-2 flex flex-wrap">
              {cast?.map((c) => (
                <div
                  key={c.profile?.actorId}
                  className="flex flex-col items-center gap-y-1 cursor-pointer hover:bg-base-300 rounded-md p-1"
                  onClick={() => handleOpenActorProfile(c.profile?.actorId)}
                >
                  <img
                    src={c.profile?.avatar}
                    alt={c.profile?.name}
                    className="h-24 w-24 rounded-full"
                  />
                  <p className="text-primary font-semibold text-center">
                    {c.profile?.name}
                  </p>
                  <p className="text-gray-500">{c.roleAs}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Rendering related movies */}
          <RelatedMovies movieId={movieId} />
        </main>
      )}
      <AddRatingModal movieId={movieId} onSuccess={handleRatingSuccess} />
      <ActorProfileModal actorId={selectedProfile} />
    </>
  );
};

export default SingleMovie;
