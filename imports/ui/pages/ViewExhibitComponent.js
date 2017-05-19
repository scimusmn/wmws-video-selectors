import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeExhibitComponent } from '../../api/exhibitComponents/methods.js';

const handleExhibitComponentRemove = (_id) => {
  /**
   * TODO: Implement a new method for doing confirmation here.
   * JS alerts are intrusive and against our style.
   */

  // noinspection Eslint
  if (confirm('Are you sure? This is permanent!')) {
    removeExhibitComponent.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Exhibit Component deleted!', 'success');
        browserHistory.push('/components');
      }
    });
  }
};

const ViewExhibitComponent = ({ exhibitComponent }) => (
  <div className="ViewExhibitComponent">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ exhibitComponent.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button href={`/components/${exhibitComponent.componentNumber}/edit`}>Edit</Button>
          <Button
            onClick={ () => handleExhibitComponentRemove(exhibitComponent._id) }
            className="text-danger">Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { exhibitComponent.componentNumber }
  </div>
);

ViewExhibitComponent.propTypes = {
  exhibitComponent: React.PropTypes.object.isRequired,
};

export default ViewExhibitComponent;
