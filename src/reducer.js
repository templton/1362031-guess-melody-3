import {DefaultGameParams} from "./const";
import {ActionType} from "./actions";
import questions from "./mocks/questions";

const initialState = {
  mistakes: 0,
  maxMistakes: DefaultGameParams.MAX_MISTAKES,
  questions,
  step: DefaultGameParams.STEP
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      const nextStep = state.step + action.payload;

      return nextStep >= state.questions.length
        ? Object.assign({}, initialState)
        : Object.assign({}, state, {step: nextStep});

    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;

      return mistakes >= state.maxMistakes
        ? Object.assign({}, initialState)
        : Object.assign({}, state, {mistakes});
  }

  return state;
};

export {reducer};
