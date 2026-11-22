---
slug: factorial
titulo: Factorial y número combinatorio
nombre: Factorial y número combinatorio
corto: Factorial
eyebrow: Apartado 1 · diapositivas 17 y 26
desc: n! = n·(n − 1)···1 y C(n, r) = n!/(r!·(n − r)!). Cómo simplificarlos sin calcular números enormes.
icono: factorial
---
## Idea clave: multiplicar hacia abajo y simplificar

**n! = n·(n − 1)·(n − 2)···2·1**

con el convenio **0! = 1**. Por ejemplo, 4! = 4·3·2·1 = 24.

> **¿Por qué 0! = 1?** Para que las fórmulas funcionen también en los extremos: C(n, 0) = n!/(0!·n!) debe valer 1, porque hay una sola manera de no elegir nada.

El **número combinatorio** «n sobre r» (en inglés *n choose r*, nCr en la calculadora):

**C(n, r) = n!/(r!·(n − r)!)**

> **¿Para qué sirve?** Cuenta de cuántas maneras se eligen r elementos entre n cuando el orden no importa (apartado 2), y da los coeficientes del binomio de Newton (sección 4).

## Ejemplo · C(7, 3) sin calcular 7!

El truco de la diapositiva 17: el 4! de abajo se come el final del 7! de arriba.

**C(7, 3) = 7!/(3!·4!) = (7·6·5·4!)/(3!·4!) = (7·6·5)/(3·2·1) = 35**

> **La forma simplificada.** Arriba se multiplican r números bajando desde n; abajo va r!. Por ejemplo, C(10, 3) = (10·9·8)/3!. Es mucho más rápida que calcular los factoriales enteros.

## Ejemplo · Simplificar un cociente de factoriales

**(n + 1)!/(n − 1)! = ((n + 1)·n·(n − 1)!)/(n − 1)!**

**(n + 1)!/(n − 1)! = n(n + 1)**

Se escribe el factorial grande «hasta llegar» al pequeño y se simplifica.

=== C1 | Nuevo | Factoriales pequeños
nivel: 1
pide: 5!, 0! y 6!/4!
resultado: **5! = 120 · 0! = 1 · 6!/4! = 30**
--- enunciado
Calcula **5!**, **0!** y **6!/4!** (este último sin calcular 6!).
--- pista Definición
5! = 5·4·3·2·1. ¿Cuánto vale 0! por convenio?
--- pista El cociente
6! = 6·5·4!. ¿Qué se simplifica?
--- solucion
**5! = 5·4·3·2·1 = 120**

**0! = 1** (por convenio).

**6!/4! = (6·5·4!)/4! = 6·5 = 30**

=== C2 | Nuevo | Números combinatorios
nivel: 1
pide: C(6, 2) y C(10, 8)
resultado: **C(6, 2) = 15 · C(10, 8) = 45**
--- enunciado
Calcula **C(6, 2)** y **C(10, 8)** con la forma simplificada.
--- pista C(6, 2)
Arriba, dos factores bajando desde 6; abajo, 2!.
--- pista C(10, 8)
Elegir 8 de 10 es lo mismo que dejar fuera 2: C(10, 8) = C(10, 2).
--- solucion
**C(6, 2) = (6·5)/(2·1) = 15**

**C(10, 8) = C(10, 2) = (10·9)/(2·1) = 45**

> **¿Por qué C(n, r) = C(n, n − r)?** Cada vez que eliges r elementos estás dejando fuera los otros n − r: hay tantos grupos de un tipo como del otro.

=== C3 | Nuevo | Simplificar con letras
nivel: 1
pide: (n + 1)!/n! y n!/(n − 2)!
resultado: **(n + 1)!/n! = n + 1 · n!/(n − 2)! = n(n − 1)**
--- enunciado
Simplifica **(n + 1)!/n!** y **n!/(n − 2)!**.
--- pista Escribe hasta el pequeño
(n + 1)! = (n + 1)·n!. Y n! = n·(n − 1)·(n − 2)!.
--- solucion
**(n + 1)!/n! = ((n + 1)·n!)/n! = n + 1**

**n!/(n − 2)! = (n(n − 1)·(n − 2)!)/(n − 2)! = n(n − 1)**

=== D26·3 | Diapositiva 26, ejemplo 3 | 8! − 6! y 9! + 8!
nivel: 2
pide: 8! − 6! y 9! + 8!
resultado: **8! − 6! = 39600 · 9! + 8! = 403200**
--- enunciado
Calcula **8! − 6!** y **9! + 8!**.
--- pista Factor común
No se puede restar «8 − 6». Saca factor común el factorial más pequeño: 8! = 8·7·6!.
--- pista El segundo
9! = 9·8!. Saca factor común 8!.
--- solucion
**8! − 6! = 8·7·6! − 6! = 6!(56 − 1) = 720·55 = 39600**

**9! + 8! = 9·8! + 8! = 8!(9 + 1) = 40320·10 = 403200**

> **Error típico.** 8! − 6! no es (8 − 6)! = 2!. Los factoriales no se restan entre sí: hay que sacar factor común.

=== C4 | Nuevo | Una ecuación con combinatorios
nivel: 2
pide: Resolver C(n, 2) = 28
resultado: **n = 8**
--- enunciado
Halla n sabiendo que **C(n, 2) = 28**.
--- pista Forma simplificada
C(n, 2) = n(n − 1)/2.
--- pista La ecuación
n(n − 1) = 56. ¿Qué dos números seguidos multiplican 56? O resuelve la ecuación de segundo grado.
--- solucion
**n(n − 1)/2 = 28 ⟹ n² − n − 56 = 0 ⟹ (n − 8)(n + 7) = 0**

La solución negativa no vale (n cuenta elementos), así que **n = 8**. Comprobación: C(8, 2) = (8·7)/2 = 28.
