import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Videos from './videos';
import rateLimit from '../../modules/rate-limit.js';

export const upsertVideo = new ValidatedMethod({
  name: 'videos.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    componentNumber: { type: String, optional: true },
    labelEn: { type: String, optional: true },
    labelEs: { type: String, optional: true },
    videoNumber: { type: String, optional: true },
  }).validator(),
  run(document) {
    return Videos.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeVideo = new ValidatedMethod({
  name: 'videos.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Videos.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertVideo,
    removeVideo,
  ],
  limit: 5,
  timeRange: 1000,
});
