import React, { useEffect, useState } from "react";
import {
   TagField,
   LiveSearch,
   CastField,
   WritersModal,
   CastModal,
   PosterSelector,
   GenreSelector,
   GenreModal,
   Selector,
} from "../../components";
import { languageOptions, results, statusOptions, typeOptions } from "../../data/data";
import { useSearchContext } from "../../context/SearchContext";
import { searchActor } from "../../api/actor";
import { validateMovieInfo } from "../../utils/validator";
import { useNotificationContext } from "../../context/NotiContext";

const defaultMovieInfo = {
   title: "",
   storyLine: "",
   tags: [],
   cast: [],
   director: {},
   writers: [],
   releaseDate: "",
   poster: null,
   genres: [],
   type: "",
   language: "",
   status: "",
};

const MovieForm = ({ onSubmit, isLoading, movieToUpdate }) => {
   const { updateNotification } = useNotificationContext();
   const { handleSearch, isSearching, results, resetSearch } = useSearchContext();
   const [movieInfo, setMovieInfo] = useState(defaultMovieInfo);
   const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
   const [writerName, setWriterName] = useState("");
   const [writersProfile, setWritersProfile] = useState([]);
   const [directorProfile, setDirectorProfile] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { ok, error } = validateMovieInfo(movieInfo);
      if (!ok) return updateNotification("error", error);

      // cast,tags,writers and genres must be converted into string
      const { tags, genres, cast, writers, director, poster } = movieInfo;
      const formData = new FormData();

      const finalMovieInfo = {
         ...movieInfo,
      };

      finalMovieInfo.tags = JSON.stringify(tags);
      finalMovieInfo.genres = JSON.stringify(genres);

      const finalCast = cast.map((c) => {
         return {
            actor: c.profile._id,
            roleAs: c.roleAs,
            leadActor: c.leadActor,
         };
      });
      finalMovieInfo.cast = JSON.stringify(finalCast);

      if (writers.length) {
         const finalWriters = writers.map((w) => w._id);
         finalMovieInfo.writers = JSON.stringify(finalWriters);
      }

      if (director._id) {
         finalMovieInfo.director = director._id;
      }

      if (poster) finalMovieInfo.poster = poster;

      for (let key in finalMovieInfo) {
         formData.append(key, finalMovieInfo[key]);
      }

      onSubmit(formData, setMovieInfo, defaultMovieInfo);
   };

   const updatePosterforUI = (poster) => {
      const url = URL.createObjectURL(poster);
      setSelectedPosterForUI(url);
   };

   const handleChange = ({ target }) => {
      const { value, name, files } = target;
      if (name === "poster") {
         // poster upload to cloud
         const poster = files[0];
         updatePosterforUI(poster);
         return setMovieInfo({ ...movieInfo, poster });
      }
      if (name === "writers") return setWriterName(value);
      setMovieInfo({ ...movieInfo, [name]: value });
   };

   //tags
   const updateTags = (allTags) => {
      setMovieInfo({ ...movieInfo, tags: allTags });
   };

   //director
   const updateDirector = (profile) => {
      setMovieInfo({ ...movieInfo, director: profile });
      resetSearch(); // this function indicates that we have selected the item and  reset the state values inside searchContext
   };

   //writers
   const updateWriters = (profile) => {
      const { writers } = movieInfo;
      // Checking if the writer is already present inside the writer array
      for (let writer of writers) {
         if (writer._id === profile._id)
            return updateNotification("warning", "Writer is already selected");
      }
      setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
      setWriterName("");
   };
   const removeWriter = (profileId) => {
      const { writers } = movieInfo;
      const newWriters = writers.filter((w) => w._id !== profileId);
      setMovieInfo({ ...movieInfo, writers: [...newWriters] });
   };

   //cast and crew
   const updateCast = (castInfo) => {
      setMovieInfo({ ...movieInfo, cast: [...movieInfo.cast, castInfo] });
   };
   const removeActor = (profileId) => {
      const { cast } = movieInfo;
      const newCast = cast.filter(({ profile }) => profile._id !== profileId);
      setMovieInfo({ ...movieInfo, cast: [...newCast] });
   };

   // genres
   const updateGenres = (genres) => {
      setMovieInfo({ ...movieInfo, genres });
   };

   // checking for live input field change
   const searchFieldChange = ({ target }) => {
      const { value, name } = target;
      if (name === "director") {
         setMovieInfo({ ...movieInfo, director: { name: value } }); // display director name as value in input field when selected from dropdown
         handleSearch(searchActor, value, setDirectorProfile);
      }
      if (name === "writers") {
         setWriterName(value);
         handleSearch(searchActor, value, setWritersProfile);
      }
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

   useEffect(() => {
      if (movieToUpdate) {
         setMovieInfo({ ...movieToUpdate, poster: null, releaseDate: releaseDate.split("T")[0] });
         setSelectedPosterForUI(movieToUpdate.poster.url);
      }
   }, [movieToUpdate]);

   const {
      title,
      releaseDate,
      storyLine,
      director,
      writers,
      cast,
      tags,
      genres,
      type,
      language,
      status,
   } = movieInfo;
   return (
      <>
         <form>
            <main className="flex gap-4 flex-col sm:flex-row h-full">
               {/* First Section */}
               <section className="w-full sm:w-[60%]">
                  {/* Title */}
                  <div>
                     <label className="label">
                        <span className="label-text font-semibold">Title</span>
                     </label>
                     <input
                        value={title}
                        onChange={handleChange}
                        name="title"
                        type="text"
                        placeholder="Type here"
                        className="input input-sm input-bordered w-full"
                     />
                  </div>

                  {/* Movie Description */}
                  <div>
                     <label className="label">
                        <span className="label-text font-semibold ">Storyline</span>
                     </label>
                     <textarea
                        value={storyLine}
                        onChange={handleChange}
                        name="storyLine"
                        className="textarea textarea-bordered h-24 w-full"
                        placeholder="Storyline"
                     ></textarea>
                  </div>
                  {/* Tag Field */}
                  <div className="mb-2">
                     <label className="label">
                        <span className="label-text font-semibold">Tags</span>
                     </label>
                     <TagField value={tags} name="tags" onChange={updateTags} />
                  </div>

                  {/* Cast and Crew */}
                  <h1 className=" font-semibold ">
                     Cast and Crew <span className="badge badge-sm">{cast?.length}</span>
                     <span
                        className="label-text-alt link mx-2"
                        onClick={() => window.cast_modal.showModal()}
                     >
                        View All
                     </span>
                  </h1>
                  {/* Cast */}
                  <CastField onSubmit={updateCast} />
                  {/* Director */}
                  <div>
                     <label className="label">
                        <span className="label-text font-semibold">Director</span>
                     </label>
                     <LiveSearch
                        name="director"
                        placeholder="Search Profile"
                        value={director.name}
                        results={directorProfile}
                        onSelect={updateDirector}
                        renderItem={renderItem}
                        onChange={searchFieldChange}
                     />
                  </div>
                  {/* Writers */}
                  <div>
                     <label className="label">
                        <span className="label-text  font-sesmibold">
                           Writers <span className="badge badge-sm">{writers?.length}</span>
                        </span>
                        <span
                           className="label-text-alt link mx-14"
                           onClick={() => window.writers_modal.showModal()}
                        >
                           View All
                        </span>
                     </label>
                     <LiveSearch
                        name="writers"
                        placeholder="Search Profile"
                        value={writerName}
                        results={writersProfile}
                        onSelect={updateWriters}
                        renderItem={renderItem}
                        onChange={searchFieldChange}
                     />
                  </div>
                  {/* Date Picker */}
                  <div className="mt-4">
                     <input
                        className="input input-bordered"
                        type="date"
                        name="releaseDate"
                        onChange={handleChange}
                        value={releaseDate}
                     />
                  </div>
               </section>
               {/* Second Section */}
               <section className="w-full sm:w-[40%] border-gray-400">
                  <PosterSelector
                     name="poster"
                     onChange={handleChange}
                     selectedPoster={selectedPosterForUI}
                     accept="image/jpg,image/jpeg,image/png"
                  />
                  <GenreSelector totalGenresSelected={genres?.length} />
                  <Selector
                     label="Type"
                     options={typeOptions}
                     onChange={handleChange}
                     name="type"
                     value={type}
                  />
                  <Selector
                     label="Language"
                     options={languageOptions}
                     onChange={handleChange}
                     name="language"
                     value={language}
                  />
                  <Selector
                     label="Status"
                     options={statusOptions}
                     onChange={handleChange}
                     name="status"
                     value={status}
                  />
               </section>
            </main>
            <div className="w-full grid place-items-center">
               <SubmitFormButton isLoading={isLoading} onClick={handleSubmit} />
            </div>
         </form>
         <WritersModal profiles={writers} removeWriter={removeWriter} />
         <CastModal profiles={cast} removeActor={removeActor} />
         <GenreModal onSubmit={updateGenres} />
      </>
   );
};

const SubmitFormButton = ({ isLoading, onClick }) => {
   return (
      <>
         <button className="btn mt-4 w-1/2 text-lg btn-primary" type="button" onClick={onClick}>
            {isLoading && (
               <>
                  <span className="loading loading-spinner"></span>
                  Uploading Movie Please Wait
               </>
            )}
            {!isLoading && "Upload Movie"}
         </button>
      </>
   );
};

export default MovieForm;
