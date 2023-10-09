import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";

export const revalidate = process.env.REVALIDATE;

type Props = {
  params: {
    postId: string;
  };
};

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`);

  // const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`);

  if (!post) notFound();

  const { meta, content } = post;

  const formattedDate = getFormattedDate(meta.date);

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="mt-0 text-sm">{formattedDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
        <p className="mh-10">
          <Link href="/">← Back to Home</Link>
        </p>
      </section>
    </>
  );
}

// Revalidate=0 & generateStaticParams do not work together because here pages are SSR
export async function generateStaticParams() {
  const posts = await getPostsMeta();

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id.toString(),
  }));
}
