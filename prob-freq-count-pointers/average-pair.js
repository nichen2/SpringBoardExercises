// add whatever parameters you deem necessary
function averagePair(arr, avg) {
    let front = 0;
    let last = arr.length - 1;
    
    while (front < last) {
        let sum = (arr[front] + arr[last])/2
        if (sum < avg) {
            front++;
            continue;
        } else if (sum > avg) {
            last--;
            continue;
        } else {
            return true;
        }
    }
    return false;
}

module.exports = averagePair;