import { ComponentChildren, JSX } from "preact";

type ThoughtBubbleProps = {
  children: ComponentChildren;
  size: { width: string; height: string };
  color: string;
};

// TODO: サイズ計算ロジック修正
export function ThoughtBubble(props: ThoughtBubbleProps) {
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
          width: props.size.width,
          height: props.size.height,
          display: "flex",
          position: "relative",
        }}
      >
        <div style={{ width: "10%", height: "100%", position: "relative" }}>
          <div
            style={{
              borderRadius: "100% 100%",
              width: "60%",
              paddingTop: "60%",
              backgroundColor: props.color,
              position: "relative",
              left: "50%",
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
              backgroundColor: props.color,
              position: "relative",
              left: "30%",
              top: "60%",
              animation: "bubbleUp linear 5s infinite",
            }}
          />
        </div>
        <div style={{ width: "70%", height: "100%", position: "relative" }}>
          <div
            style={{
              borderRadius: "40% 70%/40% 30%",
              width: "100%",
              paddingTop: "100%",
              backgroundColor: props.color,
              position: "relative",
              zIndex: "-1",
              top: "10%",
              left: "5%",
              animation: "bubbleRotate linear 10s infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              margin: "auto",
              top: "80%",
              left: "0",
              right: "0",
              bottom: "0",
              height: "80%",
              width: "60%",
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
