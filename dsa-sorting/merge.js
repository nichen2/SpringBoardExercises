function merge(arr1, arr2) {
    const res = [];
    const l1 = arr1.length;
    const l2 = arr2.length;
    let i = 0;
    let j = 0;
    while (i < l1 && j < l2) {
        if (arr1[i] <= arr2[j]) {
            res.push(arr1[i]);
            i++;
        } else {
            res.push(arr2[j]);
            j++;
        }
    }
    if (i == l1) {
        for (let k = j; k < l2; k++) {
            res.push(arr2[k]);
        }
    } else if (j == l2){
        for (let k = i; k < l1; k++) {
            res.push(arr1[k]);
        }
    }
    return res;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr; // Base case: an array of zero or one element is already sorted
    }

    const mid = Math.floor(arr.length / 2); // Find the middle index
    const left = mergeSort(arr.slice(0, mid)); // Recursively sort the left half
    const right = mergeSort(arr.slice(mid)); // Recursively sort the right half

    return merge(left, right); // Merge the sorted halves
}

module.exports = { merge, mergeSort};