import * as fs from "fs";
import * as path from "path";

export const getData = () => {
  fs.readFile(path.resolve(__dirname, "./input.txt"), "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return data;
  });
};
