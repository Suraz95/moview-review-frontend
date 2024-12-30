import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import SingleMovieListItem from "./SingleMovieListItem";
import { useMovieContext } from "../../context/MovieContext";
const AdminMovies = () => {
   const {
      movies,
      reachedEnd,
      selectedMovie,
      currentPage,
      fetchMovies,
      nextPage,
      previousPage,
      handleDeleteMovie,
      handleEditMovie,
      handleViewMovie,
   } = useMovieContext();

   useEffect(() => {
      fetchMovies(currentPage);
   }, [currentPage]);

   return (
      <>
         <h3 className="leading-6 font-medium text-base-content text-2xl my-4">All Movies</h3>
         <section className="bg-base-200 w-[70%] p-4 rounded-md">
            <div className=" overflow-x-auto">
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
                              onDelete={handleDeleteMovie}
                              onEdit={handleEditMovie}
                              onOpen={handleViewMovie}
                           />
                        );
                     })}
                  </tbody>
               </table>
            </div>
            <div className="w-full flex items-center justify-end mt-4">
               <div className="join">
                  <Pagination
                     nextPage={nextPage}
                     previousPage={previousPage}
                     currentPage={currentPage}
                  />
               </div>
            </div>
         </section>
      </>
   );
};

export default AdminMovies;
