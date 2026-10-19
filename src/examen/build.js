// Genera ../../examen/index.html: el generador de exámenes.
// La página lista los temas registrados en assets/examen/<tema>.js (con sus apartados e iconos) y carga el código
// que genera el examen en el navegador (assets/examen/generador.js, los patrones de cada tema y assets/examen/pagina.js).
// Uso: cd src && node examen/build.js   (después de node energia/build.js, que genera las cuestiones de teoría)
const fs = require('fs'), path = require('path');
const { icono } = require('../iconos.js');
const A = path.join(__dirname, '../../assets');
const X = require(path.join(A, 'examen/generador.js'));
// temas con generador: [fichero de patrones, ficheros extra generados]
const TEMAS = [['energia.js', 'energia-cuestiones.js']];
for (const fs_ of TEMAS) for (const f of fs_) require(path.join(A, 'examen', f));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const WIDGETS = ['nucleo', 'bloque', 'plano', 'tiro', 'potencia', 'calentador', 'vectores', 'muelle'];

const temas = Object.values(X.temas);
const arbol = temas.map(T => `<fieldset class="tema" data-tema="${T.tema}">
  <legend>${esc(T.nombre)}</legend>
  <div class="tema-acc"><button type="button" class="mini" data-todos="${T.tema}">Todos</button><button type="button" class="mini" data-ninguno="${T.tema}">Ninguno</button><a href="../${T.ruta}">Mapa del tema</a><a href="../${T.ruta}ejercicios/">Ejercicios</a></div>
  <div class="aps">${T.apartados.map((a, i) => a.patrones.length ? `<label class="ap" data-ap="${T.tema}:${i + 1}"><input type="checkbox" value="${i + 1}" checked>${icono(a.icono)}<span><b>${i + 1} · ${esc(a.nombre)}</b><small>${a.patrones.length} ${a.patrones[0].cuestion ? 'cuestiones' : 'tipos de ejercicio'}</small></span></label>` : '').join('')}</div>
</fieldset>`).join('\n');
const nTipos = temas.reduce((s, T) => s + T.apartados.reduce((t, a) => t + (a.patrones[0] && a.patrones[0].cuestion ? 0 : a.patrones.length), 0), 0);

