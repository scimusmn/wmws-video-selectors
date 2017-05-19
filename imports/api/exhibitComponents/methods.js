import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import ExhibitComponents from './exhibitComponents';
import rateLimit from '../../modules/rate-limit.js';

export const upsertExhibitComponent = new ValidatedMethod({
  name: 'exhibitComponents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    componentNumber: { type: String, optional: true },
    loopingBackground: { type: Boolean, optional: true },
    transitions: { type: Boolean, optional: true },
    shuffleOnStart: { type: Boolean, optional: true },
  }).validator(),
  run(document) {
    console.log('run doc', document);
    return ExhibitComponents.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeExhibitComponent = new ValidatedMethod({
  name: 'exhibitComponents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    ExhibitComponents.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertExhibitComponent,
    removeExhibitComponent,
  ],
  limit: 5,
  timeRange: 1000,
});
