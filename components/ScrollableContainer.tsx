import { ComponentChild } from "preact/src/index.d.ts";
import { OceanPalette } from "@/theme/palette.ts";
import { generateRandomString } from "../utils/generateRandomString.ts";

type ScrollableContainerProps = {
  scrollBarColor: string;
  children: ComponentChild;
};

export function ScrollableContainer(props: ScrollableContainerProps) {
  const className = generateRandomString();
  return (
    <>
      <style>
        {`
          /*スクロールバーの横幅指定*/
          .${className}::-webkit-scrollbar {
              width: 8px;
          }
          /*スクロールバーの背景色・角丸指定*/
          .${className}::-webkit-scrollbar-track {
            border-radius: 10px;
            background: ${OceanPalette.white.basic};
          }
          /*スクロールバーの色・角丸指定*/
          .${className}::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background:${props.scrollBarColor};
          }
          `}
      </style>
      <div
        className={className}
        style={{ overflow: "auto", height: "100%" }}
      >
        {props.children}
      </div>
    </>
  );
}
