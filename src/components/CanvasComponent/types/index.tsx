export type Speed = {
    vx: number;
    vy: number;
};

export type BallData = {
    id: number;
    x: number;
    y: number;
    speed: Speed;
    radius: number;
    color: string;
};

export type Ball = BallData & {
    draw: (ctx: CanvasRenderingContext2D) => void;
    isPointInside: (x: number, y: number) => boolean;
};