---
slug: geometricas
titulo: Progresiones geométricas y series infinitas
nombre: Geométricas y series infinitas
corto: Geométricas
eyebrow: Apartado 3 · diapositivas 2, 3 y 12
desc: Se multiplica siempre por lo mismo. Suma finita y suma infinita, que solo existe si −1 < R < 1.
icono: geometrica
---
## Idea clave: se multiplica siempre por lo mismo

En una progresión geométrica el **cociente R** (razón) entre términos seguidos es constante.

**aₙ = a₁·Rⁿ⁻¹**

**Sₙ = (a₁ − aₙ·R)/(1 − R)** (también se escribe Sₙ = a₁(1 − Rⁿ)/(1 − R))

**S∞ = a₁/(1 − R)**, solo si **−1 < R < 1**

> **¿Por qué la suma infinita solo existe si |R| < 1?** Porque entonces Rⁿ se hace cada vez más pequeño y los términos casi no añaden nada: las sumas parciales se acercan a un número. Si |R| ≥ 1, los términos no se hacen pequeños y la suma crece sin parar (o oscila). Muévelo en el simulador.

[[widget:serie|{"a1":0.9,"R":0.1}]]

## Ejemplo · Aquiles y la tortuga (D2 y D3)

0,9 + 0,09 + 0,009 + ⋯ es geométrica con a₁ = 0,9 y R = 0,1. Como |R| < 1:

**S∞ = 0,9/(1 − 0,1) = 0,9/0,9 = 1**

Infinitos sumandos, suma finita: Aquiles alcanza a la tortuga.

## Ejemplo · 0,333… como fracción

0,333… = 0,3 + 0,03 + 0,003 + ⋯, geométrica con a₁ = 0,3 y R = 0,1:

**S∞ = 0,3/(1 − 0,1) = 0,3/0,9 = 1/3**

=== S7 | Nuevo | ¿Qué tipo de sucesión es?
nivel: 1
pide: 3, 6, 12, 24 · 2, 5, 8, 11 · 1, 4, 9, 16 · 81, −27, 9, −3
resultado: **Geométrica (R = 2) · aritmética (d = 3) · ninguna (cuadrados) · geométrica (R = −1/3)**
--- enunciado
Di si cada sucesión es aritmética, geométrica o ninguna de las dos, y da su d o su R:

1. 3, 6, 12, 24, …
2. 2, 5, 8, 11, …
3. 1, 4, 9, 16, …
4. 81, −27, 9, −3, …
--- pista Resta y divide
Para cada una, calcula a₂ − a₁ y a₃ − a₂. Si no coinciden, calcula a₂/a₁ y a₃/a₂.
--- solucion
1. Cocientes 2, 2, 2: **geométrica, R = 2**.
2. Diferencias 3, 3, 3: **aritmética, d = 3**.
3. Diferencias 3, 5, 7 y cocientes 4, 9/4: **ninguna** (son los cuadrados n²).
4. Cocientes −27/81 = −1/3, 9/(−27) = −1/3: **geométrica, R = −1/3**.

=== S8 | Nuevo | Término general de una geométrica
nivel: 1
pide: 3, 6, 12, 24, …: aₙ y a₈
resultado: **aₙ = 3·2ⁿ⁻¹; a₈ = 384**
--- enunciado
Escribe el término general de **3, 6, 12, 24, …** y calcula **a₈**.
--- pista La razón
R = 6/3 = 2 y a₁ = 3.
--- solucion
**aₙ = 3·2ⁿ⁻¹** y **a₈ = 3·2⁷ = 3·128 = 384**.

=== S9 | Nuevo | ¿Converge?
nivel: 2
pide: 4 + 4,8 + 5,76 + ⋯ y 8 − 4 + 2 − 1 + ⋯
resultado: **La primera no converge (R = 1,2); la segunda sí: S∞ = 16/3**
widget: serie {"a1":8,"R":-0.5}
--- enunciado
¿Tienen suma infinita estas series? Si la tienen, calcúlala.

1. 4 + 4,8 + 5,76 + ⋯
2. 8 − 4 + 2 − 1 + ⋯
--- pista Las razones
1: R = 4,8/4 = 1,2. 2: R = −4/8 = −1/2.
--- pista La condición
Solo hay S∞ si −1 < R < 1.
--- solucion
1. **R = 1,2 > 1**: los términos crecen y la suma no tiene límite. **No converge.**
2. **R = −1/2**, entre −1 y 1. Converge:

**S∞ = 8/(1 − (−1/2)) = 8/(3/2) = 16/3**

=== S10 | Nuevo | Un decimal periódico
nivel: 2
pide: 0,454545… como fracción
resultado: **5/11**
--- enunciado
Escribe **0,454545…** como fracción usando una serie geométrica.
--- pista La serie
0,4545… = 0,45 + 0,0045 + 0,000045 + ⋯
--- pista La razón
Cada término es el anterior entre 100: R = 0,01.
--- solucion
**0,4545… = 0,45 + 0,0045 + ⋯**, con a₁ = 0,45 y R = 0,01:

**S∞ = 0,45/(1 − 0,01) = 0,45/0,99 = 45/99 = 5/11**

=== D2·1 | Diapositivas 2 y 3 | Aquiles y la tortuga
nivel: 1
pide: 0,9 + 0,09 + 0,009 + ⋯
resultado: **S∞ = 1**
widget: serie {"a1":0.9,"R":0.1}
--- enunciado
La distancia que recorre Aquiles hasta alcanzar a la tortuga se representa con la serie **0,9 + 0,09 + 0,009 + 0,0009 + ⋯** ¿La suma será finita o infinita?
--- pista ¿Qué tipo es?
Cada término es el anterior entre 10: geométrica con R = 0,1.
--- pista La condición
Como −1 < 0,1 < 1, existe S∞.
--- solucion
Geométrica con **a₁ = 0,9** y **R = 0,1**, y |R| < 1:

**S∞ = 0,9/(1 − 0,1) = 1**

La suma es **finita** aunque tenga infinitos sumandos.

=== D12·1 | Diapositiva 12, ejemplo 1 | La razón
nivel: 1
pide: Razón de 2,5, 5, 10, …
resultado: **R = 2**
--- enunciado
Encuentra la razón de la progresión **2,5, 5, 10, …**
--- pista Divide
R = a₂/a₁.
--- solucion
**R = 5/2,5 = 2** (y 10/5 = 2 ✔).

=== D12·2 | Diapositiva 12, ejemplo 2 | Una suma infinita
nivel: 1
pide: Σ_(k=1)^(∞) 1/2ᵏ
resultado: **1**
widget: serie {"a1":0.5,"R":0.5}
--- enunciado
Calcula **Σ_(k=1)^(∞) 1/2ᵏ**.
--- pista Escríbela
1/2 + 1/4 + 1/8 + ⋯: geométrica con a₁ = 1/2 y R = 1/2.
--- solucion
**a₁ = 1/2**, **R = 1/2**, |R| < 1:

**S∞ = (1/2)/(1 − 1/2) = (1/2)/(1/2) = 1**
