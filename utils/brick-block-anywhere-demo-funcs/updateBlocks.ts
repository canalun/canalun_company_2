import {
  type Block,
  getComputedStyleUsingCache,
  getRectOfRealBlock,
  isRealBlock,
  type RealBlock,
} from "@/utils/brick-block-anywhere-demo-funcs/blocks.ts";
import { isElement } from "@/utils/brick-block-anywhere-demo-funcs/lodash.ts";
import {
  isFrameElement,
} from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export function requestBlockRemoveAnimation(
  blocks: Block[],
) {
  requestAnimationFrame(() => {
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (!block.remain) {
        removeBlockAndUpdateBlocksPosition(block, blocks);
        blocks.splice(i, 1);
        // visualizeBlocks(blocks)
      }
    }
    requestAnimationFrame(() => requestBlockRemoveAnimation(blocks));
  });
}

export function removeBlockAndUpdateBlocksPosition(
  block: Block,
  blocks: Block[],
) {
  if (isRealBlock(block)) {
    removeRealBlockAndUpdateBlocksPosition(block, blocks);
  }
}

// 一瞬だけ赤くして消す
function removeRealBlockAndUpdateBlocksPosition(
  block: RealBlock,
  blocks: Block[],
) {
  const originalBorderWidth =
    getComputedStyleUsingCache(block.element).borderWidth;
  const element = block.element as HTMLElement; // TODO: remove type assertion
  element.style.border = "1px solid red";
  element.style.borderWidth = originalBorderWidth;

  setTimeout(() => {
    // if (
    //   block.element.tagName === "IMG" ||
    //   block.element.tagName === "VIDEO" ||
    //   block.element.tagName === "svg"
    // ) {
    //   removePictureBlock(block);
    // } else {
    //   removeNonPictureBlock(block);
    // }
    removeBlock(block);
    updatePositionOfBlocksByRealBlockRemoval(blocks);
  }, 100);
}

// virtual blockの位置もframeの位置変更情報をもとに更新することに注意
function updatePositionOfBlocksByRealBlockRemoval(blocks: Block[]) {
  for (const block of blocks) {
    if (!block.remain) {
      return;
    }
    if (isRealBlock(block)) {
      const rect = getRectOfRealBlock(block.element);
      Object.assign(block, { rect });
    } else {
      // MEMO: 問題が起きたらキャッシュをやめるが、時間がかかっていたのでキャッシュにする
      const frames = document.querySelectorAll("iframe, frame");
      // const frames = document.querySelectorAll("iframe, frame")
      const srcFrame = Array.from(frames)
        .filter(isFrameElement)
        .find((frame) => {
          return frame.contentWindow === block.source;
        });
      if (!srcFrame) {
        return;
      }
      const _srcFrameRect = srcFrame.getBoundingClientRect();
      const srcFrameRect = {
        top: globalThis.innerHeight - _srcFrameRect.top,
        bottom: globalThis.innerHeight - _srcFrameRect.bottom,
        left: _srcFrameRect.left,
        right: _srcFrameRect.right,
      };
      const rect = {
        top: block.rectInFrame.top + srcFrameRect.bottom,
        bottom: block.rectInFrame.bottom + srcFrameRect.bottom,
        left: block.rectInFrame.left + srcFrameRect.left,
        right: block.rectInFrame.right + srcFrameRect.left,
      };
      Object.assign(
        block,
        { frameRect: srcFrameRect, rect },
      );
    }
  }
}

function removeBlock(block: RealBlock) {
  // frame elementはvisibilityを変えると全て消えてしまうので、CSSの調整で消す
  if (isFrameElement(block.element)) {
    Object.assign(block.element.style, {
      backgroundColor: "transparent",
      borderColor: "transparent",
      boxShadow: "none",
    });
    return;
  }
  Object.assign(block.element.style, {
    visibility: "hidden",
  });
  Array.from(block.element.childNodes).forEach((node) => {
    if (!isElement(node)) return;
    if (getComputedStyleUsingCache(node).visibility === "hidden") return;
    Object.assign(node.style, {
      visibility: "visible",
    });
  });
}

// // 画像や動画の場合は同じ大きさで透明の要素に置換する
// function removePictureBlock(block: RealBlock) {
//   if (!block.element.parentElement) {
//     return;
//   }
//   const rect = block.element.getBoundingClientRect();
//   const element = document.createElement("div");
//   Object.assign(element.style, {
//     position: getComputedStyle(block.element).position,
//     top: `${rect.top}px`,
//     left: `${rect.left}px`,
//     width: `${rect.width}px`,
//     height: `${rect.height}px`,
//   });
//   block.element.parentElement.insertBefore(element, block.element);
//   block.element.remove();
//   return;
// }

// // 背景とボーダーを透明にし、そのうえで自分が持つテキストを見えないようにする
// // 子要素のテキストは消さないように注意
// function removeNonPictureBlock(block: RealBlock) {
//   assert(
//     "style" in block.element &&
//       block.element.style instanceof CSSStyleDeclaration,
//     "unexpected block.element.style",
//   );
//   Object.assign(block.element.style, {
//     backgroundColor: "transparent",
//     borderColor: "transparent",
//     boxShadow: "none",
//   });
//   // textNodeを見えないようにしたいがcolorを変えると子要素に伝播するおそれがあるため置換で対応
//   const textNodes = Array.from(block.element.childNodes).filter(
//     (node) => node.nodeType === Node.TEXT_NODE,
//   );
//   requestAnimationFrame(() => {
//     textNodes.forEach((node) => {
//       if (!node.textContent || !node.parentElement) {
//         return;
//       }
//       // preタグはマージンが挟まるなど使い勝手が悪い
//       // 一方で普通のスペースを使ってもspanタグの中に入れると無視される
//       // そこでString.fromCharCode(160)、つまりnbsp(=non-breaking space)を使って空白を表現する
//       // String.fromCharCode(160)は&nbsp;と同じだが、replace関数で後者を文字列として入れるとエスケープされず意味がなくなることに注意
//       // またnbspは定義より改行されなくなるのでwbrで改行を入れる
//       // TODO: 全角文字対応
//       for (let i = 0; i < node.textContent.length; i++) {
//         // 単語はもともと改行されないのでwbrを入れない
//         if (node.textContent[i] === " ") {
//           const nbsp = document.createTextNode(String.fromCharCode(160));
//           const wbr = document.createElement("wbr");
//           node.parentElement.insertBefore(wbr, node);
//           node.parentElement.insertBefore(nbsp, node);
//           node.parentElement.insertBefore(wbr, node);
//         } else {
//           const nbsp = document.createTextNode(String.fromCharCode(160));
//           node.parentElement.insertBefore(nbsp, node);
//         }
//       }
//       node.remove();
//     });
//   });
// }
