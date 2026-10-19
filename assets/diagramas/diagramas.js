/* Física interactiva · librería de diagramas
   Dibuja en SVG el esquema de cada ejercicio a partir de sus datos: fuerzas con sus colores (P azul, N verde,
   rozamiento rojo, fuerza aplicada morada, velocidad ámbar, muelle rosa), alturas con su nivel h = 0, estados inicial
   y final, vectores en el plano y reparto de energía. Cada diagrama se puede ver entero o «paso a paso», en el
   orden en que se dibuja en clase, con una frase que explica cada paso.

   Tres formas de usarlo, siempre pasando solo el tipo y los parámetros:
   1. En una página, con el script:
        <figure class="fig dg" data-diagrama="plano" data-config='{"alpha": 30, "mov": "sube", "roz": true}'></figure>
        <script src="…/assets/diagramas/diagramas.js" defer></script>
   2. En los apuntes (src/<tema>/contenido/*.md), en una línea propia:
        [[figura:plano|{"alpha": 30, "mov": "sube", "roz": true}|Pie de la figura]]
      El generador de páginas lo dibuja al construir (se ve aunque no haya JavaScript) y el script añade el paso a paso.
   3. Desde JavaScript o Node: FisicaDiagramas.html(tipo, parámetros, pie) devuelve la figura (HTML con el SVG) y
      FisicaDiagramas.dibujar(tipo, parámetros) devuelve { svg, pasos }.

   Tipos y parámetros (todos opcionales salvo los marcados *):
     horizontal  cuerpo sobre un suelo horizontal: alpha (° de F; negativo = empuja hacia abajo), F, P*, N*, Fr (0 sin
                 rozamiento), frena (texto de una fuerza que frena: «F frenado»), empuja (texto de una fuerza neta a favor),
                 sinPN (no dibuja P ni N), v (texto de la velocidad), cuerpo (texto dentro del bloque)
     plano       plano inclinado que sube hacia la izquierda: alpha*, mov ("sube" | "baja"), roz, F ("sube": fuerza
                 paralela hacia arriba del plano), Ftxt, v
     vertical    carga que sube colgada: Ftxt («T», «F motor»), v, cuerpo
     niveles     alturas: puntos* [{ id, h, txt, v: "arriba" | "abajo" | "horizontal" }], max, nivel0, nota
     parabola    tiro oblicuo desde el suelo: th*, v0txt, vxtxt, htxt
     muelleH     muelle horizontal, estados A y B: A* y B* { txt, sep: true (tramo L antes del muelle), Ltxt, comp: true (comprimido x), v: "izq" | "der", vtxt }, roz
     muelleV     cuerpo que cae sobre un muelle vertical: hTxt, xTxt
     vectores    producto escalar: Ax*, Ay*, Bx*, By*, Fx*, Fy*
     reparto     energía consumida, útil y perdida: total*, util*, txtTotal, txtUtil, txtPerd
     cadena      cálculo en cadena (conversiones, coste): cajas* [textos], ops [operación entre cajas], textos [frase de cada paso]
   Cualquier tipo acepta pasos: [textos] para cambiar las frases del paso a paso. */
