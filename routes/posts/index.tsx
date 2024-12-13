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
      <h1>Awesome Posts</h1>
      <div>
        {posts.map((post) => (
          <PostCard postMetadata={post} />
        ))}
      </div>
    </body>
  );
}

function PostCard(props: { postMetadata: PostMetadata }) {
  const { postMetadata } = props;
  return (
    <div>
      <a href={`/posts/${postMetadata.slug}`}>
        <h3>{postMetadata.title}</h3>
        <time>
          {new Date(postMetadata.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </a>
    </div>
  );
}
