/* Física interactiva · simulador «tiro»: lanzamientos sin rozamiento del aire (se conserva la energía mecánica).
   Escenarios:
     tiro      un lanzamiento desde una altura h0 con velocidad v0 y ángulo θ (90° hacia arriba, −90° hacia abajo, 0° horizontal)
               opciones: m, h0, v0, angulo
     comparar  varios lanzamientos con la misma v0 desde la misma altura y distintos ángulos
               opciones: m, h0, v0, angulos (lista, p. ej. [90, -90, 0])
   Necesita nucleo.js. */
(function (root) {
  'use strict';
  const N = root.FisicaWidgets && root.FisicaWidgets.nucleo || (typeof require !== 'undefined' ? require('./nucleo.js') : null);
  const { G0, clamp, rad, fmt, num } = N.util;

  const DEF = {
    tiro: { m: 1, h0: 0, v0: 25, angulo: 16.3, controles: ['v0', 'angulo', 'h0'] },
    comparar: { m: 1, h0: 5, v0: 15, angulos: [90, -90, 0], controles: ['v0', 'h0'] },
  };
  const NOMBRES = { tiro: 'Un lanzamiento', comparar: 'Comparar direcciones' };
  const SL = {
    m: { label: 'Masa, m', unit: 'kg', log: true, min: 0.1, max: 100, fmt: v => num(v, 2) },
    h0: { label: 'Altura de lanzamiento, h₀', unit: 'm', min: 0, max: 50, step: 0.5, fmt: v => fmt(v, 1) },
    v0: { label: 'Velocidad de lanzamiento, v₀', unit: 'm/s', min: 0, max: 40, step: 0.1, fmt: v => fmt(v, 1) },
    angulo: { label: 'Ángulo con la horizontal, θ', unit: '°', min: -90, max: 90, step: 0.1, fmt: v => fmt(v, v % 1 ? 1 : 0) },
  };
  const COL = ['var(--c-v)', 'var(--c-p)', 'var(--c-n)', 'var(--c-a)'];
  const nombreAng = a => a >= 89.99 ? 'hacia arriba' : a <= -89.99 ? 'hacia abajo' : Math.abs(a) < 0.01 ? 'horizontal' : `a ${fmt(a, a % 1 ? 1 : 0)}°`;

  function lanz(P, ang, g) {
    const th = rad(ang), vx = P.v0 * Math.cos(th), vy = P.v0 * Math.sin(th);
    const T = (vy + Math.sqrt(vy * vy + 2 * g * P.h0)) / g;
    const ymax = P.h0 + (vy > 0 ? vy * vy / (2 * g) : 0);
    return { ang, th, vx: Math.abs(vx) < 1e-9 ? 0 : vx, vy, T: isFinite(T) ? T : 0, ymax, alcance: vx * T, vSuelo: Math.sqrt(P.v0 * P.v0 + 2 * g * P.h0), vArriba: vy > 0 ? Math.abs(vx) : null };
  }
  function analizar(P) {
    const g = P.g || G0, angs = P.escenario === 'comparar' ? (P.angulos || [90, -90, 0]) : [P.angulo];
    const L = angs.map(a => lanz(P, a, g));
    return { g, L, vSuelo: Math.sqrt(P.v0 * P.v0 + 2 * g * P.h0) };
  }
  function simular(P, A) {
    const g = A.g, m = P.m, T = Math.max(...A.L.map(l => l.T), 1e-6);
    const pos = (l, t) => { const tt = Math.min(t, l.T); return { x: l.vx * tt, y: Math.max(0, P.h0 + l.vy * tt - 0.5 * g * tt * tt), vx: l.vx, vy: tt < l.T ? l.vy - g * tt : l.vy - g * l.T, fuera: t >= l.T }; };
    const estado = t => {
      const bs = A.L.map(l => { const p = pos(l, t); const v = Math.hypot(p.vx, p.vy); return Object.assign(p, { v, Ec: 0.5 * m * v * v, Ep: m * g * p.y }); });
      return Object.assign({ t, bolas: bs }, { Ec: bs[0].Ec, Ep: bs[0].Ep, v: bs[0].v, y: bs[0].y, x: bs[0].x });
    };
    return { T, estado, Emax: 0.5 * m * P.v0 * P.v0 + m * g * P.h0, pos };
  }

  function escena(c) {
    const { mk, P, A, S, W, H } = c, dyn = c.dyn, cmp = P.escenario === 'comparar';
    // caja de las trayectorias
    let xmin = 0, xmax = 0, ymax = Math.max(P.h0, 0.01);
    for (const l of A.L) { xmin = Math.min(xmin, l.alcance); xmax = Math.max(xmax, l.alcance); ymax = Math.max(ymax, l.ymax); }
    const mL = 56, mR = 30, mT = 46, mB = 40, yG = H - mB;
    const spanX = Math.max(xmax - xmin, 1e-6);
    let kx = (W - mL - mR) / spanX, ky = (H - mT - mB) / ymax;
    const solo = spanX < 1e-3 * ymax;   // todo vertical
    if (solo) kx = ky;
    const ratio = ky / kx;
    let nota = '';
    if (!solo) {
      if (ratio > 3.5) nota = `Escala vertical ampliada ×${fmt(ratio, 1)}`;
      else if (ratio < 1 / 3.5) nota = `Escala horizontal ampliada ×${fmt(1 / ratio, 1)}`;
      else { const k = Math.min(kx, ky); kx = ky = k; }
    }
    const ox = solo ? W / 2 : mL + 40 + ((W - mL - mR - 40) - spanX * kx) / 2 - xmin * kx;
    // en comparar, los lanzamientos verticales se separan unos píxeles para que no se tapen
    const vert = A.L.map(l => Math.abs(l.vx) < 1e-9), nv = vert.filter(Boolean).length;
    const off = A.L.map((l, i) => { if (!cmp || !vert[i]) return 0; const j = vert.slice(0, i).filter(Boolean).length; return 24 + 30 * j; });
    const X = (x, i = 0) => ox + x * kx + off[i], Y = y => yG - y * ky;
    Object.assign(dyn, { X, Y, yG });
    mk('rect', { class: 'fw-band', x: 0, y: yG, width: W, height: H - yG });
    mk('line', { class: 'fw-floor', x1: 0, y1: yG, x2: W, y2: yG });
    if (P.h0 > 0) {
      const xr = X(0) - (cmp ? 4 : 0), xl = xr - 90;
      mk('rect', { class: 'fw-plane', x: xl, y: Y(P.h0), width: xr - xl, height: yG - Y(P.h0) });
      mk('text', { class: 'fw-lbl-ink', x: (xl + xr) / 2, y: (Y(P.h0) + yG) / 2 + 5, 'text-anchor': 'middle' }).textContent = `h₀ = ${num(P.h0, 3)} m`;
    }
    if (nota) mk('text', { class: 'fw-lbl', x: 12, y: 24 }).textContent = nota;
    // trayectorias completas (punteadas) y altura máxima
    A.L.forEach((l, i) => {
      const pts = [];
      for (let j = 0; j <= 80; j++) { const p = S.pos(l, l.T * j / 80); pts.push(`${X(p.x, i).toFixed(1)},${Y(p.y).toFixed(1)}`); }
      mk('polyline', { class: 'fw-trail', points: pts.join(' ') });
      if (!cmp && l.vy > 0) {
        const tt = l.vy / A.g, p = S.pos(l, tt);
        mk('line', { class: 'fw-ref', x1: X(p.x, i) - 120, y1: Y(l.ymax), x2: X(p.x, i) + 20, y2: Y(l.ymax) });
        mk('text', { class: 'fw-lbl', x: X(p.x, i) - 124, y: Y(l.ymax) + 4, 'text-anchor': 'end' }).textContent = `h máx = ${num(l.ymax, 3)} m`;
      }
    });
    dyn.bolas = A.L.map((l, i) => mk('circle', { r: 9, class: 'fw-body', style: cmp ? `stroke:${COL[i % COL.length]};stroke-width:2.4` : '' }));
    dyn.V = A.L.map(() => c.arrow('fw-a-v', 'v'));
    dyn.Vx = c.arrow('fw-a-i', 'vx'); dyn.Vy = c.arrow('fw-a-i', 'vy');
    dyn.P = c.arrow('fw-a-p', 'P');
  }
  function pintar(c, e) {
    const { P, A, dyn } = c, cmp = P.escenario === 'comparar';
    const vref = Math.max(A.vSuelo, 1e-9);
    e.bolas.forEach((b, i) => {
      const x = dyn.X(b.x, i), y = dyn.Y(b.y) - 9;
      dyn.bolas[i].setAttribute('cx', x); dyn.bolas[i].setAttribute('cy', y);
      const L = 64 * b.v / vref, ux = b.vx / (b.v || 1), uy = -b.vy / (b.v || 1);
      c.setArrow(dyn.V[i], x + ux * 11, y + uy * 11, ux, uy, L, b.v > 1e-6 && !(b.fuera && e.t > 0 && e.t >= c.S.T - 1e-9 && false), 0, 0);
      if (i === 0 && !cmp) {
        c.setArrow(dyn.Vx, x, y, Math.sign(b.vx) || 1, 0, 64 * Math.abs(b.vx) / vref, Math.abs(b.vx) > 0.05 * b.v && Math.abs(b.vy) > 0.05 * b.v, 0, 12);
        c.setArrow(dyn.Vy, x, y, 0, -Math.sign(b.vy) || 1, 64 * Math.abs(b.vy) / vref, Math.abs(b.vy) > 0.05 * b.v && Math.abs(b.vx) > 0.05 * b.v, 14, 0);
        c.setArrow(dyn.P, x, y + 9, 0, 1, 34, b.y > 1e-6, 12, 0);
      }
    });
    if (cmp) { c.setArrow(dyn.Vx, 0, 0, 1, 0, 0, false); c.setArrow(dyn.Vy, 0, 0, 1, 0, 0, false); c.setArrow(dyn.P, 0, 0, 1, 0, 0, false); }
    const b = e.bolas[0];
    if (e.t === 0) return 'Se lanza';
    if (cmp) return e.bolas.every(x => x.fuera) ? 'Todas llegan con la misma rapidez' : 'Misma v₀, distinta dirección';
    if (b.fuera) return 'Llega al suelo';
    if (Math.abs(b.vy) < 0.02 * A.vSuelo && A.L[0].vy > 0) return 'Punto más alto: solo queda vx';
    return b.vy > 0 ? 'Sube: Ec → Ep' : 'Baja: Ep → Ec';
  }
  function lectura(P, e) {
    if (P.escenario === 'comparar') return `<span>t <b>${num(e.t, 3)} s</b></span>` + e.bolas.map((b, i) => `<span><i style="display:inline-block;width:10px;height:10px;border-radius:50%;border:2.4px solid ${COL[i % COL.length]};margin-right:4px"></i>${nombreAng((P.angulos || [])[i] ?? 0)} <b>${num(b.v, 3)} m/s</b></span>`).join('');
    return `<span>t <b>${num(e.t, 3)} s</b></span><span>altura <b>${num(e.y, 3)} m</b></span><span>v <b>${num(e.v, 3)} m/s</b></span>`;
  }
  function energias(P) { const s = P.escenario === 'comparar' ? ` (${nombreAng((P.angulos || [90])[0])})` : ''; return [{ k: 'Ec', nombre: 'Ec' + s, color: 'var(--c-v)' }, { k: 'Ep', nombre: 'Ep' + s, color: 'var(--c-p)' }]; }
  function resultados(P, A) {
    const f = [], l = A.L[0];
    let ver;
    if (P.escenario === 'comparar') {
      f.push(['Velocidad al llegar al suelo', '½·m·v₀² + m·g·h₀ = ½·m·v²  ⟹  v = √(v₀² + 2·g·h₀)', `${num(A.vSuelo)} m/s`]);
      A.L.forEach(x => f.push([`Tiempo de vuelo (${nombreAng(x.ang)})`, '', `${num(x.T)} s`]));
      ver = 'La dirección del lanzamiento cambia el camino y el tiempo, pero no la energía: las tres llegan al suelo con la misma rapidez (no con la misma dirección).';
    } else {
      f.push(['Energía mecánica', 'E = ½·m·v₀² + m·g·h₀ (por kg: ½·v₀² + g·h₀)', `${num(0.5 * P.v0 * P.v0 + A.g * P.h0)} J/kg`]);
      if (l.vy > 0) f.push(['Altura máxima', 'h máx = h₀ + (v₀·sen θ)² / (2·g)', `${num(l.ymax)} m`]);
      if (l.vy > 0 && l.vx !== 0) f.push(['Velocidad en el punto más alto', '½·v₀² + g·h₀ = ½·v² + g·h máx  (v = vx = v₀·cos θ)', `${num(l.vArriba)} m/s`]);
      f.push(['Velocidad al llegar al suelo', 'v = √(v₀² + 2·g·h₀)', `${num(A.vSuelo)} m/s`]);
      f.push(['Tiempo de vuelo', 'y = h₀ + v₀·sen θ·t − ½·g·t² = 0', `${num(l.T)} s`]);
      if (l.vx !== 0) f.push(['Alcance', 'x = v₀·cos θ·t', `${num(l.alcance)} m`]);
      ver = 'La masa no aparece en ningún resultado: se simplifica en la ecuación de la energía. En el punto más alto la velocidad no es cero (salvo en el tiro vertical): queda la componente horizontal.';
    }
    return { filas: f, veredicto: ver };
  }

  const def = {
    nombre: 'tiro', titulo: 'Simulador de lanzamientos', aria: 'Animación del lanzamiento', DEF, NOMBRES, SL,
    analizar, simular, vista: { w: 640, h: 290 }, escena, pintar, lectura, energias, resultados,
    notaCondiciones: 'g = 9,8 m/s², sin rozamiento del aire. La flecha naranja es la velocidad; las grises, sus componentes.',
    textoGrafica: 'Sin rozamiento la suma Ec + Ep (línea discontinua) no cambia en todo el vuelo.',
    duracion: S => clamp(S.T * 1.2, 3, 8),
  };
  const api = N.registrar('tiro', def);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') root.FisicaWidgets.tiro = api;
})(typeof window !== 'undefined' ? window : globalThis);
