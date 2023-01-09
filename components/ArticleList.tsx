import {
  Article,
  Category,
  categoryMap,
  languageMap,
} from "@/types/Articles.ts";
import { OceanPalette } from "@/theme/palette.ts";

export function ArticleList(props: { articles: Article[]; fontSize: string }) {
  const tagColor: {
    [K in Category]: { fontColor: string; backgroundColor: string };
  } = {
    "engineering": {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.blue.sea,
    },
    "javascript": {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.blue.sky,
    },
    "typescript": {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.blue.deepSea,
    },
    "serverside": {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.blue.mid,
    },
    "debate": { fontColor: "black", backgroundColor: OceanPalette.white.basic },
    "thoughts": {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.brown.ground,
    },
    "philosophy": {
      fontColor: OceanPalette.white.basic,
      backgroundColor: OceanPalette.brown.bottomOfTheSea,
    },
  };
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
                      }}
                    >
                      #{languageMap.get(a.language)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )
      : <div>coming soon...</div>
  );
}
