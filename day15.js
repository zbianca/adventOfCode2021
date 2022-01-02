/** Day 15: Chiton
 * https://adventofcode.com/2021/day/15

Part one: What is the lowest total risk of any path from the top left to the bottom right?
Part two: Using the full map (five times larger), what is the lowest total risk of any path from the top left to the bottom right?
*/

const { datefy } = require("./utils");

const data = datefy(15, x => x.split('').map(x => parseInt(x, 10)),  '\n');

const example = [
  [1,1,6,3,7,5,1,7,4,2],
  [1,3,8,1,3,7,3,6,7,2],
  [2,1,3,6,5,1,1,3,2,8],
  [3,6,9,4,9,3,1,5,6,9],
  [7,4,6,3,4,1,7,1,1,1],
  [1,3,1,9,1,2,8,1,3,7],
  [1,3,5,9,9,1,2,4,2,1],
  [3,1,2,5,4,2,1,6,3,9],
  [1,2,9,3,1,3,8,5,2,1],
  [2,3,1,1,9,4,4,5,8,1],
];

class PriorityQueue {
  // very lazy PriorityQueue
  constructor(){
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({val, priority});
    this.sort();
  };
  dequeue() {
    return this.values.shift();
  };
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  };
  prioritize(idx, priority) {
    this.values[idx].priority = priority;
    this.values.sort((a, b) => a.priority - b.priority);
  };
}

function getNeighbors(coord, length) {
  return [[coord[0], coord[1] + 1], [coord[0], coord[1] - 1], [coord[0] + 1, coord[1]], [coord[0] - 1, coord[1]]].filter(([x, y]) => x >= 0 && y >= 0 && x < length && y < length);
}

function dijkstra(map) {
  const length = map.length;
  const goal = length - 1;
  const dist = Array.from({length}, () => new Array(length).fill(Infinity));
  dist[0][0] = 0;
  const queue = new PriorityQueue();

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      queue.enqueue(`${i}-${j}`, dist[i][j]);
    }
  }

  while (queue.values.length) {
    const cur = queue.dequeue();
    const coord = cur.val.split('-').map(x => parseInt(x, 10));
    const [y, x] = coord;
    const curDist = dist[y][x];

    getNeighbors(coord, length).forEach(n => {
      const idx = queue.values.findIndex(x => x.val ===`${n[0]}-${n[1]}`)
      if (idx >= 0) {
        const newDist = curDist + map[n[0]][n[1]];
        if (newDist < dist[n[0]][n[1]]) {
          dist[n[0]][n[1]] = newDist;
          queue.prioritize(idx, newDist);
        }
      }
    })
  }

  return dist[goal][goal];
}

function generateWiderData(map) {
  const result = [];
  const copies = map.length * 4;

  for (let i = 0; i < map.length; i++) {
    result.push([...map[i]]);
    for (let j = 0; j < copies; j++) {
      let newNum = result[i][j] + 1;
      if (newNum === 10) newNum = 1;
      result[i].push(newNum);
    }
  }

  for (let j = 0; j < copies; j++) {
    const newLine = [];
    for (char of result[j]) {
      char += 1;
      if (char === 10) char = 1;
      newLine.push(char);
    }
    result.push(newLine);
  }

  return result;
}

console.log(dijkstra(example)); // -> 40
console.log(dijkstra(data)); // -> 592
console.log(dijkstra(generateWiderData(example))); // -> 315
// console.log(dijkstra(generateWiderData(data))); // -> 2897 (takes 30 min, improve time complexity with A*)