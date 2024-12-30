import React from "react";
import { FaRegEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";

const SingleMovieListItem = ({ movie, onDelete, onOpen, onEdit }) => {
   const { poster, title, genres, status, _id } = movie;
   return (
      <tr className="hover">
         {/* image */}
         <td>
            <div className="flex items-center space-x-3 ">
               <div>
                  <img src={poster?.url} alt={title} className=" h-24 object-contain rounded-md " />
               </div>
               <div>
                  <div className="font-bold text-md md:text-xl">{title}</div>
                  <div className="text-sm opacity-50 space-x-2 space-y-2 ">
                     {genres?.map((g, idx) => {
                        return (
                           <div key={idx} className="badge badge-outline">
                              {g}
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </td>
         <td>
            <span className="">{status}</span>
         </td>
         <td>
            <div className="flex items-center justify-center gap-x-5">
               <button onClick={() => onDelete(movie)}>
                  <FaTrash className="text-error" size={16} />
               </button>
               <button onClick={() => onEdit(movie)}>
                  <FaRegEdit className="text-warning" size={16} />
               </button>
               <button onClick={() => onOpen(movie)}>
                  <FaExternalLinkAlt className="text-base-content" size={16} />
               </button>
            </div>
         </td>
      </tr>
   );
};

export default SingleMovieListItem;
