const fs = require('fs');

const identity = x => x;

const loadDay = (day) => {
  return fs.readFileSync(`./resources/day${day}.txt`, 'utf-8');
}

exports.datefy = (day, mapper = identity, separator = '\n') => {
  return loadDay(day).split(separator).map(mapper);
};