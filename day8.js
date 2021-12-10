/** Day 8: Seven Segment Search
 * https://adventofcode.com/2021/day/8

Part one: In the output values, how many times do digits 1, 4, 7, or 8 appear?
Part two: What do you get if you add up all of the output values?
*/

const {
  datefy,
} = require('./utils');

const data = datefy(8, x => {
  return x.split(' | ').map(x => x.split(' '));
});

const example1 = [['fcgedb', 'cgb', 'dgebacf', 'gc'],['cg', 'cg', 'fdcagb', 'cbg']];
const example2 = [['acedgfb', 'cdfbe', 'gcdfa', 'fbcad', 'dab', 'cefabd', 'cdfgeb', 'eafb', 'cagedb', 'ab'],['cdfeb', 'fcadb', 'cdfeb', 'cdbaf']];

function countUniqueValues(arr) {
  return arr.flat().sumBy(x => x.length === 2 || x.length === 3 || x.length === 4 || x.length === 7);
}

// console.log(countUniqueValues(example1)); // -> 6
// console.log(countUniqueValues(data.map(x => x[1]))); // -> 330

function isSuperset(set, subset) {
  for (let elem of subset) {
      if (!set.has(elem)) {
          return false
      }
  }
  return true
}

function isSame(set, subset) {
  if (set.size !== subset.size) return false
  for (let elem of subset) {
      if (!set.has(elem)) {
          return false
      }
  }
  return true
}

function difference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
      _difference.delete(elem)
  }
  return _difference
}

const makeSet = (str) => new Set(str.split(''));

function decode(patterns) {
  const parts = new Array(10);

  const [eight] = patterns.filter(x => x.length === 7);
  const [one] = patterns.filter(x => x.length === 2);
  const [four] = patterns.filter(x => x.length === 4);
  const [seven] = patterns.filter(x => x.length === 3);
  parts[8] = makeSet(eight);
  parts[1] = makeSet(one);
  parts[4] = makeSet(four);
  parts[7] = makeSet(seven);

  const use6 = patterns.filter(x => x.length === 6);
  const use5 = patterns.filter(x => x.length === 5);

  const [six] = use6.filter(x => !isSuperset(makeSet(x), parts[7]));
  parts[6] = makeSet(six);

  const [five] = use5.filter(x => isSuperset(parts[6], makeSet(x)));
  parts[5] = makeSet(five);

  const [q] = Array.from(difference(parts[6], parts[5]));
  const [zero] = use6.filter(x => x !== six && x.includes(q));
  const [nine] = use6.filter(x => x !== six && !x.includes(q));
  const [two] = use5.filter(x => x !== five && x.includes(q));
  const [three] = use5.filter(x => x !== five && !x.includes(q));
  parts[0] = makeSet(zero);
  parts[9] = makeSet(nine);
  parts[2] = makeSet(two);
  parts[3] = makeSet(three);

  return parts;
}

function calcLine([input, output]) {
  const dict = decode(input);

  return parseInt(output.map(x => dict.findIndex(c => isSame(makeSet(x), c))).join(''));
}

console.log(calcLine(example2)); // -> 5353
console.log(data.sumBy(calcLine)); // -> 1010472

function decodeMap(patterns) {
  const parts = new Map();

  const [eight] = patterns.filter(x => x.length === 7);
  const [one] = patterns.filter(x => x.length === 2);
  const [four] = patterns.filter(x => x.length === 4);
  const [seven] = patterns.filter(x => x.length === 3);
  parts.set(8, makeSet(eight));
  parts.set(1, makeSet(one));
  parts.set(4, makeSet(four));
  parts.set(7, makeSet(seven));

  const use6 = patterns.filter(x => x.length === 6);
  const use5 = patterns.filter(x => x.length === 5);

  const [six] = use6.filter(x => !isSuperset(makeSet(x), parts.get(7)));
  parts.set(6, makeSet(six));

  const [five] = use5.filter(x => isSuperset(parts.get(6), makeSet(x)));
  parts.set(5, makeSet(five));

  const [q] = Array.from(difference(parts.get(6), parts.get(5)));
  const [zero] = use6.filter(x => x !== six && x.includes(q));
  const [nine] = use6.filter(x => x !== six && !x.includes(q));
  const [two] = use5.filter(x => x !== five && x.includes(q));
  const [three] = use5.filter(x => x !== five && !x.includes(q));
  parts.set(0, makeSet(zero));
  parts.set(9, makeSet(nine));
  parts.set(2, makeSet(two));
  parts.set(3, makeSet(three));

  return parts;
}