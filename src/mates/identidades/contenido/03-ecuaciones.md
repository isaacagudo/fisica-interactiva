---
slug: ecuaciones
titulo: Ecuaciones trigonométricas
nombre: Ecuaciones en un intervalo
corto: Ecuaciones
eyebrow: Apartado 3 · diapositivas 25 a 27
desc: Dejar una sola razón, factorizar y buscar todas las soluciones del intervalo, no solo la de la calculadora.
icono: ecuacion
---
## Idea clave: una sola razón y todas las soluciones

1. **Una sola razón**: con sen² + cos² = 1, el ángulo doble o tan = sen/cos, deja la ecuación en sen x, en cos x o en tan x.
2. **Factoriza o resuelve como una ecuación de 2.º grado** (llamando, por ejemplo, s = sen x). **Nunca dividas** entre algo que puede valer 0.
3. **Cada valor da dos ángulos por vuelta**: sen x = k da α y 180° − α; cos x = k da α y 360° − α; tan x = k da α y α + 180°.
4. **Comprueba** que ninguna solución anula un denominador.

[[widget:ecuacion|{"f":"sen","k":-0.5}]]

## Ejemplo · 2sen²x − sen x − 1 = 0 en [0°, 360°)

Con s = sen x: **2s² − s − 1 = 0 ⟹ (2s + 1)(s − 1) = 0 ⟹ s = 1 o s = −1/2**

[[figura:grafica|{"f":"sen","sol":[90,210,330],"lineas":[[1,"y = 1"],[-0.5,"y = −1/2"]]}|sen x = 1 da 90°; sen x = −1/2 da 210° y 330°.]]

**x = 90°, 210° y 330°**

=== E1 | Nuevo | Un seno
nivel: 1
pide: sen x = 1/2 en [0°, 360°)
resultado: **x = 30° y x = 150°**
widget: ecuacion {"f":"sen","k":0.5}
--- enunciado
Resuelve sen x = 1/2 para 0° ≤ x < 360°.
--- pista Haz el dibujo
Dibuja la gráfica del seno en [0°, 360°) y la recta y = 1/2. Cuenta cuántas veces se cortan.

[[dibujo:grafica|{"f":"sen","k":0.5,"sol":[30,150]}|Dos cortes en una vuelta.]]
--- pista Los dos ángulos
arcsen(1/2) = 30°. El otro: 180° − 30°.
--- solucion
**x = 30°** y **x = 180° − 30° = 150°**

=== E2 | Nuevo | Un coseno
nivel: 1
pide: 2cos x + 1 = 0 en [0°, 360°)
resultado: **x = 120° y x = 240°**
widget: ecuacion {"f":"cos","k":-0.5}
--- enunciado
Resuelve 2cos x + 1 = 0 para 0° ≤ x < 360°.
--- pista Haz el dibujo
Despeja cos x y dibuja la gráfica del coseno con la recta horizontal de ese valor.

[[dibujo:grafica|{"f":"cos","k":-0.5,"sol":[120,240]}|cos x = −1/2: dos cortes.]]
--- pista Los dos ángulos
arccos(−1/2) = 120°. El otro: 360° − 120°.
--- solucion
**cos x = −1/2 ⟹ x = 120°** y **x = 360° − 120° = 240°**

=== D25·4 | Diapositiva 25, ejercicio 4 | Tres ecuaciones
nivel: 2
pide: a) cos²θ + cos θ = 0; b) 2cos²θ − 3cos θ = −1; c) tan θ = −0,56, en [0°, 360°)
resultado: **a) 90°, 180°, 270° · b) 0°, 60°, 300° · c) ≈ 150,75° y 330,75°**
widget: ecuacion {"f":"tan","k":-0.56}
--- enunciado
Resuelve en [0°, 360°): a) cos²θ + cos θ = 0; b) 2cos²θ − 3cos θ = −1; c) tan θ = −0,56.
--- pista Haz el dibujo
Para a) y b), dibuja la gráfica del coseno con las rectas horizontales de los valores que salgan al factorizar. Para c), la tangente con y = −0,56.

[[dibujo:grafica|{"f":"cos","sol":[0,60,300],"lineas":[[1,"y = 1"],[0.5,"y = 1/2"]]}|b) cos θ = 1 y cos θ = 1/2.]]
--- pista Factoriza
a) cos θ(cos θ + 1) = 0. b) Pasa el −1 al otro lado: 2c² − 3c + 1 = 0, con c = cos θ.
--- pista c) La tangente
arctan(−0,56) es negativo: súmale 180° y 360°.
--- solucion
a) **cos θ(cos θ + 1) = 0 ⟹ cos θ = 0 o cos θ = −1**: **θ = 90°, 270°** y **θ = 180°**.

