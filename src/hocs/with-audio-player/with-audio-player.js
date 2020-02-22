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

      this.handleSetPlayingStatus = this.handleSetPlayingStatus.bind(this);
      this.handleSetLoadingStatus = this.handleSetLoadingStatus.bind(this);
      this.handleSetProgress = this.handleSetProgress.bind(this);
    }

    handleSetPlayingStatus(value) {
      this.setState({
        isPlaying: value
      });
    }

    handleSetLoadingStatus(value) {
      this.setState({
        isLoading: value
      });
    }

    handleSetProgress(value) {
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
              onSetPlayingStatus={this.handleSetPlayingStatus}
              onSetLoadingStatus={this.handleSetLoadingStatus}
              onSetProgress={this.handleSetProgress}
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
