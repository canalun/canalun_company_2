import { ComponentChild } from "https://esm.sh/v99/preact@10.11.0/src/index.d.ts";

type ScrollableContainerProps = {
  scrollBarColor: string;
  children: ComponentChild;
};

export function ScrollableContainer(props: ScrollableContainerProps) {
  return (
    <>
      <style>
        {`
          /*スクロールバーの横幅指定*/
          .scrollable::-webkit-scrollbar {
              width: 8px;
          }
          /*スクロールバーの背景色・角丸指定*/
          .scrollable::-webkit-scrollbar-track {
            border-radius: 10px;
            background: #f2f2f2;
          }
          /*スクロールバーの色・角丸指定*/
          .scrollable::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background:${props.scrollBarColor};
          }
          `}
      </style>
      <div
        className="scrollable"
        style={{ overflow: "auto", height: "100%" }}
      >
        {props.children}
      </div>
    </>
  );
}
