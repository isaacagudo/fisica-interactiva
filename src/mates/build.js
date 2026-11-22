// Genera las secciones de Matemáticas · Tema 1 (todas menos inducción, que tiene su propio build):
//   ../../temas/<sección>/index.html                    mapa: idea, método, errores, índice de ejercicios
//   ../../temas/<sección>/<apartado>/index.html         teoría con ejemplos resueltos + enlace a sus ejercicios
//   ../../temas/<sección>/ejercicios/index.html         ejercicios por apartado y de menos a más
//   ../../temas/<sección>/ejercicios/<id>/index.html    cada ejercicio: widget (si lo tiene), pistas de una en una, resultado y solución
// y el bloque «Tema 1» de la portada (entre <!-- tema:t1-mates --> y <!-- /tema:t1-mates -->).
// Fuentes: src/mates/<sección>/contenido/*.md (formato en el README). Widgets: assets/mates/mates.js.
// Uso: cd src && node mates/build.js [sección …]
const fs = require('fs'), path = require('path');
const { marked } = require('marked');
const { icono } = require('../iconos.js');
const CSS = require('../comun/estilos.js') + require('../comun/estilos-mates.js');
const TEMA1 = require('../comun/tema1.js');
const { mates, errores } = require('../comun/mates.js');

const HERE = __dirname, ROOT = path.join(HERE, '../..');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const slugId = id => id.toLowerCase().replace(/·/g, '-').replace(/[^a-z0-9-]/g, '');
const NIVEL = { 1: 'Nivel 1 · para empezar', 2: 'Nivel 2 · medio', 3: 'Nivel 3 · tipo examen' };
const tagNivel = e => `<span class="tag nivel n${e.nivel}">${NIVEL[e.nivel]}</span>`;

