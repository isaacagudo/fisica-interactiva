/* BI Ciencias · Matemáticas, Tema 2 (geometría y trigonometría): simuladores.
   Se montan en .widget[data-w][data-cfg] (los tipos de assets/mates/mates.js los monta ese fichero).
   Dibujan con la librería de figuras (assets/mates/figuras.js, window.MatesFig).
   Tipos: elevacion, interes, recta, unidad, ecuacion, sector, semejanza, triangulo, sinusoide.
   En Node, require('./trig.js') da { resolver, notables, soluciones } para comprobar resultados. */
(function (root) {
  'use strict';
  const R = Math.PI / 180, deg = x => x / R;
  const fmt = (x, d = 2) => { if (!isFinite(x)) return '—'; const r = Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : (+x.toFixed(d)).toString(); return r.replace('.', ',').replace('-', '−'); };

  // ---------------------------------------------------------------- cálculos
  // resolver un triángulo. caso: LLL {a,b,c} · LAL {b,c,A} · ALA {A,B,c} · LLA {a,b,A}. Devuelve [] o una o dos soluciones
  function resolver(caso, d) {
    const sol = [], ok = t => t.a > 0 && t.b > 0 && t.c > 0 && t.A > 0 && t.B > 0 && t.C > 0 && Math.abs(t.A + t.B + t.C - 180) < 1e-6;
    if (caso === 'LLL') {
      const { a, b, c } = d; if (a + b <= c || a + c <= b || b + c <= a) return [];
      const A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c))), B = deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
      sol.push({ a, b, c, A, B, C: 180 - A - B, pasos: ['coseno', 'coseno', 'suma'] });
    } else if (caso === 'LAL') {
      const { b, c, A } = d, a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A * R)), B = deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
      sol.push({ a, b, c, A, B, C: 180 - A - B, pasos: ['coseno', 'coseno', 'suma'] });
    } else if (caso === 'ALA') {
      const { A, B, c } = d, C = 180 - A - B; if (C <= 0) return [];
      sol.push({ a: c * Math.sin(A * R) / Math.sin(C * R), b: c * Math.sin(B * R) / Math.sin(C * R), c, A, B, C, pasos: ['suma', 'seno', 'seno'] });
    } else if (caso === 'LLA') {
      const { a, b, A } = d, s = b * Math.sin(A * R) / a; if (s > 1 + 1e-12) return [];
      const B1 = deg(Math.asin(Math.min(1, s)));
      for (const B of [B1, 180 - B1]) { const C = 180 - A - B; if (C > 1e-9 && !sol.some(t => Math.abs(t.B - B) < 1e-9)) sol.push({ a, b, c: a * Math.sin(C * R) / Math.sin(A * R), A, B, C, pasos: ['seno', 'suma', 'seno'] }); }
    }
    return sol.filter(ok);
  }
  // valores exactos de los ángulos notables (grados → texto)
  const EX = { 0: ['0', '1', '0'], 30: ['1/2', '√3/2', '√3/3'], 45: ['√2/2', '√2/2', '1'], 60: ['√3/2', '1/2', '√3'], 90: ['1', '0', '—'] };
  function notables(ang) {
    const a = ((ang % 360) + 360) % 360, q = a < 90 ? 1 : a < 180 ? 2 : a < 270 ? 3 : 4, ref = q === 1 ? a : q === 2 ? 180 - a : q === 3 ? a - 180 : 360 - a;
    const e = EX[Math.round(ref)] && Math.abs(ref - Math.round(ref)) < 1e-9 ? EX[Math.round(ref)] : null;
    const sgn = [[1, 1, 1], [1, -1, -1], [-1, -1, 1], [-1, 1, -1]][q - 1];
    const exacto = e ? e.map((v, i) => v === '0' || v === '—' ? v : (sgn[i] < 0 ? '−' : '') + v) : null;
    return { a, q, ref, exacto, sen: Math.sin(ang * R), cos: Math.cos(ang * R), tan: Math.tan(ang * R) };
  }
  // soluciones de f(x) = k en [0, 360) (grados)
  function soluciones(f, k) {
    const out = [], n = v => +((((v % 360) + 360) % 360).toFixed(6));
    if (f === 'sen') { if (Math.abs(k) > 1) return []; const a = deg(Math.asin(k)); out.push(n(a), n(180 - a)); }
    else if (f === 'cos') { if (Math.abs(k) > 1) return []; const a = deg(Math.acos(k)); out.push(n(a), n(360 - a)); }
    else { const a = deg(Math.atan(k)); out.push(n(a), n(a + 180)); }
    return [...new Set(out.map(v => v === 360 ? 0 : v))].sort((x, y) => x - y);
  }
  if (typeof document === 'undefined') { if (typeof module !== 'undefined') module.exports = { resolver, notables, soluciones }; return; }

  // ---------------------------------------------------------------- interfaz
  const W = {};
  const fig = (tipo, p) => root.MatesFig ? root.MatesFig.figura(tipo, p) : '';
  const deslizador = (id, txt, min, max, paso, v, suf = '') => `<label>${txt} <input type="range" data-k="${id}" min="${min}" max="${max}" step="${paso}" value="${v}"><output data-o="${id}"></output>${suf}</label>`;
  function enlazar(el, estado, pintar) {
    el.querySelectorAll('input[data-k]').forEach(i => i.addEventListener('input', () => { estado[i.dataset.k] = i.type === 'checkbox' ? i.checked : +i.value; pintar(); }));
    const salidas = () => el.querySelectorAll('output[data-o]').forEach(o => { o.textContent = fmt(estado[o.dataset.o], 2); });
    const p2 = () => { salidas(); pintar(); }; return p2;
  }

  W.elevacion = (el, cfg) => {
    const e = { h: cfg.h ?? 30, d: cfg.d ?? 50 };
    el.innerHTML = `<p class="w-tit">Ángulo de elevación y de depresión</p><div class="w-ctl">${deslizador('h', 'Altura h', 5, 100, 1, e.h, ' m')}${deslizador('d', 'Distancia d', 5, 150, 1, e.d, ' m')}</div><div class="fig-host"></div><p class="w-out" aria-live="polite"></p>`;
    const pintar = () => {
      const a = deg(Math.atan(e.h / e.d));
      el.querySelector('.fig-host').innerHTML = fig('alturas', { h: e.h, d: [e.d], ang: [`${fmt(a, 1)}°`], etqh: `h = ${e.h}`, etqd: [`d = ${e.d}`], objeto: 'torre' });
      el.querySelector('.w-out').innerHTML = `tan α = h/d = ${e.h}/${e.d} = ${fmt(e.h / e.d, 4)} ⟹ α = ${fmt(a, 2)}°. Desde lo alto, el ángulo de depresión hacia el observador también mide ${fmt(a, 2)}°: son ángulos alternos entre la horizontal de arriba y el suelo.`;
    };
    enlazar(el, e, pintar)();
  };

  W.interes = (el, cfg) => {
    const e = { C: cfg.C ?? 2000, r: cfg.r ?? 3, n: cfg.n ?? 5 };
    el.innerHTML = `<p class="w-tit">Interés compuesto año a año</p><div class="w-ctl"><label>Capital inicial <input type="number" data-k="C" value="${e.C}" min="1"> €</label><label>Interés anual <input type="number" data-k="r" value="${e.r}" step="0.1" min="0"> %</label><label>Años <input type="number" data-k="n" value="${e.n}" min="1" max="40"></label></div><div class="tabla"></div><p class="w-out" aria-live="polite"></p>`;
    const pintar = () => {
      const r = e.r / 100, n = Math.max(1, Math.min(40, Math.round(e.n))); let C = e.C, filas = '';
      for (let k = 1; k <= n; k++) { const i = C * r; C += i; filas += `<tr><td>${k}</td><td class="num">${fmt(i, 2)} €</td><td class="num">${fmt(C, 2)} €</td></tr>`; }
      el.querySelector('.tabla').innerHTML = `<div class="table-wrap"><table><thead><tr><th>Año</th><th class="num">Intereses del año</th><th class="num">Capital al final</th></tr></thead><tbody>${filas}</tbody></table></div>`;
      el.querySelector('.w-out').innerHTML = `C<sub>F</sub> = C<sub>i</sub>(1 + r)<sup>n</sup> = ${fmt(e.C, 2)}·${fmt(1 + r, 4)}<sup>${n}</sup> = <strong>${fmt(e.C * (1 + r) ** n, 2)} €</strong>. Cada año los intereses son mayores, porque se calculan sobre un capital que ya ha crecido.`;
    };
    el.querySelectorAll('input').forEach(i => i.addEventListener('input', () => { e[i.dataset.k] = +i.value || 0; pintar(); }));
    pintar();
  };

  W.recta = (el, cfg) => {
    const e = { ax: cfg.A ? cfg.A[0] : 1, ay: cfg.A ? cfg.A[1] : 3, bx: cfg.B ? cfg.B[0] : 4, by: cfg.B ? cfg.B[1] : -3, perp: !!cfg.perp };
    el.innerHTML = `<p class="w-tit">La recta que pasa por A y B, en todas sus formas</p><div class="w-ctl">${deslizador('ax', 'A: x', -6, 6, 1, e.ax)}${deslizador('ay', 'y', -6, 6, 1, e.ay)}</div><div class="w-ctl">${deslizador('bx', 'B: x', -6, 6, 1, e.bx)}${deslizador('by', 'y', -6, 6, 1, e.by)}<label><input type="checkbox" data-k="perp"${e.perp ? ' checked' : ''}> Perpendicular por A</label></div><div class="fig-host"></div><div class="w-out" aria-live="polite"></div>`;
    const fr = (p, q) => { if (q < 0) { p = -p; q = -q; } const g = (x, y) => y ? g(y, x % y) : Math.abs(x); const k = g(p, q) || 1; p /= k; q /= k; return q === 1 ? fmt(p) : `${p < 0 ? '−' : ''}${Math.abs(p)}/${q}`; };
    const sg = x => x < 0 ? `− ${fmt(-x)}` : `+ ${fmt(x)}`;
    const pintar = () => {
      const v1 = e.bx - e.ax, v2 = e.by - e.ay, out = el.querySelector('.w-out');
      if (!v1 && !v2) { out.innerHTML = '<p class="mal">A y B coinciden: por un solo punto pasan infinitas rectas.</p>'; return; }
      const a = v2, b = -v1, c = -(a * e.ax + b * e.ay);
      const el_ = [['pt', 'A', 'ne'], ['pt', 'B', 'ne']];
      el_.unshift(v1 ? ['recta', v2 / v1, e.ay - v2 / v1 * e.ax, { k: 'p' }] : ['recta', 'v', e.ax, { k: 'p' }]);
      if (e.perp) el_.unshift(v2 ? ['recta', -v1 / v2, e.ay + v1 / v2 * e.ax, { k: 'fr', dash: true }] : ['recta', 'v', e.ax, { k: 'fr', dash: true }]);
      el.querySelector('.fig-host').innerHTML = fig('geo', { ejes: { x: [-7, 7], y: [-7, 7], rejilla: true }, pts: { A: [e.ax, e.ay], B: [e.bx, e.by] }, el: el_, ancho: 380, alto: 380 });
      const m = v1 ? fr(v2, v1) : null, n = v1 ? fr(e.ay * v1 - v2 * e.ax, v1) : null;
      out.innerHTML = `<ul>
<li>Vector director: <strong>v = (${fmt(v1)}, ${fmt(v2)})</strong> (B − A)</li>
<li>Vectorial: (x, y) = (${fmt(e.ax)}, ${fmt(e.ay)}) + λ(${fmt(v1)}, ${fmt(v2)})</li>
<li>Paramétrica: x = ${fmt(e.ax)} ${sg(v1)}λ, y = ${fmt(e.ay)} ${sg(v2)}λ</li>
<li>Continua: ${v1 && v2 ? `(x ${sg(-e.ax)})/${fmt(v1)} = (y ${sg(-e.ay)})/${fmt(v2)}` : 'no existe (una componente del vector es 0)'}</li>
<li>General: ${fmt(a)}x ${sg(b)}y ${sg(c)} = 0</li>
<li>${v1 ? `Explícita: <strong>y = ${m}x ${n.startsWith('−') ? '− ' + n.slice(1) : '+ ' + n}</strong> (pendiente m = ${m})` : `Recta vertical: x = ${fmt(e.ax)} (no tiene pendiente)`}</li>
${e.perp ? `<li>Perpendicular por A (en rojo): ${!v2 ? `AB es horizontal, así que la perpendicular es vertical: x = ${fmt(e.ax)}` : !v1 ? `AB es vertical, así que la perpendicular es horizontal: y = ${fmt(e.ay)}` : `pendiente −1/m = ${fr(-v1, v2)}, porque ${m} · (${fr(-v1, v2)}) = −1`}</li>` : ''}</ul>`;
    };
    enlazar(el, e, pintar)();
  };

  W.unidad = (el, cfg) => {
    const e = { ang: cfg.ang ?? 150 };
    el.innerHTML = `<p class="w-tit">Circunferencia unidad: arrastra el ángulo</p><div class="w-ctl">${deslizador('ang', 'Ángulo', -360, 720, 5, e.ang, '°')}</div><div class="fig-host"></div><div class="w-out" aria-live="polite"></div>`;
    const pintar = () => {
      const N = notables(e.ang), a = N.a;
      el.querySelector('.fig-host').innerHTML = fig('unidad', { ang: a, ref: a % 90 !== 0, etq: `P`, etqAng: `${e.ang}°`, cuadrantes: true, ancho: 340, alto: 320 });
      const red = { 1: `${a}° ya está en el primer cuadrante`, 2: `sen ${a}° = sen(180° − ${a}°) = sen ${N.ref}°; cos ${a}° = −cos ${N.ref}°`, 3: `sen ${a}° = −sen(${a}° − 180°) = −sen ${N.ref}°; cos ${a}° = −cos ${N.ref}°`, 4: `sen ${a}° = −sen(360° − ${a}°) = −sen ${N.ref}°; cos ${a}° = cos ${N.ref}°` }[N.q];
      el.querySelector('.w-out').innerHTML = `${e.ang !== a ? `<p>${e.ang}° da las mismas razones que <strong>${a}°</strong> (${e.ang > a ? 'se resta' : 'se suma'} 360° ${Math.abs(e.ang - a) / 360 === 1 ? 'una vez' : `${Math.abs(e.ang - a) / 360} veces`}).</p>` : ''}
<p>Cuadrante <strong>${['I', 'II', 'III', 'IV'][N.q - 1]}</strong> · ángulo de referencia <strong>${fmt(N.ref)}°</strong> · ${fmt(a * Math.PI / 180, 3)} rad</p>
<p>${a % 90 === 0 ? 'Ángulo sobre un eje.' : red}</p>
<p>sen = <strong>${N.exacto ? N.exacto[0] : fmt(N.sen, 4)}</strong> · cos = <strong>${N.exacto ? N.exacto[1] : fmt(N.cos, 4)}</strong> · tan = <strong>${N.exacto ? N.exacto[2] : (Math.abs(N.cos) < 1e-12 ? 'no existe' : fmt(N.tan, 4))}</strong></p>`;
    };
    enlazar(el, e, pintar)();
  };

  W.ecuacion = (el, cfg) => {
    const e = { f: cfg.f || 'sen', k: cfg.k ?? 0.5 };
    el.innerHTML = `<p class="w-tit">Soluciones de una ecuación trigonométrica en [0°, 360°)</p><div class="w-ctl chips">${['sen', 'cos', 'tan'].map(f => `<button type="button" class="btn" data-f="${f}" aria-pressed="${f === e.f}">${f} x = k</button>`).join('')}</div><div class="w-ctl">${deslizador('k', 'k', -2, 2, 0.01, e.k)}</div><div class="fig-host"></div><p class="w-out" aria-live="polite"></p>`;
    const pintar = () => {
      const s = soluciones(e.f, e.k);
      el.querySelector('.fig-host').innerHTML = fig('grafica', { f: e.f, k: e.k, sol: s, etqsol: s.map(v => fmt(v, 1) + '°') });
      el.querySelector('.w-out').innerHTML = !s.length ? `<span class="mal">No hay soluciones: ${e.f} x nunca vale ${fmt(e.k)} (está entre −1 y 1).</span>`
        : `La calculadora da ${e.f}⁻¹(${fmt(e.k)}) = ${fmt(e.f === 'sen' ? deg(Math.asin(e.k)) : e.f === 'cos' ? deg(Math.acos(e.k)) : deg(Math.atan(e.k)), 2)}°. ${e.f === 'sen' ? 'La otra sale de 180° − α' : e.f === 'cos' ? 'La otra sale de 360° − α' : 'La otra está 180° más allá'}. En [0°, 360°): <strong>${s.map(v => fmt(v, 2) + '°').join(' y ')}</strong>.`;
    };
    el.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { e.f = b.dataset.f; el.querySelectorAll('[data-f]').forEach(x => x.setAttribute('aria-pressed', x === b)); pintar(); });
    enlazar(el, e, pintar)();
  };

  W.sector = (el, cfg) => {
    const e = { r: cfg.r ?? 10, ang: cfg.ang ?? 60 };
    el.innerHTML = `<p class="w-tit">Sector circular</p><div class="w-ctl">${deslizador('r', 'Radio', 1, 20, 0.5, e.r)}${deslizador('ang', 'Ángulo', 5, 355, 1, e.ang, '°')}</div><div class="fig-host"></div><p class="w-out" aria-live="polite"></p>`;
    const pintar = () => {
      const t = e.ang * R, L = e.r * t, A = e.r * e.r * t / 2;
      el.querySelector('.fig-host').innerHTML = fig('sector', { r: e.r, ang: e.ang, etq: { r: `r = ${fmt(e.r)}`, ang: `${e.ang}°`, arco: `L = ${fmt(L, 2)}` } });
      el.querySelector('.w-out').innerHTML = `θ = ${e.ang}° · π/180 = <strong>${fmt(t, 4)} rad</strong> · arco L = r·θ = <strong>${fmt(L, 2)}</strong> · perímetro 2r + L = <strong>${fmt(2 * e.r + L, 2)}</strong> · área ½·r²·θ = <strong>${fmt(A, 2)}</strong>`;
    };
    enlazar(el, e, pintar)();
  };

  W.semejanza = (el, cfg) => {
    const e = { k: cfg.k ?? 2, r: cfg.r ?? 3, h: cfg.h ?? 4 };
    el.innerHTML = `<p class="w-tit">Cuerpos semejantes: razón k</p><div class="w-ctl">${deslizador('k', 'k', 0.25, 3, 0.05, e.k)}</div><div class="fig-host"></div><div class="w-out" aria-live="polite"></div>`;
    const pintar = () => {
      const { r, h, k } = e, x2 = 2 * r + 1.5;
      el.querySelector('.fig-host').innerHTML = fig('geo', { pts: { A: [-r, 0], B: [r, 0], V: [0, h], A2: [x2, 0], B2: [x2 + 2 * r * k, 0], V2: [x2 + r * k, h * k] }, el: [['pol', ['A', 'B', 'V'], { fill: 'p' }], ['pol', ['A', 'B', 'V']], ['pol', ['A2', 'B2', 'V2'], { fill: 'v' }], ['pol', ['A2', 'B2', 'V2'], { k: 'v' }], ['cota', 'A', 'B', `${2 * r}`, { lado: -1 }], ['cota', 'A2', 'B2', `${fmt(2 * r * k)}`, { lado: -1, k: 'v' }]], ancho: 460, alto: 240 });
      const V1 = Math.PI * r * r * h / 3;
      el.querySelector('.w-out').innerHTML = `<div class="table-wrap"><table><thead><tr><th>Medida</th><th>Se multiplica por</th><th class="num">Cono pequeño</th><th class="num">Cono semejante</th></tr></thead><tbody>
<tr><td>Longitudes (radio, altura)</td><td>k = ${fmt(k)}</td><td class="num">r = ${r}</td><td class="num">${fmt(r * k)}</td></tr>
<tr><td>Áreas</td><td>k² = ${fmt(k * k, 4)}</td><td class="num">πr² = ${fmt(Math.PI * r * r)}</td><td class="num">${fmt(Math.PI * r * r * k * k)}</td></tr>
<tr><td>Volúmenes</td><td>k³ = ${fmt(k ** 3, 4)}</td><td class="num">${fmt(V1)}</td><td class="num">${fmt(V1 * k ** 3)}</td></tr></tbody></table></div>`;
    };
    enlazar(el, e, pintar)();
  };

  W.triangulo = (el, cfg) => {
    const CASOS = { LLL: ['a', 'b', 'c'], LAL: ['b', 'A', 'c'], ALA: ['A', 'c', 'B'], LLA: ['a', 'b', 'A'] };
    const NOM = { LLL: 'tres lados', LAL: 'dos lados y el ángulo comprendido', ALA: 'un lado y sus dos ángulos', LLA: 'dos lados y el ángulo opuesto a uno de ellos' };
    const e = Object.assign({ caso: 'LLA', a: 7, b: 9, c: 10, A: 40, B: 60 }, cfg);
    el.innerHTML = `<p class="w-tit">Resolver un triángulo</p><div class="w-ctl chips">${Object.keys(CASOS).map(c => `<button type="button" class="btn" data-c="${c}" aria-pressed="${c === e.caso}">${c}</button>`).join('')}</div><div class="w-ctl datos"></div><div class="fig-host"></div><div class="w-out" aria-live="polite"></div>`;
    const datos = () => {
      el.querySelector('.datos').innerHTML = `<span>${NOM[e.caso]}:</span>` + CASOS[e.caso].map(k => `<label>${k} = <input type="number" data-t="${k}" value="${e[k]}" step="${/[ABC]/.test(k) ? 1 : 0.1}" min="0">${/[ABC]/.test(k) ? '°' : ''}</label>`).join('');
      el.querySelectorAll('[data-t]').forEach(i => i.addEventListener('input', () => { e[i.dataset.t] = +i.value; pintar(); }));
    };
    const pintar = () => {
      const S = resolver(e.caso, e), out = el.querySelector('.w-out'), host = el.querySelector('.fig-host');
      if (!S.length) { host.innerHTML = ''; out.innerHTML = `<p class="mal">Con estos datos no hay triángulo${e.caso === 'LLA' ? ': b·sen A / a sale mayor que 1' : e.caso === 'LLL' ? ': un lado es mayor que la suma de los otros dos' : ': los ángulos suman 180° o más'}.</p>`; return; }
      const dados = CASOS[e.caso], etq = t => { const o = {}; for (const k of ['a', 'b', 'c']) o[k] = `${k} = ${fmt(t[k], 2)}`; for (const k of ['A', 'B', 'C']) o[k] = `${fmt(t[k], 1)}°`; return o; };
      host.innerHTML = S.map((t, i) => fig('tri', { a: t.a, b: t.b, c: t.c, etq: etq(t), foco: ['a', 'b', 'c', 'A', 'B', 'C'].filter(k => !dados.includes(k)), ancho: S.length > 1 ? 300 : 420, alto: 240 })).join('');
      host.style.display = S.length > 1 ? 'grid' : ''; host.style.gridTemplateColumns = S.length > 1 ? 'repeat(auto-fit,minmax(220px,1fr))' : '';
      const pasos = { LLL: 'Teorema del coseno para A y B: cos A = (b² + c² − a²)/(2bc). Después C = 180° − A − B.', LAL: 'Teorema del coseno para el lado que falta: a² = b² + c² − 2bc·cos A. Después el coseno otra vez para B, y C = 180° − A − B.', ALA: 'C = 180° − A − B. Después el teorema del seno: a = c·sen A / sen C y b = c·sen B / sen C.', LLA: `Teorema del seno: sen B = b·sen A / a = ${fmt(e.b * Math.sin(e.A * R) / e.a, 4)}. ${S.length > 1 ? `<strong>Caso ambiguo:</strong> B = ${fmt(S[0].B, 2)}° o B = 180° − ${fmt(S[0].B, 2)}° = ${fmt(S[1].B, 2)}°, y las dos dan un triángulo.` : 'Solo una de las dos posibilidades para B deja sitio para C.'} Después C = 180° − A − B y c = a·sen C / sen A.` }[e.caso];
      out.innerHTML = `<p>${pasos}</p>${S.map((t, i) => `<p>${S.length > 1 ? `Triángulo ${i + 1}: ` : ''}a = ${fmt(t.a)}, b = ${fmt(t.b)}, c = ${fmt(t.c)}; A = ${fmt(t.A, 2)}°, B = ${fmt(t.B, 2)}°, C = ${fmt(t.C, 2)}° · área = ½·a·b·sen C = ${fmt(t.a * t.b * Math.sin(t.C * R) / 2)}</p>`).join('')}<p class="w-msg">En rojo, lo calculado; en negro, los datos.</p>`;
    };
    el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { e.caso = b.dataset.c; el.querySelectorAll('[data-c]').forEach(x => x.setAttribute('aria-pressed', x === b)); datos(); pintar(); });
    datos(); pintar();
  };

  W.sinusoide = (el, cfg) => {
    const e = { a: cfg.a ?? 3, b: cfg.b ?? 1, c: cfg.c ?? 0, d: cfg.d ?? 4 };
    el.innerHTML = `<p class="w-tit">f(x) = a·sen[b(x + c)] + d (x en radianes)</p><div class="w-ctl">${deslizador('a', 'a', -4, 4, 0.5, e.a)}${deslizador('b', 'b', 0.5, 4, 0.5, e.b)}</div><div class="w-ctl">${deslizador('c', 'c (en π)', -1, 1, 0.125, e.c)}${deslizador('d', 'd', -4, 6, 0.5, e.d)}</div><div class="fig-host"></div><p class="w-out" aria-live="polite"></p>`;
    const pintar = () => {
      const mx = e.d + Math.abs(e.a), mn = e.d - Math.abs(e.a);
      el.querySelector('.fig-host').innerHTML = fig('grafica', { f: 'sen', rad: true, x: [0, 2], a: e.a, b: e.b, c: e.c, d: e.d, y: [Math.min(-1, mn - 0.5), Math.max(1, mx + 0.5)], lineas: [[mx, `máx ${fmt(mx)}`], [mn, `mín ${fmt(mn)}`], [e.d, `d = ${fmt(e.d)}`]], yt: [] });
      el.querySelector('.w-out').innerHTML = `Amplitud |a| = (máx − mín)/2 = <strong>${fmt(Math.abs(e.a))}</strong> · eje d = (máx + mín)/2 = <strong>${fmt(e.d)}</strong> · periodo 2π/b = <strong>${fmt(2 / e.b, 3)}π</strong> · desplazamiento horizontal ${e.c ? `${fmt(-e.c, 3)}π (${e.c > 0 ? 'a la izquierda' : 'a la derecha'})` : '0'}`;
    };
    enlazar(el, e, pintar)();
  };

  const montar = () => document.querySelectorAll('.widget[data-w]').forEach(el => {
    const f = W[el.dataset.w]; if (!f) return;
    let cfg = {}; try { cfg = JSON.parse(el.dataset.cfg || '{}'); } catch (_) { /* vacío */ }
    try { f(el, cfg); } catch (err) { el.innerHTML = '<p class="w-msg">No se ha podido cargar el simulador.</p>'; if (root.console) console.error(err); }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})(typeof window !== 'undefined' ? window : globalThis);
