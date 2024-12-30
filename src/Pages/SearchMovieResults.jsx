import React, { useEffect, useState } from "react";
import { useNotificationContext } from "../context/NotiContext";
import { useSearchParams } from "react-router-dom";
import { searchMoviesForPublic } from "../api/movie";
import MovieList from "../components/MovieList";
import TopRatedSkeleton from "../components/Skeletons/TopRatedSkeleton";

const SearchMovieResults = () => {
   const { updateNotifictaion } = useNotificationContext();
   const [movies, setMovies] = useState([]);
   const [resultNotFound, setResultNotFund] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [searchParams] = useSearchParams();
   const query = searchParams.get("title");

   const searchMovie = async (query) => {
      setIsLoading(true);
      const { data, error } = await searchMoviesForPublic(query);
      if (error) {
         setIsLoading(false);
         return updateNotifictaion("error", error);
      }
      if (!data.length) {
         setResultNotFund(true);
         setIsLoading(false);
         return setMovies([]);
      }
      setIsLoading(false);
      setResultNotFund(false);
      setMovies(data);
   };

   useEffect(() => {
      if (query.trim()) searchMovie(query);
   }, [query]);

   return (
      <main className="max-w-screen-xl mx-auto">
         {isLoading ? (
            <TopRatedSkeleton />
         ) : resultNotFound ? (
            <h1 className="w-full text-center font-semibold text-3xl text-info p-2 my-3 opacity-40">
               OOPS! No Records Found
            </h1>
         ) : (
            <MovieList movies={movies} label={`Showing results for : "${query}"`} />
         )}
      </main>
   );
};

export default SearchMovieResults;
