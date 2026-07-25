"""Build the X (Twitter) header/banner for Malalane Cultural Center.

Reuses the same gradient design language as the LinkedIn banner
(build-mcc-linkedin-page-assets.py) but at X's recommended 1500x500 (3:1)
header size, with the text laid out to respect X's different safe zone:
unlike LinkedIn's Company Page (logo sits separately below the banner), X
overlays the circular profile photo directly on top of the banner's
bottom-left corner (roughly the left ~25% width x bottom ~55% height once
uploaded), so the headline/tagline block here is shifted right and up to
clear that corner instead of being centered.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "x"
OUT.mkdir(parents=True, exist_ok=True)

FONT_DIR = Path(r"C:\Windows\Fonts")

NAVY = (26, 26, 46)
RUST = (192, 86, 33)
GOLD = (212, 168, 67)
TAN = (210, 188, 154)
PEACH = (237, 171, 120)

BANNER_W, BANNER_H = 1500, 500

# Profile photo overlaps roughly this box (bottom-left corner) once the
# banner is live on X - keep all text clear of it.
AVATAR_SAFE_X = int(BANNER_W * 0.30)
AVATAR_SAFE_Y_TOP = int(BANNER_H * 0.42)


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
    cx, cy, r = int(w * 0.85), int(h * -0.3), int(h * 2.2)
    adraw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=90)
    accent = accent.filter(ImageFilter.GaussianBlur(70))
    highlight = Image.new("RGB", (w, h), (255, 244, 224))
    banner = Image.composite(highlight, banner, accent)

    # Subtle darkening wash over the avatar's safe corner so the profile
    # photo (once added) has clean contrast against the background there.
    corner_shade = Image.new("L", (w, h), 0)
    cdraw = ImageDraw.Draw(corner_shade)
    cdraw.rectangle((0, AVATAR_SAFE_Y_TOP, AVATAR_SAFE_X, h), fill=60)
    corner_shade = corner_shade.filter(ImageFilter.GaussianBlur(60))
    darken = Image.new("RGB", (w, h), NAVY)
    banner = Image.composite(darken, banner, corner_shade)

    draw = ImageDraw.Draw(banner)

    headline = "Empowering Communities Through Culture, Education & Development"
    tagline = "Mozambique  \u00b7  Portugal  \u00b7  Canada"

    # Text block lives right of the avatar safe zone, vertically centered
    # in the full banner (top area is clear all the way across).
    text_left = AVATAR_SAFE_X + int(w * 0.05)
    safe_w = w - text_left - int(w * 0.04)
    words = headline.split(" ")

    def wrap(font):
        lines, cur = [], ""
        for word in words:
            trial = (cur + " " + word).strip()
            if draw.textbbox((0, 0), trial, font=font)[2] <= safe_w:
                cur = trial
            else:
                if cur:
                    lines.append(cur)
                cur = word
        if cur:
            lines.append(cur)
        return lines

    size = 58
    headline_font = _font("segoeuib.ttf", size)
    lines = wrap(headline_font)
    while size > 28:
        headline_font = _font("segoeuib.ttf", size)
        lines = wrap(headline_font)
        if len(lines) <= 3:
            widest = max(draw.textbbox((0, 0), l, font=headline_font)[2] for l in lines)
            if widest <= safe_w:
                break
        size -= 2

    # Bold (not regular) and noticeably larger than the original pass, with
    # a heavy stroke for contrast - no background pill/box, so the banner
    # stays one seamless gradient all the way across, same as the headline.
    tagline_font = _font("segoeuib.ttf", int(size * 0.62))

    line_h = draw.textbbox((0, 0), "Ag", font=headline_font)[3]
    line_gap = int(line_h * 0.2)
    block_h = len(lines) * line_h + (len(lines) - 1) * line_gap
    tag_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
    tag_h = tag_bbox[3] - tag_bbox[1]
    gap_headline_tag = int(h * 0.06)
    total_h = block_h + gap_headline_tag + tag_h

    y = (h - total_h) / 2
    for line in lines:
        draw.text(
            (text_left, y), line, font=headline_font, fill=(255, 255, 255),
            stroke_width=2, stroke_fill=(*NAVY, 255),
        )
        y += line_h + line_gap

    y += gap_headline_tag
    draw.text(
        (text_left, y), tagline, font=tagline_font, fill=(255, 255, 255),
        stroke_width=3, stroke_fill=(*NAVY, 255),
    )

    out = OUT / "malalane-cultural-center-banner-x.png"
    banner.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({banner.size})")


if __name__ == "__main__":
    build_banner()
