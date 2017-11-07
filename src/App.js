import React, { Component } from "react";
import Variable from "./Variable";
import "./App.css";

function getVarValues(state) {
  return Object.keys(state).reduce((values, varName) => {
    values[varName] = state[varName].value;
    return values;
  }, {});
}

const initialState = {
  numPeople: { value: 100, min: 0, max: 10000, displayName: 'Number of people' },
  years: { value: 5, min: 0, max: 100, displayName: 'Number of years' },
  qualityImprovement: { value: 0.1, min: 0, max: 1, displayName: 'Average quality of life improvement over that time' },
  cost: { value: 10, min: 1, max: 100, displayName: 'Cost (1000 USD)' },
  chanceOfSuccess: { value: 0.1, min: 0, max: 1, displayName: 'Chance of Success'},
};

function calc({ numPeople, years, qualityImprovement, cost, chanceOfSuccess }) {
  const QALY = numPeople * years * qualityImprovement / cost * chanceOfSuccess;
  return QALY;
}

class App extends Component {
  state = initialState;

  onChange = (variable, newVal) => {
    this.setState(state => ({
      ...state, [variable]: {
        ...state[variable],
        value: newVal
      }
    }));
  };

  render() {

    const varValues = getVarValues(this.state);
    const result = calc(varValues).toFixed(2);

    const variables = Object.keys(this.state).map(varName => {
      const varData = this.state[varName];
      return (
        <Variable
          key={varName}
          onChange={this.onChange}
          name={varName}
          values={varValues}
          fn={calc}
          {...varData}
        />
      );
    });

    return (
      <div className="App">
        <div className="App-header">
          <h2>Effective Altruism Calculator</h2>
        </div>
        <div className="Calculator">
          {variables}
        </div>
        <div className="calculatorResult">
          Expected Value: {result} QALYs / 1000 USD
        </div>
      </div>
    );
  }
}

export default App;
