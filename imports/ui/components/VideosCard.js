import React from 'react';
import _ from 'lodash';
import Modal from '/node_modules/react-overlays/lib/Modal';

let VelocityComponent = require('/node_modules/velocity-react/velocity-component');

class VideoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: props.video,
      playing: false,
    };
  }

  handleVideoSelect(e) {

    // Send parent component the video launch event
    this.props.launchVideoPlayer(e);

  }

  getClassName() {

    let className = 'video-button ' + ((this.props.isActive == true) ? 'active' : '');

    className += ' video-0' + this.props.position;

    return className;

  }

  render() {

    const { video } = this.props;
    const paddedVideoNumber = _.padStart(video.videoNumber, 2, '0');
    const buttonImagePath = `/media/${video.componentNumber}/${paddedVideoNumber}.png`;

    return (
      <div
        onClick={this.handleVideoSelect.bind(this)}
        className={this.getClassName()}
        data-position={this.props.position}
        data-vid-num={video.videoNumber}
        id={`video-${paddedVideoNumber}`}
      >
        <img src={buttonImagePath}/>
        <h2>
          <div className='en'>{video.labelEn}</div>
          <div className='es'>{video.labelEs}</div>
        </h2>
      </div>
    );
  }

}

VideoCard.propTypes = {
  playing: React.PropTypes.bool,
  video: React.PropTypes.object,
  launchVideoPlayer: React.PropTypes.func,
  position: React.PropTypes.number,
  isActive: React.PropTypes.bool,
};

export default VideoCard;
