"""Build the Facebook Page cover photo for Malalane Cultural Center.

Facebook renders Page covers at ~820x312 (desktop) and ~640x360 (mobile),
cropping the sides on phones. Upload at 1640x624 (2x) for sharp display.

Unlike LinkedIn's 4200x700 (6:1) banner, Facebook uses ~2.63:1 — uploading
the LinkedIn asset causes aggressive side crops that clip headline text.

Safe zone (visible on desktop + mobile): center ~640px wide at 1x display,
which is 1280px centered on the 1640px upload. The circular profile photo
overlaps the bottom-left corner, so text stays centered/right within the
safe band and above the overlap zone.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "facebook"
OUT.mkdir(parents=True, exist_ok=True)

FONT_DIR = Path(r"C:\Windows\Fonts")

NAVY = (26, 26, 46)
RUST = (192, 86, 33)
GOLD = (212, 168, 67)
TAN = (210, 188, 154)
PEACH = (237, 171, 120)

BANNER_W, BANNER_H = 1640, 624

# Center safe band: 640px display width -> 1280px on 2x upload.
SAFE_W = 1280
SAFE_X = (BANNER_W - SAFE_W) // 2

# Profile photo overlaps roughly this box (bottom-left) at 2x upload coords.
AVATAR_SAFE_X = int(BANNER_W * 0.22)
AVATAR_SAFE_Y_TOP = int(BANNER_H * 0.55)


def _font(name: str, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(str(FONT_DIR / name), size)
    except OSError:
        return ImageFont.load_default()


def _lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def _horizontal_gradient(size, left_color, right_color):
    w, h = size
    grad = Image.new("RGB", (w, 1))
    for x in range(w):
        grad.putpixel((x, 0), _lerp(left_color, right_color, x / (w - 1)))
    return grad.resize((w, h))


def build_banner() -> None:
    w, h = BANNER_W, BANNER_H

    banner = _horizontal_gradient((w, h), RUST, TAN)
    mid_wash = _horizontal_gradient((w, h), GOLD, PEACH)
    blend_mask = Image.new("L", (w, h), 0)
    for x in range(w):
        t = max(0.0, min(1.0, (x - w * 0.30) / (w * 0.55)))
        blend_mask.paste(int(255 * t), (x, 0, x + 1, h))
    banner = Image.composite(mid_wash, banner, blend_mask)

    accent = Image.new("L", (w, h), 0)
    adraw = ImageDraw.Draw(accent)
    cx, cy, r = int(w * 0.82), int(h * -0.25), int(h * 2.0)
    adraw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=90)
    accent = accent.filter(ImageFilter.GaussianBlur(70))
    highlight = Image.new("RGB", (w, h), (255, 244, 224))
    banner = Image.composite(highlight, banner, accent)

    corner_shade = Image.new("L", (w, h), 0)
    cdraw = ImageDraw.Draw(corner_shade)
    cdraw.rectangle((0, AVATAR_SAFE_Y_TOP, AVATAR_SAFE_X, h), fill=55)
    corner_shade = corner_shade.filter(ImageFilter.GaussianBlur(50))
    darken = Image.new("RGB", (w, h), NAVY)
    banner = Image.composite(darken, banner, corner_shade)

    draw = ImageDraw.Draw(banner)

    headline = "Empowering Communities Through Culture, Education & Development"
    tagline = "Mozambique  \u00b7  Portugal  \u00b7  Canada"

    # Keep all text inside the center safe band with inner padding.
    text_safe_w = int(SAFE_W * 0.92)
    words = headline.split(" ")

    def wrap(font):
        lines, cur = [], ""
        for word in words:
            trial = (cur + " " + word).strip()
            if draw.textbbox((0, 0), trial, font=font)[2] <= text_safe_w:
                cur = trial
            else:
                if cur:
                    lines.append(cur)
                cur = word
        if cur:
            lines.append(cur)
        return lines

    size = 52
    headline_font = _font("segoeuib.ttf", size)
    lines = wrap(headline_font)
    while size > 24:
        headline_font = _font("segoeuib.ttf", size)
        lines = wrap(headline_font)
        if len(lines) <= 3:
            widest = max(draw.textbbox((0, 0), l, font=headline_font)[2] for l in lines)
            if widest <= text_safe_w:
                break
        size -= 2

    tagline_font = _font("segoeuib.ttf", max(22, int(size * 0.58)))

    line_h = draw.textbbox((0, 0), "Ag", font=headline_font)[3]
    line_gap = int(line_h * 0.18)
    block_h = len(lines) * line_h + (len(lines) - 1) * line_gap
    tag_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
    tag_h = tag_bbox[3] - tag_bbox[1]
    gap_headline_tag = int(h * 0.04)
    total_h = block_h + gap_headline_tag + tag_h

    # Anchor near the bottom, then nudge up (~2in at 72dpi on the 2x canvas).
    bottom_pad = int(h * 0.06)
    up_offset = 144
    tagline_y = h - bottom_pad - tag_h - up_offset
    y = tagline_y - gap_headline_tag - block_h

    for line in lines:
        lw = draw.textbbox((0, 0), line, font=headline_font)[2]
        x = SAFE_X + (SAFE_W - lw) / 2
        draw.text(
            (x, y), line, font=headline_font, fill=(255, 255, 255),
            stroke_width=2, stroke_fill=(*NAVY, 255),
        )
        y += line_h + line_gap

    y += gap_headline_tag
    tag_w = tag_bbox[2]
    x = SAFE_X + (SAFE_W - tag_w) / 2
    draw.text(
        (x, tagline_y), tagline, font=tagline_font, fill=NAVY,
        stroke_width=2, stroke_fill=(255, 255, 255),
    )

    out = OUT / "malalane-cultural-center-banner-facebook.png"
    banner.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({banner.size})")


if __name__ == "__main__":
    build_banner()