(function (root) {
  'use strict';
  const C = { P: 'var(--c-p)', N: 'var(--c-n)', Fr: 'var(--c-fr)', F: 'var(--c-a)', v: 'var(--c-v)', k: 'var(--c-k)', ink: 'var(--ink)', q: 'var(--ink-2)', pl: 'var(--plane)', ple: 'var(--plane-edge)', sh: 'var(--sheet)' };
  const r1 = x => Math.round(x * 10) / 10;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const coma = x => String(Math.round(x * 10) / 10).replace('.', ',').replace('-', '−');
  const ang = x => coma(x) + '°';

  // ---------------------------------------------------------------- piezas
  function flecha(x1, y1, x2, y2, c, o = {}) {
    const L = Math.hypot(x2 - x1, y2 - y1); if (L < 2) return '';
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L, h = Math.min(11, L * 0.45), bx = x2 - ux * h, by = y2 - uy * h, w = o.w || 2.6;
    return `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(bx)}" y2="${r1(by)}" style="stroke:${c};stroke-width:${w}${o.dash ? ';stroke-dasharray:6 4' : ''}"/>` +
      `<polygon points="${r1(x2)},${r1(y2)} ${r1(bx - uy * 5.5)},${r1(by + ux * 5.5)} ${r1(bx + uy * 5.5)},${r1(by - ux * 5.5)}" style="fill:${c}"/>`;
  }
  const txt = (x, y, s, o = {}) => `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${o.a || 'middle'}" style="fill:${o.c || C.ink};font-size:${o.s || 15}px;font-weight:${o.w || 700}">${esc(s)}</text>`;
  const linea = (x1, y1, x2, y2, c = C.q, o = {}) => `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" style="stroke:${c};stroke-width:${o.w || 1.5}${o.dash ? ';stroke-dasharray:' + o.dash : ''}"/>`;
  const arco = (cx, cy, r, a1, a2, c = C.ink) => { const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2); return `<path d="M${r1(x1)} ${r1(y1)} A${r} ${r} 0 ${Math.abs(a2 - a1) > Math.PI ? 1 : 0} ${a2 > a1 ? 1 : 0} ${r1(x2)} ${r1(y2)}" style="fill:none;stroke:${c};stroke-width:1.4"/>`; };
  const rect = (x, y, w, h, o = {}) => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${o.rx ?? 4}" style="fill:${o.f || C.sh};stroke:${o.s || C.ink};stroke-width:${o.sw || 1.6}${o.op ? ';opacity:' + o.op : ''}"/>`;
  const suelo = (x1, x2, y) => rect(x1, y, x2 - x1, 14, { f: C.pl, s: 'none', rx: 0 }) + linea(x1, y, x2, y, C.ple, { w: 2 });
  const bola = (x, y, r = 9) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" style="fill:${C.sh};stroke:${C.ink};stroke-width:1.8"/>`;
  function zigzag(x1, y1, x2, y2, n = 8, a = 10) {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, px = -uy, py = ux, e = Math.min(10, L / 6), s = (L - 2 * e) / (2 * n);
    let d = `M${r1(x1)} ${r1(y1)} L${r1(x1 + ux * e)} ${r1(y1 + uy * e)}`;
    for (let i = 0; i < 2 * n; i++) { const t = e + s * (i + 0.5), k = i % 2 ? -a : a; d += ` L${r1(x1 + ux * t + px * k)} ${r1(y1 + uy * t + py * k)}`; }
    return `<path d="${d} L${r1(x2 - ux * e)} ${r1(y2 - uy * e)} L${r1(x2)} ${r1(y2)}" style="fill:none;stroke:${C.k};stroke-width:2.4;stroke-linejoin:round"/>`;
  }
  const lon = (f, ref, min, max) => Math.max(min, Math.min(max, 92 * f / ref));

  // Lienzo con pasos: base (siempre visible) y grupos numerados que se muestran en orden
  function lienzo(W, H, aria) {
    const base = [], grupos = [], pasos = [];
    return {
      base: s => base.push(s),
      paso(texto, s) { pasos.push(texto); grupos.push(`<g class="dg-p" data-p="${pasos.length}">${s}</g>`); },
      fin: (o = {}) => ({ svg: `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}" style="font-family:var(--f-body)">${base.join('')}${grupos.join('')}</svg>`, pasos: o.pasos && o.pasos.length === pasos.length ? o.pasos : pasos }),
    };
  }

  // ---------------------------------------------------------------- tipos
  const T = {};
  T.horizontal = o => {
    const W = 600, H = 340, yS = 250, bx = 230, bw = 140, bh = 96, Cx = bx + bw / 2, Cy = yS - bh / 2, Lz = lienzo(W, H, 'Diagrama de fuerzas sobre el cuerpo');
    Lz.base(suelo(20, 580, yS) + rect(bx, yS - bh, bw, bh));
    if (o.cuerpo) Lz.base(txt(bx - 10, yS - 12, o.cuerpo, { c: C.q, s: 14, w: 600, a: 'end' }));
    const P = o.P || 1, LP = 106, a = (o.alpha || 0) * Math.PI / 180;
    if (!o.sinPN) {
      Lz.paso('El peso P = m·g: vertical y hacia abajo. Está siempre.', flecha(Cx, Cy, Cx, Cy + LP, C.P) + txt(Cx + 14, Cy + LP, 'P', { c: C.P, a: 'start', s: 18 }));
      const LN = Math.max(48, Math.min(150, LP * (o.N ?? P) / P));
      Lz.paso(o.F > 0 && a !== 0 ? `La normal N: perpendicular al suelo, hacia arriba. Ojo: como F ${a > 0 ? 'tira un poco hacia arriba, N es menor' : 'empuja hacia abajo, N es mayor'} que el peso.` : 'La normal N: el suelo empuja al cuerpo, perpendicular a la superficie y hacia arriba. Aquí N = P.',
        flecha(Cx, Cy, Cx, Cy - LN, C.N) + txt(Cx - 12, Cy - LN + 12, 'N', { c: C.N, a: 'end', s: 18 }));
    }
    let vLeft = true;
    if (o.F > 0) {
      const LF = Math.max(lon(o.F, P, 104, 170), Math.min(196, (bw / 2 + 18) / Math.max(0.2, Math.cos(a)))), Ft = o.Ftxt || 'F';
      let s = '';
      if (a >= 0) {
        const ex = Cx + LF * Math.cos(a), ey = Cy - LF * Math.sin(a);
        if (a > 0.01) {
          s += flecha(Cx, Cy, ex, Cy, C.F, { dash: true, w: 2 }) + flecha(ex, Cy, ex, ey, C.F, { dash: true, w: 2 });
          s += txt((Cx + ex) / 2 + 8, Cy + 24, 'Fx', { c: C.F, s: 15 }) + txt(ex + 8, (Cy + ey) / 2 + 6, 'Fy', { c: C.F, s: 15, a: 'start' });
          s += arco(Cx, Cy, 30, -a, 0) + (o.alpha >= 30 ? txt(Cx + 46 * Math.cos(a / 2), Cy - 46 * Math.sin(a / 2) + 5, ang(o.alpha), { s: 13, w: 600 }) : txt(Cx + 34 * Math.cos(a) - 2, Cy - 34 * Math.sin(a) - 10, ang(o.alpha), { s: 13, w: 600, a: 'end' }));
        }
        s += flecha(Cx, Cy, ex, ey, C.F) + txt(ex + 12 * Math.cos(a) + 4, ey - 12 * Math.sin(a) - 4, Ft, { c: C.F, a: 'start', s: 18 });
      } else {
        const aa = -a, tx = bx + 4, ty = yS - bh + 4, sx = tx - LF * Math.cos(aa), sy = ty - LF * Math.sin(aa);
        s += flecha(sx, sy, tx, sy, C.F, { dash: true, w: 2 }) + flecha(tx, sy, tx, ty, C.F, { dash: true, w: 2 });
        s += txt((sx + tx) / 2, sy - 10, 'Fx', { c: C.F, s: 15 }) + txt(tx + 8, (sy + ty) / 2 + 6, 'Fy', { c: C.F, s: 15, a: 'start' });
        s += arco(sx, sy, 34, 0, aa) + txt(sx + 50 * Math.cos(aa / 2) + 4, sy + 50 * Math.sin(aa / 2) + 10, ang(-o.alpha), { s: 13, a: 'start', w: 600 });
        s += flecha(sx, sy, tx, ty, C.F) + txt(sx - 8, sy - 8, Ft, { c: C.F, a: 'end', s: 18 });
        vLeft = false;
      }
      Lz.paso(a !== 0 ? `La fuerza aplicada ${Ft}, a ${ang(Math.abs(o.alpha))} de la horizontal. Se descompone en Fx = F·cos α (arrastra) y Fy = F·sen α (${a > 0 ? 'levanta un poco' : 'aprieta contra el suelo'}).` : `La fuerza aplicada ${Ft}, horizontal: toda ella arrastra el cuerpo.`, s);
    }
    if (o.v) { const x0 = vLeft ? 40 : 430; Lz.paso('El sentido del movimiento (la velocidad): de él depende hacia dónde va el rozamiento.', flecha(x0, 70, x0 + 96, 70, C.v) + txt(x0 + 48, 56, o.v, { c: C.v, s: 16 })); }
    if (o.Fr > 0) { const L = lon(o.Fr, P, 100, 170); Lz.paso('El rozamiento Fr = μ·N: en la superficie de contacto y contra el movimiento.', flecha(Cx, yS - 8, Cx - L, yS - 8, C.Fr) + txt(Cx - L - 8, yS - 2, 'Fr', { c: C.Fr, a: 'end', s: 18 })); }
    if (o.frena) Lz.paso(`${o.frena}: va contra el movimiento y es la que quita la energía cinética.`, flecha(bx, Cy - 14, bx - 110, Cy - 14, C.Fr) + txt(bx - 110, Cy - 26, o.frena, { c: C.Fr, a: 'start', s: 16 }));
    if (o.empuja) Lz.paso(`${o.empuja}: va a favor del movimiento y aumenta la energía cinética.`, flecha(bx + bw, Cy - 14, bx + bw + 110, Cy - 14, C.F) + txt(bx + bw + 110, Cy - 26, o.empuja, { c: C.F, a: 'end', s: 16 }));
    return Lz.fin(o);
  };

  T.plano = o => {
    const W = 640, H = 400, x0 = 40, yB = 372, a = o.alpha * Math.PI / 180, ta = Math.tan(a), Lz = lienzo(W, H, 'Diagrama de fuerzas en el plano inclinado');
    const bw = Math.min(560, 300 / ta), h = bw * ta, TL = [x0, yB - h], BR = [x0 + bw, yB], L = Math.hypot(bw, h);
    const u = [Math.cos(a), Math.sin(a)], n = [Math.sin(a), -Math.cos(a)], at = (p, k, d) => [p[0] + k * d[0], p[1] + k * d[1]];
    const Q = at(TL, 0.52 * L, u), hw = 40, hh = 56, c1 = at(Q, -hw, u), c2 = at(Q, hw, u), c3 = at(c2, hh, n), c4 = at(c1, hh, n), Cc = at(Q, hh / 2, n);
    Lz.base(`<polygon points="${TL.map(r1).join(',')} ${x0},${yB} ${BR.map(r1).join(',')}" style="fill:${C.pl};stroke:${C.ple};stroke-width:2"/>` +
      `<polygon points="${[c1, c2, c3, c4].map(p => p.map(r1).join(',')).join(' ')}" style="fill:${C.sh};stroke:${C.ink};stroke-width:1.6"/>` +
      arco(BR[0], BR[1], 60, Math.PI + 0.0001, Math.PI + a) + txt(BR[0] - 84 * Math.cos(a / 2), BR[1] - 84 * Math.sin(a / 2) + 6, ang(o.alpha), { s: 15, w: 600 }));
    const LP = 120, Px = at(Cc, LP * Math.sin(a), u), Py = at(Cc, -LP * Math.cos(a), n), Pe = [Cc[0], Cc[1] + LP], Ne = at(Cc, LP * Math.cos(a), n);
    Lz.paso('El peso P = m·g: vertical y hacia abajo, aunque el cuerpo esté en un plano.', flecha(Cc[0], Cc[1], Pe[0], Pe[1], C.P) + txt(Pe[0] + 10, Pe[1] + 2, 'P', { c: C.P, a: 'start', s: 18 }));
    Lz.paso('El peso se descompone con ejes paralelo y perpendicular al plano: Px = m·g·sen α (hacia abajo del plano) y Py = m·g·cos α (contra el plano).',
      flecha(Cc[0], Cc[1], Px[0], Px[1], C.P, { dash: true, w: 2 }) + txt(Px[0] + 10, Px[1] - 8, 'Px', { c: C.P, s: 16, a: 'start' }) +
      flecha(Cc[0], Cc[1], Py[0], Py[1], C.P, { dash: true, w: 2 }) + txt(Py[0] - 10, Py[1] + 10, 'Py', { c: C.P, s: 16, a: 'end' }));
    Lz.paso('La normal N: perpendicular al plano. El cuerpo no se separa ni se hunde, así que N = Py = m·g·cos α (no m·g).', flecha(Cc[0], Cc[1], Ne[0], Ne[1], C.N) + txt(Ne[0] + 14 * n[0] + 4, Ne[1] + 14 * n[1] + 6, 'N', { c: C.N, a: 'start', s: 18 }));
    if (o.F) { const s0 = at(at(Cc, -hw, u), 14, n), e0 = at(s0, -96, u); Lz.paso(`La fuerza aplicada ${o.Ftxt || 'F'}: paralela al plano y hacia arriba de la rampa.`, flecha(s0[0], s0[1], e0[0], e0[1], C.F) + txt(e0[0] - 4, e0[1] - 14, o.Ftxt || 'F', { c: C.F, a: 'end', s: 17 })); }
    const dm = o.mov === 'sube' ? -1 : 1;
    if (o.v) { const s0 = at(at(Cc, 104, n), dm * 26, u), e0 = at(s0, dm * 70, u), m = at(at(s0, dm * 35, u), 16, n); Lz.paso(`El sentido del movimiento: ${o.mov === 'sube' ? 'sube' : 'baja'} por el plano.`, flecha(s0[0], s0[1], e0[0], e0[1], C.v) + txt(m[0], m[1] + 4, o.v, { c: C.v, s: 16, a: 'start' })); }
    if (o.roz) { const s0 = at(at(Q, -dm * hw, u), 5, n), e0 = at(s0, -dm * 70, u), m = at(at(s0, -dm * 40, u), -22, n); Lz.paso(`El rozamiento Fr = μ·N = μ·m·g·cos α, contra el movimiento: ${o.mov === 'sube' ? 'hacia abajo del plano, como Px' : 'hacia arriba del plano, contra Px'}.`, flecha(s0[0], s0[1], e0[0], e0[1], C.Fr) + txt(m[0], m[1] + 6, 'Fr', { c: C.Fr, s: 18 })); }
    return Lz.fin(o);
  };

  T.vertical = o => {
    const W = 600, H = 320, cx = 280, top = 160, bw = 130, bh = 90, Cy = top + bh / 2, Lz = lienzo(W, H, 'Fuerzas sobre la carga que sube');
    Lz.base(bola(cx, 34, 18) + linea(cx, 34, cx, top, C.q, { w: 1.6 }) + rect(cx - bw / 2, top, bw, bh) + (o.cuerpo ? txt(cx - bw / 2 - 12, top + 22, o.cuerpo, { c: C.q, s: 14, w: 600, a: 'end' }) : ''));
    Lz.paso('El peso P = m·g, hacia abajo.', flecha(cx, Cy, cx, Cy + 100, C.P) + txt(cx + 14, Cy + 100, 'P', { c: C.P, a: 'start', s: 18 }));
    Lz.paso(`La fuerza que sube la carga (${o.Ftxt || 'T'}), hacia arriba por el cable.`, flecha(cx + 8, top, cx + 8, top - 100, C.F) + txt(cx + 20, top - 86, o.Ftxt || 'T', { c: C.F, a: 'start', s: 18 }));
    Lz.paso('Sube con velocidad constante: aceleración nula, así que la fuerza que sube es igual al peso.', flecha(cx + 150, Cy + 34, cx + 150, Cy - 44, C.v) + txt(cx + 164, Cy + 4, o.v || 'v constante', { c: C.v, s: 16, a: 'start' }));
    return Lz.fin(o);
  };

  T.niveles = o => {
    const W = 600, H = 340, y0 = 300, top = 44, x = 150, Lz = lienzo(W, H, 'Alturas medidas desde el nivel h = 0');
    const hmax = Math.max(o.max || 0, ...o.puntos.map(p => p.h), 1e-9), Y = h => y0 - (y0 - top) * h / hmax;
    Lz.base(rect(20, y0, 560, 14, { f: C.pl, s: 'none', rx: 0 }) + linea(x, Y(hmax), x, y0, C.q, { dash: '4 5' }) + (o.nota ? txt(20, 20, o.nota, { a: 'start', s: 14, c: C.q, w: 600 }) : ''));
    Lz.paso(`Primero se fija el nivel ${o.nivel0 || 'h = 0'}: todas las alturas se miden desde ahí.`, linea(20, y0, 580, y0, C.ink, { w: 2.4 }) + txt(580, y0 + 30, o.nivel0 || 'h = 0', { a: 'end', s: 15, c: C.ink, w: 700 }));
    const pts = o.puntos.slice().sort((p, q) => q.h - p.h), lab = new Map(); let last = -Infinity;
    pts.forEach(p => { const y = Y(p.h); let ly = p.h <= 1e-9 ? y - 12 : y + 6; if (ly - last < 26) ly = last + 26; last = ly; lab.set(p, ly); });
    o.puntos.forEach(p => {
      const y = Y(p.h), ly = lab.get(p);
      let s = bola(x, y, 10) + txt(x - 24, p.h <= 1e-9 ? y - 12 : y + 6, p.id, { a: 'end', s: 18 });
      if (Math.abs(ly - (y + 6)) > 1) s += linea(x + 13, y, x + 40, ly - 5, C.q, { w: 1 });
      s += txt(x + 44, ly, p.txt, { a: 'start', s: 16, w: 600 });
      if (p.v === 'arriba') s += flecha(x - 70, y + 24, x - 70, y - 30, C.v);
      if (p.v === 'abajo') s += flecha(x - 70, y - 54, x - 70, y - 4, C.v);
      if (p.v === 'horizontal') s += flecha(x - 90, y - 22, x - 30, y - 22, C.v);
      Lz.paso(`Punto ${p.id}: ${p.txt}.`, s);
    });
    return Lz.fin(o);
  };

  T.parabola = o => {
    const W = 600, H = 320, x1 = 150, x2 = 560, yS = 272, th = o.th * Math.PI / 180, Lz = lienzo(W, H, 'Trayectoria del tiro oblicuo');
    const hpx = Math.min(200, 0.25 * (x2 - x1) * Math.tan(th)), xm = (x1 + x2) / 2, ytop = yS - hpx, L = 100;
    const vx = x1 + L * Math.cos(th), vy = yS - L * Math.sin(th);
    Lz.base(suelo(20, 580, yS));
    Lz.paso('Punto A, el lanzamiento: v₀ forma un ángulo θ con la horizontal. Nivel h = 0 en el suelo.', flecha(x1, yS, vx, vy, C.v) + txt(vx - 8, vy - 8, o.v0txt || 'v₀', { c: C.v, a: 'end', s: 16 }) + arco(x1, yS, 38, -th, 0) + txt(x1 + 48, yS - 8, ang(o.th), { s: 14, a: 'start', w: 600 }) + txt(x1, yS + 34, 'A (h = 0)', { s: 15, w: 600, a: 'start' }));
    Lz.paso('La trayectoria es una parábola: solo actúa el peso, así que se conserva la energía mecánica.', `<path d="M${x1} ${yS} Q${xm} ${r1(yS - 2 * hpx)} ${x2} ${yS}" style="fill:none;stroke:${C.q};stroke-width:1.8;stroke-dasharray:5 5"/>`);
    Lz.paso('Punto B, el más alto: la velocidad vertical es cero, pero la horizontal sigue igual (v = vx = v₀·cos θ).', bola(xm, ytop, 9) + flecha(xm + 12, ytop, xm + 84, ytop, C.v) + txt(xm + 90, ytop + 6, o.vxtxt || 'vx', { c: C.v, a: 'start', s: 16 }) + txt(xm, ytop - 18, 'B, punto más alto', { s: 15, w: 600 }));
    Lz.paso('La altura máxima se mide desde el suelo.', linea(xm, ytop + 12, xm, yS, C.q, { dash: '3 4' }) + txt(xm - 10, (ytop + yS) / 2 + 6, o.htxt || 'h máx', { a: 'end', s: 16, w: 600 }));
    return Lz.fin(o);
  };

  T.muelleH = o => {
    const W = 600, H = 380, xw = 556, L0 = 190, Lz = lienzo(W, H, 'Estados inicial y final del muelle');
    const fila = (y, e, et) => {
      let b = suelo(20, xw, y) + rect(xw, y - 84, 18, 98, { f: C.pl, s: C.ple, sw: 1.5, rx: 0 });
      const libre = xw - L0, comp = e.comp ? 64 : 0, xs = libre + comp, bw = 78, xb = xs - (e.sep ? 130 : 0) - bw;
      b += zigzag(xs, y - 28, xw, y - 28, 8, 10) + rect(xb, y - 58, bw, 58, { rx: 3 });
      if (comp) b += linea(libre, y - 72, libre, y + 2, C.q, { dash: '3 3' }) + flecha(libre, y - 68, xs, y - 68, C.k, { w: 1.8 }) + txt((libre + xs) / 2, y - 76, 'x', { c: C.k, s: 17 });
      if (e.sep) b += linea(xb + bw, y + 26, xs, y + 26, C.q) + linea(xb + bw, y + 18, xb + bw, y + 34, C.q) + linea(xs, y + 18, xs, y + 34, C.q) + txt((xb + bw + xs) / 2, y + 50, e.Ltxt || 'L', { s: 16, w: 700 });
      if (e.v === 'der') b += flecha(xb + 8, y - 76, xb + 80, y - 76, C.v) + txt(xb + 4, y - 72, e.vtxt || 'v', { c: C.v, s: 16, a: 'end' });
      if (e.v === 'izq') b += flecha(xb + 70, y - 76, xb - 2, y - 76, C.v) + txt(xb + 76, y - 72, e.vtxt || 'v', { c: C.v, s: 16, a: 'start' });
      if (o.roz && e.v) b += flecha(xb, y - 14, xb - 50, y - 14, C.Fr, { w: 2.2 }) + txt(xb - 56, y - 8, 'Fr', { c: C.Fr, s: 15, a: 'end' });
      return b + txt(20, y - 118, `${et}: ${e.txt}`, { a: 'start', s: 16, w: 700 });
    };
    Lz.paso(`Estado A: ${o.A.txt}.`, fila(150, o.A, 'A'));
    Lz.paso(`Estado B: ${o.B.txt}.`, fila(348, o.B, 'B'));
    return Lz.fin(o);
  };

  T.muelleV = o => {
    const W = 600, H = 350, yS = 318, Lm = 120, xA = 150, xB = 420, comp = 54, Lz = lienzo(W, H, 'El cuerpo cae y comprime el muelle');
    Lz.base(suelo(20, 580, yS));
    const col = (x, c, by, et, t) => zigzag(x, yS, x, yS - Lm + c, 7, 13) + linea(x - 28, yS - Lm + c, x + 28, yS - Lm + c, C.k, { w: 3 }) + bola(x, by, 18) + txt(x, 22, et, { s: 18 }) + txt(x, 44, t, { s: 14, w: 600, c: C.q });
    Lz.paso('Estado A: el cuerpo se suelta a una altura h sobre el extremo libre del muelle (v = 0).', col(xA, 0, yS - Lm - 120, 'A', 'se suelta, v = 0') + linea(xA + 44, yS - Lm, xA + 44, yS - Lm - 102, C.q) + txt(xA + 52, yS - Lm - 50, o.hTxt || 'h', { a: 'start', s: 16, w: 700 }) + linea(xA - 70, yS - Lm, xB + 80, yS - Lm, C.q, { dash: '3 4' }));
    Lz.paso('Estado B: compresión máxima x (v = 0 otra vez). Desde A ha bajado h + x: el nivel h = 0 se pone aquí.', col(xB, comp, yS - Lm + comp - 18, 'B', 'compresión máxima, v = 0') + linea(xB + 44, yS - Lm, xB + 44, yS - Lm + comp, C.k, { w: 1.8 }) + txt(xB + 52, yS - Lm + comp / 2 + 6, o.xTxt || 'x', { a: 'start', s: 17, c: C.k }) + linea(xB - 100, yS - Lm + comp, xB + 130, yS - Lm + comp, C.q, { dash: '6 4' }) + txt(xB + 134, yS - Lm + comp + 20, 'h = 0', { a: 'end', s: 15, c: C.q, w: 600 }));
    return Lz.fin(o);
  };

  T.vectores = o => {
    const xs = [o.Ax, o.Bx, 0], ys = [o.Ay, o.By, 0], H = 380;
    const xmin = Math.min(...xs) - 2.5, xmax = Math.max(...xs) + 2.5, ymin = Math.min(...ys) - 2, ymax = Math.max(...ys) + 2;
    const k = Math.min(540 / (xmax - xmin), 320 / (ymax - ymin)), W = Math.round(Math.max(400, k * (xmax - xmin) + 60)), Lz = lienzo(W, H, 'Fuerza y desplazamiento en el plano');
    const ox = W / 2 - k * (xmin + xmax) / 2, oy = 190 + k * (ymin + ymax) / 2, X = x => ox + k * x, Y = y => oy - k * y;
    Lz.base(linea(X(xmin), Y(0), X(xmax), Y(0), C.q, { w: 1.2 }) + linea(X(0), Y(ymin), X(0), Y(ymax), C.q, { w: 1.2 }) + txt(X(xmax), Y(0) + 20, 'x (m)', { a: 'end', s: 14, c: C.q, w: 600 }) + txt(X(0) + 8, Y(ymax) + 14, 'y (m)', { a: 'start', s: 14, c: C.q, w: 600 }));
    const mx2 = (o.Ax + o.Bx) / 2, my2 = (o.Ay + o.By) / 2;
    let pts = ''; for (const [p, x, y] of [['A', o.Ax, o.Ay], ['B', o.Bx, o.By]]) pts += `<circle cx="${r1(X(x))}" cy="${r1(Y(y))}" r="5" style="fill:${C.ink}"/>` + txt(X(x) + (x >= mx2 ? 10 : -10), Y(y) + (y >= my2 ? -12 : 24), `${p}(${coma(x)}, ${coma(y)})`, { a: x >= mx2 ? 'start' : 'end', s: 16 });
    Lz.paso('Los puntos inicial A y final B.', pts);
    const dx = X(o.Bx) - X(o.Ax), dy = Y(o.By) - Y(o.Ay), dl = Math.hypot(dx, dy), mx = (X(o.Ax) + X(o.Bx)) / 2, my = (Y(o.Ay) + Y(o.By)) / 2;
    const fl = Math.hypot(o.Fx, o.Fy), ux = o.Fx / fl, uy = -o.Fy / fl;
    let nx = -dy / dl, ny = dx / dl; if (nx * ux + ny * uy > 0) { nx = -nx; ny = -ny; }   // la etiqueta de Δr, al otro lado de F
    Lz.paso('El desplazamiento Δr va de A a B: Δr = (xB − xA)·i + (yB − yA)·j.', flecha(X(o.Ax), Y(o.Ay), X(o.Bx), Y(o.By), C.ink, { w: 2.4 }) + txt(mx + nx * 22, my + ny * 22 + 6, 'Δr', { s: 18 }));
    const LF = Math.min(110, Math.max(70, 0.7 * dl)), fx = X(o.Ax) + LF * ux, fy = Y(o.Ay) + LF * uy;
    Lz.paso('La fuerza F (solo se dibuja su dirección: es constante durante todo el camino).', flecha(X(o.Ax), Y(o.Ay), fx, fy, C.F) + txt(fx + 16 * ux, fy + 16 * uy + 6, 'F', { c: C.F, s: 18 }));
    const a1 = Math.atan2(dy, dx), a2 = Math.atan2(uy, ux); let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    Lz.paso('El ángulo φ entre F y Δr decide el signo del trabajo: menor de 90°, positivo; mayor de 90°, negativo.', arco(X(o.Ax), Y(o.Ay), 30, Math.min(a1, a1 + d), Math.max(a1, a1 + d), C.q) + txt(X(o.Ax) + 48 * Math.cos(a1 + d / 2), Y(o.Ay) + 48 * Math.sin(a1 + d / 2) + 6, 'φ', { s: 17 }));
    return Lz.fin(o);
  };

  T.reparto = o => {
    const W = 600, H = 160, x0 = 20, w = 560, wu = Math.max(40, Math.min(w - 40, w * o.util / o.total)), Lz = lienzo(W, H, 'Reparto de la energía consumida');
    Lz.paso('Toda la energía que se consume (la que se paga): E = P·t.', txt(x0, 30, o.txtTotal || 'Energía consumida', { a: 'start', s: 16 }) + rect(x0, 44, w, 46, { f: 'none', s: C.ink, sw: 1.2, rx: 0 }));
    Lz.paso('La parte útil: la que hace lo que se quiere (subir la carga, calentar el agua). η = útil / consumida.', rect(x0, 44, wu, 46, { f: 'var(--c-n)', s: 'none', rx: 0, op: 0.85 }) + txt(x0 + 4, 116, o.txtUtil || 'útil', { a: 'start', s: 15, c: 'var(--c-n)' }));
    Lz.paso('El resto se pierde, casi siempre como calor (rozamientos, el propio aparato).', rect(x0 + wu, 44, w - wu, 46, { f: 'var(--c-fr)', s: 'none', rx: 0, op: 0.75 }) + txt(x0 + w, 142, o.txtPerd || 'pérdidas', { a: 'end', s: 15, c: 'var(--c-fr)' }));
    return Lz.fin(o);
  };

  T.cadena = o => {
    const W = 600, bh = 46, gap = 40, H = 24 + o.cajas.length * (bh + gap) - gap + 16, x0 = 40, w = 520, Lz = lienzo(W, H, 'Cálculo paso a paso');
    o.cajas.forEach((c, i) => {
      const y = 24 + i * (bh + gap);
      let s = rect(x0, y, w, bh, { f: i === o.cajas.length - 1 ? 'var(--hl)' : C.sh, s: C.ink, sw: 1.4, rx: 8 }) + txt(x0 + w / 2, y + bh / 2 + 6, c, { s: 17 });
      if (i > 0) s = flecha(x0 + 60, y - gap + 2, x0 + 60, y - 2, C.q, { w: 2 }) + txt(x0 + 76, y - gap / 2 + 6, o.ops[i - 1] || '', { a: 'start', s: 15, c: C.q, w: 600 }) + s;
      Lz.paso((o.textos && o.textos[i]) || c, s);
    });
    return Lz.fin(o);
  };

  // ---------------------------------------------------------------- API
  function dibujar(tipo, p) { if (!T[tipo]) throw new Error('diagrama desconocido: ' + tipo); return T[tipo](p || {}); }
  // figura completa (para construir páginas o insertar desde JavaScript)
  function html(tipo, p, pie) {
    const r = dibujar(tipo, p);
    return `<figure class="fig dg" data-diagrama="${tipo}" data-config='${JSON.stringify(p).replace(/&/g, '&amp;').replace(/'/g, '&#39;')}'>${r.svg}${pie ? `<figcaption>${esc(pie)}</figcaption>` : ''}</figure>`;
  }

  // ---------------------------------------------------------------- navegador: paso a paso
  const CSS = `.dg-ctrl{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:8px 2px 2px}
.dg-b{font:600 13px var(--f-body);color:var(--ink);background:var(--sheet);border:1px solid var(--rule);border-radius:9px;min-height:36px;padding:0 12px;cursor:pointer}
.dg-b:hover{border-color:var(--ink-2)}
.dg-b[disabled]{opacity:.4;cursor:default}
.dg-txt{flex:1 1 240px;margin:0;font-size:14px;line-height:1.4;min-width:0}
.dg-txt b{font-family:var(--f-mono);font-size:12.5px;margin-right:6px;color:var(--ink-2)}
.dg .dg-p{transition:opacity .35s}
.dg .dg-oculto{opacity:0}
.dg .dg-nuevo{animation:dg-in 1.1s ease-out}
@keyframes dg-in{0%{opacity:0}40%{opacity:1}60%{opacity:.55}100%{opacity:1}}
@media (prefers-reduced-motion: reduce){.dg .dg-nuevo{animation:none}.dg .dg-p{transition:none}}
@media print{.dg-ctrl{display:none}.dg .dg-oculto{opacity:1}}`;
  function montar(fig) {
    if (fig.__dg) return; fig.__dg = true;
    let cfg = {}; try { cfg = JSON.parse(fig.getAttribute('data-config') || '{}'); } catch (e) { console.error('diagrama: data-config no es JSON válido', e); return; }
    const tipo = fig.getAttribute('data-diagrama');
    let r; try { r = dibujar(tipo, cfg); } catch (e) { console.error(e); return; }
    if (!fig.querySelector('svg')) fig.insertAdjacentHTML('afterbegin', r.svg);
    if (r.pasos.length < 2 || typeof document === 'undefined') return;
    if (!document.getElementById('dg-css')) { const st = document.createElement('style'); st.id = 'dg-css'; st.textContent = CSS; document.head.appendChild(st); }
    const grupos = Array.from(fig.querySelectorAll('.dg-p')), N = r.pasos.length;
    const bar = document.createElement('div'); bar.className = 'dg-ctrl';
    const cap = fig.querySelector('figcaption'); fig.insertBefore(bar, cap || null);
    let k = 0;
    const inicio = () => { bar.innerHTML = `<button type="button" class="dg-b" data-a="ir">▶ Dibujarlo paso a paso</button>`; grupos.forEach(g => g.classList.remove('dg-oculto', 'dg-nuevo')); k = 0; };
    const ver = n => {
      k = n;
      grupos.forEach(g => { const p = +g.getAttribute('data-p'); g.classList.toggle('dg-oculto', p > k); g.classList.toggle('dg-nuevo', p === k); });
      bar.innerHTML = `<button type="button" class="dg-b" data-a="ant" aria-label="Paso anterior"${k <= 1 ? ' disabled' : ''}>‹</button><p class="dg-txt" aria-live="polite"><b>${k}/${N}</b>${esc(r.pasos[k - 1])}</p>` +
        (k < N ? `<button type="button" class="dg-b" data-a="sig">Siguiente ›</button><button type="button" class="dg-b" data-a="todo">Ver todo</button>` : `<button type="button" class="dg-b" data-a="fin">Terminar</button>`);
    };
    bar.addEventListener('click', ev => {
      const b = ev.target.closest('button'); if (!b) return;
      const a = b.getAttribute('data-a');
      if (a === 'ir') ver(1); else if (a === 'sig') ver(Math.min(N, k + 1)); else if (a === 'ant') ver(Math.max(1, k - 1)); else inicio();
    });
    inicio();
  }
  const montarEn = (el = document) => el.querySelectorAll('[data-diagrama]').forEach(montar);

  const api = { dibujar, html, montar, montarEn, tipos: Object.keys(T) };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') {
    root.FisicaDiagramas = api;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => montarEn()); else montarEn();
  }
})(typeof window !== 'undefined' ? window : globalThis);
