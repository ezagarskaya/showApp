import React from 'react'
import Bricks from '../../components/Bricks/Bricks';
const { 
  TheadComponent, 
  TrComponent, 
  ThComponent
} = Bricks


const Header = ({columns}) => {
  return (
    <TheadComponent>
      <TrComponent>
        {columns.map(makeHeader)}
      </TrComponent>
    </TheadComponent>
  )
}

const makeHeader = (column, i) => {
  return (
    <ThComponent
      key={`${i}-${column.id}`}
    >
      <div>
        {column.Header}
      </div>
    </ThComponent>
  )
}

export default Header