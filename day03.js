/** Day 3: Binary Diagnostic
 * https://adventofcode.com/2021/day/3

Part one: What is the power consumption of the submarine? (in decimal)
Part two: Determined the product of the oxygen generator rating and the CO2 scrubber rating.
*/

const {
  datefy
} = require('./utils');

const data = datefy(3);

const example = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];

function getReportSummary(report) {
  const summary = new Array(report[0].length).fill(0);

  for (line of report) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '1') summary[i]+= 1;
    }
  }

  return summary;
}

function getGammaEpsilon(report) {
  const summary = getReportSummary(report);
  const gamma = new Array(summary.length);
  const epsilon = new Array(summary.length);

  for (let i = 0; i < summary.length; i++) {
    if (summary[i] >= report.length / 2) {
      gamma[i] = 1;
      epsilon[i] = 0;
    } else {
      gamma[i] = 0;
      epsilon[i] = 1;
    }
  }

  return [gamma, epsilon];
}

function getValues(report) {
  const [gamma, epsilon] = getGammaEpsilon(report);
  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
}

console.log(getValues(example)); // -> 198
console.log(getValues(data));

function filterData(report) {
  let statsO2 = getReportSummary(report);
  let statsCo2 = getReportSummary(report);
  let o2 = [...report];
  let co2 = [...report];

  let i = 0;
  while (o2.length > 1 && i < report[0].length) {
    if (statsO2[i] >= o2.length / 2) {
      o2 = o2.filter(line => line[i] === '1');
    } else {
      o2 = o2.filter(line => line[i] === '0');
    }
    i+= 1;
    statsO2 = getReportSummary(o2);
  }

  let j = 0;
  while (co2.length > 1 && j < report[0].length) {
    if (statsCo2[j] >= co2.length / 2) {
      co2 = co2.filter(line => line[j] === '0');
    } else {
      co2 = co2.filter(line => line[j] === '1');
    }
    j+= 1;
    statsCo2 = getReportSummary(co2);
  }

  return parseInt(o2.join(''), 2) * parseInt(co2.join(''), 2);
}



console.log(filterData(example)); // -> 230
console.log(filterData(data));