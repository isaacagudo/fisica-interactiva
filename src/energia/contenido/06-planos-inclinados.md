---
slug: planos-inclinados
titulo: Planos inclinados con rozamiento
nombre: Planos inclinados con rozamiento
corto: Planos inclinados
eyebrow: Categoría 6
desc: Subir, bajar y volver: la ecuación de trabajo y energía.
resueltos: 6.1, 6.2
---
## Idea clave: las cuatro fórmulas del plano inclinado

El [ejercicio 4 de Selectividad](../plano-inclinado-ejercicio-4/) está resuelto paso a paso con animación, y en el [simulador del plano inclinado](../../../simuladores/plano-inclinado/) se pueden cambiar la masa, el ángulo, μ y la velocidad para ver qué pasa. Abajo están los ejercicios de los apuntes del tema y, para practicar más, los cuatro de Selectividad de la hoja de planos inclinados (el 4, también con la animación paso a paso).

| Fórmula | De dónde sale |
| --- | --- |
| N = m·g·cos α | La normal compensa la componente del peso perpendicular al plano |
| W roz = −μ·m·g·cos α·d | Fr = μ·N, siempre contra el movimiento; d es la distancia sobre el plano |
| h = d·sen α | En el triángulo del plano, h es el cateto opuesto y d la hipotenusa |
| Ec,A + Ep,A + W roz = Ec,B + Ep,B | Ecuación de trabajo y energía entre dos puntos A y B |

> **¿Por qué la ecuación de trabajo y energía?** Es la conservación de la categoría 4 con un término más: el trabajo de las fuerzas no conservativas (aquí el rozamiento), escrito con su signo negativo. En los apuntes aparece como E M0 = E MF + Fr·Δs: es lo mismo con el rozamiento al otro lado del igual. Usa una forma, no las dos.

**Resultados que salen siempre igual** (úsalos para comprobar, no para saltarte el planteamiento):

- Lanzado hacia arriba con v₀, se para tras recorrer **d = v₀² / [2·g·(sen α + μ·cos α)]**.
- Vuelve a bajar solo si **tg α > μ** (el peso a lo largo del plano vence al rozamiento estático máximo).
- Bajando desde el reposo una distancia d: **v = √[2·g·d·(sen α − μ·cos α)]**.
- **A velocidad constante** no se usa la energía para hallar la fuerza: ΣF = 0 a lo largo del plano (Ejercicios 2).

**Errores típicos:** poner h en lugar de d en el rozamiento; tomar N = m·g en el plano; restar el rozamiento dos veces; olvidar que el peso ya está en Ep y contarlo otra vez como trabajo.

=== 6.1 | Teoría 14 | Rampa de 6 m de alto y 10 m de largo, μ = 0,25
figura: e_t14
pide: Rampa de 6 m × 10 m, μ = 0,25
indice: v = 8,85 m/s
widget: plano {"escenario": "baja", "m": 4, "alpha": 36.87, "h": 6, "mu": 0.25, "v0": 0, "controles": ["m", "alpha", "h", "mu"]}
--- enunciado
Desde lo alto de la rampa cuyas dimensiones son las de la figura se deja caer un cuerpo de 4 kg de masa. Calcula la velocidad con la que llega a la base del plano si el coeficiente de rozamiento entre el cuerpo y el plano es 0,25.
--- resultado
v = 8,85 m/s al llegar a la base.
--- solucion
Datos: m = 4 kg · h = 6 m · longitud d = 10 m · μ = 0,25 · parte del reposo arriba · g = 9,8 m/s².

[[diagrama:w61_bajada|Teoría 14 · fuerzas al bajar por la rampa]]

Al bajar, el rozamiento apunta hacia arriba del plano; la normal vale m·g·cos α, no m·g.

**Qué herramienta usar.** Dos puntos (arriba y abajo) y rozamiento: ecuación de trabajo y energía.

**Paso 1. Ángulo sin calcularlo**

**sen α = 6/10 = 0,6  cos α = 8/10 = 0,8** (el cateto horizontal es √(10² − 6²) = 8 m)

> **¿Por qué?** La rampa es un triángulo rectángulo 6–8–10: no hace falta el ángulo (36,9°), solo su seno y su coseno.

**Paso 2. Trabajo del rozamiento**

**W roz = −μ·m·g·cos α·d = −0,25 · 4 · 9,8 · 0,8 · 10 = −78,4 J**

**Paso 3. Ecuación de trabajo y energía** (h = 0 en la base; A arriba, B abajo)

**0 + m·g·h + W roz = ½·m·v² + 0 ⟹ 235,2 − 78,4 = 2·v² ⟹ v = √(156,8 / 2) = 8,85 m/s**

> **¿Por qué cada término?** Ec,A = 0 porque «se deja caer» (reposo). Ep,A = 4·9,8·6 = 235,2 J. W roz, negativo, ya lleva su signo. Ep,B = 0 porque B está en el nivel de referencia. De los 235,2 J, 78,4 J se convierten en calor y 156,8 J en energía cinética.

**Comprobación por dinámica.** a = g·(sen α − μ·cos α) = 9,8·(0,6 − 0,2) = 3,92 m/s² y v = √(2·a·d) = √(78,4) = 8,85 m/s. Coincide. Además tg α = 0,75 > μ = 0,25: el bloque sí empieza a deslizar solo. Sin rozamiento llegaría a √(2·9,8·6) = 10,8 m/s.
--- simulacion
Pon μ = 0 en la simulación: llegaría a 10,8 m/s. Con rozamiento llega a 8,85 m/s, y la diferencia está en la barra roja.

=== 6.2 | Teoría 15 | Bloque de 2 kg lanzado a 3 m/s por un plano de 30°, μ = 0,3
pide: 3 m/s por 30°, μ = 0,3
indice: h = 0,302 m (d = 0,604 m)
widget: plano {"escenario": "sube", "m": 2, "alpha": 30, "mu": 0.3, "v0": 3, "controles": ["m", "alpha", "mu", "v0"]}
--- enunciado
Se lanza un bloque de 2 kg con una rapidez de 3 m/s desde la base de un plano inclinado 30°; el coeficiente de rozamiento es 0,3. Calcula la altura a la que asciende.
--- resultado
h = 0,302 m (recorre d = 0,604 m sobre el plano).
--- solucion
Datos: m = 2 kg · v₀ = 3 m/s desde la base · α = 30° · μ = 0,3 · g = 9,8 m/s².

