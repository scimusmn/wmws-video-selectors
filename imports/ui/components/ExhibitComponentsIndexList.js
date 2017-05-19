import React from 'react';
import { Jumbotron, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const ExhibitComponentsIndexList = ({ exhibitComponents }) => (
  exhibitComponents.length > 0 ?
    <div className="Index">
      <Jumbotron className="text-center">
        <h2>Video Selector Base</h2>
        <p>
          Application for displaying and editing Video Selector kiosks
          for SMM exhibits.
        </p>
      </Jumbotron>

      <ListGroup className="DocumentsList">
        {exhibitComponents.map(({ _id, title, componentNumber }) => (
          <ListGroupItem
            key={ _id }
            href={`/kiosk/${componentNumber}`}>
            { componentNumber } - { title }
          </ListGroupItem>
        ))}
      </ListGroup>

    </div> :
    <Alert bsStyle="warning">No exhibit components yet.</Alert>
);

ExhibitComponentsIndexList.propTypes = {
  exhibitComponents: React.PropTypes.array,
};

export default ExhibitComponentsIndexList;
