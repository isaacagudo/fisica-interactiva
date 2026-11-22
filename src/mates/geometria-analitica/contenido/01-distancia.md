---
slug: distancia
titulo: Distancia y punto medio
nombre: Distancia y punto medio
corto: Distancia
eyebrow: Apartado 1 · diapositiva 5
desc: La distancia es Pitágoras con las diferencias de coordenadas; el punto medio, la media de las coordenadas.
icono: distancia
---
## Idea clave: Pitágoras con las diferencias

En el plano, entre A(x₁, y₁) y B(x₂, y₂) se avanza Δx = x₂ − x₁ y se sube Δy = y₂ − y₁. La distancia es la hipotenusa:

**d = √(Δx² + Δy²)**

En el espacio hay una tercera diferencia, Δz, y la fórmula gana un sumando:

**d = √[(x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²]**

> **¿Por qué tres cuadrados?** Es Pitágoras dos veces: primero en el suelo (Δx y Δy dan la diagonal de la base) y después con la altura Δz.

[[figura:caja|{"a":6,"b":4,"c":3,"diag":["F","D"],"angulo":false,"etq":{"a":"Δx","b":"Δy","c":"Δz","proy":"√(Δx² + Δy²)","diag":"d"}}|La diagonal FD de la caja: primero la diagonal de la base (azul) y después con la altura.]]

El **punto medio** es la media de las coordenadas:

**M = ((x₁ + x₂)/2, (y₁ + y₂)/2, (z₁ + z₂)/2)**

## Ejemplo · A(−2, 1, 0) y B(4, −1, 3)

**d = √[(4 + 2)² + (−1 − 1)² + (3 − 0)²] = √(36 + 4 + 9) = √49 = 7**

**M = ((−2 + 4)/2, (1 − 1)/2, (0 + 3)/2) = (1; 0; 1,5)**

> **Cuidado con los signos.** 4 − (−2) = 6: restar un negativo es sumar. Al elevar al cuadrado el signo desaparece, pero el número tiene que estar bien.

=== A1 | Nuevo | En el plano
nivel: 1
pide: Distancia y punto medio de P(−3, 2) y Q(5, 8)
resultado: **d = 10 · M(1, 5)**
--- enunciado
Calcula la distancia entre P(−3, 2) y Q(5, 8) y su punto medio.
--- pista Haz el dibujo
Sitúa P y Q en unos ejes. Dibuja el triángulo rectángulo con un tramo horizontal (Δx) y otro vertical (Δy) y marca el punto medio en el centro del segmento.

[[dibujo:geo|{"ejes":{"x":[-4,6],"y":[-1,9],"rejilla":true},"pts":{"P":[-3,2],"Q":[5,8],"C":[5,2],"M":[1,5]},"el":[["seg","P","C",{"dash":true,"k":"n"}],["seg","C","Q",{"dash":true,"k":"n"}],["seg","P","Q",{"k":"p"}],["recto","C","P","Q"],["cota","P","C","Δx = 8",{"lado":-1,"k":"n"}],["cota","C","Q","Δy = 6",{"lado":-1,"k":"n"}],["pt","P","no"],["pt","Q","ne"],["pt","M","no"]],"alto":300}|Δx = 5 − (−3) = 8 y Δy = 8 − 2 = 6.]]
--- pista Las fórmulas
d = √(Δx² + Δy²). M = ((x₁ + x₂)/2, (y₁ + y₂)/2).
--- solucion
**d = √[(5 + 3)² + (8 − 2)²] = √(64 + 36) = √100 = 10**

**M = ((−3 + 5)/2, (2 + 8)/2) = (1, 5)**

> **¿Por qué 5 + 3?** Δx = 5 − (−3): restar −3 es sumar 3.

=== A6 | Nuevo | El otro extremo
nivel: 2
pide: Hallar B sabiendo A(2, −1, 4) y el punto medio M(3, 1, 1)
resultado: **B(4, 3, −2)**
--- enunciado
El punto medio del segmento AB es M(3, 1, 1) y A = (2, −1, 4). Halla B.
--- pista Haz el dibujo
Dibuja el segmento con A en un extremo y M en el centro. Lo que se avanza de A a M se vuelve a avanzar de M a B.

[[dibujo:geo|{"pts":{"A":[0,0],"M":[3,1.5],"B":[6,3]},"el":[["flecha","A","M",{"k":"p"}],["flecha","M","B",{"k":"p","dash":true}],["pt","A","so","A(2, −1, 4)"],["pt","M","no","M(3, 1, 1)"],["pt","B","ne","B = ?"],["cota","A","M","(1, 2, −3)",{"lado":-1,"k":"n"}],["cota","M","B","(1, 2, −3)",{"lado":-1,"k":"n"}]],"alto":180}|De A a M hay que sumar (1, 2, −3); de M a B, lo mismo.]]
--- pista Despeja
(2 + x)/2 = 3, (−1 + y)/2 = 1, (4 + z)/2 = 1. O bien B = 2M − A.
--- solucion
Cada coordenada de M es la media de las de A y B:

**(2 + x)/2 = 3 ⟹ x = 4**

**(−1 + y)/2 = 1 ⟹ y = 3**

**(4 + z)/2 = 1 ⟹ z = −2**

**B = (4, 3, −2)**

> **Atajo.** B = 2M − A = (6 − 2, 2 + 1, 2 − 4). Es lo mismo que sumar a M el salto de A a M.

=== D5 | Diapositiva 5, ejercicio | Distancia y punto medio en 3D
nivel: 1
pide: Distancia y punto medio de A(1, 2, 5) y B(3, 3, 7)
resultado: **d = 3 · M(2; 2,5; 6)**
--- enunciado
Encuentra la distancia y el punto medio de A y B, siendo A(1, 2, 5) y B(3, 3, 7).
--- pista Haz el dibujo
Dibuja una caja cuyas aristas sean las diferencias de coordenadas (Δx = 2, Δy = 1, Δz = 2). La distancia AB es la diagonal de la caja.

[[dibujo:caja|{"a":4,"b":2,"c":4,"diag":["F","D"],"angulo":false,"etq":{"a":"Δx = 2","b":"Δy = 1","c":"Δz = 2","diag":"d"}}|La distancia es la diagonal: Pitágoras en tres dimensiones.]]
--- pista Las diferencias
Δx = 3 − 1, Δy = 3 − 2, Δz = 7 − 5.
--- solucion
**d = √[(3 − 1)² + (3 − 2)² + (7 − 5)²] = √(4 + 1 + 4) = √9 = 3**

**M = ((1 + 3)/2, (2 + 3)/2, (5 + 7)/2) = (2; 2,5; 6)**
