---
slug: energia-cinetica
titulo: Energía cinética: teorema de las fuerzas vivas
nombre: Energía cinética: teorema de las fuerzas vivas
corto: Energía cinética
eyebrow: Categoría 3
desc: Frenadas, balas y fuerzas medias: W total = ΔEc.
---
## Idea clave: el trabajo total cambia la energía cinética

**Teorema de las fuerzas vivas: W total = ΔEc = ½·m·v² − ½·m·v₀²**

> **¿Por qué?** Sale de juntar Newton con el MRUA. Si la fuerza resultante F es constante y actúa a lo largo de Δs: W = F·Δs = m·a·Δs. Y en un MRUA, v² − v₀² = 2·a·Δs, es decir, a·Δs = (v² − v₀²)/2. Sustituyendo: W = ½·m·v² − ½·m·v₀². Es la deducción de la página 5 de los apuntes.

Cómo leer el signo:

- **W total > 0**: el cuerpo acelera (gana energía cinética).
- **W total < 0**: el cuerpo frena (pierde energía cinética).
- **W total = 0**: velocidad constante (como la carga de la polea, ejercicio 1.4).

¿Cuándo usarlo? Cuando el enunciado relaciona **velocidades** con una **distancia** (no con un tiempo) y pide una fuerza, una distancia o una velocidad. Con un tiempo, mejor dinámica y cinemática.

**Fuerza media.** En una frenada o un impacto la fuerza puede no ser constante. Si se supone constante (o se pide la fuerza media), sale de W = F·d·cos 180°:

**F = |W| / d**

**Método**

1. Todo al SI: km/h ÷ 3,6 → m/s; g → kg; cm → m.
2. Ec inicial y Ec final (si se para, Ec final = 0).
3. W total = Ec final − Ec inicial (sale negativo si frena).
4. Si solo trabaja una fuerza que frena: W = −F·d ⟹ F = |W| / d.
5. Comprobación: a = (v² − v₀²) / (2·d) y F = m·|a| deben dar lo mismo.

=== 3.1 | Teoría 9 | Coche de 1000 kg que frena de 108 a 18 km/h
pide: Coche que frena de 108 a 18 km/h en 50 m
indice: W = −4,38·10⁵ J; F = 8 750 N
widget: bloque {"escenario": "frenada", "m": 1000, "v0kmh": 108, "v1kmh": 18, "d": 50, "controles": ["m", "v0kmh", "v1kmh", "d"]}
--- enunciado
Un coche de 1000 kg que se mueve a 108 km/h frena y su velocidad disminuye a 18 km/h. Calcula: a) el trabajo realizado por la fuerza de frenado; b) si la distancia recorrida mientras frena es de 50 m, calcula la fuerza de frenado.
--- resultado
a) W = −4,375·10⁵ J · b) F = 8 750 N.
--- solucion
Datos: m = 1000 kg · v₀ = 108 km/h · v = 18 km/h · d = 50 m.

[[diagrama:w31_coche|Teoría 9 · el coche antes y después de frenar]]

La fuerza de frenado actúa durante los 50 m y se lleva la diferencia entre las dos energías cinéticas.

**Qué herramienta usar.** Dan dos velocidades y una distancia, y piden un trabajo y una fuerza: teorema de las fuerzas vivas.

**Paso 0. Unidades**

**v₀ = 108 / 3,6 = 30 m/s  v = 18 / 3,6 = 5 m/s**

> **¿Por qué ÷ 3,6?** 1 km/h = 1000 m / 3600 s = 1/3,6 m/s. En la fórmula de la energía la velocidad va en m/s para que el resultado salga en julios.

**a) Trabajo de la fuerza de frenado**

**W = ½·m·v² − ½·m·v₀² = ½ · 1000 · (5² − 30²) = 500 · (25 − 900) = −437 500 J**

> **¿Por qué esta fórmula?** El peso y la normal no trabajan (son verticales y el coche va en horizontal), así que el trabajo total es el de la fuerza de frenado, y por el teorema de las fuerzas vivas es igual a la variación de Ec. Sale negativo porque el coche pierde energía cinética.

**b) Fuerza de frenado**

