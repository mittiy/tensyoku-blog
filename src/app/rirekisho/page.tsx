import type { Metadata } from "next";
import RirekishoApp from "@/components/RirekishoApp";

export const metadata: Metadata = {
  title: "履歴書かんたん作成ツール｜質問に答えるだけで完成",
  description:
    "質問に答えていくだけで履歴書が完成する無料ツール。学歴・職歴の年月は自動計算、志望動機は選択式で自動作成。入力内容は端末内にのみ保存され、印刷・PDF保存にも対応しています。",
};

export default function RirekishoPage() {
  return <RirekishoApp />;
}
