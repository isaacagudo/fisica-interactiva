---
slug: termino
titulo: Término general y coeficientes
nombre: Término general
corto: Término general
eyebrow: Apartado 3 · diapositivas 34 a 36
desc: Tᵣ₊₁ = C(n, r)·aⁿ⁻ʳ·bʳ. Buscar el coeficiente de una potencia, el término independiente o el valor de n.
icono: termino
---
## Idea clave: igualar la potencia de x

**Tᵣ₊₁ = C(n, r)·aⁿ⁻ʳ·bʳ**

Para encontrar el coeficiente de xᵏ sin desarrollar todo:

1. **Escribe el término general** con a y b tal como vienen (coeficientes y signos incluidos).
2. **Junta las potencias de x** y escribe el exponente en función de r.
3. **Iguala a k** y despeja r. Si r no es un entero entre 0 y n, **no hay término** y el coeficiente es 0.
4. **Sustituye r** y calcula el coeficiente (sin la x).

> **¿Por qué r + 1?** El primer término es r = 0, así que el término con r es el número r + 1. El 4.º término es r = 3.

> **Término independiente** es el coeficiente de x⁰: se iguala el exponente a 0.

[[widget:termino|{"ca":"1","ea":1,"cb":"1","eb":-1,"n":9,"k":-1}]]

## Ejemplo · Coeficiente de x³ en (2x − 1)⁶

**Tᵣ₊₁ = C(6, r)·(2x)⁶⁻ʳ·(−1)ʳ = C(6, r)·2⁶⁻ʳ·(−1)ʳ·x⁶⁻ʳ**

Exponente: 6 − r = 3, así que r = 3:

**C(6, 3)·2³·(−1)³ = 20·8·(−1) = −160**

=== B6 | Nuevo | Un coeficiente sencillo
nivel: 1
pide: Coeficiente de x² en (1 + x)⁸
resultado: **C(8, 2) = 28**
widget: termino {"ca":"1","ea":0,"cb":"1","eb":1,"n":8,"k":2}
--- enunciado
Halla el **coeficiente de x²** en el desarrollo de **(1 + x)⁸**.
--- pista Término general
Tᵣ₊₁ = C(8, r)·1⁸⁻ʳ·xʳ. ¿Qué r da x²?
--- solucion
**Tᵣ₊₁ = C(8, r)·xʳ**. Para x², r = 2:

**C(8, 2) = (8·7)/2 = 28**

=== B7 | Nuevo | Un término concreto
nivel: 1
pide: 3.er término de (x + 2)⁵
resultado: **T₃ = C(5, 2)·x³·2² = 40x³**
--- enunciado
Escribe el **tercer término** del desarrollo de **(x + 2)⁵** (en potencias decrecientes de x).
--- pista ¿Qué r?
El tercer término es Tᵣ₊₁ con r + 1 = 3.
--- solucion
r = 2:

**T₃ = C(5, 2)·x³·2² = 10·4x³ = 40x³**

=== B8 | Nuevo | Coeficiente con signo
nivel: 2
pide: Coeficiente de x³ en (2x − 1)⁶
resultado: **−160**
widget: termino {"ca":"2","ea":1,"cb":"-1","eb":0,"n":6,"k":3}
--- enunciado
Halla el **coeficiente de x³** en el desarrollo de **(2x − 1)⁶**.
--- pista Término general
Tᵣ₊₁ = C(6, r)·(2x)⁶⁻ʳ·(−1)ʳ. ¿Qué potencia de x lleva?
--- pista Iguala
6 − r = 3.
--- solucion
**Tᵣ₊₁ = C(6, r)·2⁶⁻ʳ·(−1)ʳ·x⁶⁻ʳ**. Para x³: 6 − r = 3, r = 3.

**C(6, 3)·2³·(−1)³ = 20·8·(−1) = −160**

