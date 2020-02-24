import {GameType, DefaultGameParams} from "./const";
import questions from "./mocks/questions";

const initialState = {
  mistakes: 0,
  maxMistakes: DefaultGameParams.maxMistakes,
  questions,
  step: DefaultGameParams.step
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1
  }),
  incrementMistake: (question, userAnswer) => {
    const answerIsCorrect = question.type === GameType.ARTIST
      ? isArtistAnswerCorrect(question, userAnswer)
      : isGenreAnswerCorrect(question, userAnswer);

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1
    };
  }
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

export {reducer, ActionType, ActionCreator};
