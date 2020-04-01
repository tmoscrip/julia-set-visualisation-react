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

function parseHexColour(colourString) {
  let cString = colourString.trim()

  if (cString.startsWith('#')) {
    cString = cString.slice(1, cString.length)
  }

  if (parseInt(cString) != null) {
    return [parseInt(cString.slice(0, 2)), parseInt(cString.slice(2, 4)), parseInt(cString.slice(4, 6))]
  }

  return [0, 0, 0]
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
