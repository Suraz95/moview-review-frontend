import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
const GenreSelector = ({ totalGenresSelected }) => {
   return (
      <div className="mt-4">
         <div className="indicator">
            <span className="indicator-item badge">{totalGenresSelected}</span>
            <button
               className="btn btn-base-300"
               onClick={() => window.genre_modal.showModal()}
               type="button"
            >
               <BiCategoryAlt />
               Select Genres
            </button>
         </div>
      </div>
   );
};

export default GenreSelector;
