import React from 'react'
import Bricks from '../../components/Bricks/Bricks';
import ModalCard from '../Card/Card'

const {
  TrComponent,
  TdComponent,
  TbodyComponent,
} = Bricks


const Rows = ({data}) => {
  return (
    <TbodyComponent>
      {data.data.map((d, i) => makePageRow(d, i, data))}
    </TbodyComponent>
  )
}

const makePageRow = (row, i, data) => {

  return (
    <TrComponent
      key={i}
    >
      {data.columns.map((column, i2) => {
        
        const cellInfo = {
          column: { ...column },
          value: row[column.accessor],
        }

        const value = cellInfo.value

        const resolvedCell = normalizeComponent(column.Cell, cellInfo, value)        
        return (
          <TdComponent
            key={`${i2}-${column.accessor}`}
            onClick={() => data.toggleModal(i)}
          >
            {resolvedCell}
            <ModalCard row={row} />
          </TdComponent>
        )
      })}
    </TrComponent>
  )
}

const normalizeComponent = (Comp, params = {}, fallback = Comp) => {
  return typeof Comp === 'function' ? (
    Object.getPrototypeOf(Comp).isReactComponent ? (
      <Comp {...params} />
    ) : (
      Comp(params)
    )
  ) : (
    fallback
  )
}

export default Rows