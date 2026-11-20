---
slug: divisibilidad
titulo: Divisibilidad
nombre: Divisibilidad
corto: Divisibilidad
eyebrow: Apartado 2 · Patrón B
desc: Escribir el caso n + 1 como algo por el caso n más un múltiplo. Con potencias y con polinomios.
icono: divisibilidad
---
## Idea clave: algo por la hipótesis más un múltiplo

«A es divisible por 7» se escribe **A = 7M, con M ∈ ℤ**. En el paso inductivo tienes que reescribir la expresión de n + 1 como **(algo) · (la expresión de n) + (un múltiplo de 7)**. La hipótesis dice que la expresión de n es múltiplo de 7, así que todo lo es.

> **¿Por qué funciona?** Por dos propiedades que ya usas sin pensar: un múltiplo de 7 por cualquier entero sigue siendo múltiplo de 7, y la suma de dos múltiplos de 7 es múltiplo de 7. Si A = 7M, entonces 2A + 7B = 14M + 7B = 7(2M + B).

Hay dos tipos de ejercicio, según cómo esté hecha la expresión:

| Tipo | Ejemplo | Cómo aparece la hipótesis |
| --- | --- | --- |
| **Con potencias** (n en el exponente) | 2ⁿ⁺² + 3²ⁿ⁺¹ | Separando potencias: 2ⁿ⁺³ = 2 · 2ⁿ⁺² |
| **Con polinomios** (n en la base) | n³ + 2n | Desarrollando (n + 1)³ y buscando la hipótesis dentro |

## Ejemplo 3 · 2ⁿ⁺² + 3²ⁿ⁺¹ es divisible por 7, para n ∈ ℕ

**Explorar.**

| n | 2ⁿ⁺² + 3²ⁿ⁺¹ | Valor |
| --- | --- | --- |
| 0 | 2² + 3¹ = 4 + 3 | 7 = 7·1 |
| 1 | 2³ + 3³ = 8 + 27 | 35 = 7·5 |
| 2 | 2⁴ + 3⁵ = 16 + 243 | 259 = 7·37 |
| 3 | 2⁵ + 3⁷ = 32 + 2187 | 2219 = 7·317 |

1. **Enunciado.** Sea P(k): **2ᵏ⁺² + 3²ᵏ⁺¹ es divisible por 7**, para k ∈ ℕ.
2. **Caso base, k = 0.** 2² + 3¹ = 4 + 3 = 7 = 7·1. Es múltiplo de 7. (El enunciado dice ℕ, que incluye el 0, así que empezamos en 0.)
3. **Hipótesis de inducción.** Para k = n: **2ⁿ⁺² + 3²ⁿ⁺¹ = 7M, con M ∈ ℤ**.
4. **Paso inductivo, k = n + 1.** Queremos llegar a: **2ⁿ⁺³ + 3²ⁿ⁺³ = 7 · (un entero)**.

Primero, **separar las potencias** para que aparezcan las de la hipótesis:

**2ⁿ⁺³ + 3²ⁿ⁺³ = 2 · 2ⁿ⁺² + 3² · 3²ⁿ⁺¹ = 2 · 2ⁿ⁺² + 9 · 3²ⁿ⁺¹**

> **¿Por qué separar así?** Porque la hipótesis habla de 2ⁿ⁺² y de 3²ⁿ⁺¹, y las potencias nuevas son esas mismas multiplicadas por algo. Al subir n en 1, el exponente 2n + 1 sube en 2, por eso sale 3² = 9.

Ahora hay un problema: delante de cada potencia hay un número distinto (2 y 9), y para usar la hipótesis necesitamos la suma entera 2ⁿ⁺² + 3²ⁿ⁺¹ multiplicada por lo mismo. Hay dos formas de arreglarlo.

**Técnica 1 · Repartir.** Escribe 9 = 2 + 7:

