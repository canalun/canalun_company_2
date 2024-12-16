import { IS_BROWSER } from "$fresh/runtime.ts";

export default function MagicFrame(props: { src: string }) {
  if (!IS_BROWSER) return <div></div>;

  const addInfo = (a) => console.log(a);

  const f = document.createElement("iframe");
  f.src = props.src;
  document.body.appendChild(f);

  // let secret: null | string = null;
  // function stop(e: Event) {
  //   e.stopPropagation();
  //   console.log("blocked:", e);
  // }
  // function block(e: Event) {
  //   secret = e.detail;
  //   console.log("block f set: secret:", secret);
  //   secret && f.contentWindow!.addEventListener(secret, stop, true);
  // }
  // f.contentWindow!.addEventListener("ddg-secret", block);

  // override window.dispatchEvent, document.dispatchEvent, CustomEvent constructor, window.postMessage, window.addEventListener, document.addEventListener, MessagePort.postMessage

  const originalPostMessage = f.contentWindow.postMessage;
  f.contentWindow.postMessage = function (message, targetOrigin, transfer) {
    const withTransfer = transfer ? "yes" : "no";
    addInfo(`----windowPostMessage----`);
    addInfo(`message: ${JSON.stringify(message)}`);
    addInfo(`targetOrigin: ${targetOrigin}`);
    addInfo(`withTransfer: ${withTransfer}`);
    return originalPostMessage(message, targetOrigin, transfer);
  };

  const originalWindowDispatchEvent = f.contentWindow.dispatchEvent;
  f.contentWindow.dispatchEvent = function (event) {
    addInfo(`----windowDispatchEvent----`);
    addInfo(`event-type: ${JSON.stringify(event.type)}`);
    addInfo(`event: ${JSON.stringify(event)}`);
    return originalWindowDispatchEvent(event);
  };

  const originalDocumentDispatchEvent = f.contentDocument.dispatchEvent;
  f.contentDocument.dispatchEvent = function (event) {
    addInfo(`----documentDispatchEvent----`);
    addInfo(`event: ${JSON.stringify(event)}`);
    return originalDocumentDispatchEvent(event);
  };

  const originalCustomEvent = f.contentWindow.CustomEvent;
  f.contentWindow.CustomEvent = function (type, eventInitDict) {
    addInfo(`----CustomEvent----`);
    addInfo(`type: ${type}`);
    addInfo(`eventInitDict: ${eventInitDict}`);
    for (const key in eventInitDict) {
      addInfo(`key: ${key}, value: ${eventInitDict[key]}`);
    }
    console.log(eventInitDict);
    return new originalCustomEvent(type, eventInitDict);
  };

  const originalWindowAddEventListener = f.contentWindow.addEventListener;
  f.contentWindow.addEventListener = function (type, listener, options) {
    addInfo(`----windowAddEventListener----`);
    addInfo(`type: ${type}`);
    addInfo(`listener: ${listener}`);
    addInfo(`options: ${JSON.stringify(options)}`);

    return originalWindowAddEventListener(
      type,
      (e) => {
        addInfo(`---window.addEventListener fired----`);
        addInfo(`type: ${e.type}, data: ${JSON.stringify(e.data)}`);
        listener(e);
      },
      options
    );
  };

  const originalDocumentAddEventListener = f.contentDocument.addEventListener;
  f.contentDocument.addEventListener = function (type, listener, options) {
    addInfo(`----documentAddEventListener----`);
    addInfo(`type: ${type}`);
    addInfo(`listener: ${listener}`);
    addInfo(`options: ${JSON.stringify(options)}`);
    return originalDocumentAddEventListener(
      type,
      (e) => {
        console.log(
          `document.addEventListener fired. type: ${e.type}, data: ${e.data}`
        );
        listener(e);
      },
      options
    );
  };

  const originalPortPostMessage =
    f.contentWindow.MessagePort.prototype.postMessage;
  f.contentWindow.MessagePort.prototype.postMessage = function (
    message,
    transfer
  ) {
    const withTransfer = transfer ? "yes" : "no";
    addInfo(`----portPostMessage----`);
    addInfo(`message: ${JSON.stringify(message)}`);
    addInfo(`withTransfer: ${withTransfer}`);
    return originalPortPostMessage.call(this, message, transfer);
  };

  const originalFetch = f.contentWindow.fetch;
  f.contentWindow.fetch = function (url, options) {
    addInfo(`----fetch----`);
    addInfo(`url: ${url}`);
    addInfo(`options: ${JSON.stringify(options)}`);
    return originalFetch(url, options);
  };

  return null;
}
