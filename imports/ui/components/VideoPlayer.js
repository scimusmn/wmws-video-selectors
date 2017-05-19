import React from 'react';
import VideoHomeButton from './VideoHomeButton';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPlaying: props.videoPlaying,
    };

    this.localHomeAction = this.localHomeAction.bind(this);

  }

  localHomeAction(e) {

    const vidData = { vidId:this.props.selectedVideo,
                      percentWatched:(this.refs.mainVideo.currentTime / this.refs.mainVideo.duration).toFixed(2),
                      vidDuration:this.refs.mainVideo.duration,};

    this.props.handleHomeAction(vidData);

  }

  render() {
    const selectedVideo = () => this.props.selectedVideo.replace('video-', '');

    return (

      <div className='video-player'>

        <video
          onEnded={this.localHomeAction}
          autoPlay='autoplay'
          ref='mainVideo'
        >
          <source
            src={`/media/${this.props.componentNumber}/${selectedVideo()}.mp4`}
            type='video/mp4'
          />
        </video>

        <VideoHomeButton
          homeAction={this.localHomeAction}
        />

      </div>
    );
  }

}

VideoPlayer.propTypes = {
  videoPlaying: React.PropTypes.bool,
  handleHomeAction: React.PropTypes.func,
  componentNumber: React.PropTypes.string,
  selectedVideo: React.PropTypes.string,
};

export default VideoPlayer;
