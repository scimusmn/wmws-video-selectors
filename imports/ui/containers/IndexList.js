import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import ExhibitComponents from '../../api/exhibitComponents/exhibitComponents.js';
import ExhibitComponentsIndexList from '../components/ExhibitComponentsIndexList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('exhibitComponents.list');
  if (subscription.ready()) {
    const exhibitComponents = ExhibitComponents.find().fetch();
    onData(null, { exhibitComponents });
  }
};

export default composeWithTracker(composer, Loading)(ExhibitComponentsIndexList);
