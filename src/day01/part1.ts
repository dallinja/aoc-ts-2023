import { parseInput } from "../util";

const input = parseInput({ split: { mapper: false } });

function solve(inputs: string[]) {
  return inputs.reduce((acc, text) => {
    const [first, last] = getFirstAndLast(text);
    const value = +`${first}${last}`;
    // console.log(value)
    acc += value;
    return acc;
  }, 0);
}
const regExp = /[1-9]/

function getFirstAndLast(input: string) {
  const firstMatch = input.match(regExp)?.[0] ?? "";
  const inputRev = input.split("").reverse().join("");
  const lastMatch = inputRev.match(regExp)?.[0] ?? ""
  return [firstMatch,lastMatch];
}

const solution = solve(input);

export default solution;
