import { parseInput } from "../util";

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

const rawInput = parseInput({ split: { mapper: false } });

type Input = {
  dir: ("L" | "R")[];
  list: Record<string, { L: string; R: string }>;
};
const input = rawInput.reduce<Input>(
  (acc, cur, index) => {
    if (index === 1) return acc;
    if (index === 0) {
      acc.dir = cur.split("").map((dir) => dir as "L" | "R");
      return acc;
    }
    const [key, dirs] = cur.split(" = ");
    const [L, R] = dirs.replace(/[\(\)\s]/g, "").split(",");
    acc.list[key] = { L, R };
    return acc;
  },
  { dir: [], list: {} }
);

// input:  {
//   dir: [ 'L', 'R' ],
//   list: {
//     '11A': { L: '11B', R: 'XXX' },
//     '11B': { L: 'XXX', R: '11Z' },
//     '11Z': { L: '11B', R: 'XXX' },
//     '22A': { L: '22B', R: 'XXX' },
//     '22B': { L: '22C', R: '22C' },
//     '22C': { L: '22Z', R: '22Z' },
//     '22Z': { L: '22B', R: '22B' },
//     'XXX': { L: 'XXX', R: 'XXX' },
//   }
// }
function solve() {
  console.time();
  const instructions = input.dir;
  const map = input.list;
  const ic = instructions.length;
  const ghostSteps = [];
  let currentNodes = Object.keys(map).filter((n) => n.endsWith("A"));
  // currentNodes:  [ '11A', '22A' ]
  let steps = 0;
  while (currentNodes.length > 0) {
    const instruction = instructions[steps % ic];
    // instruction:  R
    const proposed = currentNodes
      .map((n) => map[n][instruction])
      .filter((n) => !n.endsWith("Z"));
    // proposed:  [ '11B', '22B' ]
    steps = steps + 1;
    if (currentNodes.length != proposed.length) {
      // Steps at one or more Z found
      ghostSteps.push(steps);
    }
    currentNodes = proposed;
  }
  console.timeEnd();
  return ghostSteps.reduce(lcm, 1);
}

const solution = solve();

export default solution;
