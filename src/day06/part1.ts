import { parseInput } from "../util";

const rawInput = parseInput({ split: { mapper: false } });

// [
//   { Time: 7, Distance: 9 },
//   { Time: 15, Distance: 40 },
//   { Time: 30, Distance: 200 },
// ]
const input = rawInput.reduce<Record<string, number>[]>((acc, line) => {
  const [label, races] = line.split(":").map((s) => s.trim());
  const values = races.split(" ").filter(Boolean).map(Number);
  values.forEach((value, index) => {
    (acc[index] = acc[index] || {})[label] = value;
  });
  return acc;
}, []);

function solve() {
  let races: number[][] = [];
  input.forEach((race, raceIndex) => {
    races[raceIndex] = [];
    for (let i = 0; i < race.Time; i++) {
      const Distance = i * (race.Time - i);
      if (Distance > race.Distance) {
        races[raceIndex].push(i);
      }
    }
  });
  // console.log(races);
  return races.reduce((acc, race) => ((acc *= race.length || 1), acc), 1);
}

const solution = solve();

export default solution;
