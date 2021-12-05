/** Day 5: Hydrothermal Venture
 * https://adventofcode.com/2021/day/5

Part one: At how many points do at least two lines overlap? For horizontal and vertical lines only.
Part two: At how many points do at least two lines overlap? Include lines in 45 degrees.
*/

const {
  datefy
} = require('./utils');

function gameFormatter(group) {
  return group.split(' -> ').map(x => x.split(',').map(x => parseInt(x, 10)));
}

const data = datefy(5, gameFormatter, '\n');

const example = [
  [[0,9],[5,9]],
  [[8,0],[0,8]],
  [[9,4],[3,4]],
  [[2,2],[2,1]],
  [[7,0],[7,4]],
  [[6,4],[2,0]],
  [[0,9],[2,9]],
  [[3,4],[1,4]],
  [[0,0],[8,8]],
  [[5,5],[8,2]],
];

function filterCoords(coords) {
  return coords.filter(coord => {
    const [[x1, y1], [x2, y2]] = coord;
    return x1 === x2 || y1 === y2;
  });
}

function sortCoords(coords) {
  return coords.map(coord => {
    return coord.sort((a, b) => {
      return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1];
    });
  });
}

function getOverlaps(values) {
  let total = 0;

  for (const v of values.values()) {
    if (v > 1) total+= 1;
  }

  return total;
}

function mapCoords(coords) {
  coords = sortCoords(coords);
  const result = new Map();

  for (const coord of coords) {
    const [[x1, y1], [x2, y2]] = coord;

    if (x1 === x2) {
      for (let i = y1; i <= y2; i++) {
        result.set(`${x1}-${i}`, (result.get(`${x1}-${i}`) ?? 0) + 1);
      }
    }

    else if (y1 === y2) {
      for (let i = x1; i <= x2; i++) {
        result.set(`${i}-${y1}`, (result.get(`${i}-${y1}`) ?? 0) + 1);
      }
    }

    else {
      const diff = y2 - y1 > 0 ? 1 : -1;
      let curY = y1;
      for (let i = x1; i <= x2; i++) {
        result.set(`${i}-${curY}`, (result.get(`${i}-${curY}`) ?? 0) + 1);
        curY += diff;
      }
    }
  }

  return getOverlaps(result);
}

console.log(mapCoords(filterCoords(example))); // -> 5
console.log((mapCoords(filterCoords(data)))); // -> 5167
console.log(mapCoords(example)); // -> 12
console.log((mapCoords(data))); // -> 17604