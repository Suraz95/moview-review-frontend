import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { RiShutDownLine } from "react-icons/ri";

import { useAuthContext } from "../context/authContext";
import { useNotificationContext } from "../context/NotiContext";
import { SearchMoviesInput, ThemeToggle } from "../components";

const Navbar = () => {
   const navigate = useNavigate();
   const { authInfo, handleLogOut } = useAuthContext();
   const { updateNotification } = useNotificationContext();

   const logOut = () => {
      handleLogOut();
      updateNotification("info", "Logged out Successfully");
   };

   const handleSearchMovies = (query) => {
      if (query) {
         navigate(`/movie/search?title=${query}`);
      }
      if (query === "") {
         navigate(`/`);
      }
   };

   return (
      <nav className="navbar bg-primary text-primary-content ">
         {/* navbar width*/}
         <div className="w-full lg:w-[80%] xl:w-[70%]  mx-auto">
            <div className="flex items-center justify-between w-full">
               {/* Logo */}
               <NavLink to="/" className="flex items-center gap-3">
                  <img src={Logo} alt="logo" className="w-12 md:w-16" />
                  <p className="hidden md:block md:text-2xl font-semibold">RRReview</p>
               </NavLink>
               <div className="flex items-center gap-3">
                  {/* Theme toggle */}
                  <ThemeToggle />
                  {/* Search Input */}

                  <SearchMoviesInput placeholder={"Search"} onSubmit={handleSearchMovies} />
                  {authInfo?.isLoggedIn ? (
                     <button onClick={logOut} className="btn btn-sm md:btn-md btn-error">
                        <RiShutDownLine className="text-md md:text-xl" />
                     </button>
                  ) : (
                     <NavLink to="/auth/signIn" className="btn btn-ghost md:text-lg">
                        Login
                     </NavLink>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
