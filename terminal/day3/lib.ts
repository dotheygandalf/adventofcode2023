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
  let isFound = false;
  symbols.forEach((symbolIndex) => {
    if (
      symbolIndex >= found.foundIndex - 1 &&
      symbolIndex < found.foundIndex + found.frankenNumber.length + 1
    ) {
      isFound = true;
      return;
    }
  });
  return isFound;
};

export const run = (input: string[]) => {
  // console.log(input);

  const foundSymbols = input.map(findSymbols);
  // console.log(foundSymbols);
  const foundNumbers = input.map(findNumbers);
  // console.log(foundNumbers);

  let total = 0;
  foundNumbers.forEach((line, lineIndex) => {
    // console.log(line);
    line.forEach((number) => {
      let temp = 0;
      if (lineIndex > 0) {
        temp += checkNumber(number, foundSymbols[lineIndex - 1]);
      }
      temp += checkNumber(number, foundSymbols[lineIndex]);
      if (lineIndex < foundNumbers.length - 1) {
        temp += checkNumber(number, foundSymbols[lineIndex + 1]);
      }
      total += temp;
    });
  });
  console.log(total);
};
