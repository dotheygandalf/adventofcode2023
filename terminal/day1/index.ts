import * as path from "path";
import { getData } from "../utils/readFile";
import { run } from "./util";

const loadFileAndRun = async (fileName: string) => {
  const input = await getData(path.resolve(__dirname, fileName));
  run(input);
};

// Part 1
// run("./input_1");
// run("./input_2");

// Part 2
// run("./input_3");
loadFileAndRun("../../data/day1/input_1.text");
// run("./input_test");
