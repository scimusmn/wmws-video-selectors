import React from 'react';

class LoopingBackground extends React.Component {

  render() {
    return (
      <div className="video-player">
        <video
          loop="loop"
          autoPlay="autoplay"
        >
          <source
            src={`/media/${this.props.componentNumber}/bg.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
    );
  }

}

LoopingBackground.propTypes = {
  componentNumber: React.PropTypes.string,
};

export default LoopingBackground;
