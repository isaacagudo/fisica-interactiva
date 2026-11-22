---
slug: desarrollo
titulo: Desarrollo del binomio
nombre: Desarrollar (a + b)ⁿ
corto: Desarrollo
eyebrow: Apartado 2 · diapositivas 30, 34 y 35
desc: Escribir todos los términos de (a + b)ⁿ con sus coeficientes, signos y potencias, y usarlo para aproximar.
icono: binomio
---
## Idea clave: coeficiente · potencia de a · potencia de b

**(a + b)ⁿ = C(n, 0)aⁿ + C(n, 1)aⁿ⁻¹b + C(n, 2)aⁿ⁻²b² + ⋯ + C(n, n)bⁿ**

El método:

1. **Identifica a y b con su signo y su coeficiente**: en (5 − x)⁴, a = 5 y b = −x.
2. **Coeficientes**: la fila n del triángulo o C(n, r).
3. **Potencias**: las de a bajan de n a 0; las de b suben de 0 a n.
4. **Opera cada término** y elévalo todo: (−x)³ = −x³, (2x)² = 4x².

> **¿Por qué alternan los signos con una resta?** Porque b = −x y (−x)ʳ es positivo con r par y negativo con r impar.

## Ejemplo · (x + 3)⁴ (D30)

Coeficientes 1, 4, 6, 4, 1; a = x, b = 3:

**(x + 3)⁴ = x⁴ + 4x³·3 + 6x²·3² + 4x·3³ + 3⁴**

**(x + 3)⁴ = x⁴ + 12x³ + 54x² + 108x + 81**

## Ejemplo · Aproximar 1,01⁵

1,01 = 1 + 0,01. Los términos con potencias altas de 0,01 son diminutos:

**1,01⁵ = 1 + 5·0,01 + 10·0,01² + ⋯ ≈ 1 + 0,05 + 0,001 = 1,051**

(El valor exacto es 1,0510100501.)

=== B3 | Nuevo | (x + 1)³
nivel: 1
pide: Desarrollar (x + 1)³
resultado: **x³ + 3x² + 3x + 1**
--- enunciado
Desarrolla **(x + 1)³**.
--- pista Coeficientes
Fila 3: 1, 3, 3, 1.
--- solucion
**(x + 1)³ = x³ + 3x²·1 + 3x·1² + 1³ = x³ + 3x² + 3x + 1**

=== B4 | Nuevo | (x − 2)³
nivel: 1
pide: Desarrollar (x − 2)³
resultado: **x³ − 6x² + 12x − 8**
--- enunciado
Desarrolla **(x − 2)³**.
--- pista El signo
b = −2. Calcula (−2)¹, (−2)² y (−2)³.
--- solucion
Con a = x, b = −2 y coeficientes 1, 3, 3, 1:

**(x − 2)³ = x³ + 3x²(−2) + 3x(−2)² + (−2)³**

**(x − 2)³ = x³ − 6x² + 12x − 8**

=== D30·1 | Diapositiva 30, ejercicio 1 | (x + 4)²
nivel: 1
pide: Desarrollar (x + 4)²
resultado: **x² + 8x + 16**
--- enunciado
Calcula, desarrollando por Newton, **(x + 4)²**.
--- pista Coeficientes
Fila 2: 1, 2, 1.
--- solucion
**(x + 4)² = x² + 2·x·4 + 4² = x² + 8x + 16**

=== D30·2 | Diapositiva 30, ejercicio 2 | (2 + x)³
nivel: 1
pide: Desarrollar (2 + x)³
resultado: **8 + 12x + 6x² + x³**
--- enunciado
Calcula, desarrollando por Newton, **(2 + x)³**.
--- pista Coeficientes y potencias
Fila 3: 1, 3, 3, 1. Las potencias de 2 bajan de 3 a 0.
--- solucion
**(2 + x)³ = 2³ + 3·2²·x + 3·2·x² + x³ = 8 + 12x + 6x² + x³**

=== D30·3 | Diapositiva 30, ejercicio 3 | (5 − x)⁴
nivel: 2
pide: Desarrollar (5 − x)⁴
resultado: **625 − 500x + 150x² − 20x³ + x⁴**
--- enunciado
Calcula, desarrollando por Newton, **(5 − x)⁴**.
--- pista a y b
a = 5, b = −x. Fila 4: 1, 4, 6, 4, 1.
--- pista Término a término
5⁴ = 625, 5³ = 125, 5² = 25. Los signos alternan.
--- solucion
**(5 − x)⁴ = 5⁴ + 4·5³(−x) + 6·5²(−x)² + 4·5(−x)³ + (−x)⁴**

