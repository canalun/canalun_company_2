import type { BlockInfo } from "@/utils/brick-block-anywhere-demo-funcs/inFrame.ts";

type RequestToFrame = RemoveBlockRequestToFrame | GetBlocksRequestToFrame;
export type RemoveBlockRequestToFrame = {
  message: "removeBlockRequest";
  uuid: string;
};
export type GetBlocksRequestToFrame = {
  message: "getBlocksRequest";
};

export function sendRequest<T extends RequestToFrame>(
  to: Window,
  eventData: T,
) {
  to.postMessage(eventData, "*");
}
export function sendRequestFromTopToAllFrames<T extends RequestToFrame>(
  eventData: T,
) {
  for (let i = 0; i < globalThis.frames.length; i++) {
    globalThis.frames[i].postMessage(eventData, "*");
  }
}

export type ResponseToSource =
  | RemoveBlockResponseToSource
  | GetBlocksResponseToSource;
export type RemoveBlockResponseToSource = {
  message: "removeBlockResponse";
  blockInfoList: BlockInfo[];
};
export type GetBlocksResponseToSource = {
  message: "getBlocksResponse";
  blockInfoList: BlockInfo[];
};

export function sendResponse<T extends ResponseToSource>(
  to: Window,
  eventData: T,
) {
  to.postMessage(eventData, "*");
}
