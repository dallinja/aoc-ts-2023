import { parseInput } from "../util";

const input = parseInput({ split: { mapper: false } });

// line = Game 1: 4 blue, 4 red, 16 green; 14 green, 5 red; 1 blue, 3 red, 5 green

type Color = "red" | "green" | "blue";
type Game = {
  id: number;
  sets: {
    amount: number;
    color: Color;
  }[][];
};

const test: Record<Color, number> = { red: 12, green: 13, blue: 14 };

// [{ id: 1, sets: [[{amount: 4, color: 'blue'}, {amount: 4, color: 'red'}, {amount: 16, color: 'green'}], [{amount: 14, color: 'green'}, {amount: 5, color: 'red'}], [{amount: 1, color: 'blue'}, {amount: 3, color: 'red'}, {amount: 5, color: 'green'}]]}]
const formattedInput = input.reduce<Game[]>((acc, line) => {
  const gameId = line.match(/Game (\d+):/)?.[1] as string;
  const setsStartIndex = line.indexOf(":") + 1;
  const sets = line
    .substring(setsStartIndex)
    .split(";")
    .map((set) => set.trim())
    // ['4 blue, 4 red, 16 green', '14 green, 5 red', '1 blue, 3 red, 5 green']
    .map((set) => {
      // set = '4 blue, 4 red, 16 green'
      const grabs = set
        .split(",")
        .map((set) => set.trim()) // ['4 blue', '4 red', '16 green']
        .map((grab) => {
          // grab = '4 blue'
          const [amount, color] = grab.split(" "); // ['4', 'blue']
          return { amount: +amount, color: color as Color };
        });
      return grabs;
    });
  const game = {
    id: +gameId,
    sets,
  };
  acc.push(game);
  return acc;
}, []);

function solve(inputs: typeof formattedInput) {
  const goodGameIds: number[] = [];
  inputs.forEach((game) => {
    if (
      game.sets.every((set) => {
        let r = true;
        set.forEach(({ color, amount }) => {
          if (amount > test[color]) {
            r = false;
          }
        });
        return r;
      })
    ) {
      goodGameIds.push(game.id);
    }
  });
  return goodGameIds.reduce((r, v) => ((r += v), r), 0);
}

const solution = solve(formattedInput);

export default solution;
