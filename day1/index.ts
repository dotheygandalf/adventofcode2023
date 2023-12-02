import * as path from "path";
import { getData } from "../utils/readFile";

const run = async (file: string) => {
  const input = await getData(path.resolve(__dirname, file));
  console.log(input);

  const answer = input.reduce<number>((prev, curr) => {
    const letters = curr.split("");
    let firstNumberIndex = 0;
    let secondNumberIndex = 0;
    for (let i = 0; i < letters.length; i++) {
      if (!Number.isNaN(Number(letters[i]))) {
        firstNumberIndex = i;
        break;
      }
    }
    for (let j = letters.length - 1; j > 0; j--) {
      if (!Number.isNaN(Number(letters[j]))) {
        secondNumberIndex = j;
        break;
      }
    }

    console.log(
      `${letters[firstNumberIndex]}${letters[secondNumberIndex]}`,
      Number(`${letters[firstNumberIndex]}${letters[secondNumberIndex]}`)
    );

    return (
      prev + Number(`${letters[firstNumberIndex]}${letters[secondNumberIndex]}`)
    );
  }, 0);

  console.log(answer);
};

run("./input_1");
run("./input_2");