**W = F · d · cos 180° ⟹ −437 500 = −F · 50 ⟹ F = 8 750 N**

> **¿Por qué cos 180°?** La fuerza de frenado apunta hacia atrás y el coche avanza. El signo menos ya está en el coseno; F es el módulo y sale positivo.

**Comprobación por cinemática.** a = (v² − v₀²) / (2·d) = (25 − 900) / 100 = −8,75 m/s², y F = m·|a| = 1000 · 8,75 = 8 750 N. Coincide.

**Sentido físico.** La velocidad baja a la sexta parte, pero la energía cinética baja a 1/36 (porque va con v²): de 450 000 J a 12 500 J.
--- simulacion
En la simulación el coche pasa de 108 a 18 km/h en 50 m. Cambia la velocidad final a 0 y mira cuánto tiene que crecer la fuerza.

=== 3.2 | Teoría 10 | Bala de 40 g que se incrusta 6 cm en una tabla
pide: Bala que se incrusta 6 cm
indice: F = 3,0·10⁴ N
widget: bloque {"escenario": "bala", "m": 0.04, "v0": 300, "p": 0.06}
--- enunciado
Una bala de 40 g choca horizontalmente contra una tabla con una velocidad de 300 m/s y se incrusta en ella una profundidad de 6 cm. Calcula la fuerza, supuesta constante, que opone la madera a la penetración de la bala.
--- resultado
F = 3,0·10⁴ N (30 000 N).
--- solucion
Datos: m = 40 g = 0,040 kg · v₀ = 300 m/s · v = 0 (se queda incrustada) · d = 6 cm = 0,06 m.

[[diagrama:w32_bala|Teoría 10 · la bala al entrar y al pararse]]

La madera empuja la bala hacia atrás durante los 6 cm que penetra, hasta quitarle los 1 800 J.

**Qué herramienta usar.** Velocidades y una distancia; piden una fuerza: teorema de las fuerzas vivas y después F = |W| / d.

**Paso 1. Trabajo de la madera**

**W = ½·m·v² − ½·m·v₀² = 0 − ½ · 0,040 · 300² = −1 800 J**

> **¿Por qué Ec final = 0?** «Se incrusta» quiere decir que se para dentro de la tabla. Toda su energía cinética la quita la fuerza de la madera, que es la única que trabaja durante esos 6 cm (el peso de la bala es despreciable frente a ella y además es perpendicular al movimiento).

**Paso 2. Fuerza (supuesta constante)**

**W = F · d · cos 180° ⟹ −1 800 = −F · 0,06 ⟹ F = 30 000 N**

> **¿Por qué 0,06 y no 6?** La distancia tiene que ir en metros para que N·m = J. Con 6 saldría una fuerza 100 veces menor.

**Comprobación por cinemática.** a = (0 − 300²) / (2 · 0,06) = −750 000 m/s² y F = 0,040 · 750 000 = 30 000 N. Coincide.

**Sentido físico.** El peso de la bala es 0,040 · 9,8 = 0,39 N: la madera hace una fuerza unas 77 000 veces mayor. Es grande porque tiene que quitar mucha energía en muy poca distancia.
--- simulacion
La bala se frena en 0,4 milésimas de segundo: la simulación va a cámara lenta. Cambia la profundidad y mira cómo cambia la fuerza.

=== 3.3 | Ejercicios 6 | Proyectil que atraviesa una pared de 40 cm
pide: Proyectil que atraviesa 40 cm de madera
indice: F = 1,72·10⁴ N
widget: bloque {"escenario": "pared", "m": 0.1, "v0": 400, "v1": 150, "e": 0.4}
--- enunciado
Un proyectil de 100 g atraviesa horizontalmente una pared de madera de 40 cm de espesor. Sabiendo que la rapidez del proyectil al llegar a la pared era de 400 m/s y que al salir es de 150 m/s, determinad el valor de la fuerza, supuesta constante, que ejerce la madera sobre el proyectil mientras atraviesa la pared.
--- resultado
F = 1,72·10⁴ N (17 188 N).
--- solucion
Datos: m = 100 g = 0,1 kg · v₀ = 400 m/s al entrar · v = 150 m/s al salir · d = 40 cm = 0,40 m.

