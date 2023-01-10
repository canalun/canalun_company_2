import { ComponentChildren, JSX } from "preact";
import { generateRandomString } from "../utils/generateRandomString.ts";

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
  const className = generateRandomString();
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
          @keyframes bubbleGoDown {
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
          @keyframes bubbleGoUp {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-80%);
            }
            100% {
              transform: translateY(0);
            }
          }
          @keyframes bubbleGoRight {
            0% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(80%);
            }
            100% {
              transform: translateX(0);
            }
          }
          @keyframes bubbleGoLeft {
            0% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(-80%);
            }
            100% {
              transform: translateX(0);
            }
          }
          @container(min-width:801px) {
            .${className} {
              flex-direction: ${direction === "toRight" ? "" : "row-reverse"};
            }
            .${className}firstBubble {
              left: 0%;
              top: 50%;
              width: 60%;
              padding-top: 60%;
              animation: bubbleGoDown ease-in 10s infinite;
            }
            .${className}firstBubbleContainer {
              width: 10%;
              height: 100%;
            }
            .${className}secondBubble {
              left: 0%;
              top: 60%;
              width: 60%;
              padding-top: 60%;
              animation: bubbleGoUp linear 5s infinite;
            }
            .${className}secondBubbleContainer {
              width: 20%;
              height: 100%;
            }
            .${className}mainBubbleContainer {
              width: 70%;
              height: 100%;
            }
          }
          @container(max-width:800px) {
            .${className} {
              flex-direction: column;
            }
            .${className}firstBubble {
              left: 20vw;
              top: 0%;
              width: min(10%, 50px);
              padding-top: min(10%, 50px);
              animation: bubbleGoRight ease-in 10s infinite;
            }
            .${className}firstBubbleContainer {
              width: 100%;
              height: 10%;
            }
            .${className}secondBubble {
              left: 40vw;
              top: 0%;
              width: min(20%, 106px); /* 完全にハードコードだが、ちょうどいい大きさの限界 */
              padding-top: min(20%, 106px); /* 完全にハードコードだが、ちょうどいい大きさの限界 */
              animation: bubbleGoLeft ease-in 10s infinite;
            }
            .${className}secondBubbleContainer {
              width: 100%;
              height: 20%;
            }
            .${className}mainBubbleContainer {
              width: 100%;
              height: 70%;
            }
          }`}
      </style>
      <div
        className={className}
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          position: "relative",
          margin: "5px",
        }}
      >
        <div
          className={className + "firstBubbleContainer"}
          style={{ position: "relative" }}
        >
          <div
            className={className + "firstBubble"}
            style={{
              borderRadius: "100% 100%",
              backgroundColor: color,
              position: "relative",
            }}
          />
        </div>
        <div
          className={className + "secondBubbleContainer"}
          style={{ position: "relative" }}
        >
          <div
            className={className + "secondBubble"}
            style={{
              borderRadius: "100% 100%",
              backgroundColor: color,
              position: "relative",
            }}
          />
        </div>
        <div
          className={className + "mainBubbleContainer"}
          style={{ position: "relative" }}
        >
          <div
            className={className + "mainBubble"}
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