[[diagrama:w62_subida|Teoría 15 · fuerzas al subir por el plano]]

Al subir, Px y el rozamiento apuntan los dos hacia abajo del plano y frenan a la vez.

**Qué herramienta usar.** Ecuación de trabajo y energía entre la base (A) y el punto donde se para (B). La incógnita es d, que aparece en la altura y en el rozamiento.

**Paso 1. Ecuación** (h = 0 en la base)

**½·m·v₀² + 0 − μ·m·g·cos α·d = 0 + m·g·d·sen α**

> **¿Por qué cada término?** En A solo hay Ec (está en h = 0). El rozamiento apunta hacia abajo del plano mientras el bloque sube: trabajo negativo. En B el bloque está parado (Ec = 0) a una altura h = d·sen α.

**Paso 2. Despejar d con letras** (la masa se simplifica)

**d = v₀² / [2·g·(sen α + μ·cos α)] = 9 / [19,6 · (0,5 + 0,3 · 0,866)] = 9 / 14,89 = 0,604 m**

**h = d·sen α = 0,604 · 0,5 = 0,302 m**

> **¿Por qué sen α + μ·cos α?** Al subir, el peso a lo largo del plano y el rozamiento frenan los dos a la vez, así que se suman.

**Comprobación.** Energía inicial: ½ · 2 · 9 = 9 J. Energía potencial en B: 2 · 9,8 · 0,302 = 5,92 J. Calor: 0,3 · 2 · 9,8 · 0,866 · 0,604 = 3,08 J. 5,92 + 3,08 = 9 J. Cuadra.

**Comparación con 4.1.** Sin rozamiento, con 3 m/s subía hasta 0,459 m; con μ = 0,3 solo llega a 0,302 m. Y como tg 30° = 0,577 > 0,3, después vuelve a bajar: llegaría a la base a √[2·9,8·0,604·(0,5 − 0,26)] = 1,69 m/s.
--- simulacion
La simulación sigue después de la altura máxima: como tg 30° > 0,3, el bloque vuelve a bajar, más despacio de lo que subió.

=== 6.3 | Repaso 3 | Plano de 15 m y 9 m de alto, 2 kg a 5 m/s, μ = 0,4
figura: e_r3
pide: 5 m/s por un plano 9 m × 15 m, μ = 0,4
indice: d = 1,39 m; W roz = −8,70 J
widget: plano {"escenario": "sube", "m": 2, "alpha": 36.87, "mu": 0.4, "v0": 5, "Lr": 15, "controles": ["m", "mu", "v0"]}
--- enunciado
Desde la base del plano inclinado de la figura se lanza hacia arriba, y paralelamente al plano, un cuerpo de 2 kg con velocidad de 5 m/s. Si el coeficiente de rozamiento entre el plano y el cuerpo es μ = 0,4, calcula: a) la distancia que recorre el cuerpo sobre el plano hasta que se para; b) el trabajo disipado por la fuerza de rozamiento. Resuelve este ejercicio por consideraciones energéticas.
--- resultado
a) d = 1,39 m · b) W roz = −8,70 J (energía disipada: 8,70 J).
--- solucion
Datos: m = 2 kg · v₀ = 5 m/s desde la base · plano de 15 m de largo y 9 m de alto · μ = 0,4 · g = 9,8 m/s². El esquema es el del diagrama de 6.2 (bloque que sube).

**Qué herramienta usar.** El enunciado pide «consideraciones energéticas»: ecuación de trabajo y energía entre la base y el punto donde se para.

**Paso 1. Seno y coseno del plano**

**sen α = 9/15 = 0,6  cos α = √(15² − 9²)/15 = 12/15 = 0,8**

> **¿Por qué?** Los 15 m son la hipotenusa (la longitud del plano) y los 9 m el cateto opuesto (la altura). Las medidas del dibujo sirven para el ángulo, no son la distancia que recorre.

**a) Distancia hasta pararse**

**½·m·v₀² − μ·m·g·cos α·d = m·g·d·sen α ⟹ d = v₀² / [2·g·(sen α + μ·cos α)] = 25 / [19,6 · (0,6 + 0,32)] = 1,39 m**

> **¿Por qué?** Igual que en 6.2: la energía cinética inicial se reparte entre energía potencial y calor. Como 1,39 m < 15 m, se para antes de llegar arriba.

**b) Trabajo del rozamiento**

**W roz = −μ·m·g·cos α·d = −0,4 · 2 · 9,8 · 0,8 · 1,386 = −8,70 J**

> **¿Por qué negativo?** El rozamiento va hacia abajo del plano y el bloque sube: φ = 180°. «Trabajo disipado» es la energía que se pierde como calor: 8,70 J.

**Comprobación.** Energía inicial: ½ · 2 · 25 = 25 J. Energía potencial final: 2 · 9,8 · (1,386 · 0,6) = 16,30 J. 16,30 + 8,70 = 25 J. Cuadra. Como tg α = 0,75 > 0,4, después vuelve a bajar.
--- simulacion
El plano mide 15 m, pero el cuerpo solo sube 1,39 m: la simulación dibuja ese tramo.

=== 6.4 | Ejercicios 9 | Rampa de 5 m de alto y 37°, μ = 0,4
figura: e_e9
pide: Rampa de 5 m y 37°, μ = 0,4
indice: v = 6,78 m/s
widget: plano {"escenario": "baja", "m": 3, "alpha": 37, "h": 5, "mu": 0.4, "v0": 0, "controles": ["m", "alpha", "h", "mu"]}
--- enunciado
Desde lo alto de la rampa de la figura se deja caer un cuerpo de 3 kg. El coeficiente de rozamiento entre el plano y el cuerpo es 0,4. ¿Con qué velocidad llega al suelo?
--- resultado
v = 6,78 m/s al llegar al suelo (6,76 m/s si se usa sen 37° ≈ 0,6 y cos 37° ≈ 0,8).
--- solucion
Datos: m = 3 kg · h = 5 m · α = 37° · μ = 0,4 · parte del reposo arriba · g = 9,8 m/s². El esquema es el del diagrama de 6.1 (bloque que baja).

