import getFormattedDate from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    postId: string;
  };
};

export function generateMetadata({ params: { postId } }: Props) {
  const posts = getSortedPostsData();

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.id,
  };
}

export default async function Post({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const posts = getSortedPostsData();

  if (!posts.find((post) => post.id === postId)) return notFound();

  const { title, date, contentHtml } = await getPostData(postId);

  const formattedDate = getFormattedDate(date);

  return (
    <main className="px-6 prose prose-2xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{formattedDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link href="/">‹ Back to home</Link>
        </p>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    postId: post.id.toString(),
  }));
}
