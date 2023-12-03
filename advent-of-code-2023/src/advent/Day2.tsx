import { useRef } from "react";
import { plainText as input } from "../../../data/day2/input_1.text";
import under9000_1 from "../../public/john-swan-9000-alt-1.png";
import under9000_2 from "../../public/john-swan-9000-alt-2.png";
import over90002 from "../../public/john-swan-9000-2.png";

import powerLevelBubble from "../../public/power-level.png";

import { useInterval } from "../hooks/useInterval";
import { parseGame } from "../../../terminal/day2";

export const Day2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const games = input.split("\n");
  const allGames = games.map((game) => parseGame(game)).flat();

  let gameCount = 0,
    power = 0;
  let currentGame = "";
  useInterval(() => {
    if (gameCount >= allGames.length) {
      gameCount = 0;
      power = 0;
      return;
    }

    const game = allGames[gameCount];
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        const image = new Image();
        if (power > 9000) {
          image.src = over90002;
        } else {
          if (Math.random() > 0.5) {
            image.src = under9000_1;
          } else {
            image.src = under9000_2;
          }
        }
        const scale_factor = Math.min(
          canvas.width / image.width,
          canvas.height / image.height
        );

        const newWidth = image.width * scale_factor;
        const newHeight = image.height * scale_factor;

        const x = canvas.width / 2 - newWidth / 2;
        const y = canvas.height / 2 - newHeight / 2;

        image.onload = () => {
          // context.imageSmoothingEnabled = false;
          context.drawImage(image, x, y, newWidth, newHeight);

          const SQUARE_SIZE = 20;

          //blue
          context.fillStyle = "#121d4b";
          for (let i = 0; i < game.max.blueMax; i++) {
            context.fillRect(
              150 + i * SQUARE_SIZE + i * 2,
              410,
              SQUARE_SIZE,
              SQUARE_SIZE
            );
          }

          context.fillStyle = "#314fc9";
          for (let i = 0; i < game.result.blue; i++) {
            context.fillRect(
              150 + i * SQUARE_SIZE + i * 2,
              410,
              SQUARE_SIZE,
              SQUARE_SIZE
            );
            context.save();
          }
          context.font = "10px monospace";
          context.fillStyle = "black";
          context.fillText(`Blue: ${game.result.blue}`, 150, 442);

          //green
          context.fillStyle = "#0e2409";
          for (let i = 0; i < game.max.greenMax; i++) {
            context.fillRect(
              150 + i * SQUARE_SIZE + i * 2,
              450,
              SQUARE_SIZE,
              SQUARE_SIZE
            );
            context.save();
          }
          context.fillStyle = "#307a1e";
          for (let i = 0; i < game.result.green; i++) {
            context.fillRect(
              150 + i * SQUARE_SIZE + i * 2,
              450,
              SQUARE_SIZE,
              SQUARE_SIZE
            );
            context.save();
          }
          context.font = "10px monospace";
          context.fillStyle = "black";
          context.fillText(`Green: ${game.result.green}`, 150, 482);

          //red
          context.fillStyle = "#4b121d";
          for (let i = 0; i < game.max.redMax; i++) {
            context.fillRect(
              150 + i * SQUARE_SIZE + i * 2,
              490,
              SQUARE_SIZE,
              SQUARE_SIZE
            );
            context.save();
          }
          context.fillStyle = "#c9314f";
          for (let i = 0; i < game.result.red; i++) {
            context.fillRect(
              150 + i * SQUARE_SIZE + i * 2,
              490,
              SQUARE_SIZE,
              SQUARE_SIZE
            );
            context.save();
          }
          context.font = "10px monospace";
          context.fillStyle = "black";
          context.fillText(`Red: ${game.result.red}`, 150, 522);

          if (currentGame !== game.game) {
            power += game.power;
            currentGame = game.game;
          }

          context.font = "26px monospace";
          context.fillText(`Power: ${power}`, 150, 570);

          const speechBubbleImg = new Image();
          speechBubbleImg.src = powerLevelBubble;
          speechBubbleImg.onload = () => {
            context.drawImage(speechBubbleImg, 220, 10, 200, 100);
          };
        };
      }

      gameCount++;
    }
  }, 250);

  return (
    <div className="pl-20 pt-10f">
      <canvas ref={canvasRef} width={835} height={667} />
    </div>
  );
};
