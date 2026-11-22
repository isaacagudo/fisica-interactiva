---
slug: generalizado
titulo: Binomio generalizado
nombre: Exponente negativo o fraccionario
corto: Generalizado
eyebrow: Apartado 4 · diapositivas 31 y 32
desc: (1 + x)ᵅ con α negativo o fraccionario es una serie infinita, válida solo si |x| < 1.
icono: generalizado
---
## Idea clave: la misma fórmula, pero no termina

El número combinatorio se puede definir para cualquier α con la forma simplificada:

**C(α, k) = (α(α − 1)···(α − k + 1))/k!**

Si α es natural, llega un momento en que un factor vale 0 y la suma se corta. Si no, **nunca se corta**: el desarrollo es una serie infinita.

**(1 + x)ᵅ = 1 + αx + (α(α − 1))/2!·x² + (α(α − 1)(α − 2))/3!·x³ + ⋯**

válido **solo si |x| < 1**.

> **¿Por qué |x| < 1?** Las potencias xᵏ tienen que hacerse cada vez más pequeñas para que la suma infinita dé un número, como en las series geométricas (sección 1). De hecho, (1 − x)⁻¹ = 1 + x + x² + ⋯ es la serie geométrica de razón x.

> **Si no empieza por 1.** (a + x)ᵅ = aᵅ·(1 + x/a)ᵅ. Se saca a factor común y la condición pasa a ser |x/a| < 1, es decir, |x| < |a|.

[[widget:generalizado|{"alfas":["-1","-3","1/2","-1/2","1/3"],"N":3}]]

## Ejemplo · Combinatorios generalizados (D31)

**C(−7, 3) = (−7·(−8)·(−9))/3! = −504/6 = −84**

**C(1/2, 3) = ((1/2)·(−1/2)·(−3/2))/3! = (3/8)/6 = 1/16**

## Ejemplo · (1 − x)⁻³ (D32)

α = −3 y el «x» de la fórmula es −x:

**(1 − x)⁻³ = 1 + (−3)(−x) + ((−3)(−4))/2!·(−x)² + ((−3)(−4)(−5))/3!·(−x)³ + ⋯**

**(1 − x)⁻³ = 1 + 3x + 6x² + 10x³ + ⋯**, válido si |x| < 1.

=== B10 | Nuevo | (1 + x)⁻¹
nivel: 1
pide: Cuatro primeros términos de (1 + x)⁻¹
resultado: **1 − x + x² − x³ + ⋯, |x| < 1**
widget: generalizado {"alfas":["-1"],"N":4}
--- enunciado
Escribe los **cuatro primeros términos** de **(1 + x)⁻¹** e indica para qué x es válido.
--- pista Coeficientes
α = −1: (α(α − 1))/2! = (−1)(−2)/2 = 1. Sigue igual con el de x³.
--- solucion
**(1 + x)⁻¹ = 1 + (−1)x + ((−1)(−2))/2!·x² + ((−1)(−2)(−3))/3!·x³ + ⋯**

**(1 + x)⁻¹ = 1 − x + x² − x³ + ⋯**, válido si |x| < 1.

Es la serie geométrica de razón −x: su suma es 1/(1 + x).

=== D32·1 | Diapositiva 32, ejercicio 1 | (1 − x)⁻³
nivel: 2
pide: Desarrollo de (1 − x)⁻³
resultado: **1 + 3x + 6x² + 10x³ + ⋯, |x| < 1**
--- enunciado
Calcula, desarrollando por Newton, **(1 − x)⁻³**.
--- pista Sustitución
Usa la fórmula de (1 + y)ᵅ con α = −3 e y = −x.
--- pista Signos
(−3)(−x) = 3x; (−3)(−4)/2 = 6 y (−x)² = x²…
--- solucion
**(1 − x)⁻³ = 1 + (−3)(−x) + ((−3)(−4))/2!·(−x)² + ((−3)(−4)(−5))/3!·(−x)³ + ⋯**

**(1 − x)⁻³ = 1 + 3x + 6x² + 10x³ + ⋯**

Válido si |−x| < 1, es decir, |x| < 1.

