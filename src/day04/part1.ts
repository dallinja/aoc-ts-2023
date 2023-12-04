import { parseInput } from "../util";

const input = parseInput({ split: { mapper: false } });

const formattedInput = input.map((line) => {
  const [card, lists] = line.split(":").map((part) => part.trim());
  const [winningNumbers, myNumbers] = lists
    .split("|")
    .map((part) => part.trim());
  return {
    cardId: +card.replace("Card ", ""),
    winningNumbers: winningNumbers
      .split(" ")
      .filter((part) => part !== "")
      .map((n) => +n),
    myNumbers: myNumbers
      .split(" ")
      .filter((part) => part !== "")
      .map((n) => +n),
  };
});

function solve(lines: string[]) {
  let sum = 0;
  formattedInput.forEach(({ cardId, winningNumbers, myNumbers }) => {
    let cardSum = 0;
    winningNumbers.forEach((winningNumber) => {
      if (myNumbers.includes(winningNumber)) {
        if (cardSum === 0) {
          cardSum += 1;
        } else {
          cardSum *= 2;
        }
      }
    });
    sum += cardSum;
  });
  return sum;
}

const solution = solve(input);

export default solution;
