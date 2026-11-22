---
slug: pascal
titulo: Triángulo de Pascal y números combinatorios
nombre: Triángulo de Pascal
corto: Pascal
eyebrow: Apartado 1 · diapositivas 17, 18 y 34
desc: Cada fila del triángulo da los coeficientes de (a + b)ⁿ. Propiedades de C(n, r) que ahorran cuentas.
icono: pascal
---
## Idea clave: cada número es la suma de los dos de encima

La fila n del triángulo (empezando a contar en 0) está formada por **C(n, 0), C(n, 1), …, C(n, n)**, y son los coeficientes de (a + b)ⁿ.

**C(n, r) + C(n, r + 1) = C(n + 1, r + 1)**

**C(n, r) = C(n, n − r)** (el triángulo es simétrico)

> **¿Por qué se suman los de encima?** Para elegir r + 1 elementos entre n + 1, fíjate en uno concreto: o lo eliges (y te faltan r entre los otros n) o no lo eliges (y eliges los r + 1 entre los otros n). Son C(n, r) + C(n, r + 1) maneras.

> **Dos cosas más.** Cada fila suma 2ⁿ (es (1 + 1)ⁿ), y (a + b)ⁿ tiene **n + 1 términos**.

[[widget:pascal|{"filas":10,"n":5}]]

## Ejemplo · Desarrollar (a + b)⁴ con el triángulo

Fila 4: 1, 4, 6, 4, 1. Los exponentes de a bajan de 4 a 0 y los de b suben de 0 a 4:

**(a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴**

=== B1 | Nuevo | La fila 5
nivel: 1
pide: Fila 5 del triángulo y desarrollo de (a + b)⁵
resultado: **1, 5, 10, 10, 5, 1 · (a + b)⁵ = a⁵ + 5a⁴b + 10a³b² + 10a²b³ + 5ab⁴ + b⁵**
widget: pascal {"filas":6,"n":4}
--- enunciado
Escribe la **fila 5** del triángulo de Pascal a partir de la fila 4 (1, 4, 6, 4, 1) y desarrolla **(a + b)⁵**.
--- pista Sumar los de encima
Los extremos son 1. Cada número interior es la suma de los dos que tiene encima: 1 + 4, 4 + 6…
--- pista Los exponentes
Los de a bajan de 5 a 0; los de b suben de 0 a 5. En cada término suman 5.
--- solucion
Fila 5: **1, 5, 10, 10, 5, 1** (1 + 4 = 5, 4 + 6 = 10, 6 + 4 = 10, 4 + 1 = 5).

**(a + b)⁵ = a⁵ + 5a⁴b + 10a³b² + 10a²b³ + 5ab⁴ + b⁵**

Comprobación: 1 + 5 + 10 + 10 + 5 + 1 = 32 = 2⁵.

=== B2 | Nuevo | El término central
nivel: 1
pide: Número de términos de (a + b)¹⁰ y término central
resultado: **11 términos · central: T₆ = C(10, 5)·a⁵b⁵ = 252a⁵b⁵**
--- enunciado
¿Cuántos términos tiene el desarrollo de **(a + b)¹⁰**? Escribe el **término central**.
--- pista Número de términos
r va de 0 a 10.
--- pista El central
Con 11 términos, el central es el 6.º, es decir, r = 5.
--- solucion
r toma los valores 0, 1, …, 10: hay **11 términos**. El central es el 6.º (r = 5):

**T₆ = C(10, 5)·a⁵·b⁵ = 252a⁵b⁵**

=== D34·7 | Diapositiva 34, ejercicio 7 | Resta de combinatorios
nivel: 2
pide: Simplificar C(n, 3) − C(2n, 2), n ≥ 3
resultado: **C(n, 3) − C(2n, 2) = n(n² − 15n + 8)/6**
--- enunciado
Simplifique la resta de coeficientes binomiales **C(n, 3) − C(2n, 2)**, donde n ≥ 3.
--- pista Forma simplificada
C(n, 3) = n(n − 1)(n − 2)/3! y C(2n, 2) = 2n(2n − 1)/2!.
--- pista Denominador común
Pasa todo a sextos y saca n factor común.
--- solucion
**C(n, 3) = (n(n − 1)(n − 2))/6 = (n³ − 3n² + 2n)/6**

**C(2n, 2) = (2n(2n − 1))/2 = n(2n − 1) = (12n² − 6n)/6**

**C(n, 3) − C(2n, 2) = (n³ − 15n² + 8n)/6 = (n(n² − 15n + 8))/6**

Comprobación con n = 3: C(3, 3) − C(6, 2) = 1 − 15 = −14, y 3(9 − 45 + 8)/6 = −14.
