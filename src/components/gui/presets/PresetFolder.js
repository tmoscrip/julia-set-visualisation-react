import React, { useContext, useEffect, useState } from 'react'
import { contextToValueObject } from '../../ModelProvider'
import { loadObjectIntoContext, ShaderContext } from './../../ModelProvider'
import PresetButtons from './PresetButtons'
import Folder from '../base_components/Folder'
import PresetNameField from './PresetNameField'
import PresetSelector from './PresetSelector'
import PresetErrorField from './PresetErrorField'

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
  return getPresetArray().filter((preset) => preset.name !== name)
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

function removePresetFromArray(name) {
  const presets = getPresetArray().filter((preset) => preset.name !== name)
  localStorage.setItem('presets', JSON.stringify(presets))
}

export default function PresetFolder() {
  const ctx = useContext(ShaderContext)
  const [selectedPresetName, setSelectedPresetName] = useState('')
  const [presetName, setPresetName] = useState('')
  const [presetsList, setPresetsList] = useState([])
  const [promptedToOverwrite, setPromptedToOverwrite] = useState(false)
  const [error, setError] = useState('')
  const presetsNames = presetsList.map((item) => item.name).filter((name) => name !== undefined)

  const title = 'Presets'

  function updatePresetsList() {
    const presets = getPresetArray()
    setPresetsList(presets)
  }

  function setInitialSelectedPreset() {
    const initial = presetsList.length !== 0 ? presetsList[0].name : ''
    setSelectedPresetName(initial)
  }

  function savePreset() {
    if (presetName === '') {
      // Deny empty name
      setError('Cannot save without entering a name')
      return
    }
    if (namedPresetExists(presetName)) {
      // Ask to overwrite
      if (!promptedToOverwrite) {
        setPromptedToOverwrite(true)
        setError('Click save again to overwrite existing preset')
        return
      }
      // Delete existing preset with matching name
      removePresetFromArray(presetName)
    }
    // Add and update list if all checks pass
    const presetObject = makePresetObject(presetName, ctx)
    addPresetToArray(presetObject)
    updatePresetsList()
    setError('')
    setPromptedToOverwrite(false)
  }

  function loadPreset() {
    const presetArray = getPresetArray()
    const preset = presetArray.find((item) => item.name === selectedPresetName)

    try {
      delete preset.name
      loadObjectIntoContext(preset, ctx)
      setPresetName(selectedPresetName)
    } catch {
      return
    }
  }

  function updateSelection(e) {
    setSelectedPresetName(e.target.value)
  }

  function updatePresetName(e) {
    setPresetName(e.target.value)
  }

  // Initial select element population
  useEffect(() => {
    updatePresetsList()
  }, [])

  // Initial selected option in select element
  useEffect(() => {
    setInitialSelectedPreset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetsList])

  return (
    <Folder title={title}>
      <PresetSelector options={presetsNames} value={selectedPresetName || ''} onChange={updateSelection} />
      <PresetNameField value={presetName} onChange={updatePresetName} />
      <PresetButtons onClickSave={savePreset} onClickLoad={loadPreset} />
      <PresetErrorField text={error} />
    </Folder>
  )
}
