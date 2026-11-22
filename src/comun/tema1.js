// Matemáticas · Tema 1 («Secuencias, series y demostraciones»): las secciones en el orden de las diapositivas.
// La usan src/mates/build.js (las cinco secciones) y src/induccion/build.js (inducción va dentro de Demostraciones).
const TEMA1 = {
  titulo: 'Tema 1 · Secuencias, series y demostraciones',
  secciones: [
    { slug: 'repaso-algebra', num: 0, corto: 'Repaso previo' },
    { slug: 'sucesiones', num: 1, corto: 'Sucesiones' },
    { slug: 'demostraciones', num: 2, corto: 'Demostraciones' },
    { slug: 'recuento', num: 3, corto: 'Recuento' },
    { slug: 'binomio', num: 4, corto: 'Binomio' },
  ],
};
const fs = require('fs'), path = require('path');
TEMA1.existe = slug => fs.existsSync(path.join(__dirname, '../../temas', slug, 'index.html'));
// Fila de navegación entre secciones. up = ruta hasta la raíz de la web; actual = slug de la sección. Las que aún no existen, sin enlace
TEMA1.nav = (up, actual) => `<nav class="tema-nav" aria-label="Secciones del Tema 1"><span class="lbl">Tema 1</span>${TEMA1.secciones.map(s =>
  s.slug === actual || TEMA1.existe(s.slug) ? `<a href="${up}temas/${s.slug}/"${s.slug === actual ? ' aria-current="true"' : ''}>${s.num} · ${s.corto}</a>` : `<span class="pronto" title="Próximamente">${s.num} · ${s.corto}</span>`).join('')}${fs.existsSync(path.join(__dirname, '../../examen/matematicas/index.html')) ? `<a class="ex" href="${up}examen/matematicas/">Examen</a>` : ''}</nav>`;
TEMA1.css = `.tema-nav{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;font-size:13.5px;margin:0 0 10px;padding:6px 0;border-bottom:1px solid var(--rule)}
.tema-nav .lbl{font:600 11.5px var(--f-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2)}
.tema-nav a{color:var(--ink-2);text-decoration:none;white-space:nowrap}
.tema-nav a:hover{color:var(--ink);text-decoration:underline}
.tema-nav a[aria-current]{color:var(--ink);font-weight:700}
.tema-nav a.ex{margin-left:auto;font-weight:700;color:var(--c-p)}
.tema-nav .pronto{color:var(--ink-2);opacity:.55;white-space:nowrap}`;
module.exports = TEMA1;
