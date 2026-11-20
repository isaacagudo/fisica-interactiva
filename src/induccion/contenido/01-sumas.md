---
slug: sumas
titulo: Sumas de series
nombre: Sumas de series
corto: Sumas
eyebrow: Apartado 1 · Patrón A
desc: El caso n + 1 es el caso n más un término. Hipótesis, término nuevo y factor común.
icono: sumas
---
## Idea clave: el caso n + 1 es el caso n más un término

En una suma, la hipótesis te da el valor de todo lo anterior; tú solo tienes que añadir el término nuevo y arreglar la expresión hasta que tenga la forma del objetivo.

**1 + 2 + ⋯ + n + (n + 1) = [1 + 2 + ⋯ + n] + (n + 1)**

El corchete es exactamente la hipótesis. Y el truco para arreglar lo que queda es **sacar factor común, no desarrollar**.

> **¿Por qué factorizar y no desarrollar?** Porque el objetivo casi siempre viene factorizado, como (n + 1)(n + 2)/2. Si sacas factor común, te acercas a esa forma. Si desarrollas, obtienes un polinomio y luego tienes que factorizarlo, que es más largo y más fácil de fallar.

**Método**

1. Escribe el término general con su índice r y sustituye r = n + 1: ese es el **término nuevo**.
2. Escribe el objetivo: la fórmula con n + 1 en lugar de n, con paréntesis.
3. Separa el término nuevo y sustituye el resto por la hipótesis.
4. Saca factor común de lo que aparezca en el objetivo y simplifica lo que queda dentro.

## Ejemplo 1 · 1 + 2 + ⋯ + n = n(n + 1)/2

**Explorar.** n = 1: 1 y 1·2/2 = 1. n = 2: 3 y 2·3/2 = 3. n = 3: 6 y 3·4/2 = 6. Parece cierto.

1. **Enunciado.** Sea P(k): **1 + 2 + ⋯ + k = k(k + 1)/2**, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1. Lado derecho: 1·2/2 = 1. Coinciden, así que P(1) es cierta.
3. **Hipótesis de inducción.** Supongamos que P(k) es cierta para k = n: **1 + 2 + ⋯ + n = n(n + 1)/2**.
4. **Paso inductivo, k = n + 1.** Queremos llegar a: **1 + 2 + ⋯ + n + (n + 1) = (n + 1)(n + 2)/2**.

**1 + 2 + ⋯ + n + (n + 1) = n(n + 1)/2 + (n + 1)** (por la hipótesis)

**= (n + 1) · (n/2 + 1)** (factor común n + 1)

**= (n + 1)(n + 2)/2** ✔ es el objetivo

> **¿Por qué (n + 1) como factor común?** Porque está en los dos sumandos y también en el objetivo. Mira el objetivo, busca qué factores tiene, y sácalos.

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

## Ejemplo 2 · 1·2 + 2·3 + ⋯ + n(n + 1) = n(n + 1)(n + 2)/3

**Explorar.**

| n | Suma | Resultado | n(n + 1)(n + 2)/3 |
| --- | --- | --- | --- |
| 1 | 1·2 | 2 | 1·2·3/3 = 2 |
| 2 | 2 + 2·3 | 8 | 2·3·4/3 = 8 |
| 3 | 8 + 3·4 | 20 | 3·4·5/3 = 20 |
| 4 | 20 + 4·5 | 40 | 4·5·6/3 = 40 |

Fíjate en la columna «Suma»: cada fila es la anterior más un término. Eso es el paso inductivo en pequeño.

1. **Enunciado.** Sea P(k): **1·2 + 2·3 + ⋯ + k(k + 1) = k(k + 1)(k + 2)/3**, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1·2 = 2. Lado derecho: 1·2·3/3 = 2. Coinciden.
3. **Hipótesis de inducción.** Para k = n: **1·2 + 2·3 + ⋯ + n(n + 1) = n(n + 1)(n + 2)/3**.
4. **Paso inductivo, k = n + 1.** Queremos llegar a: **1·2 + ⋯ + n(n + 1) + (n + 1)(n + 2) = (n + 1)(n + 2)(n + 3)/3**.

