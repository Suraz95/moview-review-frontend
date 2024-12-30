import React, { useState } from "react";

const SearchActorsInput = ({ placeholder, onSubmit, showResetIcon, onReset }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full max-w-lg"
      />
      {showResetIcon ? (
        <button
          type="button"
          onClick={() => {
            setSearchTerm("");
            onReset();
          }}
          className="link link-primary w-full text-right mt-2"
        >
          Clear Search
        </button>
      ) : null}
    </form>
  );
};

export default SearchActorsInput;