b) **2c² − 3c + 1 = 0 ⟹ c = 1 o c = 1/2**: **θ = 0°** y **θ = 60°, 300°**.

c) **arctan(−0,56) ≈ −29,25°**, así que **θ ≈ 150,75°** y **θ ≈ 330,75°**.

> **¿Por qué no se divide entre cos θ en a)?** Se perderían las soluciones con cos θ = 0 (90° y 270°).

=== E4 | Nuevo | Ángulo doble en una ecuación
nivel: 2
pide: sen 2x = cos x en [0°, 360°)
resultado: **x = 30°, 90°, 150° y 270°**
--- enunciado
Resuelve sen 2x = cos x para 0° ≤ x < 360°.
--- pista Haz el dibujo
Dibuja las gráficas de sen 2x y de cos x en [0°, 360°): las soluciones son los puntos donde se cortan.

[[dibujo:geo|{"ejes":{"x":[0,6.4],"y":[-1.3,1.3],"xt":[[1.5708,"90°"],[3.1416,"180°"],[4.7124,"270°"],[6.2832,"360°"]],"yt":[[1,"1"],[-1,"−1"]]},"pts":{"a":[0.5236,0.866],"b":[1.5708,0],"c":[2.618,-0.866],"d":[4.7124,0]},"el":[["curva","sin(2*x)",0,6.2832,{"k":"p"}],["curva","cos(x)",0,6.2832,{"k":"fr"}],["pt","a","n","30°"],["pt","b","ne","90°"],["pt","c","s","150°"],["pt","d","ne","270°"]],"alto":260}|sen 2x (azul) y cos x (rojo) se cortan cuatro veces.]]
--- pista Ángulo doble y factor común
sen 2x = 2 sen x cos x. Pasa todo a un lado y saca cos x factor común.
--- solucion
**2 sen x cos x − cos x = 0 ⟹ cos x(2 sen x − 1) = 0**

**cos x = 0 ⟹ x = 90°, 270°**

**sen x = 1/2 ⟹ x = 30°, 150°**

> **¿Por qué no dividir entre cos x?** Se perderían 90° y 270°, que son soluciones.

=== E7 | Nuevo | Pasar a una sola razón
nivel: 3
pide: 2sen²x + 3cos x = 3 en [0, 2π)
resultado: **x = 0, π/3 y 5π/3**
--- enunciado
Resuelve 2sen²x + 3cos x = 3 para 0 ≤ x < 2π.
--- pista Haz el dibujo
Cuando tengas la ecuación en cos x, dibuja la gráfica del coseno en [0, 2π) con las rectas horizontales de los valores obtenidos.

[[dibujo:grafica|{"f":"cos","rad":true,"x":[0,2],"y":[-1.4,1.4],"sol":[0,0.3333,1.6667],"etqsol":["0","π/3","5π/3"],"lineas":[[1,"y = 1"],[0.5,"y = 1/2"]]}|cos x = 1 y cos x = 1/2.]]
--- pista Una sola razón
sen²x = 1 − cos²x. Queda una ecuación de 2.º grado en c = cos x.
--- solucion
**2(1 − cos²x) + 3cos x = 3 ⟹ 2cos²x − 3cos x + 1 = 0**

**(2cos x − 1)(cos x − 1) = 0 ⟹ cos x = 1/2 o cos x = 1**

**x = π/3, 5π/3** y **x = 0**

=== D25·5 | Diapositiva 25, ejercicio 5 | Con secante y tangente
nivel: 3
pide: 4cos θ − 3sec θ = 2tan θ, con −180° ≤ θ ≤ 180°
resultado: **θ = −126°, −54°, 18° y 162°**
--- enunciado
Resuelve 4cos θ − 3sec θ = 2tan θ con −180° ≤ θ ≤ 180°.
--- pista Haz el dibujo
Cuando la tengas en sen θ, dibuja el seno entre −180° y 180° con las dos rectas horizontales de los valores que salgan.

[[dibujo:grafica|{"f":"sen","x":[-180,180],"sol":[-126,-54,18,162],"etqsol":["−126°","−54°","18°","162°"],"lineas":[[0.309,"0,309"],[-0.809,"−0,809"]],"xt":[[-180,"−180°"],[-90,"−90°"],[90,"90°"],[180,"180°"]]}|Cada recta corta dos veces al seno en el intervalo.]]
--- pista Quita denominadores
sec θ = 1/cos θ y tan θ = sen θ/cos θ. Multiplica todo por cos θ (con cos θ ≠ 0).
--- pista Una sola razón
4cos²θ − 3 = 2 sen θ. Cambia cos²θ por 1 − sen²θ.
--- solucion
**4cos²θ − 3 = 2 sen θ ⟹ 4(1 − sen²θ) − 3 = 2 sen θ ⟹ 4sen²θ + 2 sen θ − 1 = 0**

