import React from 'react'
import './App.css'
import ModelProvider from './components/ModelProvider'
import AppCanvas from './components/AppCanvas'
import TimeManager from './components/TimeManager'

function App() {
  return (
    <div className='App'>
      <ModelProvider>
        <TimeManager />
        <AppCanvas></AppCanvas>
      </ModelProvider>
    </div>
  )
}

export default App
