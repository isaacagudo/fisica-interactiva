/* Física interactiva · widget «muelle»
   Simulador reutilizable de un cuerpo que comprime un muelle. Tres escenarios:
     horizontal  bloque lanzado contra un muelle horizontal (con o sin rozamiento)
     vertical    bola que cae sobre un muelle vertical
     rampa       bloque que baja por una rampa, recorre un tramo horizontal y comprime un muelle
   Uso en una página:
     <div data-widget="muelle" data-config='{"escenario":"vertical","m":0.1,"h":2,"k":1607}'></div>
     <script src="…/assets/widgets/muelle.js" defer></script>
   Opciones de data-config (todas opcionales):
     escenario   "horizontal" | "vertical" | "rampa"
     m, k, g     masa (kg), constante elástica (N/m), gravedad (9,8 por defecto)
     v0          velocidad inicial (m/s): hacia el muelle en horizontal; hacia abajo en rampa y vertical
     L           tramo horizontal antes del muelle (m) en horizontal y rampa
     mu          rozamiento del suelo (también mientras se comprime el muelle si rozMuelle es true)
     rozMuelle   true | false (por defecto true)
     h           altura (m): sobre el muelle en vertical; altura de la rampa en rampa
     alpha, muRampa   ángulo (°) y rozamiento de la rampa
     controles   lista de deslizadores visibles, p. ej. ["m","k","v0"]
     modo        "completo" (gráficas, resultados y ejemplos) | "compacto" (por defecto)
     selector    true para mostrar los botones de escenario
     ejemplos    [{ "nombre": "Teoría 12", "valores": { "escenario": "vertical", … } }, …]
     titulo      texto encima del widget
   La física (simular y analizar) se exporta también para Node: module.exports = { simular, analizar }. */
