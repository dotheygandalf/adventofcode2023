export const findSymbols = (line: string): number[] => {
  const symbols: number[] = [];
  line.split("").forEach((char, index) => {
    if (char !== "." && Number.isNaN(Number(char))) {
      symbols.push(index);
    }
  });
  return symbols;
};

interface IFrankenNumber {
  frankenNumber: string;
  foundIndex: number;
  line: number;
}

export const findNumbers = (line: string, lineIndex: number) => {
  let frankenNumber = "";
  let foundIndex = 0;
  const result: IFrankenNumber[] = [];
  line.split("").forEach((char, index) => {
    if (Number.isInteger(Number(char))) {
      if (frankenNumber === "") {
        foundIndex = index;
      }
      frankenNumber = frankenNumber.concat(char);
      if (index === line.length - 1) {
        result.push({
          frankenNumber,
          foundIndex,
          line: lineIndex,
        });
      }
    } else {
      if (frankenNumber !== "") {
        result.push({
          frankenNumber,
          foundIndex,
          line: lineIndex,
        });
      }
      frankenNumber = "";
      foundIndex = 0;
    }
  });
  return result;
};

export const checkNumber = (found: IFrankenNumber, symbols: number[]) => {
  // console.log(found, symbols);
  let matchingSymbolIndex = -1;
  symbols.forEach((symbolIndex) => {
    if (
      symbolIndex >= found.foundIndex - 1 &&
      symbolIndex < found.foundIndex + found.frankenNumber.length + 1
    ) {
      matchingSymbolIndex = symbolIndex;
      return;
    }
  });
  return matchingSymbolIndex;
};

export const run = (input: string) => {
  const lines = input.split("\n");

  const foundSymbols = lines.map(findSymbols);
  const foundNumbers = lines.map(findNumbers);

  let sum = 0;

  const usedSymbols: {
    [index: string]: number[];
  } = {};

  foundNumbers.forEach((line, lineIndex) => {
    // console.log(line);
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
          if (usedSymbols[`${lineIndex - 1}_${aboveSymbolHighlight}`]) {
            usedSymbols[`${lineIndex - 1}_${aboveSymbolHighlight}`].push(
              Number(number.frankenNumber)
            );
          } else {
            usedSymbols[`${lineIndex - 1}_${aboveSymbolHighlight}`] = [
              Number(number.frankenNumber),
            ];
          }
        }
      }
      const atLineSymbolHighlight = checkNumber(
        number,
        foundSymbols[lineIndex]
      );
      at = atLineSymbolHighlight > -1;
      if (at) {
        if (usedSymbols[`${lineIndex}_${atLineSymbolHighlight}`]) {
          usedSymbols[`${lineIndex}_${atLineSymbolHighlight}`].push(
            Number(number.frankenNumber)
          );
        } else {
          usedSymbols[`${lineIndex}_${atLineSymbolHighlight}`] = [
            Number(number.frankenNumber),
          ];
        }
      }

      if (lineIndex < foundNumbers.length - 1) {
        const belowSymbolHighlight = checkNumber(
          number,
          foundSymbols[lineIndex + 1]
        );
        below = belowSymbolHighlight > -1;
        if (below) {
          if (usedSymbols[`${lineIndex + 1}_${belowSymbolHighlight}`]) {
            usedSymbols[`${lineIndex + 1}_${belowSymbolHighlight}`].push(
              Number(number.frankenNumber)
            );
          } else {
            usedSymbols[`${lineIndex + 1}_${belowSymbolHighlight}`] = [
              Number(number.frankenNumber),
            ];
          }
        }
      }
      if (above || at || below) {
        sum += Number(number.frankenNumber);
      }
    });
  });

  console.log(usedSymbols);

  console.log(
    Object.values(usedSymbols)
      .map((found) => {
        if (found.length === 2) {
          return found[0] * found[1];
        } else {
          return 0;
        }
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0)
  );

  return sum;
};
