import { ComponentChildren, JSX } from "preact";

type ThoughtBubbleProps = {
  children: ComponentChildren;
  size: { width: string; height: string };
  color: string;
  direction: "toRight" | "toLeft";
  rotateOn?: boolean;
};

// TODO: rotateOn のときのサイズ計算ロジック修正。コンポーネント全体の比率を固定しないとだめそう
export const ThoughtBubble: (props: ThoughtBubbleProps) => JSX.Element = (
  { children, size, color, direction, rotateOn },
) => {
  return (
    <>
      <style>
        {`@keyframes bubbleRotate {
            from {
              transform:rotate(0deg);
            }
            to {
              transform:rotate(360deg);
            }
          }
          @keyframes bubbleDown {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(80%);
            }
            100% {
              transform: translateY(0);
            }
          }
          @keyframes bubbleUp {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-80%);
            }
            100% {
              transform: translateY(0);
            }
          }`}
      </style>
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          flexDirection: direction === "toRight" ? "" : "row-reverse",
          position: "relative",
          margin: "5px",
        }}
      >
        <div style={{ width: "10%", height: "100%", position: "relative" }}>
          <div
            style={{
              borderRadius: "100% 100%",
              width: "60%",
              paddingTop: "60%",
              backgroundColor: color,
              position: "relative",
              left: "0%",
              top: "50%",
              animation: "bubbleDown ease-in 10s infinite",
            }}
          />
        </div>
        <div style={{ width: "20%", height: "100%" }}>
          <div
            style={{
              borderRadius: "100% 100%",
              width: "60%",
              paddingTop: "60%",
              backgroundColor: color,
              position: "relative",
              left: "0%",
              top: "60%",
              animation: "bubbleUp linear 5s infinite",
            }}
          />
        </div>
        <div style={{ width: "70%", height: "100%", position: "relative" }}>
          <div
            id="mainBubble"
            style={{
              borderRadius: rotateOn ? "40% 80%/60% 30%" : "100%",
              width: "100%",
              height: "100%",
              backgroundColor: color,
              position: "relative",
              zIndex: "-1",
              animation: rotateOn ? "bubbleRotate linear 10s infinite" : "",
            }}
          />
          <div
            style={{
              backgroundColor: color,
              width: rotateOn ? "60%" : "70%",
              height: rotateOn ? "50%" : "70%",
              position: "absolute",
              margin: "auto",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              overflow: "hidden",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
