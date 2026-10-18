/* Física interactiva · simulador «plano»: bloque en un plano inclinado con rozamiento.
   Escenarios:
     sube     se lanza hacia arriba desde la base (opcional: un tramo horizontal L0 antes de la rampa)
              opciones: m, alpha, mu, v0, L0, Lr (largo de la rampa; si no se da, la necesaria)
     baja     se suelta desde lo alto de una rampa de altura h; con suelo: true sigue por un suelo horizontal hasta pararse
              opciones: m, alpha, h, mu, suelo, mu1 (rozamiento del suelo; por defecto el de la rampa), L1 (largo fijo del suelo), v0
     empuje   se sube (o se baja frenado) con velocidad constante con una fuerza F paralela al plano
              opciones: m, alpha, mu, d, v, sentido ("sube" | "baja")
   Necesita nucleo.js. */
(function (root) {
  'use strict';
  const N = root.FisicaWidgets && root.FisicaWidgets.nucleo || (typeof require !== 'undefined' ? require('./nucleo.js') : null);
  const { G0, clamp, rad, fmt, num, mover } = N.util;

  const DEF = {
    sube: { m: 2, alpha: 30, mu: 0.3, v0: 3, L0: 0, Lr: 0, controles: ['m', 'alpha', 'mu', 'v0'] },
    baja: { m: 4, alpha: 36.87, h: 6, mu: 0.25, mu1: null, L1: 0, v0: 0, controles: ['m', 'alpha', 'h', 'mu'] },
    empuje: { m: 120, alpha: 30, mu: 0.3, d: 10, v: 1, sentido: 'sube', controles: ['m', 'alpha', 'mu', 'd'] },
  };
  const NOMBRES = { sube: 'Lanzado hacia arriba', baja: 'Baja desde arriba', empuje: 'Con velocidad constante' };
  const SL = {
    m: { label: 'Masa, m', unit: 'kg', log: true, min: 0.1, max: 500, fmt: v => num(v, 2) },
    alpha: { label: 'Ángulo del plano, α', unit: '°', min: 5, max: 70, step: 1, fmt: v => fmt(v, v % 1 ? 1 : 0) },
    mu: { label: 'Rozamiento de la rampa, μ', unit: '', min: 0, max: 1, step: 0.01, fmt: v => fmt(v, v * 100 % 1 ? 3 : 2) },
    mu1: { label: 'Rozamiento del suelo, μ\'', unit: '', min: 0.01, max: 1, step: 0.01, fmt: v => fmt(v, v * 100 % 1 ? 3 : 2) },
    v0: { label: 'Velocidad inicial, v₀', unit: 'm/s', min: 0, max: 20, step: 0.1, fmt: v => fmt(v, 1) },
    h: { label: 'Altura de la rampa, h', unit: 'm', min: 0.2, max: 20, step: 0.1, fmt: v => fmt(v, 1) },
    L0: { label: 'Tramo horizontal antes, L', unit: 'm', min: 0, max: 10, step: 0.1, fmt: v => fmt(v, 1) },
    d: { label: 'Distancia sobre el plano, d', unit: 'm', min: 1, max: 40, step: 1, fmt: v => fmt(v, 0) },
  };

  // ------------------------------------------------------------------ física
  function analizar(P) {
    const g = P.g || G0, a = rad(P.alpha), sa = Math.sin(a), ca = Math.cos(a), A = { g, sa, ca, tan: Math.tan(a) };
    A.N = P.m * g * ca; A.Fr = P.mu * A.N; A.Px = P.m * g * sa;
    if (P.escenario === 'sube') {
      A.v1sq = P.v0 * P.v0 - 2 * P.mu * g * (P.L0 || 0);
      A.llega = A.v1sq > 1e-12; A.v1 = A.llega ? Math.sqrt(A.v1sq) : 0;
      A.dmax = A.llega ? A.v1sq / (2 * g * (sa + P.mu * ca)) : 0;
      if (P.Lr > 0 && A.dmax > P.Lr) { A.saleArriba = true; A.dmax = P.Lr; }
      A.hmax = A.dmax * sa; A.vuelve = A.tan > P.mu + 1e-12 && !A.saleArriba;
      A.vVuelta = A.vuelve ? Math.sqrt(2 * g * A.dmax * (sa - P.mu * ca)) : 0;
      A.Wsube = -A.Fr * A.dmax;
    } else if (P.escenario === 'baja') {
      A.Lr = P.h / sa;
      A.arranca = P.v0 > 0 || A.tan > P.mu + 1e-12;
      const vB2 = P.v0 * P.v0 + 2 * g * A.Lr * (sa - P.mu * ca);
      A.llegaBase = A.arranca && vB2 > 0; A.vB = A.llegaBase ? Math.sqrt(vB2) : 0;
      A.mu1 = P.mu1 == null ? P.mu : P.mu1;
      A.dHor = A.mu1 > 0 ? A.vB * A.vB / (2 * A.mu1 * g) : Infinity;
      A.Wrampa = -A.Fr * A.Lr;
    } else {
      const up = P.sentido !== 'baja';
      A.F = up ? P.m * g * (sa + P.mu * ca) : P.m * g * (sa - P.mu * ca);   // sube: empuja hacia arriba; baja: frena (hacia arriba si > 0)
      A.WF = up ? A.F * P.d : -A.F * P.d; A.Wroz = -A.Fr * P.d; A.dEp = (up ? 1 : -1) * P.m * g * P.d * sa; A.h = P.d * sa;
    }
    return A;
  }

  // trayectoria: lista de tramos { s0, s1, th (inclinación en el sentido de s), mu, x0, y0 }
  function camino(P, A) {
    const a = rad(P.alpha), T = [];
    if (P.escenario === 'sube') {
      let s = 0, x = 0;
      if (P.L0 > 0) { T.push({ s0: 0, s1: P.L0, th: 0, mu: P.mu, x0: 0, y0: 0 }); s = P.L0; x = P.L0; }
      const Lr = P.Lr > 0 ? P.Lr : Math.max(A.dmax * 1.35, 0.3);
      T.push({ s0: s, s1: s + Lr, th: a, mu: P.mu, x0: x, y0: 0, rampa: true });
    } else if (P.escenario === 'baja') {
      const Lr = A.Lr;
      T.push({ s0: 0, s1: Lr, th: -a, mu: P.mu, x0: 0, y0: P.h, rampa: true });
      const Lh = P.L1 > 0 ? P.L1 : (P.suelo ? Math.min(Math.max(A.dHor * 1.25, 0.5), 200) : 0);
      if (Lh > 0) T.push({ s0: Lr, s1: Lr + Lh, th: 0, mu: A.mu1, x0: Lr * Math.cos(a), y0: 0 });
    } else {
      const up = P.sentido !== 'baja';
      T.push(up ? { s0: 0, s1: P.d, th: a, mu: P.mu, x0: 0, y0: 0, rampa: true } : { s0: 0, s1: P.d, th: -a, mu: P.mu, x0: 0, y0: P.d * Math.sin(a), rampa: true });
    }
    return T;
  }
  const tramo = (T, s) => T.find(t => s >= t.s0 - 1e-12 && s <= t.s1 + 1e-12 && (s < t.s1 || t === T[T.length - 1])) || (s < T[0].s0 ? T[0] : T[T.length - 1]);
  const punto = (T, s) => { const t = tramo(T, s), u = s - t.s0; return { x: t.x0 + u * Math.cos(t.th), y: t.y0 + u * Math.sin(t.th), t }; };

  function simular(P, A) {
    const g = A.g, m = P.m, T = camino(P, A), esc = P.escenario;
    const Fpar = esc === 'empuje' ? (P.sentido !== 'baja' ? A.F : -A.F) : 0;   // fuerza a lo largo de s
    const acel = (s, sv) => { const t = tramo(T, s); return -g * Math.sin(t.th) - sv * t.mu * g * Math.cos(t.th) + Fpar / m; };
    const arranque = s => {
      const t = tramo(T, s), drive = -g * Math.sin(t.th) + Fpar / m, hold = t.mu * g * Math.cos(t.th);
      return Math.abs(drive) <= hold + 1e-12 ? 0 : drive - Math.sign(drive) * hold;
    };
    const sEnd = T[T.length - 1].s1;
    const o = { s0: 0, v0: esc === 'empuje' ? P.v : P.v0, bordes: T.map(t => t.s1).slice(0, -1), acel, arranque, sMin: esc === 'sube' ? 0 : -Infinity, sMax: sEnd, tMax: 600 };
    if (esc === 'sube' && o.v0 <= 0) o.v0 = 0;
    const mv = mover(o);
    const p0 = punto(T, 0), Ec0 = 0.5 * m * o.v0 * o.v0, Ep0 = m * g * p0.y;
    const estado = tt => {
      const e = mv.estado(tt), p = punto(T, e.s), Ec = 0.5 * m * e.v * e.v, Ep = m * g * p.y;
      const WF = Fpar * e.s;
      const Q = Math.max(0, Ec0 + Ep0 + WF - Ec - Ep) * (esc === 'empuje' && P.sentido === 'baja' ? 0 : 1);
      const r = { t: tt, s: e.s, v: e.v, a: e.a, d: e.d, Ec, Ep, Q, WF, x: p.x, y: p.y, th: p.t.th, mu: p.t.mu };
      if (esc === 'empuje' && P.sentido === 'baja') { r.Q = A.Fr * e.d; r.EF = -WF; }
      return r;
    };
    let Emax = 0;
    for (let i = 0; i <= 240; i++) { const e = estado(mv.T * i / 240); Emax = Math.max(Emax, e.Ec + e.Ep + e.Q + (e.EF || 0)); }
    return { T: mv.T, estado, Emax, Fpar, camino: T, fin: mv.fin, sFin: mv.sFin, vFin: mv.vFin, dFin: mv.dFin, punto: s => punto(T, s) };
  }

  // ------------------------------------------------------------------ dibujo
  function escena(c) {
    const { mk, P, A, S, W, H } = c, dyn = c.dyn, T = S.camino, esc = P.escenario;
    // caja de la trayectoria en metros
    const pts = [punto(T, T[0].s0)].concat(T.map(t => punto(T, t.s1)));
    let xmin = Math.min(...pts.map(p => p.x)), xmax = Math.max(...pts.map(p => p.x)), ymax = Math.max(...pts.map(p => p.y), 0);
    const mL = 48, mR = 40, mT = 50, mB = 46;
    const k = Math.min((W - mL - mR) / Math.max(xmax - xmin, 1e-6), (H - mT - mB) / Math.max(ymax, 1e-6));
    const yG = H - mB, ox = mL + ((W - mL - mR) - (xmax - xmin) * k) / 2 - xmin * k;
    const X = x => ox + x * k, Y = y => yG - y * k;
    Object.assign(dyn, { X, Y, k, yG });
    mk('rect', { class: 'fw-band', x: 0, y: yG, width: W, height: H - yG });
    mk('line', { class: 'fw-floor', x1: 0, y1: yG, x2: W, y2: yG });
    // rampas
    for (const t of T) if (t.rampa) {
      const a = punto(T, t.s0), b = punto(T, t.s1), top = a.y > b.y ? a : b, bot = a.y > b.y ? b : a;
      mk('polygon', { class: 'fw-plane', points: `${X(top.x)},${Y(top.y)} ${X(top.x)},${yG} ${X(bot.x)},${yG}` });
      // ángulo α en la base
      const r = 34, dirx = Math.sign(top.x - bot.x) || 1, al = Math.abs(t.th);
      mk('path', { class: 'fw-dim', d: `M${X(bot.x) + dirx * r} ${yG}A${r} ${r} 0 0 ${dirx > 0 ? 0 : 1} ${X(bot.x) + dirx * r * Math.cos(al)} ${yG - r * Math.sin(al)}` });
      mk('text', { class: 'fw-lbl', x: X(bot.x) + dirx * (r + 6), y: yG - 8, 'text-anchor': dirx > 0 ? 'start' : 'end' }).textContent = `${fmt(P.alpha, P.alpha % 1 ? 1 : 0)}°`;
      if (esc === 'baja' || esc === 'empuje') {
        const xh = X(top.x) + dirx * 12;
        mk('line', { class: 'fw-dim', x1: xh, y1: Y(top.y), x2: xh, y2: yG });
        mk('line', { class: 'fw-dim', x1: xh - 5, y1: Y(top.y), x2: xh + 5, y2: Y(top.y) });
        mk('text', { class: 'fw-lbl-ink', x: X(top.x) - dirx * 8, y: (Y(top.y) + yG) / 2 + 22, 'text-anchor': dirx > 0 ? 'end' : 'start' }).textContent = `h = ${num(top.y, 3)} m`;
      }
    }
    if (esc === 'sube' && A.llega) {
      const pm = punto(T, (P.L0 || 0) + A.dmax);
      mk('line', { class: 'fw-ref', x1: X(pm.x) - 110, y1: Y(pm.y), x2: X(pm.x) + 20, y2: Y(pm.y) });
      mk('text', { class: 'fw-lbl', x: X(pm.x) - 114, y: Y(pm.y) + 4, 'text-anchor': 'end' }).textContent = `h máx = ${num(A.hmax, 3)} m`;
      if (P.Lr > 0) mk('text', { class: 'fw-lbl', x: 12, y: 24 }).textContent = c.nar ? `plano de ${num(P.Lr, 3)} m (dibujado en parte)` : `El plano mide ${num(P.Lr, 3)} m; solo se dibuja el tramo que recorre.`;
    }
    if (esc === 'sube' && P.L0 > 0) {
      mk('line', { class: 'fw-dim', x1: X(0), y1: yG + 14, x2: X(P.L0), y2: yG + 14 });
      mk('text', { class: 'fw-lbl-ink', x: (X(0) + X(P.L0)) / 2, y: yG + 34, 'text-anchor': 'middle' }).textContent = `L = ${num(P.L0, 3)} m`;
    }
    if (esc === 'baja' && T.length > 1) {
      const b = punto(T, T[1].s0), e = punto(T, Math.min(T[1].s0 + A.dHor, T[1].s1));
      if (isFinite(A.dHor) && A.llegaBase) {
        mk('line', { class: 'fw-dim', x1: X(b.x), y1: yG + 14, x2: X(e.x), y2: yG + 14 });
        mk('text', { class: 'fw-lbl-ink', x: (X(b.x) + X(e.x)) / 2, y: yG + 34, 'text-anchor': 'middle' }).textContent = `${num(A.dHor, 3)} m`;
      }
    }
    const p0 = punto(T, 0);
    dyn.ghost = mk('g'); mk('rect', { class: 'fw-ghost', x: -15, y: -30, width: 30, height: 30, rx: 3 }, dyn.ghost);
    const rot0 = -p0.t.th * 180 / Math.PI;
    dyn.ghost.setAttribute('transform', `translate(${X(p0.x)} ${Y(p0.y)}) rotate(${rot0})`);
    dyn.body = mk('g'); mk('rect', { class: 'fw-body', x: -15, y: -30, width: 30, height: 30, rx: 3 }, dyn.body);
    dyn.V = c.arrow('fw-a-v', 'v'); dyn.Fr = c.arrow('fw-a-fr', 'Fr'); dyn.P = c.arrow('fw-a-p', 'P'); dyn.N = c.arrow('fw-a-n', 'N'); dyn.F = c.arrow('fw-a-f', 'F');
  }

  function pintar(c, e) {
    const { P, A, S, dyn } = c, esc = P.escenario, X = dyn.X, Y = dyn.Y;
    const th = e.th, rot = -th * 180 / Math.PI, bx = X(e.x), by = Y(e.y);
    dyn.body.setAttribute('transform', `translate(${bx} ${by}) rotate(${rot})`);
    // ejes del bloque: u a lo largo de s (en pantalla), n normal hacia fuera
    const ux = Math.cos(th), uy = -Math.sin(th), nx = -Math.sin(th) * 1, ny = -Math.cos(th);
    const cx = bx + 15 * nx, cy = by + 15 * ny;
    const moving = Math.abs(e.v) > 1e-6, sv = Math.sign(e.v);
    const mg = P.m * A.g, L = f => clamp(60 * f / mg, 0, 70);
    c.setArrow(dyn.P, cx, cy, 0, 1, 52, true, 12, 0);
    const Nn = mg * Math.cos(th);
    c.setArrow(dyn.N, cx, cy, nx, ny, L(Nn), true, 10 * ux, 10 * uy);
    const Fr = e.mu * Nn;
    c.setArrow(dyn.Fr, bx - 2 * nx, by - 2 * ny + 1, -sv * ux, -sv * uy, Math.max(L(Fr), 18), moving && Fr > 0, 0, 12);
    const vmax = Math.max(P.v0 || 0, P.v || 0, A.vB || 0, A.v1 || 0, 1e-9);
    c.setArrow(dyn.V, cx + 34 * nx - 14 * sv * ux, cy + 34 * ny - 14 * sv * uy, sv * ux, sv * uy, clamp(60 * Math.abs(e.v) / vmax, 0, 60), moving, 0, -4);
    if (esc === 'empuje') { const sf = Math.sign(S.Fpar) || 1; c.setArrow(dyn.F, cx + sf * 15 * ux, cy + sf * 15 * uy, sf * ux, sf * uy, Math.max(L(Math.abs(A.F)), 18), Math.abs(A.F) > 1e-9, 0, -12); }
    else c.setArrow(dyn.F, 0, 0, 1, 0, 0, false);
    // fase
    if (esc === 'empuje') return e.t === 0 ? 'Velocidad constante: ΣF = 0' : P.sentido !== 'baja' ? 'Sube con v constante' : 'Baja con v constante';
    const onRamp = Math.abs(th) > 1e-9;
    if (e.t === 0) return esc === 'baja' ? (A.arranca ? 'Se suelta' : 'No arranca: tg α ≤ μ') : 'Se lanza';
    if (!moving) return S.fin === 'parado' && e.t >= S.T - 1e-9 ? (onRamp ? 'Se queda parado en el plano' : 'Se para') : 'v = 0: altura máxima';
    if (onRamp) { const up = Math.sign(th) * sv > 0; return up ? 'Sube: Px y Fr frenan' : 'Baja: Px acelera, Fr frena'; }
    return 'Suelo horizontal: frena el rozamiento';
  }

  function lectura(P, e) {
    return `<span>t <b>${num(e.t, 3)} s</b></span><span>recorrido <b>${num(e.d, 3)} m</b></span><span>altura <b>${num(e.y, 3)} m</b></span><span>v <b>${num(Math.abs(e.v), 3)} m/s</b></span>`;
  }

  function energias(P) {
    const EN = [{ k: 'Ec', nombre: 'Ec', color: 'var(--c-v)' }, { k: 'Ep', nombre: 'Ep', color: 'var(--c-p)' }];
    if (P.mu > 0 || (P.mu1 > 0)) EN.push({ k: 'Q', nombre: 'Calor', color: 'var(--c-fr)' });
    if (P.escenario === 'empuje' && P.sentido === 'baja') EN.push({ k: 'EF', nombre: 'Se lleva F', color: 'var(--c-a)' });
    return EN;
  }

  function resultados(P, A, S) {
    const f = [], esc = P.escenario, m = P.m;
    let ver = '';
    if (esc === 'sube') {
      if (P.L0 > 0) f.push(['Velocidad al llegar a la rampa', 'v₁² = v₀² − 2·μ·g·L', A.llega ? `${num(A.v1)} m/s` : 'no llega', !A.llega]);
      f.push(['Normal y rozamiento', 'N = m·g·cos α ; Fr = μ·N', `${num(A.N)} N ; ${num(A.Fr)} N`]);
      f.push(['Distancia sobre el plano', '½·m·v² − μ·m·g·cos α·d = m·g·d·sen α', `${num(A.dmax)} m`]);
      f.push(['Altura máxima', 'h = d·sen α', `${num(A.hmax)} m`]);
      f.push(['Trabajo del rozamiento al subir', 'W roz = −μ·m·g·cos α·d', `${num(A.Wsube)} J`]);
      f.push(['¿Vuelve a bajar?', 'baja si tg α > μ', A.vuelve ? `sí: ${fmt(A.tan, 2)} > ${fmt(P.mu, 2)}` : 'no']);
      f.push(['Velocidad al volver a la base', 'v = √[2·g·d·(sen α − μ·cos α)]', A.vuelve ? `${num(A.vVuelta)} m/s` : '—', !A.vuelve]);
      ver = A.saleArriba ? 'Llega al final del plano antes de pararse.' : P.mu === 0 ? 'Sin rozamiento la energía mecánica se conserva: vuelve a la base con la misma rapidez con la que salió.' : `Del total de energía, el rozamiento convierte <strong>${num(A.Fr * A.dmax * (A.vuelve ? 2 : 1))} J</strong> en calor${A.vuelve ? ' entre la subida y la bajada' : ''}.`;
    } else if (esc === 'baja') {
      f.push(['Largo de la rampa', 'd = h / sen α', `${num(A.Lr)} m`]);
      f.push(['Normal y rozamiento', 'N = m·g·cos α ; Fr = μ·N', `${num(A.N)} N ; ${num(A.Fr)} N`]);
      f.push(['Trabajo del rozamiento en la rampa', 'W roz = −μ·m·g·cos α·d', `${num(A.Wrampa)} J`]);
      f.push(['Velocidad en la base', 'm·g·h − μ·m·g·cos α·d = ½·m·v²', A.llegaBase ? `${num(A.vB)} m/s` : 'no baja', !A.llegaBase]);
      if (S.camino.length > 1) f.push(['Distancia en el suelo hasta pararse', '½·m·v² = μ\'·m·g·x', `${num(A.dHor)} m`]);
      ver = !A.arranca ? `<strong>No arranca:</strong> tg α = ${fmt(A.tan, 3)} no supera a μ = ${fmt(P.mu, 2)}.` : `Sin rozamiento llegaría a ${num(Math.sqrt(P.v0 * P.v0 + 2 * A.g * P.h))} m/s; el rozamiento se queda con ${num(-A.Wrampa)} J de los ${num(m * A.g * P.h)} J de energía potencial.`;
    } else {
      const up = P.sentido !== 'baja';
      f.push(['Normal y rozamiento', 'N = m·g·cos α ; Fr = μ·N', `${num(A.N)} N ; ${num(A.Fr)} N`]);
      f.push(['Fuerza F', up ? 'ΣF = 0: F = m·g·sen α + μ·m·g·cos α' : 'ΣF = 0: F = m·g·sen α − μ·m·g·cos α', `${num(A.F)} N`]);
      f.push(['Trabajo de F', up ? 'W F = F·d' : 'W F = −F·d (frena)', `${num(A.WF)} J`]);
      f.push(['Trabajo del rozamiento', 'W roz = −Fr·d', `${num(A.Wroz)} J`]);
      f.push(['Variación de Ep', `ΔEp = ${up ? '+' : '−'}m·g·d·sen α`, `${num(A.dEp)} J`]);
      ver = up ? 'Como la velocidad no cambia, ΔEc = 0: el trabajo de F se reparte entre la energía potencial que gana el cuerpo y el calor del rozamiento.' : 'La energía potencial que pierde se reparte entre el calor del rozamiento y la que se lleva quien aplica F.';
    }
    return { filas: f, veredicto: ver };
  }

  const def = {
    nombre: 'plano', titulo: 'Simulador del plano inclinado', aria: 'Animación del bloque en el plano', DEF, NOMBRES, SL,
    etiqueta: (k, P) => k === 'mu' && P.escenario === 'sube' && P.L0 > 0 ? 'Rozamiento (suelo y rampa), μ' : k === 'v0' && P.escenario === 'baja' ? 'Velocidad inicial (hacia abajo), v₀' : null,
    analizar, simular, vista: { w: 640, h: 290 }, escena, pintar, lectura, energias, resultados,
    totalNombre: P => P.escenario === 'empuje' && P.sentido !== 'baja' ? 'Ec + Ep + calor' : 'Total',
  };
  const api = N.registrar('plano', def);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') root.FisicaWidgets.plano = api;
})(typeof window !== 'undefined' ? window : globalThis);
