import { IS_BROWSER } from "$fresh/runtime.ts";
import { main } from "@/utils/brick-block-anywhere-demo-funcs/main.ts";

// Do not maintain this code.
// This code is duplicated from the repo
// of brick-block-anywhere for demo purpose.

export default function BrickBlockAnywhere() {
  // Return any prerenderable JSX here which makes sense for your island
  if (!IS_BROWSER) return <div></div>;

  main();
  return <div></div>;
}