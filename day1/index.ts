import * as path from "path";
import { getData } from "../utils/readFile";

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

const checkFirstIndex = <T>(input: string, array: string[]) => {
  return array.map((number) => {
    return input.indexOf(number);
  });
};

const checkSecondIndex = (input: string, array: string[]) => {
  return array.map((number) => {
    return input.lastIndexOf(number);
  });
};

const getIndexOfFirstOccurance = (occurrences: number[]) => {
  let indexOfFirstWord = Number.MAX_SAFE_INTEGER;
  for (let k = 0; k < occurrences.length; k++) {
    if (occurrences[k] > -1 && occurrences[k] < indexOfFirstWord) {
      indexOfFirstWord = occurrences[k];
    }
  }
  return indexOfFirstWord;
};

const getIndexOfLastOccurance = (occurrences: number[]) => {
  let indexofLastOccurance = -1;
  for (let l = 0; l < occurrences.length; l++) {
    if (occurrences[l] > indexofLastOccurance) {
      indexofLastOccurance = occurrences[l];
    }
  }
  return indexofLastOccurance;
};

const run = async (file: string) => {
  const input = await getData(path.resolve(__dirname, file));

  const answer = input.reduce<number>((prev, curr) => {
    const letters = curr.split("");

    let firstNumber, secondNumber;
    const firstNumbersThatAreNumbers = checkFirstIndex(curr, numberNumbers);
    const firstNumbersThatAreWords = checkFirstIndex(curr, numberWords);
    const secondNumbersThatAreNumbers = checkSecondIndex(curr, numberNumbers);
    const secondNumbersThatAreWords = checkSecondIndex(curr, numberWords);

    const indexOfFirstNumber = getIndexOfFirstOccurance(
      firstNumbersThatAreNumbers
    );
    const indexOfFirstWord = getIndexOfFirstOccurance(firstNumbersThatAreWords);
    const indexOfSecondNumber = getIndexOfLastOccurance(
      secondNumbersThatAreNumbers
    );
    const indexOfSecondWord = getIndexOfLastOccurance(
      secondNumbersThatAreWords
    );

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

    console.log(curr, Number(`${firstNumber}${secondNumber}`));

    return prev + Number(`${firstNumber}${secondNumber}`);
  }, 0);

  console.log(answer);
};

// Part 1
// run("./input_1");
// run("./input_2");

// Part 2
// run("./input_3");
run("./input_2");
// run("./input_test");
