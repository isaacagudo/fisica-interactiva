// Fórmulas escritas en texto (Unicode) -> notación matemática con KaTeX, al generar las páginas.
// Los contenidos se siguen escribiendo como siempre: n(n + 1)/2, 2ⁿ⁺¹, √(n + 1), 1/(n(n + 1)), (1/2)ʳ⁻¹ …
//   aTex(texto)            convierte una fórmula a TeX (fracciones apiladas, exponentes, raíces, palabras en \text)
//   mates(html, opciones)  pasa por el HTML de una página y compone:
//       - cada <strong> que es una fórmula (sin palabras de 4 letras o más): la fórmula entera
//       - en el resto del texto, cada fracción suelta (1·2/2, (n + 2)/2ⁿ⁻¹, 1/√2 …)
// Requiere en la página: <link rel="stylesheet" href="…/assets/katex/katex.min.css">
const katex = require('katex');

const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', 'ⁿ': 'n', 'ᵏ': 'k', 'ʳ': 'r', '⁺': '+', '⁻': '-', '⁽': '(', '⁾': ')', 'ᵅ': '\\alpha ' };
const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', 'ₙ': 'n', 'ₖ': 'k', 'ᵣ': 'r', '₊': '+', '₋': '-' };
const SIMB = { '·': '\\cdot ', '−': '-', '≥': '\\geq ', '≤': '\\leq ', '⋯': '\\cdots ', '…': '\\ldots ', '∈': '\\in ', 'ℤ': '\\mathbb{Z}', 'ℕ': '\\mathbb{N}', '⟹': '\\Rightarrow ', '×': '\\times ', 'Σ': '\\sum ', '<': '<', '>': '>', '≠': '\\neq ', '⟺': '\\iff ', '∞': '\\infty ', '→': '\\to ', '÷': '\\div ', 'π': '\\pi ', 'α': '\\alpha ', '⇒': '\\Rightarrow ', '±': '\\pm ' };
const CORTE = new Set(['+', '−', '-', '=', '≥', '≤', '<', '>', ',', ':', '⟹', '∈', ';']);   // fin del numerador hacia la izquierda
const LETRA = /[A-Za-zÁÉÍÓÚáéíóúÑñüÜ]/;
// palabras cortas que sí son texto dentro de una fórmula (las de 4 letras o más lo son siempre)
const CORTAS = new Set(['y', 'o', 'a', 'e', 'es', 'por', 'con', 'de', 'un', 'la', 'el', 'si', 'no', 'en', 'que', 'los', 'las', 'del', 'al', 'una', 'son', 'par', 'sea', 'sin', 'cm', 'mod', 'vez', 'ni']);
const ROMANAS = new Set(['VR', 'PR']);
const UNIDADES = new Set(['rad', 'cm', 'mm', 'km', 'dm']);   // unidades de varias letras, en redonda
const FUNCIONES = new Set(['sen', 'cos', 'tan', 'sec', 'cosec', 'csc', 'cot', 'arcsen', 'arccos', 'arctan', 'log', 'ln', 'lím', 'máx', 'mín']);   // se escriben en redonda: sen x, tan α   // nombres de fórmulas que no son producto de variables
const esPalabra = v => v.length >= 4 || CORTAS.has(v.toLowerCase());

