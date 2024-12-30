import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { changePassword, verifyPassResetToken } from "../../api/auth";
import { useNotificationContext } from "../../context/NotiContext";
import { Loader } from "../../components";

//http://localhost:5173/auth/reset-password?token=e72a10f8effc9e4c2dc7ba817f529fae5b50e711bf2082fb5df79c0b0619&id=647db2bd892e4522da3ed649
const ResetPassword = () => {
   const navigate = useNavigate();
   let [searchParams, setSearchParams] = useSearchParams();
   const { updateNotification } = useNotificationContext();

   // States for veryfing and validating password reset token in URL search Params
   const [isVeryfing, setIsVeryfing] = useState(true);
   const [isValid, setIsValid] = useState(false);

   //local state
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const userId = searchParams.get("id");
   const token = searchParams.get("token");

   const handleResetPassword = async (e) => {
      e.preventDefault();
      if (!oldPassword.trim()) return updateNotification("error", "Password missing");
      if (oldPassword.trim().length < 6)
         return updateNotification("error", "Password must be 6 characters");
      if (oldPassword !== newPassword) return updateNotification("error", "Passwords Do not match");

      // sending API request to the backend to change password
      const data = { userId: userId, token: token, newPassword: newPassword };
      setIsLoading(true);
      const response = await changePassword(data);
      if (response.error) {
         setIsLoading(false);
         return updateNotification("error", error);
      }
      setIsLoading(false);
      updateNotification("success", response.msg);
      return navigate("/auth/signIn", { replace: true });
   };

   useEffect(() => {
      checkValidPasswordResetToken();
   }, []);

   // check if the reset-pass token is valid or not
   const checkValidPasswordResetToken = async () => {
      const { error, valid } = await verifyPassResetToken(userId, token);
      setIsVeryfing(false);
      if (error) {
         // navigate("/auth/reset-password", { replace: true });
         return updateNotification("error", error);
      }
      if (!valid) {
         setIsValid(false);
         return navigate("/auth/reset-password/", { replace: true });
      }
      setIsValid(true);
   };

   if (isVeryfing) {
      return (
         <section className="w-full h-[calc(100%-5rem)] flex flex-col gap-y-5 items-center justify-center">
            <h1 className="text-xl   md:text-4xl text-secondary font-semibold">
               Plase Wait while we verify your token
            </h1>
            <div className="loading loading-spinner loading-md md:loading-lg text-secondary"></div>
         </section>
      );
   }

   if (!isValid) {
      return (
         <section className="w-full h-[calc(100%-5rem)] flex flex-col gap-y-5 items-center justify-center">
            <h1 className="text-xl   md:text-4xl text-secondary font-semibold">
               Sorry, Token is Invalid
            </h1>
         </section>
      );
   }

   return (
      <>
         {isLoading && <Loader />}
         <section className="w-full h-[calc(100%-5rem)] flex items-center justify-center">
            <form onSubmit={handleResetPassword} className="card w-96 bg-base-100 shadow-xl">
               <div className="card-body">
                  <h2 className="text-center text-lg font-semibold">Change Password</h2>

                  {/* New Password input */}
                  <div className="form-control w-full max-w-xs relative">
                     <label className="label">
                        <span className="label-text">New Password</span>
                     </label>
                     <input
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        type="password"
                        placeholder="********"
                        className="input input-bordered w-full max-w-xs"
                     />
                     <AiOutlineEyeInvisible className="absolute bottom-3 right-3 h-6 w-6" />
                  </div>
                  {/* Confirm Password input */}
                  <div className="form-control w-full max-w-xs relative">
                     <label className="label">
                        <span className="label-text">Confirm Password</span>
                     </label>
                     <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type="password"
                        placeholder="********"
                        className="input input-bordered w-full max-w-xs"
                     />
                     <AiOutlineEyeInvisible className="absolute bottom-3 right-3 h-6 w-6" />
                  </div>
                  {/* Submit Button */}
                  <div className="card-actions justify-center my-2">
                     <button type="submit" className="btn btn-primary btn-wide">
                        Confirm
                     </button>
                  </div>
               </div>
            </form>
         </section>
      </>
   );
};

export default ResetPassword;
