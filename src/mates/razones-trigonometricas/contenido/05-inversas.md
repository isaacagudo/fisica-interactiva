---
slug: inversas
titulo: Razones recíprocas y funciones inversas
nombre: Recíprocas e inversas
corto: Inversas
eyebrow: Apartado 5 · diapositivas 12 y 13
desc: sec, cosec y cot son inversos de multiplicar; arcsen, arccos y arctan deshacen el seno, el coseno y la tangente.
icono: inversas
---
## Idea clave: dos «inversos» distintos

**Recíprocas** (dividir 1 entre la razón):

**cosec θ = 1/sen θ · sec θ = 1/cos θ · cot θ = 1/tan θ = cos θ/sen θ**

El coseno es par, así que la secante también; seno y tangente son impares, y la cosecante y la cotangente también.

**Funciones inversas** (dado el valor, recuperar el ángulo):

| Función | Se le da… | Devuelve un ángulo entre… | Ejemplo |
| --- | --- | --- | --- |
| arcsen x | x ∈ [−1, 1] | −π/2 y π/2 (−90° y 90°) | arcsen(1/2) = π/6 |
| arccos x | x ∈ [−1, 1] | 0 y π (0° y 180°) | arccos(√3/2) = π/6 |
| arctan x | cualquier x | −π/2 y π/2, sin los extremos | arctan(1/√3) = π/6 |

> **¿Por qué un intervalo tan corto?** Muchos ángulos tienen el mismo seno (30°, 150°, 390°…). Para que arcsen sea una función, se queda con uno solo. Por eso, al resolver sen θ = k, **la calculadora da un ángulo y hay que buscar el otro**.

[[widget:ecuacion|{"f":"sen","k":0.38}]]

## Ejemplo · sen θ = 0,38 entre 0° y 360°

[[figura:grafica|{"f":"sen","k":0.38,"sol":[22.33,157.67],"etqsol":["22,3°","157,7°"]}|La recta y = 0,38 corta al seno dos veces en una vuelta.]]

**θ₁ = arcsen 0,38 ≈ 22,3° · θ₂ = 180° − 22,3° = 157,7°**

=== T7 | Nuevo | Tres funciones inversas
nivel: 2
pide: arcsen(−1/2), arccos(−√2/2) y arctan √3
resultado: **−π/6 · 3π/4 · π/3**
--- enunciado
Calcula en radianes, sin calculadora: a) arcsen(−1/2); b) arccos(−√2/2); c) arctan √3.
--- pista Haz el dibujo
Dibuja la circunferencia unidad y sombrea el tramo donde vive cada respuesta: arcsen y arctan en el lado derecho (de −π/2 a π/2); arccos en la mitad de arriba (de 0 a π).

[[dibujo:unidad|{"ang":-30,"otros":[135],"etq":"arcsen(−1/2)","etqOtros":["arccos(−√2/2)"],"etqAng":"−π/6","cuadrantes":true}|arcsen da un ángulo del lado derecho; arccos, uno de la mitad de arriba.]]
--- pista Ángulos notables
sen(π/6) = 1/2 y cos(π/4) = √2/2. El signo decide hacia dónde se va.
--- solucion
a) **arcsen(−1/2) = −π/6** (el seno es impar y el ángulo tiene que estar entre −π/2 y π/2).

b) **arccos(−√2/2) = π − π/4 = 3π/4** (entre 0 y π, en el lado izquierdo porque el coseno es negativo).

c) **arctan √3 = π/3**

=== D26·2 | Diapositiva 26, ejercicio 2 | Dos ángulos para cada razón
nivel: 2
pide: θ entre 0° y 360° con sen θ = 0,38 y con cos θ = −0,62
resultado: **a) 22,3° y 157,7° · b) 128,3° y 231,7°**
widget: ecuacion {"f":"cos","k":-0.62}
--- enunciado
Encuentra los valores de θ entre 0° y 360° tales que: a) sen θ = 0,38; b) cos θ = −0,62.
--- pista Haz el dibujo
Dibuja la gráfica del seno de 0° a 360° y la recta y = 0,38: los cortes son las soluciones. Haz lo mismo con el coseno y y = −0,62.

[[dibujo:grafica|{"f":"cos","k":-0.62,"sol":[128.32,231.68],"etqsol":["128,3°","231,7°"]}|b) La recta y = −0,62 corta al coseno dos veces.]]
--- pista El segundo ángulo
Seno: α y 180° − α. Coseno: α y 360° − α.
--- solucion
a) **θ₁ = arcsen 0,38 ≈ 22,3° · θ₂ = 180° − 22,3° ≈ 157,7°**

b) **θ₁ = arccos(−0,62) ≈ 128,3° · θ₂ = 360° − 128,3° ≈ 231,7°**

> **¿Por qué 360° − α para el coseno?** Los ángulos α y −α tienen el mismo coseno (es par), y −α equivale a 360° − α.

=== D26·4 | Diapositiva 26, ejercicio 4 | Definir las inversas
nivel: 1
pide: Definir arcsen, arccos y arctan con su dominio y su recorrido
resultado: **arcsen: [−1, 1] → [−π/2, π/2] · arccos: [−1, 1] → [0, π] · arctan: ℝ → (−π/2, π/2)**
--- enunciado
Define las funciones trigonométricas inversas, indicando para qué valores existen y entre qué ángulos están sus resultados.
--- pista Haz el dibujo
Dibuja la gráfica del seno y quédate con el trozo entre −π/2 y π/2: ahí cada altura sale una sola vez. Ese trozo es el que se puede «dar la vuelta».

[[dibujo:geo|{"ejes":{"x":[-3.4,3.4],"y":[-1.5,1.5],"xt":[[-1.5708,"−π/2"],[1.5708,"π/2"]],"yt":[[1,"1"],[-1,"−1"]]},"pts":{},"el":[["curva","sin(x)",-3.4,3.4,{"k":"eje","dash":true}],["curva","sin(x)",-1.5708,1.5708,{"k":"p"}]],"alto":220}|Entre −π/2 y π/2 el seno pasa una sola vez por cada valor de −1 a 1.]]
--- pista El dominio
arcsen y arccos solo admiten números entre −1 y 1, porque el seno y el coseno no se salen de ahí.
--- solucion
**arcsen x = θ ⟺ sen θ = x**, con x ∈ [−1, 1] y θ ∈ [−π/2, π/2].

**arccos x = θ ⟺ cos θ = x**, con x ∈ [−1, 1] y θ ∈ [0, π].

**arctan x = θ ⟺ tan θ = x**, con x ∈ ℝ y θ ∈ (−π/2, π/2).

> **¿Por qué el arccos va de 0 a π?** Entre −π/2 y π/2 el coseno repite valores (es par). Entre 0 y π pasa una sola vez por cada valor.
