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

const checkFirstIndex = (input: string) => {
  return numberWords.map((number) => {
    return input.indexOf(number);
  });
};

const checkSecondIndex = (input: string) => {
  return numberWords.map((number) => {
    return input.lastIndexOf(number);
  });
};

const run = async (file: string) => {
  const input = await getData(path.resolve(__dirname, file));

  const answer = input.reduce<number>((prev, curr) => {
    const letters = curr.split("");
    let indexOfFirstNumber = -1;
    let indexOfSecondNumber = -1;
    for (let i = 0; i < letters.length; i++) {
      if (!Number.isNaN(Number(letters[i]))) {
        indexOfFirstNumber = i;
        break;
      }
    }
    for (let j = letters.length - 1; j >= 0; j--) {
      if (!Number.isNaN(Number(letters[j]))) {
        indexOfSecondNumber = j;
        break;
      }
    }

    let firstNumber, secondNumber;
    const numbersThatAreWords = checkFirstIndex(curr);
    const secondNumbersThatAreWords = checkSecondIndex(curr);

    let indexOfFirstWord = Number.MAX_SAFE_INTEGER;
    for (let k = 0; k < numbersThatAreWords.length; k++) {
      if (
        numbersThatAreWords[k] > -1 &&
        numbersThatAreWords[k] < indexOfFirstWord
      ) {
        indexOfFirstWord = numbersThatAreWords[k];
      }
    }
    let indexofSecondWord = -1;
    for (let l = 0; l < secondNumbersThatAreWords.length; l++) {
      if (secondNumbersThatAreWords[l] > indexofSecondWord) {
        indexofSecondWord = secondNumbersThatAreWords[l];
      }
    }

    // console.debug(secondNumbersThatAreWords);

    const valueOfFirstWord = numbersThatAreWords.indexOf(indexOfFirstWord) + 1;
    const valueOfSecondWord =
      secondNumbersThatAreWords.indexOf(indexofSecondWord) + 1;

    if (indexOfFirstNumber === -1 || indexOfFirstWord < indexOfFirstNumber) {
      firstNumber = valueOfFirstWord;
    } else {
      firstNumber = letters[indexOfFirstNumber];
    }

    console.debug(indexofSecondWord, indexOfSecondNumber);
    if (indexOfSecondNumber === -1 || indexofSecondWord > indexOfSecondNumber) {
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
