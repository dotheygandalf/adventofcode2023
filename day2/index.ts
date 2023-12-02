import path from "path";
import { getData } from "../utils/readFile";

const run = async (file: string) => {
  const input = await getData(path.resolve(__dirname, file));

  let answer = (input.length * (input.length + 1)) / 2;

  input.forEach((game) => {
    const gameData = game.split(":");
    const draws = gameData[1].split(";");
    console.log(gameData[0]);
    for (const draw of draws) {
      let redResult = 0,
        blueResult = 0,
        greenResult = 0;
      draw.split(",").map((color) => {
        const colorDraw = color.trim();
        if (colorDraw.indexOf("red") > -1) {
          redResult = parseInt(colorDraw, 10);
        } else if (colorDraw.indexOf("blue") > -1) {
          blueResult = parseInt(colorDraw, 10);
        } else if (colorDraw.indexOf("green") > -1) {
          greenResult = parseInt(colorDraw, 10);
        }
      });
      if (redResult > 12 || greenResult > 13 || blueResult > 14) {
        answer = answer - parseInt(gameData[0].split(" ")[1], 10);
        console.log("game failed");
        break;
      }
    }
  });
  console.log(answer);
};

// Part 1
// run("./input_1");
run("./input_2");
