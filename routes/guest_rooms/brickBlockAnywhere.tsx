import { Head } from "$fresh/runtime.ts";
import BrickBlockAnywhere from "@/islands/BrickBlockAnywhere.tsx";

export default function brickBlockAnywhere() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Brick-Block-Anywhere Demo</title>
      </Head>
      <body>
        <h1>Demo: Brick-Block-Anywhere</h1>
        <h2>
          Download Here:{" "}
          <a href="https://chromewebstore.google.com/detail/brick-break-anywhere/lkbkphlgmknnachlgmbdmoepfnfdeckb?hl=en">
            Chrome Web Store
          </a>
        </h2>
        <iframe
          style={{ width: "90vw", height: "30vh" }}
          src={"/guest_rooms/iframeContent"}
        />
        {[0, 1, 2].map(() => {
          return (
            <div style={{ display: "flex", "flex-flow": "row" }}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                return i % 2 === 0 ? (
                  <div>
                    <template shadowrootmode={"open"}>
                      <div
                        style={{
                          borderColor:
                            i % 3 === 0
                              ? "black"
                              : i % 3 === 1
                              ? "blue"
                              : "green",
                          borderWidth: "2px",
                          borderStyle: "solid",
                          backgroundColor: "lightgray",
                          width: "10vw",
                        }}
                      >
                        block in shadow DOM
                      </div>
                    </template>
                  </div>
                ) : (
                  <div
                    style={{
                      borderColor:
                        i % 3 === 0 ? "black" : i % 3 === 1 ? "blue" : "green",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      width: "10vw",
                    }}
                  >
                    block
                  </div>
                );
              })}
            </div>
          );
        })}
        <BrickBlockAnywhere />
      </body>
    </>
  );
}
