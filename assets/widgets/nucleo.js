/* Física interactiva · núcleo común de los simuladores
   Lo usan bloque.js, plano.js, tiro.js, potencia.js, calentador.js y vectores.js (muelle.js es independiente).
   Cada simulador define su física y su dibujo; el núcleo pone el resto: título, botones de situación y de ejemplos,
   escena SVG, lectura de valores, barra de energías, reproducción (play, tiempo, velocidad), deslizadores,
   resultados con fórmulas y la gráfica de energía frente al tiempo.
   Se carga antes que los simuladores:
     <script src="…/assets/widgets/nucleo.js" defer></script>
     <script src="…/assets/widgets/bloque.js" defer></script>
     <div data-widget="bloque" data-config='{"m": 5, "F": 30, "alpha": 30, "mu": 0.2, "hasta": "t", "t": 10}'></div>
   En Node: require('./nucleo.js') devuelve { util } con el motor de movimiento para comprobar ejercicios. */
(function (root) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const G0 = 9.8;

  // ------------------------------------------------------------------ utilidades
  const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
  const rad = d => d * Math.PI / 180;
  const fmt = (x, n = 2) => { if (!isFinite(x)) return '—'; const r = Number(x.toFixed(n)); return (Object.is(r, -0) ? 0 : r).toFixed(n).replace('.', ','); };
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const miles = s => { const [e, d] = s.split(','); const neg = e.startsWith('-'); let a = neg ? e.slice(1) : e; if (a.length > 4) a = a.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return (neg ? '−' : '') + a + (d !== undefined ? ',' + d : ''); };
  // número con «sig» cifras significativas; notación científica fuera de [0,001; 100 000)
  function num(x, sig = 3) {
    if (!isFinite(x)) return '—';
    if (x === 0) return '0';
    const ax = Math.abs(x);
    if (ax >= 1e5 || ax < 1e-3) {
      let e = Math.floor(Math.log10(ax)), m = x / 10 ** e;
      if (Math.abs(Number(m.toFixed(sig - 1))) >= 10) { e += 1; m = x / 10 ** e; }
      return miles(fmt(m, sig - 1)) + '·10' + String(e).split('').map(c => SUP[c]).join('');
    }
    const d = Math.max(0, Math.min(5, sig - 1 - Math.floor(Math.log10(ax))));
    return miles(fmt(x, d));
  }
  function niceStep(raw) { if (!(raw > 0)) return 1; const q = 10 ** Math.floor(Math.log10(raw)), f = raw / q; return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * q; }
  function zig(x1, y1, x2, y2, n, amp) {
    const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L, px = -uy, py = ux;
    const end = Math.min(10, L / 6), seg = (L - 2 * end) / (2 * n);
    let d = `M${x1} ${y1}L${x1 + ux * end} ${y1 + uy * end}`;
    for (let i = 0; i < 2 * n; i++) { const tt = end + seg * (i + 0.5), s = i % 2 ? -amp : amp; d += `L${(x1 + ux * tt + px * s).toFixed(1)} ${(y1 + uy * tt + py * s).toFixed(1)}`; }
    return d + `L${x2 - ux * end} ${y2 - uy * end}L${x2} ${y2}`;
  }

  /* Motor de movimiento en una dimensión con aceleración constante a trozos (resultado exacto, sin integrar).
     opts.s0, opts.v0     posición y velocidad iniciales sobre la trayectoria
     opts.bordes          posiciones donde cambia la aceleración (cambio de tramo, zona de madera…)
     opts.sMin, sMax      extremos de la trayectoria: al llegar se termina (fin 'min' o 'max')
     opts.acel(s, sv)     aceleración en el tramo que contiene s cuando el cuerpo se mueve con signo sv (±1)
     opts.arranque(s)     aceleración desde el reposo en s (0 si el rozamiento lo sujeta)
     opts.tMax, opts.dMax tiempo o distancia recorrida máximos (fin 'tiempo' o 'distancia')
     opts.alParar(s)      true si al pararse (v = 0) debe terminar aunque pudiera volver a arrancar
     Devuelve { fases, T, fin, estado(t) → { s, v, a, d } } con d = distancia recorrida acumulada. */
  function mover(o) {
    const fases = [], eps = 1e-12, bordes = (o.bordes || []).slice().sort((a, b) => a - b);
    let t = 0, s = o.s0, v = o.v0 || 0, d = 0, fin = 'tiempo';
    const tMax = o.tMax ?? Infinity, dMax = o.dMax ?? Infinity, sMin = o.sMin ?? -Infinity, sMax = o.sMax ?? Infinity;
    for (let k = 0; k < 400; k++) {
      let a, dir;
      if (Math.abs(v) < 1e-12) {
        v = 0;
        if (k > 0 && o.alParar && o.alParar(s)) { fin = 'parado'; break; }
        a = o.arranque(s);
        if (Math.abs(a) < 1e-12) { fin = 'parado'; break; }
        dir = Math.sign(a);
      } else { dir = Math.sign(v); a = o.acel(s + dir * 1e-9, dir); }
      // siguiente suceso: borde, extremo, v = 0, tiempo o distancia máximos
      let tau = Math.max(0, tMax - t), ev = 'tiempo';
      const targets = bordes.filter(b => dir > 0 ? b > s + 1e-9 : b < s - 1e-9);
      if (dir > 0 && sMax < Infinity) targets.push(sMax); if (dir < 0 && sMin > -Infinity) targets.push(sMin);
      const tHit = b => { const ds = b - s; if (Math.abs(a) < 1e-14) return v !== 0 && ds / v > 0 ? ds / v : Infinity; const disc = v * v + 2 * a * ds; if (disc < 0) return Infinity; const r = Math.sqrt(disc); const c = [(-v + r) / a, (-v - r) / a].filter(x => x > 1e-15); return c.length ? Math.min(...c) : Infinity; };
      let bHit = null;
      for (const b of targets) { const th = tHit(b); if (th < tau - 1e-15) { tau = th; ev = 'borde'; bHit = b; } }
      if (a * (v || dir) < 0 && v !== 0) { const ts = -v / a; if (ts < tau - 1e-15) { tau = ts; ev = 'para'; bHit = null; } }
      // distancia máxima (la distancia recorrida crece con |v| dentro de una fase: v no cambia de signo)
      if (dMax < Infinity) { const left = dMax - d; const th = tHit(s + dir * left); if (th < tau - 1e-15) { tau = th; ev = 'distancia'; bHit = s + dir * left; } }
      if (!isFinite(tau)) tau = 1e6;
      fases.push({ t0: t, s0: s, v0: v, a, dur: tau, d0: d });
      const s1 = bHit !== null ? bHit : s + v * tau + 0.5 * a * tau * tau;
      d += Math.abs(s1 - s); s = s1; v = ev === 'para' ? 0 : v + a * tau; t += tau;
      if (ev === 'tiempo') { fin = 'tiempo'; break; }
      if (ev === 'distancia') { fin = 'distancia'; break; }
      if (ev === 'borde' && bHit === sMax) { fin = 'max'; break; }
      if (ev === 'borde' && bHit === sMin) { fin = 'min'; break; }
    }
    const T = t;
    function estado(tt) {
      tt = clamp(tt, 0, T);
      let f = fases[fases.length - 1];
      for (const ph of fases) if (tt <= ph.t0 + ph.dur + eps) { f = ph; break; }
      if (!f) return { s: o.s0, v: o.v0 || 0, a: 0, d: 0 };
      const tau = clamp(tt - f.t0, 0, f.dur);
      const s1 = f.s0 + f.v0 * tau + 0.5 * f.a * tau * tau;
      return { s: s1, v: f.v0 + f.a * tau, a: f.a, d: f.d0 + Math.abs(s1 - f.s0) };
    }
    return { fases, T, fin, estado, sFin: s, vFin: v, dFin: d };
  }

  const util = { G0, clamp, rad, fmt, num, miles, niceStep, zig, mover };

  // ------------------------------------------------------------------ estilos
  const CSS = `
.fw{--c-k:#b4407e;--c-a:#7b4fd6;container-type:inline-size;display:block;margin:16px 0;font-family:var(--f-body)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .fw{--c-k:#f08cc0;--c-a:#b39bff}}
:root[data-theme="dark"] .fw{--c-k:#f08cc0;--c-a:#b39bff}
.fw *{box-sizing:border-box}
.fw .fw-box{background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:12px;display:grid;gap:12px}
.fw .fw-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px 12px}
.fw .fw-title{font:700 1rem var(--f-display);margin:0}
.fw .fw-tag{font:600 11px var(--f-mono);letter-spacing:.04em;text-transform:uppercase;border:1px solid var(--c-p);color:var(--c-p);border-radius:999px;padding:2px 7px}
.fw .fw-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1fr)}
.fw .fw-grid>*{min-width:0}
@container (min-width: 860px){.fw-full .fw-grid{grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr);align-items:start}}
@container (min-width: 640px){.fw-compact .fw-params{grid-template-columns:repeat(2,minmax(0,1fr))}}
.fw .fw-col{display:grid;gap:12px;align-content:start;min-width:0}
.fw .fw-panel{border:1px solid var(--rule);border-radius:10px;padding:10px 12px;background:var(--sheet)}
.fw .fw-panel h3{font:700 .95rem var(--f-display);margin:0 0 6px}
.fw .fw-tabs,.fw .fw-ex{display:flex;flex-wrap:wrap;gap:6px}
.fw .fw-tabs button,.fw .fw-ex button{appearance:none;font:600 13px var(--f-body);border:1px solid var(--rule);background:var(--sheet);color:var(--ink-2);border-radius:999px;padding:6px 12px;cursor:pointer;min-height:34px}
.fw .fw-tabs button[aria-pressed="true"],.fw .fw-ex button[aria-pressed="true"]{background:var(--ink);color:var(--sheet);border-color:var(--ink)}
.fw .fw-ex button:hover,.fw .fw-tabs button:hover{border-color:var(--ink-2);color:var(--ink)}
.fw .fw-ex button[aria-pressed="true"]:hover{color:var(--sheet)}
.fw .fw-scene{border-radius:8px;border:1px solid var(--rule);overflow:hidden}
.fw .fw-scene svg{display:block;width:100%;height:auto}
.fw .fw-scene text,.fw .fw-chart text{font-family:var(--f-body)}
.fw-floor{stroke:var(--plane-edge);stroke-width:1.4}
.fw-band{fill:var(--plane)}
.fw-plane{fill:var(--plane);stroke:var(--plane-edge);stroke-width:1.3}
.fw-wood{fill:#c99a62;fill-opacity:.35;stroke:#9a6b36;stroke-width:1.2}
.fw-body{fill:var(--sheet);stroke:var(--ink);stroke-width:1.8}
.fw-ghost{fill:none;stroke:var(--ink-2);stroke-width:1.3;stroke-dasharray:4 4}
.fw-ref{stroke:var(--ink-2);stroke-width:1.1;stroke-dasharray:6 5;fill:none}
.fw-dim{stroke:var(--ink-2);stroke-width:1.1;fill:none}
.fw-trail{fill:none;stroke:var(--ink-2);stroke-width:1.4;stroke-dasharray:2 4}
.fw-lbl{fill:var(--ink-2);font-size:12.5px}
.fw-lbl-ink{fill:var(--ink);font-size:13.5px;font-weight:700}
.fw-annot{fill:var(--ink);font-size:14px;font-weight:700}
.fw-arrow line{stroke-width:2.6;stroke-linecap:round}
.fw-arrow text{font-size:14px;font-weight:700;dominant-baseline:middle}
.fw-a-p line{stroke:var(--c-p)} .fw-a-p polygon,.fw-a-p text{fill:var(--c-p)}
.fw-a-n line{stroke:var(--c-n)} .fw-a-n polygon,.fw-a-n text{fill:var(--c-n)}
.fw-a-fr line{stroke:var(--c-fr)} .fw-a-fr polygon,.fw-a-fr text{fill:var(--c-fr)}
.fw-a-v line{stroke:var(--c-v)} .fw-a-v polygon,.fw-a-v text{fill:var(--c-v)}
.fw-a-f line{stroke:var(--c-a)} .fw-a-f polygon,.fw-a-f text{fill:var(--c-a)}
.fw-a-k line{stroke:var(--c-k)} .fw-a-k polygon,.fw-a-k text{fill:var(--c-k)}
.fw-a-i line{stroke:var(--ink)} .fw-a-i polygon,.fw-a-i text{fill:var(--ink)}
.fw .fw-read{display:flex;flex-wrap:wrap;gap:2px 14px;font-family:var(--f-mono);font-size:12.5px;color:var(--ink-2);font-variant-numeric:tabular-nums}
.fw .fw-read b{color:var(--ink);font-weight:600}
.fw .fw-read .ph{font-family:var(--f-body);font-weight:700;color:var(--ink)}
.fw .fw-ebar{display:flex;height:14px;border-radius:7px;overflow:hidden;background:var(--grid)}
.fw .fw-ebar>div{height:100%;width:0}
.fw .fw-leg{display:flex;flex-wrap:wrap;gap:2px 14px;font-size:12.5px;color:var(--ink-2);font-variant-numeric:tabular-nums}
.fw .fw-leg span{display:inline-flex;align-items:center;gap:5px}
.fw .fw-leg i{width:10px;height:10px;border-radius:3px;display:inline-block}
.fw .fw-leg b{font-family:var(--f-mono);font-weight:600;color:var(--ink)}
.fw .fw-ctrl{display:flex;align-items:center;gap:8px}
.fw .fw-ctrl input[type=range]{flex:1;min-width:40px;accent-color:var(--c-p)}
.fw .fw-btn{appearance:none;border:1px solid var(--rule);background:var(--sheet);color:var(--ink);border-radius:9px;min-height:38px;min-width:38px;padding:0 12px;display:inline-flex;align-items:center;justify-content:center;gap:6px;font:600 13.5px var(--f-body);cursor:pointer}
.fw .fw-btn.pri{background:var(--ink);color:var(--sheet);border-color:var(--ink)}
.fw .fw-btn svg{width:16px;height:16px;fill:currentColor}
.fw .fw-speed{display:inline-flex;border:1px solid var(--rule);border-radius:9px;overflow:hidden}
.fw .fw-speed button{appearance:none;border:0;background:var(--sheet);color:var(--ink-2);font:600 12.5px var(--f-mono);padding:0 8px;min-height:36px;cursor:pointer}
.fw .fw-speed button[aria-pressed="true"]{background:var(--ink);color:var(--sheet)}
.fw .fw-slow{font-size:12px;color:var(--ink-2);margin:-6px 0 0}
@container (max-width: 480px){.fw .fw-playlbl{display:none}.fw .fw-read{font-size:11.5px;gap:0 10px}.fw .fw-speed button{padding:0 6px}}
.fw .fw-params{display:grid;gap:10px 18px;grid-template-columns:minmax(0,1fr)}
.fw .fw-param{display:grid;gap:2px}
.fw .fw-param label{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-weight:700;font-size:14.5px}
.fw .fw-param output{font-family:var(--f-mono);font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.fw .fw-param input{width:100%;accent-color:var(--c-p)}
.fw .fw-toggle{display:flex;gap:8px;align-items:center;font-size:14px;color:var(--ink-2)}
.fw .fw-toggle input{accent-color:var(--c-p);width:18px;height:18px}
.fw .fw-res{margin:0;display:grid}
.fw .fw-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 12px;padding:8px 0;border-top:1px solid var(--rule)}
.fw .fw-row:first-child{border-top:0}
.fw .fw-row dt{font-weight:700;font-size:14.5px}
.fw .fw-row dd{margin:0;font-family:var(--f-mono);font-weight:600;font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
.fw .fw-row .f{grid-column:1 / -1;color:var(--ink-2);font-size:13px}
.fw .fw-row.off dd{color:var(--ink-2)}
.fw .fw-verdict{margin:0;padding:9px 12px;border-radius:9px;background:var(--paper);font-size:14px}
.fw .fw-verdict:empty{display:none}
.fw .fw-chart svg{display:block;width:100%;height:auto}
.fw .fw-chart text{font-size:11px;fill:var(--ink-2)}
.fw-axis{stroke:var(--ink-2);stroke-width:1}
.fw-gl{stroke:var(--grid);stroke-width:1}
.fw-curve{fill:none;stroke-width:2.4;stroke-linejoin:round}
.fw .fw-small{font-size:13px;color:var(--ink-2);margin:4px 0 0}
.fw-nar .fw-scene .fw-lbl{font-size:17px}
.fw-nar .fw-scene .fw-lbl-ink{font-size:18px}
.fw-nar .fw-annot{font-size:19px}
.fw-nar .fw-arrow text{font-size:18px}
.fw-nar .fw-chart text{font-size:13px}
`;
  function injectCSS() {
    if (typeof document === 'undefined' || document.getElementById('fw-style')) return;
    const st = document.createElement('style'); st.id = 'fw-style'; st.textContent = CSS; document.head.appendChild(st);
  }

  /* ------------------------------------------------------------------ montaje de un simulador
     def: {
       nombre, titulo, DEF: { escenario: {…valores, controles: [...] } }, NOMBRES: { escenario: 'texto' },
       SL: { clave: { label, unit, min, max, step | log, fmt } },  etiqueta(clave, P) → texto (opcional),
       toggles(P) → [{ clave, label }] (opcional),
       analizar(P) → A,  simular(P, A) → S { T, estado(t) | muestras, Emax },
       vista: { w, h },  escena(ctx),  pintar(ctx, e) → texto de fase,  lectura(P, e) → html,
       energias(P) → [{ k, nombre, color }],  resultados(P, A, S) → { filas: [[título, fórmula, valor, apagado]], veredicto },
       tiempo: 'Tiempo' (etiqueta del deslizador de tiempo), duracion(S) → segundos de animación a ×1 (opcional)
     }
     ctx: { svg, mk, P, A, S, nar, dyn, W, H } (dyn guarda los elementos que cambian en cada fotograma) */
  let uid = 0;
  function crear(el, def, cfg) {
    if (el.__fw) return el.__fw;
    injectCSS();
    cfg = Object.assign({}, cfg || {});
    const id = 'fw' + (++uid);
    const full = cfg.modo === 'completo';
    const escenarios = Object.keys(def.DEF);
    let P = {};
    function setEsc(esc, vals) {
      if (!def.DEF[esc]) esc = escenarios[0];
      P = Object.assign({ escenario: esc }, def.DEF[esc], vals || {});
      if (!vals || !vals.controles) P.controles = (cfg.escenario === esc && cfg.controles) ? cfg.controles : def.DEF[esc].controles;
    }
    const base = Object.assign({}, cfg); ['ejemplos', 'titulo', 'modo', 'selector', 'velocidad'].forEach(k => delete base[k]);
    setEsc(cfg.escenario || escenarios[0], base);

    el.classList.add('fw', full ? 'fw-full' : 'fw-compact');
    const VW = def.vista.w, VH = def.vista.h;
    el.innerHTML = `<div class="fw-box">
      <div class="fw-head"><h3 class="fw-title">${cfg.titulo || def.titulo}</h3><span class="fw-tag">Simulador</span></div>
      ${cfg.selector && escenarios.length > 1 ? `<div class="fw-tabs" role="group" aria-label="Situación">${escenarios.map(e => `<button type="button" data-esc="${e}">${def.NOMBRES[e]}</button>`).join('')}</div>` : ''}
      ${cfg.ejemplos ? `<div class="fw-ex" role="group" aria-label="Ejemplos">${cfg.ejemplos.map((e, i) => `<button type="button" data-ex="${i}" aria-pressed="false">${e.nombre}</button>`).join('')}</div>` : ''}
      <div class="fw-grid">
        <div class="fw-col">
          <div class="fw-scene grid-paper"><svg viewBox="0 0 ${VW} ${VH}" role="img" aria-label="${def.aria || 'Animación'}"></svg></div>
          <div class="fw-read" aria-live="off"></div>
          <div class="fw-ebar" aria-hidden="true"></div>
          <div class="fw-leg"></div>
          <div class="fw-ctrl">
            <button class="fw-btn" type="button" data-act="reset" aria-label="Volver al principio"><svg viewBox="0 0 16 16"><path d="M2.5 2.5h2v11h-2zM14 2.5v11L6 8z"/></svg></button>
            <button class="fw-btn pri" type="button" data-act="play" aria-pressed="false" aria-label="Reproducir"><svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg><span class="fw-playlbl">Reproducir</span></button>
            <input type="range" min="0" max="1000" step="1" value="0" aria-label="${def.tiempo || 'Tiempo'}" data-act="time">
            <div class="fw-speed" role="group" aria-label="Velocidad de reproducción"><button type="button" data-speed="0.25">×¼</button><button type="button" data-speed="0.5">×½</button><button type="button" data-speed="1">×1</button></div>
          </div>
          <p class="fw-slow"></p>
          ${full && def.energias ? `<div class="fw-panel fw-chart"><h3>Energía frente al tiempo</h3><svg data-chart="et" viewBox="0 0 640 220" role="img" aria-label="Energías frente al tiempo"></svg><p class="fw-small">${def.textoGrafica || 'La línea discontinua es la suma de las energías del cuerpo y de lo que se ha convertido en calor.'}</p></div>` : ''}
        </div>
        <div class="fw-col">
          <div class="fw-panel"><h3>Condiciones</h3><div class="fw-params"></div><p class="fw-small">${def.notaCondiciones || 'g = 9,8 m/s² salvo que se indique otra cosa. Las flechas de fuerza no están a escala entre sí.'}</p></div>
          <div class="fw-panel"><h3>Resultados</h3><dl class="fw-res"></dl><div class="fw-verdict"></div></div>
        </div>
      </div>
    </div>`;
    const q = s => el.querySelector(s);
    const svg = q('.fw-scene svg'), et = q('[data-chart="et"]');
    const mk = (tag, attrs = {}, parent = svg) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
    let A, S, ctx = {}, t = 0, playing = false, speed = 0.5, last = 0, visible = true, nar = false, rate = 1;
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNar = () => { const w = el.clientWidth; return w > 0 && w < 520; };
    const setNar = () => { nar = isNar(); el.classList.toggle('fw-nar', nar); };

    // ---------------- flechas
    function arrow(cls, label, parent) {
      const g = mk('g', { class: 'fw-arrow ' + cls }, parent);
      const tx = mk('text', { 'text-anchor': 'middle' }, g); tx.textContent = label;
      return { g, line: mk('line', {}, g), head: mk('polygon', {}, g), tx };
    }
    function setArrow(a, x, y, dx, dy, len, show, lx = 0, ly = 0) {
      if (!show || !(len >= 6)) { a.g.style.display = 'none'; return; }
      a.g.style.display = '';
      const hl = Math.min(9, len * 0.45), tx = x + dx * len, ty = y + dy * len, bx = tx - dx * hl, by = ty - dy * hl;
      a.line.setAttribute('x1', x); a.line.setAttribute('y1', y); a.line.setAttribute('x2', bx); a.line.setAttribute('y2', by);
      a.head.setAttribute('points', `${tx},${ty} ${bx - dy * 5},${by + dx * 5} ${bx + dy * 5},${by - dx * 5}`);
      a.tx.setAttribute('x', tx + dx * 13 + lx); a.tx.setAttribute('y', ty + dy * 13 + ly);
    }

    // ---------------- deslizadores
    function buildParams() {
      const box = q('.fw-params'); box.innerHTML = '';
      for (const key of P.controles) {
        const d = def.SL[key]; if (!d) continue;
        const w = document.createElement('div'); w.className = 'fw-param';
        const iid = `${id}-${key}`;
        const lab = (def.etiqueta && def.etiqueta(key, P)) || d.label;
        const mn = d.minFn ? d.minFn(P) : d.min, mx = d.maxFn ? d.maxFn(P) : d.max;
        w.innerHTML = `<label for="${iid}">${lab} <output for="${iid}"></output></label><input type="range" id="${iid}" ${d.log ? 'min="0" max="1000" step="1"' : `min="${mn}" max="${mx}" step="${d.step}"`}>`;
        box.appendChild(w);
        const inp = w.querySelector('input'), out = w.querySelector('output');
        const toU = v => d.log ? Math.round(1000 * Math.log(v / mn) / Math.log(mx / mn)) : v;
        const fromU = u => { if (!d.log) return Number(u); const v = mn * (mx / mn) ** (u / 1000); return Number(v.toPrecision(v < 1 ? 2 : 3)); };
        inp.value = toU(P[key]);
        const show = () => { out.textContent = `${d.fmt ? d.fmt(P[key]) : num(P[key])}${d.unit ? ' ' + d.unit : ''}`; };
        show();
        inp.addEventListener('input', () => { P[key] = fromU(inp.value); show(); clearEx(); apply(false); });
        inp.addEventListener('change', () => apply(true));
      }
      for (const tg of (def.toggles ? def.toggles(P) : [])) {
        const lab = document.createElement('label'); lab.className = 'fw-toggle';
        lab.innerHTML = `<input type="checkbox" ${P[tg.clave] ? 'checked' : ''}> ${tg.label}`;
        box.appendChild(lab);
        lab.querySelector('input').addEventListener('change', e => { P[tg.clave] = e.target.checked; clearEx(); apply(true); });
      }
    }

    // ---------------- gráfica energía–tiempo
    function estado(tt) {
      if (S.estado) return S.estado(tt);
      const M = S.muestras; if (M.length < 2) return M[0];
      const T = S.T; tt = clamp(tt, 0, T);
      let lo = 0, hi = M.length - 1;
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (M[mid].t <= tt) lo = mid; else hi = mid; }
      const a = M[lo], b = M[hi], f = b.t > a.t ? clamp((tt - a.t) / (b.t - a.t), 0, 1) : 0, o = {};
      for (const k in a) o[k] = typeof a[k] === 'number' ? a[k] + (b[k] - a[k]) * f : a[k];
      return o;
    }
    function buildEt() {
      if (!et) return;
      et.textContent = '';
      const W = nar ? 420 : 640; et.setAttribute('viewBox', `0 0 ${W} 220`);
      const EN = def.energias(P);
      const T = Math.max(S.T, 1e-9), Em = Math.max(S.Emax || 0, 1e-12), x0 = 64, x1 = W - 16, y0 = 186, yT = 28;
      const X = tt => x0 + tt / T * (x1 - x0), Y = e => y0 - e / Em * (y0 - yT);
      const mkc = (tag, at) => mk(tag, at, et);
      for (const f of [0, 0.5, 1]) { mkc('line', { class: 'fw-gl', x1: x0, y1: Y(f * Em), x2: x1, y2: Y(f * Em) }); mkc('text', { x: x0 - 6, y: Y(f * Em) + 4, 'text-anchor': 'end' }).textContent = num(f * Em, 3); }
      const st = niceStep(T / (nar ? 4 : 6));
      for (let v = 0; v <= T * (1 + 1e-9); v += st) { mkc('line', { class: 'fw-axis', x1: X(v), y1: y0, x2: X(v), y2: y0 + 4 }); mkc('text', { x: X(v), y: y0 + 16, 'text-anchor': 'middle' }).textContent = num(v, 2); }
      mkc('line', { class: 'fw-axis', x1: x0, y1: yT, x2: x0, y2: y0 }); mkc('line', { class: 'fw-axis', x1: x0, y1: y0, x2: x1, y2: y0 });
      mkc('text', { x: x1, y: y0 + 30, 'text-anchor': 'end' }).textContent = 't (s)';
      mkc('text', { x: x0 - 6, y: 13, 'text-anchor': 'end' }).textContent = 'E (J)';
      const pts = EN.map(() => []), tot = [], N = 300;
      for (let i = 0; i <= N; i++) { const tt = T * i / N, e = estado(tt), x = X(tt); let sum = 0; EN.forEach((en, j) => { const val = e[en.k] || 0; sum += val; pts[j].push(`${x.toFixed(1)},${Y(val).toFixed(1)}`); }); tot.push(`${x.toFixed(1)},${Y(sum).toFixed(1)}`); }
      mkc('polyline', { class: 'fw-curve', points: tot.join(' '), style: 'stroke:var(--ink);stroke-dasharray:5 4;stroke-width:1.5' });
      EN.forEach((en, j) => mkc('polyline', { class: 'fw-curve', points: pts[j].join(' '), style: `stroke:${en.color}` }));
      ctx.etCur = mkc('line', { class: 'fw-axis', y1: yT, y2: y0 }); ctx.etX = X;
    }

    // ---------------- resultados
    function renderResults() {
      const r = def.resultados(P, A, S);
      q('.fw-res').innerHTML = r.filas.map(([tt, f, v, off]) => `<div class="fw-row${off ? ' off' : ''}"><dt>${tt}</dt><dd>${v}</dd>${f ? `<div class="f">${f}</div>` : ''}</div>`).join('');
      q('.fw-verdict').innerHTML = r.veredicto || '';
    }

    // ---------------- fotograma
    const range = q('[data-act="time"]'), playBtn = q('[data-act="play"]'), bar = q('.fw-ebar');
    function buildBar() {
      const EN = def.energias ? def.energias(P) : [];
      bar.style.display = EN.length ? '' : 'none';
      bar.innerHTML = EN.map(en => `<div style="background:${en.color}"></div>`).join('');
    }
    function render() {
      const e = estado(t);
      const ph = def.pintar(ctx, e);
      if (ctx.annot) ctx.annot.textContent = ph || '';
      q('.fw-read').innerHTML = def.lectura(P, e, A, S);
      const EN = def.energias ? def.energias(P) : [];
      if (EN.length) {
        const Em = Math.max(S.Emax || 0, 1e-12), segs = bar.children;
        EN.forEach((en, i) => { segs[i].style.width = clamp(100 * (e[en.k] || 0) / Em, 0, 100) + '%'; });
        q('.fw-leg').innerHTML = EN.map(en => `<span><i style="background:${en.color}"></i>${en.nombre} <b>${num(e[en.k] || 0)} J</b></span>`).join('') + (def.total === false ? '' : `<span>${(typeof def.totalNombre === 'function' ? def.totalNombre(P) : def.totalNombre) || 'Total'} <b>${num(EN.reduce((a, en) => a + (e[en.k] || 0), 0))} J</b></span>`);
      } else q('.fw-leg').innerHTML = def.leyenda ? def.leyenda(P, e, A, S) : '';
      if (ctx.etCur) { const cx = ctx.etX(t); ctx.etCur.setAttribute('x1', cx); ctx.etCur.setAttribute('x2', cx); }
      range.value = S.T > 0 ? Math.round(1000 * t / S.T) : 0;
    }

    // ---------------- reproducción: la animación dura entre 3 y 10 s a ×1 (cámara lenta o rápida si hace falta)
    function setRate() {
      const T = S.T;
      const dur = def.duracion ? def.duracion(S, P) : clamp(T, 3, 10);
      rate = T > 0 ? T / dur : 1;
      const p = q('.fw-slow');
      if (rate < 0.5) p.textContent = `Cámara lenta: a ×1, 1 s de animación son ${num(rate, 2)} s reales.`;
      else if (rate > 2) p.textContent = `Acelerado: a ×1, 1 s de animación son ${num(rate, 2)} s reales.`;
      else p.textContent = '';
      p.style.display = p.textContent ? '' : 'none';
    }
    function syncPlay() {
      playBtn.setAttribute('aria-pressed', playing); playBtn.setAttribute('aria-label', playing ? 'Pausa' : 'Reproducir');
      playBtn.querySelector('.fw-playlbl').textContent = playing ? 'Pausa' : 'Reproducir';
      playBtn.querySelector('svg').innerHTML = playing ? '<path d="M3.5 2.5h3.2v11H3.5zM9.3 2.5h3.2v11H9.3z"/>' : '<path d="M4 2.5v11l9-5.5z"/>';
    }
    function frame(now) {
      if (!playing) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      t = Math.min(S.T, t + dt * speed * rate); render();
      if (t >= S.T) { playing = false; syncPlay(); return; }
      requestAnimationFrame(frame);
    }
    function play() { if (!(S.T > 0)) return; if (t >= S.T - 1e-12) t = 0; playing = true; last = performance.now(); syncPlay(); requestAnimationFrame(frame); }
    function pause() { playing = false; syncPlay(); }
    playBtn.addEventListener('click', () => playing ? pause() : play());
    q('[data-act="reset"]').addEventListener('click', () => { pause(); t = 0; render(); });
    range.addEventListener('input', () => { pause(); t = range.value / 1000 * S.T; render(); });
    const speeds = el.querySelectorAll('.fw-speed button');
    const setSpeed = v => { speed = v; speeds.forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.speed) === v)); };
    speeds.forEach(b => b.addEventListener('click', () => setSpeed(Number(b.dataset.speed))));
    setSpeed(cfg.velocidad || 0.5);

    function buildScene() {
      svg.textContent = '';
      ctx = { svg, mk, P, A, S, nar, dyn: {}, W: VW, H: VH, arrow: (c, l) => arrow(c, l, ctx.capa), setArrow, util };
      ctx.capa = mk('g'); // capa para flechas, por encima de la escena (se mueve al final)
      def.escena(ctx);
      svg.appendChild(ctx.capa);
      ctx.annot = mk('text', { class: 'fw-annot', x: VW - 12, y: 22, 'text-anchor': 'end' });
    }
    function apply(autoplay) {
      A = def.analizar(P); S = def.simular(P, A); setNar();
      buildScene(); buildBar(); buildEt(); renderResults(); setRate();
      pause(); t = 0; render();
      if (autoplay && !reduce && visible) play();
    }
    function syncTabs() { el.querySelectorAll('[data-esc]').forEach(b => b.setAttribute('aria-pressed', b.dataset.esc === P.escenario)); }
    function clearEx() { el.querySelectorAll('[data-ex]').forEach(b => b.setAttribute('aria-pressed', 'false')); }
    el.querySelectorAll('[data-esc]').forEach(b => b.addEventListener('click', () => { setEsc(b.dataset.esc); syncTabs(); clearEx(); buildParams(); apply(true); }));
    el.querySelectorAll('[data-ex]').forEach(b => b.addEventListener('click', () => {
      // un ejemplo con «escenario» carga una situación completa; sin él, solo cambia los valores que trae
      const e = cfg.ejemplos[Number(b.dataset.ex)], v = Object.assign({}, e.valores);
      if (v.escenario) setEsc(v.escenario, v); else { const keep = P.controles; P = Object.assign({}, P, v); P.controles = keep; }
      syncTabs(); clearEx(); b.setAttribute('aria-pressed', 'true'); buildParams(); apply(true);
    }));
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; if (!visible) pause(); }).observe(el);
    if ('ResizeObserver' in window) new ResizeObserver(() => { if (isNar() !== nar && S) { setNar(); buildScene(); buildEt(); render(); } }).observe(el);

    syncTabs(); buildParams(); apply(false);
    const api = {
      el, get params() { return Object.assign({}, P); }, get analisis() { return A; }, get sim() { return S; },
      set(v, autoplay = true) {
        if (v.escenario && v.escenario !== P.escenario) setEsc(v.escenario, v);
        else { const keep = P.controles; P = Object.assign({}, P, v); if (!v.controles) P.controles = keep; }
        syncTabs(); clearEx(); buildParams(); apply(autoplay);
      },
      ir(tt) { pause(); t = clamp(tt, 0, S.T); render(); },
    };
    el.__fw = api;
    return api;
  }

  // Registro: cada simulador llama a registrar(nombre, def) y se monta en los <div data-widget="nombre">
  const defs = {};
  function montarTodos() {
    if (typeof document === 'undefined') return;
    for (const nombre in defs) document.querySelectorAll(`[data-widget="${nombre}"]`).forEach(el => {
      let cfg = {};
      try { cfg = JSON.parse(el.getAttribute('data-config') || '{}'); } catch (e) { console.error(nombre + ': data-config no es JSON válido', e); }
      crear(el, defs[nombre], cfg);
    });
  }
  function registrar(nombre, def) {
    defs[nombre] = def;
    if (typeof document !== 'undefined') {
      montarTodos();
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montarTodos);
    }
    return { mount: (el, cfg) => crear(el, def, cfg), analizar: def.analizar, simular: def.simular };
  }

  const api = { util, crear, registrar };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') root.FisicaWidgets = Object.assign(root.FisicaWidgets || {}, { nucleo: api });
})(typeof window !== 'undefined' ? window : globalThis);
