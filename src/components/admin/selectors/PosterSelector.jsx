import React from "react";

const PosterSelector = ({ accept, name, selectedPoster, onChange, forActor }) => {
  return (
    <div className={`border border-dashed rounded-md ${forActor ? "w-44" : null}`}>
      <input accept={accept} onChange={onChange} id={name} name={name} type="file" hidden />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img src={selectedPoster} alt={name} className="w-full object-contain h-48" />
        ) : (
          <PosterUI />
        )}
      </label>
    </div>
  );
};

const PosterUI = () => {
  return (
    <div className="flex items-center justify-center aspect-square cursor-pointer">
      <span className="text-lg font-semibold">Select Poster</span>
    </div>
  );
};
export default PosterSelector;
