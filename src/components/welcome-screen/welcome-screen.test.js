import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

it(`WelcomeScreen render`, () => {
  const tree = renderer
    .create(<WelcomeScreen errorsCount={5}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
