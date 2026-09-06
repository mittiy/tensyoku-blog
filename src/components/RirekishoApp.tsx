"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/* ---------- 型 ---------- */

type Job = { company: string; joinY: string; joinM: string; leaveY: string; leaveM: string; current: boolean };

type FormData = {
  name: string;
  kana: string;
  birthY: string;
  birthM: string;
  birthD: string;
  gender: string;
  phone: string;
  address: string;
  email: string;
  eduType: string;
  eduName: string;
  eduGradY: string;
  jobs: Job[];
  licenses: string[];
  customLicense: string;
  targetField: string;
  strengths: string[];
  motivationText: string;
  wishes: string[];
  eraMode: "seireki" | "wareki";
};

const EMPTY_JOB: Job = { company: "", joinY: "", joinM: "4", leaveY: "", leaveM: "3", current: false };

const INITIAL: FormData = {
  name: "", kana: "", birthY: "", birthM: "", birthD: "", gender: "", phone: "", address: "", email: "",
  eduType: "高等学校", eduName: "", eduGradY: "",
  jobs: [{ ...EMPTY_JOB }],
  licenses: [], customLicense: "",
  targetField: "", strengths: [], motivationText: "", wishes: [],
  eraMode: "seireki",
};

/* ---------- 定数 ---------- */

const EDU_YEARS: Record<string, number> = {
  中学校: 3, 高等学校: 3, 専門学校: 2, 高等専門学校: 5, 短期大学: 2, 大学: 4,
};

const LICENSE_OPTIONS = [
  "普通自動車第一種運転免許",
  "中型自動車免許",
  "大型自動車免許",
  "フォークリフト運転技能講習 修了",
  "玉掛け技能講習 修了",
  "車両系建設機械運転技能講習 修了",
  "小型移動式クレーン運転技能講習 修了",
  "アーク溶接特別教育 修了",
  "危険物取扱者 乙種4類",
  "第二種電気工事士",
  "2級土木施工管理技士",
  "2級建築施工管理技士",
  "QC検定3級",
];

const STRENGTH_OPTIONS: Record<string, string> = {
  体力: "体力には自信があり、暑さ寒さの中でも安定して働き続けられます",
  継続力: "決められた作業をコツコツと正確に続けることが得意です",
  安全意識: "決まりごとを守る安全意識の高さには自信があります",
  チームワーク: "周囲と声を掛け合いながら進めるチームワークを大切にしています",
  "手に職": "技術を身につけて長く働き続けたいという気持ちが強くあります",
  現場経験: "これまでの現場経験で身につけた段取りと作業の正確さが強みです",
};

const FIELD_SENTENCES: Record<string, string> = {
  工場: "ものづくりの現場で、製品の品質を支える仕事に携わりたいと考え、貴社を志望いたしました。",
  建設業: "形に残る建物をつくる建設の仕事に魅力を感じ、貴社を志望いたしました。",
  土木: "道路やインフラなど、地域の暮らしを支える土木の仕事に携わりたいと考え、貴社を志望いたしました。",
  "運送・物流": "モノの流れを支える物流の仕事に魅力を感じ、貴社を志望いたしました。",
  その他: "貴社の事業内容に魅力を感じ、これまでの経験を活かして貢献したいと考え志望いたしました。",
};

const WISH_OPTIONS: Record<string, string> = {
  規定に従う: "貴社の規定に従います。",
  日勤希望: "勤務時間は日勤を希望いたします。",
  交代制可: "夜勤・交代制勤務にも対応可能です。",
  即日勤務可: "即日勤務が可能です。",
  資格取得意欲: "入社後は業務に必要な資格の取得に積極的に取り組みます。",
};

const STEPS = ["基本情報", "学歴", "職歴", "免許・資格", "志望動機", "本人希望", "完成"];

/* ---------- ユーティリティ ---------- */

