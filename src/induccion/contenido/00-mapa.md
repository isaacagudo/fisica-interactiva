---
titulo: Demostración por inducción
eyebrow: Matemáticas · Tema 1 · Secuencias, series y demostraciones
desc: La idea del dominó, la plantilla que sirve para todos los ejercicios, los tres patrones (sumas, divisibilidad y desigualdades) y los ejercicios del tema con pistas paso a paso.
---
## Cómo usar esta sección

La inducción sirve para demostrar que algo es cierto **para todos los números naturales** a partir de uno dado. En el Tema 1 aparece casi siempre con tres caras: **sumas**, **divisibilidad** y **desigualdades**. Cada una tiene su truco para el paso inductivo. El objetivo es que, al leer un enunciado, reconozcas cuál es y sepas qué hacer.

1. Lee esta página: la idea y la plantilla son iguales para todos los ejercicios.
2. Después, cada apartado explica un patrón con ejemplos resueltos paso a paso. Los ejemplos **no** son los ejercicios de tu profesor: esos quedan para que practiques tú.
3. Por último, los ejercicios, de menos a más dentro de cada patrón: primero unos nuevos y sencillos (la suma de los enteros, de los pares, de los impares…) para coger soltura, y después los de las diapositivas. Cada uno tiene una tabla para explorar los primeros casos, pistas que se abren de una en una cuando te atascas y la solución completa.

[[apartados]]

## La idea: el efecto dominó

Para tirar una fila infinita de fichas de dominó bastan dos cosas: **que caiga la primera** y **que cada ficha, al caer, tire a la siguiente**. Si se cumplen las dos, caen todas, aunque nunca las veas caer una a una.

La inducción es exactamente eso, con números en lugar de fichas:

| Dominó | Inducción | Qué haces tú |
| --- | --- | --- |
| Empujar la primera ficha | **Caso base** | Comprobar que la afirmación es cierta para el primer número (casi siempre 1) |
| Cada ficha tira a la siguiente | **Paso inductivo** | Demostrar que *si* es cierta para un número cualquiera n, *entonces* también lo es para n + 1 |
| Caen todas | **Conclusión** | Por el principio de inducción, es cierta para todos los números desde el primero |

[[domino]]

Fíjate en el «si» del paso inductivo. No demuestras que la afirmación sea cierta para n: lo **supones** (eso es la *hipótesis de inducción*) y lo usas como herramienta para llegar a n + 1. Es como decir: «no sé si esta ficha ha caído, pero si cae, empuja a la siguiente».

> **¿Por qué no basta con comprobar muchos casos?** Porque hay infinitos números y no puedes probarlos todos. Hay fórmulas que funcionan durante mucho tiempo y de repente fallan: n² + n + 41 da un número primo para n = 0, 1, 2, …, 39, y para n = 40 da 1681 = 41 · 41. Comprobar casos te da confianza; solo la demostración te da la certeza.

> **¿De dónde salen las fórmulas?** La inducción **demuestra**, pero no **descubre**. La fórmula tiene que venir antes: normalmente de mirar una tabla con los primeros casos y adivinar el patrón. La inducción confirma que lo que has adivinado es cierto siempre.

### El ejemplo de clase, visto con esta idea

Tu profesor pone este ejemplo:

**1 + 2 + 3 + ⋯ + (n − 1) + n + (n − 1) + ⋯ + 3 + 2 + 1 = n²**

Primero, una tabla para ver que parece cierto:

| n | Suma | Resultado | n² |
| --- | --- | --- | --- |
| 1 | 1 | 1 | 1 |
| 2 | 1 + 2 + 1 | 4 | 4 |
| 3 | 1 + 2 + 3 + 2 + 1 | 9 | 9 |
| 4 | 1 + 2 + 3 + 4 + 3 + 2 + 1 | 16 | 16 |

Ahora la pregunta clave de la inducción: **¿qué cambia al pasar de n a n + 1?** Compara las filas 3 y 4: la suma nueva es la vieja con dos números más en el centro, el 3 y el 4. En general, al pasar de n a n + 1 se añaden **n** y **n + 1**. Por tanto, si la suma vieja vale n²:

**suma nueva = n² + n + (n + 1) = n² + 2n + 1 = (n + 1)²**

Que es justo lo que la fórmula dice para n + 1. Si es cierto para un n, es cierto para el siguiente. Y como para n = 1 es cierto, cae toda la fila.

Esta es la pregunta que vas a hacerte en **todos** los ejercicios: *¿cómo se construye el caso n + 1 a partir del caso n?* En las sumas, añadiendo un término; en divisibilidad, multiplicando por algo; en desigualdades, multiplicando o sumando y luego acotando. Los tres apartados son tres respuestas a esa pregunta.

