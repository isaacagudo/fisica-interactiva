// Figuras de matemáticas (Tema 2): SVG con las variables de color de la web. Se usan al generar la página (Node, src/comun/figuras.js)
// y en el navegador (window.MatesFig), donde los simuladores de assets/mates/trig.js las redibujan al mover los controles.
// En el Markdown, en una línea propia:
//   [[figura:<tipo>|{json}|pie]]   figura visible (teoría y soluciones)
//   [[dibujo:<tipo>|{json}|pie]]   figura oculta tras «Ver mi dibujo» (pistas: primero se pide dibujarla)
// Tipos: geo (genérico con puntos con nombre), tri (triángulo a partir de sus lados), alturas, caja, solido, sector,
// unidad (circunferencia unidad), grafica (sen, cos, tan, sinusoides con soluciones marcadas).
// Coordenadas matemáticas (y hacia arriba); la escala se ajusta sola al ancho.
(function (root) {
'use strict';
const R = Math.PI / 180;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const num = x => +x.toFixed(1);

// ---------------------------------------------------------------- lienzo
function lienzo(xmin, xmax, ymin, ymax, { W = 560, Hmax = 400, pad = 34 } = {}) {
  const sx = (W - 2 * pad) / (xmax - xmin), sy = (Hmax - 2 * pad) / (ymax - ymin), s = Math.min(sx, sy);
  const w = (xmax - xmin) * s + 2 * pad, h = (ymax - ymin) * s + 2 * pad;
  const X = x => num(pad + (x - xmin) * s), Y = y => num(h - pad - (y - ymin) * s);
  const out = [], fondo = [];
  const c = k => k ? ` c-${k}` : '';
  const L = {
    s, X, Y, out, fondo,
    seg(P, Q, { k = '', dash = false, w = 0, cls = '' } = {}) { out.push(`<line class="l${c(k)}${dash ? ' dash' : ''}${cls ? ' ' + cls : ''}" x1="${X(P[0])}" y1="${Y(P[1])}" x2="${X(Q[0])}" y2="${Y(Q[1])}"${w ? ` style="stroke-width:${w}"` : ''}/>`); },
    pol(Ps, { k = '', fill = '', dash = false, cerrar = true } = {}) { const d = Ps.map((P, i) => `${i ? 'L' : 'M'}${X(P[0])} ${Y(P[1])}`).join('') + (cerrar ? 'Z' : ''); (fill ? fondo : out).push(`<path class="l${c(k)}${fill ? ' f-' + fill : ' sin'}${dash ? ' dash' : ''}" d="${d}"/>`); },
    circ(C, r, { k = '', fill = '', dash = false } = {}) { (fill ? fondo : out).push(`<circle class="l${c(k)}${fill ? ' f-' + fill : ' sin'}${dash ? ' dash' : ''}" cx="${X(C[0])}" cy="${Y(C[1])}" r="${num(r * s)}"/>`); },
    elipse(C, rx, ry, { k = '', dash = false, mitad = '' } = {}) {
      if (!mitad) { out.push(`<ellipse class="l sin${c(k)}${dash ? ' dash' : ''}" cx="${X(C[0])}" cy="${Y(C[1])}" rx="${num(rx * s)}" ry="${num(ry * s)}"/>`); return; }
      const sw = mitad === 'abajo' ? 0 : 1;   // mitad delantera (abajo) o trasera (arriba)
      out.push(`<path class="l sin${c(k)}${dash ? ' dash' : ''}" d="M${X(C[0] - rx)} ${Y(C[1])} A${num(rx * s)} ${num(ry * s)} 0 0 ${sw} ${X(C[0] + rx)} ${Y(C[1])}"/>`);
    },
    arco(C, r, a0, a1, { k = '', w = 0, fill = '' } = {}) {   // grados, sentido antihorario de a0 a a1
      const P = a => [C[0] + r * Math.cos(a * R), C[1] + r * Math.sin(a * R)], [p0, p1] = [P(a0), P(a1)], big = Math.abs(a1 - a0) > 180 ? 1 : 0;
      const d = `M${X(p0[0])} ${Y(p0[1])} A${num(r * s)} ${num(r * s)} 0 ${big} 0 ${X(p1[0])} ${Y(p1[1])}`;
      if (fill) fondo.push(`<path class="f-${fill}" d="M${X(C[0])} ${Y(C[1])} L${d.slice(1)} Z"/>`);
      out.push(`<path class="l sin${c(k)}" d="${d}"${w ? ` style="stroke-width:${w}"` : ''}/>`);
    },
    dot(P, { k = '' } = {}) { out.push(`<circle class="pt${c(k)}" cx="${X(P[0])}" cy="${Y(P[1])}" r="3.6"/>`); },
    // texto en P desplazado (dx, dy) píxeles; pos: n s e o ne no se so c
    txt(P, t, { k = '', pos = 'c', d = 12, size = 0, bold = false } = {}) {
      const off = { n: [0, -d], s: [0, d + 4], e: [d, 4], o: [-d, 4], ne: [d * .75, -d * .6], no: [-d * .75, -d * .6], se: [d * .75, d], so: [-d * .75, d], c: [0, 4] }[pos] || [0, 4];
      const anc = /e$/.test(pos) ? 'start' : /o$/.test(pos) ? 'end' : 'middle';
      out.push(`<text class="t${c(k)}${bold ? ' b' : ''}" x="${num(X(P[0]) + off[0])}" y="${num(Y(P[1]) + off[1])}" text-anchor="${anc}"${size ? ` style="font-size:${size}px"` : ''}>${esc(t)}</text>`);
    },
    // texto en la mitad de PQ, hacia fuera (lado = 1 izquierda de P→Q, −1 derecha)
    cota(P, Q, t, { k = '', lado = 1, d = 14 } = {}) {
      const mx = (X(P[0]) + X(Q[0])) / 2, my = (Y(P[1]) + Y(Q[1])) / 2, vx = X(Q[0]) - X(P[0]), vy = Y(Q[1]) - Y(P[1]), n = Math.hypot(vx, vy) || 1;
      const nx = vy / n * lado, ny = -vx / n * lado;
      out.push(`<text class="t${c(k)}" x="${num(mx + nx * d)}" y="${num(my + ny * d + 4)}" text-anchor="${Math.abs(nx) < .3 ? 'middle' : nx > 0 ? 'start' : 'end'}">${esc(t)}</text>`);
    },
    // ángulo en V entre las semirrectas V→A y V→B (el menor), con su etiqueta
    ang(V, A, B, t, { k = 'v', r = 0, fill = true } = {}) {
      let a0 = Math.atan2(A[1] - V[1], A[0] - V[0]) / R, a1 = Math.atan2(B[1] - V[1], B[0] - V[0]) / R;
      let dlt = ((a1 - a0) % 360 + 360) % 360; if (dlt > 180) { [a0, a1] = [a1, a0]; dlt = 360 - dlt; }
      const rr = r || 26 / s;
      L.arco(V, rr, a0, a0 + dlt, { k, fill: fill ? k : '' });
      if (t) { const am = (a0 + dlt / 2) * R, rt = rr + (dlt < 30 ? 22 : 15) / s; out.push(`<text class="t c-${k}" x="${num(X(V[0] + rt * Math.cos(am)))}" y="${num(Y(V[1] + rt * Math.sin(am)) + 4)}" text-anchor="middle">${esc(t)}</text>`); }
    },
    recto(V, A, B, { k = '' } = {}) {
      const u = (P) => { const dx = P[0] - V[0], dy = P[1] - V[1], n = Math.hypot(dx, dy); return [dx / n, dy / n]; }, e = 11 / s, [ux, uy] = u(A), [vx, vy] = u(B);
      L.pol([[V[0] + ux * e, V[1] + uy * e], [V[0] + (ux + vx) * e, V[1] + (uy + vy) * e], [V[0] + vx * e, V[1] + vy * e]], { k, cerrar: false });
    },
    flecha(P, Q, { k = '', dash = false } = {}) {
      L.seg(P, Q, { k, dash });
      const x2 = X(Q[0]), y2 = Y(Q[1]), a = Math.atan2(y2 - Y(P[1]), x2 - X(P[0])), l = 9;
      out.push(`<path class="punta${c(k)}" d="M${x2} ${y2} L${num(x2 - l * Math.cos(a - .4))} ${num(y2 - l * Math.sin(a - .4))} L${num(x2 - l * Math.cos(a + .4))} ${num(y2 - l * Math.sin(a + .4))}Z"/>`);
    },
    curva(f, x0, x1, { k = 'p', n = 400, lim = 1e9, dash = false } = {}) {
      let d = '', pen = false;
      for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, y = f(x); if (!isFinite(y) || Math.abs(y) > lim) { pen = false; continue; } d += `${pen ? 'L' : 'M'}${X(x)} ${Y(y)}`; pen = true; }
      out.push(`<path class="l sin c-${k}${dash ? ' dash' : ''}" style="stroke-width:2.4" d="${d}"/>`);
    },
    ejes(xt = [], yt = [], { xl = 'x', yl = 'y', rejilla = false } = {}) {
      if (rejilla) for (let x = Math.ceil(xmin); x <= xmax; x++) for (const _ of [0]) fondo.push(`<line class="grid" x1="${X(x)}" y1="${Y(ymin)}" x2="${X(x)}" y2="${Y(ymax)}"/>`);
      if (rejilla) for (let y = Math.ceil(ymin); y <= ymax; y++) fondo.push(`<line class="grid" x1="${X(xmin)}" y1="${Y(y)}" x2="${X(xmax)}" y2="${Y(y)}"/>`);
      const y0 = Math.min(Math.max(0, ymin), ymax), x0 = Math.min(Math.max(0, xmin), xmax);
      L.flecha([xmin, y0], [xmax, y0], { k: 'eje' }); L.flecha([x0, ymin], [x0, ymax], { k: 'eje' });
      L.txt([xmax, y0], xl, { pos: 'so', k: 'eje' }); L.txt([x0, ymax], yl, { pos: 'e', k: 'eje' });
      for (const [x, t] of xt) { out.push(`<line class="l c-eje" x1="${X(x)}" y1="${Y(y0) - 4}" x2="${X(x)}" y2="${Y(y0) + 4}"/>`); L.txt([x, y0], t, { pos: 's', k: 'eje', d: 8, size: 12 }); }
      for (const [y, t] of yt) { out.push(`<line class="l c-eje" x1="${X(x0) - 4}" y1="${Y(y)}" x2="${X(x0) + 4}" y2="${Y(y)}"/>`); L.txt([x0, y], t, { pos: 'o', k: 'eje', d: 8, size: 12 }); }
    },
    svg(pie, alt) { return `<figure class="fig-m"><svg viewBox="0 0 ${num(w)} ${num(h)}" role="img" aria-label="${esc(alt || pie || 'Figura')}" style="max-width:${num(Math.min(w, 560))}px">${fondo.join('')}${out.join('')}</svg>${pie ? `<figcaption>${pie}</figcaption>` : ''}</figure>`; },
  };
  return L;
}
const caja = Ps => { const xs = Ps.map(p => p[0]), ys = Ps.map(p => p[1]); return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]; };
const margen = ([a, b, c, d], m) => { const e = m * Math.max(b - a, d - c); return [a - e, b + e, c - e, d + e]; };

