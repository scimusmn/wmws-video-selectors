import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ExhibitComponentsList from '../containers/ExhibitComponentsList.js';

const ExhibitComponents = () => (
  <div className="ExhibitComponents">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Exhibit Components</h4>
          <Button
            bsStyle="success"
            className="pull-right"
            href="/components/new"
          >New Component</Button>
        </div>
        <ExhibitComponentsList />
      </Col>
    </Row>
  </div>
);

export default ExhibitComponents;
