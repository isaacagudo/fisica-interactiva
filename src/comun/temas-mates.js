// Temas de Matemáticas: cada uno con sus secciones en el orden de las diapositivas.
// La usan src/mates/build.js (todas las secciones), src/induccion/build.js (inducción va dentro del Tema 1 · Demostraciones)
// y la navegación entre secciones de cada página. «examen» = temas del generador que corresponden (?temas=…).
const fs = require('fs'), path = require('path');
const existe = slug => fs.existsSync(path.join(__dirname, '../../temas', slug, 'index.html'));
const hayExamen = () => fs.existsSync(path.join(__dirname, '../../examen/matematicas/index.html'));
function crear(T) {
  T.existe = existe;
  // Fila de navegación entre secciones. up = ruta hasta la raíz de la web; actual = slug de la sección. Las que aún no existen, sin enlace
  T.nav = (up, actual) => `<nav class="tema-nav" aria-label="Secciones del ${T.corto}"><span class="lbl">${T.corto}</span>${T.secciones.map(s =>
    s.slug === actual || existe(s.slug) ? `<a href="${up}temas/${s.slug}/"${s.slug === actual ? ' aria-current="true"' : ''}>${s.num} · ${s.corto}</a>` : `<span class="pronto" title="Próximamente">${s.num} · ${s.corto}</span>`).join('')}${hayExamen() ? `<a class="ex" href="${up}examen/matematicas/?temas=${T.examen}">Examen</a>` : ''}</nav>`;
  return T;
}
const TEMAS = [
  crear({ id: 't1', num: 1, corto: 'Tema 1', titulo: 'Tema 1 · Secuencias, series y demostraciones', examen: 'repaso,sucesiones,demostraciones,recuento,binomio',
    lema: 'Repaso para el examen, en el orden de las diapositivas: teoría con ejemplos resueltos y ejercicios de menos a más con pistas paso a paso',
    secciones: [
      { slug: 'repaso-algebra', num: 0, corto: 'Repaso previo' },
      { slug: 'sucesiones', num: 1, corto: 'Sucesiones' },
      { slug: 'demostraciones', num: 2, corto: 'Demostraciones' },
      { slug: 'recuento', num: 3, corto: 'Recuento' },
      { slug: 'binomio', num: 4, corto: 'Binomio' },
    ] }),
  crear({ id: 't2', num: 2, corto: 'Tema 2', titulo: 'Tema 2 · Geometría y trigonometría', examen: 'repaso-t2,analitica,razones,volumenes,triangulos,identidades',
    lema: 'Geometría analítica, volúmenes y sectores, razones trigonométricas, resolución de triángulos y ecuaciones trigonométricas, en el orden de las diapositivas',
    secciones: [
      { slug: 'repaso-geometria', num: 0, corto: 'Repaso previo' },
      { slug: 'geometria-analitica', num: 1, corto: 'Geometría analítica' },
      { slug: 'razones-trigonometricas', num: 2, corto: 'Razones trigonométricas' },
      { slug: 'volumenes', num: 3, corto: 'Volúmenes y sectores' },
      { slug: 'triangulos', num: 4, corto: 'Triángulos' },
      { slug: 'identidades', num: 5, corto: 'Identidades y ecuaciones' },
    ] }),
];
TEMAS.css = `.tema-nav{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;font-size:13.5px;margin:0 0 10px;padding:6px 0;border-bottom:1px solid var(--rule)}
.tema-nav .lbl{font:600 11.5px var(--f-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2)}
.tema-nav a{color:var(--ink-2);text-decoration:none;white-space:nowrap}
.tema-nav a:hover{color:var(--ink);text-decoration:underline}
.tema-nav a[aria-current]{color:var(--ink);font-weight:700}
.tema-nav a.ex{margin-left:auto;font-weight:700;color:var(--c-p)}
.tema-nav .pronto{color:var(--ink-2);opacity:.55;white-space:nowrap}`;
TEMAS.css && TEMAS.forEach(T => { T.css = TEMAS.css; });
module.exports = TEMAS;
