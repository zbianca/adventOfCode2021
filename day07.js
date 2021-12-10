/** Day 7: The Treachery of Whales
 * https://adventofcode.com/2021/day/7

Part one: How much fuel must they spend to align to that position? (1 step costs 1 fuel)
Part two: How much fuel must they spend to align to that position? (1 step costs 1 more unit of fuel than the last)
*/

const {
  datefy
} = require('./utils');

const data = datefy(7, x => parseInt(x, 10), ',');

const example = [16,1,2,0,4,2,7,1,2,14];

const costCalculator = d => (d * (d + 1)) / 2;

function calculateMinFuel(crabs, fn) {
  let maxPos = Number.MIN_VALUE;
  let minPos = Number.MAX_VALUE;
  let minFuel = Number.MAX_VALUE;

  for (let pos of crabs) {
    maxPos = Math.max(pos, maxPos);
    minPos = Math.min(pos, minPos);
  }

  for (let i = minPos; i <= maxPos; i++) {
    let fuel = 0;

    for (let j = 0; j < crabs.length; j++) {
      fuel+= fn(Math.abs(i - crabs[j]));
    }

    minFuel = Math.min(fuel, minFuel);
  }

  return minFuel;
}

console.log(calculateMinFuel(example, x => x)); // -> 37
console.log(calculateMinFuel(data, x => x)); // -> 328187
console.log(calculateMinFuel(example, costCalculator)); // -> 168
console.log(calculateMinFuel(data, costCalculator)); // -> 91257582