// add whatever parameters you deem necessary
function twoArrayObject(arr1, arr2) {
    let res = {};
    for (let i = 0; i < arr1.length; i++) {
        if (arr2[i] == null) {
            res[arr1[i]] = null;
        } else {
            res[arr1[i]] = arr2[i];
        }
    }
    return res;
}

module.exports = twoArrayObject;