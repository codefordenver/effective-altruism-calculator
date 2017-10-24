import React from "react";
import { LineChart } from 'react-d3';
import d3 from 'd3'

import "./Variable.css";

const Variable = ({ value, onChange, name, result,description }) => (
  <div className="Variable">
    <label className="DescriptionTitle">
      Description:
    </label>
    <br />
    <label className="Description">
      {description} 
    </label>
    <br />
    <br />
    <label>
      {name}:
      <br />
      <LineChart
        legend={false}
        data={calculateSeries(value, result)}
        width={600}
        height={200}
        circleRadius = {5}

        colors = {d3.scale.category20c()}
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

let calculateSeries = (value, result) => {
  var lineData = [
    {
      name: 'series1',
      values: []
    }
  ]
  for(var i =1; i<=30; i++) {
    lineData[0].values.push({x: i, y: (i/value) * result});
  }

  return lineData;
}

export default Variable;
