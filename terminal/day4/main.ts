import * as path from "path";
import { getData } from "../utils/readFile";
import { run, run_2 } from "./lib";

const loadFileAndRun = async (fileName: string) => {
  const input = await getData(path.resolve(__dirname, fileName));
  // console.dir(myArry, { maxArrayLength: null });
  console.table(run_2(input));
};

// Part 1
// loadFileAndRun("../../data/day4/input_1.text");
loadFileAndRun("../../data/day4/input_2.text");
