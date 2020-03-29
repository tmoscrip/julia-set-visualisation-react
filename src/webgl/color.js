//
// color SPACE FUNCTIONS
//
const hsv2rgb = `
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1., 2. / 3., 1. / 3., 3.);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6. - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0., 1.), c.y);
}
`

function parseHexColour(colourString, colourSpace) {
  const cSpace = colourSpace.lower()
  // Return solid green if colourspace cannot be understood
  if (!(cSpace in ['rgb', 'hsv', 'hsl'])) {
    return 'vec3(0, 1, 0)'
  }

  let cString = colourString
  cString = cString.trim()

  if (cString.startsWith('#')) {
    cString = cString.slice(1, cString.length)
  }
}

//
// JULIA ITERATIONS HSV COLORING FUNCTIONS
//
const huefn = `
float huefn(float iterations) {
  float max_iter = float(maxIterations);
  return .1 + .3*(iterations / max_iter);
}
`

const satfn = `
float satfn(float iterations) {
  float max_iter = float(maxIterations);
  return .5 + .5*(iterations / max_iter);
}
`

const valfn = `
float valfn(float iterations) {
  float max_iter = float(maxIterations);
  return .5 + 2.*(iterations / max_iter);
}
`

export const color = `
${hsv2rgb}
${huefn}
${satfn}
${valfn}
`
