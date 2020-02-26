import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestion from "../artist-question/artist-question.jsx";
import GenreQuestion from "../genre-question/genre-question.jsx";
import {GameType} from "../../const";
import withActivePlayer from "../../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.js";
import {incrementStep, incrementMistake, resetGame} from "../../actions";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";

const GenreQuestionWrapped = withActivePlayer(withUserAnswer(GenreQuestion));
const ArtistQuestionWrapped = withActivePlayer(ArtistQuestion);

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
      mistakes,
      questions,
      step,
      onResetGame,
      onIncrementStep
    } = this.props;

    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen onWelcomeButtonClick={onIncrementStep} errorsCount={maxMistakes}/>
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={onResetGame}
        />
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={onResetGame}
        />
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
  onResetGame: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
};

const mapStateToProps = ({step, maxMistakes, questions, mistakes, resetGame}) => ({
  step,
  maxMistakes,
  questions,
  mistakes,
  resetGame
});

const mapDispatchToProps = {
  onIncrementStep: incrementStep,
  onIncrementMistake: incrementMistake,
  onResetGame: resetGame
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
