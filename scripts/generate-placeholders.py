#!/usr/bin/env python3
"""Generates the illustrated placeholder images in public/images.

The demo has no photography. These deterministic SVG compositions stand in for
it so every layout can be judged. Replace the files (keeping the paths used in
src/data/*) with real photographs, or point the data at new URLs.
"""
import hashlib, math, os, random, re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'public', 'images')

def rng(name):
    return random.Random(int(hashlib.sha256(name.encode()).hexdigest()[:12], 16))

def wrap(body, w=1200, h=900, defs=''):
    grain = ('<filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/>'
             '<feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .07 0"/></filter>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid slice">'
            f'<defs>{grain}{defs}</defs>{body}<rect width="{w}" height="{h}" filter="url(#g)"/></svg>')

def bg(c1, c2, glow='#D2512A', gx=.7, gy=1.0, ga=.55):
    return (f'<defs><radialGradient id="b" cx="{gx}" cy="{gy}" r=".9"><stop offset="0" stop-color="{c2}"/><stop offset="1" stop-color="{c1}"/></radialGradient>'
            f'<radialGradient id="e" cx="{gx}" cy="{gy}" r=".5"><stop offset="0" stop-color="{glow}" stop-opacity="{ga}"/><stop offset="1" stop-color="{glow}" stop-opacity="0"/></radialGradient></defs>'
            '<rect width="1200" height="900" fill="url(#b)"/><rect width="1200" height="900" fill="url(#e)"/>')

PAL = {
    'veg': ('#0B1A15', '#1F3F37', ['#6E9B5B', '#C8D26B', '#E2A72E', '#B94A2B', '#F0E6C8']),
    'seafood': ('#08171B', '#16373F', ['#E8DCC0', '#D2512A', '#9DB8A8', '#F2C46B', '#F7F1E1']),
    'meat': ('#1A0F0C', '#3C1D14', ['#7A3320', '#B5532F', '#4B2A1A', '#C9A15A', '#D9C7A0']),
    'dessert': ('#1B1015', '#43222F', ['#3B1D14', '#C08A57', '#E7C9A0', '#8F3E4A', '#F3E6D0']),
    'drink': ('#101B1A', '#244A44', ['#E2A72E', '#F4D58A', '#7FB59A', '#F7F1E1', '#D2512A']),
    'wine': ('#14090E', '#3A1420', ['#6E1630', '#A12B49', '#E2A72E', '#F0E6C8', '#2B0E17']),
}
CAT = {}
for k, v in {
    'seafood': 'sea-bass bouillabaisse scallops langoustines sardine-escabeche',
    'meat': 'ribeye lamb-shoulder chicken-supreme spiced-kefta beef-tartare pappardelle',
    'dessert': 'chocolate-fondant panna-cotta millefeuille fig-leaf-ice-cream',
    'drink': 'rosemary-lemonade ember-spritz mint-tea',
    'wine': 'chardonnay-burgundy syrah-meknes gris-boulaouane rioja-reserva champagne-brut',
}.items():
    for s in v.split():
        CAT[s] = k

