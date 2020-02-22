import {reducer, ActionType, ActionCreator} from "./reducer";

describe(`Test main reducer`, () => {

  const state = {step: -1, mistakes: 0};

  it(`Empty action return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(state);
  });

  it(`Increment mistakes`, () => {
    expect(reducer(state, {type: ActionType.INCREMENT_MISTAKES})).toEqual({step: -1, mistakes: 1});
  });

  it(`Increment step`, () => {
    expect(reducer(state, {type: ActionType.INCREMENT_STEP})).toEqual({step: 0, mistakes: 0});
  });

  it(`ActionCreator works`, () => {
    expect(reducer(state, ActionCreator.incrementStep())).toEqual({step: 0, mistakes: 0});
  });
});
