---
slug: desigualdades
titulo: Desigualdades
nombre: Desigualdades (y el caso mixto)
corto: Desigualdades
eyebrow: Apartado 3 · Patrón C
desc: Una cadena de = y ≥ con la hipótesis en un eslabón y una desigualdad auxiliar al final. Incluye sumas dentro de desigualdades.
icono: desigualdades
---
## Idea clave: una cadena con una desigualdad auxiliar

En una desigualdad no tienes que llegar exactamente al objetivo, sino a algo **mayor o igual** que él. El paso inductivo es una **cadena**: empiezas en un lado del caso n + 1 y vas encadenando = y ≥ hasta llegar al otro lado. En un eslabón usas la hipótesis y, casi siempre, al final necesitas una **desigualdad auxiliar** que dependa de que n sea suficientemente grande.

> **¿Por qué vale una cadena?** Si A = B, B ≥ C y C ≥ D, entonces A ≥ D. Cada eslabón tiene que estar justificado. Si algún eslabón es estricto (>), el resultado también lo es; si el objetivo es > y todos tus eslabones son ≥, te falta algo.

**Método**

1. **Escribe el objetivo** del caso n + 1, y desarróllalo si ayuda: (n + 1)² = n² + 2n + 1.
2. **Empieza por el lado que crece rápido** (la potencia, el factorial) y reescríbelo para que aparezca el de la hipótesis: 2ⁿ⁺¹ = 2 · 2ⁿ, (n + 1)! = (n + 1) · n!.
3. **Aplica la hipótesis**, con su ≥ o su >.
4. **Compara con el objetivo.** Lo que te falte es la desigualdad auxiliar: demuéstrala usando que n es mayor o igual que el caso base.

## Ejemplo 5 · 2ⁿ ≥ n², para n ≥ 4

**Explorar.** Aquí la tabla es imprescindible:

| n | 2ⁿ | n² | ¿2ⁿ ≥ n²? |
| --- | --- | --- | --- |
| 1 | 2 | 1 | Sí |
| 2 | 4 | 4 | Sí |
| 3 | 8 | 9 | **No** |
| 4 | 16 | 16 | Sí |
| 5 | 32 | 25 | Sí |
| 6 | 64 | 36 | Sí |
| 7 | 128 | 49 | Sí |

> **¿Por qué el caso base es 4 si para 1 y 2 también se cumple?** Porque en 3 falla: la fila de fichas está rota en el 3. A partir del 4, 2ⁿ crece mucho más rápido que n² (se duplica en cada paso) y ya no lo pierde. Verás que el propio paso inductivo usa que n ≥ 4: el caso base y el paso tienen que encajar. Lo puedes ver en el dominó del mapa del tema.

1. **Enunciado.** Sea P(k): **2ᵏ ≥ k²**, para k ∈ ℤ, k ≥ 4.
2. **Caso base, k = 4.** Lado izquierdo: 2⁴ = 16. Lado derecho: 4² = 16. Como 16 ≥ 16, P(4) es cierta.
3. **Hipótesis de inducción.** Para k = n, con n ≥ 4: **2ⁿ ≥ n²**.
4. **Paso inductivo, k = n + 1.** Queremos llegar a: **2ⁿ⁺¹ ≥ (n + 1)² = n² + 2n + 1**.

Empezamos por el lado de las potencias y lo escribimos de forma que aparezca 2ⁿ:

**2ⁿ⁺¹ = 2 · 2ⁿ** (propiedad de las potencias)

**≥ 2 · n²** (por la hipótesis, multiplicada por 2)

**= n² + n²**

**≥ n² + 4n** (como n ≥ 4, n² = n · n ≥ 4 · n)

**= n² + 2n + 2n**

**≥ n² + 2n + 1** (como n ≥ 4, 2n ≥ 8 ≥ 1)

**= (n + 1)²** ✔ es el objetivo

> **¿Por qué puedo multiplicar la hipótesis por 2?** Porque multiplicar los dos lados de una desigualdad por un número **positivo** no cambia su sentido. Si fuera negativo, el ≥ se daría la vuelta.

> **¿Por qué partir 2n² en n² + n²?** Mira el objetivo: n² + (2n + 1). Uno de los n² ya coincide con el del objetivo. El otro tiene que «ganarle» a 2n + 1. Así, todo el problema se reduce a una **desigualdad auxiliar**: n² ≥ 2n + 1.

