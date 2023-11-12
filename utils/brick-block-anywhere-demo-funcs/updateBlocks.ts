import {
  type Block,
  getComputedStyleUsingCache,
  isRealBlock,
  type RealBlock,
  type VirtualBlock,
} from "@/utils/brick-block-anywhere-demo-funcs/blocks.ts";
import {
  type RemoveBlockRequestToFrame,
  type RemoveBlockResponseToSource,
  sendRequest,
} from "@/utils/brick-block-anywhere-demo-funcs/message.ts";
import {
  assert,
  isFrameElement,
} from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";
import { isElement } from "@/utils/brick-block-anywhere-demo-funcs/lodash.ts";

export function requestBlockRemoveAnimation(blocks: Block[]) {
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
  } else {
    removeVirtualBlockAndUpdateBlocksPosition(block, blocks);
  }
}

// 一瞬だけ赤くして消す
function removeRealBlockAndUpdateBlocksPosition(
  block: RealBlock,
  blocks: Block[],
) {
  assert(
    "style" in block.element &&
      block.element.style instanceof CSSStyleDeclaration,
    "unexpected block.element.style",
  );
  const originalBorderWidth =
    getComputedStyleUsingCache(block.element).borderWidth;
  block.element.style.border = "1px solid red";
  block.element.style.borderWidth = originalBorderWidth;

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

// 消えたVirtual Blockのuuidをフレームに送って、フレーム内でblock消去処理を実施
// そのあとそれによって更新されたフレーム内のblockInfoListを受け取って、
// それをもとにVirtual Blockの位置情報を更新する
// TODO: 多段フレーム
function removeVirtualBlockAndUpdateBlocksPosition(
  removedVirtualBlock: VirtualBlock,
  blocks: Block[],
) {
  const updateBlocksByRemoveBlockResponse = (
    event: MessageEvent<RemoveBlockResponseToSource>,
  ) => {
    if (event.data.message !== "removeBlockResponse") {
      return;
    }

    // create map just for optimization
    const uuidMapForOptimization = new Map<string, VirtualBlock>();
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (!isRealBlock(block)) {
        uuidMapForOptimization.set(blocks[i].uuid, block);
      }
    }

    const updatedBlockInfoList = event.data.blockInfoList;
    for (let i = 0; i < updatedBlockInfoList.length; i++) {
      const blockToBeUpdated = uuidMapForOptimization.get(
        updatedBlockInfoList[i].uuid,
      );
      if (!blockToBeUpdated) {
        continue;
      }
      Object.assign(
        blockToBeUpdated,
        {
          rect: {
            top: updatedBlockInfoList[i].rectInFrame.top +
              blockToBeUpdated.frameRect.top,
            bottom: updatedBlockInfoList[i].rectInFrame.bottom +
              blockToBeUpdated.frameRect.top,
            left: updatedBlockInfoList[i].rectInFrame.left +
              blockToBeUpdated.frameRect.left,
            right: updatedBlockInfoList[i].rectInFrame.right +
              blockToBeUpdated.frameRect.left,
          },
          rectInFrame: updatedBlockInfoList[i].rectInFrame,
          remain: updatedBlockInfoList[i].remain,
        },
      );
    }
    globalThis.removeEventListener(
      "message",
      updateBlocksByRemoveBlockResponse,
    );
  };
  globalThis.addEventListener("message", updateBlocksByRemoveBlockResponse);

  sendRequest<RemoveBlockRequestToFrame>(
    removedVirtualBlock.source as Window, // TODO: remove type assertion
    {
      message: "removeBlockRequest",
      uuid: removedVirtualBlock.uuid,
    },
  );
}

// virtual blockの位置もframeの位置変更情報をもとに更新することに注意
function updatePositionOfBlocksByRealBlockRemoval(blocks: Block[]) {
  for (const block of blocks) {
    if (!block.remain) {
      return;
    }
    if (isRealBlock(block)) {
      const _rect = block.element.getBoundingClientRect();
      const rect = {
        top: globalThis.innerHeight - _rect.top,
        bottom: globalThis.innerHeight - _rect.bottom,
        left: _rect.left,
        right: _rect.right,
      };
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
