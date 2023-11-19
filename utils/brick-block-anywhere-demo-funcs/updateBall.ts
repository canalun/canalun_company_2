import type { Ball } from "@/utils/brick-block-anywhere-demo-funcs/ball.ts";
import {
  getBallCenterPosition,
  getCollisionPointsOnBall,
} from "@/utils/brick-block-anywhere-demo-funcs/ball.ts";
import type { Bar } from "@/utils/brick-block-anywhere-demo-funcs/bar.ts";
import type { Block } from "@/utils/brick-block-anywhere-demo-funcs/blocks.ts";
import {
  updateDirectionByCollisionWithBar,
  updateDirectionByCollisionWithBlocks,
  updateDirectionByCollisionWithWall,
} from "@/utils/brick-block-anywhere-demo-funcs/detectCollision.ts";
import {
  ballAcceleration,
  initialBallAbsoluteVelocity,
  initialBallDirection,
} from "@/utils/brick-block-anywhere-demo-funcs/settings.ts";
import type { Vector } from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";
import {
  vectorAdd,
  vectorProduction,
} from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export function updateBall(
  ball: Ball,
  bar: Bar,
  blocks: Block[],
  ringSoundEffect: () => void,
) {
  // ここにアニメーションを書く
  // 1. ボールを動かす。ただしボールが壁に当たったら反射する
  // 3. ボールがブロックに当たったらブロックを消す
  // 4. ブロックがなくなったらゲーム終了

  let currentBallAbsoluteVelocity: Vector = initialBallAbsoluteVelocity;
  let currentBallDirection: Vector = initialBallDirection;
  let currentBallVelocity: Vector = vectorProduction(
    currentBallAbsoluteVelocity,
    currentBallDirection,
  );

  requestAnimationFrame(() => {
    updateBallPositionAndVelocity(ball);
  });

  function updateBallPositionAndVelocity(ball: Ball): void {
    updateBallVelocity(ball);
    updateBallPosition(ball);
    requestAnimationFrame(() => updateBallPositionAndVelocity(ball));
  }

  function updateBallPosition(ball: Ball): void {
    Object.assign(ball.style, {
      left: `${parseInt(ball.style.left) + currentBallVelocity.x}px`,
      bottom: `${parseInt(ball.style.bottom) + currentBallVelocity.y}px`,
    });
  }

  function updateBallVelocity(ball: Ball): void {
    // acceleration
    currentBallAbsoluteVelocity = getUpdatedBallAbsoluteVelocity(
      currentBallAbsoluteVelocity,
    );

    // collision detection
    currentBallDirection = getUpdatedBallDirection(
      ball,
      bar,
      blocks,
      currentBallDirection,
      currentBallAbsoluteVelocity,
      ringSoundEffect,
    );

    currentBallVelocity = vectorProduction(
      currentBallAbsoluteVelocity,
      currentBallDirection,
    );
  }
}

function getUpdatedBallAbsoluteVelocity(currentBallAbsoluteVelocity: Vector) {
  return vectorAdd(currentBallAbsoluteVelocity, ballAcceleration);
}

function getUpdatedBallDirection(
  ball: Ball,
  bar: Bar,
  blocks: Block[],
  currentBallDirection: Vector,
  currentBallAbsoluteVelocity: Vector,
  ringSoundEffect: () => void,
): Vector {
  const collisionPointsOnBall = getCollisionPointsOnBall(
    getBallCenterPosition(ball),
    currentBallDirection,
    currentBallAbsoluteVelocity,
  );

  const directionUpdatedByWall = updateDirectionByCollisionWithWall(
    collisionPointsOnBall,
    currentBallDirection,
  );

  const directionUpdatedByBar = updateDirectionByCollisionWithBar(
    collisionPointsOnBall,
    bar,
    directionUpdatedByWall,
  );

  const directionUpdatedByBlock = updateDirectionByCollisionWithBlocks(
    collisionPointsOnBall,
    blocks,
    directionUpdatedByBar,
  );

  if (
    directionUpdatedByBlock.x !== currentBallDirection.x ||
    directionUpdatedByBlock.y !== currentBallDirection.y
  ) {
    ringSoundEffect();
  }

  return directionUpdatedByBlock;
}
