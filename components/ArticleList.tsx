import { Article, categoryMap, languageMap } from "@/types/Articles.ts";

const MAX_LENGTH_OF_TITLE = 25;

export function ArticleList(props: { articles: Article[] }) {
  const a = props.articles[0];
  const segmenter = new Intl.Segmenter(a.language, {
    granularity: "grapheme",
  });
  const segment = [...segmenter.segment(a.title)];
  console.log(segment);

  return (
    props.articles
      ? (
        <ul
          style={{
            "padding-left": "0",
          }}
        >
          {props.articles.map((a) => {
            const language = languageMap.get(a.language);
            const category = categoryMap.get(a.language)?.get(
              a.category,
            );
            return (
              <li
                style={{
                  "list-style": "none",
                  "marginBottom": "4px",
                  "text-indent": "-0.6em",
                }}
              >
                <div>
                  - {a.date.toLocaleDateString()}:{" "}
                  <a
                    href={a.link}
                  >
                    {a.title}
                  </a>
                  <br />#{language} #{category}
                </div>
              </li>
            );
          })}
        </ul>
      )
      : <div>coming soon...</div>
  );
}