> **¿Cuál es el término nuevo?** El término general es r(r + 1). El término número n + 1 se obtiene poniendo r = n + 1: **(n + 1)(n + 2)**. No es n(n + 1) + 1: hay que sustituir, no sumar 1 al final.

**1·2 + ⋯ + n(n + 1) + (n + 1)(n + 2) = n(n + 1)(n + 2)/3 + (n + 1)(n + 2)** (por la hipótesis)

**= (n + 1)(n + 2) · (n/3 + 1)** (factor común (n + 1)(n + 2))

**= (n + 1)(n + 2)(n + 3)/3** ✔ es el objetivo

> **¿Y si hubiera desarrollado?** Te habría salido (n³ + 6n² + 11n + 6)/3 y tendrías que darte cuenta de que eso es (n + 1)(n + 2)(n + 3)/3. Se puede, pero es más largo y cada multiplicación es una ocasión de equivocarse.

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

## Relacionar patrones: la escalera de fórmulas

Pon las dos fórmulas una encima de otra y aparece una regularidad:

| Suma | Resultado | Patrón |
| --- | --- | --- |
| 1 + 2 + ⋯ + n | n(n + 1)/2 | 2 factores consecutivos, entre 2 |
| 1·2 + 2·3 + ⋯ + n(n + 1) | n(n + 1)(n + 2)/3 | 3 factores consecutivos, entre 3 |
| 1·2·3 + 2·3·4 + ⋯ + n(n + 1)(n + 2) | n(n + 1)(n + 2)(n + 3)/4 | 4 factores consecutivos, entre 4 |

La tercera fórmula no la hemos demostrado, pero el patrón te deja adivinarla. Y su paso inductivo sería el mismo: sacar factor común (n + 1)(n + 2)(n + 3) y queda (n/4 + 1) = (n + 4)/4. **Ejercicio:** demuéstrala tú.

Esto también sirve para **descubrir** fórmulas. Como n(n + 1) = n² + n, la suma de los n(n + 1) es la suma de los cuadrados más la suma de los números. Despejando:

**1² + 2² + ⋯ + n² = n(n + 1)(n + 2)/3 − n(n + 1)/2 = n(n + 1)(2n + 1)/6**

Que es justo la fórmula que tu profesor te pide demostrar en el ejercicio D16·9. Ahora ya sabes de dónde sale.

## Variantes que vas a encontrar en los ejercicios

La estrategia es siempre la misma: **término nuevo + hipótesis, y factor común de lo que tenga el objetivo**. Lo que cambia es cómo encontrar el factor común:

- **Con factoriales.** Usa que **(n + 2)! = (n + 2) · (n + 1)!**. Así (n + 1)! queda como factor común.
- **Con potencias en el denominador**, como 1/2ⁿ⁻¹ y 1/2ⁿ. Pasa todo al denominador mayor: **1/2ⁿ⁻¹ = 2/2ⁿ**. Luego suma los numeradores.
- **Con productos como n(n + 2).** Igual que el ejemplo 2. El término nuevo es (n + 1)(n + 3), y el factor común es (n + 1).

=== A1 | Nuevo | La suma de los n primeros enteros
caso: k = 1
nivel: 1
pide: 1 + 2 + 3 + ⋯ + n = n(n + 1)/2
--- enunciado
Demuestra por inducción que **1 + 2 + 3 + ⋯ + n = n(n + 1)/2**, para n ∈ ℤ⁺.

