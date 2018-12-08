import React, { Component } from 'react';
import { render } from "react-dom";
import TableBuilder from './containers/TableBuilder/TableBuilder';
import { columns } from './assets/constants/columns';

class App extends Component {
  render () {
    return (
      <div>
        <TableBuilder
          columns={columns}
          loading={false}
          className="-striped -highlight"
          showPaginationTop
          showPaginationBottom
        />
      </div>
    );
  }
}

export default App;
