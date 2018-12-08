import React from 'react'
import classnames from 'classnames'

export default {
  
  // Components
  TableComponent: ({ children, className, ...rest }) => (
    <div
      className={classnames('rt-table', className)}
      role="grid"
      {...rest}
    >
      {children}
    </div>
  ),
  TheadComponent: ({ children, ...rest }) => (
    <div
      className={classnames('rt-thead', 'Thead')}
      {...rest}
    >
      {children}
    </div>
  ),
  TbodyComponent: ({ children, ...rest }) => (
    <div
      className={classnames('rt-tbody', 'Tbody')}
      {...rest}
    >
      {children}
    </div>
  ),
  TrComponent: ({ children, className, ...rest }) => (
    <div className={classnames('rt-tr', className)} 
      role="row" 
      {...rest}
    >
      {children}
    </div>
  ),
  ThComponent: ({
    toggleSort, className, children, ...rest
  }) => (
    <div
      className={classnames('rt-th', className)}
      onClick={e => toggleSort && toggleSort(e)}
      role="columnheader"
      tabIndex="-1"
      {...rest}
    >
      {children}
    </div>
  ),
  TdComponent: ({
    toggleSort, className, children, ...rest
  }) => (
    <div className={classnames('rt-td', className)} 
      role="gridcell"
      {...rest}>
      {children}
    </div>
  ),
  FilterComponent: ({ filter, onChange }) => (
    <input
      type="text"
      style={{
        width: '100%',
      }}
      value={filter ? filter.value : ''}
      onChange={event => onChange(event.target.value)}
    />
  ),
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: ({
    className, loading, loadingText, ...rest
  }) => (
    <div className={classnames('-loading', { '-active': loading }, className)}
      {...rest}>
      <div className="-loading-inner">{loadingText}</div>
    </div>
  ),
  NoDataComponent: ({ children, ...rest }) => (
    <div
      className={classnames('rt-noData', 'NoData')}
      {...rest}
    >
      {children}
    </div>
  ),
}
