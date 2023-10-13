function countZeroes(zeroArray) {
  if (zeroArray[0] === 0) return zeroArray.length
  if (zeroArray[zeroArray.length - 1] === 1) return 0
  let start = 0
  let end = zeroArray.length - 1
  while (start < end) {
    let middle = Math.floor((start + end)/2)
    if (zeroArray[middle] === 0) {
        if(zeroArray[middle - 1] === 1) return zeroArray.length - middle
        else {
            end = middle - 1
        }
    }
    else {
        start = middle + 1
    }
  }
  return zeroArray.length - start
}


module.exports = countZeroes