// ---------------------------------------------------------------- análisis: texto -> lista de piezas
// pieza: {t:'num'|'var'|'pal'|'grupo'|'raiz'|'op'|'esp'|'otro', v, hijos, abre, cierra, sup, sub}
function analizar(s) {
  let i = 0;
  const lista = () => {
    const out = [];
    while (i < s.length) {
      const c = s[i];
      if (c === ')' || c === ']') return out;
      let p;
      if (c === '(' || c === '[') { i++; const h = lista(); const cierra = s[i] || ''; i++; p = { t: 'grupo', abre: c, cierra, hijos: h }; }
      else if ((c === '^' || c === '_') && out.length) {   // exponente o subíndice escrito a mano: x^(1/2), Σ_(r=1)^(28)
        const campo = c === '^' ? 'supTex' : 'subTex';
        i++;
        let t;
        if (s[i] === '(') { i++; const h = lista(); i++; t = tex(h); }
        else { let v = ''; if (s[i] === '−' || s[i] === '-') v += s[i++]; while (i < s.length && /[0-9A-Za-z]/.test(s[i])) v += s[i++]; if (!v.replace(/[−-]/, '')) v += s[i++] || ''; t = tex(analizar(v)); }
        out[out.length - 1][campo] = t;
        continue;
      }
      else if (c === '√' || c === '∛') {
        const idx = c === '∛' ? 3 : 0;
        i++;
        if (s[i] === '(') { i++; const h = lista(); i++; p = { t: 'raiz', idx, hijos: h }; }
        else { let v = ''; while (i < s.length && /[0-9A-Za-z]/.test(s[i])) { v += s[i++]; if (/[A-Za-z]/.test(v)) break; } p = { t: 'raiz', idx, hijos: [{ t: /\d/.test(v) ? 'num' : 'var', v }] }; }
      }
      else if (/\d/.test(c)) { let v = ''; while (i < s.length && /[\d,]/.test(s[i]) && !(s[i] === ',' && !/\d/.test(s[i + 1] || ''))) v += s[i++]; p = { t: 'num', v }; }
      else if (LETRA.test(c)) {
        const ini = i; let v = ''; while (i < s.length && LETRA.test(s[i])) v += s[i++];
        if (FUNCIONES.has(v)) p = { t: 'fun', v };
        else if (UNIDADES.has(v) && s[ini - 1] === ' ') p = { t: 'uni', v };   // «17,32 km» sí; «4km» es 4·k·m
        else if (ROMANAS.has(v)) p = { t: 'rom', v };
        else if (v.length > 1 && !esPalabra(v) && /^[A-Za-z]+$/.test(v)) { for (const ch of v.slice(0, -1)) out.push({ t: 'var', v: ch }); p = { t: 'var', v: v.slice(-1) }; }   // kx², ab: producto de variables
        else p = v.length > 1 ? { t: 'pal', v } : { t: 'var', v };
      }
      else if (c === ' ') { while (s[i] === ' ') i++; p = { t: 'esp' }; }
      else if (c === '/') { i++; p = { t: 'op', v: '/' }; }
      else { i++; p = { t: CORTE.has(c) ? 'op' : 'otro', v: c }; }
      // exponentes y subíndices pegados
      let sup = '', sub = '';
      while (i < s.length && (SUP[s[i]] !== undefined || SUB[s[i]] !== undefined)) { if (SUP[s[i]] !== undefined) sup += SUP[s[i]]; else sub += SUB[s[i]]; i++; }
      if (sup) p.sup = sup; if (sub) p.sub = sub;
      out.push(p);
    }
    return out;
  };
  const r = [];
  while (i < s.length) { r.push(...lista()); if (i < s.length) { r.push({ t: 'otro', v: s[i] }); i++; } }   // paréntesis sueltos
  return r;
}

