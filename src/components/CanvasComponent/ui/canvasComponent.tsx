import { useRef, useState, useEffect, useCallback } from "react";
import { useCanvas } from "../hooks";
import { draw, initialBalls } from "../utils";
import { ChangeColorMenu } from "./changeColorMenu";
import "./styles.css";
import { Ball } from "../types";

export const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>(initialBalls);

  const { animationId, handleCanvasMouseMove, setAnimationId } = useCanvas(
    canvasRef,
    balls,
    setBalls
  );
  const [clickedBallId, setClickedBallId] = useState<number | null>(null);

  const changeBallColorById = useCallback(
    (id: number, color: string) => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => {
          if (ball.id === id) {
            return { ...ball, color };
          }
          return ball;
        })
      );
    },
    [setBalls]
  );

  const handleBallClick = useCallback(
    (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      balls.forEach((ball) => {
        if (ball.isPointInside(x, y)) {
          setClickedBallId(ball.id);
        }
      });
    },
    [balls]
  );

  const handleCloseMenu = () => {
    setClickedBallId(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (animationId === null) {
      const id = requestAnimationFrame(() => draw(balls, ctx, canvas));
      setAnimationId(id);
    }
    canvas.addEventListener("mousemove", handleCanvasMouseMove);
    canvas.addEventListener("click", handleBallClick);
    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        setAnimationId(null);
      }

      canvas.removeEventListener("mousemove", handleCanvasMouseMove);
      canvas.removeEventListener("click", handleBallClick);
    };
  }, [
    animationId,
    balls,
    handleBallClick,
    handleCanvasMouseMove,
    setAnimationId,
  ]);

  return (
    <div className="canvas-container">
      {clickedBallId && (
        <ChangeColorMenu
          clickedBallId={clickedBallId}
          handleCloseMenu={handleCloseMenu}
          changeBallColorById={changeBallColorById}
        />
      )}
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={800}
        height={600}
      />
    </div>
  );
};
