import React, { Component } from "react";
import Variable from "./Variable";
import { initialState, calc, modelName, ModelResult } from './model';
import "./App.css";

function getVarValues(state) {
  return Object.keys(state).reduce((values, varName) => {
    values[varName] = state[varName].value;
    return values;
  }, {});
}

class App extends Component {
  state = initialState;

  onChange = (variable, newVal) => {
    this.setState(state => ({
      ...state,
      [variable]: {
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
        <div className="App-header colored-background-1">
          <h2>{modelName}</h2>
        </div>
        <div className="Calculator">
          {variables}
        </div>
        <div className="calculatorResult colored-background-1">
          <ModelResult result={result} />
        </div>
      </div>
    );
  }
}

export default App;
