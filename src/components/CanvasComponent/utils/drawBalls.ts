import { COLLISION_FACTOR, RESISTANCE } from "../constants";
import { Ball } from "../types";

export const drawBalls = (
  balls: Ball[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let allStopped = true;
  balls.forEach((ball) => {
    ball.draw(ctx);
    ball.speed.vx *= 1 - RESISTANCE;
    ball.speed.vy *= 1 - RESISTANCE;

    ball.x += ball.speed.vx;
    ball.y += ball.speed.vy;

    if (Math.abs(ball.speed.vx) < 0.1 && Math.abs(ball.speed.vy) < 0.1) {
      ball.speed.vx = 0;
      ball.speed.vy = 0;
    } else {
      allStopped = false;
    }

    if (
      ball.y + ball.speed.vy > canvas.height - ball.radius ||
      ball.y + ball.speed.vy < ball.radius
    ) {
      ball.speed.vy = -ball.speed.vy * COLLISION_FACTOR;
    }
    if (
      ball.x + ball.speed.vx > canvas.width - ball.radius ||
      ball.x + ball.speed.vx < ball.radius
    ) {
      ball.speed.vx = -ball.speed.vx * COLLISION_FACTOR;
    }

    balls.forEach((otherBall) => {
      if (ball !== otherBall) {
        const dx = otherBall.x - ball.x;
        const dy = otherBall.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < ball.radius + otherBall.radius) {
          const normalX = dx / distance;
          const normalY = dy / distance;

          const relativeVelocityX = ball.speed.vx - otherBall.speed.vx;
          const relativeVelocityY = ball.speed.vy - otherBall.speed.vy;
          const dotProduct =
            normalX * relativeVelocityX + normalY * relativeVelocityY;
          ball.speed.vx -= dotProduct * normalX * COLLISION_FACTOR;
          ball.speed.vy -= dotProduct * normalY * COLLISION_FACTOR;
          otherBall.speed.vx += dotProduct * normalX * COLLISION_FACTOR;
          otherBall.speed.vy += dotProduct * normalY * COLLISION_FACTOR;
        }
      }
    });
  });

  if (!allStopped) {
    requestAnimationFrame(() => drawBalls(balls, ctx, canvas));
  }
};
