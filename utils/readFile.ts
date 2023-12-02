import * as fs from "fs";

// path.resolve(__dirname, "./input.txt")
export const getData = async (path: string) => {
  return new Promise<string[]>((res, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      res(data.split("\n"));
    });
  });
};
