/** Day 4: Giant Squid
 * https://adventofcode.com/2021/day/4

Part one: Which board will win first? Return its score.
Part two: Which board will win last? Return its score.
*/

const {
  datefy
} = require('./utils');

function gameFormatter(group) {
  if (group.includes(',')) {
    return group.split(',').map(x => parseInt(x, 10));
  }

  return group.split(/\s/).filter(x => x !== '').map(x => parseInt(x, 10));
}

const data = datefy(4, gameFormatter, '\n\n');

const example = [
  [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1],
  [22, 13, 17, 11, 0, 8, 2, 23, 4, 24, 21, 9, 14, 16, 7, 6, 10, 3, 18, 5, 1, 12, 20, 15, 19],
  [3, 15, 0, 2, 22, 9, 18, 13, 17, 5, 19, 8, 7, 25, 23, 20, 11, 10, 24, 4, 14, 21, 16, 12, 6],
  [14, 21, 17, 24, 4, 10, 16, 15, 9, 19, 18, 8, 23, 26, 20, 22, 11, 13, 6, 5, 2, 0, 12, 3, 7],
];

const checkVictory = (board) => {
  let win = false;

  for (let i = 0; i <= 20; i+= 5) {
    if ([board[i], board[i + 1], board[i + 2], board[i + 3], board[i + 4]].every(x => x <= -0)) win = true;
  }

  for (let i = 0; i <= 4; i++) {
    if ([board[i], board[i + 5], board[i + 10], board[i + 15], board[i + 20]].every(x => x <= -0)) win = true;
  }

  return win;
};

const getSum = (board) => {
  let sum = 0;

  for (let num of board) {
    if (num > 0) sum+= num;
  }

  return sum;
}

function game(assets) {
  const [nums, ...boards] = assets;
  let victoryBoard;

  let i = 0;
  while (!victoryBoard && i < nums.length) {
    for (let board of boards) {
      let match = board.findIndex(x => x === nums[i]);
      if ( match > -1) {
        board[match]*= -1;
        if (checkVictory(board)) {
          victoryBoard = board;
          break;
        }
      }
    }
    i+= 1;
  }

  return nums[i - 1] * getSum(victoryBoard);
}

console.log(game(example)); // -> 4512
console.log(game(data)); // -> 32844

function game2(assets) {
  let [nums, ...boards] = assets;
  let doneBoards = [];

  let i = 0;
  while (doneBoards.length < boards.length  && i < nums.length) {
    for (let board of boards) {
      if (doneBoards.includes(board)) continue;
      let match = board.findIndex(x => x === nums[i]);
      if ( match > -1) {
        board[match]*= -1;
        if (checkVictory(board)) doneBoards.push(board);
      }
    }
    i+= 1;
  }

  let sum = 0;
  for (let num of doneBoards[doneBoards.length - 1]) {
    if (num > 0) sum+= num;
  }

  return nums[i - 1] * sum;
}

console.log(game2(example)); // -> 1924
console.log(game2(data)); // -> 4920