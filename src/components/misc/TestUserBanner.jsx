import React from "react";
import { useAuthContext } from "../../context/authContext";

const TestUserBanner = () => {
   const { authInfo } = useAuthContext();

   return (
      <>
         {authInfo?.profile?.email === "testuser@gmail.com" && (
            <div className="bg-info text-info-content w-full text-center p-1">
               This is a test Account, If you wish to visit Admin panel , contact Owner :
               <button className="link link-base font-semibold">kartikpavan2@gmail.com</button>
            </div>
         )}
      </>
   );
};

export default TestUserBanner;
