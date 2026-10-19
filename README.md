# Física interactiva

Apuntes animados, ejercicios resueltos paso a paso y simuladores de física para 1.º de Bachillerato (Bachillerato Internacional).

Web: https://isaacagudo.github.io/fisica-interactiva/

## Estructura

```
index.html                         Portada: un bloque por tema (mapa, ejercicios, examen y apartados; generado)
assets/base.css                    Estilos comunes (colores, tipografía, tarjetas, iconos)
assets/widgets/<nombre>.js         Simuladores (animaciones) reutilizables que se insertan en cualquier página (ver abajo)
assets/diagramas/diagramas.js      Librería de diagramas: se insertan pasando solo el tipo y los parámetros (ver abajo)
assets/examen/                     Generador de exámenes: núcleo, patrones de cada tema y la lógica de la página
temas/<tema>/<pagina>/index.html   Páginas de cada tema (generadas desde src/)
examen/index.html                  Generador de exámenes (generado desde src/examen/build.js)
simuladores/<nombre>/index.html    Redirecciones a los simuladores, que ahora están dentro de la teoría
src/                               Fuentes y scripts para generar las páginas
  package.json                     Dependencias: marked, esbuild, react (diagramas), mathjax-full y fuentes para el vídeo
  iconos.js                        Iconos SVG: mapa, ejercicios y examen (comunes a todos los temas) y uno por apartado
  examen/build.js                  Genera la página del generador de exámenes con los temas registrados
  energia/
    contenido/00-mapa.md           Mapa del tema (herramientas, índice, formulario, errores)
    contenido/NN-<categoría>.md    Idea clave y ejercicios de cada categoría (enunciado, resultado, solución, simulación)
    diagramas/*.jsx                Diagramas de fuerzas y figuras de los enunciados (SVG en JSX), uno por fichero
    build.js                       Genera el mapa, las 8 categorías, la sección de ejercicios y una página de solución por ejercicio
  ejercicio-4/
    content.js                     Texto de los 10 pasos, con fórmulas en TeX ($…$ y $$…$$)
    template.html                  Escenario animado, estilos y lógica de pasos
    build.js                       Genera la página web (o el fragmento para un artifact)
    make_video.py                  Genera un MP4 de la animación para iPad o WhatsApp
```

## Código de colores (en toda la web)

| Color | Significado |
| --- | --- |
| Azul | Peso y energía potencial |
| Rojo | Rozamiento y calor |
| Ámbar | Velocidad y energía cinética |
| Verde | Normal |
| Rosa | Muelle: fuerza elástica y energía elástica |

## Regenerar el tema de energía

```sh
cd src && npm install
node energia/build.js            # mapa, 8 apartados, sección de ejercicios, soluciones, bloque de la portada y cuestiones del examen
node examen/build.js             # página del generador de exámenes
```

Cada categoría es un fichero de `src/energia/contenido/`. Arriba, la cabecera (`slug`, `titulo`, `nombre`, `corto`, `eyebrow`, `desc`, `icono`, el nombre de su icono en `src/iconos.js`, y `resueltos`, la lista de ejemplos que se resuelven en la propia página del apartado) entre dos líneas `---`; después, el Markdown de la idea clave, que acaba con su simulador completo (`[[simulador:<nombre>|{json}]]` en una línea propia, con las opciones del widget), y después un bloque por ejercicio:

```
=== 5.1 | Teoría 12 | Bola de 100 g que cae 2 m sobre un resorte
figura: e_t12                      (opcional: figura del enunciado, de diagramas/)
pide: …                            (texto corto para el índice del mapa)
indice: …                          (resultado corto para el índice)
widget: muelle {"escenario": "vertical", "m": 0.1, "h": 2, "k": 1607}
--- enunciado
…
--- resultado
…
--- solucion
… (Markdown; [[figura:<tipo>|{parámetros}|<pie>]] inserta un diagrama de la librería y
   [[diagrama:<fichero>|<pie>]] uno dibujado a mano en diagramas/*.jsx)
--- simulacion
… (texto antes de la simulación)
```

