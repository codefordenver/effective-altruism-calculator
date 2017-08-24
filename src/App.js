import React, { Component } from "react";
import Variable from "./Variable";
import "./App.css";

class App extends Component {
  state = {
    numPeople: 1,
    years: 1,
    qualityImprovement: 0.1
  };

  onChange = (variable, newVal) => {
    this.setState(state => ({ ...state, [variable]: newVal }));
  };

  render() {

    let result = calc(this.state);

    const variables = Object.keys(this.state).map(varName => (
      <Variable
        key={varName}
        onChange={this.onChange}
        name={varName}
        value={this.state[varName]}
        result={result}
      />
    ));

    return (
      <div className="App">
        <div className="App-header">
          <h2>Effective Altruism Calculator</h2>
        </div>
        <div className="Calculator">
          {variables}
          <div>
            Result: {result}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

function calc({ numPeople, years, qualityImprovement }) {
  const QALY = numPeople * years * qualityImprovement;
  return QALY;
}
