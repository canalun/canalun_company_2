import {
  ballId,
  ballSetting,
  ballZIndex,
  barSetting,
  initialBottom,
  numberOfCollisionPoints,
} from "@/utils/brick-block-anywhere-demo-funcs/settings.ts";
import {
  type Vector,
  vectorInnerProduct,
  vectorNorm,
  vectorProduction,
} from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export type Ball = HTMLDivElement & { _ball: never };

export function initializeBall(): Ball {
  const ball = document.createElement("div");
  ball.id = ballId;
  Object.assign(ball.style, {
    position: "fixed",
    left: `${globalThis.innerWidth / 2 - ballSetting.width / 2}px`,
    bottom: `${initialBottom + barSetting.height}px`,
    width: `${ballSetting.width}px`,
    height: `${ballSetting.height}px`,
    backgroundColor: ballSetting.color,
    borderRadius: "50%",
    zIndex: ballZIndex,
  });
  return ball as Ball; // phantom type
}

export function getBallCenterPosition(ball: Ball): Vector {
  const rect = ball.getBoundingClientRect();
  return {
    x: rect.left + ballSetting.width / 2,
    y: globalThis.innerHeight - rect.bottom + ballSetting.height / 2,
  };
}

// debug
// const divsForCollisionPointsOnBall: HTMLDivElement[] = []
// for (let i = 0; i < numberOfCollisionPoints; i++) {
//   const collisionPointOnBall = document.createElement("div")
//   Object.assign(collisionPointOnBall.style, {
//     position: "absolute",
//     width: "3px",
//     height: "3px",
//     backgroundColor: "black",
//     borderRadius: "50%",
//     zIndex: ballZIndex + 1
//   })
//   divsForCollisionPointsOnBall.push(collisionPointOnBall)
// }
// document.body.append(...divsForCollisionPointsOnBall)

export function getCollisionPointsOnBall(
  ballPosition: Vector,
  ballDirection: Vector,
  ballAbsoluteVelocity: Vector,
) {
  const ballVelocity = vectorProduction(ballDirection, ballAbsoluteVelocity);
  const normalizedBallVelocity = {
    x: ballVelocity.x / vectorNorm(ballVelocity),
    y: ballVelocity.y / vectorNorm(ballVelocity),
  };

  const collisionPointsOnBall: Vector[] = [];
  for (let i = 0; i < numberOfCollisionPoints; i++) {
    const theta = ((2 * Math.PI) / numberOfCollisionPoints) * i;
    const vectorForCollisionPoint = { x: Math.cos(theta), y: Math.sin(theta) };
    if (
      vectorInnerProduct(vectorForCollisionPoint, normalizedBallVelocity) > 0
    ) {
      collisionPointsOnBall.push({
        x: ballPosition.x + Math.cos(theta) * (ballSetting.width / 2),
        y: ballPosition.y + Math.sin(theta) * (ballSetting.height / 2),
      });
    }
  }

  // debug
  // for (let i = 0; i < collisionPointsOnBall.length; i++) {
  //   const collisionPointOnBall = collisionPointsOnBall[i]
  //   console.log(collisionPointOnBall)
  //   divsForCollisionPointsOnBall[i].style.left = `${collisionPointOnBall.x}px`
  //   divsForCollisionPointsOnBall[i].style.bottom = `${collisionPointOnBall.y}px`
  // }

  return collisionPointsOnBall;
}
