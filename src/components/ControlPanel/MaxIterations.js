import React, {useContext, useState} from 'react'
import { ShaderContext } from './../ModelProvider';

export default function MaxIterations({ label }) {
  const ctx = useContext(ShaderContext)
  const [inputValue, setInputValue] = useState(ctx.julia.maxIterations)

  function handleChange(event) {
    setInputValue(event.target.value)
    ctx.julia.maxIterations = event.target.value
  }

  return (
    <div>
      <span>{label}</span>
      <input name={label} value={inputValue} onChange={handleChange}/>
    </div>
  )
}
