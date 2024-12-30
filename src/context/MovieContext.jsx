import { useState, useEffect, useContext, createContext } from "react";
import { useNotificationContext } from "./NotiContext";
import { getMovies } from "../api/movie";

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
   const { updateNotification } = useNotificationContext();
   const [movies, setMovies] = useState();
   const [currentPage, setCurrentPage] = useState(0);
   const [reachedEnd, setReachedEnd] = useState(false);
   const [selectedMovie, setSelectedMovie] = useState("");

   // Pagination
   const nextPage = () => {
      setCurrentPage((prev) => prev + 1);
   };
   const previousPage = () => {
      setCurrentPage((prev) => {
         if (prev < 1) {
            return prev;
         } else {
            return prev - 1;
         }
      });
   };

   // Fetch Movies
   const fetchMovies = async (pageNumber) => {
      const { error, data } = await getMovies(pageNumber, 6);
      if (error) return updateNotification("error", error);
      if (!data?.movies.length) {
         setCurrentPage(pageNumber - 1);
         return setReachedEnd(true);
      }
      setMovies(data?.movies);
   };

   // delete Movie
   const handleDeleteMovie = (movie) => {
      // console.log("movie Delete trigger: ", movie);
   };
   //   Update movie
   const handleEditMovie = async (movie) => {
      // window.update_movie_modal.showModal();
   };
   //   View Movie
   const handleViewMovie = (movie) => {};
   return (
      <MovieContext.Provider
         value={{
            movies,
            reachedEnd,
            currentPage,
            selectedMovie,
            fetchMovies,
            nextPage,
            previousPage,
            handleDeleteMovie,
            handleViewMovie,
            handleEditMovie,
         }}
      >
         {children}
      </MovieContext.Provider>
   );
};

export const useMovieContext = () => useContext(MovieContext);
