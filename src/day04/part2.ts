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
  let cardCounts = [...Array.from(new Array(formattedInput.length))].map(
    () => 1
  );
  formattedInput.forEach(({ cardId, winningNumbers, myNumbers }, index) => {
    let wins = 0;
    winningNumbers.forEach((winningNumber) => {
      if (myNumbers.includes(winningNumber)) {
        wins++;
        const cardIndex = index + wins;
        if (cardIndex < formattedInput.length) {
          cardCounts[cardIndex] += cardCounts[index];
        }
      }
    });
  });
  return cardCounts.reduce((acc, count) => ((acc += count), acc), 0);
}

const solution = solve(input);

export default solution;
