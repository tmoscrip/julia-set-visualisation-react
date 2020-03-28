import { math } from './math'
import { color } from './color'

/*
  Ints are not implictly cast to floats in WebGL, any value which is passed to
  WebGL code for use as a float must contain a decimal point

  This function appends a period to any int to avoid type errors once it's passed
  into WebGL code
*/
function fixWebGlInts(str) {
  let finalStr = str
  // Capture: 1. floats, 2. floats (int w/ trailing period), 3. ints
  const anyNumberRegex = new RegExp(/\d+[.]\d+|(\d+[.])+|(\d+)/g)

  // Find all matches
  let match
  let matches = []
  while ((match = anyNumberRegex.exec(str)) !== null) {
    matches.push(match)
  }

  // Filter out floats
  matches = matches.filter(m => !m[0].includes('.'))

  // How many extra characters have been inserted
  let insertedCount = 0
  for (let i in matches) {
    let m = matches[i]
    let insertAt = m['index'] + m[0].length + insertedCount
    finalStr = finalStr.slice(0, insertAt) + '.' + finalStr.slice(insertAt, finalStr.length)
    insertedCount += 1
  }

  return finalStr
}

// GLSL 'for' loops can only be indexed up to a constant value
// Passing in the max iteration count through a uniform encounters an error
// Therefore this function constructs a constant value definition
function maxIterations(val) {
  return `#define maxIterations ${val}`
}

function cValue({ x, y }) {
  return `vec2 c = vec2(${fixWebGlInts(x)}, ${fixWebGlInts(y)});`
}

function viewport({ width, height, translate }) {
  return `
  float XSIZE = ${fixWebGlInts(width)};
  float YSIZE = ${fixWebGlInts(height)};
  float XT = ${fixWebGlInts(translate.x)};
  float YT = ${fixWebGlInts(translate.y)};
  `
}

const uniforms = `
uniform float u_escapeRadius;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_width;
uniform float u_height;
uniform float u_translatex;
uniform float u_translatey;
`

const headers = `
precision highp float;
`

//
// JULIA ITERATION FUNCTIONS
//
const polyIterate = coefficients => {
  const cmplxExp = (exp, coeff) => {
    // Skip all terms with coefficient of 0
    if (parseFloat(coeff) !== 0) {
      // When exp = 0, we are handling the C value
      if (exp === 0) {
        return `z = complexAdd(z, ${coeff}*c);`
      }
      // Use complexAdd instead of complexPower for exponent 1
      if (exp === 1) {
        return `z = complexAdd(z, ${coeff}*zPrev);`
      }
      return `z = complexAdd(z, complexPower(${coeff}*zPrev, vec2(${exp}, 0.)));`
    }
    return ''
  }

  // Remove all whitespace, split into list delimitted by commas
  const coeffList = coefficients.replace(/\s/g, '').split(',')
  let polySource = ''
  for (let i = 0; i < coeffList.length; i++) {
    const exp = coeffList.length - (i + 1)
    const nextTerm = cmplxExp(exp, coeffList[i])
    if (nextTerm !== '') {
      polySource = polySource.concat(nextTerm, '\n')
    }
  }

  console.log(polySource)
  return polySource
}

const julia = ctx => `
vec3 julia(vec2 z, vec2 c) {
  float result;
  int iters = 0;
  vec2 zPrev = z;
  z = vec2(0.);

  for (int i = 0; i <= maxIterations; i++) {
    ${polyIterate(fixWebGlInts(ctx.julia.coefficients))}
    iters = i;
    zPrev = z;
    if (complexMag(z) > u_escapeRadius) break;
  }

  if (iters == maxIterations) {
    return vec3(0, 0, 0);
  } else {
    ${ctx.julia.useSmoothing ? 'result = smoothIterations(z, iters);' : 'result = float(iters);'}
  }

  float percent = result/float(maxIterations);

  float hue = huefn(result);
  float sat = satfn(result);
  float val = valfn(result);

  return hsv2rgb(vec3(hue, sat, val));
}
`

// Smooth coloring function
// http://linas.org/art-gallery/escape/escape.html
// https://en.wikipedia.org/wiki/Mandelbrot_set#Continuous_(smooth)_coloring
const smoothIterations = `
float smoothIterations(vec2 z, int iterations) {
  // sqrt of inner term removed using log simplification rules.
  // sqrt is equivilent to raising to power 0.5 therefore dividing
  // by 2 or multiplying by 0.5 avoids an inefficient sqrt calculation
  float log_zn = log(z.x * z.x + z.y * z.y) / 2.;
  float nu = log(log_zn / log(2.)) / log(2.);
  // Rearranging the potential function.
  // Dividing log_zn by log(2) instead of log(N = 1<<8)
  // because we want the entire palette to range from the
  // center to radius 2, NOT our bailout radius.
  return float(iterations) + 1. - nu;
}
`

//
// JULIA MAIN FUNCTION
//
const main = ctx => `
void main(void) {
  ${viewport(ctx.viewport)}

  ${cValue(ctx.julia.c)}

  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  vec2 z;
  z.x = (XSIZE * (uv.x - .5)) + XT;
  z.y = (YSIZE * (uv.y - .5)) + YT;

  vec3 col = julia(z, c);
  gl_FragColor = vec4(col, 1.);
}
`

export const buildFragCode = ctx => `
${headers}
${maxIterations(ctx.julia.maxIterations)}
${uniforms}
${math}
${color}
${smoothIterations}
${julia(ctx)}
${main(ctx)}
`

export const vertCode = `
attribute vec3 coordinates;

void main(void) {
  gl_Position = vec4(coordinates, 1.0);
}
`
