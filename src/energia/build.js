// Genera las páginas del tema «Trabajo, potencia y energía»:
//   ../../temas/energia/index.html                    mapa del tema (herramientas, índice, formulario, errores)
//   ../../temas/energia/<categoría>/index.html         idea clave + dos ejemplos resueltos con simulación + enlace a sus ejercicios
//   ../../temas/energia/ejercicios/index.html          todos los ejercicios propuestos, por temática, sin teoría
//   ../../temas/energia/ejercicios/<n-m>/index.html    solución paso a paso de cada ejercicio, con su simulación
// Fuentes: contenido/*.md (una categoría por fichero; formato descrito en el README) y diagramas/*.jsx.
// Uso: cd src && npm install && node energia/build.js
const fs = require('fs'), path = require('path');
const esbuild = require('esbuild');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { marked } = require('marked');

const HERE = __dirname;
const OUT = path.join(HERE, '../../temas/energia');
const TEMA = 'Trabajo, potencia y energía';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const dash = id => id.replace('.', '-');

// ---------------------------------------------------------------- lectura de contenido/*.md
// ---            cabecera (slug, titulo, nombre, corto, eyebrow, desc)
// ---
// markdown de la idea clave
// === 5.1 | Teoría 12 | Título
// figura: e_t12 · pide: … · indice: … · widget: muelle {json}
// --- enunciado / --- resultado / --- solucion / --- simulacion
function leer(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const m = txt.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = {};
  for (const l of m[1].split('\n')) { const i = l.indexOf(':'); meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
  const [intro, ...bloques] = m[2].split(/^=== /m);
  const ejercicios = bloques.map(b => {
    const [head, ...rest] = b.split('\n');
    const [id, fuente, titulo] = head.split('|').map(s => s.trim());
    const e = { id, fuente, titulo, nuevo: fuente === 'Nuevo' };
    const partes = rest.join('\n').split(/^--- (\w+)\n/m);
    for (const l of partes[0].trim().split('\n').filter(Boolean)) { const i = l.indexOf(':'); e[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
    for (let i = 1; i < partes.length; i += 2) e[partes[i]] = partes[i + 1].trim();
    if (e.widget) { const i = e.widget.indexOf(' '); e.widgetNombre = e.widget.slice(0, i); e.widgetCfg = JSON.parse(e.widget.slice(i + 1)); }
    return e;
  });
  return Object.assign(meta, { intro: intro.trim(), ejercicios });
}
const ficheros = fs.readdirSync(path.join(HERE, 'contenido')).filter(f => f.endsWith('.md')).sort();
const mapa = leer(path.join(HERE, 'contenido', ficheros[0]));
const cats = ficheros.slice(1).map(f => leer(path.join(HERE, 'contenido', f)));
const porId = {};
cats.forEach((c, i) => {
  const res = (c.resueltos || '').split(',').map(s => s.trim()).filter(Boolean);
  c.ejercicios.forEach(e => { e.cat = c; e.catN = i + 1; e.resuelto = res.includes(e.id); porId[e.id] = e; });
  c.ejemplos = c.ejercicios.filter(e => e.resuelto);
  c.practica = c.ejercicios.filter(e => !e.resuelto);
});
// los ejemplos resueltos están en la página de su apartado; el resto, en la sección de ejercicios (base = ruta hasta temas/energia/)
const url = (e, base) => e.resuelto ? `${base}${e.cat.slug}/#ej-${e.id.replace('.', '-')}` : `${base}ejercicios/${e.id.replace('.', '-')}/`;
const practica = cats.flatMap(c => c.practica);

// ---------------------------------------------------------------- diagramas: JSX -> SVG estático con colores en style (Safari)
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
const figura = (name, cap) => `<figure class="fig">${diagram(name)}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;

// ---------------------------------------------------------------- Markdown -> HTML
const slugify = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
// enlaza «ejercicio 2.1», «ejercicios 2.1 y 6.1» con la página de su solución; base = ruta hasta temas/energia/
function enlazar(html, base) {
  return html.replace(/(ejercicios?\s+)(\d\.\d{1,2})((?:\s*(?:,|y)\s*\d\.\d{1,2})*)/gi, (m, pre, a, resto) => {
    const L = id => porId[id] ? `<a href="${url(porId[id], base)}">${id}</a>` : id;
    return pre + L(a) + resto.replace(/\d\.\d{1,2}/g, L);
  });
}
function render(md, { base = '', extra = {} } = {}) {
  const heads = [];
  let html = marked.parse(md, { gfm: true });
  html = html.replace(/<p>\[\[diagrama:([a-z0-9_]+)\|([^\]]+)\]\]<\/p>/g, (_, n, cap) => figura(n, cap));
  for (const k in extra) html = html.replace(`<p>[[${k}]]</p>`, extra[k]);
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
    if (/[=⟹⟺]/.test(t)) return `<p class="eq">${inner}</p>`;
    if ((t.match(/<strong>/g) || []).length === 1) return `<p class="sub">${inner}</p>`;
    return m;
  });
  html = html.replace(/<p><strong>Resultado:<\/strong>/g, '<p class="res"><strong>Resultado:</strong>');
  html = html.replace(/<blockquote>/g, '<blockquote class="why">');
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  html = enlazar(html, base);
  return { html, heads };
}
const inline = md => marked.parseInline(md);

// ---------------------------------------------------------------- estilos
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
.cats a.ej{border-color:var(--c-p);color:var(--c-p)}
.cats a.ej[aria-current="page"]{background:var(--c-p);color:var(--sheet)}
.layout{display:grid;grid-template-columns:minmax(0,1fr);gap:28px}
@media (min-width:1000px){.layout{grid-template-columns:minmax(0,760px) 1fr}}
.toc{display:none}
@media (min-width:1000px){.toc{display:block;position:sticky;top:16px;align-self:start;font-size:13.5px;max-height:calc(100vh - 32px);overflow:auto}
  .toc h2{font:700 12px var(--f-body);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);margin:0 0 8px}
  .toc ol{list-style:none;margin:0;padding:0;display:grid;gap:6px}
  .toc a{color:var(--ink-2);text-decoration:none;line-height:1.3;display:block}
  .toc a:hover{color:var(--ink)}
  .toc .sep{margin-top:8px;font-weight:700;color:var(--ink)}}
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
/* ejercicios propuestos */
.metodo{background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:10px 14px;font-size:14.5px}
.metodo ol{margin:6px 0 2px}
.props{display:grid;gap:14px;margin:14px 0}
.prop{background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:14px 16px;scroll-margin-top:12px}
.prop .cab{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;margin-bottom:6px}
.prop .num{font:700 1.05rem var(--f-display)}
.prop .src{font:600 12px var(--f-mono);color:var(--ink-2);letter-spacing:.02em}
.tag{font:600 11px var(--f-mono);letter-spacing:.04em;text-transform:uppercase;border:1px solid currentColor;border-radius:999px;padding:1px 7px}
.tag.nuevo{color:var(--c-n)}
.tag.sel{color:var(--c-a)}
.tag.sim{color:var(--c-p)}
.prop h3{font-size:1rem;margin:0 0 6px;line-height:1.3}
.prop .enun p{margin:6px 0}
.prop .fig{margin:10px 0 4px}
.prop .acc{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start;margin-top:10px}
.prop details{flex:1 1 260px;min-width:0}
.prop summary{cursor:pointer;font:600 13.5px var(--f-body);color:var(--ink-2);min-height:38px;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--rule);border-radius:9px;padding:0 12px;list-style:none}
.prop summary::-webkit-details-marker{display:none}
.prop summary::before{content:"▸";font-size:12px}
.prop details[open] summary::before{content:"▾"}
.prop details[open] summary{color:var(--ink)}
.prop details p{background:var(--hl);border-radius:8px;padding:8px 12px;margin:8px 0 0}
.prop .btn{margin-left:auto}
@media (max-width:520px){.prop .btn{margin-left:0;width:100%}}
/* ejemplos resueltos dentro de cada apartado */
.ejemplo{margin:18px 0 0;padding-top:4px}
.ejemplo>h3{font-size:1.12rem;margin:30px 0 10px;scroll-margin-top:12px}
.ejemplo>h3 .src{font:600 12px var(--f-mono);color:var(--ink-2);margin-left:6px}
.ejemplo h4{font:700 .82rem var(--f-body);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);margin:22px 0 6px}
.ejemplo+.ejemplo{border-top:1px dashed var(--rule);margin-top:30px}
.ir-ej{display:grid;gap:8px;background:var(--sheet);border:1px solid var(--c-p);border-radius:12px;padding:14px 16px;margin:14px 0}
.ir-ej p{margin:0}
.ir-ej .lista{font-size:14px;color:var(--ink-2);margin:0;padding-left:0;list-style:none;display:grid;gap:3px}
.ir-ej .lista .tag{font-size:10px;padding:0 6px}
.ir-ej .btn{justify-self:start}
.grupo-ej{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:4px 12px}
.grupo-ej a{font-size:14px}
.filtro{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 4px}
.filtro a{font:600 13px var(--f-body);text-decoration:none;color:var(--ink-2);border:1px solid var(--rule);background:var(--sheet);border-radius:999px;padding:5px 11px}
.filtro a:hover{border-color:var(--ink-2);color:var(--ink)}
/* página de solución */
.enun-box{background:var(--sheet);border:1px solid var(--rule);border-left:4px solid var(--ink);border-radius:12px;padding:12px 16px}
.enun-box .lbl{font:700 12px var(--f-body);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2)}
.enun-box p{margin:6px 0}
.res-box{background:var(--hl);border-radius:12px;padding:10px 16px;margin:14px 0}
.res-box .lbl{font:700 12px var(--f-body);letter-spacing:.08em;text-transform:uppercase}
.res-box p{margin:4px 0}
.saltos{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 0}
.saltos a{font:600 13px var(--f-body);text-decoration:none;color:var(--ink-2);border:1px solid var(--rule);background:var(--sheet);border-radius:999px;padding:5px 11px}
.doc .widget{margin:16px 0 8px}
.doc .widget:empty{display:none}
/* índice con resultados ocultos */
.ver-res{display:inline-flex;align-items:center;gap:8px;font:600 14px var(--f-body);cursor:pointer;margin:4px 0}
.ver-res input{width:18px;height:18px;accent-color:var(--c-p)}
.indice td.r{transition:filter .2s}
.indice td:first-child{white-space:nowrap}
.indice td small{display:block;color:var(--ink-2);font-size:12px}
.indice tr.grupo th{background:var(--plane);font-size:14px}
.indice tr.grupo a{color:inherit}
.ver-res:has(input:not(:checked)) + .table-wrap td.r{filter:blur(5px);user-select:none}
.pager{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:40px;border-top:1px solid var(--rule);padding-top:16px}
.pager a{text-decoration:none;max-width:48%}
.pager .mid{align-self:center}
.pager small{display:block;color:var(--ink-2);font-size:12px}
footer{margin-top:36px;color:var(--ink-2);font-size:13px}
@media print{.cats,.toc,.pager,.crumbs,.widget,.saltos,.prop .btn,.prop summary{display:none}.layout{display:block}.fig,.table-wrap,p.eq,.prop{break-inside:avoid}}
`;

// ---------------------------------------------------------------- plantilla de página
function page({ title, eyebrow, desc, body, toc, depth, current, crumbs, widgets = [], pager }) {
  const up = '../'.repeat(depth), topic = '../'.repeat(depth - 2);
  const chips = `<a href="${topic}"${current === '' ? ' aria-current="page"' : ''}>Mapa del tema</a><a class="ej" href="${topic}ejercicios/"${current === 'ejercicios' ? ' aria-current="page"' : ''}>Ejercicios</a>` +
    cats.map((c, i) => `<a href="${topic}${c.slug}/"${current === c.slug ? ' aria-current="page"' : ''}>${i + 1} · ${c.corto}</a>`).join('');
  const tocHtml = toc && toc.length ? `<aside class="toc" aria-label="En esta página"><h2>En esta página</h2><ol>${toc.map(h => `<li${h.sep ? ' class="sep"' : ''}><a href="#${h.id}">${h.txt}</a></li>`).join('')}</ol></aside>` : '';
  const scripts = [];
  if (widgets.some(w => w !== 'muelle')) scripts.push('nucleo');
  for (const w of new Set(widgets)) scripts.push(w);
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
  <nav class="crumbs" aria-label="Ruta"><a href="${up}">Física interactiva</a>${crumbs.map(([t, h]) => `<span aria-hidden="true">›</span>${h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`}`).join('')}</nav>
  <header class="top"><div class="eyebrow">${esc(eyebrow)}</div><h1>${title}</h1>${desc ? `<p class="lead">${esc(desc)}</p>` : ''}</header>
  <nav class="cats" aria-label="Categorías del tema">${chips}</nav>
  <div class="layout">
    <main class="doc">
${body}
    ${pager || ''}
    </main>
    ${tocHtml}
  </div>
  <footer>Material de estudio. Si el enunciado no da g, se usa 9,8 m/s². Para imprimir, usa la opción de imprimir del navegador.</footer>
</div>
${scripts.map(w => `<script src="${up}assets/widgets/${w}.js" defer></script>\n`).join('')}</body>
</html>
`;
}
const pagerHtml = (prev, next, mid) => `<nav class="pager" aria-label="Anterior y siguiente">${prev ? `<a href="${prev.href}"><small>Anterior</small>${prev.txt}</a>` : '<span></span>'}${mid ? `<a class="mid" href="${mid.href}">${mid.txt}</a>` : ''}${next ? `<a href="${next.href}" style="text-align:right"><small>Siguiente</small>${next.txt}</a>` : '<span></span>'}</nav>`;
const widgetDiv = e => `<div class="widget" data-widget="${e.widgetNombre}" data-config='${JSON.stringify(Object.assign({ titulo: `Simulación · ${e.id} · ${e.fuente}` }, e.widgetCfg)).replace(/&/g, '&amp;').replace(/'/g, '&#39;')}'></div>`;
const tagHtml = e => e.nuevo ? '<span class="tag nuevo">Nuevo</span>' : /^Selectividad/.test(e.fuente) ? `<span class="tag sel">${esc(e.fuente)}</span>` : '';
const escribir = (rel, html) => { const f = path.join(OUT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); return f; };
const esCuestion = c => c.slug === 'cuestiones';

// ---------------------------------------------------------------- mapa del tema
const catsHtml = `<div class="grid-cats">${cats.map((c, i) =>
  `<a class="card" href="${c.slug}/"><span class="n grid-paper">${i + 1}</span><span><h3>${c.nombre}</h3><p>${c.desc}</p></span></a>`).join('')}</div>`;
const filas = cats.map((c, i) => `<tr class="grupo"><th colspan="3"><a href="${c.slug}/">${i + 1} · ${esc(c.nombre)}</a></th></tr>` + c.ejercicios.map(e =>
  `<tr><td><a href="${url(e, '')}">${e.id}</a><small>${esc(e.fuente)}${e.resuelto ? ' · resuelto' : ''}</small></td><td>${inline(e.pide || e.titulo)}</td><td class="r">${e.indice ? inline(e.indice) : esCuestion(c) ? 'Respuesta razonada' : inline(e.resultado || '')}</td></tr>`).join('')).join('');
const indiceHtml = `<p>${cats.reduce((a, c) => a + c.ejercicios.length, 0)} ejercicios y cuestiones. El número lleva a la solución paso a paso (los marcados «resuelto» son los ejemplos de cada apartado). Los resultados están difuminados para que no los veas sin querer.</p>
<label class="ver-res"><input type="checkbox"> Mostrar los resultados</label>
<div class="table-wrap indice"><table><thead><tr><th>Ejercicio</th><th>Qué se pide</th><th>Resultado</th></tr></thead><tbody>${filas}</tbody></table></div>`;
{
  const r = render(mapa.intro, { base: '', extra: { categorias: catsHtml, indice: indiceHtml } });
  const f = escribir('', page({ title: esc(mapa.titulo), eyebrow: mapa.eyebrow, desc: mapa.desc, body: r.html, toc: r.heads, depth: 2, current: '',
    crumbs: [[TEMA, null]], pager: pagerHtml(null, { href: `${cats[0].slug}/`, txt: cats[0].nombre }) }));
  console.log(path.relative(process.cwd(), f));
}

// ---------------------------------------------------------------- tarjeta de ejercicio propuesto (sección de ejercicios)
const tarjeta = (e, base) => {
  const cuest = esCuestion(e.cat), fig = e.figura ? figura(e.figura, '') : '', h = url(e, base);
  const acc = cuest
    ? `<div class="acc"><a class="btn primary" href="${h}">Ver la respuesta razonada →</a></div>`
    : `<div class="acc"><details><summary>Ver solo el resultado</summary><p>${inline(e.resultado)}</p></details><a class="btn primary" href="${h}">Solución paso a paso →</a></div>`;
  return `<article class="prop" id="e-${dash(e.id)}"><div class="cab"><span class="num">${e.id}</span>${e.nuevo || /^Selectividad/.test(e.fuente) ? '' : `<span class="src">${esc(e.fuente)}</span>`}${tagHtml(e)}${e.widget ? '<span class="tag sim">Con simulación</span>' : ''}</div>
<h3>${esc(e.titulo)}</h3><div class="enun">${enlazar(marked.parse(e.enunciado), base)}</div>${fig}${acc}</article>`;
};
// bloque con enunciado, resultado, solución y simulación (ejemplos en su apartado y páginas de solución)
function solucionHtml(e, base, { h, ids }) {
  const cuest = esCuestion(e.cat), s = render(e.solucion, { base });
  const fig = e.figura ? figura(e.figura, 'Figura del enunciado') : '';
  let b = `<div class="enun-box"${ids ? ' id="enunciado"' : ''}><div class="lbl">Enunciado</div>${enlazar(marked.parse(e.enunciado), base)}</div>${fig}`;
  if (!cuest && e.resultado) b += `<div class="res-box"${ids ? ' id="resultado"' : ''}><div class="lbl">Resultado</div><p>${inline(e.resultado)}</p></div>`;
  b += `\n<${h}${ids ? ' id="solucion"' : ''}>${cuest ? 'Respuesta razonada' : 'Solución paso a paso'}</${h}>\n${s.html}`;
  if (e.widget) b += `\n<${h}${ids ? ' id="simulacion"' : ''}>Simulación</${h}>\n${e.simulacion ? marked.parse(e.simulacion) : ''}\n${widgetDiv(e)}`;
  return b;
}

// ---------------------------------------------------------------- apartados: idea clave + ejemplos resueltos + enlace a sus ejercicios
let total = 0;
cats.forEach((c, ci) => {
  const cuest = esCuestion(c), base = '../';
  const r = render(c.intro, { base });
  const toc = r.heads.slice();
  let body = r.html;
  if (c.ejemplos.length) {
    const hEj = cuest ? 'Cuestiones resueltas' : 'Ejemplos resueltos';
    body += `\n<h2 id="ejemplos">${hEj}</h2>\n<p>${cuest ? 'Dos cuestiones de los apuntes respondidas con el esquema de arriba.' : 'Dos ejercicios de los apuntes resueltos paso a paso, con su simulación: léelos antes de pasar a los ejercicios.'}</p>`;
    toc.push({ id: 'ejemplos', txt: hEj, sep: true });
    for (const e of c.ejemplos) {
      body += `\n<section class="ejemplo"><h3 id="ej-${dash(e.id)}">${e.id} · ${esc(e.titulo)}<span class="src">${esc(e.fuente)}</span></h3>\n${solucionHtml(e, base, { h: 'h4', ids: false })}</section>`;
      toc.push({ id: `ej-${dash(e.id)}`, txt: `${e.id} · ${e.fuente}` });
    }
  }
  const n = c.practica.length, nNuevos = c.practica.filter(e => e.nuevo).length, nSel = c.practica.filter(e => /^Selectividad/.test(e.fuente)).length;
  const desglose = [n - nNuevos - nSel ? `${n - nNuevos - nSel} de los apuntes` : '', nSel ? `${nSel} de Selectividad` : '', nNuevos ? `${nNuevos} ${cuest ? 'nuevas' : 'nuevos'}` : ''].filter(Boolean).join(', ');
  body += `\n<h2 id="practicar">${cuest ? 'Cuestiones para practicar' : 'Ejercicios para practicar'}</h2>
<div class="ir-ej"><p>Este apartado tiene <strong>${n} ${cuest ? 'cuestiones' : 'ejercicios'} más</strong> (${desglose}) en la sección de ejercicios: enunciado, resultado para comprobar y solución paso a paso.</p>
<ul class="lista">${c.practica.map(e => `<li><a href="../ejercicios/#e-${dash(e.id)}">${e.id}</a> ${esc(e.titulo)}${e.nuevo ? ' <span class="tag nuevo">Nuevo</span>' : /^Selectividad/.test(e.fuente) ? ` <span class="tag sel">${esc(e.fuente)}</span>` : ''}</li>`).join('')}</ul>
<a class="btn primary" href="../ejercicios/#${c.slug}">${cuest ? 'Cuestiones' : 'Ejercicios'} de este apartado →</a></div>`;
  toc.push({ id: 'practicar', txt: 'Para practicar', sep: true });
  const prevC = ci === 0 ? { href: '../', txt: 'Mapa del tema' } : { href: `../${cats[ci - 1].slug}/`, txt: cats[ci - 1].nombre };
  const nextC = cats[ci + 1] ? { href: `../${cats[ci + 1].slug}/`, txt: cats[ci + 1].nombre } : { href: '../ejercicios/', txt: 'Ejercicios del tema' };
  escribir(c.slug, page({ title: esc(c.titulo), eyebrow: c.eyebrow, desc: c.desc, body, toc, depth: 3, current: c.slug,
    crumbs: [[TEMA, '../'], [c.corto, null]], widgets: c.ejemplos.filter(e => e.widget).map(e => e.widgetNombre), pager: pagerHtml(prevC, nextC) }));
  total++;
});

// ---------------------------------------------------------------- sección de ejercicios: todos los propuestos, por temática
{
  const base = '../';
  let body = `<div class="metodo"><strong>Cómo practicar</strong><ol><li>Lee el enunciado y resuélvelo en la libreta, con el diagrama de fuerzas y las unidades.</li><li>Comprueba el número con «Ver solo el resultado».</li><li>Abre la solución paso a paso para revisar el planteamiento, los signos y el porqué de cada fórmula. Si tiene simulación, cambia los datos y mira qué pasa.</li></ol><p style="margin:6px 0 0">Si te atascas, repasa la teoría del apartado (el enlace está junto a cada título) y sus dos ejemplos resueltos.</p></div>
<nav class="filtro" aria-label="Ir a una temática">${cats.map((c, i) => `<a href="#${c.slug}">${i + 1} · ${esc(c.corto)} (${c.practica.length})</a>`).join('')}</nav>`;
  const toc = [];
  cats.forEach((c, i) => {
    body += `\n<h2 id="${c.slug}" class="grupo-ej"><span>${i + 1} · ${esc(c.nombre)}</span><a href="../${c.slug}/">Repasar la teoría →</a></h2>\n<div class="props">${c.practica.map(e => tarjeta(e, base)).join('\n')}</div>`;
    toc.push({ id: c.slug, txt: `${i + 1} · ${c.corto} (${c.practica.length})` });
  });
  escribir('ejercicios', page({ title: 'Ejercicios', eyebrow: TEMA, desc: `${practica.length} ejercicios y cuestiones para practicar, clasificados por temática: de los apuntes de clase, de Selectividad y nuevos. Cada uno con su resultado y su solución paso a paso.`,
    body, toc, depth: 3, current: 'ejercicios', crumbs: [[TEMA, '../'], ['Ejercicios', null]],
    pager: pagerHtml({ href: '../', txt: 'Mapa del tema' }, { href: `../${cats[0].slug}/`, txt: cats[0].nombre }) }));
  total++;
}

// ---------------------------------------------------------------- una página de solución por ejercicio de la sección
practica.forEach((e, k) => {
  const c = e.cat, cuest = esCuestion(c), sb = '../../';
  let body = solucionHtml(e, sb, { h: 'h2', ids: true });
  const saltos = (e.widget ? `<a href="#simulacion">Ir a la simulación ↓</a>` : '') + `<a href="../#e-${dash(e.id)}">Volver a los ejercicios</a><a href="../../${c.slug}/">Teoría: ${esc(c.corto)}</a>`;
  body = `<nav class="saltos" aria-label="Saltar a">${saltos}</nav>` + body;
  const toc = [{ id: 'enunciado', txt: 'Enunciado' }].concat(!cuest && e.resultado ? [{ id: 'resultado', txt: 'Resultado' }] : [], [{ id: 'solucion', txt: cuest ? 'Respuesta' : 'Solución' }], e.widget ? [{ id: 'simulacion', txt: 'Simulación' }] : []);
  const prev = practica[k - 1], next = practica[k + 1];
  const pg = pagerHtml(prev ? { href: `../${dash(prev.id)}/`, txt: `${prev.id} · ${prev.fuente}` } : null, next ? { href: `../${dash(next.id)}/`, txt: `${next.id} · ${next.fuente}` } : null, { href: `../#e-${dash(e.id)}`, txt: 'Todos los ejercicios' });
  escribir(path.join('ejercicios', dash(e.id)), page({
    title: `${e.id} · ${esc(e.titulo)}`, eyebrow: `${cuest ? 'Respuesta' : 'Solución'} · ${e.fuente} · ${c.nombre}`, desc: '', body, toc, depth: 4, current: 'ejercicios',
    crumbs: [[TEMA, '../../'], ['Ejercicios', '../'], [e.id, null]], widgets: e.widget ? [e.widgetNombre] : [], pager: pg,
  }));
  total++;
});
console.log(`${total} páginas: 8 apartados, la sección de ejercicios y ${practica.length} soluciones`);