**Qué herramienta usar.** Igual que en 6.1: ecuación de trabajo y energía entre arriba y abajo. Aquí dan la altura y el ángulo, y la longitud hay que calcularla.

**Paso 1. Longitud de la rampa**

**d = h / sen α = 5 / sen 37° = 5 / 0,602 = 8,31 m**

> **¿Por qué?** El rozamiento actúa a lo largo de toda la rampa, así que necesitamos d, no h.

**Paso 2. Ecuación de trabajo y energía** (h = 0 en el suelo)

**m·g·h − μ·m·g·cos α·d = ½·m·v² ⟹ v = √[2·g·(h − μ·cos α·d)]**

> **¿Por qué?** La energía potencial de arriba se reparte entre energía cinética abajo y calor. La masa se simplifica, por eso los 3 kg no influyen.

**Paso 3. Sustituir**

**v = √[2 · 9,8 · (5 − 0,4 · 0,799 · 8,31)] = √[19,6 · (5 − 2,654)] = √45,98 = 6,78 m/s**

> **Un atajo para comprobar:** como d·cos α = h / tg α, se puede escribir v = √[2·g·h·(1 − μ / tg α)] = √[98 · (1 − 0,4 / 0,754)] = 6,78 m/s.

**Comprobación por dinámica.** a = g·(sen α − μ·cos α) = 9,8 · (0,602 − 0,319) = 2,77 m/s² y v = √(2 · 2,77 · 8,31) = 6,78 m/s. Coincide. Sin rozamiento llegaría a √(2·9,8·5) = 9,90 m/s; el rozamiento se lleva el 53 % de la energía (78 J de 147 J).
--- simulacion
Cambia la masa en la simulación: la velocidad al llegar al suelo no cambia (la masa se simplifica).

=== 6.5 | Cuestiones 6 | Bloque de 10 kg lanzado a 12 m/s por una rampa de 40°, y vuelta
pide: 12 m/s por 40°, μ = 0,2, y vuelta
indice: d = 9,23 m; v = 9,41 m/s
widget: plano {"escenario": "sube", "m": 10, "alpha": 40, "mu": 0.2, "v0": 12, "controles": ["m", "alpha", "mu", "v0"]}
--- enunciado
Desde la base de una rampa que forma 40° con la horizontal se lanza un bloque de 10 kg a lo largo de esta con velocidad de 12 m/s. El coeficiente de rozamiento entre el plano y el bloque es μ = 0,2. Calcula qué distancia recorre el bloque sobre el plano. ¿Con qué velocidad regresa a la base del plano? Resuelve el ejercicio por consideraciones energéticas.
--- resultado
sube d = 9,23 m sobre el plano y vuelve a la base a v = 9,41 m/s.
--- solucion
Datos: m = 10 kg · v₀ = 12 m/s · α = 40° · μ = 0,2 · g = 9,8 m/s².

[[diagrama:w65_dos|Cuestiones 6 · subida y bajada]]

El rozamiento siempre va contra la velocidad: hacia abajo al subir y hacia arriba al bajar.

**Qué herramienta usar.** Ecuación de trabajo y energía en dos tramos: subida (de la base al punto más alto) y bajada (del punto más alto a la base). Es el mismo tipo que el ejercicio 6.12 (Selectividad 4).

**a) Subida: distancia hasta pararse**

**½·m·v₀² − μ·m·g·cos α·d = m·g·d·sen α ⟹ d = v₀² / [2·g·(sen α + μ·cos α)]**

**d = 144 / [19,6 · (0,643 + 0,2 · 0,766)] = 144 / (19,6 · 0,796) = 9,23 m** (altura h = d·sen 40° = 5,93 m)

> **¿Por qué?** Al subir, el peso y el rozamiento frenan a la vez. En el punto más alto Ec = 0.

**¿Vuelve a bajar?** tg 40° = 0,839 > μ = 0,2: sí, el peso a lo largo del plano vence al rozamiento.

**b) Bajada: velocidad al volver a la base**

**m·g·d·sen α − μ·m·g·cos α·d = ½·m·v² ⟹ v = √[2·g·d·(sen α − μ·cos α)]**

**v = √[19,6 · 9,23 · (0,643 − 0,153)] = √88,6 = 9,41 m/s**

> **¿Por qué ahora es una resta?** Al bajar, el rozamiento cambia de sentido (siempre va contra el movimiento) y apunta hacia arriba del plano, mientras el peso ayuda. Su trabajo vuelve a ser negativo: también en la bajada se pierde energía.

**Comprobación por el viaje completo** (de la base a la base, sin cambio de altura): solo cambia la Ec, por el rozamiento de ida y vuelta (2·d):

**v² = v₀² − 4·μ·g·cos α·d = 144 − 4 · 0,2 · 9,8 · 0,766 · 9,23 = 88,6 ⟹ v = 9,41 m/s**. Coincide, y vuelve más despacio de lo que salió (9,41 < 12), como debe ser.
--- simulacion
La simulación hace el viaje completo: sube 9,23 m y vuelve a la base a 9,41 m/s.

=== 6.6 | Cuestiones 7 | Tramo horizontal de 2 m y rampa de 40°
pide: 2 m horizontales y rampa de 40°
indice: v = 6,10 m/s; d = 2,18 m
widget: plano {"escenario": "sube", "m": 1, "alpha": 40, "mu": 0.3, "v0": 7, "L0": 2, "controles": ["alpha", "mu", "v0", "L0"]}
--- enunciado
Un bloque comienza a desplazarse con una velocidad de 7 m/s sobre una superficie horizontal rugosa; el coeficiente de rozamiento entre el cuerpo y la superficie es μ = 0,3. Después de recorrer 2 m encuentra una rampa inclinada 40° respecto a la horizontal y con el mismo coeficiente de rozamiento anterior. Halla: a) la velocidad del cuerpo cuando alcanza la base del plano; b) la distancia que recorrerá sobre la rampa antes de quedar momentáneamente en reposo.
--- resultado
a) v = 6,10 m/s en la base de la rampa · b) d = 2,18 m sobre la rampa.
--- solucion
Datos: v₀ = 7 m/s · μ = 0,3 en todo el recorrido · 2 m horizontales · rampa de 40° · g = 9,8 m/s² · m no se da.

