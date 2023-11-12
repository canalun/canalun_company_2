// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily

export function preventScroll() {
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

  // modern Chrome requires { passive: false } when adding event
  let supportsPassive = false;
  try {
    globalThis.addEventListener(
      "test",
      () => {},
      Object.defineProperty({}, "passive", {
        get: function () {
          return (supportsPassive = true);
        },
      }),
    );
  } catch (e) {
    ((_e) => {})(e);
  }

  const wheelOpt = supportsPassive ? { passive: false } : false;
  // mousewheel is completely deprecated
  // const wheelEvent = "onwheel" in document.createElement("div")
  //   ? "wheel"
  //   : "mousewheel";
  const wheelEvent = "wheel";

  // call this to Disable
  function disableScroll() {
    // globalThis.addEventListener("DOMMouseScroll", preventDefault, false); // completely deprecated
    globalThis.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    globalThis.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    globalThis.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  //   function enableScroll() {
  //     globalThis.removeEventListener("DOMMouseScroll", preventDefault, false);
  //     globalThis.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  //     globalThis.removeEventListener("touchmove", preventDefault, wheelOpt);
  //     globalThis.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  //   }

  disableScroll();
}
