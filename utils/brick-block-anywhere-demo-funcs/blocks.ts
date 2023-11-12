import type { BlockInfo } from "@/utils/brick-block-anywhere-demo-funcs/inFrame.ts";
import {
  type GetBlocksRequestToFrame,
  type GetBlocksResponseToSource,
  sendRequestFromTopToAllFrames,
} from "@/utils/brick-block-anywhere-demo-funcs/message.ts";
import {
  ballId,
  barId,
} from "@/utils/brick-block-anywhere-demo-funcs/settings.ts";
import {
  isFrameElement,
  type Prettify,
} from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";
import * as uuid from "std/uuid/mod.ts";

export type Block = RealBlock | VirtualBlock;
export type RealBlock = {
  uuid: string;
  element: Element;
  rect: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  remain: boolean;
};
export type VirtualBlock = Prettify<
  Omit<RealBlock, "element"> & {
    element: null;
    rectInFrame: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    frameRect: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    source: MessageEventSource;
  }
>;

export function isRealBlock(block: Block): block is RealBlock {
  return block.element !== null;
}

export function getBlocks(): Block[] {
  const blockElements = getBlockElements();
  const blocks: Block[] = blockElements.map(convertElementToRealBlock);
  if (globalThis.top === globalThis.self) {
    getAndConcatBlocksFromChildFrames(blocks);
  }
  return blocks;
}

// 多段iframeやshadow DOMは無視！
export function getAndConcatBlocksFromChildFrames(blocks: Block[]): void {
  const frames = document.querySelectorAll("iframe, frame");
  // const frames = document.querySelectorAll("iframe, frame")
  const isDone = new Map<MessageEventSource, boolean>();

  const concatBlocksFromFrame = (
    event: MessageEvent<GetBlocksResponseToSource>,
  ) => {
    if (event.data.message !== "getBlocksResponse") {
      return;
    }
    console.log("受け取ったなりよ", event.data.blockInfoList);

    // virtualElementにして保存していく
    // まずは多段は無視で、1段目のframeの中のblockのみを考える
    // だからsrcFrameが見つからないものはスルーする
    const source = event.source as Window; // TODO: remove type assertion
    if (!source) {
      return;
    }
    const srcFrame = Array.from(frames)
      .filter(isFrameElement)
      .find((frame) => frame.contentWindow === source);
    console.log(srcFrame);
    if (srcFrame) {
      const _srcFrameRect = srcFrame.getBoundingClientRect();
      const srcFrameRect = {
        top: globalThis.innerHeight - _srcFrameRect.top,
        bottom: globalThis.innerHeight - _srcFrameRect.bottom,
        left: _srcFrameRect.left,
        right: _srcFrameRect.right,
      };
      const virtualBlocks = event.data.blockInfoList.map((info) => {
        return convertBlockInfoToVirtualBlock(info, source, srcFrameRect);
      });
      blocks.push(...virtualBlocks);
    }

    // すべてのiframeから受け取ったらremoveする
    isDone.set(source, true);
    if (isDone.size === frames.length) {
      globalThis.removeEventListener("message", concatBlocksFromFrame);
      console.log(blocks.filter((block) => !isRealBlock(block)));
    }
  };
  globalThis.addEventListener("message", concatBlocksFromFrame);

  sendRequestFromTopToAllFrames<GetBlocksRequestToFrame>({
    message: "getBlocksRequest",
  });
}

export function getBlockElements(): Element[] {
  const blockElements: Element[] = [];
  const canBeBlock = (el: Element) => {
    return isVisible(el) && !isTiny(el);
  };
  collectBlockElements(
    document.documentElement,
    canBeBlock,
    false,
    blockElements,
  );
  console.log(blockElements);
  return blockElements;
}

export function convertBlockInfoToVirtualBlock(
  blockInfo: BlockInfo,
  source: Window,
  srcFrameRect: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  },
): VirtualBlock {
  // 自分がアクセスできるframeの中のblockはframeの分のズレを計上する
  const rect = {
    top: blockInfo.rectInFrame.top + srcFrameRect.bottom,
    bottom: blockInfo.rectInFrame.bottom + srcFrameRect.bottom,
    left: blockInfo.rectInFrame.left + srcFrameRect.left,
    right: blockInfo.rectInFrame.right + srcFrameRect.left,
  };
  return {
    uuid: blockInfo.uuid,
    element: null,
    rect,
    frameRect: srcFrameRect,
    rectInFrame: blockInfo.rectInFrame,
    remain: blockInfo.remain,
    source,
  };
}

function convertElementToRealBlock(element: Element): RealBlock {
  return {
    uuid: uuid.v1.generate().toString(),
    element,
    rect: getRectOfRealBlock(element),
    remain: true,
  };
}

export function getRectOfRealBlock(element: Element) {
  const __rect = element.getBoundingClientRect();
  const _rect = {
    top: __rect.top,
    bottom: __rect.bottom,
    left: __rect.left,
    right: __rect.right,
  };

  // iframeの場合は位置を調整する
  // TODO: 多段iframe対応
  if (element.ownerDocument !== globalThis.document) {
    const _srcFrameRect = element.ownerDocument.defaultView?.frameElement
      ?.getBoundingClientRect();
    if (!_srcFrameRect) {
      throw new Error("srcFrameRect not found");
    }
    _rect.top += _srcFrameRect.top;
    _rect.bottom += _srcFrameRect.top;
    _rect.left += _srcFrameRect.left;
    _rect.right += _srcFrameRect.left;
  }

  const rect = {
    top: globalThis.innerHeight - _rect.top,
    bottom: globalThis.innerHeight - _rect.bottom,
    left: _rect.left,
    right: _rect.right,
  };

  return rect;
}

