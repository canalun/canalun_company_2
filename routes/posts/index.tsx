import { Handlers, PageProps } from "$fresh/server.ts";
import { getArticles } from "@/utils/getArticles.ts";
import {
  Post,
  PostMetadata,
  getAllPostsMetadata,
} from "../../utils/getPost.ts";
import { Article } from "@/types/Articles.ts";

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
    <body style={{ fontFamily: "system-ui" }}>
      <main
        style={{
          width: "min(60vw, 750px)",
          fontSize: "20px",
          margin: "8vh auto",
          lineHeight: "2em",
        }}
      >
        <h2>Awesome Posts from Canalun Company</h2>
        <div>
          {entries.map((entry) => {
            return new Date("date" in entry ? entry.date : entry.publishedAt) <=
              new Date() ? (
              <EntryCard entry={entry} />
            ) : null;
          })}
        </div>
      </main>
    </body>
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
