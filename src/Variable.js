import React from "react";
import { LineChart } from 'react-d3';
import "./Variable.css";

const graphSteps = 60;

const Variable = ({ displayName, values, onChange, name, fn, min, max }) => {
  const value = values[name];
  const graphStepSize = (max - min) / graphSteps;
  const chartData = calculateSeries({ values, graphStepSize, name, fn, min, max });

  return (
    <div className="Variable">
      <label>
        {displayName}:
        <br />
        <LineChart
          legend={false}
          data={chartData}
          width={600}
          height={200}
        />
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step="any"
          onChange={e => onChange(name, e.target.value)}
        />
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={graphStepSize}
          onChange={e => onChange(name, e.target.value)}
        />
      </label>
    </div>
  );
};

function calculateSeries({ name, graphStepSize, values, fn, min, max }) {
  var lineData = [
    {
      name: 'series1',
      values: []
    }
  ];

  for (var i = 0; i <= graphSteps; i++) {
    const x = min + i * graphStepSize;
    const varData = { ...values, [name]: x };
    const y = fn(varData);
    lineData[0].values.push({ x, y });
  }

  return lineData;
}

export default Variable;
