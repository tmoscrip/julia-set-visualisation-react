import { mapNDArray } from './helpers'

// TODO: investigate color conversion algorithms:
// https://www.cs.rit.edu/~ncs/color/t_convert.html
// https://gist.github.com/Tetr4/3c7a4eddb78ae537c995

export function testTexture(TEX_WIDTH, TEX_CHANNELS) {
  // RGBA
  const black = [0, 0, 0, 255]
  const green = [0, 255, 0, 255]

  const lerpReduceArrays = (a, b, steps) => {
    const lerp = (a, b, frac) => {
      return a * frac + b * (1 - frac)
    }

    let out = []
    for (let i = 0; i < steps; i++) {
      let tmp = []
      for (let j = 0; j < a.length; j++) {
        tmp[j] = lerp(a[j], b[j], i / steps)
      }
      out[i] = tmp
    }

    return out
  }

  const texLerp = lerpReduceArrays(green, black, TEX_WIDTH)
  const tex2D = mapNDArray(texLerp, i => Math.round(i))

  const TEX_SIZE = TEX_WIDTH * TEX_CHANNELS
  const textureData = new Uint8Array(TEX_SIZE)
  for (let i = 0; i < TEX_SIZE; i++) {
    let loc = Math.floor(i / TEX_CHANNELS)
    let chan = i % TEX_CHANNELS
    textureData[i] = tex2D[loc][chan]
  }

  return textureData
}
