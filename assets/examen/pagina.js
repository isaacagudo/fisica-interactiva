/* Física interactiva · página del generador de exámenes (examen/index.html).
   La dirección guarda el examen: ?sel=energia:1,2,5&n=6&s=48213 (apartados por número, ejercicios y número de examen).
   ?temas=energia marca solo los apartados de esos temas. Sin número de examen se genera uno nuevo al entrar. */
(function () {
  'use strict';
  const X = window.FisicaExamen, f = X.formato;
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const form = $('#cfg'), nIn = $('#n'), out = $('#examen'), aviso = $('#aviso');
  const NMAX = 20;
  let examen = null, estado = null;

  // ---------------------------------------------------------------- dirección <-> formulario
  const leerSel = () => {
    const sel = {};
    for (const fs of $$('fieldset.tema')) { const v = $$('input:checked', fs).map(i => +i.value); if (v.length) sel[fs.dataset.tema] = v; }
    return sel;
  };
  const ponerSel = sel => { for (const fs of $$('fieldset.tema')) { const v = sel[fs.dataset.tema] || []; $$('input', fs).forEach(i => { i.checked = v.includes(+i.value); }); } };
  const selTxt = sel => Object.entries(sel).map(([t, v]) => `${t}:${v.join(',')}`).join(';');
  const leerUrl = () => {
    const q = new URLSearchParams(location.search), r = {};
    if (q.get('sel')) { r.sel = {}; for (const p of q.get('sel').split(';')) { const [t, v] = p.split(':'); if (X.temas[t] && v) r.sel[t] = v.split(',').map(Number).filter(k => k >= 1 && k <= X.temas[t].apartados.length); } }
    else if (q.get('temas')) { r.sel = {}; for (const t of q.get('temas').split(',')) if (X.temas[t]) r.sel[t] = X.temas[t].apartados.map((a, i) => i + 1).filter(k => X.temas[t].apartados[k - 1].patrones.length); }
    if (q.get('n')) r.n = Math.max(1, Math.min(NMAX, Math.round(+q.get('n')) || 6));
    if (q.get('s') && /^\d{1,9}$/.test(q.get('s'))) r.s = +q.get('s');
    return r;
  };
  const enlace = st => `${location.pathname}?sel=${encodeURIComponent(selTxt(st.sel)).replace(/%3A/g, ':').replace(/%2C/g, ',').replace(/%3B/g, ';')}&n=${st.n}&s=${st.s}`;
  const nuevaSemilla = () => 10000 + Math.floor(Math.random() * 90000);

  // ---------------------------------------------------------------- examen
  const puntos = p => `${f.d(p)} ${p === 1 ? 'punto' : 'puntos'}`;
  const iconoAp = (t, k) => { const s = $(`[data-ap="${t}:${k}"] svg`); return s ? s.outerHTML : ''; };
  function generar(st) {
    const sel = {};
    for (const t in st.sel) sel[t] = st.sel[t].map(k => X.temas[t].apartados[k - 1].slug);
    return X.generar(sel, st.n, st.s);
  }
  function pintar(st, push) {
    estado = st; examen = generar(st);
    if (!examen.length) { out.innerHTML = '<p class="vacio">Elige al menos un apartado con ejercicios.</p>'; return; }
    const temasTxt = Object.keys(st.sel).map(t => X.temas[t].nombre).join(' · ');
    const apsTxt = Object.entries(st.sel).map(([t, v]) => v.length === X.temas[t].apartados.filter(a => a.patrones.length).length ? 'todos los apartados' : `apartado${v.length > 1 ? 's' : ''} ${v.join(', ')}`).join(' · ');
    const items = examen.map((e, i) => {
      const k = e.tema.apartados.indexOf(e.apartado) + 1, cu = e.patron.cuestion;
      return `<li class="ex-ej" id="ej-${i + 1}">
  <div class="ex-cab-ej"><span class="n">${i + 1}.</span><span class="pts">${puntos(e.puntos)}</span><span class="ap-tag">${iconoAp(e.tema.tema, k)}${k} · ${e.apartado.nombre}</span></div>
  <div class="ex-enun">${/^\s*</.test(e.enunciado) ? e.enunciado : `<p>${e.enunciado}</p>`}</div>
  <div class="ex-acc">${cu ? '' : `<details><summary>Ver solo el resultado</summary><p>${e.solucion.resultado}</p></details>`}<button type="button" class="btn primary" data-sol="${i}" aria-expanded="false" aria-controls="sol-${i + 1}">${cu ? 'Respuesta razonada' : 'Solución paso a paso'}</button></div>
  <div class="ex-sol" id="sol-${i + 1}" hidden></div>
</li>`;
    }).join('\n');
    const sols = examen.map((e, i) => `<article class="sol-imp"><h3>Ejercicio ${i + 1} · ${puntos(e.puntos)}</h3>${solHtml(e)}</article>`).join('');
    out.innerHTML = `<div class="ex-barra" role="toolbar" aria-label="Examen">
  <span class="num">Examen n.º <strong>${st.s}</strong></span>
  <button type="button" class="btn" id="copiar">Copiar el enlace</button>
  <button type="button" class="btn" id="todas" aria-pressed="false">Mostrar las soluciones</button>
  <button type="button" class="btn" id="imp">Imprimir</button>
  <button type="button" class="btn" id="imp-sol">Imprimir con soluciones</button>
</div>
<div class="hoja">
  <header class="ex-cab">
    <h2>Examen de Física</h2>
    <p class="sub">${temasTxt} · ${apsTxt} · ${examen.length} ${examen.length === 1 ? 'ejercicio' : 'ejercicios'} · puntuación sobre 10</p>
    <p class="ex-n">Examen n.º ${st.s}</p>
    <div class="ex-alumno"><span>Nombre:</span><span>Fecha:</span><span>Nota:</span></div>
    <p class="sub">Toma g = 9,8 m/s². Explica cada paso: el dibujo con las fuerzas, la ley que aplicas, las ecuaciones y las unidades.</p>
  </header>
  <ol class="ex-lista">${items}</ol>
  <section class="solucionario" aria-hidden="true"><div class="ex-cab"><h2>Soluciones · Examen n.º ${st.s}</h2></div>${sols}</section>
</div>`;
    if (push !== null) history[push ? 'pushState' : 'replaceState'](null, '', enlace(st));
  }
  function solHtml(e) {
    const cu = e.patron.cuestion;
    return `<div class="paso">${e.solucion.pasos}${cu ? '' : `<p class="res"><strong>Resultado:</strong> ${e.solucion.resultado}</p>`}</div>`;
  }
  function abrirSol(i, abrir) {
    const e = examen[i], box = $(`#sol-${i + 1}`), btn = $(`[data-sol="${i}"]`);
    if (abrir === undefined) abrir = box.hidden;
    if (abrir && !box.dataset.lleno) {
      box.innerHTML = `<h3>${e.patron.cuestion ? 'Respuesta razonada' : 'Solución paso a paso'}</h3>${solHtml(e)}` +
        (e.sim ? `<div class="ex-sim"><button type="button" class="btn" data-sim="${i}">Ver la simulación con estos datos</button><div class="widget"></div></div>` : '');
      box.dataset.lleno = '1';
      if (window.FisicaDiagramas) window.FisicaDiagramas.montarEn(box);   // diagramas: botón para verlos paso a paso
    }
    box.hidden = !abrir; btn.setAttribute('aria-expanded', String(abrir));
    btn.textContent = abrir ? 'Ocultar la solución' : e.patron.cuestion ? 'Respuesta razonada' : 'Solución paso a paso';
  }
  function verSim(i, btn) {
    const e = examen[i], W = window.FisicaWidgets && window.FisicaWidgets[e.sim.widget], el = btn.nextElementSibling;
    if (!W || !W.mount) { el.textContent = 'No se ha podido cargar el simulador.'; return; }
    W.mount(el, Object.assign({ titulo: `Simulación del ejercicio ${i + 1} con sus datos`, modo: 'completo' }, e.sim.cfg));
    btn.remove();
  }

  // ---------------------------------------------------------------- eventos
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const sel = leerSel();
    aviso.hidden = Object.keys(sel).length > 0;
    if (!aviso.hidden) return;
    const n = Math.max(1, Math.min(NMAX, Math.round(+nIn.value) || 6)); nIn.value = n;
    pintar({ sel, n, s: nuevaSemilla() }, true);
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  form.addEventListener('click', ev => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.paso) { nIn.value = Math.max(1, Math.min(NMAX, (Math.round(+nIn.value) || 6) + +b.dataset.paso)); }
    if (b.dataset.todos) $$(`fieldset[data-tema="${b.dataset.todos}"] input`).forEach(i => { i.checked = true; });
    if (b.dataset.ninguno) $$(`fieldset[data-tema="${b.dataset.ninguno}"] input`).forEach(i => { i.checked = false; });
    if (b.dataset.todos || b.dataset.ninguno) aviso.hidden = true;
  });
  form.addEventListener('change', () => { if (Object.keys(leerSel()).length) aviso.hidden = true; });
  out.addEventListener('click', ev => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.sol) abrirSol(+b.dataset.sol);
    else if (b.dataset.sim) verSim(+b.dataset.sim, b);
    else if (b.id === 'todas') {
      const on = b.getAttribute('aria-pressed') !== 'true';
      examen.forEach((e, i) => abrirSol(i, on));
      b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Ocultar las soluciones' : 'Mostrar las soluciones';
    } else if (b.id === 'copiar') {
      const url = location.href;
      const ok = () => { b.textContent = 'Enlace copiado'; setTimeout(() => { b.textContent = 'Copiar el enlace'; }, 2000); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, () => { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    } else if (b.id === 'imp') { document.body.classList.remove('con-sol'); window.print(); }
    else if (b.id === 'imp-sol') { document.body.classList.add('con-sol'); window.print(); }
  });
  window.addEventListener('afterprint', () => document.body.classList.remove('con-sol'));
  window.addEventListener('popstate', () => iniciar(false));

  function iniciar(primera) {
    const u = leerUrl();
    if (u.sel && Object.keys(u.sel).length) ponerSel(u.sel);
    if (u.n) nIn.value = u.n;
    const sel = leerSel();
    if (!Object.keys(sel).length) { out.innerHTML = ''; return; }
    pintar({ sel, n: Math.max(1, Math.min(NMAX, Math.round(+nIn.value) || 6)), s: u.s || nuevaSemilla() }, primera ? false : null);
  }
  iniciar(true);
})();
