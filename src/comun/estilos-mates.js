// Estilos propios de las secciones de matemáticas (además de comun/estilos.js): fórmulas, pistas, niveles y widgets.
const TEMA1 = require('./tema1.js');
module.exports = TEMA1.css + `
.doc p.eq{margin:6px 0;display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px}
.doc p.eq+p.eq{margin-top:-1px;border-top-left-radius:0;border-top-right-radius:0}
.doc p.eq:has(+p.eq){margin-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0}
.doc p.eq .just{font-size:14px;color:var(--ink-2)}
.doc p.eq .f .katex{font-size:1.12em}
.doc strong.f{font-weight:inherit}
.katex{font-size:1.08em}
.katex-display{margin:.4em 0}
.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.82em;line-height:1.15}
.fr .nu{border-bottom:1px solid currentColor;padding:0 3px}
.doc ol[start]{margin-top:12px}
.ficha{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;font-size:14.5px;color:var(--ink-2);margin:12px 0 0}
.ficha strong{color:var(--ink)}
/* pistas */
.guia{display:grid;gap:10px;margin:14px 0}
.guia details{background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:0 14px}
.guia summary{cursor:pointer;list-style:none;min-height:46px;display:flex;align-items:center;gap:10px;font:700 15px var(--f-body)}
.guia summary::-webkit-details-marker{display:none}
.guia summary::before{content:"▸";font-size:12px;color:var(--ink-2)}
.guia details[open] summary::before{content:"▾"}
.guia .n{font:700 12px var(--f-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--c-v);border:1px solid currentColor;border-radius:999px;padding:1px 8px;white-space:nowrap}
.guia details.pista[open]{border-color:var(--c-v)}
.guia.js details.pista:not([open]):not(.usada) .t{display:none}
.guia.js details.pista:not([open]):not(.usada) summary::after{content:"¿Atascada? Ábrela";font:400 14px var(--f-body);color:var(--ink-2)}
.guia .cuerpo{padding:0 0 12px;min-width:0;overflow-x:auto}
.guia .cuerpo p{margin:6px 0}
.guia details.res summary .n{color:var(--c-n)}
.guia details.res[open]{border-color:var(--c-n)}
.guia details.sol summary .n{color:var(--c-p)}
.guia details.sol[open]{border-color:var(--c-p)}
.guia .estado{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:14.5px;color:var(--ink-2);padding:4px 2px}
.guia .estado .txt{flex:1 1 200px}
.guia .estado .reset{background:none;border:0;color:var(--ink-2);text-decoration:underline;font:inherit;cursor:pointer;padding:0}
.tag.hecho{color:var(--c-n)}
.tag.empezado{color:var(--c-v)}
.tag.nivel.n1{color:var(--c-n)} .tag.nivel.n2{color:var(--c-v)} .tag.nivel.n3{color:var(--c-fr)}
.ir-ej .lista .tag{margin-left:4px}
/* widgets */
.widget{background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:12px 14px;margin:14px 0;display:grid;gap:10px;grid-template-columns:minmax(0,1fr)}
.widget .w-tit{font:700 14px var(--f-body);margin:0}
.widget .w-ctl{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;font-size:14.5px}
.widget .w-ctl label{display:inline-flex;align-items:center;gap:6px}
.widget input[type=number],.widget input[type=text]{font:inherit;width:6.5em;padding:6px 8px;border:1px solid var(--rule);border-radius:8px;background:var(--paper);color:var(--ink)}
.widget input[type=text].largo{width:14em}
.widget input[type=range]{width:min(220px,60vw)}
.widget .w-out{font-size:15px}
.widget .w-msg{font-size:14.5px;color:var(--ink-2);margin:0}
.widget svg{display:block;width:100%;height:auto}
.widget table{font-variant-numeric:tabular-nums}
.widget td.num,.widget th.num{font-family:var(--f-mono);text-align:right;white-space:nowrap}
.widget .ok{color:var(--c-n);font-weight:700} .widget .mal{color:var(--c-fr);font-weight:700}
.widget tr.marca td{background:color-mix(in srgb,var(--c-fr) 12%,transparent)}
.widget tr.base td{background:color-mix(in srgb,var(--c-n) 12%,transparent)}
.widget .chips{display:flex;flex-wrap:wrap;gap:6px}
.widget .chips .btn[aria-pressed=true]{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.rf{border-collapse:collapse;font-family:var(--f-mono);font-size:16px;margin:4px 0}
.rf td{padding:6px 10px;text-align:right;min-width:2.6em}
.rf td.a{border-right:2px solid var(--ink);color:var(--c-p);font-weight:700}
.rf tr.suma td{border-top:2px solid var(--ink)}
.rf td.r{background:color-mix(in srgb,var(--c-n) 16%,transparent);font-weight:700}
.rf td.nuevo{color:var(--c-v);font-weight:700}
.lista-enum{display:flex;flex-wrap:wrap;gap:6px;font-family:var(--f-mono);font-size:14px;max-height:260px;overflow:auto}
.lista-enum span{border:1px solid var(--rule);border-radius:6px;padding:2px 7px;background:var(--paper)}
.pascal{display:grid;gap:4px;justify-items:center;font-family:var(--f-mono);font-size:14px}
.pascal .fila{display:flex;gap:4px;cursor:pointer;border-radius:8px;padding:2px 4px}
.pascal .fila:hover,.pascal .fila[aria-pressed=true]{background:color-mix(in srgb,var(--c-p) 14%,transparent)}
.pascal .fila span{min-width:2.4em;text-align:center;border:1px solid var(--rule);border-radius:6px;padding:2px 0;background:var(--paper)}
.arbol{display:grid;gap:8px}
.arbol .preg{font-weight:700}
.arbol .res{border:1px solid var(--c-p);border-radius:10px;padding:10px 12px;background:color-mix(in srgb,var(--c-p) 6%,var(--sheet))}
.arbol .camino{font-size:13.5px;color:var(--ink-2)}
`;
