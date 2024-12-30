import { useState, useContext, createContext } from "react";

const NotiContext = createContext();

export const NotiContextProvider = ({ children }) => {
   const [notification, setNotification] = useState("");
   const [alertType, setAlertType] = useState("");

   const updateNotification = (type, value) => {
      switch (type) {
         case "success":
            setAlertType("alert-success");
            break;
         case "error":
            setAlertType("alert-error");
            break;
         case "warning":
            setAlertType("alert-warning");
            break;
         case "info":
            setAlertType("alert-info");
            break;
         default:
            setAlertType("alert-error");
      }
      setNotification(value);
      // after 3 seconds reset the notification
      setTimeout(() => {
         setNotification("");
      }, 5000);
   };

   return (
      <NotiContext.Provider value={{ updateNotification }}>
         {children}
         {notification && (
            <div
               className={`fixed left-1/2 -translate-x-1/2 top-2 alert ${alertType} w-auto translate-y-5 transition-all duration-300 ease-in-out z-50`}
            >
               <span className="text-lg font-semibold">{notification}</span>
            </div>
         )}
      </NotiContext.Provider>
   );
};

export const useNotificationContext = () => useContext(NotiContext);
