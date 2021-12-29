/** Day 11: Dumbo Octopus
 * https://adventofcode.com/2021/day/11

Part one: How many total flashes are there after 100 steps?
Part two: What is the first step during which all octopuses flash?
*/

const { datefy } = require("./utils");

const data = () => datefy(11, x => x.split("").map(x => parseInt(x)));

const example = () => [
  [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
  [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
  [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
  [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
  [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
  [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
  [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
  [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
  [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
  [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
];

function neighborsCoords(i, j) {
  return [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];
}

function countFlashes(arr) {
  let count = 0;

  for (let step = 0; step < 100; step++) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        arr[i][j] += 1;
      }
    }

    const queue = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (arr[i][j] === 10) {
          queue.push([i, j]);
        }
      }
    }

    while (queue.length) {
      const [i, j] = queue.shift();
      const neighbors = neighborsCoords(i, j).filter(([r, c]) => r >= 0 && c >= 0 && r <= 9 && c <= 9);

      for ([r, c] of neighbors) {
        if (arr[r][c] === 10) continue;
        arr[r][c] += 1;
        if (arr[r][c] === 10) queue.push([r, c]);
      }
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (arr[i][j] === 10) {
          arr[i][j] = 0;
          count+= 1;
        }
      }
    }
  }

  return count;
}

console.log(countFlashes(example())); // -> 1656
console.log(countFlashes(data())); // -> 1659

function findStep(arr) {
  let step = 0;
  while (true) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        arr[i][j] += 1;
      }
    }

    const queue = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (arr[i][j] === 10) {
          queue.push([i, j]);
        }
      }
    }

    while (queue.length) {
      const [i, j] = queue.shift();
      const neighbors = neighborsCoords(i, j).filter(([r, c]) => r >= 0 && c >= 0 && r <= 9 && c <= 9);

      for ([r, c] of neighbors) {
        if (arr[r][c] === 10) continue;
        arr[r][c] += 1;
        if (arr[r][c] === 10) queue.push([r, c]);
      }
    }

    let count = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (arr[i][j] === 10) {
          arr[i][j] = 0;
          count+= 1;
        }
      }
    }
    if (count === 100) return step + 1;
    step+= 1;
  }
}

console.log(findStep(example())); // -> 195
console.log(findStep(data())); // -> 227