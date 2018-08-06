import React from "react";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, MarkSeries} from 'react-vis';
import "./Variable.css";

const graphSteps = 50;
const stepsRange = range(graphSteps);

function range(n) {
  return [...new Array(n).keys()];
}

const Variable = ({ displayName, values, onChange, name, fn, min, max }) => {
  const value = values[name];
  const y = fn({ ...values, [name]: value });
  const graphStepSize = (max - min) / graphSteps;
  const xValues = stepsRange.map(i => min + i * graphStepSize);
  const chartData = calculateSeries({
    values,
    name,
    fn,
    xValues
  });

  return (
    <div className="Variable">
      <label>
        {displayName}:
        <br />
        <XYPlot
          width={600}
          height={200}>
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={chartData} style={{ fill: 'none' }}/>
          <MarkSeries data={[{ x: value, y }]} />
        </XYPlot>
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step="any"
          onChange={e => onChange(name, parseFloat(e.target.value))}
        />
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={graphStepSize}
          onChange={e => onChange(name, parseFloat(e.target.value))}
        />
      </label>
    </div>
  );
};

function calculateSeries({ name, values, fn, xValues }) {
  const fnInput = { ...values };
  return xValues.map(x => {
    fnInput[name] = x;
    return { x, y: fn(fnInput) };
  });
}

export default Variable;
