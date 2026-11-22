---
slug: aritmeticas
titulo: Progresiones aritméticas
nombre: Progresiones aritméticas
corto: Aritméticas
eyebrow: Apartado 2 · diapositiva 8
desc: Se suma siempre lo mismo. Término general aₙ = a₁ + (n − 1)d y suma Sₙ = n(a₁ + aₙ)/2.
icono: aritmetica
---
## Idea clave: se suma siempre lo mismo

En una progresión aritmética la **diferencia d** entre términos seguidos es constante.

**aₙ = a₁ + (n − 1)d**

**Sₙ = n(a₁ + aₙ)/2**

> **¿Por qué (n − 1)?** Para llegar al término n desde el primero das n − 1 saltos de tamaño d. Para el 1.º das 0 saltos.

> **¿De dónde sale la suma?** Es el truco de Gauss: si sumas la lista al derecho y al revés, cada pareja (a₁ + aₙ, a₂ + aₙ₋₁, …) vale lo mismo, y hay n parejas que cuentan el doble. Por eso se divide entre 2.

## Ejemplo · Dados a₃ = 11 y a₁₀ = 39, hallar a₁ y d

Escribe los dos términos con la fórmula y resta:

**a₁ + 2d = 11** y **a₁ + 9d = 39**

Restando: **7d = 28 ⟹ d = 4**, y a₁ = 11 − 8 = **3**. Término general: aₙ = 3 + (n − 1)·4 = 4n − 1.

> **Atajo.** Entre a₃ y a₁₀ hay 10 − 3 = 7 saltos: d = (39 − 11)/7 = 4.

## Ejemplo · Suma de los 20 primeros términos de 3, 7, 11, …

a₁ = 3, d = 4, a₂₀ = 3 + 19·4 = 79:

**S₂₀ = 20(3 + 79)/2 = 820**

=== S4 | Nuevo | Un término lejano
nivel: 1
pide: a₁ = 3, d = 4: a₂₀
resultado: **a₂₀ = 79**
--- enunciado
En una progresión aritmética, **a₁ = 3** y **d = 4**. Calcula **a₂₀**.
--- pista La fórmula
aₙ = a₁ + (n − 1)d con n = 20. Ojo: son 19 saltos.
--- solucion
**a₂₀ = 3 + 19·4 = 79**

=== S5 | Nuevo | ¿Cuántos términos hay?
nivel: 1
pide: 7, 11, 15, …, 203: número de términos
resultado: **50 términos**
--- enunciado
¿Cuántos términos tiene la progresión **7, 11, 15, …, 203**?
--- pista Plantea la ecuación
El último término es aₙ = 203. Escribe aₙ con a₁ = 7 y d = 4 y despeja n.
--- solucion
**7 + (n − 1)·4 = 203 ⟹ (n − 1)·4 = 196 ⟹ n − 1 = 49 ⟹ n = 50**

> **¿Por qué no 196/4 = 49?** Porque 49 son los saltos; los términos son uno más.

=== S6 | Nuevo | Suma de múltiplos de 3
nivel: 2
pide: Suma de los múltiplos de 3 menores que 100
resultado: **1683**
--- enunciado
Calcula la suma de todos los **múltiplos de 3 menores que 100**.
--- pista Primero y último
El primero es 3 y el último es 99. Es aritmética con d = 3.
--- pista ¿Cuántos hay?
3 + (n − 1)·3 = 99 ⟹ n = 33.
--- solucion
**n = 33** términos, de 3 a 99:

**S₃₃ = 33(3 + 99)/2 = 33·51 = 1683**

=== D8·1 | Diapositiva 8, ejemplo 1 | Dos términos conocidos
nivel: 1
pide: a₂ = 20 y a₇ = 55: término general
resultado: **d = 7, a₁ = 13, aₙ = 7n + 6**
--- enunciado
Encuentra el término general de una progresión aritmética sabiendo que **a₂ = 20** y **a₇ = 55**.
--- pista Las dos ecuaciones
a₁ + d = 20 y a₁ + 6d = 55.
--- pista Resta
Restando: 5d = 35.
--- solucion
**a₁ + d = 20** y **a₁ + 6d = 55**

Restando: **5d = 35 ⟹ d = 7**, y a₁ = 20 − 7 = **13**.

**aₙ = 13 + (n − 1)·7 = 7n + 6**

Comprobación: a₇ = 49 + 6 = 55 ✔.

=== D8·2 | Diapositiva 8, ejemplo 2 | Un sumatorio de 28 términos
nivel: 2
pide: Σ_(r=1)^(28) (5r − 4)
resultado: **1918**
--- enunciado
Calcula **Σ_(r=1)^(28) (5r − 4)**.
--- pista ¿Qué es?
5r − 4 es aritmética (d = 5). Son 28 términos.
--- pista Primero y último
r = 1 da 1 y r = 28 da 136.
--- solucion
Primer término **1**, último **136**, n = 28:

**S₂₈ = 28(1 + 136)/2 = 14·137 = 1918**
