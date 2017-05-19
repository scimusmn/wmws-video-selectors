import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Videos from '../../api/videos/videos';
import ExhibitComponents from '../../api/exhibitComponents/exhibitComponents';
import NewVideo from '../pages/NewVideo';
import Loading from '../components/Loading.js';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('videos.list');

  if (subscription.ready()) {
    const video = Videos.findOne();
    const exhibitComponents = ExhibitComponents.find({});
    onData(null, { exhibitComponents, video });
  }
};

export default composeWithTracker(composer, Loading)(NewVideo);
