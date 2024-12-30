import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
   return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content text-center">
            <div className="max-w-md">
               <h1 className="text-7xl font-bold text-primary">404 </h1>
               <p className="py-6">RESOURCE NOT FOUND</p>
               <Link to="/" className="btn btn-primary">
                  &#8592; Back to Home Page
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Notfound;
