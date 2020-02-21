import React, {PureComponent} from 'react';
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
        isPlaying: true,
        isLoading: true,
        progress: 0
      };

      this.setPlayingStatus = this.setPlayingStatus.bind(this);
      this.setLoadingStatus = this.setLoadingStatus.bind(this);
      this.setProgress = this.setProgress.bind(this);
    }

    setPlayingStatus(value) {
      this.setState({
        isPlaying: value
      });
    }

    setLoadingStatus(value) {
      this.setState({
        isLoading: value
      });
    }

    setProgress(value) {
      this.setState({
        progress: value
      });
    }

    render() {
      const {activePlayerId, isLoading, progress} = this.state;
      return <Component
        {...this.props}
        renderPlayer={(src, id) => {
          return (
            <AudioPlayer
              src={src}
              isPlaying={id === activePlayerId}
              isLoading={isLoading}
              progress={progress}
              setPlayingStatus={this.setPlayingStatus}
              setLoadingStatus={this.setLoadingStatus}
              setProgress={this.setProgress}
              onPlayButtonClick={() => this.setState({
                activePlayerId: activePlayerId === id ? -1 : id
              })}
            />
          );
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