[[diagrama:w66_tramos|Cuestiones 7 · tramo horizontal y rampa]]

En el suelo N = m·g; en la rampa N = m·g·cos 40°: por eso se calcula por tramos.

**Qué herramienta usar.** Ecuación de trabajo y energía por tramos, porque el rozamiento es distinto en cada uno: en horizontal N = m·g y en la rampa N = m·g·cos α.

**a) Tramo horizontal (de A a B)**

**½·m·v₀² − μ·m·g·L = ½·m·v_B² ⟹ v_B = √(v₀² − 2·μ·g·L) = √(49 − 2 · 0,3 · 9,8 · 2) = √37,24 = 6,10 m/s**

> **¿Por qué no hay Ep?** El tramo es horizontal: la altura no cambia. Solo el rozamiento (con N = m·g) quita energía cinética.

**b) Rampa (de B al punto donde se para)**

**½·m·v_B² − μ·m·g·cos α·d = m·g·d·sen α ⟹ d = v_B² / [2·g·(sen α + μ·cos α)]**

**d = 37,24 / [19,6 · (0,643 + 0,3 · 0,766)] = 37,24 / 17,10 = 2,18 m**

> **¿Por qué se usa v_B² y no v_B?** Es la energía cinética al empezar la rampa: lo que sale del apartado a) es justo v_B² = 37,24 m²/s², y conviene usarlo sin redondear.

**Comprobación con una sola ecuación** de A al punto final (dos rozamientos distintos):

**½·v₀² = μ·g·L + μ·g·cos α·d + g·d·sen α ⟹ 24,5 = 5,88 + 4,90 + 13,72**. Suma 24,5. Cuadra (dividido por m, que se simplifica).

**Sentido físico.** Como tg 40° = 0,839 > 0,3, el bloque no se queda en la rampa: después de pararse un instante vuelve a bajar.
--- simulacion
El enunciado no da la masa (no hace falta); la simulación usa 1 kg. Primero frena en el tramo horizontal y después en la rampa.

=== 6.7 | Ejercicios 2 | Subir 120 kg a velocidad constante por un plano de 30°
pide: Subir 120 kg a velocidad constante
indice: F = 894 N; W = 8,94·10³ J
widget: plano {"escenario": "empuje", "m": 120, "alpha": 30, "mu": 0.3, "d": 10, "v": 1, "sentido": "sube", "controles": ["m", "alpha", "mu", "d"]}
--- enunciado
Por un plano inclinado 30° se sube un cuerpo de masa m = 120 kg, deslizándolo con movimiento uniforme mediante una fuerza F paralela al plano. El coeficiente de rozamiento entre dicho cuerpo y el plano es 0,3. Calcula el trabajo realizado por la fuerza F cuando el cuerpo recorre 10 m sobre el plano.
--- resultado
F = 894 N · W F = 8,94·10³ J (8 935 J) en 10 m.
--- solucion
Datos: m = 120 kg · α = 30° · μ = 0,3 · F paralela al plano · movimiento uniforme · d = 10 m · g = 9,8 m/s².

[[diagrama:w67_constante|Ejercicios 2 · fuerzas a velocidad constante]]

F apunta hacia arriba del plano y equilibra a Px más el rozamiento; en la dirección perpendicular, N equilibra a Py.

**Qué herramienta usar.** «Movimiento uniforme» = velocidad constante = aceleración cero. Primero dinámica (ΣF = 0 a lo largo del plano) para hallar F; después W = F·d·cos 0°.

**Paso 1. Fuerzas a lo largo del plano**

**Px = m·g·sen 30° = 120 · 9,8 · 0,5 = 588 N  Fr = μ·m·g·cos 30° = 0,3 · 120 · 9,8 · 0,866 = 305,5 N**

> **¿Por qué las dos hacia abajo?** El cuerpo sube: la componente del peso tira hacia abajo del plano y el rozamiento, que siempre va contra el movimiento, también.

**Paso 2. Velocidad constante**

**ΣF = 0: F − Px − Fr = 0 ⟹ F = 588 + 305,5 = 893,5 N**

**Paso 3. Trabajo de F**

**W F = F·d·cos 0° = 893,5 · 10 = 8 935 J**

> **¿Por qué cos 0°?** F es paralela al plano y tira en el sentido en que se mueve el cuerpo.

**Comprobación por energía.** Trabajo del peso: −m·g·h = −120 · 9,8 · 5 = −5 880 J (h = 10·sen 30° = 5 m). Trabajo del rozamiento: −305,5 · 10 = −3 055 J. La normal no trabaja. Suma: 8 935 − 5 880 − 3 055 = 0 J = ΔEc, como debe ser a velocidad constante.

**Lectura energética.** De los 8 935 J que pone quien empuja, 5 880 J se guardan como energía potencial y 3 055 J se pierden como calor.
--- simulacion
En la simulación el cuerpo sube a 1 m/s (el enunciado no da la velocidad, que no influye). El trabajo de F se reparte entre la energía potencial y el calor.

=== 6.8 | Ejercicios 10 | Misma distancia en el plano y en horizontal
pide: Misma distancia en el plano y en horizontal
indice: μ = 0,268
widget: plano {"escenario": "baja", "m": 1, "alpha": 30, "h": 1, "mu": 0.2679, "suelo": true, "v0": 0, "controles": ["alpha", "mu", "h"]}
--- enunciado
Un cuerpo desliza primero a lo largo de un plano inclinado 30° y luego continúa moviéndose sobre un plano horizontal. Determina el coeficiente dinámico de rozamiento, si se sabe que el cuerpo recorre en el plano horizontal la misma distancia que en el plano inclinado.
--- resultado
μ = 0,268.
--- solucion
Datos: plano de 30° seguido de un suelo horizontal · el mismo μ en los dos tramos · recorre la misma distancia d en el plano y en el suelo · se supone que sale del reposo arriba y se para al final. No se dan ni la masa ni d.

[[diagrama:w68_mismo|Ejercicios 10 · la misma d en el plano y en el suelo]]

