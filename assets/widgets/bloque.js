/* Física interactiva · simulador «bloque»: un cuerpo que se mueve sobre una superficie horizontal.
   Escenarios:
     arrastre    se tira del bloque con una fuerza F que forma un ángulo α con la horizontal (con rozamiento μ);
                 α negativo = se empuja hacia abajo. opciones: m, F, alpha, mu, v0, hasta ("d" | "t" | "parar"), d, t, g,
                 dF (con hasta "parar": F actúa los primeros dF metros y después el bloque sigue hasta pararse)
     deslizar    se lanza el bloque y el rozamiento lo para: m, v0, mu, g
     frenada     un coche pasa de v0 a v1 en una distancia d (velocidades en km/h; si v1 > v0, acelera): m, v0kmh, v1kmh, d
     bala        una bala se incrusta una profundidad p en una tabla: m, v0, p (la fuerza de la madera sale de los datos)
     pared       un proyectil atraviesa una pared de espesor e y sale con v1: m, v0, v1, e
   Necesita nucleo.js. Ejemplo:
     <div data-widget="bloque" data-config='{"escenario": "arrastre", "m": 5, "F": 30, "alpha": 30, "mu": 0.2, "hasta": "t", "t": 10}'></div> */
(function (root) {
  'use strict';
  const N = root.FisicaWidgets && root.FisicaWidgets.nucleo || (typeof require !== 'undefined' ? require('./nucleo.js') : null);
  const { G0, clamp, rad, fmt, num, mover } = N.util;

  const DEF = {
    arrastre: { m: 5, F: 30, alpha: 30, mu: 0.2, v0: 0, hasta: 't', t: 10, d: 8, controles: ['m', 'F', 'alpha', 'mu', 't'] },
    deslizar: { m: 2, v0: 15, mu: 0.4, controles: ['m', 'v0', 'mu'] },
    frenada: { m: 1000, v0kmh: 108, v1kmh: 18, d: 50, controles: ['m', 'v0kmh', 'v1kmh', 'd'] },
    bala: { m: 0.04, v0: 300, p: 0.06, controles: ['m', 'v0', 'p'] },
    pared: { m: 0.1, v0: 400, v1: 150, e: 0.4, controles: ['m', 'v0', 'v1', 'e'] },
  };
  const NOMBRES = { arrastre: 'Tirar de un bloque', deslizar: 'Frena el rozamiento', frenada: 'Coche que frena o acelera', bala: 'Bala en una tabla', pared: 'Proyectil y pared' };
  const SL = {
    m: { label: 'Masa, m', unit: 'kg', log: true, min: 0.01, max: 2000, fmt: v => num(v, 2) },
    F: { label: 'Fuerza aplicada, F', unit: 'N', min: 0, max: 200, step: 1, fmt: v => fmt(v, 0) },
    alpha: { label: 'Ángulo de F con la horizontal, α', unit: '°', min: -60, max: 80, step: 1, fmt: v => (v < 0 ? '−' : '') + fmt(Math.abs(v), 0) },
    dF: { label: 'Distancia empujando, d', unit: 'm', min: 0.5, max: 50, step: 0.5, fmt: v => fmt(v, 1) },
    mu: { label: 'Coeficiente de rozamiento, μ', unit: '', min: 0, max: 1, step: 0.01, fmt: v => fmt(v, 2) },
    t: { label: 'Tiempo que actúa la fuerza, t', unit: 's', min: 1, max: 30, step: 0.5, fmt: v => fmt(v, 1) },
    d: { label: 'Distancia, d', unit: 'm', min: 1, max: 200, step: 1, fmt: v => fmt(v, 0) },
    v0: { label: 'Velocidad inicial, v₀', unit: 'm/s', min: 0, max: 30, step: 0.5, fmt: v => fmt(v, 1), maxFn: P => P.escenario === 'bala' || P.escenario === 'pared' ? 800 : 30 },
    v0kmh: { label: 'Velocidad inicial, v₀', unit: 'km/h', min: 0, max: 180, step: 1, fmt: v => fmt(v, 0) },
    v1kmh: { label: 'Velocidad final, v', unit: 'km/h', min: 0, max: 170, step: 1, fmt: v => fmt(v, 0) },
    p: { label: 'Profundidad que penetra, p', unit: 'cm', min: 0.01, max: 0.3, step: 0.005, fmt: v => fmt(v * 100, 1) },
    v1: { label: 'Velocidad al salir, v', unit: 'm/s', min: 0, max: 790, step: 5, fmt: v => fmt(v, 0) },
    e: { label: 'Espesor de la pared, e', unit: 'cm', min: 0.05, max: 1, step: 0.01, fmt: v => fmt(v * 100, 0) },
  };

  // ------------------------------------------------------------------ física
  function analizar(P) {
    const g = P.g || G0, m = P.m, esc = P.escenario, A = { g, esc };
    if (esc === 'arrastre') {
      const a = rad(P.alpha);
      A.Fx = P.F * Math.cos(a); A.Fy = P.F * Math.sin(a);
      A.N = Math.max(0, m * g - A.Fy); A.levanta = A.Fy > m * g;
      A.Fr = P.mu * A.N;
      A.mueve = P.v0 > 0 || A.Fx > A.Fr + 1e-9;
      A.a = A.mueve ? (A.Fx - A.Fr) / m : 0;
      if (P.hasta === 'parar' && P.dF > 0) {
        A.N2 = m * g; A.Fr2 = P.mu * A.N2;
        const v1sq = P.v0 * P.v0 + 2 * A.a * P.dF;
        A.vSuelta = A.mueve && v1sq > 0 ? Math.sqrt(v1sq) : 0;
        A.d2 = A.Fr2 > 0 ? A.vSuelta * A.vSuelta / (2 * P.mu * g) : Infinity;
      }
    } else if (esc === 'deslizar') {
      A.N = m * g; A.Fr = P.mu * A.N; A.a = -P.mu * g;
      A.d = P.mu > 0 ? P.v0 * P.v0 / (2 * P.mu * g) : Infinity; A.tStop = P.mu > 0 ? P.v0 / (P.mu * g) : Infinity;
    } else if (esc === 'frenada') {
      A.v0 = P.v0kmh / 3.6; A.v1 = P.v1kmh / 3.6; A.acelera = A.v1 > A.v0;
      A.W = 0.5 * m * (A.v1 * A.v1 - A.v0 * A.v0); A.Ff = -A.W / P.d; A.a = -A.Ff / m;
      A.tFren = A.Ff !== 0 ? (A.v0 - A.v1) / (A.Ff / m) : P.d / A.v0;
    } else if (esc === 'bala') {
      A.W = -0.5 * m * P.v0 * P.v0; A.Ff = -A.W / P.p; A.a = -A.Ff / m; A.tFren = P.v0 / (A.Ff / m);
    } else {
      const v1 = Math.min(P.v1, P.v0);
      A.v1 = v1; A.W = 0.5 * m * (v1 * v1 - P.v0 * P.v0); A.Ff = -A.W / P.e; A.a = -A.Ff / m; A.tFren = (P.v0 - v1) / (A.Ff / m);
    }
    return A;
  }

  function simular(P, A) {
    const m = P.m, esc = P.escenario, g = A.g;
    let o, s0 = 0, v0 = P.v0 || 0, zona = null, Fx = 0, Froz = 0, Ffr = 0;
    if (esc === 'arrastre') {
      Fx = A.Fx; Froz = A.Fr;
      const suelta = P.hasta === 'parar' && P.dF > 0, dF = P.dF;
      const empuja = s => !suelta || s < dF;
      o = { s0: 0, v0, bordes: suelta ? [dF] : [], acel: (s, sv) => empuja(s) ? (Fx - sv * Froz) / m : -sv * A.Fr2 / m,
        arranque: s => empuja(s) && Fx > Froz + 1e-9 ? (Fx - Froz) / m : 0, alParar: () => true };
      if (P.hasta === 'd') o.dMax = P.d; else if (P.hasta === 'parar') o.tMax = 600; else o.tMax = P.t;
    } else if (esc === 'deslizar') {
      Froz = A.Fr;
      o = { s0: 0, v0, acel: (s, sv) => -sv * Froz / m, arranque: () => 0, tMax: P.mu > 0 ? Infinity : 4 };
    } else if (esc === 'frenada') {
      Ffr = A.Ff; v0 = A.v0;
      o = { s0: 0, v0, acel: (s, sv) => -sv * Ffr / m, arranque: () => A.acelera ? -Ffr / m : 0, dMax: P.d };
    } else if (esc === 'bala') {
      Ffr = A.Ff; s0 = -0.6 * P.p; zona = [0, Infinity];
      o = { s0, v0, bordes: [0], acel: (s, sv) => s > 0 ? -sv * Ffr / m : 0, arranque: () => 0, tMax: 1 };
    } else {
      Ffr = A.Ff; s0 = -0.4 * P.e; zona = [0, P.e];
      o = { s0, v0, bordes: [0, P.e], acel: (s, sv) => s > 0 && s < P.e ? -sv * Ffr / m : 0, arranque: () => 0, sMax: P.e * 1.45, tMax: 1 };
    }
    const mv = mover(o);
    const Ec0 = 0.5 * m * v0 * v0;
    const estado = tt => {
      const e = mv.estado(tt);
      const sF = esc === 'arrastre' && P.hasta === 'parar' && P.dF > 0 ? Math.min(e.s, P.dF) : e.s;
      const Ec = 0.5 * m * e.v * e.v, WF = Fx * (sF - s0);
      return { t: tt, s: e.s, x: e.s - s0, v: e.v, a: e.a, Ec, WF, Q: Math.max(0, Ec0 + WF - Ec), empuja: esc === 'arrastre' && (!(P.hasta === 'parar' && P.dF > 0) || e.s < P.dF - 1e-9) };
    };
    const T = mv.T;
    let Emax = Ec0;
    for (let i = 0; i <= 200; i++) { const e = estado(T * i / 200); Emax = Math.max(Emax, e.Ec + e.Q); }
    return { T, estado, Emax, fin: mv.fin, s0, sFin: mv.sFin, vFin: mv.vFin, dFin: mv.dFin, zona, Ec0, Fx, Froz, Ffr };
  }

  // ------------------------------------------------------------------ dibujo
  const BW = 44;
  function escena(c) {
    const { mk, P, A, S, W } = c, esc = P.escenario, dyn = c.dyn;
    const yG = 196;
    mk('rect', { class: 'fw-band', x: 0, y: yG, width: W, height: 26 });
    mk('line', { class: 'fw-floor', x1: 0, y1: yG, x2: W, y2: yG });
    const bodyW = esc === 'frenada' ? 76 : esc === 'bala' || esc === 'pared' ? 30 : BW;
    let sA = S.s0, sB = S.sFin;
    if (esc === 'bala') sB = Math.max(S.sFin, P.p) * 1.7;
    if (esc === 'pared') sB = P.e * 1.45;
    if (!(sB > sA + 1e-9)) sB = sA + 1;
    const x0 = 40 + (esc === 'bala' || esc === 'pared' ? bodyW : 0), x1 = W - 40 - (esc === 'bala' || esc === 'pared' ? 0 : bodyW);
    const X = s => x0 + (s - sA) / (sB - sA) * (x1 - x0);
    Object.assign(dyn, { X, yG, bodyW });
    if (S.zona) {
      const zx0 = X(S.zona[0]), zx1 = isFinite(S.zona[1]) ? X(S.zona[1]) : W;
      mk('rect', { class: 'fw-wood', x: zx0, y: yG - 110, width: zx1 - zx0, height: 110 });
      if (esc === 'pared') {
        mk('line', { class: 'fw-dim', x1: zx0, y1: yG - 122, x2: zx1, y2: yG - 122 });
        mk('text', { class: 'fw-lbl-ink', x: (zx0 + zx1) / 2, y: yG - 128, 'text-anchor': 'middle' }).textContent = `e = ${fmt(P.e * 100, 0)} cm`;
      } else {
        mk('text', { class: 'fw-lbl', x: zx0 + 8, y: yG - 116 }).textContent = 'tabla de madera';
      }
    }
    // posición inicial y cota del recorrido
    const xs = X(S.s0), xe = X(S.sFin);
    if (esc === 'bala') {
      mk('line', { class: 'fw-dim', x1: X(0), y1: yG + 14, x2: X(S.sFin), y2: yG + 14 });
      mk('text', { class: 'fw-lbl-ink', x: X(S.sFin) + 6, y: yG + 19 }).textContent = `p = ${fmt(S.sFin * 100, 1)} cm`;
    } else if (esc !== 'pared') {
      mk('rect', { class: 'fw-ghost', x: xs, y: esc === 'frenada' ? yG - 34 : yG - BW, width: bodyW, height: esc === 'frenada' ? 34 : BW, rx: 3 });
      if (S.dFin > 0) {
        mk('line', { class: 'fw-dim', x1: xs, y1: yG + 14, x2: xe, y2: yG + 14 });
        mk('line', { class: 'fw-dim', x1: xs, y1: yG + 8, x2: xs, y2: yG + 20 });
        mk('line', { class: 'fw-dim', x1: xe, y1: yG + 8, x2: xe, y2: yG + 20 });
        mk('text', { class: 'fw-lbl-ink', x: (xs + xe) / 2 + (esc === 'frenada' ? 0 : 40), y: yG + 52, 'text-anchor': 'middle' }).textContent = `d = ${num(S.dFin, 3)} m`;
      }
    }
    if ((esc === 'arrastre' || esc === 'deslizar') && P.mu > 0) mk('text', { class: 'fw-lbl', x: W - 12, y: yG + 52, 'text-anchor': 'end' }).textContent = c.nar ? `μ = ${fmt(P.mu)}` : `suelo con rozamiento: μ = ${fmt(P.mu)}`;
    if (esc === 'frenada') {
      mk('text', { class: 'fw-lbl', x: xs, y: yG - 44 }).textContent = `${fmt(P.v0kmh, 0)} km/h`;
      mk('text', { class: 'fw-lbl', x: xe, y: yG - 44 }).textContent = `${fmt(P.v1kmh, 0)} km/h`;
    }
    // cuerpo
    if (esc === 'frenada') {
      const g = mk('g'); dyn.body = g;
      mk('path', { class: 'fw-body', d: 'M0 -12 L0 -24 Q2 -28 8 -28 L20 -28 L30 -40 L56 -40 L68 -28 L72 -28 Q76 -27 76 -22 L76 -12 Z' }, g);
      mk('circle', { class: 'fw-body', cx: 17, cy: -10, r: 9 }, g); mk('circle', { class: 'fw-body', cx: 59, cy: -10, r: 9 }, g);
    } else if (esc === 'bala' || esc === 'pared') {
      const g = mk('g'); dyn.body = g;
      mk('path', { class: 'fw-body', d: 'M-30 -5 L-8 -5 Q0 -5 4 0 Q0 5 -8 5 L-30 5 Z' }, g);
    } else {
      dyn.body = mk('rect', { class: 'fw-body', width: BW, height: BW, rx: 3, y: yG - BW });
    }
    dyn.V = c.arrow('fw-a-v', 'v'); dyn.F = c.arrow('fw-a-f', 'F'); dyn.Fr = c.arrow('fw-a-fr', esc === 'arrastre' || esc === 'deslizar' ? 'Fr' : 'F');
    dyn.P = c.arrow('fw-a-p', 'P'); dyn.N = c.arrow('fw-a-n', 'N');
  }

  function pintar(c, e) {
    const { P, A, S, dyn } = c, esc = P.escenario, X = dyn.X, yG = dyn.yG;
    const moving = Math.abs(e.v) > 1e-6, vmax = Math.max(Math.abs(P.v0 || 0), Math.abs(S.vFin), A.v0 || 0, 1e-9);
    let cx, cy, front;
    if (esc === 'frenada') { const x = X(e.s); dyn.body.setAttribute('transform', `translate(${x} ${yG})`); cx = x + 38; cy = yG - 24; front = x + 76; }
    else if (esc === 'bala' || esc === 'pared') { const x = X(e.s); dyn.body.setAttribute('transform', `translate(${x} ${yG - 55})`); cx = x - 13; cy = yG - 55; front = x + 4; }
    else { const x = X(e.s); dyn.body.setAttribute('x', x); cx = x + BW / 2; cy = yG - BW / 2; front = x + BW; }
    const vl = clamp(60 * Math.abs(e.v) / vmax, 0, 60);
    c.setArrow(dyn.V, cx - vl / 2, cy - (esc === 'bala' || esc === 'pared' ? 22 : esc === 'frenada' ? 30 : 40), 1, 0, vl, moving, 0, -2);
    if (esc === 'arrastre') {
      const g = A.g, mg = P.m * g, ref = Math.max(mg, P.F, 1e-9), L = f => clamp(56 * f / ref, 0, 56);
      const a = rad(P.alpha), on = e.empuja, Nn = on ? A.N : A.N2, Frn = on ? A.Fr : A.Fr2;
      if (P.alpha >= 0) c.setArrow(dyn.F, front, cy, Math.cos(a), -Math.sin(a), Math.max(L(P.F), P.F > 0 ? 26 : 0), P.F > 0 && on, 4, -4);
      else { const Lf = Math.max(L(P.F), 34), ux = Math.cos(a), uy = -Math.sin(a); c.setArrow(dyn.F, front - BW - 2 - ux * Lf, yG - BW + 4 - uy * Lf, ux, uy, Lf, P.F > 0 && on, -ux * (Lf + 26) - 4, -uy * (Lf + 26)); }
      c.setArrow(dyn.Fr, cx - 4, yG - 3, -1, 0, Math.max(L(Frn), Frn > 0 ? 16 : 0), Frn > 0 && (moving || e.t === 0 && A.mueve), 0, 12);
      c.setArrow(dyn.P, cx, cy, 0, 1, L(mg), true, 12, 0);
      c.setArrow(dyn.N, cx, cy, 0, -1, L(Nn), Nn > 0, 12, 0);
    } else if (esc === 'deslizar') {
      const mg = P.m * A.g, L = f => clamp(60 * f / mg, 0, 60);
      c.setArrow(dyn.Fr, cx - 4, yG - 3, -1, 0, Math.max(L(A.Fr), 16), moving && A.Fr > 0, 0, 12);
      c.setArrow(dyn.P, cx, cy, 0, 1, 44, true, 12, 0); c.setArrow(dyn.N, cx, cy, 0, -1, 44, true, 12, 0);
      c.setArrow(dyn.F, 0, 0, 1, 0, 0, false);
    } else {
      const inZone = !S.zona || (e.s > S.zona[0] && e.s < S.zona[1]);
      c.setArrow(dyn.Fr, esc === 'frenada' ? cx : front - 2, esc === 'frenada' ? yG - 4 : cy, -1, 0, 46, moving && inZone && A.Ff > 0, 0, 12);
      c.setArrow(dyn.F, cx - 20, yG - 4, 1, 0, 46, esc === 'frenada' && A.Ff < 0 && moving, 0, 12); c.setArrow(dyn.P, 0, 0, 1, 0, 0, false); c.setArrow(dyn.N, 0, 0, 1, 0, 0, false);
    }
    // fase
    if (e.t === 0) return esc === 'arrastre' ? (A.mueve ? (P.alpha < 0 ? 'Empieza a empujar' : 'Empieza a tirar') : 'No se mueve: F·cos α ≤ Fr') : esc === 'frenada' ? (A.acelera ? 'Empieza a acelerar' : 'Empieza a frenar') : 'Sale lanzado';
    if (esc === 'arrastre') return !moving ? 'Parado' : !e.empuja ? 'Sin F: solo frena el rozamiento' : A.a > 1e-9 ? 'Acelera: F·cos α > Fr' : A.a < -1e-9 ? 'Frena' : 'Velocidad constante: F·cos α = Fr';
    if (esc === 'frenada' && A.acelera) return 'Acelera: la fuerza neta va a favor';
    if (esc === 'bala') return e.s <= 0 ? 'Vuela hacia la tabla' : moving ? 'La madera la frena' : 'Se queda incrustada';
    if (esc === 'pared') return e.s <= 0 ? 'Vuela hacia la pared' : e.s < P.e ? 'Atraviesa la madera: pierde Ec' : 'Sale más despacio';
    return moving ? 'Frena' : 'Se para';
  }

  function lectura(P, e) {
    const esc = P.escenario;
    const v = esc === 'frenada' ? `${fmt(e.v * 3.6, 0)} km/h` : `${num(e.v, 3)} m/s`;
    const x = esc === 'bala' || esc === 'pared' ? `${fmt(Math.max(0, e.s) * 100, 1)} cm` : `${num(e.x, 3)} m`;
    return `<span>t <b>${num(e.t, 3)} s</b></span><span>${esc === 'bala' ? 'dentro' : esc === 'pared' ? 'en la pared' : 'recorrido'} <b>${x}</b></span><span>v <b>${v}</b></span>`;
  }

  function energias(P) {
    const EN = [{ k: 'Ec', nombre: 'Ec', color: 'var(--c-v)' }, { k: 'Q', nombre: 'Calor', color: 'var(--c-fr)' }];
    return EN;
  }

  function resultados(P, A, S) {
    const esc = P.escenario, f = [], m = P.m;
    let ver = '';
    if (esc === 'arrastre') {
      f.push(['Normal', P.alpha > 0 ? 'N = m·g − F·sen α' : P.alpha < 0 ? 'N = m·g + F·sen |α| (F empuja hacia abajo)' : 'N = m·g', `${num(A.N)} N`]);
      f.push(['Rozamiento', 'Fr = μ·N', `${num(A.Fr)} N`]);
      f.push(['Aceleración', 'a = (F·cos α − Fr) / m', A.mueve ? `${num(A.a)} m/s²` : '0', !A.mueve]);
      const tt = S.T;
      if (P.hasta === 'parar' && P.dF > 0) {
        f.push([`Velocidad al dejar de empujar (${num(P.dF)} m)`, 'v² = v₀² + 2·a·d', `${num(A.vSuelta)} m/s`]);
        f.push(['Trabajo de F', 'W F = F·cos α·d', `${num(A.Fx * P.dF)} J`]);
        f.push(['Distancia después, hasta pararse', '−μ·m·g·x = 0 − ½·m·v²', `${num(A.d2)} m`]);
        f.push(['Trabajo total del rozamiento', 'W roz = −(Ec₀ + W F) (empieza y acaba con la misma Ec)', `${num(-(S.Ec0 + A.Fx * P.dF))} J`]);
        return { filas: f, veredicto: 'Al final el bloque está parado: todo el trabajo de F se ha convertido en calor por el rozamiento.' };
      }
      f.push([P.hasta === 'd' ? `Velocidad tras ${num(P.d)} m` : `Velocidad a los ${num(P.t)} s`, P.hasta === 'd' ? 'v² = v₀² + 2·a·d' : 'v = v₀ + a·t', `${num(S.vFin)} m/s`]);
      f.push([P.hasta === 'd' ? 'Tiempo' : 'Distancia recorrida', P.hasta === 'd' ? 't = (v − v₀) / a' : 'Δx = v₀·t + ½·a·t²', P.hasta === 'd' ? `${num(tt)} s` : `${num(S.dFin)} m`]);
      f.push(['Trabajo de F', 'W F = F·cos α·Δx', `${num(S.Fx * S.dFin)} J`]);
      f.push(['Trabajo del rozamiento', 'W roz = −Fr·Δx', `${num(-A.Fr * S.dFin)} J`]);
      f.push(['Trabajo de P y de N', 'perpendiculares al desplazamiento: cos 90° = 0', '0 J']);
      f.push(['Trabajo total = ΔEc', '½·m·v² − ½·m·v₀²', `${num(0.5 * m * S.vFin * S.vFin - S.Ec0)} J`]);
      ver = A.levanta ? '<strong>Ojo:</strong> F·sen α supera al peso: el bloque se levantaría del suelo.' : !A.mueve ? `<strong>No se mueve:</strong> F·cos α = ${num(A.Fx)} N no supera al rozamiento máximo ${num(A.Fr)} N.` : 'El peso y la normal no trabajan porque son perpendiculares al desplazamiento. El trabajo total es la variación de energía cinética.';
    } else if (esc === 'deslizar') {
      f.push(['Rozamiento', 'Fr = μ·m·g', `${num(A.Fr)} N`]);
      f.push(['Distancia hasta pararse', '−μ·m·g·d = 0 − ½·m·v₀²  ⟹  d = v₀² / (2·μ·g)', P.mu > 0 ? `${num(A.d)} m` : 'no se para']);
      f.push(['Tiempo hasta pararse', 't = v₀ / (μ·g)', P.mu > 0 ? `${num(A.tStop)} s` : '—']);
      f.push(['Trabajo del rozamiento', 'W roz = −½·m·v₀²', `${num(-0.5 * m * P.v0 * P.v0)} J`]);
      ver = 'La masa se simplifica: con el mismo μ y la misma v₀, un bloque ligero y uno pesado recorren la misma distancia.';
    } else if (esc === 'frenada') {
      if (A.acelera) {
        f.push(['Trabajo de la fuerza neta', 'W = ½·m·v² − ½·m·v₀²', `${num(A.W)} J`]);
        f.push(['Fuerza neta media', 'W = F·d  ⟹  F = W / d', `${num(-A.Ff)} N`]);
        f.push(['Aceleración media', 'a = F / m', `${num(A.a)} m/s²`]);
        f.push(['Tiempo', 't = (v − v₀) / a', `${num(A.tFren)} s`]);
        ver = 'El trabajo de la fuerza neta es positivo: aumenta la energía cinética. Con el doble de masa haría falta el doble de trabajo.';
      } else {
        f.push(['Trabajo de la fuerza de frenado', 'W = ½·m·v² − ½·m·v₀²', `${num(A.W)} J`]);
        f.push(['Fuerza de frenado', 'W = −F·d  ⟹  F = −W / d', `${num(A.Ff)} N`]);
        f.push(['Deceleración', 'a = F / m', `${num(A.a)} m/s²`]);
        f.push(['Tiempo de frenada', 't = (v₀ − v) / |a|', `${num(A.tFren)} s`]);
        ver = 'El trabajo de la fuerza de frenado es negativo: quita energía cinética, que se convierte en calor (en los frenos, en el aire, en el suelo).';
      }
    } else if (esc === 'bala') {
      f.push(['Trabajo de la madera', 'W = 0 − ½·m·v₀²', `${num(A.W)} J`]);
      f.push(['Fuerza de la madera', 'W = −F·p  ⟹  F = ½·m·v₀² / p', `${num(A.Ff)} N`]);
      f.push(['Deceleración', 'a = F / m', `${num(A.a)} m/s²`]);
      f.push(['Tiempo dentro de la madera', 't = v₀ / |a|', `${num(A.tFren)} s`]);
      ver = `La fuerza de la madera es <strong>${num(A.Ff / (m * G0), 2)} veces</strong> el peso de la bala: por eso se frena en tan poco espacio.`;
    } else {
      f.push(['Trabajo de la madera', 'W = ½·m·v² − ½·m·v₀²', `${num(A.W)} J`]);
      f.push(['Fuerza de la madera', 'W = −F·e  ⟹  F = −W / e', `${num(A.Ff)} N`]);
      f.push(['Tiempo dentro de la pared', 't = (v₀ − v) / |a|', `${num(A.tFren)} s`]);
      ver = `Pierde el ${fmt(100 * (1 - (A.v1 * A.v1) / (P.v0 * P.v0)), 0)} % de su energía cinética, aunque su velocidad solo baja un ${fmt(100 * (1 - A.v1 / P.v0), 0)} %: la energía va con v².`;
    }
    return { filas: f, veredicto: ver };
  }

  const def = {
    nombre: 'bloque', titulo: 'Simulador del bloque', aria: 'Animación del cuerpo que se mueve', DEF, NOMBRES, SL,
    etiqueta: (k, P) => k === 'v0' && (P.escenario === 'bala' || P.escenario === 'pared') ? 'Velocidad de llegada, v₀' : null,
    totalNombre: P => P.escenario === 'arrastre' ? (P.v0 > 0 ? 'Ec inicial + trabajo de F' : 'Trabajo de F') : 'Total',
    analizar, simular, vista: { w: 640, h: 262 }, escena, pintar, lectura, energias, resultados,
    textoGrafica: 'La línea discontinua es la energía cinética más el calor: la energía que el cuerpo pierde no desaparece, se convierte en calor.',
  };
  const api = N.registrar('bloque', def);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') root.FisicaWidgets.bloque = api;
})(typeof window !== 'undefined' ? window : globalThis);
