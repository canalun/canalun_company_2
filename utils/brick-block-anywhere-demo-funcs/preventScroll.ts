// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
// の方法はボールとバーのスマホでのtouchmoveによる移動もできなくしてしまうのでダメ
// https://xn--nckmepf1g6g.com/2022/06/15/scroll/ を採用した

import { isFrameElement } from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export function preventScroll(window: Window) {
  const scrollTop = window.scrollY;
  Object.assign(window.document.body.style, {
    top: `${scrollTop * -1}px`,
    left: "0",
    right: "0",
    position: "fixed",
    overflow: "hidden",
  });

  Array.from(window.document.querySelectorAll("iframe, frame")).forEach(
    (frame) => {
      isFrameElement(frame) && frame.contentWindow &&
        preventScroll(frame.contentWindow);
      frame.addEventListener("load", () => {
        isFrameElement(frame) && frame.contentWindow &&
          preventScroll(frame.contentWindow);
      });
    },
  );
}