**(5 − x)⁴ = 625 − 500x + 150x² − 20x³ + x⁴**

=== D30·4 | Diapositiva 30, ejercicio 4 | (x − 4)⁵
nivel: 2
pide: Desarrollar (x − 4)⁵
resultado: **x⁵ − 20x⁴ + 160x³ − 640x² + 1280x − 1024**
--- enunciado
Calcula, desarrollando por Newton, **(x − 4)⁵**.
--- pista Coeficientes
Fila 5: 1, 5, 10, 10, 5, 1. b = −4.
--- pista Potencias de −4
(−4)¹ = −4, (−4)² = 16, (−4)³ = −64, (−4)⁴ = 256, (−4)⁵ = −1024.
--- solucion
**(x − 4)⁵ = x⁵ + 5x⁴(−4) + 10x³·16 + 10x²(−64) + 5x·256 + (−1024)**

**(x − 4)⁵ = x⁵ − 20x⁴ + 160x³ − 640x² + 1280x − 1024**

Comprobación con x = 5: (5 − 4)⁵ = 1, y 3125 − 12500 + 20000 − 16000 + 6400 − 1024 = 1.

=== B5 | Nuevo | Aproximar una potencia
nivel: 2
pide: 1,02⁶ con los tres primeros términos
resultado: **1,02⁶ ≈ 1 + 0,12 + 0,006 = 1,126**
--- enunciado
Usa los **tres primeros términos** del desarrollo de (1 + x)⁶ para aproximar **1,02⁶**.
--- pista El valor de x
1,02 = 1 + 0,02.
--- pista Los tres términos
1 + 6x + 15x².
--- solucion
**(1 + x)⁶ = 1 + 6x + 15x² + ⋯**

Con x = 0,02:

**1,02⁶ ≈ 1 + 0,12 + 15·0,0004 = 1 + 0,12 + 0,006 = 1,126**

(El valor exacto es 1,126162419…: el error está en la cuarta cifra decimal.)

=== D34·9 | Diapositiva 34, ejercicio 9 | (2 + x)⁴ y 2,1⁴
nivel: 2
pide: Desarrollo de (2 + x)⁴ y valor exacto de 2,1⁴
resultado: **16 + 32x + 24x² + 8x³ + x⁴ · 2,1⁴ = 19,4481**
--- enunciado
1. Escriba y simplifique el desarrollo de **(2 + x)⁴** en potencias ascendentes de x.
2. A partir de lo anterior, halle el valor exacto de **(2,1)⁴**.
--- pista El desarrollo
Fila 4: 1, 4, 6, 4, 1, con potencias de 2 que bajan de 4 a 0.
--- pista El valor de x
2,1 = 2 + 0,1. Sustituye x = 0,1 en todos los términos (sin cortar: piden el valor exacto).
--- solucion
1. **(2 + x)⁴ = 16 + 4·8x + 6·4x² + 4·2x³ + x⁴ = 16 + 32x + 24x² + 8x³ + x⁴**

2. Con x = 0,1:

**2,1⁴ = 16 + 3,2 + 0,24 + 0,008 + 0,0001 = 19,4481**

=== D35·11 | Diapositiva 35, ejercicio 11 | Un producto de binomios
nivel: 3
pide: Tres primeros términos de (1 − 2x)⁵(1 + x)⁷
resultado: **1 − 3x − 9x²**
--- enunciado
Determine los **tres primeros términos** en el desarrollo de **(1 − 2x)⁵(1 + x)⁷**.
--- pista Solo hasta x²
Desarrolla cada factor solo hasta x²: lo demás no puede dar términos de grado 2 o menor.
--- pista Los dos factores
(1 − 2x)⁵ = 1 − 10x + 40x² + ⋯ y (1 + x)⁷ = 1 + 7x + 21x² + ⋯
--- pista Multiplica con cuidado
x² sale de 1·21x², de (−10x)(7x) y de 40x²·1.
--- solucion
**(1 − 2x)⁵ = 1 + 5(−2x) + 10(−2x)² + ⋯ = 1 − 10x + 40x² + ⋯**

**(1 + x)⁷ = 1 + 7x + 21x² + ⋯**

Al multiplicar, solo se quedan los productos de grado 0, 1 y 2:

**1 + (7 − 10)x + (21 − 70 + 40)x² = 1 − 3x − 9x²**
