/** Day 1: Sonar Sweep
 * https://adventofcode.com/2021/day/1

Part one: How many measurements are larger than the previous measurement?
Part two: How many (window) sums are larger than the previous sum?
*/

const {
  datefy
} = require('./utils');

const data = datefy(1, x => parseInt(x, 10));

const example = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

function countIncreases(arr) {
  let count = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) count += 1;
  }

  return count;
}

console.log(countIncreases(example)); // -> 7
console.log(countIncreases(data));

function countWindowIncreases(arr) {
  let count = 0;
  let curSum = arr[0] + arr[1] + arr[2];

  for (let i = 3; i < arr.length; i++) {
    const nextSum = curSum - arr[i - 3] + arr[i];
    if (curSum < nextSum) count += 1;
    curSum = nextSum;
  }

  return count;
}

console.log(countWindowIncreases(example)); // -> 5
console.log(countWindowIncreases(data));