/** Day 2: Sonar Sweep
 * https://adventofcode.com/2021/day/2

Part one: Calculate the horizontal position and depth.
Part two: Calculate the horizontal position and depth considering the aim.
*/

const {
  datefy
} = require('./utils');

const data = datefy(2, (x) => {
  move = x.split(' ');
  move[1] = parseInt(move[1], 10);
  return move;
});

const example = [['forward', 5], ['down', 5], ['forward', 8], ['up', 3], ['down', 8], ['forward', 2]];

function getPosition(directions) {
  let x = 0;
  let y = 0;

  for (move of directions) {
    if (move[0] === 'forward') x+= move[1];
    else if (move[0] === 'down') y+= move[1];
    else y+= move[1] * -1;
  }

  return x * y;
}

console.log(getPosition(example)); // -> 150
console.log(getPosition(data));

function getAdjustedPosition(directions) {
  let a = 0;
  let x = 0;
  let y = 0;

  for (move of directions) {
    if (move[0] === 'forward') {
      x+= move[1];
      y+= a * move[1];
    }
    else if (move[0] === 'down') a+= move[1];
    else a-= move[1];
  }

  return x * y;
}

console.log(getAdjustedPosition(example)); // -> 900
console.log(getAdjustedPosition(data));