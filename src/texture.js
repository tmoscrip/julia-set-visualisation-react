import { mapNDArray } from './helpers'
import { Interps } from './interp'

export const TEX_WIDTH = 2048
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

export function generateTextureData(colorPoints, curveName) {
  function findClosestPair(arr, num) {
    for (let i = 0; i < arr.length; i++) {
      let cur = arr[i]
      let next = arr[i + 1]
      if (cur <= num && next > num) {
        return [i, i + 1]
      }
    }
  }

  const interp = Interps[curveName]
  const interpFn = interp.fn
  const sortedColorPoints = colorPoints.sort((a, b) => parseFloat(a.position) - parseFloat(b.position))
  const sortedPositions = sortedColorPoints.map(a => parseFloat(a.position))
  let texLerp = []

  for (let i = 0; i < TEX_WIDTH; i++) {
    let mapPct = i / TEX_WIDTH
    let closetPairIdxs = findClosestPair(sortedPositions, mapPct)
    let c1 = sortedColorPoints[closetPairIdxs[0]]
    let c1pos = parseFloat(c1.position)
    let c2 = sortedColorPoints[closetPairIdxs[1]]
    let c2pos = parseFloat(c2.position)
    let localMapPct = (mapPct - c1pos) / Math.abs(c1pos - c2pos)

    let tmp = []
    for (let c = 0; c < c1.color.length; c++) {
      tmp[c] = interpFn(c1.color[c], c2.color[c], localMapPct)
    }
    texLerp[i] = tmp
  }

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
