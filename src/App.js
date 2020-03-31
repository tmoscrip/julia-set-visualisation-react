import React from 'react'
import './App.scss'
import ModelProvider from './components/ModelProvider'
import ShaderCanvas from './components/ShaderCanvas'

function App() {
  return (
    <div className='App'>
      <ModelProvider>
        <ShaderCanvas />
      </ModelProvider>
    </div>
  )
}

export default App
