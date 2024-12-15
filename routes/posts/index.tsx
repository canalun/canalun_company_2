import { Handlers, PageProps } from "$fresh/server.ts";
import { OceanPalette } from "@/theme/Palette.ts";
import { Article } from "@/types/Articles.ts";
import { getArticles } from "@/utils/getArticles.ts";
import { Post, PostMetadata, getAllPostsMetadata } from "@/utils/getPost.ts";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers<(Post | Article)[]> = {
  async GET(_req, ctx) {
    const _metadataForAllPosts = await getAllPostsMetadata();
    const metadataForAllPosts = _metadataForAllPosts.filter((m) =>
      m.slug.endsWith("_en")
    );

    const pastArticles = await getArticles();

    return ctx.render(
      (metadataForAllPosts as (Post | Article)[]).concat(pastArticles)
    );
  },
};

export default function BlogIndexPage(
  props: PageProps<(PostMetadata | Article)[]>
) {
  const entries = props.data;
  return (
    <html
      style={{
        minHeight: "100%",
      }}
      lang={"ja"}
    >
      <Head>
        <title>Awesome Posts</title>
      </Head>
      <body
        style={{
          background: `linear-gradient(${OceanPalette.blue.sea}, ${OceanPalette.blue.deepSea})`,
        }}
      >
        <main
          style={{
            fontFamily: "system-ui",
            width: "min(60vw, 750px)",
            fontSize: "16px",
            lineHeight: "2em",
            margin: "4vh auto",
            padding: "4vh 5vw",
            background: "white",
          }}
        >
          <div style={{ lineHeight: "1em" }}>
            <a href={"/"}>back to top</a>
          </div>
          <h1>Awesome Posts from Canalun Company</h1>
          <div>
            {entries.map((entry) => {
              return new Date(
                "date" in entry ? entry.date : entry.publishedAt
              ) <= new Date() ? (
                <EntryCard entry={entry} />
              ) : null;
            })}
          </div>
        </main>
      </body>
    </html>
  );
}

type Entry = PostMetadata | Article;
function EntryCard(props: { entry: Entry }) {
  const { entry } = props;
  return (
    <div>
      <span>
        {new Date(
          "date" in entry ? entry.date : entry.publishedAt
        ).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <br />
      <a href={"slug" in entry ? `/posts/${entry.slug}` : entry.link}>
        <span>{entry.title}</span>
      </a>
    </div>
  );
}
