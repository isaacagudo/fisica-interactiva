/* BI Ciencias · patrones del Tema 2 de Matemáticas (Geometría y trigonometría) para el generador de exámenes.
   Un «tema» del generador por sección (0 a 5). Las soluciones llevan su figura (assets/mates/figuras.js) y las fórmulas
   en TeX compuestas con KaTeX. En val van los números para comprobarlos en Node. */
(function (root) {
  'use strict';
  const X = root.FisicaExamen || (typeof require !== 'undefined' ? require('./generador.js') : null);
  const K = root.katex || (typeof require !== 'undefined' ? require('../katex/katex.min.js') : null);
  const F = root.MatesFig || (typeof require !== 'undefined' ? require('../mates/figuras.js') : null);
  const m = s => K.renderToString(String(s), { throwOnError: false, output: 'htmlAndMathml' });
  const eq = s => `<p class="eq">${m('\\displaystyle ' + s)}</p>`;
  const P = s => `<p>${s}</p>`;
  const sub = s => `<p class="sub"><strong>${s}</strong></p>`;
  const por = (q, s) => `<blockquote class="why"><p><strong>¿Por qué ${q}?</strong> ${s}</p></blockquote>`;
  const met = s => `<p><strong>Qué hacer.</strong> ${s}</p>`;
  const comp = s => `<p><strong>Comprobación:</strong> ${s}</p>`;
  const fig = (t, p, pie) => F.figura(t, p, pie || '');
  const res = (...xs) => xs.join(' · ');
  const R = Math.PI / 180, deg = x => x / R;
  const n = (x, d = 2) => { const r = +x.toFixed(d); return (Object.is(r, -0) ? 0 : r).toString().replace('.', '{,}'); };   // para TeX
  const t = (x, d = 2) => n(x, d).replace('{,}', ',').replace('-', '−');                                                    // para texto
  const sg = x => x < 0 ? `(${x})` : `${x}`;
  const S = '\\operatorname{sen}', CO = '\\cos', TA = '\\tan';
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const fr = (p, q) => { if (q < 0) { p = -p; q = -q; } const g = gcd(p, q); p /= g; q /= g; return q === 1 ? `${p}` : `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}`; };
  const cx = c => c === '1' ? '' : c === '-1' ? '-' : c;   // coeficiente delante de x
  const pt = x => String(x).replace('-', '−');              // coordenada en el texto
  const lin = (mm, nn, x = 'x') => `${mm === '1' ? '' : mm === '-1' ? '-' : mm}${x} ${nn.startsWith('-') ? '- ' + nn.slice(1) : '+ ' + nn}`;

  // ================================================================ 0 · Repaso previo
  const repaso = [
    {
      id: 'interes', titulo: 'Interés compuesto',
      datos(r) { const C = r.pick([1000, 1500, 2000, 2500, 3000, 5000]), p = r.pick([2, 2.5, 3, 3.5, 4, 5]), a = r.int(3, 10), obj = C * r.pick([1.2, 1.25, 1.3, 1.5]); return { C, p, a, obj }; },
      enunciado: d => `Se invierten ${t(d.C)} € al ${t(d.p, 1)} % de interés compuesto anual. a) ¿Qué capital habrá al cabo de ${d.a} años? b) ¿Cuántos años completos hacen falta para superar los ${t(d.obj)} €?`,
      solucion(d) {
        const r = d.p / 100, CF = d.C * (1 + r) ** d.a, nn = Math.log(d.obj / d.C) / Math.log(1 + r), N = Math.floor(nn) + 1;
        const pasos = met('Cada año el capital se multiplica por (1 + r), con r en tanto por uno.') +
          sub('a) Capital final') + eq(`C_F = ${n(d.C)}\\cdot ${n(1 + r, 4)}^{${d.a}} = ${n(CF)}`) +
          por('(1 + r) a la n', 'Cada año se tiene lo que había más sus intereses: C·(1 + r). Repetido n años, se multiplica n veces.') +
          sub('b) Años necesarios') + eq(`${n(d.C)}\\cdot ${n(1 + r, 4)}^{n} > ${n(d.obj)} \\;\\Rightarrow\\; n > \\frac{\\log ${n(d.obj / d.C, 4)}}{\\log ${n(1 + r, 4)}} \\approx ${n(nn, 2)}`) +
          P(`Hacen falta <strong>${N} años</strong>.`) + comp(`${N - 1} años dan ${t(d.C * (1 + r) ** (N - 1))} € y ${N} años, ${t(d.C * (1 + r) ** N)} €.`);
        return { resultado: res(`${t(CF)} €`, `${N} años`), pasos, val: { CF, N } };
      },
    },
    {
      id: 'errores', titulo: 'Errores absoluto y relativo',
      datos: r => r.pick([['\\sqrt{2}', Math.SQRT2, [1.4, 1.41, 1.414]], ['\\sqrt{3}', Math.sqrt(3), [1.7, 1.73, 1.732]], ['\\pi', Math.PI, [3.1, 3.14, 3.1416]], ['\\sqrt{5}', Math.sqrt(5), [2.2, 2.24, 2.236]], ['e', Math.E, [2.7, 2.72, 2.718]]]).map((v, i, a) => i === 2 ? r.pick(v) : v),
      enunciado: d => `Se aproxima ${m(d[0])} por ${t(d[2], 4)}. Calcula el error absoluto y el error relativo (en %).`,
      solucion(d) {
        const Ea = Math.abs(d[1] - d[2]), Er = Ea / d[1];
        const pasos = eq(`E_a = |${d[0]} - ${n(d[2], 4)}| \\approx ${n(Ea, 6)}`) + eq(`E_r = \\frac{E_a}{${d[0]}} \\approx ${n(Er, 6)} = ${n(Er * 100, 4)}\\,\\%`) +
          por('se divide entre el valor real', 'El error relativo compara el error con el tamaño de lo que se mide.');
        return { resultado: res(m(`E_a \\approx ${n(Ea, 6)}`), m(`E_r \\approx ${n(Er * 100, 4)}\\,\\%`)), pasos, val: { Ea, Er } };
      },
    },
    {
      id: 'elevacion', titulo: 'Altura con un ángulo de elevación',
      datos: r => ({ d: r.int(15, 120), a: r.int(15, 70) }),
      enunciado: d => `Desde un punto del suelo situado a ${d.d} m del pie de una torre, se ve lo alto de la torre con un ángulo de elevación de ${d.a}°. Calcula la altura de la torre y el ángulo de depresión con el que se ve ese punto desde lo alto.`,
      solucion(d) {
        const h = d.d * Math.tan(d.a * R);
        const pasos = fig('alturas', { h, d: [d.d], ang: [`${d.a}°`], etqh: 'h', etqd: [`${d.d} m`], objeto: 'torre', foco: ['h'] }, 'El ángulo se mide desde la horizontal.') +
          eq(`${TA} ${d.a}^\\circ = \\frac{h}{${d.d}} \\;\\Rightarrow\\; h = ${d.d}\\cdot ${TA} ${d.a}^\\circ \\approx ${n(h)}\\ \\text{m}`) +
          por('la tangente', 'Se conocen el cateto contiguo (la distancia) y se busca el opuesto (la altura).') +
          P(`El ángulo de depresión desde lo alto también mide <strong>${d.a}°</strong>: es alterno interno con el de elevación.`);
        return { resultado: res(`h ≈ ${t(h)} m`, `depresión ${d.a}°`), pasos, val: { h } };
      },
    },
  ];

  // ================================================================ 1 · Geometría analítica
  const analitica = [
    {
      id: 'distancia3d', titulo: 'Distancia y punto medio en 3D',
      datos(r) { const A = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)], v = r.pick([[1, 2, 2], [2, 3, 6], [2, 6, 9], [4, 4, 7], [1, 4, 8], [3, 4, 12], [2, 1, 2], [6, 2, 3]]); const s = [r.pick([1, -1]), r.pick([1, -1]), r.pick([1, -1])]; const B = A.map((a, i) => a + s[i] * v[i]); return { A, B }; },
      enunciado: d => `Halla la distancia entre A(${d.A.map(pt).join(', ')}) y B(${d.B.map(pt).join(', ')}) y el punto medio del segmento AB.`,
      solucion(d) {
        const D = d.B.map((b, i) => b - d.A[i]), dist = Math.hypot(...D), M = d.A.map((a, i) => (a + d.B[i]) / 2);
        const pasos = eq(`d = \\sqrt{${D.map(x => `${sg(x)}^2`).join(' + ')}} = \\sqrt{${D.reduce((s, x) => s + x * x, 0)}} = ${n(dist)}`) +
          por('tres cuadrados', 'Es Pitágoras dos veces: primero en el plano xy y después con la diferencia de alturas.') +
          eq(`M = \\left(${M.map(x => n(x, 1)).join(';\\ ')}\\right)`);
        return { resultado: res(m(`d = ${n(dist)}`), m(`M(${M.map(x => n(x, 1)).join(';\\,')})`)), pasos, val: { dist, M } };
      },
    },
    {
      id: 'perpendicular', titulo: 'Recta perpendicular por un punto',
      datos(r) { const mm = r.pick([-4, -3, -2, 2, 3, 4, 5]), nn = r.int(-6, 6), P = [r.int(-5, 5), r.int(-5, 5)]; return { m: mm, n: nn, P }; },
      enunciado: d => `Halla la ecuación de la recta perpendicular a ${m(`y = ${lin(String(d.m), String(d.n))}`)} que pasa por P(${d.P.map(pt).join(', ')}), y el punto en el que se cortan las dos rectas.`,
      solucion(d) {
        const m2 = -1 / d.m, n2 = d.P[1] - m2 * d.P[0], x = (n2 - d.n) / (d.m - m2), y = d.m * x + d.n;
        const N2 = fr(d.P[1] * d.m + d.P[0], d.m), M2 = fr(-1, d.m);
        const pasos = fig('geo', { ejes: { x: [Math.min(-6, x - 2), Math.max(6, x + 2)], y: [Math.min(-6, y - 2), Math.max(6, y + 2)] }, pts: { P: d.P, Q: [x, y] }, el: [['recta', d.m, d.n, { k: 'p' }], ['recta', m2, n2, { k: 'fr' }], ['pt', 'P', 'ne'], ['pt', 'Q', 'so', 'corte']], alto: 260, ancho: 360 }) +
          eq(`m_1\\cdot m_2 = -1 \\;\\Rightarrow\\; m_2 = ${M2}`) + por('−1/m', 'Las pendientes de dos rectas perpendiculares son inversas y de signo contrario.') +
          eq(`y - ${sg(d.P[1])} = ${M2}\\,(x - ${sg(d.P[0])}) \\;\\Rightarrow\\; y = ${cx(M2)}x ${N2.startsWith('-') ? '- ' + N2.slice(1) : '+ ' + N2}`) +
          sub('Punto de corte') + eq(`${d.m}x ${d.n < 0 ? '-' : '+'} ${Math.abs(d.n)} = ${M2}x ${N2.startsWith('-') ? '- ' + N2.slice(1) : '+ ' + N2} \\;\\Rightarrow\\; x = ${n(x, 3)},\\; y = ${n(y, 3)}`);
        return { resultado: res(m(`y = ${cx(M2)}x ${N2.startsWith('-') ? '- ' + N2.slice(1) : '+ ' + N2}`), `corte (${t(x, 3)}; ${t(y, 3)})`), pasos, val: { m2, n2, x, y } };
      },
    },
    {
      id: 'corte', titulo: 'Posición relativa y punto de corte',
      datos(r) { const x = r.int(-4, 4), y = r.int(-4, 4), a1 = r.int(1, 4), b1 = r.int(-3, 3), a2 = r.int(-3, 3), b2 = r.int(1, 4); if (!b1 || !a2 || a1 * b2 - a2 * b1 === 0) return null; return { x, y, a1, b1, a2, b2, c1: a1 * x + b1 * y, c2: a2 * x + b2 * y }; },
      enunciado: d => `Estudia la posición relativa de las rectas ${m(`${d.a1}x ${d.b1 < 0 ? '-' : '+'} ${Math.abs(d.b1)}y = ${d.c1}`)} y ${m(`${d.a2}x ${d.b2 < 0 ? '-' : '+'} ${Math.abs(d.b2)}y = ${d.c2}`)} y, si se cortan, halla el punto de corte.`,
      solucion(d) {
        const m1 = -d.a1 / d.b1, m2 = -d.a2 / d.b2, perp = Math.abs(m1 * m2 + 1) < 1e-12;
        const pasos = eq(`m_1 = -\\frac{a}{b} = ${fr(-d.a1, d.b1)}, \\qquad m_2 = ${fr(-d.a2, d.b2)}`) +
          P(`Las pendientes son distintas: las rectas son <strong>secantes</strong>${perp ? ' y, como m₁·m₂ = −1, <strong>perpendiculares</strong>' : ''}.`) +
          P('Se resuelve el sistema (por reducción o sustitución):') + eq(`x = ${d.x},\\quad y = ${d.y}`) +
          comp(`${d.a1}·${sg(d.x)} + ${sg(d.b1)}·${sg(d.y)} = ${d.c1} y ${d.a2}·${sg(d.x)} + ${sg(d.b2)}·${sg(d.y)} = ${d.c2}.`) +
          fig('geo', { ejes: { x: [Math.min(-6, d.x - 2), Math.max(6, d.x + 2)], y: [Math.min(-6, d.y - 2), Math.max(6, d.y + 2)] }, pts: { Q: [d.x, d.y] }, el: [['recta', m1, d.c1 / d.b1, { k: 'p' }], ['recta', m2, d.c2 / d.b2, { k: 'fr' }], ['pt', 'Q', 'ne', `(${d.x}, ${d.y})`]], alto: 260, ancho: 360 });
        return { resultado: res(perp ? 'Secantes y perpendiculares' : 'Secantes', `corte (${d.x}, ${d.y})`), pasos, val: { x: d.x, y: d.y, perp } };
      },
    },
    {
      id: 'mediatriz', titulo: 'Mediatriz de un segmento',
      datos(r) { const A = [r.int(-5, 5), r.int(-5, 5)], B = [A[0] + 2 * r.int(-3, 3), A[1] + 2 * r.int(-3, 3)]; if (B[0] === A[0] || B[1] === A[1]) return null; return { A, B }; },
      enunciado: d => `Halla la ecuación de la mediatriz del segmento de extremos A(${d.A.map(pt).join(', ')}) y B(${d.B.map(pt).join(', ')}).`,
      solucion(d) {
        const M = [(d.A[0] + d.B[0]) / 2, (d.A[1] + d.B[1]) / 2], dx = d.B[0] - d.A[0], dy = d.B[1] - d.A[1];
        const mp = fr(-dx, dy), np = fr(M[1] * dy + M[0] * dx, dy);
        const pasos = fig('geo', { ejes: { x: [Math.min(d.A[0], d.B[0]) - 3, Math.max(d.A[0], d.B[0]) + 3], y: [Math.min(d.A[1], d.B[1]) - 3, Math.max(d.A[1], d.B[1]) + 3] }, pts: { A: d.A, B: d.B, M }, el: [['seg', 'A', 'B', { k: 'p' }], ['recta', -dx / dy, M[1] + dx / dy * M[0], { k: 'fr' }], ['pt', 'A', 'no'], ['pt', 'B', 'no'], ['pt', 'M', 'se']], alto: 260, ancho: 360 }, 'La mediatriz pasa por el punto medio y es perpendicular al segmento.') +
          eq(`M = (${M[0]}, ${M[1]}), \\qquad m_{AB} = ${fr(dy, dx)} \\;\\Rightarrow\\; m = ${mp}`) +
          eq(`y - ${sg(M[1])} = ${mp}\\,(x - ${sg(M[0])}) \\;\\Rightarrow\\; y = ${cx(mp)}x ${np.startsWith('-') ? '- ' + np.slice(1) : '+ ' + np}`);
        return { resultado: m(`y = ${cx(mp)}x ${np.startsWith('-') ? '- ' + np.slice(1) : '+ ' + np}`), pasos, val: { m: -dx / dy, n: M[1] + dx / dy * M[0] } };
      },
    },
  ];

  // ================================================================ 2 · Razones trigonométricas
  const EX = { 0: ['0', '1', '0'], 30: ['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{3}}{3}'], 45: ['\\frac{\\sqrt{2}}{2}', '\\frac{\\sqrt{2}}{2}', '1'], 60: ['\\frac{\\sqrt{3}}{2}', '\\frac{1}{2}', '\\sqrt{3}'], 90: ['1', '0', '\\nexists'] };
  const VAL = { 0: [0, 1, 0], 30: [0.5, Math.sqrt(3) / 2, Math.sqrt(3) / 3], 45: [Math.SQRT1_2, Math.SQRT1_2, 1], 60: [Math.sqrt(3) / 2, 0.5, Math.sqrt(3)] };
  const razones = [
    {
      id: 'reduccion', titulo: 'Razones exactas de cualquier ángulo',
      datos(r) { const ref = r.pick([30, 45, 60]), q = r.int(2, 4), base = q === 2 ? 180 - ref : q === 3 ? 180 + ref : 360 - ref, extra = r.pick([0, 0, 360, 720, -360]); return { ang: base + extra, ref, q, base }; },
      enunciado: d => `Calcula el valor exacto de ${m(`${S} ${d.ang}^\\circ`)}, ${m(`${CO} ${d.ang}^\\circ`)} y ${m(`${TA} ${d.ang}^\\circ`)}.`,
      solucion(d) {
        const sgn = [null, null, [1, -1, -1], [-1, -1, 1], [-1, 1, -1]][d.q], ex = EX[d.ref].map((v, i) => (sgn[i] < 0 ? '-' : '') + v);
        const pasos = (d.ang !== d.base ? P(`${d.ang}° ${d.ang > d.base ? `− ${(d.ang - d.base) / 360}·360°` : '+ 360°'} = ${d.base}°: mismas razones.`) : '') +
          fig('unidad', { ang: d.base, ref: true, otros: [d.ref], cuadrantes: true, etq: 'P' }, `${d.base}°: cuadrante ${['', 'I', 'II', 'III', 'IV'][d.q]}, ángulo de referencia ${d.ref}°.`) +
          por('ese signo', `En el cuadrante ${['', 'I', 'II', 'III', 'IV'][d.q]} el coseno (la x) es ${sgn[1] > 0 ? 'positivo' : 'negativo'} y el seno (la y), ${sgn[0] > 0 ? 'positivo' : 'negativo'}.`) +
          eq(`${S} ${d.ang}^\\circ = ${ex[0]}, \\quad ${CO} ${d.ang}^\\circ = ${ex[1]}, \\quad ${TA} ${d.ang}^\\circ = ${ex[2]}`);
        return { resultado: m(`${ex[0]},\\; ${ex[1]},\\; ${ex[2]}`), pasos, val: { s: Math.sin(d.ang * R), c: Math.cos(d.ang * R), v: VAL[d.ref].map((v, i) => sgn[i] * v) } };
      },
    },
    {
      id: 'una-razon', titulo: 'Conocida una razón y el cuadrante',
      datos(r) { const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), q = r.int(2, 4), cual = r.pick(['sen', 'cos']); return { a, b, c, q, cual }; },
      enunciado(d) { const sgn = [0, 0, [1, -1], [-1, -1], [-1, 1]][d.q], v = d.cual === 'sen' ? sgn[0] * d.a : sgn[1] * d.b; return `Sabiendo que ${m(`${d.cual === 'sen' ? S : CO}\\,\\theta = ${fr(v, d.c)}`)} y que θ está en el ${['', 'primer', 'segundo', 'tercer', 'cuarto'][d.q]} cuadrante, calcula las otras dos razones de θ.`; },
      solucion(d) {
        const sgn = [0, 0, [1, -1], [-1, -1], [-1, 1]][d.q], s = sgn[0] * d.a, c = sgn[1] * d.b;
        const pasos = fig('geo', { ejes: { x: [-1.3, 1.3], y: [-1.3, 1.3] }, pts: { O: [0, 0], P: [c / d.c, s / d.c], Q: [c / d.c, 0] }, el: [['circ', 'O', 1, { k: 'eje', dash: true }], ['pol', ['O', 'P', 'Q'], { fill: 'p' }], ['seg', 'O', 'P', { k: 'p' }], ['seg', 'P', 'Q', { k: 'n' }], ['seg', 'O', 'Q', { k: 'fr' }], ['pt', 'P', 'ne']], alto: 240, ancho: 260 }, 'El cuadrante decide los signos.') +
          eq(d.cual === 'sen' ? `${CO}^2\\theta = 1 - ${fr(s * s, d.c * d.c)} = ${fr(c * c, d.c * d.c)} \\;\\Rightarrow\\; ${CO}\\,\\theta = ${fr(c, d.c)}` : `${S}^2\\theta = 1 - ${fr(c * c, d.c * d.c)} = ${fr(s * s, d.c * d.c)} \\;\\Rightarrow\\; ${S}\\,\\theta = ${fr(s, d.c)}`) +
          por('ese signo', `En el ${['', 'primer', 'segundo', 'tercer', 'cuarto'][d.q]} cuadrante el seno es ${s > 0 ? 'positivo' : 'negativo'} y el coseno, ${c > 0 ? 'positivo' : 'negativo'}.`) +
          eq(`${TA}\\,\\theta = \\frac{${S}\\,\\theta}{${CO}\\,\\theta} = ${fr(s, c)}`);
        return { resultado: m(d.cual === 'sen' ? `${CO}\\theta = ${fr(c, d.c)},\\; ${TA}\\theta = ${fr(s, c)}` : `${S}\\theta = ${fr(s, d.c)},\\; ${TA}\\theta = ${fr(s, c)}`), pasos, val: { s: s / d.c, c: c / d.c } };
      },
    },
    {
      id: 'radianes', titulo: 'Grados y radianes',
      datos: r => ({ g: 15 * r.int(1, 23), k: r.int(1, 11), q: r.pick([3, 4, 6]) }),
      enunciado: d => `a) Expresa ${d.g}° en radianes (en función de π). b) Expresa ${m(`\\frac{${d.k === 1 ? '' : d.k}\\pi}{${d.q}}`)} rad en grados.`,
      solucion(d) {
        const g2 = d.k * 180 / d.q;
        const pasos = eq(`${d.g}^\\circ\\cdot \\frac{\\pi}{180} = ${fr(d.g, 180).replace(/\\frac\{(\d+)\}\{(\d+)\}/, (x, a, b) => `\\frac{${a === '1' ? '' : a}\\pi}{${b}}`).replace(/^(\d+)$/, '$1\\pi')}`) +
          por('π/180', '180° son π radianes: se multiplica por π y se divide entre 180.') + eq(`\\frac{${d.k}\\pi}{${d.q}}\\cdot \\frac{180}{\\pi} = ${n(g2, 2)}^\\circ`);
        return { resultado: res(m(`${fr(d.g, 180).replace(/\\frac\{(\d+)\}\{(\d+)\}/, (x, a, b) => `\\frac{${a === '1' ? '' : a}\\pi}{${b}}`).replace(/^(\d+)$/, '$1\\pi')}`), `${t(g2)}°`), pasos, val: { r1: d.g * R, g2 } };
      },
    },
  ];

  // ================================================================ 3 · Volúmenes y sectores
  const volumenes = [
    {
      id: 'sector', titulo: 'Arco, perímetro y área de un sector',
      datos: r => ({ r: r.int(3, 20), a: r.pick([30, 36, 40, 45, 60, 72, 90, 108, 120, 135, 150, 216, 240, 270]), inv: r.chance(0.4) }),
      enunciado: d => d.inv ? `Un sector circular de ${d.r} cm de radio tiene un perímetro de ${t(2 * d.r + d.r * d.a * R)} cm. Calcula su ángulo (en radianes y en grados) y su área.` : `Un sector circular tiene ${d.r} cm de radio y un ángulo de ${d.a}°. Calcula la longitud del arco, el perímetro y el área.`,
      solucion(d) {
        const th = d.a * R, L = d.r * th, A = d.r * d.r * th / 2;
        const pasos = fig('sector', { r: d.r, ang: d.a, etq: { r: `${d.r}`, ang: d.inv ? 'θ' : `${d.a}°`, arco: d.inv ? 'arco' : 'L' } }) +
          (d.inv ? eq(`2\\cdot ${d.r} + ${d.r}\\theta = ${n(2 * d.r + L)} \\;\\Rightarrow\\; \\theta = ${n(th, 4)}\\ \\text{rad} = ${d.a}^\\circ`) + por('2r + rθ', 'El perímetro son los dos radios más el arco.')
            : eq(`\\theta = ${d.a}\\cdot \\frac{\\pi}{180} = ${n(th, 4)}\\ \\text{rad}, \\quad L = r\\theta = ${n(L)}, \\quad 2r + L = ${n(2 * d.r + L)}`) + por('radianes', 'L = rθ y A = r²θ/2 solo valen con θ en radianes.')) +
          eq(`A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}\\cdot ${d.r * d.r}\\cdot ${n(th, 4)} \\approx ${n(A)}`);
        return { resultado: d.inv ? res(`θ ≈ ${t(th, 4)} rad = ${d.a}°`, `A ≈ ${t(A)} cm²`) : res(`L ≈ ${t(L)} cm`, `perímetro ≈ ${t(2 * d.r + L)} cm`, `A ≈ ${t(A)} cm²`), pasos, val: { L, A, th } };
      },
    },
    {
      id: 'cono', titulo: 'Cono con Pitágoras',
      datos(r) { const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25]]); return r.chance(0.5) ? { r: a, h: b, g: c } : { r: b, h: a, g: c }; },
      enunciado: d => `Un cono tiene ${d.r} cm de radio y ${d.h} cm de altura. Calcula su generatriz, su área total y su volumen.`,
      solucion(d) {
        const A = Math.PI * d.r * (d.r + d.g), V = Math.PI * d.r * d.r * d.h / 3;
        const pasos = fig('solido', { tipo: 'cono', r: d.r, h: d.h, etq: { r: `${d.r}`, h: `${d.h}`, g: 'g' } }, 'Radio, altura y generatriz forman un triángulo rectángulo.') +
          eq(`g = \\sqrt{${d.r}^2 + ${d.h}^2} = ${d.g}`) + eq(`A = \\pi r(r + g) = ${d.r * (d.r + d.g)}\\pi \\approx ${n(A)}`) + eq(`V = \\frac{1}{3}\\pi r^2 h = ${d.r * d.r * d.h / 3}\\pi \\approx ${n(V)}`) +
          por('el tercio', 'El cono es un tercio del cilindro con la misma base y altura.');
        return { resultado: res(`g = ${d.g} cm`, `A ≈ ${t(A)} cm²`, `V ≈ ${t(V)} cm³`), pasos, val: { A, V } };
      },
    },
    {
      id: 'semejantes', titulo: 'Cuerpos semejantes',
      datos: r => ({ V: r.int(20, 400), A: r.int(30, 300), k: r.pick([1.5, 2, 2.5, 3, 0.5, 0.75, 4]) }),
      enunciado: d => `Un depósito tiene una capacidad de ${d.V} L y una superficie de ${d.A} m². Se construye otro semejante cuyas longitudes miden ${t(d.k)} veces las del primero. ¿Qué capacidad y qué superficie tiene?`,
      solucion(d) {
        const V2 = d.V * d.k ** 3, A2 = d.A * d.k ** 2;
        const pasos = met('Si las longitudes se multiplican por k, las áreas se multiplican por k² y los volúmenes por k³.') +
          eq(`V' = ${d.V}\\cdot ${n(d.k)}^3 = ${n(V2)}\\ \\text{L}`) + eq(`A' = ${d.A}\\cdot ${n(d.k)}^2 = ${n(A2)}\\ \\text{m}^2`) +
          por('k³', 'Un volumen es el producto de tres longitudes; cada una se multiplica por k.');
        return { resultado: res(`${t(V2)} L`, `${t(A2)} m²`), pasos, val: { V2, A2 } };
      },
    },
    {
      id: 'esfera', titulo: 'Esfera: del volumen al radio',
      datos: r => ({ r: r.int(2, 15) }),
      enunciado: d => `Una esfera tiene un volumen de ${m(`${(4 * d.r ** 3 / 3) % 1 === 0 ? 4 * d.r ** 3 / 3 : `\\frac{${4 * d.r ** 3}}{3}`}\\pi`)} cm³. Calcula su radio y su área.`,
      solucion(d) {
        const A = 4 * Math.PI * d.r * d.r;
        const pasos = fig('solido', { tipo: 'esfera', r: d.r, etq: { r: 'r' } }) +
          eq(`\\frac{4}{3}\\pi r^3 = ${(4 * d.r ** 3 / 3) % 1 === 0 ? 4 * d.r ** 3 / 3 : `\\frac{${4 * d.r ** 3}}{3}`}\\pi \\;\\Rightarrow\\; r^3 = ${d.r ** 3} \\;\\Rightarrow\\; r = ${d.r}`) +
          eq(`A = 4\\pi r^2 = ${4 * d.r * d.r}\\pi \\approx ${n(A)}`);
        return { resultado: res(`r = ${d.r} cm`, `A = ${4 * d.r * d.r}π ≈ ${t(A)} cm²`), pasos, val: { A } };
      },
    },
  ];

  // ================================================================ 4 · Resolución de triángulos
  const etqT = (o, k) => { const e = {}; for (const x of k) e[x] = o[x]; return e; };
  const triangulos = [
    {
      id: 'seno', titulo: 'Teorema del seno',
      datos(r) { const A = r.int(25, 80), B = r.int(25, 80), c = r.int(5, 30); return A + B < 160 ? { A, B, c } : null; },
      enunciado: d => `En un triángulo, A = ${d.A}°, B = ${d.B}° y c = ${d.c} cm. Calcula C, a y b.`,
      solucion(d) {
        const C = 180 - d.A - d.B, a = d.c * Math.sin(d.A * R) / Math.sin(C * R), b = d.c * Math.sin(d.B * R) / Math.sin(C * R);
        const pasos = fig('tri', { a, b, c: d.c, etq: { A: `${d.A}°`, B: `${d.B}°`, c: `${d.c}`, a: 'a', b: 'b', C: 'C' }, foco: ['a', 'b', 'C'] }) +
          eq(`C = 180^\\circ - ${d.A}^\\circ - ${d.B}^\\circ = ${C}^\\circ`) +
          eq(`a = \\frac{${d.c}\\cdot ${S} ${d.A}^\\circ}{${S} ${C}^\\circ} \\approx ${n(a)}, \\qquad b = \\frac{${d.c}\\cdot ${S} ${d.B}^\\circ}{${S} ${C}^\\circ} \\approx ${n(b)}`) +
          por('el seno', 'Con C ya se conoce una pareja completa (c y C), y cada lado se relaciona con su ángulo opuesto.');
        return { resultado: res(`C = ${C}°`, `a ≈ ${t(a)} cm`, `b ≈ ${t(b)} cm`), pasos, val: { a, b, C } };
      },
    },
    {
      id: 'coseno-lado', titulo: 'Teorema del coseno: el tercer lado',
      datos: r => ({ b: r.int(4, 20), c: r.int(4, 20), A: r.int(20, 140) }),
      enunciado: d => `En un triángulo, b = ${d.b} cm, c = ${d.c} cm y el ángulo comprendido es A = ${d.A}°. Calcula el lado a y el área.`,
      solucion(d) {
        const a = Math.sqrt(d.b ** 2 + d.c ** 2 - 2 * d.b * d.c * Math.cos(d.A * R)), Ar = d.b * d.c * Math.sin(d.A * R) / 2;
        const pasos = fig('tri', { b: d.b, c: d.c, A: d.A, etq: { b: `${d.b}`, c: `${d.c}`, A: `${d.A}°`, a: 'a = ?' }, foco: ['a'] }) +
          eq(`a^2 = ${d.b}^2 + ${d.c}^2 - 2\\cdot ${d.b}\\cdot ${d.c}\\cdot ${CO} ${d.A}^\\circ \\approx ${n(a * a)} \\;\\Rightarrow\\; a \\approx ${n(a)}`) +
          por('el coseno', 'Se conocen dos lados y el ángulo que forman: el seno no sirve porque no hay ninguna pareja lado-ángulo opuesto.') +
          eq(`\\text{Área} = \\frac{1}{2}\\cdot ${d.b}\\cdot ${d.c}\\cdot ${S} ${d.A}^\\circ \\approx ${n(Ar)}`);
        return { resultado: res(`a ≈ ${t(a)} cm`, `área ≈ ${t(Ar)} cm²`), pasos, val: { a, Ar } };
      },
    },
    {
      id: 'coseno-angulo', titulo: 'Teorema del coseno: los ángulos',
      datos(r) { const L = [r.int(3, 15), r.int(3, 15), r.int(3, 15)].sort((x, y) => x - y); return L[0] + L[1] > L[2] + 0.5 ? { a: L[0], b: L[1], c: L[2] } : null; },
      enunciado: d => `Calcula los ángulos del triángulo de lados ${d.a}, ${d.b} y ${d.c} cm e indica si es acutángulo, rectángulo u obtusángulo.`,
      solucion(d) {
        const cC = (d.a ** 2 + d.b ** 2 - d.c ** 2) / (2 * d.a * d.b), C = deg(Math.acos(cC)), A = deg(Math.acos((d.b ** 2 + d.c ** 2 - d.a ** 2) / (2 * d.b * d.c))), B = 180 - A - C;
        const tipo = Math.abs(cC) < 1e-12 ? 'rectángulo' : cC < 0 ? 'obtusángulo' : 'acutángulo';
        const pasos = fig('tri', { a: d.a, b: d.b, c: d.c, etq: { a: `${d.a}`, b: `${d.b}`, c: `${d.c}`, A: 'A', B: 'B', C: 'C' }, foco: ['A', 'B', 'C'] }) +
          eq(`${CO} C = \\frac{${d.a}^2 + ${d.b}^2 - ${d.c}^2}{2\\cdot ${d.a}\\cdot ${d.b}} = ${n(cC, 4)} \\;\\Rightarrow\\; C \\approx ${n(C)}^\\circ`) +
          por('empezar por C', 'Está enfrente del lado mayor: es el único que puede ser obtuso, y el coseno lo detecta (sale negativo).') +
          eq(`${CO} A = \\frac{${d.b}^2 + ${d.c}^2 - ${d.a}^2}{2\\cdot ${d.b}\\cdot ${d.c}} \\;\\Rightarrow\\; A \\approx ${n(A)}^\\circ, \\qquad B = 180^\\circ - A - C \\approx ${n(B)}^\\circ`) +
          P(`El triángulo es <strong>${tipo}</strong>.`);
        return { resultado: res(`A ≈ ${t(A)}°`, `B ≈ ${t(B)}°`, `C ≈ ${t(C)}°`, tipo), pasos, val: { A, B, C } };
      },
    },
    {
      id: 'ambiguo', titulo: 'El caso ambiguo', peso: 3,
      datos(r) { const A = r.int(20, 60), b = r.int(6, 20), a = +(b * Math.sin(A * R) + r.next() * (b - b * Math.sin(A * R)) * 0.9 + 0.3).toFixed(1); return a < b && a > b * Math.sin(A * R) + 0.2 ? { a, b, A } : null; },
      enunciado: d => `En un triángulo, a = ${t(d.a, 1)} cm, b = ${d.b} cm y A = ${d.A}°. Resuélvelo, teniendo en cuenta que puede haber más de una solución.`,
      solucion(d) {
        const s = d.b * Math.sin(d.A * R) / d.a, B1 = deg(Math.asin(s)), B2 = 180 - B1, Cs = [180 - d.A - B1, 180 - d.A - B2], cs = Cs.map(C => d.a * Math.sin(C * R) / Math.sin(d.A * R));
        const pasos = eq(`${S} B = \\frac{${n(d.b)}\\cdot ${S} ${d.A}^\\circ}{${n(d.a, 1)}} \\approx ${n(s, 4)} \\;\\Rightarrow\\; B_1 \\approx ${n(B1)}^\\circ \\ \\text{o}\\ B_2 \\approx ${n(B2)}^\\circ`) +
          por('dos ángulos', 'Hay dos ángulos entre 0° y 180° con el mismo seno: B y 180° − B. Los dos valen porque A + B₂ < 180°.') +
          `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px">${[0, 1].map(i => fig('tri', { a: d.a, b: d.b, c: cs[i], etq: { a: t(d.a, 1), b: `${d.b}`, A: `${d.A}°`, B: `${t([B1, B2][i], 1)}°`, c: `c ≈ ${t(cs[i])}` }, foco: ['B', 'c'], ancho: 300, alto: 220 }, `Triángulo ${i + 1}`)).join('')}</div>` +
          eq(`C_1 \\approx ${n(Cs[0])}^\\circ,\\ c_1 \\approx ${n(cs[0])} \\qquad C_2 \\approx ${n(Cs[1])}^\\circ,\\ c_2 \\approx ${n(cs[1])}`);
        return { resultado: res(`B ≈ ${t(B1)}°, C ≈ ${t(Cs[0])}°, c ≈ ${t(cs[0])}`, `o B ≈ ${t(B2)}°, C ≈ ${t(Cs[1])}°, c ≈ ${t(cs[1])}`), pasos, val: { B1, B2, cs } };
      },
    },
    {
      id: 'dos-angulos', titulo: 'Altura con dos ángulos de elevación', peso: 3,
      datos(r) { const a = r.int(40, 70), b = r.int(15, a - 10), d = r.int(10, 80); return { a, b, d }; },
      enunciado: d => `Desde un punto del suelo se ve lo alto de una torre con un ángulo de elevación de ${d.a}°. Alejándonos ${d.d} m en línea recta, el ángulo es de ${d.b}°. Calcula la altura de la torre y la distancia inicial a su pie.`,
      solucion(d) {
        const ta = Math.tan(d.a * R), tb = Math.tan(d.b * R), x = d.d * tb / (ta - tb), h = x * ta;
        const pasos = fig('alturas', { h, d: [x, x + d.d], ang: [`${d.a}°`, `${d.b}°`], etqh: 'h', etqd: ['x', `${d.d} m`], objeto: 'torre' }, 'Dos triángulos rectángulos que comparten la altura h.') +
          eq(`h = x\\cdot ${TA} ${d.a}^\\circ, \\qquad h = (x + ${d.d})\\cdot ${TA} ${d.b}^\\circ`) +
          eq(`x\\,(${TA} ${d.a}^\\circ - ${TA} ${d.b}^\\circ) = ${d.d}\\cdot ${TA} ${d.b}^\\circ \\;\\Rightarrow\\; x \\approx ${n(x)}\\ \\text{m}, \\quad h \\approx ${n(h)}\\ \\text{m}`) +
          por('se igualan', 'Las dos expresiones son la misma altura: igualándolas queda una ecuación con una sola incógnita, x.');
        return { resultado: res(`h ≈ ${t(h)} m`, `x ≈ ${t(x)} m`), pasos, val: { h, x } };
      },
    },
  ];

  // ================================================================ 5 · Identidades y ecuaciones
  const sols = (f, k) => { const out = []; const nrm = v => +(((v % 360) + 360) % 360).toFixed(6); if (f === 'sen') { if (Math.abs(k) > 1) return []; const a = deg(Math.asin(k)); out.push(nrm(a), nrm(180 - a)); } else { if (Math.abs(k) > 1) return []; const a = deg(Math.acos(k)); out.push(nrm(a), nrm(360 - a)); } return [...new Set(out)].sort((x, y) => x - y); };
  const VTX = { 1: '1', [-1]: '-1', 0.5: '\\frac{1}{2}', [-0.5]: '-\\frac{1}{2}', 0: '0' };
  const identidades = [
    {
      id: 'ec-segundo', titulo: 'Ecuación de segundo grado en sen o cos', peso: 3,
      datos(r) { const f = r.pick(['sen', 'cos']), [r1, r2] = r.pick([[1, 0.5], [1, -0.5], [-1, 0.5], [-1, -0.5], [0.5, 0], [-0.5, 0], [1, 0], [-1, 0]]); return { f, r1, r2 }; },
      coef: d => [2, -2 * (d.r1 + d.r2), 2 * d.r1 * d.r2],   // 2(u − r1)(u − r2)
      enunciado(d) { const [a, b, c] = this.coef(d), F2 = d.f === 'sen' ? S : CO; return `Resuelve ${m(`${a}${F2}^2 x ${b ? (b < 0 ? '- ' : '+ ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + F2 + ' x' : ''} ${c ? (c < 0 ? '- ' : '+ ') + Math.abs(c) : ''} = 0`)} para 0° ≤ x < 360°.`; },
      solucion(d) {
        const [a, b, c] = this.coef(d), F2 = d.f === 'sen' ? S : CO, s1 = sols(d.f, d.r1), s2 = sols(d.f, d.r2), todas = [...new Set([...s1, ...s2])].sort((x, y) => x - y);
        const pasos = met(`Se llama u = ${d.f} x y se resuelve la ecuación de segundo grado; cada valor de u da sus ángulos.`) +
          eq(`${a}u^2 ${b ? (b < 0 ? '- ' : '+ ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'u' : ''} ${c ? (c < 0 ? '- ' : '+ ') + Math.abs(c) : ''} = 0 \\;\\Rightarrow\\; u = ${VTX[d.r1]} \\ \\text{o}\\ u = ${VTX[d.r2]}`) +
          eq(`${F2} x = ${VTX[d.r1]} \\Rightarrow x = ${s1.map(v => v + '^\\circ').join(',\\ ')}; \\qquad ${F2} x = ${VTX[d.r2]} \\Rightarrow x = ${s2.map(v => v + '^\\circ').join(',\\ ')}`) +
          por('dos ángulos por valor', d.f === 'sen' ? 'sen x = k da α y 180° − α (salvo k = ±1, que da uno solo).' : 'cos x = k da α y 360° − α (salvo k = ±1, que da uno solo).') +
          fig('grafica', { f: d.f, sol: todas, lineas: [[d.r1, ''], [d.r2, '']] }, 'Los cortes de la gráfica con las dos rectas.');
        return { resultado: m(`x = ${todas.map(v => v + '^\\circ').join(',\\ ')}`), pasos, val: { todas } };
      },
    },
    {
      id: 'ec-doble', titulo: 'Ecuación con ángulo doble', peso: 3,
      datos: r => ({ tipo: r.pick(['sen2x=cosx', 'sen2x=senx', 'cos2x=senx', 'cos2x=cosx']) }),
      DEF: {
        'sen2x=cosx': { en: `${S} 2x = ${CO} x`, paso: `2${S} x${CO} x - ${CO} x = 0 \\Rightarrow ${CO} x\\,(2${S} x - 1) = 0`, sol: [30, 90, 150, 270], f: x => Math.sin(2 * x) - Math.cos(x), por: 'Se usa sen 2x = 2 sen x cos x y se saca factor común cos x (sin dividir, para no perder cos x = 0).' },
        'sen2x=senx': { en: `${S} 2x = ${S} x`, paso: `2${S} x${CO} x - ${S} x = 0 \\Rightarrow ${S} x\\,(2${CO} x - 1) = 0`, sol: [0, 60, 180, 300], f: x => Math.sin(2 * x) - Math.sin(x), por: 'Se usa sen 2x = 2 sen x cos x y se saca factor común sen x.' },
        'cos2x=senx': { en: `${CO} 2x = ${S} x`, paso: `1 - 2${S}^2 x = ${S} x \\Rightarrow (2${S} x - 1)(${S} x + 1) = 0`, sol: [30, 150, 270], f: x => Math.cos(2 * x) - Math.sin(x), por: 'Se elige cos 2x = 1 − 2sen²x para que quede todo en seno.' },
        'cos2x=cosx': { en: `${CO} 2x = ${CO} x`, paso: `2${CO}^2 x - 1 = ${CO} x \\Rightarrow (2${CO} x + 1)(${CO} x - 1) = 0`, sol: [0, 120, 240], f: x => Math.cos(2 * x) - Math.cos(x), por: 'Se elige cos 2x = 2cos²x − 1 para que quede todo en coseno.' },
      },
      enunciado(d) { return `Resuelve ${m(this.DEF[d.tipo].en)} para 0° ≤ x < 360°.`; },
      solucion(d) {
        const D = this.DEF[d.tipo];
        const pasos = eq(D.paso) + por('esa fórmula', D.por) + eq(`x = ${D.sol.map(v => v + '^\\circ').join(',\\ ')}`) +
          comp('cada ángulo cumple la ecuación original (por ejemplo, con la calculadora).');
        return { resultado: m(`x = ${D.sol.map(v => v + '^\\circ').join(',\\ ')}`), pasos, val: { sol: D.sol, f: D.f } };
      },
    },
    {
      id: 'suma', titulo: 'Valor exacto con la suma de ángulos',
      datos: r => r.pick([{ ang: 75, A: 45, B: 30, op: '+' }, { ang: 15, A: 45, B: 30, op: '-' }, { ang: 105, A: 60, B: 45, op: '+' }, { ang: 165, A: 120, B: 45, op: '+' }].map(o => Object.assign({ f: r.pick(['sen', 'cos']) }, o))),
      enunciado: d => `Calcula el valor exacto de ${m(`${d.f === 'sen' ? S : CO} ${d.ang}^\\circ`)}.`,
      solucion(d) {
        const v = d.f === 'sen' ? Math.sin(d.ang * R) : Math.cos(d.ang * R);
        const s = x => Math.sin(x * R), c = x => Math.cos(x * R);
        const terms = d.f === 'sen' ? [s(d.A) * c(d.B), (d.op === '+' ? 1 : -1) * c(d.A) * s(d.B)] : [c(d.A) * c(d.B), (d.op === '+' ? -1 : 1) * s(d.A) * s(d.B)];
        const ex = { 75: ['\\frac{\\sqrt{6} + \\sqrt{2}}{4}', '\\frac{\\sqrt{6} - \\sqrt{2}}{4}'], 15: ['\\frac{\\sqrt{6} - \\sqrt{2}}{4}', '\\frac{\\sqrt{6} + \\sqrt{2}}{4}'], 105: ['\\frac{\\sqrt{6} + \\sqrt{2}}{4}', '\\frac{\\sqrt{2} - \\sqrt{6}}{4}'], 165: ['\\frac{\\sqrt{6} - \\sqrt{2}}{4}', '-\\frac{\\sqrt{6} + \\sqrt{2}}{4}'] }[d.ang][d.f === 'sen' ? 0 : 1];
        const F2 = d.f === 'sen' ? S : CO;
        const form = d.f === 'sen' ? `${S} ${d.A}^\\circ ${CO} ${d.B}^\\circ ${d.op} ${CO} ${d.A}^\\circ ${S} ${d.B}^\\circ` : `${CO} ${d.A}^\\circ ${CO} ${d.B}^\\circ ${d.op === '+' ? '-' : '+'} ${S} ${d.A}^\\circ ${S} ${d.B}^\\circ`;
        const pasos = eq(`${F2} ${d.ang}^\\circ = ${F2}(${d.A}^\\circ ${d.op} ${d.B}^\\circ) = ${form}`) + por('esos dos ángulos', `${d.ang}° = ${d.A}° ${d.op} ${d.B}°, y los dos son notables (o se reducen a uno notable).`) +
          eq(`= ${n(terms[0], 4)} ${terms[1] < 0 ? '-' : '+'} ${n(Math.abs(terms[1]), 4)} \\;\\Rightarrow\\; ${F2} ${d.ang}^\\circ = ${ex} \\approx ${n(v, 4)}`);
        return { resultado: m(`${ex} \\approx ${n(v, 4)}`), pasos, val: { v, suma: terms[0] + terms[1] } };
      },
    },
    {
      id: 'sinusoide', titulo: 'Sinusoide a partir de máximo, mínimo y periodo',
      datos(r) { const mn = r.int(-5, 5), amp = r.int(1, 6), per = r.pick([2, 4, 6, 8, 10, 12, 24]); return { mn, mx: mn + 2 * amp, per }; },
      enunciado: d => `Una función f(x) = a·sen(bx) + d, con a > 0 y b > 0, tiene un máximo de ${d.mx}, un mínimo de ${d.mn} y un periodo de ${d.per}. Halla a, b y d.`,
      solucion(d) {
        const a = (d.mx - d.mn) / 2, dd = (d.mx + d.mn) / 2, b = fr(2, d.per).replace(/\\frac\{(\d+)\}\{(\d+)\}/, '\\frac{$1\\pi}{$2}').replace(/^1$/, '\\pi').replace(/^(\d+)$/, '$1\\pi');
        const pasos = eq(`a = \\frac{${d.mx} - ${sg(d.mn)}}{2} = ${a}, \\qquad d = \\frac{${d.mx} + ${sg(d.mn)}}{2} = ${dd}`) +
          por('las medias', 'El eje está a mitad de camino entre el máximo y el mínimo, y la amplitud es la mitad de la distancia entre ellos.') +
          eq(`\\frac{2\\pi}{b} = ${d.per} \\;\\Rightarrow\\; b = ${b}`) +
          fig('geo', { ejes: { x: [0, d.per * 1.1], y: [Math.min(0, d.mn) - 1, Math.max(0, d.mx) + 1], xt: [[d.per, `${d.per}`]], yt: [[d.mx, `${d.mx}`], [d.mn, `${d.mn}`], [dd, `${dd}`]] }, pts: {}, el: [['curva', `${a}*sin(2*PI/${d.per}*x)+${dd}`, 0, d.per * 1.05, { k: 'p' }], ['recta', 0, dd, { k: 'eje', dash: true }]], alto: 200, ancho: 420 });
        return { resultado: m(`a = ${a},\\; b = ${b},\\; d = ${dd}`), pasos, val: { a, dd, b: 2 * Math.PI / d.per } };
      },
    },
  ];

  // ================================================================ registro
  const MAT = 'matematicas', G = 'Tema 2 · Geometría y trigonometría';
  X.registrar({ tema: 'repaso-t2', grupo: G, materia: MAT, nombre: '0 · Repaso previo', ruta: 'temas/repaso-geometria/', apartados: [
    { slug: 'cientifica', nombre: 'Interés y errores', icono: 'cientifica', patrones: repaso.slice(0, 2) },
    { slug: 'elevacion', nombre: 'Elevación', icono: 'elevacion', patrones: repaso.slice(2) },
  ] });
  X.registrar({ tema: 'analitica', grupo: G, materia: MAT, nombre: '1 · Geometría analítica', ruta: 'temas/geometria-analitica/', apartados: [
    { slug: 'distancia', nombre: 'Distancia y punto medio', icono: 'distancia', patrones: analitica.slice(0, 1) },
    { slug: 'posicion', nombre: 'Rectas', icono: 'perpendicular', patrones: analitica.slice(1) },
  ] });
  X.registrar({ tema: 'razones', grupo: G, materia: MAT, nombre: '2 · Razones trigonométricas', ruta: 'temas/razones-trigonometricas/', apartados: [
    { slug: 'radianes', nombre: 'Radianes', icono: 'radianes', patrones: razones.slice(2) },
    { slug: 'cuadrantes', nombre: 'Cualquier ángulo', icono: 'cuadrantes', patrones: razones.slice(0, 2) },
  ] });
  X.registrar({ tema: 'volumenes', grupo: G, materia: MAT, nombre: '3 · Volúmenes y sectores', ruta: 'temas/volumenes/', apartados: [
    { slug: 'cuerpos', nombre: 'Cuerpos', icono: 'cuerpos', patrones: [volumenes[1], volumenes[3]] },
    { slug: 'semejantes', nombre: 'Semejantes', icono: 'semejantes', patrones: [volumenes[2]] },
    { slug: 'sector', nombre: 'Sectores', icono: 'sector', patrones: [volumenes[0]] },
  ] });
  X.registrar({ tema: 'triangulos', grupo: G, materia: MAT, nombre: '4 · Triángulos', ruta: 'temas/triangulos/', apartados: [
    { slug: 'seno', nombre: 'Seno', icono: 'seno', patrones: [triangulos[0], triangulos[3]] },
    { slug: 'coseno', nombre: 'Coseno y área', icono: 'coseno', patrones: [triangulos[1], triangulos[2]] },
    { slug: 'alturas', nombre: 'Alturas', icono: 'elevacion', patrones: [triangulos[4]] },
  ] });
  X.registrar({ tema: 'identidades', grupo: G, materia: MAT, nombre: '5 · Identidades y ecuaciones', ruta: 'temas/identidades/', apartados: [
    { slug: 'suma-y-doble', nombre: 'Suma y ángulo doble', icono: 'angdoble', patrones: [identidades[2]] },
    { slug: 'ecuaciones', nombre: 'Ecuaciones', icono: 'ecuacion', patrones: [identidades[0], identidades[1]] },
    { slug: 'sinusoide', nombre: 'Sinusoides', icono: 'sinusoide', patrones: [identidades[3]] },
  ] });
})(typeof window !== 'undefined' ? window : globalThis);
