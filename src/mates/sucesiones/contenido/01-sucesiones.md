---
slug: sucesiones-y-sumatorios
titulo: Sucesiones, término general y sumatorios
nombre: Término general y sumatorios
corto: Término general
eyebrow: Apartado 1 · diapositivas 5 y 6
desc: Encontrar el término general de una sucesión y escribir una suma con Σ.
icono: sucesiones
---
## Idea clave: buscar el patrón

Una **sucesión** es una lista ordenada de números: a₁, a₂, a₃, … El **término general** aₙ es la fórmula que da cualquier término a partir de su posición n. Una **serie** es la suma de los términos de una sucesión.

**Método para encontrar el término general**

1. **Resta** términos seguidos. Si la diferencia es constante, es aritmética: aₙ = a₁ + (n − 1)d.
2. **Divide** términos seguidos. Si el cociente es constante, es geométrica: aₙ = a₁·Rⁿ⁻¹.
3. Si no, compara con **n²**, **2ⁿ** o **(−1)ⁿ**: 0, 3, 8, 15 son 1, 4, 9, 16 menos 1.
4. **Comprueba** la fórmula con dos o tres términos.

## Notación de sumatorio

**Σ_(r=1)^(5) (2r + 1)** significa: da a r los valores 1, 2, 3, 4 y 5 y suma lo que salga: 3 + 5 + 7 + 9 + 11 = 35.

> **¿Por qué la letra r?** Es solo un contador. Lo importante son los límites: desde qué valor empieza (abajo) y en cuál termina (arriba). El número de sumandos es (arriba − abajo + 1).

## Ejemplo · Término general de 5, 9, 13, 17, …

Diferencias: 9 − 5 = 4, 13 − 9 = 4, 17 − 13 = 4. Es aritmética con a₁ = 5 y d = 4:

**aₙ = 5 + (n − 1)·4 = 4n + 1**

Comprobación: a₃ = 4·3 + 1 = 13 ✔.

## Ejemplo · Escribir 2 + 6 + 18 + 54 con Σ

Cada término es el anterior por 3: 2·3⁰, 2·3¹, 2·3², 2·3³. Con r de 1 a 4:

**2 + 6 + 18 + 54 = Σ_(r=1)^(4) 2·3ʳ⁻¹**

> **¿Por qué 3ʳ⁻¹ y no 3ʳ?** Porque el primer término (r = 1) tiene que ser 2 = 2·3⁰. También vale Σ_(r=0)^(3) 2·3ʳ: cambian los límites, no la suma.

=== S1 | Nuevo | Término general de una aritmética
nivel: 1
pide: 2, 7, 12, 17, …: término general y a₂₀
resultado: **aₙ = 5n − 3**
--- enunciado
Encuentra el término general de **2, 7, 12, 17, …** y calcula a₂₀.
--- pista ¿Qué tipo es?
Resta términos seguidos: 7 − 2, 12 − 7, 17 − 12. ¿Sale siempre lo mismo?
--- pista La fórmula
Es aritmética con a₁ = 2 y d = 5: aₙ = a₁ + (n − 1)d.
--- solucion
Diferencia constante d = 5, así que es aritmética:

**aₙ = 2 + (n − 1)·5 = 5n − 3**

**a₂₀ = 5·20 − 3 = 97**

=== S2 | Nuevo | Términos a partir de la fórmula
nivel: 1
pide: aₙ = n² + 1: primeros términos y a₁₀
resultado: **2, 5, 10, 17; a₁₀ = 101**
--- enunciado
Una sucesión tiene término general **aₙ = n² + 1**. Escribe sus cuatro primeros términos y calcula a₁₀.
--- pista Sustituye
Pon n = 1, 2, 3, 4 en la fórmula.
--- solucion
a₁ = 1 + 1 = 2 · a₂ = 4 + 1 = 5 · a₃ = 9 + 1 = 10 · a₄ = 16 + 1 = 17 · **a₁₀ = 100 + 1 = 101**.

No es aritmética ni geométrica: las diferencias (3, 5, 7) crecen.

=== S3 | Nuevo | Escribir una suma con Σ
nivel: 1
pide: 2 + 4 + 6 + ⋯ + 20 con Σ
resultado: **Σ_(r=1)^(10) 2r = 110**
--- enunciado
Escribe **2 + 4 + 6 + ⋯ + 20** con notación de sumatorio y calcula su valor.
--- pista El término general
Los sumandos son los pares: 2r. ¿Para qué valores de r va de 2 a 20?
--- pista Calcula
Son 10 términos de una aritmética: S = n(a₁ + aₙ)/2.
--- solucion
**2 + 4 + 6 + ⋯ + 20 = Σ_(r=1)^(10) 2r**

