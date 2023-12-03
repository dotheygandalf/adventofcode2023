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

  // eslint-disable-next-line prefer-spread
  const allHighlights: Array<Array<IHighlight>> = Array.apply(
    null,
    Array(lines.length)
  ).map(() => {
    return [];
  });

  foundNumbers.forEach((line, lineIndex) => {
    // console.log(line);
    const highlights = allHighlights[lineIndex];
    line.forEach((number) => {
      // console.log(number);
      let above = false,
        at = false,
        below = false;
      if (lineIndex > 0) {
        const aboveSymbolHighlight = checkNumber(
          number,
          foundSymbols[lineIndex - 1]
        );
        above = aboveSymbolHighlight > -1;
        if (above) {
          allHighlights[lineIndex - 1].push({
            start: aboveSymbolHighlight,
            length: 1,
            color: "text-yellow-600",
          });
        }
      }
      const atLineSymbolHighlight = checkNumber(
        number,
        foundSymbols[lineIndex]
      );
      at = atLineSymbolHighlight > -1;
      if (at) {
        allHighlights[lineIndex].push({
          start: atLineSymbolHighlight,
          length: 1,
          color: "text-yellow-600",
        });
      }

      if (lineIndex < foundNumbers.length - 1) {
        const belowSymbolHighlight = checkNumber(
          number,
          foundSymbols[lineIndex + 1]
        );
        below = belowSymbolHighlight > -1;
        if (below) {
          allHighlights[lineIndex + 1].push({
            start: belowSymbolHighlight,
            length: 1,
            color: "text-yellow-600",
          });
        }
      }
      console.log(above, at, below);
      if (above || at || below) {
        highlights.push({
          start: number.foundIndex,
          length: number.frankenNumber.length,
          color: "text-green-600",
        });
        // console.log(number);
      } else {
        highlights.push({
          start: number.foundIndex,
          length: number.frankenNumber.length,
          color: "text-blue-900",
        });
      }
    });
    cookedLines.push({
      line: lines[lineIndex].split(""),
      highlights: highlights,
    });
  });

  cookedLines.forEach((line, index) => {
    line.highlights.concat(allHighlights[index]);
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
