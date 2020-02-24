import React from "react";
import renderer from "react-test-renderer";
import {GameScreen} from "./game-screen";
import {GameType} from "../../const";

describe(`GameScreen render`, () => {

  const children = <div className="children-component"/>;

  it(`Render Artist Screen`, () => {
    const tree = renderer
      .create(<GameScreen type={GameType.ARTIST} mistakes={3}>{children}</GameScreen>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
