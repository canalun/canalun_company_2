import { resolvePath } from "@/utils/resolvePath.ts";

export function CeoImg() {
  const srcs = [];
  for (const dirEntry of Deno.readDirSync(resolvePath("../static/CEOs"))) {
    srcs.push(dirEntry.name);
  }
  const chosenSrc = srcs[Math.floor(Math.random() * srcs.length)];

  const width = 395;
  const height = 395;

  return <img width={width} height={height} src={"/CEOs/" + chosenSrc} />;
}
