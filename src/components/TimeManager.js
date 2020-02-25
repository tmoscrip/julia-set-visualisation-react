import { useContext, useEffect } from 'react'
import { ShaderContext } from './ModelProvider'

export default function TimeManager() {
  const shaderContext = useContext(ShaderContext)

  // Start timer on initial render
  useEffect(() => {
    shaderContext.startTime = Date.now()
  }, [])

  // Renderless component
  return null
}
