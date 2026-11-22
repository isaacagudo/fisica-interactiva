---
slug: repeticion
titulo: Recuento con repetición
nombre: Con repetición
corto: Con repetición
eyebrow: Apartado 3 · diapositivas 20, 21 y 26
desc: Elementos que se pueden repetir (VR = nᵏ) y ordenaciones con elementos iguales (n!/(a!·b!·…)).
icono: repeticion
---
## Idea clave: dos maneras de «repetir»

**Variaciones con repetición**: en cada una de las k posiciones puede ir **cualquiera** de los n elementos, aunque ya haya salido.

**VR(n, k) = nᵏ**

> **¿Por qué nᵏ?** Principio de multiplicación: n opciones para la 1.ª posición, n para la 2.ª, …, n para la k-ésima. Son k factores iguales a n.

**Permutaciones con repetición**: se ordenan n elementos, pero algunos son **iguales** entre sí (a iguales de un tipo, b de otro…).

**PRₙ = n!/(a!·b!·…)** con a + b + ⋯ = n

> **¿Por qué se divide?** Si las letras iguales fueran distintas (R₁, R₂, R₃) habría n! ordenaciones. Pero al intercambiar las R entre sí la palabra no cambia: cada palabra se ha contado 3! veces. Se divide entre el factorial de cada grupo de iguales.

## Ejemplo · Lanzar una moneda 5 veces (D20)

Cada lanzamiento tiene 2 resultados, y pueden repetirse:

**VR(2, 5) = 2⁵ = 32**

## Ejemplo · Anagramas de HORROR (D21)

6 letras: H una vez, O dos veces, R tres veces.

**PR = 6!/(1!·2!·3!) = 720/12 = 60**

[[widget:enumerar|{"tipo":"PR","palabra":"HORROR","titulo":"Todas las palabras con las letras de HORROR"}]]

=== C7 | Nuevo | El PIN del móvil
nivel: 1
pide: PIN de 4 cifras (0 a 9)
resultado: **VR(10, 4) = 10⁴ = 10000**
--- enunciado
¿Cuántos **PIN de 4 cifras** distintos hay si cada cifra puede ser cualquiera del 0 al 9?
--- pista ¿Se puede repetir?
1123 es un PIN válido. ¿Cuántas opciones hay para cada posición?
--- solucion
Importa el orden y se pueden repetir cifras: **variaciones con repetición**.

**VR(10, 4) = 10⁴ = 10000**

(Del 0000 al 9999: son 10000 números, como debe ser.)

=== D20·2 | Diapositiva 20, ejemplo 2 | Una moneda 5 veces
nivel: 1
pide: Resultados al lanzar una moneda 5 veces
resultado: **VR(2, 5) = 2⁵ = 32**
--- enunciado
¿Cuántos **resultados distintos** podemos tener al lanzar **una moneda 5 veces**?
--- pista Cada lanzamiento
Cara o cruz, y puede salir cara varias veces.
--- solucion
Importa el orden (CCX no es XCC) y se repite: **variaciones con repetición**.

**VR(2, 5) = 2⁵ = 32**

=== C8 | Nuevo | Anagramas de CASA
nivel: 1
pide: Palabras con las letras de CASA
resultado: **4!/2! = 12**
widget: enumerar {"tipo":"PR","palabra":"CASA","titulo":"Todas las palabras con las letras de CASA"}
--- enunciado
¿Cuántas «palabras» distintas (tengan o no sentido) se pueden formar con **todas las letras de CASA**?
--- pista Letras iguales
Hay 4 letras, pero la A aparece dos veces.
--- solucion
Se ordenan todas, con la A repetida dos veces: **permutaciones con repetición**.

**4!/2! = 24/2 = 12**

=== D21 | Diapositiva 21 | Anagramas de HORROR
nivel: 2
pide: Palabras con las letras de HORROR
resultado: **6!/(1!·2!·3!) = 60**
widget: enumerar {"tipo":"PR","palabra":"HORROR","titulo":"Todas las palabras con las letras de HORROR"}
--- enunciado
¿Cuántas **palabras distintas** podemos hacer con las letras de la palabra **HORROR**?
--- pista Cuenta las letras
¿Cuántas veces aparece cada letra?
--- pista Fórmula
6 letras en total. Divide 6! entre el factorial de cada repetición.
--- solucion
H: 1, O: 2, R: 3 (en total 6). **Permutaciones con repetición**:

**6!/(1!·2!·3!) = 720/12 = 60**

=== C9 | Nuevo | Anagramas de MATEMATICAS
nivel: 2
pide: Palabras con las letras de MATEMATICAS
resultado: **11!/(2!·3!·2!) = 1663200**
--- enunciado
¿Cuántas palabras distintas se forman con **todas las letras de MATEMATICAS**?
--- pista Cuenta las letras
M, A, T, E, I, C, S. ¿Cuántas veces sale cada una? Comprueba que suman 11.
--- solucion
M: 2, A: 3, T: 2, E: 1, I: 1, C: 1, S: 1 (total 11).

**11!/(2!·3!·2!) = 39916800/24 = 1663200**

=== D26·4 | Diapositiva 26, ejemplo 4 | El código de la caja fuerte
nivel: 2
pide: 3 letras (de 26) y 2 cifras: distintas y con repetición
resultado: **Todos distintos: 1404000 · Con repetición: 1757600**
--- enunciado
Una caja fuerte tiene un código formado por **tres letras** (de 26) **y dos números** (del 0 al 9). ¿De cuántas formas se puede crear el código si deben ser **todos distintos**? ¿Y si **se pueden repetir**?
--- pista Dos partes
Primero las letras, luego los números, y se multiplica (principio de multiplicación). Supón que las letras van delante.
--- pista Todos distintos
Letras: variaciones V(26, 3). Números: V(10, 2).
--- pista Con repetición
Letras: 26³. Números: 10².
--- solucion
Importa el orden (ABC12 no es CBA21).

**Todos distintos: V(26, 3)·V(10, 2) = (26·25·24)·(10·9) = 15600·90 = 1404000**

**Con repetición: VR(26, 3)·VR(10, 2) = 26³·10² = 17576·100 = 1757600**

> **Si las letras y los números pudieran ir en cualquier posición** habría que multiplicar además por C(5, 2) = 10, las formas de elegir qué 2 de las 5 posiciones llevan número. El enunciado de clase entiende que van en bloques.
