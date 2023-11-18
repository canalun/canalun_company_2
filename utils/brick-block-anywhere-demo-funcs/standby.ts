import type { Ball } from "@/utils/brick-block-anywhere-demo-funcs/ball.ts";
import type { Bar } from "@/utils/brick-block-anywhere-demo-funcs/bar.ts";
import type { Block } from "@/utils/brick-block-anywhere-demo-funcs/blocks.ts";
import {
  ballSetting,
  barSetting,
} from "@/utils/brick-block-anywhere-demo-funcs/settings.ts";
import { updateBall } from "@/utils/brick-block-anywhere-demo-funcs/updateBall.ts";
import { requestBlockRemoveAnimation } from "@/utils/brick-block-anywhere-demo-funcs/updateBlocks.ts";
import { setSoundEffect } from "@/utils/brick-block-anywhere-demo-funcs/soundEffect.ts";

export function standby(ball: Ball, bar: Bar, blocks: Block[]) {
  const ring = setSoundEffect();

  // 最初はbarとballを動かせる
  globalThis.addEventListener("mousemove", TableAndBallMove);
  globalThis.addEventListener("touchmove", TableAndBallMove);

  // クリックで始まるようにする
  globalThis.addEventListener("click", function start() {
    // クリックイベントを削除する
    globalThis.removeEventListener("click", start);

    globalThis.removeEventListener("mousemove", TableAndBallMove);
    globalThis.removeEventListener("touchmove", TableAndBallMove);

    globalThis.addEventListener("mousemove", TableMove);
    globalThis.addEventListener("touchmove", TableMove);

    // ボールの移動, 当たり判定の計算を開始する
    updateBall(ball, bar, blocks);
    // ブロックの描画を更新する
    requestBlockRemoveAnimation(blocks, ring);
  });

  function TableAndBallMove(e: MouseEvent | TouchEvent) {
    const { x } = getXYFromTouchEvent(e);
    bar.style.left = `${x - barSetting.width / 2}px`;
    ball.style.left = `${x - ballSetting.width / 2}px`;
  }
  function TableMove(e: MouseEvent | TouchEvent) {
    const { x } = getXYFromTouchEvent(e);
    bar.style.left = `${x - barSetting.width / 2}px`;
  }
}

function getXYFromTouchEvent(event: TouchEvent | MouseEvent) {
  console.log(event.type);
  if (event instanceof MouseEvent) {
    return { x: event.clientX, y: event.clientY };
  } else {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }
}
