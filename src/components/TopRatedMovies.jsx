import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../api/movie";
import { useNotificationContext } from "../context/NotiContext";
import MovieList from "./MovieList";
import TopRatedSkeleton from "./Skeletons/TopRatedSkeleton";

const TopRatedMovies = () => {
   const { updateNotification } = useNotificationContext();
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const fetchTopRatedMovies = async (signal) => {
      setIsLoading(true);
      const { data, error } = await getTopRatedMovies("Film", signal);
      if (error) {
         setIsLoading(false);
         return updateNotification("error", error);
      }
      setMovies(data);
      setIsLoading(false);
   };

   useEffect(() => {
      const controller = new AbortController();
      fetchTopRatedMovies(controller.signal);
      return () => controller.abort();
   }, []);

   return (
      <>
         {isLoading ? (
            <TopRatedSkeleton />
         ) : (
            <MovieList movies={movies} label={"Top Rated (Movies)"} />
         )}
      </>
   );
};

export default TopRatedMovies;
