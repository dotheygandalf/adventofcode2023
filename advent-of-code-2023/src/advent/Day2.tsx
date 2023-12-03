import { useEffect, useRef } from "react";
import blankPage from "../../public/d54.jpg";

export const Day2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        const image = new Image();
        image.src = blankPage;
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

          //blue
          context.fillStyle = "#2d48b7";
          context.fillRect(150, 410, 170, 30);

          context.fillStyle = "#1e307a";
          context.fillRect(150, 410, 130, 30);

          //green
          context.fillStyle = "#307a1e";
          context.fillRect(150, 450, 150, 30);

          //red
          context.fillStyle = "#7a1e30";
          context.fillRect(150, 490, 180, 30);
        };
      }
    }
  }, [canvasRef]);
  return (
    <div className="pl-20 pt-10">
      <canvas ref={canvasRef} width={835} height={667} />
    </div>
  );
};
