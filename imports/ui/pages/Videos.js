import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import VideosList from '../containers/VideosList.js';

const Videos = () => (
  <div className="Videos">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Videos</h4>
          <Button
            bsStyle="success"
            className="pull-right"
            href="/video/new"
          >New Video</Button>
        </div>
        <VideosList />
      </Col>
    </Row>
  </div>
);

export default Videos;
