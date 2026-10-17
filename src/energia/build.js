// Genera las páginas del tema «Trabajo, potencia y energía»:
//   ../../temas/energia/index.html            mapa del tema (índice, formulario, errores)
//   ../../temas/energia/<categoría>/index.html  una página por categoría con sus ejercicios resueltos
// Fuentes: contenido.json (texto en Markdown, una entrada por página) y diagramas/*.jsx (un diagrama por fichero).
// Uso: cd src && npm install && node energia/build.js
const fs = require('fs'), path = require('path');
const esbuild = require('esbuild');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { marked } = require('marked');

const HERE = __dirname;
const OUT = path.join(HERE, '../../temas/energia');
const data = JSON.parse(fs.readFileSync(path.join(HERE, 'contenido.json'), 'utf8'));
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// ---- diagramas: JSX -> SVG estático con los colores pasados a style (funciona en Safari) ----
function diagram(name) {
  const src = fs.readFileSync(path.join(HERE, 'diagramas', name + '.jsx'), 'utf8');
  const js = esbuild.transformSync(src, { loader: 'jsx', format: 'cjs', jsxFactory: 'React.createElement' }).code;
  const mod = { exports: {} };
  new Function('React', 'module', 'exports', js)(React, mod, mod.exports);
  let svg = renderToStaticMarkup(React.createElement(mod.exports.default));
  svg = svg.replace(/\sdata-claude-[a-z-]+="[^"]*"/g, '');
  svg = svg.replace(/<([a-zA-Z]+)((?:\s+[a-zA-Z:-]+="[^"]*")*)\s*(\/?)>/g, (m, tag, attrs, sl) => {
    const st = [];
    attrs = attrs.replace(/\s(fill|stroke)="(var\([^"]+\))"/g, (_, k, v) => { st.push(`${k}:${v}`); return ''; });
    if (st.length) attrs += ` style="${st.join(';')}"`;
    return `<${tag}${attrs}${sl ? '/' : ''}>`;
  });
  return svg;
}

// ---- Markdown -> HTML con clases para fórmulas, resultados y diagramas ----
const slugify = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
function render(md, catsHtml) {
  const heads = [];
  let html = marked.parse(md, { gfm: true });
  html = html.replace(/<p>\[\[diagrama:([a-z0-9_]+)\|([^\]]+)\]\]<\/p>/g, (_, n, cap) =>
    `<figure class="fig">${diagram(n)}<figcaption>${cap}</figcaption></figure>`);
  html = html.replace(/<p>\[\[categorias\]\]<\/p>/, catsHtml || '');
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, t) => {
    const txt = t.replace(/<[^>]+>/g, '');
    let id = slugify(txt), k = 2;
    while (heads.some(h => h.id === id)) id = slugify(txt) + '-' + k++;
    heads.push({ id, txt });
    return `<h2 id="${id}">${t}</h2>`;
  });
  // párrafo que empieza y acaba en negrita: fórmula si lleva «=» o «⟹», subtítulo si no
  html = html.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner) => {
    const t = inner.trim();
    if (!t.startsWith('<strong>') || !/<\/strong>\.?$/.test(t)) return m;
    if (/[=⟹]/.test(t)) return `<p class="eq">${inner}</p>`;
    if ((t.match(/<strong>/g) || []).length === 1) return `<p class="sub">${inner}</p>`;
    return m;
  });
  html = html.replace(/<p><strong>Resultado:<\/strong>/g, '<p class="res"><strong>Resultado:</strong>');
  html = html.replace(/<blockquote>/g, '<blockquote class="why">');
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  return { html, heads };
}