// ---------------------------------------------------------------- lectura
function leer(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const m = txt.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: falta la cabecera`);
  const meta = {};
  for (const l of m[1].split('\n')) { const i = l.indexOf(':'); meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
  const [intro, ...bloques] = m[2].split(/^=== /m);
  const ejercicios = bloques.map((b, orden) => {
    const [head, ...rest] = b.split('\n');
    const [id, fuente, titulo] = head.split('|').map(s => s.trim());
    const e = { id, slug: slugId(id), fuente, titulo, pistas: [], orden };
    const partes = rest.join('\n').split(/^--- (\w+)(?: (.*))?\n/m);
    for (const l of partes[0].trim().split('\n').filter(Boolean)) { const i = l.indexOf(':'); e[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
    for (let i = 1; i < partes.length; i += 3) {
      const tipo = partes[i], tt = partes[i + 1], cuerpo = partes[i + 2].trim();
      if (tipo === 'pista') e.pistas.push({ titulo: tt, cuerpo }); else e[tipo] = cuerpo;
    }
    if (!e.enunciado || !e.solucion || !e.pistas.length) throw new Error(`${file} · ${id}: falta enunciado, solución o pistas`);
    e.nivel = +e.nivel || 2; e.nuevo = e.fuente === 'Nuevo';
    return e;
  });
  ejercicios.sort((a, b) => a.nivel - b.nivel || a.orden - b.orden);
  return Object.assign(meta, { intro: intro.trim(), ejercicios });
}
function leerSeccion(slug) {
  const dir = path.join(HERE, slug, 'contenido');
  const fs_ = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
  const mapa = leer(path.join(dir, fs_[0]));
  const cats = fs_.slice(1).map(f => leer(path.join(dir, f)));
  cats.forEach((c, i) => { c.n = i + 1; c.ejercicios.forEach(e => { e.cat = c; }); });
  const todos = cats.flatMap(c => c.ejercicios);
  return { slug, mapa, cats, todos, propias: cats.filter(c => !c.enlace) };
}
const lista = process.argv.slice(2).length ? process.argv.slice(2) : TEMA1.secciones.map(s => s.slug);
const SECC = TEMA1.secciones.filter(s => fs.existsSync(path.join(HERE, s.slug, 'contenido')) && fs.readdirSync(path.join(HERE, s.slug, 'contenido')).some(f => f.endsWith('.md'))).map(s => Object.assign(leerSeccion(s.slug), { num: s.num, corto: s.corto }));

// todos los ejercicios del tema por id, para enlazar «D33·1» desde cualquier página (inducción incluida)
const porId = {};
SECC.forEach(S => S.todos.forEach(e => { porId[e.id] = `temas/${S.slug}/ejercicios/${e.slug}/`; }));
{
  const dir = path.join(HERE, '../induccion/contenido');
  for (const f of fs.readdirSync(dir)) for (const m of fs.readFileSync(path.join(dir, f), 'utf8').matchAll(/^=== (\S+) \|/gm)) porId[m[1]] = porId[m[1]] || `temas/induccion/ejercicios/${slugId(m[1])}/`;
}

// ---------------------------------------------------------------- Markdown -> HTML
const slugify = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const enlazar = (html, up, propio) => html.replace(/\bD\d{1,2}·\d{1,2}\b/g, id => porId[id] && id !== propio ? `<a href="${up}${porId[id]}">${id}</a>` : id);
const widgetHtml = (tipo, cfg = '{}') => {
  try { JSON.parse(cfg); } catch (e) { throw new Error(`widget ${tipo}: configuración JSON mal escrita: ${cfg}`); }
  return `<div class="widget" data-w="${tipo}" data-cfg="${esc(cfg)}"><p class="w-msg"><em>Este simulador se abre al cargar la página en el navegador.</em></p></div>`;
};
function render(md, { up = '', extra = {}, propio = '' } = {}) {
  const heads = [];
  let html = marked.parse(md, { gfm: true });
  for (const k in extra) html = html.replace(`<p>[[${k}]]</p>`, extra[k]);
  html = html.replace(/<p>\[\[widget:(\w+)(?:\|([\s\S]*?))?\]\]<\/p>/g, (_, t, c) => widgetHtml(t, (c || '{}').replace(/&quot;/g, '"').replace(/&amp;/g, '&')));
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, t) => {
    const txt = t.replace(/<[^>]+>/g, '');
    let id = slugify(txt), k = 2;
    while (heads.some(h => h.id === id)) id = slugify(txt) + '-' + k++;
    heads.push({ id, txt });
    return `<h2 id="${id}">${t}</h2>`;
  });
  html = html.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner) => {
    const t = inner.trim(), mm = t.match(/^<strong>([\s\S]*?)<\/strong>([\s\S]*)$/);
    if (!mm) return m;
    const [, fuerte, resto] = mm;
    if (/[=≥≤⟹⟺]|&lt;|&gt;/.test(fuerte) && !/<strong>/.test(resto) && !/[a-záéíóúñ]{4,}/i.test(fuerte.replace(/<[^>]+>/g, ''))) {
      const r = resto.trim();
      return `<p class="eq"><strong>${fuerte}</strong>${r ? ` <span class="just">${r}</span>` : ''}</p>`;
    }
    if (!resto.trim() || resto.trim() === '.') return `<p class="sub">${inner}</p>`;
    return m;
  });
  html = html.replace(/<blockquote>/g, '<blockquote class="why">');
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  return { html: enlazar(html, up, propio), heads };
}
const inline = md => marked.parseInline(md);

// ---------------------------------------------------------------- página
function page(S, { title, h1, eyebrow, desc, body, toc, depth, current, crumbs, pager, ico = '' }) {
  const up = '../'.repeat(depth), base = up + `temas/${S.slug}/`;
  const chips = `<a href="${base}"${current === '' ? ' aria-current="page"' : ''}>${icono('mapa')}Mapa</a><a class="ej" href="${base}ejercicios/"${current === 'ejercicios' ? ' aria-current="page"' : ''}>${icono('ejercicios')}Ejercicios</a>` +
    S.cats.map(c => `<a href="${c.enlace ? up + c.enlace : `${base}${c.slug}/`}"${current === c.slug ? ' aria-current="page"' : ''}>${icono(c.icono)}${c.n} · ${c.corto}</a>`).join('');
  const tocHtml = toc && toc.length ? `<aside class="toc" aria-label="En esta página"><h2>En esta página</h2><ol>${toc.map(h => `<li${h.sep ? ' class="sep"' : ''}><a href="#${h.id}">${h.txt}</a></li>`).join('')}</ol></aside>` : '';
  const js = /class="guia|data-w=|data-estado=/.test(body);
  return mates(`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)} · BI Ciencias</title>
