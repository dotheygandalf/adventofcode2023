import { plainText as input } from "../../../data/day3/input_2.text";
import {
  findSymbols,
  findNumbers,
  checkNumber,
} from "../../../terminal/day3/lib";
import { IHighlight, renderLine } from "../utils/LineRendering";

export const Day3 = () => {
  const lines = input.split("\n");

  const foundSymbols = lines.map(findSymbols);
  const foundNumbers = lines.map(findNumbers);

  const cookedLines: {
    line: string[];
    highlights: IHighlight[];
  }[] = [];
  foundNumbers.forEach((line, lineIndex) => {
    // console.log(line);
    const highlights: IHighlight[] = [];
    line.forEach((number) => {
      // console.log(number);
      let above = false,
        at = false,
        below = false;
      if (lineIndex > 0) {
        above = checkNumber(number, foundSymbols[lineIndex - 1]);
      }
      at = checkNumber(number, foundSymbols[lineIndex]);
      if (lineIndex < foundNumbers.length - 1) {
        below = checkNumber(number, foundSymbols[lineIndex + 1]);
      }
      console.log(above, at, below);
      if (above || at || below) {
        highlights.push({
          start: number.foundIndex,
          length: number.frankenNumber.length,
          color: "text-green-600",
        });
        console.log(number);
      }
    });
    cookedLines.push({
      line: lines[lineIndex].split(""),
      highlights: highlights.concat(
        foundSymbols[lineIndex].map((symbolIndex) => {
          return {
            length: 1,
            start: symbolIndex,
            color: "text-red-600",
          };
        })
      ),
    });
  });

  return (
    <div className="pl-20">
      <div className="font-mono text-l">
        {cookedLines.map((line) => {
          return <div>{renderLine(line.line, line.highlights)}</div>;
        })}
      </div>
    </div>
  );
};
