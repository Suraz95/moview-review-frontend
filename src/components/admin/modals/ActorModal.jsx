import React, { useState } from "react";
import ActorForm from "../ActorForm";
import { createActor } from "../../../api/actor";
import { useNotificationContext } from "../../../context/NotiContext";

const ActorModal = () => {
   const { updateNotification } = useNotificationContext();
   const [isLoading, setIsloading] = useState(false);

   const handleSubmit = async (actorInfo) => {
      setIsloading(true);
      const { actor, error } = await createActor(actorInfo);
      if (error) return updateNotification("error", error);
      updateNotification("success", "Actor Created Successfully");
      setIsloading(false);
      window.actor_modal.close();
   };

   return (
      <>
         <dialog id="actor_modal" className="modal">
            {/* //! later make this form tag  */}
            <div method="dialog" className="modal-box w-11/12 max-w-2xl">
               <form method="dialog" className="modal-backdrop">
                  <button className="btn btn-sm btn-circle absolute right-2 top-2">X</button>
               </form>

               <ActorForm
                  title={"Create New Actor"}
                  btnText={"Create"}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  profileToUpdate={false}
               />
            </div>
         </dialog>
      </>
   );
};

export default ActorModal;
