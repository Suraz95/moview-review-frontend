import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendForgotPasswordLink } from "../../api/auth";
import { validEmail } from "../../utils/validator";
import { useNotificationContext } from "../../context/NotiContext";
import { Loader } from "../../components";

const ForgotPassword = () => {
   const { updateNotification } = useNotificationContext();
   const [isLoading, setIsLoading] = useState(false);
   const [email, setEmail] = useState("");

   const handleForgotPassword = async (e) => {
      e.preventDefault();
      // check if the email address is valid
      const isEmailValid = validEmail(email);
      if (!isEmailValid) return updateNotification("error", "Invalid Email");
      setIsLoading(true);
      // sending api request to an Endpoint
      const response = await sendForgotPasswordLink(email);
      if (response.error) {
         setIsLoading(false);
         return updateNotification("error", "user Email Not found");
      }
      updateNotification("success", response.msg);
      setIsLoading(false);
   };

   return (
      <>
         {isLoading && <Loader />}
         <section className="w-full h-[calc(100%-5rem)] flex items-center justify-center">
            <form onSubmit={handleForgotPassword} className="card w-96 bg-base-100 shadow-xl">
               <div className="card-body">
                  <h2 className="text-center text-lg font-semibold">Forgot Your Password?</h2>
                  <div className="border-l-4 border-primary shadow-md rounded-md p-1">
                     <p className="text-gray-500 text-center">
                        We get it, stuff happens. Just enter your email address below and we'll send
                        you a link to reset your password!
                     </p>
                  </div>

                  {/* Email Input */}
                  <div className="form-contaol w-full max-w-xs">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="Enter Email Address"
                        className="input input-bordered w-full max-w-xs"
                     />
                  </div>
                  {/* Submit Button */}
                  <div className="card-actions justify-center my-2">
                     <button type="submit" className="btn btn-primary btn-wide">
                        Send Email
                     </button>
                  </div>
                  <div className="flex items-center justify-between w-full">
                     {/* Forget Password */}
                     <Link to="/auth/signIn" className="link link-hover">
                        Sign In
                     </Link>

                     {/* Register new Account */}
                     <Link to="/auth/signUp" className="link link-hover">
                        Register
                     </Link>
                  </div>
               </div>
            </form>
         </section>
      </>
   );
};

export default ForgotPassword;
