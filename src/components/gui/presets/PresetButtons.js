import React from 'react'
import Button from './../base_components/Button'
import Item from '../base_components/Item'
import { PropTypes } from 'prop-types'

export function PresetButtonSave({ onClick }) {
  const text = 'Save'
  const className = 'btn-half'

  return <Button text={text} onClick={onClick} className={className} />
}

export function PresetButtonLoad({ onClick }) {
  const text = 'Load'
  const className = 'btn-half'

  return <Button text={text} onClick={onClick} className={className} />
}

export function PresetButtonImport({ onClick }) {
  const text = 'Import'
  const className = 'btn-half'

  return <Button text={text} onClick={onClick} className={className} />
}

export function PresetButtonExport({ onClick }) {
  const text = 'Export'
  const className = 'btn-half'

  return <Button text={text} onClick={onClick} className={className} />
}

export function SaveLoadButtons({ onClickSave, onClickLoad }) {
  return (
    <Item className='two-btn'>
      <PresetButtonSave onClick={onClickSave} />
      <PresetButtonLoad onClick={onClickLoad} />
    </Item>
  )
}

SaveLoadButtons.propTypes = {
  onClickSave: PropTypes.func.isRequired,
  onClickLoad: PropTypes.func.isRequired,
}

export function ImportExportButtons({ onClickImport, onClickExport }) {
  return (
    <Item className='two-btn'>
      <PresetButtonImport onClick={onClickImport} />
      <PresetButtonExport onClick={onClickExport} />
    </Item>
  )
}

ImportExportButtons.propTypes = {
  onClickImport: PropTypes.func.isRequired,
  onClickExport: PropTypes.func.isRequired,
}
