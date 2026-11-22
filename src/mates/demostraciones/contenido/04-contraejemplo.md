---
slug: contraejemplo
titulo: Contraejemplos
nombre: Contraejemplo
corto: Contraejemplo
eyebrow: Apartado 4 · diapositivas 14, 16 y 36
desc: Para demostrar que una afirmación «para todo» es falsa basta un caso que la incumpla, comprobado.
icono: contraejemplo
---
## Idea clave: basta un caso, pero comprobado

Una afirmación del tipo «para todo n, …» es falsa si hay **un solo caso** que la incumple. Ese caso es un **contraejemplo**.

1. **Sospecha.** Si una afirmación te parece falsa, prueba primero los valores «raros»: 0, 1, 2, negativos, decimales, números primos.
2. **Comprueba** que tu caso cumple la hipótesis («si n² es divisible por 4…») y **no** la conclusión («…n es divisible por 4»).
3. **Escríbelo**: «Para n = 2, n² = 4 es divisible por 4 pero n = 2 no lo es. La afirmación es falsa».

> **Cuidado con el orden inverso.** Muchos ejemplos que cumplen la afirmación no demuestran que sea cierta. Un solo contraejemplo sí demuestra que es falsa.

[[widget:contraejemplo|{"ids":["n2div4","n2mas4","impares","euler","primos","cuadrados","mn2"]}]]

## Ejemplo · «Todos los números de la forma 2ⁿ − 1 son primos»

n = 2: 3 (primo). n = 3: 7 (primo). Pero **n = 4: 2⁴ − 1 = 15 = 3·5**, que no es primo. La afirmación es falsa.

## Ejemplo · «Si a > b, entonces a² > b²»

Con positivos parece cierta, pero con negativos falla: **a = 1, b = −2**. Se cumple a > b (1 > −2), pero a² = 1 y b² = 4, así que a² < b². Es falsa.

=== M7 | Nuevo | Todo primo es impar
nivel: 1
pide: «Todo número primo es impar»
resultado: **Falso: 2 es primo y es par**
widget: contraejemplo {"id":"primos"}
--- enunciado
Demuestra que la afirmación **«todo número primo es impar»** es falsa.
--- pista Prueba los primeros
¿Cuál es el primer número primo?
--- solucion
**2** es primo (solo es divisible por 1 y por sí mismo) y es par. Es un contraejemplo: la afirmación es **falsa**.

=== M8 | Nuevo | Cuadrados iguales
nivel: 1
pide: «Si a² = b², entonces a = b»
resultado: **Falso: a = 1, b = −1**
widget: contraejemplo {"id":"cuadrados"}
--- enunciado
Encuentra un contraejemplo para **«si a² = b², entonces a = b»** (a, b ∈ ℤ).
--- pista Los negativos
Un número y su opuesto tienen el mismo cuadrado.
--- solucion
**a = 1, b = −1**: a² = 1 = b², pero a ≠ b. La afirmación es **falsa**.

=== M9 | Nuevo | Una fórmula de primos que falla
nivel: 2
pide: «n² − n + 11 es primo para todo n ∈ ℤ⁺»
resultado: **Falso: n = 11 da 121 = 11²**
widget: contraejemplo {"id":"mn2"}
--- enunciado
¿Es cierto que **n² − n + 11 es primo para todo n ∈ ℤ⁺**?
--- pista Prueba con el 11
Si n = 11, los dos primeros términos se anulan entre sí.
--- solucion
Para **n = 11**: 121 − 11 + 11 = 121 = 11·11, que no es primo. La afirmación es **falsa** (aunque se cumple para n = 1, 2, …, 10).

=== D14·4 | Diapositiva 14, ejemplo 4 | Divisible por 4
nivel: 1
pide: «Si n² es divisible por 4, entonces n es divisible por 4»
resultado: **Falso: n = 2 (4 es divisible por 4, pero 2 no)**
widget: contraejemplo {"id":"n2div4"}
--- enunciado
Encuentra un contraejemplo: **si n ∈ ℤ y n² es divisible por 4, entonces n es divisible por 4**.
--- pista Prueba números pares pequeños
Si n es par, n² siempre es divisible por 4. ¿Y n?
--- solucion
**n = 2**: n² = 4 es divisible por 4, pero n = 2 no lo es. La afirmación es **falsa**. (También sirven 6, 10, 14…)

=== D16·3 | Diapositiva 16, ejercicio 3 | n² + 4 > 5
nivel: 1
pide: «Para todo n ∈ ℝ, n² + 4 > 5»
resultado: **Falso: n = 0 da 4 (o n = 1 da 5, que no es mayor que 5)**
widget: contraejemplo {"id":"n2mas4"}
--- enunciado
Find a counterexample that disproves the statement «for all n ∈ ℝ, n² + 4 > 5».

*(Encuentra un contraejemplo de «para todo n real, n² + 4 > 5».)*
--- pista Valores pequeños
¿Qué pasa con n = 0? ¿Y con n = 1?
--- solucion
**n = 0**: 0 + 4 = 4, que no es mayor que 5. La afirmación es **falsa**.

También sirve n = 1 (5 no es mayor que 5) o cualquier n con −1 ≤ n ≤ 1.

=== D36·16 | Diapositiva 36, ejercicio 16 | Tres impares consecutivos
nivel: 2
pide: ¿El producto de 3 impares consecutivos es siempre divisible por 6?
resultado: **No: 1·3·5 = 15; un producto de impares es impar, así que nunca es divisible por 6**
widget: contraejemplo {"id":"impares"}
--- enunciado
Determinar si **el producto de 3 números impares consecutivos es siempre divisible por 6**.
--- pista Prueba el primero
1·3·5 = ?
--- pista ¿Por qué falla siempre?
Para ser divisible por 6 hay que ser par. ¿Puede ser par un producto de impares?
--- solucion
**Contraejemplo: 1·3·5 = 15**, que no es divisible por 6. La afirmación es **falsa**.

De hecho, falla siempre: el producto de impares es impar (como en el ejemplo del apartado 1), y un impar nunca es divisible por 2, ni por tanto por 6.

> **Una trampa de examen.** El enunciado invita a demostrarlo, pero es falso. Por eso conviene probar siempre algún caso antes de empezar una demostración.
