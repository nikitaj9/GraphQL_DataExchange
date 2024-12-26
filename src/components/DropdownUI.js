import React from "react";

const Dropdown = ({ label, options, selectedValue, onSelect, loading, error }) => {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <select
          value={selectedValue}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="">-- Select an option --</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Dropdown;
