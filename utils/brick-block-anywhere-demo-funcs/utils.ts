import {
  type Block,
  isRealBlock,
} from "@/utils/brick-block-anywhere-demo-funcs/blocks.ts";

export type Vector = {
  x: number;
  y: number;
};

// TODO: ちゃんとした反射の計算を入れる。内積とかでできるようにした方がいい。意味わからん計算だから
export function vectorProduction(a: Vector, b: Vector): Vector {
  return {
    x: a.x * b.x,
    y: a.y * b.y,
  };
}

export function vectorInnerProduct(a: Vector, b: Vector): number {
  return a.x * b.x + a.y * b.y;
}

export function vectorNorm(a: Vector): number {
  return Math.sqrt(vectorInnerProduct(a, a));
}

export function vectorAdd(a: Vector, b: Vector): Vector {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function isFrameElement(
  element: Element,
): element is HTMLIFrameElement | HTMLFrameElement {
  return element.tagName === "IFRAME" || element.tagName === "FRAME";
}

export type Prettify<T> =
  & {
    [K in keyof T]: T[K];
  }
  // deno-lint-ignore ban-types
  & {};

// debug用
export function visualizeBlocks(blocks: Block[]) {
  if (globalThis.top !== globalThis.self) {
    return;
  }

  const divs = document.querySelectorAll(".bba-debug-block");
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
    div.remove();
  }

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (isRealBlock(block)) {
      const blockElement = block.element;
      Object.assign(
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        blockElement.style,
        {
          border: "0.1px solid red",
        },
      );
    } else {
      const div = document.createElement("div");
      div.className = "bba-debug-block";
      Object.assign(
        div.style,
        {
          position: "fixed",
          top: `${globalThis.innerHeight - block.rect.top}px`,
          left: `${block.rect.left}px`,
          width: `${block.rect.right - block.rect.left}px`,
          height: `${block.rect.top - block.rect.bottom}px`,
          border: "0.1px solid red",
        },
      );
      document.body.appendChild(div);
    }
  }
}
