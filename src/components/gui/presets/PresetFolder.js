import React, { useContext, useEffect, useState } from 'react'
import { contextToValueObject } from '../../ModelProvider'
import { loadObjectIntoContext, ShaderContext } from './../../ModelProvider'
import Folder from '../base_components/Folder'
import PresetNameField from './PresetNameField'
import PresetSelector from './PresetSelector'
import PresetErrorField from './PresetErrorField'
import { SaveLoadButtons } from './PresetButtons'

function makePresetObject(name, _ctx) {
  const ctx = contextToValueObject(_ctx)
  const { julia, viewport, color } = ctx
  const { colorPoints, curve, colorModel } = color
  return {
    name,
    julia,
    viewport,
    color: {
      colorPoints,
      curve,
      colorModel,
    },
  }
}

function namedPresetExists(name) {
  const nameMatch = getPresetArray().filter((preset) => preset.name === name)
  return nameMatch.length > 0
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

  function resetErrorState() {
    setError('')
    setPromptedToOverwrite(false)
  }

  function savePreset() {
    // Deny empty name & warn
    if (presetName === '') {
      setError('Cannot save without entering a name')
      return
    }

    // If preset with entered name already exists, ask to overwrite
    if (namedPresetExists(presetName)) {
      if (!promptedToOverwrite) {
        setPromptedToOverwrite(true)
        setError('Click save again to overwrite existing preset')
        return
      }
      // Delete existing preset with matching name if attempting to save again
      removePresetFromArray(presetName)
    }
    // Add and update list if all checks pass
    const presetObject = makePresetObject(presetName, ctx)
    addPresetToArray(presetObject)
    updatePresetsList()
    resetErrorState()
  }

  function loadPreset() {
    const presetArray = getPresetArray()
    const preset = presetArray.find((item) => item.name === selectedPresetName)

    try {
      delete preset.name // Name of the preset doesn't get loaded into state
      loadObjectIntoContext(preset, ctx)
      setPresetName(selectedPresetName)
      resetErrorState()
    } catch {
      return
    }
  }

  // function currentToBase64() {
  //   const { julia, viewport, color } = contextToValueObject(ctx)
  //   const { colorPoints, curve, model } = color
  //   const color2 = { colorPoints, curve, model }
  //   const obj = { julia, viewport, color: color2 }
  //   const base64 = btoa(JSON.stringify(obj))
  //   console.log(base64)
  // }

  // function importBase64() {

  // }

  function updateSelection(e) {
    setSelectedPresetName(e.target.value)
    resetErrorState()
  }

  function updatePresetName(e) {
    setPresetName(e.target.value)
    resetErrorState()
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
      <SaveLoadButtons onClickSave={savePreset} onClickLoad={loadPreset} />
      <PresetErrorField text={error} />
      {/* <ImportExportButtons onClickImport={() => null} onClickExport={currentToBase64} /> */}
    </Folder>
  )
}
