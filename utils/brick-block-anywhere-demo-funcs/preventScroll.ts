// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily

import { isFrameElement } from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export function preventScroll(window: Window) {
  const keys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowDown",
    "ArrowUp",
    "End",
    "Home",
    "PageDown",
    "PageUp",
    "Space",
  ];

  function preventDefault(
    e: KeyboardEvent | WheelEvent | TouchEvent,
  ) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e: KeyboardEvent) {
    if (keys.indexOf(e.key) !== -1) {
      preventDefault(e);
      return false;
    }
  }

  //   // modern Chrome requires { passive: false } when adding event
  //   let supportsPassive = false;
  //   try {
  //     window.addEventListener(
  //       "test",
  //       () => {},
  //       Object.defineProperty({}, "passive", {
  //         get: function () {
  //           return (supportsPassive = true);
  //         },
  //       }),
  //     );
  //   } catch (e) {
  //     ((_e) => {})(e);
  //   }

  // assume modern browsers
  // const wheelOpt = supportsPassive ? { passive: false } : false;
  // const wheelEvent = "onwheel" in document.createElement("div")
  //   ? "wheel"
  //   : "mousewheel";
  const wheelOpt = { passive: false, capture: true };
  const wheelEvent = "wheel";

  // call this to Disable
  function disableScroll() {
    // window.addEventListener("DOMMouseScroll", preventDefault, false); // completely deprecated
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, wheelOpt);
  }

  // call this to Enable
  //   function enableScroll() {
  //     window.removeEventListener("DOMMouseScroll", preventDefault, false);
  //     window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  //     window.removeEventListener("touchmove", preventDefault, wheelOpt);
  //     window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  //   }

  disableScroll();
  Array.from(window.document.querySelectorAll("iframe, frame")).forEach(
    (frame) => {
      isFrameElement(frame) && frame.contentWindow &&
        preventScroll(frame.contentWindow);
    },
  );
}
