---
titulo: Binomio de Newton
corto: Binomio
eyebrow: Matemáticas · Tema 1 · Sección 4
desc: Triángulo de Pascal, desarrollo de (a + b)ⁿ, término general, coeficientes concretos y binomio con exponente negativo o fraccionario (diapositivas 18 y 30 a 36).
portada: Triángulo de Pascal, desarrollo de (a + b)ⁿ, buscar un coeficiente con el término general y binomio generalizado (series para exponentes negativos y fraccionarios).
icono: binomio
---
## La idea: los coeficientes salen del recuento

Al multiplicar (a + b)(a + b)···(a + b), n veces, cada término sale de elegir **a** o **b** en cada paréntesis. El término con **bʳ** aparece tantas veces como formas hay de elegir los r paréntesis de los que sale b: **C(n, r)**. De ahí la fórmula:

**(a + b)ⁿ = Σ_(r=0)^(n) C(n, r)·aⁿ⁻ʳ·bʳ**

> **¿Por qué la sección 3 va antes?** Porque el número combinatorio que contaba grupos es exactamente el coeficiente del binomio. Pascal, recuento y binomio son la misma idea.

Las preguntas que te harán casi siempre son de cuatro tipos:

1. **Desarrollar** una potencia entera: (2 + x)⁴, (x − 4)⁵. Apartados 1 y 2.
2. **Buscar un coeficiente** o un término concreto (el de x³, el independiente) sin desarrollar todo. Apartado 3.
3. **Hallar n** a partir de un coeficiente. Apartado 3.
4. **Exponente negativo o fraccionario**: una serie infinita, válida solo si |x| < 1. Apartado 4.

[[widget:pascal|{"filas":10,"n":4}]]

[[apartados]]

## Las fórmulas en una tabla

| Qué | Fórmula | Cuándo se usa |
| --- | --- | --- |
| Desarrollo | **(a + b)ⁿ = Σ_(r=0)^(n) C(n, r)·aⁿ⁻ʳ·bʳ** | n entero positivo: n + 1 términos |
| Término general | **Tᵣ₊₁ = C(n, r)·aⁿ⁻ʳ·bʳ** | Buscar un coeficiente o un término |
| Pascal | **C(n, r) + C(n, r + 1) = C(n + 1, r + 1)** | Construir el triángulo |
| Simetría | **C(n, r) = C(n, n − r)** | Simplificar cuentas |
| Generalizado | **(1 + x)ᵅ = 1 + αx + (α(α − 1))/2!·x² + ⋯** | α negativo o fraccionario, solo si \|x\| < 1 |

> **Ojo con la notación de clase.** En la diapositiva 30 la fórmula se escribe con aʳ·bⁿ⁻ʳ. Como C(n, r) = C(n, n − r), da el mismo desarrollo, solo que empezando por el otro extremo. En el examen se usa la del cuadernillo del BI: Tᵣ₊₁ = C(n, r)·aⁿ⁻ʳ·bʳ.

## Errores típicos

| Error | Cómo se ve | Cómo evitarlo |
| --- | --- | --- |
| Olvidar el coeficiente dentro del paréntesis | (2x)³ = 2x³ | Eleva todo: (2x)³ = 8x³ |
| Perder el signo | (x − 4)⁵ con todos los signos + | Escribe b = −4 y eleva (−4)ʳ: los signos alternan |
| Confundir r con el número de término | «el 4.º término es r = 4» | Tᵣ₊₁: el 4.º término es r = 3 |
| Exponente de x mal | (x + 1/x)⁹: x⁹⁻ʳ·xʳ | (1/x)ʳ = x⁻ʳ: queda x⁹⁻²ʳ |
| Usar la serie fuera de su rango | (1 + x)⁻¹ con x = 3 | Solo vale si \|x\| < 1; con (a + x) saca a factor común |

## Vocabulario en inglés

*Binomial expansion* (desarrollo del binomio), *binomial coefficient* (número combinatorio), *Pascal's triangle* (triángulo de Pascal), *general term* (término general), *constant term / term independent of x* (término independiente), *coefficient of x³* (coeficiente de x³), *ascending powers of x* (potencias crecientes de x), *valid for |x| < 1* (válido si |x| < 1).

## Los ejercicios, clasificados

[[indice]]
