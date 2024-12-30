import React, { useEffect, useState } from "react";
import { useNotificationContext } from "../../../context/NotiContext";
import { getSingleActor } from "../../../api/actor";

const ActorProfileModal = ({ actorId }) => {
   const { updateNotification } = useNotificationContext();
   const [actor, setActor] = useState({});
   const [isLoading, setIsLoading] = useState(false);

   const fetchSingleActor = async () => {
      setIsLoading(true);
      const { error, data } = await getSingleActor(actorId);
      if (error) {
         setIsLoading(false);
         return updateNotification("error", error);
      }
      setActor({ ...data });
      setIsLoading(false);
   };

   useEffect(() => {
      if (actorId) {
         fetchSingleActor();
      }
   }, [actorId]);

   return (
      <dialog id="actor_profile_modal" className="modal">
         <div method="dialog" className="modal-box">
            <form method="dialog" className="modal-backdrop">
               <button className="btn btn-sm btn-circle absolute right-2 top-2">X</button>
            </form>
            {/* Loader */}
            <div className="w-full flex flex-col gap-2 items-center justify-center ">
               {isLoading ? (
                  <>
                     <div className="loading loading-ring loading-lg block"></div>
                     <p className="text-gray-400"> Fetching profile...</p>
                  </>
               ) : (
                  actor && (
                     <div className="flex items-center justify-center flex-col gap-y-2">
                        <img
                           src={actor?.avatar?.url}
                           alt={actor?.name}
                           className="w-28 h-28 object-cover aspect-auto rounded-full shadow-md"
                        />
                        <h1 className="text-lg md:text-2xl text-primary font-semibold">
                           {actor?.name}
                        </h1>
                        <p className="text-sm md:text-lg text-gray-400 text-center">
                           {actor?.description}
                        </p>
                     </div>
                  )
               )}
            </div>
         </div>
      </dialog>
   );
};

export default ActorProfileModal;
