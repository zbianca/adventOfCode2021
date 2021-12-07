/** Day 6: Lanternfish
 * https://adventofcode.com/2021/day/6

Part one: How many lanternfish would there be after 80 days?
Part two: How many lanternfish would there be after 256 days?
*/

const {
  datefy, range
} = require('./utils');

const data = datefy(6, x => parseInt(x, 10), ',');

const example = [3,4,3,1,2];

function fishCounter1(state, days) {
  const counter = new Array(9).fill(0);
  for (fish of state) counter[fish]+= 1;

  range(0, days).map(_ => {
    const done = counter[0];
    range(1, 9).map(x => counter[x - 1] = counter[x]);
    counter[8] = done;
    counter[6]+= done;
  });

  return counter.sum();
}

function fishCounter(state, days) {
  const counter = range(0, 9).map(v => state.count(x => x === v));

  const run = (day, arr) => {
    if (day === 0) return arr;

    const result = [arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7] + arr[0], arr[8], arr[0]];

    return run(day - 1, result);
  };

  return run(days, counter).sum();
}

console.log(fishCounter(example, 18)); // -> 26
console.log(fishCounter(example, 80)); // -> 5934
console.log(fishCounter(data, 80)); // -> 377263
console.log(fishCounter(example, 256)); // -> 26984457539
console.log(fishCounter(data, 256)); // -> 1695929023803