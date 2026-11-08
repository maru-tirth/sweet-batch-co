"""
Prepare SWEETBATCHCO product photos for the website.

Usage:  python3 scripts/process_images.py "<source folder>"
Writes optimised, colour-graded JPEGs to public/images/.

Edits applied: tight crop, warm white-balance, contrast/saturation lift,
soft background blur (depth of field) and a creamy brand-coloured vignette
that hides tray edges and background clutter.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public" / "images"
CREAM = np.array([249, 233, 216], dtype=np.float32)  # #F9E9D8

def stamp(name):
    return SRC / f"WhatsApp Image 2026-11-07 at {name}.jpeg"

# (source, output, crop box (left, top, size) or None, style, extra)
JOBS = [
    # Chocolates: centre (cx, cy) + square size in source pixels
    ("20.08.44", "chocolates/milk-chocolate.jpg",      (457, 690, 520), "product"),
    ("20.09.08", "chocolates/dark-chocolate.jpg",      (437, 718, 500), "product"),
    ("20.09.38", "chocolates/white-chocolate.jpg",     (410, 742, 480), "product"),
    ("20.10.08", "chocolates/almond-chocolate.jpg",    (375, 752, 500), "product"),
    ("20.10.48", "chocolates/paan-chocolate.jpg",      (416, 725, 470), "product"),
    ("20.11.20", "chocolates/nutella-chocolate.jpg",   (373, 788, 480), "product"),
    ("20.11.41", "chocolates/tutifruti-chocolate.jpg", (453, 745, 480), "product"),
    ("20.12.44", "chocolates/rose-chocolate.jpg",      (462, 772, 440), "product"),
    # Modaks
    ("22.08.08",     "modaks/white-chocolate-modak.jpg",   (600, 800, 1200), "photo"),
    ("22.08.09 (1)", "modaks/nutella-chocolate-modak.jpg", (600, 740, 1180), "photo"),
    ("22.08.09",     "modaks/dark-chocolate-modak.jpg",    (676, 500, 920),  "photo"),
    ("22.08.10",     "modaks/rose-chocolate-modak.jpg",    (430, 1210, 780), "photo-warm"),
    ("22.08.10",     "modaks/assorted-chocolate-modaks.jpg", (600, 600, 1200), "photo"),
    # Lifestyle / gallery
    ("22.08.09 (2)", "gallery/modaks-tray.jpg",   None, "photo"),
    ("22.08.10",     "gallery/modak-boxes.jpg",   None, "photo"),
    ("22.08.09",     "gallery/dark-modak-box.jpg", None, "photo"),
    ("22.08.09 (1)", "gallery/nutella-centre.jpg", None, "photo"),
    ("22.08.08",     "gallery/white-modaks.jpg",  None, "photo"),
]

def crop_square(img, cx, cy, size):
    w, h = img.size
    size = min(size, w, h)
    left = int(min(max(cx - size / 2, 0), w - size))
    top = int(min(max(cy - size / 2, 0), h - size))
    return img.crop((left, top, left + size, top + size))

def radial(size, inner, outer):
    w, h = size
    y, x = np.ogrid[:h, :w]
    d = np.sqrt(((x - w / 2) / (w / 2)) ** 2 + ((y - h / 2) / (h / 2)) ** 2)
    m = np.clip((d - inner) / (outer - inner), 0, 1)
    return m * m * (3 - 2 * m)  # smoothstep

def grade(img, warmth=1.0, contrast=1.1, saturation=1.15, brightness=1.03, auto=True, red=0.0, gamma=1.0):
    if auto:
        img = ImageOps.autocontrast(img, cutoff=0.5)
    a = np.asarray(img).astype(np.float32)
    if gamma != 1.0:  # lift shadows/midtones so chocolate colour reads clearly
        a = 255 * (a / 255) ** (1 / gamma)
    a[..., 0] *= 1 + 0.05 * warmth + red
    a[..., 1] *= 1 + 0.015 * warmth
    a[..., 2] *= 1 - 0.07 * warmth
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    img = ImageEnhance.Contrast(img).enhance(contrast)
    img = ImageEnhance.Color(img).enhance(saturation)
    img = ImageEnhance.Brightness(img).enhance(brightness)
    return img

def product(img):
    img = grade(img, auto=False, contrast=1.04, saturation=1.12, brightness=1.04, gamma=1.18)
    sharp = img.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
    blur = img.filter(ImageFilter.GaussianBlur(radius=img.width / 60))
    m = radial(img.size, 0.5, 0.95)[..., None]
    a = np.asarray(sharp, np.float32) * (1 - m) + np.asarray(blur, np.float32) * m
    # creamy brand vignette
    v = radial(img.size, 0.62, 1.12)[..., None] * 0.9
    a = a * (1 - v) + CREAM * v
    # gentle cream tint overall so the white tray reads as warm cream
    a = a * 0.92 + CREAM * 0.08
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

def photo(img, red=0.0):
    img = grade(img, auto=False, warmth=0.6, contrast=1.1, saturation=1.08, brightness=1.05, red=red, gamma=1.05)
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=50, threshold=2))
    a = np.asarray(img, np.float32)
    v = radial(img.size, 0.7, 1.5)[..., None] * 0.35
    a = a * (1 - v) + np.array([74, 31, 15], np.float32) * v * 0.6 + a * v * 0.4
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

for src, out, box, style in JOBS:
    img = Image.open(stamp(src)).convert("RGB")
    img = ImageOps.exif_transpose(img)
    if box:
        img = crop_square(img, *box)
    if style == "product":
        img = product(img)
    else:
        img = photo(img, red=0.04 if style == "photo-warm" else 0.0)
    max_side = 1000 if box else 1400
    img.thumbnail((max_side, max_side), Image.LANCZOS)
    dest = OUT / out
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=84, optimize=True, progressive=True)
    print(f"{out:45s} {img.size[0]}x{img.size[1]}  {dest.stat().st_size // 1024} KB")
