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
}

export const findNumbers = (line: string) => {
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
        });
      }
      frankenNumber = "";
      foundIndex = 0;
    }
  });
  return result;
};

const checkNumber = (found: IFrankenNumber, symbols: number[]) => {
  let foundNumber = 0;
  symbols.forEach((symbolIndex) => {
    if (
      symbolIndex >= found.foundIndex - 1 &&
      symbolIndex < found.foundIndex + found.frankenNumber.length + 1
    ) {
      foundNumber = parseInt(found.frankenNumber, 10);
      console.log("found: " + foundNumber);
    }
  });
  return foundNumber;
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
