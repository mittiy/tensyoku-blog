# -*- coding: utf-8 -*-
"""サムネイルにキャッチテキストをオーバーレイする"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, sys

THUMBS = "/Users/jj/projects/tensyoku-blog/public/images/thumbs"
FONT_BOLD = "/System/Library/Fonts/ヒラギノ角ゴシック W8.ttc"
FONT_MED = "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc"
ORANGE = (249, 115, 22)

# slug: (メインキャッチ, サブテキスト)
TEXTS = {
    "job-beginners-guide": ("工場転職 完全ガイド", "未経験からの第一歩"),
    "semiconductor-career": ("半導体工場で働く", "成長産業で稼ぐ"),
    "kikanko-guide": ("期間工で貯める", "満了金という武器"),
    "site-manager-career": ("施工管理という仕事", "現場を動かす司令塔"),
    "tobi-career": ("とび職のすべて", "現場の華になる"),
    "electrician-career": ("電気工事士になる", "一生モノの国家資格"),
    "infra-maintenance": ("インフラを守る仕事", "需要は伸び続ける"),
    "heavy-equipment-operator": ("重機オペレーターの道", "操る技術で稼ぐ"),
    "tunnel-worker": ("トンネル工事の実態", "高日当のワケ"),
    "certification-roadmap": ("資格ロードマップ", "取る順番が9割"),
    "factory-interview-guide": ("工場の面接対策", "受かる答え方"),
    "automotive-career": ("自動車工場で働く", "大手で稼ぐ選択肢"),
    "useful-certifications": ("工場の資格ランキング", "コスパで選ぶ"),
    "beginners-guide": ("未経験から建設業へ", "職種の選び方"),
    "work-reform": ("建設業の働き方改革", "週休2日は当たり前へ"),
    "maintenance-career": ("設備保全という選択", "工場を止めない技術者"),
    "engineering-job-appeal": ("土木の魅力", "インフラを支える誇り"),
    "doboku-beginners-guide": ("土木作業員になる", "未経験からのキャリア"),
    "report-2026-07": ("転職市場レポート", "2026年7月号"),
    "report-2026-08": ("転職市場レポート", "2026年8月号"),
    "carpenter-career": ("大工への道", "一生モノの技術"),
    "tekkin-career": ("鉄筋工で稼ぐ", "求人倍率7倍超"),
    "over40-tensyoku": ("40代50代の工場転職", "遅すぎることはない"),
    "hitorioyakata-guide": ("一人親方 vs 正社員", "どっちが得?"),
    "resume-guide": ("職務経歴書の書き方", "現場経験を武器に"),
    "taishoku-guide": ("円満退職の正解", "切り出し方から引き継ぎまで"),
    "shikaku-exam-autumn": ("秋の資格試験", "8月が仕込みどき"),
    "uturn-tensyoku": ("Uターン転職", "帰省がチャンスになる"),
    "obon-ake-schedule": ("お盆明けが狙い目", "転職スケジュール術"),
    "obon-kyuka-guide": ("工場のお盆休み事情", "休みが多い職場の見分け方"),
    "tosou-career": ("塗装工になる", "独立しやすさトップクラス"),
    "yosetsu-career": ("溶接工で稼ぐ", "手に職の代表格"),
    "zoen-career": ("造園職人になる", "緑を仕事にする"),
    "crane-operator": ("クレーンオペの道", "大きい機械ほど稼げる"),
    "late-august-factory-jobs": ("工場求人の仕込み期", "8月後半・秋の増産に乗る"),
    "late-august-site-safety": ("残暑と台風の現場", "8月後半の見学チェック"),
    "late-august-license-course": ("8月後半に取る講習系資格", "数日で「取得済み」に"),
    "jogesuido-career": ("上下水道工事の仕事", "老朽化対策で仕事が続く"),
    "naiso-career": ("内装仕上げ職人になる", "天候に左右されない働き方"),
    "haken-vs-seishain": ("派遣 vs 正社員", "工場で得なのはどっち?"),
}

def fit_font(draw, text, path, start, max_w):
    size = start
    while size > 30:
        f = ImageFont.truetype(path, size)
        w = draw.textlength(text, font=f)
        if w <= max_w:
            return f
        size -= 4
    return ImageFont.truetype(path, 30)

def process(slug, main, sub):
    p = os.path.join(THUMBS, slug + ".jpg")
    img = Image.open(p).convert("RGB")
    W, H = img.size  # 1200x675想定

    # 下部グラデーション(透明→黒)
    grad = Image.new("L", (1, H), 0)
    for y in range(H):
        t = (y - H * 0.45) / (H * 0.55)
        grad.putpixel((0, y), int(max(0, min(1, t)) ** 1.2 * 200))
    alpha = grad.resize((W, H))
    black = Image.new("RGB", (W, H), (10, 10, 14))
    img = Image.composite(black, img, alpha.point(lambda a: a))
    # ↑compositeはmask=255で黒側。alphaをそのままマスクに
    d = ImageDraw.Draw(img)

    margin = 56
    # サブテキスト(オレンジのバー+白文字)
    f_sub = fit_font(d, sub, FONT_MED, 44, W - margin * 2 - 26)
    sub_bbox = d.textbbox((0, 0), sub, font=f_sub)
    sub_h = sub_bbox[3] - sub_bbox[1]
    # メインテキスト
    f_main = fit_font(d, main, FONT_BOLD, 96, W - margin * 2)
    main_bbox = d.textbbox((0, 0), main, font=f_main)
    main_h = main_bbox[3] - main_bbox[1]

    y_main = H - margin - main_h - main_bbox[1]
    y_sub = y_main + main_bbox[1] - sub_h - 26 - sub_bbox[1]

    # サブ: オレンジバー
    bar_w = 10
    d.rectangle([margin, y_sub + sub_bbox[1], margin + bar_w,
                 y_sub + sub_bbox[1] + sub_h], fill=ORANGE)
    # 影付きテキスト描画
    def text_with_shadow(pos, text, font, fill):
        x, y = pos
        d.text((x + 3, y + 3), text, font=font, fill=(0, 0, 0))
        d.text((x, y), text, font=font, fill=fill)

    text_with_shadow((margin + bar_w + 16, y_sub), sub, f_sub, (255, 235, 220))
    text_with_shadow((margin, y_main), main, f_main, (255, 255, 255))

    img.save(p, "JPEG", quality=85)
    return slug

if __name__ == "__main__":
    only = sys.argv[1:] if len(sys.argv) > 1 else list(TEXTS.keys())
    for slug in only:
        main, sub = TEXTS[slug]
        print(process(slug, main, sub))
