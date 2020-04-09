// Conversion functions adapted from https://www.cs.rit.edu/~ncs/color/t_convert.html

export const ColorSpaces = [
  {
    name: 'RGB',
    channels: [
      {
        name: 'red',
        min: 0,
        max: 255,
      },
      {
        name: 'green',
        min: 0,
        max: 255,
      },
      {
        name: 'blue',
        min: 0,
        max: 255,
      },
    ],
  },
  {
    name: 'HSV',
    channels: [
      {
        name: 'hue',
        min: 0,
        max: 360,
      },
      {
        name: 'saturation',
        min: 0,
        max: 1,
      },
      {
        name: 'value',
        min: 0,
        max: 1,
      },
    ],
  },
]

// Expects array of r,g,b values in range [0, 255]
// Outputs array of h,s,v values: h [0, 360] s,v [0, 1]
// TODO: convert white->white correctly
export function rgb2hsv(rgbColor) {
  // Normalise colours to 0-1 range
  const [r, g, b] = rgbColor.map((c) => c / 255)
  let h, s, v

  // white
  if (r + g + b === 3) {
    return [-1, 0, 1]
  }

  // black
  if (r + g + b === 0) {
    return [-1, 0, 0]
  }

  // r,g,b values are from 0 to 1
  // h = [0,360], s = [0,1], v = [0,1]
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const delta = max - min

  s = max !== 0 ? delta / max : 0
  v = max
  if (s !== 0) {
    if (r === max) {
      h = (g - b) / delta
    } else if (g === max) {
      h = 2 + (b - r) / delta
    } else {
      h = 4 + (r - g) / delta
    }
    h = h * 60
    if (h < 0) h += 360
  } else {
    // greys have undefined hue
    h = -1
  }

  return [h, s, v]
}
// Expects array of h,s,v values: h [0, 360] s,v [0, 1]
// Outputs array of rgb values in range [0, 255]
export function hsv2rgb(hsvColor) {
  let [h, s, v] = hsvColor
  let r, g, b
  let i, f, p, q, t

  if (s === 0) {
    // achromatic (grey)
    r = g = b = v
    return [r * 255, g * 255, b * 255]
  }
  h /= 60 // sector 0 to 5
  i = Math.floor(h)
  f = h - i // factorial part of h
  p = v * (1 - s)
  q = v * (1 - s * f)
  t = v * (1 - s * (1 - f))
  switch (i) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    default:
      // case 5:
      r = v
      g = p
      b = q
      break
  }
  return [r * 255, g * 255, b * 255]
}
