import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router';

class VideosList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: props.videos,
    };
  }

  render() {
    let videos = this.props.videos;

    const tableOptions = {
      defaultSortName: 'componentNumber',
      defaultSortOrder: 'asc',
    };

    function formatComponentNumber(cell) {
      return (<Link to={`/components/${cell}`}>{cell}</Link>);
    }

    function formatVideoNumber(cell, row) {
      return (<Link to={`/components/${row.componentNumber}/video/${cell}`}>{cell}</Link>);
    }

    return (
      <BootstrapTable
        data={ videos }
        striped={true}
        hover={true}
        options={ tableOptions }
      >
        <TableHeaderColumn isKey dataField='_id' hidden >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='componentNumber'
          dataFormat={formatComponentNumber}
          defaultSortOrder="asc"
        >
          Component Number
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='videoNumber'
          dataFormat={formatVideoNumber}
          defaultSortOrder="asc"
        >
          Video Number
        </TableHeaderColumn>
        <TableHeaderColumn dataField='labelEn'>English text</TableHeaderColumn>
        <TableHeaderColumn dataField='labelEs'>Spanish text</TableHeaderColumn>
      </BootstrapTable>
    );
  }

}

VideosList.propTypes = {
  videos: React.PropTypes.array,
};

export default VideosList;
