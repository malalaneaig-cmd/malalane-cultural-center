"""Build LinkedIn profile photo and banner for Aurelio Malalane.

Profile photo: cropped from a screenshot of the LinkedIn "public profile
settings" preview (see build_profile_photo for details on the measured crop).

Banner: fully hand-drawn (no screenshot source) so it is a clean, complete
1584x396 rectangle with no artifacts. It reuses the muted blue-gray palette
of LinkedIn's own default cover image, filled edge-to-edge, with the
"AI Solutions & Automation Workflows" message placed on the right so it
clears the profile photo that overlaps the bottom-left corner.
"""
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "linkedin"
OUT.mkdir(parents=True, exist_ok=True)

PERSONAL_PREVIEW = Path(
    r"C:\Users\User\.cursor\projects\d-ZYRCOM-UMBRELA-PROJECTS-MALALANE-CULTURAL-CENTER-NEW-WEBSITE\assets"
    r"\c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images__926F3A28-3150-40DD-88BF-0C4DA441369D_-92fd518d-b533-42a8-a2de-b53c399f464a.png"
)

BANNER_W, BANNER_H = 1584, 396
PROFILE_SIZE = 800
BG_GRAY = (225, 225, 225)

# Palette lifted from LinkedIn's own default cover image (sampled directly),
# so the banner reads as a natural, on-brand extension of it, filled fully
# edge-to-edge instead of leaving any blank/short area.
BANNER_BASE = (98, 128, 134)      # deep teal-gray, left/overlap side
BANNER_MID = (160, 180, 183)      # mid tone, matches LinkedIn default
BANNER_LIGHT = (214, 227, 228)    # light accent, right side
FONT_DIR = Path(r"C:\Windows\Fonts")

# Measured directly off the source screenshot (559x457): profile photo
# circle centered ~(84, 243), outer ring radius ~43px; the clean face pixels
# (inside the thin ring LinkedIn draws) sit at roughly x 44-124, y 202-282.
FACE_BOX = (44, 202, 124, 282)

def _lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def _vertical_gradient(size, top_color, bottom_color):
    w, h = size
    grad = Image.new("RGB", (1, h))
    for y in range(h):
        grad.putpixel((0, y), _lerp(top_color, bottom_color, y / (h - 1)))
    return grad.resize((w, h))


