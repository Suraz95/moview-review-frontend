import React, { useState } from "react";
import { ReviewForm } from "../../ReviewForm";
import { editReview } from "../../../api/review";
import { useNotificationContext } from "../../../context/NotiContext";

const EditRatingModal = ({ movieId, onSuccess, initialState }) => {
   const { updateNotification } = useNotificationContext();
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (formData) => {
      setIsLoading(true);
      const { error, msg, data } = await editReview(initialState.reviewId, formData);
      if (error) {
         setIsLoading(false);
         return updateNotification("error", error);
      }
      updateNotification("info", msg);
      setIsLoading(false);
      onSuccess(data);
      window.edit_rating_modal.close();
   };
   return (
      <>
         <dialog id="edit_rating_modal" className="modal">
            <div method="dialog" className="modal-box w-full max-w-sm">
               <form method="dialog" className="modal-backdrop">
                  <button className="btn btn-sm btn-circle absolute right-2 top-2">X</button>
               </form>
               <ReviewForm
                  onsubmit={handleSubmit}
                  busy={isLoading}
                  initialState={initialState}
                  btnText={"Edit Review"}
               />
            </div>
         </dialog>
      </>
   );
};

export default EditRatingModal;
