import type { Ball } from "@/utils/brick-block-anywhere-demo-funcs/ball.ts";
import type { Bar } from "@/utils/brick-block-anywhere-demo-funcs/bar.ts";
import type { Block } from "@/utils/brick-block-anywhere-demo-funcs/blocks.ts";
import {
  ballSetting,
  barSetting,
} from "@/utils/brick-block-anywhere-demo-funcs/settings.ts";
import { updateBall } from "@/utils/brick-block-anywhere-demo-funcs/updateBall.ts";
import { requestBlockRemoveAnimation } from "@/utils/brick-block-anywhere-demo-funcs/updateBlocks.ts";

export function standby(ball: Ball, bar: Bar, blocks: Block[]) {
  // 最初はbarとballを動かせる
  globalThis.addEventListener("mousemove", TableAndBallMove);

  // クリックで始まるようにする
  globalThis.addEventListener("click", function start() {
    globalThis.removeEventListener("mousemove", TableAndBallMove);
    globalThis.addEventListener("mousemove", TableMove);

    // ボールの移動, 当たり判定の計算を開始する
    updateBall(ball, bar, blocks);
    // ブロックの描画を更新する
    requestBlockRemoveAnimation(blocks);

    // クリックイベントを削除する
    globalThis.removeEventListener("click", start);
  });

  function TableAndBallMove(e: MouseEvent) {
    bar.style.left = `${e.clientX - barSetting.width / 2}px`;
    ball.style.left = `${e.clientX - ballSetting.width / 2}px`;
  }
  function TableMove(e: MouseEvent) {
    bar.style.left = `${e.clientX - barSetting.width / 2}px`;
  }
}
