import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";


export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();

    this.state = {
      progress: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    const {src} = this.props;

    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false
    });

    audio.onplay = () => {
      this.props.setPlayingStatus(true);
    };

    audio.onpause = () => {
      this.props.setPlayingStatus(false);
    }

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;
    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  render() {
    const {isLoading} = this.state;
    const {onPlayButtonClick, isPlaying, setPlayingStatus} = this.props;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={() => {
            setPlayingStatus(!isPlaying);
            onPlayButtonClick();
          }}
        />
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </Fragment>
    );
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  setPlayingStatus: PropTypes.func.isRequired,
};