**S₁₀ = 10(2 + 20)/2 = 110**

=== D6·1 | Diapositiva 6, ejemplo 1 | Término general de 6, 14, 22, 30
nivel: 1
pide: 6, 14, 22, 30, …
resultado: **aₙ = 8n − 2**
--- enunciado
Encuentra el término general de **6, 14, 22, 30, …**
--- pista ¿Qué tipo es?
Las diferencias son 8, 8, 8: es aritmética.
--- solucion
Aritmética con a₁ = 6 y d = 8:

**aₙ = 6 + (n − 1)·8 = 8n − 2**

Comprobación: a₄ = 32 − 2 = 30 ✔.

=== D6·2 | Diapositiva 6, ejemplo 2 | Término general de 1, −1/3, 1/9, −1/27
nivel: 2
pide: 1, −1/3, 1/9, −1/27, …
resultado: **aₙ = (−1/3)ⁿ⁻¹**
--- enunciado
Encuentra el término general de **1, −1/3, 1/9, −1/27, …**
--- pista ¿Se suma o se multiplica?
Las diferencias no son constantes. Divide: (−1/3)/1, (1/9)/(−1/3)…
--- pista El signo
El signo alterna: la razón es negativa.
--- solucion
Cada término es el anterior por **R = −1/3**. Es geométrica con a₁ = 1:

**aₙ = 1·(−1/3)ⁿ⁻¹ = (−1/3)ⁿ⁻¹**

Comprobación: a₄ = (−1/3)³ = −1/27 ✔.

=== D6·3 | Diapositiva 6, ejemplo 3 | Término general de 0, 3, 8, 15
nivel: 2
pide: 0, 3, 8, 15, …
resultado: **aₙ = n² − 1**
--- enunciado
Encuentra el término general de **0, 3, 8, 15, …**
--- pista Ni aritmética ni geométrica
Las diferencias son 3, 5, 7 (crecen de 2 en 2): eso huele a cuadrados.
--- pista Compara con n²
n² da 1, 4, 9, 16. ¿Qué diferencia hay con la sucesión?
--- solucion
Comparando con n² = 1, 4, 9, 16, cada término es uno menos:

**aₙ = n² − 1**

Comprobación: a₄ = 16 − 1 = 15 ✔.

=== D6·4 | Diapositiva 6, serie 1 | 8 + 5 + 2 − 1 − 4 con Σ
nivel: 2
pide: 8 + 5 + 2 − 1 − 4 con sumatorio
resultado: **Σ_(r=1)^(5) (11 − 3r)**
--- enunciado
Escribe **8 + 5 + 2 − 1 − 4** usando sumatorios.
--- pista El término general
Es aritmética con a₁ = 8 y d = −3: aᵣ = 8 + (r − 1)(−3).
--- solucion
**aᵣ = 8 − 3(r − 1) = 11 − 3r**, con r de 1 a 5:

**8 + 5 + 2 − 1 − 4 = Σ_(r=1)^(5) (11 − 3r)**

Comprobación: r = 5 da 11 − 15 = −4 ✔. La suma vale 10.

=== D6·5 | Diapositiva 6, serie 2 | 3 + 10 + 21 + 36 + 55 con Σ
nivel: 2
pide: 3 + 10 + 21 + 36 + 55 con sumatorio
resultado: **Σ_(r=1)^(5) r(2r + 1)**
--- enunciado
Escribe **3 + 10 + 21 + 36 + 55** usando sumatorios.
--- pista Descompón cada término
3 = 1·3, 10 = 2·5, 21 = 3·7, 36 = 4·9, 55 = 5·11.
--- pista El patrón
El primer factor es r; el segundo, los impares 3, 5, 7, …, es decir, 2r + 1.
--- solucion
**3 + 10 + 21 + 36 + 55 = Σ_(r=1)^(5) r(2r + 1)**

Comprobación: r = 3 da 3·7 = 21 ✔. La suma vale 125.

=== D6·6 | Diapositiva 6, serie 3 | 1 + 9 + 25 + 49 + 81 con Σ
nivel: 2
pide: 1 + 9 + 25 + 49 + 81 con sumatorio
resultado: **Σ_(r=1)^(5) (2r − 1)²**
--- enunciado
Escribe **1 + 9 + 25 + 49 + 81** usando sumatorios.
--- pista ¿Qué son?
Son cuadrados: 1², 3², 5², 7², 9².
--- pista Los impares
El impar número r es 2r − 1.
--- solucion
**1 + 9 + 25 + 49 + 81 = Σ_(r=1)^(5) (2r − 1)²**

La suma vale 165.
