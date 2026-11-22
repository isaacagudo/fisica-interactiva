---
slug: sinusoide
titulo: La función a·sen[b(x + c)] + d
nombre: Sinusoides
corto: Sinusoide
eyebrow: Apartado 4 · diapositiva 20
desc: a estira en vertical (amplitud), b cambia el periodo (2π/b), c traslada en horizontal y d sube o baja el eje.
icono: sinusoide
---
## Idea clave: cada parámetro, un efecto

**f(x) = a·sen[b(x + c)] + d**

| Parámetro | Efecto | Cómo se calcula |
| --- | --- | --- |
| a | Amplitud: cuánto sube y baja respecto al eje | **a = (máx − mín)/2** |
| d | Eje (desplazamiento vertical) | **d = (máx + mín)/2** |
| b | Cuántas ondas caben en 2π | **periodo = 2π/b** |
| c | Traslación horizontal (c > 0, a la izquierda) | Donde empieza la onda |

[[widget:sinusoide|{"a":3,"b":1,"c":0,"d":4}]]

> **¿Por qué la media?** El eje está justo a mitad de camino entre el máximo y el mínimo, y la amplitud es la mitad de la distancia entre ellos.

## Ejemplo · Una noria

Una cabina sube hasta 42 m, baja hasta 2 m y da una vuelta cada 10 minutos:

**a = (42 − 2)/2 = 20 · d = (42 + 2)/2 = 22 · b = 2π/10 = π/5**

[[figura:geo|{"ejes":{"x":[0,21],"y":[0,46],"xt":[[5,"5"],[10,"10"],[15,"15"],[20,"20"]],"yt":[[2,"2"],[22,"22"],[42,"42"]],"xl":"t (min)","yl":"h (m)"},"pts":{},"el":[["curva","20*sin(PI/5*x)+22",0,20,{"k":"p"}],["recta",0,42,{"k":"n","dash":true}],["recta",0,22,{"k":"eje","dash":true}],["recta",0,2,{"k":"n","dash":true}]],"alto":240}|h(t) = 20·sen(πt/5) + 22: entre 2 y 42 m, una vuelta cada 10 minutos.]]

=== E6 | Nuevo | Una sinusoide a partir de su gráfica
nivel: 2
pide: Máximo 7, mínimo 1 y periodo 12: hallar a, b y d de f(x) = a·sen(bx) + d
resultado: **a = 3 · d = 4 · b = π/6**
widget: sinusoide {"a":3,"b":1,"c":0,"d":4}
--- enunciado
Una función de la forma f(x) = a·sen(bx) + d, con a > 0, tiene un máximo de 7, un mínimo de 1 y un periodo de 12. Halla a, b y d.
--- pista Haz el dibujo
Dibuja las rectas y = 7, y = 1 y el eje a mitad de camino. Dibuja una onda que empiece en el eje, suba al máximo y complete el ciclo en x = 12.

[[dibujo:geo|{"ejes":{"x":[0,13],"y":[0,8],"xt":[[3,"3"],[6,"6"],[9,"9"],[12,"12"]],"yt":[[1,"1"],[4,"4"],[7,"7"]]},"pts":{},"el":[["curva","3*sin(PI/6*x)+4",0,12.5,{"k":"p"}],["recta",0,7,{"k":"n","dash":true}],["recta",0,4,{"k":"eje","dash":true}],["recta",0,1,{"k":"n","dash":true}],["txt",[12.6,7],"máx",{"pos":"e","k":"n"}],["txt",[12.6,4],"eje",{"pos":"e","k":"eje"}],["txt",[12.6,1],"mín",{"pos":"e","k":"n"}]],"alto":240}|Del eje al máximo hay una amplitud.]]
--- pista Las tres fórmulas
a = (máx − mín)/2, d = (máx + mín)/2 y periodo = 2π/b.
--- solucion
**a = (7 − 1)/2 = 3**

**d = (7 + 1)/2 = 4**

**12 = 2π/b ⟹ b = 2π/12 = π/6**

**f(x) = 3·sen(πx/6) + 4**
