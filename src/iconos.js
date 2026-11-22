// Iconos de la web (SVG 96×72, colores con las variables de base.css).
// Comunes a todos los temas: mapa, ejercicios, examen. Uno por apartado: se elige con su nombre en la cabecera del apartado (icono: …).
// Uso: const { icono } = require('../iconos.js'); icono('muelle') -> '<svg class="ico" …>'.
const flecha = (x1, y1, x2, y2, c, w = 2.6) => {
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, h = 7, bx = x2 - ux * h, by = y2 - uy * h;
  return `<line class="ln ${c}" x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" style="stroke-width:${w}"/><polygon class="f${c}" points="${x2},${y2} ${(bx - uy * 4.5).toFixed(1)},${(by + ux * 4.5).toFixed(1)} ${(bx + uy * 4.5).toFixed(1)},${(by - ux * 4.5).toFixed(1)}"/>`;
};
const suelo = (y = 56, x1 = 6, x2 = 90) => `<rect class="pl" x="${x1}" y="${y}" width="${x2 - x1}" height="8" style="stroke:none"/><line class="ln q" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" style="stroke-width:1.5"/>`;
const zig = (x1, y, x2, n = 5, a = 6) => { let d = `M${x1} ${y}`; const L = x2 - x1, s = L / (2 * n + 2); d += ` L${x1 + s} ${y}`; for (let i = 0; i < 2 * n; i++) d += ` L${(x1 + s * (i + 1.5)).toFixed(1)} ${y + (i % 2 ? a : -a)}`; return d + ` L${x2 - s} ${y} L${x2} ${y}`; };

const glifo = (t, size = 24, c = 'n', x = 48, y = 46) => `<text x="${x}" y="${y}" text-anchor="middle" style="font:700 ${size}px var(--f-display, sans-serif);fill:var(--${c === 'n' ? 'ink' : 'c-' + c})">${t}</text>`;

