import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotificationContext } from "../../context/NotiContext";
import { Loader } from "../../components";

const EmailVerification = () => {
  const navigate = useNavigate();
  const { updateNotification } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      setIsLoading(true);
      // Automatically verifying user without OTP
      try {
        // Simulate successful verification process
        updateNotification(
          "success",
          "Your account has been successfully verified."
        );
        navigate("/");
      } catch (error) {
        updateNotification(
          "error",
          "Verification failed. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [navigate, updateNotification]);

  return (
    <>
      {isLoading && <Loader />}
      <section className="w-full h-[calc(100%-5rem)] flex items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-lg font-semibold">
              Verifying Your Account
            </h2>
            <p className="text-gray-500 text-center">
              Please wait while we verify your account...
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmailVerification;
