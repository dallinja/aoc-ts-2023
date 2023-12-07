import { parseInput } from "../util";

const rawInput = parseInput({ split: { mapper: false } });

// { Time: 715, Distance: 940200 },
const input = rawInput.reduce<Record<string, number>>((acc, line) => {
  const [label, race] = line.split(":").map((s) => s.trim());
  const value = Number(race.replace(/\s/g, ""));
  acc[label] = value;
  return acc;
}, {});

function solve() {
  console.log(input);
  let attepmts = 0;
  let race = input;
  for (let i = 0; i < race.Time; i++) {
    const Distance = i * (race.Time - i);
    if (Distance > race.Distance) {
      attepmts++;
    }
  }
  // console.log(attepmts);
  return attepmts;
}

const solution = solve();

export default solution;
