import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const App = (props) => {

  const {errorsCount} = props;

  return (
    <WelcomeScreen errorsCount={errorsCount}/>
  );
};

export default App;

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};