**= 2 · 2ⁿ⁺² + 2 · 3²ⁿ⁺¹ + 7 · 3²ⁿ⁺¹ = 2 · (2ⁿ⁺² + 3²ⁿ⁺¹) + 7 · 3²ⁿ⁺¹**

**= 2 · 7M + 7 · 3²ⁿ⁺¹ = 7 · (2M + 3²ⁿ⁺¹)** (por la hipótesis) ✔

> **¿Por qué sobra justo un 7?** No es casualidad. 9 − 2 = 7 es la razón de que el ejercicio funcione. Cuando repartes y lo que sobra no es múltiplo del divisor, revisa las cuentas.

**Técnica 2 · Despejar y sustituir.** De la hipótesis despejas una potencia: **3²ⁿ⁺¹ = 7M − 2ⁿ⁺²**. Y la sustituyes:

**2 · 2ⁿ⁺² + 9 · (7M − 2ⁿ⁺²) = 2 · 2ⁿ⁺² + 63M − 9 · 2ⁿ⁺² = 63M − 7 · 2ⁿ⁺² = 7 · (9M − 2ⁿ⁺²)** ✔

> **¿Cuál uso?** Las dos valen y puntuarían igual. La técnica 1 es más elegante cuando ves el reparto. La técnica 2 es más automática: no hay que ver nada, solo despejar y sustituir. Si te bloqueas con la 1, pasa a la 2.

5. **Conclusión.** Como P(k) es cierta para k = 0, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℕ.

## Ejemplo 4 · n³ + 2n es divisible por 3, para n ∈ ℤ⁺

**Explorar.** n = 1: 3. n = 2: 12. n = 3: 33. n = 4: 72. Todos múltiplos de 3.

1. **Enunciado.** Sea P(k): **k³ + 2k es divisible por 3**, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** 1³ + 2·1 = 3 = 3·1. Es múltiplo de 3.
3. **Hipótesis de inducción.** Para k = n: **n³ + 2n = 3M, con M ∈ ℤ**.
4. **Paso inductivo, k = n + 1.** Queremos llegar a: **(n + 1)³ + 2(n + 1) = 3 · (un entero)**.

Aquí no se pueden separar potencias: (n + 1)³ no es n³ multiplicado por algo. Lo que hacemos es **desarrollar y buscar la hipótesis dentro**:

**(n + 1)³ + 2(n + 1) = n³ + 3n² + 3n + 1 + 2n + 2**

**= (n³ + 2n) + 3n² + 3n + 3** (agrupo la hipótesis)

**= 3M + 3(n² + n + 1) = 3 · (M + n² + n + 1)** ✔

> **¿Por qué aquí sí desarrollamos, si en las sumas no?** Porque el objetivo es distinto. En las sumas el objetivo venía factorizado y factorizar nos acercaba. Aquí el objetivo es «múltiplo de 3», y para ver la hipótesis dentro de (n + 1)³ hay que abrirlo. Para desarrollar (n + 1)³ usa el binomio de Newton del mismo tema: coeficientes 1, 3, 3, 1.

> **¿Cómo sé qué agrupar?** Busca los términos de la hipótesis (aquí n³ y 2n) y júntalos. Lo que sobra tiene que ser múltiplo de 3. Si no lo es, o hay un error de cuentas o hace falta un lema (lo ves justo abajo).

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

## Variante 1 · Cuando lo que sobra necesita un lema

A veces, después de agrupar la hipótesis, lo que sobra no es múltiplo a simple vista. Ejemplo: **n³ − n es divisible por 6**. Al desarrollar sale:

**(n + 1)³ − (n + 1) = (n³ − n) + 3n² + 3n = 6M + 3n(n + 1)**

El 3 está claro, pero ¿de dónde sale el 2 que falta para llegar a 6? De un **lema**: *n(n + 1) es siempre par, porque de dos números consecutivos uno es par*. Entonces n(n + 1) = 2L y 3n(n + 1) = 6L. Queda **6M + 6L = 6(M + L)** ✔.

