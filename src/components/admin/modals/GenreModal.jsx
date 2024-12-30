import React, { useState } from "react";
import { genreData } from "../../../data/data";

const GenreModal = ({ onSubmit }) => {
   const [selectedGenre, setSelectedGenre] = useState([]);

   const handleSelection = (genre) => {
      let newGenres = [];
      if (selectedGenre.includes(genre)) {
         newGenres = selectedGenre.filter((gen) => gen !== genre);
      } else {
         newGenres = [...selectedGenre, genre];
      }
      setSelectedGenre([...newGenres]);
   };

   const handleSubmit = () => {
      onSubmit(selectedGenre);
   };

   return (
      <dialog id="genre_modal" className="modal">
         <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg text-center">Select Genre</h3>
            <section className="flex items-center gap-5 justify-center flex-wrap mt-4">
               {genreData?.map((genre, idx) => {
                  return (
                     <SingleGenreButton
                        key={idx}
                        onClick={() => handleSelection(genre)}
                        selected={selectedGenre.includes(genre)}
                     >
                        {genre}
                     </SingleGenreButton>
                  );
               })}
            </section>
            <div className="modal-action">
               {/* if there is a button, it will close the modal */}
               <button className="btn btn-error btn-outline">Close</button>
               <button className="btn btn-base-300 " onClick={handleSubmit}>
                  Select
               </button>
            </div>
         </form>
      </dialog>
   );
};

const SingleGenreButton = ({ children, selected, onClick }) => {
   return (
      <div
         onClick={onClick}
         className={`btn btn-sm btn-primary ${selected ? null : " btn-outline"}`}
      >
         {children}
      </div>
   );
};

export default GenreModal;
