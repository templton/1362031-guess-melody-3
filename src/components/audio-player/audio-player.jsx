import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";


export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();
    this.handlePlay = this.handlePlay.bind(this);
    this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleButtonPlayClick = this.handleButtonPlayClick.bind(this);
  }

  handlePlay() {
    const {onSetPlayingStatus} = this.props;
    onSetPlayingStatus(true);
  }

  handleCanPlayThrough() {
    const {onSetLoadingStatus} = this.props;
    onSetLoadingStatus(false);
  }

  handlePause() {
    const {onSetPlayingStatus} = this.props;
    onSetPlayingStatus(false);
  }

  handleTimeUpdate() {
    const {onSetProgress} = this.props;
    onSetProgress(this._audioRef.current.currentTime);
  }

  handleButtonPlayClick() {
    const {onSetPlayingStatus, onPlayButtonClick, isPlaying} = this.props;
    onSetPlayingStatus(!isPlaying);
    onPlayButtonClick();
  }

  render() {
    const {isPlaying, isLoading, src} = this.props;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this.handleButtonPlayClick}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
            src={src}
            onPlay={this.handlePlay}
            onCanPlayThrough={this.handleCanPlayThrough}
            onPause={this.handlePause}
            onTimeUpdate={this.handleTimeUpdate}
          />
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
