import React, { useContext } from 'react'
import { ShaderContext } from './ModelProvider';

function CloseModalButton({ onClick }) {
  return <button onClick={onClick} className='btn'>Close</button>
}

export default function Modal() {
  const ctx = useContext(ShaderContext)
  const [showModal, setShowModal] = ctx.showModal

  const className = showModal ? 'show' : ''

  function closeModal() {
    setShowModal(false)
  }

  return (
    <div className={`modal ${className}`}>
      <h1>Julia/Fatou Sets WebGL Renderer</h1>
      <div className='spacer' />
      <p>Drag a box on the canvas to zoom to that area</p>
      <p>Hit 'Enter' to save a screenshot of the current canvas</p>
      <p>Right click to reset zoom/translate to the default</p>
      <p>Refer to the GUI help tooltips for more information</p>
      <div className='spacer' />
      <CloseModalButton onClick={closeModal} />
    </div>
  )
}
