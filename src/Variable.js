import React from "react";
import "./Variable.css";

const Variable = ({ value, onChange, name }) => (
  <div className="Variable">
    <label>
      {name}:
      {" "}
      <input
        type="number"
        value={value}
        onChange={e => onChange(name, e.target.value)}
      />
    </label>
  </div>
);

export default Variable;
