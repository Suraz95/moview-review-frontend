import React, { useState } from "react";
import { ReviewForm } from "../../ReviewForm";
import { addReview } from "../../../api/review";
import { useNotificationContext } from "../../../context/NotiContext";

const AddRatingModal = ({ movieId, onSuccess }) => {
   const { updateNotification } = useNotificationContext();
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (data) => {
      setIsLoading(true);
      const { error, msg, reviews } = await addReview(data, movieId);
      if (error) {
         setIsLoading(false);
         return updateNotification("error", error);
      }
      updateNotification("info", msg);
      setIsLoading(false);
      onSuccess(reviews);
      window.add_rating_modal.close();
   };
   return (
      <>
         <dialog id="add_rating_modal" className="modal">
            <div method="dialog" className="modal-box w-full max-w-sm">
               <form method="dialog" className="modal-backdrop">
                  <button className="btn btn-sm btn-circle absolute right-2 top-2">X</button>
               </form>
               <ReviewForm onsubmit={handleSubmit} busy={isLoading} btnText={"Add Review"} />
            </div>
         </dialog>
      </>
   );
};

export default AddRatingModal;