// ---------------------------------------------------------------- piezas -> TeX
const tieneFrac = ps => ps.some(p => (p.t === 'op' && p.v === '/') || (p.hijos && tieneFrac(p.hijos)));
const supTex = sup => sup ? `^{${sup.replace(/-/g, '-')}}` : '';
function pieza(p) {
  let base;
  switch (p.t) {
    case 'num': base = p.v.replace(/,/g, '{,}'); break;
    case 'var': base = p.v; break;
    case 'pal': base = `\\text{${p.v}}`; break;
    case 'rom': base = `\\mathrm{${p.v}}`; break;
    case 'fun': base = `\\operatorname{${p.v}}`; break;
    case 'ap': return p.tex;
    case 'uni': base = `\\,\\mathrm{${p.v}}`; break;
    case 'esp': return ' ';
    case 'raiz': base = `\\sqrt${p.idx ? `[${p.idx}]` : ''}{${tex(p.hijos)}}`; break;
    case 'grupo': {
      const dentro = tex(p.hijos), grande = tieneFrac(p.hijos) || p.hijos.some(h => h.t === 'raiz');
      const a = p.abre === '(' ? '(' : '[', b = p.cierra === ')' ? ')' : p.cierra === ']' ? ']' : '.';
      base = grande ? `\\left${a}${dentro}\\right${b}` : `${a}${dentro}${b === '.' ? '' : b}`;
      break;
    }
    case 'op': case 'otro': base = SIMB[p.v] !== undefined ? SIMB[p.v] : p.v === '!' ? '!' : p.v === '✔' ? '' : p.v.replace(/([%&#_{}$])/g, '\\$1'); break;
  }
  if (p.sub) base += `_{${p.sub}}`;
  if (p.v === 'Σ' && (p.subTex || p.supTex)) return `\\sum${p.subTex ? `_{${p.subTex}}` : ''}${p.supTex ? `^{${p.supTex}}` : ''} `;
  if (p.subTex) base += `_{${p.subTex}}`;
  if (p.sup) base = (p.t === 'op' || p.t === 'otro' ? `{${base}}` : base) + supTex(p.sup);
  if (p.supTex) base = `{${base}}^{${p.supTex}}`;
  return base;
}
// un operando sin el paréntesis de fuera: (n + 2)/2 -> \frac{n+2}{2}
const operando = ps => {
  const q = ps.filter(p => p.t !== 'esp');
  if (q.length === 1 && q[0].t === 'grupo' && !q[0].sup) return tex(q[0].hijos);
  return tex(ps);
};
function tex(ps) {
  ps = ps.slice();
  // S∞ -> S con subíndice infinito
  for (let k = 0; k < ps.length - 1; k++) if (ps[k].t === 'var' && ps[k + 1].t === 'otro' && ps[k + 1].v === '∞' && !ps[k].sub) { ps[k] = Object.assign({}, ps[k], { sub: '\\infty' }); ps.splice(k + 1, 1); }
  // C(n, r) -> número combinatorio
  for (let k = 0; k < ps.length - 1; k++) {
    const g = ps[k + 1];
    if (ps[k].t === 'var' && ps[k].v === 'C' && !ps[k].sup && !ps[k].sub && g.t === 'grupo' && g.abre === '(') {
      const comas = g.hijos.map((h, j) => h.t === 'op' && h.v === ',' ? j : -1).filter(j => j >= 0);
      if (comas.length === 1) {
        const arriba = g.hijos.slice(0, comas[0]), abajo = g.hijos.slice(comas[0] + 1);
        let t = `\\binom{${tex(arriba)}}{${tex(abajo)}}`;
        if (g.sup) t = `{${t}}^{${g.sup}}`;
        ps.splice(k, 2, { t: 'frac', tex: t });
      }
    }
  }
  // «y» u «o» sueltas entre dos términos son conjunciones: 18° y 162°, π/8 o 7π/8
  const noEsp = (k, paso) => { for (let j = k + paso; j >= 0 && j < ps.length; j += paso) if (ps[j].t !== 'esp') return ps[j]; return null; };
  for (let k = 1; k < ps.length - 1; k++) {
    const p = ps[k];
    if (p.t !== 'var' || !['y', 'o'].includes(p.v) || p.sup || p.sub || ps[k - 1].t !== 'esp' || ps[k + 1].t !== 'esp') continue;
    const a = noEsp(k, -1), b = noEsp(k, 1);
    if (a && b && a.t !== 'op' && b.t !== 'op') ps[k] = { t: 'pal', v: p.v };
  }
  // funciones aplicadas: «sen 40°», «tan α», «cos²x» forman un solo factor (para que una fracción no las parta)
  for (let k = 0; k < ps.length; k++) {
    if (ps[k].t !== 'fun') continue;
    let j = k + 1;
    if (ps[j] && ps[j].t === 'esp') j++;
    const arg = ps[j];
    if (!arg || !(['var', 'num', 'grupo'].includes(arg.t) || (arg.t === 'otro' && /^[α-ωϑϕ]$/.test(arg.v))) || (arg.t === 'var' && FUNCIONES.has(arg.v))) continue;
    let fin = j;
    if (ps[j + 1] && ps[j + 1].t === 'otro' && ps[j + 1].v === '°') fin = j + 1;
    ps.splice(k, fin - k + 1, { t: 'ap', tex: `${pieza(ps[k])} ${ps.slice(j, fin + 1).map(pieza).join('')}` });
  }
  // fracciones: el numerador es el producto que hay a la izquierda (hasta + − = …); el denominador, un solo factor
  for (let k = ps.findIndex(p => p.t === 'op' && p.v === '/'); k >= 0; k = ps.findIndex(p => p.t === 'op' && p.v === '/')) {
    let a = k - 1;
    while (a >= 0) {
      const p = ps[a];
      if (p.t === 'op' || p.t === 'pal' || p.t === 'frac') break;
      if (p.t === 'esp') { const prev = ps[a - 1], next = ps[a + 1]; if ((prev && prev.v === '·') || (next && next.v === '·')) { a--; continue; } break; }
      a--;
    }
    const num = ps.slice(a + 1, k);
    let b = k + 1;
    if (ps[b] && ps[b].t === 'esp') b++;
    const den = ps[b] ? [ps[b]] : [];
    if (ps[b + 1] && ps[b + 1].t === 'otro' && ps[b + 1].v === '!') { den.push(ps[b + 1]); b++; }   // 2! en el denominador
    const f = { t: 'frac', tex: `\\frac{${operando(num) || '\\,'}}{${operando(den) || '\\,'}}` };
    ps.splice(a + 1, b - a, f);
  }
  let out = '';
  ps.forEach((p, i) => {
    if (p.t === 'esp' && ((ps[i - 1] && ps[i - 1].t === 'pal') || (ps[i + 1] && ps[i + 1].t === 'pal'))) out += '\\ ';   // espacio visible junto a una palabra
    else out += p.t === 'frac' ? p.tex : pieza(p);
  });
  // varias palabras seguidas -> un solo \text con sus espacios
  return out.replace(/ +/g, ' ').trim();
}
const aTex = s => tex(analizar(s.replace(/\u202f|&nbsp;/g, ' ')));

// ---------------------------------------------------------------- KaTeX
const errores = [];
function katexHtml(src, { display = false } = {}) {
  const t = aTex(src);
  try { return katex.renderToString((display || t.includes('\\frac') ? '\\displaystyle ' : '') + t, { throwOnError: true, strict: 'ignore', output: 'htmlAndMathml' }); }
  catch (e) { errores.push(`${src}  ->  ${t}  (${e.message.split('\n')[0]})`); return null; }
}
const desentidad = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

// ¿un <strong> es una fórmula? Tiene algún símbolo matemático y ninguna palabra de 4 letras o más
const esFormula = s => {
  const t = desentidad(s);
  if (/<[a-z]/i.test(s) || /[¿?¡]/.test(t)) return false;   // lleva etiquetas dentro o es una pregunta
  if (/[A-Za-zÁÉÍÓÚáéíóúÑñ]{4,}/.test(t)) return false;
  if (/^[A-Za-z]$/.test(t.trim())) return true;   // una variable sola: **k**
  return /[\d=+−·/√≥≤<>!⋯ℤℕ∈²³ⁿᵏʳ⁺⁻⁰¹⁴⁵⁶⁷⁸⁹()\[\]]/.test(t) && !/[.:]$/.test(t.trim());
};

// Amplía [a, b) a la fórmula completa que la rodea: símbolos, números, variables de una letra y espacios,
// hasta una palabra (2 letras o más, o «y», «o», «a», «e» sueltas), una coma o punto seguidos de espacio, «:» …
const MATE = /[0-9A-Za-z +\-−=≥≤<>·⋯…()\[\]²³ⁿᵏʳ⁺⁻⁰¹⁴⁵⁶⁷⁸⁹₀₁₂ₙₖ√!∈ℤℕ/α-ωϑϕ°]/;
const NEXOS = new Set(['y', 'o', 'a', 'e']);
function ampliar(s, a0, b0, min) {
  const palabra = (j, paso) => {   // ¿empieza en j (hacia paso) una palabra?
    let x = j, t = '';
    while (x >= 0 && x < s.length && LETRA.test(s[x])) { t = paso < 0 ? s[x] + t : t + s[x]; x += paso; }
    let y = j - paso, u = t;   // la palabra entera, también lo que queda hacia el otro lado («s|en» es «sen»)
    while (y >= 0 && y < s.length && LETRA.test(s[y])) { u = paso < 0 ? u + s[y] : s[y] + u; y -= paso; }
    if (FUNCIONES.has(u) || UNIDADES.has(u)) return false;
    return t.length >= 2 ? esPalabra(t) || !/^[A-Za-z]+$/.test(t) : NEXOS.has(t);
  };
  let a = a0;
  while (a - 1 >= min) {
    const c = s[a - 1];
    if (c === ',' && /\d/.test(s[a - 2] || '') && /\d/.test(s[a] || '')) { a--; continue; }
    if (!MATE.test(c)) break;
    if (LETRA.test(c) && palabra(a - 1, -1) && !/[₀₁₂₃ₙₖᵣ²³ⁿ]/.test(s[a] || '')) break;   // «a₁» es una variable, no la palabra «a»
    if (c === '·' && s[a - 2] === ' ' && s[a] === ' ') break;   // « · » separa partes de un título
    a--;
  }
  let b = b0;
  while (b < s.length) {
    const c = s[b];
    if (c === ',' && /\d/.test(s[b - 1] || '') && /\d/.test(s[b + 1] || '')) { b++; continue; }
    if (!MATE.test(c)) break;
    if (LETRA.test(c) && palabra(b, 1) && !/[₀₁₂₃ₙₖᵣ²³ⁿ]/.test(s[b + 1] || '')) break;
    if (c === '·' && s[b - 1] === ' ' && s[b + 1] === ' ') break;
    b++;
  }
  // sin espacios ni operadores colgando en los bordes, y con los paréntesis equilibrados
  while (a < a0 && /[ +\-−=≥≤<>·]/.test(s[a])) a++;
  while (b > b0 && /[ +\-−=≥≤<>·(\[]/.test(s[b - 1])) b--;
  const t = s.slice(a, b), eq = (x, y) => (t.split(x).length === t.split(y).length);
  return eq('(', ')') && eq('[', ']') ? [a, b] : [a0, b0];
}

// fracciones sueltas dentro de un texto sin etiquetas
const IZQ = /[0-9A-Za-z·!√²³ⁿᵏʳ⁺⁻⁰¹⁴⁵⁶⁷⁸⁹₀₁₂₃ₙₖᵣ₊₋]/;
function fraccionesEnTexto(txt) {
  let out = '', i = 0;
  const s = desentidad(txt);
  const esc = x => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let ultimo = 0;
  for (i = 0; i < s.length; i++) {
    if (s[i] !== '/' || !s[i - 1] || s[i - 1] === ' ' || !s[i + 1] || s[i + 1] === ' ' || s[i + 1] === '/') continue;
    // izquierda
    let a = i - 1;
    while (a >= ultimo) {
      const c = s[a];
      if (c === ')' || c === ']') { let d = 0; for (; a >= ultimo; a--) { if (s[a] === ')' || s[a] === ']') d++; else if (s[a] === '(' || s[a] === '[') { d--; if (!d) break; } } a--; continue; }
      if (IZQ.test(c)) { a--; continue; }
      break;
    }
    a++;
    // derecha
    let b = i + 1;
    if (s[b] === '√') b++;
    if (s[b] === '(') { let d = 0; for (; b < s.length; b++) { if (s[b] === '(') d++; else if (s[b] === ')') { d--; if (!d) { b++; break; } } } }
    else while (b < s.length && /[0-9A-Za-z]/.test(s[b])) { b++; if (/[A-Za-z]/.test(s[b - 1])) break; }
    while (b < s.length && /[²³ⁿᵏʳ⁺⁻⁰¹⁴⁵⁶⁷⁸⁹!₀₁₂₃ₙₖᵣ₊₋]/.test(s[b])) b++;
    if (a >= i || b <= i + 1 || /^\d+$/.test(s.slice(a, i)) && /^\d{4}$/.test(s.slice(i + 1, b))) continue;
    [a, b] = ampliar(s, a, b, ultimo);   // toda la fórmula que rodea a la fracción, no solo la fracción
    const k = katexHtml(s.slice(a, b), { display: true });
    if (!k) continue;
    out += esc(s.slice(ultimo, a)) + k;
    ultimo = b; i = b - 1;
  }
  return out + esc(s.slice(ultimo));
}

// HTML de una página -> con las fórmulas compuestas (no toca scripts, estilos, <title>, <template> ni los SVG de las figuras)
function mates(html) {
  const guardado = [];
  const guarda = h => `\u0000${guardado.push(h) - 1}\u0000`;
  // 1) eslabones de cadena (p.eq): la fórmula en grande
  html = html.replace(/<p class="eq"><strong>([\s\S]*?)<\/strong>/g, (m, f) => {
    if (!esFormula(f)) return m;
    const k = katexHtml(desentidad(f), { display: true });
    return k ? `<p class="eq"><span class="f">${guarda(k)}</span>` : m;
  });
  // 2) negritas que son fórmulas
  html = html.replace(/<strong>([^<]*?)<\/strong>/g, (m, f) => {
    if (!esFormula(f)) return m;
    const k = katexHtml(desentidad(f));
    return k ? `<strong class="f">${guarda(k)}</strong>` : m;
  });
  // 3) fracciones sueltas en el texto (fuera de etiquetas, scripts, estilos y lo ya compuesto)
  html = html.replace(/(<(script|style|title|template|svg)[\s\S]*?<\/\2>)|(<[^>]+>)|([^<]+)/g, (m, bloque, _t, etiqueta, texto) => {
    if (bloque || etiqueta) return m;
    if (!texto.includes('/')) return m;
    return texto.split(/(\u0000\d+\u0000)/).map(t => /^\u0000\d+\u0000$/.test(t) ? t : fraccionesEnTexto(t)).join('');
  });
  return html.replace(/\u0000(\d+)\u0000/g, (_, n) => guardado[+n]);
}

module.exports = { aTex, katexHtml, mates, errores };