La segunda columna es el origen: `Teoría n`, `Ejercicios n`, `Cuestiones n`, `Repaso n`, `Selectividad n` o `Nuevo` (ejercicios para practicar más). La página de cada apartado lleva la idea clave, los ejemplos de `resueltos` con su solución y su simulación, y un enlace a sus ejercicios. Todos los demás van a la sección común `temas/energia/ejercicios/`, agrupados por temática: enunciado, «Ver solo el resultado» y enlace a su solución (`temas/energia/ejercicios/5-3/`), con el enunciado, la resolución y la simulación. «ejercicio 2.1» en cualquier texto se enlaza solo con esa solución. Las fórmulas van en Unicode (sin TeX), así que las páginas se ven también en la vista rápida del iPad.

Cada tema tiene la misma estructura, con un icono para cada página: **mapa** del tema, **ejercicios** (todos los propuestos), **examen** (el generador) y los **apartados** de teoría, cada uno con su simulador. Los iconos son SVG de 96×72 con las variables de color de `base.css` (`src/iconos.js`); para un tema nuevo se añaden los de sus apartados.

## Generador de exámenes (`examen/`, `assets/examen/`)

`examen/?temas=energia` abre el generador con los apartados de ese tema. Se eligen los apartados y el número de ejercicios; cada examen sale de patrones de ejercicio con datos aleatorios, se reparte entre los apartados elegidos (sin repetir un tipo hasta haber salido todos los de su apartado), lleva la puntuación sobre 10 en cuartos de punto y, para cada ejercicio, el resultado, la solución paso a paso y la simulación con esos mismos datos. Se imprime solo el examen o el examen y, en otra página, las soluciones. La dirección guarda el examen (`?sel=energia:1,4,6&n=6&s=48213`: apartados, número de ejercicios y número de examen), así que el enlace lo vuelve a abrir igual.

| Fichero | Qué hace |
| --- | --- |
| `generador.js` | Números aleatorios con semilla, formato de números en español, reparto y puntuación (`generar(sel, n, semilla)`) |
| `energia.js` | Patrones del tema de energía: 34 tipos de ejercicio en 7 apartados |
| `energia-cuestiones.js` | Cuestiones de teoría, generadas por `src/energia/build.js` desde `08-cuestiones.md` (no editar) |
| `pagina.js` | La página: formulario, dirección, soluciones, simulaciones e impresión |

Las soluciones siguen el estilo de los apuntes: datos, diagrama de la librería con los datos del ejercicio y una frase que lo explica, «Qué herramienta usar» con su porqué, fórmulas con letras antes de los números, «¿Por qué?» después de cada fórmula y una comprobación por otro método. Un patrón es `{ id, titulo, peso, datos(r), enunciado(d, f), solucion(d, f), sim(d) }`: `datos` sortea los datos con `r.int`, `r.step`, `r.pick` o `r.chance` y devuelve `null` si no tienen sentido físico (por ejemplo, un bloque que debe volver a bajar necesita tg α > μ), y se vuelve a sortear; `solucion` devuelve `{ resultado, pasos, val }` (HTML de los pasos con «Qué herramienta usar», fórmulas y «¿Por qué?», y los números para comprobar); `sim` da el simulador y sus opciones. Para otro tema, se crea `assets/examen/<tema>.js` con `FisicaExamen.registrar({ tema, nombre, ruta, apartados: [{ slug, nombre, icono, patrones }] })` y se añade a la lista `TEMAS` de `src/examen/build.js`.

Cada patrón se comprueba en Node generando cientos de casos al azar: datos válidos, textos y diagramas sin `NaN`, que la solución tenga datos, diagrama, herramienta, «¿Por qué?» y comprobación, y resultados iguales a los que calculan los simuladores (`analizar` y `simular`) con esos datos.

## Diagramas (`assets/diagramas/diagramas.js`)

Los esquemas de las soluciones (fuerzas, alturas, estados, vectores, energía) salen de una librería: cada ejercicio solo pasa el tipo y sus parámetros. Cada diagrama se ve entero y tiene un botón «Dibujarlo paso a paso» que lo construye en el orden de clase (peso, normal, fuerza aplicada y sus componentes, velocidad, rozamiento…) con una frase que explica cada paso. Sin JavaScript, al imprimir o en la vista rápida del iPad se ve entero.

