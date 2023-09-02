/*
function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

  Write an ES2015 Version */

const filterOutOdds = (...nums) => {
  return nums.filter((num) => num % 2 === 0);
};

const findMin = (...nums) => {
  return nums.reduce((min,current) => {
    return min < current ? min : current;
  },Number.MAX_SAFE_INTEGER);
};

const mergeObjects = (obj1, obj2) => {
  const obj3 = {
    ...obj1,
    ...obj2,
  };
  return obj3;
};

const doubleAndReturnArgs = (arr, ...nums) => {
  let doubled = nums.map((num) => num * 2);
  let result = [...arr,...doubled];
  return result; 
};

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = (...items) => {
  let randomElement = Math.floor(items.length * Math.random());
  const result = items.filter((item, index, arr) => index !== randomElement);
  return result;
};

/** Return a new array with every item in array1 and array2. */

const extend = (x,y) => {
  const result = [...x,...y];
  return result;
};

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj,key,val) => {
  const result = {...obj, [key]: val};
  return result;
};


/** Return a new object with a key removed. */

const removeKey = (obj,key) => {
  const {[key]: removed, ...result} = obj;
  return result;
};


/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => {
  return {...obj1,...obj2};
};


/** Return a new object with a modified key and value. */

const update = (obj,key,val) => {
  return {...obj,[key]:val};
};

