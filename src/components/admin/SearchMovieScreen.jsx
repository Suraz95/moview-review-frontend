import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMoviesForAdmin } from "../../api/movie";
import { useNotificationContext } from "../../context/NotiContext";
import SingleMovieListItem from "./SingleMovieListItem";

const SearchMovieScreen = () => {
   const { updateNotifictaion } = useNotificationContext();
   const [movies, setMovies] = useState([]);
   const [resultNotFound, setResultNotFund] = useState(false);

   const [searchParams] = useSearchParams();
   const query = searchParams.get("title");

   const searchMovie = async (query) => {
      const { data, error } = await searchMoviesForAdmin(query);
      if (error) return updateNotifictaion("error", error);
      if (!data.length) {
         setResultNotFund(true);
         return setMovies([]);
      }
      setResultNotFund(false);
      setMovies(data);
   };

   useEffect(() => {
      if (query.trim()) searchMovie(query);
   }, [query]);

   return (
      <section className="bg-base-200 w-[70%] p-4 rounded-md">
         {resultNotFound ? (
            <h1 className="w-full text-center font-semibold text-3xl text-info p-2 my-3 opacity-40">
               OOPS! No Records Found
            </h1>
         ) : (
            <table className="table table-sm">
               {/* head */}
               <thead>
                  <tr>
                     <th>Title</th>
                     <th>Status</th>
                     <th className="text-center">Actions</th>
                  </tr>
               </thead>
               {/* body */}
               <tbody>
                  {movies?.map((movie) => {
                     return (
                        <SingleMovieListItem
                           key={movie._id}
                           movie={movie}
                           // onDelete={handleDeleteMovie}
                           // onEdit={handleEditMovie}
                           // onOpen={handleViewMovie}
                        />
                     );
                  })}
               </tbody>
            </table>
         )}
      </section>
   );
};

export default SearchMovieScreen;
