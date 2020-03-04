import React from 'react'
import './App.css'
import ModelProvider from './components/ModelProvider'
import AppCanvas from './components/AppCanvas'

function App() {
  return (
    <div className='App'>
      <ModelProvider>
        <AppCanvas></AppCanvas>
      </ModelProvider>
    </div>
  )
}

export default App
