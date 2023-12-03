import * as path from "path";
import { getData } from "../utils/readFile";
import { run } from "./lib";

const loadFileAndRun = async (fileName: string) => {
  const input = await getData(path.resolve(__dirname, fileName));
  console.log(run(input.join("\n")));
};

// Part 1
// loadFileAndRun("../../data/day3/input_1.text");
loadFileAndRun("../../data/day3/input_2.text");
