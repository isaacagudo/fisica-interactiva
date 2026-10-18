/* Física interactiva · simulador «vectores»: trabajo de una fuerza constante con el producto escalar.
   Una fuerza F = Fx·i + Fy·j actúa sobre un cuerpo que va del punto A al punto B.
   Opciones: Fx, Fy (N), Ax, Ay, Bx, By (m), curvo (true: el cuerpo va por un camino curvo; el trabajo es el mismo)
   Necesita nucleo.js. */
(function (root) {
  'use strict';
  const N = root.FisicaWidgets && root.FisicaWidgets.nucleo || (typeof require !== 'undefined' ? require('./nucleo.js') : null);
  const { clamp, fmt, num, niceStep } = N.util;

  const DEF = { vectores: { Fx: 3, Fy: -5, Ax: -2, Ay: 1, Bx: 4, By: 3, curvo: false, controles: ['Fx', 'Fy', 'Bx', 'By'] } };
  const ent = (label, unit, min, max) => ({ label, unit, min, max, step: 1, fmt: v => (v < 0 ? '−' : '') + fmt(Math.abs(v), 0) });
  const SL = { Fx: ent('Componente Fx', 'N', -40, 40), Fy: ent('Componente Fy', 'N', -40, 40), Ax: ent('Punto A: x', 'm', -12, 12), Ay: ent('Punto A: y', 'm', -12, 12), Bx: ent('Punto B: x', 'm', -12, 12), By: ent('Punto B: y', 'm', -12, 12) };
  const sg = v => (v < 0 ? '−' : '') + (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.abs(Math.round(v))) : num(Math.abs(v), 3));
  const par = v => v < 0 ? `(${sg(v)})` : sg(v);

  function analizar(P) {
    const dx = P.Bx - P.Ax, dy = P.By - P.Ay, W = P.Fx * dx + P.Fy * dy, F = Math.hypot(P.Fx, P.Fy), D = Math.hypot(dx, dy);
    const cos = F > 0 && D > 0 ? W / (F * D) : NaN;
    return { dx, dy, W, F, D, cos, phi: isFinite(cos) ? Math.acos(clamp(cos, -1, 1)) * 180 / Math.PI : NaN };
  }
  function simular(P, A) {
    const T = 4;
    // camino recto o curvo (Bézier con el punto de control desplazado en perpendicular)
    const cx = (P.Ax + P.Bx) / 2 - A.dy * 0.45, cy = (P.Ay + P.By) / 2 + A.dx * 0.45;
    const r = u => P.curvo ? { x: (1 - u) * (1 - u) * P.Ax + 2 * u * (1 - u) * cx + u * u * P.Bx, y: (1 - u) * (1 - u) * P.Ay + 2 * u * (1 - u) * cy + u * u * P.By } : { x: P.Ax + u * A.dx, y: P.Ay + u * A.dy };
    const estado = t => { const u = clamp(t / T, 0, 1), p = r(u); return { t, u, x: p.x, y: p.y, W: P.Fx * (p.x - P.Ax) + P.Fy * (p.y - P.Ay) }; };
    return { T, estado, r, Emax: 0 };
  }
  function escena(c) {
    const { mk, P, A, S, W, H } = c, dyn = c.dyn;
    let xs = [P.Ax, P.Bx, 0], ys = [P.Ay, P.By, 0];
    if (P.curvo) for (let i = 0; i <= 20; i++) { const p = S.r(i / 20); xs.push(p.x); ys.push(p.y); }
    let x0 = Math.min(...xs) - 1.5, x1 = Math.max(...xs) + 1.5, y0 = Math.min(...ys) - 1.5, y1 = Math.max(...ys) + 1.5;
    const k = Math.min((W - 40) / (x1 - x0), (H - 30) / (y1 - y0));
    const ox = (W - (x1 - x0) * k) / 2 - x0 * k, oy = (H + (y1 - y0) * k) / 2 + y0 * k;
    const X = x => ox + x * k, Y = y => oy - y * k;
    Object.assign(dyn, { X, Y, k });
    const st = niceStep(2 / k * 22);
    for (let gx = Math.ceil(x0 / st) * st; gx <= x1; gx += st) { mk('line', { class: 'fw-gl', x1: X(gx), y1: Y(y0), x2: X(gx), y2: Y(y1) }); if (Math.abs(gx) > 1e-9) mk('text', { class: 'fw-lbl', x: X(gx), y: Y(0) + 15, 'text-anchor': 'middle', style: 'font-size:11px' }).textContent = sg(gx); }
    for (let gy = Math.ceil(y0 / st) * st; gy <= y1; gy += st) { mk('line', { class: 'fw-gl', x1: X(x0), y1: Y(gy), x2: X(x1), y2: Y(gy) }); if (Math.abs(gy) > 1e-9) mk('text', { class: 'fw-lbl', x: X(0) - 6, y: Y(gy) + 4, 'text-anchor': 'end', style: 'font-size:11px' }).textContent = sg(gy); }
    mk('line', { class: 'fw-axis', x1: X(x0), y1: Y(0), x2: X(x1), y2: Y(0) }); mk('line', { class: 'fw-axis', x1: X(0), y1: Y(y0), x2: X(0), y2: Y(y1) });
    mk('text', { class: 'fw-lbl', x: X(x1) - 4, y: Y(0) - 6, 'text-anchor': 'end' }).textContent = 'x (m)';
    mk('text', { class: 'fw-lbl', x: X(0) + 6, y: Y(y1) + 14 }).textContent = 'y (m)';
    // camino y desplazamiento
    if (P.curvo) { const pts = []; for (let i = 0; i <= 60; i++) { const p = S.r(i / 60); pts.push(`${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`); } mk('polyline', { class: 'fw-trail', points: pts.join(' ') }); }
    dyn.dr = c.arrow('fw-a-i', 'Δr');
    c.setArrow(dyn.dr, X(P.Ax), Y(P.Ay), A.dx * k / (A.D * k || 1), -A.dy * k / (A.D * k || 1), A.D * k, A.D > 0, 0, -10);
    // componentes de Δr
    mk('line', { class: 'fw-ref', x1: X(P.Ax), y1: Y(P.Ay), x2: X(P.Bx), y2: Y(P.Ay) });
    mk('line', { class: 'fw-ref', x1: X(P.Bx), y1: Y(P.Ay), x2: X(P.Bx), y2: Y(P.By) });
    mk('text', { class: 'fw-lbl', x: (X(P.Ax) + X(P.Bx)) / 2, y: Y(P.Ay) + (A.dy >= 0 ? 16 : -8), 'text-anchor': 'middle' }).textContent = `Δx = ${sg(A.dx)}`;
    mk('text', { class: 'fw-lbl', x: X(P.Bx) + (A.dx >= 0 ? 6 : -6), y: (Y(P.Ay) + Y(P.By)) / 2 + 4, 'text-anchor': A.dx >= 0 ? 'start' : 'end' }).textContent = `Δy = ${sg(A.dy)}`;
    for (const [nm, x, y] of [['A', P.Ax, P.Ay], ['B', P.Bx, P.By]]) {
      mk('circle', { cx: X(x), cy: Y(y), r: 4, style: 'fill:var(--ink)' });
      mk('text', { class: 'fw-lbl-ink', x: X(x) - 8, y: Y(y) - 8, 'text-anchor': 'end' }).textContent = `${nm}(${sg(x)}, ${sg(y)})`;
    }
    dyn.body = mk('circle', { r: 8, class: 'fw-body' });
    dyn.F = c.arrow('fw-a-f', 'F');
  }
  function pintar(c, e) {
    const { P, A, dyn } = c, x = dyn.X(e.x), y = dyn.Y(e.y);
    dyn.body.setAttribute('cx', x); dyn.body.setAttribute('cy', y);
    const L = clamp(70 * A.F / 40, 26, 90);
    c.setArrow(dyn.F, x, y, P.Fx / (A.F || 1), -P.Fy / (A.F || 1), L, A.F > 0, 0, 0);
    if (e.t === 0) return 'F constante de A a B';
    if (e.u >= 1) return A.W > 0 ? 'W > 0: F ayuda al movimiento' : A.W < 0 ? 'W < 0: F se opone al movimiento' : 'W = 0: F perpendicular a Δr';
    return 'W = F · (r − r_A)';
  }
  function lectura(P, e) {
    return `<span>posición <b>(${sg(e.x)}, ${sg(e.y)}) m</b></span><span>W hasta aquí <b>${sg(e.W)} J</b></span>`;
  }
  function resultados(P, A) {
    const f = [];
    f.push(['Desplazamiento', 'Δr = r_B − r_A = (Bx − Ax)·i + (By − Ay)·j', `${sg(A.dx)}·i ${A.dy < 0 ? '−' : '+'} ${sg(Math.abs(A.dy))}·j m`]);
    f.push(['Trabajo', `W = Fx·Δx + Fy·Δy = ${par(P.Fx)}·${par(A.dx)} + ${par(P.Fy)}·${par(A.dy)}`, `${sg(A.W)} J`]);
    f.push(['Módulos', '|F| = √(Fx² + Fy²) ; |Δr| = √(Δx² + Δy²)', `${num(A.F)} N ; ${num(A.D)} m`]);
    f.push(['Ángulo entre F y Δr', 'cos φ = W / (|F|·|Δr|)', isFinite(A.phi) ? `${fmt(A.phi, 1)}°` : '—']);
    const ver = `El producto escalar da un <strong>número</strong>, sin i ni j. ${A.W > 0 ? 'Es positivo: φ < 90° y F ayuda al movimiento.' : A.W < 0 ? 'Es negativo: φ > 90° y F se opone al movimiento.' : 'Es cero: F es perpendicular al desplazamiento.'} ${P.curvo ? 'Con un camino curvo sale lo mismo: una fuerza constante solo depende de A y B.' : ''}`;
    return { filas: f, veredicto: ver };
  }
  const def = {
    nombre: 'vectores', titulo: 'Trabajo con vectores', aria: 'Fuerza y desplazamiento en el plano', DEF, NOMBRES: { vectores: 'Producto escalar' }, SL,
    toggles: () => [{ clave: 'curvo', label: 'Ir de A a B por un camino curvo' }],
    analizar, simular, vista: { w: 640, h: 330 }, escena, pintar, lectura, resultados, tiempo: 'Recorrido',
    leyenda: (P, e) => `<span>W = Fx·(x − Ax) + Fy·(y − Ay) = <b>${sg(e.W)} J</b></span>`,
    notaCondiciones: 'La flecha morada es la fuerza (su escala es en newtons, no en metros).', duracion: () => 4,
  };
  const api = N.registrar('vectores', def);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') root.FisicaWidgets.vectores = api;
})(typeof window !== 'undefined' ? window : globalThis);
