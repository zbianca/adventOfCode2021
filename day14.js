/** Day 14: Extended Polymerization
 * https://adventofcode.com/2021/day/14

Part one: Apply 10 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?
Part two: Apply 40 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?
*/

const { datefy } = require("./utils");

let data = datefy(14, x => x,  '\n\n');

data[1] = data[1].split('\n').map(x => x.split(' -> '));

function insertStep([init, instructions]) {
  let cur = init;
  let result = "";
  const dict = new Map()
  const count = new Map()
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  for (let instruction of instructions) {
    dict.set(instruction[0], instruction[1]);
  }

  for (let iterations = 1; iterations <= 10; iterations++) {
    for (let i = 0; i < cur.length - 1; i++) {
      let pair = cur.substring(i, i+2);
      result+= pair[0];
      result+= dict.get(pair);
      if (i === cur.length - 2) {
        result+= pair[1];
        cur = result;
        result = '';
        break;
      }
    }
  }

  for (const char of cur) {
    count.set(char, (count.get(char) ?? 0) + 1);
    max = Math.max(max, count.get(char));
  }

  for (const [_, v] of count) {
    min = Math.min(min, v);
  }

  return max - min;
}

const example = [
  "NNCB",
  [
    ["CH", "B"],
    ["HH", "N"],
    ["CB", "H"],
    ["NH", "C"],
    ["HB", "C"],
    ["HC", "B"],
    ["HN", "C"],
    ["NN", "C"],
    ["BH", "H"],
    ["NC", "B"],
    ["NB", "B"],
    ["BN", "B"],
    ["BB", "N"],
    ["BC", "B"],
    ["CC", "N"],
    ["CN", "C"],
  ],
];

console.log(insertStep(example)); // -> 1588
console.log(insertStep(data)); // -> 2657

function insertStepCounting([init, instructions]) {
  const dict = new Map()
  let pairs = new Map()
  const letters = new Map()
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  for (let instruction of instructions) {
    dict.set(instruction[0], [instruction[0][0] + instruction[1], instruction[1] + instruction[0][1]]);
  }

  for (let i = 0; i < init.length - 1; i++) {
    let pair = init.substring(i, i+2);
    pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
  }

  for (let iterations = 1; iterations <= 40; iterations++) {
    const newPairs = new Map();
    for (let [k, v] of pairs) {
      dict.get(k).forEach(newPair => {
        newPairs.set(newPair, (newPairs.get(newPair) ?? 0) + v);
      });
    }
    pairs = newPairs;
  }

  for (const [k, v] of pairs) {
    letters.set(k[0], (letters.get(k[0]) ?? 0) + v);
    letters.set(k[1], (letters.get(k[1]) ?? 0) + v);
  }

  for (const [_, v] of letters) {
    max = Math.max(max, v);
    min = Math.min(min, v);
  }

  return Math.ceil(max / 2) - Math.ceil(min / 2);
}

console.log(insertStepCounting(example)); // -> 2188189693529
console.log(insertStepCounting(data)); // -> 2911561572630