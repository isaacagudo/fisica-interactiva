/* Física interactiva · generador de exámenes (núcleo)
   Cada tema registra sus apartados y sus patrones de ejercicio (assets/examen/<tema>.js):
     FisicaExamen.registrar({ tema: 'energia', nombre: '…', apartados: [{ slug, nombre, icono, patrones: [patrón, …] }] })
   Un patrón es un tipo de ejercicio con datos aleatorios:
     { id, titulo, peso (puntos relativos, 2 por defecto),
       datos(r)            -> objeto con los datos elegidos al azar (r: generador con int, step, pick, chance…)
       enunciado(d, f)     -> HTML del enunciado (f: formato de números)
       solucion(d, f)      -> { resultado: HTML corto, pasos: HTML de la solución, val: { números para comprobar } }
       sim(d)              -> opcional, { widget, cfg } para ver la simulación con esos mismos datos }
   El examen es reproducible: la semilla, los apartados y el número de ejercicios van en la dirección.
   En Node: require('./generador.js') da { crearRng, formato, generar, registrar, temas }. */
(function (root) {
  'use strict';
  const temas = {};
  function registrar(t) { temas[t.tema] = t; return t; }

  // ---------------------------------------------------------------- números aleatorios con semilla (mulberry32)
  function crearRng(seed) {
    let a = seed >>> 0;
    const next = () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const r = {
      next,
      int: (a, b) => a + Math.floor(next() * (b - a + 1)),
      step: (a, b, s) => { const n = Math.round((b - a) / s); return +(a + s * Math.floor(next() * (n + 1))).toFixed(6); },
      pick: arr => arr[Math.floor(next() * arr.length)],
      chance: p => next() < p,
      shuffle: arr => { const x = arr.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; },
    };
    return r;
  }

  // ---------------------------------------------------------------- formato de números en español
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const fx = (x, n) => { const r = Number(x.toFixed(n)); return (Object.is(r, -0) ? 0 : r).toFixed(n).replace('.', ','); };
  const miles = s => { const neg = s.startsWith('-'); let [e, d] = (neg ? s.slice(1) : s).split(','); if (e.length > 4) e = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return (neg ? '−' : '') + e + (d !== undefined ? ',' + d : ''); };
  // n(x, cifras): cifras significativas; notación científica para |x| ≥ 100 000 o < 0,001
  function n(x, sig = 3) {
    if (!isFinite(x)) return '—';
    if (x === 0) return '0';
    const ax = Math.abs(x);
    if (ax >= 1e5 || ax < 1e-3) {
      let e = Math.floor(Math.log10(ax)), m = x / 10 ** e;
      if (Math.abs(Number(m.toFixed(sig - 1))) >= 10) { e += 1; m = x / 10 ** e; }
      return miles(fx(m, sig - 1)) + '·10' + String(e).split('').map(c => SUP[c]).join('');
    }
    const d = Math.max(0, Math.min(6, sig - 1 - Math.floor(Math.log10(ax))));
    return miles(fx(x, d));
  }
  // d(x): dato tal cual (sin ceros de relleno): 0.25 -> 0,25; 1200 -> 1200
  const d = x => { if (Number.isInteger(x)) return (x < 0 ? '−' : '') + Math.abs(x); const s = String(+x.toFixed(6)).replace('.', ','); return s.startsWith('-') ? '−' + s.slice(1) : s; };
  const formato = { n, d, fx: (x, k) => miles(fx(x, k)), sg: (x, sig) => (x < 0 ? '(' + n(x, sig) + ')' : n(x, sig)) };

  // ---------------------------------------------------------------- generar un examen
  // sel: { tema: [slugs de apartados] }, cuantos: número de ejercicios, semilla: entero
  function generar(sel, cuantos, semilla) {
    const r = crearRng(semilla);
    const aps = [];
    for (const t in sel) { const T = temas[t]; if (!T) continue; for (const a of T.apartados) if (sel[t].includes(a.slug) && a.patrones.length) aps.push({ tema: T, ap: a }); }
    if (!aps.length) return [];
    // reparto: tantas vueltas como haga falta por los apartados elegidos (en orden aleatorio), sin repetir patrón en un apartado hasta agotarlos
    const orden = r.shuffle(aps), bolsas = new Map(), out = [];
    for (let k = 0; k < cuantos; k++) {
      const x = orden[k % orden.length];
      if (!bolsas.has(x.ap) || !bolsas.get(x.ap).length) bolsas.set(x.ap, r.shuffle(x.ap.patrones));
      const pat = bolsas.get(x.ap).pop();
      let datos = null;
      for (let i = 0; i < 200 && !datos; i++) { const cand = pat.datos(r); if (cand) datos = cand; }
      const sol = pat.solucion(datos, formato);
      out.push({ tema: x.tema, apartado: x.ap, patron: pat, datos, enunciado: pat.enunciado(datos, formato), solucion: sol, sim: pat.sim ? pat.sim(datos) : null, peso: pat.peso || 2 });
    }
    // agrupar por apartado en el orden de los apartados del tema (como un examen de verdad)
    const pos = new Map(aps.map((x, i) => [x.ap, i]));
    out.sort((a, b) => pos.get(a.apartado) - pos.get(b.apartado));
    // puntuación sobre 10, en cuartos de punto
    const tot = out.reduce((s, e) => s + e.peso, 0);
    let pts = out.map(e => Math.max(0.25, Math.round(e.peso / tot * 10 * 4) / 4));
    let diff = Math.round((10 - pts.reduce((a, b) => a + b, 0)) * 4);
    for (let i = 0; diff !== 0 && i < 400; i++) { const k = i % pts.length; if (diff > 0) { pts[k] += 0.25; diff--; } else if (pts[k] > 0.5) { pts[k] -= 0.25; diff++; } }
    out.forEach((e, i) => { e.puntos = pts[i]; });
    return out;
  }

  const api = { registrar, temas, crearRng, formato, generar };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') root.FisicaExamen = Object.assign(root.FisicaExamen || {}, api);
})(typeof window !== 'undefined' ? window : globalThis);
