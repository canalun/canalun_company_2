import showdown from "npm:showdown";
import lib from "npm:zenn-markdown-html";
import { join } from "std/path/mod.ts";
const markdownToHtml = lib.default;

export type Post = {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string | null;
};

export type PostMetadata = Omit<Post, "content">;

const converter = new showdown.Converter({ metadata: true });

export async function getPost(
  slug: string,
  metadataOnly: boolean
): Promise<Post> {
  const text = await Deno.readTextFile(join("posts", `${slug}.md`));

  // showdown has to make html in order to get meta data...!
  const meta = converter.makeHtml(text) && converter.getMetadata();

  // zenn parser can only handle md without meta data...!
  const html = metadataOnly ? null : markdownToHtml(text.split("---\n", 3)[2]);

  return {
    slug,
    title: meta.title,
    publishedAt: new Date(meta.published_at),
    content: html,
  };
}

export async function getAllPostsMetadata(): Promise<Post[]> {
  const posts = [];
  for await (const dirEntry of Deno.readDir("posts")) {
    posts.push(await getPost(dirEntry.name.slice(0, -3), true));
  }
  return posts;
}
