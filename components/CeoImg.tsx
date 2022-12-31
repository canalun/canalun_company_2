import { resolve } from "../utils/pathResolver.ts";

export function CeoImg() {
  const srcs = [];
  for (const dirEntry of Deno.readDirSync(resolve("../static/CEOs"))) {
    srcs.push(dirEntry.name);
  }
  const chosenSrc = srcs[Math.round(Math.random() * (srcs.length - 1))];

  const width = 395;
  const height = 395;

  return <img width={width} height={height} src={"/CEOs/" + chosenSrc} />;
}
