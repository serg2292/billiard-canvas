import { useCallback, useState } from "react";
import { Ball, Speed } from "../types";

export const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>, balls: Ball[], setBalls: React.Dispatch<React.SetStateAction<Ball[]>>) => {
    const [animationId, setAnimationId] = useState<number | null>(null);


    const changeBallSpeedById = useCallback((id: number, speed: Speed) => {
        setBalls(prevBalls =>
            prevBalls.map(ball => {
                if (ball.id === id) {
                    return { ...ball, speed };
                }
                return ball;
            })
        );
    }, [setBalls]);

    const handleCanvasMouseMove = useCallback(
        (event: MouseEvent) => {
            if (!event.buttons) return;
            if (!(event.buttons & 1)) return;
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            balls.forEach((ball) => {
                if (ball.isPointInside(x, y)) {
                    changeBallSpeedById(ball.id, { vx: 5, vy: 10 });
                }
            });
        },
        [balls, canvasRef, changeBallSpeedById]
    );

    return { animationId, setAnimationId, handleCanvasMouseMove }

}