## La plantilla y la notación de clase

Toda demostración por inducción tiene las mismas partes, en el mismo orden y con casi las mismas frases. Si te aprendes el esqueleto, solo tienes que pensar en una parte: el paso inductivo.

### La notación de tu profesor

Tu profesor llama **P(k)** a la afirmación, con la letra **k** como variable. Luego **supone que es cierta para k = n** y **demuestra que es cierta para k = n + 1**. Así, todas las cuentas del paso inductivo se hacen con **n** y **n + 1**.

Si un enunciado viene escrito con n (por ejemplo, «n! > 3ⁿ para n ≥ 7»), lo primero es reescribirlo con k: **P(k): k! > 3ᵏ, para k ≥ 7**.

| Símbolo | Qué es | Ojo |
| --- | --- | --- |
| **k** | La variable de la afirmación P(k) | Solo aparece al enunciar P(k) y en la conclusión |
| **n** | Un valor concreto para el que suponemos que P es cierta | Es con lo que haces las cuentas: n y n + 1 |
| **r** | El índice de un sumatorio: Σ r(r + 1), con r de 1 a n, significa 1·2 + 2·3 + ⋯ + n(n + 1) | No uses k ni n como índice: se mezclarían con lo anterior |
| **ℤ⁺** | Los enteros positivos: 1, 2, 3, … | Caso base en 1 |
| **ℕ** | Los naturales. En el IB incluyen el 0: 0, 1, 2, … | Si el enunciado dice ℕ, el caso base es k = 0 |
| **= 7M, con M ∈ ℤ** | «Es múltiplo de 7» | Es la forma de escribir la divisibilidad en las cuentas |

> **¿Y si en un libro en inglés lo ves al revés?** Muchos libros (el de Oxford, por ejemplo) escriben «assume true for n = k, prove for n = k + 1»: cambian los papeles de las letras. La idea es idéntica. Lo importante es que dentro de una misma demostración no cambies de convenio. Aquí usamos siempre el de tu profesor.

### Las cinco partes

0. **Explorar (en borrador).** Calcula los primeros casos en una tabla. No es parte de la demostración, pero te dice si te crees el enunciado y desde qué número empieza.
1. **Enunciado.** *«Sea P(k) la proposición: …, para k ≥ 1.»*
2. **Caso base.** *«Para k = 1: …»* Calcula **cada lado por separado** y comprueba que coinciden (o que se cumple la desigualdad, o que es múltiplo).
3. **Hipótesis de inducción.** *«Supongamos que P(k) es cierta para k = n, es decir: …»* Escríbela entera, con n.
4. **Paso inductivo.** *«Demostremos que es cierta para k = n + 1. Queremos llegar a: …»* Escribe el objetivo entero, con n + 1. Después parte de un lado, usa la hipótesis (y señala dónde la usas) y llega al otro.
5. **Conclusión.** *«Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción P(k) es cierta para todo k ∈ ℤ⁺.»*

> **¿Por qué escribir el objetivo antes de operar?** Porque el paso inductivo es un camino y necesitas saber adónde vas. Casi todos los atascos vienen de operar sin saber qué forma tiene que tener el resultado. Con el objetivo delante, cada cuenta se decide sola: «¿me acerca a lo que quiero?».

> **¿Por qué calcular cada lado por separado en el caso base?** Porque si escribes la igualdad que quieres demostrar y operas con ella, estás dando por hecho lo que quieres probar. Calcula el lado izquierdo, calcula el derecho y di que coinciden.

> **¿Por qué la frase de conclusión entera?** Porque es lo que justifica que caigan todas las fichas: menciona las dos piezas (caso base y paso). En los exámenes del IB esa frase tiene su propia puntuación y se pierde si falta.

### Sustituir n por n + 1 sin equivocarse

Es el error más tonto y el más frecuente. Cambia **cada** n por **(n + 1)**, con paréntesis, y simplifica después:

| Expresión con n | Con n + 1 | Simplificada |
| --- | --- | --- |
| n(n + 1)/2 | (n + 1)((n + 1) + 1)/2 | (n + 1)(n + 2)/2 |
| 2ⁿ⁺² | 2⁽ⁿ⁺¹⁾⁺² | 2ⁿ⁺³ |
| 3²ⁿ⁺¹ | 3²⁽ⁿ⁺¹⁾⁺¹ | 3²ⁿ⁺³ (¡no 3²ⁿ⁺²!) |
| n² | (n + 1)² | n² + 2n + 1 |
| (2n)! | (2(n + 1))! | (2n + 2)! |

## Los tres patrones en una tabla

