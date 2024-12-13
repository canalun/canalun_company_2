import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Post,
  PostMetadata,
  getAllPostsMetadata,
} from "../../utils/getPost.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const metadataForAllPosts = await getAllPostsMetadata();
    return ctx.render(metadataForAllPosts);
  },
};

export default function BlogIndexPage(props: PageProps<PostMetadata[]>) {
  const posts = props.data;
  return (
    <body style={{ fontFamily: "sans-serif" }}>
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
          {posts.map((post) => (
            <PostCard postMetadata={post} />
          ))}
        </div>
      </main>
    </body>
  );
}

function PostCard(props: { postMetadata: PostMetadata }) {
  const { postMetadata } = props;
  return (
    <div>
      <span>
        {new Date(postMetadata.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <br />
      <a href={`/posts/${postMetadata.slug}`}>
        <span>{postMetadata.title}</span>
      </a>
    </div>
  );
}
