/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length === 0) return 1;

  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 0) return 0;

  return Math.max(words[0].length,longest(words.slice(1)));
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length <= 1) return str;

  return str[0] + everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length <= 1) return true;
  const first = str[0];
  const last = str[str.length - 1]
  if (first !== last) {
    return false;
  } else {
    return isPalindrome(str.substring(1, str.length - 1));
  }
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  if (arr.length === 0) return -1;

  if (arr[0] === val) {
    return 0;
  } else {
    const result = findIndex(arr.slice(1), val)
    if (result === -1) return -1;
    else return result + 1;
  }
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if (str.length === 0) return str;
  const firstChar = str[0]
  return revString(str.slice(1)) + firstChar;
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let arr = [];
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      arr.push(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      arr = arr.concat(gatherStrings(obj[key]));
    }
  }
  return arr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {
  function searchHelper(start, end) {
    if (start > end) return -1; 
    const mid = Math.floor((start + end) / 2);
    if (arr[mid] === val) {
      return mid;
    } else if (arr[mid] < val) {
      return searchHelper(mid + 1, end);
    } else {
      return searchHelper(start, mid - 1);
    }
  }
  return searchHelper(0, arr.length - 1);
}


module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
