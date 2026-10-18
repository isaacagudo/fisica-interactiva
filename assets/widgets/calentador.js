/* Física interactiva · simulador «calentador»: energía eléctrica, rendimiento y coste.
   Escenarios:
     agua     un aparato de potencia P calienta m kg de agua de T0 a Tf en un tiempo t con rendimiento η
              opciones: P (W), m, T0, Tf, t (s), eta, precio (€/kWh), incognita ("P" | "eta" | "t")
     estufa   un aparato de potencia P funciona t horas: kWh, julios y coste
              opciones: P (W), horas, precio
   Necesita nucleo.js. */
(function (root) {
  'use strict';
  const N = root.FisicaWidgets && root.FisicaWidgets.nucleo || (typeof require !== 'undefined' ? require('./nucleo.js') : null);
  const { clamp, fmt, num } = N.util;
  const C_AGUA = 4180;

  const DEF = {
    agua: { P: 1500, m: 50, T0: 20, Tf: 80, t: 10800, eta: 0.85, precio: 0.08, incognita: 'eta', controles: ['P', 'm', 'Tf', 't'] },
    estufa: { P: 2000, horas: 8, precio: 0.09, controles: ['P', 'horas', 'precio'] },
  };
  const NOMBRES = { agua: 'Calentar agua', estufa: 'Consumo y coste' };
  const SL = {
    P: { label: 'Potencia, P', unit: 'W', log: true, min: 100, max: 5000, fmt: v => num(v, 3) },
    m: { label: 'Masa de agua, m', unit: 'kg', log: true, min: 0.2, max: 200, fmt: v => num(v, 2) },
    T0: { label: 'Temperatura inicial, T₀', unit: '°C', min: 0, max: 50, step: 1, fmt: v => fmt(v, 0) },
    Tf: { label: 'Temperatura final, T', unit: '°C', min: 30, max: 100, step: 1, fmt: v => fmt(v, 0) },
    t: { label: 'Tiempo, t', unit: 'min', log: true, min: 60, max: 21600, fmt: v => fmt(v / 60, v % 60 ? 1 : 0) },
    eta: { label: 'Rendimiento, η', unit: '%', min: 0.3, max: 1, step: 0.01, fmt: v => fmt(v * 100, 0) },
    precio: { label: 'Precio del kWh', unit: '€', min: 0.05, max: 0.4, step: 0.01, fmt: v => fmt(v, 2) },
    horas: { label: 'Tiempo de uso', unit: 'h', min: 0.5, max: 24, step: 0.5, fmt: v => fmt(v, 1) },
  };

  function analizar(P) {
    const A = {};
    if (P.escenario === 'estufa') {
      A.t = P.horas * 3600; A.E = P.P * A.t; A.kWh = P.P / 1000 * P.horas; A.coste = A.kWh * P.precio;
      return A;
    }
    A.Qu = P.m * C_AGUA * (P.Tf - P.T0);
    if (P.incognita === 'P') { A.t = P.t; A.eta = P.eta; A.Pot = A.Qu / (P.eta * P.t); }
    else if (P.incognita === 't') { A.Pot = P.P; A.eta = P.eta; A.t = A.Qu / (P.eta * P.P); }
    else { A.Pot = P.P; A.t = P.t; A.eta = A.Qu / (P.P * P.t); }
    A.E = A.Pot * A.t; A.kWh = A.E / 3.6e6; A.coste = A.kWh * P.precio; A.Qp = A.E - A.Qu;
    return A;
  }
  function simular(P, A) {
    const T = A.t;
    const estado = t => {
      t = clamp(t, 0, T); const f = T > 0 ? t / T : 0;
      if (P.escenario === 'estufa') return { t, f, E: A.E * f, Eu: A.E * f };
      return { t, f, Eu: Math.min(A.Qu, A.Qu * f), Qp: Math.max(0, A.E - A.Qu) * f, temp: P.T0 + (P.Tf - P.T0) * Math.min(1, f * (A.eta > 1 ? 1 : 1)) };
    };
    return { T, estado, Emax: A.E };
  }

  function escena(c) {
    const { mk, P, A, W, H } = c, dyn = c.dyn;
    const yG = H - 30;
    mk('rect', { class: 'fw-band', x: 0, y: yG, width: W, height: H - yG });
    mk('line', { class: 'fw-floor', x1: 0, y1: yG, x2: W, y2: yG });
    // contador de luz
    const cx = c.nar ? 430 : 470;
    mk('rect', { class: 'fw-body', x: cx, y: 40, width: 150, height: 92, rx: 8 });
    mk('text', { class: 'fw-lbl', x: cx + 75, y: 60, 'text-anchor': 'middle' }).textContent = 'contador';
    dyn.kwh = mk('text', { class: 'fw-lbl-ink', x: cx + 75, y: 88, 'text-anchor': 'middle', style: 'font-family:var(--f-mono)' });
    dyn.eur = mk('text', { class: 'fw-lbl-ink', x: cx + 75, y: 116, 'text-anchor': 'middle', style: 'font-family:var(--f-mono)' });
    mk('path', { class: 'fw-dim', d: `M${cx} 100 C ${cx - 60} 100, ${cx - 60} ${yG - 40}, ${cx - 120} ${yG - 40}`, style: 'stroke:var(--ink);stroke-width:1.6' });
    if (P.escenario === 'estufa') {
      // estufa con resistencias
      mk('rect', { class: 'fw-body', x: 120, y: yG - 110, width: 170, height: 110, rx: 10 });
      dyn.res = [0, 1, 2].map(i => mk('line', { x1: 140, y1: yG - 80 + i * 26, x2: 270, y2: yG - 80 + i * 26, style: 'stroke:var(--c-fr);stroke-width:6;stroke-linecap:round' }));
      mk('text', { class: 'fw-lbl-ink', x: 205, y: yG - 118, 'text-anchor': 'middle' }).textContent = `${num(P.P, 4)} W`;
    } else {
      // olla con agua y termómetro
      mk('path', { class: 'fw-body', d: `M90 ${yG - 120} L90 ${yG - 14} Q90 ${yG - 4} 100 ${yG - 4} L290 ${yG - 4} Q300 ${yG - 4} 300 ${yG - 14} L300 ${yG - 120}` });
      dyn.agua = mk('rect', { x: 93, y: yG - 100, width: 204, height: 93, style: 'fill:var(--c-p);fill-opacity:.25' });
      mk('rect', { class: 'fw-plane', x: 80, y: yG - 4, width: 230, height: 4 });
      mk('text', { class: 'fw-lbl', x: 195, y: yG - 128, 'text-anchor': 'middle' }).textContent = `${num(P.m, 3)} kg de agua`;
      // termómetro
      const tx = 340, tTop = yG - 160, tBot = yG - 20;
      mk('rect', { class: 'fw-body', x: tx - 7, y: tTop, width: 14, height: tBot - tTop, rx: 7 });
      mk('circle', { class: 'fw-body', cx: tx, cy: tBot + 4, r: 12, style: 'fill:var(--c-fr)' });
      dyn.merc = mk('rect', { x: tx - 3, width: 6, style: 'fill:var(--c-fr)' });
      dyn.tTop = tTop; dyn.tBot = tBot; dyn.tx = tx;
      dyn.temp = mk('text', { class: 'fw-lbl-ink', x: tx, y: tTop - 10, 'text-anchor': 'middle' });
      for (const T of [0, 50, 100]) { const y = tBot - (tBot - tTop - 10) * T / 100; mk('line', { class: 'fw-dim', x1: tx + 7, y1: y, x2: tx + 13, y2: y }); mk('text', { class: 'fw-lbl', x: tx + 16, y: y + 4, style: 'font-size:11px' }).textContent = `${T} °C`; }
    }
  }
  function pintar(c, e) {
    const { P, A, S, dyn } = c;
    const kwh = (P.escenario === 'estufa' ? A.kWh : A.kWh) * e.f;
    dyn.kwh.textContent = `${fmt(kwh, kwh < 1 ? 3 : 2)} kWh`;
    dyn.eur.textContent = `${fmt(kwh * P.precio, kwh * P.precio < 1 ? 3 : 2)} €`;
    const on = e.t < S.T - 1e-9 && e.t > 0;
    if (P.escenario === 'estufa') { dyn.res.forEach(r => r.style.opacity = e.t > 0 && e.t < S.T ? 1 : 0.35); return e.t === 0 ? 'Se enciende' : on ? 'Consume energía eléctrica' : 'Apagada'; }
    const y = dyn.tBot - (dyn.tBot - dyn.tTop - 10) * clamp(e.temp, 0, 100) / 100;
    dyn.merc.setAttribute('y', y); dyn.merc.setAttribute('height', dyn.tBot - y);
    dyn.temp.textContent = `${fmt(e.temp, 1)} °C`;
    dyn.agua.style.fillOpacity = (0.18 + 0.25 * e.f).toFixed(2);
    return e.t === 0 ? 'Se enciende' : on ? 'Q = m·c·ΔT entra en el agua' : 'Agua caliente';
  }
  function lectura(P, e, A) {
    const t = e.t >= 3600 ? `${fmt(e.t / 3600, 2)} h` : `${fmt(e.t / 60, 1)} min`;
    return `<span>t <b>${t}</b></span><span>consumido <b>${num(A.E * e.f)} J</b></span>` + (P.escenario === 'agua' ? `<span>T <b>${fmt(e.temp, 1)} °C</b></span>` : '');
  }
  function energias(P) {
    if (P.escenario === 'estufa') return [{ k: 'Eu', nombre: 'Energía eléctrica', color: 'var(--c-fr)' }];
    return [{ k: 'Eu', nombre: 'Útil (calienta el agua)', color: 'var(--c-fr)' }, { k: 'Qp', nombre: 'Perdida', color: 'var(--ink-2)' }];
  }
  function resultados(P, A) {
    const f = [];
    let ver = '';
    if (P.escenario === 'estufa') {
      f.push(['Energía consumida en kWh', 'E = P·t = (P en kW)·(t en h)', `${num(A.kWh)} kWh`]);
      f.push(['En julios', '1 kWh = 3,6·10⁶ J', `${num(A.E)} J = ${num(A.E / 1e6)} MJ`]);
      f.push(['Coste', 'coste = kWh · precio', `${fmt(A.coste, 2)} €`]);
      ver = 'El kWh es una unidad de energía, no de potencia: potencia (kW) por tiempo (h).';
    } else {
      f.push(['Calor que necesita el agua', 'Q = m·c·(T − T₀), c = 4180 J/(kg·K)', `${num(A.Qu)} J`]);
      if (P.incognita === 'P') f.push(['Potencia del aparato', 'η·P·t = Q  ⟹  P = Q / (η·t)', `${num(A.Pot)} W`]);
      else if (P.incognita === 't') f.push(['Tiempo necesario', 't = Q / (η·P)', `${num(A.t / 60)} min`]);
      else f.push(['Rendimiento', 'η = Q / (P·t)', `${fmt(A.eta * 100, 1)} %`, A.eta > 1]);
      f.push(['Energía eléctrica consumida', 'E = P·t', `${num(A.E)} J = ${num(A.kWh)} kWh`]);
      f.push(['Coste', 'coste = kWh · precio (con la energía consumida, no con la útil)', `${fmt(A.coste, A.coste < 0.1 ? 3 : 2)} €`]);
      ver = A.eta > 1 ? '<strong>Imposible:</strong> el rendimiento saldría mayor que 100 %. Con esa potencia no da tiempo a calentar tanta agua.' : `Se aprovecha el ${fmt(A.eta * 100, 1)} %: ${num(A.Qp)} J se pierden calentando el recipiente y el aire.`;
    }
    return { filas: f, veredicto: ver };
  }
  const def = {
    nombre: 'calentador', titulo: 'Simulador de consumo eléctrico', aria: 'Animación del aparato eléctrico', DEF, NOMBRES, SL,
    analizar, simular, vista: { w: 640, h: 250 }, escena, pintar, lectura, energias, resultados,
    totalNombre: 'Consumida', duracion: () => 6,
    notaCondiciones: 'Calor específico del agua: c = 4180 J/(kg·K). 1 kWh = 3,6·10⁶ J.',
    textoGrafica: 'La energía consumida crece de forma uniforme: la potencia es constante.',
  };
  const api = N.registrar('calentador', def);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') root.FisicaWidgets.calentador = api;
})(typeof window !== 'undefined' ? window : globalThis);
