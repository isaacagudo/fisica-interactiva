---
slug: directa
titulo: Demostración directa
nombre: Demostración directa
corto: Directa
eyebrow: Apartado 1 · diapositivas 14 y 15
desc: Traducir a álgebra (par = 2k, impar = 2m + 1, x divide a y ⟺ y = x·a), operar y llegar a la forma que se pide.
icono: directa
---
## Idea clave: traducir, operar y reconocer

1. **Traduce** las hipótesis a álgebra: n par ⟹ n = 2k.
2. **Opera** con la expresión que te piden.
3. **Reconoce** la forma de la conclusión: 2·(entero) es par; 2·(entero) + 1 es impar; x·(entero) es múltiplo de x; (entero)² es cuadrado perfecto.
4. **Di** por qué lo que queda entre paréntesis es un entero.

> **¿Por qué no basta con ejemplos?** Porque hay infinitos números. Al escribir n = 2k, la cuenta vale para todos los pares a la vez: k representa a cualquiera.

## Ejemplo · El producto de dos impares es impar

Sean a = 2k + 1 y b = 2m + 1, con k, m ∈ ℤ (letras distintas: son dos impares cualesquiera).

**a·b = (2k + 1)(2m + 1) = 4km + 2k + 2m + 1 = 2(2km + k + m) + 1**

Como 2km + k + m es un entero, a·b tiene la forma 2·(entero) + 1: **es impar**.

## Ejemplo · Si x divide a y, entonces x divide a y·z

«x divide a y» significa **y = x·a** con a ∈ ℤ. Entonces

**y·z = x·a·z = x·(az)**

y como az es entero, **x divide a y·z**.

=== M1 | Nuevo | La suma de dos pares es par
nivel: 1
pide: par + par = par
resultado: **2k + 2m = 2(k + m)**
--- enunciado
Demuestra que la suma de dos números pares es par.
--- pista Traduce
Dos pares cualesquiera: 2k y 2m, con k, m ∈ ℤ.
--- pista Opera
Suma y saca factor común 2.
--- solucion
Sean a = 2k y b = 2m, con k, m ∈ ℤ.

**a + b = 2k + 2m = 2(k + m)**

Como k + m es entero, a + b es de la forma 2·(entero): **es par**.

=== M2 | Nuevo | La suma de dos impares es par
nivel: 1
pide: impar + impar = par
resultado: **(2k + 1) + (2m + 1) = 2(k + m + 1)**
--- enunciado
Demuestra que la suma de dos números impares es par.
--- pista Traduce
2k + 1 y 2m + 1.
--- solucion
Sean a = 2k + 1 y b = 2m + 1, con k, m ∈ ℤ.

**a + b = 2k + 2m + 2 = 2(k + m + 1)**

Como k + m + 1 es entero, **a + b es par**.

=== M3 | Nuevo | El producto de dos consecutivos es par
nivel: 2
pide: n(n + 1) es par
resultado: **Por casos: si n = 2k, n(n + 1) = 2k(2k + 1); si n = 2k + 1, n(n + 1) = 2(2k + 1)(k + 1)**
--- enunciado
Demuestra que el producto de dos enteros consecutivos, n(n + 1), es siempre par.
--- pista Dos casos
n puede ser par o impar. Haz cada caso por separado.
--- pista El caso impar
Si n = 2k + 1, entonces n + 1 = 2k + 2 = 2(k + 1).
--- solucion
**Caso 1: n par**, n = 2k. Entonces **n(n + 1) = 2k(2k + 1) = 2·[k(2k + 1)]**, que es par.

**Caso 2: n impar**, n = 2k + 1. Entonces n + 1 = 2(k + 1) y **n(n + 1) = 2·[(2k + 1)(k + 1)]**, que es par.

En los dos casos n(n + 1) es par. Este resultado es el **lema** que se usa en la inducción del D16·8.

=== M4 | Nuevo | Un impar al cuadrado menos 1
nivel: 2
pide: Si n es impar, n² − 1 es múltiplo de 8
resultado: **n² − 1 = 4k(k + 1), y k(k + 1) es par**
--- enunciado
Demuestra que si n es impar, **n² − 1** es múltiplo de 8.
--- pista Traduce y opera
n = 2k + 1: n² − 1 = 4k² + 4k = 4k(k + 1).
--- pista El 2 que falta
k(k + 1) es el producto de dos consecutivos (ejercicio M3).
--- solucion
Sea n = 2k + 1. Entonces

**n² − 1 = 4k² + 4k + 1 − 1 = 4k(k + 1)**

Como k(k + 1) es par (M3), k(k + 1) = 2L con L ∈ ℤ, y **n² − 1 = 8L**: es múltiplo de 8.

=== D14·1 | Diapositiva 14, ejemplo 1 | Par más impar
nivel: 1
pide: La suma de un número par y otro impar es impar
resultado: **2k + (2m + 1) = 2(k + m) + 1**
--- enunciado
Demuestra de forma directa que **la suma de un número par y otro impar es impar**.
--- pista Traduce
El par es 2k y el impar es 2m + 1, con letras distintas.
--- solucion
Sean a = 2k y b = 2m + 1, con k, m ∈ ℤ.

