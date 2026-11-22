---
slug: ruffini
titulo: División de polinomios y Ruffini
nombre: División y Ruffini
corto: Ruffini
eyebrow: Apartado 2
desc: Dividir entre (x − a) con la regla de Ruffini: baja, multiplica y suma, con ceros en los huecos.
icono: ruffini
---
## Idea clave: baja, multiplica y suma

Para dividir un polinomio entre **(x − a)** no hace falta la división larga: la **regla de Ruffini** hace lo mismo solo con los coeficientes.

1. Escribe los coeficientes **de mayor a menor grado**, con **0** en las potencias que falten.
2. A la izquierda, el número **a** (ojo: para x + 3, a = −3).
3. **Baja** el primer coeficiente.
4. **Multiplica** por a, escribe el resultado debajo del siguiente coeficiente y **suma**. Repite hasta el final.
5. El último número es el **resto**; los demás son los coeficientes del **cociente**, que tiene un grado menos.

[[widget:ruffini|{"p":[2,0,-5,1],"a":2}]]

## Ejemplo · (2x³ − 5x + 1) ÷ (x − 2)

Coeficientes: **2, 0, −5, 1** (no hay x², por eso el 0). Con a = 2:

| | 2 | 0 | −5 | 1 |
| --- | --- | --- | --- | --- |
| 2 | | 4 | 8 | 6 |
| | **2** | **4** | **3** | **7** |

**Cociente: 2x² + 4x + 3 · Resto: 7**

> **¿Por qué el 0?** Porque cada columna es una potencia de x. Si te saltas la de x², todas las demás se corren un sitio y el resultado sale mal.

> **¿Cómo lo compruebo?** Dividendo = divisor · cociente + resto: (x − 2)(2x² + 4x + 3) + 7 = 2x³ − 5x + 1 ✔. O más rápido, con el teorema del resto del apartado siguiente: P(2) = 16 − 10 + 1 = 7 ✔.

=== R5 | Nuevo | Ruffini con un hueco
nivel: 1
pide: (x³ − 7x + 6) ÷ (x − 2)
resultado: **Cociente x² + 2x − 3 · Resto 0**
widget: ruffini {"p":[1,0,-7,6],"a":2}
--- enunciado
Divide **(x³ − 7x + 6) ÷ (x − 2)** con Ruffini.
--- pista Los coeficientes
Falta el x²: los coeficientes son **1, 0, −7, 6**, y a = 2.
--- pista El primer paso
Baja el 1. Multiplica 1·2 = 2, ponlo debajo del 0 y suma: 2. Sigue igual.
--- solucion
| | 1 | 0 | −7 | 6 |
| --- | --- | --- | --- | --- |
| 2 | | 2 | 4 | −6 |
| | **1** | **2** | **−3** | **0** |

**Cociente: x² + 2x − 3 · Resto: 0**. Como el resto es 0, (x − 2) es un factor: x³ − 7x + 6 = (x − 2)(x² + 2x − 3).

=== R6 | Nuevo | Ruffini entre x + 1
nivel: 1
pide: (x⁴ − 1) ÷ (x + 1)
resultado: **Cociente x³ − x² + x − 1 · Resto 0**
widget: ruffini {"p":[1,0,0,0,-1],"a":-1}
--- enunciado
Divide **(x⁴ − 1) ÷ (x + 1)** con Ruffini.
--- pista El valor de a
x + 1 = x − (−1): a = **−1**.
--- pista Los coeficientes
x⁴ − 1 tiene cuatro huecos: 1, 0, 0, 0, −1.
--- solucion
| | 1 | 0 | 0 | 0 | −1 |
| --- | --- | --- | --- | --- | --- |
| −1 | | −1 | 1 | −1 | 1 |
| | **1** | **−1** | **1** | **−1** | **0** |

**Cociente: x³ − x² + x − 1 · Resto: 0**.