Un lema es un resultado pequeño que demuestras aparte (aquí, con una demostración directa como las de la diapositiva 15) y luego usas dentro de la demostración grande. Si en un ejercicio el sobrante «casi» es múltiplo, piensa en qué propiedad de los enteros te falta.

## Variante 2 · Cuando solo vale para los impares

Si el enunciado dice «para n impar», las fichas van de dos en dos: 1, 3, 5, … Entonces el caso base es k = 1, la hipótesis es para k = n (impar) y **el paso es a k = n + 2**, que es el siguiente impar. La técnica de potencias sigue igual, pero ahora separas xⁿ⁺² = x² · xⁿ.

=== D16·6 | Diapositiva 16, ejercicio 6 | 4ⁿ + 2 es divisible por 3
caso: k = 1
pide: 4ⁿ + 2 es divisible por 3
--- enunciado
Prove that **4ⁿ + 2 is divisible by 3** for n ∈ ℤ⁺.

*(Demuestra que 4ⁿ + 2 es divisible por 3, para n ∈ ℤ⁺.)*
--- pista Hipótesis y objetivo
Hipótesis: **4ⁿ + 2 = 3M**, con M ∈ ℤ. Objetivo: **4ⁿ⁺¹ + 2 = 3 · (un entero)**.
--- pista Separar la potencia
**4ⁿ⁺¹ = 4 · 4ⁿ**. Ahora tienes 4 · 4ⁿ + 2, y quieres que aparezca 4ⁿ + 2 entero.
--- pista El truco
Para que aparezca 4ⁿ + 2 entero necesitas 4·(4ⁿ + 2) = 4·4ⁿ + 8. Tienes +2 y no +8, así que compensa: **4 · 4ⁿ + 2 = 4(4ⁿ + 2) − 6**. También puedes despejar 4ⁿ = 3M − 2 y sustituir.
--- solucion
1. Sea P(k): 4ᵏ + 2 es divisible por 3, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** 4 + 2 = 6 = 3·2. Es múltiplo de 3.
3. **Hipótesis, k = n.** 4ⁿ + 2 = 3M, con M ∈ ℤ.
4. **Paso, k = n + 1.** Queremos llegar a 4ⁿ⁺¹ + 2 = 3 · (un entero).

**4ⁿ⁺¹ + 2 = 4 · 4ⁿ + 2 = 4(4ⁿ + 2) − 6** (compenso el 8 que he añadido)

**= 4 · 3M − 6 = 3 · (4M − 2)** (por la hipótesis) ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

=== D36·17 | Diapositiva 36, ejercicio 17 | 7ⁿ + 1 es divisible por 8, si n es impar
caso: k = 1
pide: 7ⁿ + 1 es divisible por 8, para n impar
--- enunciado
Demostrar por inducción que, si n es impar, **7ⁿ + 1 es divisible por 8**.
--- pista ¿Cuál es la siguiente ficha?
Si n es impar, n + 1 es par y no nos interesa. El siguiente impar es **n + 2**. Hipótesis: **7ⁿ + 1 = 8M**. Objetivo: **7ⁿ⁺² + 1 = 8 · (un entero)**.
--- pista Separar la potencia
**7ⁿ⁺² = 7² · 7ⁿ = 49 · 7ⁿ**.
--- pista El truco
Compensa como en el ejercicio D16·6: **49 · 7ⁿ + 1 = 49(7ⁿ + 1) − 48**. ¿Es 48 múltiplo de 8?
--- solucion
1. Sea P(k): 7ᵏ + 1 es divisible por 8, para k impar positivo.
2. **Caso base, k = 1.** 7 + 1 = 8 = 8·1.
3. **Hipótesis, k = n (impar).** 7ⁿ + 1 = 8M, con M ∈ ℤ.
4. **Paso, k = n + 2 (el siguiente impar).** Queremos llegar a 7ⁿ⁺² + 1 = 8 · (un entero).

**7ⁿ⁺² + 1 = 49 · 7ⁿ + 1 = 49(7ⁿ + 1) − 48** (compenso el 49 que he añadido)

