import React, { useContext, useEffect, useState } from 'react'
import { contextToValueObject } from '../../ModelProvider'
import { loadObjectIntoContext, ShaderContext } from './../../ModelProvider'
import PresetButtons from './PresetButtons'
import Folder from '../base_components/Folder'
import PresetNameField from './PresetNameField'
import PresetSelector from './PresetSelector'

function makePresetObject(name, _ctx) {
  const ctx = contextToValueObject(_ctx)
  const { julia, viewport, color } = ctx
  return {
    name,
    julia,
    viewport,
    color,
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

export default function PresetFolder() {
  const ctx = useContext(ShaderContext)
  const [selectedPreset, setSelectedPreset] = useState('')
  const [presetName, setPresetName] = useState('')
  const [presetsList, setPresetsList] = useState([])
  const presetsNames = presetsList.map((item) => item.name)

  const title = 'Presets'

  function updatePresetsList() {
    const presets = getPresetArray()
    setPresetsList(presets)
  }

  function setInitialSelectedPreset() {
    const initial = presetsList.length !== 0 ? presetsList[0].name : ''
    setSelectedPreset(initial)
  }

  function savePreset() {
    if (presetName === '') {
      // TODO: deny empty name
    }
    if (namedPresetExists(presetName)) {
      // TODO: ask to overwrite
    }
    // Add and update list if all checks pass
    const presetObject = makePresetObject(presetName, ctx)
    addPresetToArray(presetObject)
    updatePresetsList()
  }

  function loadPreset() {
    const presetArray = getPresetArray()
    const preset = presetArray.find((item) => item.name === selectedPreset)

    if (preset === undefined) {
      throw new Error('Attempted to load unknown perset')
    }

    delete preset.name

    loadObjectIntoContext(preset, ctx)
  }

  function updateSelection(e) {
    setSelectedPreset(e.target.value)
  }

  function updatePresetName(e) {
    setPresetName(e.target.value)
  }

  // Initial select element population
  useEffect(() => {
    updatePresetsList()
  }, [])

  useEffect(() => {
    setInitialSelectedPreset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetsList])

  return (
    <Folder title={title}>
      <PresetSelector options={presetsNames} value={selectedPreset || ''} onChange={updateSelection} />
      <PresetNameField value={presetName} onChange={updatePresetName} />
      <PresetButtons onClickSave={savePreset} onClickLoad={loadPreset} />
    </Folder>
  )
}