const CSS = `
:root{--c-a:#7b4fd6;--c-k:#b4407e}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--c-a:#b39bff;--c-k:#f08cc0}}
:root[data-theme="dark"]{--c-a:#b39bff;--c-k:#f08cc0}
header.top{display:grid;grid-template-columns:96px minmax(0,1fr);gap:16px;align-items:center;margin:6px 0 18px}
header.top .txt{display:grid;gap:8px;min-width:0}
.ico-top{border:1px solid var(--rule);border-radius:10px}
@media (max-width:520px){header.top{grid-template-columns:64px minmax(0,1fr);gap:12px}}
main{max-width:860px}
.config{padding:16px 18px;display:grid;gap:14px}
.config h2{font-size:1.15rem;margin:0}
.tema{border:1px solid var(--rule);border-radius:12px;padding:10px 14px 14px;margin:0;min-width:0}
.tema legend{font:700 1rem var(--f-display);padding:0 6px}
.tema-acc{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:0 0 10px;font-size:14px}
.mini{font:600 13px var(--f-body);color:var(--ink-2);background:var(--sheet);border:1px solid var(--rule);border-radius:999px;padding:4px 12px;min-height:32px;cursor:pointer}
.mini:hover{color:var(--ink);border-color:var(--ink-2)}
.aps{display:grid;gap:8px;grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr))}
.ap{display:grid;grid-template-columns:20px 54px minmax(0,1fr);gap:10px;align-items:center;border:1px solid var(--rule);border-radius:10px;padding:6px 10px;cursor:pointer;background:var(--sheet)}
.ap:hover{border-color:var(--ink-2)}
.ap:has(input:checked){border-color:var(--c-p);box-shadow:inset 0 0 0 1px var(--c-p)}
.ap input{width:18px;height:18px;margin:0;accent-color:var(--c-p)}
.ap .ico{width:54px;border-radius:6px;background:var(--paper)}
.ap b{display:block;font-size:14.5px;line-height:1.25}
.ap small{display:block;color:var(--ink-2);font-size:12.5px}
.ap:not(:has(input:checked)) .ico{opacity:.45}
.fila{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px}
.cuantos{display:flex;align-items:center;gap:10px;font-weight:700}
.stepper{display:inline-flex;align-items:stretch;border:1px solid var(--rule);border-radius:10px;overflow:hidden;background:var(--sheet)}
.stepper button{width:42px;min-height:42px;border:0;background:var(--paper);color:var(--ink);font:700 20px var(--f-body);cursor:pointer}
.stepper button:hover{background:var(--plane)}
.stepper input{width:56px;border:0;border-left:1px solid var(--rule);border-right:1px solid var(--rule);background:var(--sheet);color:var(--ink);font:700 18px var(--f-body);text-align:center;-moz-appearance:textfield}
.stepper input::-webkit-inner-spin-button,.stepper input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
.fila .btn.primary{margin-left:auto}
@media (max-width:520px){.fila .btn.primary{margin-left:0;width:100%;justify-content:center}}
.aviso{margin:0;color:var(--c-fr);font-weight:700}
.nota-cfg{margin:0;font-size:13.5px;color:var(--ink-2)}
/* examen */
.examen{margin-top:26px}
.ex-barra{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 14px}
.ex-barra .num{font:600 14px var(--f-body);color:var(--ink-2);margin-right:auto}
.ex-barra .num strong{font:700 1.05rem var(--f-mono);color:var(--ink)}
.ex-barra .btn{font-size:14px}
.hoja{background:var(--sheet);border:1px solid var(--rule);border-radius:14px;padding:20px 22px}
@media (max-width:520px){.hoja{padding:16px 14px}}
.ex-cab{border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:6px;display:grid;gap:6px}
.ex-cab h2{margin:0;font-size:1.35rem}
.ex-cab p{margin:0}
.ex-cab .sub{color:var(--ink-2);font-size:14.5px}
.ex-cab .ex-n{font:600 13px var(--f-mono);color:var(--ink-2)}
.ex-alumno{display:none}
.ex-lista{list-style:none;margin:0;padding:0;counter-reset:ej}
.ex-ej{padding:16px 0;border-bottom:1px solid var(--rule)}
.ex-ej:last-child{border-bottom:0}
.ex-cab-ej{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin-bottom:4px}
.ex-cab-ej .n{font:700 1.1rem var(--f-display)}
.ex-cab-ej .pts{font:700 13px var(--f-mono);border:1px solid var(--ink);border-radius:999px;padding:1px 9px}
.ex-cab-ej .ap-tag{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--ink-2)}
.ex-cab-ej .ap-tag .ico{width:30px}
.ex-enun p{margin:6px 0}
.ex-acc{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start;margin-top:8px}
.ex-acc details{flex:1 1 240px;min-width:0}
.ex-acc summary{cursor:pointer;font:600 13.5px var(--f-body);color:var(--ink-2);min-height:38px;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--rule);border-radius:9px;padding:0 12px;list-style:none}
.ex-acc summary::-webkit-details-marker{display:none}
.ex-acc summary::before{content:"▸";font-size:12px}
.ex-acc details[open] summary::before{content:"▾"}
.ex-acc details p{background:var(--hl);border-radius:8px;padding:8px 12px;margin:8px 0 0}
.ex-acc .btn{margin-left:auto;font-size:14px}
@media (max-width:520px){.ex-acc .btn{margin-left:0;width:100%;justify-content:center}}
.ex-sol{margin-top:12px;border:1px solid var(--rule);border-left:3px solid var(--c-p);border-radius:10px;padding:4px 14px 12px;background:var(--paper)}
.ex-sol h3,.sol-imp h3{font:700 .82rem var(--f-body);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);margin:12px 0 4px}
.paso p{margin:8px 0}
.paso p.eq{background:var(--sheet);border:1px solid var(--rule);border-left:3px solid var(--c-p);border-radius:8px;padding:8px 12px;overflow-x:auto}
.paso p.sub{margin:18px 0 4px}
.paso blockquote.why{margin:8px 0 12px;padding:6px 12px;border-left:3px solid var(--rule);background:var(--sheet);border-radius:0 8px 8px 0}
.paso blockquote.why p{margin:3px 0}
.paso .res{background:var(--hl);border-radius:8px;padding:8px 12px}
.paso ul{padding-left:1.3em}
.table-wrap{overflow-x:auto;margin:10px 0;border:1px solid var(--rule);border-radius:10px;background:var(--sheet)}
.table-wrap table{border-collapse:collapse;width:100%;font-size:14px}
.table-wrap th,.table-wrap td{text-align:left;vertical-align:top;padding:6px 9px;border-bottom:1px solid var(--rule)}
.table-wrap th{background:var(--paper)}
.fig{margin:12px 0 4px;background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:8px}
.fig svg{display:block;width:100%;height:auto}
.fig.dg{max-width:620px}
.fig figcaption{font-size:13px;color:var(--ink-2);padding:4px 4px 2px}
.paso p.datos{font-size:14.5px;color:var(--ink-2)}
.paso p.lectura{font-size:14.5px;margin:4px 0 12px}
.paso p.ojo{border-left:3px solid var(--c-fr);padding:4px 12px;background:var(--sheet);border-radius:0 8px 8px 0}
.ex-sim{margin-top:10px}
.ex-sim .widget{margin-top:10px}
.solucionario{display:none}
.vacio{color:var(--ink-2)}
footer{margin-top:36px;color:var(--ink-2);font-size:13px}
@media print{
  body{background:#fff}
  .crumbs,header.top,.config,.ex-barra,.ex-acc,.ex-sol,.ex-sim,footer,.ap-tag{display:none!important}
  .page{padding:0;max-width:none}
  .examen{margin:0}
  .hoja{border:0;padding:0;border-radius:0}
  .ex-alumno{display:flex;gap:28px;margin:10px 0 2px;font-size:14px}
  .ex-alumno span{flex:1;border-bottom:1px solid #000;padding-bottom:2px}
  .ex-ej{break-inside:avoid}
  body.con-sol .solucionario{display:block;break-before:page}
  .sol-imp{break-inside:auto;padding:10px 0;border-bottom:1px solid #999}
  .sol-imp h3{color:#000}
  p.eq,.fig,.table-wrap{break-inside:avoid}
}
`;

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Generador de exámenes · Física interactiva</title>
<meta name="description" content="Exámenes de física con datos aleatorios: eliges los apartados y cuántos ejercicios, y cada examen trae su puntuación y sus soluciones paso a paso con simulación.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=JetBrains+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="../assets/base.css">
<style>${CSS}</style>
</head>
<body>
<div class="page">
  <nav class="crumbs" aria-label="Ruta"><a href="../">Física interactiva</a><span aria-hidden="true">›</span><span>Generador de exámenes</span></nav>
  <header class="top"><div class="ico-top grid-paper">${icono('examen')}</div><div class="txt"><div class="eyebrow">Para practicar</div><h1>Generador de exámenes</h1><p class="lead">Elige los apartados y cuántos ejercicios quieres. Cada examen tiene datos nuevos, la puntuación sobre 10 y la solución paso a paso de cada ejercicio, con la simulación de esos mismos datos.</p></div></header>
  <main>
    <form class="config card" id="cfg" aria-labelledby="cfg-h">
      <h2 id="cfg-h">Prepara el examen</h2>
      ${arbol}
      <div class="fila">
        <label class="cuantos" for="n">Ejercicios</label>
        <span class="stepper"><button type="button" data-paso="-1" aria-label="Uno menos">−</button><input id="n" type="number" min="1" max="20" value="6" inputmode="numeric"><button type="button" data-paso="1" aria-label="Uno más">+</button></span>
        <button type="submit" class="btn primary" id="gen">Generar examen</button>
      </div>
      <p class="aviso" id="aviso" hidden>Elige al menos un apartado.</p>
      <p class="nota-cfg">Hay ${nTipos} tipos de ejercicio con datos aleatorios y un banco de cuestiones de teoría. Los ejercicios se reparten entre los apartados elegidos y no se repite un tipo hasta haber salido todos los de su apartado.</p>
    </form>
    <section class="examen" id="examen" aria-live="polite"><noscript><p>El generador necesita JavaScript.</p></noscript></section>
  </main>
  <footer>Material de estudio. Si el enunciado no da g, se usa 9,8 m/s². El enlace de cada examen lo vuelve a abrir igual, con los mismos datos.</footer>
</div>
${WIDGETS.map(w => `<script src="../assets/widgets/${w}.js" defer></script>`).join('\n')}
<script src="../assets/diagramas/diagramas.js" defer></script>
<script src="../assets/examen/generador.js" defer></script>
${TEMAS.flat().map(f => `<script src="../assets/examen/${f}" defer></script>`).join('\n')}
<script src="../assets/examen/pagina.js" defer></script>
</body>
</html>
`;
const out = path.join(__dirname, '../../examen/index.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log('examen/index.html:', temas.length, 'tema(s),', nTipos, 'tipos de ejercicio');