En el plano la normal es m·g·cos 30°; en el suelo, m·g. Por eso el rozamiento no vale lo mismo en los dos tramos.

**Qué herramienta usar.** Ecuación de trabajo y energía entre el punto de salida (reposo) y el de llegada (reposo). Hay dos rozamientos distintos: N = m·g·cos α en el plano y N = m·g en el suelo.

**Paso 1. Ecuación** (h = 0 en el suelo)

**0 + m·g·d·sen α − μ·m·g·cos α·d − μ·m·g·d = 0 + 0**

> **¿Por qué cada término?** Al principio solo hay Ep (altura h = d·sen α). Al final está parado en el suelo: Ec = 0 y Ep = 0. Por el camino, dos trabajos de rozamiento negativos: uno en el plano y otro en el suelo, los dos a lo largo de la misma distancia d.

**Paso 2. Simplificar** (se van m, g y d, por eso no los dan)

**sen α = μ·(cos α + 1) ⟹ μ = sen α / (1 + cos α) = 0,5 / (1 + 0,866) = 0,268**

> **¿Por qué se puede dividir por m·g·d?** Todos los términos lo llevan y no es cero. Así queda una ecuación solo con μ y el ángulo.

**Comprobación.** Para que el cuerpo deslice solo por el plano hace falta tg 30° = 0,577 > μ = 0,268: sí desliza. Con d = 1 m y m = 1 kg: Ep = 9,8 · 0,5 = 4,90 J; rozamiento en el plano 0,268 · 9,8 · 0,866 = 2,27 J; en el suelo 0,268 · 9,8 = 2,63 J. 2,27 + 2,63 = 4,90 J. Cuadra.

**Curiosidad.** sen α / (1 + cos α) es igual a tg(α/2): μ = tg 15° = 0,268.
--- simulacion
Con μ = 0,268 la simulación recorre 2 m en la rampa y otros 2 m en el suelo. Cambia μ y las dos distancias dejan de coincidir.

=== 6.9 | Selectividad 1 | Bloque de 100 kg que baja frenado a velocidad constante
pide: Bajar 100 kg frenado a v constante por 30°, μ = 0,2
indice: F = 320 N; ΔEp = −9 800 J en 20 m
widget: plano {"escenario": "empuje", "m": 100, "alpha": 30, "mu": 0.2, "d": 20, "v": 1, "sentido": "baja", "controles": ["m", "alpha", "mu", "d"]}
--- enunciado
Por un plano inclinado 30° respecto a la horizontal desciende un bloque de 100 kg y se aplica sobre el bloque una fuerza F paralela al plano que lo frena, de modo que desciende a velocidad constante. El coeficiente de rozamiento entre el plano y el bloque es 0,2. a) Dibuje en un esquema las fuerzas que actúan sobre el bloque y calcule el valor de la fuerza F. b) Explique las transformaciones energéticas que tienen lugar en el deslizamiento del bloque y calcule la variación de su energía potencial en un desplazamiento de 20 m. (g = 9,8 m/s²)
--- resultado
F ≈ 320 N, paralela al plano y hacia arriba. En 20 m de bajada la energía potencial varía ΔEp = −9 800 J.
--- solucion
Datos: m = 100 kg · α = 30° · μ = 0,2 · v constante (bajando) · g = 9,8 m/s² · d = 20 m (apartado b).

**a) Fuerzas y valor de F**

[[diagrama:s_sel1|Selectividad 1 · fuerzas sobre el bloque de 100 kg]]

Fr y F apuntan las dos hacia arriba del plano: el rozamiento porque el bloque baja, y F porque lo frena.

**Qué herramienta usar.** Este apartado pide una fuerza cuando la velocidad es constante. Es un problema de **dinámica** (leyes de Newton), no de energía: velocidad constante significa aceleración cero, y eso se traduce en una suma de fuerzas igual a cero.

Ejes: x paralelo al plano, positivo hacia abajo (sentido del movimiento); y perpendicular al plano, positivo hacia fuera.

| Fuerza | Dirección y sentido | Módulo |
| --- | --- | --- |
| Peso P | Vertical, hacia abajo | m·g = 100·9,8 = 980 N |
| Px | Paralela al plano, hacia abajo (+x) | m·g·sen 30° = 980·0,5 = 490 N |
| Py | Perpendicular, hacia el plano (−y) | m·g·cos 30° = 980·0,866 = 848,7 N |
| Normal N | Perpendicular, hacia fuera (+y) | 848,7 N |
| Rozamiento Fr | Paralela, hacia arriba (−x): se opone a la bajada | μ·N = 0,2·848,7 = 169,7 N |
| F | Paralela, hacia arriba (−x): frena el bloque | Incógnita |

**ΣFy = N − Py = 0 ⟹ N = Py = 848,7 N**

> **¿Por qué?** No hay movimiento perpendicular al plano, así que en el eje y la resultante es cero. De aquí sale N, que necesitamos para el rozamiento: Fr = μ·N = 0,2·848,7 = 169,7 N.

**ΣFx = Px − Fr − F = 0**

> **¿Por qué?** Velocidad constante, luego aceleración nula, luego resultante nula (primera ley de Newton). Los signos salen de los ejes: con x positivo hacia abajo, Px va a favor (+) y Fr y F van en contra (−).

**F = m · g · sen α − μ · m · g · cos α = m · g · (sen α − μ · cos α)**

**F = 100 · 9,8 · (0,5 − 0,2 · 0,866) = 980 · 0,3268 ≈ 320 N**

> **¿Por qué?** Despejamos F con letras y sustituimos al final. Así se ve el significado: F = Px − Fr, es decir, F frena la parte de Px que el rozamiento no consigue frenar.

F sale **positiva**, lo que confirma el sentido supuesto: hacia arriba del plano. Si hubiera salido negativa, la fuerza tendría que empujar hacia abajo.

**b) Transformaciones energéticas y ΔEp en 20 m**

- **Energía cinética:** constante, porque v es constante. ΔEc = 0.
- **Energía potencial:** disminuye, porque el bloque baja.
- **Destino de esa energía:** la recogen las dos fuerzas no conservativas. El rozamiento la convierte en energía térmica; la fuerza F la absorbe el agente que frena (una persona, un cable, un torno).
- La energía mecánica disminuye, pero la energía total se conserva: lo que pierde el bloque aparece como calor y como energía recibida por el agente.

