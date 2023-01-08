import { Article, categoryMap, languageMap } from "@/types/Articles.ts";

export function ArticleList(props: { articles: Article[]; fontSize: string }) {
  return (
    props.articles
      ? (
        <ul
          style={{
            paddingLeft: "0",
            marginTop: "0",
            fontSize: `${props.fontSize}`,
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
                  "marginBottom": "10px",
                }}
              >
                <div>
                  {a.date.toLocaleDateString()}:{" "}
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
