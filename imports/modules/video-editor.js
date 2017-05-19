/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertVideo } from '../api/videos/methods.js';
import './validation.js';

let component;

const handleVideoUpsert = () => {
  const { video } = component.props;
  const confirmation = video && video._id ? 'Video updated!' : 'Video added!';
  const upsert = {
    componentNumber: document.querySelector('[name="componentNumber"]').value.trim(),
    labelEn: document.querySelector('[name="labelEn"]').value.trim(),
    labelEs: document.querySelector('[name="labelEs"]').value.trim(),
    videoNumber: document.querySelector('[name="videoNumber"]').value.trim(),
  };

  if (video && video._id) upsert._id = video._id;

  upsertVideo.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.videoEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/videos');
    }
  });
};

const requiredMessage = (element) => `Please enter a ${element}. It is required.`;

const validate = () => {
  $(component.videoEditorForm).validate({
    rules: {
      componentNumber: {
        required: true,
      },
      labelEn: {
        required: false,
      },
      labelEs: {
        required: false,
      },
      videoNumber: {
        required: true,
      },
    },
    messages: {
      componentNumber: {
        required: requiredMessage('component number'),
      },
      labelEn: {
        required: requiredMessage('English label'),
      },
      labelEs: {
        required: requiredMessage('Spanish label'),
      },
    },
    submitHandler() { handleVideoUpsert(); },
  });
};

export default function VideoEditor(options) {
  component = options.component;
  validate();
}
