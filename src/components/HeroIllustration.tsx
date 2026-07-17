export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 340"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* ===== 地面 ===== */}
      <rect x="0" y="295" width="520" height="45" fill="rgba(0,0,0,0.15)" />
      {/* 道路の白線 */}
      {[30, 90, 150, 210, 270, 330, 390, 450].map((x) => (
        <rect key={x} x={x} y="308" width="40" height="5" fill="rgba(255,255,255,0.25)" rx="2" />
      ))}

      {/* ===== 背景ビル群（左奥） ===== */}
      <rect x="10" y="140" width="38" height="155" fill="rgba(255,255,255,0.10)" rx="2" />
      <rect x="52" y="110" width="42" height="185" fill="rgba(255,255,255,0.13)" rx="2" />
      <rect x="98" y="130" width="32" height="165" fill="rgba(255,255,255,0.10)" rx="2" />
      {/* ビル窓 */}
      {[150, 165, 180, 195, 210, 225, 240, 255].map((y) => (
        <g key={y}>
          <rect x="15" y={y} width="10" height="7" fill="rgba(255,220,120,0.45)" rx="1" />
          <rect x="29" y={y} width="10" height="7" fill="rgba(255,220,120,0.25)" rx="1" />
          <rect x="57" y={y} width="10" height="7" fill="rgba(255,220,120,0.45)" rx="1" />
          <rect x="71" y={y} width="10" height="7" fill="rgba(255,220,120,0.3)" rx="1" />
          <rect x="85" y={y} width="10" height="7" fill="rgba(255,220,120,0.2)" rx="1" />
        </g>
      ))}

      {/* ===== 工場（右側） ===== */}
      {/* 工場本体 */}
      <rect x="355" y="180" width="150" height="115" fill="rgba(255,255,255,0.18)" rx="3" />
      {/* 工場屋根 */}
      <polygon points="355,180 430,155 505,180" fill="rgba(255,255,255,0.22)" />
      {/* 工場扉 */}
      <rect x="400" y="240" width="35" height="55" fill="rgba(0,0,0,0.2)" rx="2" />
      <rect x="402" y="242" width="15" height="51" fill="rgba(0,0,0,0.15)" rx="1" />
      <rect x="419" y="242" width="14" height="51" fill="rgba(0,0,0,0.1)" rx="1" />
      {/* 工場窓 */}
      <rect x="362" y="200" width="25" height="18" fill="rgba(255,220,120,0.5)" rx="2" />
      <rect x="362" y="228" width="25" height="18" fill="rgba(255,220,120,0.35)" rx="2" />
      <rect x="460" y="200" width="25" height="18" fill="rgba(255,220,120,0.5)" rx="2" />
      <rect x="460" y="228" width="25" height="18" fill="rgba(255,220,120,0.35)" rx="2" />
      {/* 煙突1 */}
      <rect x="370" y="115" width="18" height="70" fill="rgba(255,255,255,0.28)" rx="3" />
      <ellipse cx="379" cy="114" rx="11" ry="5" fill="rgba(255,255,255,0.35)" />
      {/* 煙突2 */}
      <rect x="400" y="100" width="18" height="60" fill="rgba(255,255,255,0.25)" rx="3" />
      <ellipse cx="409" cy="99" rx="11" ry="5" fill="rgba(255,255,255,0.32)" />
      {/* 煙 */}
      <ellipse cx="374" cy="100" rx="10" ry="8" fill="rgba(255,255,255,0.12)" />
      <ellipse cx="366" cy="88" rx="12" ry="9" fill="rgba(255,255,255,0.09)" />
      <ellipse cx="358" cy="74" rx="14" ry="10" fill="rgba(255,255,255,0.06)" />
      <ellipse cx="405" cy="82" rx="11" ry="8" fill="rgba(255,255,255,0.10)" />
      <ellipse cx="398" cy="68" rx="13" ry="9" fill="rgba(255,255,255,0.07)" />

      {/* ===== 工事中ビル（中央）===== */}
      {/* 骨組み */}
      <rect x="205" y="100" width="130" height="195" fill="rgba(255,255,255,0.08)" rx="2" />
      {/* 足場の縦柱 */}
      {[210, 230, 250, 270, 290, 310, 325].map((x) => (
        <rect key={x} x={x} y="100" width="3" height="195" fill="rgba(255,255,255,0.30)" />
      ))}
      {/* 足場の横梁 */}
      {[130, 160, 190, 220, 250, 270, 295].map((y) => (
        <rect key={y} x="210" y={y} width="118" height="3" fill="rgba(255,255,255,0.25)" />
      ))}
      {/* 足場の斜め材 */}
      <line x1="210" y1="130" x2="230" y2="160" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <line x1="230" y1="130" x2="250" y2="160" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <line x1="250" y1="130" x2="270" y2="160" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <line x1="270" y1="130" x2="290" y2="160" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <line x1="290" y1="130" x2="310" y2="160" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      {/* 壁パネル（一部）*/}
      <rect x="210" y="220" width="115" height="75" fill="rgba(255,255,255,0.14)" />
      {/* 窓穴（工事中）*/}
      <rect x="218" y="108" width="22" height="18" fill="rgba(0,0,0,0.15)" rx="1" />
      <rect x="248" y="108" width="22" height="18" fill="rgba(0,0,0,0.15)" rx="1" />
      <rect x="278" y="108" width="22" height="18" fill="rgba(255,220,120,0.35)" rx="1" />
      <rect x="308" y="108" width="15" height="18" fill="rgba(0,0,0,0.12)" rx="1" />
      <rect x="218" y="138" width="22" height="18" fill="rgba(255,220,120,0.4)" rx="1" />
      <rect x="248" y="138" width="22" height="18" fill="rgba(0,0,0,0.15)" rx="1" />
      <rect x="278" y="138" width="22" height="18" fill="rgba(0,0,0,0.12)" rx="1" />
      <rect x="308" y="138" width="15" height="18" fill="rgba(255,220,120,0.3)" rx="1" />

      {/* ===== クレーン（中央やや右）===== */}
      {/* マスト（垂直柱）*/}
      <rect x="196" y="30" width="10" height="265" fill="rgba(255,255,255,0.45)" rx="2" />
      {/* 水平アーム（ジブ）*/}
      <rect x="140" y="30" width="165" height="8" fill="rgba(255,255,255,0.45)" rx="2" />
      {/* カウンターウェイト側 */}
      <rect x="140" y="30" width="55" height="8" fill="rgba(255,255,255,0.55)" rx="2" />
      {/* カウンターウェイト */}
      <rect x="140" y="36" width="28" height="16" fill="rgba(255,255,255,0.40)" rx="2" />
      {/* ワイヤー */}
      <line x1="200" y1="30" x2="290" y2="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="260" y1="38" x2="260" y2="105" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      <line x1="290" y1="38" x2="260" y2="105" stroke="rgba(255,255,255,0.40)" strokeWidth="1.5" />
      {/* フック */}
      <rect x="252" y="105" width="16" height="20" fill="rgba(255,200,50,0.85)" rx="2" />
      <path d="M260,125 Q256,135 260,138 Q264,135 260,125" fill="rgba(255,200,50,0.85)" strokeWidth="1" />
      {/* 吊り荷（鋼材）*/}
      <rect x="240" y="122" width="40" height="8" fill="rgba(255,255,255,0.60)" rx="1" />
      <rect x="244" y="128" width="40" height="8" fill="rgba(255,255,255,0.50)" rx="1" />
      {/* ワイヤー補助線 */}
      <line x1="200" y1="38" x2="200" y2="290" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />

      {/* ===== 作業員（左前景）===== */}
      {/* 胴体 */}
      <rect x="148" y="228" width="24" height="35" fill="rgba(255,255,255,0.80)" rx="3" />
      {/* 反射ベスト */}
      <rect x="148" y="232" width="24" height="31" fill="rgba(255,160,0,0.65)" rx="2" />
      <rect x="152" y="232" width="4" height="31" fill="rgba(255,255,255,0.50)" />
      <rect x="162" y="232" width="4" height="31" fill="rgba(255,255,255,0.50)" />
      {/* 頭 */}
      <ellipse cx="160" cy="222" rx="11" ry="11" fill="rgba(255,255,255,0.85)" />
      {/* ヘルメット */}
      <path d="M149,220 Q160,205 171,220 Z" fill="rgba(255,160,0,0.95)" />
      <rect x="146" y="218" width="28" height="5" fill="rgba(255,140,0,0.90)" rx="2" />
      {/* 腕（左）*/}
      <rect x="136" y="230" width="13" height="6" fill="rgba(255,255,255,0.75)" rx="3" transform="rotate(20,149,233)" />
      {/* 腕（右・クリップボード持ち）*/}
      <rect x="171" y="228" width="13" height="6" fill="rgba(255,255,255,0.75)" rx="3" transform="rotate(-15,171,231)" />
      {/* クリップボード */}
      <rect x="179" y="228" width="14" height="18" fill="rgba(255,255,255,0.70)" rx="2" />
      <rect x="181" y="225" width="10" height="4" fill="rgba(255,255,255,0.60)" rx="1" />
      <line x1="181" y1="235" x2="191" y2="235" stroke="rgba(200,200,200,0.6)" strokeWidth="1" />
      <line x1="181" y1="239" x2="191" y2="239" stroke="rgba(200,200,200,0.6)" strokeWidth="1" />
      <line x1="181" y1="243" x2="188" y2="243" stroke="rgba(200,200,200,0.6)" strokeWidth="1" />
      {/* 脚 */}
      <rect x="151" y="262" width="9" height="33" fill="rgba(80,80,120,0.60)" rx="2" />
      <rect x="162" y="262" width="9" height="33" fill="rgba(80,80,120,0.60)" rx="2" />
      {/* 安全靴 */}
      <rect x="149" y="292" width="13" height="6" fill="rgba(50,50,60,0.70)" rx="2" />
      <rect x="160" y="292" width="13" height="6" fill="rgba(50,50,60,0.70)" rx="2" />

      {/* ===== 前景アイテム ===== */}
      {/* 工事コーン */}
      <polygon points="95,295 115,295 108,260 102,260" fill="rgba(255,120,0,0.85)" />
      <rect x="90" y="293" width="30" height="5" fill="rgba(255,255,255,0.40)" rx="1" />
      <rect x="94" y="278" width="22" height="4" fill="rgba(255,255,255,0.55)" rx="1" />
      {/* コーン2 */}
      <polygon points="348,295 364,295 358,268 354,268" fill="rgba(255,120,0,0.80)" />
      <rect x="344" y="293" width="24" height="5" fill="rgba(255,255,255,0.40)" rx="1" />
      <rect x="347" y="280" width="18" height="3" fill="rgba(255,255,255,0.50)" rx="1" />
      {/* ヘルメット（地面）*/}
      <path d="M60,295 Q78,270 96,295 Z" fill="rgba(255,160,0,0.80)" />
      <rect x="57" y="292" width="42" height="5" fill="rgba(255,140,0,0.75)" rx="2" />
    </svg>
  );
}
