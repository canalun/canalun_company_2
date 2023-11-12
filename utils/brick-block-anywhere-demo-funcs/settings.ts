import type { Vector } from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export const ballId = "dom_breaker_ball";
export const barId = "dom_breaker_bar";

type BarSetting = {
  width: number;
  height: number;
  color: string;
};
export const barSetting: BarSetting = {
  width: 250,
  height: 10,
  color: "blue",
};

type BallSetting = {
  width: number;
  height: number;
  color: string;
};
export const ballSetting: BallSetting = {
  width: 25,
  height: 25,
  color: "red",
};

export const initialBottom = 30;

export const ballZIndex = 2147483646;
export const barZIndex = 2147483646;
export const veilZIndex = 2147483645;

// per frame
export const initialBallAbsoluteVelocity: Vector = {
  x: 1.2,
  y: 1.2,
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
