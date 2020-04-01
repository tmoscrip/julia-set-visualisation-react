export function mapNDArray(a, fn) {
  for (let i in a) {
    let e = a[i]
    if (e != null && Array.isArray(e)) {
      a[i] = mapNDArray(a[i], fn)
    } else {
      a[i] = fn(a[i])
    }
  }
  return a
}