En los apuntes, en una línea propia de la solución:

```
[[figura:plano|{"alpha": 30, "mov": "sube", "roz": true, "v": "v₀"}|Pie opcional]]
```

En cualquier página: `<figure class="fig dg" data-diagrama="plano" data-config='{…}'></figure>` y `<script src="…/assets/diagramas/diagramas.js" defer></script>`. Desde JavaScript o Node: `FisicaDiagramas.html(tipo, parámetros, pie)` devuelve la figura y `dibujar(tipo, parámetros)` devuelve `{ svg, pasos }`.

| Tipo | Qué dibuja | Parámetros principales |
| --- | --- | --- |
| `horizontal` | Cuerpo en un suelo horizontal | `P`, `N`, `F`, `alpha` (negativo = empuja hacia abajo), `Fr`, `frena`, `empuja`, `sinPN`, `v`, `cuerpo` |
| `plano` | Cuerpo en un plano inclinado | `alpha`, `mov` ("sube" o "baja"), `roz`, `F` ("sube"), `Ftxt`, `v` |
| `vertical` | Carga que sube colgada | `Ftxt`, `v`, `cuerpo` |
| `niveles` | Alturas desde h = 0 | `puntos` [{`id`, `h`, `txt`, `v`}], `nivel0` |
| `parabola` | Tiro oblicuo | `th`, `v0txt`, `vxtxt`, `htxt` |
| `muelleH`, `muelleV` | Estados A y B con un muelle | `A`, `B` ({`txt`, `v`, `sep`, `comp`}), `roz`; `hTxt`, `xTxt` |
| `vectores` | Producto escalar en el plano | `Ax`, `Ay`, `Bx`, `By`, `Fx`, `Fy` |
| `reparto` | Energía consumida, útil y perdida | `total`, `util`, `txtTotal`, `txtUtil`, `txtPerd` |
| `cadena` | Cálculo en cadena (unidades, coste) | `cajas`, `ops`, `textos` |

Las longitudes de las fuerzas en `horizontal` siguen aproximadamente sus valores (`P`, `N`, `F`, `Fr`). Las frases del paso a paso se pueden cambiar con `pasos: [...]`. Para un tipo nuevo se añade una función en `T` que use `lienzo()` (base y pasos) y se documenta aquí.

## Simulaciones (`assets/widgets/`)

Se insertan con un `div` y sus scripts (el generador de páginas añade los scripts solo):

```html
<div data-widget="plano" data-config='{"escenario": "sube", "m": 2, "alpha": 30, "mu": 0.3, "v0": 3}'></div>
<script src="../../assets/widgets/nucleo.js" defer></script>
<script src="../../assets/widgets/plano.js" defer></script>
```

| Simulador | Escenarios y opciones principales |
| --- | --- |
| `vectores` | Trabajo con el producto escalar: `Fx`, `Fy`, `Ax`, `Ay`, `Bx`, `By`, `curvo` |
| `bloque` | `arrastre` (`m`, `F`, `alpha` (negativo = empujar hacia abajo), `mu`, `v0`, `hasta` "d", "t" o "parar", `d`, `t`, `dF`, `g`), `deslizar` (`v0`, `mu`), `frenada` (`v0kmh`, `v1kmh`, `d`), `bala` (`v0`, `p`), `pared` (`v0`, `v1`, `e`) |
| `plano` | `sube` (`alpha`, `mu`, `v0`, `L0` tramo horizontal antes, `Lr` largo del plano), `baja` (`alpha`, `h`, `mu`, `suelo`, `mu1`), `empuje` (`alpha`, `mu`, `d`, `v`, `sentido` "sube" o "baja") |
| `tiro` | `tiro` (`h0`, `v0`, `angulo`), `comparar` (`h0`, `v0`, `angulos`) |
| `potencia` | Subir cargas: `m`, `n`, `h`, `t`, `eta`, `cuerpo` ("carga", "sacos", "agua"), `incognita` ("P" o "m" con `Pcv`) |
| `calentador` | `agua` (`P`, `m`, `T0`, `Tf`, `t`, `eta`, `precio`, `incognita` "P", "eta" o "t"), `estufa` (`P`, `horas`, `precio`) |
| `muelle` | Ver la sección siguiente (no necesita `nucleo.js`) |