**h = d · sen 30° = 20 · 0,5 = 10 m**

> **¿Por qué?** La energía potencial depende de la altura vertical, no de los 20 m recorridos sobre el plano. Pasamos de d a h con el seno.

**ΔEp = m · g · (hB − hA) = 100 · 9,8 · (0 − 10) = −9 800 J**

> **¿Por qué?** Una variación es siempre valor final menos valor inicial. Con h = 0 en el punto final B, la altura inicial es hA = 10 m. El signo menos indica que la energía potencial **disminuye** 9 800 J.

El trabajo del peso es el opuesto, W P = −ΔEp = +9 800 J: positivo, porque el peso ayuda a bajar.

**Comprobación con la ecuación de trabajo:**

**W roz = −Fr · d = −169,7 · 20 = −3 395 J**

**W F = −F · d = −320,3 · 20 = −6 405 J**

**W nc = W roz + W F = −9 800 J = ΔEc + ΔEp = 0 + (−9 800 J)** ✓

> **¿Por qué?** Es una comprobación independiente: si las fuerzas del apartado a) están bien, la suma de los trabajos no conservativos tiene que ser igual a la variación de energía mecánica. Coincide.

Reparto: el 35 % de la energía potencial perdida se disipa como calor y el 65 % lo recoge quien aplica F.
--- simulacion
En la simulación el bloque baja 20 m a 1 m/s (la velocidad no influye). La barra muestra cómo la energía potencial se reparte entre el calor y la que se lleva quien frena.

=== 6.10 | Selectividad 2 | Bajada desde el reposo y frenada en el plano horizontal
pide: Baja 2 m por 30° y llega a 4 m/s; se para en 4 m en horizontal
indice: μ = 0,106; Fr = 2·m N (μ' = 0,204)
widget: plano {"escenario": "baja", "m": 1, "alpha": 30, "h": 1, "mu": 0.106, "mu1": 0.204, "suelo": true, "v0": 0, "controles": ["m", "mu", "mu1"]}
--- enunciado
Se deja caer un cuerpo, partiendo del reposo, por un plano inclinado que forma un ángulo de 30° con la horizontal. Después de recorrer 2 m llega al final del plano inclinado con una velocidad de 4 m/s y continúa deslizándose por un plano horizontal hasta detenerse. La distancia recorrida en el plano horizontal es 4 m. a) Dibuje en un esquema las fuerzas que actúan sobre el bloque cuando se encuentra en el plano inclinado y determine el valor del coeficiente de rozamiento entre el cuerpo y el plano inclinado. b) Explique el balance energético durante el movimiento en el plano horizontal y calcule la fuerza de rozamiento entre el cuerpo y el plano. (g = 9,8 m/s²)
--- resultado
μ ≈ 0,106 en el plano inclinado. En el horizontal, Fr = 2·m (en N, con m en kg): el enunciado no da la masa, así que la fuerza queda en función de m; el coeficiente allí es μ' ≈ 0,204.
--- solucion
Datos: vA = 0 · α = 30° · AB = 2 m sobre el plano · vB = 4 m/s · BC = 4 m en horizontal · vC = 0 · g = 9,8 m/s². Masa: no se da; la llamamos m.

[[diagrama:s_sel2|Selectividad 2 · recorrido A → B → C y fuerzas en cada tramo]]

En la rampa el rozamiento apunta hacia arriba del plano y en el horizontal hacia atrás: en los dos tramos se opone a v.

**a) Fuerzas en el plano inclinado y coeficiente de rozamiento**

Mientras baja actúan el peso P (vertical, hacia abajo), la normal N = m·g·cos 30° (perpendicular al plano, hacia fuera) y el rozamiento Fr = μ·m·g·cos 30°, paralelo al plano y **hacia arriba**, porque el cuerpo baja.

**Qué herramienta usar.** Conocemos la velocidad en dos puntos (A y B) y la distancia entre ellos, pero no el tiempo. Ese es justo el caso de la ecuación de trabajo: relaciona velocidades y posiciones sin pasar por el tiempo.

**hA = dAB · sen 30° = 2 · 0,5 = 1 m**

> **¿Por qué?** Necesitamos la altura de A para su energía potencial. Tomamos h = 0 en el plano horizontal (el punto más bajo), así que Ep,B = 0.

Ecuación de trabajo de A a B (el rozamiento es la única fuerza no conservativa que trabaja):

**0 + m·g·hA − μ·m·g·cos α·dAB = ½·m·vB² + 0**

> **¿Por qué cada término?** Ec,A = 0 porque parte del reposo; Ep,B = 0 porque B está en el nivel de referencia; el rozamiento va con signo menos porque su trabajo es negativo (φ = 180°). La única incógnita es μ.

**μ = (g·hA − ½·vB²) / (g·cos α·dAB) = 1,8 / 16,97 ≈ 0,106**

> **¿Por qué?** La masa aparece en todos los términos: dividimos toda la ecuación entre m y desaparece. Por eso no hace falta conocerla en este apartado. Después se despeja μ.

Lectura física, por cada kilogramo: había 9,8 J de energía potencial; llegan 8 J como energía cinética y 1,8 J (el 18 %) se disipan como calor.

Coherencia: μ = 0,106 < tg 30° = 0,577, así que el cuerpo puede empezar a deslizar desde el reposo, como dice el enunciado.

**b) Balance energético en el plano horizontal y fuerza de rozamiento**

- La altura no cambia: ΔEp = 0.
- El peso y la normal son perpendiculares al desplazamiento: no trabajan.
- Solo trabaja el rozamiento, en contra del movimiento: toda la energía cinética que traía en B se transforma en energía térmica.

**½ · m · vB² − Fr · dBC = 0 ⟹ Fr = m · vB² / (2 · dBC) = m · 4² / (2 · 4) = 2 · m**

> **¿Por qué?** Es la ecuación de trabajo de B a C con ΔEp = 0, que se reduce al teorema de la energía cinética: toda la Ec que traía en B se la quita el rozamiento en 4 m.

