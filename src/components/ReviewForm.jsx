import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Ratings = new Array(10).fill("");
export const ReviewForm = ({ onsubmit, busy, initialState, btnText }) => {
   const [selectedRatings, setSelectedRatings] = useState([]);
   const [content, setContent] = useState("");

   const handleMouseEnter = (idx) => {
      const ratings = new Array(idx + 1).fill(idx);
      setSelectedRatings([...ratings]);
   };

   const handleChange = ({ target }) => {
      setContent(target.value);
   };

   const handleReviewSubmit = () => {
      if (!selectedRatings.length) return;
      const data = {
         rating: Number(selectedRatings.length),
         content: content,
      };
      onsubmit(data);
   };

   // Edit Review
   useEffect(() => {
      if (initialState) {
         setContent(initialState.content);
         setSelectedRatings(new Array(initialState.rating).fill(""));
      }
   }, [initialState]);

   return (
      <section>
         <div className="flex gap-x-1 items-center relative">
            {/* rating */}
            {Ratings.map((_, idx) => {
               return (
                  <AiOutlineStar
                     onMouseEnter={() => handleMouseEnter(idx)}
                     key={idx}
                     size={28}
                     className="text-primary cursor-pointer"
                  />
               );
            })}
            <div className="flex gap-x-1 absolute top-1/2 -translate-y-1/2">
               {selectedRatings.map((_, idx) => {
                  return (
                     <AiFillStar
                        onMouseEnter={() => handleMouseEnter(idx)}
                        key={idx}
                        size={28}
                        className="text-primary cursor-pointer"
                     />
                  );
               })}
            </div>
         </div>

         <textarea
            value={content}
            onChange={handleChange}
            className="textarea textarea-primary w-full h-24 my-2"
            placeholder="Write a review"
         ></textarea>

         {busy ? (
            <button className="w-full btn btn-primary my-2" disabled={busy}>
               <span className="loading loading-spinner"></span>
               Uploading
            </button>
         ) : (
            <button className="w-full btn btn-primary my-2" onClick={handleReviewSubmit}>
               {btnText}
            </button>
         )}
      </section>
   );
};
