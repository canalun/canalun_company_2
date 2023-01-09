import { config } from "dotenv/mod.ts";
import { parse } from "xml/mod.ts";
import { resolvePath } from "@/utils/resolvePath.ts";
import { Article, Category } from "@/types/Articles.ts";

export async function getArticles(): Promise<Article[]> {
  const env = config();

  const zennArticles = getZennArticles(env.ZENN_USER_ID);
  const hatenaArticles = getHatenaArticles(
    env.HATENA_ID,
    env.HATENA_USER_ID,
    env.HATENA_PASSWORD,
  );
  const devtoArticles = getDevtoArticles();
  const otherArticles = getOtherArticles();

  const result = await Promise.all([
    zennArticles,
    hatenaArticles,
    devtoArticles,
    otherArticles,
  ]);

  const articles: Article[] = result.flatMap((article) => article);
  articles.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });
  return articles;
}

async function getZennArticles(user_id: string): Promise<Article[]> {
  const articles: Article[] = [];

  const zennResp = await fetch(
    "https://zenn.dev/api/articles?username=" + user_id +
      "&order=latest",
  );

  if (200 <= zennResp.status && zennResp.status < 300) {
    const data = await zennResp.json();
    const zennArticles = data.articles;

    zennArticles.map((
      // TODO: これは付けているだけなので、io.ts でランタイム型チェックを入れたい
      article: {
        title: string;
        path: string;
        published_at: string | number | Date;
      },
    ) => {
      articles.push({
        language: "ja",
        category: [...setCategory(article.title), "engineering"],
        title: article.title,
        link: "https://zenn.dev" + article.path,
        date: new Date(article.published_at),
      });
    });
  }

  return articles;
}

async function getHatenaArticles(
  id: string,
  user_id: string,
  password: string,
): Promise<Article[]> {
  const articles: Article[] = [];

  const hatenaResp = await fetch(
    "https://blog.hatena.ne.jp/" + id + "/" +
      "canalundayo.hatenablog.com" + "/atom/entry",
    {
      headers: {
        Authorization: "Basic " +
          btoa(`${user_id}:${password}`),
      },
    },
  );

  const hatenaRespText = await hatenaResp.text();

  // TODO: ここが 700-800ms かかっているのでいっそキャッシュしたい
  const parsed = parse(hatenaRespText);
  parsed.feed.entry.map(
    (
      // TODO: これは付けているだけなので、io.ts でランタイム型チェックを入れたい
      entry: {
        title: string;
        link: {
          "@rel": string;
          "@href": string;
        }[];
        published: string;
        "app:control": {
          "app:draft": string;
        };
      },
    ) => {
      if (entry["app:control"]["app:draft"] === "no") {
        articles.push({
          language: "ja",
          category: [...setCategory(entry.title), "thoughts"],
          title: entry.title,
          link: entry.link.find((link) =>
            link["@rel"] === "alternate"
          )?.["@href"] || "",
          date: new Date(entry.published),
        });
      }
    },
  );

  return articles;
}

async function getDevtoArticles(): Promise<Article[]> {
  const articles: Article[] = [];

  // MEMO: めったに叩かないわりに 400ms かかるのでキャッシュから取得
  // const devtoResp = await fetch(
  //   "https://dev.to/search/feed_content?user_id=" + env.DEVTO_USER_ID +
  //     "&class_name=Article",
  // );
  // const data = await devtoResp.json();

  const devtoResp = await Deno.readTextFile(
    resolvePath("../static/articleCache/devtoCache.json"),
  );
  const data = await JSON.parse(devtoResp);

  data.result.map(
    (
      // TODO: これは付けているだけなので、io.ts でランタイム型チェックを入れたい
      entry: {
        title: string;
        path: string;
        readable_publish_date: string;
      },
    ) => {
      articles.push({
        language: "en",
        category: [...setCategory(entry.title), "engineering"],
        title: entry.title,
        link: "https://dev.to" + entry.path,
        date: new Date(entry.readable_publish_date),
      });
      return;
    },
  );

  return articles;
}

async function getOtherArticles(): Promise<Article[]> {
  const articles: Article[] = [];

  const otherArticles = await Deno.readTextFile(
    resolvePath("../static/articleCache/otherArticlesCache.json"),
  );
  const data = await JSON.parse(otherArticles);

  data.result.map(
    (
      // TODO: これは付けているだけなので、io.ts でランタイム型チェックを入れたい
      entry: {
        title: string;
        path: string;
        published_at: string;
      },
    ) => {
      articles.push({
        language: "ja",
        category: [...setCategory(entry.title), "engineering"],
        title: entry.title,
        link: entry.path,
        date: new Date(entry.published_at),
      });
      return;
    },
  );

  return articles;
}

function setCategory(title: string): Category[] {
  const category: Category[] = title.includes("Type") || title.includes("type")
    ? ["typescript"]
    : title.includes("js") || title.includes("javascript")
    ? ["javascript"]
    : title.includes("MySQL") || title.includes("Go") || title.includes("go")
    ? ["serverside"]
    : title.includes("クリティーク") || title.includes("JDA") ||
        title.includes("ディベート")
    ? ["debate"]
    : [];
  return category;
}
