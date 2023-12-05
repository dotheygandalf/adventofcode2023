import * as path from "path";
import { getData } from "../utils/readFile";
import { run_1 } from "./lib";

const loadFileAndRun = async (fileName: string) => {
  const input = await getData(path.resolve(__dirname, fileName));
  console.table(run_1(input));
};

// Part 1
loadFileAndRun("../../data/day5/input_1.text");
// loadFileAndRun("../../data/day5/input_2.text");
