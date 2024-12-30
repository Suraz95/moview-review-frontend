import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../api/movie";
import { useNotificationContext } from "../context/NotiContext";
import MovieList from "./MovieList";
import TopRatedSkeleton from "./Skeletons/TopRatedSkeleton";

const TopRatedTvSeries = () => {
   const { updateNotification } = useNotificationContext();
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const fetchTopRatedMovies = async (signal) => {
      setIsLoading(true);
      const { data, error } = await getTopRatedMovies("TV Series", signal);
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
            <MovieList movies={movies} label={"Top Rated (TV Series)"} />
         )}
      </>
   );
};

export default TopRatedTvSeries;
