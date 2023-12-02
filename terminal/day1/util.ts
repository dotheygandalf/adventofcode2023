const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const numberNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const checkFirstIndex = (input: string, array: string[]) => {
  return array.map((number) => {
    return input.indexOf(number);
  });
};

const checkSecondIndex = (input: string, array: string[]) => {
  return array.map((number) => {
    return input.lastIndexOf(number);
  });
};

const getIndexOfFirstOccurrence = (occurrences: number[]) => {
  let indexOfFirstWord = Number.MAX_SAFE_INTEGER;
  for (let k = 0; k < occurrences.length; k++) {
    if (occurrences[k] > -1 && occurrences[k] < indexOfFirstWord) {
      indexOfFirstWord = occurrences[k];
    }
  }
  return indexOfFirstWord;
};

const getIndexOfLastOccurrence = (occurrences: number[]) => {
  let indexofLastOccurrence = -1;
  for (let l = 0; l < occurrences.length; l++) {
    if (occurrences[l] > indexofLastOccurrence) {
      indexofLastOccurrence = occurrences[l];
    }
  }
  return indexofLastOccurrence;
};

export interface IProcessed {
  line: string;
  output: number;
  outputFirstNumber: number;
  outputSecondNumber: number;
  firstNumber: Position;
  secondNumber: Position;
}

interface Position {
  start: number;
  length: number;
}

export const processLine = (input: string): IProcessed => {
  const letters = input.split("");

  let outputFirstNumber, outputSecondNumber, firstNumber, secondNumber;
  const firstNumbersThatAreNumbers = checkFirstIndex(input, numberNumbers);
  const firstNumbersThatAreWords = checkFirstIndex(input, numberWords);
  const secondNumbersThatAreNumbers = checkSecondIndex(input, numberNumbers);
  const secondNumbersThatAreWords = checkSecondIndex(input, numberWords);

  const indexOfFirstNumber = getIndexOfFirstOccurrence(
    firstNumbersThatAreNumbers
  );
  const indexOfFirstWord = getIndexOfFirstOccurrence(firstNumbersThatAreWords);
  const indexOfSecondNumber = getIndexOfLastOccurrence(
    secondNumbersThatAreNumbers
  );
  const indexOfSecondWord = getIndexOfLastOccurrence(secondNumbersThatAreWords);

  // console.debug(secondNumbersThatAreWords);

  const valueOfFirstWord =
    firstNumbersThatAreWords.indexOf(indexOfFirstWord) + 1;
  const valueOfSecondWord =
    secondNumbersThatAreWords.indexOf(indexOfSecondWord) + 1;

  if (indexOfFirstNumber === -1 || indexOfFirstWord < indexOfFirstNumber) {
    outputFirstNumber = valueOfFirstWord;
    firstNumber = {
      start: indexOfFirstWord,
      length: numberWords[valueOfFirstWord - 1]?.length - 1,
    };
  } else {
    outputFirstNumber = parseInt(letters[indexOfFirstNumber]);
    firstNumber = {
      start: indexOfFirstNumber,
      length: 0,
    };
  }

  if (indexOfSecondNumber === -1 || indexOfSecondWord > indexOfSecondNumber) {
    outputSecondNumber = valueOfSecondWord;
    secondNumber = {
      start: indexOfSecondWord,
      length: numberWords[valueOfSecondWord - 1]?.length - 1,
    };
  } else {
    outputSecondNumber = parseInt(letters[indexOfSecondNumber], 10);
    secondNumber = {
      start: indexOfSecondNumber,
      length: 0,
    };
  }

  const output = {
    line: input,
    firstNumber,
    secondNumber,
    output: Number(`${outputFirstNumber}${outputSecondNumber}`),
    outputFirstNumber,
    outputSecondNumber,
  };
  console.log(output);
  return output;
};

export const run = async (input: string[]) => {
  const answer = input.reduce<number>((prev, curr) => {
    const { output } = processLine(curr);
    return prev + output;
  }, 0);

  console.log(answer);
};
