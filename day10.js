/** Day 10: Syntax Scoring
 * https://adventofcode.com/2021/day/10

Part one: Find the first illegal character in each corrupted line of the navigation subsystem, incomplete lines are okay. What is the total syntax error score for those errors?
Part two: Find the completion string for each incomplete line, score the completion strings, and sort the scores. What is the middle score?
*/

const {
  datefy,
} = require('./utils');

const data = datefy(10);

const example = ['[({(<(())[]>[[{[]{<()<>>',
  '[(()[<>])]({[<{<<[]>>(',
  '{([(<{}[<>[]}>{[]{[(<()>',
  '(((({<>}<{<{<>}{[]{[]{}',
  '[[<[([]))<([[{}[[()]]]',
  '[{[{({}]{}}([{[{{{}}([]',
  '{<[[]]>}<{[{[{[]{()[[[]',
  '[<(<(<(<{}))><([]([]()',
  '<{([([[(<>()){}]>(<<{{',
  '<{([{{}}[<[[[<>{}]]]>[]]',
  ];

function calcCorrupted(s) {
  const stack = [];
  const value = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  for (let char of s) {
      if (char === '(') stack.push(')');
      else if (char === '[') stack.push(']');
      else if (char === '{') stack.push('}');
      else if (char === '<') stack.push('>');
      else {
          const next = stack.pop();
          if (next !== char) return value[char];
      }
  }

  return 0;
}

console.log(example.sumBy(calcCorrupted)); // -> 26397
console.log(data.sumBy(calcCorrupted)); // -> 167379

function incompleteStack(s) {
  const stack = [];

  for (let char of s) {
    if (char === '(') stack.push(')');
    else if (char === '[') stack.push(']');
    else if (char === '{') stack.push('}');
    else if (char === '<') stack.push('>');
    else {
        const next = stack.pop();
        if (next !== char) return [];
    }
}

  return stack.reverse();
}

function calcCompletion(stack) {
  let total = 0;
  const value = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }

  for (let closer of stack) {
    total = (total * 5) + value[closer];
  }

  return total;
}

function score(arr) {
  arr = arr.map(incompleteStack).filter(x => x.length).map(calcCompletion);
  arr.sort((a, b) => a - b);
  return arr[Math.floor(arr.length / 2)];
}


console.log(score(example)); // -> 288957
console.log(score(data)); // -> 2776842859