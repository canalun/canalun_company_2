import {
  type Block,
  getBlocks,
} from "@/utils/brick-block-anywhere-demo-funcs/blocks.ts";
import {
  type GetBlocksResponseToSource,
  type RemoveBlockResponseToSource,
  type sendRequestFromTopToAllFrames,
  sendResponse,
} from "@/utils/brick-block-anywhere-demo-funcs/message.ts";
import { removeBlockAndUpdateBlocksPosition } from "@/utils/brick-block-anywhere-demo-funcs/updateBlocks.ts";
import {
  assert,
  type Prettify,
} from "@/utils/brick-block-anywhere-demo-funcs/utils.ts";

export function inFrame() {
  const blocks = getBlocks();

  globalThis.addEventListener(
    "message",
    (
      event: MessageEvent<Parameters<typeof sendRequestFromTopToAllFrames>[0]>,
    ) => {
      assert(!!event.source, "event.source is null");
      switch (event.data.message) {
        case "getBlocksRequest": {
          const blockInfoList: BlockInfo[] = blocks.map(
            convertBlockToBlockInfo,
          );
          sendResponse<GetBlocksResponseToSource>(
            event.source as Window, // TODO: remove type assertion
            {
              message: "getBlocksResponse",
              blockInfoList: blockInfoList,
            },
          );
          break;
        }

        case "removeBlockRequest": {
          const uuid = event.data.uuid;
          const blockToBeRemoved = blocks.find((block) => block.uuid === uuid);
          if (!blockToBeRemoved) {
            console.log("block to be removed in frame not found");
            return;
          }
          removeBlockAndUpdateBlocksPosition(blockToBeRemoved, blocks);
          const blockInfoList: BlockInfo[] = blocks.map(
            convertBlockToBlockInfo,
          );
          sendResponse<RemoveBlockResponseToSource>(
            event.source as Window, // TODO: remove type assertion
            {
              message: "removeBlockResponse",
              blockInfoList: blockInfoList,
            },
          );
          break;
        }

        default: {
          console.log("unknown case");
        }
      }
      return;
    },
  );
}

export type BlockInfo = Prettify<
  Omit<Block, "element" | "rect"> & {
    rectInFrame: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  }
>;
function convertBlockToBlockInfo(block: Block): BlockInfo {
  return {
    uuid: block.uuid,
    rectInFrame: block.rect,
    remain: block.remain,
  };
}
