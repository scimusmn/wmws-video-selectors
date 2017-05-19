import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '/node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Link } from 'react-router';

class ExhibitComponentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exhibitComponents: props.exhibitComponents,
    };
  }

  render() {
    let exhibitComponents = this.props.exhibitComponents;

    const tableOptions = {
      defaultSortName: 'componentNumber',
      defaultSortOrder: 'asc',
    };

    function formatComponentNumber(cell) {
      return (<Link to={`/components/${cell}`}>{cell}</Link>);
    }

    return (
      <BootstrapTable
        data={ exhibitComponents }
        striped={true}
        hover={true}
        options={ tableOptions }
      >
        <TableHeaderColumn
          isKey={true}
          dataField='componentNumber'
          dataFormat={formatComponentNumber}
        >
          Component Number
        </TableHeaderColumn>
        <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

ExhibitComponentsList.propTypes = {
  exhibitComponents: React.PropTypes.array,
};

export default ExhibitComponentsList;
