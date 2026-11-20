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

=== D16·9 | Diapositiva 16, ejercicio 9 | La suma de los cuadrados
caso: k = 1
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
