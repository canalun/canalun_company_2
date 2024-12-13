"use strict";
(() => {
  var n = (a) => {
    try {
      let e = JSON.parse(a);
      if (typeof e.type != "string") throw new Error("Bad Request");
      if (typeof e.data != "object") throw new Error("Bad Request");
      return e;
    } catch (e) {
      return { type: "none", data: {} };
    }
  };
  window.addEventListener("message", (a) => {
    let e = n(a.data);
    switch (e.type) {
      case "ready": {
        let t = document.getElementById(e.data.id);
        if (t instanceof HTMLIFrameElement) {
          let s = {
            type: "rendering",
            data: { src: t.getAttribute("data-content") },
          };
          t.contentWindow &&
            t.contentWindow.postMessage &&
            t.contentWindow.postMessage(JSON.stringify(s), "*");
        }
        break;
      }
      case "resize": {
        if (e.data.height <= 0) break;
        let t = document.getElementById(e.data.id);
        t instanceof HTMLIFrameElement && (t.height = `${e.data.height || 0}`);
        break;
      }
    }
  });
})();
