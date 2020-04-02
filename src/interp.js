function doInterp(a, b, frac, fn) {
  const res = fn(frac)
  return a * (1 - res) + b * res
}

const linear = {
  name: 'Linear',
  value: 'linear',
  fn: (a, b, frac) => {
    const fn = frac => frac
    return doInterp(a, b, frac, fn)
  },
}

const quadratic = {
  name: 'Quadratic',
  value: 'quadratic',
  fn: (a, b, frac) => {
    const fn = frac => Math.pow(frac, 2)
    return doInterp(a, b, frac, fn)
  },
}

const squareroot = {
  name: 'Square root',
  value: 'squareroot',
  fn: (a, b, frac) => {
    const fn = frac => Math.pow(frac, 1 / 2)
    return doInterp(a, b, frac, fn)
  },
}

const cubic = {
  name: 'Cubic',
  value: 'cubic',
  fn: (a, b, frac) => {
    const fn = frac => Math.pow(frac, 3)
    return doInterp(a, b, frac, fn)
  },
}

const cuberoot = {
  name: 'Cube root',
  value: 'cuberoot',
  fn: (a, b, frac) => {
    const fn = frac => Math.pow(frac, 1 / 3)
    return doInterp(a, b, frac, fn)
  },
}

const cosine = {
  name: 'Cosine',
  value: 'cosine',
  fn: (a, b, frac) => {
    const fn = frac => -0.5 * Math.cos(Math.PI * frac) + 0.5
    return doInterp(a, b, frac, fn)
  },
}

const logarithmic = {
  name: 'Logarithmic',
  value: 'logarithmic',
  fn: (a, b, frac) => {
    const fn = frac => (1 / Math.log(2)) * Math.log(frac + 1)
    return doInterp(a, b, frac, fn)
  },
}

const exponential = {
  name: 'Exponential',
  value: 'exponential',
  fn: (a, b, frac) => {
    const fn = frac => Math.pow(2, frac) - 1
    return doInterp(a, b, frac, fn)
  },
}

export const Interps = { linear, quadratic, cubic, squareroot, cuberoot, cosine, logarithmic, exponential }
