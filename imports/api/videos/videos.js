import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Videos = new Mongo.Collection('Videos');
export default Videos;

Videos.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Videos.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Videos.schema = new SimpleSchema({
  componentNumber: {
    type: String,
    label: 'Exhibit component number.',
  },
  labelEn: {
    type: String,
    label: 'Text label for the video. In English.',
    optional: true,
    defaultValue:'',
  },
  labelEs: {
    type: String,
    label: 'Text label for the video. In Spanish.',
    optional: true,
    defaultValue:'',
  },
  videoNumber: {
    type: Number,
    label: 'Video number. Used to connect the video with associated media.',
  },
});

Videos.attachSchema(Videos.schema);

Factory.define('document', Videos, {
  componentNumber: () => 'Factory Component Number',
  labelEn: () => 'Factory English Text',
  labelEs: () => 'Factory Spanish Text',
  videoNumber: () => 'Factory Video Number',
});