=== B9 | Nuevo | Término independiente
nivel: 2
pide: Término independiente de (x² + 1/x)⁶
resultado: **C(6, 4) = 15**
widget: termino {"ca":"1","ea":2,"cb":"1","eb":-1,"n":6,"k":0}
--- enunciado
Halla el **término independiente de x** en el desarrollo de **(x² + 1/x)⁶**.
--- pista Potencias de x
(x²)⁶⁻ʳ = x¹²⁻²ʳ y (1/x)ʳ = x⁻ʳ. Súmalas.
--- pista Iguala a 0
12 − 3r = 0.
--- solucion
**Tᵣ₊₁ = C(6, r)·(x²)⁶⁻ʳ·(1/x)ʳ = C(6, r)·x¹²⁻³ʳ**

Independiente: 12 − 3r = 0, r = 4.

**T₅ = C(6, 4) = 15**

=== D36·14 | Diapositiva 36, ejercicio 14 | (x + 1/x)⁹
nivel: 2
pide: Coeficientes de 1/x y de 1/x² en (x + 1/x)⁹
resultado: **De 1/x: 126 · de 1/x²: 0 (no hay término)**
widget: termino {"ca":"1","ea":1,"cb":"1","eb":-1,"n":9,"k":-1}
--- enunciado
Determine los coeficientes de **1/x** y de **1/x²** en el desarrollo de **(x + 1/x)⁹**.
--- pista Potencia de x
Tᵣ₊₁ = C(9, r)·x⁹⁻ʳ·x⁻ʳ = C(9, r)·x⁹⁻²ʳ.
--- pista Iguala
1/x = x⁻¹: 9 − 2r = −1. Y para 1/x²: 9 − 2r = −2. ¿Sale r entero?
--- solucion
**Tᵣ₊₁ = C(9, r)·x⁹⁻ʳ·(1/x)ʳ = C(9, r)·x⁹⁻²ʳ**

**1/x**: 9 − 2r = −1, r = 5. Coeficiente **C(9, 5) = 126**.

**1/x²**: 9 − 2r = −2, r = 11/2, que no es entero. **No hay término en 1/x²: su coeficiente es 0.**

> **¿Por qué falla?** 9 − 2r siempre es impar, así que solo aparecen potencias impares de x.

=== D34·6 | Diapositiva 34, ejercicio 6 | Hallar n
nivel: 3
pide: (1 + x/2)ⁿ con coeficiente de x³ igual a 70: n y coeficiente de x²
resultado: **n = 16 · coeficiente de x²: 30**
widget: termino {"ca":"1","ea":0,"cb":"1/2","eb":1,"n":16,"k":3}
--- enunciado
Cuando **(1 + x/2)ⁿ**, n ∈ ℕ, se desarrolla en potencias ascendentes de x, el **coeficiente de x³ es 70**.
1. Halle el valor de n.
2. A partir de lo anterior, halle el coeficiente de x².
--- pista Coeficiente de x³
Tᵣ₊₁ = C(n, r)·(x/2)ʳ. Con r = 3: C(n, 3)/8.
--- pista La ecuación
C(n, 3) = 560, es decir, n(n − 1)(n − 2) = 3360. Busca tres números seguidos que multipliquen eso (prueba cerca de ∛3360 ≈ 15).
--- solucion
1. **C(n, 3)·(1/2)³ = 70 ⟹ C(n, 3) = 560 ⟹ n(n − 1)(n − 2) = 3360**

16·15·14 = 3360, así que **n = 16**.

2. **C(16, 2)·(1/2)² = 120/4 = 30**

=== D36·15 | Diapositiva 36, ejercicio 15 | Dos binomios con el mismo coeficiente
nivel: 3
pide: n con igual coeficiente de x² en (1 + x)²ⁿ y (1 + 15x²)ⁿ
resultado: **n = 8**
--- enunciado
Calcule el valor entero positivo de n para que los **coeficientes de x²** en los desarrollos de **(1 + x)²ⁿ** y **(1 + 15x²)ⁿ** sean iguales.
--- pista Primer binomio
El coeficiente de x² en (1 + x)²ⁿ es C(2n, 2).
--- pista Segundo binomio
En (1 + 15x²)ⁿ, x² sale con r = 1: C(n, 1)·15.
--- solucion
**C(2n, 2) = (2n(2n − 1))/2 = n(2n − 1)** y **C(n, 1)·15 = 15n**

**n(2n − 1) = 15n ⟹ 2n − 1 = 15 ⟹ n = 8**

(n = 0 no vale: se pide un entero positivo.)
