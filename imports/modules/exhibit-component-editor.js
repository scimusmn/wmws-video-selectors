/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertExhibitComponent } from '../api/exhibitComponents/methods.js';
import './validation.js';

let component;

const handleExhibitComponentUpsert = () => {
  const { exhibitComponent } = component.props;

  const confirmation = exhibitComponent && exhibitComponent._id ?
    'Exhibit component updated!' : 'Exhibit component added!';
  const upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    componentNumber: document.querySelector('[name="componentNumber"]').value.trim(),
    loopingBackground: (document.querySelector('[name="loopingBackground"]').checked),
    transitions: (document.querySelector('[name="transitions"]').checked),
    shuffleOnStart: (document.querySelector('[name="shuffleOnStart"]').checked),
  };

  if (exhibitComponent && exhibitComponent._id) upsert._id = exhibitComponent._id;

  upsertExhibitComponent.call(upsert, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.exhibitComponentEditorForm.reset();
      Bert.alert(confirmation, 'success');

      // Old method. TODO: re-implement or cleanup
      // browserHistory.push(`/components/${insertedId || exhibitComponent._id}`);

      browserHistory.push('/components');
    }
  });
};

const validate = () => {

  $(component.exhibitComponentEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      componentNumber: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Please enter a component title, it is required.',
      },
      componentNumber: {
        required: 'Please enter a component number, it is required.',
      },
    },
    submitHandler() { handleExhibitComponentUpsert(); },
  });
};

export default function exhibitComponentEditor(options) {
  component = options.component;
  validate();
}
