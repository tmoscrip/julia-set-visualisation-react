import { math } from './math'
import { colour } from './colour'

// GLSL 'for' loops can only be indexed up to a constant value
//
// Passing in the max iteration count through a uniform encounters an error
//
// Therefore this function constructs a constant value definition

function setMaxIterations(val) {
  return `#define maxIterations ${val}`
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
const julia = `
vec3 julia(vec2 z, vec2 c) {
  float result;
  int iters = 0;

  for (int i = 0; i <= maxIterations; i++) {
    z = complexPower(z, vec2(2, 0));
    // z = complexAdd(z, complexPower(z, vec2(2, 0)));
    // z = complexAdd(z, complexPower(z, vec2(5, 0)));
    z = complexAdd(z, c);
    iters = i;
    if (complexMag(z) > u_escapeRadius) break;
  }

  if (iters == maxIterations) {
    result = float(iters);
    return vec3(0, 0, 0);
  } else {
    result = smoothIterations(z, iters);
  }

  //result = float(iters);

  float hue = huefn(result);
  float sat = satfn(result);
  float val = valfn(result);
  return hsv2rgb(vec3(hue, sat, val));
}
`
// Smooth colouring function
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
const main = `
void main(void) {
  // float XSIZE = u_width + 3.*(1. + cos(u_time));
  // float YSIZE = u_height + 3.*(1. + cos(u_time));
  float XSIZE = u_width;
  float YSIZE = u_height;
  float XT = u_translatex;
  float YT = u_translatey;

  vec2 c = vec2(
    .1 + sin(2.11*u_time) / 33. + cos(1.13*u_time) / 12. + cos(7.*u_time) / 32., 
    -.556 + cos(.77*u_time) / 33. - sin(.13*u_time) / 44. + cos(7.*u_time) / 32.
  );

  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  vec2 z;
  z.x = (XSIZE * (uv.x - .5)) + XT;
  z.y = (YSIZE * (uv.y - .5)) + YT;

  vec3 col = julia(z, c);
  gl_FragColor = vec4(col, 1.);
}
`

export const buildFragCode = maxIterations => `
${headers}
${setMaxIterations(maxIterations)}
${uniforms}
${math}
${colour}
${smoothIterations}
${julia}
${main}
`

export const vertCode = `
attribute vec3 coordinates;

void main(void) {
  gl_Position = vec4(coordinates, 1.0);
}
`