=== D32·2 | Diapositiva 32, ejercicio 2 | √(x + 2)
nivel: 3
pide: Desarrollo de √(x + 2)
resultado: **√2(1 + x/4 − x²/32 + ⋯), |x| < 2**
--- enunciado
Calcula, desarrollando por Newton, **(x + 2)^(1/2)**, es decir, √(x + 2).
--- pista Saca el 2
**(x + 2)^(1/2) = 2^(1/2)·(1 + x/2)^(1/2)**
--- pista Aplica la fórmula
α = 1/2 con y = x/2. (α(α − 1))/2! = (1/2)(−1/2)/2 = −1/8.
--- solucion
**(x + 2)^(1/2) = √2·(1 + x/2)^(1/2)**

**(1 + x/2)^(1/2) = 1 + (1/2)(x/2) − (1/8)(x/2)² + ⋯ = 1 + x/4 − x²/32 + ⋯**

**(x + 2)^(1/2) = √2(1 + x/4 − x²/32 + ⋯)**, válido si |x/2| < 1, es decir, **|x| < 2**.

=== D32·3 | Diapositiva 32, ejercicio 3 | (x + 3)⁻⁴
nivel: 3
pide: Desarrollo de (x + 3)⁻⁴
resultado: **1/81 − 4x/243 + 10x²/729 − ⋯, |x| < 3**
--- enunciado
Calcula, desarrollando por Newton, **(x + 3)⁻⁴**.
--- pista Saca el 3
(x + 3)⁻⁴ = 3⁻⁴·(1 + x/3)⁻⁴ = (1/81)(1 + x/3)⁻⁴.
--- pista Coeficientes con α = −4
−4, (−4)(−5)/2 = 10, (−4)(−5)(−6)/6 = −20.
--- solucion
**(x + 3)⁻⁴ = (1/81)·(1 + x/3)⁻⁴**

**(1 + x/3)⁻⁴ = 1 − 4(x/3) + 10(x/3)² − ⋯ = 1 − 4x/3 + 10x²/9 − ⋯**

**(x + 3)⁻⁴ = 1/81 − 4x/243 + 10x²/729 − ⋯**, válido si |x| < 3.

=== D32·4 | Diapositiva 32, ejercicio 4 | ∛(3x + 2)
nivel: 3
pide: Desarrollo de ∛(3x + 2)
resultado: **∛2(1 + x/2 − x²/4 + ⋯), |x| < 2/3**
--- enunciado
Calcula, desarrollando por Newton, **∛(3x + 2)**.
--- pista Exponente y factor común
**∛(3x + 2) = (2 + 3x)^(1/3) = 2^(1/3)·(1 + 3x/2)^(1/3)**
--- pista Coeficientes con α = 1/3
1/3 y (1/3)(−2/3)/2 = −1/9. Ahora y = 3x/2.
--- solucion
**∛(3x + 2) = ∛2·(1 + 3x/2)^(1/3)**

**(1 + 3x/2)^(1/3) = 1 + (1/3)(3x/2) − (1/9)(3x/2)² + ⋯ = 1 + x/2 − x²/4 + ⋯**

**∛(3x + 2) = ∛2(1 + x/2 − x²/4 + ⋯)**, válido si |3x/2| < 1, es decir, **|x| < 2/3**.

=== B11 | Nuevo | Aproximar una raíz
nivel: 3
pide: √(1 + x) hasta x² y aproximar √1,02
resultado: **√(1 + x) ≈ 1 + x/2 − x²/8 · √1,02 ≈ 1,00995**
widget: generalizado {"alfas":["1/2"],"N":3}
--- enunciado
1. Desarrolla **√(1 + x)** hasta el término en x².
2. Úsalo para aproximar **√1,02**.
--- pista Exponente
**√(1 + x) = (1 + x)^(1/2)**, así que α = 1/2.
--- pista El valor de x
1,02 = 1 + 0,02, y 0,02 está dentro de |x| < 1.
--- solucion
1. **(1 + x)^(1/2) = 1 + (1/2)x + ((1/2)(−1/2))/2!·x² + ⋯ = 1 + x/2 − x²/8 + ⋯**

2. Con x = 0,02:

**√1,02 ≈ 1 + 0,01 − 0,00005 = 1,00995**

(La calculadora da 1,0099504…: la aproximación acierta en cinco decimales.)
