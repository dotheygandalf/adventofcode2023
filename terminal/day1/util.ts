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

export const processLine = (input: string) => {
  const letters = input.split("");

  let firstNumber, secondNumber;
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
    firstNumber = valueOfFirstWord;
  } else {
    firstNumber = letters[indexOfFirstNumber];
  }

  if (indexOfSecondNumber === -1 || indexOfSecondWord > indexOfSecondNumber) {
    secondNumber = valueOfSecondWord;
  } else {
    secondNumber = letters[indexOfSecondNumber];
  }

  console.log(input, Number(`${firstNumber}${secondNumber}`));
  return Number(`${firstNumber}${secondNumber}`);
};

export const run = async (input: string[]) => {
  const answer = input.reduce<number>((prev, curr) => {
    const output = processLine(curr);
    return prev + output;
  }, 0);

  console.log(answer);
};
