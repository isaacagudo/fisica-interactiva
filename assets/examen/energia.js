/* Física interactiva · patrones de ejercicios del tema «Trabajo, potencia y energía» para el generador de exámenes.
   Cada patrón elige datos al azar con sentido físico (si no los tiene, devuelve null y se vuelve a sortear),
   escribe el enunciado y la solución paso a paso y, cuando hay simulador, su configuración con esos datos.
   Las cuestiones de teoría se añaden desde energia-cuestiones.js (generado a partir de los apuntes). */
(function (root) {
  'use strict';
  const X = root.FisicaExamen || (typeof require !== 'undefined' ? require('./generador.js') : null);
  const G = 9.8, rad = a => a * Math.PI / 180, deg = r => r * 180 / Math.PI;
  const sen = a => Math.sin(rad(a)), cos = a => Math.cos(rad(a)), tg = a => Math.tan(rad(a));
  // piezas de la solución (mismas clases que las páginas de soluciones)
  const eq = s => `<p class="eq"><strong>${s}</strong></p>`;
  const why = s => `<blockquote class="why"><p><strong>¿Por qué?</strong> ${s}</p></blockquote>`;
  const sub = s => `<p class="sub"><strong>${s}</strong></p>`;
  const P = s => `<p>${s}</p>`;
  const herr = s => `<p><strong>Qué herramienta usar.</strong> ${s}</p>`;
  const comp = s => `<p><strong>Comprobación.</strong> ${s}</p>`;
  const datos = s => `<p>Datos: ${s}.</p>`;
  const c1 = (x, f) => Math.abs(x) === 1 ? (x < 0 ? '−' : '') : f.d(x);   // coeficiente: 1·i se escribe i
  const vec = (x, y, f) => `${c1(x, f)}i ${y < 0 ? '−' : '+'} ${c1(Math.abs(y), f)}j`;
  const kmh = v => v / 3.6;
  const sd = (f, x) => x < 0 ? '(' + f.d(x) + ')' : f.d(x);   // dato con paréntesis si es negativo

  // ================================================================ 1 · Trabajo de una fuerza
  const trabajo = [
    {
      id: 'vectores', titulo: 'Trabajo con vectores',
      datos(r) {
        const k = r.pick([1, 1, 2, 5]), Fx = r.int(-8, 8) * k, Fy = r.int(-8, 8) * k;
        const Ax = r.int(-8, 8), Ay = r.int(-8, 8), Bx = r.int(-8, 8), By = r.int(-8, 8);
        if (!Fx || !Fy || Ax === Bx || Ay === By || Math.abs(Fx) > 40 || Math.abs(Fy) > 40) return null;
        return { Fx, Fy, Ax, Ay, Bx, By };
      },
      enunciado: (d, f) => `Una fuerza constante <strong>F = ${vec(d.Fx, d.Fy, f)} N</strong> actúa sobre un cuerpo que se desplaza desde el punto A(${f.d(d.Ax)}, ${f.d(d.Ay)}) m hasta el punto B(${f.d(d.Bx)}, ${f.d(d.By)}) m. Calcula: a) el trabajo realizado por la fuerza; b) el ángulo que forman la fuerza y el desplazamiento. ¿La fuerza ayuda o se opone al movimiento?`,
      solucion(d, f) {
        const dx = d.Bx - d.Ax, dy = d.By - d.Ay, W = d.Fx * dx + d.Fy * dy, Fm = Math.hypot(d.Fx, d.Fy), Dm = Math.hypot(dx, dy), c = W / (Fm * Dm), phi = deg(Math.acos(Math.max(-1, Math.min(1, c))));
        const pasos = herr('La fuerza y las posiciones vienen dadas con vectores: el trabajo es el producto escalar de la fuerza y el desplazamiento, W = F·Δr = Fx·Δx + Fy·Δy.') +
          sub('a) Trabajo') +
          eq(`Δr = (${f.d(d.Bx)} − ${sd(f, d.Ax)})·i + (${f.d(d.By)} − ${sd(f, d.Ay)})·j = ${vec(dx, dy, f)} m`) +
          why('El desplazamiento es «posición final menos posición inicial», componente a componente.') +
          eq(`W = Fx·Δx + Fy·Δy = ${sd(f, d.Fx)}·${sd(f, dx)} + ${sd(f, d.Fy)}·${sd(f, dy)} = ${f.d(d.Fx * dx)} + ${sd(f, d.Fy * dy)} = ${f.d(W)} J`) +
          why('Se multiplican las componentes y se suman: el resultado es un número, sin i ni j.') +
          sub('b) Ángulo entre F y Δr') +
          eq(`|F| = ${f.n(Fm)} N ; |Δr| = ${f.n(Dm)} m ; cos φ = W / (|F|·|Δr|) = ${f.n(c)} ⟹ φ = ${f.fx(phi, 1)}°`) +
          P(W > 0 ? 'φ es menor de 90°: el trabajo es positivo y la fuerza <strong>ayuda</strong> al movimiento.' : W < 0 ? 'φ es mayor de 90°: el trabajo es negativo y la fuerza <strong>se opone</strong> al movimiento.' : 'φ = 90°: la fuerza es perpendicular al desplazamiento y no trabaja.');
        return { resultado: `W = ${f.d(W)} J · φ = ${f.fx(phi, 1)}°`, pasos, val: { W, phi } };
      },
      sim: d => ({ widget: 'vectores', cfg: Object.assign({ controles: ['Fx', 'Fy', 'Bx', 'By'] }, d) }),
    },
    {
      id: 'polea', titulo: 'Subir una carga con una polea',
      datos: r => ({ m: r.step(20, 80, 5), h: r.int(5, 30), t: r.int(10, 60) }),
      enunciado: (d, f) => `Una persona sube con una polea una carga de ${f.d(d.m)} kg hasta una altura de ${f.d(d.h)} m, con velocidad constante, y tarda ${f.d(d.t)} s. Calcula: a) el trabajo que realiza la persona; b) el trabajo que realiza el peso; c) la potencia que desarrolla.`,
      solucion(d, f) {
        const W = d.m * G * d.h, Pw = W / d.t;
        const pasos = herr('Con velocidad constante, ΣF = 0: la persona tira con una fuerza igual al peso. Después, W = F·d·cos φ para cada fuerza y P = W/t.') +
          sub('a) Trabajo de la persona') + eq(`F = m·g = ${f.d(d.m)} · 9,8 = ${f.n(d.m * G)} N ; W = F·h = ${f.n(d.m * G)} · ${f.d(d.h)} = ${f.n(W)} J`) +
          why('La fuerza va hacia arriba y la carga sube: φ = 0°, cos 0° = 1.') +
          sub('b) Trabajo del peso') + eq(`W P = −m·g·h = −${f.n(W)} J`) +
          why('El peso va hacia abajo y la carga sube: φ = 180°. Es igual y de signo contrario al de la persona: el trabajo total es cero, como corresponde a ΔEc = 0.') +
          sub('c) Potencia') + eq(`P = W / t = ${f.n(W)} / ${f.d(d.t)} = ${f.n(Pw)} W`);
        return { resultado: `W persona = ${f.n(W)} J · W peso = −${f.n(W)} J · P = ${f.n(Pw)} W`, pasos, val: { W, P: Pw } };
      },
      sim: d => ({ widget: 'potencia', cfg: { m: d.m, n: 1, h: d.h, t: d.t, eta: 1, cuerpo: 'carga', controles: ['m', 'h', 't'] } }),
    },
    {
      id: 'angulo', titulo: 'Fuerza que forma un ángulo con el desplazamiento',
      datos(r) { const d = { m: r.int(5, 25), F: r.step(20, 80, 5), a: r.pick([20, 30, 37, 45, 53, 60]), s: r.int(5, 30) }; return d.F * sen(d.a) < d.m * G * 0.8 ? d : null; },
      enunciado: (d, f) => `Se arrastra una caja de ${f.d(d.m)} kg por un suelo horizontal tirando de una cuerda con una fuerza de ${f.d(d.F)} N que forma ${f.d(d.a)}° con la horizontal. La caja recorre ${f.d(d.s)} m. Calcula: a) el trabajo de la fuerza F; b) el trabajo del peso y el de la normal; c) el trabajo que haría F si se tirase en horizontal.`,
      solucion(d, f) {
        const W = d.F * d.s * cos(d.a), Wh = d.F * d.s;
        const pasos = herr('Fuerza constante y desplazamiento rectilíneo: W = F·Δs·cos φ, con φ el ángulo entre la fuerza y el desplazamiento.') +
          sub('a) Trabajo de F') + eq(`W F = F·Δs·cos ${f.d(d.a)}° = ${f.d(d.F)} · ${f.d(d.s)} · ${f.n(cos(d.a))} = ${f.n(W)} J`) +
          why('Solo trabaja la componente de F a lo largo del desplazamiento, F·cos α. La componente vertical no trabaja.') +
          sub('b) Peso y normal') + eq('W P = W N = 0 J') + why('Son verticales y el desplazamiento es horizontal: φ = 90°, cos 90° = 0.') +
          sub('c) Tirando en horizontal') + eq(`W = F·Δs = ${f.d(d.F)} · ${f.d(d.s)} = ${f.n(Wh)} J`) +
          P(`Con la cuerda inclinada se aprovecha el ${f.fx(100 * cos(d.a), 0)} % de la fuerza para avanzar.`);
        return { resultado: `W F = ${f.n(W)} J · W P = W N = 0 · en horizontal, ${f.n(Wh)} J`, pasos, val: { W } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'arrastre', m: d.m, F: d.F, alpha: d.a, mu: 0, v0: 0, hasta: 'd', d: d.s, controles: ['F', 'alpha', 'd'] } }),
    },
    {
      id: 'rampa-lisa', titulo: 'Rampa lisa frente a subir en vertical',
      datos(r) { const L = r.int(2, 8), h = r.step(0.5, 3, 0.1); return h >= 0.2 * L && h <= 0.6 * L ? { m: r.int(10, 60), h, L } : null; },
      enunciado: (d, f) => `Para subir una caja de ${f.d(d.m)} kg a una altura de ${f.d(d.h)} m se empuja, con velocidad constante y sin rozamiento, a lo largo de una rampa de ${f.d(d.L)} m. Calcula: a) la fuerza paralela a la rampa necesaria; b) el trabajo de esa fuerza y el del peso; c) la fuerza y el trabajo si se subiera en vertical. ¿Qué ventaja tiene la rampa?`,
      solucion(d, f) {
        const sa = d.h / d.L, F = d.m * G * sa, W = F * d.L, Fv = d.m * G;
        const pasos = herr('Velocidad constante ⟹ ΣF = 0 a lo largo de la rampa (dinámica). El trabajo, con W = F·d.') +
          eq(`sen α = h / L = ${f.d(d.h)} / ${f.d(d.L)} = ${f.n(sa)}`) +
          sub('a) Fuerza') + eq(`F = m·g·sen α = ${f.d(d.m)} · 9,8 · ${f.n(sa)} = ${f.n(F)} N`) +
          why('Sin rozamiento, a lo largo de la rampa solo están la fuerza que hacemos y la componente del peso Px = m·g·sen α.') +
          sub('b) Trabajos') + eq(`W F = F·L = ${f.n(F)} · ${f.d(d.L)} = ${f.n(W)} J ; W P = −m·g·h = −${f.n(W)} J`) +
          sub('c) En vertical') + eq(`F = m·g = ${f.n(Fv)} N ; W = m·g·h = ${f.n(W)} J`) +
          P(`La rampa reduce la fuerza (${f.n(F)} N frente a ${f.n(Fv)} N), pero no el trabajo: hay que empujar a lo largo de más distancia.`);
        return { resultado: `F = ${f.n(F)} N · W = ${f.n(W)} J (igual que en vertical, con F = ${f.n(Fv)} N)`, pasos, val: { F, W } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'empuje', m: d.m, alpha: +deg(Math.asin(d.h / d.L)).toFixed(2), mu: 0, d: d.L, v: 0.5, sentido: 'sube', controles: ['m', 'alpha', 'd'] } }),
    },
  ];

  // ================================================================ 2 · Trabajo con rozamiento en un plano horizontal
  const rozamiento = [
    {
      id: 'horizontal', titulo: 'Fuerza horizontal con rozamiento',
      datos(r) { const m = r.int(2, 20), mu = r.step(0.1, 0.5, 0.05), F0 = Math.ceil(1.3 * mu * m * G / 5) * 5; return { m, mu, F: r.step(F0, F0 + 60, 5), s: r.int(4, 20) }; },
      enunciado: (d, f) => `Un bloque de ${f.d(d.m)} kg, inicialmente en reposo sobre un suelo horizontal, es arrastrado por una fuerza horizontal de ${f.d(d.F)} N. El coeficiente de rozamiento es ${f.d(d.mu)}. Cuando ha recorrido ${f.d(d.s)} m, calcula: a) el trabajo de cada una de las fuerzas que actúan sobre el bloque; b) su velocidad.`,
      solucion(d, f) {
        const N = d.m * G, Fr = d.mu * N, WF = d.F * d.s, Wr = -Fr * d.s, Wt = WF + Wr, v = Math.sqrt(2 * Wt / d.m), a = (d.F - Fr) / d.m;
        const pasos = herr('Trabajos de fuerzas constantes (W = F·d·cos φ) y, para la velocidad, el teorema de las fuerzas vivas: W total = ΔEc.') +
          sub('a) Trabajos') + eq(`N = m·g = ${f.n(N)} N ; Fr = μ·N = ${f.d(d.mu)} · ${f.n(N)} = ${f.n(Fr)} N`) +
          why('En horizontal y con F horizontal, la normal equilibra al peso.') +
          eq(`W F = F·d = ${f.d(d.F)} · ${f.d(d.s)} = ${f.n(WF)} J`) + eq(`W roz = −Fr·d = −${f.n(Fr)} · ${f.d(d.s)} = ${f.n(Wr)} J`) +
          why('El rozamiento va contra el movimiento: φ = 180°.') + eq('W P = W N = 0 J') +
          sub('b) Velocidad') + eq(`W total = ${f.n(WF)} − ${f.n(-Wr)} = ${f.n(Wt)} J = ½·m·v² ⟹ v = √(2 · ${f.n(Wt)} / ${f.d(d.m)}) = ${f.n(v)} m/s`) +
          comp(`por dinámica, a = (F − Fr)/m = ${f.n(a)} m/s² y v = √(2·a·d) = ${f.n(Math.sqrt(2 * a * d.s))} m/s.`);
        return { resultado: `W F = ${f.n(WF)} J · W roz = ${f.n(Wr)} J · W P = W N = 0 · v = ${f.n(v)} m/s`, pasos, val: { v, WF, Wr } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'arrastre', m: d.m, F: d.F, alpha: 0, mu: d.mu, v0: 0, hasta: 'd', d: d.s, controles: ['m', 'F', 'mu', 'd'] } }),
    },
    {
      id: 'oblicua', titulo: 'Fuerza oblicua con rozamiento',
      datos(r) {
        const m = r.int(3, 15), a = r.pick([20, 25, 30, 35, 37, 40]), mu = r.step(0.1, 0.4, 0.05), F = r.step(10, 120, 5), t = r.int(3, 10);
        const N = m * G - F * sen(a); if (N < 0.2 * m * G) return null;
        if (F * cos(a) < 1.2 * mu * N) return null;
        return { m, a, mu, F, t };
      },
      enunciado: (d, f) => `Un cuerpo de ${f.d(d.m)} kg, en reposo sobre un plano horizontal, se arrastra con una fuerza de ${f.d(d.F)} N que forma ${f.d(d.a)}° con la horizontal, tirando hacia arriba. El coeficiente de rozamiento es ${f.d(d.mu)}. Calcula: a) la aceleración; b) la velocidad y el desplazamiento a los ${f.d(d.t)} s; c) el trabajo de la fuerza de rozamiento en ese tiempo.`,
      solucion(d, f) {
        const Fx = d.F * cos(d.a), Fy = d.F * sen(d.a), N = d.m * G - Fy, Fr = d.mu * N, a = (Fx - Fr) / d.m, v = a * d.t, x = 0.5 * a * d.t * d.t, Wr = -Fr * x;
        const pasos = herr('Primero el diagrama y la normal (eje vertical), después la aceleración (eje horizontal, 2.ª ley de Newton) y el MRUA; el trabajo del rozamiento con W = −Fr·Δx.') +
          eq(`Fx = F·cos ${f.d(d.a)}° = ${f.n(Fx)} N ; Fy = F·sen ${f.d(d.a)}° = ${f.n(Fy)} N`) +
          eq(`N + Fy − m·g = 0 ⟹ N = ${f.n(d.m * G)} − ${f.n(Fy)} = ${f.n(N)} N`) +
          why('La cuerda tira un poco hacia arriba y aligera el cuerpo: N es menor que el peso.') +
          eq(`Fr = μ·N = ${f.d(d.mu)} · ${f.n(N)} = ${f.n(Fr)} N`) +
          sub('a) Aceleración') + eq(`a = (Fx − Fr) / m = (${f.n(Fx)} − ${f.n(Fr)}) / ${f.d(d.m)} = ${f.n(a)} m/s²`) +
          sub('b) Velocidad y desplazamiento') + eq(`v = a·t = ${f.n(v)} m/s ; Δx = ½·a·t² = ${f.n(x)} m`) +
          sub('c) Trabajo del rozamiento') + eq(`W roz = −Fr·Δx = −${f.n(Fr)} · ${f.n(x)} = ${f.n(Wr)} J`) +
          comp(`W F − |W roz| = ${f.n(Fx * x)} − ${f.n(-Wr)} = ${f.n(Fx * x + Wr)} J, que es ½·m·v² = ${f.n(0.5 * d.m * v * v)} J.`);
        return { resultado: `a = ${f.n(a)} m/s² · v = ${f.n(v)} m/s · Δx = ${f.n(x)} m · W roz = ${f.n(Wr)} J`, pasos, val: { a, v, x, Wr } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'arrastre', m: d.m, F: d.F, alpha: d.a, mu: d.mu, v0: 0, hasta: 't', t: d.t } }),
    },
    {
      id: 'abajo', titulo: 'Empujar hacia abajo con rozamiento',
      datos(r) {
        const m = r.int(5, 20), a = r.pick([20, 25, 30, 35, 40]), mu = r.step(0.1, 0.35, 0.05), s = r.int(3, 12);
        const den = cos(a) - 1.2 * mu * sen(a); if (den <= 0.2) return null;
        const F0 = Math.ceil(1.2 * mu * m * G / den / 5) * 5;
        return { m, a, mu, s, F: r.step(F0, F0 + 50, 5) };
      },
      enunciado: (d, f) => `Un bloque de ${f.d(d.m)} kg en reposo se empuja sobre un suelo horizontal con una fuerza de ${f.d(d.F)} N dirigida hacia abajo, formando ${f.d(d.a)}° con la horizontal. El coeficiente de rozamiento es ${f.d(d.mu)}. Cuando ha recorrido ${f.d(d.s)} m, calcula: a) la normal y la fuerza de rozamiento; b) el trabajo de cada fuerza; c) la velocidad del bloque.`,
      solucion(d, f) {
        const Fx = d.F * cos(d.a), Fy = d.F * sen(d.a), N = d.m * G + Fy, Fr = d.mu * N, WF = Fx * d.s, Wr = -Fr * d.s, v = Math.sqrt(2 * (WF + Wr) / d.m);
        const pasos = herr('Diagrama de fuerzas, la normal con el eje vertical, y el teorema de las fuerzas vivas para la velocidad.') +
          sub('a) Normal y rozamiento') + eq(`N − m·g − F·sen ${f.d(d.a)}° = 0 ⟹ N = ${f.n(d.m * G)} + ${f.n(Fy)} = ${f.n(N)} N`) +
          why('Al empujar hacia abajo se aprieta el bloque contra el suelo: N es mayor que el peso.') +
          eq(`Fr = μ·N = ${f.n(Fr)} N`) +
          sub('b) Trabajos') + eq(`W F = F·d·cos ${f.d(d.a)}° = ${f.n(WF)} J ; W roz = −Fr·d = ${f.n(Wr)} J ; W P = W N = 0`) +
          sub('c) Velocidad') + eq(`½·m·v² = ${f.n(WF + Wr)} J ⟹ v = ${f.n(v)} m/s`) +
          P(`Tirando hacia arriba con el mismo ángulo, N valdría ${f.n(d.m * G - Fy)} N y el rozamiento sería menor: tirar es más eficaz que empujar hacia abajo.`);
        return { resultado: `N = ${f.n(N)} N · Fr = ${f.n(Fr)} N · W F = ${f.n(WF)} J · W roz = ${f.n(Wr)} J · v = ${f.n(v)} m/s`, pasos, val: { N, v } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'arrastre', m: d.m, F: d.F, alpha: -d.a, mu: d.mu, v0: 0, hasta: 'd', d: d.s, controles: ['F', 'alpha', 'mu', 'd'] } }),
    },
    {
      id: 'vconst', titulo: 'Velocidad constante: calcular μ',
      datos(r) {
        const m = r.int(10, 50), a = r.pick([15, 20, 25, 30]), F = r.step(60, 200, 10), s = r.int(5, 30);
        const N = m * G - F * sen(a); if (N < 0.3 * m * G) return null;
        const mu = F * cos(a) / N; if (mu < 0.1 || mu > 0.6) return null;
        return { m, a, F, s };
      },
      enunciado: (d, f) => `Se arrastra un trineo de ${f.d(d.m)} kg por un suelo horizontal tirando de una cuerda que forma ${f.d(d.a)}° con la horizontal con una fuerza de ${f.d(d.F)} N. El trineo avanza con velocidad constante. Calcula: a) el coeficiente de rozamiento; b) el trabajo de cada fuerza en ${f.d(d.s)} m; c) el trabajo total. Interprétalo.`,
      solucion(d, f) {
        const N = d.m * G - d.F * sen(d.a), Fr = d.F * cos(d.a), mu = Fr / N, WF = Fr * d.s;
        const pasos = herr('Velocidad constante ⟹ aceleración nula ⟹ ΣF = 0 en los dos ejes.') +
          sub('a) Coeficiente de rozamiento') + eq(`N = m·g − F·sen ${f.d(d.a)}° = ${f.n(N)} N ; Fr = F·cos ${f.d(d.a)}° = ${f.n(Fr)} N`) +
          why('En el eje horizontal la fuerza que tira y el rozamiento se compensan exactamente.') +
          eq(`μ = Fr / N = ${f.n(Fr)} / ${f.n(N)} = ${f.n(mu)}`) +
          sub('b) Trabajos') + eq(`W F = F·d·cos ${f.d(d.a)}° = ${f.n(WF)} J ; W roz = −Fr·d = −${f.n(WF)} J ; W P = W N = 0`) +
          sub('c) Trabajo total') + eq('W total = 0 J = ΔEc') + P('La velocidad no cambia: todo el trabajo de F se convierte en calor por el rozamiento.');
        return { resultado: `μ = ${f.n(mu)} · W F = ${f.n(WF)} J · W roz = −${f.n(WF)} J · W total = 0`, pasos, val: { mu, WF } };
      },
      sim(d) { const N = d.m * G - d.F * sen(d.a); return { widget: 'bloque', cfg: { escenario: 'arrastre', m: d.m, F: d.F, alpha: d.a, mu: +(d.F * cos(d.a) / N).toFixed(5), v0: 1.5, hasta: 'd', d: d.s, controles: ['F', 'alpha', 'mu', 'd'] } }; },
    },
    {
      id: 'soltar', titulo: 'Empujar y soltar: distancia hasta pararse',
      datos(r) { const m = r.int(2, 10), mu = r.step(0.15, 0.4, 0.05), F0 = Math.ceil(1.4 * mu * m * G / 5) * 5; return { m, mu, F: r.step(F0, F0 + 30, 5), s: r.int(2, 8) }; },
      enunciado: (d, f) => `Un bloque de ${f.d(d.m)} kg en reposo sobre un suelo horizontal se empuja con una fuerza horizontal de ${f.d(d.F)} N durante ${f.d(d.s)} m. Después se deja de empujar y sigue deslizando hasta pararse. El coeficiente de rozamiento es ${f.d(d.mu)}. Calcula: a) la velocidad cuando se deja de empujar; b) la distancia que recorre después; c) el trabajo total del rozamiento.`,
      solucion(d, f) {
        const Fr = d.mu * d.m * G, Ec = (d.F - Fr) * d.s, v = Math.sqrt(2 * Ec / d.m), d2 = Ec / Fr, Wr = -d.F * d.s;
        const pasos = herr('Teorema de las fuerzas vivas en cada tramo. Con F horizontal, N = m·g en los dos.') +
          eq(`Fr = μ·m·g = ${f.n(Fr)} N`) +
          sub('a) Primer tramo') + eq(`(F − Fr)·d = ½·m·v² ⟹ v = √(2 · ${f.n(Ec)} / ${f.d(d.m)}) = ${f.n(v)} m/s`) +
          sub('b) Segundo tramo') + eq(`−Fr·x = 0 − ½·m·v² ⟹ x = ${f.n(Ec)} / ${f.n(Fr)} = ${f.n(d2)} m`) +
          sub('c) Rozamiento en todo el recorrido') + eq(`W roz = −Fr·(d + x) = ${f.n(-Fr * (d.s + d2))} J = −W F`) +
          why('Empieza y acaba parado: ΔEc = 0, así que el rozamiento se lleva todo el trabajo de F.');
        return { resultado: `v = ${f.n(v)} m/s · ${f.n(d2)} m más · W roz = ${f.n(Wr)} J`, pasos, val: { v, d2 } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'arrastre', m: d.m, F: d.F, alpha: 0, mu: d.mu, v0: 0, hasta: 'parar', dF: d.s, controles: ['m', 'F', 'mu', 'dF'] } }),
    },
  ];

  // ================================================================ 3 · Energía cinética
  const cinetica = [
    {
      id: 'frenada', titulo: 'Coche que frena',
      datos(r) {
        const m = r.step(800, 1600, 50), v0 = r.pick([72, 90, 108, 126]), v1 = r.pick([0, 18, 36, 54]); if (v1 > v0 - 36) return null;
        const a = r.int(3, 8), s = Math.round((kmh(v0) ** 2 - kmh(v1) ** 2) / (2 * a));
        return { m, v0, v1, s };
      },
      enunciado: (d, f) => `Un coche de ${f.d(d.m)} kg que circula a ${f.d(d.v0)} km/h frena ${d.v1 ? `hasta ${f.d(d.v1)} km/h` : 'hasta pararse'} en una distancia de ${f.d(d.s)} m. Calcula: a) el trabajo realizado por la fuerza de frenado; b) el valor de esa fuerza, supuesta constante; c) el tiempo que tarda en frenar.`,
      solucion(d, f) {
        const u0 = kmh(d.v0), u1 = kmh(d.v1), W = 0.5 * d.m * (u1 * u1 - u0 * u0), F = -W / d.s, a = F / d.m, t = (u0 - u1) / a;
        const pasos = herr('Se conocen las velocidades y la distancia: teorema de las fuerzas vivas, W total = ΔEc. En horizontal, el peso y la normal no trabajan.') +
          eq(`v₀ = ${f.d(d.v0)} / 3,6 = ${f.n(u0)} m/s ; v = ${f.n(u1)} m/s`) +
          sub('a) Trabajo de la fuerza de frenado') + eq(`W = ½·m·v² − ½·m·v₀² = ${f.n(0.5 * d.m * u1 * u1)} − ${f.n(0.5 * d.m * u0 * u0)} = ${f.n(W)} J`) +
          why('Es negativo: la fuerza de frenado quita energía cinética, que acaba como calor en los frenos.') +
          sub('b) Fuerza') + eq(`W = −F·d ⟹ F = ${f.n(-W)} / ${f.d(d.s)} = ${f.n(F)} N`) +
          sub('c) Tiempo') + eq(`a = F/m = ${f.n(a)} m/s² ; t = (v₀ − v)/a = ${f.n(t)} s`);
        return { resultado: `W = ${f.n(W)} J · F = ${f.n(F)} N · t = ${f.n(t)} s`, pasos, val: { W, F } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'frenada', m: d.m, v0kmh: d.v0, v1kmh: d.v1, d: d.s } }),
    },
    {
      id: 'bala', titulo: 'Bala que se incrusta',
      datos: r => ({ mg: r.pick([10, 15, 20, 25, 40, 50]), v0: r.step(200, 600, 50), p: r.step(2, 15, 0.5) }),
      enunciado: (d, f) => `Una bala de ${f.d(d.mg)} g que vuela horizontalmente a ${f.d(d.v0)} m/s choca contra un bloque de madera y penetra ${f.d(d.p)} cm. Calcula la fuerza media, supuesta constante, que ejerce la madera y el tiempo que tarda la bala en pararse.`,
      solucion(d, f) {
        const m = d.mg / 1000, p = d.p / 100, W = -0.5 * m * d.v0 * d.v0, F = -W / p, a = F / m, t = d.v0 / a;
        const pasos = herr('Teorema de las fuerzas vivas: la fuerza de la madera es la única que trabaja y se lleva toda la energía cinética.') +
          eq(`m = ${f.n(m)} kg ; p = ${f.n(p)} m`) +
          eq(`W = 0 − ½·m·v₀² = −½ · ${f.n(m)} · ${f.d(d.v0)}² = ${f.n(W)} J`) +
          eq(`W = −F·p ⟹ F = ${f.n(-W)} / ${f.n(p)} = ${f.n(F)} N`) +
          why('Hay que pasar a kg y a metros antes de sustituir.') +
          eq(`a = F/m = ${f.n(a)} m/s² ; t = v₀/a = ${f.n(t)} s`);
        return { resultado: `F = ${f.n(F)} N · t = ${f.n(t)} s`, pasos, val: { F, t } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'bala', m: d.mg / 1000, v0: d.v0, p: d.p / 100 } }),
    },
    {
      id: 'pared', titulo: 'Proyectil que atraviesa una pared',
      datos(r) { const v0 = r.step(300, 700, 50), v1 = r.step(100, 500, 25); if (v1 < 0.2 * v0 || v1 > 0.7 * v0) return null; return { mg: r.step(20, 200, 10), v0, v1, e: r.pick([5, 10, 20, 30, 40, 50]) }; },
      enunciado: (d, f) => `Un proyectil de ${f.d(d.mg)} g atraviesa una pared de madera de ${f.d(d.e)} cm de espesor. Llega a la pared a ${f.d(d.v0)} m/s y sale a ${f.d(d.v1)} m/s. Calcula: a) el trabajo de la fuerza que ejerce la pared; b) la fuerza media, supuesta constante; c) el porcentaje de energía cinética que pierde.`,
      solucion(d, f) {
        const m = d.mg / 1000, e = d.e / 100, W = 0.5 * m * (d.v1 * d.v1 - d.v0 * d.v0), F = -W / e, pct = 100 * (1 - d.v1 * d.v1 / (d.v0 * d.v0));
        const pasos = herr('Teorema de las fuerzas vivas entre la entrada y la salida de la pared.') +
          sub('a) Trabajo') + eq(`W = ½·m·(v² − v₀²) = ½ · ${f.n(m)} · (${f.d(d.v1)}² − ${f.d(d.v0)}²) = ${f.n(W)} J`) +
          sub('b) Fuerza') + eq(`W = −F·e ⟹ F = ${f.n(-W)} / ${f.n(e)} = ${f.n(F)} N`) +
          sub('c) Energía perdida') + eq(`1 − v²/v₀² = ${f.fx(pct, 1)} %`) +
          why('La energía cinética va con v²: aunque la velocidad baja menos, la energía baja mucho más.');
        return { resultado: `W = ${f.n(W)} J · F = ${f.n(F)} N · pierde el ${f.fx(pct, 1)} %`, pasos, val: { F, pct } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'pared', m: d.mg / 1000, v0: d.v0, v1: d.v1, e: d.e / 100 } }),
    },
    {
      id: 'deslizar', titulo: 'Frenado por rozamiento',
      datos(r) { const inv = r.chance(0.5), v0 = r.int(4, 20), m = r.int(1, 80); if (inv) { const s = r.int(10, 80), mu = v0 * v0 / (2 * G * s); return mu > 0.05 && mu < 0.8 ? { inv, v0, m, s } : null; } return { inv, v0, m, mu: r.step(0.1, 0.6, 0.05) }; },
      enunciado: (d, f) => d.inv
        ? `Un esquiador de ${f.d(d.m)} kg llega a una zona horizontal con una velocidad de ${f.d(d.v0)} m/s y, sin impulsarse, se detiene tras recorrer ${f.d(d.s)} m. Calcula: a) el trabajo de la fuerza de rozamiento; b) el coeficiente de rozamiento.`
        : `Se lanza un bloque de ${f.d(d.m)} kg a ${f.d(d.v0)} m/s por un suelo horizontal con coeficiente de rozamiento ${f.d(d.mu)}. Calcula: a) la distancia que recorre hasta pararse; b) el tiempo que tarda; c) ¿recorrería la misma distancia un bloque del doble de masa?`,
      solucion(d, f) {
        if (d.inv) {
          const W = -0.5 * d.m * d.v0 * d.v0, mu = d.v0 * d.v0 / (2 * G * d.s);
          const pasos = herr('Teorema de las fuerzas vivas; en horizontal N = m·g y W roz = −μ·m·g·d.') +
            sub('a) Trabajo del rozamiento') + eq(`W roz = 0 − ½·m·v₀² = ${f.n(W)} J`) +
            sub('b) Coeficiente') + eq(`−μ·m·g·d = ${f.n(W)} ⟹ μ = ${f.n(-W)} / (${f.d(d.m)} · 9,8 · ${f.d(d.s)}) = ${f.n(mu)}`);
          return { resultado: `W roz = ${f.n(W)} J · μ = ${f.n(mu)}`, pasos, val: { mu, d: d.s } };
        }
        const s = d.v0 * d.v0 / (2 * d.mu * G), t = d.v0 / (d.mu * G);
        const pasos = herr('Teorema de las fuerzas vivas: el rozamiento se lleva toda la energía cinética.') +
          sub('a) Distancia') + eq(`−μ·m·g·d = 0 − ½·m·v₀² ⟹ d = v₀² / (2·μ·g) = ${f.d(d.v0)}² / (2 · ${f.d(d.mu)} · 9,8) = ${f.n(s)} m`) +
          sub('b) Tiempo') + eq(`a = μ·g = ${f.n(d.mu * G)} m/s² ; t = v₀/a = ${f.n(t)} s`) +
          sub('c) Doble de masa') + P('Sí: la masa se simplifica en la ecuación. El bloque más pesado tiene el doble de energía, pero también el doble de rozamiento.');
        return { resultado: `d = ${f.n(s)} m · t = ${f.n(t)} s · la misma distancia con el doble de masa`, pasos, val: { d: s, mu: d.mu } };
      },
      sim(d) { const mu = d.inv ? +(d.v0 * d.v0 / (2 * G * d.s)).toFixed(5) : d.mu; return { widget: 'bloque', cfg: { escenario: 'deslizar', m: d.m, v0: d.v0, mu } }; },
    },
    {
      id: 'acelerar', titulo: 'Coche que acelera: trabajo de la fuerza neta',
      datos(r) { const v0 = r.pick([0, 36, 54, 72]), v1 = r.pick([54, 72, 90, 108, 126]); if (v1 <= v0) return null; const a = r.step(1, 3, 0.5); return { m: r.step(800, 1600, 50), v0, v1, s: Math.round((kmh(v1) ** 2 - kmh(v0) ** 2) / (2 * a)) }; },
      enunciado: (d, f) => `Un coche de ${f.d(d.m)} kg ${d.v0 ? `que circula a ${f.d(d.v0)} km/h acelera` : 'parte del reposo y acelera'} hasta ${f.d(d.v1)} km/h en una distancia de ${f.d(d.s)} m por una carretera horizontal. Calcula: a) el trabajo de la fuerza neta; b) la fuerza neta media; c) el trabajo necesario si la masa fuera el doble.`,
      solucion(d, f) {
        const u0 = kmh(d.v0), u1 = kmh(d.v1), W = 0.5 * d.m * (u1 * u1 - u0 * u0), F = W / d.s;
        const pasos = herr('Teorema de las fuerzas vivas: el trabajo de la fuerza neta es la variación de energía cinética.') +
          eq(`v₀ = ${f.n(u0)} m/s ; v = ${f.n(u1)} m/s`) +
          sub('a) Trabajo de la fuerza neta') + eq(`W = ½·m·(v² − v₀²) = ½ · ${f.d(d.m)} · (${f.n(u1)}² − ${f.n(u0)}²) = ${f.n(W)} J`) +
          why('Es v² − v₀², no (v − v₀)²: cada energía cinética lleva su velocidad al cuadrado.') +
          sub('b) Fuerza neta media') + eq(`F = W / d = ${f.n(F)} N`) +
          sub('c) Doble de masa') + eq(`W = ${f.n(2 * W)} J`) + P('La energía cinética es proporcional a la masa: el doble de masa necesita el doble de trabajo.');
        return { resultado: `W = ${f.n(W)} J · F = ${f.n(F)} N · ${f.n(2 * W)} J con el doble de masa`, pasos, val: { W, F } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'frenada', m: d.m, v0kmh: d.v0, v1kmh: d.v1, d: d.s } }),
    },
  ];

  // ================================================================ 4 · Conservación de la energía mecánica
  const conservacion = [
    {
      id: 'vertical', titulo: 'Lanzamiento vertical',
      datos(r) { const v0 = r.int(6, 20), h0 = r.step(0, 15, 0.5), hm = h0 + v0 * v0 / (2 * G); const h1 = Math.round((h0 + 1 + r.next() * (hm - h0 - 2)) * 2) / 2; if (!(h1 > h0 && h1 < hm - 0.5)) return null; return { m: r.step(0.1, 2, 0.1), v0, h0, h1 }; },
      enunciado: (d, f) => `Se lanza verticalmente hacia arriba un cuerpo de ${f.d(d.m)} kg con una velocidad de ${f.d(d.v0)} m/s ${d.h0 ? `desde ${f.d(d.h0)} m de altura` : 'desde el suelo'}. Despreciando el rozamiento con el aire, calcula aplicando la conservación de la energía: a) la altura máxima; b) la velocidad cuando pasa por ${f.d(d.h1)} m de altura; c) la velocidad con la que llega al suelo.`,
      solucion(d, f) {
        const hm = d.h0 + d.v0 * d.v0 / (2 * G), v1 = Math.sqrt(d.v0 * d.v0 - 2 * G * (d.h1 - d.h0)), vs = Math.sqrt(d.v0 * d.v0 + 2 * G * d.h0);
        const pasos = herr('Solo trabaja el peso: se conserva la energía mecánica, Ec₀ + Ep₀ = Ec + Ep. Nivel h = 0 en el suelo.') +
          sub('a) Altura máxima') + eq(`½·m·v₀² + m·g·h₀ = m·g·h máx ⟹ h máx = h₀ + v₀²/(2·g) = ${f.n(hm)} m`) +
          why('En el punto más alto de un tiro vertical la velocidad es cero. La masa se simplifica.') +
          sub(`b) A ${f.d(d.h1)} m`) + eq(`v = √[v₀² − 2·g·(h − h₀)] = ${f.n(v1)} m/s`) + P('Pasa por esa altura con esa rapidez al subir y otra vez al bajar.') +
          sub('c) En el suelo') + eq(`v = √(v₀² + 2·g·h₀) = ${f.n(vs)} m/s`);
        return { resultado: `h máx = ${f.n(hm)} m · v = ${f.n(v1)} m/s a ${f.d(d.h1)} m · ${f.n(vs)} m/s en el suelo`, pasos, val: { hm, v1, vs } };
      },
      sim: d => ({ widget: 'tiro', cfg: { escenario: 'tiro', m: d.m, h0: d.h0, v0: d.v0, angulo: 90, controles: ['v0', 'h0', 'angulo'] } }),
    },
    {
      id: 'caida', titulo: 'Caída desde una altura',
      datos: r => ({ m: r.step(0.1, 5, 0.1), h: r.int(2, 40), v0: r.chance(0.5) ? 0 : r.int(2, 12) }),
      enunciado: (d, f) => d.v0 ? `Una pelota de ${f.d(d.m)} kg rueda por el borde de una azotea de ${f.d(d.h)} m de altura a ${f.d(d.v0)} m/s y cae. Sin rozamiento con el aire, calcula por energías: a) la velocidad con la que llega al suelo; b) la velocidad cuando está a mitad de altura. c) ¿Cambiaría el resultado si la masa fuera el doble?` : `Se deja caer una piedra de ${f.d(d.m)} kg desde ${f.d(d.h)} m de altura. Sin rozamiento con el aire, calcula por energías: a) la velocidad con la que llega al suelo; b) la velocidad cuando está a mitad de altura. c) ¿Cambiaría el resultado si la masa fuera el doble?`,
      solucion(d, f) {
        const v = Math.sqrt(d.v0 * d.v0 + 2 * G * d.h), vm = Math.sqrt(d.v0 * d.v0 + G * d.h);
        const pasos = herr('Solo trabaja el peso: conservación de la energía mecánica, con h = 0 en el suelo.') +
          sub('a) En el suelo') + eq(`½·m·v₀² + m·g·h = ½·m·v² ⟹ v = √(v₀² + 2·g·h) = ${f.n(v)} m/s`) +
          sub('b) A mitad de altura') + eq(`v = √(v₀² + g·h) = ${f.n(vm)} m/s`) +
          why('A mitad de altura se ha convertido la mitad de la Ep, pero la velocidad no es la mitad: Ec va con v².') +
          sub('c) Doble de masa') + P('No: la masa se simplifica. Todos los cuerpos llegan con la misma velocidad si no hay rozamiento con el aire.');
        return { resultado: `v = ${f.n(v)} m/s en el suelo · ${f.n(vm)} m/s a mitad de altura`, pasos, val: { v, vm } };
      },
      sim: d => ({ widget: 'tiro', cfg: { escenario: 'tiro', m: d.m, h0: d.h, v0: d.v0, angulo: 0, controles: ['v0', 'h0', 'angulo'] } }),
    },
    {
      id: 'plano-liso', titulo: 'Plano inclinado sin rozamiento',
      datos: r => r.chance(0.5) ? { sube: true, m: r.step(0.5, 10, 0.5), a: r.pick([20, 25, 30, 35, 40, 45]), v0: r.step(2, 10, 0.5) } : { sube: false, m: r.step(0.5, 10, 0.5), a: r.pick([20, 25, 30, 35, 40, 45]), h: r.step(0.5, 8, 0.5) },
      enunciado: (d, f) => d.sube
        ? `Se lanza un cuerpo de ${f.d(d.m)} kg con una rapidez de ${f.d(d.v0)} m/s hacia arriba por un plano inclinado ${f.d(d.a)}°, sin rozamiento. ¿Qué altura máxima alcanza? ¿Qué distancia recorre sobre el plano? ¿Con qué velocidad vuelve a la base?`
        : `Un cuerpo de ${f.d(d.m)} kg se suelta desde lo alto de un plano inclinado ${f.d(d.a)}°, sin rozamiento, situado a ${f.d(d.h)} m de altura. Calcula la velocidad con la que llega a la base y la que lleva a mitad de altura. ¿Influye el ángulo en la velocidad final?`,
      solucion(d, f) {
        if (d.sube) {
          const h = d.v0 * d.v0 / (2 * G), s = h / sen(d.a);
          const pasos = herr('La normal no trabaja (es perpendicular al plano) y no hay rozamiento: se conserva la energía mecánica.') +
            eq(`½·m·v₀² = m·g·h ⟹ h = v₀²/(2·g) = ${f.n(h)} m`) +
            eq(`d = h / sen ${f.d(d.a)}° = ${f.n(s)} m`) + why('El plano es la hipotenusa; la altura, el cateto opuesto a α.') +
            P(`Vuelve a la base con la misma rapidez, ${f.d(d.v0)} m/s: sin rozamiento no se pierde energía.`);
          return { resultado: `h = ${f.n(h)} m · d = ${f.n(s)} m · vuelve a ${f.d(d.v0)} m/s`, pasos, val: { h, d: s } };
        }
        const v = Math.sqrt(2 * G * d.h), vm = Math.sqrt(G * d.h);
        const pasos = herr('Solo trabaja el peso (la normal es perpendicular al plano): conservación de la energía mecánica.') +
          eq(`m·g·h = ½·m·v² ⟹ v = √(2·g·h) = ${f.n(v)} m/s`) + eq(`A mitad de altura: v = √(g·h) = ${f.n(vm)} m/s`) +
          P('El ángulo no influye en la velocidad final: solo la altura. Sí influye en el tiempo de bajada.');
        return { resultado: `v = ${f.n(v)} m/s en la base · ${f.n(vm)} m/s a mitad de altura`, pasos, val: { v } };
      },
      sim: d => d.sube ? { widget: 'plano', cfg: { escenario: 'sube', m: d.m, alpha: d.a, mu: 0, v0: d.v0, controles: ['m', 'alpha', 'v0'] } } : { widget: 'plano', cfg: { escenario: 'baja', m: d.m, alpha: d.a, h: d.h, mu: 0, v0: 0, controles: ['m', 'alpha', 'h'] } },
    },
    {
      id: 'oblicuo', titulo: 'Tiro oblicuo: velocidad en el punto más alto',
      datos: r => ({ v0: r.int(10, 30), th: r.step(20, 70, 5) }),
      enunciado: (d, f) => `Desde el suelo se lanza un balón con una velocidad de ${f.d(d.v0)} m/s formando ${f.d(d.th)}° con la horizontal. Sin rozamiento con el aire: a) ¿qué velocidad lleva en el punto más alto? b) Calcula la altura máxima aplicando la conservación de la energía. c) ¿Con qué rapidez llega al suelo?`,
      solucion(d, f) {
        const vx = d.v0 * cos(d.th), hm = (d.v0 * d.v0 - vx * vx) / (2 * G);
        const pasos = herr('La componente horizontal de la velocidad no cambia (no hay fuerzas horizontales); para la altura, conservación de la energía mecánica.') +
          sub('a) Velocidad en el punto más alto') + eq(`v = vx = v₀·cos ${f.d(d.th)}° = ${f.n(vx)} m/s`) +
          why('En el punto más alto la componente vertical es cero, pero la horizontal sigue: la velocidad no es cero.') +
          sub('b) Altura máxima') + eq(`½·v₀² = ½·vx² + g·h ⟹ h = (v₀² − vx²)/(2·g) = ${f.n(hm)} m`) +
          sub('c) Llegada al suelo') + P(`Vuelve a la misma altura, así que llega con la misma rapidez: ${f.d(d.v0)} m/s.`);
        return { resultado: `v = ${f.n(vx)} m/s arriba · h máx = ${f.n(hm)} m · llega a ${f.d(d.v0)} m/s`, pasos, val: { vx, hm } };
      },
      sim: d => ({ widget: 'tiro', cfg: { escenario: 'tiro', m: 1, h0: 0, v0: d.v0, angulo: d.th } }),
    },
    {
      id: 'suministrar', titulo: 'Energía que hay que suministrar',
      peso: 1.5,
      datos(r) { const d = { m: r.int(10, 80), h1: r.int(0, 40), v1: r.int(0, 20), h2: r.int(10, 100), v2: r.int(0, 20) }; const W = d.m * (0.5 * (d.v2 ** 2 - d.v1 ** 2) + G * (d.h2 - d.h1)); return W > 0 && d.h2 > d.h1 ? d : null; },
      enunciado: (d, f) => `Un cuerpo de ${f.d(d.m)} kg ${d.h1 ? `está a ${f.d(d.h1)} m de altura` : 'está en el suelo'} y ${d.v1 ? `lleva una velocidad de ${f.d(d.v1)} m/s` : 'está en reposo'}. ¿Qué energía hay que suministrarle para que suba hasta ${f.d(d.h2)} m de altura y ${d.v2 ? `se mueva a ${f.d(d.v2)} m/s` : 'quede en reposo'}?`,
      solucion(d, f) {
        const E1 = 0.5 * d.m * d.v1 ** 2 + d.m * G * d.h1, E2 = 0.5 * d.m * d.v2 ** 2 + d.m * G * d.h2, W = E2 - E1;
        const pasos = herr('El trabajo de las fuerzas exteriores (no conservativas) es la variación de energía mecánica: W ext = ΔEm.') +
          eq(`Em₁ = ½·m·v₁² + m·g·h₁ = ${f.n(E1)} J`) + eq(`Em₂ = ½·m·v₂² + m·g·h₂ = ${f.n(E2)} J`) +
          eq(`W = Em₂ − Em₁ = ${f.n(W)} J`);
        return { resultado: `W = ${f.n(W)} J`, pasos, val: { W } };
      },
    },
  ];

  // ================================================================ 5 · Muelles
  const raiz = (a, b, c) => (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const muelles = [
    {
      id: 'horizontal', titulo: 'Bloque contra un muelle',
      datos(r) { const d = { m: r.step(0.5, 8, 0.5), v0: r.step(1, 10, 0.5), k: r.step(100, 2000, 50) }; const x = d.v0 * Math.sqrt(d.m / d.k); if (x > 0.8 || x < 0.03) return null; d.x1 = Math.round(x * r.pick([0.25, 0.4, 0.5, 0.6]) * 100) / 100; return d.x1 > 0 ? d : null; },
      enunciado: (d, f) => `Un cuerpo de ${f.d(d.m)} kg que se mueve a ${f.d(d.v0)} m/s sobre una superficie horizontal sin rozamiento choca contra un muelle de constante elástica k = ${f.d(d.k)} N/m. Calcula: a) la compresión máxima del muelle; b) la velocidad del cuerpo cuando el muelle está comprimido ${f.d(Math.round(d.x1 * 100))} cm.`,
      solucion(d, f) {
        const x = d.v0 * Math.sqrt(d.m / d.k), v1 = Math.sqrt(d.v0 ** 2 - d.k * d.x1 ** 2 / d.m);
        const pasos = herr('Sin rozamiento solo trabaja la fuerza del muelle (conservativa): Ec₀ = Ec + Ep elástica.') +
          sub('a) Compresión máxima') + eq(`½·m·v₀² = ½·k·x² ⟹ x = v₀·√(m/k) = ${f.n(x)} m`) + why('En la compresión máxima el cuerpo se para un instante: toda la energía está en el muelle.') +
          sub(`b) Con ${f.d(Math.round(d.x1 * 100))} cm`) + eq(`½·m·v₀² = ½·m·v² + ½·k·x₁² ⟹ v = ${f.n(v1)} m/s`) + why('A mitad de camino el cuerpo aún se mueve y el muelle ya guarda energía: hay dos términos.');
        return { resultado: `x máx = ${f.n(x)} m · v = ${f.n(v1)} m/s`, pasos, val: { x, v1 } };
      },
      sim: d => ({ widget: 'muelle', cfg: { escenario: 'horizontal', m: d.m, v0: d.v0, k: d.k, mu: 0, L: 0.5 } }),
    },
    {
      id: 'vertical', titulo: 'Caída sobre un resorte',
      datos(r) { const d = { m: r.step(0.1, 2, 0.1), h: r.step(0.5, 5, 0.5), k: r.step(200, 3000, 50) }; const x = raiz(0.5 * d.k, -d.m * G, -d.m * G * d.h); return x < 0.6 && x > 0.02 ? d : null; },
      enunciado: (d, f) => `Desde una altura de ${f.d(d.h)} m sobre la parte de arriba de un resorte vertical (sin comprimir) se deja caer un cuerpo de ${f.d(d.m)} kg. La constante del resorte es ${f.d(d.k)} N/m. Calcula: a) la compresión máxima; b) cuánto se comprimiría con el cuerpo apoyado encima, en reposo.`,
      solucion(d, f) {
        const x = raiz(0.5 * d.k, -d.m * G, -d.m * G * d.h), x0 = d.m * G / d.k;
        const pasos = herr('Conservación de la energía (peso y muelle). Nivel h = 0 en el punto de máxima compresión.') +
          sub('a) Compresión máxima') + eq(`m·g·(h + x) = ½·k·x² ⟹ ${f.n(0.5 * d.k)}·x² − ${f.n(d.m * G)}·x − ${f.n(d.m * G * d.h)} = 0`) +
          why('El cuerpo baja h + x en total: sigue bajando mientras comprime el muelle.') +
          eq(`x = ${f.n(x)} m`) + P('La otra raíz es negativa: no tiene sentido físico.') +
          sub('b) En reposo') + eq(`k·x₀ = m·g ⟹ x₀ = ${f.n(x0)} m`) + why('En reposo se igualan fuerzas, no energías.');
        return { resultado: `x máx = ${f.n(x)} m · en reposo, x₀ = ${f.n(x0)} m`, pasos, val: { x, x0 } };
      },
      sim: d => ({ widget: 'muelle', cfg: { escenario: 'vertical', m: d.m, h: d.h, k: d.k, v0: 0 } }),
    },
    {
      id: 'hooke', titulo: 'Ley de Hooke y lanzamiento',
      datos(r) { const d = { F: r.step(10, 100, 5), xc: r.step(2, 12, 0.5), m: r.step(0.1, 2, 0.1) }; return d; },
      enunciado: (d, f) => `Para comprimir un muelle ${f.d(d.xc)} cm hace falta una fuerza de ${f.d(d.F)} N. Calcula: a) la constante elástica; b) la energía almacenada con esa compresión; c) la velocidad con la que el muelle lanzaría un cuerpo de ${f.d(d.m)} kg sobre una superficie horizontal sin rozamiento.`,
      solucion(d, f) {
        const x = d.xc / 100, k = d.F / x, E = 0.5 * k * x * x, v = Math.sqrt(2 * E / d.m);
        const pasos = herr('Ley de Hooke para k; energía potencial elástica; conservación de la energía para el lanzamiento.') +
          sub('a) Constante') + eq(`F = k·x ⟹ k = ${f.d(d.F)} / ${f.n(x)} = ${f.n(k)} N/m`) + why('x en metros: k se mide en N/m.') +
          sub('b) Energía') + eq(`Ep el = ½·k·x² = ${f.n(E)} J`) +
          sub('c) Lanzamiento') + eq(`½·k·x² = ½·m·v² ⟹ v = ${f.n(v)} m/s`);
        return { resultado: `k = ${f.n(k)} N/m · Ep = ${f.n(E)} J · v = ${f.n(v)} m/s`, pasos, val: { k, E, v } };
      },
      sim(d) { const x = d.xc / 100, k = d.F / x; return { widget: 'muelle', cfg: { escenario: 'horizontal', m: d.m, k: +k.toFixed(2), v0: +(x * Math.sqrt(k / d.m)).toFixed(3), mu: 0, L: 0.3 } }; },
    },
    {
      id: 'rozamiento', titulo: 'Muelle con rozamiento',
      datos(r) { const d = { m: r.int(1, 5), v0: r.int(3, 9), mu: r.step(0.1, 0.4, 0.05), L: r.step(0.5, 3, 0.5), k: r.step(100, 1000, 50) }; return d.v0 ** 2 - 2 * d.mu * G * d.L > 1 ? d : null; },
      enunciado: (d, f) => `Un bloque de ${f.d(d.m)} kg se lanza a ${f.d(d.v0)} m/s sobre un suelo horizontal con coeficiente de rozamiento ${f.d(d.mu)}. Después de recorrer ${f.d(d.L)} m choca contra un muelle de constante ${f.d(d.k)} N/m. El rozamiento también actúa mientras el muelle se comprime. Calcula: a) la velocidad al llegar al muelle; b) la compresión máxima.`,
      solucion(d, f) {
        const v1s = d.v0 ** 2 - 2 * d.mu * G * d.L, v1 = Math.sqrt(v1s), Fr = d.mu * d.m * G, x = raiz(0.5 * d.k, Fr, -0.5 * d.m * v1s);
        const pasos = herr('Ecuación de trabajo y energía con el rozamiento: Ec₀ + W roz = Ec + Ep el.') +
          eq(`Fr = μ·m·g = ${f.n(Fr)} N`) +
          sub('a) Al llegar al muelle') + eq(`v₁² = v₀² − 2·μ·g·L ⟹ v₁ = ${f.n(v1)} m/s`) +
          sub('b) Compresión máxima') + eq(`½·m·v₁² − Fr·x = ½·k·x² ⟹ ${f.n(0.5 * d.k)}·x² + ${f.n(Fr)}·x − ${f.n(0.5 * d.m * v1s)} = 0`) +
          why('Mientras comprime el muelle sigue deslizando una distancia x: el rozamiento también trabaja ahí.') + eq(`x = ${f.n(x)} m`);
        return { resultado: `v = ${f.n(v1)} m/s al llegar · x máx = ${f.n(x)} m`, pasos, val: { v1, x } };
      },
      sim: d => ({ widget: 'muelle', cfg: { escenario: 'horizontal', m: d.m, v0: d.v0, mu: d.mu, L: d.L, k: d.k, rozMuelle: true } }),
    },
    {
      id: 'colgado', titulo: 'Muelle con una pesa colgada y caída',
      datos(r) { const d = { m: r.step(0.2, 2, 0.1), x0: r.pick([1, 1.5, 2, 2.5, 3, 4, 5]), h: r.step(0.5, 2, 0.5) }; return d; },
      enunciado: (d, f) => `Un muelle se alarga ${f.d(d.x0)} cm al colgar de él una pesa de ${f.d(d.m)} kg. Colocamos el muelle vertical sobre el suelo y dejamos caer sobre él la misma pesa desde ${f.d(d.h)} m por encima de su extremo. Calcula: a) la constante elástica; b) la compresión máxima.`,
      solucion(d, f) {
        const k = d.m * G / (d.x0 / 100), x = raiz(0.5 * k, -d.m * G, -d.m * G * d.h);
        const pasos = herr('a) Equilibrio de fuerzas con la pesa colgada; b) conservación de la energía en la caída (baja h + x).') +
          sub('a) Constante') + eq(`k·x₀ = m·g ⟹ k = ${f.n(d.m * G)} / ${f.n(d.x0 / 100)} = ${f.n(k)} N/m`) + why('Colgada y en reposo, la fuerza del muelle equilibra al peso.') +
          sub('b) Compresión máxima') + eq(`m·g·(h + x) = ½·k·x² ⟹ x = ${f.n(x)} m`) +
          P(`Cayendo comprime el muelle ${f.fx(x / (d.x0 / 100), 1)} veces más que colgada en reposo.`);
        return { resultado: `k = ${f.n(k)} N/m · x máx = ${f.n(x)} m`, pasos, val: { k, x } };
      },
      sim(d) { const k = d.m * G / (d.x0 / 100); return { widget: 'muelle', cfg: { escenario: 'vertical', m: d.m, h: d.h, k: +k.toFixed(2), v0: 0 } }; },
    },
  ];

  // ================================================================ 6 · Planos inclinados con rozamiento
  const ANG = [20, 25, 30, 35, 37, 40, 45];
  const planos = [
    {
      id: 'sube', titulo: 'Lanzado hacia arriba por un plano con rozamiento',
      datos: r => ({ m: r.step(0.5, 10, 0.5), a: r.pick(ANG), mu: r.step(0.1, 0.5, 0.05), v0: r.step(2, 12, 0.5) }),
      enunciado: (d, f) => `Desde la base de un plano inclinado ${f.d(d.a)}° se lanza hacia arriba un bloque de ${f.d(d.m)} kg con una velocidad de ${f.d(d.v0)} m/s. El coeficiente de rozamiento es ${f.d(d.mu)}. Calcula: a) la distancia que recorre sobre el plano y la altura que alcanza; b) el trabajo del rozamiento en la subida; c) ¿vuelve a bajar? Si es así, ¿con qué velocidad llega a la base?`,
      solucion(d, f) {
        const s = d.v0 ** 2 / (2 * G * (sen(d.a) + d.mu * cos(d.a))), h = s * sen(d.a), Wr = -d.mu * d.m * G * cos(d.a) * s, vuelve = tg(d.a) > d.mu, vv = vuelve ? Math.sqrt(2 * G * s * (sen(d.a) - d.mu * cos(d.a))) : 0;
        const pasos = herr('Ecuación de trabajo y energía entre la base (h = 0) y el punto más alto (v = 0), con h = d·sen α.') +
          sub('a) Distancia y altura') + eq(`½·m·v₀² − μ·m·g·cos α·d = m·g·d·sen α`) + eq(`d = v₀² / [2·g·(sen α + μ·cos α)] = ${f.n(s)} m ; h = d·sen α = ${f.n(h)} m`) +
          why('Al subir, el peso y el rozamiento frenan los dos: sen α y μ·cos α se suman. La masa se simplifica.') +
          sub('b) Trabajo del rozamiento') + eq(`W roz = −μ·m·g·cos α·d = ${f.n(Wr)} J`) +
          sub('c) ¿Vuelve a bajar?') + eq(`tg ${f.d(d.a)}° = ${f.n(tg(d.a))} ${vuelve ? '>' : '≤'} μ = ${f.d(d.mu)}`) +
          (vuelve ? eq(`v = √[2·g·d·(sen α − μ·cos α)] = ${f.n(vv)} m/s`) + why('Al bajar, el peso ayuda y el rozamiento frena: ahora se restan.') + comp(`por el viaje completo, v² = v₀² − 4·μ·g·cos α·d = ${f.n(d.v0 ** 2 - 4 * d.mu * G * cos(d.a) * s)} m²/s² ⟹ v = ${f.n(vv)} m/s.`)
            : P('No: la componente del peso a lo largo del plano no supera al rozamiento máximo y el bloque se queda parado arriba.'));
        return { resultado: `d = ${f.n(s)} m · h = ${f.n(h)} m · W roz = ${f.n(Wr)} J · ${vuelve ? `vuelve a ${f.n(vv)} m/s` : 'no vuelve a bajar'}`, pasos, val: { d: s, h, vv } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'sube', m: d.m, alpha: d.a, mu: d.mu, v0: d.v0 } }),
    },
    {
      id: 'baja', titulo: 'Baja por un plano con rozamiento',
      datos(r) { const a = r.pick(ANG), mu = r.step(0.1, 0.5, 0.05); if (tg(a) < mu + 0.12) return null; return { m: r.step(1, 10, 0.5), a, mu, h: r.step(1, 8, 0.5), suelo: r.chance(0.5) }; },
      enunciado: (d, f) => `Desde lo alto de un plano inclinado ${f.d(d.a)}° y ${f.d(d.h)} m de altura se deja caer un cuerpo de ${f.d(d.m)} kg. El coeficiente de rozamiento es ${f.d(d.mu)}. Calcula: a) la velocidad con la que llega a la base; b) el trabajo del rozamiento.${d.suelo ? ' c) Después sigue por un suelo horizontal con el mismo rozamiento: ¿qué distancia recorre hasta pararse?' : ''}`,
      solucion(d, f) {
        const s = d.h / sen(d.a), Wr = -d.mu * d.m * G * cos(d.a) * s, v = Math.sqrt(2 * G * d.h + 2 * Wr / d.m), x = v * v / (2 * d.mu * G);
        let pasos = herr('Ecuación de trabajo y energía entre lo alto (v = 0) y la base (h = 0).') +
          eq(`d = h / sen α = ${f.n(s)} m ; N = m·g·cos α ; W roz = −μ·m·g·cos α·d = ${f.n(Wr)} J`) +
          why('En el plano inclinado N = m·g·cos α, no m·g; y en el trabajo del rozamiento va la distancia recorrida, no la altura.') +
          sub('a) Velocidad en la base') + eq(`m·g·h + W roz = ½·m·v² ⟹ v = ${f.n(v)} m/s`) +
          comp(`sin rozamiento llegaría a √(2·g·h) = ${f.n(Math.sqrt(2 * G * d.h))} m/s; con rozamiento llega más despacio.`);
        if (d.suelo) pasos += sub('c) Suelo horizontal') + eq(`½·m·v² = μ·m·g·x ⟹ x = v²/(2·μ·g) = ${f.n(x)} m`);
        return { resultado: `v = ${f.n(v)} m/s · W roz = ${f.n(Wr)} J${d.suelo ? ` · ${f.n(x)} m en el suelo` : ''}`, pasos, val: { v, x: d.suelo ? x : null } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'baja', m: d.m, alpha: d.a, h: d.h, mu: d.mu, v0: 0, suelo: !!d.suelo } }),
    },
    {
      id: 'empuje', titulo: 'Subir un cuerpo con velocidad constante',
      datos: r => ({ m: r.int(10, 150), a: r.pick(ANG), mu: r.step(0.1, 0.4, 0.05), s: r.int(2, 20) }),
      enunciado: (d, f) => `Por un plano inclinado ${f.d(d.a)}° se sube un cuerpo de ${f.d(d.m)} kg con velocidad constante, empujándolo con una fuerza F paralela al plano. El coeficiente de rozamiento es ${f.d(d.mu)}. Calcula: a) el valor de F; b) el trabajo de F cuando el cuerpo recorre ${f.d(d.s)} m; c) en qué se invierte ese trabajo.`,
      solucion(d, f) {
        const Px = d.m * G * sen(d.a), Fr = d.mu * d.m * G * cos(d.a), F = Px + Fr, W = F * d.s;
        const pasos = herr('Velocidad constante ⟹ ΣF = 0 a lo largo del plano (dinámica). Después, W = F·d.') +
          sub('a) Fuerza') + eq(`F = m·g·sen α + μ·m·g·cos α = ${f.n(Px)} + ${f.n(Fr)} = ${f.n(F)} N`) +
          why('Al subir, la componente del peso y el rozamiento van los dos hacia abajo del plano: F tiene que compensar los dos.') +
          sub('b) Trabajo') + eq(`W F = F·d = ${f.n(W)} J`) +
          sub('c) Reparto') + eq(`ΔEp = m·g·d·sen α = ${f.n(Px * d.s)} J ; calor = μ·m·g·cos α·d = ${f.n(Fr * d.s)} J`) +
          P('La energía cinética no cambia: el trabajo de F se reparte entre la energía potencial que gana el cuerpo y el calor del rozamiento.');
        return { resultado: `F = ${f.n(F)} N · W = ${f.n(W)} J (${f.n(Px * d.s)} J de Ep y ${f.n(Fr * d.s)} J de calor)`, pasos, val: { F, W } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'empuje', m: d.m, alpha: d.a, mu: d.mu, d: d.s, v: 1, sentido: 'sube' } }),
    },
    {
      id: 'tramo-rampa', titulo: 'Tramo horizontal y rampa',
      datos(r) { const d = { v0: r.int(5, 12), L: r.step(1, 4, 0.5), mu: r.step(0.1, 0.4, 0.05), a: r.pick([25, 30, 35, 40, 45]) }; return d.v0 ** 2 - 2 * d.mu * G * d.L > 4 ? d : null; },
      enunciado: (d, f) => `Un bloque empieza a deslizar con una velocidad de ${f.d(d.v0)} m/s sobre una superficie horizontal con coeficiente de rozamiento ${f.d(d.mu)}. Después de recorrer ${f.d(d.L)} m encuentra una rampa inclinada ${f.d(d.a)}° con el mismo rozamiento. Calcula: a) la velocidad al llegar a la base de la rampa; b) la distancia que recorre sobre la rampa antes de pararse.`,
      solucion(d, f) {
        const v1 = Math.sqrt(d.v0 ** 2 - 2 * d.mu * G * d.L), s = v1 * v1 / (2 * G * (sen(d.a) + d.mu * cos(d.a)));
        const pasos = herr('Trabajo y energía en cada tramo. La masa se simplifica: no hace falta conocerla.') +
          sub('a) Tramo horizontal') + eq(`½·v₀² − μ·g·L = ½·v₁² ⟹ v₁ = ${f.n(v1)} m/s`) +
          sub('b) Rampa') + eq(`d = v₁² / [2·g·(sen α + μ·cos α)] = ${f.n(s)} m`) + why('En la rampa N = m·g·cos α y el rozamiento frena junto con el peso.');
        return { resultado: `v = ${f.n(v1)} m/s · d = ${f.n(s)} m sobre la rampa`, pasos, val: { v1, d: s } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'sube', m: 1, alpha: d.a, mu: d.mu, v0: d.v0, L0: d.L, controles: ['alpha', 'mu', 'v0', 'L0'] } }),
    },
    {
      id: 'frenado', titulo: 'Bajar frenado con velocidad constante',
      datos(r) { const a = r.pick([25, 30, 35, 40, 45]), mu = r.step(0.1, 0.4, 0.05); if (tg(a) < mu + 0.15) return null; return { m: r.int(20, 150), a, mu, s: r.int(5, 30) }; },
      enunciado: (d, f) => `Por un plano inclinado ${f.d(d.a)}° desciende un bloque de ${f.d(d.m)} kg y se le aplica una fuerza F paralela al plano que lo frena, de modo que baja con velocidad constante. El coeficiente de rozamiento es ${f.d(d.mu)}. a) Calcula F. b) Calcula la variación de energía potencial en un desplazamiento de ${f.d(d.s)} m y explica en qué se transforma.`,
      solucion(d, f) {
        const Px = d.m * G * sen(d.a), Fr = d.mu * d.m * G * cos(d.a), F = Px - Fr, dEp = -Px * d.s;
        const pasos = herr('a) Velocidad constante ⟹ ΣF = 0 (dinámica). b) ΔEp = m·g·Δh.') +
          sub('a) Fuerza') + eq(`Px − Fr − F = 0 ⟹ F = m·g·(sen α − μ·cos α) = ${f.n(F)} N`) + why('Al bajar, el rozamiento y F van hacia arriba del plano y entre los dos compensan Px.') +
          sub('b) Energía potencial') + eq(`Δh = −d·sen α = −${f.n(d.s * sen(d.a))} m ; ΔEp = m·g·Δh = ${f.n(dEp)} J`) +
          P(`La Ec no cambia. La Ep que pierde se reparte entre el calor del rozamiento (${f.n(Fr * d.s)} J) y la energía que se lleva quien frena (${f.n(F * d.s)} J).`);
        return { resultado: `F = ${f.n(F)} N · ΔEp = ${f.n(dEp)} J`, pasos, val: { F, dEp } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'empuje', m: d.m, alpha: d.a, mu: d.mu, d: d.s, v: 1, sentido: 'baja' } }),
    },
  ];

  // ================================================================ 7 · Potencia, rendimiento y consumo
  const CV = 736;
  const potencia = [
    {
      id: 'montacargas', titulo: 'Potencia de un montacargas',
      datos: r => ({ m: r.step(200, 1500, 50), h: r.int(5, 30), t: r.int(10, 60), eta: r.step(0.5, 0.9, 0.05) }),
      enunciado: (d, f) => `Un montacargas de ${f.d(d.m)} kg tiene que subir hasta una altura de ${f.d(d.h)} m en ${f.d(d.t)} s con velocidad constante. Si el rendimiento de la instalación es del ${f.d(Math.round(d.eta * 100))} %, calcula la potencia útil y la potencia que debe tener el motor, en vatios y en caballos de vapor.`,
      solucion(d, f) {
        const W = d.m * G * d.h, Pu = W / d.t, Pm = Pu / d.eta;
        const pasos = herr('Trabajo útil = Ep ganada (velocidad constante); P = W/t y P útil = η·P motor.') +
          eq(`W útil = m·g·h = ${f.n(W)} J`) + eq(`P útil = W/t = ${f.n(Pu)} W`) +
          eq(`P motor = P útil / η = ${f.n(Pu)} / ${f.d(d.eta)} = ${f.n(Pm)} W = ${f.n(Pm / CV)} CV`) +
          why('El motor tiene que dar más potencia de la útil, porque parte se pierde. 1 CV = 736 W.');
        return { resultado: `P útil = ${f.n(Pu)} W · P motor = ${f.n(Pm)} W = ${f.n(Pm / CV)} CV`, pasos, val: { Pu, Pm } };
      },
      sim: d => ({ widget: 'potencia', cfg: { m: d.m, n: 1, h: d.h, t: d.t, eta: d.eta, cuerpo: 'carga', controles: ['m', 'h', 't', 'eta'] } }),
    },
    {
      id: 'motor-agua', titulo: 'Litros de agua que sube un motor',
      datos: r => ({ Pcv: r.pick([0.5, 1, 1.5, 2, 3, 5]), h: r.int(5, 30), tmin: r.int(5, 60), eta: r.step(0.6, 0.9, 0.05) }),
      enunciado: (d, f) => `¿Cuántos litros de agua podrá subir un motor de ${f.d(d.Pcv)} CV hasta una altura de ${f.d(d.h)} m en ${f.d(d.tmin)} minutos, si el rendimiento es del ${f.d(Math.round(d.eta * 100))} %? (1 L de agua = 1 kg; 1 CV = 736 W.)`,
      solucion(d, f) {
        const P = d.Pcv * CV, Pu = d.eta * P, t = d.tmin * 60, E = Pu * t, m = E / (G * d.h);
        const pasos = herr('P útil = η·P; la energía útil en ese tiempo se invierte en energía potencial del agua.') +
          eq(`P = ${f.d(d.Pcv)} · 736 = ${f.n(P)} W ; P útil = ${f.d(d.eta)} · ${f.n(P)} = ${f.n(Pu)} W`) +
          eq(`E útil = P útil · t = ${f.n(Pu)} · ${f.d(t)} = ${f.n(E)} J`) +
          eq(`m·g·h = E útil ⟹ m = ${f.n(E)} / (9,8 · ${f.d(d.h)}) = ${f.n(m)} kg = ${f.n(m)} L`);
        return { resultado: `${f.n(m)} L`, pasos, val: { m } };
      },
      sim: d => ({ widget: 'potencia', cfg: { h: d.h, t: d.tmin * 60, eta: d.eta, cuerpo: 'agua', incognita: 'm', Pcv: d.Pcv, controles: ['Pcv', 'h', 't', 'eta'] } }),
    },
    {
      id: 'calentar', titulo: 'Calentar agua: rendimiento y coste',
      datos(r) { const d = { m: r.step(0.5, 3, 0.5), T0: r.int(10, 25), Tf: r.int(60, 100), P: r.pick([800, 1000, 1200, 1500, 2000, 2200]), precio: r.step(0.08, 0.2, 0.01) }; const eta = r.step(0.7, 0.95, 0.05); d.t = Math.round(d.m * 4180 * (d.Tf - d.T0) / (eta * d.P) / 10) * 10; const er = d.m * 4180 * (d.Tf - d.T0) / (d.P * d.t); return d.t >= 60 && er >= 0.6 && er <= 0.97 ? d : null; },
      enunciado: (d, f) => `Un aparato eléctrico de ${f.d(d.P)} W tarda ${d.t % 60 ? `${Math.floor(d.t / 60)} min ${d.t % 60} s (${d.t} s)` : `${d.t / 60} min`} en calentar ${f.d(d.m)} kg de agua desde ${f.d(d.T0)} °C hasta ${f.d(d.Tf)} °C. Calcula: a) la energía que absorbe el agua; b) el rendimiento del aparato; c) el coste si el kWh está a ${f.fx(d.precio, 2)} €. (c agua = 4180 J/(kg·K).)`,
      solucion(d, f) {
        const Q = d.m * 4180 * (d.Tf - d.T0), E = d.P * d.t, eta = Q / E, kwh = E / 3.6e6, coste = kwh * d.precio;
        const pasos = herr('Energía útil: Q = m·c·ΔT. Energía consumida: E = P·t. Rendimiento: η = Q/E. El coste, con la energía consumida.') +
          sub('a) Energía absorbida') + eq(`Q = m·c·(T − T₀) = ${f.d(d.m)} · 4180 · ${f.d(d.Tf - d.T0)} = ${f.n(Q)} J`) +
          sub('b) Rendimiento') + eq(`E = P·t = ${f.d(d.P)} · ${f.d(d.t)} = ${f.n(E)} J ; η = Q/E = ${f.fx(100 * eta, 1)} %`) +
          sub('c) Coste') + eq(`E = ${f.n(E)} / 3,6·10⁶ = ${f.n(kwh)} kWh ; coste = ${f.n(kwh)} · ${f.fx(d.precio, 2)} = ${f.n(coste, 2)} €`) +
          why('La compañía cobra lo que marca el contador: la energía consumida, no la útil.');
        return { resultado: `Q = ${f.n(Q)} J · η = ${f.fx(100 * eta, 1)} % · ${f.n(coste, 2)} €`, pasos, val: { eta, coste } };
      },
      sim: d => ({ widget: 'calentador', cfg: { escenario: 'agua', P: d.P, m: d.m, T0: d.T0, Tf: d.Tf, t: d.t, eta: 0.9, precio: d.precio, incognita: 'eta', controles: ['P', 'm', 't', 'precio'] } }),
    },
    {
      id: 'consumo', titulo: 'Consumo eléctrico y coste',
      peso: 1.5,
      datos: r => ({ ap: r.pick([['una estufa', 2000], ['un horno', 2500], ['un ordenador', 150], ['un aire acondicionado', 1200], ['una lavadora', 900], ['un televisor', 120]]), h: r.step(1, 8, 0.5), dias: r.pick([1, 7, 30]), precio: r.step(0.08, 0.25, 0.01) }),
      enunciado: (d, f) => `Calcula la energía que consume ${d.ap[0]} de ${f.d(d.ap[1])} W encendido ${f.d(d.h)} h al día durante ${d.dias === 1 ? 'un día' : `${d.dias} días`}, en kWh y en MJ. ¿Cuánto cuesta si el kWh está a ${f.fx(d.precio, 2)} €?`,
      solucion(d, f) {
        const horas = d.h * d.dias, kwh = d.ap[1] / 1000 * horas, MJ = kwh * 3.6, coste = kwh * d.precio;
        const pasos = herr('E = P·t con la potencia en kW y el tiempo en horas da kWh; 1 kWh = 3,6·10⁶ J = 3,6 MJ.') +
          eq(`t = ${f.d(d.h)} · ${f.d(d.dias)} = ${f.d(horas)} h ; E = ${f.d(d.ap[1] / 1000)} kW · ${f.d(horas)} h = ${f.n(kwh)} kWh`) +
          eq(`E = ${f.n(kwh)} · 3,6 = ${f.n(MJ)} MJ`) + eq(`coste = ${f.n(kwh)} · ${f.fx(d.precio, 2)} = ${f.n(coste, 3)} €`) +
          why('El kWh es una unidad de energía (potencia por tiempo), no de potencia.');
        return { resultado: `${f.n(kwh)} kWh = ${f.n(MJ)} MJ · ${f.n(coste, 3)} €`, pasos, val: { kwh, coste } };
      },
      sim: d => ({ widget: 'calentador', cfg: { escenario: 'estufa', P: d.ap[1], horas: d.h * d.dias, precio: d.precio, controles: d.h * d.dias <= 24 ? ['P', 'horas', 'precio'] : ['P', 'precio'] } }),
    },
    {
      id: 'ascensor', titulo: 'Potencia con P = F·v',
      datos: r => ({ m: r.step(300, 1200, 50), v: r.step(0.5, 2.5, 0.25), eta: r.step(0.6, 0.9, 0.05), h: r.int(10, 40) }),
      enunciado: (d, f) => `Un ascensor con su carga, ${f.d(d.m)} kg en total, sube con una velocidad constante de ${f.d(d.v)} m/s. El rendimiento del motor es del ${f.d(Math.round(d.eta * 100))} %. Calcula: a) la potencia útil; b) la potencia del motor; c) la energía que consume en subir ${f.d(d.h)} m, en julios y en kWh.`,
      solucion(d, f) {
        const F = d.m * G, Pu = F * d.v, Pm = Pu / d.eta, t = d.h / d.v, E = Pm * t;
        const pasos = herr('Con velocidad constante la fuerza es igual al peso y P = F·v.') +
          sub('a) Potencia útil') + eq(`P útil = m·g·v = ${f.n(F)} · ${f.d(d.v)} = ${f.n(Pu)} W`) + why('P = W/t = F·Δx/t, y Δx/t es la velocidad.') +
          sub('b) Potencia del motor') + eq(`P = P útil / η = ${f.n(Pm)} W`) +
          sub('c) Energía') + eq(`t = h/v = ${f.n(t)} s ; E = P·t = ${f.n(E)} J = ${f.n(E / 3.6e6)} kWh`);
        return { resultado: `P útil = ${f.n(Pu)} W · P motor = ${f.n(Pm)} W · E = ${f.n(E)} J`, pasos, val: { Pu, Pm, E } };
      },
      sim: d => ({ widget: 'potencia', cfg: { m: d.m, n: 1, h: d.h, t: +(d.h / d.v).toFixed(3), eta: d.eta, cuerpo: 'carga', controles: ['m', 'h', 't', 'eta'] } }),
    },
  ];

  X.registrar({
    tema: 'energia', nombre: 'Trabajo, potencia y energía', ruta: 'temas/energia/',
    apartados: [
      { slug: 'trabajo-de-una-fuerza', nombre: 'Trabajo de una fuerza', icono: 'trabajo', patrones: trabajo },
      { slug: 'trabajo-con-rozamiento', nombre: 'Trabajo con rozamiento', icono: 'rozamiento', patrones: rozamiento },
      { slug: 'energia-cinetica', nombre: 'Energía cinética', icono: 'cinetica', patrones: cinetica },
      { slug: 'conservacion', nombre: 'Conservación de la energía', icono: 'conservacion', patrones: conservacion },
      { slug: 'muelles', nombre: 'Muelles', icono: 'muelle', patrones: muelles },
      { slug: 'planos-inclinados', nombre: 'Planos inclinados', icono: 'plano', patrones: planos },
      { slug: 'potencia-y-rendimiento', nombre: 'Potencia y rendimiento', icono: 'potencia', patrones: potencia },
      { slug: 'cuestiones', nombre: 'Cuestiones de teoría', icono: 'cuestiones', patrones: [] },
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