(function (root) {
  'use strict';
  const G0 = 9.8;
  const DEF = {
    horizontal: { m: 4, k: 900, v0: 6, L: 1, mu: 0, rozMuelle: true, controles: ['m', 'k', 'v0', 'mu', 'L'] },
    vertical: { m: 0.1, k: 1600, h: 2, v0: 0, controles: ['m', 'k', 'h'] },
    rampa: { m: 1, k: 20, h: 1, alpha: 30, muRampa: 0, mu: 0, L: 1, v0: 0, rozMuelle: true, controles: ['m', 'k', 'h', 'alpha', 'muRampa', 'mu', 'L'] },
  };

  // ------------------------------------------------------------------ física
  // Raíz positiva de a·x² + b·x + c = 0
  const raiz = (a, b, c) => (-b + Math.sqrt(Math.max(0, b * b - 4 * a * c))) / (2 * a);

  function analizar(p) {
    const g = p.g || G0, m = p.m, k = p.k, r = { escenario: p.escenario };
    if (p.escenario === 'vertical') {
      r.vContacto = Math.sqrt(p.v0 * p.v0 + 2 * g * p.h);
      r.xmax = raiz(0.5 * k, -m * g, -(0.5 * m * p.v0 * p.v0 + m * g * p.h));
      r.xeq = m * g / k;
      r.xAprox = Math.sqrt((m * p.v0 * p.v0 + 2 * m * g * p.h) / k);
      r.E0 = 0.5 * m * p.v0 * p.v0 + m * g * (p.h + r.xmax);
      r.Fmax = k * r.xmax; r.P = m * g; r.llega = true; r.Q = 0;
      return r;
    }
    let v1sq, muM = p.rozMuelle === false ? 0 : p.mu, Qantes = 0;
    if (p.escenario === 'rampa') {
      const a = p.alpha * Math.PI / 180, D = p.h / Math.sin(a);
      r.D = D; r.tan = Math.tan(a);
      r.desliza = p.v0 > 0 || r.tan > p.muRampa + 1e-9;
      const vBsq = p.v0 * p.v0 + 2 * g * (p.h - p.muRampa * Math.cos(a) * D);
      r.vB = vBsq > 0 && r.desliza ? Math.sqrt(vBsq) : 0;
      v1sq = r.vB * r.vB - 2 * p.mu * g * p.L;
      Qantes = p.muRampa * m * g * Math.cos(a) * D + p.mu * m * g * p.L;
      r.E0 = 0.5 * m * p.v0 * p.v0 + m * g * p.h;
    } else {
      v1sq = p.v0 * p.v0 - 2 * p.mu * g * p.L;
      Qantes = p.mu * m * g * p.L;
      r.E0 = 0.5 * m * p.v0 * p.v0;
    }
    r.llega = v1sq > 1e-9 && (p.escenario !== 'rampa' || (r.desliza && r.vB > 0));
    r.vContacto = r.llega ? Math.sqrt(v1sq) : 0;
    r.xmax = r.llega ? raiz(0.5 * k, muM * m * g, -0.5 * m * v1sq) : 0;
    r.Fmax = k * r.xmax;
    r.rebota = r.xmax > 0 && k * r.xmax > muM * m * g + 1e-9;
    const v2sq = (k * r.xmax * r.xmax - 2 * muM * m * g * r.xmax) / m;
    r.vSalida = r.rebota && v2sq > 0 ? Math.sqrt(v2sq) : 0;
    r.Qhasta = r.llega ? Qantes + muM * m * g * r.xmax : r.E0;
    return r;
  }

  // Integra el movimiento sobre la trayectoria (coordenada s) y devuelve muestras para dibujar.
  function simular(p) {
    const g = p.g || G0, m = p.m, k = p.k, esc = p.escenario;
    const muM = p.rozMuelle === false ? 0 : p.mu;
    let s, v, geo = {};
    if (esc === 'vertical') { s = p.h; v = -p.v0; }                 // s = altura de la base de la bola sobre el extremo libre
    else if (esc === 'horizontal') { s = -p.L; v = p.v0; }           // s = posición del frente del bloque; muelle libre en s = 0
    else { const a = p.alpha * Math.PI / 180; geo = { a, sa: Math.sin(a), ca: Math.cos(a), D: p.h / Math.sin(a) }; s = 0; v = p.v0; }
    const AN = analizar(p), E0 = AN.E0;
    // compresión, altura, fuerza no disipativa y normal en cada punto
    function local(s) {
      if (esc === 'vertical') { const x = Math.max(0, -s); return { x, y: s, F: -m * g + k * x, N: 0, mu: 0 }; }
      if (esc === 'horizontal') { const x = Math.max(0, s); return { x, y: 0, F: -k * x, N: m * g, mu: x > 0 ? muM : p.mu }; }
      const { D, sa, ca } = geo, end = D + p.L;
      if (s < D) return { x: 0, y: (D - s) * sa, F: m * g * sa, N: m * g * ca, mu: p.muRampa };
      const x = Math.max(0, s - end);
      return { x, y: 0, F: -k * x, N: m * g, mu: x > 0 ? muM : p.mu };
    }
    const dt = 2e-5, every = 1 / 240, out = [];
    let t = 0, Q = 0, next = 0, fase = 0, tMax = 0, xMaxSim = 0, fin = 'tiempo', parado = false;
    const rec = () => {
      const L0 = local(s), Ep = esc === 'vertical' ? m * g * (s + AN.xmax) : m * g * L0.y;
      out.push({ t, s, v, x: L0.x, Ec: 0.5 * m * v * v, Ep, Eel: 0.5 * k * L0.x * L0.x, Q, F: k * L0.x });
    };
    // ¿arranca? (rampa desde el reposo con tg α ≤ μ)
    { const L0 = local(s); if (Math.abs(v) < 1e-9 && Math.abs(L0.F) <= L0.mu * L0.N + 1e-9) { rec(); return { muestras: out, T: 0, fin: 'no-arranca', E0 }; } }
    for (let i = 0; i < 2e6 && t < 30; i++) {
      if (t >= next - 1e-12) { rec(); next += every; }
      const L0 = local(s);
      if (Math.abs(v) < 1e-12) {
        // en reposo: ¿lo sujeta el rozamiento?
        if (Math.abs(L0.F) <= L0.mu * L0.N + 1e-9) { parado = true; fin = fase === 0 && L0.x === 0 ? 'parado-antes' : 'parado'; break; }
        const a = (L0.F - Math.sign(L0.F) * L0.mu * L0.N) / m, ds = 0.5 * a * dt * dt;
        s += ds; v = a * dt; t += dt; Q += L0.mu * L0.N * Math.abs(ds);
      } else {
        // Runge-Kutta de orden 2 (punto medio); si el rozamiento invierte el sentido, se para en v = 0
        const a1 = (L0.F - Math.sign(v) * L0.mu * L0.N) / m, vm = v + a1 * dt / 2, sm = s + v * dt / 2, Lm = local(sm);
        const a2 = (Lm.F - Math.sign(v) * Lm.mu * Lm.N) / m, v2 = v + a2 * dt;
        if (Math.sign(v2) !== Math.sign(v) && (L0.mu > 0 || Lm.mu > 0)) {
          const tt = Math.min(dt, Math.abs(v / a1)), ds = v * tt / 2;
          s += ds; Q += L0.mu * L0.N * Math.abs(ds); t += tt; v = 0;
        } else {
          const ds = vm * dt;
          Q += Lm.mu * Lm.N * Math.abs(ds); s += ds; t += dt; v = v2;
        }
      }
      const L1 = local(s);
      if (L1.x > xMaxSim) xMaxSim = L1.x;
      // fase 0: hasta la compresión máxima; fase 1: hasta el siguiente punto de retorno
      if (fase === 0 && L1.x > 0 && ((esc === 'vertical' && v >= 0) || (esc !== 'vertical' && v <= 0))) { fase = 1; tMax = t; continue; }
      if (fase === 1) {
        if (esc === 'vertical' && v <= 0) { fin = 'arriba'; break; }
        if (esc !== 'vertical' && v === 0 && L1.x === 0) {
          if (Math.abs(L1.F) <= L1.mu * L1.N + 1e-9) { parado = true; fin = 'parado'; } else fin = 'retorno';
          break;
        }
        if (esc !== 'vertical' && v > 0 && L1.x === 0) { fin = 'retorno'; break; }
        if (esc === 'horizontal' && s <= -p.L - 1e-9) { fin = 'sale'; break; }
      }
    }
    rec();
    return { muestras: out, T: t, tMax, xMaxSim, fin, parado, E0 };
  }

  // ------------------------------------------------------------------ utilidades de interfaz
  const fmt = (x, n = 2) => { if (!isFinite(x)) return '—'; const r = Number(x.toFixed(n)); return (Object.is(r, -0) ? 0 : r).toFixed(n).replace('.', ','); };
  const fmtS = (x, sig = 3) => { if (!isFinite(x) || x === 0) return fmt(x || 0, 0); const d = Math.max(0, Math.min(4, sig - 1 - Math.floor(Math.log10(Math.abs(x))))); return fmt(x, d); };
  const miles = s => s.replace(/^(-?\d+)(\d{3})(,|$)/, '$1 $2$3');
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
  function niceStep(raw) { const q = 10 ** Math.floor(Math.log10(raw)), f = raw / q; return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * q; }

  const CSS = `
.wm{--c-k:#b4407e;container-type:inline-size;display:block;margin:16px 0;font-family:var(--f-body)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .wm{--c-k:#f08cc0}}
:root[data-theme="dark"] .wm{--c-k:#f08cc0}
.wm *{box-sizing:border-box}
.wm-box{background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:12px;display:grid;gap:12px;grid-template-columns:minmax(0,1fr)}
.wm-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px 12px}
.wm .wm-title{font:700 1rem var(--f-display);margin:0}
.wm-tag{font:600 11px var(--f-mono);letter-spacing:.04em;text-transform:uppercase;border:1px solid var(--c-p);color:var(--c-p);border-radius:999px;padding:2px 7px}
.wm-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1fr)}
.wm-grid>*{min-width:0}
@container (min-width: 860px){.wm-full .wm-grid{grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr);align-items:start}}
@container (min-width: 640px){.wm-compact .wm-params{grid-template-columns:repeat(2,minmax(0,1fr))}}
.wm-col{display:grid;gap:12px;align-content:start;min-width:0}
.wm-panel{border:1px solid var(--rule);border-radius:10px;padding:10px 12px;background:var(--sheet)}
.wm .wm-panel h3{font:700 .95rem var(--f-display);margin:0 0 6px}
.wm-tabs{display:flex;flex-wrap:wrap;gap:6px}
.wm-tabs button,.wm-ex button{appearance:none;font:600 13px var(--f-body);border:1px solid var(--rule);background:var(--sheet);color:var(--ink-2);border-radius:999px;padding:6px 12px;cursor:pointer;min-height:34px}
.wm-tabs button[aria-pressed="true"]{background:var(--ink);color:var(--sheet);border-color:var(--ink)}
.wm-ex{display:flex;flex-wrap:wrap;gap:6px}
.wm-ex button:hover,.wm-tabs button:hover{border-color:var(--ink-2);color:var(--ink)}
.wm-scene{border-radius:8px;border:1px solid var(--rule)}
.wm-scene svg{display:block;width:100%;height:auto}
.wm-scene text,.wm-chart text{font-family:var(--f-body)}
.wm-floor{stroke:var(--plane-edge);stroke-width:1.4}
.wm-band{fill:var(--plane)}
.wm-plane{fill:var(--plane);stroke:var(--plane-edge);stroke-width:1.3}
.wm-wall{fill:var(--plane);stroke:var(--plane-edge);stroke-width:1.3}
.wm-spring{fill:none;stroke:var(--c-k);stroke-width:2.2;stroke-linejoin:round}
.wm-plate{stroke:var(--c-k);stroke-width:4;stroke-linecap:round}
.wm-body{fill:var(--sheet);stroke:var(--ink);stroke-width:1.8}
.wm-ghost{fill:none;stroke:var(--ink-2);stroke-width:1.3;stroke-dasharray:4 4}
.wm-ref{stroke:var(--ink-2);stroke-width:1.1;stroke-dasharray:6 5;fill:none}
.wm-dim{stroke:var(--ink-2);stroke-width:1.1;fill:none}
.wm-lbl{fill:var(--ink-2);font-size:12.5px}
.wm-lbl-ink{fill:var(--ink);font-size:13.5px;font-weight:700}
.wm-annot{fill:var(--ink);font-size:14px;font-weight:700}
.wm-arrow line{stroke-width:2.6;stroke-linecap:round}
.wm-arrow text{font-size:14px;font-weight:700;dominant-baseline:middle}
.wm-a-p line{stroke:var(--c-p)} .wm-a-p polygon,.wm-a-p text{fill:var(--c-p)}
.wm-a-k line{stroke:var(--c-k)} .wm-a-k polygon,.wm-a-k text{fill:var(--c-k)}
.wm-a-fr line{stroke:var(--c-fr)} .wm-a-fr polygon,.wm-a-fr text{fill:var(--c-fr)}
.wm-a-v line{stroke:var(--c-v)} .wm-a-v polygon,.wm-a-v text{fill:var(--c-v)}
.wm-read{display:flex;flex-wrap:wrap;gap:2px 14px;font-family:var(--f-mono);font-size:12.5px;color:var(--ink-2);font-variant-numeric:tabular-nums}
.wm-read b{color:var(--ink);font-weight:600}
.wm-read .ph{font-family:var(--f-body);font-weight:700;color:var(--ink)}
.wm-ebar{display:flex;height:14px;border-radius:7px;overflow:hidden;background:var(--grid)}
.wm-seg.ec{background:var(--c-v)} .wm-seg.ep{background:var(--c-p)} .wm-seg.el{background:var(--c-k)} .wm-seg.q{background:var(--c-fr)}
.wm-leg{display:flex;flex-wrap:wrap;gap:2px 14px;font-size:12.5px;color:var(--ink-2);font-variant-numeric:tabular-nums}
.wm-leg span{display:inline-flex;align-items:center;gap:5px}
.wm-leg i{width:10px;height:10px;border-radius:3px;display:inline-block}
.wm-leg b{font-family:var(--f-mono);font-weight:600;color:var(--ink)}
.wm-ctrl{display:flex;align-items:center;gap:8px}
.wm-ctrl input[type=range]{flex:1;min-width:40px;accent-color:var(--c-p)}
.wm-btn{appearance:none;border:1px solid var(--rule);background:var(--sheet);color:var(--ink);border-radius:9px;min-height:38px;min-width:38px;padding:0 12px;display:inline-flex;align-items:center;justify-content:center;gap:6px;font:600 13.5px var(--f-body);cursor:pointer}
.wm-btn.pri{background:var(--ink);color:var(--sheet);border-color:var(--ink)}
.wm-btn svg{width:16px;height:16px;fill:currentColor}
.wm-speed{display:inline-flex;border:1px solid var(--rule);border-radius:9px;overflow:hidden}
.wm-speed button{appearance:none;border:0;background:var(--sheet);color:var(--ink-2);font:600 12.5px var(--f-mono);padding:0 8px;min-height:36px;cursor:pointer}
.wm-speed button[aria-pressed="true"]{background:var(--ink);color:var(--sheet)}
@container (max-width: 480px){.wm-playlbl{display:none}.wm-read{font-size:11.5px;gap:0 10px}.wm-speed button{padding:0 6px}}
@container (max-width: 340px){.wm-ctrl{flex-wrap:wrap}.wm-ctrl input[type=range]{order:5;flex-basis:100%}.wm-speed{margin-left:auto}}
.wm-params{display:grid;gap:10px 18px;grid-template-columns:minmax(0,1fr)}
.wm-param{display:grid;gap:2px}
.wm-param label{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-weight:700;font-size:14.5px}
.wm-param output{font-family:var(--f-mono);font-weight:600;font-variant-numeric:tabular-nums}
.wm-param input{width:100%;accent-color:var(--c-p)}
.wm-toggle{display:flex;gap:8px;align-items:center;font-size:14px;color:var(--ink-2)}
.wm-toggle input{accent-color:var(--c-p);width:18px;height:18px}
.wm-res{margin:0;display:grid}
.wm-row{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 12px;padding:8px 0;border-top:1px solid var(--rule)}
.wm-row dt{flex:1 1 auto;min-width:0}
.wm-row:first-child{border-top:0}
.wm-row dt{font-weight:700;font-size:14.5px}
.wm-row dd{margin:0 0 0 auto;font-family:var(--f-mono);font-weight:600;font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
.wm-row .f{flex-basis:100%;color:var(--ink-2);font-size:13px}
.wm .wm-verdict{margin:0;padding:9px 12px;border-radius:9px;background:var(--paper);font-size:14px}
.wm-chart svg{display:block;width:100%;height:auto}
.wm-chart text{font-size:11px;fill:var(--ink-2)}
.wm-axis{stroke:var(--ink-2);stroke-width:1}
.wm-gl{stroke:var(--grid);stroke-width:1}
.wm-curve{fill:none;stroke-width:2.4;stroke-linejoin:round}
.wm-c-ec{stroke:var(--c-v)} .wm-c-ep{stroke:var(--c-p)} .wm-c-el{stroke:var(--c-k)} .wm-c-q{stroke:var(--c-fr)} .wm-c-tot{stroke:var(--ink);stroke-dasharray:5 4;stroke-width:1.5}
.wm-area{fill:var(--c-k);fill-opacity:.22}
.wm-fline{stroke:var(--c-k);stroke-width:2.4}
.wm .wm-small{font-size:13px;color:var(--ink-2);margin:4px 0 0}
.wm-nar .wm-scene .wm-lbl{font-size:17px}
.wm-nar .wm-scene .wm-lbl-ink{font-size:18px}
.wm-nar .wm-annot{font-size:19px}
.wm-nar .wm-arrow text{font-size:18px}
.wm-nar .wm-chart text{font-size:13px}
`;
  function injectCSS() {
    if (document.getElementById('wm-style')) return;
    const st = document.createElement('style'); st.id = 'wm-style'; st.textContent = CSS; document.head.appendChild(st);
  }

  // ------------------------------------------------------------------ widget
  const SL = {
    m: { label: 'Masa, m', unit: 'kg', log: true, min: 0.05, max: 10, fmt: v => fmtS(v, 2) },
    k: { label: 'Constante del muelle, k', unit: 'N/m', log: true, min: 10, max: 3000, fmt: v => miles(fmtS(v, 3)) },
    v0: { label: 'Velocidad inicial, v₀', unit: 'm/s', min: 0, max: 15, step: 0.1, fmt: v => fmt(v, 1) },
    h: { label: 'Altura, h', unit: 'm', min: 0.1, max: 6, step: 0.05, fmt: v => fmt(v, 2) },
    L: { label: 'Tramo horizontal, L', unit: 'm', min: 0, max: 5, step: 0.1, fmt: v => fmt(v, 1) },
    mu: { label: 'Rozamiento del suelo, μ', unit: '', min: 0, max: 0.8, step: 0.01, fmt: v => fmt(v, 2) },
    alpha: { label: 'Ángulo de la rampa, α', unit: '°', min: 10, max: 60, step: 1, fmt: v => fmt(v, 0) },
    muRampa: { label: 'Rozamiento de la rampa, μ', unit: '', min: 0, max: 0.8, step: 0.01, fmt: v => fmt(v, 2) },
  };
  const NOMBRE = { horizontal: 'Muelle horizontal', vertical: 'Caída sobre un muelle', rampa: 'Rampa y muelle' };
  let uid = 0;

  function mount(el, cfg) {
    if (el.__wm) return el.__wm;
    injectCSS();
    cfg = Object.assign({}, cfg || {});
    const id = 'wm' + (++uid);
    const full = cfg.modo === 'completo';
    let P = {};
    function setEsc(esc, vals) {
      P = Object.assign({ escenario: esc }, DEF[esc], vals || {});
      if (!vals || !vals.controles) P.controles = (cfg.escenario === esc && cfg.controles) ? cfg.controles : DEF[esc].controles;
    }
    const base = Object.assign({}, cfg); delete base.ejemplos; delete base.titulo; delete base.modo; delete base.selector;
    setEsc(cfg.escenario || 'horizontal', base);

    el.classList.add('wm', full ? 'wm-full' : 'wm-compact');
    el.innerHTML = `<div class="wm-box">
      <div class="wm-head"><h3 class="wm-title">${cfg.titulo || 'Simulador del muelle'}</h3><span class="wm-tag">Simulador</span></div>
      ${cfg.selector ? `<div class="wm-tabs" role="group" aria-label="Situación">${['horizontal', 'vertical', 'rampa'].map(e => `<button type="button" data-esc="${e}">${NOMBRE[e]}</button>`).join('')}</div>` : ''}
      ${cfg.ejemplos ? `<div class="wm-ex" role="group" aria-label="Ejemplos de los apuntes">${cfg.ejemplos.map((e, i) => `<button type="button" data-ex="${i}">${e.nombre}</button>`).join('')}</div>` : ''}
      <div class="wm-grid">
        <div class="wm-col">
          <div class="wm-scene grid-paper"><svg viewBox="0 0 640 300" role="img" aria-label="Animación del cuerpo y el muelle"></svg></div>
          <div class="wm-read" aria-live="off"></div>
          <div class="wm-ebar" aria-hidden="true"><div class="wm-seg ec"></div><div class="wm-seg ep"></div><div class="wm-seg el"></div><div class="wm-seg q"></div></div>
          <div class="wm-leg"></div>
          <div class="wm-ctrl">
            <button class="wm-btn" type="button" data-act="reset" aria-label="Volver al instante inicial"><svg viewBox="0 0 16 16"><path d="M2.5 2.5h2v11h-2zM14 2.5v11L6 8z"/></svg></button>
            <button class="wm-btn pri" type="button" data-act="play" aria-pressed="false" aria-label="Reproducir"><svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg><span class="wm-playlbl">Reproducir</span></button>
            <input type="range" min="0" max="1000" step="1" value="0" aria-label="Tiempo" data-act="time">
            <div class="wm-speed" role="group" aria-label="Velocidad de reproducción"><button type="button" data-speed="0.25">×¼</button><button type="button" data-speed="0.5">×½</button><button type="button" data-speed="1">×1</button></div>
          </div>
          ${full ? `<div class="wm-panel wm-chart"><h3>Fuerza del muelle frente a la compresión</h3><svg data-chart="fx" viewBox="0 0 640 230" role="img" aria-label="Fuerza del muelle frente a la compresión; el área es la energía elástica"></svg><p class="wm-small">La fuerza crece en línea recta (F = k·x). El área coloreada bajo la recta es la energía guardada en el muelle: un triángulo de área ½·x·(k·x) = ½·k·x².</p></div>
          <div class="wm-panel wm-chart"><h3>Energía frente al tiempo</h3><svg data-chart="et" viewBox="0 0 640 220" role="img" aria-label="Energías frente al tiempo"></svg><p class="wm-small">La línea discontinua es la suma: se mantiene constante, la energía solo cambia de forma.</p></div>` : ''}
        </div>
        <div class="wm-col">
          <div class="wm-panel"><h3>Condiciones</h3><div class="wm-params"></div><p class="wm-small">g = 9,8 m/s². Las flechas de fuerza no están a escala entre sí.</p></div>
          <div class="wm-panel"><h3>Resultados</h3><dl class="wm-res"></dl><div class="wm-verdict"></div></div>
          ${full ? '' : '<div class="wm-panel wm-chart"><h3>Fuerza del muelle y energía elástica</h3><svg data-chart="fx" viewBox="0 0 640 230" role="img" aria-label="Fuerza del muelle frente a la compresión"></svg></div>'}
        </div>
      </div>
    </div>`;
    const q = s => el.querySelector(s);
    const svg = q('.wm-scene svg'), fx = q('[data-chart="fx"]'), et = q('[data-chart="et"]');
    const mk = (tag, attrs = {}, parent = svg) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };

    let A, S, dyn = {}, t = 0, playing = false, speed = 0.5, last = 0, visible = true, nar = false;
    // en pantallas estrechas la escena usa letra más grande y textos cortos, y las gráficas un lienzo más estrecho
    const isNar = () => { const w = el.clientWidth; return w > 0 && w < 520; };
    const setNar = () => { nar = isNar(); el.classList.toggle('wm-nar', nar); };
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------------- parámetros
    function buildParams() {
      const box = q('.wm-params'); box.innerHTML = '';
      for (const key of P.controles) {
        const d = SL[key]; if (!d) continue;
        const w = document.createElement('div'); w.className = 'wm-param';
        const iid = `${id}-${key}`;
        const lab = key === 'mu' && P.escenario === 'rampa' ? 'Rozamiento del suelo y del muelle, μ' : key === 'v0' && P.escenario !== 'horizontal' ? 'Velocidad inicial hacia abajo, v₀' : d.label;
        w.innerHTML = `<label for="${iid}">${lab} <output for="${iid}"></output></label><input type="range" id="${iid}" ${d.log ? 'min="0" max="1000" step="1"' : `min="${d.min}" max="${d.max}" step="${d.step}"`}>`;
        box.appendChild(w);
        const inp = w.querySelector('input'), out = w.querySelector('output');
        const toU = v => d.log ? Math.round(1000 * Math.log(v / d.min) / Math.log(d.max / d.min)) : v;
        const fromU = u => { if (!d.log) return Number(u); const v = d.min * (d.max / d.min) ** (u / 1000); const r = Number(v.toPrecision(v < 1 ? 2 : 3)); return r; };
        inp.value = toU(P[key]);
        const show = () => { out.textContent = `${d.fmt(P[key])}${d.unit ? ' ' + d.unit : ''}`; };
        show();
        inp.addEventListener('input', () => { P[key] = fromU(inp.value); show(); apply(false); });
        inp.addEventListener('change', () => apply(true));
      }
      if (P.escenario !== 'vertical' && (P.controles.includes('mu') || P.mu > 0)) {
        const lab = document.createElement('label'); lab.className = 'wm-toggle';
        lab.innerHTML = `<input type="checkbox" ${P.rozMuelle !== false ? 'checked' : ''}> También hay rozamiento mientras se comprime el muelle`;
        box.appendChild(lab);
        lab.querySelector('input').addEventListener('change', e => { P.rozMuelle = e.target.checked; apply(true); });
      }
    }

    // ---------------- escena
    function zig(x1, y1, x2, y2, n, amp) {
      const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L, px = -uy, py = ux;
      const end = Math.min(10, L / 6), seg = (L - 2 * end) / (2 * n);
      let d = `M${x1} ${y1}L${x1 + ux * end} ${y1 + uy * end}`;
      for (let i = 0; i < 2 * n; i++) { const tt = end + seg * (i + 0.5), s = i % 2 ? -amp : amp; d += `L${(x1 + ux * tt + px * s).toFixed(1)} ${(y1 + uy * tt + py * s).toFixed(1)}`; }
      return d + `L${x2 - ux * end} ${y2 - uy * end}L${x2} ${y2}`;
    }
    function arrow(cls, label, parent) {
      const g = mk('g', { class: 'wm-arrow ' + cls }, parent);
      const tx = mk('text', { 'text-anchor': 'middle' }, g); tx.textContent = label;
      return { g, line: mk('line', {}, g), head: mk('polygon', {}, g), tx };
    }
    function setArrow(a, x, y, dx, dy, len, show, lx = 0, ly = 0) {
      if (!show || len < 6) { a.g.style.display = 'none'; return; }
      a.g.style.display = '';
      const hl = Math.min(9, len * 0.45), tx = x + dx * len, ty = y + dy * len, bx = tx - dx * hl, by = ty - dy * hl;
      a.line.setAttribute('x1', x); a.line.setAttribute('y1', y); a.line.setAttribute('x2', bx); a.line.setAttribute('y2', by);
      a.head.setAttribute('points', `${tx},${ty} ${bx - dy * 5},${by + dx * 5} ${bx + dy * 5},${by - dx * 5}`);
      a.tx.setAttribute('x', tx + dx * 12 + lx); a.tx.setAttribute('y', ty + dy * 12 + ly);
    }
    const BW = 44;
    function buildScene() {
      svg.textContent = '';
      const esc = P.escenario, xm = Math.max(A.xmax, 0.005);
      dyn = {};
      if (esc === 'vertical') {
        const Yg = 282, sprPx = 118, l0 = Math.max(1.55 * xm, 1.2 * A.xeq), Ks = sprPx / l0, top = Yg - sprPx;
        const R = 15, room = top - 40 - 2 * R;
        const Ka = Math.min(Ks, room / Math.max(P.h, 1e-3));
        const Y = y => y >= 0 ? top - y * Ka : top - y * Ks;   // y: altura de la base de la bola sobre el extremo libre
        const Xc = 250;
        Object.assign(dyn, { Y, Xc, Yg, top, R, Ks, Ka });
        mk('rect', { class: 'wm-band', x: 0, y: Yg, width: 640, height: 18 });
        mk('line', { class: 'wm-floor', x1: 0, y1: Yg, x2: 640, y2: Yg });
        // líneas de referencia con etiquetas separadas al menos 15 px
        const refs = [[top, 'sin deformar', ''], [Y(-A.xeq), `${nar ? 'en reposo' : 'colgado en reposo'}: x₀ = ${fmtS(A.xeq)} m`, '2 4'], [Y(-A.xmax), nar ? `x máx = ${fmtS(A.xmax)} m` : `compresión máxima: ${fmtS(A.xmax)} m`, '']];
        const gap = nar ? 20 : 15;
        let prevY = -1e9;
        for (const [yy, txt, dash] of refs) {
          mk('line', { class: 'wm-ref', x1: 120, y1: yy, x2: 380, y2: yy, 'stroke-dasharray': dash || '6 5' });
          const ty = Math.max(yy + (nar ? 6 : 4), prevY + gap); prevY = ty;
          if (ty - yy > 6) mk('line', { class: 'wm-dim', x1: 380, y1: yy, x2: 392, y2: ty - 4 });
          mk('text', { class: 'wm-lbl', x: 396, y: ty }).textContent = txt;
        }
        // cota de h
        mk('line', { class: 'wm-dim', x1: 160, y1: Y(P.h), x2: 160, y2: top });
        mk('line', { class: 'wm-dim', x1: 154, y1: Y(P.h), x2: 166, y2: Y(P.h) });
        mk('text', { class: 'wm-lbl-ink', x: 152, y: (Y(P.h) + top) / 2 + 4, 'text-anchor': 'end' }).textContent = `h = ${fmt(P.h)} m`;
        if (Ka < 0.85 * Ks) {
          const ym = (Y(P.h) + top) / 2 + 18;
          mk('path', { class: 'wm-dim', d: `M152 ${ym}l16 -5M152 ${ym + 6}l16 -5` });
          mk('text', { class: 'wm-lbl', x: 14, y: 24 }).textContent = nar ? 'h a otra escala (≈)' : 'La altura h está dibujada a menor escala que el muelle (≈).';
        }
        mk('circle', { class: 'wm-ghost', cx: Xc, cy: Y(P.h) - R, r: R });
        dyn.spring = mk('path', { class: 'wm-spring' });
        dyn.plate = mk('line', { class: 'wm-plate' });
        dyn.body = mk('circle', { class: 'wm-body', r: R, cx: Xc });
      } else if (esc === 'horizontal') {
        const Yg = 230, Xw = 610, sprPx = 175, l0 = 1.6 * xm, Ks = sprPx / l0, Xf = Xw - sprPx;
        const room = Xf - 40 - BW;
        const Ka = P.L > 0 ? Math.min(Ks, room / P.L) : Ks;
        const X = s => s >= 0 ? Xf + s * Ks : Xf + s * Ka;
        Object.assign(dyn, { X, Xf, Xw, Yg, Ks, Ka });
        mk('rect', { class: 'wm-band', x: 0, y: Yg, width: 640, height: 18 });
        mk('line', { class: 'wm-floor', x1: 0, y1: Yg, x2: 640, y2: Yg });
        mk('rect', { class: 'wm-wall', x: Xw, y: Yg - 110, width: 16, height: 110 });
        if (P.mu > 0) mk('text', { class: 'wm-lbl', x: 12, y: Yg + 34 }).textContent = nar ? `suelo: μ = ${fmt(P.mu)}` : `suelo con rozamiento: μ = ${fmt(P.mu)}${P.rozMuelle === false ? ' (salvo bajo el muelle)' : ''}`;
        if (P.L > 0) {
          mk('line', { class: 'wm-dim', x1: X(-P.L), y1: Yg + 12, x2: Xf, y2: Yg + 12 });
          mk('text', { class: 'wm-lbl-ink', x: (X(-P.L) + Xf) / 2, y: Yg + 34, 'text-anchor': 'middle' }).textContent = `L = ${fmt(P.L, 1)} m`;
          if (Ka < 0.85 * Ks) mk('text', { class: 'wm-lbl', x: 12, y: 24 }).textContent = nar ? 'L a otra escala (≈)' : 'El tramo L está dibujado a menor escala que el muelle.';
        }
        if (A.llega) {
          const xg = X(A.xmax);
          mk('rect', { class: 'wm-ghost', x: xg - BW, y: Yg - BW, width: BW, height: BW, rx: 3 });
          mk('line', { class: 'wm-ref', x1: xg, y1: Yg - BW - 8, x2: xg, y2: Yg - 128 });
          mk('line', { class: 'wm-ref', x1: Xf, y1: Yg - BW - 8, x2: Xf, y2: Yg - 128 });
          mk('text', { class: 'wm-lbl', x: Xf - 4, y: Yg - 134, 'text-anchor': 'start' }).textContent = `x máx = ${fmtS(A.xmax)} m`;
        }
        dyn.spring = mk('path', { class: 'wm-spring' });
        dyn.plate = mk('line', { class: 'wm-plate' });
        dyn.body = mk('rect', { class: 'wm-body', width: BW, height: BW, rx: 3, y: Yg - BW });
      } else {
        const a = P.alpha * Math.PI / 180, sa = Math.sin(a), ca = Math.cos(a), D = P.h / sa;
        const l0 = Math.max(1.5 * xm, 0.25), wReal = D * ca + P.L + l0;
        const Kmain = Math.min(560 / wReal, 185 / P.h);
        const Ks = Math.max(Kmain, 45 / xm);
        const Yg = 250, X0 = 24, Xb = X0 + D * ca * Kmain, Xf = Xb + P.L * Kmain + 15, Xw = Math.min(622, Xf + l0 * Ks);
        const sprPx = Xw - Xf, KsEff = sprPx / l0;
        // pos(s): punto de apoyo (centro de la base) del bloque; el frente del bloque está 15 px a la derecha
        const pos = s => {
          if (s <= D) return { x: X0 + s * ca * Kmain, y: Yg - (D - s) * sa * Kmain, rot: P.alpha };
          const f = s - D - P.L;
          return { x: f <= 0 ? Xb + (s - D) * Kmain : Xf - 15 + f * KsEff, y: Yg, rot: 0 };
        };
        Object.assign(dyn, { pos, Xf, Xw, Yg, Ks: KsEff, D, sa, ca });
        mk('rect', { class: 'wm-band', x: 0, y: Yg, width: 640, height: 18 });
        mk('polygon', { class: 'wm-plane', points: `${X0},${Yg - P.h * Kmain} ${X0},${Yg} ${Xb},${Yg}` });
        mk('line', { class: 'wm-floor', x1: 0, y1: Yg, x2: 640, y2: Yg });
        mk('rect', { class: 'wm-wall', x: Xw, y: Yg - 100, width: 14, height: 100 });
        const r = 30; mk('path', { class: 'wm-dim', d: `M${Xb - r} ${Yg}A${r} ${r} 0 0 1 ${Xb - r * ca} ${Yg - r * sa}` });
        mk('text', { class: 'wm-lbl', x: Xb - r - 4, y: Yg - 6, 'text-anchor': 'end' }).textContent = `${fmt(P.alpha, 0)}°`;
        mk('line', { class: 'wm-dim', x1: X0 + 6, y1: Yg - P.h * Kmain, x2: X0 + 6, y2: Yg });
        mk('text', { class: 'wm-lbl-ink', x: X0 + 12, y: Yg - P.h * Kmain / 2 + 4 }).textContent = `h = ${fmt(P.h)} m`;
        mk('text', { class: 'wm-lbl-ink', x: Xb, y: Yg + 34, 'text-anchor': 'middle' }).textContent = 'B';
        if (P.L > 0) mk('text', { class: 'wm-lbl', x: (Xb + Xf) / 2, y: Yg + 34, 'text-anchor': 'middle' }).textContent = `L = ${fmt(P.L, 1)} m`;
        if (A.llega) {
          const xg = Xf + A.xmax * KsEff;
          mk('line', { class: 'wm-ref', x1: xg, y1: Yg - 36, x2: xg, y2: Yg - 118 });
          mk('line', { class: 'wm-ref', x1: Xf, y1: Yg - 36, x2: Xf, y2: Yg - 118 });
          mk('text', { class: 'wm-lbl', x: Math.min(Xf - 4, 470), y: Yg - 124 }).textContent = `x máx = ${fmtS(A.xmax)} m`;
        }
        dyn.spring = mk('path', { class: 'wm-spring' });
        dyn.plate = mk('line', { class: 'wm-plate' });
        dyn.body = mk('rect', { class: 'wm-body', width: 30, height: 30, rx: 3, x: -15, y: -30 });
      }
      const lay = mk('g');
      dyn.V = arrow('wm-a-v', 'v', lay); dyn.Fk = arrow('wm-a-k', 'F', lay); dyn.Fr = arrow('wm-a-fr', 'Fr', lay); dyn.P = arrow('wm-a-p', 'P', lay);
      dyn.annot = mk('text', { class: 'wm-annot', x: 628, y: 22, 'text-anchor': 'end' });
    }

    // ---------------- gráficas
    function buildFx() {
      if (!fx) return;
      fx.textContent = '';
      const W = nar ? 420 : 640; fx.setAttribute('viewBox', `0 0 ${W} 230`);
      const x0 = 64, x1 = W - 20, y0 = 188, yT = 18, xm = Math.max(A.xmax, 1e-4) * 1.15, Fm = P.k * xm;
      const X = x => x0 + x / xm * (x1 - x0), Y = F => y0 - F / Fm * (y0 - yT);
      const mkc = (tag, at) => mk(tag, at, fx);
      const sx = niceStep(xm / (nar ? 4 : 5)), sF = niceStep(Fm / 4);
      for (let v = 0; v <= Fm + 1e-9; v += sF) { mkc('line', { class: 'wm-gl', x1: x0, y1: Y(v), x2: x1, y2: Y(v) }); mkc('text', { x: x0 - 6, y: Y(v) + 4, 'text-anchor': 'end' }).textContent = miles(fmtS(v, 3)); }
      for (let v = 0; v <= xm + 1e-9; v += sx) { mkc('line', { class: 'wm-axis', x1: X(v), y1: y0, x2: X(v), y2: y0 + 4 }); mkc('text', { x: X(v), y: y0 + 16, 'text-anchor': 'middle' }).textContent = fmtS(v, 2); }
      mkc('line', { class: 'wm-axis', x1: x0, y1: yT, x2: x0, y2: y0 }); mkc('line', { class: 'wm-axis', x1: x0, y1: y0, x2: x1, y2: y0 });
      mkc('text', { x: x1, y: y0 + 32, 'text-anchor': 'end' }).textContent = 'compresión x (m)';
      mkc('text', { x: x0 - 6, y: yT - 6, 'text-anchor': 'end' }).textContent = 'F (N)';
      if (P.escenario === 'vertical') {
        const Pw = P.m * G0;
        mkc('line', { class: 'wm-ref', x1: x0, y1: Y(Pw), x2: x1, y2: Y(Pw) });
        mkc('text', { x: x1 - 4, y: Y(Pw) - 5, 'text-anchor': 'end' }).textContent = `peso P = ${fmtS(Pw)} N (equilibrio en x₀)`;
      }
      if (A.llega) { mkc('line', { class: 'wm-ref', x1: X(A.xmax), y1: yT, x2: X(A.xmax), y2: y0 }); mkc('text', { x: X(A.xmax) - 4, y: yT + 10, 'text-anchor': 'end' }).textContent = 'x máx'; }
      dyn.fxArea = mkc('polygon', { class: 'wm-area' });
      mkc('line', { class: 'wm-fline', x1: X(0), y1: Y(0), x2: X(xm), y2: Y(Fm) });
      dyn.fxDot = mkc('circle', { r: 5, fill: 'var(--c-k)' });
      dyn.fxTxt = mkc('text', { x: x0 + 10, y: yT + 14, style: `font-size:${nar ? 14 : 12.5}px;fill:var(--ink)` });
      Object.assign(dyn, { fxX: X, fxY: Y });
    }
    function buildEt() {
      if (!et) return;
      et.textContent = '';
      const W = nar ? 420 : 640; et.setAttribute('viewBox', `0 0 ${W} 220`);
      const T = Math.max(S.T, 1e-3), E0 = Math.max(S.E0, 1e-9), x0 = 56, x1 = W - 16, y0 = 186, yT = 28;
      const X = t => x0 + t / T * (x1 - x0), Y = e => y0 - e / E0 * (y0 - yT);
      const mkc = (tag, at) => mk(tag, at, et);
      for (const f of [0, 0.5, 1]) { mkc('line', { class: 'wm-gl', x1: x0, y1: Y(f * E0), x2: x1, y2: Y(f * E0) }); mkc('text', { x: x0 - 6, y: Y(f * E0) + 4, 'text-anchor': 'end' }).textContent = fmtS(f * E0, 3); }
      const st = niceStep(T / (nar ? 4 : 6));
      for (let v = 0; v <= T + 1e-9; v += st) { mkc('line', { class: 'wm-axis', x1: X(v), y1: y0, x2: X(v), y2: y0 + 4 }); mkc('text', { x: X(v), y: y0 + 16, 'text-anchor': 'middle' }).textContent = fmtS(v, 2); }
      mkc('line', { class: 'wm-axis', x1: x0, y1: yT, x2: x0, y2: y0 }); mkc('line', { class: 'wm-axis', x1: x0, y1: y0, x2: x1, y2: y0 });
      mkc('text', { x: x1, y: y0 + 30, 'text-anchor': 'end' }).textContent = 't (s)';
      mkc('text', { x: x0 - 6, y: 13, 'text-anchor': 'end' }).textContent = 'E (J)';
      const pts = { ec: [], ep: [], el: [], q: [], tot: [] }, M = S.muestras, stp = Math.max(1, Math.floor(M.length / 300));
      for (let i = 0; i < M.length; i += stp) { const s = M[i], x = X(s.t); pts.ec.push(`${x},${Y(s.Ec)}`); pts.ep.push(`${x},${Y(s.Ep)}`); pts.el.push(`${x},${Y(s.Eel)}`); pts.q.push(`${x},${Y(s.Q)}`); pts.tot.push(`${x},${Y(s.Ec + s.Ep + s.Eel + s.Q)}`); }
      for (const [k, c] of [['tot', 'tot'], ['q', 'q'], ['ep', 'ep'], ['el', 'el'], ['ec', 'ec']]) mkc('polyline', { class: 'wm-curve wm-c-' + c, points: pts[k].join(' ') });
      dyn.etCur = mkc('line', { class: 'wm-axis', y1: yT, y2: y0 });
      Object.assign(dyn, { etX: X });
    }

    // ---------------- resultados
    function renderResults() {
      const esc = P.escenario, rows = [];
      const R = (t, f, v, off) => rows.push(`<div class="wm-row${off ? ' off' : ''}"><dt>${t}</dt><dd>${v}</dd><div class="f">${f}</div></div>`);
      let verdict = '';
      if (esc === 'vertical') {
        R('Velocidad al tocar el muelle', 'v = √(v₀² + 2·g·h)', `${fmt(A.vContacto)} m/s`);
        R('Compresión máxima', 'm·g·(h + x) = ½·k·x²  (ecuación de 2.º grado)', `${fmtS(A.xmax)} m`);
        R('Fuerza máxima del muelle', 'F = k·x máx', `${miles(fmtS(A.Fmax))} N`);
        R('Colgado en reposo', 'k·x₀ = m·g  ⟹  x₀ = m·g/k', `${fmtS(A.xeq)} m`);
        const err = 100 * (A.xmax - A.xAprox) / A.xmax;
        verdict = `La fuerza máxima del muelle es <strong>${fmt(A.Fmax / A.P, 1)} veces el peso</strong>: un golpe deforma mucho más que el peso en reposo. Si se desprecia x frente a h saldría ${fmtS(A.xAprox)} m (${fmt(err, 1)} % menos).`;
      } else {
        if (esc === 'rampa') {
          R('Velocidad al llegar a B', 'v = √[v₀² + 2·g·(h − μ·cos α·d)]', A.desliza ? `${fmt(A.vB)} m/s` : '—', !A.desliza);
        }
        R('Velocidad al llegar al muelle', esc === 'rampa' ? 'v = √(v_B² − 2·μ·g·L)' : 'v = √(v₀² − 2·μ·g·L)', A.llega ? `${fmt(A.vContacto)} m/s` : 'no llega', !A.llega);
        const muM = P.rozMuelle === false ? 0 : P.mu;
        R('Compresión máxima', muM > 0 ? '½·m·v² = ½·k·x² + μ·m·g·x' : '½·m·v² = ½·k·x²  ⟹  x = v·√(m/k)', A.llega ? `${fmtS(A.xmax)} m` : '—', !A.llega);
        R('Fuerza máxima del muelle', 'F = k·x máx', A.llega ? `${miles(fmtS(A.Fmax))} N` : '—', !A.llega);
        R('Energía elástica máxima', 'Ep el = ½·k·x máx²', A.llega ? `${fmtS(0.5 * P.k * A.xmax * A.xmax)} J` : '—', !A.llega);
        if (!A.llega) verdict = esc === 'rampa' && !A.desliza ? `<strong>No llega a deslizar</strong>: tg α = ${fmt(A.tan, 3)} no supera a μ = ${fmt(P.muRampa)} y el rozamiento lo sujeta.` : `<strong>No llega al muelle</strong>: el rozamiento lo para antes.`;
        else if (A.rebota) verdict = `El muelle lo devuelve: sale a <strong>${fmt(A.vSalida)} m/s</strong>${muM > 0 || P.mu > 0 ? `; hasta la compresión máxima el rozamiento ha convertido ${fmtS(A.Qhasta)} J en calor` : ' (sin rozamiento, la misma rapidez con la que llegó)'}.`;
        else verdict = `<strong>Se queda con el muelle comprimido</strong>: k·x = ${fmtS(P.k * A.xmax)} N no supera al rozamiento máximo μ·m·g = ${fmtS(muM * P.m * G0)} N.`;
      }
      q('.wm-res').innerHTML = rows.join('');
      q('.wm-verdict').innerHTML = verdict;
    }

    // ---------------- fotograma
    const range = q('[data-act="time"]'), playBtn = q('[data-act="play"]');
    function sample(t) {
      const M = S.muestras; if (M.length < 2) return M[0];
      const T = S.T; t = clamp(t, 0, T);
      let i = Math.min(M.length - 2, Math.floor(t * 240)); while (i > 0 && M[i].t > t) i--; while (i < M.length - 2 && M[i + 1].t < t) i++;
      const a = M[i], b = M[i + 1], f = b.t > a.t ? clamp((t - a.t) / (b.t - a.t), 0, 1) : 0, o = {};
      for (const k in a) o[k] = a[k] + (b[k] - a[k]) * f;
      return o;
    }
    function render() {
      const s = sample(t), esc = P.escenario, E0 = Math.max(S.E0, 1e-12);
      const moving = Math.abs(s.v) > 0.02;
      let ph;
      if (esc === 'vertical') {
        const { Y, Xc, top, R, Ks } = dyn, yb = Y(s.s), cy = yb - R;
        dyn.body.setAttribute('cy', cy);
        const plateY = s.x > 0 ? yb : top;
        dyn.spring.setAttribute('d', zig(Xc, dyn.Yg, Xc, plateY, 8, 11));
        dyn.plate.setAttribute('x1', Xc - 18); dyn.plate.setAttribute('x2', Xc + 18); dyn.plate.setAttribute('y1', plateY); dyn.plate.setAttribute('y2', plateY);
        const kx = P.k * s.x, Pw = P.m * G0;
        setArrow(dyn.P, Xc + 26, cy, 0, 1, 34, true, 0, 0);
        setArrow(dyn.Fk, Xc - 26, cy, 0, -1, clamp(34 * kx / Pw, 0, 120), s.x > 0, 0, 0);
        setArrow(dyn.V, Xc + 58, cy, 0, s.v < 0 ? 1 : -1, clamp(6 * Math.abs(s.v), 0, 70), moving);
        setArrow(dyn.Fr, 0, 0, 1, 0, 0, false);
        ph = s.t === 0 ? 'Se suelta' : s.x > 0 ? (s.v < -0.02 ? 'Comprime el muelle: F crece' : s.v > 0.02 ? 'El muelle la empuja hacia arriba' : 'Compresión máxima: v = 0') : (s.v < 0 ? 'Cae' : 'Sube');
        if (S.fin === 'arriba' && t >= S.T - 1e-6) ph = 'Vuelve a la altura inicial';
      } else {
        // centro del cuerpo (cx, cy), punto de apoyo (bx, by), normal hacia fuera (nx, ny) y dirección del avance (dx, dy)
        let cx, cy, bx, by, nx = 0, ny = -1, dx = 1, dy = 0, plateX, half;
        const onRamp = esc === 'rampa' && s.s < dyn.D;
        if (esc === 'horizontal') {
          const fxp = dyn.X(s.s); half = BW / 2;
          dyn.body.setAttribute('x', fxp - BW);
          cx = fxp - half; cy = dyn.Yg - half; bx = cx; by = dyn.Yg;
          plateX = s.x > 0 ? fxp : dyn.Xf;
        } else {
          const p = dyn.pos(s.s); half = 15;
          dyn.body.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${p.rot})`);
          if (onRamp) { nx = dyn.sa; ny = -dyn.ca; dx = dyn.ca; dy = dyn.sa; }
          cx = p.x + half * nx; cy = p.y + half * ny; bx = p.x; by = p.y;
          plateX = s.x > 0 ? p.x + half : dyn.Xf;
        }
        const ys = dyn.Yg - (esc === 'horizontal' ? 22 : 15);
        dyn.spring.setAttribute('d', zig(dyn.Xw, ys, plateX, ys, 9, 10));
        dyn.plate.setAttribute('x1', plateX); dyn.plate.setAttribute('x2', plateX); dyn.plate.setAttribute('y1', ys - 16); dyn.plate.setAttribute('y2', ys + 16);
        const sgn = s.v >= 0 ? 1 : -1;
        const muHere = onRamp ? P.muRampa : (s.x > 0 && P.rozMuelle === false ? 0 : P.mu);
        setArrow(dyn.V, cx + (half + 22) * nx - 20 * dx * sgn, cy + (half + 22) * ny - 20 * dy * sgn, sgn * dx, sgn * dy, clamp(7 * Math.abs(s.v), 0, 80), moving, 0, -2);
        setArrow(dyn.Fk, cx, cy, -1, 0, clamp(40 * Math.sqrt(P.k * s.x / (P.m * G0)), 0, 110), s.x > 0, 0, -12);
        setArrow(dyn.Fr, bx + 3 * nx, by + 3 * ny, -sgn * dx, -sgn * dy, 34, moving && muHere > 0, 0, 12);
        setArrow(dyn.P, 0, 0, 0, 1, 0, false);
        if (s.t === 0) ph = esc === 'rampa' ? 'Sale de lo alto de la rampa' : 'Se lanza hacia el muelle';
        else if (s.x > 0) ph = s.v > 0.02 ? 'Comprime el muelle: F crece' : s.v < -0.02 ? 'El muelle lo empuja de vuelta' : 'Compresión máxima: v = 0';
        else if (onRamp) ph = s.v > 0.02 ? 'Baja por la rampa' : s.v < -0.02 ? 'Vuelve a subir por la rampa' : 'Se para en la rampa';
        else ph = s.v > 0.02 ? 'Se acerca al muelle' : s.v < -0.02 ? 'Se aleja del muelle' : 'Parado';
        if (t >= S.T - 1e-6 && S.T > 0) ph = S.fin === 'parado' || S.fin === 'parado-antes' ? 'Se para' : S.fin === 'sale' ? 'Vuelve a pasar por el punto de salida' : ph;
        if (S.fin === 'no-arranca') ph = 'No llega a deslizar';
      }
      dyn.annot.textContent = ph;
      const sign = s.v > 0.005 ? '+' : s.v < -0.005 ? '−' : '';
      q('.wm-read').innerHTML = `<span class="ph">${s.x > 0 ? 'Muelle comprimido' : 'Muelle libre'}</span><span>t <b>${fmt(s.t)} s</b></span><span>x <b>${fmtS(s.x)} m</b></span><span>v <b>${sign}${fmt(Math.abs(s.v))} m/s</b></span><span>F muelle <b>${miles(fmtS(P.k * s.x))} N</b></span>`;
      const seg = el.querySelectorAll('.wm-seg');
      [s.Ec, s.Ep, s.Eel, s.Q].forEach((e, i) => { seg[i].style.width = clamp(100 * e / E0, 0, 100) + '%'; });
      const showEp = P.escenario !== 'horizontal';
      q('.wm-leg').innerHTML = `<span><i style="background:var(--c-v)"></i>Ec <b>${fmtS(s.Ec)} J</b></span>${showEp ? `<span><i style="background:var(--c-p)"></i>Ep <b>${fmtS(s.Ep)} J</b></span>` : ''}<span><i style="background:var(--c-k)"></i>Ep elástica <b>${fmtS(s.Eel)} J</b></span>${(P.mu > 0 || (P.escenario === 'rampa' && P.muRampa > 0)) ? `<span><i style="background:var(--c-fr)"></i>Calor <b>${fmtS(s.Q)} J</b></span>` : ''}<span>Total <b>${fmtS(s.Ec + s.Ep + s.Eel + s.Q)} J</b></span>`;
      if (dyn.fxArea) {
        const X = dyn.fxX, Y = dyn.fxY, x = s.x;
        dyn.fxArea.setAttribute('points', `${X(0)},${Y(0)} ${X(x)},${Y(0)} ${X(x)},${Y(P.k * x)}`);
        dyn.fxDot.setAttribute('cx', X(x)); dyn.fxDot.setAttribute('cy', Y(P.k * x));
        dyn.fxTxt.textContent = nar ? `F = ${miles(fmtS(P.k * x))} N · área = ${fmtS(s.Eel)} J` : `x = ${fmtS(x)} m · F = ${miles(fmtS(P.k * x))} N · área = ½·k·x² = ${fmtS(s.Eel)} J`;
      }
      if (dyn.etCur) { const cx = dyn.etX(s.t); dyn.etCur.setAttribute('x1', cx); dyn.etCur.setAttribute('x2', cx); }
      range.value = S.T > 0 ? Math.round(1000 * t / S.T) : 0;
    }

    // ---------------- reproducción
    function syncPlay() {
      playBtn.setAttribute('aria-pressed', playing); playBtn.setAttribute('aria-label', playing ? 'Pausa' : 'Reproducir');
      playBtn.querySelector('.wm-playlbl').textContent = playing ? 'Pausa' : 'Reproducir';
      playBtn.querySelector('svg').innerHTML = playing ? '<path d="M3.5 2.5h3.2v11H3.5zM9.3 2.5h3.2v11H9.3z"/>' : '<path d="M4 2.5v11l9-5.5z"/>';
    }
    function frame(now) {
      if (!playing) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      t = Math.min(S.T, t + dt * speed); render();
      if (t >= S.T) { playing = false; syncPlay(); return; }
      requestAnimationFrame(frame);
    }
    function play() { if (S.T <= 0) return; if (t >= S.T - 1e-9) t = 0; playing = true; last = performance.now(); syncPlay(); requestAnimationFrame(frame); }
    function pause() { playing = false; syncPlay(); }
    playBtn.addEventListener('click', () => playing ? pause() : play());
    q('[data-act="reset"]').addEventListener('click', () => { pause(); t = 0; render(); });
    range.addEventListener('input', () => { pause(); t = range.value / 1000 * S.T; render(); });
    const speeds = el.querySelectorAll('.wm-speed button');
    const setSpeed = v => { speed = v; speeds.forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.speed) === v)); };
    speeds.forEach(b => b.addEventListener('click', () => setSpeed(Number(b.dataset.speed))));
    setSpeed(cfg.velocidad || 0.5);

    function apply(autoplay) {
      A = analizar(P); S = simular(P); setNar();
      buildScene(); buildFx(); buildEt(); renderResults();
      pause(); t = 0; render();
      if (autoplay && !reduce && visible) play();
    }
    function syncTabs() { el.querySelectorAll('[data-esc]').forEach(b => b.setAttribute('aria-pressed', b.dataset.esc === P.escenario)); }
    el.querySelectorAll('[data-esc]').forEach(b => b.addEventListener('click', () => { setEsc(b.dataset.esc); syncTabs(); buildParams(); apply(true); }));
    el.querySelectorAll('[data-ex]').forEach(b => b.addEventListener('click', () => {
      // un ejemplo con «escenario» carga una situación completa; sin él, solo cambia los valores que trae
      const e = cfg.ejemplos[Number(b.dataset.ex)], v = Object.assign({}, e.valores);
      if (v.escenario) setEsc(v.escenario, v); else { const keep = P.controles; P = Object.assign({}, P, v); P.controles = keep; }
      syncTabs(); buildParams(); apply(true);
    }));
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; if (!visible) pause(); }).observe(el);

    if ('ResizeObserver' in window) new ResizeObserver(() => { if (isNar() !== nar && S) { setNar(); buildScene(); buildFx(); buildEt(); render(); } }).observe(el);

    syncTabs(); buildParams(); apply(false);
    const api = {
      el, get params() { return Object.assign({}, P); },
      set(v, autoplay = true) {
        if (v.escenario && v.escenario !== P.escenario) setEsc(v.escenario, v);
        else { const keep = P.controles; P = Object.assign({}, P, v); if (!v.controles) P.controles = keep; }
        syncTabs(); buildParams(); apply(autoplay);
      },
    };
    el.__wm = api;
    return api;
  }

  function auto() {
    document.querySelectorAll('[data-widget="muelle"]').forEach(el => {
      if (el.__wm) return;
      let cfg = {};
      try { cfg = JSON.parse(el.getAttribute('data-config') || '{}'); } catch (e) { console.error('muelle: data-config no es JSON válido', e); }
      mount(el, cfg);
    });
  }

  const api = { mount, simular, analizar };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') {
    root.FisicaWidgets = Object.assign(root.FisicaWidgets || {}, { muelle: api });
    auto();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto);
  }
})(typeof window !== 'undefined' ? window : globalThis);
