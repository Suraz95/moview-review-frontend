import React from "react";
import { Routes, Route } from "react-router-dom";
import { Notfound } from "../Pages";
import {
   ActorModal,
   AdminActors,
   AdminMovies,
   Dashboard,
   MovieModal,
   SearchMovieScreen,
   Sidebar,
} from "../components";

import { GiHamburgerMenu } from "react-icons/gi";

const AdminNavigator = () => {
   return (
      <>
         <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col m-4 ">
               <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                  <GiHamburgerMenu size={28} />
               </label>
               {/* Page content here */}
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/actors" element={<AdminActors />} />
                  <Route path="/movies" element={<AdminMovies />} />
                  <Route path="/search" element={<SearchMovieScreen />} />
                  <Route path="*" element={<Notfound />} />
               </Routes>
            </div>
            <div className="drawer-side">
               <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
               <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <Sidebar />
               </ul>
            </div>
         </div>
         {/* Modals */}

         <ActorModal />
         <MovieModal />
      </>
   );
};

export default AdminNavigator;