**Qué herramienta usar.** Como 3.2, pero ahora el proyectil **no se para**: sale con 150 m/s, así que la Ec final no es cero.

**Paso 1. Trabajo de la madera**

**W = ½·m·(v² − v₀²) = ½ · 0,1 · (150² − 400²) = 0,05 · (22 500 − 160 000) = −6 875 J**

> **¿Por qué?** Teorema de las fuerzas vivas: la madera es la única fuerza que trabaja mientras el proyectil está dentro, y su trabajo es la energía cinética que le quita. Ojo: v² − v₀² no es (v − v₀)²; primero se elevan al cuadrado y luego se restan.

**Paso 2. Fuerza de la madera**

**F = |W| / d = 6 875 / 0,40 = 17 187,5 N ≈ 1,72·10⁴ N**

> **¿Por qué?** W = F·d·cos 180° = −F·d, y despejando F = |W| / d.

**Comprobación por cinemática.** a = (150² − 400²) / (2 · 0,40) = −171 875 m/s² y F = 0,1 · 171 875 = 17 187,5 N. Coincide.

**Sentido físico.** El proyectil pierde (160 000 − 22 500)/160 000 = 86 % de su energía cinética aunque solo pierde el 62,5 % de su velocidad: la energía va con v².
--- simulacion
En la simulación (a cámara lenta) se ve cómo la barra de energía cinética se queda en un 14 % al salir de la pared.

=== 3.4 | Teoría 13 | Bloque lanzado a 15 m/s por un suelo con μ = 0,4
pide: Bloque a 15 m/s con μ = 0,4
indice: d = 28,7 m
widget: bloque {"escenario": "deslizar", "m": 2, "v0": 15, "mu": 0.4, "controles": ["m", "v0", "mu"]}
--- enunciado
Se lanza un bloque por una superficie horizontal con una rapidez de 15 m/s. Calcula qué distancia recorrerá hasta pararse si el coeficiente de rozamiento entre el bloque y la superficie es de 0,4.
--- resultado
d = 28,7 m (no depende de la masa).
--- solucion
Datos: v₀ = 15 m/s · v = 0 (se para) · μ = 0,4 · suelo horizontal · g = 9,8 m/s² · m no se da.

[[diagrama:w34_bloque|Teoría 13 · bloque que se para por el rozamiento]]

Mientras desliza, la única fuerza que trabaja es el rozamiento, que apunta hacia atrás.

**Qué herramienta usar.** Una velocidad, que se para, y una distancia que buscar: teorema de las fuerzas vivas. La única fuerza que trabaja es el rozamiento.

**Paso 1. Rozamiento**

**N = m·g ⟹ Fr = μ·m·g**

> **¿Por qué N = m·g?** Suelo horizontal y ninguna otra fuerza vertical: la normal compensa el peso.

**Paso 2. Teorema de las fuerzas vivas**

**W roz = Ec final − Ec inicial ⟹ −μ·m·g·d = 0 − ½·m·v₀²**

> **¿Por qué cada término?** El rozamiento va contra el movimiento: W = Fr·d·cos 180° = −μ·m·g·d. La energía cinética final es 0 porque se para. El peso y la normal no trabajan.

**Paso 3. Despejar con letras y sustituir al final**

**d = v₀² / (2·μ·g) = 15² / (2 · 0,4 · 9,8) = 225 / 7,84 = 28,7 m**

> **¿Por qué se va la masa?** Aparece en los dos lados (en el rozamiento y en la Ec) y se simplifica. Por eso el enunciado no la da. Despejar con letras antes de poner números es lo que permite verlo.

**Cómo aparece en los apuntes.** El apartado 2.9 escribe **E M0 = E MF + Fr·Δs**: la energía del principio es igual a la del final más la que se disipa por rozamiento. Aquí: ½·m·v₀² = 0 + μ·m·g·d, que es la misma ecuación con el término del rozamiento al otro lado del igual y con signo positivo. Usa una forma u otra, pero no las mezcles: si escribes −μ·m·g·d a la izquierda, no vuelvas a sumarlo a la derecha.

