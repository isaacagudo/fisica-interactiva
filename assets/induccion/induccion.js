/* BI Ciencias · Demostración por inducción
   Tres piezas que se montan solas al cargar la página (sin dependencias):
   - [data-explorar="<id>"]  tabla con los primeros casos de un ejercicio (aritmética exacta con BigInt)
   - .guia[data-ej="<id>"]    pistas que se desbloquean de una en una, solución y progreso guardado
   - [data-domino]            fila de fichas de dominó con cuatro situaciones (base y paso, sin base, paso roto, empezar en 4)
   - [data-estado="<id>"]     etiqueta con el progreso guardado de un ejercicio (en la lista de ejercicios)
   Sin JavaScript, las pistas y la solución se ven como desplegables normales y las tablas no aparecen.
   En Node, require('./induccion.js') da { EXPLORAR, filas } para comprobar los datos. */
(function (root) {
  'use strict';
  const B = n => BigInt(n);
  const fact = n => { let f = 1n; for (let i = 2n; i <= B(n); i++) f *= i; return f; };
  const suma = (n, t) => { let s = 0n; for (let r = 1; r <= n; r++) s += t(B(r)); return s; };
  const gcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
  const frac = (p, q) => { const g = gcd(p, q) || 1n; return { p: p / g, q: q / g }; };
  const fsum = (a, b) => frac(a.p * b.q + b.p * a.q, a.q * b.q);

  // Cada ejercicio: tipo 'igual' (dos lados iguales), 'div' (múltiplo de d), '>' o '>=' (desigualdad), con los lados como funciones de n.
  const EXPLORAR = {
    // ---- nuevos, de menos a más
    'a1': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '1 + 2 + ⋯ + n', der: 'n(n + 1)/2', l: n => suma(n, r => r), r: n => B(n) * B(n + 1) / 2n },
    'a2': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '2 + 4 + ⋯ + 2n', der: 'n(n + 1)', l: n => suma(n, r => 2n * r), r: n => B(n) * B(n + 1) },
    'a3': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '1 + 3 + ⋯ + (2n − 1)', der: 'n²', l: n => suma(n, r => 2n * r - 1n), r: n => B(n) * B(n) },
    'a4': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '3 + 7 + ⋯ + (4n − 1)', der: 'n(2n + 1)', l: n => suma(n, r => 4n * r - 1n), r: n => B(n) * B(2 * n + 1) },
    'a5': { tipo: 'igual', desde: 1, hasta: 10, base: 1, izq: '1 + 2 + 4 + ⋯ + 2ⁿ⁻¹', der: '2ⁿ − 1', l: n => suma(n, r => 2n ** (r - 1n)), r: n => 2n ** B(n) - 1n },
    'a6': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '1/(1·2) + ⋯ + 1/(n(n + 1))', der: 'n/(n + 1)',
      l: n => { let s = frac(0n, 1n); for (let r = 1; r <= n; r++) s = fsum(s, frac(1n, B(r) * B(r + 1))); return s; }, r: n => frac(B(n), B(n + 1)) },
    'a7': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '1³ + 2³ + ⋯ + n³', der: 'n²(n + 1)²/4', l: n => suma(n, r => r ** 3n), r: n => (B(n) * B(n + 1)) ** 2n / 4n },
    'b1': { tipo: 'div', d: 2, desde: 1, hasta: 8, base: 1, izq: '3ⁿ − 1', v: n => 3n ** B(n) - 1n },
    'b2': { tipo: 'div', d: 4, desde: 1, hasta: 8, base: 1, izq: '5ⁿ − 1', v: n => 5n ** B(n) - 1n },
    'b3': { tipo: 'div', d: 2, desde: 1, hasta: 8, base: 1, izq: 'n² + n', v: n => B(n) * B(n) + B(n) },
    'b4': { tipo: 'div', d: 4, desde: 1, hasta: 8, base: 1, izq: '7ⁿ − 3ⁿ', v: n => 7n ** B(n) - 3n ** B(n) },
    'c1': { tipo: '>', desde: 1, hasta: 8, base: 1, izq: '2ⁿ', der: 'n', l: n => 2n ** B(n), r: n => B(n) },
    'c2': { tipo: '>=', desde: 1, hasta: 8, base: 1, izq: '3ⁿ', der: '2n + 1', l: n => 3n ** B(n), r: n => B(2 * n + 1) },
    'c3': { tipo: '>=', desde: 1, hasta: 8, base: 1, izq: 'n!', der: '2ⁿ⁻¹', l: n => fact(n), r: n => 2n ** B(n - 1) },
    // ---- diapositivas del Tema 1
    'd16-9': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '1² + 2² + ⋯ + n²', der: 'n(n + 1)(2n + 1)/6',
      l: n => suma(n, r => r * r), r: n => B(n) * B(n + 1) * B(2 * n + 1) / 6n },
    'd36-18': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '1·3 + 2·4 + ⋯ + n(n + 2)', der: 'n(n + 1)(2n + 7)/6',
      l: n => suma(n, r => r * (r + 2n)), r: n => B(n) * B(n + 1) * B(2 * n + 7) / 6n },
    'd33-4': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '1·1! + 2·2! + ⋯ + n·n!', der: '(n + 1)! − 1',
      l: n => suma(n, r => r * fact(r)), r: n => fact(n + 1) - 1n },
    'd34-8': { tipo: 'igual', desde: 1, hasta: 8, base: 1, izq: '1 + 2·(1/2) + ⋯ + n·(1/2)ⁿ⁻¹', der: '4 − (n + 2)/2ⁿ⁻¹',
      l: n => { let s = frac(0n, 1n); for (let r = 1; r <= n; r++) s = fsum(s, frac(B(r), 2n ** B(r - 1))); return s; },
      r: n => fsum(frac(4n, 1n), frac(-B(n + 2), 2n ** B(n - 1))) },
    'd16-6': { tipo: 'div', d: 3, desde: 1, hasta: 8, base: 1, izq: '4ⁿ + 2', v: n => 4n ** B(n) + 2n },
    'd36-17': { tipo: 'div', d: 8, desde: 1, hasta: 9, base: 1, impares: true, izq: '7ⁿ + 1', v: n => 7n ** B(n) + 1n },
    'd16-7': { tipo: 'div', d: 3, desde: 1, hasta: 8, base: 1, izq: 'n³ + 11n', v: n => B(n) ** 3n + 11n * B(n) },
    'd16-8': { tipo: 'div', d: 6, desde: 1, hasta: 8, base: 1, izq: 'n(n² + 5)', v: n => B(n) * (B(n) ** 2n + 5n) },
    'd16-4': { tipo: '>', desde: 1, hasta: 10, base: 7, izq: 'n!', der: '3ⁿ', l: n => fact(n), r: n => 3n ** B(n) },
    'd16-5': { tipo: '>=', desde: 1, hasta: 7, base: 1, izq: '(2n)!', der: '2ⁿ(n!)²', l: n => fact(2 * n), r: n => 2n ** B(n) * fact(n) ** 2n },
    'd35-10': { tipo: '>', real: true, desde: 1, hasta: 8, base: 2, izq: '1/√1 + 1/√2 + ⋯ + 1/√n', der: '√n',
      l: n => { let s = 0; for (let r = 1; r <= n; r++) s += 1 / Math.sqrt(r); return s; }, r: n => Math.sqrt(n) },
  };

  // ---------------------------------------------------------------- formato de números en español
  const grupos = s => { const neg = s[0] === '-', d = neg ? s.slice(1) : s; const t = d.length > 4 ? d.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : d; return (neg ? '−' : '') + t; };
  const fmt = (x, real) => {
    if (real) return x.toFixed(4).replace('.', ',');
    if (typeof x === 'object') return x.q === 1n ? grupos(String(x.p)) : `<span class="fr"><span class="nu">${grupos(String(x.p))}</span><span class="de">${grupos(String(x.q))}</span></span>`;
    return grupos(String(x));
  };
  const cmp = (a, b, real) => {
    if (real) return Math.abs(a - b) < 1e-12 ? 0 : a > b ? 1 : -1;
    if (typeof a === 'object') { const x = a.p * b.q - b.p * a.q; return x === 0n ? 0 : x > 0n ? 1 : -1; }
    return a === b ? 0 : a > b ? 1 : -1;
  };
  // Filas de la tabla: { n, celdas: [..], ok, nota }
  function filas(id) {
    const e = EXPLORAR[id], out = [];
    for (let n = e.desde; n <= e.hasta; n++) {
      if (e.tipo === 'div') {
        const v = e.v(n), d = B(e.d), q = v / d, ok = v % d === 0n;
        const par = e.impares && n % 2 === 0;
        out.push({ n, celdas: [fmt(v), ok ? `${e.d} · ${fmt(q)}` : `${e.d} · ${fmt(q)} + ${fmt(v % d)}`], ok, nota: par ? 'n par: fuera del enunciado' : '' });
      } else {
        const l = e.l(n), r = e.r(n), c = cmp(l, r, e.real);
        const ok = e.tipo === 'igual' ? c === 0 : e.tipo === '>' ? c > 0 : c >= 0;
        out.push({ n, celdas: [fmt(l, e.real), fmt(r, e.real)], ok, nota: '' });
      }
    }
    return out;
  }

  if (typeof document === 'undefined') { if (typeof module !== 'undefined') module.exports = { EXPLORAR, filas }; return; }

  const h = (tag, attrs = {}, html = '') => { const el = document.createElement(tag); for (const k in attrs) el.setAttribute(k, attrs[k]); el.innerHTML = html; return el; };
  const store = {
    get(id) { try { return JSON.parse(localStorage.getItem('induccion:' + id)) || {}; } catch (_) { return {}; } },
    set(id, v) { try { localStorage.setItem('induccion:' + id, JSON.stringify(v)); } catch (_) { /* sin almacenamiento */ } },
  };

  // ---------------------------------------------------------------- tabla de primeros casos
  function montarExplorar(el) {
    const id = el.dataset.explorar, e = EXPLORAR[id];
    if (!e) return;
    const signo = { igual: '=', '>': '>', '>=': '≥' }[e.tipo];
    const tpl = c => { const t = el.querySelector('template.' + c); return t ? t.innerHTML : null; };   // cabeceras ya compuestas (KaTeX) por el generador
    const izq = tpl('izq') || e.izq, der = tpl('der') || e.der;
    const btn = h('button', { type: 'button', class: 'btn primary' }, 'Calcular los primeros casos');
    const caja = h('div', { class: 'explorar-tabla', hidden: '' });
    const cab = e.tipo === 'div'
      ? `<tr><th>n</th><th>${izq}</th><th>Dividido entre ${e.d}</th><th>¿Múltiplo de ${e.d}?</th></tr>`
      : `<tr><th>n</th><th>${izq}</th><th>${der}</th><th>¿Izquierda ${signo} derecha?</th></tr>`;
    const cuerpo = filas(id).map(f => {
      const cls = [f.n === e.base ? 'base' : '', f.ok ? '' : 'falla', f.n < e.base ? 'antes' : ''].filter(Boolean).join(' ');
      const marca = f.ok ? '<span class="si">Sí</span>' : '<span class="no">No</span>';
      return `<tr${cls ? ` class="${cls}"` : ''}><td>${f.n}${f.n === e.base ? ' <span class="tag-base">caso base</span>' : ''}</td><td class="num">${f.celdas[0]}</td><td class="num">${f.celdas[1]}</td><td>${marca}${f.nota ? ` <small>${f.nota}</small>` : ''}</td></tr>`;
    }).join('');
    caja.innerHTML = `<div class="table-wrap"><table><thead>${cab}</thead><tbody>${cuerpo}</tbody></table></div>`;
    const fallos = filas(id).filter(f => !f.ok && !(EXPLORAR[id].impares && f.n % 2 === 0));
    const msg = h('p', { class: 'explorar-msg' }, fallos.length
      ? `Falla para n = ${fallos.map(f => f.n).join(', ')}. Por eso el caso base es k = ${e.base}: la primera ficha que cae.`
      : e.impares ? 'Se cumple para todos los impares, y falla para los pares: el dominó va de 2 en 2.'
        : `Se cumple en todos los casos de la tabla, desde k = ${e.base}. Pero comprobar casos no es demostrar: ahora toca la inducción.`);
    caja.appendChild(msg);
    btn.addEventListener('click', () => { const ver = caja.hidden; caja.hidden = !ver; btn.textContent = ver ? 'Ocultar la tabla' : 'Calcular los primeros casos'; });
    el.replaceChildren(btn, caja);
  }

  // ---------------------------------------------------------------- pistas desbloqueables
  function montarGuia(g) {
    const id = g.dataset.ej, pistas = [...g.querySelectorAll('details.pista')], sol = g.querySelector('details.sol');
    const estado = g.querySelector('.estado'), s = store.get(id);
    let usadas = Math.min(s.pistas || 0, pistas.length);
    g.classList.add('js');
    const pintar = () => {
      pistas.forEach((p, i) => { p.hidden = i > usadas; p.classList.toggle('usada', i < usadas); });
      const sg = store.get(id);
      estado.hidden = false;
      const txt = sg.hecho ? `Resuelto ${sg.pistas ? `con ${sg.pistas} ${sg.pistas === 1 ? 'pista' : 'pistas'}` : 'sin pistas'}${sg.sol ? ' (mirando la solución)' : ''}.` : `Pistas usadas: ${usadas} de ${pistas.length}.`;
      estado.querySelector('.txt').textContent = txt;
      estado.querySelector('.hecho').hidden = !!sg.hecho;
    };
    pistas.forEach((p, i) => p.addEventListener('toggle', () => {
      if (p.open && i >= usadas) { usadas = i + 1; const sg = store.get(id); sg.pistas = usadas; store.set(id, sg); pintar(); }
    }));
    sol.addEventListener('toggle', () => { if (sol.open) { const sg = store.get(id); sg.sol = true; store.set(id, sg); pintar(); } });
    estado.querySelector('.hecho').addEventListener('click', () => { const sg = store.get(id); sg.hecho = true; sg.pistas = usadas; store.set(id, sg); pintar(); });
    estado.querySelector('.reset').addEventListener('click', () => { store.set(id, {}); usadas = 0; pistas.forEach(p => { p.open = false; }); sol.open = false; pintar(); });
    pintar();
  }

  // ---------------------------------------------------------------- etiqueta de progreso en la lista de ejercicios
  function montarEstado(el) {
    const s = store.get(el.dataset.estado);
    if (s.hecho) { el.textContent = s.pistas ? `Hecho · ${s.pistas} ${s.pistas === 1 ? 'pista' : 'pistas'}` : 'Hecho · sin pistas'; el.className = 'tag hecho'; el.hidden = false; }
    else if (s.pistas || s.sol) { el.textContent = 'Empezado'; el.className = 'tag empezado'; el.hidden = false; }
  }

  // ---------------------------------------------------------------- dominó
  const ESCENAS = [
    { id: 'todo', nombre: 'Caso base y paso', empuje: 1, falsa: [], texto: 'Cae la primera (caso base) y cada una tira a la siguiente (paso inductivo): caen todas. La afirmación es cierta para todo n.' },
    { id: 'sinbase', nombre: 'Sin caso base', empuje: 0, falsa: [], texto: 'El paso inductivo funciona, pero nadie empuja la primera ficha: no cae ninguna. Es lo que pasa con «n² + n es impar».' },
    { id: 'roto', nombre: '2ⁿ ≥ n² desde 1', empuje: 1, falsa: [3], texto: 'Para 2ⁿ ≥ n² empezando en 1: caen la 1 y la 2, pero la 3 es falsa (8 < 9) y no cae. La cadena se rompe y no demuestra nada más.' },
    { id: 'desde4', nombre: '2ⁿ ≥ n² desde 4', empuje: 4, falsa: [3], texto: 'Empezando en 4 (caso base 2⁴ ≥ 4²) caen todas las fichas desde la 4. La 1 y la 2 son ciertas, pero quedan fuera de esta demostración.' },
  ];
  function montarDomino(el) {
    const N = 12, W = 14, H = 62, S = 52, X0 = 34, Y = 112, ang = Math.asin((S - W) / H) * 180 / Math.PI;
    const fichas = Array.from({ length: N }, (_, i) => {
      const x = X0 + i * S;
      return `<g class="ficha" data-n="${i + 1}"><g class="gira" style="transform-origin:${x + W}px ${Y}px"><rect x="${x}" y="${Y - H}" width="${W}" height="${H}" rx="2.5"/><circle cx="${x + W / 2}" cy="${Y - H * 0.72}" r="2.2"/><circle cx="${x + W / 2}" cy="${Y - H * 0.28}" r="2.2"/><line x1="${x + 2}" y1="${Y - H / 2}" x2="${x + W - 2}" y2="${Y - H / 2}"/></g><text x="${x + W / 2}" y="${Y + 20}" text-anchor="middle">${i + 1}</text><text class="mal" x="${x + W / 2}" y="${Y - H - 8}" text-anchor="middle">✗</text></g>`;
    }).join('');
    el.innerHTML = `<div class="domino-esc" role="group" aria-label="Situación">${ESCENAS.map((e, i) => `<button type="button" class="btn${i ? '' : ' primary'}" data-i="${i}">${e.nombre}</button>`).join('')}</div>
<svg viewBox="0 0 ${X0 * 2 + (N - 1) * S + W + H - 20} 142" role="img" aria-label="Fila de fichas de dominó numeradas del 1 al 12"><line class="suelo" x1="8" y1="${Y}" x2="${X0 * 2 + (N - 1) * S + W - 8}" y2="${Y}"/>${fichas}<g class="mano"><line x1="0" y1="${Y - 40}" x2="0" y2="${Y - 40}"/><polygon points="0,0 0,0 0,0"/></g></svg>
<p class="domino-txt" aria-live="polite"></p>
<div class="domino-acc"><button type="button" class="btn primary empujar">Empujar</button><button type="button" class="btn levantar">Levantar las fichas</button></div>`;
    const reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gs = [...el.querySelectorAll('.ficha')], txt = el.querySelector('.domino-txt'), mano = el.querySelector('.mano');
    let esc = ESCENAS[0], timers = [];
    const limpiar = () => { timers.forEach(clearTimeout); timers = []; };
    const levantar = () => {
      limpiar();
      gs.forEach((g, i) => {
        const n = i + 1, falsa = esc.falsa.includes(n), fuera = esc.empuje > 1 && n < esc.empuje && !falsa;
        g.classList.remove('cae'); g.classList.toggle('falsa', falsa); g.classList.toggle('fuera', fuera);
        g.querySelector('.gira').style.transform = '';
      });
      // flecha de empuje sobre la primera ficha (o tachada si no hay caso base)
      const k = Math.max(esc.empuje, 1), x = X0 + (k - 1) * S - 6;
      mano.innerHTML = esc.empuje ? `<line x1="${x - 26}" y1="${Y - H + 10}" x2="${x - 6}" y2="${Y - H + 10}"/><polygon points="${x},${Y - H + 10} ${x - 9},${Y - H + 5} ${x - 9},${Y - H + 15}"/>`
        : `<text x="${X0 - 8}" y="${Y - H - 10}" class="nadie">nadie empuja</text>`;
      txt.textContent = esc.texto;
    };
    const empujar = () => {
      levantar();
      if (!esc.empuje) { txt.textContent = 'No pasa nada: ' + esc.texto.charAt(0).toLowerCase() + esc.texto.slice(1); return; }
      let i = esc.empuje - 1, paso = 0;
      while (i < N && !esc.falsa.includes(i + 1)) {
        const g = gs[i], ultima = i === N - 1, siguienteFalsa = esc.falsa.includes(i + 2);
        const a = ultima ? 84 : ang * (siguienteFalsa ? 1 : 1);
        const t = reduce ? 0 : paso * 230;
        timers.push(setTimeout(() => { g.classList.add('cae'); g.querySelector('.gira').style.transform = `rotate(${a}deg)`; }, t));
        i++; paso++;
      }
    };
    el.querySelectorAll('.domino-esc .btn').forEach(b => b.addEventListener('click', () => {
      esc = ESCENAS[+b.dataset.i];
      el.querySelectorAll('.domino-esc .btn').forEach(x => x.classList.toggle('primary', x === b));
      empujar();
    }));
    el.querySelector('.empujar').addEventListener('click', empujar);
    el.querySelector('.levantar').addEventListener('click', levantar);
    levantar();
  }

  const montar = () => {
    document.querySelectorAll('[data-explorar]').forEach(montarExplorar);
    document.querySelectorAll('.guia[data-ej]').forEach(montarGuia);
    document.querySelectorAll('[data-estado]').forEach(montarEstado);
    document.querySelectorAll('[data-domino]').forEach(montarDomino);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})(typeof window !== 'undefined' ? window : globalThis);
