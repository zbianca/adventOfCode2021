/** Day 6: Lanternfish
 * https://adventofcode.com/2021/day/6

Part one: How many lanternfish would there be after 80 days?
Part two: How many lanternfish would there be after 256 days?
*/

const {
  datefy
} = require('./utils');

const data = datefy(6, x => parseInt(x, 10), ',');

const example = [3,4,3,1,2];

function fishCounter(state, days) {
  const counter = new Array(9).fill(0);

  for (let i = 0; i < state.length; i++) {
    counter[state[i]]+= 1;
  }

  for (let i = 0; i < days; i++ ) {
    const done = counter[0];
    for (let j = 1; j <= 8; j++) {
      counter[j - 1] = counter[j];
    }
    counter[8] = done;
    counter[6]+= done;
  }

  return counter.reduce((a, b) => a + b);
}

console.log(fishCounter(example, 18)); // -> 26
console.log(fishCounter(example, 80)); // -> 5934
console.log(fishCounter(data, 80)); // -> 377263
console.log(fishCounter(example, 256)); // -> 26984457539
console.log(fishCounter(data, 256)); // -> 1695929023803