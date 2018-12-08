import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as tableBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';
import Bricks from '../../components/Bricks/Bricks';
import defaultProps from '../../assets/constants/defaultProps';
import classnames from 'classnames';
import Pagination from '../Pagination/Pagination';
import Header from '../../components/TheadComponent/TheadComponent';
import Filters from '../../components/FilterComponent/FilterComponent';
import Rows from '../../components/Rows/Rows';

const { 
  TableComponent,
  LoadingComponent,
  NoDataComponent,
} = Bricks

class TableBuilder extends Component {
  static defaultProps = defaultProps

  componentDidMount () {
    this.props.onGetData();
  };

  render () {

    const {
      className,
      showPagination,
      showPaginationTop,
      showPaginationBottom,
      loadingText,
      noDataText,
      loading,
    } = this.props

    console.log(this.props, 'dataModel')

    const hasFilters = this.props.columns.some(d => d.filterable)

    const loadingProps = {}
    const noDataProps = {}
    
    const makeTable = () => {
      const pagination = <Pagination {...this.props} />
      return (
        <div
          className={classnames('ReactTable', className)}
        >
          {showPagination && showPaginationTop ? (
            <div className="pagination-top">{pagination}</div>
          ) : null}
          <TableComponent>
            <Header columns={this.props.columns} />
            {hasFilters ? <Filters data={this.props} /> : null}
            <Rows data={this.props} />
          </TableComponent>
          {showPagination && showPaginationBottom ? (
            <div className="pagination-bottom">{pagination}</div>
          ) : null}
          {!this.props.data.length && (
            <NoDataComponent {...noDataProps}/>
          )}
          <LoadingComponent loading={!loading} loadingText={loadingText} {...loadingProps} />
        </div>
      )
    }

    return makeTable()
  }
}

const mapStateToProps = state => {
    return {
        data: state.data,
        page: state.page,
        error: state.error,
        loading: state.loading,
        filtered: state.filtered,
        pages: state.pages
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetData: (page, options) => dispatch(tableBuilderActions.getData(page, options)),
        toggleModal: id => dispatch(tableBuilderActions.toggleModal(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( TableBuilder, axios ));