Opciones comunes: `escenario`, `titulo`, `modo` ("compacto" o "completo", que añade la gráfica energía–tiempo), `selector: true`, `controles` (deslizadores visibles), `ejemplos` (botones con valores) y `velocidad`. `nucleo.js` pone la interfaz (escena, barra de energías, reproducción, deslizadores, resultados) y el motor de movimiento con aceleración constante a trozos, que da resultados exactos. En Node, `require('./assets/widgets/plano.js')` da `analizar(p)` y `simular(p, a)` para comprobar ejercicios.

## Widget del muelle (`assets/widgets/muelle.js`)

Un simulador que se inserta en cualquier página con un `div` y un script, sin dependencias:

```html
<div data-widget="muelle" data-config='{"escenario": "vertical", "m": 0.5, "h": 1, "k": 245}'></div>
<script src="../../assets/widgets/muelle.js" defer></script>
```

Tres situaciones (`escenario`):

| Escenario | Qué simula | Opciones |
| --- | --- | --- |
| `horizontal` | Bloque lanzado contra un muelle | `m`, `k`, `v0`, `L` (tramo antes del muelle), `mu`, `rozMuelle` (si hay rozamiento también bajo el muelle) |
| `vertical` | Cuerpo que cae sobre un resorte | `m`, `k`, `h` (altura sobre el extremo libre), `v0` (hacia abajo) |
| `rampa` | Bloque que baja una rampa, recorre L y choca con un muelle | `m`, `k`, `h`, `alpha` (grados), `muRampa`, `mu` (suelo), `L` |

Otras opciones: `titulo`; `modo` (`"compacto"` por defecto, `"completo"` añade la gráfica energía–tiempo); `selector: true` (pestañas para cambiar de situación); `controles` (lista de deslizadores, por ejemplo `["m", "k"]`); `ejemplos` (botones: `[{"nombre": "…", "valores": {…}}]`; si `valores` trae `escenario`, carga la situación completa, y si no, solo cambia esos valores); `velocidad` (0.25, 0.5 o 1). Unidades del SI y g = 9,8 m/s².

Desde JavaScript: `elemento.__wm.set({k: 900})` cambia valores y vuelve a simular, y `FisicaWidgets.muelle.mount(elemento, opciones)` lo monta a mano. En Node, `require('./assets/widgets/muelle.js')` da `analizar(p)` (resultados con las fórmulas de energía) y `simular(p)` (integración numérica), útiles para comprobar ejercicios.

El simulador completo está en la página del apartado `temas/energia/muelles/` y cada ejercicio de muelles lleva el suyo.

## Regenerar el ejercicio 4

```sh
cd src && npm install
cd ejercicio-4 && node build.js          # escribe temas/energia/plano-inclinado-ejercicio-4/index.html
```

Vídeo MP4 (necesita Python con Playwright y ffmpeg):

```sh
node build.js --artifact && python3 make_video.py   # crea ejercicio4.mp4 en esta carpeta
```

## Añadir un tema o un ejercicio

1. Copia `src/ejercicio-4` a `src/<nuevo>` y cambia en `template.html` la física (`state(t)`), las escenas (`scenes`) y el dibujo; en `content.js`, los pasos.
2. Ajusta la ruta de salida en `build.js` (`temas/<tema>/<pagina>/index.html`) y ejecútalo.
3. Añade una tarjeta en la portada (`index.html`) dentro del bloque del tema, o un bloque nuevo (el de energía lo escribe `src/energia/build.js` entre las marcas `<!-- tema:energia -->`).
4. Para un simulador nuevo, copia uno de `assets/widgets/` que use `nucleo.js` (por ejemplo `tiro.js`): la física va en `analizar` y `simular`, el dibujo en `escena` y `pintar`, y los resultados en `resultados`.

Cada página explica cada fórmula con un «¿Por qué?» y comprueba los resultados por un segundo método.

## Nota sobre iPad

Los HTML abiertos desde la vista previa de WhatsApp o desde la app Archivos no ejecutan JavaScript, así que no se animan. Abre siempre la dirección web en Safari, o usa el vídeo MP4.
