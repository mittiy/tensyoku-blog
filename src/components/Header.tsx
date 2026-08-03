import Link from "next/link";
import { CATEGORY_LABELS, type PostFrontmatter } from "@/lib/posts";

const CATEGORY_ICONS: Record<PostFrontmatter["category"], string> = {
  factory: "🏭",
  construction: "🏗️",
  civil: "🚧",
  market: "📈",
};

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2 h-16">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 min-w-0">
            <span className="text-xl sm:text-2xl">🏗️</span>
            <div className="min-w-0">
              <div className="font-bold text-gray-900 text-sm sm:text-base leading-tight whitespace-nowrap">
                工場・建設・土木
              </div>
              <div className="text-[10px] sm:text-xs text-orange-600 font-medium leading-tight whitespace-nowrap">
                転職ナビ
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Link
              href="/blog"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap text-white bg-gradient-to-b from-orange-500 to-orange-600 rounded-full shadow-sm hover:from-orange-600 hover:to-orange-700 hover:shadow transition-all"
            >
              <span aria-hidden className="hidden sm:inline">📰</span>
              記事一覧
            </Link>
            <Link
              href="/shikaku"
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap text-gray-600 bg-white border border-gray-200 rounded-full hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50 hover:shadow-sm transition-all"
            >
              <span aria-hidden className="hidden sm:inline">🎓</span>
              資格<span className="hidden sm:inline">ガイド</span>
            </Link>
            <Link
              href="/nenshu"
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap text-gray-600 bg-white border border-gray-200 rounded-full hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50 hover:shadow-sm transition-all"
            >
              <span aria-hidden className="hidden sm:inline">💰</span>
              年収<span className="hidden sm:inline">ガイド</span>
            </Link>
            {(["factory", "construction", "civil", "market"] as const).map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-gray-600 bg-white border border-gray-200 rounded-full hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50 hover:shadow-sm transition-all"
              >
                <span aria-hidden>{CATEGORY_ICONS[cat]}</span>
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
