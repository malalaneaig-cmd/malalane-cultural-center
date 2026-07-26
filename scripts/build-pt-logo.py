"""Build a Portuguese variant of the site navbar logo.

The English logo (public/images/logo.png) is a raster lockup: baobab-tree
icon + "MALALANE" wordmark + "cultural center" caption underneath. Because
it's a flat image, the caption never translated when the site's language
toggle switched to Portuguese.

"MALALANE" is a place name and stays as-is in both languages (same
convention as the site's other bilingual copy, which always keeps the
proper noun "Malalane" unchanged). Only the descriptor caption is
swapped: "cultural center" -> "centro cultural".

Source: the high-res public/images/logo-instagram.png (1080x1080, white
background) is used so the icon + wordmark stay crisp; the caption region
is erased and redrawn in Bell MT (closest available system font to the
original caption's upright, high-contrast old-style serif -- the original
is NOT italic, just a delicate serif with tight "ct" letter joins), same
ink color, centered under the wordmark exactly like the English version.

Output: src/assets/images/logo-pt.png (NOT public/) so Vite bundles it
through the normal asset pipeline and gives it a content-hashed filename
on every build. That matters here specifically: a raw /public/images/*.png
keeps the exact same URL forever, so browsers/CDNs (this project caches
/images/* for 24h, see vercel.json) will happily keep serving a stale
cached copy after this script's output changes, unless you also bump a
version/query string by hand. Importing from src/ sidesteps that footgun
entirely, cropped/padded and resized to match the aspect ratio of the
existing public/images/logo.png so it drops into the Navbar with no
layout shift.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "logo-instagram.png"
OUT = ROOT / "src" / "assets" / "images" / "logo-pt.png"
OUT.parent.mkdir(parents=True, exist_ok=True)

FONT_DIR = Path(r"C:\Windows\Fonts")
INK = (92, 62, 62)

# Measured directly off logo-instagram.png (1080x1080).
ICON_BOX = (39, 392, 261, 664)
WORDMARK_BOX = (303, 445, 1042, 552)
CAPTION_BOX = (392, 585, 951, 667)  # region to erase (original "cultural center")

CROP_BOX = (20, 380, 1060, 680)  # a bit of padding around icon+wordmark+caption
FINAL_SIZE = (770, 242)  # 2x the live public/images/logo.png (385x121) for crispness


def _font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / name), size)


def build() -> None:
    src = Image.open(SRC).convert("RGB")
    canvas = src.copy()
    draw = ImageDraw.Draw(canvas)

    # Erase the English caption with a white patch a bit larger than its
    # measured bbox so no antialiased edges of the old text remain.
    x0, y0, x1, y1 = CAPTION_BOX
    draw.rectangle((x0 - 15, y0 - 15, x1 + 15, y1 + 15), fill=(255, 255, 255))

    caption = "centro cultural"
    wm_left, _, wm_right, wm_bottom = WORDMARK_BOX
    wm_center_x = (wm_left + wm_right) / 2
    target_h = (CAPTION_BOX[3] - CAPTION_BOX[1]) * 0.92  # slightly tighter than "cultural center"
    max_w = (CAPTION_BOX[2] - CAPTION_BOX[0]) * 1.05

    size = 90
    font = _font("BELL.TTF", size)
    while size > 20:
        font = _font("BELL.TTF", size)
        bbox = draw.textbbox((0, 0), caption, font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
        if h <= target_h and w <= max_w:
            break
        size -= 2

    bbox = draw.textbbox((0, 0), caption, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    gap = CAPTION_BOX[1] - wm_bottom  # keep the same visual gap under the wordmark
    text_x = wm_center_x - w / 2 - bbox[0]
    text_y = wm_bottom + gap - bbox[1]
    draw.text((text_x, text_y), caption, font=font, fill=INK)

    cropped = canvas.crop(CROP_BOX)
    final = cropped.resize(FINAL_SIZE, Image.LANCZOS)
    final.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({final.size})")


if __name__ == "__main__":
    build()
