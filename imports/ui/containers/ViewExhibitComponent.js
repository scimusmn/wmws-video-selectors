import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import ExhibitComponents from '../../api/exhibitComponents/exhibitComponents.js';
import ViewExhibitComponent from '../pages/ViewExhibitComponent.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('exhibitComponents.view', params.componentNumber);

  if (subscription.ready()) {
    const exhibitComponent = ExhibitComponents.findOne();
    onData(null, { exhibitComponent });
  }
};

export default composeWithTracker(composer, Loading)(ViewExhibitComponent);
