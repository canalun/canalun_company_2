import { Head } from "$fresh/runtime.ts";
import { Handler, Handlers, PageProps } from "$fresh/server.ts";
import { Dog } from "../components/AA/Dog.tsx";
import { parse } from "xml/mod.ts";

type Article = {
  language: "ja" | "en";
  category: "engineering" | "philosophy" | "debate" | "thoughts";
  title: string;
  link: string;
  date: Date;
};

const languageMap = new Map<Article["language"], string>([
  ["ja", "日本語"],
  ["en", "English"],
]);

const categoryMap = new Map<
  Article["language"],
  Map<Article["category"], string>
>([
  [
    "ja",
    new Map([
      ["engineering", "エンジニアリング"],
      ["debate", "ディベート"],
      ["philosophy", "思想"],
      ["thoughts", "雑感"],
    ]),
  ],
  [
    "en",
    new Map([
      ["engineering", "engineering"],
      ["debate", "debate"],
      ["philosophy", "philosophy"],
      ["thoughts", "thoughts"],
    ]),
  ],
]);

export const handler: Handlers<Article[]> = {
  async GET(_, ctx) {
    const articles: Article[] = [];
    const zennResp = await fetch(
      "https://zenn.dev/api/articles?username=canalun&count=10&order=latest",
    );
    if (200 <= zennResp.status && zennResp.status < 300) {
      const data = await zennResp.json();
      const zennArticles = data.articles;
      zennArticles.map((article) =>
        articles.push({
          language: "ja",
          category: "engineering",
          title: article.title,
          link: "https://zenn.dev" + article.path,
          date: new Date(article.published_at),
        })
      );
    }

    const hatenaUserName = "canalundayo";
    const hatenaPassword = "ap23n9rqk0";
    const hatenaResp = await fetch(
      "https://blog.hatena.ne.jp/" + "canalundayo" + "/" +
        "canalundayo.hatenablog.com" + "/atom/entry",
      {
        headers: {
          Authorization: "Basic " + btoa(`${hatenaUserName}:${hatenaPassword}`),
        },
      },
    );
    const hatenaRespText = await hatenaResp.text();
    parse(hatenaRespText).feed.entry.map((entry) => {
      if (entry["app:control"]["app:draft"] === "no") {
        articles.push({
          language: "ja",
          category: "thoughts",
          title: entry.title,
          link: entry.link.find((link) =>
            link["@rel"] === "alternate"
          )["@href"],
          date: new Date(entry.published),
        });
      }
      return;
    });

    const devtoUserId = "850691";
    const devtoResp = await fetch(
      "https://dev.to/search/feed_content?user_id=" + devtoUserId +
        "&class_name=Article",
    );
    const data = await devtoResp.json();
    data.result.map((entry) => {
      articles.push({
        language: "en",
        category: "engineering",
        title: entry.title,
        link: "https://dev.to" + entry.path,
        date: new Date(entry.published_at_int),
      });
      return;
    });

    articles.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
    return ctx.render(articles);
  },
};

const MAX_LENGTH_OF_TITLE = 25;

export default function Index({ data: articles }: PageProps<Article[] | null>) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
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
            <div id="ceoImage">
              <script src="scripts/dist/app.js" charset="utf-8"></script>
            </div>
            <h2 id="values">GREAT Values</h2>
            <ul>
              <li>Go to bed when feeling sleepy</li>
              <li>Don’t go with strangers</li>
            </ul>
            <h2 id="business">BIG business</h2>
            <h3 id="articles">SUPER articles</h3>
            {articles
              ? (
                <ul>
                  {articles.map((a) => {
                    const language = languageMap.get(a.language);
                    const category = categoryMap.get(a.language)?.get(
                      a.category,
                    );
                    // const title = a.title.slice(0, MAX_LENGTH_OF_TITLE) + "...";
                    const title = a.title.substring(0, MAX_LENGTH_OF_TITLE) +
                      (a.title.length > MAX_LENGTH_OF_TITLE ? "..." : "");
                    return (
                      <li>
                        <a href={a.link}>{title}</a>[{language}][{category}]
                      </li>
                    );
                  })}
                </ul>
              )
              : <div>coming soon...</div>}
            <h3 id="musics">SUPER MUSIC</h3>
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameborder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1547544679&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            >
            </iframe>
            <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
              <a
                href="https://soundcloud.com/user-504103970"
                title="canalundayo"
                target="_blank"
                style="color: #cccccc; text-decoration: none;"
              >
                canalundayo
              </a>{" "}
              ·{" "}
              <a
                href="https://soundcloud.com/user-504103970/sets/grand-canyon"
                title="one day"
                target="_blank"
                style="color: #cccccc; text-decoration: none;"
              >
                one day
              </a>
            </div>
            <h3 id="guest-rooms">SUPER NICE guest rooms</h3>
            <ul>
              <li>
                <a href="./guest_rooms/hotel/index.html">
                  <strong>hotel</strong>
                </a>: for those who like riddles…{" "}
                <strong>
                  <span style="color:red;">[temporary closing]</span>
                </strong>
              </li>
              <li>
                <a href="./guest_rooms/oshiri_katori/index.html">
                  <strong>おしりかとり</strong>
                </a>: for those who want summer chill feeling...!{" "}
                <strong>
                </strong>
              </li>
            </ul>
            <Dog />
          </div>
        </div>
      </body>
    </>
  );
}
