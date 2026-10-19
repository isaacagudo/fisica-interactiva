/* Física interactiva · patrones de ejercicios del tema «Trabajo, potencia y energía» para el generador de exámenes.
   Cada patrón elige datos al azar con sentido físico (si no los tiene, devuelve null y se vuelve a sortear),
   escribe el enunciado y la solución paso a paso y, cuando hay simulador, su configuración con esos datos.
   Las soluciones siguen el estilo de los apuntes y llevan su diagrama, dibujado con la librería assets/diagramas/
   pasando solo los parámetros del ejercicio (fig(tipo, parámetros, lectura)).
   Las cuestiones de teoría se añaden desde energia-cuestiones.js (generado a partir de los apuntes). */
(function (root) {
  'use strict';
  const X = root.FisicaExamen || (typeof require !== 'undefined' ? require('./generador.js') : null);
  const G = 9.8, rad = a => a * Math.PI / 180, deg = r => r * 180 / Math.PI;
  const sen = a => Math.sin(rad(a)), cos = a => Math.cos(rad(a)), tg = a => Math.tan(rad(a));
  // piezas de la solución (mismas clases que las páginas de soluciones), con el estilo de los apuntes:
  // datos, diagrama y su lectura, qué herramienta usar y por qué, fórmulas con letras antes de los números,
  // «¿Por qué?» después de cada fórmula y una comprobación por otro método
  const D = root.FisicaDiagramas || (typeof require !== 'undefined' ? require('../diagramas/diagramas.js') : null);
  const eq = s => `<p class="eq"><strong>${s}</strong></p>`;
  const why = s => `<blockquote class="why"><p><strong>¿Por qué?</strong> ${s}</p></blockquote>`;
  const por = (q, s) => `<blockquote class="why"><p><strong>¿Por qué ${q}?</strong> ${s}</p></blockquote>`;
  const sub = s => `<p class="sub"><strong>${s}</strong></p>`;
  const P = s => `<p>${s}</p>`;
  const herr = s => `<p><strong>Qué herramienta usar.</strong> ${s}</p>`;
  const comp = s => `<p><strong>Comprobación:</strong> ${s}</p>`;
  const ojo = s => `<p class="ojo"><strong>Ojo:</strong> ${s}</p>`;
  const interp = s => `<p><strong>Interpretación.</strong> ${s}</p>`;
  const datos = (...xs) => `<p class="datos">Datos: ${xs.join(' · ')}.</p>`;
  const fig = (tipo, p, lectura) => D.html(tipo, p) + (lectura ? `<p class="lectura">${lectura}</p>` : '');
  const G98 = 'g = 9,8 m/s² (el enunciado no la da)';
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
        const pasos = datos(`F = ${vec(d.Fx, d.Fy, f)} N (constante)`, `A(${f.d(d.Ax)}, ${f.d(d.Ay)}) m`, `B(${f.d(d.Bx)}, ${f.d(d.By)}) m`) +
          fig('vectores', { Ax: d.Ax, Ay: d.Ay, Bx: d.Bx, By: d.By, Fx: d.Fx, Fy: d.Fy }, 'El cuerpo va de A a B. La fuerza es la misma en todo el camino, así que solo importan el desplazamiento Δr y el ángulo φ que forma con F.') +
          herr('La fuerza y las posiciones vienen dadas con vectores (con i y j). El trabajo de una fuerza constante es el <strong>producto escalar</strong> W = F·Δr, que con componentes se calcula como W = Fx·Δx + Fy·Δy. Es la misma fórmula W = F·Δs·cos φ de los apuntes, escrita con componentes.') +
          sub('a) Trabajo') + sub('Paso 1. Vector desplazamiento') +
          eq(`Δr = (xB − xA)·i + (yB − yA)·j = (${f.d(d.Bx)} − ${sd(f, d.Ax)})·i + (${f.d(d.By)} − ${sd(f, d.Ay)})·j = ${vec(dx, dy, f)} m`) +
          por('se resta A de B', 'El desplazamiento es «posición final menos posición inicial», componente a componente. Cuidado con los signos de los paréntesis.') +
          sub('Paso 2. Producto escalar') +
          eq(`W = Fx·Δx + Fy·Δy = ${sd(f, d.Fx)}·${sd(f, dx)} + ${sd(f, d.Fy)}·${sd(f, dy)} = ${f.d(d.Fx * dx)} + ${sd(f, d.Fy * dy)} = ${f.d(W)} J`) +
          por('se multiplican x con x e y con y', 'Así se define el producto escalar: i·i = j·j = 1 e i·j = 0, porque i y j son perpendiculares. Por eso el trabajo es un número, sin i ni j: es una magnitud escalar.') +
          sub('b) Ángulo entre F y Δr') +
          eq(`|F| = √(Fx² + Fy²) = √[${sd(f, d.Fx)}² + ${sd(f, d.Fy)}²] = ${f.n(Fm)} N ; |Δr| = √(Δx² + Δy²) = ${f.n(Dm)} m`) +
          por('Pitágoras', 'Las componentes son los catetos y el módulo es la hipotenusa.') +
          eq(`W = |F|·|Δr|·cos φ ⟹ cos φ = W / (|F|·|Δr|) = ${f.d(W)} / (${f.n(Fm)} · ${f.n(Dm)}) = ${f.n(c)} ⟹ φ = ${f.fx(phi, 1)}°`) +
          por('se despeja así', 'Es la definición del producto escalar con módulos. Igualándola al resultado del paso 2 se obtiene el coseno.') +
          P(W > 0 ? `φ es menor de 90° (cos φ > 0): el trabajo es positivo y la fuerza <strong>ayuda</strong> al movimiento.` : W < 0 ? `φ es mayor de 90° (cos φ < 0): el trabajo es negativo y la fuerza <strong>se opone</strong> al movimiento.` : 'φ = 90°: la fuerza es perpendicular al desplazamiento y no hace trabajo.') +
          comp(`el signo de W y el de cos φ coinciden, como debe ser, y el dibujo lo confirma: ${phi < 90 ? 'F apunta más o menos hacia donde va el cuerpo' : 'F apunta más bien en contra de donde va el cuerpo'}.`) +
          ojo('la calculadora tiene que estar en grados (DEG) para el arco coseno.');
        return { resultado: `W = ${f.d(W)} J · φ = ${f.fx(phi, 1)}°`, pasos, val: { W, phi } };
      },
      sim: d => ({ widget: 'vectores', cfg: Object.assign({ controles: ['Fx', 'Fy', 'Bx', 'By'] }, d) }),
    },
    {
      id: 'polea', titulo: 'Subir una carga con una polea',
      datos: r => ({ m: r.step(20, 80, 5), h: r.int(5, 30), t: r.int(10, 60) }),
      enunciado: (d, f) => `Una persona sube con una polea una carga de ${f.d(d.m)} kg hasta una altura de ${f.d(d.h)} m, con velocidad constante, y tarda ${f.d(d.t)} s. Calcula: a) el trabajo que realiza la persona; b) el trabajo que realiza el peso; c) la potencia que desarrolla.`,
      solucion(d, f) {
        const Fp = d.m * G, W = Fp * d.h, Pw = W / d.t;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `h = ${f.d(d.h)} m`, `t = ${f.d(d.t)} s`, 'velocidad constante', G98) +
          fig('vertical', { Ftxt: 'T (persona)', cuerpo: 'carga' }, 'Sobre la carga actúan su peso, hacia abajo, y la fuerza de la cuerda, hacia arriba. Como sube con velocidad constante, las dos se compensan.') +
          herr('La clave es «velocidad constante»: la aceleración es cero y, por la segunda ley de Newton, ΣF = 0. De ahí sale la fuerza de la persona. Después, el trabajo de cada fuerza con W = F·Δs·cos φ y la potencia con P = W/t.') +
          sub('a) Trabajo de la persona') +
          eq(`ΣF = 0: T − m·g = 0 ⟹ T = m·g = ${f.d(d.m)} · 9,8 = ${f.n(Fp)} N`) +
          por('T = m·g', 'Si la carga acelerara hacia arriba, T sería mayor que el peso; con velocidad constante, son iguales.') +
          eq(`W T = T·h·cos 0° = ${f.n(Fp)} · ${f.d(d.h)} · 1 = ${f.n(W)} J`) +
          por('cos 0°', 'La cuerda tira hacia arriba y la carga sube: fuerza y desplazamiento van en el mismo sentido.') +
          sub('b) Trabajo del peso') +
          eq(`W P = m·g·h·cos 180° = −${f.n(W)} J`) +
          por('cos 180°', 'El peso va hacia abajo y la carga sube. Es el mismo valor que ΔEp con signo menos: W P = −ΔEp.') +
          sub('c) Potencia') +
          eq(`P = W / t = ${f.n(W)} / ${f.d(d.t)} = ${f.n(Pw)} W`) +
          por('se usa el trabajo de la persona', 'La potencia mide lo deprisa que la persona hace su trabajo, en julios por segundo.') +
          comp(`W total = ${f.n(W)} − ${f.n(W)} = 0 = ΔEc, como dice el teorema de las fuerzas vivas para velocidad constante. Todo el trabajo de la persona queda como energía potencial de la carga: m·g·h = ${f.n(W)} J.`);
        return { resultado: `W persona = ${f.n(W)} J · W peso = −${f.n(W)} J · P = ${f.n(Pw)} W`, pasos, val: { W, P: Pw } };
      },
      sim: d => ({ widget: 'potencia', cfg: { m: d.m, n: 1, h: d.h, t: d.t, eta: 1, cuerpo: 'carga', controles: ['m', 'h', 't'] } }),
    },
    {
      id: 'angulo', titulo: 'Fuerza que forma un ángulo con el desplazamiento',
      datos(r) { const d = { m: r.int(5, 25), F: r.step(20, 80, 5), a: r.pick([20, 30, 37, 45, 53, 60]), s: r.int(5, 30) }; return d.F * sen(d.a) < d.m * G * 0.8 ? d : null; },
      enunciado: (d, f) => `Se arrastra una caja de ${f.d(d.m)} kg por un suelo horizontal tirando de una cuerda con una fuerza de ${f.d(d.F)} N que forma ${f.d(d.a)}° con la horizontal. La caja recorre ${f.d(d.s)} m. Calcula: a) el trabajo de la fuerza F; b) el trabajo del peso y el de la normal; c) el trabajo que haría F si se tirase en horizontal.`,
      solucion(d, f) {
        const Fx = d.F * cos(d.a), Fy = d.F * sen(d.a), N = d.m * G - Fy, W = Fx * d.s, Wh = d.F * d.s;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `F = ${f.d(d.F)} N a ${f.d(d.a)}° de la horizontal`, `Δs = ${f.d(d.s)} m`, G98) +
          fig('horizontal', { alpha: d.a, F: d.F, P: d.m * G, N, Fr: 0, v: 'v' }, 'La cuerda tira inclinada: su parte horizontal Fx arrastra la caja y su parte vertical Fy la levanta un poco. El peso y la normal son verticales.') +
          herr('Se piden trabajos de fuerzas constantes en un desplazamiento recto: W = F·Δs·cos φ, con φ el ángulo entre <em>cada</em> fuerza y el desplazamiento (horizontal, hacia delante).') +
          sub('a) Trabajo de F') +
          eq(`W F = F·Δs·cos ${f.d(d.a)}° = ${f.d(d.F)} · ${f.d(d.s)} · ${f.n(cos(d.a))} = ${f.n(W)} J`) +
          por(`cos ${f.d(d.a)}°`, `Solo trabaja la parte de F en la dirección del movimiento, Fx = F·cos α = ${f.n(Fx)} N. La parte vertical, Fy, no trabaja porque la caja no se mueve en vertical.`) +
          sub('b) Trabajo del peso y de la normal') +
          eq('W P = m·g·Δs·cos 90° = 0 J ; W N = N·Δs·cos 90° = 0 J') +
          por('cero', 'Las dos son verticales y el desplazamiento es horizontal: φ = 90°. No hace falta calcular N para saberlo.') +
          sub('c) Tirando en horizontal') +
          eq(`W = F·Δs·cos 0° = ${f.d(d.F)} · ${f.d(d.s)} = ${f.n(Wh)} J`) +
          P(`Con la cuerda inclinada solo se aprovecha para avanzar el ${f.fx(100 * cos(d.a), 0)} % de la fuerza (cos ${f.d(d.a)}° = ${f.n(cos(d.a))}).`) +
          comp(`calculando con la componente, Fx·Δs = ${f.n(Fx)} · ${f.d(d.s)} = ${f.n(Fx * d.s)} J, el mismo resultado que en a).`);
        return { resultado: `W F = ${f.n(W)} J · W P = W N = 0 · en horizontal, ${f.n(Wh)} J`, pasos, val: { W } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'arrastre', m: d.m, F: d.F, alpha: d.a, mu: 0, v0: 0, hasta: 'd', d: d.s, controles: ['F', 'alpha', 'd'] } }),
    },
    {
      id: 'rampa-lisa', titulo: 'Rampa lisa frente a subir en vertical',
      datos(r) { const L = r.int(2, 8), h = r.step(0.5, 3, 0.1); return h >= 0.2 * L && h <= 0.6 * L ? { m: r.int(10, 60), h, L } : null; },
      enunciado: (d, f) => `Para subir una caja de ${f.d(d.m)} kg a una altura de ${f.d(d.h)} m se empuja, con velocidad constante y sin rozamiento, a lo largo de una rampa de ${f.d(d.L)} m. Calcula: a) la fuerza paralela a la rampa necesaria; b) el trabajo de esa fuerza y el del peso; c) la fuerza y el trabajo si se subiera en vertical. ¿Qué ventaja tiene la rampa?`,
      solucion(d, f) {
        const sa = d.h / d.L, F = d.m * G * sa, W = F * d.L, Fv = d.m * G, al = deg(Math.asin(sa));
        const pasos = datos(`m = ${f.d(d.m)} kg`, `h = ${f.d(d.h)} m`, `L = ${f.d(d.L)} m (rampa)`, 'sin rozamiento', 'velocidad constante', G98) +
          fig('plano', { alpha: al, mov: 'sube', roz: false, F: 'sube', v: 'v constante' }, 'En la rampa actúan el peso, la normal y la fuerza que empuja, paralela a la rampa. El peso se descompone en Px, a lo largo de la rampa, y Py, contra ella.') +
          herr('«Velocidad constante» ⟹ a = 0 ⟹ ΣF = 0 a lo largo de la rampa (dinámica): de ahí sale F. Los trabajos, con W = F·Δs·cos φ.') +
          sub('Paso 1. Ángulo de la rampa') +
          eq(`sen α = h / L = ${f.d(d.h)} / ${f.d(d.L)} = ${f.n(sa)} (α = ${f.fx(al, 1)}°)`) +
          por('h / L', 'La rampa es la hipotenusa y la altura es el cateto opuesto al ángulo α.') +
          sub('a) Fuerza paralela a la rampa') +
          eq(`ΣF = 0 a lo largo de la rampa: F − m·g·sen α = 0 ⟹ F = m·g·sen α = ${f.d(d.m)} · 9,8 · ${f.n(sa)} = ${f.n(F)} N`) +
          por('solo F y Px', 'Sin rozamiento, a lo largo de la rampa solo están la fuerza que hacemos y la componente del peso Px = m·g·sen α. La normal es perpendicular a la rampa y no influye en esa dirección.') +
          sub('b) Trabajos') +
          eq(`W F = F·L·cos 0° = m·g·sen α·L = m·g·h = ${f.n(W)} J`) +
          por('sale m·g·h', 'Como L·sen α = h, el trabajo de F no depende de la longitud de la rampa, solo de la altura. Despejar con letras antes de sustituir permite verlo.') +
          eq(`W P = −m·g·h = −${f.n(W)} J`) +
          por('negativo', 'El peso va hacia abajo y el cuerpo sube: el peso quita la energía que aporta F y la guarda como energía potencial (W P = −ΔEp).') +
          sub('c) Subiendo en vertical') +
          eq(`F = m·g = ${f.n(Fv)} N ; W = m·g·h = ${f.n(W)} J`) +
          interp(`La rampa no ahorra trabajo, ahorra fuerza: ${f.n(F)} N en lugar de ${f.n(Fv)} N, a cambio de empujar a lo largo de ${f.d(d.L)} m en vez de ${f.d(d.h)} m.`) +
          comp('W total = W F + W P + W N = m·g·h − m·g·h + 0 = 0 = ΔEc, como corresponde a velocidad constante.');
        return { resultado: `F = ${f.n(F)} N · W F = ${f.n(W)} J, W P = −${f.n(W)} J · en vertical F = ${f.n(Fv)} N y el mismo trabajo`, pasos, val: { F, W } };
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
        const pasos = datos(`m = ${f.d(d.m)} kg`, `F = ${f.d(d.F)} N horizontal`, `μ = ${f.d(d.mu)}`, `Δx = ${f.d(d.s)} m`, 'parte del reposo', G98) +
          fig('horizontal', { alpha: 0, F: d.F, P: N, N, Fr, v: 'v' }, 'Cuatro fuerzas: el peso y la normal (verticales), la fuerza F, que arrastra, y el rozamiento, contra el movimiento.') +
          herr('Primero el diagrama; después la normal (eje vertical) para tener el rozamiento; después el trabajo de cada fuerza con W = F·Δs·cos φ. La velocidad, con el <strong>teorema de las fuerzas vivas</strong> (W total = ΔEc), porque dan la distancia y no el tiempo.') +
          sub('Paso 1. Normal y rozamiento') +
          eq(`ΣFy = 0: N − m·g = 0 ⟹ N = m·g = ${f.d(d.m)} · 9,8 = ${f.n(N)} N`) +
          por('N = m·g aquí', 'El bloque no se mueve en vertical, así que las fuerzas verticales se compensan. Como F es horizontal, en vertical solo están N y el peso.') +
          eq(`Fr = μ·N = ${f.d(d.mu)} · ${f.n(N)} = ${f.n(Fr)} N`) +
          sub('a) Trabajo de cada fuerza') +
          eq(`W F = F·Δx·cos 0° = ${f.d(d.F)} · ${f.d(d.s)} = ${f.n(WF)} J`) +
          por('cos 0°', 'F tira en el mismo sentido en el que se mueve el bloque.') +
          eq(`W roz = Fr·Δx·cos 180° = −${f.n(Fr)} · ${f.d(d.s)} = ${f.n(Wr)} J`) +
          por('cos 180°', 'El rozamiento siempre va contra el movimiento: su trabajo siempre es negativo y esa energía se convierte en calor.') +
          eq('W P = W N = 0 J') + por('cero', 'Son verticales y el desplazamiento es horizontal (cos 90° = 0).') +
          sub('b) Velocidad') +
          eq(`W total = ΔEc: ${f.n(WF)} − ${f.n(-Wr)} = ½·m·v² − 0 ⟹ v = √(2·W total / m) = √(2 · ${f.n(Wt)} / ${f.d(d.m)}) = ${f.n(v)} m/s`) +
          por('W total = ½·m·v²', 'Por el teorema de las fuerzas vivas, la suma de los trabajos de todas las fuerzas es la variación de energía cinética; al principio Ec = 0 porque parte del reposo.') +
          comp(`por dinámica, ΣFx = m·a ⟹ a = (F − Fr)/m = ${f.n(a)} m/s² y v² = 2·a·Δx ⟹ v = ${f.n(Math.sqrt(2 * a * d.s))} m/s. Los dos métodos coinciden.`);
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
        const pasos = datos(`m = ${f.d(d.m)} kg`, `F = ${f.d(d.F)} N a ${f.d(d.a)}°, tirando hacia arriba`, `μ = ${f.d(d.mu)}`, `t = ${f.d(d.t)} s`, 'parte del reposo', G98) +
          fig('horizontal', { alpha: d.a, F: d.F, P: d.m * G, N, Fr, v: 'v' }, `Fx arrastra el cuerpo; Fy lo levanta un poco, y por eso el suelo empuja menos: N = ${f.n(N)} N en vez de ${f.n(d.m * G)} N.`) +
          herr('Piden la velocidad al cabo de un <strong>tiempo</strong>: eso es dinámica (ΣF = m·a) y cinemática (MRUA). La energía no maneja tiempos. Después, el trabajo del rozamiento con W = Fr·Δx·cos 180°, que necesita la distancia recorrida.') +
          sub('Paso 1. Componentes de F') +
          eq(`Fx = F·cos ${f.d(d.a)}° = ${f.n(Fx)} N ; Fy = F·sen ${f.d(d.a)}° = ${f.n(Fy)} N`) +
          por('se descompone', 'Una fuerza inclinada hace dos cosas a la vez: Fx arrastra y Fy levanta. Cada eje se estudia por separado.') +
          sub('Paso 2. Normal y rozamiento (eje vertical)') +
          eq(`ΣFy = 0: N + Fy − m·g = 0 ⟹ N = m·g − F·sen α = ${f.n(d.m * G)} − ${f.n(Fy)} = ${f.n(N)} N`) +
          por('N no es m·g', 'La cuerda sostiene parte del peso, así que el suelo empuja menos. Es el error más frecuente en estos ejercicios.') +
          eq(`Fr = μ·N = ${f.d(d.mu)} · ${f.n(N)} = ${f.n(Fr)} N`) +
          sub('a) Aceleración (eje horizontal)') +
          eq(`ΣFx = m·a: Fx − Fr = m·a ⟹ a = (Fx − Fr) / m = (${f.n(Fx)} − ${f.n(Fr)}) / ${f.d(d.m)} = ${f.n(a)} m/s²`) +
          por('m·a y no 0', 'En horizontal las fuerzas no se compensan: la resultante acelera el cuerpo.') +
          sub(`b) Velocidad y desplazamiento a los ${f.d(d.t)} s`) +
          eq(`v = v₀ + a·t = 0 + ${f.n(a)} · ${f.d(d.t)} = ${f.n(v)} m/s ; Δx = v₀·t + ½·a·t² = ½ · ${f.n(a)} · ${f.d(d.t)}² = ${f.n(x)} m`) +
          por('MRUA', 'Las fuerzas son constantes, así que la aceleración también. Usa a sin redondear para no arrastrar errores.') +
          sub('c) Trabajo del rozamiento') +
          eq(`W roz = Fr·Δx·cos 180° = −${f.n(Fr)} · ${f.n(x)} = ${f.n(Wr)} J`) +
          comp(`por energía: W F = Fx·Δx = ${f.n(Fx * x)} J y W total = ${f.n(Fx * x)} − ${f.n(-Wr)} = ${f.n(Fx * x + Wr)} J, que es ½·m·v² = ${f.n(0.5 * d.m * v * v)} J (teorema de las fuerzas vivas).`) +
          ojo(`si la fuerza empujara hacia abajo con el mismo ángulo, N valdría m·g + F·sen α = ${f.n(d.m * G + Fy)} N y el rozamiento sería mayor: por eso el diagrama va primero.`);
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
        const Fx = d.F * cos(d.a), Fy = d.F * sen(d.a), N = d.m * G + Fy, Fr = d.mu * N, WF = Fx * d.s, Wr = -Fr * d.s, v = Math.sqrt(2 * (WF + Wr) / d.m), ac = (Fx - Fr) / d.m;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `F = ${f.d(d.F)} N a ${f.d(d.a)}°, empujando hacia abajo`, `μ = ${f.d(d.mu)}`, `Δx = ${f.d(d.s)} m`, 'parte del reposo', G98) +
          fig('horizontal', { alpha: -d.a, F: d.F, P: d.m * G, N, Fr, v: 'v' }, 'Al empujar desde arriba, Fx sigue arrastrando el bloque, pero Fy lo aprieta contra el suelo: la normal crece y, con ella, el rozamiento.') +
          herr('Diagrama, normal con el eje vertical (ΣFy = 0), rozamiento, trabajos con W = F·Δs·cos φ y, como dan la distancia y no el tiempo, la velocidad con el teorema de las fuerzas vivas.') +
          sub('a) Normal y rozamiento') +
          eq(`ΣFy = 0: N − m·g − F·sen ${f.d(d.a)}° = 0 ⟹ N = m·g + F·sen α = ${f.n(d.m * G)} + ${f.n(Fy)} = ${f.n(N)} N`) +
          por('se suma F·sen α', 'Ahora Fy va hacia abajo, como el peso: el suelo tiene que empujar más para que el bloque no se hunda.') +
          eq(`Fr = μ·N = ${f.d(d.mu)} · ${f.n(N)} = ${f.n(Fr)} N`) +
          sub('b) Trabajo de cada fuerza') +
          eq(`W F = F·Δx·cos ${f.d(d.a)}° = ${f.d(d.F)} · ${f.d(d.s)} · ${f.n(cos(d.a))} = ${f.n(WF)} J`) +
          por('cos α', 'Solo trabaja Fx, la parte de F en la dirección del movimiento.') +
          eq(`W roz = −Fr·Δx = ${f.n(Wr)} J ; W P = W N = 0 J`) +
          sub('c) Velocidad') +
          eq(`W total = ΔEc: ${f.n(WF)} − ${f.n(-Wr)} = ½·m·v² ⟹ v = √(2 · ${f.n(WF + Wr)} / ${f.d(d.m)}) = ${f.n(v)} m/s`) +
          comp(`por dinámica: a = (Fx − Fr)/m = ${f.n(ac)} m/s² y v = √(2·a·Δx) = ${f.n(Math.sqrt(2 * ac * d.s))} m/s.`) +
          interp(`Tirando hacia arriba con el mismo ángulo, N valdría ${f.n(d.m * G - Fy)} N y el rozamiento sería menor: tirar es más eficaz que empujar hacia abajo.`);
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
        const Fx = d.F * cos(d.a), Fy = d.F * sen(d.a), N = d.m * G - Fy, Fr = Fx, mu = Fr / N, WF = Fx * d.s, Fh = mu * d.m * G;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `F = ${f.d(d.F)} N a ${f.d(d.a)}°, tirando hacia arriba`, 'velocidad constante', `Δx = ${f.d(d.s)} m`, G98) +
          fig('horizontal', { alpha: d.a, F: d.F, P: d.m * G, N, Fr, v: 'v constante' }, 'Cuatro fuerzas: el peso, la normal, la cuerda (descompuesta en Fx, que arrastra, y Fy, que levanta un poco) y el rozamiento, hacia atrás.') +
          herr('La clave es «velocidad constante»: si v no cambia, la aceleración es cero y, por la segunda ley de Newton, <strong>ΣF = 0 en los dos ejes</strong>. Es un problema de dinámica: de ahí salen N, Fr y μ. Después, los trabajos con W = F·Δs·cos φ.') +
          sub('a) Coeficiente de rozamiento') + sub('Paso 1. Componentes de F') +
          eq(`Fx = F·cos ${f.d(d.a)}° = ${f.n(Fx)} N ; Fy = F·sen ${f.d(d.a)}° = ${f.n(Fy)} N`) +
          por('se descompone', 'Fx arrastra el trineo y Fy lo levanta un poco. Cada eje se estudia por separado.') +
          sub('Paso 2. Eje vertical: la normal') +
          eq(`ΣFy = 0: N + F·sen α − m·g = 0 ⟹ N = m·g − F·sen α = ${f.n(d.m * G)} − ${f.n(Fy)} = ${f.n(N)} N`) +
          por('N no es m·g', `La cuerda sostiene ${f.n(Fy)} N del peso, así que el suelo empuja menos. N = m·g solo vale si nada más tira en vertical.`) +
          sub('Paso 3. Eje horizontal: el rozamiento') +
          eq(`ΣFx = 0: F·cos α − Fr = 0 ⟹ Fr = F·cos α = ${f.n(Fr)} N`) +
          por('0 y no m·a', 'Porque v es constante: a = 0. Lo que tira hacia delante y el rozamiento se compensan exactamente.') +
          sub('Paso 4. El coeficiente') +
          eq(`Fr = μ·N ⟹ μ = Fr / N = F·cos α / (m·g − F·sen α) = ${f.n(Fr)} / ${f.n(N)} = ${f.n(mu)}`) +
          por('entre N y no entre el peso', 'El rozamiento depende de lo fuerte que se aprietan las superficies, que es N. El resultado no tiene unidades y está entre 0 y 1, como debe.') +
          sub(`b) Trabajo de cada fuerza en ${f.d(d.s)} m`) +
          eq(`W F = F·Δx·cos ${f.d(d.a)}° = ${f.d(d.F)} · ${f.d(d.s)} · ${f.n(cos(d.a))} = ${f.n(WF)} J`) +
          por(`cos ${f.d(d.a)}°`, 'Solo trabaja Fx; Fy es vertical y el trineo no se mueve en vertical.') +
          eq(`W roz = Fr·Δx·cos 180° = −${f.n(Fr)} · ${f.d(d.s)} = −${f.n(WF)} J`) +
          por('cos 180°', 'El rozamiento va siempre contra el movimiento: su trabajo es negativo y quita energía.') +
          eq('W P = W N = 0 J') + por('cero', 'Son verticales y el desplazamiento es horizontal: cos 90° = 0.') +
          sub('c) Trabajo total') +
          eq(`W total = W F + W roz + W P + W N = ${f.n(WF)} − ${f.n(WF)} + 0 + 0 = 0 J`) +
          por('tiene que salir cero', 'Por el teorema de las fuerzas vivas, W total = ΔEc; si la velocidad no cambia, ΔEc = 0.') +
          interp(`Trabajo total cero no quiere decir que nadie trabaje. La cuerda hace ${f.n(WF)} J de trabajo y el rozamiento convierte exactamente esa energía en calor (energía disipada). La energía mecánica del trineo no cambia: ni acelera ni sube. Con la forma de los apuntes, E M0 + W F = E MF + Fr·Δx, y como E M0 = E MF, queda W F = Fr·Δx.`) +
          comp(`si la cuerda fuera horizontal, haría falta F = μ·m·g = ${f.n(Fh)} N. ${Fh > d.F ? 'Tirar un poco hacia arriba ahorra fuerza, porque aligera el trineo y baja el rozamiento.' : `Es casi lo mismo que los ${f.d(d.F)} N inclinados: a ${f.d(d.a)}° la cuerda pierde más fuerza hacia delante (cos α) de la que ahorra aligerando el trineo.`}`);
        return { resultado: `μ = ${f.n(mu)} · W F = ${f.n(WF)} J · W roz = −${f.n(WF)} J · W P = W N = 0 · W total = 0`, pasos, val: { mu, WF } };
      },
      sim(d) { const N = d.m * G - d.F * sen(d.a); return { widget: 'bloque', cfg: { escenario: 'arrastre', m: d.m, F: d.F, alpha: d.a, mu: +(d.F * cos(d.a) / N).toFixed(5), v0: 1.5, hasta: 'd', d: d.s, controles: ['F', 'alpha', 'mu', 'd'] } }; },
    },
    {
      id: 'soltar', titulo: 'Empujar y soltar: distancia hasta pararse',
      datos(r) { const m = r.int(2, 10), mu = r.step(0.15, 0.4, 0.05), F0 = Math.ceil(1.4 * mu * m * G / 5) * 5; return { m, mu, F: r.step(F0, F0 + 30, 5), s: r.int(2, 8) }; },
      enunciado: (d, f) => `Un bloque de ${f.d(d.m)} kg en reposo sobre un suelo horizontal se empuja con una fuerza horizontal de ${f.d(d.F)} N durante ${f.d(d.s)} m. Después se deja de empujar y sigue deslizando hasta pararse. El coeficiente de rozamiento es ${f.d(d.mu)}. Calcula: a) la velocidad cuando se deja de empujar; b) la distancia que recorre después; c) el trabajo total del rozamiento.`,
      solucion(d, f) {
        const Fr = d.mu * d.m * G, Ec = (d.F - Fr) * d.s, v = Math.sqrt(2 * Ec / d.m), d2 = Ec / Fr, Wr = -Fr * (d.s + d2);
        const pasos = datos(`m = ${f.d(d.m)} kg`, `F = ${f.d(d.F)} N horizontal durante d = ${f.d(d.s)} m`, `μ = ${f.d(d.mu)}`, 'parte del reposo', G98) +
          fig('horizontal', { alpha: 0, F: d.F, P: d.m * G, N: d.m * G, Fr, v: 'v' }, 'Mientras se empuja, F arrastra el bloque y el rozamiento frena. Al soltar desaparece F y solo queda el rozamiento, que lo acaba parando.') +
          herr('Hay <strong>dos tramos</strong> con fuerzas distintas: con F y sin F. En cada uno, teorema de las fuerzas vivas (W total = ΔEc), porque dan distancias y no tiempos. Como F es horizontal, N = m·g en los dos tramos.') +
          eq(`N = m·g = ${f.n(d.m * G)} N ; Fr = μ·N = ${f.d(d.mu)} · ${f.n(d.m * G)} = ${f.n(Fr)} N`) +
          por('N = m·g', 'Ni F ni el rozamiento tienen componente vertical: en vertical solo están N y el peso.') +
          sub('a) Primer tramo: con F') +
          eq(`W F + W roz = ½·m·v² − 0 ⟹ (F − Fr)·d = ½·m·v² ⟹ v = √[2·(F − Fr)·d / m] = ${f.n(v)} m/s`) +
          por('(F − Fr)·d', 'W F = F·d (cos 0°) y W roz = −Fr·d (cos 180°). Su suma es el trabajo total, que se convierte en energía cinética.') +
          sub('b) Segundo tramo: sin F') +
          eq(`W roz = ΔEc: −Fr·x = 0 − ½·m·v² ⟹ x = ½·m·v² / Fr = ${f.n(Ec)} / ${f.n(Fr)} = ${f.n(d2)} m`) +
          por('0 − ½·m·v²', 'Empieza el tramo con la velocidad del apartado a) y lo termina parado: el rozamiento se lleva toda esa energía cinética.') +
          sub('c) Trabajo total del rozamiento') +
          eq(`W roz = −Fr·(d + x) = −${f.n(Fr)} · ${f.n(d.s + d2)} = ${f.n(Wr)} J`) +
          comp(`en el viaje completo empieza y acaba parado (ΔEc = 0), así que W F + W roz = 0 ⟹ W roz = −F·d = −${f.d(d.F)} · ${f.d(d.s)} = ${f.n(-d.F * d.s)} J. Coincide: todo el trabajo de F acaba en calor.`);
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
        const pasos = datos(`m = ${f.d(d.m)} kg`, `v₀ = ${f.d(d.v0)} km/h`, `v = ${f.d(d.v1)} km/h`, `d = ${f.d(d.s)} m`) +
          fig('horizontal', { P: 1, N: 1, frena: 'F frenado', v: `v₀ = ${f.d(d.v0)} km/h`, cuerpo: 'coche' }, 'En horizontal el peso y la normal se compensan y no trabajan. La única fuerza que trabaja es la de frenado, contra el movimiento.') +
          herr('Dan las velocidades y la distancia, no el tiempo: <strong>teorema de las fuerzas vivas</strong>, W total = ΔEc. Para el tiempo hace falta la aceleración: dinámica (F = m·a) y cinemática.') +
          sub('Paso 1. Unidades del SI') +
          eq(`v₀ = ${f.d(d.v0)} / 3,6 = ${f.n(u0)} m/s ; v = ${f.d(d.v1)} / 3,6 = ${f.n(u1)} m/s`) +
          por('se divide entre 3,6', '1 km/h = 1000 m / 3600 s. Sin pasar a m/s, la energía no sale en julios.') +
          sub('a) Trabajo de la fuerza de frenado') +
          eq(`W = ΔEc = ½·m·v² − ½·m·v₀² = ${f.n(0.5 * d.m * u1 * u1)} − ${f.n(0.5 * d.m * u0 * u0)} = ${f.n(W)} J`) +
          por('negativo', 'La fuerza de frenado va contra el movimiento y quita energía cinética, que acaba como calor en los frenos.') +
          sub('b) Fuerza de frenado') +
          eq(`W = F·d·cos 180° = −F·d ⟹ F = −W / d = ${f.n(-W)} / ${f.d(d.s)} = ${f.n(F)} N`) +
          sub('c) Tiempo') +
          eq(`a = F / m = ${f.n(a)} m/s² (frenando) ; v = v₀ − a·t ⟹ t = (v₀ − v) / a = ${f.n(t)} s`) +
          por('dinámica', 'La energía no da tiempos: con F constante la aceleración es constante y se usan las ecuaciones del MRUA.') +
          comp(`con la velocidad media del MRUA, d = (v₀ + v)/2 · t = ${f.n((u0 + u1) / 2 * t)} m, que es la distancia del enunciado.`);
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
        const pasos = datos(`m = ${f.d(d.mg)} g = ${f.n(m)} kg`, `v₀ = ${f.d(d.v0)} m/s`, `p = ${f.d(d.p)} cm = ${f.n(p)} m`, 'acaba parada') +
          fig('horizontal', { P: 1, N: 1, sinPN: true, frena: 'F madera', v: `v₀ = ${f.d(d.v0)} m/s`, cuerpo: 'bala' }, 'Dentro de la madera, la única fuerza que trabaja es la de la madera, contra el movimiento (el peso es despreciable frente a ella).') +
          herr('Dan la velocidad y la distancia que penetra: <strong>teorema de las fuerzas vivas</strong>. Para el tiempo, dinámica y MRUA.') +
          sub('Paso 1. Trabajo de la madera') +
          eq(`W = ΔEc = 0 − ½·m·v₀² = −½ · ${f.n(m)} · ${f.d(d.v0)}² = ${f.n(W)} J`) +
          por('pasar a kg y a metros', 'La energía sale en julios solo con unidades del SI.') +
          sub('Paso 2. Fuerza media') +
          eq(`W = −F·p ⟹ F = −W / p = ${f.n(-W)} / ${f.n(p)} = ${f.n(F)} N`) +
          por('−F·p', 'La fuerza de la madera es contraria al movimiento (cos 180°) y actúa a lo largo de los p metros que penetra.') +
          sub('Paso 3. Tiempo') +
          eq(`a = F / m = ${f.n(a)} m/s² ; t = v₀ / a = ${f.n(t)} s`) +
          comp(`en el MRUA, p = (v₀ + 0)/2 · t = ${f.n(d.v0 / 2 * t)} m, que es la profundidad del enunciado.`);
        return { resultado: `F = ${f.n(F)} N · t = ${f.n(t)} s`, pasos, val: { F, t } };
      },
      sim: d => ({ widget: 'bloque', cfg: { escenario: 'bala', m: d.mg / 1000, v0: d.v0, p: d.p / 100 } }),
    },
    {
      id: 'pared', titulo: 'Proyectil que atraviesa una pared',
      datos(r) { const v0 = r.step(300, 700, 50), v1 = r.step(100, 500, 25); if (v1 < 0.2 * v0 || v1 > 0.7 * v0) return null; return { mg: r.step(20, 200, 10), v0, v1, e: r.pick([5, 10, 20, 30, 40, 50]) }; },
      enunciado: (d, f) => `Un proyectil de ${f.d(d.mg)} g atraviesa una pared de madera de ${f.d(d.e)} cm de espesor. Llega a la pared a ${f.d(d.v0)} m/s y sale a ${f.d(d.v1)} m/s. Calcula: a) el trabajo de la fuerza que ejerce la pared; b) la fuerza media, supuesta constante; c) el porcentaje de energía cinética que pierde.`,
      solucion(d, f) {
        const m = d.mg / 1000, e = d.e / 100, W = 0.5 * m * (d.v1 * d.v1 - d.v0 * d.v0), F = -W / e, pct = 100 * (1 - d.v1 * d.v1 / (d.v0 * d.v0)), t = (d.v0 - d.v1) / (F / m);
        const pasos = datos(`m = ${f.d(d.mg)} g = ${f.n(m)} kg`, `v₀ = ${f.d(d.v0)} m/s`, `v = ${f.d(d.v1)} m/s`, `e = ${f.d(d.e)} cm = ${f.n(e)} m`) +
          fig('horizontal', { P: 1, N: 1, sinPN: true, frena: 'F pared', v: `v₀ = ${f.d(d.v0)} m/s`, cuerpo: 'proyectil' }, 'Mientras atraviesa la pared, la fuerza de la madera va contra el movimiento y es la única que trabaja.') +
          herr('Velocidades a la entrada y a la salida y el espesor: <strong>teorema de las fuerzas vivas</strong> entre la entrada y la salida.') +
          sub('a) Trabajo de la pared') +
          eq(`W = ΔEc = ½·m·(v² − v₀²) = ½ · ${f.n(m)} · (${f.d(d.v1)}² − ${f.d(d.v0)}²) = ${f.n(W)} J`) +
          por('v² − v₀²', 'Cada energía cinética lleva su velocidad al cuadrado: no es lo mismo que (v − v₀)².') +
          sub('b) Fuerza media') +
          eq(`W = −F·e ⟹ F = −W / e = ${f.n(-W)} / ${f.n(e)} = ${f.n(F)} N`) +
          sub('c) Energía cinética que pierde') +
          eq(`|ΔEc| / Ec₀ = 1 − v²/v₀² = 1 − (${f.d(d.v1)}/${f.d(d.v0)})² = ${f.fx(pct, 1)} %`) +
          por('la masa no hace falta', 'Al dividir, ½·m se simplifica. La energía va con v²: aunque la velocidad baja menos, la energía baja mucho más.') +
          comp(`en el MRUA, t = (v₀ − v)/a = ${f.n(t)} s y e = (v₀ + v)/2 · t = ${f.n((d.v0 + d.v1) / 2 * t)} m, el espesor del enunciado.`);
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
        const mu = d.inv ? d.v0 * d.v0 / (2 * G * d.s) : d.mu, s = d.inv ? d.s : d.v0 * d.v0 / (2 * d.mu * G), Fr = mu * d.m * G;
        const dib = fig('horizontal', { P: d.m * G, N: d.m * G, Fr, v: `v₀ = ${f.d(d.v0)} m/s` }, 'Nadie empuja: en horizontal el peso y la normal se compensan, y el rozamiento es la única fuerza que trabaja. Va contra el movimiento hasta parar el cuerpo.');
        const base = herr('Dan la velocidad inicial y la distancia (o piden la distancia): <strong>teorema de las fuerzas vivas</strong>, W roz = ΔEc. En horizontal, N = m·g, así que W roz = −μ·m·g·d.') +
          eq('ΣFy = 0 ⟹ N = m·g ; Fr = μ·m·g') + por('N = m·g', 'No hay más fuerzas verticales que el peso y la normal.');
        if (d.inv) {
          const W = -0.5 * d.m * d.v0 * d.v0;
          const pasos = datos(`m = ${f.d(d.m)} kg`, `v₀ = ${f.d(d.v0)} m/s`, `d = ${f.d(d.s)} m hasta pararse`, G98) + dib + base +
            sub('a) Trabajo del rozamiento') +
            eq(`W roz = ΔEc = 0 − ½·m·v₀² = −½ · ${f.d(d.m)} · ${f.d(d.v0)}² = ${f.n(W)} J`) +
            por('0 − ½·m·v₀²', 'Al final está parado: el rozamiento se lleva toda la energía cinética.') +
            sub('b) Coeficiente de rozamiento') +
            eq(`−μ·m·g·d = −½·m·v₀² ⟹ μ = v₀² / (2·g·d) = ${f.d(d.v0)}² / (2 · 9,8 · ${f.d(d.s)}) = ${f.n(mu)}`) +
            por('desaparece la masa', 'Está en los dos lados de la ecuación: despejar con letras antes de sustituir lo deja ver.') +
            comp(`por dinámica, a = μ·g = ${f.n(mu * G)} m/s² y d = v₀²/(2·a) = ${f.n(d.v0 * d.v0 / (2 * mu * G))} m, la distancia del enunciado.`);
          return { resultado: `W roz = ${f.n(W)} J · μ = ${f.n(mu)}`, pasos, val: { mu, d: d.s } };
        }
        const t = d.v0 / (d.mu * G);
        const pasos = datos(`m = ${f.d(d.m)} kg`, `v₀ = ${f.d(d.v0)} m/s`, `μ = ${f.d(d.mu)}`, G98) + dib + base +
          sub('a) Distancia hasta pararse') +
          eq(`W roz = ΔEc: −μ·m·g·d = 0 − ½·m·v₀² ⟹ d = v₀² / (2·μ·g) = ${f.d(d.v0)}² / (2 · ${f.d(d.mu)} · 9,8) = ${f.n(s)} m`) +
          por('se iguala a −½·m·v₀²', 'Al final está parado: el rozamiento se lleva toda la energía cinética.') +
          sub('b) Tiempo') +
          eq(`a = Fr / m = μ·g = ${f.n(d.mu * G)} m/s² (frenando) ; t = v₀ / a = ${f.n(t)} s`) +
          por('dinámica', 'La energía no da tiempos: hace falta la aceleración y el MRUA.') +
          sub('c) Con el doble de masa') +
          P('Recorre la misma distancia: la masa se simplifica en d = v₀²/(2·μ·g). El bloque más pesado tiene el doble de energía cinética, pero también el doble de rozamiento.') +
          comp(`con la velocidad media, d = v₀/2 · t = ${f.n(d.v0 / 2 * t)} m.`);
        return { resultado: `d = ${f.n(s)} m · t = ${f.n(t)} s · la misma distancia con el doble de masa`, pasos, val: { d: s, mu: d.mu } };
      },
      sim(d) { const mu = d.inv ? +(d.v0 * d.v0 / (2 * G * d.s)).toFixed(5) : d.mu; return { widget: 'bloque', cfg: { escenario: 'deslizar', m: d.m, v0: d.v0, mu } }; },
    },
    {
      id: 'acelerar', titulo: 'Coche que acelera: trabajo de la fuerza neta',
      datos(r) { const v0 = r.pick([0, 36, 54, 72]), v1 = r.pick([54, 72, 90, 108, 126]); if (v1 <= v0) return null; const a = r.step(1, 3, 0.5); return { m: r.step(800, 1600, 50), v0, v1, s: Math.round((kmh(v1) ** 2 - kmh(v0) ** 2) / (2 * a)) }; },
      enunciado: (d, f) => `Un coche de ${f.d(d.m)} kg ${d.v0 ? `que circula a ${f.d(d.v0)} km/h acelera` : 'parte del reposo y acelera'} hasta ${f.d(d.v1)} km/h en una distancia de ${f.d(d.s)} m por una carretera horizontal. Calcula: a) el trabajo de la fuerza neta; b) la fuerza neta media; c) el trabajo necesario si la masa fuera el doble.`,
      solucion(d, f) {
        const u0 = kmh(d.v0), u1 = kmh(d.v1), W = 0.5 * d.m * (u1 * u1 - u0 * u0), F = W / d.s, a = F / d.m;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `v₀ = ${f.d(d.v0)} km/h`, `v = ${f.d(d.v1)} km/h`, `d = ${f.d(d.s)} m`) +
          fig('horizontal', { P: 1, N: 1, empuja: 'F neta', v: d.v0 ? `v₀ = ${f.d(d.v0)} km/h` : 'v', cuerpo: 'coche' }, 'El peso y la normal se compensan. La fuerza neta (la del motor menos los rozamientos) va a favor del movimiento y aumenta la energía cinética.') +
          herr('Dan las velocidades y la distancia: <strong>teorema de las fuerzas vivas</strong>, el trabajo de la fuerza neta (el trabajo total) es ΔEc.') +
          sub('Paso 1. Unidades del SI') +
          eq(`v₀ = ${f.d(d.v0)} / 3,6 = ${f.n(u0)} m/s ; v = ${f.d(d.v1)} / 3,6 = ${f.n(u1)} m/s`) +
          sub('a) Trabajo de la fuerza neta') +
          eq(`W = ½·m·v² − ½·m·v₀² = ½ · ${f.d(d.m)} · (${f.n(u1)}² − ${f.n(u0)}²) = ${f.n(W)} J`) +
          por('v² − v₀² y no (v − v₀)²', 'Cada energía cinética lleva su propia velocidad al cuadrado. Con (v − v₀)² saldría otro número.') +
          sub('b) Fuerza neta media') +
          eq(`W = F·d·cos 0° ⟹ F = W / d = ${f.n(W)} / ${f.d(d.s)} = ${f.n(F)} N`) +
          sub('c) Con el doble de masa') +
          eq(`W = ½·(2m)·(v² − v₀²) = ${f.n(2 * W)} J`) +
          por('el doble', 'La energía cinética es proporcional a la masa: para alcanzar las mismas velocidades hace falta el doble de trabajo.') +
          comp(`por dinámica, a = F/m = ${f.n(a)} m/s² y v² = v₀² + 2·a·d = ${f.n(u0 * u0 + 2 * a * d.s)} m²/s², es decir, v = ${f.n(Math.sqrt(u0 * u0 + 2 * a * d.s))} m/s.`);
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
        const pts = [{ id: 'A', h: d.h0, txt: `lanzamiento: h = ${f.d(d.h0)} m, v = ${f.d(d.v0)} m/s`, v: 'arriba' }, { id: 'B', h: hm, txt: 'punto más alto: v = 0' }, { id: 'C', h: d.h1, txt: `h = ${f.d(d.h1)} m` }];
        if (d.h0 > 0) pts.push({ id: 'D', h: 0, txt: 'suelo: h = 0', v: 'abajo' });
        const pasos = datos(`m = ${f.d(d.m)} kg`, `v₀ = ${f.d(d.v0)} m/s hacia arriba`, `h₀ = ${f.d(d.h0)} m`, 'sin rozamiento con el aire', G98) +
          fig('niveles', { puntos: pts, nivel0: 'h = 0 (suelo)' }, 'Se fija h = 0 en el suelo y se marcan los puntos que interesan: el de lanzamiento, el más alto y los de las preguntas.') +
          herr('Sin rozamiento con el aire solo trabaja el peso, que es una fuerza conservativa: <strong>se conserva la energía mecánica</strong>, Ec + Ep = constante, entre dos puntos cualesquiera. Se usa energía porque no preguntan tiempos.') +
          eq('Ec,A + Ep,A = Ec,B + Ep,B ⟺ ½·m·v_A² + m·g·h_A = ½·m·v_B² + m·g·h_B') +
          sub('a) Altura máxima (de A a B)') +
          eq(`½·m·v₀² + m·g·h₀ = 0 + m·g·h máx ⟹ h máx = h₀ + v₀² / (2·g) = ${f.d(d.h0)} + ${f.d(d.v0)}² / 19,6 = ${f.n(hm)} m`) +
          por('Ec,B = 0', 'En el punto más alto de un tiro vertical el cuerpo se para un instante: v = 0. La masa está en todos los términos y se simplifica.') +
          sub(`b) Velocidad a ${f.d(d.h1)} m (de A a C)`) +
          eq(`½·v₀² + g·h₀ = ½·v² + g·h ⟹ v = √[v₀² − 2·g·(h − h₀)] = √[${f.d(d.v0)}² − 19,6 · ${f.n(d.h1 - d.h0)}] = ${f.n(v1)} m/s`) +
          P('Pasa por esa altura con esa rapidez al subir y otra vez al bajar: la energía no distingue el sentido.') +
          sub('c) Velocidad al llegar al suelo') +
          eq(`½·v₀² + g·h₀ = ½·v² + 0 ⟹ v = √(v₀² + 2·g·h₀) = ${f.n(vs)} m/s`) +
          por('Ep = 0 en el suelo', 'Es el nivel h = 0 que se fijó al principio.') +
          comp(`desde el punto más alto cae desde el reposo ${f.n(hm)} m: v = √(2·g·h máx) = ${f.n(Math.sqrt(2 * G * hm))} m/s, igual que en c).`);
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
        const pasos = datos(`m = ${f.d(d.m)} kg`, `h = ${f.d(d.h)} m`, `v₀ = ${f.d(d.v0)} m/s${d.v0 ? ' (horizontal)' : ''}`, 'sin rozamiento con el aire', G98) +
          fig('niveles', { puntos: [{ id: 'A', h: d.h, txt: d.v0 ? `sale con v₀ = ${f.d(d.v0)} m/s` : 'se suelta: v₀ = 0', v: d.v0 ? 'horizontal' : undefined }, { id: 'M', h: d.h / 2, txt: `mitad de altura: ${f.n(d.h / 2)} m` }, { id: 'S', h: 0, txt: 'suelo', v: 'abajo' }], nivel0: 'h = 0 (suelo)' }, 'Nivel h = 0 en el suelo. Interesan tres puntos: la salida, la mitad de la altura y la llegada al suelo.') +
          herr(`Solo trabaja el peso: <strong>conservación de la energía mecánica</strong>. ${d.v0 ? 'Además, la energía no necesita saber la dirección de la velocidad: sirve aunque la pelota caiga describiendo una curva.' : 'No preguntan tiempos, así que la energía es lo más rápido.'}`) +
          sub('a) Llegada al suelo (de A a S)') +
          eq(`½·m·v₀² + m·g·h = ½·m·v² + 0 ⟹ v = √(v₀² + 2·g·h) = √(${f.d(d.v0)}² + 19,6 · ${f.d(d.h)}) = ${f.n(v)} m/s`) +
          por('Ep,S = 0', 'En el suelo h = 0. Toda la energía potencial del principio se ha convertido en cinética.') +
          sub('b) A mitad de altura (de A a M)') +
          eq(`½·v₀² + g·h = ½·v² + g·h/2 ⟹ v = √(v₀² + g·h) = ${f.n(vm)} m/s`) +
          por('no es la mitad', 'A mitad de altura se ha convertido la mitad de la Ep, pero la velocidad no es la mitad, porque Ec va con v².') +
          sub('c) Con el doble de masa') +
          P('No cambia: la masa está en todos los términos y se simplifica. Sin rozamiento con el aire, todos los cuerpos llegan con la misma velocidad.') +
          comp(d.v0 ? `cada mitad de la caída aporta la misma energía, m·g·h/2: v² aumenta ${f.n(G * d.h)} m²/s² en cada mitad (${f.n(d.v0 * d.v0)} → ${f.n(vm * vm)} → ${f.n(v * v)}).` : `por cinemática (caída libre), t = √(2·h/g) = ${f.n(Math.sqrt(2 * d.h / G))} s y v = g·t = ${f.n(G * Math.sqrt(2 * d.h / G))} m/s.`);
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
          const h = d.v0 * d.v0 / (2 * G), s = h / sen(d.a), ac = G * sen(d.a);
          const pasos = datos(`m = ${f.d(d.m)} kg`, `α = ${f.d(d.a)}°`, `v₀ = ${f.d(d.v0)} m/s`, 'sin rozamiento', G98) +
            fig('plano', { alpha: d.a, mov: 'sube', roz: false, v: 'v₀' }, 'Sin rozamiento, sobre el cuerpo solo actúan el peso y la normal. La normal es perpendicular al plano y no trabaja.') +
            herr('Solo trabaja el peso (la normal no trabaja porque es perpendicular al movimiento): <strong>se conserva la energía mecánica</strong>. Nivel h = 0 en la base del plano.') +
            sub('Paso 1. Altura máxima') +
            eq(`Ec,A + Ep,A = Ec,B + Ep,B: ½·m·v₀² + 0 = 0 + m·g·h ⟹ h = v₀² / (2·g) = ${f.d(d.v0)}² / 19,6 = ${f.n(h)} m`) +
            por('Ec,B = 0 y Ep,A = 0', 'En la base h = 0; en el punto más alto el cuerpo se para un instante. La masa se simplifica.') +
            sub('Paso 2. Distancia sobre el plano') +
            eq(`h = d·sen α ⟹ d = h / sen ${f.d(d.a)}° = ${f.n(h)} / ${f.n(sen(d.a))} = ${f.n(s)} m`) +
            por('sen α', 'El plano es la hipotenusa; la altura, el cateto opuesto a α.') +
            sub('Paso 3. Vuelta a la base') +
            P(`Sin rozamiento no se pierde energía: vuelve a la base con la misma rapidez, ${f.d(d.v0)} m/s, pero hacia abajo.`) +
            comp(`por dinámica, la aceleración a lo largo del plano es g·sen α = ${f.n(ac)} m/s² y d = v₀²/(2·a) = ${f.n(d.v0 * d.v0 / (2 * ac))} m.`);
          return { resultado: `h = ${f.n(h)} m · d = ${f.n(s)} m · vuelve a ${f.d(d.v0)} m/s`, pasos, val: { h, d: s } };
        }
        const v = Math.sqrt(2 * G * d.h), vm = Math.sqrt(G * d.h), s = d.h / sen(d.a), ac = G * sen(d.a);
        const pasos = datos(`m = ${f.d(d.m)} kg`, `α = ${f.d(d.a)}°`, `h = ${f.d(d.h)} m`, 'se suelta (v₀ = 0)', 'sin rozamiento', G98) +
          fig('plano', { alpha: d.a, mov: 'baja', roz: false, v: 'v' }, 'Sin rozamiento, solo actúan el peso y la normal. Px empuja el cuerpo plano abajo; la normal no trabaja.') +
          herr('Solo trabaja el peso: <strong>conservación de la energía mecánica</strong>, con h = 0 en la base.') +
          sub('Paso 1. Velocidad en la base') +
          eq(`0 + m·g·h = ½·m·v² + 0 ⟹ v = √(2·g·h) = √(19,6 · ${f.d(d.h)}) = ${f.n(v)} m/s`) +
          por('no aparece el ángulo', 'La energía solo depende de la altura que baja, no del camino.') +
          sub('Paso 2. A mitad de altura') +
          eq(`m·g·h = ½·m·v² + m·g·h/2 ⟹ v = √(g·h) = ${f.n(vm)} m/s`) +
          sub('¿Influye el ángulo?') +
          P('En la velocidad final no: solo cuenta la altura. Sí influye en el tiempo que tarda: con más pendiente acelera más y llega antes.') +
          comp(`por dinámica, a = g·sen α = ${f.n(ac)} m/s², d = h/sen α = ${f.n(s)} m y v² = 2·a·d = ${f.n(2 * ac * s)} m²/s², es decir, v = ${f.n(Math.sqrt(2 * ac * s))} m/s.`);
        return { resultado: `v = ${f.n(v)} m/s en la base · ${f.n(vm)} m/s a mitad de altura`, pasos, val: { v } };
      },
      sim: d => d.sube ? { widget: 'plano', cfg: { escenario: 'sube', m: d.m, alpha: d.a, mu: 0, v0: d.v0, controles: ['m', 'alpha', 'v0'] } } : { widget: 'plano', cfg: { escenario: 'baja', m: d.m, alpha: d.a, h: d.h, mu: 0, v0: 0, controles: ['m', 'alpha', 'h'] } },
    },
    {
      id: 'oblicuo', titulo: 'Tiro oblicuo: velocidad en el punto más alto',
      datos: r => ({ v0: r.int(10, 30), th: r.step(20, 70, 5) }),
      enunciado: (d, f) => `Desde el suelo se lanza un balón con una velocidad de ${f.d(d.v0)} m/s formando ${f.d(d.th)}° con la horizontal. Sin rozamiento con el aire: a) ¿qué velocidad lleva en el punto más alto? b) Calcula la altura máxima aplicando la conservación de la energía. c) ¿Con qué rapidez llega al suelo?`,
      solucion(d, f) {
        const vx = d.v0 * cos(d.th), vy = d.v0 * sen(d.th), hm = (d.v0 * d.v0 - vx * vx) / (2 * G);
        const pasos = datos(`v₀ = ${f.d(d.v0)} m/s`, `θ = ${f.d(d.th)}°`, 'desde el suelo', 'sin rozamiento con el aire', G98) +
          fig('parabola', { th: d.th, v0txt: `v₀ = ${f.d(d.v0)} m/s`, vxtxt: 'v = vx', htxt: 'h máx' }, 'El balón sale de A con v₀ inclinada. En el punto más alto, B, solo le queda la velocidad horizontal.') +
          herr('Dos ideas: no hay fuerzas horizontales, así que <strong>vx no cambia</strong>; y solo trabaja el peso, así que <strong>se conserva la energía mecánica</strong> (nivel h = 0 en el suelo).') +
          sub('a) Velocidad en el punto más alto') +
          eq(`v_B = vx = v₀·cos ${f.d(d.th)}° = ${f.d(d.v0)} · ${f.n(cos(d.th))} = ${f.n(vx)} m/s`) +
          por('no es cero', 'En el punto más alto se anula la componente vertical, pero la horizontal sigue igual que al principio.') +
          sub('b) Altura máxima (de A a B)') +
          eq(`½·m·v₀² + 0 = ½·m·vx² + m·g·h máx ⟹ h máx = (v₀² − vx²) / (2·g) = ${f.n(hm)} m`) +
          por('½·m·vx² en B', 'En B el balón sigue moviéndose: tiene energía cinética, la de su velocidad horizontal.') +
          sub('c) Llegada al suelo') +
          P(`Vuelve a la altura de salida (Ep igual), así que tiene la misma Ec: llega con la misma rapidez, ${f.d(d.v0)} m/s.`) +
          comp(`por cinemática, vy₀ = v₀·sen θ = ${f.n(vy)} m/s y h máx = vy₀²/(2·g) = ${f.n(vy * vy / (2 * G))} m.`);
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
        const Ec1 = 0.5 * d.m * d.v1 ** 2, Ep1 = d.m * G * d.h1, Ec2 = 0.5 * d.m * d.v2 ** 2, Ep2 = d.m * G * d.h2, E1 = Ec1 + Ep1, E2 = Ec2 + Ep2, W = E2 - E1;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `estado 1: h = ${f.d(d.h1)} m, v = ${f.d(d.v1)} m/s`, `estado 2: h = ${f.d(d.h2)} m, v = ${f.d(d.v2)} m/s`, G98) +
          fig('niveles', { puntos: [{ id: '1', h: d.h1, txt: `h = ${f.d(d.h1)} m, v = ${f.d(d.v1)} m/s` }, { id: '2', h: d.h2, txt: `h = ${f.d(d.h2)} m, v = ${f.d(d.v2)} m/s` }], nivel0: 'h = 0 (suelo)' }, 'Se fija h = 0 en el suelo y se comparan los dos estados.') +
          herr('Hay que <strong>aportar</strong> energía, así que no se conserva la energía mecánica: el trabajo de las fuerzas exteriores (no conservativas) es su variación, W = ΔE M = E M2 − E M1. Es la forma de los apuntes E M1 + W = E M2.') +
          sub('Paso 1. Energía mecánica en cada estado') +
          eq(`E M1 = ½·m·v₁² + m·g·h₁ = ${f.n(Ec1)} + ${f.n(Ep1)} = ${f.n(E1)} J`) +
          eq(`E M2 = ½·m·v₂² + m·g·h₂ = ${f.n(Ec2)} + ${f.n(Ep2)} = ${f.n(E2)} J`) +
          por('se suman las dos', 'La energía mecánica es la cinética (por moverse) más la potencial (por la altura).') +
          sub('Paso 2. Energía que hay que suministrar') +
          eq(`W = E M2 − E M1 = ${f.n(E2)} − ${f.n(E1)} = ${f.n(W)} J`) +
          por('positivo', 'Al final el cuerpo tiene más energía mecánica que al principio: la diferencia la tiene que aportar alguien (un motor, una persona).') +
          comp(`por partes, ΔEp = ${f.n(Ep2 - Ep1)} J y ΔEc = ${f.n(Ec2 - Ec1)} J; su suma es ${f.n(W)} J.${Ec2 < Ec1 ? ' La ΔEc es negativa: el cuerpo frena, y esa energía cinética ayuda a subirlo, por eso hay que aportar menos que la ΔEp.' : ''}`);
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
        const x = d.v0 * Math.sqrt(d.m / d.k), v1 = Math.sqrt(d.v0 ** 2 - d.k * d.x1 ** 2 / d.m), E = 0.5 * d.m * d.v0 ** 2;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `v₀ = ${f.d(d.v0)} m/s`, `k = ${f.d(d.k)} N/m`, `x₁ = ${f.d(Math.round(d.x1 * 100))} cm = ${f.d(d.x1)} m`, 'sin rozamiento') +
          fig('muelleH', { A: { txt: `llega al muelle con v₀ = ${f.d(d.v0)} m/s`, v: 'der', vtxt: 'v₀' }, B: { txt: 'compresión máxima x: se para un instante', comp: true } }, 'Dos estados: A, cuando toca el muelle (toda la energía es cinética), y B, la compresión máxima (toda la energía está en el muelle).') +
          herr('Sin rozamiento, la única fuerza que trabaja es la del muelle, que es conservativa: <strong>se conserva la energía mecánica</strong>, ahora con energía potencial elástica Ep el = ½·k·x². No hay cambio de altura.') +
          sub('a) Compresión máxima (de A a B)') +
          eq(`Ec,A + Ep el,A = Ec,B + Ep el,B: ½·m·v₀² + 0 = 0 + ½·k·x² ⟹ x = v₀·√(m/k) = ${f.d(d.v0)} · √(${f.d(d.m)}/${f.d(d.k)}) = ${f.n(x)} m`) +
          por('Ec,B = 0 y Ep el,A = 0', 'En A el muelle aún no está comprimido; en la compresión máxima el cuerpo se para un instante antes de volver.') +
          sub(`b) Velocidad con el muelle comprimido ${f.d(Math.round(d.x1 * 100))} cm`) +
          eq(`½·m·v₀² = ½·m·v² + ½·k·x₁² ⟹ v = √(v₀² − k·x₁²/m) = √(${f.d(d.v0)}² − ${f.d(d.k)} · ${f.d(d.x1)}² / ${f.d(d.m)}) = ${f.n(v1)} m/s`) +
          por('dos términos a la derecha', 'A mitad de camino el cuerpo aún se mueve y el muelle ya guarda energía.') +
          ojo('x tiene que ir en metros para que k (en N/m) dé julios.') +
          comp(`en ese punto, Ec + Ep el = ${f.n(0.5 * d.m * v1 * v1)} + ${f.n(0.5 * d.k * d.x1 ** 2)} = ${f.n(E)} J, la energía inicial; y x₁ = ${f.d(d.x1)} m es menor que x máx, como debe.`);
        return { resultado: `x máx = ${f.n(x)} m · v = ${f.n(v1)} m/s`, pasos, val: { x, v1 } };
      },
      sim: d => ({ widget: 'muelle', cfg: { escenario: 'horizontal', m: d.m, v0: d.v0, k: d.k, mu: 0, L: 0.5 } }),
    },
    {
      id: 'vertical', titulo: 'Caída sobre un resorte',
      datos(r) { const d = { m: r.step(0.1, 2, 0.1), h: r.step(0.5, 5, 0.5), k: r.step(200, 3000, 50) }; const x = raiz(0.5 * d.k, -d.m * G, -d.m * G * d.h); return x < 0.6 && x > 0.02 ? d : null; },
      enunciado: (d, f) => `Desde una altura de ${f.d(d.h)} m sobre la parte de arriba de un resorte vertical (sin comprimir) se deja caer un cuerpo de ${f.d(d.m)} kg. La constante del resorte es ${f.d(d.k)} N/m. Calcula: a) la compresión máxima; b) cuánto se comprimiría con el cuerpo apoyado encima, en reposo.`,
      solucion(d, f) {
        const a = 0.5 * d.k, b = -d.m * G, c = -d.m * G * d.h, x = raiz(a, b, c), x2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a), x0 = d.m * G / d.k;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `h = ${f.d(d.h)} m sobre el extremo del resorte`, `k = ${f.d(d.k)} N/m`, 'se deja caer (v₀ = 0)', G98) +
          fig('muelleV', { hTxt: `h = ${f.d(d.h)} m`, xTxt: 'x' }, 'Estado A: el cuerpo se suelta. Estado B: compresión máxima. Entre los dos baja h + x, porque sigue bajando mientras comprime el muelle.') +
          herr('Trabajan el peso y el muelle, las dos conservativas: <strong>se conserva la energía mecánica</strong> con Ep gravitatoria y Ep elástica. Truco: poner <strong>h = 0 en el punto de máxima compresión</strong>; así la Ep gravitatoria final es cero.') +
          sub('a) Compresión máxima (de A a B)') +
          eq('Ec,A + Ep,A + Ep el,A = Ec,B + Ep,B + Ep el,B ⟹ 0 + m·g·(h + x) + 0 = 0 + 0 + ½·k·x²') +
          por('cada término', 'En A está parado (Ec = 0), a una altura h + x sobre el nivel elegido, y el muelle está sin comprimir. En B está parado otra vez, en h = 0, y el muelle guarda ½·k·x².') +
          eq(`${f.n(a)}·x² − ${f.n(-b)}·x − ${f.n(-c)} = 0 ⟹ x = ${f.n(x)} m`) +
          por('se descarta la otra raíz', `La ecuación de segundo grado da también x = ${f.n(x2)} m, negativa: no tiene sentido físico (sería el muelle estirado).`) +
          sub('b) Con el cuerpo apoyado en reposo') +
          eq(`ΣF = 0: k·x₀ = m·g ⟹ x₀ = m·g / k = ${f.n(d.m * G)} / ${f.d(d.k)} = ${f.n(x0)} m`) +
          por('fuerzas y no energías', 'En reposo se compensan la fuerza del muelle y el peso. Igualar ½·k·x² = m·g·x es un error frecuente: daría el doble.') +
          comp(`sustituyendo en la ecuación de energía: m·g·(h + x) = ${f.n(-b * (d.h + x))} J y ½·k·x² = ${f.n(a * x * x)} J. Además, x máx es mucho mayor que x₀: al caer, el cuerpo comprime el muelle más que apoyado en reposo.`);
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
        const pasos = datos(`F = ${f.d(d.F)} N`, `x = ${f.d(d.xc)} cm = ${f.n(x)} m`, `m = ${f.d(d.m)} kg`, 'sin rozamiento') +
          fig('muelleH', { A: { txt: 'muelle comprimido x, cuerpo en reposo', comp: true }, B: { txt: 'el muelle recupera su longitud y lanza el cuerpo', v: 'izq', vtxt: 'v' } }, 'Estado A: muelle comprimido y cuerpo parado (toda la energía en el muelle). Estado B: el muelle ya no está comprimido y el cuerpo sale con velocidad v.') +
          herr('a) <strong>Ley de Hooke</strong>, F = k·x, para la constante. b) Energía potencial elástica. c) Sin rozamiento, <strong>conservación de la energía</strong>: la energía del muelle pasa al cuerpo.') +
          sub('a) Constante elástica') +
          eq(`F = k·x ⟹ k = F / x = ${f.d(d.F)} / ${f.n(x)} = ${f.n(k)} N/m`) +
          por('x en metros', 'k se mide en N/m: con x en centímetros saldría cien veces menor.') +
          sub('b) Energía almacenada') +
          eq(`Ep el = ½·k·x² = ½ · ${f.n(k)} · ${f.n(x)}² = ${f.n(E)} J`) +
          por('½', 'La fuerza del muelle crece desde 0 hasta k·x al comprimirlo: el trabajo es el de la fuerza media, ½·k·x.') +
          sub('c) Velocidad de lanzamiento (de A a B)') +
          eq(`½·k·x² + 0 = 0 + ½·m·v² ⟹ v = x·√(k/m) = ${f.n(v)} m/s`) +
          comp(`Ep el = ½·F·x = ½ · ${f.d(d.F)} · ${f.n(x)} = ${f.n(0.5 * d.F * x)} J, lo mismo que en b) (el área del triángulo de la gráfica F–x).`);
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
        const pasos = datos(`m = ${f.d(d.m)} kg`, `v₀ = ${f.d(d.v0)} m/s`, `μ = ${f.d(d.mu)}`, `L = ${f.d(d.L)} m`, `k = ${f.d(d.k)} N/m`, G98) +
          fig('muelleH', { roz: true, A: { txt: `lanzado con v₀ a L = ${f.d(d.L)} m del muelle`, v: 'der', vtxt: 'v₀', sep: true, Ltxt: `L = ${f.d(d.L)} m` }, B: { txt: 'compresión máxima x: se para', comp: true } }, 'El rozamiento frena el bloque durante todo el recorrido: en el tramo L y también mientras comprime el muelle (x).') +
          herr('Hay rozamiento, así que la energía mecánica no se conserva: <strong>ecuación de trabajo y energía</strong>, Ec,A + Ep,A + W roz = Ec,B + Ep,B, con W roz negativo. En horizontal N = m·g y Fr = μ·m·g.') +
          eq(`Fr = μ·m·g = ${f.d(d.mu)} · ${f.d(d.m)} · 9,8 = ${f.n(Fr)} N`) +
          sub('a) Velocidad al llegar al muelle (tramo L)') +
          eq(`½·m·v₀² − Fr·L = ½·m·v₁² ⟹ v₁ = √(v₀² − 2·μ·g·L) = √(${f.d(d.v0)}² − 2 · ${f.d(d.mu)} · 9,8 · ${f.d(d.L)}) = ${f.n(v1)} m/s`) +
          por('−Fr·L', 'Es el trabajo del rozamiento, escrito con su signo; no hay que volver a restarlo.') +
          sub('b) Compresión máxima (tramo x)') +
          eq(`½·m·v₁² − Fr·x = ½·k·x² ⟹ ${f.n(0.5 * d.k)}·x² + ${f.n(Fr)}·x − ${f.n(0.5 * d.m * v1s)} = 0 ⟹ x = ${f.n(x)} m`) +
          por('aparece −Fr·x', 'Mientras comprime el muelle sigue deslizando una distancia x, así que el rozamiento también trabaja ahí. Por eso la ecuación es de segundo grado; la raíz negativa se descarta.') +
          comp(`balance total: ½·m·v₀² = ${f.n(0.5 * d.m * d.v0 ** 2)} J se reparte en ½·k·x² = ${f.n(0.5 * d.k * x * x)} J en el muelle y Fr·(L + x) = ${f.n(Fr * (d.L + x))} J de calor.`);
        return { resultado: `v = ${f.n(v1)} m/s al llegar · x máx = ${f.n(x)} m`, pasos, val: { v1, x } };
      },
      sim: d => ({ widget: 'muelle', cfg: { escenario: 'horizontal', m: d.m, v0: d.v0, mu: d.mu, L: d.L, k: d.k, rozMuelle: true } }),
    },
    {
      id: 'colgado', titulo: 'Muelle con una pesa colgada y caída',
      datos(r) { const d = { m: r.step(0.2, 2, 0.1), x0: r.pick([1, 1.5, 2, 2.5, 3, 4, 5]), h: r.step(0.5, 2, 0.5) }; return d; },
      enunciado: (d, f) => `Un muelle se alarga ${f.d(d.x0)} cm al colgar de él una pesa de ${f.d(d.m)} kg. Colocamos el muelle vertical sobre el suelo y dejamos caer sobre él la misma pesa desde ${f.d(d.h)} m por encima de su extremo. Calcula: a) la constante elástica; b) la compresión máxima.`,
      solucion(d, f) {
        const x0 = d.x0 / 100, k = d.m * G / x0, x = raiz(0.5 * k, -d.m * G, -d.m * G * d.h);
        const pasos = datos(`m = ${f.d(d.m)} kg`, `alargamiento con la pesa colgada x₀ = ${f.d(d.x0)} cm = ${f.n(x0)} m`, `h = ${f.d(d.h)} m`, G98) +
          fig('muelleV', { hTxt: `h = ${f.d(d.h)} m`, xTxt: 'x' }, 'Estado A: la pesa se suelta a h por encima del muelle. Estado B: compresión máxima. Baja h + x en total; el nivel h = 0 se pone en B.') +
          herr('a) Pesa colgada y en reposo: <strong>equilibrio de fuerzas</strong>, k·x₀ = m·g. b) En la caída trabajan el peso y el muelle: <strong>conservación de la energía mecánica</strong>.') +
          sub('a) Constante elástica') +
          eq(`ΣF = 0: k·x₀ − m·g = 0 ⟹ k = m·g / x₀ = ${f.n(d.m * G)} / ${f.n(x0)} = ${f.n(k)} N/m`) +
          por('fuerzas y no energías', 'Colgada y quieta, la fuerza del muelle equilibra al peso. No se puede usar ½·k·x² = m·g·x: daría el doble.') +
          sub('b) Compresión máxima') +
          eq(`m·g·(h + x) = ½·k·x² ⟹ ${f.n(0.5 * k)}·x² − ${f.n(d.m * G)}·x − ${f.n(d.m * G * d.h)} = 0 ⟹ x = ${f.n(x)} m`) +
          por('h + x', 'La pesa sigue bajando mientras comprime el muelle. Con h = 0 en B, la Ep gravitatoria final es cero; la raíz negativa se descarta.') +
          comp(`al caer comprime el muelle ${f.fx(x / x0, 1)} veces más que colgada en reposo, como cabe esperar al llegar con velocidad; y ½·k·x² = ${f.n(0.5 * k * x * x)} J = m·g·(h + x) = ${f.n(d.m * G * (d.h + x))} J.`);
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
        const s = d.v0 ** 2 / (2 * G * (sen(d.a) + d.mu * cos(d.a))), h = s * sen(d.a), N = d.m * G * cos(d.a), Fr = d.mu * N, Wr = -Fr * s, vuelve = tg(d.a) > d.mu, vv = vuelve ? Math.sqrt(2 * G * s * (sen(d.a) - d.mu * cos(d.a))) : 0;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `α = ${f.d(d.a)}°`, `μ = ${f.d(d.mu)}`, `v₀ = ${f.d(d.v0)} m/s hacia arriba`, G98) +
          fig('plano', { alpha: d.a, mov: 'sube', roz: true, v: 'v₀' }, 'Al subir, Px y el rozamiento van los dos hacia abajo del plano: los dos frenan el bloque. La normal equilibra a Py.') +
          herr('Dan velocidades y piden distancias: <strong>ecuación de trabajo y energía</strong> entre la base (A, h = 0) y el punto más alto (B, v = 0): Ec,A + Ep,A + W roz = Ec,B + Ep,B. Antes, la normal y el rozamiento con el eje perpendicular al plano.') +
          sub('Paso 1. Normal y rozamiento') +
          eq(`ΣF⊥ = 0: N = m·g·cos α = ${f.n(d.m * G)} · ${f.n(cos(d.a))} = ${f.n(N)} N ; Fr = μ·N = ${f.n(Fr)} N`) +
          por('N = m·g·cos α', 'El bloque no se separa del plano ni se hunde en él: N equilibra a Py. En un plano inclinado N no vale m·g.') +
          sub('a) Distancia y altura (de A a B)') +
          eq('½·m·v₀² + 0 − μ·m·g·cos α·d = 0 + m·g·d·sen α') +
          por('cada término', 'En A solo hay Ec (h = 0). El rozamiento trabaja a lo largo de los d metros, con signo menos. En B se para (Ec = 0) a una altura h = d·sen α.') +
          eq(`d = v₀² / [2·g·(sen α + μ·cos α)] = ${f.d(d.v0)}² / [19,6 · (${f.n(sen(d.a))} + ${f.n(d.mu * cos(d.a))})] = ${f.n(s)} m ; h = d·sen α = ${f.n(h)} m`) +
          por('sen α + μ·cos α', 'Al subir, el peso y el rozamiento frenan los dos: se suman. La masa se simplifica.') +
          sub('b) Trabajo del rozamiento en la subida') +
          eq(`W roz = −Fr·d = −${f.n(Fr)} · ${f.n(s)} = ${f.n(Wr)} J`) +
          ojo('en W roz va la distancia recorrida sobre el plano, d, no la altura h.') +
          sub('c) ¿Vuelve a bajar?') +
          eq(`Px = m·g·sen α frente a Fr máx = μ·m·g·cos α ⟹ tg α = ${f.n(tg(d.a))} ${vuelve ? '>' : '≤'} μ = ${f.d(d.mu)}`) +
          por('se compara tg α con μ', 'Parado arriba, baja solo si Px supera al rozamiento máximo; dividiendo entre m·g·cos α queda tg α > μ.') +
          (vuelve ? eq(`De B a la base: m·g·d·sen α − μ·m·g·cos α·d = ½·m·v² ⟹ v = √[2·g·d·(sen α − μ·cos α)] = ${f.n(vv)} m/s`) +
            por('ahora se restan', 'Al bajar, el peso ayuda y el rozamiento frena.') +
            comp(`en el viaje completo (sube y baja) el rozamiento trabaja 2·d: v² = v₀² − 4·μ·g·cos α·d = ${f.n(d.v0 ** 2 - 4 * d.mu * G * cos(d.a) * s)} m²/s², es decir, v = ${f.n(vv)} m/s. Llega más despacio de lo que salió, como debe.`)
            : P('No vuelve: la componente del peso a lo largo del plano no supera al rozamiento máximo y el bloque se queda parado arriba.') +
            comp(`de los ${f.n(0.5 * d.m * d.v0 ** 2)} J iniciales, ${f.n(d.m * G * h)} J quedan como Ep y ${f.n(-Wr)} J se han convertido en calor.`));
        return { resultado: `d = ${f.n(s)} m · h = ${f.n(h)} m · W roz = ${f.n(Wr)} J · ${vuelve ? `vuelve a ${f.n(vv)} m/s` : 'no vuelve a bajar'}`, pasos, val: { d: s, h, vv } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'sube', m: d.m, alpha: d.a, mu: d.mu, v0: d.v0 } }),
    },
    {
      id: 'baja', titulo: 'Baja por un plano con rozamiento',
      datos(r) { const a = r.pick(ANG), mu = r.step(0.1, 0.5, 0.05); if (tg(a) < mu + 0.12) return null; return { m: r.step(1, 10, 0.5), a, mu, h: r.step(1, 8, 0.5), suelo: r.chance(0.5) }; },
      enunciado: (d, f) => `Desde lo alto de un plano inclinado ${f.d(d.a)}° y ${f.d(d.h)} m de altura se deja caer un cuerpo de ${f.d(d.m)} kg. El coeficiente de rozamiento es ${f.d(d.mu)}. Calcula: a) la velocidad con la que llega a la base; b) el trabajo del rozamiento.${d.suelo ? ' c) Después sigue por un suelo horizontal con el mismo rozamiento: ¿qué distancia recorre hasta pararse?' : ''}`,
      solucion(d, f) {
        const s = d.h / sen(d.a), N = d.m * G * cos(d.a), Fr = d.mu * N, Wr = -Fr * s, v = Math.sqrt(2 * G * d.h + 2 * Wr / d.m), x = v * v / (2 * d.mu * G), ac = G * (sen(d.a) - d.mu * cos(d.a));
        let pasos = datos(`m = ${f.d(d.m)} kg`, `α = ${f.d(d.a)}°`, `h = ${f.d(d.h)} m`, `μ = ${f.d(d.mu)}`, 'se suelta (v₀ = 0)', G98) +
          fig('plano', { alpha: d.a, mov: 'baja', roz: true, v: 'v' }, 'Al bajar, Px empuja el cuerpo plano abajo y el rozamiento, hacia arriba del plano, lo frena. La normal equilibra a Py.') +
          herr('Dan la altura y piden la velocidad: <strong>ecuación de trabajo y energía</strong> entre lo alto (A, v = 0) y la base (B, h = 0): Ec,A + Ep,A + W roz = Ec,B + Ep,B.') +
          sub('Paso 1. Longitud del plano, normal y rozamiento') +
          eq(`d = h / sen α = ${f.d(d.h)} / ${f.n(sen(d.a))} = ${f.n(s)} m ; N = m·g·cos α = ${f.n(N)} N ; Fr = μ·N = ${f.n(Fr)} N`) +
          por('N = m·g·cos α', 'Perpendicular al plano no hay movimiento: N equilibra a Py = m·g·cos α.') +
          sub('b) Trabajo del rozamiento') +
          eq(`W roz = −Fr·d = −${f.n(Fr)} · ${f.n(s)} = ${f.n(Wr)} J`) +
          por('d y no h', 'El rozamiento actúa a lo largo de todo el recorrido sobre el plano.') +
          sub('a) Velocidad en la base') +
          eq(`0 + m·g·h + W roz = ½·m·v² + 0 ⟹ v = √(2·g·h + 2·W roz/m) = √(${f.n(2 * G * d.h)} − ${f.n(-2 * Wr / d.m)}) = ${f.n(v)} m/s`) +
          por('cada término', 'Arriba está parado (Ec = 0) a altura h; abajo h = 0. W roz va con su signo menos y no se vuelve a restar.') +
          comp(`por dinámica, a = g·(sen α − μ·cos α) = ${f.n(ac)} m/s² y v = √(2·a·d) = ${f.n(Math.sqrt(2 * ac * s))} m/s. Sin rozamiento llegaría a √(2·g·h) = ${f.n(Math.sqrt(2 * G * d.h))} m/s: con rozamiento llega más despacio.`);
        if (d.suelo) pasos += sub('c) Suelo horizontal') +
          eq(`½·m·v² − μ·m·g·x = 0 ⟹ x = v² / (2·μ·g) = ${f.n(v * v)} / (2 · ${f.d(d.mu)} · 9,8) = ${f.n(x)} m`) +
          por('ahora N = m·g', 'En el suelo horizontal la normal equilibra todo el peso, así que el rozamiento es mayor que en el plano.');
        return { resultado: `v = ${f.n(v)} m/s · W roz = ${f.n(Wr)} J${d.suelo ? ` · ${f.n(x)} m en el suelo` : ''}`, pasos, val: { v, x: d.suelo ? x : null } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'baja', m: d.m, alpha: d.a, h: d.h, mu: d.mu, v0: 0, suelo: !!d.suelo } }),
    },
    {
      id: 'empuje', titulo: 'Subir un cuerpo con velocidad constante',
      datos: r => ({ m: r.int(10, 150), a: r.pick(ANG), mu: r.step(0.1, 0.4, 0.05), s: r.int(2, 20) }),
      enunciado: (d, f) => `Por un plano inclinado ${f.d(d.a)}° se sube un cuerpo de ${f.d(d.m)} kg con velocidad constante, empujándolo con una fuerza F paralela al plano. El coeficiente de rozamiento es ${f.d(d.mu)}. Calcula: a) el valor de F; b) el trabajo de F cuando el cuerpo recorre ${f.d(d.s)} m; c) en qué se invierte ese trabajo.`,
      solucion(d, f) {
        const Px = d.m * G * sen(d.a), N = d.m * G * cos(d.a), Fr = d.mu * N, F = Px + Fr, W = F * d.s;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `α = ${f.d(d.a)}°`, `μ = ${f.d(d.mu)}`, 'velocidad constante, subiendo', `d = ${f.d(d.s)} m`, G98) +
          fig('plano', { alpha: d.a, mov: 'sube', roz: true, F: 'sube', v: 'v constante' }, 'F empuja hacia arriba del plano; Px y el rozamiento (que va contra el movimiento) tiran hacia abajo. La normal equilibra a Py.') +
          herr('«Velocidad constante» ⟹ a = 0 ⟹ <strong>ΣF = 0</strong> en los dos ejes (dinámica): de ahí sale F. Después, W = F·d y el reparto de la energía.') +
          sub('a) Fuerza F') +
          eq(`Eje perpendicular: N = m·g·cos α = ${f.n(N)} N ; Fr = μ·N = ${f.n(Fr)} N`) +
          eq(`Eje del plano: F − m·g·sen α − Fr = 0 ⟹ F = m·g·(sen α + μ·cos α) = ${f.n(Px)} + ${f.n(Fr)} = ${f.n(F)} N`) +
          por('se suman', 'Al subir, Px y el rozamiento van los dos hacia abajo del plano: F tiene que compensar los dos.') +
          sub('b) Trabajo de F') +
          eq(`W F = F·d·cos 0° = ${f.n(F)} · ${f.d(d.s)} = ${f.n(W)} J`) +
          sub('c) En qué se invierte') +
          eq(`ΔEp = m·g·Δh = m·g·d·sen α = ${f.n(Px * d.s)} J ; calor = Fr·d = ${f.n(Fr * d.s)} J`) +
          por('ΔEc = 0', 'Con velocidad constante la energía cinética no cambia: el trabajo de F se reparte entre la energía potencial que gana el cuerpo y el calor del rozamiento.') +
          comp(`${f.n(Px * d.s)} + ${f.n(Fr * d.s)} = ${f.n(W)} J. Con la forma de los apuntes, E M0 + W F = E MF + Fr·d.`);
        return { resultado: `F = ${f.n(F)} N · W = ${f.n(W)} J (${f.n(Px * d.s)} J de Ep y ${f.n(Fr * d.s)} J de calor)`, pasos, val: { F, W } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'empuje', m: d.m, alpha: d.a, mu: d.mu, d: d.s, v: 1, sentido: 'sube' } }),
    },
    {
      id: 'tramo-rampa', titulo: 'Tramo horizontal y rampa',
      datos(r) { const d = { v0: r.int(5, 12), L: r.step(1, 4, 0.5), mu: r.step(0.1, 0.4, 0.05), a: r.pick([25, 30, 35, 40, 45]) }; return d.v0 ** 2 - 2 * d.mu * G * d.L > 4 ? d : null; },
      enunciado: (d, f) => `Un bloque empieza a deslizar con una velocidad de ${f.d(d.v0)} m/s sobre una superficie horizontal con coeficiente de rozamiento ${f.d(d.mu)}. Después de recorrer ${f.d(d.L)} m encuentra una rampa inclinada ${f.d(d.a)}° con el mismo rozamiento. Calcula: a) la velocidad al llegar a la base de la rampa; b) la distancia que recorre sobre la rampa antes de pararse.`,
      solucion(d, f) {
        const v1 = Math.sqrt(d.v0 ** 2 - 2 * d.mu * G * d.L), s = v1 * v1 / (2 * G * (sen(d.a) + d.mu * cos(d.a))), h = s * sen(d.a);
        const pasos = datos(`v₀ = ${f.d(d.v0)} m/s`, `μ = ${f.d(d.mu)} (en los dos tramos)`, `L = ${f.d(d.L)} m`, `α = ${f.d(d.a)}°`, 'no dan la masa', G98) +
          fig('plano', { alpha: d.a, mov: 'sube', roz: true, v: 'v₁' }, 'En la rampa el bloque sube frenado por Px y por el rozamiento, los dos hacia abajo del plano.') +
          herr('Dos tramos con fuerzas distintas: en cada uno, <strong>ecuación de trabajo y energía</strong>. No dan la masa: aparece en todos los términos y se simplifica. Se divide toda la ecuación entre m.') +
          sub('a) Tramo horizontal') +
          eq(`½·m·v₀² − μ·m·g·L = ½·m·v₁² ⟹ v₁ = √(v₀² − 2·μ·g·L) = √(${f.d(d.v0)}² − 2 · ${f.d(d.mu)} · 9,8 · ${f.d(d.L)}) = ${f.n(v1)} m/s`) +
          por('N = m·g', 'En el tramo horizontal la normal equilibra todo el peso.') +
          sub('b) Rampa') +
          eq(`½·m·v₁² − μ·m·g·cos α·d = m·g·d·sen α ⟹ d = v₁² / [2·g·(sen α + μ·cos α)] = ${f.n(s)} m`) +
          por('N = m·g·cos α', 'En la rampa la normal solo equilibra a Py, así que el rozamiento es menor que en el suelo.') +
          comp(`balance por unidad de masa: ½·v₀² = ${f.n(0.5 * d.v0 ** 2)} J/kg = g·h (${f.n(G * h)}) + μ·g·L (${f.n(d.mu * G * d.L)}) + μ·g·cos α·d (${f.n(d.mu * G * cos(d.a) * s)}).`);
        return { resultado: `v = ${f.n(v1)} m/s · d = ${f.n(s)} m sobre la rampa`, pasos, val: { v1, d: s } };
      },
      sim: d => ({ widget: 'plano', cfg: { escenario: 'sube', m: 1, alpha: d.a, mu: d.mu, v0: d.v0, L0: d.L, controles: ['alpha', 'mu', 'v0', 'L0'] } }),
    },
    {
      id: 'frenado', titulo: 'Bajar frenado con velocidad constante',
      datos(r) { const a = r.pick([25, 30, 35, 40, 45]), mu = r.step(0.1, 0.4, 0.05); if (tg(a) < mu + 0.15) return null; return { m: r.int(20, 150), a, mu, s: r.int(5, 30) }; },
      enunciado: (d, f) => `Por un plano inclinado ${f.d(d.a)}° desciende un bloque de ${f.d(d.m)} kg y se le aplica una fuerza F paralela al plano que lo frena, de modo que baja con velocidad constante. El coeficiente de rozamiento es ${f.d(d.mu)}. a) Calcula F. b) Calcula la variación de energía potencial en un desplazamiento de ${f.d(d.s)} m y explica en qué se transforma.`,
      solucion(d, f) {
        const Px = d.m * G * sen(d.a), N = d.m * G * cos(d.a), Fr = d.mu * N, F = Px - Fr, dEp = -Px * d.s;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `α = ${f.d(d.a)}°`, `μ = ${f.d(d.mu)}`, 'baja con velocidad constante', `d = ${f.d(d.s)} m`, G98) +
          fig('plano', { alpha: d.a, mov: 'baja', roz: true, F: 'sube', Ftxt: 'F (frena)', v: 'v constante' }, 'El bloque baja: Px tira hacia abajo del plano; el rozamiento y F, hacia arriba, lo frenan justo lo necesario para que no acelere.') +
          herr('a) «Velocidad constante» ⟹ <strong>ΣF = 0</strong> (dinámica). b) ΔEp = m·g·Δh y el reparto de energía.') +
          sub('a) Fuerza F') +
          eq(`N = m·g·cos α = ${f.n(N)} N ; Fr = μ·N = ${f.n(Fr)} N`) +
          eq(`Eje del plano: m·g·sen α − Fr − F = 0 ⟹ F = m·g·(sen α − μ·cos α) = ${f.n(Px)} − ${f.n(Fr)} = ${f.n(F)} N`) +
          por('se restan', 'Al bajar, el rozamiento va hacia arriba (contra el movimiento) y ayuda a F a frenar.') +
          sub('b) Variación de energía potencial') +
          eq(`Δh = −d·sen α = −${f.n(d.s * sen(d.a))} m ; ΔEp = m·g·Δh = ${f.n(dEp)} J`) +
          por('negativa', 'El bloque baja: pierde energía potencial.') +
          interp(`La energía cinética no cambia. La Ep que pierde se reparte entre el calor del rozamiento (Fr·d = ${f.n(Fr * d.s)} J) y la energía que se lleva quien frena (F·d = ${f.n(F * d.s)} J).`) +
          comp(`${f.n(Fr * d.s)} + ${f.n(F * d.s)} = ${f.n(-dEp)} J = |ΔEp|.`);
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
        const W = d.m * G * d.h, Pu = W / d.t, Pm = Pu / d.eta, v = d.h / d.t;
        const pasos = datos(`m = ${f.d(d.m)} kg`, `h = ${f.d(d.h)} m`, `t = ${f.d(d.t)} s`, `η = ${f.d(Math.round(d.eta * 100))} % = ${f.d(d.eta)}`, 'velocidad constante', G98) +
          fig('vertical', { Ftxt: 'F motor', cuerpo: 'montacargas' }, 'Con velocidad constante, la fuerza del cable es igual al peso. Lo útil es subir la carga: su energía potencial.') +
          herr('El trabajo útil es la energía potencial que gana el montacargas (sube con velocidad constante). Potencia útil = trabajo útil / tiempo, y el <strong>rendimiento</strong> relaciona la potencia útil con la del motor: P útil = η·P motor.') +
          sub('Paso 1. Trabajo útil') +
          eq(`W útil = ΔEp = m·g·h = ${f.d(d.m)} · 9,8 · ${f.d(d.h)} = ${f.n(W)} J`) +
          por('ΔEp', 'Con velocidad constante la Ec no cambia: todo el trabajo útil queda como energía potencial.') +
          sub('Paso 2. Potencia útil') +
          eq(`P útil = W útil / t = ${f.n(W)} / ${f.d(d.t)} = ${f.n(Pu)} W`) +
          sub('Paso 3. Potencia del motor') +
          eq(`P útil = η·P motor ⟹ P motor = P útil / η = ${f.n(Pu)} / ${f.d(d.eta)} = ${f.n(Pm)} W = ${f.n(Pm / CV)} CV`) +
          por('se divide entre η', 'El motor tiene que dar más potencia de la útil, porque parte se pierde (rozamientos, calor). 1 CV = 736 W.') +
          comp(`con P = F·v: F = m·g = ${f.n(d.m * G)} N, v = h/t = ${f.n(v)} m/s y P útil = ${f.n(d.m * G * v)} W.`);
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
        const pasos = datos(`P = ${f.d(d.Pcv)} CV`, `h = ${f.d(d.h)} m`, `t = ${f.d(d.tmin)} min`, `η = ${f.d(Math.round(d.eta * 100))} %`, '1 L de agua = 1 kg', G98) +
          fig('reparto', { total: 100, util: d.eta * 100, txtTotal: `Energía que consume el motor: P·t = ${f.n(P * t)} J`, txtUtil: `útil (Ep del agua): ${f.d(Math.round(d.eta * 100))} %`, txtPerd: `pérdidas: ${f.d(Math.round(100 - d.eta * 100))} %` }, 'De toda la energía que consume el motor, solo la parte útil se invierte en subir el agua.') +
          herr('Rendimiento: P útil = η·P. La energía útil en ese tiempo (P útil·t) se invierte en <strong>energía potencial del agua</strong>, m·g·h; de ahí se despeja la masa.') +
          sub('Paso 1. Potencia en vatios y potencia útil') +
          eq(`P = ${f.d(d.Pcv)} · 736 = ${f.n(P)} W ; P útil = η·P = ${f.d(d.eta)} · ${f.n(P)} = ${f.n(Pu)} W`) +
          sub('Paso 2. Energía útil') +
          eq(`t = ${f.d(d.tmin)} · 60 = ${f.d(t)} s ; E útil = P útil·t = ${f.n(Pu)} · ${f.d(t)} = ${f.n(E)} J`) +
          por('el tiempo en segundos', 'W·s = J: así la energía sale en julios.') +
          sub('Paso 3. Masa de agua') +
          eq(`m·g·h = E útil ⟹ m = E útil / (g·h) = ${f.n(E)} / (9,8 · ${f.d(d.h)}) = ${f.n(m)} kg ⟹ ${f.n(m)} L`) +
          comp(`m·g·h / t = ${f.n(m * G * d.h / t)} W, que es la potencia útil.`);
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
        const pasos = datos(`P = ${f.d(d.P)} W`, `t = ${f.d(d.t)} s`, `m = ${f.d(d.m)} kg de agua`, `T₀ = ${f.d(d.T0)} °C → T = ${f.d(d.Tf)} °C`, 'c = 4180 J/(kg·K)', `precio = ${f.fx(d.precio, 2)} €/kWh`) +
          fig('reparto', { total: E, util: Q, txtTotal: `Energía consumida: P·t = ${f.n(E)} J`, txtUtil: `útil, la que absorbe el agua: ${f.n(Q)} J`, txtPerd: `pérdidas: ${f.n(E - Q)} J` }, 'El aparato consume P·t; el agua solo absorbe una parte. El rendimiento es la fracción útil.') +
          herr('Energía útil: el calor que absorbe el agua, <strong>Q = m·c·ΔT</strong>. Energía consumida: <strong>E = P·t</strong>. Rendimiento: η = útil / consumida. El coste se calcula con la energía consumida, en kWh.') +
          sub('a) Energía que absorbe el agua') +
          eq(`Q = m·c·(T − T₀) = ${f.d(d.m)} · 4180 · ${f.d(d.Tf - d.T0)} = ${f.n(Q)} J`) +
          por('ΔT en °C o en K', 'Una diferencia de temperaturas vale lo mismo en las dos escalas.') +
          sub('b) Rendimiento') +
          eq(`E = P·t = ${f.d(d.P)} · ${f.d(d.t)} = ${f.n(E)} J ; η = Q / E = ${f.n(Q)} / ${f.n(E)} = ${f.fx(100 * eta, 1)} %`) +
          por('menor que 100 %', 'Parte de la energía calienta el recipiente y el aire, no el agua.') +
          sub('c) Coste') +
          eq(`E = ${f.n(E)} / 3,6·10⁶ = ${f.n(kwh)} kWh ; coste = ${f.n(kwh)} · ${f.fx(d.precio, 2)} = ${f.n(coste, 2)} €`) +
          por('la energía consumida', 'La compañía cobra lo que marca el contador, no lo que aprovecha el agua. 1 kWh = 3,6·10⁶ J.') +
          comp(`Q + pérdidas = ${f.n(Q)} + ${f.n(E - Q)} = ${f.n(E)} J, la energía consumida.`);
        return { resultado: `Q = ${f.n(Q)} J · η = ${f.fx(100 * eta, 1)} % · ${f.n(coste, 2)} €`, pasos, val: { eta, coste } };
      },
      sim: d => ({ widget: 'calentador', cfg: { escenario: 'agua', P: d.P, m: d.m, T0: d.T0, Tf: d.Tf, t: d.t, eta: 0.9, precio: d.precio, incognita: 'eta', controles: ['P', 'm', 't', 'precio'] } }),
    },
    {
      id: 'consumo', titulo: 'Consumo eléctrico y coste',
      peso: 1.5,
      datos: r => ({ ap: r.pick([['una estufa', 2000], ['un horno', 2500], ['un ordenador', 150], ['un aire acondicionado', 1200], ['una lavadora', 900], ['un televisor', 120]]), h: r.step(1, 8, 0.5), dias: r.pick([1, 7, 30]), precio: r.step(0.08, 0.25, 0.01) }),
      enunciado: (d, f) => `Calcula la energía que consume ${d.ap[0]} de ${f.d(d.ap[1])} W ${d.ap[0].startsWith('una ') ? 'encendida' : 'encendido'} ${f.d(d.h)} h al día durante ${d.dias === 1 ? 'un día' : `${d.dias} días`}, en kWh y en MJ. ¿Cuánto cuesta si el kWh está a ${f.fx(d.precio, 2)} €?`,
      solucion(d, f) {
        const horas = d.h * d.dias, kw = d.ap[1] / 1000, kwh = kw * horas, MJ = kwh * 3.6, coste = kwh * d.precio;
        const pasos = datos(`P = ${f.d(d.ap[1])} W = ${f.d(kw)} kW`, `${f.d(d.h)} h al día durante ${f.d(d.dias)} ${d.dias === 1 ? 'día' : 'días'}`, `precio = ${f.fx(d.precio, 2)} €/kWh`) +
          fig('cadena', { cajas: [`t = ${f.d(d.h)} h/día · ${f.d(d.dias)} = ${f.d(horas)} h`, `E = ${f.d(kw)} kW · ${f.d(horas)} h = ${f.n(kwh)} kWh`, `E = ${f.n(kwh)} · 3,6 MJ = ${f.n(MJ)} MJ`, `coste = ${f.n(kwh)} kWh · ${f.fx(d.precio, 2)} €/kWh = ${f.n(coste, 3)} €`], ops: ['E = P·t', '× 3,6 MJ/kWh', '× precio'], textos: ['Tiempo total de uso, en horas.', 'Potencia en kW por tiempo en horas: la energía sale directamente en kWh.', 'Cada kWh son 3,6·10⁶ J = 3,6 MJ.', 'El coste es la energía consumida, en kWh, por el precio del kWh.'] }, 'Toda la cuenta en cadena: tiempo total, energía en kWh, paso a julios y coste.') +
          herr('<strong>E = P·t</strong>. Con la potencia en kW y el tiempo en horas, la energía sale en kWh, que es lo que se paga; 1 kWh = 3,6·10⁶ J = 3,6 MJ.') +
          sub('Paso 1. Tiempo total') +
          eq(`t = ${f.d(d.h)} h/día · ${f.d(d.dias)} ${d.dias === 1 ? 'día' : 'días'} = ${f.d(horas)} h`) +
          sub('Paso 2. Energía en kWh') +
          eq(`E = P·t = ${f.d(kw)} kW · ${f.d(horas)} h = ${f.n(kwh)} kWh`) +
          por('kWh', 'El kWh es una unidad de energía (potencia por tiempo), no de potencia: es la energía que gasta un aparato de 1 kW en una hora.') +
          sub('Paso 3. Energía en MJ') +
          eq(`E = ${f.n(kwh)} · 3,6 = ${f.n(MJ)} MJ`) +
          por('3,6', '1 kWh = 1000 W · 3600 s = 3,6·10⁶ J.') +
          sub('Paso 4. Coste') +
          eq(`coste = ${f.n(kwh)} kWh · ${f.fx(d.precio, 2)} €/kWh = ${f.n(coste, 3)} €`) +
          comp(`en julios, E = P·t = ${f.d(d.ap[1])} W · ${f.d(horas * 3600)} s = ${f.n(d.ap[1] * horas * 3600)} J = ${f.n(MJ)} MJ.`);
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
        const pasos = datos(`m = ${f.d(d.m)} kg`, `v = ${f.d(d.v)} m/s constante`, `η = ${f.d(Math.round(d.eta * 100))} %`, `h = ${f.d(d.h)} m`, G98) +
          fig('vertical', { Ftxt: 'F motor', cuerpo: 'ascensor', v: `v = ${f.d(d.v)} m/s` }, 'El ascensor sube con velocidad constante: la fuerza del cable es igual al peso.') +
          herr('Con velocidad constante, ΣF = 0 ⟹ la fuerza que sube el ascensor es igual al peso, y la potencia útil es <strong>P = F·v</strong>. El rendimiento relaciona la potencia útil con la del motor.') +
          sub('a) Potencia útil') +
          eq(`F = m·g = ${f.n(F)} N ; P útil = F·v = ${f.n(F)} · ${f.d(d.v)} = ${f.n(Pu)} W`) +
          por('P = F·v', 'P = W/t = F·Δx/t, y Δx/t es la velocidad.') +
          sub('b) Potencia del motor') +
          eq(`P motor = P útil / η = ${f.n(Pu)} / ${f.d(d.eta)} = ${f.n(Pm)} W`) +
          sub(`c) Energía que consume en subir ${f.d(d.h)} m`) +
          eq(`t = h / v = ${f.d(d.h)} / ${f.d(d.v)} = ${f.n(t)} s ; E = P motor·t = ${f.n(Pm)} · ${f.n(t)} = ${f.n(E)} J = ${f.n(E / 3.6e6)} kWh`) +
          por('la potencia del motor', 'Lo que se consume es lo que da el motor, no solo lo útil.') +
          comp(`la energía útil es m·g·h = ${f.n(F * d.h)} J y, dividida entre η, da ${f.n(F * d.h / d.eta)} J, la misma energía consumida.`);
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