def plate(name, kind):
    r = rng(name); c1, c2, foods = PAL[kind]
    cx, cy = 600 + r.randint(-40, 40), 470 + r.randint(-20, 20)
    out = [bg(c1, c2, ga=.45, gx=r.choice([.25, .75]), gy=.9)]
    out.append(f'<ellipse cx="{cx}" cy="{cy+300}" rx="330" ry="40" fill="#000" opacity=".35"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="320" fill="#EDE8DA"/><circle cx="{cx}" cy="{cy}" r="262" fill="#E0DACA"/><circle cx="{cx}" cy="{cy}" r="190" fill="#F2EEE2"/>')
    for _ in range(r.randint(5, 8)):
        a, d = r.uniform(0, 6.28), r.uniform(0, 110)
        x, y = cx + math.cos(a) * d, cy + math.sin(a) * d
        out.append(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="{r.randint(35,85)}" ry="{r.randint(25,60)}" fill="{r.choice(foods)}" transform="rotate({r.randint(0,180)} {x:.0f} {y:.0f})" opacity=".95"/>')
    out.append(f'<path d="M{cx-170} {cy+60} Q{cx} {cy+150} {cx+190} {cy+30}" stroke="{foods[1]}" stroke-width="14" fill="none" stroke-linecap="round" opacity=".7"/>')
    for _ in range(14):
        a, d = r.uniform(0, 6.28), r.uniform(60, 170)
        out.append(f'<circle cx="{cx+math.cos(a)*d:.0f}" cy="{cy+math.sin(a)*d:.0f}" r="{r.randint(4,10)}" fill="{foods[0]}"/>')
    return wrap(''.join(out))

def glassware(name, kind):
    r = rng(name); c1, c2, foods = PAL[kind]
    out = [bg(c1, c2, ga=.4, gx=.5, gy=.7)]
    out.append('<ellipse cx="600" cy="800" rx="260" ry="30" fill="#000" opacity=".4"/>')
    if kind == 'wine':
        out.append(f'<rect x="420" y="170" width="90" height="560" rx="30" fill="{foods[4]}"/><rect x="445" y="120" width="40" height="110" rx="10" fill="{foods[4]}"/>'
                   f'<rect x="425" y="400" width="80" height="160" fill="{foods[3]}" opacity=".85"/>')
        out.append(f'<path d="M640 360 Q640 560 720 570 Q800 560 800 360Z" fill="{foods[0]}" opacity=".9"/><path d="M640 360 Q640 560 720 570 Q800 560 800 360Z" fill="none" stroke="#EDE8DA" stroke-width="5" opacity=".7"/>'
                   '<rect x="716" y="570" width="8" height="150" fill="#EDE8DA" opacity=".7"/><ellipse cx="720" cy="725" rx="60" ry="10" fill="#EDE8DA" opacity=".7"/>')
    else:
        out.append(f'<path d="M470 240 L730 240 L690 740 L510 740Z" fill="{foods[3]}" opacity=".18"/><path d="M485 330 L715 330 L685 740 L515 740Z" fill="{foods[0]}" opacity=".9"/>'
                   '<path d="M470 240 L730 240 L690 740 L510 740Z" fill="none" stroke="#EDE8DA" stroke-width="6" opacity=".75"/>')
        for _ in range(8):
            out.append(f'<circle cx="{r.randint(530,670)}" cy="{r.randint(360,700)}" r="{r.randint(5,12)}" fill="#fff" opacity=".35"/>')
        out.append(f'<path d="M640 190 L700 80" stroke="{foods[2]}" stroke-width="12" stroke-linecap="round"/>')
    return wrap(''.join(out))

def room(name, c1='#0B1A15', c2='#1F3F37', arches=3, lights=4, glow='#D2512A'):
    r = rng(name)
    out = [bg(c1, c2, glow=glow, ga=.5, gx=.5, gy=.95)]
    w = 1200 / arches
    for i in range(arches):
        x = i * w + w * .18; aw = w * .64; top = 230 + r.randint(-20, 20)
        out.append(f'<path d="M{x:.0f} 760 V{top+aw/2:.0f} A{aw/2:.0f} {aw/2:.0f} 0 0 1 {x+aw:.0f} {top+aw/2:.0f} V760Z" fill="#E2A72E" opacity=".12" stroke="#E2A72E" stroke-opacity=".5" stroke-width="3"/>')
    out.append('<rect y="760" width="1200" height="140" fill="#000" opacity=".35"/>')
    for i in range(lights):
        x = (i + .5) * 1200 / lights + r.randint(-30, 30)
        out.append(f'<line x1="{x:.0f}" y1="0" x2="{x:.0f}" y2="{140+r.randint(0,60)}" stroke="#E2A72E" stroke-width="2" opacity=".6"/><circle cx="{x:.0f}" cy="{180+r.randint(0,40)}" r="26" fill="#F4D58A"/><circle cx="{x:.0f}" cy="{180}" r="80" fill="#E2A72E" opacity=".18"/>')
    for i in range(r.randint(3, 5)):
        x = 140 + i * 230 + r.randint(-30, 30)
        out.append(f'<rect x="{x}" y="640" width="170" height="14" rx="4" fill="#EDE8DA" opacity=".8"/><rect x="{x+78}" y="654" width="14" height="110" fill="#EDE8DA" opacity=".5"/>')
    return wrap(''.join(out))

def flame(name, c1='#0B1A15', c2='#1F3F37'):
    out = [bg(c1, c2, ga=.75, gx=.5, gy=.85)]
    for i, (s, col, op) in enumerate([(1.0, '#D2512A', .95), (.72, '#E2A72E', .95), (.42, '#F7E7A8', .95)]):
        out.append(f'<path transform="translate(600 800) scale({s*1.6}) translate(-100 -420)" d="M100 0C112 80 40 110 10 190 -15 250 -10 330 30 380 55 410 80 420 100 420s60-10 85-40c40-50 45-130 20-190-18-45-45-70-62-120-12-30-14-60-43-50Z" fill="{col}" opacity="{op}"/>')
    out.append('<rect y="780" width="1200" height="120" fill="#000" opacity=".4"/>')
    return wrap(''.join(out))

def cellar(name):
    r = rng(name); out = [bg('#12080C', '#3A1420', glow='#E2A72E', ga=.25, gx=.5, gy=.4)]
    for row in range(5):
        for col in range(8):
            x, y = 90 + col * 135, 90 + row * 160
            out.append(f'<circle cx="{x}" cy="{y}" r="52" fill="#000" opacity=".5"/><circle cx="{x}" cy="{y}" r="38" fill="{r.choice(["#6E1630","#A12B49","#E2A72E","#2B0E17"])}" opacity=".9"/>')
    return wrap(''.join(out))

def portrait(name, tone):
    r = rng(name); out = [bg('#0B1A15', tone, glow='#E2A72E', ga=.35, gx=.3, gy=.2)]
    skin = r.choice(['#C99673', '#B07A58', '#E0B08C', '#8E5C41'])
    out.append(f'<path d="M180 900 Q200 620 600 600 Q1000 620 1020 900Z" fill="#17302A"/><path d="M180 900 Q200 620 600 600 Q1000 620 1020 900Z" fill="#000" opacity=".25"/>')
    out.append(f'<rect x="545" y="500" width="110" height="130" fill="{skin}"/><ellipse cx="600" cy="420" rx="120" ry="150" fill="{skin}"/>')
    out.append(f'<path d="M475 400 Q480 250 600 255 Q720 250 725 400 Q700 320 600 320 Q500 320 475 400Z" fill="{r.choice(["#1B1210","#3A2A20","#101010"])}"/>')
    out.append('<path d="M420 640 L600 760 L780 640" stroke="#EDE8DA" stroke-width="10" fill="none" opacity=".7"/>')
    return wrap(''.join(out), 900, 1200)

def terrace(name):
    r = rng(name); out = [bg('#071218', '#1B3A44', glow='#E2A72E', ga=.35, gx=.5, gy=.9)]
    for _ in range(60):
        out.append(f'<circle cx="{r.randint(0,1200)}" cy="{r.randint(0,360)}" r="{r.choice([1.5,2,3])}" fill="#F7E7A8" opacity="{r.uniform(.3,.9):.2f}"/>')
    for i in range(7):
        x = 90 + i * 170
        out.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{300+(i%3)*40}" stroke="#E2A72E" stroke-opacity=".5"/><rect x="{x-24}" y="{300+(i%3)*40}" width="48" height="70" rx="10" fill="#F4D58A"/><circle cx="{x}" cy="{335+(i%3)*40}" r="90" fill="#E2A72E" opacity=".14"/>')
    out.append('<rect y="700" width="1200" height="200" fill="#000" opacity=".4"/>')
    return wrap(''.join(out))

def build():
    os.makedirs(OUT, exist_ok=True)
    for sub in ('dishes', 'events', 'offers', 'team'):
        os.makedirs(os.path.join(OUT, sub), exist_ok=True)
    files = {}
    files['hero.svg'] = flame('hero')
    files['story.svg'] = flame('story', '#0F1A16', '#2A3F36')
    files['kitchen.svg'] = flame('kitchen', '#120D0A', '#3A2418')
    files['interior.svg'] = room('interior')
    files['private.svg'] = room('private', '#0F1420', '#233049', arches=2, lights=3, glow='#E2A72E')
    files['bar.svg'] = room('bar', '#150E08', '#3F2A14', arches=4, lights=5)
    files['seasonal.svg'] = plate('seasonal', 'veg')
    files['cellar.svg'] = cellar('cellar')
    files['terrace.svg'] = terrace('terrace')
    slugs = re.findall(r"slug: '([a-z-]+)'", open(os.path.join(ROOT, 'src/data/menu.ts')).read())
    for s in slugs:
        kind = CAT.get(s, 'veg')
        files[f'dishes/{s}.svg'] = glassware(s, kind) if kind in ('drink', 'wine') else plate(s, kind)
    files['events/wine-tasting.svg'] = glassware('wt', 'wine')
    files['events/chefs-table.svg'] = flame('ct', '#0B1A15', '#1F3F37')
    files['events/seasonal-dinner.svg'] = room('sd', arches=4, lights=5)
    files['events/truffle-evening.svg'] = plate('tr', 'meat')
    files['offers/weekday-lunch.svg'] = plate('wl', 'veg')
    files['offers/seasonal-tasting.svg'] = plate('st', 'seafood')
    files['offers/anniversary.svg'] = glassware('an', 'wine')
    files['offers/wine-pairing.svg'] = glassware('wp', 'wine')
    files['offers/early-dinner.svg'] = terrace('ed')
    for m, tone in (('mehdi-lahlou', '#3A2418'), ('ines-duval', '#43222F'), ('aurelien-roche', '#1F3F37'), ('zineb-chraibi', '#2A3F36')):
        files[f'team/{m}.svg'] = portrait(m, tone)
    for path, svg in files.items():
        with open(os.path.join(OUT, path), 'w', encoding='utf-8') as f:
            f.write(svg)
    print(f'wrote {len(files)} images to {OUT}')

if __name__ == '__main__':
    build()
