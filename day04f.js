/** Day 3: Giant Squid
 * https://adventofcode.com/2021/day/4

Part one: What is the power consumption of the submarine? (in decimal)
Part two: Determined the product of the oxygen generator rating and the CO2 scrubber rating.
*/

const { checkPrime } = require('crypto');
const {
  datefy
} = require('./utils');

function gameFormatter(group) {
  if (group.includes(',')) {
    return group.split(',').map(x => parseInt(x, 10));
  }

  const rows = group.split(/\n/).map(x => x.trim().split(/\s+/).map(x => parseInt(x, 10)));

  const l = rows[0].length;
  const cols = [...Array(l).keys()].map(i => rows.map(row => row[i]));

  return [...rows, ...cols];
}

const data = datefy(4, gameFormatter, '\n\n');

function checkVictory(board, bingo) {
  return board.some(rc => rc.every(x => bingo.has(x)));
}

function calcScore(board, bingo, lastNum) {
  return [...new Set(board.flat().filter(x => !bingo.has(x)))].reduce((x, y) => x + y) * lastNum;
}

function part1() {
  const [nums, ...boards] = data;

  const check = (boards, bingo, cur) => {
    const winner = boards.find(b => checkVictory(b, bingo));
    if (winner) return calcScore(winner, bingo, nums[cur - 1]);
    return check(boards, bingo.add(nums[cur]), cur + 1);
  };

  return check(boards, new Set(), 0);
}

function part2() {
  const [nums, ...boards] = data;

  const check = (boards, bingo, cur) => {
    const losers = boards.filter(b => !checkVictory(b, bingo));
    if (losers.length === 0) return calcScore(boards[0], bingo, nums[cur - 1]);
    return check(losers, bingo.add(nums[cur]), cur + 1);
  };

  return check(boards, new Set(), 0);
}

console.log(part1());
console.log(part2());