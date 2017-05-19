import React from 'react';
import VideoEditor from '../components/VideoEditor.js';

const NewVideo = ({ exhibitComponents }) => (
  <div className="NewVideo">
    <h4 className="page-header">New Video</h4>
    <VideoEditor exhibitComponents={ exhibitComponents }/>
  </div>
);

NewVideo.propTypes = {
  exhibitComponents: React.PropTypes.object,
};

export default NewVideo;
