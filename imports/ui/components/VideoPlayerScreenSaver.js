import React from 'react';
import VideoHomeButton from './VideoHomeButton';

class VideoPlayer extends React.Component {

  render() {
    return (
      <div className="video-player">
        <video
          loop="loop"
          autoPlay="autoplay"
        >
          <source
            src={`/media/${this.props.componentNumber}/ss.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
    );
  }

}

VideoPlayer.propTypes = {
  componentNumber: React.PropTypes.string,
};

export default VideoPlayer;
