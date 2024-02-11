import { useState } from "react";

export default function Dropdown() {
  const [selectedValue, setSelectedValue] = useState("option1");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <p>You selected: {selectedValue}</p>
    </div>
  );
}