<meta name="description" content="${esc(desc || S.mapa.titulo)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=JetBrains+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="${up}assets/base.css">
<link rel="stylesheet" href="${up}assets/katex/katex.min.css">
<style>${CSS}</style>
</head>
<body>
<div class="page">
  <nav class="crumbs" aria-label="Ruta"><a href="${up}">BI Ciencias</a><span aria-hidden="true">›</span><a href="${up}#matematicas">Matemáticas</a>${crumbs.map(([t, h]) => `<span aria-hidden="true">›</span>${h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`}`).join('')}</nav>
  ${TEMA1.nav(up, S.slug)}
  <header class="top${ico ? ' con-ico' : ''}">${ico ? `<div class="ico-top grid-paper">${icono(ico)}</div>` : ''}<div class="txt"><div class="eyebrow">${esc(eyebrow)}</div><h1>${h1 || esc(title)}</h1>${desc ? `<p class="lead">${esc(desc)}</p>` : ''}</div></header>
  <nav class="cats" aria-label="Apartados de la sección">${chips}</nav>
  <div class="layout">
    <main class="doc">
${body}
    ${pager || ''}
    </main>
    ${tocHtml}
  </div>
  <footer>Material de repaso del ${esc(TEMA1.titulo)}. Abre las páginas en el navegador (ordenador, tableta o móvil): las fórmulas, los simuladores y las pistas necesitan la web, no la vista previa de WhatsApp o de Archivos.</footer>
</div>
${js ? `<script src="${up}assets/mates/mates.js" defer></script>\n` : ''}</body>
</html>
`);
}
const pagerHtml = (prev, next, mid) => `<nav class="pager" aria-label="Anterior y siguiente">${prev ? `<a href="${prev.href}"><small>Anterior</small>${prev.txt}</a>` : '<span></span>'}${mid ? `<a class="mid" href="${mid.href}">${mid.txt}</a>` : ''}${next ? `<a href="${next.href}" style="text-align:right"><small>Siguiente</small>${next.txt}</a>` : '<span></span>'}</nav>`;

