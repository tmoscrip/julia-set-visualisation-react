import { math } from './math'
import { color } from './color'

// GLSL 'for' loops can only be indexed up to a constant value
// Passing in the max iteration count through a uniform encounters an error
// Therefore this function constructs a constant value definition
function maxIterations(val) {
  return `#define maxIterations ${val}`
}

function cValue({ x, y }) {
  return `vec2 c = vec2(${x}, ${y});`
}

function viewport({ width, height, translate }) {
  return `
  float XSIZE = ${width};
  float YSIZE = ${height};
  float XT = ${translate.x};
  float YT = ${translate.y};
  `
}

function colorMap(c1, c2) {
  const rgb = c => `vec3(${c[0]}, ${c[1]}, ${c[2]})`
  return `
  float mapCurve(float percent) {
    float x = abs(cos(20.*3.14*percent));
    return x;
  }

  vec3 colorMap(float percent) {
    vec3 c1 = ${rgb(c1)};
    vec3 c2 = ${rgb(c2)};
    float curve = mapCurve(percent);
    return c1 * (1. - curve) + c2 * curve;
  }
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
const julia = ctx => `
vec3 julia(vec2 z, vec2 c) {
  float result;
  int iters = 0;

  for (int i = 0; i <= maxIterations; i++) {
    z = complexPower(z, vec2(2, 0));
    z = complexAdd(z, c);
    iters = i;
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

  //return colorMap(percent);

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
${colorMap(ctx.colorMap[0].color, ctx.colorMap[1].color)}
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
