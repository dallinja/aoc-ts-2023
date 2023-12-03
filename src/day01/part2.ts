import { parseInput } from "../util";

const input = parseInput({ split: { mapper: false } });

function solve(inputs: string[]) {
  return inputs.reduce((acc, text) => {
    const [first, last] = replaceWords(text);
    const value = +`${first}${last}`;
    // console.log(value)
    acc += value;
    return acc;
  }, 0);
}
const wordMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const wordRevMap = {
  eno: 1,
  owt: 2,
  eerht: 3,
  ruof: 4,
  evif: 5,
  xis: 6,
  neves: 7,
  thgie: 8,
  enin: 9,
};
const words = [...Object.values(wordMap), ...Object.keys(wordMap)];
const wordsReg = words.join("|");
const wordsRegExp = new RegExp(wordsReg);
const wordsRegRev = wordsReg.split("").reverse().join("");
const wordsRegRevExp = new RegExp(wordsRegRev);

function replaceWords(input: string) {
  const firstMatch = (input.match(wordsRegExp)?.[0] ??
    "") as keyof typeof wordMap;
  const inputRev = input.split("").reverse().join("");
  const lastMatch = (inputRev.match(wordsRegRevExp)?.[0] ??
    "") as keyof typeof wordRevMap;
  return [
    wordMap[firstMatch] || firstMatch,
    wordRevMap[lastMatch] || lastMatch,
  ];
}

const solution = solve(input);

export default solution;
