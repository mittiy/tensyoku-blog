import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "スキル・資格別の年収まとめ【総集編】",
  description:
    "工場・建設・土木の職種とスキル・資格別の年収を、求人データと公的統計をもとに一覧化。資格手当の相場と年収を上げる3つの戦略も解説する保存版ガイドです。",
};

// 出典: 求人ボックス給料ナビ・厚労省統計・各資格スクール調査(2026年時点)をもとにした目安
const SALARY_RANKING = [
  { job: "施工管理(現場監督)", avg: 632, range: "450〜750万円", note: "1級資格+経験で700万円台も", href: "/blog/construction/site-manager-career" },
  { job: "測量士", avg: 501, range: "460〜550万円", note: "測量士補からステップアップ", href: "/blog/civil/surveyor-career" },
  { job: "大工", avg: 488, range: "300〜600万円", note: "棟梁・独立で上振れ", href: "/blog/construction/carpenter-career" },
  { job: "とび職", avg: 471, range: "300〜650万円", note: "職長クラスで500万円超", href: "/blog/construction/tobi-career" },
  { job: "配管工", avg: 449, range: "300〜600万円", note: "独立で1,000万円プレーヤーも", href: "/blog/construction/plumber-career" },
  { job: "ダンプ運転手", avg: 440, range: "350〜550万円", note: "持ち込み一人親方は600万円超", href: "/blog/civil/dump-truck-driver" },
  { job: "設備保全", avg: 435, range: "350〜600万円", note: "大手・プラント系は600万円超も", href: "/blog/factory/maintenance-career" },
  { job: "重機オペレーター", avg: 431, range: "290〜650万円", note: "扱える重機の種類で差がつく", href: "/blog/civil/heavy-equipment-operator" },
  { job: "電気工事士", avg: 420, range: "300〜500万円", note: "第一種で+100〜150万円", href: "/blog/construction/electrician-career" },
  { job: "品質管理", avg: 389, range: "350〜500万円", note: "QCエンジニア職は600万円超も", href: "/blog/factory/quality-control-career" },
] as const;

const MAX_SALARY = 700;

const CERT_SALARY = [
  { cert: "1級施工管理技士", salary: "550〜750万円", allowance: "月1〜3万円", note: "監理技術者として大規模現場を担当可能" },
  { cert: "電験三種", salary: "400〜550万円", allowance: "月0.5〜1万円", note: "上位企業なら600万円以上のケースも" },
  { cert: "コンクリート診断士", salary: "600〜900万円", allowance: "月1〜2万円", note: "インフラ点検分野で希少価値大" },
  { cert: "第一種電気工事士", salary: "400〜500万円", allowance: "月約1万円", note: "第二種より約100〜150万円高い傾向" },
  { cert: "機械保全技能士2級", salary: "400〜550万円", allowance: "月0.5〜1.5万円", note: "設備保全職の一人前の証明" },
  { cert: "2級施工管理技士", salary: "350〜450万円", allowance: "月0.5〜1.5万円", note: "現場監督デビューの入場券" },
  { cert: "第二種電気工事士", salary: "300〜450万円", allowance: "月約5千円", note: "電気系キャリアの出発点" },
  { cert: "QC検定2級", salary: "400〜500万円", allowance: "月0〜1万円", note: "品管職の書類通過率が大きく向上" },
  { cert: "大型免許", salary: "400〜550万円", allowance: "手当より基本給に反映", note: "10tダンプで日当が大きく上がる" },
  { cert: "危険物取扱者 乙4", salary: "350〜450万円", allowance: "月2〜5千円", note: "化学工場・燃料取扱いで優遇" },
  { cert: "フォークリフト", salary: "-", allowance: "月約5千円", note: "工場・倉庫系で最初に取る定番" },
  { cert: "玉掛け・小型移動式クレーン", salary: "-", allowance: "月2〜5千円", note: "現場系の日当アップに直結" },
] as const;

export default function NenshuPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <p className="text-orange-200 text-sm font-medium mb-2">保存版・総集編</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            💰 スキル・資格別の年収まとめ
          </h1>
          <p className="text-orange-100 max-w-2xl leading-relaxed">
            求人データ・公的統計をもとに、工場・建設・土木の職種別平均年収と、資格ごとの年収レンジ・資格手当の相場をまとめました。「何を身につければいくら稼げるか」の全体像がわかります。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* Salary ranking chart */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            📊 職種別・平均年収ランキング
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            求人データベースの公表値をもとにした平均年収です。バーの長さが平均値、右側は実際の年収幅の目安を示しています。
          </p>
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 space-y-4">
            {SALARY_RANKING.map((row, i) => (
              <Link key={row.job} href={row.href} className="block group">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
                    {i + 1}. {row.job}
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {row.range}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 group-hover:from-orange-500 group-hover:to-orange-700 transition-colors"
                      style={{ width: `${(row.avg / MAX_SALARY) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-orange-700 w-20 text-right whitespace-nowrap">
                    {row.avg}万円
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{row.note}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Cert salary table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            🎓 資格別の年収レンジと資格手当の相場
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            同じ職種でも、保有資格で年収と手当が変わります。年収レンジは資格保有者の求人相場、手当は企業調査の相場観です。
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-800">資格</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">年収レンジ目安</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">資格手当相場</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">ポイント</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {CERT_SALARY.map((row) => (
                  <tr key={row.cert}>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {row.cert}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {row.salary}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {row.allowance}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Strategies */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📈 年収を上げる3つの戦略
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-gray-900 mb-2">資格手当を積み上げる</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                危険物乙4(月1万円)+フォークリフト(月5千円)のように組み合わせると月1.5万円=年18万円の差に。講習系資格は数日で取れて一生モノです。
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-gray-900 mb-2">管理側にまわる</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                施工管理の平均年収は632万円と職人系を100万円以上上回ります。現場経験+施工管理技士の組み合わせが最強のキャリアパスです。
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-gray-900 mb-2">独立・一人親方になる</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                電気工事・配管・ダンプ(車両持ち込み)は独立ルートが確立しており、実力次第で年収600〜1,000万円超も。必要資格の取得が前提条件です。
              </p>
            </div>
          </div>
        </section>

        {/* Cross links */}
        <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            どの資格から取ればいい?
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            職種ごとに「最初に取る資格→ステップアップ資格」を整理した資格ガイドと、取得順のロードマップ記事をあわせてどうぞ。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shikaku"
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold rounded-full text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm"
            >
              🎓 職種別・必要資格まとめ →
            </Link>
            <Link
              href="/blog/construction/certification-roadmap"
              className="inline-flex items-center px-5 py-2.5 bg-white border border-orange-300 text-orange-700 font-semibold rounded-full text-sm hover:bg-orange-100 transition-colors"
            >
              資格取得ロードマップを読む →
            </Link>
          </div>
        </section>

        {/* Sources */}
        <section className="text-xs text-gray-400 leading-relaxed">
          <p className="font-semibold text-gray-500 mb-1">参考データ(2026年7月時点)</p>
          <p>
            職種別平均年収は求人ボックス給料ナビの公表値(とび職471万円・大工488万円・配管工449万円・ダンプ運転手440万円・重機オペレーター431万円・設備保全435万円ほか)、施工管理の平均632万円は求人サイト調査、測量士は厚生労働省の統計をもとにした公表値(令和6年・501.6万円)を参照しています。資格手当の相場は資格スクール各社(CIC日本建設情報センター・工事士.comほか)の調査を参考にした目安です。実際の年収は地域・企業規模・経験により変動します。
          </p>
        </section>
      </div>
    </>
  );
}
