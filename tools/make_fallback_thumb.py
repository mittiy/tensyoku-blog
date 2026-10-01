# -*- coding: utf-8 -*-
"""ChatGPTで写真を作れないときの代替サムネ(背景だけ)を作る。文字はこの後 add_text.py で入れる。

使い方: python tools/make_fallback_thumb.py <slug> <category>
category: factory | construction | civil | market
"""
from PIL import Image, ImageDraw, ImageFont
import os, sys

THUMBS = os.path.join(os.path.dirname(__file__), "..", "public", "images", "thumbs")
FONT_BOLD = "/System/Library/Fonts/ヒラギノ角ゴシック W8.ttc"
W, H = 1200, 675

THEMES = {
    "factory": ((30, 64, 175), (96, 165, 250), "工場・製造業"),
    "construction": ((194, 65, 12), (251, 146, 60), "建設業"),
    "civil": ((21, 128, 61), (74, 222, 128), "土木"),
    "market": ((88, 28, 135), (192, 132, 252), "転職市場"),
}


def make(slug, category):
    dark, light, label = THEMES[category]
    img = Image.new("RGB", (W, H), dark)
    px = img.load()
    for y in range(H):
        for x in range(0, W, 4):
            t = (x / W) * 0.6 + (y / H) * 0.4
            c = tuple(int(dark[i] + (light[i] - dark[i]) * t) for i in range(3))
            for dx in range(4):
                if x + dx < W:
                    px[x + dx, y] = c

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    # 現場の安全テープ風の斜めストライプ(右上)
    for k in range(-2, 9):
        x0 = 700 + k * 70
        d.polygon([(x0, 0), (x0 + 35, 0), (x0 - 165, 200), (x0 - 200, 200)],
                  fill=(255, 255, 255, 28))
    # 大きな分類ラベル(透かし)
    f_big = ImageFont.truetype(FONT_BOLD, 150)
    d.text((60, 70), label, font=f_big, fill=(255, 255, 255, 40))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")

    out = os.path.join(THUMBS, slug + ".jpg")
    img.save(out, "JPEG", quality=85)
    return out


if __name__ == "__main__":
    if len(sys.argv) != 3 or sys.argv[2] not in THEMES:
        sys.exit("usage: make_fallback_thumb.py <slug> <factory|construction|civil|market>")
    print(make(sys.argv[1], sys.argv[2]))