const CSS = `
:root{--c-a:#7b4fd6;--c-k:#b4407e;--axis:#8793a6}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--c-a:#b39bff;--c-k:#f08cc0;--axis:#8e9ab0}}
:root[data-theme="dark"]{--c-a:#b39bff;--c-k:#f08cc0;--axis:#8e9ab0}
.fig{--cds-text-primary:var(--ink);--cds-text-secondary:var(--ink-2);--cds-chart-axis:var(--axis);--cds-chart-grid:var(--rule);
  --cds-chart-reference-tint:var(--plane);--cds-chart-categorical-1:var(--c-p);--cds-chart-categorical-2:var(--c-n);
  --cds-chart-categorical-3:var(--c-fr);--cds-chart-categorical-4:var(--c-a);--cds-chart-categorical-5:var(--c-k);
  margin:18px 0 6px;background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:10px 10px 6px}
.fig svg{display:block;width:100%;height:auto;font-family:var(--f-body)}
.fig figcaption{font-size:13px;color:var(--ink-2);padding:4px 4px 2px}
header.top{display:grid;gap:8px;margin:6px 0 18px}
.cats{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 22px}
.cats a{font:600 13px var(--f-body);text-decoration:none;color:var(--ink-2);border:1px solid var(--rule);background:var(--sheet);border-radius:999px;padding:5px 11px}
.cats a:hover{border-color:var(--ink-2);color:var(--ink)}
.cats a[aria-current="page"]{background:var(--ink);color:var(--sheet);border-color:var(--ink)}
.layout{display:grid;grid-template-columns:minmax(0,1fr);gap:28px}
@media (min-width:1000px){.layout{grid-template-columns:minmax(0,760px) 1fr}}
.toc{display:none}
@media (min-width:1000px){.toc{display:block;position:sticky;top:16px;align-self:start;font-size:13.5px;max-height:calc(100vh - 32px);overflow:auto}
  .toc h2{font:700 12px var(--f-body);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);margin:0 0 8px}
  .toc ol{list-style:none;margin:0;padding:0;display:grid;gap:6px}
  .toc a{color:var(--ink-2);text-decoration:none;line-height:1.3;display:block}
  .toc a:hover{color:var(--ink)}}
.doc{min-width:0}
.doc>h2:first-child{border-top:0;margin-top:0;padding-top:0}
.doc h2{font-size:1.28rem;margin:38px 0 10px;padding-top:16px;border-top:1px solid var(--rule);scroll-margin-top:12px}
.doc h3{font-size:1.06rem;margin:26px 0 8px}
.doc p{margin:10px 0}
.doc p.eq{background:var(--sheet);border:1px solid var(--rule);border-left:3px solid var(--c-p);border-radius:8px;padding:9px 12px;overflow-x:auto}
.doc p.sub{margin:22px 0 4px}
.doc p.res{background:var(--hl);border-radius:8px;padding:8px 12px}
.doc blockquote.why{margin:10px 0 14px;padding:8px 14px;border-left:3px solid var(--rule);background:color-mix(in srgb,var(--sheet) 70%,transparent);border-radius:0 8px 8px 0;color:var(--ink)}
.doc blockquote.why p{margin:4px 0}
.doc ul,.doc ol{padding-left:1.3em}
.doc li{margin:4px 0}
.table-wrap{overflow-x:auto;margin:12px 0;border:1px solid var(--rule);border-radius:10px;background:var(--sheet)}
.doc table{border-collapse:collapse;width:100%;font-size:14.5px}
.doc th,.doc td{text-align:left;vertical-align:top;padding:7px 10px;border-bottom:1px solid var(--rule)}
.doc th{font-weight:700;background:var(--paper)}
.doc tr:last-child td{border-bottom:0}
.grid-cats{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));margin:18px 0 8px}
.grid-cats a{display:grid;grid-template-columns:44px minmax(0,1fr);gap:12px;align-items:start;text-decoration:none;color:inherit}
.grid-cats a:hover{border-color:var(--ink-2)}
.grid-cats .n{font:700 1.5rem/44px var(--f-display);text-align:center;border-radius:10px;border:1px solid var(--rule)}
.grid-cats h3{font-size:1rem;line-height:1.25}
.grid-cats p{margin:4px 0 0;font-size:13.5px;color:var(--ink-2)}
.pager{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:40px;border-top:1px solid var(--rule);padding-top:16px}
.pager a{text-decoration:none;max-width:48%}
.pager small{display:block;color:var(--ink-2);font-size:12px}
footer{margin-top:36px;color:var(--ink-2);font-size:13px}
@media print{.cats,.toc,.pager,.crumbs{display:none}.layout{display:block}.fig,.table-wrap,p.eq{break-inside:avoid}}
`;