**sen θ = (−2 ± √20)/8 = (−1 ± √5)/4**

**sen θ ≈ 0,309 ⟹ θ = 18°** y **θ = 180° − 18° = 162°**

**sen θ ≈ −0,809 ⟹ θ = −54°** y **θ = −180° + 54° = −126°**

Ninguna anula cos θ, así que valen las cuatro.

> **Un dato curioso.** (√5 − 1)/4 = sen 18° exacto: está relacionado con el pentágono regular.

=== D27·2 | Diapositiva 27, ejercicio | Identidad y ecuación
nivel: 3
pide: Demostrar cos x/(1 − sen x) − tan x = sec x y resolver la ecuación con 2x igual a √2 en [0, 2π)
resultado: **x = π/8, 7π/8, 9π/8 y 15π/8**
--- enunciado
1. Demuestra la igualdad cos x/(1 − sen x) − tan x = sec x.
2. Resuelve cos 2x/(1 − sen 2x) − tan 2x = √2 para 0 ≤ x < 2π.
--- pista Haz el dibujo
Para el apartado 2, dibuja cos 2x en [0, 2π) (da dos vueltas completas) y la recta y = √2/2.

[[dibujo:grafica|{"f":"cos","rad":true,"x":[0,2],"b":2,"y":[-1.4,1.4],"k":0.7071,"etqk":"y = √2/2","sol":[0.125,0.875,1.125,1.875],"etqsol":["π/8","7π/8","9π/8","15π/8"]}|cos 2x tiene periodo π: cuatro cortes en [0, 2π).]]
--- pista 1. Común denominador
Escribe tan x = sen x/cos x y usa el denominador común cos x(1 − sen x). En el numerador aparece cos²x = 1 − sen²x.
--- pista 2. Usa el apartado 1
Con 2x en lugar de x, el lado izquierdo es sec 2x. Entonces cos 2x = 1/√2, y 2x va de 0 a 4π.
--- solucion
1. **cos x/(1 − sen x) − sen x/cos x = (cos²x − sen x + sen²x)/(cos x(1 − sen x))**

**= (1 − sen x)/(cos x(1 − sen x)) = 1/cos x = sec x**

2. Por el apartado 1, la ecuación es **sec 2x = √2 ⟹ cos 2x = √2/2**.

Como 0 ≤ x < 2π, 2x va de 0 a 4π: **2x = π/4, 7π/4, 9π/4, 15π/4**

**x = π/8, 7π/8, 9π/8 y 15π/8**

> **¿Por qué cuatro?** Al duplicar el ángulo, en el intervalo caben dos vueltas de 2x, y cada vuelta da dos soluciones.

=== D27·3 | Diapositiva 27, ejercicio | 2cos²x = sen 2x
nivel: 3
pide: 2cos²x = sen 2x en [0, 2π), en términos de π
resultado: **x = π/4, π/2, 5π/4 y 3π/2**
--- enunciado
Resuelve la ecuación 2cos²x = sen 2x para 0 ≤ x < 2π, dando los resultados en términos de π.
--- pista Haz el dibujo
Dibuja 2cos²x y sen 2x en [0, 2π) y busca dónde se cortan.

[[dibujo:geo|{"ejes":{"x":[0,6.4],"y":[-1.3,2.3],"xt":[[1.5708,"π/2"],[3.1416,"π"],[4.7124,"3π/2"],[6.2832,"2π"]],"yt":[[1,"1"],[2,"2"]]},"pts":{"a":[0.7854,1],"b":[1.5708,0],"c":[3.927,1],"d":[4.7124,0]},"el":[["curva","2*cos(x)**2",0,6.2832,{"k":"p"}],["curva","sin(2*x)",0,6.2832,{"k":"fr"}],["pt","a","n","π/4"],["pt","b","ne","π/2"],["pt","c","n","5π/4"],["pt","d","ne","3π/2"]],"alto":260}|2cos²x (azul) y sen 2x (rojo): cuatro cortes.]]
--- pista Ángulo doble y factor común
sen 2x = 2 sen x cos x. Queda 2cos x(cos x − sen x) = 0.
--- solucion
**2cos²x − 2 sen x cos x = 0 ⟹ 2cos x(cos x − sen x) = 0**

**cos x = 0 ⟹ x = π/2, 3π/2**

**cos x = sen x ⟹ tan x = 1 ⟹ x = π/4, 5π/4**

> **¿Se puede dividir entre cos x para pasar a tan x?** Solo en el segundo factor, después de haber sacado aparte el caso cos x = 0.
