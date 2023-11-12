import { initializeBall } from "@/utils/brick-block-anywhere-demo-funcs/ball.ts";
import { initializeBar } from "@/utils/brick-block-anywhere-demo-funcs/bar.ts";
import { getBlocks } from "@/utils/brick-block-anywhere-demo-funcs/blocks.ts";
import {
  ballSetting,
  barSetting,
  initialBottom,
  veilZIndex,
} from "@/utils/brick-block-anywhere-demo-funcs/settings.ts";
import { standby } from "@/utils/brick-block-anywhere-demo-funcs/standby.ts";
import { preventScroll } from "@/utils/brick-block-anywhere-demo-funcs/preventScroll.ts";

// Do not maintain this code.
// This code is duplicated from the repo
// of brick-block-anywhere for demo purpose.

export function main() {
  // ページ凍結
  if (!window.top) return;
  preventScroll(window.top);
  for (let i = 0; i < 65535; i++) {
    clearTimeout(i);
  }

  // 余白を作ってボールと台を描画する
  const { ball, table } = initializeBallAndBar();

  // ブロックを計算する
  const blocks = getBlocks();

  // ページに触れないように薄い膜をはる
  initializeVeil();

  // クリックで始まるようにする
  try {
    standby(ball, table, blocks);
  } catch (e) {
    console.log(e);
  }
}

function initializeVeil() {
  const veil = document.createElement("div");
  Object.assign(veil.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: `rgba(0, 0, 0, 0)`,
    zIndex: veilZIndex,
  });
  document.body.appendChild(veil);
}

function initializeBallAndBar() {
  // 余白
  const bottomRoom = document.createElement("div");
  document.documentElement.appendChild(bottomRoom);
  Object.assign(bottomRoom.style, {
    position: "absolute",
    width: "100%",
    height: `${
      initialBottom +
      barSetting.height +
      ballSetting.height +
      initialBottom * 1.5
    }px`,
  });

  globalThis.scroll({
    left: 0,
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
  console.log("scroll to bottom");

  const ball = initializeBall();
  const table = initializeBar();

  // 画面の最下端にボールとテーブルをセットで描画する
  document.body.appendChild(ball);
  document.body.appendChild(table);

  return { ball, table };
}
