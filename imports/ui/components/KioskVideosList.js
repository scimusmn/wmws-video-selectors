import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import VideoCard from './VideosCard';
import VideoPlayer from './VideoPlayer';
import LoopingBackground from './LoopingBackground';
import VideoPlayerScreenSaver from './VideoPlayerScreenSaver';
import logger from '../../modules/logger';
import _ from 'lodash';

class KioskVideoList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      videos: props.videos,
      playing: props.playing,
      transitioning: false,
      componentNumber: props.componentNumber,
      selectedVideo: '0',
      selectedPosition: -1,
      showVideo: false,
      idleTime: 0,
      screenSaver: 'inactive',
    };

    // Generate video-card positions
    this.videoOrder = this.createVideoOrder(props.shuffleOnStart);

    this.transEnterTime = 500;
    this.transLeaveTime = 400;

  }

  componentDidMount() {
    setInterval(() => {
      this.timerIncrement();
    }, 1000);
  }

  timerIncrement() {
    const idleTime = this.state.idleTime + 1;
    this.setState({ idleTime });
    const screenSaverTimeout = Meteor.settings.public.screenSaverTimeout;
    if (this.state.idleTime >= screenSaverTimeout) {

      if (this.state.screenSaver == 'inactive') {
        // Log for analytics
        logger.info({message:'inactivity-timeout', inactiveTime:screenSaverTimeout * 1000,});
      }

      this.setState({
        playing: false,
        screenSaver: 'active',
      });

    }
  }

  resetScreenSaverTimer() {
    console.log('Resetting the screensaver timer');
    this.setState({
      idleTime: 0,
      screenSaver: 'inactive',
    });
  }

  clearScreenSaver() {
    console.log('Clearing the screensaver');
    this.setState({
      idleTime: 0,
      screenSaver: 'inactive',
      playing: false,
    });
  }

  createVideoOrder(shuffle) {

    let vidNums = [];

    for (var i = 0; i < this.props.videos.length; i++) {

      vidNums.push(this.props.videos[i].videoNumber);

    }

    // Shuffle video order
    if (shuffle) {

      vidNums = _.shuffle(vidNums);

    }

    return vidNums;

  }

  isActiveCard(index) {

    if (index == this.state.selectedPosition) {
      return true;
    } else {
      return false;
    }
  }

  launchVideoPlayer(e) {

    const position = e.currentTarget.getAttribute('data-position');


    this.setState({
      playing: true,
      selectedVideo: e.currentTarget.id,
      selectedPosition: position,
      showVideo: true,
      transitioning: true,
    });

    // Log for analytics
    logger.info({ message:'video-selected',
                  kiosk: this.props.location.pathname,
                  selectedVideo:e.currentTarget.id,
                  position:position,
                  });

    // Wait for transition
    // to kill display state
    setTimeout(()=> {

      this.setState({ transitioning: false });

    }, this.transEnterTime);

  }

  closeModal(vidData) {

    if (this.state.transitioning == false) {

      this.setState({ transitioning: true, playing: false });

      // Log for analytics
      logger.info({message:'video-exit', vidData});

      setTimeout(()=> {

        this.setState({ transitioning: false, selectedPosition:-1 });

      }, 200);

    }

  }

  loopBackground() {

    let doLoop = false;

    if (this.props.loopingBackground && this.state.screenSaver != 'active') {
      if (this.state.playing && this.state.transitioning) {
        doLoop = true;
      } else if (!this.state.playing) {
        doLoop = true;
      }
    }

    return doLoop;

  }

  render() {

    /**
     * Loop through the videos and render a card for each question
     */
    const videoCards = this.props.videos.map((video, index) =>
      <VideoCard
        launchVideoPlayer={this.launchVideoPlayer.bind(this)}
        playing={this.state.playing}
        key={video._id}
        position={this.videoOrder[index]}
        video={video}
        isActive={this.isActiveCard(this.videoOrder[index])}
      />
    );

    return (
      <div onClick={this.resetScreenSaverTimer.bind(this)} key='unique' id='selection-screen' className={'vid-count-' + this.props.videos.length}>

        {/* Background video loop *//* Background video loop */}
        {
            this.loopBackground() === true
            ?
            <div
              className='looping-background'
            >
              <LoopingBackground
                componentNumber={this.state.componentNumber}
              />
            </div>
            : null
        }

        {/* Coaches Corner headline title *//* Coaches Corner headline title */}
        <h1>
          <div className='en'>Select a question to learn more.</div>
          <div className='es'>Elige una pregunta para aprender más.</div>
        </h1>

        {/* Question buttons *//* Question buttons */}
        {videoCards}

        {/* Modal video player *//* Modal video player */}
        <ReactCSSTransitionGroup
              transitionName='player-fade'
              transitionAppear={false}
              transitionEnter={this.props.transitions}
              transitionLeave={this.props.transitions}
              transitionEnterTimeout={this.transEnterTime}
              transitionLeaveTimeout={this.transLeaveTime}>

          {(this.state.playing)
            ?

              <VideoPlayer
                videoPlaying={this.state.playing}
                handleHomeAction={this.closeModal.bind(this)}
                componentNumber={this.state.componentNumber}
                selectedVideo={this.state.selectedVideo}
              />

            : null
          }
          </ReactCSSTransitionGroup>

        {/* Modal screen saver *//* Modal screen saver */}
        <ReactCSSTransitionGroup
              transitionName='player-fade'
              transitionAppear={false}
              transitionEnter={this.props.transitions}
              transitionLeave={this.props.transitions}
              transitionEnterTimeout={this.transEnterTime}
              transitionLeaveTimeout={this.transLeaveTime}>
          {
          this.state.screenSaver === 'active'
            ?
            <div
              onClick={this.clearScreenSaver.bind(this)}
              className='screensaver'
            >
              <VideoPlayerScreenSaver
                componentNumber={this.state.componentNumber}
              />
            </div>
            : null
        }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

KioskVideoList.propTypes = {
  videos: React.PropTypes.array,
  playing: React.PropTypes.bool,
  componentNumber: React.PropTypes.string,
  playingVideo: React.PropTypes.string,
  loopingBackground: React.PropTypes.bool,
  transitions: React.PropTypes.bool,
};

export default KioskVideoList;