**Comprobación por cinemática.** a = −μ·g = −3,92 m/s² y d = v₀² / (2·|a|) = 225 / 7,84 = 28,7 m. Coincide.
--- simulacion
El enunciado no da la masa porque no hace falta: cámbiala en la simulación y la distancia sigue siendo 28,7 m.

=== 3.5 | Nuevo | Coche en punto muerto que se para en 400 m
pide: Coche de 900 kg a 72 km/h que se para en 400 m sin frenar
indice: W = −1,8·10⁵ J; F = 450 N; t = 40 s
widget: bloque {"escenario": "frenada", "m": 900, "v0kmh": 72, "v1kmh": 0, "d": 400, "controles": ["m", "v0kmh", "d"]}
--- enunciado
Un coche de 900 kg circula por una carretera horizontal a 72 km/h. El conductor pone el punto muerto y, sin frenar, el coche se detiene después de recorrer 400 m por la acción de los rozamientos y la resistencia del aire. Calcula: a) el trabajo realizado por las fuerzas de resistencia; b) el valor de la fuerza media de resistencia; c) el tiempo que tarda en pararse.
--- resultado
a) W = −1,8·10⁵ J · b) F = 450 N · c) t = 40 s.
--- solucion
Datos: m = 900 kg · v₀ = 72 km/h = 20 m/s · v = 0 · d = 400 m.

**Qué herramienta usar.** Se conocen las velocidades y la distancia, y se pide un trabajo: **teorema de las fuerzas vivas**, W total = ΔEc. Peso y normal no trabajan (en horizontal), así que el trabajo total es el de la resistencia.

**72 km/h = 72 / 3,6 = 20 m/s**

> **¿Por qué ÷ 3,6?** 1 km/h = 1000 m / 3600 s = 1/3,6 m/s. Siempre se pasa al SI antes de sustituir.

**a) Trabajo de las fuerzas de resistencia**

**W = ½·m·v² − ½·m·v₀² = 0 − ½ · 900 · 20² = −1,8·10⁵ J**

> **¿Por qué negativo?** La resistencia va contra el movimiento y quita energía cinética al coche: los 180 000 J acaban como calor (en el aire, en las ruedas, en los ejes).

**b) Fuerza media**

**W = −F·d ⟹ F = 1,8·10⁵ / 400 = 450 N**

> **¿Por qué −F·d?** La fuerza de resistencia forma 180° con el desplazamiento: W = F·d·cos 180° = −F·d.

**c) Tiempo**

**a = F / m = 450 / 900 = 0,5 m/s² (frenando) ; t = v₀ / a = 20 / 0,5 = 40 s**

**Comprobación.** Con a = 0,5 m/s², la distancia hasta pararse es v₀² / (2·a) = 400 / 1 = 400 m. Coincide con el dato.
--- simulacion
La fuerza de 450 N es solo un 5 % del peso del coche: por eso tarda 40 s en pararse. En la simulación puedes cambiar la masa y ver que la fuerza necesaria cambia en proporción.

=== 3.6 | Nuevo | Coche que acelera de 54 a 90 km/h en 150 m
pide: Coche de 1200 kg de 54 a 90 km/h en 150 m
indice: W = 2,4·10⁵ J; F = 1 600 N
widget: bloque {"escenario": "frenada", "m": 1200, "v0kmh": 54, "v1kmh": 90, "d": 150, "controles": ["m", "v0kmh", "v1kmh", "d"]}
--- enunciado
Un coche de 1200 kg que circula a 54 km/h acelera hasta 90 km/h en una distancia de 150 m por una carretera horizontal. Calcula: a) el trabajo realizado por la fuerza neta; b) la fuerza neta media que actúa sobre el coche; c) el trabajo necesario si el coche tuviera el doble de masa, o si tuviera que pasar de 0 a 90 km/h.
--- resultado
a) W = 2,4·10⁵ J · b) F = 1,6·10³ N · c) con el doble de masa, 4,8·10⁵ J; de 0 a 90 km/h, 3,75·10⁵ J.
--- solucion
Datos: m = 1200 kg · v₀ = 54 km/h = 15 m/s · v = 90 km/h = 25 m/s · d = 150 m.