> **¿Dónde se usa que n ≥ 4?** Justo en la desigualdad auxiliar: n² ≥ 4n solo es cierto si n ≥ 4. Esto es una buena comprobación: si en tu demostración no usas la condición n ≥ 4 en ningún sitio, sospecha. El paso funcionaría para todos los n y sabemos que falla en n = 3.

5. **Conclusión.** Como P(k) es cierta para k = 4, y si es cierta para k = n (con n ≥ 4) también lo es para k = n + 1, por el principio de inducción P(k) es cierta para todo entero k ≥ 4.

### El mismo fenómeno en otro ejercicio

En el ejercicio D16·4, n! > 3ⁿ para n ≥ 7, pasa lo mismo. Haz su tabla: para n = 6 sale 6! = 720 y 3⁶ = 729, así que falla por muy poco, y en n = 7 ya sale 5040 > 2187. Por eso el caso base es 7. La técnica es la de este ejemplo, pero con factoriales: **(n + 1)! = (n + 1) · n!**.

## El caso mixto: una suma dentro de una desigualdad

Cuando hay una suma en un lado de una desigualdad, el paso inductivo **empieza como en las sumas** (término nuevo + hipótesis) y **termina como en las desigualdades** (desigualdad auxiliar). No hay nada nuevo: solo hay que encadenar los dos patrones.

## Ejemplo 6 · 1 + 1/4 + 1/9 + ⋯ + 1/n² ≤ 2 − 1/n, para n ∈ ℤ⁺

**Explorar.** n = 1: 1 ≤ 1. n = 2: 1,25 ≤ 1,5. n = 3: 1,36… ≤ 1,67… Se cumple, y cada vez con más margen.

1. **Enunciado.** Sea P(k): **1 + 1/2² + ⋯ + 1/k² ≤ 2 − 1/k**, para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 1. Lado derecho: 2 − 1 = 1. Como 1 ≤ 1, P(1) es cierta.
3. **Hipótesis de inducción.** Para k = n: **1 + 1/2² + ⋯ + 1/n² ≤ 2 − 1/n**.
4. **Paso inductivo, k = n + 1.** Queremos llegar a: **1 + 1/2² + ⋯ + 1/n² + 1/(n + 1)² ≤ 2 − 1/(n + 1)**.

*Parte de suma:* separo el término nuevo y uso la hipótesis.

**1 + ⋯ + 1/n² + 1/(n + 1)² ≤ 2 − 1/n + 1/(n + 1)²** (por la hipótesis)

*Parte de desigualdad:* comparo con el objetivo. Necesito que 2 − 1/n + 1/(n + 1)² ≤ 2 − 1/(n + 1). Quitando el 2 y pasando términos, eso es la desigualdad auxiliar:

**1/(n + 1)² ≤ 1/n − 1/(n + 1)**

Y es cierta, porque el lado derecho vale **1/n − 1/(n + 1) = 1/(n(n + 1))**, y como n(n + 1) < (n + 1)², la fracción con el denominador más pequeño es la mayor: 1/(n + 1)² < 1/(n(n + 1)). Por tanto:

**1 + ⋯ + 1/(n + 1)² ≤ 2 − 1/n + 1/(n + 1)² ≤ 2 − 1/n + 1/n − 1/(n + 1) = 2 − 1/(n + 1)** ✔

> **¿Cómo encuentro la desigualdad auxiliar?** Pon lo que tienes después de usar la hipótesis al lado del objetivo, y pregúntate qué tendría que cumplirse para que lo primero sea ≤ que lo segundo. Eso es lo que te falta demostrar. Es exactamente lo que hicimos en el ejemplo 5 con n² ≥ 2n + 1.

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

> **Pista para los exámenes del IB.** Muchas veces el ejercicio tiene apartados antes de la inducción, y el último dice «a partir de lo anterior». Esos apartados suelen ser **la desigualdad auxiliar** que vas a necesitar. Es lo que pasa en el ejercicio D35·10: el primer apartado te prepara la herramienta para el tercero.

=== D16·4 | Diapositiva 16, ejercicio 4 | n! > 3ⁿ, para n ≥ 7
caso: k = 7
pide: n! > 3ⁿ, para n ≥ 7
--- enunciado
Prove by induction: **n! > 3ⁿ** for n ≥ 7, n ∈ ℤ.

