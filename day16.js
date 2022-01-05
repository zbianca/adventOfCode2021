/** Day 16: Packet Decoder
 * https://adventofcode.com/2021/day/16

Part one: What do you get if you add up the version numbers in all packets?
Part two: What do you get if you evaluate the expression represented by your hexadecimal-encoded BITS transmission?
*/

const { datefy } = require("./utils");

const data = datefy(16, hexToBinaryStr)[0];

function hexToBinaryStr(str) {
  let result = '';

  for (char of str) {
    result += parseInt(char, 16).toString(2).padStart(4, '0');
  }

  return result;
}

const parseBits = (bits, str) => [parseInt(str.substring(0, bits), 2), str.substring(bits)];

// type 4
function parseValue(str, acc = '') {
  let part = str.substring(1,5);
  let rest = str.substring(5);

  if (str[0] === '0') return [parseInt(acc + part, 2), rest];
  return parseValue(rest, acc + part);
}

function parseOperator(str) {
  const packets = [];
  let length, num, result;
  let rest = str.substring(1);

  if (str[0] === '0') {
    [length, rest] = parseBits(15, rest);
    let children = rest.substring(0, length);
    rest = rest.substring(length);
    while (children.length) {
      [result, children] = parsePacket(children);
      packets.push(result);
    }
  }

  if (str[0] === '1') {
    [num, rest] = parseBits(11, rest);
    for (let i = 0; i < num; i++) {
      [result, rest] = parsePacket(rest);
      packets.push(result);
    }
  }

  return [packets, rest];
}

function parsePacket(str) {
  const [version, rest] = parseBits(3, str);
  const [type, rest2] = parseBits(3, rest);

  if (type === 4) {
    const [num, rest3] = parseValue(rest2);
    return [{ version, type, num }, rest3];
  }

  const [packets, rest4] = parseOperator(rest2);
  return [{ version, type, packets }, rest4];
}

function sumVersions(pack) {
  if (pack.type === 4) return pack.version;
  return pack.version + pack.packets.sumBy(sumVersions);
}

function sumValues(pack) {
  if (pack.type === 4) return pack.num;

  const ops = {
    0: (x, y) => x + y,
    1: (x, y) => x * y,
    2: (x, y) => Math.min(x, y),
    3: (x, y) => Math.max(x, y),
    5: (x, y) => x > y ? 1 : 0,
    6: (x, y) => x < y ? 1 : 0,
    7: (x, y) => x === y ? 1 : 0,
  }

  return pack.packets.map(sumValues).reduce(ops[pack.type]);
}

// console.log(parsePacket('110100101111111000101000'));
// -> [{version: 6, type: 4, num: 2021}, '000']
// console.log(parsePacket('00111000000000000110111101000101001010010001001000000000'));
// -> [{version: 1, type: 6, packets: [{version: 6, type: 4, num: 10}, {version: 2, type: 4, num: 20}]}, '0000000']
// console.log(parsePacket('11101110000000001101010000001100100000100011000001100000'));
// -> [{version: 7, type: 3, packets: [{version: 2, type: 4, num: 1}, {version: 4, type: 4, num: 2}, {version: 1, type: 4, num: 3}]}, '00000']
console.log(sumVersions(parsePacket(data)[0])); // -> 895
console.log(sumValues(parsePacket(data)[0])); // -> 1148595959144