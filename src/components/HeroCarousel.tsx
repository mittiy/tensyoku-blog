"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type Hotspot = {
  href: string;
  label: string;
  left: string;
  top: string;
  width: string;
  height: string;
};

type Slide = {
  src: string;
  alt: string;
  hotspots: Hotspot[];
};

// 画像内に描かれたボタンの位置(画像に対する%)に透明リンクを重ねている。
// 画像を差し替える場合はここの座標も合わせて調整すること。
const SLIDES: Slide[] = [
  {
    src: "/images/hero/hero-civil.jpg",
    alt: "土木業界で安定した転職を実現。道路・橋梁・トンネルなど、土木の仕事や将来性、転職ノウハウを丁寧に解説。",
    hotspots: [
      { href: "/categories/civil", label: "土木の記事を見る", left: "3.5%", top: "59%", width: "23%", height: "11%" },
      { href: "/categories/market", label: "転職市場を見る", left: "26.5%", top: "59%", width: "22%", height: "11%" },
      { href: "/nenshu", label: "年収ガイドを見る", left: "3.5%", top: "70.5%", width: "23%", height: "11%" },
    ],
  },
  {
    src: "/images/hero/hero-construction.jpg",
    alt: "建設業でキャリアアップを目指そう。施工管理・大工・電気工事など、建設業界への転職に役立つ情報を幅広く掲載。",
    hotspots: [
      { href: "/categories/construction", label: "建設業の記事を見る", left: "4%", top: "67.5%", width: "20.5%", height: "10%" },
      { href: "/nenshu", label: "年収ガイドを見る", left: "24.5%", top: "67.5%", width: "18.5%", height: "10%" },
      { href: "/shikaku", label: "資格ガイドを見る", left: "4%", top: "77.5%", width: "20.5%", height: "10%" },
    ],
  },
  {
    src: "/images/hero/hero-factory.jpg",
    alt: "工場で働く未来を見つけよう。ライン作業・機械オペレーター・品質管理など、工場転職に役立つ情報をわかりやすく紹介。",
    hotspots: [
      { href: "/categories/factory", label: "工場の記事を見る", left: "4.5%", top: "61.5%", width: "22%", height: "10.5%" },
      { href: "/shikaku", label: "資格ガイドを見る", left: "26.5%", top: "61.5%", width: "22%", height: "10.5%" },
      { href: "/nenshu", label: "年収ガイドを見る", left: "4.5%", top: "72.5%", width: "22%", height: "10.5%" },
    ],
  },
];

const INTERVAL_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS
    );
  }, []);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const goTo = (i: number) => {
    setIndex(i);
    restartTimer();
  };

  return (
    <section
      className="lg:max-w-[1536px] lg:mx-auto lg:px-6 lg:pt-6"
      aria-label="ピックアップ"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-orange-600 lg:rounded-2xl shadow-sm">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={i !== index}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {slide.hotspots.map((spot) => (
              <Link
                key={spot.href + spot.label}
                href={spot.href}
                aria-label={spot.label}
                tabIndex={i === index ? 0 : -1}
                className="absolute rounded-full hover:ring-4 hover:ring-white/60 focus-visible:ring-4 focus-visible:ring-white transition-shadow"
                style={{
                  left: spot.left,
                  top: spot.top,
                  width: spot.width,
                  height: spot.height,
                }}
              />
            ))}
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`スライド${i + 1}を表示`}
              aria-current={i === index}
              className={`w-2.5 h-2.5 rounded-full border border-white/70 transition-colors ${
                i === index ? "bg-white" : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
