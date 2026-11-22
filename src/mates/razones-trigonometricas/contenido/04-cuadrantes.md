---
slug: cuadrantes
titulo: Razones de cualquier ángulo
nombre: Cualquier ángulo: cuadrantes, más de 360° y negativos
corto: Cuadrantes
eyebrow: Apartado 4 · diapositivas 16 y 17
desc: Cada ángulo tiene las razones de uno del primer cuadrante, con el signo de su cuadrante.
icono: cuadrantes
---
## Idea clave: ángulo de referencia y signo

Arrastra el ángulo y mira el ángulo de referencia (en verde) y los signos:

[[widget:unidad|{"ang":150}]]

| Cuadrante | Ángulo β | Reducción (diapositiva 17) | Signos |
| --- | --- | --- | --- |
| I | 0° a 90° | Ya es el de referencia | sen +, cos +, tan + |
| II | 90° a 180° | sen β = sen(180° − β), cos β = −cos(180° − β) | sen +, cos −, tan − |
| III | 180° a 270° | sen β = −sen(β − 180°), cos β = −cos(β − 180°) | sen −, cos −, tan + |
| IV | 270° a 360° | sen β = −sen(360° − β), cos β = cos(360° − β) | sen −, cos +, tan − |

- **Ángulos de más de 360°**: se quitan vueltas completas (se divide entre 360° y se usa el resto). 750° = 2·360° + 30°.
- **Ángulos negativos**: se suma 360° las veces que haga falta, o se usa la paridad: sen(−θ) = −sen θ, cos(−θ) = cos θ.

> **¿Por qué esos signos?** El coseno es la coordenada x del punto (positiva a la derecha) y el seno, la y (positiva arriba). La tangente es su cociente: positiva cuando tienen el mismo signo (I y III).

## Ejemplo · sen 210°, cos(−60°) y tan 780°

[[figura:unidad|{"ang":210,"ref":true,"otros":[30],"cuadrantes":true}|210° está en el 3.º cuadrante; su referencia es 30°.]]

**sen 210° = −sen 30° = −1/2**

**cos(−60°) = cos 60° = 1/2** (el coseno es par)

**tan 780° = tan(780° − 720°) = tan 60° = √3**

=== D16·1 | Diapositiva 16, ejercicio 1 | Los otros cuadrantes
nivel: 2
pide: Razones de 120°, 210° y 330° a partir de ángulos del primer cuadrante
resultado: **sen 120° = sen 60°, cos 120° = −cos 60° · sen 210° = −sen 30°, cos 210° = −cos 30° · sen 330° = −sen 30°, cos 330° = cos 30°**
--- enunciado
Expresa las razones trigonométricas de los ángulos de los otros cuadrantes en función de las de los ángulos principales. Hazlo con 120°, 210° y 330° y da sus valores exactos.
--- pista Haz el dibujo
Dibuja la circunferencia unidad con cada ángulo y su simétrico en el primer cuadrante. Fíjate en qué coordenada cambia de signo.

[[dibujo:unidad|{"ang":120,"ref":true,"otros":[60],"cuadrantes":true}|120° y 60°: misma altura (seno) y abscisas opuestas (coseno).]]
--- pista Ángulos de referencia
120° = 180° − 60°; 210° = 180° + 30°; 330° = 360° − 30°.
--- solucion
**sen 120° = sen 60° = √3/2 · cos 120° = −cos 60° = −1/2**

**sen 210° = −sen 30° = −1/2 · cos 210° = −cos 30° = −√3/2**

**sen 330° = −sen 30° = −1/2 · cos 330° = cos 30° = √3/2**

> **Regla general.** 2.º cuadrante: 180° − β; 3.º: β − 180°; 4.º: 360° − β. El signo lo da el cuadrante.

=== D16·2 | Diapositiva 16, ejercicio 2 | Más de 360° y negativos
nivel: 1
pide: sen 1110°, cos 1110°, sen(−300°) y cos(−300°)
resultado: **sen 1110° = 1/2 · cos 1110° = √3/2 · sen(−300°) = √3/2 · cos(−300°) = 1/2**
--- enunciado
Calcula las razones trigonométricas de ángulos mayores de 360° y negativos: sen 1110°, cos 1110°, sen(−300°) y cos(−300°).
--- pista Haz el dibujo
Dibuja las vueltas: 1110° son tres vueltas y un poco más; −300° es girar en sentido horario casi una vuelta. ¿Dónde acaba cada uno?

[[dibujo:unidad|{"ang":30,"otros":[60],"etq":"1110°","etqOtros":["−300°"],"etqAng":"30°","cuadrantes":true}|1110° acaba donde 30°, y −300° donde 60°.]]
--- pista Quita o suma vueltas
1110 = 3·360 + 30. −300 + 360 = 60.
--- solucion
**1110° = 3·360° + 30° ⟹ sen 1110° = sen 30° = 1/2, cos 1110° = cos 30° = √3/2**

**−300° + 360° = 60° ⟹ sen(−300°) = sen 60° = √3/2, cos(−300°) = cos 60° = 1/2**

=== D25·3 | Diapositiva 25, ejercicio 3 | Las razones de 225°
nivel: 1
pide: sen, cos y tan de 225°
resultado: **sen 225° = −√2/2 · cos 225° = −√2/2 · tan 225° = 1**
widget: unidad {"ang":225}
--- enunciado
Calcula el seno, el coseno y la tangente de 225°.
--- pista Haz el dibujo
Sitúa 225° en la circunferencia unidad: ¿en qué cuadrante está y cuál es su ángulo de referencia? ¿Qué signo tienen x e y allí?

