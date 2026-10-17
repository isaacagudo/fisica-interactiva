# Física interactiva

Apuntes animados, ejercicios resueltos paso a paso y simuladores de física para 1.º de Bachillerato (Bachillerato Internacional).

Web: https://isaacagudo.github.io/fisica-interactiva/

## Estructura

```
index.html                         Portada: un bloque por tema con sus páginas
assets/base.css                    Estilos comunes (colores, tipografía, tarjetas)
assets/widgets/<nombre>.js         Widgets reutilizables (simuladores que se insertan en cualquier página)
temas/<tema>/<pagina>/index.html   Ejercicios resueltos (generados desde src/)
simuladores/<nombre>/index.html    Simuladores interactivos (HTML escrito a mano)
src/                               Fuentes y scripts para generar las páginas
  package.json                     Dependencias: mathjax-full (fórmulas) y fuentes para el vídeo
  energia/
    contenido.json                 Tema «Trabajo, potencia y energía»: Markdown del mapa y de las 8 categorías
    diagramas/*.jsx                Diagramas de fuerzas (SVG en JSX), uno por fichero
    build.js                       Genera temas/energia/index.html y temas/energia/<categoría>/index.html
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
node energia/build.js            # escribe el mapa del tema y las 8 páginas de categorías
```

En `contenido.json` cada página es Markdown; `[[diagrama:<fichero>|<pie>]]` inserta un diagrama de `diagramas/` `[[categorias]]` las tarjetas de categorías y `[[widget:muelle|{…}]]` un simulador del muelle ya configurado (las opciones van en JSON, en una sola línea; ver abajo). Las fórmulas van en Unicode (sin TeX), así que las páginas no cargan ninguna librería y se ven también en la vista rápida del iPad.

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
4. Para un simulador, copia `simuladores/plano-inclinado/` y cambia `compute()` y `state()`. Si se va a usar en varias páginas, mejor como widget: copia `assets/widgets/muelle.js` (la física en `analizar` y `simular`, el dibujo en `buildScene` y `render`).

Cada página explica cada fórmula con un «¿Por qué?» y comprueba los resultados por un segundo método.

## Nota sobre iPad

Los HTML abiertos desde la vista previa de WhatsApp o desde la app Archivos no ejecutan JavaScript, así que no se animan. Abre siempre la dirección web en Safari, o usa el vídeo MP4.
