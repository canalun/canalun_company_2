import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { OceanPalette } from "@/theme/Palette.ts";
import { Post, getPost } from "../../utils/getPost.ts";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug, false);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/zenn/zenn-content-css/index.css"></link>
        <script src="/zenn/listen-embed-event/index.js" />
        <title>{post.title}</title>
      </Head>
      <html
        style={{
          minHeight: "100%",
        }}
        lang={post.slug.slice(-2, post.slug.length)}
      >
        <body
          style={{
            background: `linear-gradient(${OceanPalette.blue.sea}, ${OceanPalette.blue.deepSea})`,
          }}
        >
          <main
            style={{
              fontFamily: "sans-serif",
              width: "min(60vw, 750px)",
              fontSize: "16px",
              margin: "4vh auto",
              padding: "4vh 5vw",
              background: "white",
            }}
          >
            <div style={{ marginBottom: "1em" }}>
              <a href={"/posts"}>back to list</a>
            </div>
            <div style={{ marginBottom: "1em" }}>
              <span style={{ marginRight: "1em" }}>lang:</span>
              <a
                href={`/posts/${post.slug.slice(0, -3)}_ja`}
                style={{ marginRight: "1em" }}
              >
                ja
              </a>
              <a
                href={`/posts/${post.slug.slice(0, -3)}_en`}
                style={{ marginRight: "1em" }}
              >
                en
              </a>
            </div>
            <h1>{post.title}</h1>
            <time>
              {new Date(post.publishedAt).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <br></br>
            <br></br>
            <br></br>
            <div
              className="znc"
              style={{
                lineHeight: "2em",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  post.content ??
                  "<div>oh no...the post is unavailable...</div>",
              }}
            />
          </main>
        </body>
      </html>
    </>
  );
}
