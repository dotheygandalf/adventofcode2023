import * as path from "path";
import { getData } from "../utils/readFile";
import { run } from "./lib";

const loadFileAndRun = async (fileName: string) => {
  const input = await getData(path.resolve(__dirname, fileName));
  run(input);
};

// Part 1
loadFileAndRun("../../data/day3/input_1.text");
