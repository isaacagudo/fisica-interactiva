// Genera las páginas del tema «Trabajo, potencia y energía»:
//   ../../temas/energia/index.html                    mapa del tema (herramientas, índice, formulario, errores)
//   ../../temas/energia/<categoría>/index.html         idea clave + ejercicios propuestos (enunciado, resultado oculto, enlace a la solución)
//   ../../temas/energia/<categoría>/<n-m>/index.html   solución paso a paso de cada ejercicio, con su simulación
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
cats.forEach((c, i) => c.ejercicios.forEach(e => { e.cat = c; e.catN = i + 1; porId[e.id] = e; }));

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
    const L = id => porId[id] ? `<a href="${base}${porId[id].cat.slug}/${dash(id)}/">${id}</a>` : id;
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
  const chips = `<a href="${topic}"${current === '' ? ' aria-current="page"' : ''}>Mapa del tema</a>` +
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
  `<tr><td><a href="${c.slug}/${dash(e.id)}/">${e.id}</a><small>${esc(e.fuente)}</small></td><td>${inline(e.pide || e.titulo)}</td><td class="r">${e.indice ? inline(e.indice) : esCuestion(c) ? 'Respuesta razonada' : inline(e.resultado || '')}</td></tr>`).join('')).join('');
const indiceHtml = `<p>${cats.reduce((a, c) => a + c.ejercicios.length, 0)} ejercicios y cuestiones. El número lleva a la solución paso a paso. Los resultados están difuminados para que no los veas sin querer.</p>
<label class="ver-res"><input type="checkbox"> Mostrar los resultados</label>
<div class="table-wrap indice"><table><thead><tr><th>Ejercicio</th><th>Qué se pide</th><th>Resultado</th></tr></thead><tbody>${filas}</tbody></table></div>`;
{
  const r = render(mapa.intro, { base: '', extra: { categorias: catsHtml, indice: indiceHtml } });
  const f = escribir('', page({ title: esc(mapa.titulo), eyebrow: mapa.eyebrow, desc: mapa.desc, body: r.html, toc: r.heads, depth: 2, current: '',
    crumbs: [[TEMA, null]], pager: pagerHtml(null, { href: `${cats[0].slug}/`, txt: cats[0].nombre }) }));
  console.log(path.relative(process.cwd(), f));
}

