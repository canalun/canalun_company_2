import { resolve } from "../utils/pathResolver.ts";

export function CeoImg() {
  const chosenSrc = (() => {
    const srcs = [];
    for (const dirEntry of Deno.readDirSync(resolve("../static/CEOs"))) {
      srcs.push(dirEntry.name);
    }
    return srcs[Math.round(Math.random() * srcs.length)];
  })();

  return <img src={"/CEOs/" + chosenSrc} />;
}
