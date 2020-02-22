const initialState = {
  mistakes: 0,
  step: -1
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP
  }),
  incrementMistakes: () => ({
    type: ActionType.INCREMENT_MISTAKES
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {step: state.step + 1});
    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {mistakes: state.mistakes + 1});
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
