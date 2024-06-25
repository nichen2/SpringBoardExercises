// add whatever parameters you deem necessary
function countPairs(arr, sum) {
    let set = new Set();
    let count = 0;
    for (let i of arr) {
        set.add(i)
    }
    for (let i of arr) {
        const diff = sum - i;
        if (i == diff) continue;
        if (set.has(diff)) {
            count++;
        }
    }
    return count / 2;
}
module.exports = countPairs;