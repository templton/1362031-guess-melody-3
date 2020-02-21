import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player.jsx';

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
  }
};

describe(`Render audio player`, () => {
  it(`AudioPlayer is rendered correctly`, () => {
    const {song} = mock;

    const tree = renderer.create(<AudioPlayer
      src={song.src}
      isPlaying={false}
      onPlayButtonClick={() => {}}
      isLoading={false}
      progress={0}
      setPlayingStatus={() => {}}
      setLoadingStatus={() => {}}
      setProgress={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
