import React from "react";
import {shallow} from "enzyme";
import GenreQuestion from "./genre-question.jsx";

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

it(`When user answers genre question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const genre = shallow(<GenreQuestion
    onAnswer={onAnswer}
    question={question}
    renderPlayer={() => {}}
  />);

  const form = genre.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const {question} = mock;
  const onAnswer = jest.fn((...args) => [...args]);
  const userAnswer = [false, true, false, false];

  const genre = shallow(<GenreQuestion
    onAnswer={onAnswer}
    question={question}
    renderPlayer={() => {}}
  />);

  const form = genre.find(`form`);
  const inputTwo = genre.find(`input`).at(1);
  const mockPreventFunction = jest.fn();

  inputTwo.simulate(`change`, {target: {checked: true}});
  form.simulate(`submit`, {preventDefault: mockPreventFunction});

  expect(mockPreventFunction).toBeCalled();

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer).toBeCalledWith(question, userAnswer);

  expect(genre.find(`input`).map((it) => it.prop(`checked`))).toEqual(userAnswer);
});
