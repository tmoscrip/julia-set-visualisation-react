import { mapNDArray } from './helpers'

export const TEX_WIDTH = 512
export const TEX_CHANNELS = 4

// TODO: investigate color conversion algorithms:
// https://www.cs.rit.edu/~ncs/color/t_convert.html
// https://gist.github.com/Tetr4/3c7a4eddb78ae537c995
export function parseHexColor(colorString) {
  let cString = colorString.trim()

  if (cString.startsWith('#')) {
    cString = cString.slice(1, cString.length)
  }

  const hexIdent = '0x'

  if (parseInt(cString) != null) {
    const colorAsArray = [
      parseInt(hexIdent.concat(cString.slice(0, 2))),
      parseInt(hexIdent.concat(cString.slice(2, 4))),
      parseInt(hexIdent.concat(cString.slice(4, 6))),
      255, // Alpha
    ]
    return colorAsArray
  }

  return [0, 0, 0, 255]
}

export function generateTextureData(colorPoints) {
  const c1 = colorPoints[0].color
  const c2 = colorPoints[1].color

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

  const texLerp = lerpReduceArrays(c1, c2, TEX_WIDTH)
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
