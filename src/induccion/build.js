// Genera las páginas de «Demostración por inducción» (Matemáticas · Tema 1):
//   ../../temas/induccion/index.html                  mapa: la idea (con el dominó), la plantilla, los patrones, errores e índice
//   ../../temas/induccion/<apartado>/index.html       idea clave y ejemplos resueltos de cada patrón + enlace a sus ejercicios
//   ../../temas/induccion/ejercicios/index.html       los ejercicios del tema, por patrón, con su progreso
//   ../../temas/induccion/ejercicios/<id>/index.html  cada ejercicio: tabla de primeros casos, pistas de una en una y solución
// Fuentes: contenido/*.md (formato en el README). Widgets: assets/induccion/induccion.js.
// Uso: cd src && npm install && node induccion/build.js
const fs = require('fs'), path = require('path');
const { marked } = require('marked');
const { icono } = require('../iconos.js');
const CSS_COMUN = require('../comun/estilos.js');
const { EXPLORAR } = require('../../assets/induccion/induccion.js');

const HERE = __dirname;
const OUT = path.join(HERE, '../../temas/induccion');
const TEMA = 'Demostración por inducción';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const slugId = id => id.toLowerCase().replace('·', '-');   // D16·9 -> d16-9

// ---------------------------------------------------------------- lectura de contenido/*.md
// cabecera entre --- · markdown de la teoría · un bloque por ejercicio:
// === D16·9 | Diapositiva 16, ejercicio 9 | Título
// caso: k = 1 · pide: …
// --- enunciado / --- pista <título> (varias, en orden) / --- solucion
function leer(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const m = txt.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = {};
  for (const l of m[1].split('\n')) { const i = l.indexOf(':'); meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
  const [intro, ...bloques] = m[2].split(/^=== /m);
  const ejercicios = bloques.map(b => {
    const [head, ...rest] = b.split('\n');
    const [id, fuente, titulo] = head.split('|').map(s => s.trim());
    const e = { id, slug: slugId(id), fuente, titulo, pistas: [] };
    const partes = rest.join('\n').split(/^--- (\w+)(?: (.*))?\n/m);
    for (const l of partes[0].trim().split('\n').filter(Boolean)) { const i = l.indexOf(':'); e[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
    for (let i = 1; i < partes.length; i += 3) {
      const tipo = partes[i], titulo = partes[i + 1], cuerpo = partes[i + 2].trim();
      if (tipo === 'pista') e.pistas.push({ titulo, cuerpo }); else e[tipo] = cuerpo;
    }
    if (!e.enunciado || !e.solucion || !e.pistas.length) throw new Error(`${id}: falta enunciado, solución o pistas`);
    if (!EXPLORAR[e.slug]) throw new Error(`${id}: falta su tabla en assets/induccion/induccion.js (EXPLORAR['${e.slug}'])`);
    return e;
  });
  ejercicios.forEach((e, i) => { e.nivel = +e.nivel || 2; e.orden = i; e.nuevo = e.fuente === 'Nuevo'; });
  ejercicios.sort((a, b) => a.nivel - b.nivel || a.orden - b.orden);   // de menos a más
  return Object.assign(meta, { intro: intro.trim(), ejercicios });
}
const ficheros = fs.readdirSync(path.join(HERE, 'contenido')).filter(f => f.endsWith('.md')).sort();
const mapa = leer(path.join(HERE, 'contenido', ficheros[0]));
const cats = ficheros.slice(1).map(f => leer(path.join(HERE, 'contenido', f)));
const porId = {};
cats.forEach((c, i) => c.ejercicios.forEach(e => { e.cat = c; e.catN = i + 1; porId[e.id] = e; }));
const todos = cats.flatMap(c => c.ejercicios);
const nNuevos = todos.filter(e => e.nuevo).length, nDiapo = todos.length - nNuevos;
const NIVEL = { 1: 'Nivel 1 · para empezar', 2: 'Nivel 2 · medio', 3: 'Nivel 3 · tipo examen' };
const tagNivel = e => `<span class="tag nivel n${e.nivel}">${NIVEL[e.nivel]}</span>`;
const resumen = `${todos.length} ejercicios: ${nNuevos} nuevos para empezar y ${nDiapo} de las diapositivas del Tema 1`;
const Resumen = resumen[0].toUpperCase() + resumen.slice(1);

// ---------------------------------------------------------------- Markdown -> HTML
const slugify = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
// «D16·9» en cualquier texto enlaza con la página del ejercicio; base = ruta hasta temas/induccion/
const enlazar = (html, base, propio) => html.replace(/\bD\d{2}·\d{1,2}\b/g, id => porId[id] && id !== propio ? `<a href="${base}ejercicios/${porId[id].slug}/">${id}</a>` : id);
function render(md, { base = '', extra = {}, propio = '' } = {}) {
  const heads = [];
  let html = marked.parse(md, { gfm: true });
  for (const k in extra) html = html.replace(`<p>[[${k}]]</p>`, extra[k]);
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, t) => {
    const txt = t.replace(/<[^>]+>/g, '');
    let id = slugify(txt), k = 2;
    while (heads.some(h => h.id === id)) id = slugify(txt) + '-' + k++;
    heads.push({ id, txt });
    return `<h2 id="${id}">${t}</h2>`;
  });
  // párrafo que empieza en negrita: eslabón de una cadena si la negrita lleva = ≥ ≤ < > (el resto, su justificación)
  html = html.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner) => {
    const t = inner.trim(), mm = t.match(/^<strong>([\s\S]*?)<\/strong>([\s\S]*)$/);
    if (!mm) return m;
    const [, fuerte, resto] = mm;
    if (/[=≥≤⟹]|&lt;|&gt;/.test(fuerte) && !/<strong>/.test(resto)) {
      const r = resto.trim();
      return `<p class="eq"><strong>${fuerte}</strong>${r ? ` <span class="just">${r}</span>` : ''}</p>`;
    }
    if (!resto.trim() || resto.trim() === '.') return `<p class="sub">${inner}</p>`;
    return m;
  });
  html = html.replace(/<blockquote>/g, '<blockquote class="why">');
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  html = enlazar(html, base, propio);
  return { html, heads };
}
const inline = md => marked.parseInline(md);

