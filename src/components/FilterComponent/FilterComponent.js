import React from 'react'
import Bricks from '../../components/Bricks/Bricks';
import _ from '../../assets/constants/utils';
const { 
  TheadComponent, 
  TrComponent, 
  ThComponent,
  FilterComponent
} = Bricks


const Filters = ({data}) => {
  return (
    <TheadComponent>
      <TrComponent>
        {data.columns.map((x, i) => makeFilter(x, i, data))}
      </TrComponent>
    </TheadComponent>
  )
}

const makeFilter = (column, i, state) => {

  const filtered = state.filtered || []
  const filter = filtered.find(filter => filter.id === column.id)
  const isFilterable = _.getFirstDefined(column.filterable, false, false)

  return (
    <ThComponent
      key={`${i}-${column.id}`}
    >
      {isFilterable
        ? 
          <FilterComponent
            filter={filter}
            onChange={value => filterColumn(state, column, value)}
          />
        : null}
    </ThComponent>
  )
}

const filterColumn = (state, column, value) => {

  const newFiltering = (state.filtered || []).filter(x => x.id !== column.id)
  if (value !== '') {
    newFiltering.push({
      id: column.id,
      value,
    })
  }
  state.onGetData(null, newFiltering)
};


export default Filters