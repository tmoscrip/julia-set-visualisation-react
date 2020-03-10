import React, { useState, useEffect } from 'react'
import { contextToValueObject } from './ModelProvider'

function makePresetObject(name, julia) {
  const juliaObj = contextToValueObject(julia)
  return {
    name: name,
    julia: juliaObj
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

function setPresetArray(preset) {
  const array = getPresetArray()
  array.push(preset)
  localStorage.setItem('presets', JSON.stringify(array))
}

export default function PresetSaver() {
  const [presetName, setPresetName] = useState('')
  const [presetsList, setPresetsList] = useState([])

  const updatePresetsList = () => {
    const presets = getPresetArray()
    setPresetsList(presets)
  }

  // Initial select element population
  useEffect(() => {
    updatePresetsList()
  }, [])

  return (
    <div>
      <input></input>
      <select>
        {presetsList.map(item => {
          return <option value={item.name}>{item.name}</option>
        })}
      </select>
      <button>Save</button>
      <button>Load</button>
    </div>
  )
}
