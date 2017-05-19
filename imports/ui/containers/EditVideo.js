import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Videos from '../../api/videos/videos';
import ExhibitComponents from '../../api/exhibitComponents/exhibitComponents';
import EditVideo from '../pages/EditVideo.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe(
    'video.edit',
    params.componentNumber,
    parseInt(params.videoNumber, 10)
  );

  if (subscription.ready()) {
    const video = Videos.findOne();
    const exhibitComponents = ExhibitComponents.find();
    onData(null, { video, exhibitComponents });
  }
};

export default composeWithTracker(composer, Loading)(EditVideo);
