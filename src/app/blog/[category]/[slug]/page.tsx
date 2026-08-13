import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverImage
      ? { images: [{ url: post.coverImage }] }
      : undefined,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-600 transition-colors">
          ホーム
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-orange-600 transition-colors">
          記事一覧
        </Link>
        <span>/</span>
        <span className="text-gray-600 truncate">{post.title}</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge category={post.category} asLink />
          <time className="text-sm text-gray-400">{formatDate(post.date)}</time>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-4">
          {post.title}
        </h1>
        <p className="text-gray-500 leading-relaxed">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          className="w-full aspect-[16/9] object-cover rounded-xl mb-8"
        />
      )}

      <hr className="border-gray-200 mb-8" />

      {/* Article body */}
      <article className="prose-content">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      <hr className="border-gray-200 my-10" />

      {/* Back link */}
      <div className="flex justify-between">
        <Link
          href="/blog"
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          ← 記事一覧に戻る
        </Link>
        <Link
          href={`/categories/${post.category}`}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          同カテゴリーの記事を見る →
        </Link>
      </div>
    </div>
  );
}