**Qué herramienta usar.** Teorema de las fuerzas vivas: el trabajo de la fuerza neta (la suma de todas) es la variación de energía cinética.

**a) Trabajo de la fuerza neta**

**W neta = ½·m·v² − ½·m·v₀² = ½ · 1200 · (25² − 15²) = 600 · 400 = 2,4·10⁵ J**

> **¿Por qué v² − v₀² y no (v − v₀)²?** La energía cinética de cada instante es ½·m·v²; la variación es la diferencia de las dos energías. (25 − 15)² = 100 daría un resultado cuatro veces menor, y es un error frecuente.

**b) Fuerza neta media**

**W = F·d ⟹ F = 2,4·10⁵ / 150 = 1,6·10³ N**

> **¿Por qué positiva?** La fuerza neta va en el sentido del movimiento (el motor empuja más de lo que frenan el aire y los rozamientos): su trabajo es positivo y la energía cinética aumenta.

**c) Comparaciones**

- **Doble masa:** Ec es proporcional a m ⟹ W = 2 · 2,4·10⁵ = 4,8·10⁵ J.
- **De 0 a 90 km/h:** W = ½ · 1200 · 25² = 3,75·10⁵ J.

**Sentido físico.** Pasar de 15 a 25 m/s cuesta casi dos tercios de lo que cuesta pasar de 0 a 25 m/s, aunque el aumento de velocidad es menor: como Ec va con v², ganar velocidad cuesta más cuanto más deprisa se va.

**Comprobación por dinámica.** a = F/m = 1,33 m/s² y v² = v₀² + 2·a·d = 225 + 2 · 1,33 · 150 = 625 ⟹ v = 25 m/s. Coincide.
--- simulacion
En la simulación la flecha morada es la fuerza neta, a favor del movimiento. Cambia la velocidad final y mira cómo crece el trabajo necesario: va con v², no con v.

=== 3.7 | Nuevo | Esquiador que se para en 40 m: coeficiente de rozamiento
pide: Esquiador de 70 kg a 12 m/s que se para en 40 m en llano
indice: μ = 0,184; W roz = −5 040 J
widget: bloque {"escenario": "deslizar", "m": 70, "v0": 12, "mu": 0.1837, "controles": ["m", "v0", "mu"]}
--- enunciado
Un esquiador de 70 kg llega a una zona horizontal con una velocidad de 12 m/s y, sin impulsarse, se detiene después de recorrer 40 m. Calcula: a) el trabajo realizado por la fuerza de rozamiento; b) el coeficiente de rozamiento entre los esquís y la nieve; c) ¿se pararía en la misma distancia un niño de 35 kg que llegase con la misma velocidad?
--- resultado
a) W roz = −5,04·10³ J · b) μ = 0,184 · c) sí: la distancia d = v²/(2·μ·g) no depende de la masa.
--- solucion
Datos: m = 70 kg · v₀ = 12 m/s · v = 0 · d = 40 m · g = 9,8 m/s².

**Qué herramienta usar.** Teorema de las fuerzas vivas. En horizontal, el peso y la normal no trabajan y N = m·g.

**a) Trabajo del rozamiento**

**W roz = ΔEc = 0 − ½ · 70 · 12² = −5 040 J**

**b) Coeficiente de rozamiento**

**W roz = −μ·m·g·d ⟹ μ = 5 040 / (70 · 9,8 · 40) = 0,184**

> **¿Por qué −μ·m·g·d?** Fr = μ·N con N = m·g en horizontal, y el rozamiento forma 180° con el desplazamiento: W = −Fr·d.

**c) Esquiador de 35 kg**

Juntando los dos pasos con letras: **−μ·m·g·d = −½·m·v₀² ⟹ d = v₀² / (2·μ·g)**. La masa se simplifica: con el mismo μ y la misma velocidad, el niño se para también en 40 m. Lo que cambia es el calor producido, que es la mitad (2 520 J).

**Comprobación.** Con μ = 0,184, a = μ·g = 1,80 m/s² y d = v₀²/(2·a) = 144 / 3,60 = 40 m. Coincide.
--- simulacion
Cambia la masa en la simulación: la distancia de frenado no cambia, pero sí el calor (la barra roja).
