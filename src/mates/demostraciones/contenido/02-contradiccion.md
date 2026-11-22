---
slug: contradiccion
titulo: Demostración por contradicción
nombre: Por contradicción (reducción al absurdo)
corto: Contradicción
eyebrow: Apartado 2 · diapositivas 14 y 16
desc: Suponer lo contrario de lo que se quiere probar y llegar a algo imposible.
icono: contradiccion
---
## Idea clave: suponer lo contrario y llegar a un imposible

1. **Supón lo contrario** de lo que quieres demostrar. Si quieres probar «no existen enteros con…», supón que **sí existen**.
2. **Opera** con esa suposición como si fuera cierta.
3. **Llega a algo imposible**: un par igual a un impar, un múltiplo de 6 igual a 1, una fracción irreducible que no lo es…
4. **Concluye**: como la suposición lleva a un absurdo, es falsa, y lo que querías demostrar es cierto.

> **¿Por qué funciona?** Una afirmación es cierta o falsa. Si suponer que es falsa lleva a algo imposible, no puede ser falsa.

## Ejemplo · No existen enteros a y b con 2a + 4b = 7

Supongamos que **sí existen** a, b ∈ ℤ con 2a + 4b = 7. Entonces

**2a + 4b = 2(a + 2b) = 7**

El lado izquierdo es par (2 por un entero) y 7 es impar: **un par no puede ser igual a un impar**. Contradicción. Por tanto, no existen.

## Ejemplo · √3 es irracional

Supongamos que **√3 = a/b**, con a, b enteros y la fracción **irreducible** (sin factores comunes).

**3 = a²/b² ⟹ a² = 3b²**

Entonces 3 divide a a², y como 3 es primo, **3 divide a a**: a = 3c. Sustituyendo:

**9c² = 3b² ⟹ b² = 3c²**

Así que 3 también divide a b. Pero entonces a y b tienen el factor común 3, y habíamos dicho que la fracción era irreducible. **Contradicción**: √3 no puede escribirse como fracción, es irracional.

> **¿Por qué «irreducible»?** Toda fracción se puede simplificar hasta que no tenga factores comunes. Suponerlo desde el principio no quita generalidad, y es justo lo que luego se contradice.

=== M5 | Nuevo | Una ecuación sin soluciones enteras
nivel: 1
pide: No existen enteros con 6a + 9b = 5
resultado: **6a + 9b = 3(2a + 3b) es múltiplo de 3 y 5 no lo es**
--- enunciado
Demuestra por contradicción que **no existen enteros a y b con 6a + 9b = 5**.
--- pista Supón lo contrario
Supón que sí existen. Saca factor común en el lado izquierdo.
--- solucion
Supongamos que existen a, b ∈ ℤ con 6a + 9b = 5. Entonces

**3(2a + 3b) = 5**

El lado izquierdo es múltiplo de 3 y 5 no lo es. **Contradicción**: no existen tales enteros.

=== M6 | Nuevo | √5 es irracional
nivel: 3
pide: √5 es irracional
resultado: **Si √5 = a/b irreducible, a² = 5b² ⟹ 5 divide a a y a b: contradicción**
--- enunciado
Demuestra por contradicción que **√5 es irracional**.
--- pista Supón lo contrario
√5 = a/b con la fracción irreducible. Eleva al cuadrado.
--- pista El primo
De a² = 5b², 5 divide a a². Como 5 es primo, 5 divide a a: a = 5c.
--- pista Termina
Sustituye: 25c² = 5b², así que b² = 5c². ¿Qué le pasa a b?
--- solucion
Supongamos **√5 = a/b**, con a, b ∈ ℤ y la fracción irreducible.

**5 = a²/b² ⟹ a² = 5b²**

Así 5 divide a a², y como 5 es primo, **5 divide a a**: a = 5c.

**25c² = 5b² ⟹ b² = 5c²**

Luego 5 también divide a b. Entonces a y b tienen el factor común 5: **contradicción** con que la fracción era irreducible. √5 es irracional.

=== D14·2 | Diapositiva 14, ejemplo 2 | √2 es irracional
nivel: 3
pide: √2 es irracional
resultado: **Si √2 = a/b irreducible, a y b salen pares: contradicción**
--- enunciado
Demuestra por reducción al absurdo que **√2 es irracional**.
--- pista Supón lo contrario
√2 = a/b, con a, b enteros y la fracción irreducible. Eleva al cuadrado y despeja a².
--- pista a es par
a² = 2b² es par. Si a fuera impar, a² sería impar (D15·2). Así que a es par: a = 2c.
--- pista b también
Sustituye a = 2c en a² = 2b² y simplifica.
--- solucion
Supongamos **√2 = a/b**, con a, b ∈ ℤ y la fracción irreducible.

**2 = a²/b² ⟹ a² = 2b²**

Así a² es par, y por tanto **a es par** (si a fuera impar, a² sería impar: D15·2). Escribimos a = 2c:

**4c² = 2b² ⟹ b² = 2c²**

Ahora b² es par, así que **b también es par**. Pero entonces a y b tienen el factor común 2, en contra de que la fracción era irreducible. **Contradicción**: √2 es irracional.

=== D16·1 | Diapositiva 16, ejercicio 1 | 18n + 6m = 1
nivel: 2
pide: No existen enteros n y m con 18n + 6m = 1
resultado: **18n + 6m = 6(3n + m) es múltiplo de 6 y 1 no lo es**
--- enunciado
Use contradiction to show that there exist no integers n and m for which 18n + 6m = 1.

*(Demuestra por contradicción que no existen enteros n y m con 18n + 6m = 1.)*
--- pista Supón lo contrario
Supón que sí existen y saca factor común.
--- solucion
Supongamos que existen n, m ∈ ℤ con 18n + 6m = 1. Entonces

**6(3n + m) = 1**

El lado izquierdo es múltiplo de 6 (y, por tanto, par) y 1 no lo es. **Contradicción**: no existen tales enteros.

=== D16·2 | Diapositiva 16, ejercicio 2 | a² − 4b ≠ 2
nivel: 3
pide: Si a, b ∈ ℤ, a² − 4b ≠ 2
resultado: **Si a² − 4b = 2, a es par, a = 2c, y 2(c² − b) = 1: contradicción**
--- enunciado
Prove that if a, b ∈ ℤ, then a² − 4b ≠ 2.

*(Demuestra que si a y b son enteros, a² − 4b ≠ 2.)*
--- pista Supón lo contrario
Supón que a² − 4b = 2. Despeja a².
--- pista a es par
a² = 2 + 4b = 2(1 + 2b) es par, así que a es par: a = 2c.
--- pista Sustituye
4c² − 4b = 2. Divide entre 2.
--- solucion
Supongamos que existen a, b ∈ ℤ con **a² − 4b = 2**. Entonces

**a² = 2 + 4b = 2(1 + 2b)**

es par, así que **a es par** (D15·2): a = 2c. Sustituyendo:

**4c² − 4b = 2 ⟹ 2c² − 2b = 1 ⟹ 2(c² − b) = 1**

Un número par no puede valer 1. **Contradicción**: a² − 4b ≠ 2.