Es el ejemplo 1 de la teoría: intenta hacerlo sin mirarlo.
--- pista El término nuevo y el objetivo
El término general es r, así que el término nuevo es **n + 1**. Cambiando n por n + 1 en la fórmula, el objetivo es **1 + 2 + ⋯ + n + (n + 1) = (n + 1)(n + 2)/2**.
--- pista La hipótesis
Todo menos el último término es la hipótesis: **n(n + 1)/2 + (n + 1)**.
--- pista El truco
Saca (n + 1) factor común: **(n + 1)(n/2 + 1)**. ¿Cuánto vale n/2 + 1 con denominador 2?
--- solucion
1. Sea P(k): 1 + 2 + ⋯ + k = k(k + 1)/2, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1. Lado derecho: 1·2/2 = 1. Coinciden.
3. **Hipótesis, k = n.** 1 + 2 + ⋯ + n = n(n + 1)/2.
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)(n + 2)/2.

**1 + 2 + ⋯ + n + (n + 1) = n(n + 1)/2 + (n + 1)** (por la hipótesis)

**= (n + 1)(n/2 + 1) = (n + 1)(n + 2)/2** (factor común n + 1) ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

=== A2 | Nuevo | La suma de los n primeros pares
caso: k = 1
nivel: 1
pide: 2 + 4 + 6 + ⋯ + 2n = n(n + 1)
--- enunciado
Demuestra por inducción que **2 + 4 + 6 + ⋯ + 2n = n(n + 1)**, para n ∈ ℤ⁺.
--- pista El término nuevo y el objetivo
El término general es 2r. Con r = n + 1, el término nuevo es **2(n + 1) = 2n + 2**. Objetivo: **2 + 4 + ⋯ + 2n + 2(n + 1) = (n + 1)(n + 2)**.
--- pista La hipótesis
Sustituye todo menos el último término por la hipótesis: **n(n + 1) + 2(n + 1)**.
--- pista El truco
Los dos sumandos tienen el factor (n + 1), igual que el objetivo. Sácalo factor común.
--- solucion
1. Sea P(k): 2 + 4 + ⋯ + 2k = k(k + 1), para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 2. Lado derecho: 1·2 = 2. Coinciden.
3. **Hipótesis, k = n.** 2 + 4 + ⋯ + 2n = n(n + 1).
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)(n + 2).

**2 + 4 + ⋯ + 2n + 2(n + 1) = n(n + 1) + 2(n + 1)** (por la hipótesis)

**= (n + 1)(n + 2)** (factor común n + 1) ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

> **Otra forma de verlo.** 2 + 4 + ⋯ + 2n = 2(1 + 2 + ⋯ + n) = 2 · n(n + 1)/2 = n(n + 1). Sale lo mismo que con la fórmula del ejercicio A1, pero aquí se pide por inducción.

=== A3 | Nuevo | La suma de los n primeros impares
caso: k = 1
nivel: 1
pide: 1 + 3 + 5 + ⋯ + (2n − 1) = n²
--- enunciado
Demuestra por inducción que **1 + 3 + 5 + ⋯ + (2n − 1) = n²**, para n ∈ ℤ⁺.
--- pista El término nuevo
El término general es 2r − 1. Con r = n + 1: 2(n + 1) − 1 = **2n + 1**. Ojo: no es 2n − 1 + 1. Objetivo: **1 + 3 + ⋯ + (2n − 1) + (2n + 1) = (n + 1)²**.
--- pista La hipótesis
Queda **n² + (2n + 1)**.
--- pista La última cuenta
¿Reconoces n² + 2n + 1? Es el desarrollo de un cuadrado.
--- solucion
1. Sea P(k): 1 + 3 + ⋯ + (2k − 1) = k², para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1. Lado derecho: 1² = 1. Coinciden.
3. **Hipótesis, k = n.** 1 + 3 + ⋯ + (2n − 1) = n².
4. **Paso, k = n + 1.** El término nuevo es 2(n + 1) − 1 = 2n + 1. Queremos llegar a (n + 1)².

**1 + 3 + ⋯ + (2n − 1) + (2n + 1) = n² + 2n + 1** (por la hipótesis)

**= (n + 1)²** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

