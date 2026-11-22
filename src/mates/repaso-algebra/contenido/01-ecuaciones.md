---
slug: ecuaciones
titulo: Ecuaciones, fracciones algebraicas y racionalizar
nombre: Ecuaciones, fracciones y raíces
corto: Ecuaciones
eyebrow: Apartado 1
desc: Ecuaciones con paréntesis y con fracciones, sumar fracciones algebraicas y racionalizar con el conjugado.
icono: ecuaciones
---
## Idea clave: quitar lo que estorba sin cambiar el valor

Las tres técnicas tienen la misma idea: hacer una operación que **no cambia el valor** de lo que tienes, pero quita lo que estorba. Multiplicar los dos lados de una ecuación por lo mismo quita denominadores; multiplicar una fracción arriba y abajo por lo mismo quita raíces del denominador.

## Ecuaciones con fracciones

### Ejemplo · (x + 2)/(x − 1) = (x − 4)/(x + 3)

1. **Multiplico en cruz** (es multiplicar los dos lados por (x − 1)(x + 3)):

**(x + 2)(x + 3) = (x − 4)(x − 1)**

2. **Desarrollo:**

**x² + 5x + 6 = x² − 5x + 4**

3. **Los x² se van** (por eso la diapositiva la llama «de segundo grado» aunque acaba siendo de primero):

**10x = −2 ⟹ x = −1/5**

4. **Compruebo los denominadores:** con x = −1/5 ni x − 1 ni x + 3 valen 0, así que la solución vale.

> **¿Por qué comprobar los denominadores?** Al multiplicar en cruz das por hecho que los denominadores no son 0. Si la solución anulara alguno, no sería válida.

## Sumar fracciones algebraicas

Igual que con números: **denominador común**, que es el producto de los factores distintos.

**1/(x − 1) + 2/(x + 1) = [1·(x + 1) + 2·(x − 1)]/((x − 1)(x + 1)) = (3x − 1)/(x² − 1)**

> **¿Por qué no se multiplica todo por todo?** Si un factor ya está en dos denominadores, solo se pone una vez. Por eso conviene factorizar antes cada denominador.

## Racionalizar

Si el denominador es **a − √b**, se multiplica arriba y abajo por el **conjugado a + √b**, porque **(a − √b)(a + √b) = a² − b** y la raíz desaparece.

### Ejemplo · 3/(√5 − √2)

**3/(√5 − √2) = 3(√5 + √2)/((√5 − √2)(√5 + √2)) = 3(√5 + √2)/(5 − 2) = √5 + √2**

> **¿Y si solo hay una raíz, como 6/√3?** Se multiplica por la misma raíz: 6/√3 = 6√3/3 = 2√3.

=== R1 | Nuevo | Una ecuación con paréntesis
nivel: 1
pide: 2(x − 3) + 4 = 5x − 11
resultado: **x = 3**
--- enunciado
Resuelve **2(x − 3) + 4 = 5x − 11**.
--- pista Quita el paréntesis
2(x − 3) = 2x − 6. Te queda 2x − 6 + 4 = 5x − 11.
--- pista Agrupa
Pasa las x a un lado y los números al otro: −6 + 4 + 11 = 5x − 2x.
--- solucion
**2x − 6 + 4 = 5x − 11** (quito el paréntesis)

**−2 + 11 = 5x − 2x ⟹ 9 = 3x ⟹ x = 3**

Comprobación: 2(3 − 3) + 4 = 4 y 5·3 − 11 = 4 ✔

=== R2 | Nuevo | Racionalizar con una raíz
nivel: 1
pide: 6/√3
resultado: **2√3**
--- enunciado
Racionaliza **6/√3**.
--- pista Por qué multiplicar
Multiplica arriba y abajo por √3: abajo queda √3·√3 = 3.
--- solucion
**6/√3 = 6√3/(√3·√3) = 6√3/3 = 2√3**

=== R3 | Nuevo | Racionalizar con el conjugado
nivel: 1
pide: 1/(√3 − 1)
resultado: **(√3 + 1)/2**
--- enunciado
Racionaliza **1/(√3 − 1)**.
--- pista El conjugado
El conjugado de √3 − 1 es √3 + 1. Multiplica arriba y abajo por él.
--- pista El denominador
(√3 − 1)(√3 + 1) = (√3)² − 1² = 3 − 1.
--- solucion
**1/(√3 − 1) = (√3 + 1)/((√3 − 1)(√3 + 1)) = (√3 + 1)/(3 − 1) = (√3 + 1)/2**

