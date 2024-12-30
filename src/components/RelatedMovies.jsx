import React, { useEffect, useState } from "react";
import { getRelatedMovies } from "../api/movie";
import { useNotificationContext } from "../context/NotiContext";
import MovieList from "./MovieList";

const RelatedMovies = ({ movieId }) => {
   const { updateNotification } = useNotificationContext();
   const [movies, setMovies] = useState();

   const fetchRelatedMovies = async () => {
      const { data, error } = await getRelatedMovies(movieId);
      if (error) return updateNotification("error", error);
      setMovies(data);
   };

   useEffect(() => {
      if (movieId) fetchRelatedMovies();
   }, [movieId]);

   return <MovieList movies={movies} label={"Related Movies"} />;
};

export default RelatedMovies;
