import Link from "next/link";
import { getAllPosts, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import HeroIllustration from "@/components/HeroIllustration";

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-700 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 flex flex-col lg:flex-row items-center gap-8">
          {/* テキスト */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              工場・建設・土木業界への
              <br />
              転職を成功させよう
            </h1>
            <p className="text-orange-100 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              求人の探し方から面接対策、職場環境まで。現場を知り尽くした転職情報をお届けします。
            </p>
            <div className="flex flex-wrap gap-3">
              {(["factory", "construction", "civil"] as const).map((cat) => (
                <Link
                  key={cat}
                  href={`/categories/${cat}`}
                  className="inline-flex items-center px-5 py-2.5 bg-white text-orange-700 font-semibold rounded-full text-sm hover:bg-orange-50 transition-colors shadow"
                >
                  {CATEGORY_LABELS[cat]}の記事を見る
                </Link>
              ))}
            </div>
          </div>

          {/* イラスト */}
          <div className="w-full lg:w-[480px] lg:flex-shrink-0">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Shikaku guide banner */}
      <section className="max-w-5xl mx-auto px-4 pt-10">
        <Link
          href="/shikaku"
          className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-xl border-2 border-orange-200 p-6 hover:border-orange-400 hover:shadow-md transition-all"
        >
          <div className="text-4xl">🎓</div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-gray-900 mb-1">
              職種別・必要資格まとめ【総集編】
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              工場・建設・土木の全職種について、最初に取る資格からステップアップ資格までを一覧で整理した保存版ガイドです。
            </p>
          </div>
          <div className="text-sm font-semibold text-orange-600 group-hover:text-orange-700 whitespace-nowrap">
            資格ガイドを見る →
          </div>
        </Link>
      </section>

      {/* Category cards */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">カテゴリーから探す</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(
            [
              {
                cat: "factory" as const,
                icon: "🏭",
                desc: "ライン作業・機械オペレーター・品質管理など工場勤務の転職情報",
              },
              {
                cat: "construction" as const,
                icon: "🏗️",
                desc: "施工管理・大工・電気工事など建設業界への転職ガイド",
              },
              {
                cat: "civil" as const,
                icon: "🚧",
                desc: "道路・橋梁・トンネルなど土木工事の仕事と転職情報",
              },
            ] as const
          ).map(({ cat, icon, desc }) => {
            const { text } = CATEGORY_COLORS[cat];
            return (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className={`font-bold text-lg mb-2 ${text}`}>
                  {CATEGORY_LABELS[cat]}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                <div className="mt-4 text-sm font-medium text-orange-600 group-hover:text-orange-700">
                  記事を見る →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest posts */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">最新記事</h2>
          <Link
            href="/blog"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            すべての記事を見る →
          </Link>
        </div>
        {latestPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            記事がまだありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
