import { mapNDArray, findClosestPair } from './helpers'
import { Interps } from './interp'
import { hsv2rgb, rgb2hsv } from './colorspace'

export const TEX_WIDTH = 2048
export const TEX_HEIGHT = 1
export const TEX_CHANNELS = 4

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
    ]
    return colorAsArray
  }

  return [0, 0, 0]
}

export function generateTextureData(colorPoints, curveName, colorModel) {
  const defaultColorSpace = 'RGB'
  const interp = Interps[curveName].fn
  const sortedColorPoints = colorPoints.sort((a, b) => parseFloat(a.position) - parseFloat(b.position))
  const sortedPositions = sortedColorPoints.map((a) => parseFloat(a.position))

  // Convert all colorPoints to target color space
  const convertedColorPoints =
    colorModel !== defaultColorSpace
      ? sortedColorPoints.map((item) => {
        return { ...item, color: rgb2hsv(item.color) }
      })
      : sortedColorPoints

  // Peform interpolation on each channel in each color
  let texLerp = []
  for (let i = 0; i < TEX_WIDTH; i++) {
    const mapPct = i / TEX_WIDTH
    const closetPairIdxs = findClosestPair(sortedPositions, mapPct)
    const c1 = convertedColorPoints[closetPairIdxs[0]]
    const c1pos = parseFloat(c1.position)
    const c2 = convertedColorPoints[closetPairIdxs[1]]
    const c2pos = parseFloat(c2.position)
    const localMapPct = (mapPct - c1pos) / Math.abs(c1pos - c2pos)

    // This check accounts for the 'undefined' hue values of achromatic shades
    // We carry the hue of the colour we interpolate from and interp on sat/value
    if (c2.color[0] === -1) {
      c2.color[0] = c1.color[0]
    }

    if (c1.color[0] === -1) {
      c1.color[0] = c2.color[0]
    }

    const tmp = []
    for (let c = 0; c < c1.color.length; c++) {
      tmp[c] = interp(c1.color[c], c2.color[c], localMapPct)
    }
    texLerp[i] = tmp
  }

  // Convert back into RGB
  const texRGB = colorModel !== defaultColorSpace ? texLerp.map((item) => hsv2rgb(item)) : texLerp
  // Round to integers
  const tex2D = mapNDArray(texRGB, (i) => Math.round(i))
  // Append alpha channel
  const withAlpha = tex2D.map((item) => [...item, 255])

  const TEX_SIZE = TEX_WIDTH * TEX_CHANNELS
  const textureData = new Uint8Array(TEX_SIZE)
  for (let i = 0; i < TEX_SIZE; i++) {
    // Pixel number
    let px = Math.floor(i / TEX_CHANNELS)
    // Channel number
    let chan = i % TEX_CHANNELS
    // Push into Uint8Array
    textureData[i] = withAlpha[px][chan]
  }

  return textureData
}
