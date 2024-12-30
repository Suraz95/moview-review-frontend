import React, { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const ProtectedAuth = ({ children }) => {
   const navigate = useNavigate();
   const { authInfo } = useAuthContext();

   useEffect(() => {
      // if user is logged in, block access to auth routes
      if (authInfo.isLoggedIn) navigate("/", { replace: true });
   }, [authInfo.isLoggedIn]);

   return <>{children}</>;
};

export default ProtectedAuth;
