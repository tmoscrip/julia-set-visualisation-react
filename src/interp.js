function interp(a, b, frac, fn) {
  const res = fn(frac)
  return a * (1 - res) + b * res
}

export function linearInterp(a, b, frac) {
  const fn = frac => frac
  return interp(a, b, frac, fn)
}

export function quadraticInterp(a, b, frac) {
  const fn = frac => Math.pow(frac, 2)
  return interp(a, b, frac, fn)
}

export function cubicInterp(a, b, frac) {
  const fn = frac => Math.pow(frac, 3)
  return interp(a, b, frac, fn)
}

export function cosineInterp(a, b, frac) {
  const fn = frac => -0.5 * Math.cos(Math.PI * frac) + 0.5
  return interp(a, b, frac, fn)
}

export function logInterp(a, b, frac) {
  const fn = frac => (1 / Math.log(2)) * Math.log(frac + 1)
  return interp(a, b, frac, fn)
}

export function expInterp(a, b, frac) {
  const fn = frac => Math.pow(2, frac) - 1
  return interp(a, b, frac, fn)
}
