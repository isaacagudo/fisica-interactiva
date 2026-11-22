/* BI Ciencias · Matemáticas (Tema 1). Se monta solo al cargar la página, sin dependencias.
   - .guia[data-ej]          pistas que se desbloquean de una en una, resultado, solución y progreso guardado
   - [data-estado]           etiqueta de progreso en las listas de ejercicios
   - .widget[data-w][data-cfg]  simuladores: ruffini, serie, fractal, metodo, contraejemplo, cuadro, enumerar, pascal, termino, generalizado
   En Node, require('./mates.js') da { frac, ruffini, termino, contraejemplos } para comprobar resultados. */
(function (root) {
  'use strict';
  // ---------------------------------------------------------------- aritmética exacta (fracciones con BigInt)
  const gcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a || 1n; };
  const F = (p, q = 1n) => { p = BigInt(p); q = BigInt(q); if (q < 0n) { p = -p; q = -q; } const g = gcd(p, q); return { p: p / g, q: q / g }; };
  const leeF = s => { s = String(s).trim().replace('−', '-'); const m = s.match(/^(-?\d+)(?:\/(\d+))?$/); if (!m) return null; return F(m[1], m[2] || 1); };
  const mul = (a, b) => F(a.p * b.p, a.q * b.q), sum = (a, b) => F(a.p * b.q + b.p * a.q, a.q * b.q);
  const pot = (a, n) => { let r = F(1); for (let i = 0; i < n; i++) r = mul(r, a); return r; };
  const binom = (n, k) => { let r = 1n; for (let i = 1n; i <= BigInt(k); i++) r = r * (BigInt(n) - i + 1n) / i; return r; };
  const fmtF = (f, html = true) => {
    const g = x => { const s = String(x < 0n ? -x : x); return (x < 0n ? '−' : '') + (s.length > 4 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s); };
    if (f.q === 1n) return g(f.p);
    return html ? `${f.p < 0n ? '−' : ''}<span class="fr"><span class="nu">${g(f.p < 0n ? -f.p : f.p)}</span><span class="de">${g(f.q)}</span></span>` : `${g(f.p)}/${g(f.q)}`;
  };
  const fmtN = (x, d = 2) => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : x.toFixed(d)).replace('.', ',').replace('-', '−');

  // ---------------------------------------------------------------- cálculos (también para comprobar en Node)
  function ruffini(p, a) {   // p: coeficientes de mayor a menor grado (números), a: número
    const fila2 = [null], fila3 = [p[0]];
    for (let i = 1; i < p.length; i++) { fila2.push(fila3[i - 1] * a); fila3.push(p[i] + fila2[i]); }
    return { fila2, fila3, cociente: fila3.slice(0, -1), resto: fila3[fila3.length - 1], Pa: p.reduce((s, c) => s * a + c, 0) };
  }
  // término de (ca·x^ea + cb·x^eb)^n con potencia k de x
  function termino(n, ca, ea, cb, eb, k) {
    if (ea === eb) return ea * n === k ? { r: null, todos: true } : { r: null };
    const rr = (k - ea * n) / (eb - ea);
    if (!Number.isInteger(rr) || rr < 0 || rr > n) return { r: null, rr };
    const c = mul(F(binom(n, rr)), mul(pot(ca, n - rr), pot(cb, rr)));
    return { r: rr, c };
  }
  const esPrimo = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const contraejemplos = {
    n2div4: { titulo: 'Si n² es divisible por 4, entonces n es divisible por 4', cab: ['n', 'n²', '¿4 divide a n²?', '¿4 divide a n?'], valores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      fila: n => ({ c: [n, n * n, n * n % 4 === 0 ? 'Sí' : 'No', n % 4 === 0 ? 'Sí' : 'No'], falla: n * n % 4 === 0 && n % 4 !== 0 }) },
    n2mas4: { titulo: 'n² + 4 > 5 para todo n ∈ ℝ', cab: ['n', 'n² + 4', '¿> 5?'], valores: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
      fila: n => ({ c: [fmtN(n, 1), fmtN(n * n + 4, 2), n * n + 4 > 5 ? 'Sí' : 'No'], falla: !(n * n + 4 > 5) }) },
    impares: { titulo: 'El producto de 3 impares consecutivos es divisible por 6', cab: ['Impares', 'Producto', '¿Divisible por 6?'], valores: [1, 3, 5, 7, 9, 11, 13],
      fila: m => { const v = m * (m + 2) * (m + 4); return { c: [`${m} · ${m + 2} · ${m + 4}`, v, v % 6 === 0 ? 'Sí' : 'No'], falla: v % 6 !== 0 }; } },
    euler: { titulo: 'n² + n + 41 es primo para todo n', cab: ['n', 'n² + n + 41', '¿Primo?'], valores: [0, 1, 2, 3, 36, 37, 38, 39, 40, 41],
      fila: n => { const v = n * n + n + 41; return { c: [n, v, esPrimo(v) ? 'Sí' : `No (${v} = 41 · ${v / 41})`], falla: !esPrimo(v) }; } },
    primos: { titulo: 'Todo número primo es impar', cab: ['Primo', '¿Impar?'], valores: [2, 3, 5, 7, 11, 13, 17, 19],
      fila: n => ({ c: [n, n % 2 ? 'Sí' : 'No'], falla: n % 2 === 0 }) },
    cuadrados: { titulo: 'Si a² = b², entonces a = b', cab: ['a', 'b', 'a²', 'b²', '¿a = b?'], valores: [[2, 2], [3, 3], [1, -1], [-4, 4]],
      fila: ([a, b]) => ({ c: [a, b, a * a, b * b, a === b ? 'Sí' : 'No'], falla: a * a === b * b && a !== b }) },
    mn2: { titulo: 'n² − n + 11 es primo para todo n ∈ ℤ⁺', cab: ['n', 'n² − n + 11', '¿Primo?'], valores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      fila: n => { const v = n * n - n + 11; return { c: [n, v, esPrimo(v) ? 'Sí' : 'No'], falla: !esPrimo(v) }; } },
  };
  if (typeof document === 'undefined') { if (typeof module !== 'undefined') module.exports = { F, leeF, fmtF, binom, ruffini, termino, contraejemplos }; return; }

  const h = (tag, attrs = {}, html = '') => { const el = document.createElement(tag); for (const k in attrs) el.setAttribute(k, attrs[k]); if (html) el.innerHTML = html; return el; };
  const store = {
    get(id) { try { return JSON.parse(localStorage.getItem('mates:' + id)) || {}; } catch (_) { return {}; } },
    set(id, v) { try { localStorage.setItem('mates:' + id, JSON.stringify(v)); } catch (_) { /* sin almacenamiento */ } },
  };
  const sup = n => String(n).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] || (c === '-' ? '⁻' : c)).join('');
  const poli = (cs, v = 'x') => {   // coeficientes de mayor a menor grado -> texto
    const g = cs.length - 1; let s = '';
    cs.forEach((c, i) => {
      if (!c) return; const e = g - i, abs = Math.abs(c);
      const t = (e === 0 ? fmtN(abs) : (abs === 1 ? '' : fmtN(abs))) + (e === 0 ? '' : v + (e > 1 ? sup(e) : ''));
      s += s ? (c < 0 ? ' − ' : ' + ') + t : (c < 0 ? '−' : '') + t;
    });
    return s || '0';
  };

  // ---------------------------------------------------------------- pistas
  function montarGuia(g) {
    const id = g.dataset.ej, pistas = [...g.querySelectorAll('details.pista')], sol = g.querySelector('details.sol'), res = g.querySelector('details.res');
    const estado = g.querySelector('.estado');
    let usadas = Math.min(store.get(id).pistas || 0, pistas.length);
    g.classList.add('js');
    const pintar = () => {
      pistas.forEach((p, i) => { p.hidden = i > usadas; p.classList.toggle('usada', i < usadas); });
      const s = store.get(id);
      estado.hidden = false;
      estado.querySelector('.txt').textContent = s.hecho ? `Resuelto ${s.pistas ? `con ${s.pistas} ${s.pistas === 1 ? 'pista' : 'pistas'}` : 'sin pistas'}${s.sol ? ' (mirando la solución)' : ''}.` : `Pistas usadas: ${usadas} de ${pistas.length}.`;
      estado.querySelector('.hecho').hidden = !!s.hecho;
    };
    const marca = (k, v) => { const s = store.get(id); s[k] = v; store.set(id, s); pintar(); };
    pistas.forEach((p, i) => p.addEventListener('toggle', () => { if (p.open && i >= usadas) { usadas = i + 1; marca('pistas', usadas); } }));
    sol.addEventListener('toggle', () => { if (sol.open) marca('sol', true); });
    if (res) res.addEventListener('toggle', () => { if (res.open) marca('res', true); });
    estado.querySelector('.hecho').addEventListener('click', () => { const s = store.get(id); s.hecho = true; s.pistas = usadas; store.set(id, s); pintar(); });
    estado.querySelector('.reset').addEventListener('click', () => { store.set(id, {}); usadas = 0; [...pistas, sol, res].forEach(d => { if (d) d.open = false; }); pintar(); });
    pintar();
  }
  function montarEstado(el) {
    const s = store.get(el.dataset.estado);
    if (s.hecho) { el.textContent = s.pistas ? `Hecho · ${s.pistas} ${s.pistas === 1 ? 'pista' : 'pistas'}` : 'Hecho · sin pistas'; el.className = 'tag hecho'; el.hidden = false; }
    else if (s.pistas || s.sol || s.res) { el.textContent = 'Empezado'; el.className = 'tag empezado'; el.hidden = false; }
  }

  // ---------------------------------------------------------------- widgets
  const W = {};

  // Ruffini paso a paso: baja, multiplica y suma; al final, resto = P(a)
  W.ruffini = (el, cfg) => {
    el.innerHTML = `<p class="w-tit">Ruffini paso a paso</p>
<div class="w-ctl"><label>Coeficientes <input type="text" class="largo coef" value="${(cfg.p || [1, -2, -1, 2]).join(', ')}" aria-label="Coeficientes de mayor a menor grado"></label><label>a = <input type="number" class="a" value="${cfg.a ?? 2}" step="1"></label></div>
<p class="w-msg">Escribe los coeficientes de mayor a menor grado, con 0 en los huecos (x³ − 7x + 6 → 1, 0, −7, 6).</p>
<div class="table-wrap"><table class="rf"></table></div><p class="w-out" aria-live="polite"></p>
<div class="w-ctl"><button type="button" class="btn primary sig">Siguiente paso</button><button type="button" class="btn todo">Hacerlo entero</button><button type="button" class="btn ini">Empezar otra vez</button></div>`;
    const t = el.querySelector('.rf'), out = el.querySelector('.w-out');
    let paso = 0;
    const datos = () => { const p = el.querySelector('.coef').value.split(/[,;]\s*|\s+/).filter(Boolean).map(x => parseFloat(x.replace('−', '-'))); const a = parseFloat(el.querySelector('.a').value); return { p, a, ok: p.length > 1 && p.every(Number.isFinite) && Number.isFinite(a) }; };
    const pintar = () => {
      const { p, a, ok } = datos();
      if (!ok) { t.innerHTML = ''; out.textContent = 'Revisa los coeficientes y el valor de a.'; return; }
      const R = ruffini(p, a), N = p.length, max = 2 * N - 1;
      paso = Math.min(paso, max);
      const vis2 = i => i > 0 && paso >= 2 * i, vis3 = i => paso >= (i === 0 ? 1 : 2 * i + 1);
      t.innerHTML = `<tr><td class="a"></td>${p.map(c => `<td>${fmtN(c)}</td>`).join('')}</tr>
<tr><td class="a">${fmtN(a)}</td>${p.map((_, i) => `<td class="${paso === 2 * i ? 'nuevo' : ''}">${vis2(i) ? fmtN(R.fila2[i]) : ''}</td>`).join('')}</tr>
<tr class="suma"><td class="a"></td>${p.map((_, i) => `<td class="${i === N - 1 && paso === max ? 'r' : paso === 2 * i + 1 || (i === 0 && paso === 1) ? 'nuevo' : ''}">${vis3(i) ? fmtN(R.fila3[i]) : ''}</td>`).join('')}</tr>`;
      const k = Math.floor(paso / 2);
      if (paso === 0) out.textContent = `Dividimos ${poli(p)} entre (x ${a < 0 ? '+ ' + fmtN(-a) : '− ' + fmtN(a)}). Pulsa «Siguiente paso».`;
      else if (paso === 1) out.textContent = `Se baja el primer coeficiente: ${fmtN(p[0])}.`;
      else if (paso % 2 === 0) out.textContent = `Multiplica: ${fmtN(a)} · ${fmtN(R.fila3[k - 1])} = ${fmtN(R.fila2[k])}, y se escribe debajo del siguiente coeficiente.`;
      else out.textContent = `Suma: ${fmtN(p[k])} + ${fmtN(R.fila2[k])} = ${fmtN(R.fila3[k])}.`;
      if (paso === max) out.innerHTML = `Cociente: <strong>${poli(R.cociente)}</strong> · Resto: <strong>${fmtN(R.resto)}</strong>. Comprobación con el teorema del resto: P(${fmtN(a)}) = ${fmtN(R.Pa)} ${R.Pa === R.resto ? '<span class="ok">✔ coincide</span>' : ''}${R.resto === 0 ? ` · Como el resto es 0, (x ${a < 0 ? '+ ' + fmtN(-a) : '− ' + fmtN(a)}) es un factor.` : ''}`;
    };
    el.querySelector('.sig').onclick = () => { paso++; pintar(); };
    el.querySelector('.todo').onclick = () => { paso = 99; pintar(); };
    el.querySelector('.ini').onclick = () => { paso = 0; pintar(); };
    el.querySelectorAll('input').forEach(i => i.addEventListener('input', () => { paso = 0; pintar(); }));
    pintar();
  };

  // Sumas parciales de una progresión geométrica frente a S∞
  W.serie = (el, cfg) => {
    const n = cfg.n || 12;
    el.innerHTML = `<p class="w-tit">Sumas parciales de a₁ + a₁R + a₁R² + ⋯</p>
<div class="w-ctl"><label>a₁ = <input type="number" class="a1" value="${cfg.a1 ?? 0.9}" step="0.1"></label><label>R = <input type="range" class="R" min="-1.5" max="1.5" step="0.05" value="${cfg.R ?? 0.1}"><output class="Rv"></output></label></div>
<svg viewBox="0 0 640 230" role="img" aria-label="Barras con las sumas parciales"></svg><p class="w-out" aria-live="polite"></p>`;
    const svg = el.querySelector('svg'), out = el.querySelector('.w-out');
    const pintar = () => {
      const a1 = parseFloat(el.querySelector('.a1').value) || 0, R = parseFloat(el.querySelector('.R').value);
      el.querySelector('.Rv').textContent = fmtN(R, 2);
      const S = []; let s = 0, t = a1; for (let k = 0; k < n; k++) { s += t; S.push(s); t *= R; }
      const conv = Math.abs(R) < 1, Sinf = conv ? a1 / (1 - R) : null;
      const vals = S.concat(conv ? [Sinf] : []), M = Math.max(1e-9, ...vals.map(Math.abs));
      const y0 = Math.min(...vals) < 0 ? 115 : 200, esc = (Math.min(...vals) < 0 ? 100 : 180) / M;
      const bw = 560 / n;
      let g = `<line x1="40" y1="${y0}" x2="620" y2="${y0}" style="stroke:var(--ink-2)"/>`;
      S.forEach((v, k) => { const x = 50 + k * bw, hgt = v * esc; g += `<rect x="${x}" y="${hgt >= 0 ? y0 - hgt : y0}" width="${bw * 0.7}" height="${Math.abs(hgt)}" rx="2" style="fill:var(--c-p);opacity:${0.45 + 0.5 * (k + 1) / n}"/><text x="${x + bw * 0.35}" y="${y0 + 16}" text-anchor="middle" style="font-size:11px;fill:var(--ink-2)">S${k + 1}</text>`; });
      if (conv) g += `<line x1="40" y1="${y0 - Sinf * esc}" x2="620" y2="${y0 - Sinf * esc}" style="stroke:var(--c-n);stroke-width:2;stroke-dasharray:6 4"/><text x="44" y="${y0 - Sinf * esc - 6}" style="font-size:12px;fill:var(--c-n);font-weight:700">S∞ = ${fmtN(Sinf, 4)}</text>`;
      svg.innerHTML = g;
      out.innerHTML = conv ? `|R| < 1: las sumas se acercan a <strong>S∞ = a₁/(1 − R) = ${fmtN(a1, 3)}/${fmtN(1 - R, 3)} = ${fmtN(Sinf, 4)}</strong>. S${n} = ${fmtN(S[n - 1], 4)}.`
        : `|R| ≥ 1: las sumas ${R === 1 ? 'crecen sin parar' : R <= -1 ? 'oscilan cada vez más (o sin acercarse a nada)' : 'crecen sin límite'}. <strong>La serie no converge</strong> y no hay S∞.`;
    };
    el.querySelectorAll('input').forEach(i => i.addEventListener('input', pintar));
    pintar();
  };

  // Fractales: Koch y Sierpinski, iteración a iteración, con su tabla
  W.fractal = (el, cfg) => {
    const tipo = cfg.tipo || 'koch', L = cfg.lado || 81, A0 = Math.sqrt(3) / 4 * L * L;
    el.innerHTML = `<p class="w-tit">${tipo === 'koch' ? 'Copo de nieve de Koch' : 'Triángulo de Sierpinski'} · lado inicial ${L} cm</p>
<div class="w-ctl chips">${[0, 1, 2, 3, 4].map(k => `<button type="button" class="btn" data-k="${k}" aria-pressed="${k === 0}">Iteración ${k}</button>`).join('')}</div>
<svg viewBox="0 0 400 360" role="img" aria-label="Dibujo del fractal"></svg><div class="table-wrap"><table></table></div><p class="w-out"></p>`;
    const svg = el.querySelector('svg'), tab = el.querySelector('table'), out = el.querySelector('.w-out');
    const P0 = [[60, 270], [340, 270], [200, 270 - 280 * Math.sqrt(3) / 2]];
    const koch = (pts, k) => { for (let it = 0; it < k; it++) { const nu = []; for (let i = 0; i < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length], dx = (x2 - x1) / 3, dy = (y2 - y1) / 3; const a = [x1 + dx, y1 + dy], b = [x1 + 2 * dx, y1 + 2 * dy]; const c = [a[0] + dx * 0.5 + dy * Math.sqrt(3) / 2, a[1] + dy * 0.5 - dx * Math.sqrt(3) / 2]; nu.push([x1, y1], a, c, b); } pts = nu; } return pts; };
    const sier = (tri, k) => k === 0 ? [tri] : (() => { const [a, b, c] = tri, m = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; return [...sier([a, m(a, b), m(a, c)], k - 1), ...sier([m(a, b), b, m(b, c)], k - 1), ...sier([m(a, c), m(b, c), c], k - 1)]; })();
    const pintar = k => {
      el.querySelectorAll('[data-k]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.k === k));
      if (tipo === 'koch') {
        const P = koch(P0.map(p => [p[0], p[1] - 0]), k);
        svg.innerHTML = `<polygon points="${P.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" style="fill:color-mix(in srgb,var(--c-p) 14%,transparent);stroke:var(--c-p);stroke-width:1.6"/>`;
        tab.innerHTML = `<thead><tr><th>Iteración</th><th class="num">Lado (cm)</th><th class="num">Nº de lados</th><th class="num">Perímetro (cm)</th><th class="num">Área (cm²)</th></tr></thead><tbody>${[0, 1, 2, 3, 4].map(j => `<tr${j === k ? ' class="base"' : ''}><td>${j}</td><td class="num">${fmtN(L / 3 ** j)}</td><td class="num">${3 * 4 ** j}</td><td class="num">${fmtN(3 * L * (4 / 3) ** j)}</td><td class="num">${fmtN(A0 * (8 / 5 - 3 / 5 * (4 / 9) ** j))}</td></tr>`).join('')}</tbody>`;
        out.innerHTML = `El lado se divide entre 3 y el número de lados se multiplica por 4: el perímetro se multiplica por <strong>4/3 &gt; 1</strong> y crece sin límite. El área solo suma triángulos cada vez más pequeños (razón 4/9) y se acerca a <strong>8/5 del triángulo inicial ≈ ${fmtN(A0 * 8 / 5)} cm²</strong>.`;
      } else {
        const T = sier(P0, k);
        svg.innerHTML = `<polygon points="${P0.map(p => p.join(',')).join(' ')}" style="fill:none;stroke:var(--ink-2);stroke-width:1"/>` + T.map(t => `<polygon points="${t.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" style="fill:var(--c-n);opacity:.8"/>`).join('');
        tab.innerHTML = `<thead><tr><th>Iteración</th><th class="num">Triángulos</th><th class="num">Lado (cm)</th><th class="num">Área de cada uno (cm²)</th><th class="num">Área total (cm²)</th></tr></thead><tbody>${[0, 1, 2, 3, 4].map(j => `<tr${j === k ? ' class="base"' : ''}><td>${j}</td><td class="num">${3 ** j}</td><td class="num">${fmtN(L / 2 ** j)}</td><td class="num">${fmtN(A0 / 4 ** j)}</td><td class="num">${fmtN(A0 * (3 / 4) ** j)}</td></tr>`).join('')}</tbody>`;
        out.innerHTML = `Cada triángulo se cambia por 3 de lado la mitad (área 1/4): el área total se multiplica por <strong>3/4</strong> en cada iteración, A = A₀·(3/4)ⁿ, y tiende a 0.`;
      }
    };
    el.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => pintar(+b.dataset.k)));
    pintar(cfg.k || 0);
  };

  // Árbol de decisión: ¿qué método de demostración uso?
  W.metodo = (el, cfg) => {
    const L = cfg.links || {};
    const nodos = {
      q1: { p: '¿Sospechas que la afirmación es falsa?', si: 'contra', no: 'q2' },
      q2: { p: '¿Dice «para todo n ∈ ℤ⁺» con una suma, una divisibilidad o una desigualdad que depende de n?', si: 'ind', no: 'q3' },
      q3: { p: '¿Dice que algo no existe, que no puede pasar o que un número es irracional?', si: 'contrad', no: 'dir' },
      contra: { r: 'Contraejemplo', t: 'Busca un solo caso que la incumpla y compruébalo. Prueba primero los valores «raros»: 0, 1, 2, negativos, decimales.', l: L.contraejemplo },
      ind: { r: 'Inducción', t: 'Caso base, hipótesis para k = n, paso a k = n + 1 y conclusión.', l: L.induccion },
      contrad: { r: 'Contradicción (reducción al absurdo)', t: 'Supón lo contrario y opera hasta llegar a algo imposible: 1 par, una fracción que no es irreducible, un múltiplo de 6 igual a 1…', l: L.contradiccion },
      dir: { r: 'Directa', t: 'Traduce a álgebra (par = 2k, impar = 2m + 1, «x divide a y» = y = x·a), opera y llega a la forma que se pide.', l: L.directa },
    };
    let camino = [];
    const pintar = id => {
      const n = nodos[id];
      const hist = camino.map(([q, r]) => `${nodos[q].p} <strong>${r}</strong>`).join('<br>');
      el.innerHTML = `<p class="w-tit">¿Qué método uso?</p><div class="arbol">${hist ? `<p class="camino">${hist}</p>` : ''}${n.p ? `<p class="preg">${n.p}</p><div class="w-ctl"><button type="button" class="btn primary" data-r="si">Sí</button><button type="button" class="btn" data-r="no">No</button></div>`
        : `<div class="res"><strong>${n.r}.</strong> ${n.t}${n.l ? ` <a href="${n.l}">Ver el apartado →</a>` : ''}</div><div class="w-ctl"><button type="button" class="btn otra">Probar con otra afirmación</button></div>`}</div>`;
      el.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { camino.push([id, b.dataset.r === 'si' ? 'Sí' : 'No']); pintar(n[b.dataset.r]); });
      const o = el.querySelector('.otra'); if (o) o.onclick = () => { camino = []; pintar('q1'); };
    };
    pintar('q1');
  };

  // Buscador de contraejemplos
  W.contraejemplo = (el, cfg) => {
    const ids = cfg.ids || [cfg.id || 'n2div4'];
    el.innerHTML = `<p class="w-tit">Buscador de contraejemplos</p>${ids.length > 1 ? `<div class="w-ctl chips">${ids.map((i, k) => `<button type="button" class="btn" data-i="${i}" aria-pressed="${k === 0}">${contraejemplos[i].titulo}</button>`).join('')}</div>` : ''}
<p class="w-out af"></p><div class="w-ctl"><button type="button" class="btn primary prueba">Probar valores</button></div><div class="table-wrap"><table hidden></table></div><p class="w-msg res" aria-live="polite"></p>`;
    let id = ids[0];
    const t = el.querySelector('table'), res = el.querySelector('.res');
    const preparar = () => { el.querySelector('.af').innerHTML = `Afirmación: <strong>${contraejemplos[id].titulo}</strong>`; t.hidden = true; res.textContent = ''; };
    el.querySelector('.prueba').onclick = () => {
      const C = contraejemplos[id], filas = C.valores.map(C.fila), k = filas.findIndex(f => f.falla);
      t.hidden = false;
      t.innerHTML = `<thead><tr>${C.cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${filas.map((f, j) => `<tr${j === k ? ' class="marca"' : ''}>${f.c.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;
      res.innerHTML = k >= 0 ? `<span class="mal">Contraejemplo:</span> el caso marcado cumple la hipótesis y no la conclusión. Basta uno para que la afirmación sea falsa.` : 'No sale ningún contraejemplo en estos valores, pero eso no demuestra que sea cierta.';
    };
    el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { id = b.dataset.i; el.querySelectorAll('[data-i]').forEach(x => x.setAttribute('aria-pressed', x === b)); preparar(); });
    preparar();
  };

  // Cuadro resumen de recuento (D22) hecho interactivo
  W.cuadro = (el, cfg) => {
    const nodos = {
      todos: { p: '¿Entran todos los elementos en cada ordenación?', si: 'rep', no: 'orden' },
      rep: { p: '¿Hay elementos repetidos (letras iguales, bolas del mismo color…)?', si: 'PR', no: 'P' },
      orden: { p: '¿Importa el orden? (¿es distinto AB que BA?)', si: 'repite', no: 'C' },
      repite: { p: '¿Se puede repetir un elemento?', si: 'VR', no: 'V' },
      P: { r: 'Permutaciones', f: 'Pₙ = n!', e: '5 libros en una estantería: 5! = 120' },
      PR: { r: 'Permutaciones con repetición', f: 'PRₙ^(a, b, …) = n!/(a!·b!·…)', e: 'HORROR: 6!/(1!·2!·3!) = 60' },
      V: { r: 'Variaciones', f: 'V(n, r) = n!/(n − r)!', e: '3 alumnos en 5 sillas: 5·4·3 = 60' },
      VR: { r: 'Variaciones con repetición', f: 'VR(n, k) = nᵏ', e: 'Lanzar una moneda 5 veces: 2⁵ = 32' },
      C: { r: 'Combinaciones', f: 'C(n, r) = n!/(r!·(n − r)!)', e: 'Grupos de 2 entre 5 alumnos: 10' },
    };
    let camino = [];
    const pintar = id => {
      const n = nodos[id];
      const hist = camino.map(([q, r]) => `${nodos[q].p} <strong>${r}</strong>`).join('<br>');
      el.innerHTML = `<p class="w-tit">¿Qué fórmula uso? (el cuadro resumen de la diapositiva 22)</p><div class="arbol">${hist ? `<p class="camino">${hist}</p>` : ''}${n.p ? `<p class="preg">${n.p}</p><div class="w-ctl"><button type="button" class="btn primary" data-r="si">Sí</button><button type="button" class="btn" data-r="no">No</button></div>`
        : `<div class="res"><strong>${n.r}</strong>: <span class="mono">${n.f}</span><br><small>Ejemplo: ${n.e}</small></div><div class="w-ctl"><button type="button" class="btn otra">Otro problema</button></div>`}</div>`;
      el.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { camino.push([id, b.dataset.r === 'si' ? 'Sí' : 'No']); pintar(n[b.dataset.r]); });
      const o = el.querySelector('.otra'); if (o) o.onclick = () => { camino = []; pintar('todos'); };
    };
    pintar('todos');
  };

  // Enumerador: lista todas las ordenaciones o grupos de un caso pequeño
  W.enumerar = (el, cfg) => {
    const tipo = cfg.tipo || 'C', E = cfg.elementos || (cfg.palabra ? cfg.palabra.split('') : ['A', 'B', 'C', 'D', 'E']), r = cfg.r || E.length, sep = cfg.sep ?? (E.every(x => x.length === 1) ? '' : '-');
    const lista = (() => {
      const out = new Set();
      const rec = (pref, usados) => {
        if (pref.length === r) { const k = tipo === 'C' ? pref.slice().sort().join(sep) : pref.join(sep); out.add(k); return; }
        E.forEach((x, i) => { if (tipo !== 'VR' && usados.includes(i)) return; if (tipo === 'C' && usados.length && i < usados[usados.length - 1]) return; rec([...pref, x], [...usados, i]); });
      };
      rec([], []);
      return [...out];
    })();
    const formula = { P: `P${E.length} = ${E.length}!`, PR: 'n!/(repeticiones)', V: `V(${E.length}, ${r})`, VR: `VR(${E.length}, ${r}) = ${E.length}^${r}`, C: `C(${E.length}, ${r})` }[tipo];
    el.innerHTML = `<p class="w-tit">${cfg.titulo || 'Contar a mano, para comprobar la fórmula'}</p><p class="w-msg">Elementos: ${E.join(', ')}${tipo !== 'P' && tipo !== 'PR' ? ` · se eligen ${r}` : ''}</p>
<div class="w-ctl"><button type="button" class="btn primary ver">Listarlos todos</button></div><div class="lista-enum" hidden></div><p class="w-out" aria-live="polite"></p>`;
    el.querySelector('.ver').onclick = () => {
      const box = el.querySelector('.lista-enum'); box.hidden = false;
      box.innerHTML = lista.slice(0, 400).map(x => `<span>${x}</span>`).join('') + (lista.length > 400 ? '<span>…</span>' : '');
      el.querySelector('.w-out').innerHTML = `Hay <strong>${lista.length}</strong> ${tipo === 'C' ? 'grupos' : 'ordenaciones'} distintos, lo mismo que da la fórmula (${formula}).`;
    };
  };

  // Triángulo de Pascal: al pulsar una fila sale el desarrollo
  W.pascal = (el, cfg) => {
    const N = cfg.filas || 10, a = cfg.a || 'a', b = cfg.b || 'b';
    el.innerHTML = `<p class="w-tit">Triángulo de Pascal · pulsa una fila</p><div class="pascal">${Array.from({ length: N + 1 }, (_, n) => `<button type="button" class="fila" data-n="${n}" aria-pressed="false" aria-label="Fila ${n}">${Array.from({ length: n + 1 }, (_, k) => `<span>${binom(n, k)}</span>`).join('')}</button>`).join('')}</div><p class="w-out" aria-live="polite"></p>`;
    const out = el.querySelector('.w-out');
    const term = (c, x, e) => e === 0 ? '' : e === 1 ? x : `${x}${sup(e)}`;
    const pintar = n => {
      el.querySelectorAll('.fila').forEach(f => f.setAttribute('aria-pressed', +f.dataset.n === n));
      const ts = Array.from({ length: n + 1 }, (_, k) => { const c = binom(n, k), v = term(1, a, n - k) + term(1, b, k); return (c === 1n && v ? '' : String(c)) + v || '1'; });
      out.innerHTML = `(${a} + ${b})${sup(n)} = ${ts.join(' + ')}<br><small>Fila ${n}: cada número es la suma de los dos que tiene encima; los exponentes de ${a} bajan de ${n} a 0 y los de ${b} suben de 0 a ${n}.</small>`;
    };
    el.querySelectorAll('.fila').forEach(f => f.onclick = () => pintar(+f.dataset.n));
    pintar(cfg.n ?? 4);
  };

  // Buscador del término general de (ca·x^ea + cb·x^eb)^n
  W.termino = (el, cfg) => {
    const v = (k, d) => cfg[k] ?? d;
    el.innerHTML = `<p class="w-tit">Buscador del término general</p>
<div class="w-ctl"><span>(</span><label><input type="text" class="ca" value="${v('ca', '1')}" aria-label="Coeficiente del primer término" style="width:4em"></label><span>·x^</span><label><input type="number" class="ea" value="${v('ea', 1)}" aria-label="Exponente de x en el primer término" style="width:4.2em"></label><span>+</span><label><input type="text" class="cb" value="${v('cb', '1')}" aria-label="Coeficiente del segundo término" style="width:4em"></label><span>·x^</span><label><input type="number" class="eb" value="${v('eb', -1)}" aria-label="Exponente de x en el segundo término" style="width:4.2em"></label><span>)^</span><label><input type="number" class="n" value="${v('n', 9)}" min="1" max="40" aria-label="Exponente n" style="width:4.2em"></label></div>
<div class="w-ctl"><label>Potencia de x que busco: <input type="number" class="k" value="${v('k', -1)}"></label></div>
<div class="w-out" aria-live="polite"></div>`;
    const out = el.querySelector('.w-out');
    const pintar = () => {
      const q = c => el.querySelector('.' + c).value, ca = leeF(q('ca')), cb = leeF(q('cb')), ea = parseInt(q('ea'), 10), eb = parseInt(q('eb'), 10), n = parseInt(q('n'), 10), k = parseInt(q('k'), 10);
      if (!ca || !cb || [ea, eb, n, k].some(Number.isNaN) || n < 1) { out.textContent = 'Escribe coeficientes enteros o fracciones (1/2, −3) y exponentes enteros.'; return; }
      const xa = ea === 0 ? '' : ea === 1 ? 'x' : `x${sup(ea)}`, xb = eb === 0 ? '' : eb === 1 ? 'x' : `x${sup(eb)}`;
      const A = `${fmtF(ca)}${xa}`, Bt = `${fmtF(cb)}${xb}`;
      const R = termino(n, ca, ea, cb, eb, k);
      let s = `<p>1. Término general: T<sub>r+1</sub> = C(${n}, r) · (${A})<sup>${n}−r</sup> · (${Bt})<sup>r</sup></p>
<p>2. Potencia de x: ${ea}·(${n} − r) + ${eb === 0 ? '0' : eb}·r = ${ea * n} ${eb - ea >= 0 ? '+' : '−'} ${Math.abs(eb - ea)}r. Igualo a ${k}: r = ${fmtN((k - ea * n) / (eb - ea || 1), 3)}</p>`;
      if (R.todos) s += '<p>Todos los términos tienen esa potencia.</p>';
      else if (R.r === null) s += `<p class="mal">r no es un entero entre 0 y ${n}: <strong>no hay término con x${sup(k)}</strong>, su coeficiente es 0.</p>`;
      else s += `<p>3. Coeficiente: C(${n}, ${R.r}) · (${fmtF(ca)})<sup>${n - R.r}</sup> · (${fmtF(cb)})<sup>${R.r}</sup> = ${binom(n, R.r)} · ${fmtF(pot(ca, n - R.r))} · ${fmtF(pot(cb, R.r))} = <strong>${fmtF(R.c)}</strong></p><p class="w-msg">Es el término número ${R.r + 1} (T<sub>${R.r + 1}</sub>), no el ${R.r}.</p>`;
      out.innerHTML = s;
    };
    el.querySelectorAll('input').forEach(i => i.addEventListener('input', pintar));
    pintar();
  };

  // Binomio generalizado: (1 + x)^α frente a la serie cortada
  W.generalizado = (el, cfg) => {
    const alfas = cfg.alfas || ['-3', '-1', '1/2', '-1/2', '1/3'];
    el.innerHTML = `<p class="w-tit">(1 + x)<sup>α</sup> frente a su serie cortada en N términos</p>
<div class="w-ctl chips">${alfas.map((a, i) => `<button type="button" class="btn" data-a="${a}" aria-pressed="${i === 0}">α = ${a.replace('-', '−')}</button>`).join('')}</div>
<div class="w-ctl"><label>Términos N = <input type="range" class="N" min="1" max="10" value="${cfg.N || 3}"><output class="Nv"></output></label></div>
<svg viewBox="0 0 640 300" role="img" aria-label="Gráfica de la función y de la serie"></svg><p class="w-out" aria-live="polite"></p>`;
    const svg = el.querySelector('svg'), out = el.querySelector('.w-out');
    let alfa = alfas[0];
    const X = x => 40 + (x + 1.6) / 3.2 * 580, Y = y => 150 - y * 40;
    const pintar = () => {
      const af = leeF(alfa), a = Number(af.p) / Number(af.q), N = +el.querySelector('.N').value;
      el.querySelector('.Nv').textContent = N;
      const coef = []; let c = 1; for (let k = 0; k < N; k++) { coef.push(c); c = c * (a - k) / (k + 1); }
      const f = x => (1 + x <= 0 && !Number.isInteger(a)) || (1 + x === 0 && a < 0) ? NaN : Math.pow(1 + x, a), s = x => coef.reduce((t, ck, k) => t + ck * x ** k, 0);
      const path = fn => { let d = '', pen = false; for (let i = 0; i <= 320; i++) { const x = -1.6 + 3.2 * i / 320, y = fn(x); if (!Number.isFinite(y) || Math.abs(y) > 3.7) { pen = false; continue; } d += `${pen ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(y).toFixed(1)}`; pen = true; } return d; };
      svg.innerHTML = `<rect x="${X(-1)}" y="0" width="${X(1) - X(-1)}" height="300" style="fill:color-mix(in srgb,var(--c-n) 8%,transparent)"/><text x="${X(0)}" y="292" text-anchor="middle" style="font-size:12px;fill:var(--c-n)">−1 &lt; x &lt; 1</text>
<line x1="40" y1="${Y(0)}" x2="620" y2="${Y(0)}" style="stroke:var(--ink-2)"/><line x1="${X(0)}" y1="0" x2="${X(0)}" y2="300" style="stroke:var(--ink-2)"/>
<path d="${path(f)}" style="fill:none;stroke:var(--c-p);stroke-width:2.6"/><path d="${path(s)}" style="fill:none;stroke:var(--c-v);stroke-width:2;stroke-dasharray:6 4"/>
<text x="48" y="20" style="font-size:13px;fill:var(--c-p);font-weight:700">(1 + x)^α</text><text x="48" y="38" style="font-size:13px;fill:var(--c-v);font-weight:700">serie con ${N} términos</text>`;
      const cs = coef.map((ck, k) => `${k === 0 ? '' : ck < 0 ? ' − ' : ' + '}${k === 0 ? fmtN(ck, 4) : Math.abs(Math.abs(ck) - 1) < 1e-12 ? '' : fmtN(Math.abs(ck), 4)}${k ? 'x' + (k > 1 ? sup(k) : '') : ''}`).join('');
      out.innerHTML = `(1 + x)<sup>${alfa.replace('-', '−')}</sup> ≈ ${cs}${Number.isInteger(a) && a >= 0 ? '' : ' + ⋯'}<br><small>Dentro de la franja verde (|x| &lt; 1), al añadir términos la serie se pega a la función; fuera, se separa por mucho que añadas.</small>`;
    };
    el.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { alfa = b.dataset.a; el.querySelectorAll('[data-a]').forEach(x => x.setAttribute('aria-pressed', x === b)); pintar(); });
    el.querySelector('.N').addEventListener('input', pintar);
    pintar();
  };

  const montar = () => {
    document.querySelectorAll('.guia[data-ej]').forEach(montarGuia);
    document.querySelectorAll('[data-estado]').forEach(montarEstado);
    document.querySelectorAll('.widget[data-w]').forEach(el => {
      const f = W[el.dataset.w]; if (!f) return;
      let cfg = {}; try { cfg = JSON.parse(el.dataset.cfg || '{}'); } catch (_) { /* configuración vacía */ }
      try { f(el, cfg); } catch (e) { el.innerHTML = `<p class="w-msg">No se ha podido cargar el simulador.</p>`; if (root.console) console.error(e); }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})(typeof window !== 'undefined' ? window : globalThis);
