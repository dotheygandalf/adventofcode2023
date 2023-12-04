/* eslint-disable prefer-spread */
import { useState } from "react";
import { plainText as input } from "../../../data/day3/input_2.text";
import {
  findSymbols,
  findNumbers,
  checkNumber,
  run,
} from "../../../terminal/day3/lib";
import { IHighlight, renderLine } from "../utils/LineRendering";

const part1 = () => {
  const lines = input.split("\n");

  const foundSymbols = lines.map(findSymbols);
  const foundNumbers = lines.map(findNumbers);

  const cookedLines: {
    line: string[];
    highlights: IHighlight[];
  }[] = [];

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
  return cookedLines;
};

const part2 = () => {
  const lines = input.split("\n");
  const allHighlights = lines.map((line) => {
    return {
      line,
      highlights: [] as IHighlight[],
    };
  });

  const output = run(input);
  for (const symbol in output.usedSymbols) {
    const symbolCoord = symbol.split("_").map((coord) => parseInt(coord));
    if (output.usedSymbols[symbol].length === 2) {
      allHighlights[symbolCoord[0]].highlights.push({
        start: symbolCoord[1],
        length: 1,
        color: "text-purple-300",
      });
      output.usedSymbols[symbol].forEach((highlight) => {
        allHighlights[highlight.line].highlights.push({
          start: highlight.number.foundIndex,
          length: highlight.number.frankenNumber.length,
          color: "text-green-500",
        });
      });
    }
  }
  return allHighlights;
};

export const Day3 = () => {
  const [selectedPart, setSelectedPart] = useState(1);

  return (
    <div className="pl-20">
      <div>
        <a className="cursor-pointer mr-5" onClick={() => setSelectedPart(1)}>
          Part 1
        </a>
        <a className="cursor-pointer" onClick={() => setSelectedPart(2)}>
          Part 2
        </a>
      </div>
      <div className="font-mono text-l pt-10 pl-20">
        {selectedPart === 1 ? (
          <>
            {part1().map((line) => {
              return <div>{renderLine(line.line, line.highlights)}</div>;
            })}
          </>
        ) : (
          <>
            {part2().map((line) => {
              return (
                <div>{renderLine(line.line.split(""), line.highlights)}</div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
