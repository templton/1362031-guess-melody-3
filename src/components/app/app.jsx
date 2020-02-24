import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestion from "../artist-question/artist-question.jsx";
import GenreQuestion from "../genre-question/genre-question.jsx";
import {GameType} from "../../const";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.js";
import {ActionCreator} from "../../reducer";

const GenreQuestionWrapped = withAudioPlayer(GenreQuestion);
const ArtistQuestionWrapped = withAudioPlayer(ArtistQuestion);

class App extends PureComponent {

  constructor(props) {
    super(props);

    this.handleUserAnswer = this.handleUserAnswer.bind(this);
  }

  handleUserAnswer(question, answer) {
    const {
      onIncrementStep,
      onIncrementMistake
    } = this.props;
    onIncrementStep();
    onIncrementMistake(question, answer);
  }

  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      step,
      onIncrementStep
    } = this.props;

    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen onWelcomeButtonClick={onIncrementStep} errorsCount={maxMistakes}/>
      );
    }

    // console.log('question, step='+step,question);

    const PageGame = question.type === GameType.ARTIST ? ArtistQuestionWrapped : GenreQuestionWrapped;

    return (
      <GameScreen type={question.type}>
        <PageGame
          question={question}
          onAnswer={this.handleUserAnswer}
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
  maxMistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onIncrementStep: PropTypes.func.isRequired,
  onIncrementMistake: PropTypes.func.isRequired,
};

const mapStateToProps = ({step, maxMistakes, questions}) => ({
  step,
  maxMistakes,
  questions,
});

const {incrementStep, incrementMistake} = ActionCreator;


const mapDispatchToProps = {
  onIncrementStep: incrementStep,
  onIncrementMistake: incrementMistake,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
