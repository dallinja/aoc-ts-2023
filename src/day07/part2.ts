import { parseInput } from "../util";

const rawInput = parseInput({ split: { mapper: false } });

type Type =
  | "fiveOfAKind"
  | "fourOfAKind"
  | "fullHouse"
  | "threeOfAKind"
  | "twoPair"
  | "onePair"
  | "highCard";

const rank = {
  fiveOfAKind: 1,
  fourOfAKind: 2,
  fullHouse: 3,
  threeOfAKind: 4,
  twoPair: 5,
  onePair: 6,
  highCard: 7,
};
const cardRank = {
  A: 14,
  K: 13,
  Q: 12,
  J: 0,
  T: 10,
};

const input = rawInput.map((line) => {
  // hand = 'KK677'
  const [hand, bid] = line.split(" ");
  const type = getType(hand);
  return { hand, bid: parseInt(bid), type };
});

function getType(hand: string): Type {
  const regex = /J/g;
  let jCount = hand.match(regex)?.length || 0;
  // console.log("jCount: ", jCount);
  let maxCount = 0;
  let maxCard = "";
  const counts = hand.split("").reduce<Record<string, number>>((acc, card) => {
    if (card === "J") {
      return acc;
    } else {
      acc[card] = acc[card] ? acc[card] + 1 : 1;
      if (acc[card] > maxCount) {
        maxCount = acc[card];
        maxCard = card;
      }
    }
    return acc;
  }, {});

  // counts = { K: 2, 6: 2, 7: 1 }
  if (jCount > 0) {
    counts[maxCard] = counts[maxCard] + jCount;
  }
  // console.log("counts: ", counts);

  const values = Object.values(counts);

  if (values.includes(5)) {
    return "fiveOfAKind";
  }

  if (values.includes(4)) {
    return "fourOfAKind";
  }

  if (values.includes(3) && values.includes(2)) {
    return "fullHouse";
  }

  if (values.includes(3)) {
    return "threeOfAKind";
  }
  if (values.length === 3) {
    return "twoPair";
  }

  if (values.length === 4) {
    return "onePair";
  }

  return "highCard";
}

function getRank(aHand: string, bHand: string): number {
  let sort = 0;
  for (let i = 0; i < aHand.length; i++) {
    const aRank =
      cardRank[aHand[i] as keyof typeof cardRank] || parseInt(aHand[i]);
    const bRank =
      cardRank[bHand[i] as keyof typeof cardRank] || parseInt(bHand[i]);
    if (aRank !== bRank) {
      return aRank - bRank;
    }
  }
  return sort;
}

function solve() {
  input.sort((a, b) => {
    if (a.type === b.type) {
      return getRank(a.hand, b.hand);
    }
    return rank[b.type] - rank[a.type];
  });
  // console.log("input: ", input);

  return input.reduce((acc, cur, index) => {
    acc += cur.bid * (index + 1);
    return acc;
  }, 0);
}

const solution = solve();

export default solution;
