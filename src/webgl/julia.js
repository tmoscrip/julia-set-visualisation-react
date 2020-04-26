import { msaaOptions } from '../components/gui/julia/MSAA'
import { fixWebGlInts } from './../helpers'
import { color } from './color'
import { math } from './math'

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
  vec2 size = vec2(${fixWebGlInts(width)}, ${fixWebGlInts(height)});
  vec2 translate = vec2(${fixWebGlInts(translate.x)}, ${
    fixWebGlInts(translate.y)});
  `
}

const antialiasing =
  (msaaStateValue) => {
    const { aaFrac } = msaaOptions.find((item) => item.name === msaaStateValue)

    if (aaFrac !== 1) {
      return `#define AA ${aaFrac}`
    }
    else {
      return ''
    }
  }

const uniforms = `
uniform float u_escapeRadius;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_width;
uniform float u_height;
uniform float u_translatex;
uniform float u_translatey;

uniform sampler2D u_colormap;
`

const headers = `
precision highp float;
`

//
// JULIA ITERATION FUNCTIONS
//
const polyIterate =
  (coefficients) => {
    function cmplxExp(exp, coeff) {
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
        return `z = complexAdd(z, complexPower(${coeff}*zPrev, vec2(${
          exp}, 0.)));`
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
    return polySource
  }

const julia = (ctx) => `
vec4 julia(vec2 pixel) {
  ${viewport(ctx.viewport)}
  ${cValue(ctx.julia.c)}

  // Map pixel value [0, canvasWidth], [0, canvasHeight] into ranges [0, 1]
  vec2 uv = pixel / u_resolution;

  vec2 zPrev = (size * (uv - 0.5)) + translate;
  vec2 z = vec2(0.);

  float result;
  int iters = 0;
  for (int i = 0; i <= maxIterations; i++) {
    ${polyIterate(fixWebGlInts(ctx.julia.coefficients))}
    iters = i;
    zPrev = z;
    if (complexMag(z) > u_escapeRadius) break;
  }

  if (iters == maxIterations) {
    return vec4(0,0,0,1);
  } else {
    ${
  ctx.julia.useSmoothing ? 'result = smoothIterations(z, iters);' :
    'result = float(iters);'}
  }

  float percent = result/float(maxIterations);
  return texture2D(u_colormap, vec2(percent));;
}
`

// Smooth coloring function
// http://linas.org/art-gallery/escape/escape.html
// https://en.wikipedia.org/wiki/Mandelbrot_set#Continuous_(smooth)_coloring
// http://www.iquilezles.org/www/articles/mset_smooth/mset_smooth.htm
function smoothIterations(julia) {
  const { coefficients } = julia
  const degree = (coefficients.match(/,/g) || []).length.toString()

  return `
  float smoothIterations(vec2 z, int iterations) {
    float mag = complexMag(z);
    float logmag = log(mag);
    float logbound = log(u_escapeRadius);
    float top = log(logmag/logbound);
    float f = top/log(${fixWebGlInts(degree)});

    return float(iterations) - f;
  }
  `
}

//
// JULIA MAIN FUNCTION
//
const main = (ctx) => `
void main(void) {
  vec4 color;

  #ifdef AA
    float n; // Number of loops
    for (float x = 0.; x < 1.; x += AA) {
        for (float y = 0.; y < 1.; y += AA) {
            color += julia(gl_FragCoord.xy + vec2(x, y));
            n += 1.0;
        }
    }
    // Normalise colour
    color /= n; 
  #else
    color = julia(gl_FragCoord.xy);
  #endif

  gl_FragColor = color;
}
`

export const buildFragCode = (ctx) => `
${headers}
${antialiasing(ctx.julia.msaa)}
${maxIterations(ctx.julia.maxIterations)}
${uniforms}
${math}
${color}
${smoothIterations(ctx.julia)}
${julia(ctx)}
${main(ctx)}
`

export const vertCode = `
attribute vec3 coordinates;

void main(void) {
  gl_Position = vec4(coordinates, 1.0);
}
`