> **Un dibujo.** Un cuadrado de n × n puntos se convierte en uno de (n + 1) × (n + 1) añadiendo una «L» de 2n + 1 puntos (n por arriba, n por la derecha y 1 en la esquina). Eso es exactamente el paso inductivo.

=== A4 | Nuevo | Una suma aritmética: 3 + 7 + 11 + ⋯
caso: k = 1
nivel: 1
pide: 3 + 7 + 11 + ⋯ + (4n − 1) = n(2n + 1)
--- enunciado
Demuestra por inducción que **3 + 7 + 11 + ⋯ + (4n − 1) = n(2n + 1)**, para n ∈ ℤ⁺.
--- pista El término nuevo y el objetivo
Con r = n + 1, el término nuevo es 4(n + 1) − 1 = **4n + 3**. Objetivo: **(n + 1)(2(n + 1) + 1) = (n + 1)(2n + 3)**.
--- pista La hipótesis
Queda **n(2n + 1) + 4n + 3**.
--- pista El truco
Aquí no hay factor común a la vista. Desarrolla: 2n² + 5n + 3. Comprueba multiplicando que es (n + 1)(2n + 3).
--- solucion
1. Sea P(k): 3 + 7 + ⋯ + (4k − 1) = k(2k + 1), para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 3. Lado derecho: 1·3 = 3. Coinciden.
3. **Hipótesis, k = n.** 3 + 7 + ⋯ + (4n − 1) = n(2n + 1).
4. **Paso, k = n + 1.** El término nuevo es 4n + 3. Queremos llegar a (n + 1)(2n + 3).

**3 + 7 + ⋯ + (4n − 1) + (4n + 3) = n(2n + 1) + 4n + 3** (por la hipótesis)

**= 2n² + 5n + 3 = (n + 1)(2n + 3)** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

> **¿Por qué aquí sí desarrollo?** Porque el término nuevo (4n + 3) no tiene el factor (n + 1). Cuando no hay factor común, desarrolla y factoriza sabiendo ya el resultado: comprobar que 2n² + 5n + 3 = (n + 1)(2n + 3) es solo multiplicar.

=== A5 | Nuevo | La suma de las potencias de 2
caso: k = 1
nivel: 2
pide: 1 + 2 + 4 + ⋯ + 2ⁿ⁻¹ = 2ⁿ − 1
--- enunciado
Demuestra por inducción que **1 + 2 + 4 + ⋯ + 2ⁿ⁻¹ = 2ⁿ − 1**, para n ∈ ℤ⁺.
--- pista El término nuevo y el objetivo
El término general es 2ʳ⁻¹. Con r = n + 1 el término nuevo es **2ⁿ**. Objetivo: **1 + 2 + ⋯ + 2ⁿ⁻¹ + 2ⁿ = 2ⁿ⁺¹ − 1**.
--- pista La hipótesis
Queda **2ⁿ − 1 + 2ⁿ**.
--- pista El truco
2ⁿ + 2ⁿ = 2 · 2ⁿ. ¿Qué potencia de 2 es?
--- solucion
1. Sea P(k): 1 + 2 + ⋯ + 2ᵏ⁻¹ = 2ᵏ − 1, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 2⁰ = 1. Lado derecho: 2¹ − 1 = 1. Coinciden.
3. **Hipótesis, k = n.** 1 + 2 + ⋯ + 2ⁿ⁻¹ = 2ⁿ − 1.
4. **Paso, k = n + 1.** Queremos llegar a 2ⁿ⁺¹ − 1.

**1 + 2 + ⋯ + 2ⁿ⁻¹ + 2ⁿ = 2ⁿ − 1 + 2ⁿ** (por la hipótesis)

**= 2 · 2ⁿ − 1 = 2ⁿ⁺¹ − 1** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

> **Relación con el tema.** Es la suma de una progresión geométrica de razón 2. Con la fórmula de la diapositiva 12, Sₙ = (a₁ − aₙ·R)/(1 − R) = (1 − 2ⁿ⁻¹·2)/(1 − 2) = 2ⁿ − 1.

