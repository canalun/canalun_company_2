import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
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
      </Head>
      <body>
        <main
          style={{
            fontSize: "16px",
            margin: "5%",
          }}
        >
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
            dangerouslySetInnerHTML={{
              __html:
                post.content ?? "<div>oh no...the post is unavailable...</div>",
            }}
          />
        </main>
      </body>
    </>
  );
}
