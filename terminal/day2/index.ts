import path from "path";
import { getData } from "../utils/readFile";

export const parseGame = (game: string) => {
  const gameData = game.split(":");
  const draws = gameData[1].split(";");

  const results: {
    red: number;
    blue: number;
    green: number;
  }[] = [];
  let redMax = 0,
    greenMax = 0,
    blueMax = 0;
  for (const draw of draws) {
    let red = 0,
      blue = 0,
      green = 0;
    draw.split(",").map((color) => {
      const colorDraw = color.trim();
      if (colorDraw.indexOf("red") > -1) {
        red = Math.max(parseInt(colorDraw, 10), red);
        if (red > redMax) {
          redMax = red;
        }
      } else if (colorDraw.indexOf("blue") > -1) {
        blue = Math.max(parseInt(colorDraw, 10), blue);
        if (blue > blueMax) {
          blueMax = blue;
        }
      } else if (colorDraw.indexOf("green") > -1) {
        green = Math.max(parseInt(colorDraw, 10), green);
        if (green > greenMax) {
          greenMax = green;
        }
      }
    });
    results.push({
      red,
      blue,
      green,
    });
  }

  return results.map((result) => {
    return {
      result,
      max: {
        redMax,
        blueMax,
        greenMax,
      },
      game: gameData[0],
      power: redMax * blueMax * greenMax,
    };
  });
};

const run_part_1 = async (file: string) => {
  const input = await getData(path.resolve(__dirname, file));

  let answer = (input.length * (input.length + 1)) / 2;

  input.forEach((game) => {
    const gameData = game.split(":");
    const draws = gameData[1].split(";");
    // console.log(gameData[0]);
    let redResult = 0,
      blueResult = 0,
      greenResult = 0;
    for (const draw of draws) {
      draw.split(",").map((color) => {
        const colorDraw = color.trim();
        if (colorDraw.indexOf("red") > -1) {
          redResult = Math.max(parseInt(colorDraw, 10), redResult);
        } else if (colorDraw.indexOf("blue") > -1) {
          blueResult = Math.max(parseInt(colorDraw, 10), blueResult);
        } else if (colorDraw.indexOf("green") > -1) {
          greenResult = Math.max(parseInt(colorDraw, 10), greenResult);
        }
      });
      if (redResult > 12 || greenResult > 13 || blueResult > 14) {
        answer = answer - parseInt(gameData[0].split(" ")[1], 10);
        console.log("game failed");
        break;
      }
    }
  });
  // console.log(answer);
};

const run_part_2 = async (file: string) => {
  const input = await getData(path.resolve(__dirname, file));
  let answer = 0;

  input.forEach((game) => {
    const gameData = game.split(":");
    const draws = gameData[1].split(";");
    console.log(gameData[0]);
    let redResult = 0,
      blueResult = 0,
      greenResult = 0;
    for (const draw of draws) {
      draw.split(",").map((color) => {
        const colorDraw = color.trim();
        if (colorDraw.indexOf("red") > -1) {
          redResult = Math.max(parseInt(colorDraw, 10), redResult);
        } else if (colorDraw.indexOf("blue") > -1) {
          blueResult = Math.max(parseInt(colorDraw, 10), blueResult);
        } else if (colorDraw.indexOf("green") > -1) {
          greenResult = Math.max(parseInt(colorDraw, 10), greenResult);
        }
      });
    }
    answer += redResult * greenResult * blueResult;
  });
  // console.log(answer);
};

// Part 1
run_part_1("./input_1");
run_part_2("./input_2");
