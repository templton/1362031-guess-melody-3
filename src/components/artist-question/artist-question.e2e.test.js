import React from "react";
import {shallow} from "enzyme";
import ArtistQuestion from "./artist-question.jsx";

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: ``,
      src: ``
    },
    answers: [
      {
        artist: `one`,
        picture: `pic-one`,
      },
      {
        artist: `two`,
        picture: `pic-two`,
      },
      {
        artist: `three`,
        picture: `pic-three`,
      },
    ],
  }
};


it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const userAnswer = {
    artist: `one`,
    picture: `pic-one`,
  };

  const screen = shallow(<ArtistQuestion
    onAnswer={onAnswer}
    question={question}
  />);

  const answerInputs = screen.find(`input`);
  const answerOne = answerInputs.at(0);

  const mockPrevEvent = jest.fn();

  answerOne.simulate(`change`, {preventDefault: mockPrevEvent});

  expect(mockPrevEvent).toBeCalled();

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer).toBeCalledWith(question, userAnswer);

});
