import { generateRandomString } from "@/utils/generateRandomString.ts";
import { ComponentChildren } from "https://esm.sh/v99/preact@10.11.0/src/index.d.ts";

type OceanLayerProps = {
  childrenList: [ComponentChildren, ComponentChildren];
  ratio: [`${number}%`, `${number}%`];
  direction: "toRight" | "toLeft";
};

// TODO: ThoughtBubbleとあわせて一つのコンポーネントにしたほうがよさそう
export function OceanLayer(props: OceanLayerProps) {
  const className = generateRandomString();
  return (
    <>
      <style>
        {`
        @container(min-width:801px) {
          .${className} {
            height: 60vh;
            flex-direction: ${
          props.direction === "toRight" ? "" : "row-reverse"
        };
          }
          ${
          props.ratio.map((r, i) => {
            return `
          .${className + "children" + i} {
            width: ${r};
            height: 100%;
          }`;
          }).join("\n")
        }
        }
        @container(max-width:800px) {
          .${className} {
            flex-direction: column;
            height: 80vh;
          }
            ${
          props.ratio.map((r, i) => { // 吹き出しを縦向きにするときは並び替えないとバグっちゃう
            return `
          .${className + "children" + i} {
            width: 100%;
            height: ${r};
          }`;
          }).join("\n")
        }
        }
        `}
      </style>
      <div
        className={className}
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          padding: "2px",
          marginBottom: "20vh",
        }}
      >
        {props.childrenList.map((children, i) => {
          return (
            <div
              className={className + "children" + i}
              style={{
                position: "relative",
              }}
            >
              {children}
            </div>
          );
        })}
      </div>
    </>
  );
}
