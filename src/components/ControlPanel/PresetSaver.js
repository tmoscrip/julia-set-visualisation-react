import React, { useState, useEffect, useContext } from 'react'
import { contextToValueObject, ShaderContext, loadObjectIntoContext } from '../ModelProvider'
import { LabelledField } from './InputTypes'
import CollapsibleGroup from './CollapsibleGroup'

function makePresetObject(name, ctx) {
  const julia = contextToValueObject(ctx.julia)
  const viewport = contextToValueObject(ctx.viewport)
  return {
    name,
    julia,
    viewport,
  }
}

function namedPresetExists(name) {
  const array = getPresetArray()
  for (const preset in array) {
    if (preset.name === name) {
      return true
    }
  }
  return false
}

function getPresetArray() {
  const presetArray = localStorage.getItem('presets')
  return presetArray ? JSON.parse(presetArray) : []
}

function addPresetToArray(preset) {
  const array = getPresetArray()
  array.push(preset)
  localStorage.setItem('presets', JSON.stringify(array))
}

export default function PresetSaver() {
  const ctx = useContext(ShaderContext)

  const [selectedPreset, setSelectedPreset] = useState('')
  const [presetName, setPresetName] = useState('')
  const [presetsList, setPresetsList] = useState([])

  const title = 'Presets'

  const updatePresetsList = () => {
    const presets = getPresetArray()
    setPresetsList(presets)
  }

  function savePreset() {
    const presetObject = makePresetObject(presetName, ctx)
    if (namedPresetExists(presetObject)) {
      // TODO: ask to overwrite
    }
    addPresetToArray(presetObject)
    updatePresetsList()
  }

  function loadPreset() {
    const presetArray = getPresetArray()
    // TODO: access presetArray by key identifier
    for (const i in presetArray) {
      const preset = presetArray[i]
      if (preset.name === selectedPreset) {
        loadObjectIntoContext(preset.julia, ctx.julia)
        loadObjectIntoContext(preset.viewport, ctx.viewport)
      }
    }
  }

  function updateSelection(e) {
    setSelectedPreset(e.target.value)
  }

  // Initial select element population
  useEffect(() => {
    updatePresetsList()
  }, [])

  return (
    <CollapsibleGroup title={title}>
      <LabelledField label='Preset name' inputValue={presetName} setInputValue={setPresetName} />
      <select value={selectedPreset} onChange={updateSelection} className='panel-input preset-selector'>
        {presetsList.length === 0 ? <option>No presets saved</option> : null}
        {presetsList.map(item => {
          return (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          )
        })}
      </select>
      <button className='panel-input' onClick={savePreset}>
        Save
      </button>
      <button className='panel-input' onClick={loadPreset}>
        Load
      </button>
    </CollapsibleGroup>
  )
}
