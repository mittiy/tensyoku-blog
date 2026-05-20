import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/posts";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <div>
              <div className="font-bold text-gray-900 text-base leading-tight">
                工場・建設・土木
              </div>
              <div className="text-xs text-orange-600 font-medium leading-tight">
                転職ナビ
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/blog"
              className="px-3 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            >
              記事一覧
            </Link>
            {(["factory", "construction", "civil"] as const).map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat}`}
                className="px-3 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors hidden sm:block"
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