=== A6 | Nuevo | Una suma telescópica
caso: k = 1
nivel: 2
pide: 1/(1·2) + 1/(2·3) + ⋯ + 1/(n(n + 1)) = n/(n + 1)
--- enunciado
Demuestra por inducción que **1/(1·2) + 1/(2·3) + ⋯ + 1/(n(n + 1)) = n/(n + 1)**, para n ∈ ℤ⁺.
--- pista El término nuevo y el objetivo
Con r = n + 1, el término nuevo es **1/((n + 1)(n + 2))**. Objetivo: **(n + 1)/(n + 2)**.
--- pista La hipótesis
Queda **n/(n + 1) + 1/((n + 1)(n + 2))**. Pon denominador común (n + 1)(n + 2).
--- pista La última cuenta
El numerador es n(n + 2) + 1 = n² + 2n + 1. ¿Qué cuadrado es? Después simplifica un (n + 1).
--- solucion
1. Sea P(k): 1/(1·2) + ⋯ + 1/(k(k + 1)) = k/(k + 1), para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1/(1·2) = 1/2. Lado derecho: 1/2. Coinciden.
3. **Hipótesis, k = n.** 1/(1·2) + ⋯ + 1/(n(n + 1)) = n/(n + 1).
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)/(n + 2).

**1/(1·2) + ⋯ + 1/((n + 1)(n + 2)) = n/(n + 1) + 1/((n + 1)(n + 2))** (por la hipótesis)

**= (n(n + 2) + 1)/((n + 1)(n + 2)) = (n + 1)²/((n + 1)(n + 2)) = (n + 1)/(n + 2)** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

> **¿Por qué «telescópica»?** Porque 1/(r(r + 1)) = 1/r − 1/(r + 1), y al sumar se van anulando los términos de dos en dos, como un catalejo que se pliega: queda 1 − 1/(n + 1) = n/(n + 1).

=== A7 | Nuevo | La suma de los cubos
caso: k = 1
nivel: 2
pide: 1³ + 2³ + ⋯ + n³ = n²(n + 1)²/4
--- enunciado
Demuestra por inducción que **1³ + 2³ + ⋯ + n³ = n²(n + 1)²/4**, para n ∈ ℤ⁺.
--- pista El objetivo
El término nuevo es **(n + 1)³**. Objetivo: **(n + 1)²(n + 2)²/4**.
--- pista La hipótesis
Queda **n²(n + 1)²/4 + (n + 1)³**.
--- pista El truco
Saca factor común (n + 1)²/4: **(n + 1)²/4 · [n² + 4(n + 1)]**.
--- pista La última cuenta
n² + 4n + 4 es un cuadrado.
--- solucion
1. Sea P(k): 1³ + 2³ + ⋯ + k³ = k²(k + 1)²/4, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1. Lado derecho: 1·4/4 = 1. Coinciden.
3. **Hipótesis, k = n.** 1³ + ⋯ + n³ = n²(n + 1)²/4.
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)²(n + 2)²/4.

**1³ + ⋯ + n³ + (n + 1)³ = n²(n + 1)²/4 + (n + 1)³** (por la hipótesis)

**= (n + 1)²/4 · (n² + 4n + 4) = (n + 1)²(n + 2)²/4** (factor común (n + 1)²/4) ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

> **Una sorpresa.** n²(n + 1)²/4 = [n(n + 1)/2]²: la suma de los cubos es el cuadrado de la suma de los enteros. Por ejemplo, 1 + 8 + 27 = 36 = 6².

