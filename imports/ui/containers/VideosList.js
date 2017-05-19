import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Videos from '../../api/videos/videos';
import VideosList from '../components/VideosList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('videos.list');
  if (subscription.ready()) {
    const videos = Videos.find().fetch();
    onData(null, { videos });
  }
};

export default composeWithTracker(composer, Loading)(VideosList);
