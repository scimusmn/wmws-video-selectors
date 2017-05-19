import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeVideo } from '../../api/videos/methods.js';

const handleVideoRemove = (_id) => {
  /**
   * TODO: Implement a new method for doing confirmation here.
   * JS alerts are intrusive and against our style.
   */

  // noinspection Eslint
  if (confirm('Are you sure? This is permanent!')) {
    removeVideo.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Video deleted!', 'success');
        browserHistory.push('/videos');
      }
    });
  }
};

const ViewVideo = ({ video }) => (
  <div className="ViewVideos">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ video.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">

          <Button
            href={`/components/${video.componentNumber}/video/${video.videoNumber}/edit`}
          >
            Edit
          </Button>

          <Button
            onClick={ () => handleVideoRemove(video._id) }
            className="text-danger"
          >
            Delete
          </Button>

        </ButtonGroup>
      </ButtonToolbar>
    </div>
    Component number: { video.componentNumber }<br/>
    Video number: { video.videoNumber }<br/>
    English text: { video.labelEn }<br/>
    Spanish text: { video.labelEs }<br/>
    Image:<br/>
    <img src={`/media/${video.componentNumber}/0${video.videoNumber}.png`}/>
    <br/>
    Video:<br/>
    <video
      width="800"
      height="600"
      autoPlay="autoplay">
      <source src={`/media/${video.componentNumber}/0${video.videoNumber}.mp4`} type="video/mp4"/>
    </video>
  </div>
);

ViewVideo.propTypes = {
  video: React.PropTypes.object.isRequired,
};

export default ViewVideo;
