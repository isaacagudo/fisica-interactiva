// Genera la página del ejercicio 4: compone las fórmulas con MathJax (SVG) y las inserta en la plantilla.
//   node build.js            -> ../../temas/energia/plano-inclinado-ejercicio-4/index.html (web completa)
//   node build.js --artifact -> ./index.html (fragmento para artifact de Claude y para make_video.py)
const fs = require('fs'), path = require('path');
const {mathjax} = require('mathjax-full/js/mathjax.js');
const {TeX} = require('mathjax-full/js/input/tex.js');
const {SVG} = require('mathjax-full/js/output/svg.js');
const {liteAdaptor} = require('mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler} = require('mathjax-full/js/handlers/html.js');
const {AllPackages} = require('mathjax-full/js/input/tex/AllPackages.js');
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const doc = mathjax.document('', {InputJax: new TeX({packages: AllPackages}), OutputJax: new SVG({fontCache: 'local'})});
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function tex(src, display) {
  const svg = adaptor.firstChild(doc.convert(src, {display}));
  adaptor.setAttribute(svg, 'role', 'img');
  adaptor.setAttribute(svg, 'aria-label', src);
  adaptor.removeAttribute(svg, 'aria-hidden');
  const out = adaptor.outerHTML(svg);
  if (/data-mjx-error|merror/.test(out)) throw new Error('Error de TeX: ' + src);
  return display ? `<div class="md">${out}</div>` : `<span class="mi">${out}</span>`;
}
const math = html => html.replace(/\$\$([\s\S]+?)\$\$/g, (_, s) => tex(s.trim(), true)).replace(/\$([^$]+?)\$/g, (_, s) => tex(s.trim(), false));
const steps = require('./content.js');
const body = steps.map((st, i) => {
  const html = math(st.html).replace(/<table class="res">/g, '<div class="table-wrap"><table class="res">').replace(/<\/table>/g, '</table></div>');
  const note = st.note ? `\n      <p class="note">${esc(st.note)}</p>` : '';
  return `      <article class="step" id="paso-${i + 1}">
        <h2><button class="step-head" type="button"><span class="num">${i + 1}</span><span class="t">${esc(st.title)}</span></button></h2>
        <div class="step-body">${html}${note}
        </div>
      </article>`;
}).join('\n');
const page = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8').replace('<!--STEPS-->', body);
if (process.argv.includes('--artifact')) {
  fs.writeFileSync(path.join(__dirname, 'index.html'), page);
  console.log('index.html (artifact)');
} else {
  const cut = page.indexOf('</style>') + '</style>'.length;
  const full = '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + page.slice(0, cut).replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
    + '\n<style>body{margin:0}[hidden]{display:none!important}img{max-width:100%}</style>\n</head>\n<body>\n'
    + page.slice(cut) + '\n</body>\n</html>\n';
  const out = path.join(__dirname, '../../temas/energia/plano-inclinado-ejercicio-4/index.html');
  fs.writeFileSync(out, full);
  console.log(path.relative(process.cwd(), out), fs.statSync(out).size, 'bytes');
}