// ---------------------------------------------------------------- tipos
const T = {};
// geo: {pts:{A:[x,y]…}, el:[[tipo, …]], ejes?:{x:[min,max], y:[min,max], xt, yt, rejilla}}
// elementos: ["seg","A","B",{k,dash}] ["pol",["A","B","C"],{fill}] ["pt","A","pos"] ["txt","A","texto",{pos,k}] ["cota","A","B","texto",{lado}]
//            ["ang","V","A","B","texto",{k}] ["recto","V","A","B"] ["flecha","A","B"] ["circ","C",r] ["norte","A"] ["rumbo","A",grados,"texto"] ["recta",m,n,{k}]
//            ["curva","x*x",x0,x1,{k}] (expresión en JavaScript, con sin, cos, tan, abs, sqrt y PI)
T.geo = (p) => {
  const pts = p.pts || {}, P = v => typeof v === 'string' ? pts[v] : v;
  let bb = p.ejes ? [p.ejes.x[0], p.ejes.x[1], p.ejes.y[0], p.ejes.y[1]] : margen(caja(Object.values(pts)), p.margen ?? 0.12);
  const L = lienzo(...bb, { W: p.ancho || 520, Hmax: p.alto || 360 });
  if (p.ejes) L.ejes(p.ejes.xt || [], p.ejes.yt || [], { rejilla: p.ejes.rejilla, xl: p.ejes.xl || 'x', yl: p.ejes.yl || 'y' });
  for (const [tipo, ...a] of p.el || []) {
    const o = typeof a[a.length - 1] === 'object' && !Array.isArray(a[a.length - 1]) ? a.pop() : {};
    if (tipo === 'seg') L.seg(P(a[0]), P(a[1]), o);
    else if (tipo === 'pol') L.pol(a[0].map(P), o);
    else if (tipo === 'pt') { L.dot(P(a[0]), o); L.txt(P(a[0]), a[2] ?? a[0], { pos: a[1] || 'ne', k: o.k, bold: true }); }
    else if (tipo === 'txt') L.txt(P(a[0]), a[1], o);
    else if (tipo === 'cota') L.cota(P(a[0]), P(a[1]), a[2], o);
    else if (tipo === 'ang') L.ang(P(a[0]), P(a[1]), P(a[2]), a[3], o);
    else if (tipo === 'recto') L.recto(P(a[0]), P(a[1]), P(a[2]), o);
    else if (tipo === 'flecha') L.flecha(P(a[0]), P(a[1]), o);
    else if (tipo === 'circ') L.circ(P(a[0]), a[1], o);
    else if (tipo === 'curva') { const f = new Function('x', `const {sin, cos, tan, abs, sqrt, PI} = Math; return ${a[0]};`); L.curva(x => { const y = f(x); return y < bb[2] || y > bb[3] ? NaN : y; }, a[1] ?? bb[0], a[2] ?? bb[1], { k: o.k || 'p', dash: o.dash }); }
    else if (tipo === 'recta') {   // y = m·x + n recortada al recuadro (m = "v": recta vertical x = n)
      const [m, n] = a, [x0, x1, y0, y1] = bb;
      if (m === 'v') L.seg([n, y0], [n, y1], o);
      else { const cand = [[x0, m * x0 + n], [x1, m * x1 + n]]; if (m) cand.push([(y0 - n) / m, y0], [(y1 - n) / m, y1]);
        const ok = cand.filter(([x, y]) => x >= x0 - 1e-9 && x <= x1 + 1e-9 && y >= y0 - 1e-9 && y <= y1 + 1e-9).sort((u, v) => u[0] - v[0]);
        if (ok.length >= 2) L.seg(ok[0], ok[ok.length - 1], o); } }
    else if (tipo === 'norte') { const A = P(a[0]), l = a[1] || (bb[3] - bb[2]) * 0.22; L.flecha(A, [A[0], A[1] + l], { k: 'eje', dash: true }); L.txt([A[0], A[1] + l], 'N', { pos: 'n', k: 'eje', d: 8 }); }
    else if (tipo === 'rumbo') { const A = P(a[0]), g = a[1], rr = a[3] || (bb[3] - bb[2]) * 0.1; L.arco(A, rr, 90 - g, 90, { k: o.k || 'v' }); const am = (90 - g / 2) * R; L.txt([A[0] + rr * 1.35 * Math.cos(am), A[1] + rr * 1.35 * Math.sin(am)], a[2], { k: o.k || 'v' }); }
  }
  return L;
};
// tri: {a,b,c} (o {b,c,A}) → A en el origen, B sobre el eje; etq:{a,b,c,A,B,C}, foco:[…] en rojo, recto:"C", girar: grados, letras:false
T.tri = (p) => {
  let { a, b, c } = p;
  if (p.A !== undefined && a === undefined) a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(p.A * R));
  const cA = (b * b + c * c - a * a) / (2 * b * c), sA = Math.sqrt(Math.max(0, 1 - cA * cA));
  let V = { A: [0, 0], B: [c, 0], C: [b * cA, b * sA] };
  if (p.espejo) for (const k in V) V[k] = [c - V[k][0], V[k][1]];
  if (p.girar) { const g = p.girar * R; for (const k in V) V[k] = [V[k][0] * Math.cos(g) - V[k][1] * Math.sin(g), V[k][0] * Math.sin(g) + V[k][1] * Math.cos(g)]; }
  const L = lienzo(...margen(caja(Object.values(V)), 0.14), { W: p.ancho || 460, Hmax: p.alto || 300 });
  const e = p.etq || {}, foco = p.foco || [], kk = x => foco.includes(x) ? 'fr' : '';
  L.pol([V.A, V.B, V.C], { fill: 'p' }); L.pol([V.A, V.B, V.C], {});
  const cen = [(V.A[0] + V.B[0] + V.C[0]) / 3, (V.A[1] + V.B[1] + V.C[1]) / 3];
  const lado = (P, Q) => { const cr = (Q[0] - P[0]) * (cen[1] - P[1]) - (Q[1] - P[1]) * (cen[0] - P[0]); return cr > 0 ? -1 : 1; };
  if (e.a) L.cota(V.B, V.C, e.a, { lado: lado(V.B, V.C), k: kk('a') });
  if (e.b) L.cota(V.C, V.A, e.b, { lado: lado(V.C, V.A), k: kk('b') });
  if (e.c) L.cota(V.A, V.B, e.c, { lado: lado(V.A, V.B), k: kk('c') });
  for (const [X, Y, Z] of [['A', 'B', 'C'], ['B', 'C', 'A'], ['C', 'A', 'B']]) {
    if (p.recto === X) L.recto(V[X], V[Y], V[Z]); else if (e[X]) L.ang(V[X], V[Y], V[Z], e[X], { k: kk(X) || 'v' });
    if (p.letras !== false) { const d = [V[X][0] - cen[0], V[X][1] - cen[1]], n = Math.hypot(...d); L.txt([V[X][0] + d[0] / n * 16 / L.s, V[X][1] + d[1] / n * 16 / L.s], X, { bold: true }); }
  }
  return L;
};
// alturas: objeto vertical de altura h en x = 0 y observadores en el suelo a distancias d (x > 0);
// {h, d:[d1, d2], ang:["60°","30°"], etqh:"h", etqd:["x","45 dm"], arriba:false (globo: ángulos de depresión desde lo alto), objeto:"torre"|"estatua"|"globo"}
T.alturas = (p) => {
  const h = p.h, ds = p.d, maxd = Math.max(...ds), L = lienzo(-maxd * 0.12, maxd * 1.12, -h * 0.25, h * 1.22, { W: p.ancho || 520, Hmax: p.alto || 300 });
  const top = [0, h], base = [0, 0];
  L.seg([-maxd * 0.1, 0], [maxd * 1.1, 0], { k: 'eje' });
  if (p.lago) { const [l0, l1] = p.lago; L.pol([[l0, 0], [l1, 0], [l1, -h * 0.06], [l0, -h * 0.06]], { fill: 'p' }); L.txt([(l0 + l1) / 2, -h * 0.06], p.etqlago || 'lago', { pos: 's', k: 'p', d: 6 }); }
  if (p.objeto === 'globo') { L.circ([0, h + h * 0.07], h * 0.07, { k: 'fr', fill: 'fr' }); L.seg(base, top, { dash: true, k: 'eje' }); }
  else L.seg(base, top, { w: 4, k: p.objeto === 'estatua' ? 'v' : '' });
  if (p.etqh) L.cota(base, top, p.etqh, { lado: 1, k: (p.foco || []).includes('h') ? 'fr' : '' });
  if (p.arriba) { L.seg(top, [maxd * 1.08, h], { dash: true, k: 'eje' }); }
  ds.forEach((d, i) => {
    const P = [d, 0]; L.dot(P); L.seg(P, top, { k: 'p' });
    if (p.arriba) L.ang(top, [maxd, h], P, p.ang[i], { k: i ? 'n' : 'v', r: (30 + 36 * i) / L.s });
    else L.ang(P, [d + 1, 0], top, p.ang[i], { k: i ? 'n' : 'v', r: (26 + 0 * i) / L.s });
    if (p.letras) L.txt(P, p.letras[i], { pos: 's', bold: true });
  });
  const pts = [0, ...ds.slice().sort((a, b) => a - b)];
  (p.etqd || []).forEach((t, i) => { if (t) L.cota([pts[i], 0], [pts[i + 1], 0], t, { lado: 1, d: p.lago ? 26 : 14, k: (p.foco || []).includes('d' + i) ? 'fr' : '' }); });
  return L;
};
// caja: ortoedro a (largo) × b (fondo) × c (alto) en perspectiva caballera; diag:["F","D"] con su proyección y el ángulo
T.caja = (p) => {
  const { a, b, c } = p, k = 0.5, sx = b * k * Math.cos(35 * R), sy = b * k * Math.sin(35 * R);
  const V = { A: [0, 0], B: [sx, sy], C: [a + sx, sy], D: [a, 0] };
  V.E = [0, c]; V.F = [sx, sy + c]; V.G = [a + sx, sy + c]; V.H = [a, c];
  const L = lienzo(...margen(caja(Object.values(V)), 0.12), { W: p.ancho || 480, Hmax: p.alto || 300 });
  const oc = ['B'], ar = [['A', 'D'], ['D', 'C'], ['A', 'E'], ['D', 'H'], ['C', 'G'], ['E', 'F'], ['F', 'G'], ['G', 'H'], ['H', 'E'], ['A', 'B'], ['B', 'C'], ['B', 'F']];
  for (const [u, v] of ar) L.seg(V[u], V[v], { dash: oc.includes(u) || oc.includes(v), k: oc.includes(u) || oc.includes(v) ? 'eje' : '' });
  for (const n in V) L.txt(V[n], n, { pos: { A: 'so', B: 'no', C: 'se', D: 's', E: 'o', F: 'no', G: 'ne', H: 'e' }[n], bold: true, d: 10 });
  const e = p.etq || {};
  if (e.a) L.cota(V.A, V.D, e.a, { lado: -1 }); if (e.b) L.cota(V.D, V.C, e.b, { lado: -1 }); if (e.c) L.cota(V.C, V.G, e.c, { lado: -1 });
  if (p.diag) { const [P, Q] = p.diag, pie = { E: 'A', F: 'B', G: 'C', H: 'D' }[P]; L.seg(V[P], V[Q], { k: 'fr', w: 2.6 }); L.seg(V[pie], V[Q], { k: 'p', w: 2.4 }); if (p.angulo !== false) L.ang(V[Q], V[pie], V[P], e.ang || 'θ', { k: 'v' }); else L.recto(V[pie], V[Q], V[P]); if (e.proy) L.cota(V[pie], V[Q], e.proy, { lado: 1, k: 'p' }); if (e.diag) L.cota(V[P], V[Q], e.diag, { lado: 1, k: 'fr' }); }
  return L;
};
// solido: {tipo:"cono"|"cilindro"|"esfera"|"piramide"|"tubo"|"semiesfera", r, h, r2 (tubo), etq:{r,h,g,a}}
T.solido = (p) => {
  const { r, h = 0 } = p, e = p.etq || {}, ry = r * 0.32, t = p.tipo;
  const alto = t === 'esfera' ? 2 * r : t === 'semiesfera' ? r : h;
  const L = lienzo(-r * 1.35, r * 1.6, -ry * 1.5 - (t === 'esfera' ? r : 0), alto + ry * 1.2 - (t === 'esfera' ? r : 0), { W: p.ancho || 360, Hmax: p.alto || 300 });
  if (t === 'cono' || t === 'cilindro' || t === 'tubo') {
    L.elipse([0, 0], r, ry, { mitad: 'abajo' }); L.elipse([0, 0], r, ry, { mitad: 'arriba', dash: true, k: 'eje' });
    if (t === 'cono') { L.seg([-r, 0], [0, h]); L.seg([r, 0], [0, h]); L.seg([0, 0], [0, h], { dash: true, k: 'p' }); L.seg([0, 0], [r, 0], { k: 'n' }); L.recto([0, 0], [r, 0], [0, h]);
      if (e.h) L.txt([0, h / 2], e.h, { pos: 'o', k: 'p' }); if (e.r) L.cota([0, 0], [r, 0], e.r, { lado: -1, k: 'n' }); if (e.g) L.cota([r, 0], [0, h], e.g, { lado: -1, k: 'v' }); }
    else { L.elipse([0, h], r, ry); L.seg([-r, 0], [-r, h]); L.seg([r, 0], [r, h]); L.seg([0, 0], [r, 0], { k: 'n' }); if (e.r) L.cota([0, 0], [r, 0], e.r, { lado: -1, k: 'n' }); if (e.h) L.cota([r, 0], [r, h], e.h, { lado: -1, k: 'p' });
      if (t === 'tubo') { const r2 = p.r2; L.elipse([0, h], r2, r2 * 0.32, { k: 'p' }); L.seg([0, h], [r2, h], { k: 'v' }); if (e.r2) L.txt([0, h + r2 * 0.32], e.r2, { pos: 'n', k: 'v', d: 8 }); } }
  } else if (t === 'esfera' || t === 'semiesfera') {
    L.circ([0, 0], r, t === 'semiesfera' ? { dash: true, k: 'eje' } : {}); if (t === 'semiesfera') L.arco([0, 0], r, 0, 180);
    L.elipse([0, 0], r, ry, { mitad: 'abajo' }); L.elipse([0, 0], r, ry, { mitad: 'arriba', dash: true, k: 'eje' }); L.seg([0, 0], [r, 0], { k: 'n' }); L.dot([0, 0]); if (e.r) L.cota([0, 0], [r, 0], e.r, { lado: 1, k: 'n' });
  } else if (t === 'piramide') {
    const b = r, d = b * 0.45, A = [-b / 2, -d / 2], B = [b / 2, -d / 2], C = [b / 2 + d * .7, d / 2], D = [-b / 2 + d * .7, d / 2], O = [d * .35, 0], V = [d * .35, h];
    L.pol([A, B, C], { cerrar: false }); L.seg(A, D, { dash: true, k: 'eje' }); L.seg(D, C, { dash: true, k: 'eje' }); for (const Q of [A, B, C]) L.seg(Q, V); L.seg(D, V, { dash: true, k: 'eje' });
    L.seg(O, V, { dash: true, k: 'p' }); const M = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2]; L.seg(O, M, { dash: true, k: 'n' }); L.seg(M, V, { k: 'v' });
    if (e.h) L.txt([O[0], h / 2], e.h, { pos: 'o', k: 'p' }); if (e.a) L.cota(A, B, e.a, { lado: -1 }); if (e.ap) L.cota(M, V, e.ap, { lado: -1, k: 'v' });
  }
  return L;
};
// sector: {r, ang (grados), etq:{r, ang, arco}, girar}
T.sector = (p) => {
  const { r, ang } = p, g = p.girar ?? (90 - ang / 2), e = p.etq || {}, L = lienzo(-r * 1.25, r * 1.25, -r * 1.25, r * 1.25, { W: p.ancho || 320, Hmax: p.alto || 300 });
  const O = [0, 0], P0 = [r * Math.cos(g * R), r * Math.sin(g * R)], P1 = [r * Math.cos((g + ang) * R), r * Math.sin((g + ang) * R)];
  if (p.circulo !== false) L.circ(O, r, { dash: true, k: 'eje' });
  L.arco(O, r, g, g + ang, { k: 'p', w: 3.2, fill: 'p' }); L.seg(O, P0); L.seg(O, P1); L.dot(O);
  if (e.r) L.cota(O, P0, e.r, { lado: -1 }); if (e.ang) L.ang(O, P0, P1, e.ang, { k: 'v' });
  if (e.arco) { const am = (g + ang / 2) * R; L.txt([r * 1.12 * Math.cos(am), r * 1.12 * Math.sin(am)], e.arco, { k: 'p', bold: true }); }
  return L;
};
// unidad: {ang (grados), etq?, ref:true (ángulo de referencia), tan:false, otros:[ángulos que dan el mismo seno/coseno]}
T.unidad = (p) => {
  const L = lienzo(-1.45, 1.45, -1.35, 1.35, { W: p.ancho || 360, Hmax: p.alto || 340 }), a = p.ang, P = [Math.cos(a * R), Math.sin(a * R)];
  L.ejes([[1, '1'], [-1, '−1']], [[1, '1'], [-1, '−1']]); L.circ([0, 0], 1, { k: 'eje' });
  const pinta = (ang, k, lab) => { const Q = [Math.cos(ang * R), Math.sin(ang * R)]; L.seg([0, 0], Q, { k, w: 2.4 }); L.seg([Q[0], 0], Q, { k: 'fr', dash: true }); L.seg([0, Q[1]], Q, { k: 'n', dash: true }); L.dot(Q, { k }); if (lab) L.txt(Q, lab, { pos: Q[0] >= 0 ? (Q[1] >= 0 ? 'ne' : 'se') : (Q[1] >= 0 ? 'no' : 'so'), k, bold: true }); };
  for (const o of p.otros || []) pinta(o, 'n', p.etqOtros ? p.etqOtros[(p.otros || []).indexOf(o)] : `${o}°`);
  pinta(a, 'p', p.etq ?? 'P');
  L.arco([0, 0], 0.22, Math.min(0, a), Math.max(0, a), { k: 'v' }); L.txt([0.33 * Math.cos(a / 2 * R), 0.33 * Math.sin(a / 2 * R)], p.etqAng ?? `${a}°`, { k: 'v' });
  if (p.ref) { const ref = Math.round(((a % 180) + 180) % 180 > 90 ? 180 - (((a % 180) + 180) % 180) : ((a % 180) + 180) % 180); const lado = P[0] >= 0 ? 0 : 180; const ini = lado === 0 ? (P[1] >= 0 ? 0 : -ref) : (P[1] >= 0 ? 180 - ref : 180); L.arco([0, 0], 0.4, ini, ini + ref, { k: 'n', w: 2.6 }); L.txt([P[0] * 0.55 + (P[0] >= 0 ? 0.1 : -0.1), P[1] * 0.25], `${ref}°`, { k: 'n', size: 12 }); }
  if (p.cuadrantes) { [['I', 0.9, 1.1], ['II', -0.9, 1.1], ['III', -0.9, -1.1], ['IV', 0.9, -1.1]].forEach(([t, x, y]) => L.txt([x, y], t, { k: 'eje' })); }
  return L;
};
// grafica: {f:"sen"|"cos"|"tan"|"sin"(a,b,c,d), rad:false, x:[x0,x1] en grados (o en múltiplos de π con rad), k: recta y = k, sol:[x…], a,b,c,d}
T.grafica = (p) => {
  const rad = !!p.rad, x0 = p.x ? p.x[0] : 0, x1 = p.x ? p.x[1] : 360, conv = x => rad ? x * Math.PI : x * R;
  const a = p.a ?? 1, b = p.b ?? 1, c = p.c ?? 0, dd = p.d ?? 0;
  const fb = { sen: Math.sin, cos: Math.cos, tan: Math.tan }[p.f || 'sen'];
  const f = x => a * fb(b * (conv(x) + (rad ? c * Math.PI : c * R))) + dd;
  const amp = Math.abs(a), ymin = p.y ? p.y[0] : p.f === 'tan' ? -4 : Math.min(-0.4, dd - amp - 0.4), ymax = p.y ? p.y[1] : p.f === 'tan' ? 4 : Math.max(0.4, dd + amp + 0.4);
  const sx = (x1 - x0) / ((ymax - ymin) * (p.aspecto || 2.4));   // la x se escala aparte para que la gráfica sea apaisada
  const L = lienzo(x0 / sx, x1 / sx, ymin, ymax, { W: p.ancho || 560, Hmax: p.alto || 280, pad: 30 });
  const xt = (p.xt || (rad ? [0.5, 1, 1.5, 2].filter(v => v >= x0 && v <= x1).map(v => [v, v === 1 ? 'π' : v === 2 ? '2π' : v === 0.5 ? 'π/2' : '3π/2']) : [90, 180, 270, 360].filter(v => v >= x0 && v <= x1).map(v => [v, v + '°']))).map(([v, t]) => [v / sx, t]);
  const yt = p.yt || (p.f === 'tan' ? [[1, '1'], [-1, '−1']] : [[1, '1'], [-1, '−1']]);
  L.ejes(xt, yt, { xl: 'x', yl: 'y' });
  L.curva(X => { const y = f(X * sx); return y < ymin - 0.01 || y > ymax + 0.01 ? NaN : y; }, x0 / sx, x1 / sx, { k: 'p', n: 800 });
  if (p.f === 'tan' && p.asintotas !== false) { const per = rad ? 1 : 180; for (let v = Math.ceil((x0 - per / 2) / per) * per + per / 2; v <= x1; v += per) if (v >= x0) L.seg([v / sx, ymin], [v / sx, ymax], { dash: true, k: 'eje' }); }
  if (p.k !== undefined && p.k !== null) { L.seg([x0 / sx, p.k], [x1 / sx, p.k], { k: 'fr', dash: true }); L.txt([x1 / sx, p.k], p.etqk || `y = ${String(p.k).replace('.', ',').replace('-', '−')}`, { pos: 'ne', k: 'fr', d: 6, size: 12 }); }
  for (const [i, s] of (p.sol || []).entries()) { const y = f(s); L.seg([s / sx, 0], [s / sx, y], { dash: true, k: 'v' }); L.dot([s / sx, y], { k: 'fr' }); L.txt([s / sx, 0], p.etqsol ? p.etqsol[i] : `${s}°`, { pos: y >= 0 ? 's' : 'n', k: 'v', d: 10, size: 12, bold: true }); }
  if (p.lineas) for (const [y, t] of p.lineas) { L.seg([x0 / sx, y], [x1 / sx, y], { k: 'n', dash: true }); if (t) L.txt([x1 / sx, y], t, { pos: 'ne', k: 'n', d: 6, size: 12 }); }
  return L;
};

