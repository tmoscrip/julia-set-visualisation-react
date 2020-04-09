//
// MATHEMATICAL CONSTANTS
//
const mathConstants = `
#define PI 3.14159265359
#define TAU 6.28318530718
`

//
// COMPLEX NUMBER OPERATIONS
// Source:
// https://gist.github.com/NiklasRosenstein/ee1f1b5786f94e17995361c63dafeb3f
//
const complexConjug = `
vec2 complexConjug(in vec2 c) { 
  return vec2(c.x, -c.y); 
}
`

const complexMult = `
vec2 complexMult(in vec2 a, in vec2 b) {
  return vec2(a.x * b.x - a.y * b.y, a.y * b.x + a.x * b.y);
}
`

const complexDiv = `
vec2 complexDiv(in vec2 a, in vec2 b) {
  return complexMult(a, complexConjug(b));
}
`

const complexMag = `
float complexMag(in vec2 c) { 
  return sqrt(c.x * c.x + c.y * c.y); 
}
`

const complexAdd = `
vec2 complexAdd(vec2 z1, vec2 z2) { 
  return vec2(z1.x + z2.x, z1.y + z2.y); 
}
`

// Raises a complex number to the power of a second complex number
// Use vec2(x, 0) as second parameter to raise by only a real
// See http://mathworld.wolfram.com/ComplexExponentiation.html
const complexPower = `
vec2 complexPower(vec2 z1, vec2 z2) {
  float a2b2 = z1.x * z1.x + z1.y * z1.y;
  float t1 = pow(a2b2, z2.x / 2.) * exp(-z2.y * atan(z1.y, z1.x));
  float t2 = z2.x * atan(z1.y, z1.x) + .5 * z2.y * log(a2b2);
  return vec2(t1 * cos(t2), t1 * sin(t2));
}
`

export const math = `
${mathConstants}
${complexConjug}
${complexMult}
${complexDiv}
${complexMag}
${complexPower}
${complexAdd}
`