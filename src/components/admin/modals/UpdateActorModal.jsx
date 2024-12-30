import React, { useState } from "react";
import ActorForm from "../ActorForm";
import { updateActor } from "../../../api/actor";
import { useNotificationContext } from "../../../context/NotiContext";

const UpdateActorModal = ({ profileToUpdate }) => {
   const { updateNotification } = useNotificationContext();
   const [isLoading, setIsloading] = useState(false);

   const handleSubmit = async (formData) => {
      setIsloading(true);
      const { actor, error } = await updateActor(profileToUpdate._id, formData);
      if (error) return updateNotification("error", error);
      updateNotification("success", "Actor Updated Successfully, Please Reload to see the changes");
      setIsloading(false);
      window.update_actor_modal.close();
   };

   return (
      <>
         <dialog id="update_actor_modal" className="modal">
            {/* //! later make this form tag  */}
            <div method="dialog" className="modal-box w-11/12 max-w-2xl">
               <form method="dialog" className="modal-backdrop">
                  <button className="btn btn-sm btn-circle absolute right-2 top-2">X</button>
               </form>

               <ActorForm
                  title={"Update Actor"}
                  btnText={"Update"}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  profileToUpdate={profileToUpdate}
               />
            </div>
         </dialog>
      </>
   );
};

export default UpdateActorModal;
