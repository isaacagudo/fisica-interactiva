"""Genera ejercicio4.mp4 a partir de la página animada (index.html).

1. Construye video.html: la misma página, maquetada a 1280x720, con un paso visible cada vez.
2. Recorre los pasos con Playwright, capturando un fotograma por instante (30 fps en los
   tramos con movimiento y un único fotograma para las pausas de lectura).
3. Une los fotogramas con ffmpeg (H.264, yuv420p, compatible con iPad).
"""
import json, pathlib, subprocess, shutil
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE  # carpeta de trabajo: aquí se generan video.html, los fotogramas y el MP4
FONTS = HERE.parent / 'node_modules/@fontsource'
FR = 30            # fotogramas por segundo
SLOW = 0.3         # cámara lenta (igual que en la página)
OUT = ROOT / 'video'

def font(family, pkg, w):
    f = FONTS / pkg / 'files' / f'{pkg}-latin-{w}-normal.woff2'
    return f'@font-face{{font-family:"{family}";src:url("file://{f}") format("woff2");font-weight:{w};font-style:normal}}'

faces = '\n'.join([
    font('Atkinson Hyperlegible', 'atkinson-hyperlegible', 400), font('Atkinson Hyperlegible', 'atkinson-hyperlegible', 700),
    font('Bricolage Grotesque', 'bricolage-grotesque', 500), font('Bricolage Grotesque', 'bricolage-grotesque', 700),
    font('Caveat', 'caveat', 500), font('Caveat', 'caveat', 600),
    font('JetBrains Mono', 'jetbrains-mono', 400), font('JetBrains Mono', 'jetbrains-mono', 600),
])

video_css = faces + """
html,body{width:1280px;height:720px;overflow:hidden;margin:0}
.page{max-width:none;width:1280px;height:720px;box-sizing:border-box;padding:20px 30px 22px;display:grid;grid-template-rows:auto minmax(0,1fr);gap:14px}
header.top{margin:0;max-width:none;position:relative;gap:2px}
header.top .lead{display:none}
h1{font-size:26px}
#vprog{position:absolute;right:0;top:4px;display:flex;align-items:center;gap:10px;font:600 14px var(--f-mono);color:var(--ink-2)}
#vprog .dots{display:flex;gap:5px}
#vprog .dots i{width:9px;height:9px;border-radius:50%;background:var(--rule)}
#vprog .dots i.on{background:var(--ink)}
.layout{grid-template-columns:650px minmax(0,1fr) !important;gap:30px;height:100%;min-height:0;align-items:start}
.stage{position:static !important;box-shadow:none;margin:0 !important;border-radius:12px !important;padding:12px !important}
.stage-head,.controls,.crumbs{display:none !important}
.readouts{font-size:14px}
.elegend{font-size:14px}
.ebar{height:16px}
.steps{padding:0 !important;height:100%;overflow:hidden}
.step{display:none;border:0 !important;padding:0 !important}
.step.active{display:block}
.step-head{cursor:default}
.step h2{font-size:1.45em}
.step-body{padding-left:42px}
.md{font-size:1.04em}
.why{font-size:.97em}
.small{font-size:.92em}
.note{font-size:1.5em}
table.res{font-size:.95em}
#vtitle{position:fixed;inset:0;background:var(--paper);display:grid;align-content:center;gap:14px;padding:0 120px;z-index:50}
#vtitle h1{font-size:46px;max-width:20ch}
#vtitle p{font-size:21px;max-width:56ch;margin:0;color:var(--ink)}
#vtitle .hint{color:var(--ink-2);font-size:17px}
#vtitle[hidden]{display:none}
"""

title_html = """<div id="vtitle">
  <div class="eyebrow">Física 1.º Bachillerato · BI · Trabajo y energía</div>
  <h1>Ejercicio 4: el cuerpo que sube y vuelve a bajar</h1>
  <p>Un cuerpo de 0,5 kg se lanza hacia arriba por un plano inclinado 30° con una velocidad de 5 m/s. El coeficiente de rozamiento es 0,2. Calcula la altura máxima y la velocidad con la que vuelve al punto de partida.</p>
  <p class="hint">Diez pasos, con el porqué de cada fórmula. Pausa el vídeo cuando necesites más tiempo para leer.</p>
</div>"""

