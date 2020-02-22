import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";


export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();
  }

  componentDidMount() {
    const {src} = this.props;

    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => this.props.onSetLoadingStatus(false);

    audio.onplay = () => this.props.onSetPlayingStatus(true);

    audio.onpause = () => this.props.onSetPlayingStatus(false);

    audio.ontimeupdate = () => this.props.onSetProgress(audio.currentTime);
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
    const {onPlayButtonClick, isPlaying, onSetPlayingStatus, isLoading} = this.props;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={() => {
            onSetPlayingStatus(!isPlaying);
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
  isLoading: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onSetPlayingStatus: PropTypes.func.isRequired,
  onSetLoadingStatus: PropTypes.func.isRequired,
  onSetProgress: PropTypes.func.isRequired,
};
