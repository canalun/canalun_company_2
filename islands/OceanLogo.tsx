import { useState } from "preact/hooks";
import { OceanPalette } from "../theme/Palette.ts";

// TODO: ロゴの何か面白い仕掛けを考える
export default function OceanLogo() {
  const logoLine1 = "Canalun";
  const logoLine2 = "Company";
  const [displays, setDisplays] = useState(
    new Array<boolean>((logoLine1 + logoLine2).length).fill(true)
  );

  return (
    <div
      style={{
        //fontFamily: "Sacramento, cursive",
        fontFamily: "DolphinOceanWave",
        textShadow: "min(1.5vw, 1.5vh, 7px) 0px 0px white",
        fontSize: "min(20vw, 20vh, 90px)",
        //fontStyle: "italic",
        fontWeight: "bold",
        "-webkit-text-stroke": `2px ${OceanPalette.blue.sea}`,
        color: "transparent",
      }}
    >
      {[...logoLine1].map((char, i) => {
        return (
          <div
            onClick={() => {
              setDisplays(
                [...displays].map((state, n) => (n === i ? !state : state))
              );
            }}
            style={{
              display: "inline",
              marginRight: "0.08em",
              visibility: displays[i] ? "" : "hidden",
            }}
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
              display: "inline",
              marginRight: "0.08em",
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
