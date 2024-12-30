import React, { useEffect, useRef, useState } from "react";

const TagField = ({ name, onChange, value }) => {
  const [tag, setTag] = useState("");
  const [allTags, setAllTags] = useState([]);
  const inputRef = useRef();

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
    onChange(allTags);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return; // if there is no tag return
      if (allTags.includes(tag)) return setTag(""); // if tag exists in array , do not add it
      setAllTags([...allTags, tag]); // else if tag is new then push it inside array
      setTag(""); // reset input field
    }
  };

  const removeTag = (index) => {
    let newTagList = allTags.filter((_, idx) => idx !== index);
    setAllTags(newTagList);
  };

  useEffect(() => {
    if (value?.length) setAllTags(value);
  }, [value]);

  useEffect(() => {
    inputRef.current.scrollIntoView({ behavior: "smooth" });
  }, [tag]);

  return (
    <div
      onKeyDown={handleKeyDown}
      className="custom-scroll-bar border rounded-lg w-full px-2 py-1 flex items-center space-x-1 overflow-x-auto"
    >
      {allTags.map((t, idx) => {
        return (
          <Tag key={idx} onClick={() => removeTag(idx)}>
            {t}
          </Tag>
        );
      })}
      <input
        ref={inputRef}
        value={tag}
        onChange={handleOnChange}
        name={name}
        type="text"
        placeholder="tag one, tag two"
        className="flex flex-grow bg-transparent outline-none"
      />
    </div>
  );
};

const Tag = ({ children, onClick }) => {
  return (
    <div className="badge badge-info gap-x-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-4 h-4 stroke-current cursor-pointer"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      {children}
    </div>
  );
};

export default TagField;