**= 49 · 8M − 8 · 6 = 8 · (49M − 6)** (por la hipótesis) ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para un impar k = n también lo es para el siguiente impar k = n + 2, por el principio de inducción es cierta para todo k impar positivo.

> **¿Y para n par?** Prueba con n = 2: 49 + 1 = 50, que no es múltiplo de 8. Por eso el enunciado se limita a los impares y el dominó salta de 2 en 2. Lo ves en la tabla de explorar.

=== D16·7 | Diapositiva 16, ejercicio 7 | n³ + 11n es divisible por 3
caso: k = 1
pide: n³ + 11n es divisible por 3
--- enunciado
Use mathematical induction to prove that **n³ + 11n is divisible by 3** for n ∈ ℤ⁺.

*(Demuestra por inducción que n³ + 11n es divisible por 3, para n ∈ ℤ⁺.)*
--- pista Hipótesis y objetivo
Hipótesis: **n³ + 11n = 3M**. Objetivo: **(n + 1)³ + 11(n + 1) = 3 · (un entero)**.
--- pista Desarrollar
(n + 1)³ = n³ + 3n² + 3n + 1, con los coeficientes 1, 3, 3, 1 del triángulo de Pascal. Desarrolla también 11(n + 1).
--- pista Agrupar
Junta n³ y 11n, que son la hipótesis. ¿Qué sobra? Tiene que ser múltiplo de 3.
--- solucion
1. Sea P(k): k³ + 11k es divisible por 3, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** 1 + 11 = 12 = 3·4.
3. **Hipótesis, k = n.** n³ + 11n = 3M, con M ∈ ℤ.
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)³ + 11(n + 1) = 3 · (un entero).

**(n + 1)³ + 11(n + 1) = n³ + 3n² + 3n + 1 + 11n + 11**

**= (n³ + 11n) + 3n² + 3n + 12** (agrupo la hipótesis)

**= 3M + 3(n² + n + 4) = 3 · (M + n² + n + 4)** (por la hipótesis) ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

=== D16·8 | Diapositiva 16, ejercicio 8 | n(n² + 5) es divisible por 6
caso: k = 1
pide: n(n² + 5) es divisible por 6
--- enunciado
Prove by induction that **n(n² + 5) is divisible by 6** for n ∈ ℤ⁺.

*(Demuestra por inducción que n(n² + 5) es divisible por 6, para n ∈ ℤ⁺.)*
--- pista Reescribir
Antes de nada, desarrolla: **n(n² + 5) = n³ + 5n**. Hipótesis: n³ + 5n = 6M. Objetivo: (n + 1)³ + 5(n + 1) = 6 · (un entero).
--- pista Desarrollar y agrupar
Desarrolla (n + 1)³ y junta los términos de la hipótesis. Sale **(n³ + 5n) + 3n² + 3n + 6**.
--- pista El problema
El 6 es múltiplo de 6, pero 3n² + 3n = 3n(n + 1) solo tiene un 3 a la vista. ¿De dónde sacas el 2 que falta?
--- pista El lema
n y n + 1 son consecutivos, así que uno de los dos es par. Por tanto **n(n + 1) = 2L** y **3n(n + 1) = 6L**.
--- solucion
1. Sea P(k): k(k² + 5) es divisible por 6, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** 1·(1 + 5) = 6 = 6·1.
3. **Hipótesis, k = n.** n³ + 5n = 6M, con M ∈ ℤ.
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)³ + 5(n + 1) = 6 · (un entero).

**(n + 1)³ + 5(n + 1) = n³ + 3n² + 3n + 1 + 5n + 5 = (n³ + 5n) + 3n(n + 1) + 6** (agrupo la hipótesis)

**Lema.** n(n + 1) es par por ser producto de dos enteros consecutivos: n(n + 1) = 2L, con L ∈ ℤ.

**= 6M + 3 · 2L + 6 = 6 · (M + L + 1)** (por la hipótesis y el lema) ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.
