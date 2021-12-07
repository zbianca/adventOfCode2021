const fs = require('fs');

const identity = x => x;

const loadDay = (day) => {
  return fs.readFileSync(`./resources/day${day}.txt`, 'utf-8');
}

exports.datefy = (day, mapper = identity, separator = '\n') => {
  return loadDay(day).split(separator).map(mapper);
};

/** @function
 * Creates an array of numbers progressing from start up to, but not including, end.
 * Accepts an optional step, otherwise 1 is used.
 */
exports.range = (from, to, step = 1) => {
  const arr = [];
  for (i = from; i < to; i+= step) {
    arr.push(i);
  }
  return arr;
};

/** @method
 * Computes the maximum value of array. If array is empty, undefined is returned.
 * Accepts an optional defaultMax.
 */
 function max(defaultMax) {
  return this.reduce((x, b) => Math.max(x, b)) ?? defaultMax;
}

/** @method
 * Computes the minimum value of array. If array is empty, undefined is returned.
 * Accepts an optional defaultMin.
 */
 function min(defaultMin) {
  return this.reduce((x, y) => Math.min(x, y)) ?? defaultMin;
}

/** @method
 * Computes the sum of the values in array.
 */
 function sum(defaultVal = 0) {
  return this.reduce((x, y) => x + y, defaultVal);
}

/** @method
 * Computes the sum of the values in array while processing each of them with an iteratee.
 */
function sumBy(fn, defaultVal = 0) {
  return this.map(fn).reduce((x, y) => x + y, defaultVal);
}

Array.prototype.max = max;
Array.prototype.min = min;
Array.prototype.sum = sum;
Array.prototype.sumBy = sumBy;