import { IS_BROWSER } from "$fresh/runtime.ts";
import { main } from "@/utils/brick-block-anywhere-demo-funcs/main.ts";

// Do not maintain this code.
// This code is duplicated from the repo
// of brick-block-anywhere for demo purpose.

export default function BrickBlockAnywhere() {
  // Return any prerenderable JSX here which makes sense for your island
  if (!IS_BROWSER) return <div></div>;

  // document.bodyがpreventScrollで必要なので、読み込みが完了したときに実行する
  // また、iframeの要素が読み込まれてからブロックを計算したいのでcompleteかloadで実行する
  // (interactiveやDOMContentLoadedの段階ではない)
  globalThis.document.readyState === "complete"
    ? main()
    : globalThis.addEventListener("load", main);

  return <div></div>;
}
