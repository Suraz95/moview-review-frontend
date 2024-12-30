import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import ThemeToggle from "../misc/ThemeToggle";

// Icons
import {
   AiOutlineHome,
   AiOutlineUser,
   AiTwotoneVideoCamera,
   AiOutlineLogout,
   AiOutlinePlus,
} from "react-icons/ai";
import SearchMoviesInput from "./SearchMoviesInput";

const Sidebar = () => {
   const navigate = useNavigate();
   const logout = () => {
      localStorage.removeItem("auth-token");
      window.location.reload();
   };
   const handleSearchMovie = (query) => {
      if (!query.trim()) return;
      navigate("/search?title=" + query);
   };
   const onReset = () => {};

   return (
      <>
         {/* :LOGO and Theme Toggle */}
         <div className="flex items-center justify-between ">
            <Link to="/" className="flex items-center gap-3">
               <img src={Logo} alt="logo" className="w-16" />
               <p className="hidden md:block md:text-xl">RRReview</p>
            </Link>
            <ThemeToggle />
         </div>
         {/* Search bar */}
         {/* <Search placeholder={"Search.."} /> */}
         <SearchMoviesInput placeholder={"Search Movies..."} onSubmit={handleSearchMovie} />
         <NavItem to="/">
            <AiOutlineHome /> Home
         </NavItem>
         <NavItem to="/actors">
            <AiOutlineUser /> Actors
         </NavItem>
         <NavItem to="/movies">
            <AiTwotoneVideoCamera /> Movies
         </NavItem>
         {/* Add Buttons */}
         <button onClick={() => window.actor_modal.showModal()} className="btn bg-base-100 my-3">
            <AiOutlinePlus size={22} /> Add Actor
         </button>
         <button onClick={() => window.movie_modal.showModal()} className="btn bg-base-100 my-3">
            <AiOutlinePlus size={22} />
            Add Movie
         </button>
         {/* LogOut Button */}
         <button
            onClick={logout}
            className="mt-auto flex items-center justify-between btn btn-error btn-outline "
         >
            Admin Log Out
            <AiOutlineLogout size={28} />
         </button>
      </>
   );
};

const NavItem = ({ children, to }) => {
   return (
      <NavLink
         to={to}
         className={({ isActive }) =>
            isActive
               ? "flex items-center gap-x-2 text-lg text-primary font-semibold bg-base-100 rounded-md p-2 my-3 transition-all ease-in-out duration-200"
               : "flex items-center gap-x-2 text-lg font-semibold p-2 my-1"
         }
      >
         {children}
      </NavLink>
   );
};

export default Sidebar;
