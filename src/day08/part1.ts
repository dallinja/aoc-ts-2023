import { parseInput } from "../util";

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
//   dir: [ 'L', 'L', 'R' ],
//   list: {
//     AAA: { L: 'BBB', R: 'BBB' },
//     BBB: { L: 'AAA', R: 'ZZZ' },
//     ZZZ: { L: 'ZZZ', R: 'ZZZ' }
//   }
// }
function solve() {
  // console.log("input: ", input);
  let moves = 0;
  let found = "AAA";
  while (found !== "ZZZ" && moves < 100000) {
    const dir = input.dir[moves % input.dir.length];
    found = input.list[found][dir];
    moves++;
  }
  return moves;
}

const solution = solve();

export default solution;
