import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "工場・建設・土木 転職ナビ",
    template: "%s | 工場・建設・土木 転職ナビ",
  },
  description:
    "工場・建設業・土木業界への転職を考えている方向けの情報ブログ。求人の探し方、面接対策、業界の実態など役立つ情報を発信しています。",
  keywords: ["転職", "工場", "建設業", "土木", "求人", "仕事探し"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "工場・建設・土木 転職ナビ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
