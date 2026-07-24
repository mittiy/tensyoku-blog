import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "職種別・必要資格まとめ【総集編】",
  description:
    "工場・建設業・土木の職種別に、最初に取るべき資格からステップアップ資格までを一覧で整理。講習系資格の費用・期間の目安も掲載した保存版ガイドです。",
};

type JobRow = {
  job: string;
  first: string;
  stepUp: string;
  articleHref?: string;
  articleLabel?: string;
};

type FieldSection = {
  id: string;
  icon: string;
  label: string;
  color: { text: string; bg: string; border: string };
  note: string;
  rows: JobRow[];
};

const SECTIONS: FieldSection[] = [
  {
    id: "factory",
    icon: "🏭",
    label: "工場・製造業",
    color: { text: "text-blue-800", bg: "bg-blue-50", border: "border-blue-200" },
    note: "工場は「講習数日で取れる資格」で任される仕事が広がり、国家資格で管理側に進める世界です。",
    rows: [
      {
        job: "ライン作業・製造スタッフ",
        first: "フォークリフト運転技能講習",
        stepUp: "玉掛け／機械保全技能士3級",
        articleHref: "/blog/factory/job-beginners-guide",
        articleLabel: "工場転職完全ガイド",
      },
      {
        job: "機械オペレーター",
        first: "フォークリフト／クレーン系講習",
        stepUp: "機械保全技能士2級／電気工事士",
        articleHref: "/blog/factory/useful-certifications",
        articleLabel: "工場で役立つ資格ランキング",
      },
      {
        job: "品質管理・品質保証",
        first: "QC検定3級",
        stepUp: "QC検定2級／ISO9001内部監査員",
        articleHref: "/blog/factory/quality-control-career",
        articleLabel: "品質管理への転職ガイド",
      },
      {
        job: "食品工場スタッフ",
        first: "食品衛生責任者（1日講習）",
        stepUp: "HACCP研修／食品表示検定",
        articleHref: "/blog/factory/food-factory-career",
        articleLabel: "食品工場への転職ガイド",
      },
      {
        job: "化学・塗装・燃料取扱い",
        first: "危険物取扱者 乙種4類",
        stepUp: "危険物取扱者 甲種／衛生管理者",
        articleHref: "/blog/factory/useful-certifications",
        articleLabel: "工場で役立つ資格ランキング",
      },
    ],
  },
  {
    id: "construction",
    icon: "🏗️",
    label: "建設業",
    color: {
      text: "text-orange-800",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    note: "職人系は技能士、管理側は施工管理技士が軸。資格手当が月給に直結しやすい業界です。",
    rows: [
      {
        job: "とび職",
        first: "玉掛け／フルハーネス特別教育",
        stepUp: "足場の組立て等作業主任者／とび技能士",
        articleHref: "/blog/construction/tobi-career",
        articleLabel: "とび職への転職ガイド",
      },
      {
        job: "大工",
        first: "丸のこ等取扱い特別教育",
        stepUp: "建築大工技能士／2級建築施工管理技士",
        articleHref: "/blog/construction/carpenter-career",
        articleLabel: "大工への転職ガイド",
      },
      {
        job: "電気工事士",
        first: "第二種電気工事士",
        stepUp: "第一種電気工事士／電気工事施工管理技士",
        articleHref: "/blog/construction/electrician-career",
        articleLabel: "電気工事士への転職ガイド",
      },
      {
        job: "配管工",
        first: "配管技能士3級",
        stepUp: "管工事施工管理技士／給水装置工事主任技術者",
        articleHref: "/blog/construction/plumber-career",
        articleLabel: "配管工への転職ガイド",
      },
      {
        job: "施工管理（現場監督）",
        first: "2級施工管理技士（第一次検定）",
        stepUp: "1級施工管理技士",
        articleHref: "/blog/construction/site-manager-career",
        articleLabel: "施工管理技士への転職ガイド",
      },
    ],
  },
  {
    id: "civil",
    icon: "🚧",
    label: "土木",
    color: {
      text: "text-green-800",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    note: "重機・車両系の資格が入り口。現場経験+土木施工管理技士で管理側への道が開けます。",
    rows: [
      {
        job: "土木作業員",
        first: "玉掛け／車両系建設機械運転技能講習",
        stepUp: "2級土木施工管理技士",
        articleHref: "/blog/civil/doboku-beginners-guide",
        articleLabel: "未経験から土木作業員になるには",
      },
      {
        job: "重機オペレーター",
        first: "車両系建設機械運転技能講習",
        stepUp: "移動式クレーン運転士／不整地運搬車",
        articleHref: "/blog/civil/heavy-equipment-operator",
        articleLabel: "重機オペレーターへの転職ガイド",
      },
      {
        job: "ダンプ運転手",
        first: "中型免許（4t）",
        stepUp: "大型免許（10t）／けん引免許",
        articleHref: "/blog/civil/dump-truck-driver",
        articleLabel: "ダンプ運転手への転職ガイド",
      },
      {
        job: "測量士",
        first: "測量士補",
        stepUp: "測量士／土地家屋調査士",
        articleHref: "/blog/civil/surveyor-career",
        articleLabel: "測量士・測量士補への転職ガイド",
      },
      {
        job: "インフラ点検・維持補修",
        first: "2級土木施工管理技士",
        stepUp: "コンクリート診断士／ドローン国家資格",
        articleHref: "/blog/civil/infra-maintenance",
        articleLabel: "インフラメンテナンス業界への転職",
      },
    ],
  },
];

const COURSE_CERTS = [
  { name: "フルハーネス特別教育", days: "1日", cost: "約1万円", use: "高所作業全般（実質必須）" },
  { name: "玉掛け技能講習", days: "3日", cost: "約2.5万円", use: "クレーン荷掛け。現場系の定番" },
  { name: "小型移動式クレーン", days: "3日", cost: "約3万円", use: "ユニック車の操作" },
  { name: "フォークリフト運転技能講習", days: "最大5日", cost: "約4万円", use: "工場・倉庫・資材置き場" },
  { name: "車両系建設機械運転技能講習", days: "最大5日", cost: "約4.5万円", use: "バックホウ等の重機運転" },
  { name: "食品衛生責任者", days: "1日", cost: "約1万円", use: "食品工場・飲食関係" },
];

export default function ShikakuPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <p className="text-orange-200 text-sm font-medium mb-2">保存版・総集編</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            🎓 職種別・必要資格まとめ
          </h1>
          <p className="text-orange-100 max-w-2xl leading-relaxed">
            工場・建設業・土木は「資格がそのまま仕事と年収につながる」業界です。職種ごとに、最初に取るべき資格とステップアップ資格を一覧にまとめました。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* Field sections */}
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{section.icon}</span>
              <h2 className={`text-2xl font-bold ${section.color.text}`}>
                {section.label}
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">{section.note}</p>
            <div
              className={`overflow-x-auto rounded-xl border ${section.color.border}`}
            >
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className={`${section.color.bg} text-left`}>
                    <th className="px-4 py-3 font-semibold text-gray-800">職種</th>
                    <th className="px-4 py-3 font-semibold text-gray-800">
                      最初に取る資格
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-800">
                      ステップアップ資格
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-800">
                      詳しい記事
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {section.rows.map((row) => (
                    <tr key={row.job}>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {row.job}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{row.first}</td>
                      <td className="px-4 py-3 text-gray-700">{row.stepUp}</td>
                      <td className="px-4 py-3">
                        {row.articleHref ? (
                          <Link
                            href={row.articleHref}
                            className="text-orange-600 hover:text-orange-700 font-medium whitespace-nowrap"
                          >
                            {row.articleLabel} →
                          </Link>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        {/* Course certs cost table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            💰 まず取れる講習系資格の費用・期間
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            数日の講習で取得でき、多くの会社が費用を負担してくれます。転職前に自費で取っておくと選考でも有利です。
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-800">資格</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">期間</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">費用目安</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">主な用途</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {COURSE_CERTS.map((cert) => (
                  <tr key={cert.name}>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {cert.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {cert.days}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {cert.cost}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{cert.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※費用は教習機関・地域により異なります。所持免許による免除で期間が短くなる場合があります。
          </p>
        </section>

        {/* Roadmap CTA */}
        <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            どの順番で取ればいい?
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            「講習系 → 技能士 → 施工管理技士」の順に積み上げるのが基本です。未経験からの具体的な取得ロードマップは、こちらの記事で詳しく解説しています。
          </p>
          <Link
            href="/blog/construction/certification-roadmap"
            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold rounded-full text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm"
          >
            資格取得ロードマップを読む →
          </Link>
        </section>
      </div>
    </>
  );
}
