function findFloor(inputArr, x) {
  if (inputArr[0] > x) return -1
  let start = 0
  let end = inputArr.length
  while (start < end) {
    let middle = Math.floor((start + end) / 2)
    if (inputArr[middle] < x) {
        if(inputArr[middle + 1] > x) return inputArr[middle] 
        else start = middle + 1
    }
    else if (inputArr[middle] > x) end = middle - 1
    else return inputArr[middle]
  }
  return inputArr[inputArr.length - 1]
}

module.exports = findFloor