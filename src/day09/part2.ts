import { parseInput } from "../util";

const rawInput = parseInput({ split: { mapper: false } });

const input = rawInput.map((line) =>
  line.split(" ").map((n) => parseInt(n, 10))
);

function findNext(nums: number[]): number {
  const diffs: number[] = [];
  nums.forEach((num, index) => {
    if (index === nums.length - 1) return;
    diffs.push(nums[index + 1] - num);
  });
  if (diffs.some((n) => n !== 0)) {
    const diff = findNext(diffs);
    return diffs[diffs.length - 1] + diff;
  }
  return 0;
}

function solve() {
  let sum = 0;
  input.forEach((nums) => {
    let nextNum = findNext(nums.reverse());
    sum += nums[nums.length - 1] + nextNum;
  });
  return sum;
}

const solution = solve();

export default solution;
