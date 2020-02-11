import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestion from "../artist-question/artist-question.jsx";
import GenreQuestion from "../genre-question/genre-question.jsx";

const welcomeButtonHandler = () => {};

const App = (props) => {

  const {errorsCount} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen
            errorsCount={errorsCount}
            onWelcomeButtonClick={welcomeButtonHandler}
          />
        </Route>
        <Route exact path="/dev-artist">
          <ArtistQuestion/>
        </Route>
        <Route axact path="/dev-genre">
          <GenreQuestion/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default App;