| Patrón | Cómo se construye el caso n + 1 | Truco del paso | Ojo con |
| --- | --- | --- | --- |
| **Sumas** | Caso n + término nuevo | Factor común de lo que tenga el objetivo | El término nuevo: sustituir r = n + 1 |
| **Divisibilidad, potencias** | Separar: xⁿ⁺¹ = x · xⁿ | Repartir el coeficiente o despejar y sustituir | El exponente 2n + 1 sube de 2 en 2 |
| **Divisibilidad, polinomios** | Desarrollar (n + 1)³ con Newton | Agrupar los términos de la hipótesis | A veces hace falta un lema (n(n + 1) es par) |
| **Desigualdades** | Separar: 2ⁿ⁺¹ = 2 · 2ⁿ, (n + 1)! = (n + 1) · n! | Hipótesis + desigualdad auxiliar | Usar la condición n ≥ n₀ |
| **Mixto** | Caso n + término nuevo | Hipótesis + desigualdad auxiliar | Los apartados previos suelen darte la auxiliar |

## Errores típicos

Los dos primeros son errores de lógica y explican por qué hacen falta **las dos** piezas. Los demás son errores de ejecución que cuestan puntos aunque la idea esté bien.

### Paso sin base: «n² + n es impar»

El paso inductivo funciona. Si n² + n es impar, entonces (n + 1)² + (n + 1) = (n² + n) + 2n + 2, que es impar + par = impar. Y sin embargo la afirmación es **falsa**: para n = 1 da 2, que es par. De hecho, n² + n = n(n + 1) es siempre par. Cada ficha tiraría a la siguiente, pero ninguna cae. **Sin caso base no hay demostración.**

### Base sin paso: «n² + n + 41 es primo»

40 casos seguidos se cumplen, y para n = 40 falla. Comprobar casos no demuestra nada. **Sin paso inductivo no hay demostración.**

### Errores de ejecución

| Error | Cómo se ve | Cómo evitarlo |
| --- | --- | --- |
| Sustituir mal n por n + 1 | 3²ⁿ⁺¹ → 3²ⁿ⁺² (correcto: 3²ⁿ⁺³) | Cambia cada n por (n + 1), con paréntesis, y simplifica después |
| Término nuevo mal en una suma | n(n + 1) + 1 en lugar de (n + 1)(n + 2) | El término nuevo es el término general con r = n + 1 |
| No escribir el objetivo | Operar sin saber adónde ir y perderse | Escribe «Queremos llegar a: …» antes de la primera cuenta |
| Partir del objetivo | Escribir la igualdad que quieres probar y operar hasta 0 = 0 | Empieza en un lado y llega al otro; en el caso base, calcula cada lado por separado |
| No usar la hipótesis | Una demostración que nunca dice «por la hipótesis» | Si no la usas, no es inducción. Marca dónde la usas |
| Desarrollar en una suma | Acabar con un polinomio de grado 3 que hay que factorizar | En sumas, factor común de lo que tenga el objetivo |
| Multiplicar por un negativo | Dejar el ≥ igual tras multiplicar por un número negativo | Solo se conserva el sentido multiplicando por positivos |
| No usar n ≥ n₀ | Una desigualdad auxiliar «que vale siempre» | Comprueba dónde entra la condición del caso base |
| Conclusión incompleta | «Por inducción, queda demostrado» | Menciona caso base, paso y para qué valores es cierta |

## Frases modelo

El examen puede venir en español o en inglés, así que conviene conocer las dos versiones. En inglés, recuerda que los libros suelen cambiar las letras (n = k en vez de k = n).

| Parte | En español | In English |
| --- | --- | --- |
| Enunciado | Sea P(k) la proposición: … | Let P(n) be the statement: … |
| Caso base | Para k = 1: lado izquierdo = …, lado derecho = …, luego P(1) es cierta | When n = 1: LHS = …, RHS = …, so P(1) is true |
| Hipótesis | Supongamos que P(k) es cierta para k = n, es decir, … | Assume P(k) is true for some k ∈ ℤ⁺, i.e. … |
| Paso | Demostremos que es cierta para k = n + 1. Queremos llegar a … | Consider n = k + 1. We want to show that … |
| Conclusión | Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺ | Since P(1) is true, and P(k) true implies P(k + 1) true, then by mathematical induction P(n) is true for all n ∈ ℤ⁺ |

Otras palabras: *divisible by* (divisible por), *multiple of* (múltiplo de), *inequality* (desigualdad), *series* (serie), *proof by induction* (demostración por inducción), *inductive step* (paso inductivo), *base case* (caso base).

## Los ejercicios, clasificados

[[indice]]
