# Física interactiva

Apuntes animados, ejercicios resueltos paso a paso y simuladores de física para 1.º de Bachillerato (Bachillerato Internacional).

Web: https://isaacagudo.github.io/fisica-interactiva/

## Estructura

```
index.html                         Portada: un bloque por tema con sus páginas
assets/base.css                    Estilos comunes (colores, tipografía, tarjetas)
assets/widgets/<nombre>.js         Simuladores reutilizables que se insertan en cualquier página (ver abajo)
temas/<tema>/<pagina>/index.html   Páginas de cada tema (generadas desde src/)
simuladores/<nombre>/index.html    Simuladores interactivos (HTML escrito a mano)
src/                               Fuentes y scripts para generar las páginas
  package.json                     Dependencias: mathjax-full (fórmulas) y fuentes para el vídeo
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
node energia/build.js            # mapa, 8 apartados, sección de ejercicios y sus soluciones
```

Cada categoría es un fichero de `src/energia/contenido/`. Arriba, la cabecera (`slug`, `titulo`, `nombre`, `corto`, `eyebrow`, `desc` y `resueltos`, la lista de ejemplos que se resuelven en la propia página del apartado) entre dos líneas `---`; después, el Markdown de la idea clave, y después un bloque por ejercicio:

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
… (Markdown; [[diagrama:<fichero>|<pie>]] inserta un diagrama)
--- simulacion
… (texto antes de la simulación)
```

La segunda columna es el origen: `Teoría n`, `Ejercicios n`, `Cuestiones n`, `Repaso n`, `Selectividad n` o `Nuevo` (ejercicios para practicar más). La página de cada apartado lleva la idea clave, los ejemplos de `resueltos` con su solución y su simulación, y un enlace a sus ejercicios. Todos los demás van a la sección común `temas/energia/ejercicios/`, agrupados por temática: enunciado, «Ver solo el resultado» y enlace a su solución (`temas/energia/ejercicios/5-3/`), con el enunciado, la resolución y la simulación. «ejercicio 2.1» en cualquier texto se enlaza solo con esa solución. Las fórmulas van en Unicode (sin TeX), así que las páginas se ven también en la vista rápida del iPad.

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

La página completa está en `simuladores/muelle/` y cada ejercicio de `temas/energia/muelles/` lleva el suyo.

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
3. Añade una tarjeta en la portada (`index.html`) dentro del bloque del tema, o un bloque nuevo.
4. Para un simulador nuevo, copia uno de `assets/widgets/` que use `nucleo.js` (por ejemplo `tiro.js`): la física va en `analizar` y `simular`, el dibujo en `escena` y `pintar`, y los resultados en `resultados`.

Cada página explica cada fórmula con un «¿Por qué?» y comprueba los resultados por un segundo método.

## Nota sobre iPad

Los HTML abiertos desde la vista previa de WhatsApp o desde la app Archivos no ejecutan JavaScript, así que no se animan. Abre siempre la dirección web en Safari, o usa el vídeo MP4.
