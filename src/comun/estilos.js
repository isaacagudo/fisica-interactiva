// Estilos de las páginas de los temas (apartados, ejercicios, soluciones), comunes a todos los temas.
// Uso: const CSS = require('../comun/estilos.js');
module.exports = `
:root{--c-a:#7b4fd6;--c-k:#b4407e;--axis:#8793a6}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--c-a:#b39bff;--c-k:#f08cc0;--axis:#8e9ab0}}
:root[data-theme="dark"]{--c-a:#b39bff;--c-k:#f08cc0;--axis:#8e9ab0}
.fig{--cds-text-primary:var(--ink);--cds-text-secondary:var(--ink-2);--cds-chart-axis:var(--axis);--cds-chart-grid:var(--rule);
  --cds-chart-reference-tint:var(--plane);--cds-chart-categorical-1:var(--c-p);--cds-chart-categorical-2:var(--c-n);
  --cds-chart-categorical-3:var(--c-fr);--cds-chart-categorical-4:var(--c-a);--cds-chart-categorical-5:var(--c-k);
  margin:18px 0 6px;background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:10px 10px 6px}
.fig svg{display:block;width:100%;height:auto;font-family:var(--f-body)}
.fig.dg{max-width:640px}
.doc p.lectura{font-size:15px;color:var(--ink-2);margin:4px 0 14px}
.fig figcaption{font-size:13px;color:var(--ink-2);padding:4px 4px 2px}
header.top{display:grid;gap:8px;margin:6px 0 18px}
header.top .txt{display:grid;gap:8px;min-width:0}
header.con-ico{grid-template-columns:96px minmax(0,1fr);gap:16px;align-items:center}
.ico-top{border:1px solid var(--rule);border-radius:10px}
@media (max-width:520px){header.con-ico{grid-template-columns:64px minmax(0,1fr);gap:12px}}
.cats{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 22px}
.cats a{font:600 13px var(--f-body);text-decoration:none;color:var(--ink-2);border:1px solid var(--rule);background:var(--sheet);border-radius:999px;padding:3px 11px 3px 5px;display:inline-flex;align-items:center;gap:6px}
.cats .ico{width:30px;flex:none}
.cats a[aria-current="page"] .ico .bk{fill:var(--paper)}
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
.grid-cats a{grid-template-columns:72px minmax(0,1fr)}
.grid-cats .n{border-radius:8px;border:1px solid var(--rule)}
.doc .widget[id^=simulador]{scroll-margin-top:12px}
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
.grupo-ej{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:4px 12px}
.grupo-ej>span{display:inline-flex;align-items:center;gap:10px}
.grupo-ej .ico{width:44px}
.filtro a{display:inline-flex;align-items:center;gap:6px;padding:3px 11px 3px 5px}
.filtro .ico{width:30px}
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
