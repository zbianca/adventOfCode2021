/** Day 17: Trick Shot
 * https://adventofcode.com/2021/day/17

Part one: What is the highest y position it reaches on this trajectory?
Part two: How many distinct initial velocity values cause the probe to be within the target area after any step?
*/

const {
  range,
} = require('./utils');

// data
const [minX, maxX, minY, maxY] = [57, 116, -198, -148];

// example
// const [minX, maxX, minY, maxY] = [20, 30, -10, -5];

function shoot(velX, velY) {
  let [curX, curY] = [0, 0];
  let highest = -Infinity;

  while (curX <= maxX && curY >= minY) {
    curX+= velX;
    curY+= velY;
    // highest = Math.max(highest, curY);

    if (curX >= minX && curX <= maxX && curY >= minY && curY <= maxY) {
      // console.log(highest);
      return true;
    }
    if (velX !== 0) {
      velX > 0? velX-= 1 : velX+= 1;
    }
    velY-= 1;
  }

  return false;
}

// console.log(shoot(7,2)); // -> true with example
// console.log(shoot(6,3)); // -> true with example
// console.log(shoot(6,4)); // -> true with example
// console.log(shoot(6,8)); // -> true with example
// console.log(shoot(6,9)); // -> true with example - highest = 45
// console.log(shoot(9,0)); // -> true with example

console.log(shoot(11, 197)); // -> true with example - highest = 19503
// console.log(shoot(12, 197)); // -> true with example
// console.log(shoot(13, 197)); // -> true with example
// console.log(shoot(14, 197)); // -> true with example

function counter() {
  let count = 0;
  range(10, 117).forEach(x => {
    range(-198, 199).forEach(y => {
      if (shoot(x, y)) count+= 1;
    });
  });
  console.log(count);
}

counter(); // 5200