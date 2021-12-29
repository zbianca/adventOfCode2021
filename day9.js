/** Day 9: Smoke Basin
 * https://adventofcode.com/2021/day/9

Part one: What is the sum of the risk levels of all low points on your heightmap?
Part two: What do you get if you multiply together the sizes of the three largest basins?
*/

const { datefy } = require("./utils");

const data = datefy(9, x => x.split("").map(x => parseInt(x)));

const example = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
];

function getLowCoords(arr) {
  const low = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      const cur = arr[i][j];
      const up = arr[i - 1] ? arr[i - 1][j] : 10;
      const down = arr[i + 1] ? arr[i + 1][j] : 10;
      const left = arr[i][j - 1] ?? 10;
      const right = arr[i][j + 1] ?? 10;

      if ([up, down, left, right].every(n => n > cur)) low.push([i, j]);
    }
  }

  return low;
}

function lowSum(arr) {
  const lows = getLowCoords(arr);

  return lows.length + lows.sumBy(([i, j]) => arr[i][j]);
}

console.log(lowSum(example)); // -> 15
console.log(lowSum(data)); // -> 468

function calcBasinSize(low, arr) {
  const processed = new Set();
  const queue = [low];
  let total = 0;

  isBound = ([i, j]) => i >= 0 && j >= 0 && i < arr.length && j < arr[0].length;
  flowsDown = (n, cur) => n < 9 && n > cur;

  while (queue.length) {
    const [i, j] = queue.shift();
    if (processed.has(`${i}-${j}`)) continue;

    const cur = arr[i][j];
    const neighbors = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]];

    for (let [a, b] of neighbors) {
      if (isBound([a, b]) && flowsDown(arr[a][b], cur)) queue.push([a, b]);
    }

    total+= 1;
    processed.add(`${i}-${j}`);
  }

  return total;
}

function top3Basins(arr) {
  const basinSizes = getLowCoords(arr)
    .map(low => calcBasinSize(low, arr))
    .sort((a, b) => b - a);

  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}

console.log(top3Basins(example)); // -> 1134
console.log(top3Basins(data)); // -> 1280496