function collectBlockElements(
  element: Element,
  _canBeBlock: (el: Element) => boolean,
  isParentElementTiny: boolean,
  blockElements: Element[],
) {
  const canBeBlock = isParentElementTiny
    ? (el: Element) => !isOverflowHidden(el) && _canBeBlock(el)
    : _canBeBlock;

  if (canBeBlock(element)) {
    blockElements.push(element);
  }
  // iframe対応
  if (isFrameElement(element)) {
    if (element.contentDocument?.readyState === "complete") {
      console.log("ready");
      collectBlockElements(
        element.contentDocument.documentElement,
        _canBeBlock,
        isTiny(element) || isParentElementTiny,
        blockElements,
      );
    } else {
      element.addEventListener("load", () => {
        element.contentDocument &&
          collectBlockElements(
            element.contentDocument.documentElement,
            _canBeBlock,
            isTiny(element) || isParentElementTiny,
            blockElements,
          );
      });
    }
  } else {
    const children = Array.from(element.children);
    for (const child of children) {
      collectBlockElements(
        child,
        _canBeBlock,
        isTiny(element) || isParentElementTiny,
        blockElements,
      );
    }
    // shadow DOM対応
    if (element.shadowRoot) {
      for (const child of Array.from(element.shadowRoot.children)) {
        collectBlockElements(
          child,
          _canBeBlock,
          isTiny(element) || isParentElementTiny,
          blockElements,
        );
      }
    }
  }
}

// まずcheckVisibilityで最低限の可視性は担保する
// そのうえで枠線も背景色もない、かつtextNodeを直接の子要素として持たない要素は見えないと判断する
// TODO: iframe内要素についてはrectのintersectをとって枠内にいるか判定する
function isVisible(element: Element): boolean {
  if (
    element.id === ballId ||
    element.id === barId ||
    element.tagName === "BODY"
  ) {
    return false;
  }

  if (
    // TODO: polyfill
    element.checkVisibility &&
    !element.checkVisibility({ checkVisibilityCSS: true, checkOpacity: true })
  ) {
    return false;
  }

  if (
    element.tagName === "IMG" ||
    element.tagName === "VIDEO" ||
    element.tagName === "svg"
  ) {
    return true;
  }

  if (
    hasNoBorder(element) &&
    hasNoBackgroundColor(element) &&
    // hasNoBackgroundImage(element) &&
    hasNoShadow(element)
  ) {
    const childNodes = Array.from(element.childNodes);
    const hasTextNode = childNodes.some(
      (node) =>
        node.nodeType === Node.TEXT_NODE &&
        node.textContent &&
        node.textContent.trim(),
    );
    if (!hasTextNode) {
      return false;
    }
  }
  return true;
}

// 幅や高さが0の要素は見えない、また高さと幅がともに5以下の要素は微小要素であると判断する
// (高さが5だけどめちゃ平べったい要素に注意)
const isTinyCache = new Map<Element, boolean>();
function isTiny(element: Element): boolean {
  const cache = isTinyCache.get(element);
  if (cache) {
    return cache;
  } else {
    const rect = element.getBoundingClientRect();
    const result = rect.width === 0 ||
        rect.height === 0 ||
        (rect.width <= 5 && rect.height <= 5)
      ? true
      : false;
    isTinyCache.set(element, result);
    return result;
  }
}

function isOverflowHidden(element: Element): boolean {
  const style = getComputedStyleUsingCache(element);
  if (
    style.overflowX === "hidden" ||
    style.overflowY === "hidden" ||
    style.overflow === "hidden"
  ) {
    return true;
  }
  return false;
}

function hasNoBorder(element: Element): boolean {
  const bodyBackgroundColor =
    globalThis.getComputedStyle(globalThis.document.body).backgroundColor;
  const style = getComputedStyleUsingCache(element);
  return (
    style.border === "" ||
    style.borderStyle === "none" ||
    style.borderWidth === "0px" ||
    style.borderColor === bodyBackgroundColor ||
    style.borderColor === "transparent" ||
    (() => {
      const result = style.borderColor.match(/rgba\(.*0\)/)?.length;
      return !!result && result > 0;
    })()
  );
}

function hasNoShadow(element: Element): boolean {
  const style = getComputedStyleUsingCache(element);
  return (
    style.boxShadow === "" ||
    style.boxShadow === "none" ||
    (() => {
      const result = style.boxShadow.match(/rgba\(.*0\)/)?.length;
      return !!result && result > 0;
    })()
  );
}

function hasNoBackgroundColor(element: Element): boolean {
  const bodyBackgroundColor =
    globalThis.getComputedStyle(globalThis.document.body).backgroundColor;
  const style = getComputedStyleUsingCache(element);
  return (
    style.backgroundColor === "" ||
    style.backgroundColor === bodyBackgroundColor ||
    (() => {
      const result = style.backgroundColor.match(/rgba\(.*0\)/)?.length;
      return !!result && result > 0;
    })()
  );
}

// ref: twitterは画像のプレビューをdiv要素でbackground-imageで実装している
// function hasNoBackgroundImage(element: Element): boolean {
//   const style = getComputedStyleUsingCache(element)
//   return style.backgroundImage === ""
// }

const styleCache = new Map<Element, CSSStyleDeclaration>();
export function getComputedStyleUsingCache(
  element: Element,
): CSSStyleDeclaration {
  const cache = styleCache.get(element);
  if (cache) {
    return cache;
  } else {
    const style = getComputedStyle(element);
    styleCache.set(element, style);
    return style;
  }
}