=== D16·9 | Diapositiva 16, ejercicio 9 | La suma de los cuadrados
caso: k = 1
nivel: 2
pide: 1² + 2² + ⋯ + n² = n(n + 1)(2n + 1)/6
--- enunciado
Demuestra que **1² + 2² + ⋯ + n² = n(n + 1)(2n + 1)/6**, para n ∈ ℤ⁺.
--- pista El objetivo
Sustituye n por n + 1 en el lado derecho, con cuidado: 2(n + 1) + 1 = 2n + 3. Quieres llegar a **1² + ⋯ + n² + (n + 1)² = (n + 1)(n + 2)(2n + 3)/6**.
--- pista La hipótesis
Todo menos el último término es la hipótesis. Te queda **n(n + 1)(2n + 1)/6 + (n + 1)²**.
--- pista El truco
No desarrolles: saca (n + 1) factor común y pon todo sobre 6. Te queda **(n + 1) · [n(2n + 1) + 6(n + 1)]/6**.
--- pista La última cuenta
El corchete vale 2n² + 7n + 6. Comprueba que es (n + 2)(2n + 3) multiplicando.
--- solucion
1. Sea P(k): 1² + 2² + ⋯ + k² = k(k + 1)(2k + 1)/6, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1² = 1. Lado derecho: 1·2·3/6 = 1. Coinciden.
3. **Hipótesis, k = n.** 1² + ⋯ + n² = n(n + 1)(2n + 1)/6.
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)(n + 2)(2n + 3)/6.

**1² + ⋯ + n² + (n + 1)² = n(n + 1)(2n + 1)/6 + (n + 1)²** (por la hipótesis)

**= (n + 1) · [n(2n + 1) + 6(n + 1)]/6** (factor común n + 1)

**= (n + 1)(2n² + 7n + 6)/6 = (n + 1)(n + 2)(2n + 3)/6** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

=== D36·18 | Diapositiva 36, ejercicio 18 | La suma de n(n + 2)
caso: k = 1
nivel: 2
pide: 1·3 + 2·4 + 3·5 + ⋯ + n(n + 2) = n(n + 1)(2n + 7)/6
--- enunciado
Demuestra que **1·3 + 2·4 + 3·5 + ⋯ + n(n + 2) = n(n + 1)(2n + 7)/6**.

En la diapositiva el tercer término aparece como 3·3, pero el término general es n(n + 2), así que es 3·5.
--- pista El término nuevo y el objetivo
El término general es r(r + 2). Con r = n + 1 sale **(n + 1)(n + 3)**. Objetivo: **(n + 1)(n + 2)(2n + 9)/6**, porque 2(n + 1) + 7 = 2n + 9.
--- pista La hipótesis
Queda **n(n + 1)(2n + 7)/6 + (n + 1)(n + 3)**.
--- pista El truco
Factor común (n + 1) y todo sobre 6: **(n + 1) · [n(2n + 7) + 6(n + 3)]/6**.
--- pista La última cuenta
El corchete vale 2n² + 13n + 18. Comprueba que es (n + 2)(2n + 9).
--- solucion
1. Sea P(k): 1·3 + 2·4 + ⋯ + k(k + 2) = k(k + 1)(2k + 7)/6, para k ∈ ℤ⁺. (Si el enunciado dice ℕ e incluye el 0, para k = 0 la suma no tiene términos y vale 0, igual que el lado derecho.)
2. **Caso base, k = 1.** Lado izquierdo: 1·3 = 3. Lado derecho: 1·2·9/6 = 3. Coinciden.
3. **Hipótesis, k = n.** 1·3 + ⋯ + n(n + 2) = n(n + 1)(2n + 7)/6.
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)(n + 2)(2n + 9)/6.

**1·3 + ⋯ + n(n + 2) + (n + 1)(n + 3) = n(n + 1)(2n + 7)/6 + (n + 1)(n + 3)** (por la hipótesis)

**= (n + 1) · [2n² + 7n + 6n + 18]/6** (factor común n + 1)

**= (n + 1)(2n² + 13n + 18)/6 = (n + 1)(n + 2)(2n + 9)/6** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

