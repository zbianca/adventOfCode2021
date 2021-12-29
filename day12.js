/** Day 12: Passage Pathing
 * https://adventofcode.com/2021/day/12

Part one: How many paths through this cave system are there that visit small caves at most once?
Part two: Given these new rules, how many paths through this cave system are there?
*/

const { datefy } = require("./utils");

const data = datefy(12, x => x.split("-"));

function getAdjacencyList(edges) {
  const list = {};

  for (let [v1, v2] of edges) {
    if(!list[v1] && v1 !== 'end') list[v1] = [];
    if(!list[v2] && v2 !== 'end') list[v2] = [];

    if (v2 !== 'start' && v1 !== 'end') list[v1].push(v2);
    if (v1 !== 'start' && v2 !== 'end') list[v2].push(v1);
  }

  return list;
}

const isLowerCase = str => str === str.toLowerCase();

const small = [
  ['start', 'A'],
  ['start', 'b'],
  ['A', 'c'],
  ['A', 'b'],
  ['b', 'd'],
  ['A', 'end'],
  ['b', 'end'],
];
const example = [
  ['dc', 'end'],
  ['HN', 'start'],
  ['start', 'kj'],
  ['dc', 'start'],
  ['dc', 'HN'],
  ['LN', 'dc'],
  ['HN', 'end'],
  ['kj', 'sa'],
  ['kj', 'HN'],
  ['kj', 'dc'],
];

function countPaths (list) {
  let count = 0;
  const queue = [["start", []]];

  while (queue.length) {
    const cur = queue.shift();
    const [v, seen] = cur;
    if (isLowerCase(v) && seen.includes(v)) continue;

    list[v].forEach(n => {
      if (n === "end") {
        count+= 1;
      } else if (!isLowerCase(n) || !seen.includes(n)) {
        queue.push([n, [...seen, v]]);
      }
    });
  }

  return count;
}

function countPaths2 (list) {
  let count = 0;
  const queue = [["start", [], false]];

  while (queue.length) {
    let [v, seen, usedRepeat] = queue.shift();
    if (isLowerCase(v) && seen.includes(v)) usedRepeat = true;

    list[v].forEach(n => {
      if (n === "end") {
        count+= 1;
      } else if (!isLowerCase(n) || !seen.includes(n) || !usedRepeat) {
        queue.push([n, [...seen, v], usedRepeat]);
      }
    });
  }

  return count;
}

console.log(countPaths(getAdjacencyList(example))); // -> 19
console.log(countPaths(getAdjacencyList(data))); // -> 3421
console.log(countPaths2(getAdjacencyList(small))); // -> 36
console.log(countPaths2(getAdjacencyList(example))); // -> 103
// console.log(countPaths2(getAdjacencyList(data))); // -> 84870