def build_video_html():
    s = (HERE / 'index.html').read_text(encoding='utf-8')  # generado con: node build.js --artifact
    s = '<meta charset="utf-8">\n' + s
    s = s.replace('</style>', video_css + '\n</style>', 1)
    s = s.replace('<div class="page">', '<div class="page">\n' + title_html, 1)
    s = s.replace('<div class="eyebrow">Física 1.º Bachillerato · BI · Trabajo y energía</div>\n    <h1>',
                  '<div class="eyebrow">Física 1.º Bachillerato · BI · Trabajo y energía</div>\n    <div id="vprog"></div>\n    <h1>', 1)
    a = "const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;"
    assert a in s
    s = s.replace(a, 'const reduce = true;')
    b = '  activate(0);\n})();'
    assert b in s
    s = s.replace(b, '  window.__vid = { activate: (i) => activate(i), setT: (x) => { t = x; render(); }, scenes, T, t1 };\n  activate(0);\n})();')
    (ROOT / 'video.html').write_text(s, encoding='utf-8')

FIT = """() => {
  const st = document.querySelector('.step.active'), box = document.querySelector('.steps');
  let fs = 17; st.style.fontSize = fs + 'px';
  while (st.scrollHeight > box.clientHeight - 4 && fs > 12) { fs -= 0.5; st.style.fontSize = fs + 'px'; }
  return [fs, st.innerText.split(/\\s+/).length];
}"""

def main():
    build_video_html()
    if OUT.exists(): shutil.rmtree(OUT)
    OUT.mkdir()
    entries = []   # (fichero, duración en s)
    n = [0]
    def shot(page, dur):
        n[0] += 1
        f = OUT / f'f{n[0]:05d}.png'
        page.screenshot(path=str(f))
        entries.append((f.name, dur))
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={'width': 1280, 'height': 720}, device_scale_factor=1.5, color_scheme='light')
        page.goto(f'file://{ROOT}/video.html')
        page.evaluate('document.fonts.ready')
        page.wait_for_timeout(400)
        info = page.evaluate('({n: document.querySelectorAll(".step").length, scenes: __vid.scenes, T: __vid.T})')
        shot(page, 7.0)                                   # portada
        page.evaluate("document.getElementById('vtitle').hidden = true")
        total = info['n']
        for i in range(total):
            page.evaluate(f"__vid.activate({i})")
            page.evaluate(f"""() => {{ const v = document.getElementById('vprog');
                v.innerHTML = '<span>Paso {i + 1} de {total}</span><span class="dots">' +
                Array.from({{length: {total}}}, (_, k) => '<i class="' + (k <= {i} ? 'on' : '') + '"></i>').join('') + '</span>'; }}""")
            fs, words = page.evaluate(FIT)
            read = max(10.0, min(40.0, words * 0.36))
            sc = info['scenes'][i]
            if 'play' in sc:
                t0, t1 = sc['play']
                page.evaluate(f'__vid.setT({t0})')
                shot(page, 2.0)
                frames = int(round((t1 - t0) / SLOW * FR))
                for k in range(1, frames + 1):
                    page.evaluate(f'__vid.setT({t0 + (t1 - t0) * k / frames})')
                    shot(page, 1 / FR)
                shot(page, read)
            else:
                shot(page, read)
            print(f'paso {i + 1}: letra {fs}px, {words} palabras, lectura {read:.0f} s')
        b.close()
    lst = OUT / 'list.txt'
    with lst.open('w') as fh:
        for name, dur in entries:
            fh.write(f"file '{name}'\nduration {dur:.4f}\n")
        fh.write(f"file '{entries[-1][0]}'\n")
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', str(lst),
                    '-vf', 'fps=30,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
                    '-profile:v', 'high', '-level', '4.1', '-movflags', '+faststart',
                    str(ROOT / 'ejercicio4.mp4')], check=True)
    print('frames:', len(entries))

if __name__ == '__main__':
    main()
