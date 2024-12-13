import { useState } from "preact/hooks";
import { OceanPalette } from "../theme/Palette.ts";

// TODO: ロゴの何か面白い仕掛けを考える
export default function OceanLogo() {
  const logoLine1 = "Canalun";
  const logoLine2 = "Company";
  const [displays, setDisplays] = useState(
    new Array<boolean>((logoLine1 + logoLine2).length).fill(true)
  );

  const style = {
    //fontFamily: "Sacramento, cursive",
    fontFamily: "DolphinOceanWave",
    //fontStyle: "italic",
    fontSize: "min(20vw, 20vh, 90px)",
    textShadow: "min(1.5vw, 1.5vh, 7px) 0px 0px white",
    fontWeight: "bold",
    "-webkit-text-stroke": `2px ${OceanPalette.blue.sea}`,
    color: "transparent",
    display: "inline",
    marginRight: "0.08em",
  };

  return (
    <div>
      {[...logoLine1].map((char, i) => {
        return (
          <div
            onClick={() => {
              setDisplays(
                [...displays].map((state, n) => (n === i ? !state : state))
              );
            }}
            style={{ ...style, visibility: displays[i] ? "" : "hidden" }}
          >
            {char}
          </div>
        );
      })}
      <br />
      {[...logoLine2].map((char, i) => {
        return (
          <div
            onClick={() => {
              setDisplays(
                [...displays].map((state, n) =>
                  n === i + logoLine1.length ? !state : state
                )
              );
            }}
            style={{
              ...style,
              visibility: displays[logoLine1.length + i] ? "" : "hidden",
            }}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
}
