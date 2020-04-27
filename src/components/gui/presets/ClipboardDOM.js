import React from 'react'
import Item from '../base_components/Item'

export const ClipboardDOM = React.forwardRef((props, ref) => (
  <Item>
    <input className='importexport-field' ref={ref}></input>
  </Item>
))
