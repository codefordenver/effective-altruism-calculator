export const initialState = {
  numPeople: {
    value: 100,
    min: 0,
    max: 10000,
    displayName: "Number of people"
  },
  years: { value: 5, min: 0, max: 100, displayName: "Number of years" },
  qualityImprovement: {
    value: 0.1,
    min: 0,
    max: 1,
    displayName: "Average quality of life improvement over that time"
  },
  cost: { value: 10, min: 1, max: 100, displayName: "Cost (1000 USD)" },
  chanceOfSuccess: {
    value: 0.1,
    min: 0,
    max: 1,
    displayName: "Chance of Success"
  },

  chanceOfHarm: {
    value: 0.01,
    min: 0,
    max: 1,
    displayName: "Chance of accidental harm"
  },
  numPeopleHarmed: {
    value: 10,
    min: 0,
    max: 10000,
    displayName: "Number of people possibly harmed"
  },
  yearsOfHarm: {
    value: 5,
    min: 0,
    max: 100,
    displayName: "Number of years of possible harm"
  },
  qualityDecrease: {
    value: 0.05,
    min: 0,
    max: 1,
    displayName: "Quality of life decrease over that time"
  }
};

export function calc({
  numPeople,
  years,
  qualityImprovement,
  cost,
  chanceOfSuccess,
  chanceOfHarm,
  numPeopleHarmed,
  yearsOfHarm,
  qualityDecrease
}) {
  const QALY =
    ((numPeople * years * qualityImprovement) / cost) * chanceOfSuccess -
    (chanceOfHarm * numPeopleHarmed * yearsOfHarm * qualityDecrease) / cost;
  return QALY;
}
window.calc = calc;

export const modelName = "Super simple model";
export const ModelResult = ({ result }) =>
  `Expected Value: ${result} QALYs / 1000 USD`;
