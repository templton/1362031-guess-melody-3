import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class GenreQuestion extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      answers: props.question.answers.map(() => false),
    };
  }

  render() {

    const {onAnswer, question, renderPlayer} = this.props;
    const {answers: userAnswers} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer(question, this.state.answers);
        }}>
          {answers.map((answer, i) => (
            <div key={`${i}-${answer.src}`} className="track">
              {renderPlayer(answer.src, i)}
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`} checked={userAnswers[i]}
                  onChange={(evt) => {
                    const value = evt.target.checked;
                    this.setState({
                      answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
                    });
                  }}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestion.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreQuestion;