=== D33·4 | Diapositiva 33, ejercicio 4 | Suma con factoriales
caso: k = 1
nivel: 3
pide: 1·1! + 2·2! + ⋯ + n·n! = (n + 1)! − 1
--- enunciado
Demuestra, utilizando la inducción matemática, que **1·1! + 2·2! + ⋯ + n·n! = (n + 1)! − 1**, con n ∈ ℤ⁺.
--- pista El término nuevo y el objetivo
El término nuevo es **(n + 1)·(n + 1)!** y el objetivo es **(n + 2)! − 1**.
--- pista La hipótesis
Queda **(n + 1)! − 1 + (n + 1)·(n + 1)!**. Deja el −1 aparte: no lo toques, porque también está en el objetivo.
--- pista El truco
Saca (n + 1)! factor común: **(n + 1)! · (1 + n + 1) − 1**.
--- pista La última cuenta
Usa que **(n + 2) · (n + 1)! = (n + 2)!**.
--- solucion
1. Sea P(k): 1·1! + ⋯ + k·k! = (k + 1)! − 1, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1·1! = 1. Lado derecho: 2! − 1 = 1. Coinciden.
3. **Hipótesis, k = n.** 1·1! + ⋯ + n·n! = (n + 1)! − 1.
4. **Paso, k = n + 1.** Queremos llegar a (n + 2)! − 1.

**1·1! + ⋯ + n·n! + (n + 1)·(n + 1)! = (n + 1)! − 1 + (n + 1)·(n + 1)!** (por la hipótesis)

**= (n + 1)! · (n + 2) − 1** (factor común (n + 1)!)

**= (n + 2)! − 1** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

=== D34·8 | Diapositiva 34, ejercicio 8 | Suma con potencias de 1/2
caso: k = 1
nivel: 3
pide: 1 + 2·(1/2) + 3·(1/2)² + ⋯ + n·(1/2)ⁿ⁻¹ = 4 − (n + 2)/2ⁿ⁻¹
--- enunciado
Demuestra, utilizando inducción, que para n ∈ ℤ⁺:

**1 + 2·(1/2) + 3·(1/2)² + 4·(1/2)³ + ⋯ + n·(1/2)ⁿ⁻¹ = 4 − (n + 2)/2ⁿ⁻¹**
--- pista El término nuevo y el objetivo
El término general es r·(1/2)ʳ⁻¹. Con r = n + 1 el exponente es n: el término nuevo es **(n + 1)/2ⁿ**. Objetivo: **4 − (n + 3)/2ⁿ**.
--- pista La hipótesis
Queda **4 − (n + 2)/2ⁿ⁻¹ + (n + 1)/2ⁿ**.
--- pista El truco
El objetivo tiene denominador 2ⁿ, así que pasa todo a 2ⁿ: **1/2ⁿ⁻¹ = 2/2ⁿ**. Te queda **4 − 2(n + 2)/2ⁿ + (n + 1)/2ⁿ**.
--- pista La última cuenta
Junta las dos fracciones con cuidado con el signo: el menos afecta a todo el numerador 2n + 4. Sale **4 − (2n + 4 − n − 1)/2ⁿ**.
--- solucion
1. Sea P(k): 1 + 2·(1/2) + ⋯ + k·(1/2)ᵏ⁻¹ = 4 − (k + 2)/2ᵏ⁻¹, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1. Lado derecho: 4 − 3/2⁰ = 4 − 3 = 1. Coinciden.
3. **Hipótesis, k = n.** 1 + ⋯ + n·(1/2)ⁿ⁻¹ = 4 − (n + 2)/2ⁿ⁻¹.
4. **Paso, k = n + 1.** Queremos llegar a 4 − (n + 3)/2ⁿ.

**1 + ⋯ + n·(1/2)ⁿ⁻¹ + (n + 1)·(1/2)ⁿ = 4 − (n + 2)/2ⁿ⁻¹ + (n + 1)/2ⁿ** (por la hipótesis)

**= 4 − (2n + 4)/2ⁿ + (n + 1)/2ⁿ** (denominador común 2ⁿ)

**= 4 − (2n + 4 − n − 1)/2ⁿ = 4 − (n + 3)/2ⁿ** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.
