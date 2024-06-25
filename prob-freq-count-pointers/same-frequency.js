// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
    let n1Count = new Map();
    let n2Count = new Map();
    while (num1 > 0){
        let currNum = num1 % 10;
        if (n1Count.get(currNum)) {
            n1Count.set(currNum, n1Count.get(currNum) + 1);
        } else {
            n1Count.set(currNum, 1);
        }
        num1 = Math.floor(num1 / 10);
    }

    while (num2 > 0){
        let currNum = num2 % 10;
        if (n2Count.get(currNum)) {
            n2Count.set(currNum, n2Count.get(currNum) + 1);
        } else {
            n2Count.set(currNum, 1);
        }
        num2 = Math.floor(num2 / 10);
    }
    for (const[num, freq] of n1Count) {
        if (!n2Count.get(num) || n1Count.get(num) != n2Count.get(num)) {
            return false;
        }
    }
    for (const[num, freq] of n2Count) {
        if (!n1Count.get(num) || n1Count.get(num) != n2Count.get(num)) {
            return false;
        }
    }
    return true;
}

module.exports = sameFrequency;