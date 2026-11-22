---
slug: teorema-del-resto
titulo: Teorema del resto y del factor
nombre: Teorema del resto y del factor
corto: Resto y factor
eyebrow: Apartado 3
desc: El resto de dividir entre (x − a) es P(a). Con eso se hallan coeficientes desconocidos sin dividir.
icono: resto
---
## Idea clave: el resto es P(a)

**Teorema del resto.** El resto de dividir P(x) entre (x − a) es **P(a)**.

**Teorema del factor.** (x − a) es un factor de P(x) **⟺ P(a) = 0**.

> **¿Por qué?** Al dividir, P(x) = (x − a)·C(x) + r. Si sustituyes x = a, el primer sumando vale 0 y queda P(a) = r. Por eso no hace falta dividir: basta sustituir.

**Método para hallar coeficientes (D33·1, 2, 3, 5)**

1. Traduce cada frase del enunciado a una ecuación: «divisible por x + 1» ⟹ P(−1) = 0; «el resto entre x − 2 es 15» ⟹ P(2) = 15.
2. Sustituye y simplifica cada ecuación.
3. Resuelve el sistema.
4. Comprueba con Ruffini o sustituyendo.

## Ejemplo · Hallar k si x − 3 divide a x³ − 2x² + kx + 6

«x − 3 divide» ⟹ **P(3) = 0**:

**27 − 18 + 3k + 6 = 0 ⟹ 15 + 3k = 0 ⟹ k = −5**

Comprobación con Ruffini (1, −2, −5, 6 entre x − 3): sale 1, 1, −2 y resto 0 ✔.

[[widget:ruffini|{"p":[1,-2,-5,6],"a":3}]]

## Ejemplo · Dos condiciones: x³ + ax² + bx − 6 es divisible por x − 1 y por x + 2

**P(1) = 1 + a + b − 6 = 0 ⟹ a + b = 5**

**P(−2) = −8 + 4a − 2b − 6 = 0 ⟹ 2a − b = 7**

Sumando las dos ecuaciones: 3a = 12, **a = 4** y **b = 1**.

> **¿Por qué P(−2) y no P(2)?** Porque x + 2 = x − (−2). Es el error más frecuente de este apartado.

=== R7 | Nuevo | El resto sin dividir
nivel: 1
pide: Resto de x⁴ − 3x + 2 entre x + 1
resultado: **6**
widget: ruffini {"p":[1,0,0,-3,2],"a":-1}
--- enunciado
Halla, sin dividir, el resto de **(x⁴ − 3x + 2) ÷ (x + 1)**.
--- pista El valor de a
x + 1 = x − (−1): el resto es P(−1).
--- solucion
**P(−1) = (−1)⁴ − 3(−1) + 2 = 1 + 3 + 2 = 6**

El resto es **6**. Puedes comprobarlo con Ruffini en el simulador.

=== R8 | Nuevo | Hallar k con un factor
nivel: 1
pide: x³ + kx² − 4 tiene el factor x − 2
resultado: **k = −1**
--- enunciado
Halla k para que **(x − 2)** sea un factor de **x³ + kx² − 4**.
--- pista La condición
«x − 2 es factor» ⟺ P(2) = 0.
--- solucion
**P(2) = 8 + 4k − 4 = 0 ⟹ 4k = −4 ⟹ k = −1**

=== R9 | Nuevo | Factorizar con el teorema del factor
nivel: 2
pide: Factorizar x³ − 6x² + 11x − 6
resultado: **(x − 1)(x − 2)(x − 3)**
widget: ruffini {"p":[1,-6,11,-6],"a":1}
--- enunciado
Factoriza **x³ − 6x² + 11x − 6**.
--- pista Busca una raíz
Las raíces enteras dividen al término independiente, −6: prueba con 1, −1, 2, −2, 3… P(1) = 1 − 6 + 11 − 6 = 0.
--- pista Divide
Divide entre (x − 1) con Ruffini: sale x² − 5x + 6.
--- pista Termina
x² − 5x + 6 = 0 tiene raíces 2 y 3.
--- solucion
**P(1) = 1 − 6 + 11 − 6 = 0** ⟹ (x − 1) es factor.

Ruffini con a = 1: 1, −6, 11, −6 → 1, −5, 6 y resto 0. Cociente x² − 5x + 6 = (x − 2)(x − 3).

**x³ − 6x² + 11x − 6 = (x − 1)(x − 2)(x − 3)**

=== R10 | Nuevo | Dos condiciones
nivel: 2
pide: x³ + ax² + bx − 6 divisible por x − 1 y por x + 2
resultado: **a = 4, b = 1**
--- enunciado
El polinomio **x³ + ax² + bx − 6** es divisible por **x − 1** y por **x + 2**. Halla a y b.
--- pista Las dos ecuaciones
P(1) = 0 y P(−2) = 0.
--- pista El sistema
a + b = 5 y 4a − 2b = 14 (o 2a − b = 7). Suma las dos.
--- solucion
**P(1) = 1 + a + b − 6 = 0 ⟹ a + b = 5**

**P(−2) = −8 + 4a − 2b − 6 = 0 ⟹ 2a − b = 7**

