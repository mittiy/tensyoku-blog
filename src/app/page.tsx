import Link from "next/link";
import { getAllPosts, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/posts";
import HeroCarousel from "@/components/HeroCarousel";

const CATEGORY_THUMBS = {
  factory: { icon: "🏭", gradient: "from-blue-100 to-blue-200" },
  construction: { icon: "🏗️", gradient: "from-orange-100 to-orange-200" },
  civil: { icon: "🚧", gradient: "from-green-100 to-green-200" },
  market: { icon: "📈", gradient: "from-purple-100 to-purple-200" },
} as const;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 7);

  return (
    <>
      <h1 className="sr-only">
        工場・建設・土木 転職ナビ｜現場仕事の転職情報サイト
      </h1>

      {/* Hero */}
      <HeroCarousel />

      {/* Guide banners */}
      <section className="max-w-5xl mx-auto px-4 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/shikaku"
          className="group flex items-start gap-4 bg-white rounded-xl border-2 border-orange-200 p-6 hover:border-orange-400 hover:shadow-md transition-all"
        >
          <div className="text-4xl">🎓</div>
          <div className="min-w-0">
            <h2 className="font-bold text-lg text-gray-900 mb-1">
              職種別・必要資格まとめ
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              全職種の「最初に取る資格→ステップアップ資格」を一覧で整理した保存版。
            </p>
            <span className="text-sm font-semibold text-orange-600 group-hover:text-orange-700">
              資格ガイドを見る →
            </span>
          </div>
        </Link>
        <Link
          href="/nenshu"
          className="group flex items-start gap-4 bg-white rounded-xl border-2 border-orange-200 p-6 hover:border-orange-400 hover:shadow-md transition-all"
        >
          <div className="text-4xl">💰</div>
          <div className="min-w-0">
            <h2 className="font-bold text-lg text-gray-900 mb-1">
              スキル・資格別の年収まとめ
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              職種別の平均年収ランキングと資格手当の相場を実データで整理。
            </p>
            <span className="text-sm font-semibold text-orange-600 group-hover:text-orange-700">
              年収ガイドを見る →
            </span>
          </div>
        </Link>
      </section>

      {/* Category cards */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">カテゴリーから探す</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              {
                cat: "market" as const,
                icon: "📈",
                desc: "求人倍率・賃金・地域別動向など転職市場の最新レポート",
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
                <div className="flex items-center gap-3 mb-2 sm:block sm:mb-0">
                  <div className="text-3xl sm:text-4xl sm:mb-3">{icon}</div>
                  <h3 className={`font-bold text-lg sm:mb-2 ${text}`}>
                    {CATEGORY_LABELS[cat]}
                  </h3>
                </div>
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
        <h2 className="text-xl font-bold text-gray-900 mb-6">最新記事</h2>
        {latestPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            記事がまだありません。
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {latestPosts.map((post) => {
                const thumb = CATEGORY_THUMBS[post.category];
                const colors = CATEGORY_COLORS[post.category];
                return (
                  <Link
                    key={`${post.category}-${post.slug}`}
                    href={`/blog/${post.category}/${post.slug}`}
                    className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
                  >
                    <div
                      className={`w-24 h-16 sm:w-28 sm:h-[72px] flex-shrink-0 rounded-lg bg-gradient-to-br ${thumb.gradient} flex items-center justify-center text-3xl sm:text-4xl`}
                      aria-hidden
                    >
                      {thumb.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`text-xs px-2 py-0.5 rounded border ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {CATEGORY_LABELS[post.category]}
                        </span>
                        <time className="text-xs text-gray-400">
                          {formatDate(post.date)}
                        </time>
                      </div>
                      <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-orange-700 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold rounded-full text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm"
              >
                過去記事を見る →
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}
