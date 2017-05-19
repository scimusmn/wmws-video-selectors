import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const ExhibitComponents = new Mongo.Collection('ExhibitComponents');
export default ExhibitComponents;

ExhibitComponents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ExhibitComponents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

ExhibitComponents.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the Exhibit Component.',
  },
  componentNumber: {
    type: String,
    label: 'Exhibit component number. A four digit string. ex. 0200',
  },
  loopingBackground: {
    type: Boolean,
    label: 'Use background looping video.',
    defaultValue: false,
  },
  transitions: {
    type: Boolean,
    label: 'Use transitions between states.',
    defaultValue: true,
  },
  shuffleOnStart: {
    type: Boolean,
    label: 'Randomize video-card positions on start.',
    defaultValue: false,
  },
});

ExhibitComponents.attachSchema(ExhibitComponents.schema);

Factory.define('document', ExhibitComponents, {
  title: () => 'Factory Title',
  componentNumber: () => 'Factory Component Number',
  loopingBackground: () => 'Factory Looping Background',
  transitions: () => 'Factory Transitions Bool',
  shuffleOnStart: () => 'Factory Shuffle Bool',
});
