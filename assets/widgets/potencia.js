/* Física interactiva · simulador «potencia»: subir cargas a velocidad constante con un motor (o una persona).
   Opciones: m (kg de cada carga), n (número de cargas, una detrás de otra), h (m), t (s, tiempo total), eta (rendimiento, 0–1),
             cuerpo ("carga" | "sacos" | "agua"), incognita ("P": se calcula la potencia | "m": se calcula la masa que sube un motor de potencia Pcv)
             Pcv (potencia del motor en CV, solo con incognita "m")
   Necesita nucleo.js. */
(function (root) {
  'use strict';
  const N = root.FisicaWidgets && root.FisicaWidgets.nucleo || (typeof require !== 'undefined' ? require('./nucleo.js') : null);
  const { G0, clamp, fmt, num } = N.util;
  const CV = 736;

  const DEF = {
    elevar: { m: 450, n: 1, h: 12, t: 30, eta: 0.6, cuerpo: 'carga', incognita: 'P', Pcv: 2, controles: ['m', 'h', 't', 'eta'] },
  };
  const SL = {
    m: { label: 'Masa de la carga, m', unit: 'kg', log: true, min: 1, max: 5000, fmt: v => num(v, 3) },
    n: { label: 'Número de cargas, n', unit: '', min: 1, max: 30, step: 1, fmt: v => fmt(v, 0) },
    h: { label: 'Altura, h', unit: 'm', min: 0.5, max: 50, step: 0.5, fmt: v => fmt(v, 1) },
    t: { label: 'Tiempo, t', unit: 's', log: true, min: 1, max: 7200, fmt: v => v >= 120 ? `${fmt(v / 60, v % 60 ? 1 : 0)} min =` + ` ${num(v, 4)}` : num(v, 3) },
    eta: { label: 'Rendimiento, η', unit: '%', min: 0.1, max: 1, step: 0.01, fmt: v => fmt(v * 100, 0) },
    Pcv: { label: 'Potencia del motor', unit: 'CV', min: 0.5, max: 20, step: 0.5, fmt: v => fmt(v, 1) },
  };

  function analizar(P) {
    const g = P.g || G0, A = { g };
    if (P.incognita === 'm') {
      A.Ptot = P.Pcv * CV; A.Pu = P.eta * A.Ptot; A.Eu = A.Pu * P.t; A.mTot = A.Eu / (g * P.h); A.m = A.mTot / (P.n || 1);
    } else {
      A.m = P.m; A.mTot = P.m * (P.n || 1); A.Eu = A.mTot * g * P.h; A.Pu = A.Eu / P.t; A.Ptot = A.Pu / P.eta;
    }
    A.Etot = A.Eu / P.eta; A.Eper = A.Etot - A.Eu; A.v = (P.n || 1) * P.h / P.t;
    return A;
  }
  function simular(P, A) {
    const n = P.n || 1, T = P.t, tc = T / n, g = A.g;
    const estado = t => {
      t = clamp(t, 0, T);
      const k = Math.min(n - 1, Math.floor(t / tc + 1e-9)), y = P.cuerpo === 'agua' ? P.h * t / T : P.h * clamp((t - k * tc) / tc, 0, 1);
      const Eu = A.Eu * t / T, Et = Eu / P.eta;
      return { t, k, y, Eu, Qp: Et - Eu, Et, done: P.cuerpo === 'agua' ? 0 : k + (t >= (k + 1) * tc - 1e-9 ? 1 : 0) };
    };
    return { T, estado, Emax: A.Etot };
  }

  function escena(c) {
    const { mk, P, A, W, H } = c, dyn = c.dyn;
    const yG = H - 34, yTop = 80, Xs = 280;
    const Y = y => yG - (yG - yTop - 34) * y / P.h;
    Object.assign(dyn, { Y, yG, Xs });
    mk('rect', { class: 'fw-band', x: 0, y: yG, width: W, height: H - yG });
    mk('line', { class: 'fw-floor', x1: 0, y1: yG, x2: W, y2: yG });
    if (P.cuerpo === 'agua') {
      // depósito abajo, bomba (el motor) y depósito arriba sobre una torre
      const yT = Y(P.h), tx0 = Xs - 10, tx1 = Xs + 110;
      mk('rect', { class: 'fw-plane', x: tx0 + 8, y: yT, width: 8, height: yG - yT });
      mk('rect', { class: 'fw-plane', x: tx1 - 16, y: yT, width: 8, height: yG - yT });
      mk('rect', { class: 'fw-ghost', x: tx0, y: yT - 46, width: tx1 - tx0, height: 46 });
      dyn.agua = mk('rect', { x: tx0 + 2, width: tx1 - tx0 - 4, y: yT, height: 0, style: 'fill:var(--c-p);fill-opacity:.35' });
      mk('line', { class: 'fw-floor', x1: tx0, y1: yT, x2: tx1, y2: yT });
      mk('rect', { class: 'fw-body', x: 40, y: yG - 40, width: 120, height: 40, rx: 4 });
      mk('rect', { x: 43, y: yG - 30, width: 114, height: 28, style: 'fill:var(--c-p);fill-opacity:.25' });
      mk('rect', { class: 'fw-body', x: 178, y: yG - 40, width: 70, height: 40, rx: 6 });
      mk('text', { class: 'fw-lbl-ink', x: 213, y: yG - 15, 'text-anchor': 'middle' }).textContent = P.incognita === 'm' ? `${fmt(P.Pcv, 1)} CV` : 'bomba';
      mk('path', { class: 'fw-dim', d: `M150 ${yG - 22} L178 ${yG - 22} M248 ${yG - 22} L${Xs - 34} ${yG - 22} L${Xs - 34} ${yT - 34} L${tx0 + 14} ${yT - 34}`, style: 'stroke-width:4;stroke:var(--c-p);stroke-opacity:.55;fill:none' });
      dyn.cnt = mk('text', { class: 'fw-lbl-ink', x: (tx0 + tx1) / 2, y: yT - 54, 'text-anchor': 'middle' });
      const xd = tx1 + 24;
      mk('line', { class: 'fw-dim', x1: xd, y1: yT, x2: xd, y2: yG }); mk('line', { class: 'fw-dim', x1: xd - 5, y1: yT, x2: xd + 5, y2: yT });
      mk('text', { class: 'fw-lbl-ink', x: xd + 8, y: (yT + yG) / 2 + 5 }).textContent = `h = ${num(P.h, 3)} m`;
      dyn.T = c.arrow('fw-a-f', 'T'); dyn.P = c.arrow('fw-a-p', 'P'); dyn.V = c.arrow('fw-a-v', 'v');
      return;
    }
    // torre con polea arriba y motor
    mk('rect', { class: 'fw-plane', x: Xs + 60, y: yTop - 14, width: 14, height: yG - yTop + 14 });
    mk('rect', { class: 'fw-plane', x: Xs - 60, y: yTop - 24, width: 134, height: 12 });
    mk('circle', { class: 'fw-body', cx: Xs, cy: yTop, r: 11 });
    mk('rect', { class: 'fw-body', x: Xs + 90, y: yTop - 34, width: 70, height: 36, rx: 5 });
    mk('text', { class: 'fw-lbl-ink', x: Xs + 125, y: yTop - 11, 'text-anchor': 'middle' }).textContent = P.cuerpo === 'sacos' && P.eta >= 1 ? 'persona' : 'motor';
    mk('line', { class: 'fw-dim', x1: Xs + 11, y1: yTop, x2: Xs + 90, y2: yTop - 16, style: 'stroke:var(--ink);stroke-width:1.6' });
    // cota de h
    const xd = Xs - 150;
    mk('line', { class: 'fw-dim', x1: xd, y1: Y(P.h), x2: xd, y2: yG });
    mk('line', { class: 'fw-dim', x1: xd - 6, y1: Y(P.h), x2: xd + 6, y2: Y(P.h) });
    mk('text', { class: 'fw-lbl-ink', x: xd - 8, y: (Y(P.h) + yG) / 2 + 5, 'text-anchor': 'end' }).textContent = `h = ${num(P.h, 3)} m`;
    mk('line', { class: 'fw-ref', x1: xd, y1: Y(P.h), x2: Xs + 56, y2: Y(P.h) });
    dyn.rope = mk('line', { x1: Xs - 11, y1: yTop, x2: Xs - 11, y2: yG, style: 'stroke:var(--ink);stroke-width:1.6' });
    dyn.load = mk('g');
    if (P.cuerpo === 'sacos') mk('path', { class: 'fw-body', d: 'M-20 -2 Q-24 -24 -12 -30 L12 -30 Q24 -24 20 -2 Z' }, dyn.load);
    else mk('rect', { class: 'fw-body', x: -22, y: -34, width: 44, height: 34, rx: 3 }, dyn.load);
    dyn.mtxt = mk('text', { class: 'fw-lbl-ink', x: -30, y: -12, 'text-anchor': 'end' }, dyn.load);
    dyn.mtxt.textContent = `${num(A.m, 3)} kg`;
    if ((P.n || 1) > 1) dyn.cnt = mk('text', { class: 'fw-lbl-ink', x: Xs + 90, y: yG - 10 });
    dyn.T = c.arrow('fw-a-f', 'T'); dyn.P = c.arrow('fw-a-p', 'P'); dyn.V = c.arrow('fw-a-v', 'v');
  }
  function pintar(c, e) {
    const { P, A, dyn } = c, Xs = dyn.Xs;
    if (P.cuerpo === 'agua') {
      const lvl = 44 * e.t / P.t; dyn.agua.setAttribute('y', dyn.Y(P.h) - lvl); dyn.agua.setAttribute('height', lvl);
      dyn.cnt.textContent = `${num(A.mTot * e.t / P.t, 3)} L subidos`;
      c.setArrow(dyn.T, 0, 0, 1, 0, 0, false); c.setArrow(dyn.P, 0, 0, 1, 0, 0, false); c.setArrow(dyn.V, 0, 0, 1, 0, 0, false);
      if (e.t === 0) return 'Empieza a bombear';
      return e.t >= P.t - 1e-9 ? 'Terminado' : 'El agua gana Ep = m·g·h';
    }
    const y = dyn.Y(e.y), x = Xs - 11;
    dyn.load.setAttribute('transform', `translate(${x} ${y})`);
    dyn.rope.setAttribute('y2', y - 34);
    c.setArrow(dyn.T, x, y - 34, 0, -1, 40, true, 12, 0);
    c.setArrow(dyn.P, x, y - 17, 0, 1, 40, true, 12, 6);
    c.setArrow(dyn.V, x + 40, y - 10, 0, -1, 30, e.t < P.t && e.y < P.h - 1e-9, 12, 0);
    if (dyn.cnt) dyn.cnt.textContent = `cargas subidas: ${Math.min(e.done, P.n)} de ${P.n}`;
    if (e.t === 0) return 'Empieza a subir';
    if (e.t >= P.t - 1e-9) return 'Terminado';
    return 'Sube con v constante: T = P';
  }
  function lectura(P, e, A) {
    return `<span>t <b>${num(e.t, 3)} s</b></span><span>P útil <b>${num(A.Pu)} W</b></span><span>P del motor <b>${num(A.Ptot)} W</b></span>`;
  }
  function energias(P) {
    const EN = [{ k: 'Eu', nombre: 'Útil (Ep)', color: 'var(--c-p)' }];
    if (P.eta < 1) EN.push({ k: 'Qp', nombre: 'Perdida', color: 'var(--c-fr)' });
    return EN;
  }
  function resultados(P, A) {
    const f = [], n = P.n || 1;
    if (P.incognita === 'm') {
      f.push(['Potencia del motor', 'P = CV · 736 W', `${num(A.Ptot)} W`]);
      f.push(['Potencia útil', 'P útil = η · P', `${num(A.Pu)} W`]);
      f.push(['Energía útil en el tiempo dado', 'E útil = P útil · t', `${num(A.Eu)} J`]);
      f.push(['Masa que sube', 'E útil = m·g·h  ⟹  m = E útil / (g·h)', `${num(A.mTot)} kg`]);
    } else {
      f.push(['Trabajo útil (energía potencial ganada)', n > 1 ? 'W = n·m·g·h' : 'W = m·g·h', `${num(A.Eu)} J`]);
      f.push(['Trabajo del peso', 'W P = −m·g·h', `${num(-A.Eu)} J`]);
      f.push(['Potencia útil', 'P útil = W / t', `${num(A.Pu)} W`]);
      if (P.eta < 1) f.push(['Potencia del motor', 'P = P útil / η', `${num(A.Ptot)} W = ${num(A.Ptot / CV)} CV`]);
      f.push(['Velocidad de subida', 'v = h / t (por carga)', `${num(P.h * n / P.t)} m/s`]);
      f.push(['Energía consumida', 'E = P · t', `${num(A.Etot)} J`]);
    }
    const ver = P.eta < 1 ? `De cada 100 J que consume el motor, ${fmt(P.eta * 100, 0)} J se convierten en energía potencial de la carga y ${fmt(100 - P.eta * 100, 0)} J se pierden (rozamientos, calor en el motor).` : 'A velocidad constante la tensión es igual al peso, así que el trabajo que se hace es justo la energía potencial que gana la carga.';
    return { filas: f, veredicto: ver };
  }
  const def = {
    nombre: 'potencia', titulo: 'Simulador de potencia', aria: 'Animación de una carga que sube', DEF, NOMBRES: { elevar: 'Subir una carga' }, SL,
    analizar, simular, vista: { w: 640, h: 300 }, escena, pintar, lectura, energias, resultados,
    totalNombre: 'Consumida', duracion: () => 6,
    notaCondiciones: 'g = 9,8 m/s². La carga sube con velocidad constante: la tensión de la cuerda es igual al peso.',
    textoGrafica: 'La energía útil crece al mismo ritmo durante toda la subida: la potencia es constante.',
  };
  const api = N.registrar('potencia', def);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') root.FisicaWidgets.potencia = api;
})(typeof window !== 'undefined' ? window : globalThis);
