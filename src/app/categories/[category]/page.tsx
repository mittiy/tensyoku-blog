import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostsByCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type PostFrontmatter,
} from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const VALID_CATEGORIES: PostFrontmatter["category"][] = [
  "factory",
  "construction",
  "civil",
];

const CATEGORY_DESCRIPTIONS: Record<PostFrontmatter["category"], string> = {
  factory:
    "工場勤務・製造業への転職情報。ライン作業・機械オペレーター・品質管理など様々な職種を紹介します。",
  construction:
    "建設業界への転職情報。施工管理・大工・電気工事・設備工事など建設現場のリアルをお届けします。",
  civil:
    "土木工事業界への転職情報。道路・橋梁・トンネル・河川など公共インフラを支える仕事の魅力を紹介します。",
};

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as PostFrontmatter["category"])) {
    return {};
  }
  const cat = category as PostFrontmatter["category"];
  return {
    title: `${CATEGORY_LABELS[cat]}の転職情報`,
    description: CATEGORY_DESCRIPTIONS[cat],
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as PostFrontmatter["category"])) {
    notFound();
  }

  const cat = category as PostFrontmatter["category"];
  const posts = getPostsByCategory(cat);
  const { bg, text } = CATEGORY_COLORS[cat];

  const ICONS: Record<PostFrontmatter["category"], string> = {
    factory: "🏭",
    construction: "🏗️",
    civil: "🚧",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-600 transition-colors">
          ホーム
        </Link>
        <span>/</span>
        <span className="text-gray-600">{CATEGORY_LABELS[cat]}</span>
      </nav>

      {/* Category header */}
      <div className={`${bg} rounded-2xl p-6 mb-8 border ${CATEGORY_COLORS[cat].border}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{ICONS[cat]}</span>
          <h1 className={`text-2xl font-bold ${text}`}>
            {CATEGORY_LABELS[cat]}の転職情報
          </h1>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {CATEGORY_DESCRIPTIONS[cat]}
        </p>
        <p className="text-xs text-gray-400 mt-2">全{posts.length}件</p>
      </div>

      {/* Other categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="text-sm text-gray-500 self-center mr-1">他のカテゴリー:</span>
        {VALID_CATEGORIES.filter((c) => c !== cat).map((c) => (
          <Link
            key={c}
            href={`/categories/${c}`}
            className="px-3 py-1 text-sm border border-gray-300 rounded-full text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors"
          >
            {CATEGORY_LABELS[c]}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          このカテゴリーの記事はまだありません。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
