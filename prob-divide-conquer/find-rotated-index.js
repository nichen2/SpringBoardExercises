function findRotatedIndex(inputArr, x) {
  let start = 0
  let end = inputArr.length - 1

  while (start <= end) {
    let middle = Math.floor((start + end) / 2)
    let val = inputArr[middle]
    
    if (val === x) return middle

    // if the left half from start to middle is sorted
    if (inputArr[start] <= val) {
      // if x lies in the sorted part
      if (x >= inputArr[start] && x < val) {
        end = middle - 1
      } else {
        start = middle + 1
      }
    } else {
      // if x lies in the sorted part
      if (x > val && x <= inputArr[end]) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    }
  }

  return -1
}

module.exports = findRotatedIndex