Sumando: 3a = 12 ⟹ **a = 4**, y **b = 1**. Comprobación: x³ + 4x² + x − 6 = (x − 1)(x + 2)(x + 3) ✔.

=== D33·1 | Diapositiva 33, ejercicio 1 | Dos factores
nivel: 2
pide: x³ + ax² + bx + 2 divisible por x + 1 y por x − 2
resultado: **a = −2, b = −1**
--- enunciado
El polinomio **P(x) = x³ + ax² + bx + 2** es divisible por **x + 1** y por **x − 2**. Halle el valor de a y de b, donde a, b ∈ ℝ.
--- pista Las condiciones
Divisible por x + 1 ⟹ P(−1) = 0. Divisible por x − 2 ⟹ P(2) = 0.
--- pista Las ecuaciones
P(−1) = −1 + a − b + 2 ⟹ a − b = −1. P(2) = 8 + 4a + 2b + 2 ⟹ 2a + b = −5.
--- solucion
**P(−1) = −1 + a − b + 2 = 0 ⟹ a − b = −1**

**P(2) = 8 + 4a + 2b + 2 = 0 ⟹ 2a + b = −5**

Sumando: 3a = −6 ⟹ **a = −2**, y b = a + 1 = **−1**.

Comprobación: x³ − 2x² − x + 2 = (x + 1)(x − 1)(x − 2) ✔.

=== D33·2 | Diapositiva 33, ejercicio 2 | Un resto y un factor
nivel: 2
pide: f(x) = x⁴ + 3x³ + px² − 2x + q con resto 15 entre x − 2 y factor x + 3
resultado: **p = 3, q = −33**
--- enunciado
Cuando se divide **f(x) = x⁴ + 3x³ + px² − 2x + q** por **(x − 2)** el resto es igual a **15**, y **(x + 3)** es un factor de f(x). Halle los valores de p y q.
--- pista Traduce las frases
Resto 15 entre x − 2 ⟹ f(2) = 15. Factor x + 3 ⟹ f(−3) = 0.
--- pista Las ecuaciones
f(2) = 16 + 24 + 4p − 4 + q = 15 ⟹ 4p + q = −21. f(−3) = 81 − 81 + 9p + 6 + q = 0 ⟹ 9p + q = −6.
--- pista Resuelve
Resta las dos ecuaciones para eliminar q.
--- solucion
**f(2) = 16 + 24 + 4p − 4 + q = 15 ⟹ 4p + q = −21**

**f(−3) = 81 − 81 + 9p + 6 + q = 0 ⟹ 9p + q = −6**

Restando: 5p = 15 ⟹ **p = 3**, y q = −21 − 12 = **−33**.

=== D33·3 | Diapositiva 33, ejercicio 3 | Un resto siete veces el otro
nivel: 3
pide: q(x) = x³ + kx² − 7x + 3: resto entre x + 1 = 7 · resto entre x + 2
resultado: **k = −2**
--- enunciado
Cuando la función **q(x) = x³ + kx² − 7x + 3** se divide por **(x + 1)**, el resto es **siete veces mayor** que el resto que se obtiene cuando la función se divide por **(x + 2)**. Halle el valor de k.
--- pista Los dos restos
Resto entre x + 1: q(−1). Resto entre x + 2: q(−2).
--- pista Calcúlalos
q(−1) = −1 + k + 7 + 3 = k + 9. q(−2) = −8 + 4k + 14 + 3 = 4k + 9.
--- pista La ecuación
«Siete veces mayor»: q(−1) = 7·q(−2).
--- solucion
**q(−1) = −1 + k + 7 + 3 = k + 9**

**q(−2) = −8 + 4k + 14 + 3 = 4k + 9**

**k + 9 = 7(4k + 9) ⟹ k + 9 = 28k + 63 ⟹ −27k = 54 ⟹ k = −2**

Comprobación: con k = −2, q(−1) = 7 y q(−2) = 1, y 7 = 7·1 ✔.

=== D33·5 | Diapositiva 33, ejercicio 5 | El mismo resto
nivel: 3
pide: 3x⁵ − ax + b: mismo resto entre x − 1 y entre x + 1
resultado: **a = 3; b puede ser cualquier número real (b ∈ ℝ)**
--- enunciado
Cuando **3x⁵ − ax + b** se divide por **x − 1**, se obtiene el mismo resto que cuando se divide por **x + 1**. Sabiendo que a, b ∈ ℝ, halle:

1. el valor de a;
2. el conjunto de valores de b.
--- pista Los dos restos
P(1) = 3 − a + b y P(−1) = −3 + a + b.
--- pista Iguálalos
3 − a + b = −3 + a + b. ¿Qué le pasa a b?
--- solucion
**P(1) = 3 − a + b** y **P(−1) = −3 + a + b**.

**3 − a + b = −3 + a + b ⟹ 6 = 2a ⟹ a = 3**

La b desaparece de la ecuación: la condición se cumple sea cual sea b. Por eso el conjunto de valores de b es **todo ℝ**.

> **¿Por qué preguntan «el conjunto de valores»?** Es una pista: si te pidieran un número, b aparecería en la ecuación. Aquí se anula, y eso también es una respuesta.
