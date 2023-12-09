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
  // console.log("input: ", input);
  const aKeys = Object.keys(input.list).filter((key) => key.endsWith("A"));
  console.log("aKeys: ", aKeys);
  const aPaths: Record<string, { steps: number; key: string }> = {};
  console.time();
  aKeys.forEach((aKey) => {
    let found = aKey;
    let steps = 0;
    while (!found.endsWith("Z")) {
      const dir = input.dir[steps % input.dir.length];
      found = input.list[found][dir];
      steps++;
    }
    aPaths[aKey] = { steps, key: found };
  });
  console.timeEnd();
  console.log("aPaths: ", aPaths);

  const zKeys = Object.keys(input.list).filter((key) => key.endsWith("Z"));
  console.log("zKeys: ", zKeys);
  const zPaths: Record<string, { steps: number; key: string }> = {};
  console.time();
  zKeys.forEach((zKey) => {
    input.dir.forEach((dir, index) => {
      // do stuff
      let found = zKey;
      let steps = 0;
      while (!found.endsWith("Z") || steps === 0) {
        const dir = input.dir[(steps + index) % input.dir.length];
        found = input.list[found][dir];
        steps++;
      }
      const key = `${zKey}_${index}`;
      zPaths[key] = { steps, key: found };
    });
  });
  console.timeEnd();
  // console.log("zPaths: ", zPaths);

  const [_, ...oAKeys] = aKeys;
  const paths = aKeys.map((aKey) => ({
    ...aPaths[aKey],
    totalSteps: aPaths[aKey].steps,
  }));
  let going = true;
  let steps = 0;
  let count = 0;
  while (going && count < 100000) {
    steps = paths[0].totalSteps;
    oAKeys.forEach((_, index) => {
      let totalSteps = paths[index + 1].totalSteps;
      while (totalSteps < steps) {
        // console.log(paths[index + 1], path.totalSteps);
        const nextPath = getNextPath(paths[index + 1], zPaths);
        paths[index + 1] = {
          ...nextPath,
          totalSteps: paths[index + 1].totalSteps + nextPath.steps,
        };
        totalSteps = paths[index + 1].totalSteps;
      }
    });
    if (paths.every((path) => path.totalSteps === steps)) {
      going = false;
    }
    const nextFirstPath = getNextPath(paths[0], zPaths);
    paths[0].totalSteps = nextFirstPath.steps + steps;
    count++;
  }
  console.log("paths: ", paths);

  // const zKeys = Object.keys(input.list).filter((key) => key.endsWith("Z"));
  // console.log("zKeys: ", zKeys);
  // let steps = 0;
  // let found = aKeys[2];
  // let stepsToZ: Record<string, number> = {}
  // while (!found.every((key) => key.endsWith("Z")) && steps < 10000000000) {
  //   const dir = input.dir[steps % input.dir.length];
  //   found = found.map((key) => input.list[key][dir]);
  //   steps++;
  // }
  // console.time();
  // while (!found.endsWith("Z") && steps < 100000) {
  //   const dir = input.dir[steps % input.dir.length];
  //   found = input.list[found][dir];
  //   steps++;
  // }
  // console.timeEnd();
  return 0;
}

function getNextPath(
  path: { steps: number; key: string; totalSteps: number },
  zPaths: Record<string, { steps: number; key: string }>
) {
  const dirIndex = path.totalSteps % input.dir.length;
  const key = `${path.key}_${dirIndex}`;
  return zPaths[key];
}

const solution = solve();

export default solution;
