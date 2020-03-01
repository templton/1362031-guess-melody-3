import {GameType} from "./const";

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const incrementStep = () => ({
  type: ActionType.INCREMENT_STEP,
  payload: 1
});

const incrementMistake = (question, userAnswer) => {
  const answerIsCorrect = question.type === GameType.ARTIST
    ? isArtistAnswerCorrect(question, userAnswer)
    : isGenreAnswerCorrect(question, userAnswer);

  return {
    type: ActionType.INCREMENT_MISTAKES,
    payload: answerIsCorrect ? 0 : 1
  };
}

const resetGame = () => {
  return {
    type: ActionType.RESET
  };
};

export {ActionType, incrementStep, incrementMistake, resetGame};
