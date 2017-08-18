import React from "react";
import { LineChart } from 'react-d3';

import "./Variable.css";

const Variable = ({ value, onChange, name }) => (
  <div className="Variable">
    <label>
      {name}:
      <br />
      <LineChart
        legend={false}
        data={calculateSeries(value)}
        width={600}
        height={200}
      />
      <input
        type="range"
        value={value}
        min={1}
        max={30}
        onChange={e => onChange(name, e.target.value)}
      />
      <input
        type="number"
        value={value}
        min={1}
        max={30}
        onChange={e => onChange(name, e.target.value)}
      />
    </label>
  </div>
);

let calculateSeries = (value) => {
  var lineData = [
    {
      name: 'series1',
      values: []
    }
  ]
  for(var i =1; i<=30; i++) {
    lineData[0].values.push({x: i, y: i/value});
  }

  return lineData;
}

export default Variable;
