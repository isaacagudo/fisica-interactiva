/* BI Ciencias · patrones del Tema 1 de Matemáticas (Secuencias, series y demostraciones) para el generador de exámenes.
   Un «tema» del generador por sección (0 a 4) y un apartado por apartado de la sección. Cada patrón elige datos
   enteros con sentido (si no, devuelve null y se vuelve a sortear), escribe el enunciado y la solución paso a paso
   con «¿Por qué…?», como en los apuntes, y devuelve en val los números para comprobarlos en Node.
   Las fórmulas se escriben en TeX y se componen con KaTeX (en el navegador, assets/katex/katex.min.js). */
(function (root) {
  'use strict';
  const X = root.FisicaExamen || (typeof require !== 'undefined' ? require('./generador.js') : null);
  const K = root.katex || (typeof require !== 'undefined' ? require('../katex/katex.min.js') : null);

  // ---------------------------------------------------------------- piezas de texto
  const m = s => K.renderToString(String(s), { throwOnError: false, output: 'htmlAndMathml' });
  const eq = s => `<p class="eq">${m('\\displaystyle ' + s)}</p>`;
  const P = s => `<p>${s}</p>`;
  const sub = s => `<p class="sub"><strong>${s}</strong></p>`;
  const por = (q, s) => `<blockquote class="why"><p><strong>¿Por qué ${q}?</strong> ${s}</p></blockquote>`;
  const met = s => `<p><strong>Qué hacer.</strong> ${s}</p>`;
  const comp = s => `<p><strong>Comprobación:</strong> ${s}</p>`;
  const ojo = s => `<p class="ojo"><strong>Ojo:</strong> ${s}</p>`;
  const lista = xs => `<ol type="a">${xs.map(x => `<li>${x}</li>`).join('')}</ol>`;
  const res = (...xs) => xs.join(' · ');

  // ---------------------------------------------------------------- aritmética exacta (fracciones pequeñas)
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const Q = (p, q = 1) => { if (q < 0) { p = -p; q = -q; } const g = gcd(p, q); return { p: p / g, q: q / g }; };
  const qq = x => typeof x === 'number' ? Q(x) : x;
  const add = (a, b) => { a = qq(a); b = qq(b); return Q(a.p * b.q + b.p * a.q, a.q * b.q); };
  const mul = (a, b) => { a = qq(a); b = qq(b); return Q(a.p * b.p, a.q * b.q); };
  const div = (a, b) => { a = qq(a); b = qq(b); return Q(a.p * b.q, a.q * b.p); };
  const pw = (a, n) => { a = qq(a); let r = Q(1); for (let i = 0; i < n; i++) r = mul(r, a); return r; };
  const val = a => { a = qq(a); return a.p / a.q; };
  const tq = a => { a = qq(a); const s = a.p < 0 ? '-' : ''; return a.q === 1 ? `${a.p}` : `${s}\\frac{${Math.abs(a.p)}}{${a.q}}`; };
  const tqp = a => { a = qq(a); return a.p < 0 ? `\\left(${tq(a)}\\right)` : tq(a); };   // con paréntesis si es negativo
  const sg = x => x < 0 ? `(${x})` : `${x}`;                                                 // entero con paréntesis si es negativo
  const dec = x => String(+x.toFixed(10)).replace('.', '{,}').replace('-', '−');
  const C = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const fact = n => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const V = (n, k) => fact(n) / fact(n - k);
  const miles = x => { const s = String(Math.abs(x)); return (x < 0 ? '-' : '') + (s.length > 4 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : s); };

  // polinomio en TeX: coefs de mayor a menor grado (números o fracciones)
  function poli(cs, x = 'x') {
    const g = cs.length - 1; let s = '';
    cs.forEach((c0, i) => {
      const c = qq(c0), e = g - i; if (c.p === 0) return;
      const ab = Q(Math.abs(c.p), c.q), uno = ab.p === 1 && ab.q === 1 && e > 0;
      const pot = e === 0 ? '' : e === 1 ? x : `${x}^{${e}}`;
      s += (s ? (c.p < 0 ? ' - ' : ' + ') : (c.p < 0 ? '-' : '')) + (uno ? '' : tq(ab)) + pot;
    });
    return s || '0';
  }
  // suma de términos ya escritos con su signo: [[coef, 'resto en TeX'], …]
  function terminos(ts) {
    let s = '';
    for (const [c0, t] of ts) { const c = qq(c0); if (c.p === 0) continue; const ab = Q(Math.abs(c.p), c.q), uno = ab.p === 1 && ab.q === 1 && t;
      s += (s ? (c.p < 0 ? ' - ' : ' + ') : (c.p < 0 ? '-' : '')) + (uno ? '' : tq(ab)) + t; }
    return s || '0';
  }
  const evalP = (cs, a) => cs.reduce((s, c) => add(mul(s, a), c), Q(0));
  // tabla de Ruffini
  function ruffini(cs, a) {
    const b = [qq(cs[0])], pr = [''];
    for (let i = 1; i < cs.length; i++) { const p = mul(b[i - 1], a); pr.push(p); b.push(add(cs[i], p)); }
    const celda = x => `<td>${x === '' ? '' : m(tq(x))}</td>`;
    const html = `<div class="table-wrap"><table class="ruffini"><tbody>
<tr><td></td>${cs.map(c => celda(qq(c))).join('')}</tr>
<tr><td>${m(tq(a))}</td>${pr.map(celda).join('')}</tr>
<tr><td></td>${b.map((x, i) => i === b.length - 1 ? `<td><strong>${m(tq(x))}</strong></td>` : celda(x)).join('')}</tr></tbody></table></div>`;
    return { cociente: b.slice(0, -1), resto: b[b.length - 1], html };
  }

  // ================================================================ 0 · Repaso previo
  const ecuaciones = [
    {
      id: 'bicuadrada', titulo: 'Ecuación bicuadrada',
      datos(r) { const a = r.int(1, 6), b = r.int(1, 7), neg = r.chance(0.3); if (a === b) return null; return { a, b, neg }; },
      enunciado: (d, f) => { const B = d.neg ? d.b * d.b - d.a * d.a : -(d.a * d.a + d.b * d.b), Cc = d.neg ? -d.a * d.a * d.b * d.b : d.a * d.a * d.b * d.b; return `Resuelve la ecuación ${m(poli([1, 0, B, 0, Cc]) + ' = 0')}.`; },
      solucion(d) {
        const a2 = d.a * d.a, b2 = d.neg ? -d.b * d.b : d.b * d.b, S = a2 + b2, Pp = a2 * b2;
        const sols = d.neg ? [d.a, -d.a] : [d.a, -d.a, d.b, -d.b];
        const pasos = met('Es una ecuación bicuadrada: solo aparecen x⁴ y x². Se cambia x² = z, se resuelve la de segundo grado en z y se deshace el cambio.') +
          eq(`x^2 = z \\;\\Rightarrow\\; ${poli([1, -S, Pp], 'z')} = 0`) +
          por('el cambio', 'Porque x⁴ = (x²)² = z²: la ecuación pasa a ser de segundo grado, que ya sabemos resolver.') +
          eq(`z = \\frac{${S} \\pm \\sqrt{${sg(S)}^2 - 4\\cdot ${sg(Pp)}}}{2} = \\frac{${S} \\pm ${Math.abs(a2 - b2)}}{2} \\;\\Rightarrow\\; z_1 = ${Math.max(a2, b2)},\\; z_2 = ${Math.min(a2, b2)}`) +
          P(`Se deshace el cambio, x = ±√z:`) +
          eq(`z = ${a2} \\Rightarrow x = \\pm ${d.a}` + (d.neg ? `\\qquad z = ${b2} \\Rightarrow x^2 = ${b2} \\text{ no tiene solución real}` : `\\qquad z = ${b2} \\Rightarrow x = \\pm ${d.b}`)) +
          (d.neg ? por('se descarta', 'Un cuadrado nunca es negativo: x² = ' + b2 + ' no tiene soluciones reales.') : '') +
          comp(`con x = ${d.a}: ${d.a}⁴ ${d.neg ? '+' : '−'} … = 0; las soluciones de una bicuadrada siempre van por parejas ±.`);
        return { resultado: m('x = ' + sols.join(',\\; ')), pasos, val: { sols } };
      },
    },
    {
      id: 'raiz-doble', titulo: 'Parámetro para una raíz doble',
      datos(r) { const a = r.int(1, 4), s = r.int(1, 6) * r.pick([1, -1]); return { a, s }; },   // a(x − s)² = a x² − 2as x + a s²
      enunciado: (d) => `Halla los valores de k para los que la ecuación ${m(`${d.a === 1 ? '' : d.a}x^2 + kx + ${d.a * d.s * d.s} = 0`)} tiene una solución doble, y calcula esa solución en cada caso.`,
      solucion(d) {
        const c = d.a * d.s * d.s, k = 2 * d.a * Math.abs(d.s);
        const pasos = met('Una ecuación de segundo grado tiene solución doble cuando el discriminante vale 0.') +
          eq(`\\Delta = k^2 - 4\\cdot ${d.a}\\cdot ${c} = 0 \\;\\Rightarrow\\; k^2 = ${4 * d.a * c} \\;\\Rightarrow\\; k = \\pm ${k}`) +
          por('Δ = 0', 'En la fórmula x = (−k ± √Δ)/(2a), si Δ = 0 los dos signos dan lo mismo: una sola solución, que cuenta dos veces.') +
          eq(`x = \\frac{-k}{2\\cdot ${d.a}}: \\quad k = ${k} \\Rightarrow x = ${-Math.abs(d.s)}, \\qquad k = -${k} \\Rightarrow x = ${Math.abs(d.s)}`) +
          comp(`${m(`${d.a === 1 ? '' : d.a}x^2 + ${k}x + ${c} = ${d.a === 1 ? '' : d.a}(x + ${Math.abs(d.s)})^2`)}.`);
        return { resultado: m(`k = ${k},\\; x = ${-Math.abs(d.s)} \\quad\\text{o}\\quad k = -${k},\\; x = ${Math.abs(d.s)}`), pasos, val: { k } };
      },
    },
  ];

  const ruffiniP = [
    {
      id: 'factorizar', titulo: 'Factorizar un polinomio de grado 3', peso: 2,
      datos(r) { const rs = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)]; if (rs.includes(0) || new Set(rs).size < 3 || Math.abs(rs[0] * rs[1] * rs[2]) > 60) return null; return { rs: rs.sort((a, b) => a - b) }; },
      coef: d => { const [a, b, c] = d.rs; return [1, -(a + b + c), a * b + b * c + a * c, -a * b * c]; },
      enunciado(d) { return `Factoriza el polinomio ${m('P(x) = ' + poli(this.coef(d)))} y halla sus raíces.`; },
      solucion(d) {
        const cs = this.coef(d), t = cs[3], r1 = d.rs.find(x => true), R = ruffini(cs, r1), [b, c] = [R.cociente[1], R.cociente[2]];
        const otras = d.rs.filter(x => x !== r1);
        const pasos = met('Las raíces enteras de un polinomio con coeficiente principal 1 son divisores del término independiente. Se prueban con el teorema del resto y se divide por Ruffini.') +
          P(`Divisores de ${t}: ±1, ±${[...new Set(Array.from({ length: Math.abs(t) }, (_, i) => i + 1).filter(i => t % i === 0))].slice(1).join(', ±')}.`) +
          eq(`P(${r1}) = ${tq(evalP(cs, r1))} \\;\\Rightarrow\\; x - ${sg(r1)} \\text{ es un factor}`) +
          por('P(a) = 0', 'Por el teorema del resto, el resto de dividir P(x) entre (x − a) es P(a). Si vale 0, la división es exacta.') +
          R.html +
          eq(`P(x) = (x ${r1 < 0 ? '+' : '-'} ${Math.abs(r1)})(${poli(R.cociente)})`) +
          P('El cociente es de segundo grado: se resuelve con la fórmula.') +
          eq(`x = \\frac{${-val(b)} \\pm \\sqrt{${sg(val(b))}^2 - 4\\cdot ${sg(val(c))}}}{2} = \\frac{${-val(b)} \\pm ${Math.abs(otras[0] - otras[1])}}{2} \\;\\Rightarrow\\; x = ${otras[0]},\\; x = ${otras[1]}`) +
          eq(`P(x) = ${d.rs.map(x => `(x ${x < 0 ? '+' : '-'} ${Math.abs(x)})`).join('')}`) +
          comp(`el producto de las raíces con su signo cambiado da el término independiente: ${d.rs.map(x => sg(-x)).join('·')} = ${t}.`);
        return { resultado: `${m(d.rs.map(x => `(x ${x < 0 ? '+' : '-'} ${Math.abs(x)})`).join(''))} · raíces ${m(d.rs.join(',\\;'))}`, pasos, val: { rs: d.rs } };
      },
    },
    {
      id: 'cociente', titulo: 'Cociente y resto con Ruffini',
      datos(r) { const g = r.int(3, 4), cs = Array.from({ length: g + 1 }, (_, i) => i === 0 ? r.int(1, 3) : r.int(-6, 6)), a = r.pick([-3, -2, -1, 1, 2, 3]); if (cs[g] === 0) return null; return { cs, a }; },
      enunciado: d => `Divide ${m('P(x) = ' + poli(d.cs))} entre ${m(`x ${d.a < 0 ? '+' : '-'} ${Math.abs(d.a)}`)} por Ruffini. Escribe el cociente y el resto, y comprueba el resto con el teorema del resto.`,
      solucion(d) {
        const R = ruffini(d.cs, d.a), vr = evalP(d.cs, d.a);
        const pasos = met(`Se ponen los coeficientes ordenados (con 0 si falta algún grado) y a la izquierda el número a = ${d.a}, porque se divide entre x − a.`) +
          por(`a = ${d.a}`, `x ${d.a < 0 ? '+' : '−'} ${Math.abs(d.a)} = x − (${d.a}). El número de Ruffini es el que anula el divisor.`) +
          R.html +
          eq(`C(x) = ${poli(R.cociente)}, \\qquad R = ${tq(R.resto)}`) +
          sub('Comprobación con el teorema del resto') +
          eq(`P(${d.a}) = ${tq(vr)}`) +
          por('coincide', 'El resto de dividir entre (x − a) es siempre P(a). Si no coincide, hay un error en la tabla.');
        return { resultado: `${m('C(x) = ' + poli(R.cociente))} · ${m('R = ' + tq(R.resto))}`, pasos, val: { resto: val(R.resto) } };
      },
    },
  ];

  const resto = [
    {
      id: 'dos-factores', titulo: 'Divisible por dos factores (tipo D33·1)', peso: 2,
      datos(r) { const p = r.int(-3, 3), q = r.int(-3, 3), s = r.int(-4, 4); if (!p || !q || !s || p === q) return null; return { p, q, s }; },
      enunciado(d) { const c = -d.p * d.q * d.s; return `El polinomio ${m(`P(x) = x^3 + ax^2 + bx ${c < 0 ? '-' : '+'} ${Math.abs(c)}`)} es divisible por ${m(`x ${d.p < 0 ? '+' : '-'} ${Math.abs(d.p)}`)} y por ${m(`x ${d.q < 0 ? '+' : '-'} ${Math.abs(d.q)}`)}. Halla a y b.`; },
      solucion(d) {
        const { p, q, s } = d, c = -p * q * s, a = -(p + q + s), b = p * q + q * s + p * s;
        const e1 = [p * p, p, -(p ** 3) - c], e2 = [q * q, q, -(q ** 3) - c];
        const fila = ([A, B, Cc]) => `${A}a ${B < 0 ? '-' : '+'} ${Math.abs(B) === 1 ? '' : Math.abs(B)}b = ${Cc}`;
        const pasos = met('«Divisible por x − p» significa que el resto es 0, y por el teorema del resto P(p) = 0. Cada factor da una ecuación; con dos se resuelve el sistema.') +
          eq(`P(${p}) = ${sg(p)}^3 + a\\cdot ${sg(p)}^2 + b\\cdot ${sg(p)} ${c < 0 ? '-' : '+'} ${Math.abs(c)} = 0 \\;\\Rightarrow\\; ${fila(e1)}`) +
          eq(`P(${q}) = ${sg(q)}^3 + a\\cdot ${sg(q)}^2 + b\\cdot ${sg(q)} ${c < 0 ? '-' : '+'} ${Math.abs(c)} = 0 \\;\\Rightarrow\\; ${fila(e2)}`) +
          por('P(p) = 0', 'El resto de dividir entre (x − p) es P(p); si es divisible, el resto es cero.') +
          P('Resolviendo el sistema (por reducción o sustitución):') +
          eq(`a = ${a}, \\qquad b = ${b}`) +
          comp(`${m(`P(x) = ${poli([1, a, b, c])} = (x ${p < 0 ? '+' : '-'} ${Math.abs(p)})(x ${q < 0 ? '+' : '-'} ${Math.abs(q)})(x ${s < 0 ? '+' : '-'} ${Math.abs(s)})`)}.`);
        return { resultado: m(`a = ${a},\\; b = ${b}`), pasos, val: { a, b } };
      },
    },
    {
      id: 'resto-y-factor', titulo: 'Un resto y un factor (tipo D33·2)', peso: 2,
      datos(r) { const al = r.int(-3, 3), be = r.int(-4, 4), p = r.int(-6, 6), q = r.int(-20, 20), mm = r.pick([-2, -1, 1, 2]), n = r.pick([1, 2, 3]); if (mm * mm === n * n) return null; return { al, be, p, q, mm, n }; },
      f: (d, x) => x ** 4 + d.al * x ** 3 + d.p * x * x + d.be * x + d.q,
      enunciado(d) { const R = this.f(d, d.mm); return `Al dividir ${m(`f(x) = x^4 ${d.al ? (d.al < 0 ? '-' : '+') + ' ' + (Math.abs(d.al) === 1 ? '' : Math.abs(d.al)) + 'x^3' : ''} + px^2 ${d.be ? (d.be < 0 ? '-' : '+') + ' ' + (Math.abs(d.be) === 1 ? '' : Math.abs(d.be)) + 'x' : ''} + q`)} entre ${m(`x ${d.mm < 0 ? '+' : '-'} ${Math.abs(d.mm)}`)} el resto es ${m(R)}, y ${m(`x + ${d.n}`)} es un factor de f(x). Halla p y q.`; },
      solucion(d) {
        const R = this.f(d, d.mm), m2 = d.mm * d.mm, n2 = d.n * d.n;
        const k1 = R - (d.mm ** 4 + d.al * d.mm ** 3 + d.be * d.mm), k2 = -((-d.n) ** 4 + d.al * (-d.n) ** 3 + d.be * (-d.n));
        const pasos = met('Teorema del resto dos veces: el resto entre (x − a) es f(a), y si (x − b) es un factor, f(b) = 0. Salen dos ecuaciones lineales en p y q.') +
          eq(`f(${d.mm}) = ${R} \\;\\Rightarrow\\; ${m2}p + q = ${k1}`) +
          eq(`f(${-d.n}) = 0 \\;\\Rightarrow\\; ${n2}p + q = ${k2}`) +
          por('x + ' + d.n + ' da f(−' + d.n + ')', `x + ${d.n} = x − (−${d.n}): el número que anula el factor es −${d.n}.`) +
          P('Restando las dos ecuaciones se va q:') +
          eq(`${m2 - n2}p = ${k1 - k2} \\;\\Rightarrow\\; p = ${d.p}, \\qquad q = ${k1} - ${sg(m2 * d.p)} = ${d.q}`) +
          comp(`f(${-d.n}) = ${this.f(d, -d.n)} y f(${d.mm}) = ${R}.`);
        return { resultado: m(`p = ${d.p},\\; q = ${d.q}`), pasos, val: { p: d.p, q: d.q } };
      },
    },
    {
      id: 'resto-veces', titulo: 'Un resto es k veces otro (tipo D33·3)', peso: 2,
      datos(r) {
        const k = r.int(-5, 5), u = r.pick([-2, -1, 1, 2]), v = r.pick([-2, -1, 1, 2]), be = r.int(-8, 8), t = r.pick([2, 3, -1, -2]);
        if (u === v || u * u - t * v * v === 0) return null;
        const num = t * (v ** 3 + k * v * v + be * v) - (u ** 3 + k * u * u + be * u);
        if (num % (1 - t)) return null; const g = num / (1 - t); if (Math.abs(g) > 15 || g === 0) return null;
        return { k, u, v, be, t, g };
      },
      enunciado: d => `Cuando ${m(`q(x) = x^3 + kx^2 ${d.be < 0 ? '-' : '+'} ${Math.abs(d.be)}x ${d.g < 0 ? '-' : '+'} ${Math.abs(d.g)}`)} se divide entre ${m(`x ${d.u < 0 ? '+' : '-'} ${Math.abs(d.u)}`)}, el resto es ${d.t === -1 ? 'el opuesto del' : d.t < 0 ? `${-d.t} veces el opuesto del` : `${d.t} veces el`} resto que se obtiene al dividir entre ${m(`x ${d.v < 0 ? '+' : '-'} ${Math.abs(d.v)}`)}. Halla k.`,
      solucion(d) {
        const qx = x => x ** 3 + d.k * x * x + d.be * x + d.g;
        const A0 = d.u ** 3 + d.be * d.u + d.g, B0 = d.v ** 3 + d.be * d.v + d.g;
        const pasos = met('Cada resto se calcula con el teorema del resto: q(a) para el divisor x − a. Se plantea la relación entre los dos restos y se despeja k.') +
          eq(`q(${d.u}) = ${d.u * d.u}k ${A0 < 0 ? '-' : '+'} ${Math.abs(A0)}, \\qquad q(${d.v}) = ${d.v * d.v}k ${B0 < 0 ? '-' : '+'} ${Math.abs(B0)}`) +
          eq(`${d.u * d.u}k ${A0 < 0 ? '-' : '+'} ${Math.abs(A0)} = ${sg(d.t)}\\left(${d.v * d.v}k ${B0 < 0 ? '-' : '+'} ${Math.abs(B0)}\\right)`) +
          por('se multiplica el segundo', `El enunciado dice que el primer resto es ${d.t} veces el segundo: primer resto = ${d.t}·(segundo resto).`) +
          eq(`${d.u * d.u - d.t * d.v * d.v}k = ${d.t * B0 - A0} \\;\\Rightarrow\\; k = ${d.k}`) +
          comp(`q(${d.u}) = ${qx(d.u)} y q(${d.v}) = ${qx(d.v)}; ${qx(d.u)} = ${sg(d.t)}·${sg(qx(d.v))}.`);
        return { resultado: m(`k = ${d.k}`), pasos, val: { k: d.k } };
      },
    },
  ];

  // ================================================================ 1 · Sucesiones, series y progresiones
  const sumatorios = [
    {
      id: 'sigma', titulo: 'Calcular un sumatorio',
      datos(r) { const a = r.int(1, 6) * r.pick([1, 1, -1]), b = r.int(-9, 9), i0 = r.int(1, 5), n = r.int(15, 60); return { a, b, i0, n }; },
      enunciado: d => `Calcula ${m(`\\sum_{r=${d.i0}}^{${d.n}} (${poli([d.a, d.b], 'r')})`)}.`,
      solucion(d) {
        const N = d.n - d.i0 + 1, u1 = d.a * d.i0 + d.b, un = d.a * d.n + d.b, S = N * (u1 + un) / 2;
        const pasos = met('Lo de dentro es lineal en r: los sumandos forman una progresión aritmética de diferencia ' + d.a + '. Basta contar los términos y usar Sₙ = n(primero + último)/2.') +
          eq(`\\text{número de términos} = ${d.n} - ${d.i0} + 1 = ${N}`) +
          por('el +1', `De ${d.i0} a ${d.n} hay ${d.n} − ${d.i0} saltos, pero los términos son uno más (como los postes de una valla).`) +
          eq(`\\text{primero: } ${d.a}\\cdot ${d.i0} ${d.b < 0 ? '-' : '+'} ${Math.abs(d.b)} = ${u1}, \\qquad \\text{último: } ${d.a}\\cdot ${d.n} ${d.b < 0 ? '-' : '+'} ${Math.abs(d.b)} = ${un}`) +
          eq(`S = \\frac{${N}\\,(${u1} + ${sg(un)})}{2} = ${miles(S)}`) +
          comp(`con la calculadora (Σ) sale lo mismo; también ${d.a}·Σr ${d.b < 0 ? '−' : '+'} ${Math.abs(d.b)}·${N} = ${miles(S)}.`);
        return { resultado: m(`${miles(S)}`), pasos, val: { S } };
      },
    },
  ];

  const aritmeticas = [
    {
      id: 'dos-terminos', titulo: 'Progresión aritmética a partir de dos términos',
      datos(r) { const a1 = r.int(-20, 30), dd = r.int(-7, 9), i = r.int(2, 6), j = r.int(8, 15), N = r.int(20, 40); if (!dd) return null; return { a1, d: dd, i, j, N }; },
      enunciado: d => `En una progresión aritmética, ${m(`u_{${d.i}} = ${d.a1 + (d.i - 1) * d.d}`)} y ${m(`u_{${d.j}} = ${d.a1 + (d.j - 1) * d.d}`)}. Halla: a) la diferencia y el primer término; b) el término general; c) la suma de los ${d.N} primeros términos.`,
      solucion(d) {
        const ui = d.a1 + (d.i - 1) * d.d, uj = d.a1 + (d.j - 1) * d.d, uN = d.a1 + (d.N - 1) * d.d, S = d.N * (d.a1 + uN) / 2;
        const pasos = sub('a) Diferencia y primer término') +
          eq(`u_{${d.j}} - u_{${d.i}} = (${d.j} - ${d.i})\\,d \\;\\Rightarrow\\; ${uj} - ${sg(ui)} = ${d.j - d.i}d \\;\\Rightarrow\\; d = ${d.d}`) +
          por(`${d.j - d.i} saltos`, `Para ir del término ${d.i} al ${d.j} se suma d ${d.j - d.i} veces.`) +
          eq(`u_1 = u_{${d.i}} - ${d.i - 1}d = ${ui} - ${sg((d.i - 1) * d.d)} = ${d.a1}`) +
          sub('b) Término general') +
          eq(`u_n = u_1 + (n-1)d = ${d.a1} + (n-1)\\cdot ${sg(d.d)} = ${poli([d.d, d.a1 - d.d], 'n')}`) +
          sub(`c) Suma de ${d.N} términos`) +
          eq(`u_{${d.N}} = ${d.a1} + ${d.N - 1}\\cdot ${sg(d.d)} = ${uN}, \\qquad S_{${d.N}} = \\frac{${d.N}\\,(${d.a1} + ${sg(uN)})}{2} = ${miles(S)}`) +
          comp(`con el término general, u${d.i} = ${ui} y u${d.j} = ${uj}.`);
        return { resultado: res(m(`d = ${d.d}`), m(`u_1 = ${d.a1}`), m(`u_n = ${poli([d.d, d.a1 - d.d], 'n')}`), m(`S_{${d.N}} = ${miles(S)}`)), pasos, val: { d: d.d, a1: d.a1, S } };
      },
    },
    {
      id: 'multiplos', titulo: 'Suma de múltiplos entre dos números',
      datos(r) { const k = r.int(3, 13), A = r.int(10, 200), B = A + r.int(100, 600); if (A % k === 0 || B % k === 0) return null; return { k, A, B }; },
      enunciado: d => `Halla la suma de todos los múltiplos de ${d.k} comprendidos entre ${d.A} y ${d.B}.`,
      solucion(d) {
        const u1 = Math.ceil(d.A / d.k) * d.k, un = Math.floor(d.B / d.k) * d.k, n = (un - u1) / d.k + 1, S = n * (u1 + un) / 2;
        const pasos = met(`Los múltiplos de ${d.k} forman una progresión aritmética de diferencia ${d.k}. Hay que encontrar el primero, el último y cuántos hay.`) +
          eq(`u_1 = ${u1}\\;(${d.k}\\cdot ${u1 / d.k}), \\qquad u_n = ${un}\\;(${d.k}\\cdot ${un / d.k})`) +
          por('estos', `${d.A}/${d.k} = ${(d.A / d.k).toFixed(2).replace('.', ',')}: el primer múltiplo es ${d.k}·${u1 / d.k}. Y ${d.B}/${d.k} = ${(d.B / d.k).toFixed(2).replace('.', ',')}: el último es ${d.k}·${un / d.k}.`) +
          eq(`${un} = ${u1} + (n-1)\\cdot ${d.k} \\;\\Rightarrow\\; n = ${n}`) +
          por('no basta con dividir', `(${un} − ${u1})/${d.k} = ${n - 1} son los saltos; los términos son uno más.`) +
          eq(`S_{${n}} = \\frac{${n}\\,(${u1} + ${un})}{2} = ${miles(S)}`);
        return { resultado: m(`n = ${n},\\; S = ${miles(S)}`), pasos, val: { n, S } };
      },
    },
  ];

  const geometricas = [
    {
      id: 'geo-dos-terminos', titulo: 'Progresión geométrica a partir de dos términos',
      datos(r) { const R = qq(r.pick([2, 3, -2, -3, Q(1, 2), Q(-1, 2), Q(1, 3)])), i = r.int(2, 3), j = i + 3, a1 = r.int(1, 5) * r.pick([1, -1]) * R.q ** (j - 1), n = r.int(5, 8); return Math.abs(a1) > 400 ? null : { R, a1, i, j, n }; },
      enunciado: d => `En una progresión geométrica, ${m(`u_{${d.i}} = ${tq(mul(d.a1, pw(d.R, d.i - 1)))}`)} y ${m(`u_{${d.j}} = ${tq(mul(d.a1, pw(d.R, d.j - 1)))}`)}. Halla la razón, el primer término y la suma de los ${d.n} primeros términos.`,
      solucion(d) {
        const ui = mul(d.a1, pw(d.R, d.i - 1)), uj = mul(d.a1, pw(d.R, d.j - 1)), Sn = div(mul(d.a1, add(1, mul(-1, pw(d.R, d.n)))), add(1, mul(-1, d.R)));
        const pasos = eq(`\\frac{u_{${d.j}}}{u_{${d.i}}} = R^{3} \\;\\Rightarrow\\; R^3 = \\frac{${tq(uj)}}{${tq(ui)}} = ${tq(pw(d.R, 3))} \\;\\Rightarrow\\; R = ${tq(d.R)}`) +
          por('R³', `Del término ${d.i} al ${d.j} se multiplica 3 veces por R. Una raíz cúbica tiene una sola solución real, también si es negativa.`) +
          eq(`u_1 = \\frac{u_{${d.i}}}{R^{${d.i - 1}}} = ${d.a1}`) +
          eq(`S_{${d.n}} = \\frac{u_1\\,(1 - R^{${d.n}})}{1 - R} = \\frac{${d.a1}\\,\\left(1 - ${tqp(d.R)}^{${d.n}}\\right)}{1 - ${tqp(d.R)}} = ${tq(Sn)}`) +
          por('esta fórmula', 'Es la suma de n términos de una geométrica; vale para cualquier R ≠ 1. Con R negativa, cuidado con el signo de Rⁿ.') +
          comp(`sumando los ${d.n} términos uno a uno sale lo mismo (≈ ${val(Sn).toFixed(3).replace('.', ',')}).`);
        return { resultado: res(m(`R = ${tq(d.R)}`), m(`u_1 = ${d.a1}`), m(`S_{${d.n}} = ${tq(Sn)}`)), pasos, val: { R: val(d.R), Sn: val(Sn) } };
      },
    },
    {
      id: 'infinita', titulo: 'Suma infinita de una serie geométrica',
      datos(r) { const R = Q(r.int(1, 4) * r.pick([1, -1]), r.int(2, 5)); if (Math.abs(val(R)) >= 1 || R.q === 1) return null; const a1 = r.int(1, 9) * R.q * R.q; return { R, a1 }; },
      enunciado: d => `Considera la serie ${m(`${d.a1} ${[1, 2, 3].map(k => { const u = mul(d.a1, pw(d.R, k)); return (u.p < 0 ? '- ' : '+ ') + tq(Q(Math.abs(u.p), u.q)); }).join(' ')} + \\cdots`)}. a) Justifica que tiene suma finita. b) Calcula su suma.`,
      solucion(d) {
        const S = div(d.a1, add(1, mul(-1, d.R)));
        const pasos = sub('a) ¿Converge?') +
          eq(`R = \\frac{u_2}{u_1} = ${tq(d.R)}, \\qquad |R| = ${tq(Q(Math.abs(d.R.p), d.R.q))} < 1`) +
          por('|R| < 1', 'Si |R| < 1, Rⁿ se hace cada vez más pequeño y los términos tienden a 0 tan deprisa que la suma no crece sin límite.') +
          sub('b) Suma') +
          eq(`S_\\infty = \\frac{u_1}{1 - R} = \\frac{${d.a1}}{1 - ${tqp(d.R)}} = ${tq(S)}`) +
          comp(`los cuatro primeros términos ya suman ${String(+(d.a1 * (1 - val(d.R) ** 4) / (1 - val(d.R))).toFixed(3)).replace('.', ',')}, cerca de ${String(+val(S).toFixed(3)).replace('.', ',')}.`);
        return { resultado: m(`S_\\infty = ${tq(S)}`), pasos, val: { S: val(S) } };
      },
    },
    {
      id: 'decimal', titulo: 'Decimal periódico como serie',
      datos(r) { const per = r.int(1, 98), ent = r.int(0, 3); if (per % 11 === 0) return null; return { per, ent }; },
      enunciado: d => { const p = String(d.per).padStart(2, '0'); return `Escribe ${m(`${d.ent}{,}\\overline{${p}}`)} = ${d.ent},${p}${p}${p}… como una serie geométrica y halla la fracción irreducible que le corresponde.`; },
      solucion(d) {
        const p = String(d.per).padStart(2, '0'), frac = Q(d.ent * 99 + d.per, 99), u1 = Q(d.per, 100);
        const pasos = eq(`${d.ent}{,}\\overline{${p}} = ${d.ent} + \\frac{${d.per}}{100} + \\frac{${d.per}}{100^2} + \\frac{${d.per}}{100^3} + \\cdots`) +
          por('100', 'Cada bloque de dos cifras está dos posiciones más a la derecha que el anterior: se divide entre 100. Es una geométrica de razón 1/100.') +
          eq(`\\frac{${d.per}}{100} + \\frac{${d.per}}{100^2} + \\cdots = \\frac{u_1}{1 - R} = \\frac{${tq(u1)}}{1 - \\frac{1}{100}} = \\frac{${d.per}}{99}`) +
          eq(`${d.ent}{,}\\overline{${p}} = ${d.ent} + \\frac{${d.per}}{99} = ${tq(frac)}`) +
          comp(`${frac.p}/${frac.q} = ${(val(frac)).toFixed(6).replace('.', ',')}…`);
        return { resultado: m(tq(frac)), pasos, val: { x: val(frac) } };
      },
    },
  ];

  // ================================================================ 2 · Demostraciones
  const concl = (prop, desde) => P(`<strong>Conclusión.</strong> ${prop} es cierta para k = ${desde} (paso base) y, si es cierta para k = n, también lo es para k = n + 1. Por el principio de inducción, es cierta para todo k ≥ ${desde}.`);
  const directa = [
    {
      id: 'consecutivos', titulo: 'Suma de enteros consecutivos',
      datos: r => ({ k: r.pick([3, 5, 7, 9]) }),
      enunciado: d => `Demuestra que la suma de ${d.k} números enteros consecutivos cualesquiera es siempre múltiplo de ${d.k}.`,
      solucion(d) {
        const s = d.k * (d.k - 1) / 2;
        const pasos = met('Demostración directa: se llama n al primero, se escriben los demás con n y se suma, buscando el factor ' + d.k + '.') +
          eq(`n + (n+1) + (n+2) + \\cdots + (n+${d.k - 1}) = ${d.k}n + (1 + 2 + \\cdots + ${d.k - 1}) = ${d.k}n + ${s}`) +
          por(`${s}`, `1 + 2 + ⋯ + ${d.k - 1} = ${d.k - 1}·${d.k}/2 = ${s}.`) +
          eq(`${d.k}n + ${s} = ${d.k}\\,(n + ${s / d.k})`) +
          P(`Como n + ${s / d.k} es entero, la suma es ${d.k} por un entero: es múltiplo de ${d.k}. ∎`) +
          por('no vale con ejemplos', 'Comprobar 1 + 2 + ⋯ no demuestra nada para todos los casos; con n genérico sí.') +
          ojo(`con ${d.k + 1} consecutivos no pasa: 1 + 2 + ⋯ + ${d.k + 1} = ${(d.k + 1) * (d.k + 2) / 2}, que no es múltiplo de ${d.k + 1}.`);
        return { resultado: m(`${d.k}n + ${s} = ${d.k}(n + ${s / d.k})`), pasos, val: { s } };
      },
    },
    {
      id: 'paridad', titulo: 'Paridad de una expresión',
      datos: r => ({ a: r.int(2, 9), b: r.int(1, 9) }),
      enunciado: d => `Demuestra que si n es impar, ${m(`n^2 + ${d.a}n + ${d.b}`)} es ${(1 + d.a + d.b) % 2 ? 'impar' : 'par'}.`,
      solucion(d) {
        const c0 = 1 + d.a + d.b, impar = c0 % 2 === 1;
        const pasos = met('Demostración directa: «n impar» se traduce al álgebra como n = 2m + 1, con m entero. Se sustituye y se saca factor común 2.') +
          eq(`n^2 + ${d.a}n + ${d.b} = (2m+1)^2 + ${d.a}(2m+1) + ${d.b} = 4m^2 + ${4 + 2 * d.a}m + ${c0}`) +
          eq(`= 2\\left(2m^2 + ${2 + d.a}m + ${impar ? (c0 - 1) / 2 : c0 / 2}\\right)${impar ? ' + 1' : ''}`) +
          por(impar ? '«2·entero + 1»' : '«2·entero»', impar ? 'Así se escribe un impar: un par más 1.' : 'Así se escribe un par: 2 por un entero.') +
          P(`Como lo de dentro del paréntesis es entero, la expresión es ${impar ? 'impar' : 'par'}. ∎`) +
          comp(`n = 1: ${1 + d.a + d.b}; n = 3: ${9 + 3 * d.a + d.b}.`);
        return { resultado: impar ? 'Es impar: 2(…) + 1' : 'Es par: 2(…)', pasos, val: { impar } };
      },
    },
  ];

  const contradiccion = [
    {
      id: 'diofantica', titulo: 'Una ecuación sin soluciones enteras',
      datos(r) { const g = r.pick([2, 3, 4, 5, 6]), p = g * r.int(1, 7), q = g * r.int(1, 7), c = r.int(1, 30); if (c % g === 0 || p === q) return null; return { g, p, q, c }; },
      enunciado: d => `Demuestra por contradicción que no existen enteros a y b tales que ${m(`${d.p}a + ${d.q}b = ${d.c}`)}.`,
      solucion(d) {
        const pasos = met('Se supone lo contrario (que sí existen) y se busca un imposible.') +
          P(`Supongamos que existen a, b ∈ ℤ con ${m(`${d.p}a + ${d.q}b = ${d.c}`)}. Sacando factor común ${d.g}:`) +
          eq(`${d.g}\\,(${d.p / d.g === 1 ? '' : d.p / d.g}a + ${d.q / d.g === 1 ? '' : d.q / d.g}b) = ${d.c}`) +
          P(`El lado izquierdo es múltiplo de ${d.g} (${d.g} por un entero), pero ${d.c} no lo es (${d.c} = ${d.g}·${Math.floor(d.c / d.g)} + ${d.c % d.g}). <strong>Contradicción</strong>: no existen tales enteros. ∎`) +
          por(`el ${d.g}`, `Es el máximo común divisor de ${d.p} y ${d.q}: cualquier ${d.p}a + ${d.q}b es múltiplo suyo.`);
        return { resultado: `${m(`${d.g}(\\ldots) = ${d.c}`)}: un múltiplo de ${d.g} no puede valer ${d.c}`, pasos, val: { g: d.g } };
      },
    },
    {
      id: 'irracional', titulo: 'Raíz irracional', peso: 2,
      datos: r => ({ p: r.pick([2, 3, 5, 7, 11, 13]) }),
      enunciado: d => `Demuestra por reducción al absurdo que ${m(`\\sqrt{${d.p}}`)} es irracional.`,
      solucion(d) {
        const pasos = P(`Supongamos que ${m(`\\sqrt{${d.p}} = \\frac{a}{b}`)}, con a, b enteros, b ≠ 0 y la fracción <strong>irreducible</strong>.`) +
          por('irreducible', 'Toda fracción se puede simplificar hasta que numerador y denominador no tengan factores comunes; suponerlo no quita generalidad.') +
          eq(`${d.p} = \\frac{a^2}{b^2} \\;\\Rightarrow\\; a^2 = ${d.p}b^2`) +
          P(`Así ${d.p} divide a a², y como ${d.p} es primo, ${d.p} divide a a: ${m(`a = ${d.p}c`)}.`) +
          por(`${d.p} divide a a`, `Si un primo divide a un producto a·a, divide a alguno de los factores.`) +
          eq(`${d.p * d.p}c^2 = ${d.p}b^2 \\;\\Rightarrow\\; b^2 = ${d.p}c^2`) +
          P(`Luego ${d.p} también divide a b. Entonces a y b tienen el factor común ${d.p}: <strong>contradicción</strong> con que la fracción era irreducible. ${m(`\\sqrt{${d.p}}`)} es irracional. ∎`);
        return { resultado: `Si ${m(`\\sqrt{${d.p}} = a/b`)} irreducible, ${d.p} divide a a y a b: contradicción`, pasos, val: { p: d.p } };
      },
    },
  ];

  const induccion = [
    {
      id: 'ind-suma', titulo: 'Inducción: una suma', peso: 3,
      datos: r => ({ c: r.int(1, 5) }),
      enunciado: d => `<p>Demuestra por inducción que, para todo ${m('k \\in \\mathbb{Z}^+')},</p>${eq(`1\\cdot ${1 + d.c} + 2\\cdot ${2 + d.c} + 3\\cdot ${3 + d.c} + \\cdots + k(k+${d.c}) = \\frac{k(k+1)(2k+${1 + 3 * d.c})}{6}`)}`,
      solucion(d) {
        const c = d.c, A = 2 + c, B = 7 + 3 * c, Cc = 6 + 6 * c;
        const pasos = sub('Paso base (k = 1)') +
          eq(`\\text{Izq.} = 1\\cdot ${1 + c} = ${1 + c}, \\qquad \\text{Der.} = \\frac{1\\cdot 2\\cdot ${3 + 3 * c}}{6} = ${1 + c}`) +
          sub('Hipótesis: cierto para k = n') +
          eq(`1\\cdot ${1 + c} + \\cdots + n(n+${c}) = \\frac{n(n+1)(2n+${1 + 3 * c})}{6}`) +
          sub('Paso: probar para k = n + 1') +
          P('Objetivo (sustituyendo k por n + 1 en la fórmula):') +
          eq(`1\\cdot ${1 + c} + \\cdots + n(n+${c}) + (n+1)(n+${1 + c}) = \\frac{(n+1)(n+2)(2n+${3 + 3 * c})}{6}`) +
          P('Se parte del lado izquierdo y se usa la hipótesis en los n primeros sumandos:') +
          eq(`\\frac{n(n+1)(2n+${1 + 3 * c})}{6} + (n+1)(n+${1 + c}) = \\frac{(n+1)\\left[n(2n+${1 + 3 * c}) + 6(n+${1 + c})\\right]}{6}`) +
          por('se saca (n + 1)', 'Porque está en los dos sumandos y aparece en el objetivo. Desarrollar todo y volver a factorizar es mucho más largo.') +
          eq(`= \\frac{(n+1)(2n^2 + ${B}n + ${Cc})}{6} = \\frac{(n+1)(n+2)(2n+${3 + 3 * c})}{6}`) +
          por('se factoriza así', `Ya sabemos qué tiene que salir: (n + 2)(2n + ${3 + 3 * c}) = 2n² + ${B}n + ${Cc}. Basta comprobarlo multiplicando.`) +
          P('Es el objetivo.') + concl('La fórmula', 1);
        return { resultado: `Base: ${1 + c} = ${1 + c}; paso: ${m(`(n+1)(2n^2+${B}n+${Cc})/6 = (n+1)(n+2)(2n+${3 + 3 * c})/6`)}`, pasos, val: { c: d.c } };
      },
    },
    {
      id: 'ind-div-pot', titulo: 'Inducción: divisibilidad con potencias', peso: 3,
      datos(r) { const q = r.int(1, 5), p = q + r.int(2, 6); return { p, q }; },
      enunciado: d => `Demuestra por inducción que ${m(`${d.p}^k - ${d.q === 1 ? 1 : d.q + '^k'}`)} es divisible por ${d.p - d.q} para todo ${m('k \\in \\mathbb{Z}^+')}.`,
      solucion(d) {
        const { p, q } = d, D = p - q, qk = x => q === 1 ? '1' : `${q}^{${x}}`;
        const pasos = sub('Paso base (k = 1)') +
          eq(`${p}^1 - ${q} = ${D}, \\text{ que es divisible por } ${D}`) +
          sub('Hipótesis: cierto para k = n') +
          eq(`${p}^n - ${qk('n')} = ${D}m, \\quad m \\in \\mathbb{Z}`) +
          sub('Paso: probar para k = n + 1') +
          eq(`${p}^{n+1} - ${qk('n+1')} = ${p}\\cdot ${p}^n - ${q === 1 ? '1' : q + '\\cdot ' + qk('n')}`) +
          P(`Se despeja de la hipótesis ${m(`${p}^n = ${D}m + ${qk('n')}`)} y se sustituye:`) +
          eq(`= ${p}\\,(${D}m + ${qk('n')}) - ${q === 1 ? '1' : q + '\\cdot ' + qk('n')} = ${D * p}m + ${D}\\cdot ${qk('n')} = ${D}\\left(${p}m + ${qk('n')}\\right)`) +
          por(`${p}·${qk('n')} − ${q === 1 ? '1' : q + '·' + qk('n')}`, `Es (${p} − ${q})·${q === 1 ? '1' : qk('n')} = ${D}·${q === 1 ? '1' : qk('n')}: justo el factor que buscamos.`) +
          P(`Como ${p}m + ${q === 1 ? '1' : qk('n')} es entero, es múltiplo de ${D}.`) + concl(`La propiedad`, 1);
        return { resultado: `${m(`${p}^{n+1} - ${qk('n+1')} = ${D}(${p}m + ${qk('n')})`)}`, pasos, val: { D } };
      },
    },
    {
      id: 'ind-div-pol', titulo: 'Inducción: divisibilidad de un polinomio', peso: 3,
      datos: r => ({ c: r.pick([2, 5, 8, 11, 14]) }),
      enunciado: d => `Demuestra por inducción que ${m(`k^3 + ${d.c}k`)} es divisible por 3 para todo ${m('k \\in \\mathbb{Z}^+')}.`,
      solucion(d) {
        const c = d.c;
        const pasos = sub('Paso base (k = 1)') + eq(`1 + ${c} = ${1 + c} = 3\\cdot ${(1 + c) / 3}`) +
          sub('Hipótesis: cierto para k = n') + eq(`n^3 + ${c}n = 3m, \\quad m \\in \\mathbb{Z}`) +
          sub('Paso: probar para k = n + 1') +
          eq(`(n+1)^3 + ${c}(n+1) = n^3 + 3n^2 + 3n + 1 + ${c}n + ${c}`) +
          eq(`= (n^3 + ${c}n) + 3n^2 + 3n + ${1 + c} = 3m + 3\\left(n^2 + n + ${(1 + c) / 3}\\right)`) +
          por('se agrupa así', `Se busca dentro la expresión de la hipótesis (n³ + ${c}n), que vale 3m; lo que sobra (3n² + 3n + ${1 + c}) es múltiplo de 3 porque ${1 + c} lo es.`) +
          eq(`= 3\\left(m + n^2 + n + ${(1 + c) / 3}\\right)`) + concl('La propiedad', 1);
        return { resultado: m(`(n+1)^3 + ${c}(n+1) = 3(m + n^2 + n + ${(1 + c) / 3})`), pasos, val: { c } };
      },
    },
    {
      id: 'ind-desigualdad', titulo: 'Inducción: una desigualdad', peso: 3,
      datos(r) { const a = r.pick([2, 3, 4]); let n0 = 1; while (fact(n0) <= a ** n0) n0++; return { a, n0 }; },
      enunciado: d => `Demuestra por inducción que ${m(`k! > ${d.a}^k`)} para todo entero ${m(`k \\geq ${d.n0}`)}.`,
      solucion(d) {
        const { a, n0 } = d;
        const pasos = sub(`Paso base (k = ${n0})`) + eq(`${n0}! = ${miles(fact(n0))} > ${a}^{${n0}} = ${miles(a ** n0)}`) +
          por(`empieza en ${n0}`, `Para k = ${n0 - 1}: ${n0 - 1}! = ${miles(fact(n0 - 1))} y ${a}^${n0 - 1} = ${miles(a ** (n0 - 1))}, así que no se cumple. Hay que empezar donde de verdad empieza a ser cierto.`) +
          sub('Hipótesis: cierto para k = n (con n ≥ ' + n0 + ')') + eq(`n! > ${a}^n`) +
          sub('Paso: probar para k = n + 1') +
          eq(`(n+1)! = (n+1)\\cdot n! > (n+1)\\cdot ${a}^n \\geq ${a}\\cdot ${a}^n = ${a}^{n+1}`) +
          por('el primer >', 'Por la hipótesis, n! > ' + a + 'ⁿ, multiplicado por (n + 1), que es positivo.') +
          por(`n + 1 ≥ ${a}`, `Como n ≥ ${n0}, n + 1 ≥ ${n0 + 1} > ${a}.`) +
          concl('La desigualdad', n0);
        return { resultado: `Base k = ${n0}: ${miles(fact(n0))} > ${miles(a ** n0)}; paso: ${m(`(n+1)! > (n+1)${a}^n \\geq ${a}^{n+1}`)}`, pasos, val: { n0 } };
      },
    },
  ];

  const isPrime = n => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  const contraejemplo = [
    {
      id: 'contraejemplo', titulo: 'Encontrar un contraejemplo',
      datos(r) { const tipo = r.pick(['euler', 'pot', 'div', 'cuad']); return { tipo, p: r.pick([11, 17, 41]), a: r.pick([4, 6, 9, 10, 12, 15]) }; },
      afirm: d => ({
        euler: `«${m(`n^2 + n + ${d.p}`)} es primo para todo n ∈ ℕ»`,
        pot: '«Si n es primo, 2ⁿ − 1 también es primo»',
        div: `«Si ${d.a} divide a b·c, entonces ${d.a} divide a b o ${d.a} divide a c»`,
        cuad: '«Si a > b, entonces a² > b²»',
      })[d.tipo],
      enunciado(d) { return `Demuestra que la afirmación ${this.afirm(d)} es falsa.`; },
      solucion(d) {
        let pasos = met('Para probar que una afirmación «para todo» es falsa basta <strong>un</strong> caso que cumpla la hipótesis y no la conclusión. Hay que comprobarlo con números.'), r0;
        if (d.tipo === 'euler') {
          const n = d.p - 1, v = n * n + n + d.p; let n1 = 0; while (isPrime(n1 * n1 + n1 + d.p)) n1++;
          pasos += P(`Si n = ${n}, los dos primeros sumandos son n(n + 1) = ${n}·${d.p}:`) + eq(`${n}^2 + ${n} + ${d.p} = ${n}\\cdot ${d.p} + ${d.p} = ${d.p}\\cdot ${d.p} = ${v}`) +
            P(`${v} = ${d.p}² no es primo: la afirmación es falsa.`) + por(`n = ${n}`, `Se busca un n que haga aparecer ${d.p} en todos los sumandos, para poder sacarlo factor común. Probando valores pequeños se tarda: falla por primera vez en n = ${n1}.`);
          r0 = `n = ${n}: ${v} = ${d.p}·${d.p}`;
        } else if (d.tipo === 'pot') {
          pasos += P('Con n = 2, 3, 5, 7 sale 3, 7, 31, 127, todos primos. Pero con <strong>n = 11</strong>, que es primo:') + eq('2^{11} - 1 = 2047 = 23\\cdot 89') + P('2047 no es primo: la afirmación es falsa.') +
            por('hay que probar tanto', 'Que se cumpla en muchos casos no demuestra nada; aquí el primer fallo está lejos.');
          r0 = 'n = 11: 2047 = 23·89';
        } else if (d.tipo === 'div') {
          const fs = { 4: [2, 2], 6: [2, 3], 9: [3, 3], 10: [2, 5], 12: [4, 3], 15: [3, 5] }[d.a];
          pasos += P(`Con b = ${fs[0]} y c = ${fs[1]}: b·c = ${d.a}, que es divisible por ${d.a}, pero ${d.a} no divide a ${fs[0]} ni a ${fs[1]}.`) +
            por('funciona con primos y no con ' + d.a, `Si ${d.a} fuera primo sí sería cierto. Como ${d.a} = ${fs[0]}·${fs[1]}, sus factores se pueden repartir entre b y c.`);
          r0 = `b = ${fs[0]}, c = ${fs[1]}`;
        } else {
          pasos += P('Con negativos falla: <strong>a = 1, b = −2</strong>. Se cumple a > b (1 > −2), pero a² = 1 y b² = 4, así que a² < b².') + por('negativos', 'Elevar al cuadrado no conserva el orden cuando hay números negativos.');
          r0 = 'a = 1, b = −2';
        }
        return { resultado: `Falsa. Contraejemplo: ${r0}`, pasos, val: { tipo: d.tipo } };
      },
    },
  ];

  // ================================================================ 3 · Técnicas de recuento
  const nCr = (n, r) => `\\binom{${n}}{${r}}`;
  const factorialP = [
    {
      id: 'factoriales', titulo: 'Factoriales y una ecuación con combinatorios',
      datos(r) { const a = r.int(6, 9), b = a - r.int(1, 2), n = r.int(5, 14), mas = r.chance(0.5); return { a, b, n, mas }; },
      enunciado: d => `a) Calcula ${m(`${d.a}! ${d.mas ? '+' : '-'} ${d.b}!`)} sacando factor común. b) Halla n sabiendo que ${m(`${nCr('n', 2)} = ${C(d.n, 2)}`)}.`,
      solucion(d) {
        const k = fact(d.a) / fact(d.b), R = d.mas ? fact(d.a) + fact(d.b) : fact(d.a) - fact(d.b), T = C(d.n, 2);
        const prod = Array.from({ length: d.a - d.b }, (_, i) => d.a - i).join('\\cdot ');
        const pasos = sub('a) Factor común') +
          eq(`${d.a}! ${d.mas ? '+' : '-'} ${d.b}! = ${prod}\\cdot ${d.b}! ${d.mas ? '+' : '-'} ${d.b}! = ${d.b}!\\,(${k} ${d.mas ? '+' : '-'} 1) = ${miles(fact(d.b))}\\cdot ${d.mas ? k + 1 : k - 1} = ${miles(R)}`) +
          por(`no se ${d.mas ? 'suman' : 'restan'} los números`, `${d.a}! ${d.mas ? '+' : '−'} ${d.b}! no es (${d.a} ${d.mas ? '+' : '−'} ${d.b})!. Se escribe el factorial grande «hasta llegar» al pequeño y se saca factor común.`) +
          sub('b) Ecuación') +
          eq(`${nCr('n', 2)} = \\frac{n(n-1)}{2} = ${T} \\;\\Rightarrow\\; n^2 - n - ${2 * T} = 0 \\;\\Rightarrow\\; n = \\frac{1 \\pm ${2 * d.n - 1}}{2}`) +
          P(`n = ${d.n} (la solución negativa, ${1 - d.n}, no vale: n cuenta elementos).`) +
          comp(`C(${d.n}, 2) = ${d.n}·${d.n - 1}/2 = ${T}.`);
        return { resultado: res(m(miles(R)), m(`n = ${d.n}`)), pasos, val: { R, n: d.n } };
      },
    },
  ];
  const ordenP = [
    {
      id: 'club', titulo: 'Permutaciones, variaciones y combinaciones',
      datos: r => ({ n: r.int(8, 25), k: r.int(3, 5), s: r.int(4, 6) }),
      enunciado: d => `En un club hay ${d.n} socios. a) ¿De cuántas formas se pueden elegir presidente, secretario y tesorero? b) ¿Cuántas comisiones de ${d.k} socios se pueden formar? c) ¿De cuántas formas se pueden sentar ${d.s} socios concretos en una fila de ${d.s} sillas?`,
      solucion(d) {
        const a = V(d.n, 3), b = C(d.n, d.k), c = fact(d.s);
        const pasos = met('Para cada apartado: ¿importa el orden?, ¿entran todos?, ¿se repite?') +
          sub('a) Cargos') + eq(`V_{${d.n},3} = ${d.n}\\cdot ${d.n - 1}\\cdot ${d.n - 2} = ${miles(a)}`) +
          por('variaciones', 'Importa el orden: no es lo mismo ser presidente que tesorero. Y una persona no puede tener dos cargos.') +
          sub('b) Comisiones') + eq(`${nCr(d.n, d.k)} = \\frac{${Array.from({ length: d.k }, (_, i) => d.n - i).join('\\cdot ')}}{${d.k}!} = ${miles(b)}`) +
          por('combinaciones', 'En una comisión no hay cargos: el mismo grupo en otro orden es la misma comisión. Por eso se divide entre ' + d.k + '!.') +
          sub('c) Sentarse') + eq(`P_{${d.s}} = ${d.s}! = ${c}`) + por('permutaciones', 'Entran todos y el orden importa.');
        return { resultado: res(m(miles(a)), m(miles(b)), m(miles(c))), pasos, val: { a, b, c } };
      },
    },
  ];
  const PAL = ['BANANA', 'PAPAYA', 'MISSISSIPPI', 'ALABAMA', 'CARRERA', 'COCODRILO', 'TOMATE', 'PATATA', 'ARRASTRAR', 'TERREMOTO', 'BARBACOA', 'CALCULADORA'];
  const repeticionP = [
    {
      id: 'anagramas', titulo: 'Anagramas con letras repetidas',
      datos: r => ({ w: r.pick(PAL) }),
      enunciado: d => `a) ¿Cuántas palabras distintas (con o sin sentido) se pueden formar con todas las letras de <strong>${d.w}</strong>? b) ¿Cuántas de ellas empiezan por ${d.w[0]}?`,
      solucion(d) {
        const cnt = {}; for (const ch of d.w) cnt[ch] = (cnt[ch] || 0) + 1;
        const rep = Object.entries(cnt).filter(([, v]) => v > 1), n = d.w.length;
        const den = rep.reduce((s, [, v]) => s * fact(v), 1), A = fact(n) / den;
        const cnt2 = Object.assign({}, cnt); cnt2[d.w[0]]--; const rep2 = Object.entries(cnt2).filter(([, v]) => v > 1), den2 = rep2.reduce((s, [, v]) => s * fact(v), 1), B = fact(n - 1) / den2;
        const dtex = rs => rs.map(([, v]) => v + '!').join('\\cdot ') || '1';
        const pasos = met('Se ordenan todas las letras, pero las iguales no se distinguen: permutaciones con repetición, n!/(a!·b!·…).') +
          P(`Letras: ${Object.entries(cnt).map(([k, v]) => `${k} (${v})`).join(', ')}; en total ${n}.`) +
          sub('a) Todas') + eq(`\\frac{${n}!}{${dtex(rep)}} = \\frac{${miles(fact(n))}}{${den}} = ${miles(A)}`) +
          por('se divide', 'Al intercambiar entre sí letras iguales la palabra no cambia: cada palabra estaría contada tantas veces como formas de ordenar las repetidas.') +
          sub(`b) Empiezan por ${d.w[0]}`) + P(`Se fija ${d.w[0]} en la primera posición y se ordenan las ${n - 1} restantes (con una ${d.w[0]} menos):`) +
          eq(`\\frac{${n - 1}!}{${dtex(rep2)}} = ${miles(B)}`);
        return { resultado: res(m(miles(A)), m(miles(B))), pasos, val: { A, B } };
      },
    },
    {
      id: 'codigos', titulo: 'Códigos con y sin repetición',
      datos: r => ({ L: r.int(2, 4), D: r.int(2, 4) }),
      enunciado: d => `Un código está formado por ${d.L} letras (de un alfabeto de 26) seguidas de ${d.D} cifras (del 0 al 9). ¿Cuántos códigos hay a) si se pueden repetir letras y cifras? b) si no se puede repetir ninguna?`,
      solucion(d) {
        const a = 26 ** d.L * 10 ** d.D, b = V(26, d.L) * V(10, d.D);
        const pasos = met('Primero se eligen las letras y después las cifras: por el principio de multiplicación, se multiplican las dos cuentas. Importa el orden (AB12 no es BA21).') +
          sub('a) Con repetición') + eq(`VR_{26,${d.L}}\\cdot VR_{10,${d.D}} = 26^{${d.L}}\\cdot 10^{${d.D}} = ${miles(a)}`) +
          por('potencias', 'Cada posición se puede llenar con cualquiera de los símbolos, aunque ya haya salido.') +
          sub('b) Sin repetición') + eq(`V_{26,${d.L}}\\cdot V_{10,${d.D}} = (${Array.from({ length: d.L }, (_, i) => 26 - i).join('\\cdot ')})(${Array.from({ length: d.D }, (_, i) => 10 - i).join('\\cdot ')}) = ${miles(b)}`) +
          por('bajan', 'Cada símbolo usado ya no se puede volver a usar: una opción menos en cada posición.');
        return { resultado: res(m(miles(a)), m(miles(b))), pasos, val: { a, b } };
      },
    },
  ];
  const condicionesP = [
    {
      id: 'comite', titulo: 'Grupos con condiciones (tipo D35·13)', peso: 2,
      datos(r) { const h = r.int(4, 9), mu = r.int(4, 9), k = r.int(3, 5), i = r.int(1, k - 1); if (i > h || k - i > mu || k > h) return null; return { h, mu, k, i }; },
      enunciado: d => `De un grupo de ${d.h} hombres y ${d.mu} mujeres se eligen ${d.k} personas. a) ¿Cuántos grupos distintos hay? b) ¿Cuántos tienen exactamente ${d.i} ${d.i === 1 ? 'hombre' : 'hombres'} y ${d.k - d.i} ${d.k - d.i === 1 ? 'mujer' : 'mujeres'}? c) ¿Cuántos tienen al menos una mujer?`,
      solucion(d) {
        const T = C(d.h + d.mu, d.k), B = C(d.h, d.i) * C(d.mu, d.k - d.i), sinM = C(d.h, d.k), Cc = T - sinM;
        const pasos = met('En un grupo no importa el orden: combinaciones. Si se eligen dos cosas a la vez («y»), se multiplica.') +
          sub('a) Total') + eq(`${nCr(d.h + d.mu, d.k)} = ${miles(T)}`) +
          sub('b) Exactamente') + eq(`${nCr(d.h, d.i)}\\cdot ${nCr(d.mu, d.k - d.i)} = ${C(d.h, d.i)}\\cdot ${C(d.mu, d.k - d.i)} = ${miles(B)}`) +
          por('se multiplica', 'Por cada elección de los hombres hay todas las elecciones posibles de las mujeres.') +
          sub('c) Al menos una mujer') + eq(`${nCr(d.h + d.mu, d.k)} - ${nCr(d.h, d.k)} = ${miles(T)} - ${sinM} = ${miles(Cc)}`) +
          por('el contrario', '«Al menos una» son muchos casos; «ninguna mujer» (todos hombres) es uno solo. Total menos ninguna.') +
          comp(`sumando caso a caso (1, 2, … mujeres): ${Array.from({ length: d.k }, (_, j) => C(d.mu, j + 1) * C(d.h, d.k - j - 1)).join(' + ')} = ${miles(Cc)}.`);
        return { resultado: res(m(miles(T)), m(miles(B)), m(miles(Cc))), pasos, val: { T, B, Cc } };
      },
    },
    {
      id: 'reparto', titulo: 'Repartir objetos distintos (tipo D35·12)', peso: 2,
      datos(r) { const a = r.int(2, 4), b = r.int(1, 3), c = r.int(1, 3); return { a, b, c }; },
      enunciado: d => `¿De cuántas maneras se pueden repartir ${d.a + d.b + d.c} libros distintos entre tres amigos, Ana, Bea y Carlos, si Ana recibe ${d.a}, Bea ${d.b} y Carlos ${d.c}?`,
      solucion(d) {
        const n = d.a + d.b + d.c, x = C(n, d.a), y = C(n - d.a, d.b), R = x * y;
        const pasos = met('Por turnos: Ana elige su lote, después Bea entre los que quedan y Carlos se lleva el resto. Dentro de cada lote no importa el orden.') +
          eq(`${nCr(n, d.a)}\\cdot ${nCr(n - d.a, d.b)}\\cdot ${nCr(d.c, d.c)} = ${x}\\cdot ${y}\\cdot 1 = ${miles(R)}`) +
          por('se multiplica', 'Las tres elecciones se hacen una detrás de otra.') +
          comp(`también es una permutación con repetición: ${n}!/(${d.a}!·${d.b}!·${d.c}!) = ${miles(fact(n) / (fact(d.a) * fact(d.b) * fact(d.c)))}.`);
        return { resultado: m(miles(R)), pasos, val: { R } };
      },
    },
    {
      id: 'fila', titulo: 'Juntos y separados en una fila',
      datos: r => ({ n: r.int(5, 8) }),
      enunciado: d => `${d.n} amigos, entre ellos Ana y Berta, se colocan en fila para una foto. ¿De cuántas maneras pueden colocarse a) si Ana y Berta van juntas? b) si no pueden ir juntas?`,
      solucion(d) {
        const J = 2 * fact(d.n - 1), T = fact(d.n), S = T - J;
        const pasos = sub('a) Juntas') + P(`Ana y Berta forman un bloque: se ordenan ${d.n - 1} piezas, y dentro del bloque hay 2 órdenes.`) +
          eq(`2\\cdot ${d.n - 1}! = ${miles(J)}`) + por('el 2', 'Ana-Berta y Berta-Ana son fotos distintas.') +
          sub('b) Separadas') + eq(`${d.n}! - 2\\cdot ${d.n - 1}! = ${miles(T)} - ${miles(J)} = ${miles(S)}`) +
          por('el contrario', 'Es más fácil contar todas las filas y quitar aquellas en las que van juntas.');
        return { resultado: res(m(miles(J)), m(miles(S))), pasos, val: { J, S } };
      },
    },
    {
      id: 'pares', titulo: 'Números con condiciones',
      datos: r => ({ mx: r.int(5, 9), k: r.int(3, 4) }),
      enunciado: d => `¿Cuántos números de ${d.k} cifras distintas se pueden formar con los dígitos del 1 al ${d.mx} que sean pares?`,
      solucion(d) {
        const E = Math.floor(d.mx / 2), R = E * V(d.mx - 1, d.k - 1);
        const pasos = met('Se empieza por la condición: para ser par, la última cifra tiene que ser par.') +
          eq(`\\text{última cifra: } ${Array.from({ length: E }, (_, i) => 2 * i + 2).join(', ')} \\;\\Rightarrow\\; ${E} \\text{ opciones}`) +
          P(`Fijada la última, quedan ${d.mx - 1} dígitos para las otras ${d.k - 1} posiciones, con orden y sin repetir:`) +
          eq(`${E}\\cdot V_{${d.mx - 1},${d.k - 1}} = ${E}\\cdot ${Array.from({ length: d.k - 1 }, (_, i) => d.mx - 1 - i).join('\\cdot ')} = ${miles(R)}`) +
          por('se empieza por la condición', 'Si se llenara primero desde la izquierda, el número de cifras pares que quedan para el final dependería de lo elegido antes.');
        return { resultado: m(miles(R)), pasos, val: { R } };
      },
    },
  ];

  // ================================================================ 4 · Binomio de Newton
  // término a·x^e en TeX (para enunciados)
  const mon = (c, e) => { c = qq(c); const ab = Q(Math.abs(c.p), c.q), uno = ab.p === 1 && ab.q === 1 && e !== 0;
    const x = e === 0 ? '' : e === 1 ? 'x' : e === -1 ? '' : `x^{${e}}`;
    if (e < 0) return (c.p < 0 ? '-' : '') + `\\frac{${ab.q === 1 ? ab.p : ab.p}}{${ab.q === 1 ? '' : ab.q}${e === -1 ? 'x' : `x^{${-e}}`}}`;
    return (c.p < 0 ? '-' : '') + (uno ? '' : tq(ab)) + x; };
  const bin = (a, ea, b, eb) => { const B = mon(b, eb); return `\\left(${mon(a, ea)} ${B.startsWith('-') ? '- ' + B.slice(1) : '+ ' + B}\\right)`; };
  const pascalP = [
    {
      id: 'igual-coef', titulo: 'Igualar dos coeficientes (tipo D36·15)', peso: 2,
      datos: r => ({ k: r.pick([5, 7, 9, 11, 13, 15, 17, 19, 21]) }),
      enunciado: d => `Halla el entero positivo n para el que los coeficientes de x² en los desarrollos de ${m('(1 + x)^{2n}')} y ${m(`(1 + ${d.k}x^2)^{n}`)} son iguales.`,
      solucion(d) {
        const n = (d.k + 1) / 2;
        const pasos = met('Se escribe el coeficiente de x² de cada desarrollo en función de n y se igualan.') +
          eq(`(1+x)^{2n}: \\; ${nCr('2n', 2)} = \\frac{2n(2n-1)}{2} = n(2n-1)`) +
          eq(`(1+${d.k}x^2)^{n}: \\; ${nCr('n', 1)}\\cdot ${d.k} = ${d.k}n`) +
          por('r = 1 en el segundo', `En (1 + ${d.k}x²)ⁿ cada término lleva (x²)ʳ: x² aparece con r = 1.`) +
          eq(`n(2n-1) = ${d.k}n \\;\\Rightarrow\\; 2n - 1 = ${d.k} \\;\\Rightarrow\\; n = ${n}`) +
          por('se divide entre n', 'Se puede porque n es positivo (n = 0 también es solución de la ecuación, pero no es positivo).') +
          comp(`C(${2 * n}, 2) = ${C(2 * n, 2)} y ${d.k}·${n} = ${d.k * n}.`);
        return { resultado: m(`n = ${n}`), pasos, val: { n } };
      },
    },
    {
      id: 'combinatorios', titulo: 'Ecuación con números combinatorios',
      datos: r => ({ a: r.int(2, 9) }),
      enunciado: d => `Halla n tal que ${m(`${nCr('n', 3)} = ${d.a}\\,${nCr('n', 2)}`)}, con n ≥ 3.`,
      solucion(d) {
        const n = 3 * d.a + 2;
        const pasos = eq(`\\frac{n(n-1)(n-2)}{6} = ${d.a}\\cdot \\frac{n(n-1)}{2}`) +
          por('la forma simplificada', 'C(n, r) = n(n − 1)···(r factores)/r!. Así salen polinomios en n.') +
          P('Como n ≥ 3, n(n − 1) ≠ 0 y se puede simplificar:') +
          eq(`\\frac{n-2}{6} = \\frac{${d.a}}{2} \\;\\Rightarrow\\; n - 2 = ${3 * d.a} \\;\\Rightarrow\\; n = ${n}`) +
          comp(`C(${n}, 3) = ${C(n, 3)} = ${d.a}·${C(n, 2)}.`);
        return { resultado: m(`n = ${n}`), pasos, val: { n } };
      },
    },
  ];

  const desarrolloP = [
    {
      id: 'desarrollar', titulo: 'Desarrollar un binomio',
      datos(r) { const p = r.int(1, 3) * r.pick([1, -1]), q = r.int(1, 4) * r.pick([1, -1]), n = r.int(3, 5); if (p < 0 && q < 0) return null; return { p, q, n }; },
      enunciado: d => `Desarrolla ${m(`${bin(d.p, 1, d.q, 0)}^{${d.n}}`)} y simplifica.`,
      solucion(d) {
        const cs = Array.from({ length: d.n + 1 }, (_, r) => C(d.n, r) * d.p ** (d.n - r) * d.q ** r);
        const fila = Array.from({ length: d.n + 1 }, (_, r) => C(d.n, r));
        const pasos = met(`Coeficientes de la fila ${d.n} del triángulo de Pascal (${fila.join(', ')}); las potencias de ${m(mon(d.p, 1))} bajan de ${d.n} a 0 y las de ${m(String(d.q))} suben de 0 a ${d.n}.`) +
          eq(fila.map((c, r) => `${c === 1 ? '' : c + '\\,'}${d.n - r ? `(${mon(d.p, 1)})^{${d.n - r}}` : ''}${r ? `(${d.q})^{${r}}` : ''}`).join(' + ')) +
          por('paréntesis', `Se eleva el término entero, con su coeficiente y su signo: (${d.p}x)ᵏ = ${d.p}ᵏxᵏ${d.q < 0 || d.p < 0 ? ', y una base negativa da signos alternos' : ''}.`) +
          eq(poli(cs)) +
          comp(`con x = 1 tiene que salir (${d.p} + ${sg(d.q)})^${d.n} = ${(d.p + d.q) ** d.n}, y ${cs.join(' + ').replace(/\+ -/g, '− ')} = ${cs.reduce((a, b) => a + b, 0)}.`);
        return { resultado: m(poli(cs)), pasos, val: { cs } };
      },
    },
    {
      id: 'aproximar', titulo: 'Desarrollo y valor exacto (tipo D34·9)', peso: 2,
      datos: r => ({ a: r.int(1, 3), n: r.int(4, 5), h: r.pick([1, 2]) }),
      enunciado: d => `a) Escribe y simplifica el desarrollo de ${m(`(${d.a} + x)^{${d.n}}`)} en potencias crecientes de x. b) A partir de lo anterior, halla el valor exacto de ${m(`${dec(d.a + d.h / 10)}^{${d.n}}`)}.`,
      solucion(d) {
        const cs = Array.from({ length: d.n + 1 }, (_, r) => C(d.n, r) * d.a ** (d.n - r));
        const x = d.h / 10, ts = cs.map((c, r) => c * d.h ** r / 10 ** r), V0 = cs.reduce((s, c, r) => s + c * d.h ** r * 10 ** (d.n - r), 0);
        const exacto = (V0 / 10 ** d.n).toFixed(d.n).replace(/0+$/, '').replace('.', '{,}');
        const pasos = sub('a) Desarrollo') + eq(`(${d.a} + x)^{${d.n}} = ${terminos(cs.map((c, r) => [c, r === 0 ? '' : r === 1 ? 'x' : `x^{${r}}`]))}`) +
          por('potencias crecientes', 'Se empieza por el término sin x y se termina con xⁿ.') +
          sub('b) Valor exacto') + P(`${dec(d.a + x)} = ${d.a} + ${dec(x)}: se sustituye x = ${dec(x)} en <strong>todos</strong> los términos.`) +
          eq(ts.map(t => dec(t)).join(' + ') + ` = ${exacto}`) +
          por('todos los términos', 'Piden el valor exacto: si se cortara el desarrollo saldría solo una aproximación.');
        return { resultado: res(m(terminos(cs.map((c, r) => [c, r === 0 ? '' : r === 1 ? 'x' : `x^{${r}}`]))), m(exacto)), pasos, val: { V: V0 / 10 ** d.n } };
      },
    },
    {
      id: 'producto', titulo: 'Primeros términos de un producto (tipo D35·11)', peso: 2,
      datos(r) { const a = r.int(1, 3) * r.pick([1, -1]), b = r.int(1, 3) * r.pick([1, -1]), mm = r.int(3, 6), n = r.int(3, 8); return { a, b, mm, n }; },
      enunciado: d => `Halla los tres primeros términos, en potencias crecientes de x, del desarrollo de ${m(`${bin(1, 0, d.a, 1)}^{${d.mm}}${bin(1, 0, d.b, 1)}^{${d.n}}`)}.`,
      solucion(d) {
        const A = [1, C(d.mm, 1) * d.a, C(d.mm, 2) * d.a * d.a], B = [1, C(d.n, 1) * d.b, C(d.n, 2) * d.b * d.b];
        const c1 = A[1] + B[1], c2 = A[2] + A[1] * B[1] + B[2];
        const pasos = met('Solo hacen falta los términos hasta x² de cada factor: los de grado mayor no pueden dar x⁰, x¹ ni x² al multiplicar.') +
          eq(`${bin(1, 0, d.a, 1)}^{${d.mm}} = ${terminos([[1, ''], [A[1], 'x'], [A[2], 'x^2']])} + \\cdots`) +
          eq(`${bin(1, 0, d.b, 1)}^{${d.n}} = ${terminos([[1, ''], [B[1], 'x'], [B[2], 'x^2']])} + \\cdots`) +
          P('Al multiplicar, x² sale de tres productos: 1·(x²), (x)·(x) y (x²)·1.') +
          eq(`x:\\; ${A[1]} + ${sg(B[1])} = ${c1}, \\qquad x^2:\\; ${A[2]} + ${sg(A[1])}\\cdot ${sg(B[1])} + ${sg(B[2])} = ${c2}`) +
          eq(terminos([[1, ''], [c1, 'x'], [c2, 'x^2']]) + ' + \\cdots');
        return { resultado: m(terminos([[1, ''], [c1, 'x'], [c2, 'x^2']])), pasos, val: { c1, c2 } };
      },
    },
  ];

  const terminoP = [
    {
      id: 'coeficiente', titulo: 'Coeficiente de una potencia de x', peso: 2,
      datos(r) {
        const a = r.int(1, 3) * r.pick([1, -1]), ea = r.pick([1, 2]), b = r.int(1, 3) * r.pick([1, -1]), eb = r.pick([-1, -2, 0]), n = r.int(5, 9), rr = r.int(1, n - 1);
        if (ea === eb) return null; const k = ea * (n - rr) + eb * rr; return { a, ea, b, eb, n, rr, k };
      },
      enunciado: d => `Halla el coeficiente de ${m(d.k === 0 ? 'x^0' : d.k === 1 ? 'x' : `x^{${d.k}}`)} en el desarrollo de ${m(`${bin(d.a, d.ea, d.b, d.eb)}^{${d.n}}`)}${d.k === 0 ? ' (es decir, el término independiente)' : ''}.`,
      solucion(d) {
        const { a, ea, b, eb, n, rr, k } = d, coef = C(n, rr) * a ** (n - rr) * b ** rr, sl = eb - ea;
        const pasos = met('Término general, potencia de x en función de r, igualar y sustituir.') +
          eq(`T_{r+1} = ${nCr(n, 'r')}\\,(${mon(a, ea)})^{${n}-r}\\,(${mon(b, eb)})^{r}`) +
          eq(`\\text{potencia de } x:\\; ${ea}(${n} - r) ${eb < 0 ? '-' : '+'} ${Math.abs(eb)}r = ${ea * n} ${sl < 0 ? '-' : '+'} ${Math.abs(sl)}r`) +
          por('se suman los exponentes', `(x^${ea})^(${n}−r) da x^(${ea}(${n}−r))${eb ? ` y (x^${eb})^r da x^(${eb}r)` : ''}; al multiplicar potencias de la misma base se suman.`) +
          eq(`${ea * n} ${sl < 0 ? '-' : '+'} ${Math.abs(sl)}r = ${k} \\;\\Rightarrow\\; r = ${rr}`) +
          eq(`${nCr(n, rr)}\\cdot ${sg(a)}^{${n - rr}}\\cdot ${sg(b)}^{${rr}} = ${C(n, rr)}\\cdot ${a ** (n - rr)}\\cdot ${sg(b ** rr)} = ${miles(coef)}`) +
          por('el coeficiente no lleva x', 'Se piden solo los números que multiplican a la potencia de x.') +
          ojo(`es el término número ${rr + 1}, T${rr + 1}, porque se empieza a contar en r = 0.`);
        return { resultado: m(miles(coef)), pasos, val: { coef } };
      },
    },
    {
      id: 'hallar-n', titulo: 'Hallar n a partir de un coeficiente (tipo D34·6)', peso: 3,
      datos(r) { const c = r.pick([2, 3]), n = r.int(6, 20); if (C(n, 3) % c ** 3) return null; return { c, n }; },
      enunciado: d => `Cuando ${m(`\\left(1 + \\frac{x}{${d.c}}\\right)^{n}`)}, n ∈ ℕ, se desarrolla en potencias crecientes de x, el coeficiente de x³ es ${C(d.n, 3) / d.c ** 3}. a) Halla n. b) Halla el coeficiente de x².`,
      solucion(d) {
        const v = C(d.n, 3) / d.c ** 3, prod = 6 * C(d.n, 3), c2 = Q(C(d.n, 2), d.c ** 2);
        const pasos = sub('a) Valor de n') + eq(`T_{r+1} = ${nCr('n', 'r')}\\left(\\frac{x}{${d.c}}\\right)^{r} \\;\\Rightarrow\\; x^3:\\; ${nCr('n', 3)}\\cdot \\frac{1}{${d.c ** 3}} = ${v}`) +
          eq(`${nCr('n', 3)} = ${v * d.c ** 3} \\;\\Rightarrow\\; n(n-1)(n-2) = ${prod}`) +
          por('se busca así', `Es un producto de tres enteros seguidos: están cerca de ∛${prod} ≈ ${Math.cbrt(prod).toFixed(1).replace('.', ',')}. Se prueba ${d.n}·${d.n - 1}·${d.n - 2} = ${prod}.`) +
          eq(`n = ${d.n}`) +
          sub('b) Coeficiente de x²') + eq(`${nCr(d.n, 2)}\\cdot \\frac{1}{${d.c ** 2}} = \\frac{${C(d.n, 2)}}{${d.c ** 2}} = ${tq(c2)}`);
        return { resultado: res(m(`n = ${d.n}`), m(tq(c2))), pasos, val: { n: d.n, c2: val(c2) } };
      },
    },
  ];

  const generalizadoP = [
    {
      id: 'serie', titulo: 'Binomio con exponente negativo o fraccionario', peso: 2,
      datos(r) {
        const al = r.pick([Q(-1), Q(-2), Q(-3), Q(1, 2), Q(-1, 2), Q(1, 3)]);
        const cs = al.q === 1 ? [1, 2, 3] : al.q === 2 ? [1, 4, 9] : [1, 8];
        const c = r.pick(cs), dd = r.int(1, 3) * r.pick([1, -1]); return { al, c, d: dd };
      },
      enunciado: d => `Halla los tres primeros términos del desarrollo de ${m(`${bin(d.c, 0, d.d, 1)}^{${tq(d.al)}}`)} en potencias crecientes de x e indica para qué valores de x es válido.`,
      solucion(d) {
        const al = d.al, rt = Math.round(Math.pow(d.c, 1 / al.q)), root = al.p >= 0 ? Q(rt ** al.p) : Q(1, rt ** -al.p);
        const y = Q(d.d, d.c);   // (c + dx)^α = c^α (1 + (d/c) x)^α
        const k1 = al, k2 = div(mul(al, add(al, -1)), 2);
        const t1 = mul(root, mul(k1, y)), t2 = mul(root, mul(k2, pw(y, 2)));
        const pre = d.c === 1 ? '' : `${d.c}^{${tq(al)}}\\left(1 ${y.p < 0 ? '-' : '+'} ${tq(Q(Math.abs(y.p), y.q))}x\\right)^{${tq(al)}}`;
        const pasos = met('La fórmula (1 + x)^α = 1 + αx + α(α − 1)/2!·x² + ⋯ necesita un 1 delante. Si no lo hay, se saca factor común.') +
          (d.c === 1 ? '' : eq(`${bin(d.c, 0, d.d, 1)}^{${tq(al)}} = ${pre}, \\qquad ${d.c}^{${tq(al)}} = ${tq(root)}`) +
            por('se saca ' + d.c, `${d.c} + ${sg(d.d)}x = ${d.c}(1 + ${tq(y)}x); al elevar a α, el ${d.c} sale como ${d.c}^α.`)) +
          eq(`\\left(1 + u\\right)^{${tq(al)}} = 1 + ${tqp(al)}u + \\frac{${tqp(al)}\\left(${tq(add(al, -1))}\\right)}{2}u^2 + \\cdots = 1 ${k1.p < 0 ? '-' : '+'} ${tq(Q(Math.abs(k1.p), k1.q))}u ${k2.p < 0 ? '-' : '+'} ${tq(Q(Math.abs(k2.p), k2.q))}u^2 + \\cdots`) +
          eq(`u = ${tq(y)}x: \\quad ${terminos([[root, ''], [t1, 'x'], [t2, 'x^2']])} + \\cdots`) +
          por('|u| < 1', 'El desarrollo generalizado es una serie infinita y solo suma lo que debe si |u| < 1.') +
          eq(`\\left|${tq(y)}x\\right| < 1 \\;\\Rightarrow\\; |x| < ${tq(Q(d.c, Math.abs(d.d)))}`);
        return { resultado: res(m(terminos([[root, ''], [t1, 'x'], [t2, 'x^2']]) + ' + \\cdots'), m(`|x| < ${tq(Q(d.c, Math.abs(d.d)))}`)), pasos, val: { t0: val(root), t1: val(t1), t2: val(t2), R: d.c / Math.abs(d.d) } };
      },
    },
  ];

  // ================================================================ registro
  const MAT = 'matematicas', G = 'Tema 1 · Secuencias, series y demostraciones';
  X.registrar({ tema: 'repaso', grupo: G, materia: MAT, nombre: '0 · Repaso previo', ruta: 'temas/repaso-algebra/', apartados: [
    { slug: 'ecuaciones', nombre: 'Ecuaciones', icono: 'ecuaciones', patrones: ecuaciones },
    { slug: 'ruffini', nombre: 'Ruffini y factorización', icono: 'ruffini', patrones: ruffiniP },
    { slug: 'teorema-del-resto', nombre: 'Teorema del resto', icono: 'resto', patrones: resto },
  ] });
  X.registrar({ tema: 'sucesiones', grupo: G, materia: MAT, nombre: '1 · Sucesiones', ruta: 'temas/sucesiones/', apartados: [
    { slug: 'sucesiones-y-sumatorios', nombre: 'Sumatorios', icono: 'sucesiones', patrones: sumatorios },
    { slug: 'aritmeticas', nombre: 'Progresiones aritméticas', icono: 'aritmetica', patrones: aritmeticas },
    { slug: 'geometricas', nombre: 'Progresiones geométricas', icono: 'geometrica', patrones: geometricas },
  ] });
  X.registrar({ tema: 'demostraciones', grupo: G, materia: MAT, nombre: '2 · Demostraciones', ruta: 'temas/demostraciones/', apartados: [
    { slug: 'directa', nombre: 'Directa', icono: 'directa', patrones: directa },
    { slug: 'contradiccion', nombre: 'Por contradicción', icono: 'contradiccion', patrones: contradiccion },
    { slug: 'induccion', nombre: 'Por inducción', icono: 'domino', patrones: induccion },
    { slug: 'contraejemplo', nombre: 'Contraejemplos', icono: 'contraejemplo', patrones: contraejemplo },
  ] });
  X.registrar({ tema: 'recuento', grupo: G, materia: MAT, nombre: '3 · Recuento', ruta: 'temas/recuento/', apartados: [
    { slug: 'factorial', nombre: 'Factorial y combinatorio', icono: 'factorial', patrones: factorialP },
    { slug: 'orden', nombre: 'P, V y C', icono: 'orden', patrones: ordenP },
    { slug: 'repeticion', nombre: 'Con repetición', icono: 'repeticion', patrones: repeticionP },
    { slug: 'condiciones', nombre: 'Con condiciones', icono: 'condiciones', patrones: condicionesP },
  ] });
  X.registrar({ tema: 'binomio', grupo: G, materia: MAT, nombre: '4 · Binomio', ruta: 'temas/binomio/', apartados: [
    { slug: 'pascal', nombre: 'Combinatorios', icono: 'pascal', patrones: pascalP },
    { slug: 'desarrollo', nombre: 'Desarrollo', icono: 'binomio', patrones: desarrolloP },
    { slug: 'termino', nombre: 'Término general', icono: 'termino', patrones: terminoP },
    { slug: 'generalizado', nombre: 'Generalizado', icono: 'generalizado', patrones: generalizadoP },
  ] });
})(typeof window !== 'undefined' ? window : globalThis);
