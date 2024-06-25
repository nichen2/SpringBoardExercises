// add whatever parameters you deem necessary
function isSubsequence(sub, str) {
    let j = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == sub[j]) {
            j++;
        }
        if (j == sub.length) {
            return true;
        }
    }

    if (j == sub.length) {
        return true;
    } else {
        return false;
    }
}
module.exports = isSubsequence;