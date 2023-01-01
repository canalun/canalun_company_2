import { Article, categoryMap, languageMap } from "@/types/Articles.ts";

const MAX_LENGTH_OF_TITLE = 25;

export function ReadingList(props: { articles: Article[] }) {
  return (
    props.articles
      ? (
        <ul>
          {props.articles.map((a) => {
            const language = languageMap.get(a.language);
            const category = categoryMap.get(a.language)?.get(
              a.category,
            );
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
      : <div>coming soon...</div>
  );
}
