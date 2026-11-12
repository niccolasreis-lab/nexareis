"""Render exact, repository-native SVG lettering and geometry to social PNGs.

Development only: requires fontTools and Pillow. Production serves the
committed PNG files; it does not execute this renderer or download fonts.
"""
import hashlib
import html
import json
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / 'scripts/assets/SpaceGrotesk-wght.ttf'
INK, MUTED, ACCENT, BLUE = '#152329', '#52616B', '#005F73', '#0055CC'
PAPER, LINE, TINT = '#F5F5F2', '#D5DDDF', '#E1EFF1'
fonts = {weight: instantiateVariableFont(TTFont(FONT), {'wght': weight}, inplace=False) for weight in (400, 500, 700)}
SCALE = 2
raster_fonts = {}

def raster_font(size, weight):
    key = (size, weight)
    if key not in raster_fonts:
        font = ImageFont.truetype(str(FONT), size * SCALE)
        font.set_variation_by_axes([weight])
        raster_fonts[key] = font
    return raster_fonts[key]

def width(text, size, weight=400):
    font = fonts[weight]
    cmap = font.getBestCmap()
    return sum(font['hmtx'][cmap[ord(char)]][0] for char in text) * size / font['head'].unitsPerEm

def text_paths(text, x, y, size, weight=400, color=INK):
    drawing.text((x * SCALE, y * SCALE), text, font=raster_font(size, weight), fill=color, anchor='ls', features=['-kern'])
    font = fonts[weight]
    glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
    scale = size / font['head'].unitsPerEm
    paths, cursor = [], 0
    for char in text:
        name = cmap[ord(char)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        commands = pen.getCommands()
        if commands:
            paths.append(f'<path transform="translate({cursor},0)" d="{commands}"/>')
        cursor += font['hmtx'][name][0]
    return f'<g fill="{color}" transform="translate({x},{y}) scale({scale},-{scale})">{"".join(paths)}</g>'

def lines(text, size, max_width):
    result = []
    current = ''
    for word in text.split():
        candidate = (current + ' ' + word).strip()
        if current and width(candidate, size) > max_width:
            result.append(current)
            current = word
        else:
            current = candidate
    if current:
        result.append(current)
    return result

def mark(x, y, size):
    # The existing Nexa Reis circuit N, from components/Logo.tsx.
    scale = size / 120
    def stroke(points, color, stroke_width):
        drawing.line([((x + px * scale) * SCALE, (y + py * scale) * SCALE) for px, py in points], fill=color, width=max(1, round(stroke_width * scale * SCALE)), joint='curve')
    stroke([(60,12),(102,36),(102,84),(60,108),(18,84),(18,36),(60,12)], ACCENT, 2.5)
    stroke([(38,82),(38,38),(82,82),(82,38)], BLUE, 6.5)
    for points in [[(18,36),(45,20)],[(102,84),(75,100)],[(58,36),(58,56)],[(66,36),(66,48),(74,48),(74,58)],[(46,84),(46,72)],[(54,84),(54,78)]]:
        stroke(points, ACCENT, 2)
    for px, py in [(60,12),(102,36),(18,84)]:
        cx, cy, radius = (x + px * scale) * SCALE, (y + py * scale) * SCALE, 3.5 * scale * SCALE
        drawing.ellipse((cx-radius,cy-radius,cx+radius,cy+radius), fill=PAPER, outline=ACCENT, width=max(1,round(2*scale*SCALE)))
    return f'''<g transform="translate({x},{y}) scale({size/120})" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M60 12 L102 36 L102 84 L60 108 L18 84 L18 36 Z" stroke="{ACCENT}" stroke-width="2.5"/>
    <path d="M38 82 L38 38 L82 82 L82 38" stroke="{BLUE}" stroke-width="6.5"/>
    <path d="M18 36 L45 20 M102 84 L75 100 M58 36 L58 56 M66 36 L66 48 L74 48 L74 58 M46 84 L46 72 M54 84 L54 78" stroke="{ACCENT}" stroke-width="2"/>
    <g stroke="{ACCENT}" fill="{PAPER}" stroke-width="2"><circle cx="60" cy="12" r="3.5"/><circle cx="102" cy="36" r="3.5"/><circle cx="18" cy="84" r="3.5"/></g></g>'''

cards = json.load(sys.stdin)
manifest = {'generator': 'npm run generate:social', 'font': {'name': 'Space Grotesk', 'source': 'https://github.com/google/fonts/tree/main/ofl/spacegrotesk', 'gitBlobSha': 'a1b2e6c26093066510a31147e7aec9abdc8d6c5e', 'sha256': hashlib.sha256(FONT.read_bytes()).hexdigest(), 'license': 'scripts/assets/SpaceGrotesk-OFL.txt'}, 'copySource': 'data/projectCases.ts', 'brandSource': 'components/Logo.tsx', 'assets': []}
for card in cards:
    assert card['path'] == f"/images/social/{card['id']}-v1.png"
    source = ROOT / 'assets/social' / f"{card['id']}-v1.svg"
    destination = ROOT / 'public' / card['path'].lstrip('/')
    source.parent.mkdir(parents=True, exist_ok=True)
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas = Image.new('RGB', (1200 * SCALE, 630 * SCALE), PAPER)
    drawing = ImageDraw.Draw(canvas)
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img"><title>{html.escape(card["alt"])}</title><desc>{html.escape(card["description"])}</desc>', f'<rect width="1200" height="630" fill="{PAPER}"/>', mark(58, 40, 68), text_paths('NEXA REIS', 144, 86, 29, 700, ACCENT)]
    size = 90 if card['id'] == 'nexareis' else 76
    while max(width(line, size, 700) for line in card['title']) > 640:
        size -= 1
    start = 272 if len(card['title']) == 1 else 228
    for i, line in enumerate(card['title']):
        parts.append(text_paths(line, 64, start + i * 84, size, 700))
    description = lines(card['description'], 28, 625)
    assert len(description) <= 3, 'The real summary must fit without truncation.'
    for i, line in enumerate(description):
        parts.append(text_paths(line, 64, 402 + i * 37, 28, 400, MUTED))
    if card['flow']:
        drawing.line([(788*SCALE,220*SCALE),(788*SCALE,420*SCALE)], fill=LINE, width=2*SCALE)
        parts.append(f'<path d="M788 220 V420" fill="none" stroke="{LINE}" stroke-width="2"/>')
        for i, label in enumerate(card['flow']):
            y = 208 + i * 108
            assert width(label, 30, 500) <= 285
            drawing.ellipse(((788-21)*SCALE,(y-21)*SCALE,(788+21)*SCALE,(y+21)*SCALE), fill=TINT)
            parts.append(f'<circle cx="788" cy="{y}" r="21" fill="{TINT}"/>')
            parts.append(text_paths(str(i + 1), 781, y + 8, 23, 700, ACCENT))
            parts.append(text_paths(label, 831, y + 10, 30, 500))
    else:
        parts.append(mark(795, 159, 292))
    parts.append(f'<path d="M64 535 H1136" stroke="{LINE}" stroke-width="1"/>')
    drawing.line([(64*SCALE,535*SCALE),(1136*SCALE,535*SCALE)], fill=LINE, width=SCALE)
    parts.append(text_paths('nexareis.com.br', 64, 583, 27, 500, ACCENT))
    label_width = width(card['category'], 25)
    parts.append(text_paths(card['category'], 1136 - label_width, 583, 25, 400, MUTED))
    parts.append('</svg>')
    source.write_text('\n'.join(parts), encoding='utf-8')
    canvas.resize((1200,630), Image.Resampling.LANCZOS).save(destination, format='PNG', optimize=True)
    manifest['assets'].append({'id': card['id'], 'path': str(destination.relative_to(ROOT)), 'svg': str(source.relative_to(ROOT)), 'width': 1200, 'height': 630, 'mimeType': 'image/png', 'sha256': hashlib.sha256(destination.read_bytes()).hexdigest(), 'alt': card['alt'], 'kind': 'outlined typography and existing brand geometry; no generated photography'})
    print(f"Created {destination.relative_to(ROOT)} ({destination.stat().st_size} bytes)")
(ROOT / 'assets/social/provenance.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
