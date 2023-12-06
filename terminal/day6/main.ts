import * as path from "path";
import { getData } from "../utils/readFile";
import { parseInput, run_1 } from "./lib";

const loadFileAndRun = async (fileName: string) => {
  const input = await getData(path.resolve(__dirname, fileName));
  const parsedInput = parseInput(input);
  console.log(parsedInput);

  const output = run_1(parsedInput);
  console.log(output);

  const result = output.reduce<number>((prev, curr) => {
    return prev * curr.length;
  }, 1);

  console.log(result);
};

// Part 1
loadFileAndRun("../../data/day6/input_1.text");
// loadFileAndRun("../../data/day6/input_2.text");