def _font(name: str, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(str(FONT_DIR / name), size)
    except OSError:
        return ImageFont.load_default()


def build_banner() -> None:
    w, h = BANNER_W, BANNER_H

    # Fill the *entire* canvas edge-to-edge (no blank corners, no short
    # strip) with a soft left-to-right gradient in LinkedIn's own default
    # blue-gray palette: deeper on the left (under/around the profile
    # photo), lighter on the right (behind the headline).
    banner = _vertical_gradient((w, h), BANNER_BASE, BANNER_MID)
    right_wash = _vertical_gradient((w, h), BANNER_MID, BANNER_LIGHT)
    blend_mask = Image.new("L", (w, h), 0)
    for x in range(w):
        t = max(0.0, min(1.0, (x - w * 0.30) / (w * 0.55)))
        blend_mask.paste(int(255 * t), (x, 0, x + 1, h))
    banner = Image.composite(right_wash, banner, blend_mask)

    # Large soft circular highlight, echoing the curved accent shape in
    # LinkedIn's default cover image, sitting behind the headline.
    accent = Image.new("L", (w, h), 0)
    adraw = ImageDraw.Draw(accent)
    cx, cy, r = int(w * 0.62), int(h * 0.15), int(h * 1.35)
    adraw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=70)
    accent = accent.filter(ImageFilter.GaussianBlur(60))
    highlight = Image.new("RGB", (w, h), BANNER_LIGHT)
    banner = Image.composite(highlight, banner, accent)

    # A faint scatter of nodes + connecting lines on the right two-thirds
    # nods to the "AI network" motif without reproducing screenshot noise.
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    import random

    rng = random.Random(7)
    nodes = [
        (rng.uniform(w * 0.55, w * 0.98), rng.uniform(h * 0.08, h * 0.92))
        for _ in range(16)
    ]
    for i, (x1, y1) in enumerate(nodes):
        for x2, y2 in nodes[i + 1 :]:
            if math.hypot(x1 - x2, y1 - y2) < w * 0.16:
                odraw.line((x1, y1, x2, y2), fill=(255, 255, 255, 40), width=2)
    for x, y in nodes:
        odraw.ellipse((x - 4, y - 4, x + 4, y + 4), fill=(255, 255, 255, 90))
    banner = Image.alpha_composite(banner.convert("RGBA"), overlay).convert("RGB")

    # Headline + tagline, right-aligned block that clears the profile photo
    # (which overlaps roughly the left 38% of the banner's bottom half).
    # TEXT_PANEL toggles the dark "chip" behind the text on/off - flip back
    # to True (and restore white/gold fills below) if the no-panel version
    # doesn't read well enough and needs to be reverted.
    TEXT_PANEL = False

    scratch = ImageDraw.Draw(banner)
    # Pulled left (closer to the profile photo's shoulder) while still
    # clearing the ~35%-of-width the photo overlaps on the bottom-left.
    text_right = int(w * 0.865)

    headline_font = _font("segoeuib.ttf", 62)
    tagline_font = _font("segoeuib.ttf", 30)

    lines = ["AI Solutions &", "Automation Workflows"]
    line_heights = [scratch.textbbox((0, 0), line, font=headline_font)[3] for line in lines]
    line_gap = 8
    block_h = sum(line_heights) + line_gap * (len(lines) - 1)
    tagline = "Empowering Businesses Through Intelligence."
    tag_bbox = scratch.textbbox((0, 0), tagline, font=tagline_font)
    tag_h = tag_bbox[3] - tag_bbox[1]
    gap_headline_tag = 16
    total_h = block_h + gap_headline_tag + tag_h

    line_widths = [scratch.textbbox((0, 0), line, font=headline_font)[2] for line in lines]
    tag_w = tag_bbox[2]
    block_w = max(max(line_widths), tag_w)

    if TEXT_PANEL:
        pad_x, pad_y = 34, 26
        panel_right = text_right + pad_x
        panel_left = panel_right - block_w - pad_x * 2
        panel_top = int((h - total_h) / 2) - pad_y
        panel_bottom = panel_top + total_h + pad_y * 2

        panel = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        pdraw = ImageDraw.Draw(panel)
        pdraw.rounded_rectangle(
            (panel_left, panel_top, panel_right, panel_bottom),
            radius=22,
            fill=(18, 34, 38, 158),
        )
        banner = Image.alpha_composite(banner.convert("RGBA"), panel).convert("RGB")

    draw = ImageDraw.Draw(banner)

    # No panel: the blue-gray gradient shows straight through behind the
    # text, so the text itself carries the contrast - dark, saturated
    # colors with a soft light stroke for definition against both the
    # medium and light ends of the gradient.
    headline_fill = (255, 255, 255) if TEXT_PANEL else (16, 32, 36)
    headline_stroke = None if TEXT_PANEL else (232, 240, 240)
    tagline_fill = (255, 200, 45) if TEXT_PANEL else (120, 78, 4)
    tagline_stroke = None if TEXT_PANEL else (238, 232, 214)

    y = (h - total_h) / 2
    for line, lh, lw in zip(lines, line_heights, line_widths):
        x = text_right - lw
        draw.text(
            (x, y), line, font=headline_font, fill=headline_fill,
            stroke_width=(2 if headline_stroke else 0), stroke_fill=headline_stroke,
        )
        y += lh + line_gap

    y += gap_headline_tag
    x = text_right - tag_w
    draw.text(
        (x, y), tagline, font=tagline_font, fill=tagline_fill,
        stroke_width=(1 if tagline_stroke else 0), stroke_fill=tagline_stroke,
    )

    out = OUT / "aurelio-malalane-banner-linkedin.png"
    banner.save(out, "PNG", optimize=True)
    print(f"Wrote {out}")


def build_profile_photo() -> None:
    src = Image.open(PERSONAL_PREVIEW).convert("RGB")
    face = src.crop(FACE_BOX).resize((PROFILE_SIZE, PROFILE_SIZE), Image.LANCZOS)
    face = face.filter(ImageFilter.GaussianBlur(0.6))
    face = ImageEnhance.Sharpness(face).enhance(1.6)
    face = ImageEnhance.Contrast(face).enhance(1.05)

    mask = Image.new("L", (PROFILE_SIZE, PROFILE_SIZE), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((6, 6, PROFILE_SIZE - 6, PROFILE_SIZE - 6), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(1.5))

    canvas = Image.new("RGB", (PROFILE_SIZE, PROFILE_SIZE), BG_GRAY)
    canvas.paste(face, (0, 0), mask)

    out = OUT / "aurelio-malalane-headshot-linkedin.jpg"
    canvas.save(out, "JPEG", quality=94, optimize=True)
    print(f"Wrote {out}")


if __name__ == "__main__":
    build_banner()
    build_profile_photo()
