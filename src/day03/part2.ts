import { parseInput } from "../util";

const input = parseInput({ split: { mapper: false } });

type LineParts = {
  charIndexes: number[];
  parts: {
    part: number;
    position: number[];
  }[];
};

function solve(lines: string[]) {
  const astrisks: Record<string, number[]> = {
    // 1_5: [103,204]
  };

  let before: LineParts | null = null;
  let current: LineParts | null = null;
  let after: LineParts | null = null;
  lines.forEach((line, index) => {
    let startIndex = 0;
    const parts: LineParts["parts"] =
      line.match(/(\d+)/g)?.map((part) => {
        const partIndex = line.indexOf(part, startIndex);
        startIndex = partIndex + part.length;
        const startPosition = partIndex === 0 ? 0 : partIndex - 1;
        const length = part.length + (partIndex === 0 ? 1 : 2);
        const position = [...Array.from(new Array(length))].map(
          (_, i) => startPosition + i
        );
        return { part: +part, position };
      }) ?? [];
    startIndex = 0;
    const charIndexes: number[] =
      line.match(/\*/g)?.map((char) => {
        const charIndex = line.indexOf(char, startIndex);
        startIndex = charIndex + 1;
        return charIndex;
      }) ?? [];
    before = current ? { ...current } : null;
    current = after ? { ...after } : null;
    after = { charIndexes, parts };

    if (current) {
      current.parts.forEach((part) => {
        const isPart = part.position.some(
          (position) =>
            before?.charIndexes.includes(position) ||
            after?.charIndexes.includes(position) ||
            current?.charIndexes.includes(position)
        );
        if (isPart) {
          [
            before?.charIndexes,
            current?.charIndexes,
            after?.charIndexes,
          ].forEach((charIndexes, lineIndex) => {
            const line = index + lineIndex - 2;
            if (charIndexes) {
              charIndexes.forEach((charIndex) => {
                const key = `${line}_${charIndex}`;
                if (part.position.includes(charIndex)) {
                  (astrisks[key] || (astrisks[key] = [])).push(part.part);
                }
              });
            }
          });
        }
      });
    }

    if (index === lines.length - 1) {
      after.parts.forEach((part) => {
        const isPart = part.position.some(
          (position) =>
            after?.charIndexes.includes(position) ||
            current?.charIndexes.includes(position)
        );
        if (isPart) {
          [current?.charIndexes, after?.charIndexes].forEach(
            (charIndexes, lineIndex) => {
              const line = index + lineIndex - 1;
              if (charIndexes) {
                charIndexes.forEach((charIndex) => {
                  const key = `${line}_${charIndex}`;
                  if (part.position.includes(charIndex)) {
                    (astrisks[key] || (astrisks[key] = [])).push(part.part);
                  }
                });
              }
            }
          );
        }
      });
    }
  });

  return Object.entries(astrisks).reduce((acc, [key, values]) => {
    if (values.length === 2) {
      acc += values[0] * values[1];
    }
    return acc;
  }, 0);
}

const solution = solve(input);

export default solution;