*(Demuestra por inducción que n! > 3ⁿ para n ≥ 7. Recuerda: n! = n · (n − 1) · (n − 2) ⋯ 1.)*
--- pista El caso base
Mira la tabla de explorar. Para n = 6: 6! = 720 y 3⁶ = 729, falla por poco. Para n = 7: 7! = 5040 y 3⁷ = 2187. Por eso se empieza en 7.
--- pista Separar
Objetivo: **(n + 1)! > 3ⁿ⁺¹**. Escribe **(n + 1)! = (n + 1) · n!**, para que aparezca el n! de la hipótesis.
--- pista La hipótesis
Como n + 1 > 0, puedes multiplicar la hipótesis por n + 1: **(n + 1) · n! > (n + 1) · 3ⁿ**.
--- pista La desigualdad auxiliar
Quieres llegar a 3 · 3ⁿ = 3ⁿ⁺¹. Basta con que n + 1 > 3. ¿Es cierto si n ≥ 7?
--- solucion
1. Sea P(k): k! > 3ᵏ, para k ∈ ℤ, k ≥ 7.
2. **Caso base, k = 7.** 7! = 5040 y 3⁷ = 2187. Como 5040 > 2187, P(7) es cierta.
3. **Hipótesis, k = n (con n ≥ 7).** n! > 3ⁿ.
4. **Paso, k = n + 1.** Queremos llegar a (n + 1)! > 3ⁿ⁺¹.

**(n + 1)! = (n + 1) · n!** (definición de factorial)

**> (n + 1) · 3ⁿ** (por la hipótesis, multiplicada por n + 1 > 0)

**> 3 · 3ⁿ** (como n ≥ 7, n + 1 ≥ 8 > 3)

**= 3ⁿ⁺¹** ✔

5. **Conclusión.** Como P(k) es cierta para k = 7, y si es cierta para k = n (con n ≥ 7) también lo es para k = n + 1, por el principio de inducción es cierta para todo entero k ≥ 7.

> **Compáralo con 2ⁿ ≥ n².** Aquí la desigualdad auxiliar (n + 1 > 3) ya es cierta desde n = 3: lo que obliga a empezar en 7 es el caso base. En 2ⁿ ≥ n² son las dos cosas a la vez.

=== D16·5 | Diapositiva 16, ejercicio 5 | (2n)! ≥ 2ⁿ(n!)²
caso: k = 1
pide: (2n)! ≥ 2ⁿ(n!)²
--- enunciado
Prove by induction: **(2n)! ≥ 2ⁿ(n!)²**, n ∈ ℤ⁺.

*(Demuestra por inducción que (2n)! ≥ 2ⁿ(n!)², para n ∈ ℤ⁺.)*
--- pista El objetivo
Cambia n por n + 1 en los dos lados: **(2n + 2)! ≥ 2ⁿ⁺¹((n + 1)!)²**.
--- pista Separar, ¡dos factores!
(2n + 2)! no es (2n + 2) · (2n)!. Entre 2n y 2n + 2 está el 2n + 1: **(2n + 2)! = (2n + 2)(2n + 1) · (2n)!**. En el otro lado: **((n + 1)!)² = (n + 1)² · (n!)²**.
--- pista La hipótesis
Multiplica la hipótesis por (2n + 2)(2n + 1), que es positivo, y escribe 2n + 2 = 2(n + 1). Te queda **2ⁿ⁺¹ · (n + 1)(2n + 1) · (n!)²**.
--- pista La desigualdad auxiliar
Compara con el objetivo, 2ⁿ⁺¹ · (n + 1)(n + 1) · (n!)². Todo coincide salvo un factor: necesitas **2n + 1 ≥ n + 1**.
--- solucion
1. Sea P(k): (2k)! ≥ 2ᵏ(k!)², para k ∈ ℤ⁺.
2. **Caso base, k = 1.** Lado izquierdo: 2! = 2. Lado derecho: 2¹ · (1!)² = 2. Como 2 ≥ 2, P(1) es cierta.
3. **Hipótesis, k = n.** (2n)! ≥ 2ⁿ(n!)².
4. **Paso, k = n + 1.** Queremos llegar a (2n + 2)! ≥ 2ⁿ⁺¹((n + 1)!)².

**(2n + 2)! = (2n + 2)(2n + 1) · (2n)!** (dos factores nuevos)

