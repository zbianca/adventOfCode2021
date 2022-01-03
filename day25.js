/** Day 25: Sea Cucumber
 * https://adventofcode.com/2021/day/25

Part one: What is the first step on which no sea cucumbers move?
Part two: Complete all previous puzzles.
*/

const { datefy, range } = require("./utils");

const data = datefy(25, x => x, '\n');

const example = [
  'v...>>.vv>',
  '.vv>>.vv..',
  '>>.>v>...v',
  '>>v>>.>.v.',
  'v>v.vv.v..',
  '>.>>..v...',
  '.vv..>.>v.',
  'v.v..>>v.v',
  '....v..v.>',
];

function transpose(list) {
  return range(0, list[0].length).map(i => {
    let newLine = '';

    for (const line of list) {
      newLine+= line[i];
    }

    return newLine;
  });
}

function run(list) {
  const move = (char) => {
    let moved = false;
    for (let i = 0; i < list.length; i++) {
      const endMoves = list[i][0] === '.' && list[i][list[0].length - 1] === char;

      if (list[i].includes(`${char}.`)) {
        moved = true;
        list[i] = list[i].replaceAll(`${char}.`, `.${char}`);
      }

      if (endMoves) {
        moved = true;
        list[i] = char + list[i].substring(1, list[0].length - 1) + '.';
      }
    }

    return moved;
  };

  let first, second;
  let count = 0;

  do {
    count+= 1;
    first = false;
    second = false;
    first = move('>');
    list = transpose(list);
    second = move('v');
    list = transpose(list, true);
  } while (first || second)

  return count;
}

console.log(run(example)); // -> 58
console.log(run(data)); // -> 471