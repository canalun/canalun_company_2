import { Head } from "$fresh/runtime.ts";
import { Dog } from "@/components/AA.tsx";
import { CeoImg } from "@/components/CeoImg.tsx";
import { ArticleList } from "@/components/ArticleList.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Article } from "@/types/Articles.ts";
import { getArticles } from "@/utils/getArticles.ts";
import { EmbeddedSoundCloudPlayer } from "../components/EmbeddedSoundCloudPlayer.tsx";
import { GameList } from "../components/GameList.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const articles = await getArticles();
    return ctx.render(articles);
  },
};

export default function Index({ data: article }: PageProps<Article[]>) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Canalun Company</title>
        <link rel="stylesheet" href="/stackeditStyle.css" />
      </Head>
      <body class="stackedit">
        <div class="stackedit__left">
          <div class="stackedit__toc">
            <ul>
              <li>
                <a href="#welcome-to-canalun-company">
                  Welcome to Canalun Company!
                </a>
                <ul>
                  <li>
                    <a href="#ceos">Our CEO</a>
                  </li>
                  <li>
                    <a href="#values">Our Values</a>
                  </li>
                  <li>
                    <a href="#business">Our business</a>
                    <ul>
                      <li>
                        <a href="#articles">- Articles</a>
                      </li>
                      <li>
                        <a href="#guest-rooms">- Guest rooms</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="stackedit__right">
          <div class="stackedit__html">
            <h1 id="welcome-to-canalun-company">Welcome to Canalun Company!</h1>
            <h2 id="ceos">One of our BRILLIANT CEOs</h2>
            <CeoImg />
            <h2 id="values">GREAT Values</h2>
            <ul>
              <li>Go to bed when feeling sleepy</li>
              <li>Don’t go with strangers</li>
            </ul>
            <h2 id="business">BIG business</h2>
            <h3 id="articles">SUPER articles</h3>
            <ArticleList articles={article} />
            <h3 id="musics">SUPER MUSIC</h3>
            <EmbeddedSoundCloudPlayer />
            <h3 id="guest-rooms">SUPER NICE guest rooms</h3>
            <GameList />
            <Dog />
          </div>
        </div>
      </body>
    </>
  );
}