[[dibujo:unidad|{"ang":225,"ref":true,"otros":[45],"cuadrantes":true}|225° = 180° + 45°: 3.er cuadrante, las dos coordenadas negativas.]]
--- pista Reducción
225° − 180° = 45°. En el 3.er cuadrante, seno y coseno son negativos y la tangente, positiva.
--- solucion
**sen 225° = −sen 45° = −√2/2**

**cos 225° = −cos 45° = −√2/2**

**tan 225° = sen/cos = 1**

=== T5 | Nuevo | Tres ángulos para reducir
nivel: 2
pide: Razones exactas de 300°, −135° y 750°
resultado: **300°: −√3/2, 1/2, −√3 · −135°: −√2/2, −√2/2, 1 · 750°: 1/2, √3/2, √3/3**
widget: unidad {"ang":300}
--- enunciado
Calcula el valor exacto del seno, el coseno y la tangente de 300°, −135° y 750°.
--- pista Haz el dibujo
Sitúa cada ángulo en la circunferencia: −135° se gira en sentido horario y 750° da dos vueltas antes.

[[dibujo:unidad|{"ang":300,"ref":true,"otros":[60],"cuadrantes":true}|300° está en el 4.º cuadrante; su referencia es 60°.]]
--- pista Equivalentes
−135° + 360° = 225°. 750° − 720° = 30°.
--- solucion
300°, en el 4.º cuadrante y con referencia 60°: **sen 300° = −√3/2, cos 300° = 1/2, tan 300° = −√3**

−135° = 225°, en el 3.er cuadrante y con referencia 45°: **sen(−135°) = −√2/2, cos(−135°) = −√2/2, tan(−135°) = 1**

750° = 2·360° + 30°: **sen 750° = 1/2, cos 750° = √3/2, tan 750° = √3/3**

=== T6 | Nuevo | De una razón a las demás
nivel: 2
pide: sen θ = 3/5 con θ en el 2.º cuadrante: las otras razones
resultado: **cos θ = −4/5 · tan θ = −3/4 · cosec θ = 5/3 · sec θ = −5/4 · cot θ = −4/3**
--- enunciado
Sabiendo que sen θ = 3/5 y que θ está en el segundo cuadrante, calcula cos θ, tan θ y las tres razones recíprocas.
--- pista Haz el dibujo
Dibuja el punto de la circunferencia unidad en el 2.º cuadrante a altura 3/5 y el triángulo rectángulo hasta el eje X. ¿Cuánto mide el tramo horizontal y hacia dónde va?

[[dibujo:geo|{"ejes":{"x":[-1.3,1.3],"y":[-0.4,1.2]},"pts":{"O":[0,0],"P":[-0.8,0.6],"Q":[-0.8,0]},"el":[["circ","O",1,{"k":"eje","dash":true}],["pol",["O","P","Q"],{"fill":"p"}],["seg","O","P",{"k":"p"}],["seg","P","Q",{"k":"n"}],["seg","Q","O",{"k":"fr"}],["recto","Q","O","P"],["cota","P","Q","3/5",{"lado":1,"k":"n"}],["cota","Q","O","cos θ = ?",{"lado":-1,"k":"fr"}],["cota","O","P","1",{"lado":-1}]],"alto":240}|En el 2.º cuadrante el tramo horizontal va hacia la izquierda: el coseno es negativo.]]
--- pista Fórmula fundamental
cos²θ = 1 − sen²θ. Elige el signo según el cuadrante.
--- solucion
**cos²θ = 1 − 9/25 = 16/25 ⟹ cos θ = −4/5** (negativo en el 2.º cuadrante)

**tan θ = (3/5)/(−4/5) = −3/4**

**cosec θ = 5/3 · sec θ = −5/4 · cot θ = −4/3**

> **¿Por qué negativo?** La raíz da ±4/5. El dibujo dice cuál: en el 2.º cuadrante el punto está a la izquierda.

=== T8 | Nuevo | A partir de la tangente
nivel: 3
pide: tan θ = −2 con 270° < θ < 360°: sen θ y cos θ exactos
resultado: **cos θ = 1/√5 = √5/5 · sen θ = −2/√5 = −2√5/5**
--- enunciado
Si tan θ = −2 y 270° < θ < 360°, calcula el valor exacto de sen θ y cos θ.
--- pista Haz el dibujo
Dibuja un triángulo rectángulo en el 4.º cuadrante: avanza 1 a la derecha y baja 2. Calcula la hipotenusa con Pitágoras.

[[dibujo:geo|{"ejes":{"x":[-0.5,1.6],"y":[-2.3,0.5]},"pts":{"O":[0,0],"P":[1,-2],"Q":[1,0]},"el":[["pol",["O","P","Q"],{"fill":"p"}],["seg","O","P",{"k":"p"}],["seg","O","Q",{"k":"n"}],["seg","Q","P",{"k":"fr"}],["recto","Q","O","P"],["cota","O","Q","1",{"lado":1,"k":"n"}],["cota","Q","P","−2",{"lado":1,"k":"fr"}],["cota","O","P","√5",{"lado":1}]],"alto":240}|tan θ = −2/1: x positiva y y negativa, como corresponde al 4.º cuadrante.]]
--- pista Dos caminos
Con el dibujo: sen = −2/√5 y cos = 1/√5. O con 1 + tan²θ = sec²θ.
--- solucion
**1 + tan²θ = sec²θ ⟹ sec²θ = 5 ⟹ cos θ = 1/√5 = √5/5** (positivo en el 4.º cuadrante)

**sen θ = tan θ·cos θ = −2/√5 = −2√5/5**

Comprobación: 4/5 + 1/5 = 1. ✓
