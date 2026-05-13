import React, { useState } from "react";

const options = [
  {
    id: 1,
    label: "Hello",
    value: "hello",
  },
  {
    id: 2,
    label: "Shivam",
    value: "shivam",
  },
  {
    id: 3,
    label: "Upadhyay",
    value: "upadhyay",
  },
  {
    id: 4,
    label: "Number",
    value: "number",
  },
];
const MultiSelectDropDown = () => {
  const [selected, setSelected] = useState([]);
  const handleOptionSelect = (value) => {
    setSelected((prev) => !prev.includes(value) && [...prev, value]);
  };
  const handleRemoveOption = (value) => {
    setSelected(
      (prev) => prev.includes(value) && prev.filter((item) => item !== value),
    );
  };
  return (
    <>
      {selected?.length > 0 &&
        selected.map((item) => (
          <div key={item}>
            {item} <span onClick={() => handleRemoveOption(item)}>Remove</span>
          </div>
        ))}
      <select onChange={(e) => handleOptionSelect(e.target.value)}>
        {options?.map((item) => (
          <option key={item?.id} value={item?.value}>
            {item?.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default MultiSelectDropDown;
