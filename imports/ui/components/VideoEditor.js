/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import videoEditor from '../../modules/video-editor.js';

export default class VideoEditor extends React.Component {
  /**
   * Start building out the exhibit components list here
   *
   * You want to bring the components list in as a prop for the
   * video entry.
   *
   * Follow the example here:
   * https://github.com/scimusmn/map-stories/blob/93129f1ebfc67c708e3f66e99132acd8fe1307f5/imports/ui/components/ListPlaces.jsx
   */
  constructor(props) {
    super(props);
    this.state = {
      video: props.video,
      exhibitComponents: props.exhibitComponents,
    };
  }

  componentDidMount() {
    videoEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="componentNumber"]').focus(); }, 0);
  }

  render() {
    const { video, exhibitComponents } = this.props;
    const exhibitComponentNumbers = exhibitComponents.map((exhibitComponent) =>
      <option
        value={exhibitComponent.componentNumber.toString()}
        key={exhibitComponent.componentNumber.toString()}
      >
        {exhibitComponent.componentNumber} - {exhibitComponent.title}
      </option>
    );
    return (
      <form
        ref={ form => (this.videoEditorForm = form) }
        onSubmit={ event => event.preventDefault() }
      >
        <FormGroup>
          <ControlLabel>Component Number</ControlLabel>
          <FormControl
            name="componentNumber"
            componentClass="select"
            placeholder="select"
          >
            {exhibitComponentNumbers}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Video number</ControlLabel>
          <FormControl
            type="text"
            name="videoNumber"
            defaultValue={ video && video.videoNumber }
            placeholder="Video number"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>English text</ControlLabel>
          <FormControl
            type="text"
            name="labelEn"
            defaultValue={ video && video.labelEn }
            placeholder="Video label in English"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Spanish text</ControlLabel>
          <FormControl
            type="text"
            name="labelEs"
            defaultValue={ video && video.labelEs }
            placeholder="Video label in Spanish"
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          { video && video._id ? 'Save Changes' : 'Add Video' }
        </Button>
      </form>
    );
  }
}

VideoEditor.propTypes = {
  video: React.PropTypes.object,
  exhibitComponents: React.PropTypes.object,
};