**a + b = 2k + 2m + 1 = 2(k + m) + 1**

Como k + m es entero, a + b es de la forma 2·(entero) + 1: **es impar**.

=== D15·1 | Diapositiva 15, ejercicio 1 | El cuadrado de un par
nivel: 1
pide: El cuadrado de un par es par
resultado: **(2k)² = 2·(2k²)**
--- enunciado
Prove that the square of any even number is also even.

*(Demuestra que el cuadrado de cualquier número par es par.)*
--- pista Traduce
n = 2k. Calcula n².
--- solucion
Sea n = 2k, con k ∈ ℤ.

**n² = (2k)² = 4k² = 2·(2k²)**

Como 2k² es entero, **n² es par**.

=== D15·2 | Diapositiva 15, ejercicio 2 | El cuadrado de un impar
nivel: 1
pide: Si n es impar, n² es impar
resultado: **(2k + 1)² = 2(2k² + 2k) + 1**
--- enunciado
Prove that if n is an odd integer then n² is also an odd integer.

*(Demuestra que si n es impar, n² también es impar.)*
--- pista Traduce
n = 2k + 1. Desarrolla el cuadrado.
--- pista Busca la forma
4k² + 4k + 1: saca 2 factor común de los dos primeros términos.
--- solucion
Sea n = 2k + 1, con k ∈ ℤ.

**n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1**

Como 2k² + 2k es entero, **n² es impar**.

> **Para qué sirve.** Leído al revés, dice que si n² es par, n no puede ser impar: **n² par ⟹ n par**. Es la pieza que hace falta para demostrar que √2 es irracional (D14·2).

=== D15·3 | Diapositiva 15, ejercicio 3 | Divide a la suma
nivel: 2
pide: Si x divide a y y a z, divide a y + z
resultado: **y + z = xa + xb = x(a + b)**
--- enunciado
Let x, y and z be integers. Prove directly that if x divides y and x divides z, then x also divides y + z.

*(Si x divide a y y a z, demuestra que x divide a y + z.)*
--- pista Traduce
«x divide a y» ⟺ y = x·a, con a ∈ ℤ. Igual con z = x·b.
--- solucion
Como x divide a y y a z, existen a, b ∈ ℤ con **y = xa** y **z = xb**.

**y + z = xa + xb = x(a + b)**

Como a + b es entero, **x divide a y + z**.

=== D15·4 | Diapositiva 15, ejercicio 4 | Producto de cuadrados perfectos
nivel: 1
pide: Si m y n son cuadrados perfectos, mn también
resultado: **mn = a²b² = (ab)²**
--- enunciado
Let m and n be perfect square integers. Show that mn is also a perfect square integer.

*(Si m y n son cuadrados perfectos, demuestra que mn también lo es.)*
--- pista Traduce
m = a² y n = b², con a, b ∈ ℤ.
--- solucion
Sean **m = a²** y **n = b²**, con a, b ∈ ℤ.

**mn = a²b² = (ab)²**

Como ab es entero, **mn es un cuadrado perfecto**.

=== D15·5 | Diapositiva 15, ejercicio 5 | 7n + 4 es par
nivel: 1
pide: Si n es par, 7n + 4 es par
resultado: **7·2k + 4 = 2(7k + 2)**
--- enunciado
If n is an even integer, prove that 7n + 4 is also an even integer.

*(Si n es par, demuestra que 7n + 4 también es par.)*
--- pista Traduce
n = 2k.
--- solucion
Sea n = 2k, con k ∈ ℤ.

**7n + 4 = 14k + 4 = 2(7k + 2)**

Como 7k + 2 es entero, **7n + 4 es par**.

=== D15·6 | Diapositiva 15, ejercicio 6 | (−1)ⁿ con n par
nivel: 2
pide: Si n es par, (−1)ⁿ = 1
resultado: **(−1)²ᵏ = ((−1)²)ᵏ = 1ᵏ = 1**
--- enunciado
Show that if n is any even integer, then (−1)ⁿ = 1.

*(Si n es par, demuestra que (−1)ⁿ = 1.)*
--- pista Traduce
n = 2k. Usa la propiedad de las potencias (aᵇ)ᶜ = aᵇᶜ.
--- solucion
Sea n = 2k, con k ∈ ℤ.

**(−1)ⁿ = (−1)²ᵏ = ((−1)²)ᵏ = 1ᵏ = 1**

=== D15·7 | Diapositiva 15, ejercicio 7 | Un cuadrado perfecto escondido
nivel: 2
pide: 4(n² + n + 1) − 3n² es cuadrado perfecto
resultado: **n² + 4n + 4 = (n + 2)²**
--- enunciado
Prove that for all integers n, 4(n² + n + 1) − 3n² is a perfect square.

*(Demuestra que, para todo entero n, 4(n² + n + 1) − 3n² es un cuadrado perfecto.)*
--- pista Desarrolla
4n² + 4n + 4 − 3n². Simplifica.
--- pista Reconoce
n² + 4n + 4 es una identidad notable.
--- solucion
**4(n² + n + 1) − 3n² = 4n² + 4n + 4 − 3n² = n² + 4n + 4 = (n + 2)²**

Como n + 2 es entero, **es un cuadrado perfecto**.
