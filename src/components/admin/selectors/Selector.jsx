import React from "react";

const Selector = ({ name, value, onChange, label, options }) => {
  return (
    <div className="mt-4">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="select select-bordered w-full sm:w-1/2"
      >
        <option disabled label={label}>
          {label}
        </option>
        {options?.map((opt, idx) => {
          const { title, value } = opt;
          return (
            <option key={idx} value={value}>
              {title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selector;
