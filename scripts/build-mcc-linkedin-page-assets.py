"""Build LinkedIn Company Page assets for Malalane Cultural Center.

Two outputs, sized per LinkedIn's current (2026) Company Page specs:

- Logo: 400x400 square, cropped to just the baobab-tree-and-book icon mark
  (no wordmark) from the existing high-res `logo-instagram.png`, since the
  page name already renders as text everywhere the logo appears and a full
  text lockup becomes illegible at the small sizes LinkedIn displays it.

- Banner: 4200x700 (6:1) upload size, which LinkedIn renders as a ~1128x191
  strip on the page. Unlike a personal profile, the Company Page logo does
  NOT overlap the banner (it sits separately below it), so the full canvas
  is usable - but mobile crops to the center ~900/1128 (~79.8%) of the
  width, so all text stays inside that safe zone. Uses a clean gradient in
  the site's own brand palette (rust/gold/tan) instead of a raw phone-photo
  crop, which would look noisy/artifacted at this thin aspect ratio.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC_LOGO = ROOT / "public" / "images" / "logo-instagram.png"
OUT = ROOT / "public" / "linkedin"
OUT.mkdir(parents=True, exist_ok=True)

FONT_DIR = Path(r"C:\Windows\Fonts")

# Brand palette lifted directly from the live site's Tailwind classes
# (MissionSection / WhoWeAre / WhatWeDo section backgrounds and accents).
NAVY = (26, 26, 46)        # #1A1A2E - primary text / dark accent
RUST = (192, 86, 33)       # #C05621 - primary CTA / accent color
GOLD = (212, 168, 67)      # #D4A843 - secondary accent
TAN = (210, 188, 154)      # #D2BC9A - Mission section background
PEACH = (237, 171, 120)    # #EDAB78 - WhoWeAre / WhatWeDo background

# Icon bounding box measured directly off public/images/logo-instagram.png
# (1080x1080, logo centered on white): the baobab-tree-and-book mark sits at
# x 43-260, y 393-663, with a wide white gap before the "MALALANE" wordmark
# starts at x~304 - cropping here isolates just the icon.
ICON_BOX = (43, 393, 261, 664)

BANNER_W, BANNER_H = 4200, 700
LOGO_SIZE = 400


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


def build_logo() -> None:
    src = Image.open(SRC_LOGO).convert("RGBA")
    icon = src.crop(ICON_BOX)

    # Pad the icon into a square with generous breathing room (LinkedIn
    # renders this as a small rounded square almost everywhere), then
    # composite onto a clean white background at the recommended 400x400.
    iw, ih = icon.size
    pad_scale = 1.55
    side = int(max(iw, ih) * pad_scale)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(icon, ((side - iw) // 2, (side - ih) // 2), icon)
    square = square.resize((LOGO_SIZE, LOGO_SIZE), Image.LANCZOS)

    canvas = Image.new("RGB", (LOGO_SIZE, LOGO_SIZE), (255, 255, 255))
    canvas.paste(square, (0, 0), square)

    out = OUT / "malalane-cultural-center-logo-linkedin.png"
    canvas.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({canvas.size})")


def build_banner() -> None:
    w, h = BANNER_W, BANNER_H

    banner = _horizontal_gradient((w, h), RUST, TAN)
    mid_wash = _horizontal_gradient((w, h), GOLD, PEACH)
    blend_mask = Image.new("L", (w, h), 0)
    for x in range(w):
        t = max(0.0, min(1.0, (x - w * 0.30) / (w * 0.55)))
        blend_mask.paste(int(255 * t), (x, 0, x + 1, h))
    banner = Image.composite(mid_wash, banner, blend_mask)

    # Soft warm highlight, upper-right, echoing an African-sunset glow.
    accent = Image.new("L", (w, h), 0)
    adraw = ImageDraw.Draw(accent)
    cx, cy, r = int(w * 0.80), int(h * -0.2), int(h * 2.1)
    adraw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=90)
    accent = accent.filter(ImageFilter.GaussianBlur(90))
    highlight = Image.new("RGB", (w, h), (255, 244, 224))
    banner = Image.composite(highlight, banner, accent)

    draw = ImageDraw.Draw(banner)

    headline_font = _font("segoeuib.ttf", 130)
    tagline_font = _font("segoeui.ttf", 62)

    headline = "Empowering Communities Through Culture, Education & Sustainable Development"
    tagline = "Mozambique  \u00b7  Portugal  \u00b7  Canada"

    # Fit the headline within the mobile-safe center zone (~79.8% of width)
    # by shrinking the font until it fits on two lines.
    safe_w = int(w * 0.80)
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

    size = 130
    while size > 60:
        headline_font = _font("segoeuib.ttf", size)
        lines = wrap(headline_font)
        if len(lines) <= 2:
            widest = max(draw.textbbox((0, 0), l, font=headline_font)[2] for l in lines)
            if widest <= safe_w:
                break
        size -= 4

    line_h = draw.textbbox((0, 0), "Ag", font=headline_font)[3]
    line_gap = int(line_h * 0.18)
    block_h = len(lines) * line_h + (len(lines) - 1) * line_gap
    tag_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
    tag_h = tag_bbox[3] - tag_bbox[1]
    gap_headline_tag = int(h * 0.05)
    total_h = block_h + gap_headline_tag + tag_h

    y = (h - total_h) / 2
    for line in lines:
        lw = draw.textbbox((0, 0), line, font=headline_font)[2]
        x = (w - lw) / 2
        draw.text(
            (x, y), line, font=headline_font, fill=(255, 255, 255),
            stroke_width=3, stroke_fill=(*NAVY, 255),
        )
        y += line_h + line_gap

    y += gap_headline_tag
    tag_w = tag_bbox[2]
    x = (w - tag_w) / 2
    draw.text(
        (x, y), tagline, font=tagline_font, fill=(255, 240, 214),
        stroke_width=2, stroke_fill=NAVY,
    )

    out = OUT / "malalane-cultural-center-banner-linkedin.png"
    banner.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({banner.size})")


if __name__ == "__main__":
    build_logo()
    build_banner()
