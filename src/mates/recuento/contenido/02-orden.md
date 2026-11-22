---
slug: orden
titulo: ¿Importa el orden? Permutaciones, variaciones y combinaciones
nombre: Permutaciones, variaciones y combinaciones
corto: P, V y C
eyebrow: Apartado 2 · diapositivas 19, 20 y 26
desc: Ordenar todos (Pₙ = n!), ordenar algunos (V) o elegir algunos sin orden (C).
icono: orden
---
## Idea clave: ¿todos o algunos? ¿con orden o sin él?

**Permutaciones**: se ordenan **todos** los elementos.

**Pₙ = n!**

**Variaciones**: se ordenan **r** de los n elementos (importa el orden).

**V(n, r) = n!/(n − r)! = n·(n − 1)···(r factores)**

**Combinaciones**: se eligen **r** de los n elementos (no importa el orden).

**C(n, r) = V(n, r)/r! = n!/(r!·(n − r)!)**

> **¿Por qué se divide entre r!?** Cada grupo de r elementos aparece r! veces entre las variaciones, una por cada forma de ordenarlo (AB y BA). Al dividir, cada grupo se cuenta una sola vez.

> **La prueba del orden.** Cambia de sitio dos elementos de una solución. Si sale un caso distinto (un podio, un número, una clave), importa el orden. Si es el mismo caso (un grupo, una mano de cartas), no importa.

## Ejemplo · 3 alumnos en 5 sillas (D19)

Importa en qué silla se sienta cada uno y no entran todas las sillas: variaciones.

**V(5, 3) = 5!/2! = 5·4·3 = 60**

## Ejemplo · Grupos de 2 entre 5 alumnos (D20)

Ana con Berta es el mismo grupo que Berta con Ana: combinaciones.

**C(5, 2) = 5!/(2!·3!) = (5·4)/(2·1) = 10**

Compruébalo listando todos los grupos:

[[widget:enumerar|{"tipo":"C","elementos":["A","B","C","D","E"],"r":2,"sep":"","titulo":"Grupos de 2 entre 5 alumnos (A, B, C, D, E)"}]]

=== D19·1 | Diapositiva 19, ejemplo 1 | 5 libros en una estantería
nivel: 1
pide: Ordenar 5 libros distintos en 5 huecos
resultado: **P₅ = 5! = 120**
widget: enumerar {"tipo":"P","elementos":["A","B","C","D","E"],"titulo":"Todas las ordenaciones de 5 libros (A, B, C, D, E)"}
--- enunciado
¿De cuántas maneras se pueden ordenar **5 libros distintos** en 5 huecos?
--- pista ¿Qué tipo es?
Entran todos los libros y el orden importa: permutaciones.
--- pista Principio de multiplicación
5 opciones para el primer hueco, 4 para el segundo…
--- solucion
Entran todos y importa el orden: **permutaciones**.

**P₅ = 5! = 5·4·3·2·1 = 120**

=== D19·2 | Diapositiva 19, ejemplo 2 | 3 alumnos en 5 sillas
nivel: 1
pide: Sentar 3 alumnos en 5 sillas
resultado: **V(5, 3) = 60**
--- enunciado
¿De cuántas maneras se pueden sentar **3 alumnos en 5 sillas**?
--- pista ¿Qué tipo es?
Hay que decidir en qué silla se sienta cada alumno: importa el orden y no se usan todas las sillas.
--- pista Principio de multiplicación
El primer alumno tiene 5 sillas libres; el segundo, 4; el tercero, 3.
--- solucion
Importa el orden y no se usan todas las sillas: **variaciones**.

**V(5, 3) = 5!/(5 − 3)! = 5!/2! = 5·4·3 = 60**

=== D20·1 | Diapositiva 20, ejemplo 1 | Grupos de 2 entre 5
nivel: 1
pide: Grupos de 2 alumnos entre 5
resultado: **C(5, 2) = 10**
widget: enumerar {"tipo":"C","elementos":["A","B","C","D","E"],"r":2,"sep":"","titulo":"Grupos de 2 entre 5 alumnos"}
--- enunciado
¿De cuántas maneras podemos formar **grupos de 2 alumnos** elegidos entre 5?
--- pista ¿Importa el orden?
¿Es distinto el grupo (Ana, Berta) del grupo (Berta, Ana)?
--- solucion
No importa el orden: **combinaciones**.

**C(5, 2) = 5!/(2!·3!) = (5·4)/(2·1) = 10**

=== C5 | Nuevo | El podio
nivel: 1
pide: Oro, plata y bronce entre 8 corredores
resultado: **V(8, 3) = 336**
--- enunciado
En una final corren **8 atletas**. ¿De cuántas maneras se pueden repartir las medallas de **oro, plata y bronce**?
--- pista ¿Importa el orden?
Ganar el oro no es lo mismo que ganar la plata.
--- solucion
Importa el orden y un atleta no puede tener dos medallas: **variaciones** sin repetición.

**V(8, 3) = 8·7·6 = 336**

=== C6 | Nuevo | Tres sabores de helado
nivel: 1
pide: Elegir 3 sabores distintos entre 10
resultado: **C(10, 3) = 120**
--- enunciado
Una heladería tiene **10 sabores**. ¿Cuántas copas distintas de **3 sabores diferentes** se pueden pedir?
--- pista ¿Importa el orden?
Una copa de fresa, limón y chocolate es la misma que una de chocolate, fresa y limón.
--- solucion
No importa el orden: **combinaciones**.

**C(10, 3) = (10·9·8)/(3·2·1) = 120**

> **Compara con el podio.** Con orden serían V(10, 3) = 720; cada copa aparece 3! = 6 veces, y 720/6 = 120.

=== D26·1 | Diapositiva 26, ejemplo 1 | Números con 5, 6, 7 y 8
nivel: 1
pide: Números de 4 cifras con 5, 6, 7 y 8 sin repetir
resultado: **P₄ = 4! = 24**
widget: enumerar {"tipo":"P","elementos":["5","6","7","8"],"titulo":"Todos los números con 5, 6, 7 y 8"}
--- enunciado
¿Cuántos números de **4 dígitos** puedes formar con el **5, 6, 7 y 8** usándolos solamente una vez?
--- pista ¿Qué tipo es?
Entran las 4 cifras y 5678 no es el mismo número que 8765.
--- solucion
Entran todos y el orden importa: **permutaciones**.

**P₄ = 4! = 24**

=== D26·2 | Diapositiva 26, ejemplo 2 | Grupos de 4 en una clase de 28
nivel: 2
pide: Grupos de trabajo de 4 alumnos entre 28
resultado: **C(28, 4) = 20475**
--- enunciado
¿Cuántos **grupos de trabajo de 4 alumnos** puedes formar en una clase de **28**?
--- pista ¿Importa el orden?
Un grupo de trabajo no tiene «primer» ni «segundo» miembro.
--- pista La cuenta
Forma simplificada: cuatro factores bajando desde 28, entre 4!.
--- solucion
No importa el orden: **combinaciones**.

**C(28, 4) = (28·27·26·25)/(4·3·2·1) = 491400/24 = 20475**

> **Error típico.** 28·27·26·25 = 491400 cuenta cada grupo 4! = 24 veces (una por cada orden).
