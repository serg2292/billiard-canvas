import { Ball, BallData } from "../types";

const ballsData: BallData[] = [
  {
    id: 1,
    x: 100,
    y: 100,
    speed: { vx: 0, vy: 0 },
    radius: 25,
    color: "blue",
  },
  { id: 2, x: 200, y: 200, speed: { vx: 0, vy: 0 }, radius: 30, color: "red" },
  {
    id: 3,
    x: 300,
    y: 150,
    speed: { vx: 0, vy: 0 },
    radius: 20,
    color: "green",
  },
];

function draw(this: Ball, ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}

function isPointerInside(this: Ball, x: number, y: number) {
  const dx = x - this.x;
  const dy = y - this.y;
  return dx * dx + dy * dy < this.radius * this.radius;
}

const generateBall = (ballData: BallData): Ball => {
    return {...ballData, draw, isPointerInside}
}

export const initialBalls = ballsData.map((ballData) => generateBall(ballData))
