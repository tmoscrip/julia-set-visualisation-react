import React from 'react'
import './App.scss'
import './components/gui/gui.scss'
import ModelProvider from './components/ModelProvider'
import ShaderCanvas from './components/ShaderCanvas'
import MyGUI from './components/MyGUI'

export default function App() {
  return (
    <div className='App'>
      <ModelProvider>
        <ShaderCanvas />
        <MyGUI />
      </ModelProvider>
    </div>
  )
}
