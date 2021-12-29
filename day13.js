/** Day 13: Transparent Origami
 * https://adventofcode.com/2021/day/13

Part one: How many dots are visible after completing just the first fold instruction on your transparent paper?
Part two: What code do you use to activate the infrared thermal imaging camera system?
*/

const { datefy, range } = require("./utils");

const data = datefy(13, x => x, '\n\n');

function parseData(data) {
  let [dots, folds] = data;
  dots = dots.split('\n').map(d => d.split(',').map(x => parseInt(x)));
  folds = folds.split('\n').map(x => [x[11], parseInt(x.slice(13), 10)]);

  return [dots, folds];
}

function generatePaper(dots) {
  const result = new Set ();

  for (let [x, y] of dots) {
    result.add(`${x}-${y}`);
  }

  return result;
}

function generateLetter(paper) {
  let maxX = 0;
  let maxY = 0;

  for (let coord of paper) {
    const [x, y] = coord.split('-').map(c => parseInt(c, 10));
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  const result = range(0, maxY + 2).map(_ => new Array(maxX + 1).fill('.'));

  for (let coord of paper) {
    const [x, y] = coord.split('-').map(c => parseInt(c, 10));
    result[y][x] = '#';
  }

  return result;
}

function plot(arr) {
  for (let y = 0; y < arr.length; y++) {
    console.log(arr[y].join(''));
  }
}

function fold([dots, folds]) {
  const paper = generatePaper(dots);
  let result = new Set();

  const [direction, line] = folds[0];

  for (let coord of paper) {
    const [x, y] = coord.split('-').map(c => parseInt(c, 10));

    if (direction === 'y') {
      if (y === line) continue;
      if (y < line) result.add(`${x}-${y}`);
      else result.add(`${x}-${2 * line - y}`);
    } else {
      if (x === line) continue;
      if (x < line) result.add(`${x}-${y}`);
      else result.add(`${2 * line - x}-${y}`);
    }
  }

  return result.size;
}

const example = [
[[6,10],[0,14],[9,10],[0,3],[10,4],
[4,11],[6,0],[6,12],[4,1],[0,13],
[10,12],[3,4],[3,0],[8,4],[1,10],
[2,14],[8,10],[9,0]],
[['y',7],['x',5]]
]

console.log(fold(example)); // -> 17
console.log(fold(parseData(data))); // -> 814

function fold2(paper, fold) {
  let result = new Set();

  const [direction, line] = fold;

  for (let coord of paper) {
    const [x, y] = coord.split('-').map(c => parseInt(c, 10));

    if (direction === 'y') {
      if (y === line) continue;
      if (y < line) result.add(`${x}-${y}`);
      else result.add(`${x}-${2 * line - y}`);
    } else {
      if (x === line) continue;
      if (x < line) result.add(`${x}-${y}`);
      else result.add(`${2 * line - x}-${y}`);
    }
  }

  return result;
}

function run([dots, folds]) {
  let paper = generatePaper(dots);

  for (let fold of folds) {
    paper = fold2(paper, fold);
  }

  return generateLetter(paper);
}

plot(run(example)); // -> 'O'
plot(run(parseData(data))); // -> 'PZEHRAER'