**≥ (2n + 2)(2n + 1) · 2ⁿ(n!)²** (por la hipótesis, multiplicada por un positivo)

**= 2ⁿ⁺¹ · (n + 1)(2n + 1) · (n!)²** (2n + 2 = 2(n + 1))

**≥ 2ⁿ⁺¹ · (n + 1)(n + 1) · (n!)²** (2n + 1 ≥ n + 1, porque n ≥ 0)

**= 2ⁿ⁺¹((n + 1)!)²** ✔

5. **Conclusión.** Como P(k) es cierta para k = 1, y si es cierta para k = n también lo es para k = n + 1, por el principio de inducción es cierta para todo k ∈ ℤ⁺.

=== D35·10 | Diapositiva 35, ejercicio 10 | La suma de 1/√r
caso: k = 2
pide: 1/√1 + 1/√2 + ⋯ + 1/√n > √n, para n ≥ 2 (con dos apartados previos)
--- enunciado
1. Muestra que **1/(√n + √(n + 1)) = √(n + 1) − √n**, donde n ≥ 0, n ∈ ℤ.
2. A partir de lo anterior, muestra que **√2 − 1 < 1/√2**.
3. Demuestra, utilizando la inducción matemática, que **1/√1 + 1/√2 + ⋯ + 1/√n > √n**, para n ≥ 2, n ∈ ℤ.
--- pista Apartado 1
Racionaliza: multiplica arriba y abajo por √(n + 1) − √n. Abajo queda (n + 1) − n = 1.
--- pista Apartado 2
Con n = 1 el apartado 1 dice que √2 − 1 = 1/(1 + √2). Como 1 + √2 > √2, la fracción es menor que 1/√2. Fíjate en que este apartado **es el caso base** del 3: √2 − 1 < 1/√2 equivale a 1 + 1/√2 > √2.
--- pista Apartado 3, la parte de suma
Objetivo: **1/√1 + ⋯ + 1/√n + 1/√(n + 1) > √(n + 1)**. Separa el término nuevo y usa la hipótesis: **> √n + 1/√(n + 1)**.
--- pista La desigualdad auxiliar
Necesitas **√n + 1/√(n + 1) ≥ √(n + 1)**, es decir, **1/√(n + 1) ≥ √(n + 1) − √n**. Usa el apartado 1 para escribir el lado derecho como una fracción y compara denominadores.
--- solucion
**Apartado 1.** Multiplico arriba y abajo por √(n + 1) − √n:

**1/(√n + √(n + 1)) = (√(n + 1) − √n)/((n + 1) − n) = √(n + 1) − √n** ✔

**Apartado 2.** Con n = 1: √2 − 1 = 1/(1 + √2). Como 1 + √2 > √2 > 0, se tiene 1/(1 + √2) < 1/√2. Por tanto √2 − 1 < 1/√2 ✔

**Apartado 3.**

1. Sea P(k): 1/√1 + 1/√2 + ⋯ + 1/√k > √k, para k ∈ ℤ, k ≥ 2.
2. **Caso base, k = 2.** Hay que ver que 1 + 1/√2 > √2. Es el apartado 2 pasando el 1 al otro lado. (Con calculadora: 1,707 > 1,414.)
3. **Hipótesis, k = n (con n ≥ 2).** 1/√1 + ⋯ + 1/√n > √n.
4. **Paso, k = n + 1.** Queremos llegar a 1/√1 + ⋯ + 1/√(n + 1) > √(n + 1).

**1/√1 + ⋯ + 1/√n + 1/√(n + 1) > √n + 1/√(n + 1)** (por la hipótesis)

Desigualdad auxiliar. Por el apartado 1, √(n + 1) − √n = 1/(√n + √(n + 1)). Como √n + √(n + 1) > √(n + 1), esa fracción es menor que 1/√(n + 1). Es decir, 1/√(n + 1) > √(n + 1) − √n. Entonces:

**√n + 1/√(n + 1) > √n + √(n + 1) − √n = √(n + 1)** ✔

5. **Conclusión.** Como P(k) es cierta para k = 2, y si es cierta para k = n (con n ≥ 2) también lo es para k = n + 1, por el principio de inducción es cierta para todo entero k ≥ 2.

> **¿Por qué empieza en 2?** Para n = 1 los dos lados valen 1, y 1 > 1 es falso: la desigualdad es estricta. El paso inductivo sí funcionaría desde 1, pero no hay primera ficha en el 1.