function page({ title, eyebrow, desc, body, heads, depth, current }) {
  const up = '../'.repeat(depth);
  const topic = depth === 2 ? './' : '../';
  const cats = data.cats.map((c, i) =>
    `<a href="${topic}${c.slug}/"${current === c.slug ? ' aria-current="page"' : ''}>${i + 1} · ${c.short}</a>`).join('');
  const mapa = `<a href="${topic}"${current === '' ? ' aria-current="page"' : ''}>Mapa del tema</a>`;
  const toc = heads.length ? `<aside class="toc" aria-label="En esta página"><h2>En esta página</h2><ol>${heads.map(h => `<li><a href="#${h.id}">${h.txt}</a></li>`).join('')}</ol></aside>` : '';
  const i = data.cats.findIndex(c => c.slug === current);
  const seq = [{ slug: '', name: 'Mapa del tema' }, ...data.cats];
  const k = i + 1, prev = seq[k - 1], next = seq[k + 1];
  const link = p => `${topic}${p.slug ? p.slug + '/' : ''}`;
  const pager = `<nav class="pager" aria-label="Anterior y siguiente">${prev ? `<a href="${link(prev)}"><small>Anterior</small>${prev.name}</a>` : '<span></span>'}${next ? `<a href="${link(next)}" style="text-align:right"><small>Siguiente</small>${next.name}</a>` : ''}</nav>`;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)} · Física interactiva</title>
<meta name="description" content="${esc(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=JetBrains+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="${up}assets/base.css">
<style>${CSS}</style>
</head>
<body>
<div class="page">
  <nav class="crumbs" aria-label="Ruta"><a href="${up}">Física interactiva</a><span aria-hidden="true">›</span><a href="${topic}">${esc(data.tema)}</a>${current ? `<span aria-hidden="true">›</span><span>${esc(title)}</span>` : ''}</nav>
  <header class="top"><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1>${desc ? `<p class="lead">${esc(desc)}</p>` : ''}</header>
  <nav class="cats" aria-label="Categorías del tema">${mapa}${cats}</nav>
  <div class="layout">
    <main class="doc">
${body}
    ${pager}
    </main>
    ${toc}
  </div>
  <footer>Material de estudio. Si el enunciado no da g, se usa 9,8 m/s². Para imprimir, usa la opción de imprimir del navegador.</footer>
</div>
</body>
</html>
`;
}

const catsHtml = `<div class="grid-cats">${data.cats.map((c, i) =>
  `<a class="card" href="${c.slug}/"><span class="n grid-paper">${i + 1}</span><span><h3>${c.name}</h3><p>${c.desc}</p></span></a>`).join('')}</div>`;

for (const p of data.pages) {
  const { html, heads } = render(p.md, p.slug ? '' : catsHtml);
  const dir = p.slug ? path.join(OUT, p.slug) : OUT;
  fs.mkdirSync(dir, { recursive: true });
  const out = page({
    title: p.title, eyebrow: p.eyebrow,
    desc: p.desc || 'Todos los ejercicios del tema ordenados por categorías, con el resultado de cada uno, el formulario y los errores frecuentes.',
    body: html, heads, depth: p.slug ? 3 : 2, current: p.slug,
  });
  fs.writeFileSync(path.join(dir, 'index.html'), out);
  console.log(path.relative(process.cwd(), path.join(dir, 'index.html')), Math.round(out.length / 1024) + ' KB');
}
