// Map function which recurses into elements of initial array which are also arrays
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

// Find the indexes of the two closest numbers to the provided parameter in a sorted array
export function findClosestPair(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i]
    let next = arr[i + 1]
    if (cur <= num && next > num) {
      return [i, i + 1]
    }
  }
}

// Trims spaces from string and converts to lowercase
export function lowerTrim(str) {
  return str.replace(/ /g, '').toLowerCase()
}

// Is the item a useState array?
// Perform checks on requirements for hasSetState beforehand
export const isUseStateArray = item => {
  // Check to see if array has useState set function within
  const hasSetState = item => typeof item[1] === 'function' && item[1].name.startsWith('bound ')
  return Array.isArray(item) && item.length === 2 && hasSetState(item)
}

/*
  Ints are not implictly cast to floats in WebGL, any value which is passed to
  WebGL code for use as a float must contain a decimal point

  This function appends a period to any int to avoid type errors once it's passed
  into WebGL code
*/
export function fixWebGlInts(str) {
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
