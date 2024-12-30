import { useState } from "react";
import LiveSearch from "./LiveSearch";
import { results } from "../../../data/data";
import { useSearchContext } from "../../../context/SearchContext";
import { searchActor } from "../../../api/actor";
import { useNotificationContext } from "../../../context/NotiContext";

// cast = [{actor:id,roleAs:" ",leadActor:true}]
const defaultCast = {
   profile: {},
   roleAs: "",
   leadActor: false,
};
const CastField = ({ onSubmit }) => {
   const { updateNotification } = useNotificationContext();
   const { handleSearch, resetSearch } = useSearchContext();
   const [castInfo, setCastInfo] = useState({ ...defaultCast });
   const [profiles, setProfiles] = useState([]);

   const handleChange = ({ target }) => {
      const { name, value, checked } = target;
      if (name === "leadActor") return setCastInfo({ ...castInfo, leadActor: true });
      setCastInfo({ ...castInfo, [name]: value });
   };

   const handleProfileSelect = (profile) => {
      setCastInfo({ ...castInfo, profile });
   };

   const handleSubmit = () => {
      const { profile, roleAs } = castInfo;
      if (!profile.name) return updateNotification("error", "Cast Profile is missing");
      if (!roleAs.trim()) return updateNotification("error", "Cast Role is missing");
      onSubmit(castInfo);
      setCastInfo({ ...defaultCast, profile: { name: "" } });
      updateNotification("info", "Cast Updated ");
      resetSearch(); // resetting search field
      setProfiles([]); // clearing all input fields
   };

   const searchFieldChange = ({ target }) => {
      const { value, name } = target;
      const { profile } = castInfo;
      profile.name = value;
      setCastInfo({ ...castInfo, ...profile });
      handleSearch(searchActor, value, setProfiles);
   };

   const renderItem = (result) => {
      const { name, avatar, id } = result;
      return (
         <div key={id} className="flex items-center space-x-2">
            <img src={avatar.url} alt={name} className="w-12 h-12 rounded-full object-cover" />
            <p className="font-semibold">{result.name}</p>
         </div>
      );
   };

   const { leadActor, profile, roleAs } = castInfo;
   return (
      <div className="flex flex-col gap-2 mt-2">
         <div className="flex space-x-2 items-center font-semibold">
            <input
               type="checkbox"
               name="leadActor"
               checked={leadActor}
               className="checkbox"
               onChange={handleChange}
            />
            <span className="label-text">Lead Actor </span>
         </div>

         <div className="flex flex-col sm:flex-row items-center space-x-2">
            <LiveSearch
               placeholder="Search Profile"
               value={profile.name}
               results={profiles}
               onSelect={handleProfileSelect}
               renderItem={renderItem}
               onChange={searchFieldChange}
            />
            <span>as</span>
            <input
               value={roleAs}
               onChange={handleChange}
               name="roleAs"
               type="text"
               placeholder="Type here"
               className="input input-bordered"
            />
         </div>
         <button
            type="button"
            className="btn btn-base-300 btn-sm mt-2 w-full sm:max-w-[40%]"
            onClick={handleSubmit}
         >
            Add Actor
         </button>
      </div>
   );
};

export default CastField;