function wareki(y: number, m = 12): string {
  if (y > 2019 || (y === 2019 && m >= 5)) return `令和${y - 2018 === 1 ? "元" : y - 2018}年`;
  if (y > 1989 || (y === 1989 && m >= 2)) return `平成${y - 1988 === 1 ? "元" : y - 1988}年`;
  if (y >= 1926) return `昭和${y - 1925 === 1 ? "元" : y - 1925}年`;
  return `${y}年`;
}

function age(by: number, bm: number, bd: number): number {
  const now = new Date();
  let a = now.getFullYear() - by;
  if (now.getMonth() + 1 < bm || (now.getMonth() + 1 === bm && now.getDate() < bd)) a--;
  return a;
}

const STORAGE_KEY = "rirekisho-draft-v1";

/* ---------- 本体 ---------- */

export default function RirekishoApp() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData({ ...INITIAL, ...JSON.parse(saved) });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data, loaded]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const fmtYM = (y: string | number, m: string | number) => {
    const yy = Number(y), mm = Number(m);
    if (!yy) return "";
    return data.eraMode === "wareki" ? `${wareki(yy, mm)}${mm}月` : `${yy}年${mm}月`;
  };

  /* 学歴・職歴の行を生成 */
  const historyRows = useMemo(() => {
    const rows: { date: string; text: string }[] = [];
    const gradY = Number(data.eduGradY);
    if (gradY && data.eduName) {
      const years = EDU_YEARS[data.eduType] ?? 3;
      rows.push({ date: fmtYM(gradY - years, 4), text: `${data.eduName} 入学` });
      rows.push({ date: fmtYM(gradY, 3), text: `${data.eduName} 卒業` });
    }
    for (const j of data.jobs) {
      if (!j.company) continue;
      if (j.joinY) rows.push({ date: fmtYM(j.joinY, j.joinM), text: `${j.company} 入社` });
      if (j.current) rows.push({ date: "", text: "現在に至る" });
      else if (j.leaveY) rows.push({ date: fmtYM(j.leaveY, j.leaveM), text: "一身上の都合により退職" });
    }
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.eduType, data.eduName, data.eduGradY, data.jobs, data.eraMode]);

  /* 志望動機の自動生成 */
  const generateMotivation = (field: string, strengths: string[]) => {
    const head = FIELD_SENTENCES[field] ?? FIELD_SENTENCES["その他"];
    const body = strengths.length
      ? strengths.map((s) => STRENGTH_OPTIONS[s]).join("。") + "。"
      : "";
    return `${head}${body}一日も早く仕事を覚え、長く貢献していきたいと考えております。`;
  };

  const licenses = [
    ...data.licenses,
    ...data.customLicense.split(/[、,\n]/).map((s) => s.trim()).filter(Boolean),
  ];

  const birthText = (() => {
    const y = Number(data.birthY), m = Number(data.birthM), d = Number(data.birthD);
    if (!y || !m || !d) return "";
    const era = data.eraMode === "wareki" ? wareki(y, m) : `${y}年`;
    return `${era}${m}月${d}日生（満${age(y, m, d)}歳）`;
  })();

  const thisYear = new Date().getFullYear();
  const years = (from: number, to: number) => {
    const arr: number[] = [];
    for (let y = to; y >= from; y--) arr.push(y);
    return arr;
  };

  const canNext = () => {
    if (step === 0) return data.name.trim().length > 0;
    return true;
  };

  /* ---------- 入力UI部品 ---------- */

  const inputCls =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-orange-400";
  const selectCls =
    "rounded-lg border border-gray-300 px-2 py-2.5 text-base bg-white focus:outline-none focus:ring-2 focus:ring-orange-400";
  const chip = (active: boolean) =>
    `px-4 py-2.5 rounded-full border text-sm font-medium transition-all cursor-pointer select-none ${
      active
        ? "bg-orange-500 text-white border-orange-500 shadow-sm"
        : "bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50"
    }`;

  const Label = ({ children, hint }: { children: React.ReactNode; hint?: string }) => (
    <div className="mb-1.5">
      <span className="font-semibold text-gray-800 text-sm">{children}</span>
      {hint && <span className="ml-2 text-xs text-gray-400">{hint}</span>}
    </div>
  );

  /* ---------- 各ステップ ---------- */

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div>
              <Label>お名前</Label>
              <input className={inputCls} value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="山田 太郎" />
            </div>
            <div>
              <Label hint="ひらがなでOK">ふりがな</Label>
              <input className={inputCls} value={data.kana} onChange={(e) => set("kana", e.target.value)} placeholder="やまだ たろう" />
            </div>
            <div>
              <Label>生年月日</Label>
              <div className="flex gap-2 items-center">
                <select className={selectCls} value={data.birthY} onChange={(e) => set("birthY", e.target.value)}>
                  <option value="">----</option>
                  {years(thisYear - 70, thisYear - 15).map((y) => (
                    <option key={y} value={y}>{y} ({wareki(y).replace("年", "")})</option>
                  ))}
                </select>
                <span className="text-gray-500 text-sm">年</span>
                <select className={selectCls} value={data.birthM} onChange={(e) => set("birthM", e.target.value)}>
                  <option value="">--</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                <span className="text-gray-500 text-sm">月</span>
                <select className={selectCls} value={data.birthD} onChange={(e) => set("birthD", e.target.value)}>
                  <option value="">--</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <span className="text-gray-500 text-sm">日</span>
              </div>
              {birthText && <p className="mt-1 text-xs text-orange-600">→ {birthText}</p>}
            </div>
            <div>
              <Label hint="任意">性別</Label>
              <div className="flex gap-2 flex-wrap">
                {["男", "女", "記載しない"].map((g) => (
                  <button key={g} type="button" className={chip(data.gender === g)} onClick={() => set("gender", data.gender === g ? "" : g)}>{g}</button>
                ))}
              </div>
            </div>
            <div>
              <Label>電話番号</Label>
              <input className={inputCls} inputMode="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="090-1234-5678" />
            </div>
            <div>
              <Label>住所</Label>
              <input className={inputCls} value={data.address} onChange={(e) => set("address", e.target.value)} placeholder="〇〇県〇〇市〇〇町1-2-3" />
            </div>
            <div>
              <Label hint="任意">メールアドレス</Label>
              <input className={inputCls} inputMode="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="taro@example.com" />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <Label>最終学歴</Label>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(EDU_YEARS).map((t) => (
                  <button key={t} type="button" className={chip(data.eduType === t)} onClick={() => set("eduType", t)}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <Label>学校名</Label>
              <input className={inputCls} value={data.eduName} onChange={(e) => set("eduName", e.target.value)} placeholder="〇〇県立〇〇高等学校" />
            </div>
            <div>
              <Label hint="入学年は自動で計算します">卒業した年</Label>
              <div className="flex gap-2 items-center">
                <select className={selectCls} value={data.eduGradY} onChange={(e) => set("eduGradY", e.target.value)}>
                  <option value="">----</option>
                  {years(thisYear - 55, thisYear).map((y) => (
                    <option key={y} value={y}>{y} ({wareki(y, 3).replace("年", "")})</option>
                  ))}
                </select>
                <span className="text-gray-500 text-sm">年 3月卒業</span>
              </div>
              {data.eduGradY && data.eduName && (
                <p className="mt-2 text-xs text-orange-600">
                  → {fmtYM(Number(data.eduGradY) - (EDU_YEARS[data.eduType] ?? 3), 4)} 入学 / {fmtYM(data.eduGradY, 3)} 卒業 と記載されます
                </p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-500">新しい順ではなく<strong>古い順</strong>に入力してください。職歴がない場合はそのまま「次へ」でOKです。</p>
            {data.jobs.map((job, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-4 space-y-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700 text-sm">{i + 1}社目</span>
                  {data.jobs.length > 1 && (
                    <button type="button" className="text-xs text-red-500 hover:underline" onClick={() => set("jobs", data.jobs.filter((_, x) => x !== i))}>
                      削除
                    </button>
                  )}
                </div>
                <input
                  className={inputCls}
                  value={job.company}
                  onChange={(e) => set("jobs", data.jobs.map((j, x) => (x === i ? { ...j, company: e.target.value } : j)))}
                  placeholder="株式会社〇〇（正式名称）"
                />
                <div className="flex gap-2 items-center flex-wrap">
                  <select className={selectCls} value={job.joinY} onChange={(e) => set("jobs", data.jobs.map((j, x) => (x === i ? { ...j, joinY: e.target.value } : j)))}>
                    <option value="">----</option>
                    {years(thisYear - 55, thisYear).map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <select className={selectCls} value={job.joinM} onChange={(e) => set("jobs", data.jobs.map((j, x) => (x === i ? { ...j, joinM: e.target.value } : j)))}>
                    {Array.from({ length: 12 }, (_, m) => m + 1).map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <span className="text-gray-500 text-sm">に入社 〜</span>
                  {!job.current && (
                    <>
                      <select className={selectCls} value={job.leaveY} onChange={(e) => set("jobs", data.jobs.map((j, x) => (x === i ? { ...j, leaveY: e.target.value } : j)))}>
                        <option value="">----</option>
                        {years(thisYear - 55, thisYear).map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                      <select className={selectCls} value={job.leaveM} onChange={(e) => set("jobs", data.jobs.map((j, x) => (x === i ? { ...j, leaveM: e.target.value } : j)))}>
                        {Array.from({ length: 12 }, (_, m) => m + 1).map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <span className="text-gray-500 text-sm">に退職</span>
                    </>
                  )}
                  <button type="button" className={chip(job.current)} onClick={() => set("jobs", data.jobs.map((j, x) => (x === i ? { ...j, current: !j.current } : j)))}>
                    在職中
                  </button>
                </div>
              </div>
            ))}
            {data.jobs.length < 6 && (
              <button type="button" className="w-full py-3 rounded-xl border-2 border-dashed border-orange-300 text-orange-600 font-semibold hover:bg-orange-50" onClick={() => set("jobs", [...data.jobs, { ...EMPTY_JOB }])}>
                ＋ 会社を追加する
              </button>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-5">
            <p className="text-sm text-gray-500">持っているものを<strong>タップするだけ</strong>。取得年月は書かなくてもOKな書式にしています。</p>
            <div className="flex gap-2 flex-wrap">
              {LICENSE_OPTIONS.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={chip(data.licenses.includes(l))}
                  onClick={() => set("licenses", data.licenses.includes(l) ? data.licenses.filter((x) => x !== l) : [...data.licenses, l])}
                >
                  {l.replace(" 修了", "")}
                </button>
              ))}
            </div>
            <div>
              <Label hint="「、」区切りで複数OK">その他の免許・資格</Label>
              <input className={inputCls} value={data.customLicense} onChange={(e) => set("customLicense", e.target.value)} placeholder="例: 1級塗装技能士、大型特殊免許" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5">
            <div>
              <Label>応募する仕事の分野</Label>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(FIELD_SENTENCES).map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={chip(data.targetField === f)}
                    onClick={() => {
                      const nf = f;
                      setData((d) => ({ ...d, targetField: nf, motivationText: generateMotivation(nf, d.strengths) }));
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label hint="2つまで選ぶのがおすすめ">アピールしたい強み</Label>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(STRENGTH_OPTIONS).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={chip(data.strengths.includes(s))}
                    onClick={() => {
                      setData((d) => {
                        const ns = d.strengths.includes(s) ? d.strengths.filter((x) => x !== s) : [...d.strengths, s].slice(-3);
                        return { ...d, strengths: ns, motivationText: generateMotivation(d.targetField, ns) };
                      });
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label hint="自動で文章を作りました。自由に手直しできます">志望動機（できあがり）</Label>
              <textarea
                className={`${inputCls} min-h-[140px] leading-relaxed`}
                value={data.motivationText || generateMotivation(data.targetField, data.strengths)}
                onChange={(e) => set("motivationText", e.target.value)}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-5">
            <p className="text-sm text-gray-500">当てはまるものをタップすると「本人希望記入欄」に反映されます。迷ったら「規定に従う」だけでOKです。</p>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(WISH_OPTIONS).map((w) => (
                <button
                  key={w}
                  type="button"
                  className={chip(data.wishes.includes(w))}
                  onClick={() => set("wishes", data.wishes.includes(w) ? data.wishes.filter((x) => x !== w) : [...data.wishes, w])}
                >
                  {w}
                </button>
              ))}
            </div>
            <div>
              <Label>年の表記</Label>
              <div className="flex gap-2">
                <button type="button" className={chip(data.eraMode === "seireki")} onClick={() => set("eraMode", "seireki")}>西暦（2026年）</button>
                <button type="button" className={chip(data.eraMode === "wareki")} onClick={() => set("eraMode", "wareki")}>和暦（令和8年）</button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              できあがった履歴書は下のプレビューの通りです。
              <strong>「印刷・PDF保存」ボタン</strong>から、そのまま印刷するか「PDFとして保存」を選んでください（スマホでも使えます）。
              写真欄は空欄なので、印刷後に証明写真(縦4cm×横3cm)を貼ってください。
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 text-white font-bold shadow hover:from-orange-600 hover:to-orange-700"
              >
                🖨 印刷・PDF保存
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("入力内容をすべて消してやり直しますか?")) {
                    localStorage.removeItem(STORAGE_KEY);
                    setData(INITIAL);
                    setStep(0);
                  }
                }}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50"
              >
                最初からやり直す
              </button>
            </div>
            <p className="text-xs text-gray-400">
              入力内容はこの端末のブラウザ内にだけ保存され、サーバーには一切送信されません。
            </p>
          </div>
        );
    }
  };

  /* ---------- 履歴書プレビュー ---------- */

  const motivation = data.motivationText || (data.targetField ? generateMotivation(data.targetField, data.strengths) : "");
  const wishesText = data.wishes.length ? data.wishes.map((w) => WISH_OPTIONS[w]).join("\n") : "貴社の規定に従います。";
  const today = new Date();

  const preview = (
    <div id="rirekisho-sheet" className="bg-white border border-gray-400 p-5 sm:p-8 text-[13px] leading-relaxed text-gray-900" style={{ fontFamily: "'Hiragino Mincho ProN','Yu Mincho',serif" }}>
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-2xl tracking-[0.5em] font-bold">履歴書</h2>
        <span className="text-xs">
          {data.eraMode === "wareki" ? wareki(today.getFullYear(), today.getMonth() + 1) : `${today.getFullYear()}年`}
          {today.getMonth() + 1}月{today.getDate()}日現在
        </span>
      </div>
      <div className="flex gap-4">
        <table className="flex-1 border-collapse w-full" style={{ borderColor: "#333" }}>
          <tbody>
            <tr>
              <td className="border border-gray-500 px-2 py-0.5 text-[10px] text-gray-500 w-20">ふりがな</td>
              <td className="border border-gray-500 px-2 py-0.5 text-[11px]">{data.kana}</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-2 py-3 text-[10px] text-gray-500">氏名</td>
              <td className="border border-gray-500 px-2 py-3 text-xl font-semibold">{data.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-2 py-1.5 text-[10px] text-gray-500">生年月日</td>
              <td className="border border-gray-500 px-2 py-1.5">
                {birthText}
                {data.gender && data.gender !== "記載しない" && <span className="ml-6">{data.gender}</span>}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-2 py-1.5 text-[10px] text-gray-500">住所</td>
              <td className="border border-gray-500 px-2 py-1.5">{data.address}</td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-2 py-1.5 text-[10px] text-gray-500">電話</td>
              <td className="border border-gray-500 px-2 py-1.5">
                {data.phone}
                {data.email && <span className="ml-4 text-[11px]">✉ {data.email}</span>}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-[86px] h-[115px] border border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-400 shrink-0 text-center">
          写真<br />縦4cm<br />横3cm
        </div>
      </div>

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border border-gray-500 px-2 py-1 text-[11px] font-normal w-32">年月</th>
            <th className="border border-gray-500 px-2 py-1 text-[11px] font-normal">学歴・職歴</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-500 px-2 py-1"></td>
            <td className="border border-gray-500 px-2 py-1 text-center font-semibold">学歴・職歴</td>
          </tr>
          {historyRows.map((r, i) => (
            <tr key={i}>
              <td className="border border-gray-500 px-2 py-1 whitespace-nowrap">{r.date}</td>
              <td className="border border-gray-500 px-2 py-1">{r.text}</td>
            </tr>
          ))}
          <tr>
            <td className="border border-gray-500 px-2 py-1"></td>
            <td className="border border-gray-500 px-2 py-1 text-right">以上</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border border-gray-500 px-2 py-1 text-[11px] font-normal">免許・資格</th>
          </tr>
        </thead>
        <tbody>
          {(licenses.length ? licenses : ["特になし"]).map((l, i) => (
            <tr key={i}>
              <td className="border border-gray-500 px-2 py-1">{l}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="w-full border-collapse mt-4">
        <tbody>
          <tr>
            <td className="border border-gray-500 px-2 py-1 text-[11px] text-gray-600 bg-gray-50">志望動機</td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-2 py-2 min-h-[80px] leading-relaxed" style={{ minHeight: 90 }}>{motivation}</td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-2 py-1 text-[11px] text-gray-600 bg-gray-50">本人希望記入欄</td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-2 py-2 whitespace-pre-line">{wishesText}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ---------- レイアウト ---------- */

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #rirekisho-sheet, #rirekisho-sheet * { visibility: visible; }
          #rirekisho-sheet { position: absolute; left: 0; top: 0; width: 100%; border: none !important; }
          header, footer, nav { display: none !important; }
        }
      `}</style>

      <div className="print:hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">履歴書かんたん作成</h1>
        <p className="text-sm text-gray-600 mb-6">
          質問に答えていくだけで履歴書が完成。入力内容は端末内にだけ保存されます(サーバー送信なし)。
        </p>

        {/* 進捗 */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                i === step
                  ? "bg-orange-500 text-white"
                  : i < step
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {i + 1}.{s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 入力 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900 mb-4">
              {step + 1}. {STEPS[step]}
            </h2>
            {renderStep()}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-semibold disabled:opacity-30 hover:bg-gray-50"
              >
                ← 戻る
              </button>
              {step < STEPS.length - 1 && (
                <button
                  type="button"
                  disabled={!canNext()}
                  onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 text-white font-bold shadow-sm hover:from-orange-600 hover:to-orange-700 disabled:opacity-40"
                >
                  次へ →
                </button>
              )}
            </div>
          </div>

          {/* プレビュー */}
          <div>
            <div className="text-sm font-semibold text-gray-500 mb-2">プレビュー（自動更新）</div>
            <div className="overflow-x-auto">{preview}</div>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500 leading-relaxed">
          書き方のコツは
          <Link href="/blog/construction/resume-guide" className="text-orange-600 font-semibold hover:underline">職務経歴書の書き方ガイド</Link>
          と
          <Link href="/blog/factory/factory-interview-guide" className="text-orange-600 font-semibold hover:underline">面接対策ガイド</Link>
          もあわせてどうぞ。
        </div>
      </div>

      {/* 印刷時のみ表示される複製(非表示領域対策は上のCSSで) */}
    </div>
  );
}
