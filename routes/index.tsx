import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ArticleList } from "@/components/ArticleList.tsx";
import { ThoughtBubble } from "@/components/ThoughtBubble.tsx";
import { EmbeddedSoundCloudPlayer } from "@/components/EmbeddedSoundCloudPlayer.tsx";
import { GameList } from "@/components/GameList.tsx";
import { Article } from "@/types/Articles.ts";
import { getArticles } from "@/utils/getArticles.ts";
import { ScrollableContainer } from "../components/ScrollableContainer.tsx";
import { OceanPalette } from "../theme/Palette.ts";
import { OceanLayer } from "../components/Ocean.tsx";
import OceanLogo from "../islands/OceanLogo.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const articles = await getArticles();
    return ctx.render(articles);
  },
};

// MEMO: レスポンシブ対応は基本的に各スタイル中で min, max を多用して対応している。どうしてもそれでは無理だった吹き出しは、コンテナクエリで対応
export default function Ocean({ data: article }: PageProps<Article[]>) {
  const h3fontSize = "min(10vw, 10vh, 40px)";
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Canalun Company</title>
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
            unicode-range: U+0041-007A; /* only alphabet */
          }
          * {
            font-family: 'system-ui';
          }
          h3 {
            color: black;
            font-size: ${h3fontSize};
            margin-top: 0px;
            margin-bottom: 0px;
          }
          `}
        </style>
      </Head>
      <body
        style={{
          position: "relative",
          zIndex: "-9999999999999",
          margin: "0px",
          overscrollBehaviorY: "none",
          overflowX: "hidden",
        }}
      >
        <div
          id="sky"
          class="background"
          style={{
            backgroundColor: OceanPalette.blue.sky,
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
          <div
            style={{
              position: "absolute",
              top: "60%", // 海との境目が波がある分ずれているので、50%ではない方がいい感じになる
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <OceanLogo />
          </div>
        </div>
        <div
          id="wave"
          class="background"
          style={{
            overflow: "hidden",
            backgroundColor: `${OceanPalette.blue.sea}`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3000 300"
            width="3000"
            height="300"
          >
            <path
              style={{
                fill: `${OceanPalette.blue.sky}`,
                animation: "wave linear 10s infinite",
              }}
              d="M 0,0 v 100,0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300, 0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300,0 q 150,50 300,0 t 300,0 q 150,50 300,0 v 0,-100 Z"
            />
          </svg>
        </div>
        <div
          id="ocean"
          class="background"
          style={{
            background: `linear-gradient(${OceanPalette.blue.sea}, ${OceanPalette.blue.deepSea})`,
            width: "100vw",
            position: "relative",
            overflow: "hidden",
            containerType: "inline-size",
          }}
        >
          <OceanLayer
            ratio={["15%", "85%"]}
            direction={"toRight"}
            childrenList={[
              <>
                <style>
                  {`
                  @container(min-width:801px){
                    .tako {
                      height: 20vh;
                      width: auto;
                      top: 60px;
                      left: 20px;
                    }
                  }
                  @container(max-width:800px){
                    .tako {
                      height: 120%;
                      width: auto;
                      top: 15%;
                      left: 5vw;
                    }
                  }
                `}
                </style>
                <img
                  className="tako"
                  src="/ocean/img/tako.png"
                  style={{
                    position: "relative",
                    animation: "tako linear 5s infinite",
                  }}
                />
              </>,
              <ThoughtBubble
                color="white"
                size={{ width: "100%", height: "100%" }}
                direction="toRight"
              >
                <h3>Readings...</h3>
                <div style={{ height: `calc(95% - ${h3fontSize} - 10px)` }}>
                  {/* h3のサイズをひいてあげて、余白いっぱいにコンテンツを配置: https://zenn.dev/orihika0123/articles/2022-05-04-nyarome-flexbox-width#%E6%AD%A3%E3%81%97%E3%81%84%E6%9B%B8%E3%81%8D%E6%96%B9%E3%81%9D%E3%81%AE1(calc%E3%82%92%E4%BD%BF%E3%81%86)*/}
                  <ScrollableContainer scrollBarColor={OceanPalette.blue.sea}>
                    <ArticleList articles={article} fontSize="18px" />
                  </ScrollableContainer>
                </div>
              </ThoughtBubble>,
            ]}
          />
          <OceanLayer
            ratio={["15%", "85%"]}
            direction={"toLeft"}
            childrenList={[
              <>
                <style>
                  {`
                  @container(min-width:801px){
                    .submarine {
                      height: 20vh;
                      width: auto;
                      top: 60px;
                      right: 80px;
                    }
                  }
                  @container(max-width:800px){
                    .submarine {
                      height: 120%;
                      width: auto;
                      top: 15%;
                      left: 5vw;
                    }
                  }
                `}
                </style>
                <img
                  className="submarine"
                  src="/ocean/img/submarine.png"
                  style={{
                    position: "relative",
                    animation: "submarine linear 5s infinite",
                  }}
                />
              </>,
              <ThoughtBubble
                color="white"
                size={{ width: "100%", height: "100%" }}
                direction="toLeft"
              >
                <h3>Playings...</h3>
                <div style={{ height: `calc(95% - ${h3fontSize} - 10px)` }}>
                  <ScrollableContainer
                    scrollBarColor={OceanPalette.blue.deepSea}
                  >
                    <GameList fontSize="18px" />
                  </ScrollableContainer>
                </div>
              </ThoughtBubble>,
            ]}
          />
          <OceanLayer
            ratio={["15%", "85%"]}
            direction={"toRight"}
            childrenList={[
              <>
                <style>
                  {`
                  @container(min-width:801px){
                    .ammonite {
                      height: 20vh;
                      width: auto;
                      top: 60px;
                      left: 20px;
                    }
                  }
                  @container(max-width:800px){
                    .ammonite {
                      height: 120%;
                      width: auto;
                      top: 15%;
                      left: 10vw;
                    }
                  }
                `}
                </style>
                <img
                  src="/ocean/img/ammonite.png"
                  className="ammonite"
                  style={{
                    position: "relative",
                    animation:
                      "ammonite cubic-bezier(0.985, 0.035, 0.480, 0.975) 5s infinite",
                  }}
                />
              </>,
              <ThoughtBubble
                color="white"
                size={{ width: "100%", height: "100%" }}
                direction="toRight"
              >
                <h3>Listenings...</h3>
                <EmbeddedSoundCloudPlayer />
              </ThoughtBubble>,
            ]}
          />
        </div>
        <div
          style={{
            backgroundColor: OceanPalette.brown.bottomOfTheSea,
            width: "100%",
            height: "100px",
          }}
        />
      </body>
    </>
  );
}