function figura(tipo, params, pie) {
  if (!T[tipo]) throw new Error(`figura desconocida: ${tipo}`);
  return T[tipo](params).svg(pie, params.alt);
}
const CSS = `
.fig-m{margin:14px 0;background:var(--sheet);border:1px solid var(--rule);border-radius:12px;padding:10px;text-align:center}
.fig-m svg{display:block;width:100%;height:auto;margin:0 auto;overflow:visible}
.fig-m figcaption{font-size:13.5px;color:var(--ink-2);padding:6px 4px 0;text-align:left}
.fig-m .l{stroke:var(--ink);stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}
.fig-m .l.sin{fill:none}
.fig-m .dash{stroke-dasharray:6 5}
.fig-m .c-p{stroke:var(--c-p);fill:var(--c-p)} .fig-m .c-n{stroke:var(--c-n);fill:var(--c-n)} .fig-m .c-fr{stroke:var(--c-fr);fill:var(--c-fr)} .fig-m .c-v{stroke:var(--c-v);fill:var(--c-v)} .fig-m .c-eje{stroke:var(--ink-2);fill:var(--ink-2)}
.fig-m .l.c-p,.fig-m .l.c-n,.fig-m .l.c-fr,.fig-m .l.c-v,.fig-m .l.c-eje{fill:none}
.fig-m .f-p{fill:color-mix(in srgb,var(--c-p) 12%,transparent);stroke:none} .fig-m .f-n{fill:color-mix(in srgb,var(--c-n) 16%,transparent);stroke:none} .fig-m .f-v{fill:color-mix(in srgb,var(--c-v) 22%,transparent);stroke:none} .fig-m .f-fr{fill:color-mix(in srgb,var(--c-fr) 30%,transparent);stroke:none}
.fig-m .pt{fill:var(--ink);stroke:var(--sheet);stroke-width:1.5}
.fig-m .pt.c-p{fill:var(--c-p)} .fig-m .pt.c-fr{fill:var(--c-fr)} .fig-m .pt.c-n{fill:var(--c-n)}
.fig-m .punta{fill:var(--ink);stroke:none} .fig-m .punta.c-eje{fill:var(--ink-2)} .fig-m .punta.c-p{fill:var(--c-p)} .fig-m .punta.c-fr{fill:var(--c-fr)}
.fig-m .grid{stroke:var(--rule);stroke-width:1}
.fig-m .t{font:600 14px var(--f-body);fill:var(--ink);stroke:none;paint-order:stroke;stroke:var(--sheet);stroke-width:4px;stroke-linejoin:round}
.fig-m .t.b{font-weight:700}
.fig-m .t.c-p{fill:var(--c-p)} .fig-m .t.c-n{fill:var(--c-n)} .fig-m .t.c-fr{fill:var(--c-fr)} .fig-m .t.c-v{fill:var(--c-v)} .fig-m .t.c-eje{fill:var(--ink-2)}
.fig-m .t.c-p,.fig-m .t.c-n,.fig-m .t.c-fr,.fig-m .t.c-v,.fig-m .t.c-eje{stroke:var(--sheet)}
details.dibujo{margin:10px 0}
details.dibujo>summary{cursor:pointer;display:inline-flex;align-items:center;gap:8px;font:600 14px var(--f-body);border:1px dashed var(--c-p);color:var(--c-p);border-radius:9px;padding:6px 12px;list-style:none;min-height:38px}
details.dibujo>summary::-webkit-details-marker{display:none}
details.dibujo>summary::before{content:"✎"}
details.dibujo[open]>summary{border-style:solid}
`;
const api = { figura, CSS, tipos: Object.keys(T), T };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined') root.MatesFig = api;
})(typeof window !== 'undefined' ? window : globalThis);