=== R4 | Nuevo | Sumar dos fracciones algebraicas
nivel: 2
pide: 1/(x − 1) + 2/(x + 1) en una sola fracción
resultado: **(3x − 1)/(x² − 1)**
--- enunciado
Escribe como una sola fracción: **1/(x − 1) + 2/(x + 1)**.
--- pista El denominador común
Los denominadores no tienen factores comunes: el común es (x − 1)(x + 1) = x² − 1.
--- pista Los numeradores
Cada numerador se multiplica por lo que le falta a su denominador: 1·(x + 1) y 2·(x − 1).
--- solucion
**1/(x − 1) + 2/(x + 1) = [(x + 1) + 2(x − 1)]/((x − 1)(x + 1))** (denominador común)

**= (x + 1 + 2x − 2)/(x² − 1) = (3x − 1)/(x² − 1)**

=== D4·1 | Diapositiva 4 | Una ecuación lineal
nivel: 1
pide: 3x + 5(x − 4) = 20x + 4
resultado: **x = −2**
--- enunciado
Resuelve **3x + 5(x − 4) = 20x + 4**.
--- pista Quita el paréntesis
5(x − 4) = 5x − 20. El lado izquierdo queda 8x − 20.
--- pista Agrupa
8x − 20 = 20x + 4. Pasa las x a la derecha (para que el coeficiente sea positivo) y los números a la izquierda.
--- solucion
**3x + 5x − 20 = 20x + 4 ⟹ 8x − 20 = 20x + 4**

**−20 − 4 = 20x − 8x ⟹ −24 = 12x ⟹ x = −2**

Comprobación: 3(−2) + 5(−6) = −36 y 20(−2) + 4 = −36 ✔

=== D4·2 | Diapositiva 4 | Una ecuación con fracciones
nivel: 1
pide: (x + 1)/(2x − 1) = (x − 3)/(2x + 1)
resultado: **x = 1/5**
--- enunciado
Resuelve **(x + 1)/(2x − 1) = (x − 3)/(2x + 1)**.
--- pista Multiplica en cruz
**(x + 1)(2x + 1) = (x − 3)(2x − 1)**
--- pista Desarrolla
Izquierda: 2x² + 3x + 1. Derecha: 2x² − 7x + 3. ¿Qué pasa con los 2x²?
--- solucion
**(x + 1)(2x + 1) = (x − 3)(2x − 1)** (multiplico en cruz)

**2x² + 3x + 1 = 2x² − 7x + 3** (desarrollo)

**10x = 2 ⟹ x = 1/5** (los 2x² se anulan)

Con x = 1/5, 2x − 1 = −3/5 y 2x + 1 = 7/5: ningún denominador es 0, así que la solución vale.

=== D4·3 | Diapositiva 4 | Racionalizar 2√2/(1 − √3)
nivel: 1
pide: 2√2/(1 − √3)
resultado: **−√2 − √6**
--- enunciado
Racionaliza **2√2/(1 − √3)**.
--- pista El conjugado
Multiplica arriba y abajo por 1 + √3.
--- pista El denominador
(1 − √3)(1 + √3) = 1 − 3 = −2. Cuidado con el signo.
--- solucion
**2√2/(1 − √3) = 2√2(1 + √3)/((1 − √3)(1 + √3)) = 2√2(1 + √3)/(−2)**

**= −√2(1 + √3) = −√2 − √6** (√2·√3 = √6)

=== D4·4 | Diapositiva 4 | Tres fracciones algebraicas
nivel: 2
pide: x/(x + 1) − 1/(2x − 1) − 2/(x − 1) en una sola fracción
resultado: **(2x³ − 8x² − x + 3)/((x + 1)(2x − 1)(x − 1))**
--- enunciado
Escribe como una sola fracción: **x/(x + 1) − 1/(2x − 1) − 2/(x − 1)**.
--- pista El denominador común
Los tres denominadores son distintos y no se pueden factorizar más: el común es (x + 1)(2x − 1)(x − 1).
--- pista Los numeradores
x(2x − 1)(x − 1) − (x + 1)(x − 1) − 2(x + 1)(2x − 1). Ojo: el signo menos afecta a todo el producto.
--- pista Las cuentas
x(2x² − 3x + 1) = 2x³ − 3x² + x · −(x² − 1) = −x² + 1 · −2(2x² + x − 1) = −4x² − 2x + 2.
--- solucion
**x/(x + 1) − 1/(2x − 1) − 2/(x − 1) = [x(2x − 1)(x − 1) − (x + 1)(x − 1) − 2(x + 1)(2x − 1)]/((x + 1)(2x − 1)(x − 1))**

Numerador, término a término:

- x(2x − 1)(x − 1) = x(2x² − 3x + 1) = 2x³ − 3x² + x
- −(x + 1)(x − 1) = −x² + 1
- −2(x + 1)(2x − 1) = −2(2x² + x − 1) = −4x² − 2x + 2

Sumando: **2x³ − 8x² − x + 3**. Resultado: **(2x³ − 8x² − x + 3)/((x + 1)(2x − 1)(x − 1))**.
