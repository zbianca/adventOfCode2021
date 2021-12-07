/** Day 7: The Treachery of Whales
 * https://adventofcode.com/2021/day/6

Part one: How much fuel must they spend to align to that position? (1 step costs 1 fuel)
Part two: How much fuel must they spend to align to that position? (1 step costs 1 more unit of fuel than the last)
*/

const {
  datefy, range
} = require('./utils');

const data = datefy(7, x => parseInt(x, 10), ',');

const example = [16,1,2,0,4,2,7,1,2,14];

const costCalculator = d => (d * (d + 1)) / 2;

function calculateMinFuel1(crabs, fn) {
  let maxPos = crabs.reduce((a, b) => Math.max(a, b));
  let minPos = crabs.reduce((a, b) => Math.min(a, b));

  return new Array(maxPos - minPos + 1).fill(0).map((v, i) => {
    crabs.forEach(c => v+= fn(Math.abs(i - c)));
    return v;
  }).reduce((a, b) => Math.min(a, b));
}

function calculateMinFuel2(crabs, fn) {
  let maxPos = crabs.reduce((a, b) => Math.max(a, b));
  let minPos = crabs.reduce((a, b) => Math.min(a, b));

  return range(minPos, maxPos).map(p =>
    crabs
      .map(c => fn(Math.abs(p - c)))
      .reduce((a, b) => a + b))
      .reduce((a, b) => Math.min(a, b));
}

function calculateMinFuel(crabs, fn) {
  return range(crabs.min(), crabs.max())
    .map(p => crabs.sumBy(c => fn(Math.abs(p - c))))
    .min();
}

console.log(calculateMinFuel(example, x => x)); // -> 37
console.log(calculateMinFuel(data, x => x)); // -> 328187
console.log(calculateMinFuel(example, costCalculator)); // -> 168
console.log(calculateMinFuel(data, costCalculator)); // -> 91257582