Como el enunciado no da la masa, la fuerza solo puede darse en función de m: 2 N por cada kilogramo (por ejemplo, 2 N si m = 1 kg). Sí salen como números la deceleración, a = Fr/m = 2 m/s², y el coeficiente en el plano horizontal:

**μ' = Fr / N = Fr / (m · g) = 2 · m / (9,8 · m) ≈ 0,204**

> **¿Por qué?** En el plano horizontal no hay inclinación, así que N = m·g (y no m·g·cos α). La masa se simplifica y el coeficiente sale como número.

Observación: μ' ≈ 0,20 es casi el doble que en la rampa (0,106), así que las dos superficies son distintas. Con μ = 0,106 en el horizontal, el cuerpo habría recorrido v²/(2·μ·g) ≈ 7,7 m, no 4 m.
--- simulacion
La simulación usa m = 1 kg (el enunciado no da la masa) y los dos coeficientes calculados: llega a la base a 4 m/s y se para a 4 m.

=== 6.11 | Selectividad 3 | Bloque de 10 kg lanzado hacia arriba a 5 m/s
pide: 10 kg a 5 m/s por 30°, μ = 0,1: altura y vuelta
indice: h = 1,09 m; v = 4,20 m/s
widget: plano {"escenario": "sube", "m": 10, "alpha": 30, "mu": 0.1, "v0": 5, "controles": ["m", "alpha", "mu", "v0"]}
--- enunciado
Por un plano inclinado que forma un ángulo de 30° con la horizontal se lanza hacia arriba un bloque de 10 kg con una velocidad inicial de 5 m/s. El coeficiente de rozamiento entre el plano y el bloque es 0,1. A partir del balance de energías, determine: i) la altura máxima que alcanzará en su ascenso; ii) la velocidad al regresar al punto de partida.
--- resultado
altura máxima h ≈ 1,09 m (recorre d ≈ 2,17 m sobre el plano) y regresa al punto de partida con v ≈ 4,20 m/s.
--- solucion
Datos: m = 10 kg · α = 30° · vA = 5 m/s hacia arriba · μ = 0,1 · g = 9,8 m/s² (este enunciado no la da; usamos el mismo valor que en los demás).

[[diagrama:s_sel3|Selectividad 3 · fuerzas al subir y al bajar]]

P y N no cambian entre los dos tramos; el rozamiento invierte su sentido porque la velocidad lo invierte.

**N = m · g · cos α = 10 · 9,8 · 0,866 = 84,87 N**

**Fr = μ · N = 0,1 · 84,87 = 8,487 N**

> **¿Por qué?** El rozamiento depende de N, y en el plano inclinado N = m·g·cos α. El módulo de Fr es el mismo al subir y al bajar; solo cambia su sentido. Su **trabajo es negativo en los dos tramos**.

**i) Altura máxima**

**Qué herramienta usar.** Nos piden una altura y conocemos velocidades: ecuación de trabajo entre la salida A y el punto más alto B. La clave del problema es que **en B la velocidad es cero**.

Nivel h = 0 en A. Llamamos d a la distancia recorrida sobre el plano, de modo que h = d·sen α:

**½·m·vA² + 0 − μ·m·g·cos α·d = 0 + m·g·d·sen α**

> **¿Por qué cada término?** Ec,A sale de los 5 m/s; Ep,A = 0 porque A es el nivel de referencia; Ec,B = 0 porque en el punto más alto se para; Ep,B = m·g·h con h = d·sen α. El rozamiento lleva signo menos (φ = 180°). Escribimos h en función de d para que solo quede una incógnita.

**d = vA² / (2·g·(sen α + μ·cos α))**

> **¿Por qué?** Se divide entre m (se simplifica) y se sacan factor común los dos términos con d. En el paréntesis sen α y μ·cos α se **suman**: al subir, el peso y el rozamiento frenan los dos.

**d = 25/11,50 ≈ 2,17 m; h = d·sen α ≈ 1,09 m**

Balance en julios: Ec,A = ½·10·5² = 125 J se reparte en Ep,B = 10·9,8·1,087 = 106,5 J y calor disipado = 8,487·2,174 = 18,5 J. Suma: 106,5 + 18,5 = 125 J ✓

**¿Vuelve a bajar?**

**Px > Fr ⟺ m · g · sen α > μ · m · g · cos α ⟺ tg α > μ**

> **¿Por qué?** En B el cuerpo está parado. Solo empieza a bajar si la componente del peso que tira hacia abajo (Px) supera al rozamiento máximo. Como tg 30° = 0,577 > 0,1, sí baja (suponiendo, como el enunciado, que el coeficiente estático es parecido al dinámico).

**ii) Velocidad al regresar al punto de partida**

**Qué tramo elegir.** Podemos plantear el tramo B → A o el viaje completo A → B → A. Usamos B → A porque en B la energía cinética es cero y la ecuación queda más corta; el viaje completo lo usamos después para comprobar.

**0 + m·g·d·sen α − μ·m·g·cos α·d = ½·m·v² + 0**

> **¿Por qué cada término?** Ec,B = 0 porque sale del reposo en B; Ep,B = m·g·d·sen α es la energía potencial ganada al subir; el rozamiento vuelve a restar; al llegar a A, Ep,A = 0.

**v = √(2·g·d·(sen α − μ·cos α))**

> **¿Por qué?** Se simplifica m y se despeja v. Ahora sen α y μ·cos α se **restan**: el peso ayuda a bajar y el rozamiento frena. La raíz da el módulo de la velocidad; el sentido lo da la física: hacia abajo del plano.

**v = √[2 · 9,8 · 2,174 · (0,5 − 0,0866)] = √17,62 ≈ 4,20 m/s**

**Comprobación por el viaje completo** A → B → A:

**½ · m · v² = ½ · m · vA² − 2 · μ · m · g · cos α · d ⟹ v² = 25 − 7,38 = 17,62 m²/s²** ✓

> **¿Por qué?** Entre la salida y la vuelta la energía potencial es la misma (h = 0 en los dos momentos). Toda la energía cinética que falta se ha ido en calor: el del tramo de subida más el de bajada, 2·Fr·d.