// ---------------------------------------------------------------- una sección
let total = 0;
function construir(S) {
  const OUT = path.join(ROOT, 'temas', S.slug);
  const escribir = (rel, html) => { const f = path.join(OUT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); total++; };
  const { mapa, cats, todos } = S;
  const nNuevos = todos.filter(e => e.nuevo).length, Resumen = `${todos.length} ejercicios: ${nNuevos} nuevos para coger soltura y ${todos.length - nNuevos} de las diapositivas`;
  const TIT = mapa.titulo;
  const href = (c, up) => c.enlace ? up + c.enlace : `${up}temas/${S.slug}/${c.slug}/`;

  // mapa
  {
    const up = '../../';
    const apartados = `<div class="grid-cats">${cats.map(c => `<a class="card" href="${href(c, up)}"><span class="n grid-paper">${icono(c.icono)}</span><span><h3>${c.n} · ${c.nombre}</h3><p>${c.desc}</p></span></a>`).join('')}<a class="card" href="ejercicios/"><span class="n grid-paper">${icono('ejercicios')}</span><span><h3>Ejercicios</h3><p>${Resumen}, de menos a más y con pistas paso a paso.</p></span></a></div>`;
    const filas = cats.filter(c => c.ejercicios.length).map(c => `<tr class="grupo"><th colspan="3"><a href="${c.slug}/">${c.n} · ${esc(c.nombre)}</a></th></tr>` + c.ejercicios.map(e =>
      `<tr><td><a href="ejercicios/${e.slug}/">${e.id}</a></td><td>${e.nivel}</td><td>${inline(e.pide || e.titulo)}</td></tr>`).join('')).join('');
    const indice = `<p>${Resumen}. Los nuevos llevan una letra (${[...new Set(todos.filter(e => e.nuevo).map(e => e.id.replace(/\d+$/, '')))].join(', ')}); los de las diapositivas, «D33·1» = diapositiva 33, ejercicio 1. Nivel 1: para empezar; 2: medio; 3: tipo examen.</p>
<div class="table-wrap indice"><table><thead><tr><th>Ejercicio</th><th>Nivel</th><th>Qué se pide</th></tr></thead><tbody>${filas}</tbody></table></div>`;
    const r = render(mapa.intro, { up, extra: { apartados, indice } });
    const primera = cats.find(c => !c.enlace);
    escribir('', page(S, { title: TIT, eyebrow: mapa.eyebrow, desc: mapa.desc, body: r.html, toc: r.heads, depth: 2, current: '', ico: mapa.icono,
      crumbs: [[`${S.num} · ${S.corto}`, null]], pager: pagerHtml(null, { href: `${primera.slug}/`, txt: primera.nombre }) }));
  }
  // apartados
  const propias = cats.filter(c => !c.enlace);
  propias.forEach((c, i) => {
    const up = '../../../', r = render(c.intro, { up });
    const toc = r.heads.slice();
    let body = r.html;
    if (c.ejercicios.length) {
      body += `\n<h2 id="practicar">Ejercicios para practicar</h2>
<div class="ir-ej"><p><strong>${c.ejercicios.length} ejercicios</strong> de este apartado, de menos a más: primero los nuevos para coger soltura y después los de las diapositivas.</p>
<ul class="lista">${c.ejercicios.map(e => `<li><a href="../ejercicios/${e.slug}/">${e.id}</a> ${esc(e.titulo)} ${tagNivel(e)}</li>`).join('')}</ul>
<a class="btn primary" href="../ejercicios/#${c.slug}">Ejercicios de este apartado →</a></div>`;
      toc.push({ id: 'practicar', txt: 'Para practicar', sep: true });
    }
    const prev = i === 0 ? { href: '../', txt: 'Mapa de la sección' } : { href: `../${propias[i - 1].slug}/`, txt: propias[i - 1].nombre };
    const next = propias[i + 1] ? { href: `../${propias[i + 1].slug}/`, txt: propias[i + 1].nombre } : { href: '../ejercicios/', txt: 'Ejercicios' };
    escribir(c.slug, page(S, { title: `${c.titulo} · ${S.corto}`, h1: esc(c.titulo), eyebrow: c.eyebrow, desc: c.desc, body, toc, depth: 3, current: c.slug,
      crumbs: [[`${S.num} · ${S.corto}`, '../'], [c.corto, null]], pager: pagerHtml(prev, next), ico: c.icono }));
  });
  // ejercicios
  {
    const tarjeta = e => `<article class="prop" id="e-${e.slug}"><div class="cab"><span class="num">${e.id}</span><span class="src">${esc(e.nuevo ? 'Ejercicio nuevo' : e.fuente)}</span>${tagNivel(e)}<span class="tag" data-estado="${S.slug}:${e.slug}" hidden></span></div>
<h3>${esc(e.titulo)}</h3><div class="enun">${render(e.enunciado, { up: '../../../', propio: e.id }).html}</div><div class="acc"><span class="ficha"><span>${e.pistas.length} pistas</span></span><a class="btn primary" href="${e.slug}/">Resolver con pistas →</a></div></article>`;
    let body = `<div class="metodo"><strong>Cómo practicar</strong><ol><li>Dentro de cada apartado, los ejercicios van de menos a más: nivel 1 para empezar, nivel 2 medio y nivel 3 tipo examen. Si uno te sale sin pistas, pasa al siguiente.</li><li>Hazlo en la libreta. Si te atascas, abre <strong>solo la siguiente pista</strong> y vuelve a intentarlo.</li><li>Comprueba primero solo el resultado; si no coincide, busca el fallo antes de mirar la solución completa.</li><li>Márcalo como resuelto: el progreso se guarda en este navegador.</li></ol></div>
<nav class="filtro" aria-label="Ir a un apartado">${cats.filter(c => c.ejercicios.length).map(c => `<a href="#${c.slug}">${icono(c.icono)}${c.n} · ${esc(c.corto)} (${c.ejercicios.length})</a>`).join('')}</nav>`;
    const toc = [];
    cats.filter(c => c.ejercicios.length).forEach(c => {
      body += `\n<h2 id="${c.slug}" class="grupo-ej"><span>${icono(c.icono)}${c.n} · ${esc(c.nombre)}</span><a href="../${c.slug}/">Repasar la teoría →</a></h2>\n<div class="props">${c.ejercicios.map(tarjeta).join('\n')}</div>`;
      toc.push({ id: c.slug, txt: `${c.n} · ${c.corto} (${c.ejercicios.length})` });
    });
    escribir('ejercicios', page(S, { title: `Ejercicios · ${S.corto}`, h1: 'Ejercicios', eyebrow: TIT, desc: `${Resumen}, por apartado y de menos a más.`, body, toc, depth: 3, current: 'ejercicios',
      crumbs: [[`${S.num} · ${S.corto}`, '../'], ['Ejercicios', null]], ico: 'ejercicios', pager: pagerHtml({ href: '../', txt: 'Mapa de la sección' }, null) }));
  }
  // cada ejercicio
  todos.forEach((e, k) => {
    const c = e.cat, up = '../../../../';
    const md = s => render(s, { up, propio: e.id }).html;
    const [wt, ...wc] = (e.widget || '').split(' ');
    const widget = e.widget ? `<h2 id="explorar">0 · Explora antes de empezar</h2>\n${e.explora ? `<p>${inline(e.explora)}</p>` : ''}${widgetHtml(wt, wc.join(' ') || '{}')}` : '';
    const pistas = e.pistas.map((p, i) => `<details class="pista"><summary><span class="n">Pista ${i + 1}</span><span class="t">${inline(p.titulo)}</span></summary><div class="cuerpo">${md(p.cuerpo)}</div></details>`).join('\n');
    const body = `<nav class="saltos" aria-label="Saltar a"><a href="../#e-${e.slug}">Volver a los ejercicios</a><a href="../../${c.slug}/">Teoría: ${esc(c.corto)}</a></nav>
<div class="enun-box" id="enunciado"><div class="lbl">Enunciado · ${esc(e.nuevo ? 'Ejercicio nuevo' : e.fuente)}</div>${md(e.enunciado)}</div>
<p class="ficha"><span>Apartado: <a href="../../${c.slug}/"><strong>${esc(c.nombre)}</strong></a></span>${tagNivel(e)}</p>
${widget}
<h2 id="resolver">Resuélvelo con pistas</h2>
<p>Hazlo primero en la libreta. Si te atascas, abre la siguiente pista: cada una te deja un poco más cerca, pero no lo resuelve todo.</p>
<section class="guia" data-ej="${S.slug}:${e.slug}" aria-label="Pistas y solución">
${pistas}
${e.resultado ? `<details class="res"><summary><span class="n">Resultado</span><span class="t">Solo para comprobar</span></summary><div class="cuerpo">${md(e.resultado)}</div></details>` : ''}
<details class="sol" id="solucion"><summary><span class="n">Solución completa</span><span class="t">Paso a paso</span></summary><div class="cuerpo">${md(e.solucion)}</div></details>
<div class="estado" hidden><span class="txt"></span><button type="button" class="btn hecho">Lo he resuelto</button><button type="button" class="reset">Empezar de cero</button></div>
</section>`;
    const prev = todos[k - 1], next = todos[k + 1];
    const pg = pagerHtml(prev ? { href: `../${prev.slug}/`, txt: `${prev.id} · ${esc(prev.titulo)}` } : null, next ? { href: `../${next.slug}/`, txt: `${next.id} · ${esc(next.titulo)}` } : null, { href: `../#e-${e.slug}`, txt: 'Todos los ejercicios' });
    escribir(path.join('ejercicios', e.slug), page(S, {
      title: `${e.id} · ${e.titulo}`, h1: `${e.id} · ${esc(e.titulo)}`, eyebrow: `Ejercicio guiado · ${c.nombre}`, desc: '', body, depth: 4, current: 'ejercicios',
      toc: [{ id: 'enunciado', txt: 'Enunciado' }, ...(e.widget ? [{ id: 'explorar', txt: 'Explorar' }] : []), { id: 'resolver', txt: 'Pistas y solución' }],
      crumbs: [[`${S.num} · ${S.corto}`, '../../'], ['Ejercicios', '../'], [e.id, null]], pager: pg,
    }));
  });
}
SECC.filter(S => lista.includes(S.slug)).forEach(construir);

