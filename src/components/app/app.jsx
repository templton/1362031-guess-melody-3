import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestion from "../artist-question/artist-question.jsx";
import GenreQuestion from "../genre-question/genre-question.jsx";
import {GameType} from "../../const";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.js";

const GenreQuestionWrapped = withAudioPlayer(GenreQuestion);
const ArtistQuestionWrapped = withAudioPlayer(ArtistQuestion);

class App extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      step: -1
    };
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen onWelcomeButtonClick={() => {
          this.setState({
            step: 0
          });
        }} errorsCount={errorsCount}/>
      );
    }

    const PageGame = question.type === GameType.ARTIST ? ArtistQuestionWrapped : GenreQuestionWrapped;

    return (
      <GameScreen type={question.type}>
        <PageGame
          question={question}
          onAnswer={() => {
            this.setState((prevState) => ({
              step: prevState.step + 1,
            }));
          }}
        />
      </GameScreen>
    );

  }

  render() {
    const {questions} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionWrapped onAnswer={()=>{}} question={questions[1]}/>
          </Route>
          <Route axact path="/dev-genre">
            <GenreQuestionWrapped onAnswer={()=>{}} question={questions[0]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default App;
