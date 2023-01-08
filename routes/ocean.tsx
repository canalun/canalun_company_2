import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ArticleList } from "@/components/ArticleList.tsx";
import { ThoughtBubble } from "@/components/thoughtBubble.tsx";
import { EmbeddedSoundCloudPlayer } from "@/components/EmbeddedSoundCloudPlayer.tsx";
import { GameList } from "@/components/GameList.tsx";
import { Article } from "@/types/Articles.ts";
import { getArticles } from "@/utils/getArticles.ts";
import { ScrollableContainer } from "../components/ScrollableContainer.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const articles = await getArticles();
    return ctx.render(articles);
  },
};

// MEMO: レスポンシブ対応は基本的に各スタイル中で min, max を多用して対応している。どうしてもそれでは無理だった吹き出しは、コンテナクエリで対応
export default function Ocean({ data: article }: PageProps<Article[]>) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Canalun Company</title>
      </Head>
      <style>
        {`@keyframes wave {
            from {
              transform:translate(0);
            }
            to {
              transform:translate(-60.00%);
            }
          }
          @keyframes tako {
            0% {
              transform:rotate(60deg);
            }
            50% {
              transform:rotate(90deg);
            }
            100% {
              transform:rotate(60deg);
            }
          }
          @keyframes ammonite {
            0% {
              transform:translate(0, 0);
            }
            33% {
              transform:translate(-30%, 20%);
            }
            66% {
              transform:translate(10%, 40%);
            }
            100% {
              transform:translate(0, 0);
            }
          }
          @keyframes submarine {
            0% {
              transform:translateY(0);
            }
            50% {
              transform:translateY(-30%);
            }
            100% {
              transform:translateY(0);
            }
          }
          .background {
            z-index: -1000;
            position: relative;
          }
          @font-face{
            font-family: 'DolphinOceanWave';
            src: url('/font/DolphinOceanWave.woff') format('woff');
          }
          h3 {
            font-family: DolphinOceanWave;
            color: black;
            font-size: 65px;
            margin-top: 0px;
            margin-bottom: 0px;
            text-indent: 0.1em;
          }
          `}
      </style>
      <body
        style={{
          position: "relative",
          zIndex: "-9999999999999",
          margin: "0px",
          overscrollBehaviorY: "none",
        }}
      >
        <div
          id="sky"
          class="background"
          style={{
            backgroundColor: "#70D0FF",
            width: "100vw",
            height: "70vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              float: "right",
              paddingTop: "min(50%, 450px)",
              width: "min(50%, 450px)",
              position: "relative",
              transform: "translate(40%, -40%)", // translateのパーセンテージは自分自身なのでレスポンシブ対応しやすい
              backgroundColor: "yellow",
              borderRadius: "100%",
            }}
          />
          <p
            style={{
              //fontFamily: "Sacramento, cursive",
              fontFamily: "DolphinOceanWave",
              textShadow: "8px 0px 0px white",
              fontSize: "min(15vw, 15vh, 90px)",
              //fontStyle: "italic",
              fontWeight: "bold",
              "-webkit-text-stroke": "2px #147ce1",
              color: "transparent",
              letterSpacing: "0.06em",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Canalun<br />Company
          </p>
        </div>
        <div
          id="wave"
          class="background"
          style={{ overflow: "hidden", backgroundColor: "#147CE1" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3000 300"
            width="3000"
            height="300"
          >
            <path
              style={{ fill: "#70D0FF", animation: "wave linear 10s infinite" }}
              d="M 0,0 v 100,0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300, 0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300,0 q 150,50 300,0 v 0,-100 Z"
            />
          </svg>
        </div>
        <div
          id="ocean"
          class="background"
          style={{
            background: "linear-gradient(#147CE1, #0c3689 )",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            id="ocean-layer"
            style={{
              width: "100%",
              height: "60vh",
              position: "relative",
              display: "flex",
              padding: "2px",
              marginBottom: "150px",
            }}
          >
            <div
              style={{
                width: "15%",
                height: "100%",
                position: "relative",
              }}
            >
              <img
                src="/ocean/img/tako.png"
                style={{
                  height: "180px",
                  width: "auto",
                  position: "relative",
                  top: "60px",
                  left: "20px",
                  animation: "tako linear 5s infinite",
                }}
              />
            </div>
            <div
              style={{
                width: "85%",
                height: "100%",
                position: "relative",
              }}
            >
              <ThoughtBubble
                color="white"
                size={{ width: "100%", height: "100%" }}
                direction="toRight"
              >
                <h3>Readings...</h3>
                <ScrollableContainer scrollBarColor="#147ce1">
                  <ArticleList articles={article} fontSize="18px" />
                </ScrollableContainer>
              </ThoughtBubble>
            </div>
          </div>
          <div
            id="ocean-layer"
            style={{
              width: "100%",
              height: "650px",
              position: "relative",
              display: "flex",
              padding: "2px",
              marginBottom: "150px",
            }}
          >
            <div
              style={{
                width: "85%",
                height: "100%",
                position: "relative",
              }}
            >
              <ThoughtBubble
                color="white"
                size={{ width: "100%", height: "100%" }}
                direction="toLeft"
              >
                <h3>Listenings...</h3>
                <EmbeddedSoundCloudPlayer />
              </ThoughtBubble>
            </div>
            <div
              style={{
                width: "15%",
                height: "100%",
                position: "relative",
              }}
            >
              <img
                src="/ocean/img/ammonite.png"
                style={{
                  height: "180px",
                  width: "auto",
                  position: "relative",
                  top: "70px",
                  left: "-20px",
                  animation:
                    "ammonite cubic-bezier(0.985, 0.035, 0.480, 0.975) 5s infinite",
                }}
              />
            </div>
          </div>
          <div
            id="ocean-layer"
            style={{
              width: "100%",
              height: "650px",
              position: "relative",
              display: "flex",
              padding: "2px",
              marginBottom: "150px",
            }}
          >
            <div
              style={{
                width: "15%",
                height: "100%",
                position: "relative",
              }}
            >
              <img
                src="/ocean/img/submarine.png"
                style={{
                  height: "180px",
                  width: "auto",
                  position: "relative",
                  top: "150px",
                  left: "0px",
                  animation: "submarine linear 5s infinite",
                }}
              />
            </div>
            <div
              style={{
                width: "85%",
                height: "100%",
                position: "relative",
              }}
            >
              <ThoughtBubble
                color="white"
                size={{ width: "100%", height: "100%" }}
                direction="toRight"
              >
                <h3>Playings...</h3>
                <ScrollableContainer scrollBarColor="#147ce1">
                  <GameList fontSize="18px" />
                </ScrollableContainer>
              </ThoughtBubble>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#412202", width: "100%", height: "100px" }}
        />
      </body>
    </>
  );
}
