import React, { useEffect, useState } from "react";
import PosterSelector from "./selectors/PosterSelector";
import { validateActorInfo } from "../../utils/validator";
import { useNotificationContext } from "../../context/NotiContext";

const defaultActorValues = {
   name: "",
   description: "",
   gender: "male",
   avatar: null,
};
const ActorForm = ({ btnText, title, onSubmit, isLoading, profileToUpdate }) => {
   const { updateNotification } = useNotificationContext();
   const [actorInfo, setActorInfo] = useState(defaultActorValues);
   const [selectedPosterForUI, setSelectedPosterForUI] = useState(false);

   const updatePosterforUI = (poster) => {
      const url = URL.createObjectURL(poster);
      setSelectedPosterForUI(url);
   };

   const handleChange = ({ target }) => {
      const { name, value, files } = target;
      if (name === "avatar") {
         const avatar = files[0];
         updatePosterforUI(avatar);
         return setActorInfo({ ...actorInfo, avatar });
      }
      setActorInfo({ ...actorInfo, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const { ok, error } = validateActorInfo(actorInfo);
      if (!ok) updateNotification("error", error);
      // submit form
      const formData = new FormData();
      for (let key in actorInfo) {
         if (key) {
            formData.append(key, actorInfo[key]);
         }
      }
      onSubmit(formData);
      setActorInfo({ ...defaultActorValues });
   };

   useEffect(() => {
      if (profileToUpdate) {
         setActorInfo({ ...profileToUpdate, avatar: null });
         setSelectedPosterForUI(profileToUpdate.avatar.url);
      }
   }, [profileToUpdate]);

   const { gender, name, description } = actorInfo;
   return (
      <>
         <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold mx-auto my-2">{title}</h1>
         </div>
         <form onSubmit={handleSubmit}>
            <div className="flex space-x-2 ">
               <PosterSelector
                  forActor={true}
                  selectedPoster={selectedPosterForUI}
                  name={"avatar"}
                  onChange={handleChange}
                  accept={"image/jpg,image/jpeg,image/png"}
               />
               <div className="flex-grow flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                     {/* name */}
                     <input
                        name={"name"}
                        value={name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Name"
                        className="my-2 input input-bordered w-3/4"
                     />
                     {/* gender */}
                     <select
                        id={gender}
                        name={"gender"}
                        value={actorInfo.gender}
                        onChange={handleChange}
                        className="select select-bordered w-1/4"
                     >
                        <option value={"male"} defaultValue>
                           Male
                        </option>
                        <option value={"female"}>Female</option>
                        <option value={"others"}>Others</option>
                     </select>
                  </div>
                  {/* About */}
                  <textarea
                     name={"description"}
                     value={description}
                     onChange={handleChange}
                     className="textarea textarea-bordered w-full h-full"
                     placeholder="Description"
                  ></textarea>
               </div>
            </div>
            {isLoading ? (
               <button type="button" className="btn w-full btn-sm mt-3" disabled={isLoading}>
                  <span className="loading loading-spinner"></span>
                  Uploading
               </button>
            ) : (
               <button className="btn w-full btn-sm mt-3 btn-primary" type="submit">
                  {btnText}
               </button>
            )}
         </form>
      </>
   );
};

export default ActorForm;
