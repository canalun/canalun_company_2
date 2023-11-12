import {
  barId,
  barSetting,
  barZIndex,
  initialBottom,
} from "@/utils/brick-block-anywhere-demo-funcs/settings.ts";
import type { Vector } from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export type Bar = HTMLDivElement & { _bar: never };

export function initializeBar(): Bar {
  const bar = document.createElement("div");
  bar.id = barId;
  Object.assign(bar.style, {
    position: "fixed",
    left: `${globalThis.innerWidth / 2 - barSetting.width / 2}px`,
    bottom: `${initialBottom}px`,
    width: `${barSetting.width}px`,
    height: `${barSetting.height}px`,
    backgroundColor: barSetting.color,
    zIndex: barZIndex,
  });
  return bar as Bar;
}

export function getBarCenterPosition(bar: Bar): Vector {
  const rect = bar.getBoundingClientRect();
  return {
    x: rect.left + barSetting.width / 2,
    y: globalThis.innerHeight - rect.bottom + barSetting.height / 2,
  };
}
