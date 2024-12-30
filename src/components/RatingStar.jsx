import React from "react";
import { AiFillStar } from "react-icons/ai";

const RatingStar = ({ rating }) => {
   if (!rating) return <p className="text-primary">No Ratings</p>;

   return (
      <p className="flex items-center space-x-1">
         <span className="text-primary font-semibold">{rating}</span>
         <AiFillStar className="text-primary" size={18} />
      </p>
   );
};

export default RatingStar;
