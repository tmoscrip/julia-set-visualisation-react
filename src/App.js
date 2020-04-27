import React from 'react'
import './App.scss'
import './components/gui/gui.scss'
import ModelProvider from './components/ModelProvider'
import ShaderCanvas from './components/ShaderCanvas'
import MyGUI from './components/MyGUI'
import Modal from './components/Modal';

export default function App() {
  return (
    <div className='App'>
      <ModelProvider>
        <ShaderCanvas />
        <Modal />
        <MyGUI />
      </ModelProvider>
    </div>
  )
}
