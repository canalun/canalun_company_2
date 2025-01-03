import {
  Article,
  Category,
  categoryMap,
  languageMap,
} from "@/types/Articles.ts";
import { OceanPalette } from "@/theme/Palette.ts";

export function ArticleList(props: {
  articles: Article[];
  fontSize: string;
  maxNum?: number;
  withTags: boolean;
}) {
  const tagColor: {
    [K in Category]: { fontColor: string; backgroundColor: string };
  } = {
    engineering: {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.blue.sea,
    },
    javascript: {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.blue.sky,
    },
    typescript: {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.blue.deepSea,
    },
    serverside: {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.blue.mid,
    },
    debate: { fontColor: "black", backgroundColor: OceanPalette.white.basic },
    thoughts: {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.brown.ground,
    },
    philosophy: {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.brown.bottomOfTheSea,
    },
  };
  const articles = props.articles.slice(0, props.maxNum);
  return articles ? (
    <div style={{ lineHeight: "1.2em", fontSize: `${props.fontSize}` }}>
      <ul
        style={{
          paddingLeft: "0",
        }}
      >
        {articles.map((a) => {
          return (
            <li
              style={{
                "list-style": "none",
                marginBottom: "10px",
              }}
            >
              <div>
                {a.date.toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                : <a href={a.link}>{a.title}</a>
                {props.withTags ? (
                  <div>
                    {a.category.map((category) => {
                      return (
                        <span
                          style={{
                            borderRadius: "5px",
                            margin: "4px 2px 4px 0px",
                            padding: "4px",
                            backgroundColor:
                              tagColor[category]["backgroundColor"],
                            color: tagColor[category]["fontColor"],
                            fontSize: "14px",
                            display: "inline-block",
                          }}
                        >
                          #{categoryMap.get(a.language)?.get(category)}
                        </span>
                      );
                    })}
                    <span
                      style={{
                        borderRadius: "5px",
                        margin: "4px 2px 4px 0px",
                        padding: "4px",
                        backgroundColor: OceanPalette.green.mid,
                        color: "white",
                        fontSize: "14px",
                        display: "inline-block",
                      }}
                    >
                      #{languageMap.get(a.language)}
                    </span>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      <a href="/posts">🙌See More🙌</a>
    </div>
  ) : (
    <div>coming soon...</div>
  );
}