// ---------------------------------------------------------------- portada: bloque del Tema 1
{
  const f = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(f, 'utf8');
  const item = (h, ico, badge, h3, p) => `      <a class="item card" href="${h}">
        <div class="thumb grid-paper" aria-hidden="true">${icono(ico)}</div>
        <div><span class="badge${badge.cls ? ' ' + badge.cls : ''}">${badge.txt}</span><h3>${h3}</h3><p>${p}</p></div>
      </a>`;
  const items = [];
  for (const s of TEMA1.secciones) {
    const S = SECC.find(x => x.slug === s.slug);
    if (S) items.push(item(`temas/${S.slug}/`, S.mapa.icono, { txt: `Sección ${S.num}`, cls: 'tema' }, S.mapa.titulo, S.mapa.portada || S.mapa.desc));
    if (s.slug === 'demostraciones') items.push(item('temas/induccion/', 'domino', { txt: 'Sección 2 · inducción' }, 'Demostración por inducción', 'El dominó, la plantilla, sumas, divisibilidad y desigualdades, con 25 ejercicios guiados.'));
  }
  const bloque = `<!-- tema:t1-mates -->
  <section class="topic" aria-labelledby="t-t1-mates">
    <div class="topic-head"><h3 id="t-t1-mates">${TEMA1.titulo}</h3><p>Repaso para el examen, en el orden de las diapositivas: teoría con ejemplos resueltos y ejercicios de menos a más con pistas paso a paso</p></div>
    <div class="items">
${items.join('\n')}
    </div>
  </section>
  <!-- /tema:t1-mates -->`;
  html = html.replace(/\s*<!-- tema:induccion -->[\s\S]*?<!-- \/tema:induccion -->/, '');   // inducción va ahora dentro del Tema 1
  const i = html.indexOf('<!-- tema:t1-mates -->'), j = html.indexOf('<!-- /tema:t1-mates -->');
  html = i >= 0 && j >= 0 ? html.slice(0, i) + bloque + html.slice(j + '<!-- /tema:t1-mates -->'.length)
    : html.replace(/\n\s*<\/section>\s*\n<!-- \/materia:matematicas -->/, `\n  ${bloque}\n  </section>\n<!-- /materia:matematicas -->`);
  fs.writeFileSync(f, html);
}
if (errores.length) { console.error('Fórmulas que KaTeX no ha podido componer (se dejan en texto):\n' + errores.join('\n')); process.exitCode = 1; }
console.log(`${total} páginas en ${SECC.filter(S => lista.includes(S.slug)).map(S => S.slug).join(', ')}`);