// ---------------------------------------------------------------- estilos propios (además de los comunes)
const CSS = CSS_COMUN + `
.doc p.eq{margin:6px 0;display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px}
.doc p.eq+p.eq{margin-top:-1px;border-top-left-radius:0;border-top-right-radius:0}
.doc p.eq:has(+p.eq){margin-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0}
.doc p.eq .just{font-size:14px;color:var(--ink-2)}
.doc ol[start]{margin-top:12px}
.ficha{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:14.5px;color:var(--ink-2);margin:12px 0 0}
.ficha strong{color:var(--ink)}
/* tabla de primeros casos */
.explorar{margin:10px 0 6px}
.explorar-tabla{margin-top:10px}
.explorar td.num{font-family:var(--f-mono);font-variant-numeric:tabular-nums;white-space:nowrap}
.explorar tr.base td{background:color-mix(in srgb,var(--c-n) 12%,transparent)}
.explorar tr.antes td{color:var(--ink-2)}
.explorar .si{color:var(--c-n);font-weight:700}
.explorar .no{color:var(--c-fr);font-weight:700}
.explorar small{color:var(--ink-2)}
.tag-base{font:600 10.5px var(--f-mono);letter-spacing:.04em;text-transform:uppercase;color:var(--c-n);border:1px solid currentColor;border-radius:999px;padding:0 6px;margin-left:4px;white-space:nowrap}
.explorar-msg{font-size:14.5px;color:var(--ink-2)}
/* pistas */
.guia{display:grid;gap:10px;margin:14px 0}
.guia details{background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:0 14px}
.guia summary{cursor:pointer;list-style:none;min-height:46px;display:flex;align-items:center;gap:10px;font:700 15px var(--f-body)}
.guia summary::-webkit-details-marker{display:none}
.guia summary::before{content:"▸";font-size:12px;color:var(--ink-2)}
.guia details[open] summary::before{content:"▾"}
.guia .n{font:700 12px var(--f-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--c-v);border:1px solid currentColor;border-radius:999px;padding:1px 8px}
.guia details.pista[open]{border-color:var(--c-v)}
.guia.js details.pista:not([open]):not(.usada) .t{display:none}
.guia.js details.pista:not([open]):not(.usada) summary::after{content:"¿Atascada? Ábrela";font:400 14px var(--f-body);color:var(--ink-2)}
.guia .cuerpo{padding:0 0 12px}
.guia .cuerpo p{margin:6px 0}
.guia details.sol summary .n{color:var(--c-p)}
.guia details.sol[open]{border-color:var(--c-p)}
.guia .estado{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:14.5px;color:var(--ink-2);padding:4px 2px}
.guia .estado .txt{flex:1 1 200px}
.guia .estado .reset{background:none;border:0;color:var(--ink-2);text-decoration:underline;font:inherit;cursor:pointer;padding:0}
.tag.hecho{color:var(--c-n)}
.tag.nivel.n1{color:var(--c-n)} .tag.nivel.n2{color:var(--c-v)} .tag.nivel.n3{color:var(--c-fr)}
.ir-ej .lista .tag{margin-left:4px}
.tag.empezado{color:var(--c-v)}
/* dominó */
.domino{background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:12px 14px;margin:16px 0}
.domino-esc,.domino-acc{display:flex;flex-wrap:wrap;gap:8px}
.domino svg{display:block;width:100%;height:auto;margin:10px 0 0;font-family:var(--f-body)}
.domino .suelo{stroke:var(--plane-edge);stroke-width:2}
.domino .ficha rect{fill:var(--sheet);stroke:var(--ink);stroke-width:2}
.domino .ficha circle{fill:var(--ink)}
.domino .ficha line{stroke:var(--ink);stroke-width:1.2}
.domino .ficha text{font-size:14px;fill:var(--ink-2)}
.domino .ficha .mal{display:none;font-size:18px;font-weight:700;fill:var(--c-fr)}
.domino .ficha.falsa rect{stroke:var(--c-fr);fill:color-mix(in srgb,var(--c-fr) 12%,var(--sheet))}
.domino .ficha.falsa .mal{display:inline}
.domino .ficha.fuera{opacity:.45}
.domino .ficha.cae rect{stroke:var(--c-p);fill:color-mix(in srgb,var(--c-p) 14%,var(--sheet))}
.domino .gira{transition:transform .32s cubic-bezier(.55,0,.9,.5)}
@media (prefers-reduced-motion: reduce){.domino .gira{transition:none}}
.domino .mano line{stroke:var(--c-v);stroke-width:3;stroke-linecap:round}
.domino .mano polygon{fill:var(--c-v)}
.domino .nadie{font-size:13px;fill:var(--c-fr);font-weight:700}
.domino-txt{min-height:3em;margin:8px 0 10px;font-size:15px}
`;

