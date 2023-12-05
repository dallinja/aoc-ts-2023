import { parseInput } from "../util";

const rawInput = parseInput({ split: { mapper: false } });

type Input = {
  seeds: number[];
} & Record<string, { destination: number; source: number; range: number }[]>;

let key = "";
const input = rawInput.reduce<Input>(
  (acc, line) => {
    if (line === "") {
      key = "";
    } else if (line.includes("seeds:")) {
      acc["seeds"] = line.split(": ")[1].split(" ").map(Number);
    } else if (line.includes("map:")) {
      key = line.split(" map:")[0];
      acc[key] = [];
    } else if (key) {
      const [destination, source, range] = line.split(" ").map(Number);
      acc[key].push({ destination, source, range });
    }
    return acc;
  },
  { seeds: [] }
);

function solve() {
  // console.log("input", input);
  let minLocation = Infinity;
  // console.log("seeds: ", seeds);
  for (let i = 0; i < input.seeds.length; i++) {
    if (i % 2 === 1) continue;
    const seed = input.seeds[i];
    const range = input.seeds[i + 1];
    for (let j = 0; j < range; j++) {
      let id = seed + j;
      let key = "seed";
      // console.log("seed: ", id);
      let count = 0;
      while (key !== "location" && count < 10) {
        const map = Object.keys(input).find(
          (k) => k !== "seeds" && k.startsWith(key)
        );
        if (!map) return;
        const nextId = input[map].reduce((acc, cat) => {
          if (id >= cat.source && id < cat.source + cat.range) {
            return cat.destination + (id - cat.source);
          }
          return acc;
        }, id);

        key = map.split("-to-")[1];
        id = nextId;
        // console.log(`${key}: `, nextId);
        // if (key === "location") {
        //   console.log("");
        // }
        count++;
      }

      if (id < minLocation) {
        minLocation = id;
      }
    }
  }
  return minLocation;
}

const solution = solve();

export default solution;