// ---------------------------------------------------------------- categorías y soluciones
let total = 0;
cats.forEach((c, ci) => {
  const cuest = esCuestion(c), base = '../';
  const r = render(c.intro, { base });
  const toc = r.heads.slice();
  const tarjeta = e => {
    const fig = e.figura ? figura(e.figura, '') : '';
    const acc = cuest
      ? `<div class="acc"><a class="btn primary" href="${dash(e.id)}/">Ver la respuesta razonada →</a></div>`
      : `<div class="acc"><details><summary>Ver solo el resultado</summary><p>${inline(e.resultado)}</p></details><a class="btn primary" href="${dash(e.id)}/">Solución paso a paso →</a></div>`;
    return `<article class="prop" id="e-${dash(e.id)}"><div class="cab"><span class="num">${e.id}</span>${e.nuevo || /^Selectividad/.test(e.fuente) ? '' : `<span class="src">${esc(e.fuente)}</span>`}${tagHtml(e)}${e.widget ? '<span class="tag sim">Con simulación</span>' : ''}</div>
<h3>${esc(e.titulo)}</h3><div class="enun">${enlazar(marked.parse(e.enunciado), base)}</div>${fig}${acc}</article>`;
  };
  const delPdf = c.ejercicios.filter(e => !e.nuevo && !/^Selectividad/.test(e.fuente));
  const mas = c.ejercicios.filter(e => e.nuevo || /^Selectividad/.test(e.fuente));
  const hProp = cuest ? 'Cuestiones propuestas' : 'Ejercicios propuestos', idProp = 'propuestos';
  let body = r.html + `
<h2 id="${idProp}">${hProp}</h2>
<div class="metodo"><strong>Cómo practicar</strong><ol><li>Lee el enunciado y resuélvelo en la libreta${cuest ? ': respuesta corta, razón física con su fórmula y un ejemplo' : ', con el diagrama de fuerzas y las unidades'}.</li><li>${cuest ? 'Compara con la respuesta razonada.' : 'Comprueba el número con «Ver solo el resultado».'}</li><li>${cuest ? 'Si algo no cuadra, vuelve a la idea clave.' : 'Abre la solución paso a paso para revisar el planteamiento, los signos y el porqué de cada fórmula. Si tiene simulación, cambia los datos y mira qué pasa.'}</li></ol></div>
<p>${cuest ? 'Cuestiones de los apuntes:' : 'Ejercicios de los apuntes de clase:'}</p>
<div class="props">${delPdf.map(tarjeta).join('\n')}</div>`;
  toc.push({ id: idProp, txt: hProp, sep: true });
  delPdf.forEach(e => toc.push({ id: `e-${dash(e.id)}`, txt: `${e.id} · ${e.fuente}` }));
  if (mas.length) {
    const sel = mas.some(e => /^Selectividad/.test(e.fuente));
    body += `
<h2 id="practicar-mas">Para practicar más</h2>
<p>${sel ? 'Los cuatro ejercicios de Selectividad de la hoja de planos inclinados y ejercicios nuevos' : 'Ejercicios nuevos'} del mismo tipo, con la solución completa.</p>
<div class="props">${mas.map(tarjeta).join('\n')}</div>`;
    toc.push({ id: 'practicar-mas', txt: 'Para practicar más', sep: true });
    mas.forEach(e => toc.push({ id: `e-${dash(e.id)}`, txt: `${e.id} · ${e.fuente}` }));
  }
  const prevC = ci === 0 ? { href: '../', txt: 'Mapa del tema' } : { href: `../${cats[ci - 1].slug}/`, txt: cats[ci - 1].nombre };
  const nextC = cats[ci + 1] ? { href: `../${cats[ci + 1].slug}/`, txt: cats[ci + 1].nombre } : null;
  escribir(c.slug, page({ title: esc(c.titulo), eyebrow: c.eyebrow, desc: c.desc, body, toc, depth: 3, current: c.slug,
    crumbs: [[TEMA, '../'], [c.corto, null]], pager: pagerHtml(prevC, nextC) }));
  total++;

  // soluciones
  c.ejercicios.forEach((e, k) => {
    const sb = '../../';
    const s = render(e.solucion, { base: sb });
    const fig = e.figura ? figura(e.figura, 'Figura del enunciado') : '';
    let body = `<div class="enun-box" id="enunciado"><div class="lbl">Enunciado</div>${enlazar(marked.parse(e.enunciado), sb)}</div>${fig}`;
    if (!cuest && e.resultado) body += `<div class="res-box" id="resultado"><div class="lbl">Resultado</div><p>${inline(e.resultado)}</p></div>`;
    const saltos = [];
    body += `\n<h2 id="solucion">${cuest ? 'Respuesta razonada' : 'Solución paso a paso'}</h2>\n${s.html}`;
    if (e.widget) {
      body += `\n<h2 id="simulacion">Simulación</h2>\n${e.simulacion ? marked.parse(e.simulacion) : ''}\n${widgetDiv(e)}`;
      saltos.push(['simulacion', 'Ir a la simulación']);
    }
    const top = saltos.length ? `<nav class="saltos" aria-label="Saltar a">${saltos.map(([id, t]) => `<a href="#${id}">${t} ↓</a>`).join('')}<a href="../#e-${dash(e.id)}">Volver a la lista</a></nav>` : `<nav class="saltos" aria-label="Saltar a"><a href="../#e-${dash(e.id)}">Volver a la lista</a></nav>`;
    body = top + body;
    const toc = [{ id: 'enunciado', txt: 'Enunciado' }].concat(!cuest && e.resultado ? [{ id: 'resultado', txt: 'Resultado' }] : [], [{ id: 'solucion', txt: cuest ? 'Respuesta' : 'Solución' }], e.widget ? [{ id: 'simulacion', txt: 'Simulación' }] : []);
    const prev = c.ejercicios[k - 1], next = c.ejercicios[k + 1];
    const pg = pagerHtml(prev ? { href: `../${dash(prev.id)}/`, txt: `${prev.id} · ${prev.fuente}` } : null, next ? { href: `../${dash(next.id)}/`, txt: `${next.id} · ${next.fuente}` } : null, { href: `../#e-${dash(e.id)}`, txt: 'Todos los ejercicios' });
    escribir(path.join(c.slug, dash(e.id)), page({
      title: `${e.id} · ${esc(e.titulo)}`, eyebrow: `${cuest ? 'Respuesta' : 'Solución'} · ${e.fuente} · Categoría ${ci + 1}`, desc: '', body, toc, depth: 4, current: c.slug,
      crumbs: [[TEMA, '../../'], [c.corto, '../'], [e.id, null]], widgets: e.widget ? [e.widgetNombre] : [], pager: pg,
    }));
    total++;
  });
});
console.log(`${total} páginas de categorías y soluciones`);
