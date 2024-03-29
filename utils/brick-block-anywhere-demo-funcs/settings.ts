import type { Vector } from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export const ballId = "dom_breaker_ball";
export const barId = "dom_breaker_bar";

type BarSetting = {
  width: number;
  height: number;
  color: string;
};

export const barSetting: BarSetting = (() => {
  const width = globalThis.innerWidth * 0.28;
  return {
    width,
    height: Math.max(10 * width / 250, 10),
    color: "blue",
  };
})();

type BallSetting = {
  width: number;
  height: number;
  color: string;
};
export const ballSetting: BallSetting = (() => {
  const width = globalThis.innerWidth * 0.2;
  return {
    width: Math.max(10 * width / 250, 25),
    height: Math.max(10 * width / 250, 25),
    color: "red",
  };
})();

export const initialBottom = 30;

export const ballZIndex = 2147483646;
export const barZIndex = ballZIndex;
export const veilZIndex = ballZIndex - 1;

// per frame
export const initialBallAbsoluteVelocity: Vector = {
  x: 2.5,
  y: 2.5,
};
export const initialBallDirection: Vector = {
  x: 1,
  y: 1,
};
// per frame
export const ballAcceleration: Vector = {
  x: 0.002,
  y: 0.002,
};

export const numberOfCollisionPoints = 36;
export const widthOfEdgeOfCollisionWithBlocks = 3;