Sentido físico: 4,20 m/s < 5 m/s. Vuelve con el 70 % de la energía cinética inicial (88,1 J de 125 J).
--- simulacion
Compara en la simulación la subida y la bajada: la flecha del rozamiento cambia de sentido, pero en los dos tramos la barra roja (calor) crece.

=== 6.12 | Selectividad 4 | Cuerpo de 0,5 kg lanzado hacia arriba a 5 m/s
pide: 0,5 kg a 5 m/s por 30°, μ = 0,2: altura y vuelta
indice: h = 0,95 m; v = 3,48 m/s
widget: plano {"escenario": "sube", "m": 0.5, "alpha": 30, "mu": 0.2, "v0": 5, "controles": ["m", "alpha", "mu", "v0"]}
--- enunciado
Un cuerpo de 0,5 kg se lanza hacia arriba por un plano inclinado que forma 30° con la horizontal, con una velocidad inicial de 5 m/s. El coeficiente de rozamiento es 0,2. i) Dibuje en un esquema las fuerzas que actúan sobre el cuerpo cuando sube y cuando baja por el plano. Determine, mediante consideraciones energéticas: ii) la altura máxima que alcanza el cuerpo; iii) la velocidad con la que vuelve al punto de partida. (g = 9,8 m/s²)
--- resultado
altura máxima h ≈ 0,95 m (d ≈ 1,89 m sobre el plano) y regresa al punto de partida con v ≈ 3,48 m/s.
--- solucion
Datos: m = 0,5 kg · α = 30° · vA = 5 m/s hacia arriba · μ = 0,2 · g = 9,8 m/s².

**i) Fuerzas cuando sube y cuando baja**

[[diagrama:s_sel4|Selectividad 4 · fuerzas al subir y al bajar]]

| Fuerza | Al subir | Al bajar | Módulo |
| --- | --- | --- | --- |
| Peso P | Vertical, hacia abajo | Igual | 0,5·9,8 = 4,90 N |
| Normal N | Perpendicular al plano, hacia fuera | Igual | m·g·cos 30° = 4,24 N |
| Rozamiento Fr | Paralelo, **hacia abajo** del plano | Paralelo, **hacia arriba** del plano | μ·N = 0,849 N |

**N = m · g · cos α = 0,5 · 9,8 · 0,866 = 4,24 N**

**Fr = μ · N = 0,2 · 4,24 = 0,849 N**

> **¿Por qué?** Igual que en Selectividad 3: N = m·g·cos α porque no hay movimiento perpendicular al plano, y Fr = μ·N por la ley del rozamiento dinámico.

Solo cambia el rozamiento, porque siempre se opone a la velocidad. La componente Px = m·g·sen 30° = 2,45 N apunta siempre hacia abajo del plano. Al subir, Px y Fr frenan juntas; al bajar, Px acelera y Fr frena.

**ii) Altura máxima**

**Qué herramienta usar.** El mismo planteamiento que en Selectividad 3: ecuación de trabajo de A (salida, h = 0) a B (punto más alto, v = 0), con h = d·sen α. Las fórmulas con letras son idénticas; solo cambian los números.

**½·m·vA² + 0 − μ·m·g·cos α·d = 0 + m·g·d·sen α**

**d = vA² / (2·g·(sen α + μ·cos α))**

> **¿Por qué?** La masa se simplifica y, al subir, el peso y el rozamiento frenan los dos: por eso sen α y μ·cos α se suman.

**d = 25/13,19 ≈ 1,89 m; h = d·sen α ≈ 0,95 m**

Balance en julios: Ec,A = ½·0,5·5² = 6,25 J se reparte en Ep,B = 0,5·9,8·0,947 = 4,64 J y calor = 0,849·1,895 = 1,61 J. Suma: 4,64 + 1,61 = 6,25 J ✓

**Comprobación por dinámica**, un método independiente:

**a = −g · (sen α + μ · cos α) = −9,8 · 0,673 = −6,60 m/s²**

**0 = vA² + 2 · a · d ⟹ d = 25 / (2 · 6,60) ≈ 1,89 m**

> **¿Por qué?** La segunda ley de Newton da la aceleración de subida: negativa, porque Px y Fr frenan. La ecuación del MRUA sin tiempo, v² = vA² + 2·a·d, con v = 0 en B, da la misma distancia. Dos métodos distintos, mismo resultado.

**¿Vuelve a bajar?**

**Px > Fr ⟺ m · g · sen α > μ · m · g · cos α ⟺ tg α > μ**

> **¿Por qué?** En B el cuerpo está parado; baja solo si Px supera al rozamiento máximo. tg 30° = 0,577 > 0,2, así que sí baja.

**iii) Velocidad al volver al punto de partida**

**Qué tramo elegir.** B → A: parte del reposo en B y llega a h = 0.

**0 + m·g·d·sen α − μ·m·g·cos α·d = ½·m·v² + 0**

**v = √(2·g·d·(sen α − μ·cos α))**

> **¿Por qué?** Igual que en Selectividad 3: ahora el paréntesis resta, porque el peso ayuda a bajar y el rozamiento frena. La raíz da el módulo; el sentido es hacia abajo del plano.

**v = √[2 · 9,8 · 1,895 · (0,5 − 0,1732)] = √12,14 ≈ 3,48 m/s**

**Comprobación por el viaje completo:**

**v² = vA² − 4 · μ · g · cos α · d = 25 − 12,86 = 12,14 m²/s²** ✓

> **¿Por qué?** Es el viaje A → B → A: la energía potencial inicial y final es la misma, y el calor de los dos tramos es 2·Fr·d. Al dividir la ecuación entre ½·m, ese término se convierte en 4·μ·g·cos α·d.

Vuelve con el 49 % de la energía cinética inicial (3,03 J de 6,25 J).

**Comparación con Selectividad 3:** la masa no influye en h ni en v, porque se simplifica. Lo que cambia es μ: al duplicarlo (0,1 → 0,2), la altura baja de 1,09 m a 0,95 m y la velocidad de vuelta de 4,20 m/s a 3,48 m/s.
--- simulacion
Este ejercicio tiene además una [animación paso a paso en 10 escenas](../../plano-inclinado-ejercicio-4/), con las fuerzas y las barras de energía. Aquí puedes cambiar los datos.
