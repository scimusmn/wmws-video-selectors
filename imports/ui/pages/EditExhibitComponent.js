import React from 'react';
import ExhibitComponentEditor from '../components/ExhibitComponentEditor';

const EditExhibitComponent = ({ exhibitComponent }) => (
  <div className="EditExhibitComponent">
    <h4 className="page-header">Editing "{ exhibitComponent.title }"</h4>
    <ExhibitComponentEditor exhibitComponent={ exhibitComponent } />
  </div>
);

EditExhibitComponent.propTypes = {
  exhibitComponent: React.PropTypes.object,
};

export default EditExhibitComponent;
