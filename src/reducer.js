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
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.RESET:
      return Object.assign({}, initialState, {
        step: 0,
      });
  }

  return state;
};

export {reducer};