const ICONOS = {
  // ---- comunes a todos los temas
  mapa: `<polygon class="pl" points="14,16 34,10 56,16 80,10 80,58 56,64 34,58 14,64"/><line class="ln q" x1="34" y1="10" x2="34" y2="58" style="stroke-width:1.2"/><line class="ln q" x1="56" y1="16" x2="56" y2="64" style="stroke-width:1.2"/>
<path class="ln p" d="M22 52 C30 40, 40 50, 46 38 S62 26, 66 24" style="stroke-dasharray:4 4"/><path class="ffr" d="M66 12 C60 12 57 16 57 20 C57 26 66 34 66 34 C66 34 75 26 75 20 C75 16 72 12 66 12 Z"/><circle cx="66" cy="20" r="3.2" style="fill:var(--sheet)"/>`,
  ejercicios: `<rect class="bk" x="20" y="8" width="44" height="58" rx="3"/><line class="ln q" x1="28" y1="22" x2="56" y2="22" style="stroke-width:1.6"/><line class="ln q" x1="28" y1="32" x2="56" y2="32" style="stroke-width:1.6"/><line class="ln q" x1="28" y1="42" x2="48" y2="42" style="stroke-width:1.6"/><line class="ln q" x1="28" y1="52" x2="44" y2="52" style="stroke-width:1.6"/>
<g transform="rotate(38 66 40)"><rect x="61" y="14" width="10" height="40" rx="1.5" class="fv"/><rect x="61" y="14" width="10" height="6" style="fill:var(--c-fr)"/><polygon points="61,54 71,54 66,64" style="fill:var(--sheet);stroke:var(--ink);stroke-width:1.4"/><polygon points="64.4,60.8 67.6,60.8 66,64" style="fill:var(--ink)"/></g>`,
  examen: `<rect class="bk" x="12" y="8" width="44" height="58" rx="3"/><path class="ln n" d="M19 22 l4 4 l7 -8"/><line class="ln q" x1="34" y1="22" x2="49" y2="22" style="stroke-width:1.6"/><path class="ln n" d="M19 37 l4 4 l7 -8"/><line class="ln q" x1="34" y1="37" x2="49" y2="37" style="stroke-width:1.6"/><path class="ln fr" d="M20 49 l8 8 M28 49 l-8 8"/><line class="ln q" x1="34" y1="53" x2="45" y2="53" style="stroke-width:1.6"/>
<g transform="rotate(-12 72 46)"><rect x="56" y="30" width="32" height="32" rx="6" style="fill:var(--sheet);stroke:var(--c-p);stroke-width:2.2"/><circle cx="64" cy="38" r="2.8" class="fp"/><circle cx="72" cy="46" r="2.8" class="fp"/><circle cx="80" cy="54" r="2.8" class="fp"/><circle cx="80" cy="38" r="2.8" class="fp"/><circle cx="64" cy="54" r="2.8" class="fp"/></g>`,
  // ---- trabajo, potencia y energía
  trabajo: `${suelo(52)}<rect class="bk" x="20" y="30" width="22" height="22" rx="2"/>${flecha(42, 41, 70, 22, 'a')}<path class="ln q" d="M58 41 A16 16 0 0 0 55.3 32" style="stroke-width:1.3"/><line class="ln q" x1="42" y1="41" x2="66" y2="41" style="stroke-width:1.2;stroke-dasharray:3 3"/>${flecha(20, 64, 80, 64, 'i', 2)}`,
  rozamiento: `${suelo(50)}<path class="ln q" d="M10 58 l5 -5 M20 58 l5 -5 M30 58 l5 -5 M40 58 l5 -5 M50 58 l5 -5 M60 58 l5 -5 M70 58 l5 -5 M80 58 l5 -5" style="stroke-width:1.2"/><rect class="bk" x="36" y="26" width="24" height="24" rx="2"/>${flecha(60, 38, 86, 38, 'a')}${flecha(44, 47, 16, 47, 'fr')}`,
  cinetica: `${suelo(54)}<rect class="bk" x="44" y="30" width="24" height="24" rx="2"/><line class="ln v" x1="12" y1="34" x2="34" y2="34" style="stroke-width:2;opacity:.5"/><line class="ln v" x1="18" y1="42" x2="38" y2="42" style="stroke-width:2;opacity:.75"/><line class="ln v" x1="10" y1="50" x2="36" y2="50" style="stroke-width:2;opacity:.5"/>${flecha(52, 20, 86, 20, 'v')}`,
  conservacion: `${suelo(60)}<path class="ln q" d="M10 60 Q48 -14 86 60" style="stroke-width:1.6;stroke-dasharray:3 4"/><circle cx="48" cy="23" r="6.5" class="bk"/>${flecha(56, 23, 80, 23, 'v')}<rect x="10" y="10" width="6" height="22" style="fill:var(--c-v)"/><rect x="18" y="18" width="6" height="14" style="fill:var(--c-p)"/>`,
  muelle: `${suelo(56)}<rect class="pl" x="80" y="22" width="8" height="34"/><path class="ln k" d="${zig(46, 44, 80)}" style="stroke-width:2.2"/><line class="ln k" x1="46" y1="35" x2="46" y2="53" style="stroke-width:3.5"/><rect class="bk" x="20" y="32" width="24" height="24" rx="2"/>${flecha(8, 26, 26, 26, 'v')}`,
  plano: `<polygon class="pl" points="8,14 8,62 90,62"/><rect class="bk" x="-8" y="-8" width="16" height="16" rx="2" transform="translate(42 30) rotate(30)"/>${flecha(42, 32, 42, 54, 'p')}${flecha(42, 32, 51, 16, 'n')}${flecha(34, 32, 18, 23, 'fr')}<path class="ln q" d="M76 62 A14 14 0 0 0 77.8 55" style="stroke-width:1.3"/>`,
  potencia: `${suelo(64)}<rect class="pl" x="64" y="10" width="7" height="54"/><rect class="pl" x="18" y="8" width="56" height="6"/><circle cx="30" cy="18" r="5" class="bk"/><line class="ln i" x1="25" y1="18" x2="25" y2="38" style="stroke-width:1.5"/><rect class="bk" x="16" y="38" width="18" height="16" rx="2"/>${flecha(42, 52, 42, 30, 'v', 2.2)}<polygon points="56,18 46,40 54,40 48,60 64,34 56,34 62,18" style="fill:var(--c-v);stroke:var(--ink);stroke-width:1.2;stroke-linejoin:round"/>`,
  cuestiones: `<path d="M14 12 h62 a6 6 0 0 1 6 6 v30 a6 6 0 0 1 -6 6 h-38 l-14 12 v-12 h-10 a6 6 0 0 1 -6 -6 v-30 a6 6 0 0 1 6 -6 z" class="bk"/><path class="ln p" d="M38 26 a9 9 0 1 1 13 8 c-3 2 -4 3 -4 6" style="stroke-width:4"/><circle cx="47" cy="47" r="2.8" class="fp"/>`,
  // ---- demostración por inducción
  sumas: `<line class="ln q" x1="10" y1="62" x2="86" y2="62" style="stroke-width:1.5"/><rect class="bk" x="14" y="50" width="12" height="12"/><rect class="bk" x="30" y="38" width="12" height="24"/><rect class="bk" x="46" y="26" width="12" height="36"/><rect x="62" y="14" width="12" height="48" style="fill:var(--c-p);opacity:.25;stroke:var(--c-p);stroke-width:1.8"/><path class="ln p" d="M68 4 v8 M64 8 h8" style="stroke-width:2.2"/>`,
  divisibilidad: `<rect class="bk" x="12" y="12" width="72" height="48" rx="4"/><line class="ln q" x1="36" y1="16" x2="36" y2="56" style="stroke-width:1.2;stroke-dasharray:3 3"/><line class="ln q" x1="60" y1="16" x2="60" y2="56" style="stroke-width:1.2;stroke-dasharray:3 3"/>${[0, 1, 2].map(g => [[-6, 26], [6, 26], [-6, 38], [6, 38], [-6, 50], [6, 50]].map(([dx, y]) => `<circle cx="${24 + g * 24 + dx}" cy="${y - 2}" r="3.4" class="fn"/>`).join('')).join('')}`,
  desigualdades: `<line class="ln q" x1="8" y1="62" x2="88" y2="62" style="stroke-width:1.5"/><rect x="16" y="12" width="20" height="50" rx="2" style="fill:var(--c-p);opacity:.85"/><rect x="62" y="34" width="20" height="28" rx="2" style="fill:var(--c-v);opacity:.85"/><path class="ln i" d="M42 28 l12 8 l-12 8 M42 52 h12" style="stroke-width:2.8"/>`,
  domino: `<line class="ln q" x1="6" y1="62" x2="90" y2="62" style="stroke-width:1.5"/>${[0, 1, 2, 3, 4].map(i => { const x = 12 + i * 16, a = [56, 40, 22, 0, 0][i]; return `<rect class="bk" x="${x}" y="26" width="9" height="36" rx="1.5" transform="rotate(${a} ${x + 9} 62)"${i === 2 ? ' style="stroke:var(--c-p)"' : ''}/>`; }).join('')}`,
  // ---- matemáticas · Tema 1 (iconos de texto: un símbolo grande sobre la cuadrícula)
  repaso: glifo('P(a)', 26, 'n', 44, 30) + glifo('÷', 26, 'p', 48, 60),
  ecuaciones: glifo('x = ?', 26, 'n'),
  ruffini: `<line class="ln q" x1="24" y1="14" x2="24" y2="60" style="stroke-width:1.6"/><line class="ln q" x1="18" y1="44" x2="88" y2="44" style="stroke-width:1.6"/>${glifo('1 −2 3', 15, 'n', 56, 26)}${glifo('2', 15, 'p', 15, 40)}${glifo('1  0  3', 15, 'p', 56, 60)}`,
  resto: glifo('P(a) = r', 20, 'n', 48, 44),
  sucesiones: `${[0, 1, 2, 3, 4].map(i => `<circle cx="${16 + i * 16}" cy="${54 - i * 9}" r="4.5" style="fill:var(--c-p)"/>`).join('')}${glifo('aₙ', 18, 'n', 22, 22)}`,
  aritmetica: `${[0, 1, 2, 3].map(i => `<rect x="${14 + i * 18}" y="${58 - 10 - i * 10}" width="12" height="${10 + i * 10}" rx="1.5" style="fill:var(--c-p);opacity:.8"/>`).join('')}${glifo('+d', 16, 'n', 70, 18)}`,
  geometrica: `${[0, 1, 2, 3].map(i => `<rect x="${14 + i * 18}" y="${58 - 3 * 2 ** i}" width="12" height="${3 * 2 ** i}" rx="1.5" style="fill:var(--c-v);opacity:.85"/>`).join('')}${glifo('·R', 16, 'n', 30, 18)}`,
  fractal: `<path d="M48 8 L60 30 L84 30 L66 46 L74 68 L48 54 L22 68 L30 46 L12 30 L36 30 Z" style="fill:none;stroke:var(--c-p);stroke-width:2"/><path d="M48 22 L60 44 L36 44 Z" style="fill:var(--c-p);opacity:.3"/>`,
  demostraciones: glifo('∎', 40, 'n', 48, 52),
  directa: glifo('p ⟹ q', 22, 'n'),
  contradiccion: glifo('⟂', 40, 'fr', 48, 52),
  contraejemplo: glifo('∃ ✗', 30, 'fr'),
  recuento: glifo('n!', 34, 'n'),
  orden: `${['A', 'B', 'C'].map((t, i) => `<rect class="bk" x="${12 + i * 26}" y="20" width="20" height="26" rx="3"/>${glifo(t, 16, 'n', 22 + i * 26, 39)}`).join('')}<path class="ln p" d="M18 56 C34 66, 60 66, 76 56" style="stroke-width:2"/>`,
  repeticion: `${['A', 'A', 'B'].map((t, i) => `<rect class="bk" x="${12 + i * 26}" y="22" width="20" height="26" rx="3"${i < 2 ? ' style="stroke:var(--c-v)"' : ''}/>${glifo(t, 16, i < 2 ? 'v' : 'n', 22 + i * 26, 41)}`).join('')}`,
  condiciones: glifo('≥ 1', 28, 'n', 48, 46),
  binomio: glifo('(a+b)ⁿ', 24, 'n'),
  pascal: `${[0, 1, 2, 3].map(f => Array.from({ length: f + 1 }, (_, k) => `<circle cx="${48 + (k - f / 2) * 16}" cy="${12 + f * 15}" r="5.5" style="fill:${f === 3 ? 'var(--c-p)' : 'var(--sheet)'};stroke:var(--ink);stroke-width:1.4"/>`).join('')).join('')}`,
  termino: glifo('Tᵣ₊₁', 26, 'n'),
  generalizado: `<path d="M8 56 C30 54, 44 40, 52 30 S70 12, 88 8" style="fill:none;stroke:var(--c-p);stroke-width:2.4"/><path d="M8 62 L88 22" style="fill:none;stroke:var(--c-v);stroke-width:2;stroke-dasharray:4 3"/>${glifo('|x|<1', 13, 'n', 30, 20)}`,
};
const icono = (nombre, extra = '') => ICONOS[nombre] ? `<svg class="ico${extra ? ' ' + extra : ''}" viewBox="0 0 96 72" aria-hidden="true" focusable="false">${ICONOS[nombre]}</svg>` : '';
module.exports = { icono, ICONOS };
