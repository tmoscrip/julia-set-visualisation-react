export function mapNDArray(arr, fn) {
  for (let i in arr) {
    let e = arr[i]
    if (e != null && Array.isArray(e)) {
      arr[i] = mapNDArray(arr[i], fn)
    } else {
      arr[i] = fn(arr[i])
    }
  }
  return arr
}

export function findClosestPair(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i]
    let next = arr[i + 1]
    if (cur <= num && next > num) {
      return [i, i + 1]
    }
  }
}