// ---------------------------------------------------------------- plantilla de página
function page({ title, eyebrow, desc, body, toc, depth, current, crumbs, pager, ico = '' }) {
  const up = '../'.repeat(depth), topic = '../'.repeat(depth - 2);
  const chips = `<a href="${topic}"${current === '' ? ' aria-current="page"' : ''}>${icono('mapa')}Mapa del tema</a><a class="ej" href="${topic}ejercicios/"${current === 'ejercicios' ? ' aria-current="page"' : ''}>${icono('ejercicios')}Ejercicios</a>` +
    cats.map((c, i) => `<a href="${topic}${c.slug}/"${current === c.slug ? ' aria-current="page"' : ''}>${icono(c.icono)}${i + 1} · ${c.corto}</a>`).join('');
  const tocHtml = toc && toc.length ? `<aside class="toc" aria-label="En esta página"><h2>En esta página</h2><ol>${toc.map(h => `<li${h.sep ? ' class="sep"' : ''}><a href="#${h.id}">${h.txt}</a></li>`).join('')}</ol></aside>` : '';
  const js = /data-explorar=|class="guia|data-domino|data-estado=/.test(body);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title.replace(/<[^>]+>/g, ''))} · BI Ciencias</title>
<meta name="description" content="${esc(desc || TEMA)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=JetBrains+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="${up}assets/base.css">
<style>${CSS}</style>
</head>
<body>
<div class="page">
  <nav class="crumbs" aria-label="Ruta"><a href="${up}">BI Ciencias</a><span aria-hidden="true">›</span><a href="${up}#matematicas">Matemáticas</a>${crumbs.map(([t, h]) => `<span aria-hidden="true">›</span>${h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`}`).join('')}</nav>
  <header class="top${ico ? ' con-ico' : ''}">${ico ? `<div class="ico-top grid-paper">${icono(ico)}</div>` : ''}<div class="txt"><div class="eyebrow">${esc(eyebrow)}</div><h1>${title}</h1>${desc ? `<p class="lead">${esc(desc)}</p>` : ''}</div></header>
  <nav class="cats" aria-label="Apartados del tema">${chips}</nav>
  <div class="layout">
    <main class="doc">
${body}
    ${pager || ''}
    </main>
    ${tocHtml}
  </div>
  <footer>Material de estudio. Las fórmulas están escritas en texto, así que las páginas se leen también sin conexión; las tablas, las pistas y el dominó necesitan abrir la página en el navegador.</footer>
</div>
${js ? `<script src="${up}assets/induccion/induccion.js" defer></script>\n` : ''}</body>
</html>
`;
}
const pagerHtml = (prev, next, mid) => `<nav class="pager" aria-label="Anterior y siguiente">${prev ? `<a href="${prev.href}"><small>Anterior</small>${prev.txt}</a>` : '<span></span>'}${mid ? `<a class="mid" href="${mid.href}">${mid.txt}</a>` : ''}${next ? `<a href="${next.href}" style="text-align:right"><small>Siguiente</small>${next.txt}</a>` : '<span></span>'}</nav>`;
const escribir = (rel, html) => { const f = path.join(OUT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); return f; };
let total = 0;

// ---------------------------------------------------------------- mapa del tema
{
  const apartados = `<div class="grid-cats"><a class="card" href="ejercicios/"><span class="n grid-paper">${icono('ejercicios')}</span><span><h3>Ejercicios</h3><p>${Resumen}, de menos a más y con pistas paso a paso.</p></span></a>${cats.map((c, i) =>
    `<a class="card" href="${c.slug}/"><span class="n grid-paper">${icono(c.icono)}</span><span><h3>${i + 1} · ${c.nombre}</h3><p>${c.desc}</p></span></a>`).join('')}</div>`;
  const domino = `<div class="domino" data-domino><p><strong>El dominó.</strong> Abre esta página en el navegador para ver caer las fichas en cuatro situaciones: con caso base y paso, sin caso base, con el paso roto y empezando en 4.</p></div>`;
  const filas = cats.map((c, i) => `<tr class="grupo"><th colspan="4"><a href="${c.slug}/">${i + 1} · ${esc(c.nombre)}</a></th></tr>` + c.ejercicios.map(e =>
    `<tr><td><a href="ejercicios/${e.slug}/">${e.id}</a></td><td>${e.nivel}</td><td>${inline(e.pide || e.titulo)}</td><td>${esc(e.caso || '')}</td></tr>`).join('')).join('');
  const indice = `<p>${Resumen}. Los nuevos (A, B y C, uno por patrón) son más sencillos y sirven para coger soltura; «D16·4» significa diapositiva 16, ejercicio 4. Nivel 1: para empezar; 2: medio; 3: tipo examen. Cada número lleva a su página con pistas.</p>
<div class="table-wrap indice"><table><thead><tr><th>Ejercicio</th><th>Nivel</th><th>Qué se pide</th><th>Caso base</th></tr></thead><tbody>${filas}</tbody></table></div>`;
  const r = render(mapa.intro, { base: '', extra: { apartados, domino, indice } });
  escribir('', page({ title: esc(mapa.titulo), eyebrow: mapa.eyebrow, desc: mapa.desc, body: r.html, toc: r.heads, depth: 2, current: '', ico: 'mapa',
    crumbs: [[TEMA, null]], pager: pagerHtml(null, { href: `${cats[0].slug}/`, txt: cats[0].nombre }) }));
  total++;
}

// ---------------------------------------------------------------- apartados
cats.forEach((c, ci) => {
  const base = '../', r = render(c.intro, { base });
  const toc = r.heads.slice();
  let body = r.html;
  body += `\n<h2 id="practicar">Ejercicios para practicar</h2>
<div class="ir-ej"><p><strong>${c.ejercicios.length} ejercicios</strong> de este patrón, de menos a más: primero los nuevos para coger soltura y después los de las diapositivas del Tema 1. Cada uno tiene una tabla con los primeros casos, pistas que se abren de una en una y la solución completa.</p>
<ul class="lista">${c.ejercicios.map(e => `<li><a href="../ejercicios/${e.slug}/">${e.id}</a> ${esc(e.titulo)} ${tagNivel(e)}</li>`).join('')}</ul>
<a class="btn primary" href="../ejercicios/#${c.slug}">Ejercicios de este apartado →</a></div>`;
  toc.push({ id: 'practicar', txt: 'Para practicar', sep: true });
  const prevC = ci === 0 ? { href: '../', txt: 'Mapa del tema' } : { href: `../${cats[ci - 1].slug}/`, txt: cats[ci - 1].nombre };
  const nextC = cats[ci + 1] ? { href: `../${cats[ci + 1].slug}/`, txt: cats[ci + 1].nombre } : { href: '../ejercicios/', txt: 'Ejercicios del tema' };
  escribir(c.slug, page({ title: esc(c.titulo), eyebrow: c.eyebrow, desc: c.desc, body, toc, depth: 3, current: c.slug,
    crumbs: [[TEMA, '../'], [c.corto, null]], pager: pagerHtml(prevC, nextC), ico: c.icono }));
  total++;
});

// ---------------------------------------------------------------- sección de ejercicios
{
  const base = '../';
  const tarjeta = e => `<article class="prop" id="e-${e.slug}"><div class="cab"><span class="num">${e.id}</span><span class="src">${esc(e.nuevo ? 'Ejercicio nuevo' : e.fuente)}</span>${tagNivel(e)}<span class="tag" data-estado="${e.slug}" hidden></span></div>
<h3>${esc(e.titulo)}</h3><div class="enun">${enlazar(marked.parse(e.enunciado), base, e.id)}</div><div class="acc"><span class="ficha"><span>Caso base: <strong>${esc(e.caso)}</strong></span><span>${e.pistas.length} pistas</span></span><a class="btn primary" href="${e.slug}/">Resolver con pistas →</a></div></article>`;
  let body = `<div class="metodo"><strong>Cómo practicar</strong><ol><li>Dentro de cada patrón, los ejercicios van de menos a más: nivel 1 para empezar (nuevos), nivel 2 medio y nivel 3 tipo examen. Si uno te sale sin pistas, pasa al siguiente.</li><li>Lee el enunciado y reconoce el patrón: suma, divisibilidad o desigualdad.</li><li>En la página del ejercicio, calcula los primeros casos para ver desde dónde empieza.</li><li>Escribe la demostración en la libreta con la plantilla. Si te atascas, abre <strong>solo la siguiente pista</strong> y vuelve a intentarlo.</li><li>Compara con la solución completa, sobre todo la conclusión, y márcalo como resuelto.</li></ol><p style="margin:6px 0 0">El progreso se guarda en este navegador. Si te atascas mucho, repasa la teoría del apartado: el enlace está junto a cada título.</p></div>
<nav class="filtro" aria-label="Ir a un patrón">${cats.map((c, i) => `<a href="#${c.slug}">${icono(c.icono)}${i + 1} · ${esc(c.corto)} (${c.ejercicios.length})</a>`).join('')}</nav>`;
  const toc = [];
  cats.forEach((c, i) => {
    body += `\n<h2 id="${c.slug}" class="grupo-ej"><span>${icono(c.icono)}${i + 1} · ${esc(c.nombre)}</span><a href="../${c.slug}/">Repasar la teoría →</a></h2>\n<div class="props">${c.ejercicios.map(tarjeta).join('\n')}</div>`;
    toc.push({ id: c.slug, txt: `${i + 1} · ${c.corto} (${c.ejercicios.length})` });
  });
  escribir('ejercicios', page({ title: 'Ejercicios', eyebrow: TEMA, desc: `${Resumen}, por patrón y de menos a más. Cada uno con su tabla de primeros casos, pistas que se abren de una en una y la solución completa.`,
    body, toc, depth: 3, current: 'ejercicios', crumbs: [[TEMA, '../'], ['Ejercicios', null]], ico: 'ejercicios',
    pager: pagerHtml({ href: '../', txt: 'Mapa del tema' }, { href: `../${cats[0].slug}/`, txt: cats[0].nombre }) }));
  total++;
}

// ---------------------------------------------------------------- una página por ejercicio
todos.forEach((e, k) => {
  const c = e.cat, sb = '../../';
  const md = s => render(s, { base: sb, propio: e.id }).html;
  const pistas = e.pistas.map((p, i) => `<details class="pista"><summary><span class="n">Pista ${i + 1}</span><span class="t">${inline(p.titulo)}</span></summary><div class="cuerpo">${md(p.cuerpo)}</div></details>`).join('\n');
  const body = `<nav class="saltos" aria-label="Saltar a"><a href="../#e-${e.slug}">Volver a los ejercicios</a><a href="../../${c.slug}/">Teoría: ${esc(c.corto)}</a><a href="../../#la-plantilla-y-la-notacion-de-clase">La plantilla</a></nav>
<div class="enun-box" id="enunciado"><div class="lbl">Enunciado · ${esc(e.nuevo ? 'Ejercicio nuevo' : e.fuente)}</div>${md(e.enunciado)}</div>
<p class="ficha"><span>Patrón: <a href="../../${c.slug}/"><strong>${esc(c.nombre)}</strong></a></span><span>Caso base: <strong>${esc(e.caso)}</strong></span>${tagNivel(e)}</p>
<h2 id="explorar">0 · Explora los primeros casos</h2>
<p>Antes de demostrar, comprueba que te crees el enunciado y mira desde qué número se cumple.</p>
<div class="explorar" data-explorar="${e.slug}"><p><em>La tabla se calcula al abrir la página en el navegador.</em></p></div>
<h2 id="resolver">Resuélvelo con pistas</h2>
<p>Escribe la demostración en la libreta con las cinco partes de la plantilla: enunciado, caso base, hipótesis (k = n), paso (k = n + 1) y conclusión. Si te atascas, abre la siguiente pista: cada una te deja un poco más cerca, pero no lo resuelve todo.</p>
<section class="guia" data-ej="${e.slug}" aria-label="Pistas y solución">
${pistas}
<details class="sol" id="solucion"><summary><span class="n">Solución completa</span><span class="t">Las cinco partes</span></summary><div class="cuerpo">${md(e.solucion)}</div></details>
<div class="estado" hidden><span class="txt"></span><button type="button" class="btn hecho">Lo he resuelto</button><button type="button" class="reset">Empezar de cero</button></div>
</section>`;
  const prev = todos[k - 1], next = todos[k + 1];
  const pg = pagerHtml(prev ? { href: `../${prev.slug}/`, txt: `${prev.id} · ${esc(prev.titulo)}` } : null, next ? { href: `../${next.slug}/`, txt: `${next.id} · ${esc(next.titulo)}` } : null, { href: `../#e-${e.slug}`, txt: 'Todos los ejercicios' });
  escribir(path.join('ejercicios', e.slug), page({
    title: `${e.id} · ${esc(e.titulo)}`, eyebrow: `Ejercicio guiado · ${c.nombre}`, desc: '', body, depth: 4, current: 'ejercicios',
    toc: [{ id: 'enunciado', txt: 'Enunciado' }, { id: 'explorar', txt: 'Primeros casos' }, { id: 'resolver', txt: 'Pistas y solución' }],
    crumbs: [[TEMA, '../../'], ['Ejercicios', '../'], [e.id, null]], pager: pg,
  }));
  total++;
});

// ---------------------------------------------------------------- bloque del tema en la portada (entre <!-- tema:induccion --> y <!-- /tema:induccion -->)
{
  const f = path.join(HERE, '../../index.html');
  const html = fs.readFileSync(f, 'utf8');
  const item = (href, ico, badge, h3, p) => `      <a class="item card" href="${href}">
        <div class="thumb grid-paper" aria-hidden="true">${icono(ico)}</div>
        <div><span class="badge${badge.cls ? ' ' + badge.cls : ''}">${badge.txt}</span><h3>${h3}</h3><p>${p}</p></div>
      </a>`;
  const bloque = `<!-- tema:induccion -->
  <section class="topic" aria-labelledby="t-induccion">
    <div class="topic-head"><h3 id="t-induccion">${TEMA}</h3><p>La idea del dominó, la plantilla, los tres patrones con ejemplos resueltos y los ejercicios del Tema 1 con pistas paso a paso</p></div>
    <div class="items">
${[item('temas/induccion/', 'domino', { txt: 'Mapa del tema', cls: 'tema' }, 'La idea y la plantilla', 'El efecto dominó, la plantilla con la notación de clase, los patrones en una tabla, errores típicos e índice de ejercicios.'),
   item('temas/induccion/ejercicios/', 'ejercicios', { txt: 'Para practicar', cls: 'tema' }, 'Ejercicios con pistas', `${Resumen}, de menos a más: primeros casos, pistas que se abren de una en una y solución completa.`),
   ...cats.map((c, i) => item(`temas/induccion/${c.slug}/`, c.icono, { txt: `Apartado ${i + 1}` }, c.nombre, c.desc))].join('\n')}
    </div>
  </section>
  <!-- /tema:induccion -->`;
  const i = html.indexOf('<!-- tema:induccion -->'), j = html.indexOf('<!-- /tema:induccion -->');
  const nuevo = i >= 0 && j >= 0 ? html.slice(0, i) + bloque + html.slice(j + '<!-- /tema:induccion -->'.length)
    : html.replace('<!-- /materia:matematicas -->', `${bloque}\n<!-- /materia:matematicas -->`);
  fs.writeFileSync(f, nuevo);
}
console.log(`${total} páginas: mapa, ${cats.length} apartados, la sección de ejercicios y ${todos.length} ejercicios guiados (${nNuevos} nuevos)`);
