---
slug: posicion
titulo: Posición relativa de dos rectas
nombre: Paralelas, perpendiculares y punto de corte
corto: Posición relativa
eyebrow: Apartado 3 · diapositiva 7
desc: Con las pendientes se sabe si dos rectas son paralelas (m₁ = m₂), perpendiculares (m₁·m₂ = −1) o secantes; el corte sale de resolver el sistema.
icono: perpendicular
---
## Idea clave: comparar pendientes

| Pendientes | Posición | Qué se calcula |
| --- | --- | --- |
| m₁ = m₂ (y distinta n) | Paralelas | Nada: no se cortan |
| m₁ = m₂ y misma n | Coincidentes | Son la misma recta |
| m₁ ≠ m₂ | Secantes | El punto de corte, resolviendo el sistema |
| m₁·m₂ = −1 | Perpendiculares (secantes a 90°) | El corte, igual que antes |

> **¿Por qué m₁·m₂ = −1?** Si una recta tiene director (1, m), un vector perpendicular es (−m, 1), cuya pendiente es −1/m. Al multiplicar las dos pendientes sale −1. La excepción es una recta horizontal (m = 0) con una vertical, que no tiene pendiente.

[[widget:recta|{"A":[0,1],"B":[2,5],"perp":true}]]

## Ejemplo · 2x − y + 1 = 0 y x + 2y − 7 = 0

Pendientes: m₁ = −a/b = −2/(−1) = 2 y m₂ = −1/2. Su producto es −1: **son perpendiculares**.

Punto de corte: de la primera, y = 2x + 1; sustituyendo en la segunda:

**x + 2(2x + 1) − 7 = 0 ⟹ 5x = 5 ⟹ x = 1, y = 3**

[[figura:geo|{"ejes":{"x":[-2,6],"y":[-1,6],"rejilla":true},"pts":{"P":[1,3],"A":[2,5],"B":[3,2]},"el":[["recta",2,1,{"k":"p"}],["recta",-0.5,3.5,{"k":"fr"}],["recto","P","A","B"],["pt","P","so","(1, 3)"]],"alto":280}|Las dos rectas se cortan en (1, 3) formando un ángulo recto.]]

=== A4 | Nuevo | ¿Paralelas o perpendiculares?
nivel: 1
pide: Comparar r: y = 2x + 1, s: 4x − 2y + 7 = 0 y t: x + 2y − 3 = 0
resultado: **r ∥ s · r ⊥ t · s ⊥ t**
--- enunciado
Indica si las rectas son paralelas, perpendiculares o solo secantes, dos a dos:

r: y = 2x + 1   s: 4x − 2y + 7 = 0   t: x + 2y − 3 = 0
--- pista Haz el dibujo
Dibuja las tres rectas a partir de su pendiente y de su ordenada en el origen (despeja y en s y en t). ¿Cuáles tienen la misma inclinación? ¿Cuáles forman una esquina de 90°?

[[dibujo:geo|{"ejes":{"x":[-3,4],"y":[-2,6],"rejilla":true},"pts":{},"el":[["recta",2,1,{"k":"p"}],["recta",2,3.5,{"k":"n"}],["recta",-0.5,1.5,{"k":"fr"}],["txt",[-2.6,4.6],"s",{"k":"n"}],["txt",[1.9,5.6],"r",{"k":"p"}],["txt",[3.4,0.1],"t",{"k":"fr"}]],"alto":300}|r y s tienen la misma inclinación; t las corta en ángulo recto.]]
--- pista Las pendientes
m = −a/b en la forma general: s da 2 y t da −1/2.
--- solucion
**m_r = 2 · m_s = −4/(−2) = 2 · m_t = −1/2**

- r y s: m_r = m_s y distinta ordenada en el origen (1 y 3,5): **paralelas**.
- r y t: 2·(−1/2) = −1: **perpendiculares**.
- s y t: también 2·(−1/2) = −1: **perpendiculares**.

=== A5 | Nuevo | Punto de corte
nivel: 2
pide: Corte de 2x + y = 7 y x − y = 2
resultado: **(3, 1)**
--- enunciado
Halla el punto de corte de las rectas 2x + y = 7 y x − y = 2.
--- pista Haz el dibujo
Dibuja las dos rectas con dos puntos cada una (por ejemplo, sus cortes con los ejes) y estima dónde se cruzan antes de calcularlo.

[[dibujo:geo|{"ejes":{"x":[-1,5],"y":[-3,8],"rejilla":true},"pts":{"P":[3,1]},"el":[["recta",-2,7,{"k":"p"}],["recta",1,-2,{"k":"fr"}],["pt","P","e","(3, 1)"]],"alto":300}|El punto de corte cumple las dos ecuaciones a la vez.]]
--- pista Sistema
Suma las dos ecuaciones: la y desaparece.
--- solucion
Sumando: **3x = 9 ⟹ x = 3**, y de la segunda, **y = x − 2 = 1**.

Punto de corte: **(3, 1)**. Comprobación: 2·3 + 1 = 7 y 3 − 1 = 2. ✓

=== D7 | Diapositiva 7, ejemplo | La perpendicular por un punto
nivel: 1
pide: Perpendicular a y = 5x + 3 que pasa por (2, 4)
resultado: **y − 4 = −(x − 2)/5, es decir, y = −x/5 + 22/5**
widget: recta {"A":[2,4],"B":[3,9],"perp":true}
--- enunciado
Halla la recta perpendicular a y = 5x + 3 que pasa por el punto (2, 4).
--- pista Haz el dibujo
Dibuja la recta y = 5x + 3 (muy inclinada) y el punto (2, 4). La perpendicular pasa por el punto y es casi horizontal, bajando un poco.

[[dibujo:geo|{"ejes":{"x":[-2,6],"y":[-1,8],"rejilla":true},"pts":{"P":[2,4]},"el":[["recta",5,3,{"k":"p"}],["recta",-0.2,4.4,{"k":"fr"}],["pt","P","ne","(2, 4)"]],"alto":300}|Pendientes 5 y −1/5: su producto es −1.]]
--- pista La pendiente
m₁·m₂ = −1 ⟹ 5·m₂ = −1. Después, punto-pendiente.
--- solucion
**5·m₂ = −1 ⟹ m₂ = −1/5**

**y − 4 = −(1/5)(x − 2) ⟹ y = −x/5 + 22/5**

Forma general: multiplicando por 5, **x + 5y − 22 = 0**.

=== A7 | Nuevo | La mediatriz
nivel: 2
pide: Mediatriz del segmento A(1, 2), B(5, 6)
resultado: **y = −x + 7**
--- enunciado
Halla la mediatriz del segmento de extremos A(1, 2) y B(5, 6), es decir, la recta perpendicular a AB que pasa por su punto medio.
--- pista Haz el dibujo
Dibuja el segmento AB, marca su punto medio M y traza por M una recta perpendicular a AB.

[[dibujo:geo|{"ejes":{"x":[-1,8],"y":[-1,8],"rejilla":true},"pts":{"A":[1,2],"B":[5,6],"M":[3,4],"Q":[4,3]},"el":[["seg","A","B",{"k":"p"}],["recta",-1,7,{"k":"fr"}],["recto","M","B","Q"],["pt","A","no"],["pt","B","no"],["pt","M","no"]],"alto":300}|La mediatriz pasa por el punto medio y es perpendicular al segmento.]]
--- pista Dos datos
M = (3, 4). La pendiente de AB es 1, así que la de la mediatriz es −1.
--- solucion
**M = ((1 + 5)/2, (2 + 6)/2) = (3, 4)**

**m_AB = (6 − 2)/(5 − 1) = 1 ⟹ m = −1**

**y − 4 = −(x − 3) ⟹ y = −x + 7**

> **¿Para qué sirve?** Todos los puntos de la mediatriz están a la misma distancia de A y de B. Por ejemplo, (0, 7): su distancia a A es √(1 + 25) y a B, √(25 + 1).

=== A8 | Nuevo | Un triángulo rectángulo
nivel: 3
pide: Comprobar que A(1, 1), B(5, 3), C(3, 7) es rectángulo y hallar su área
resultado: **Rectángulo en B (pendientes 1/2 y −2) · área 10**
--- enunciado
Demuestra que el triángulo de vértices A(1, 1), B(5, 3) y C(3, 7) es rectángulo y calcula su área.
--- pista Haz el dibujo
Sitúa los tres puntos y dibuja el triángulo. ¿En qué vértice parece haber un ángulo recto?

[[dibujo:geo|{"ejes":{"x":[0,7],"y":[0,8],"rejilla":true},"pts":{"A":[1,1],"B":[5,3],"C":[3,7]},"el":[["pol",["A","B","C"],{"fill":"p"}],["pol",["A","B","C"]],["recto","B","A","C"],["pt","A","so"],["pt","B","e"],["pt","C","n"]],"alto":300}|El ángulo recto parece estar en B.]]
--- pista Pendientes
Calcula las pendientes de AB y de BC y multiplícalas. Para el área, los catetos son AB y BC.
--- solucion
**m_AB = (3 − 1)/(5 − 1) = 1/2 · m_BC = (7 − 3)/(3 − 5) = −2**

**(1/2)·(−2) = −1**: AB ⊥ BC, el triángulo es **rectángulo en B**.

**AB = √(16 + 4) = √20 · BC = √(4 + 16) = √20**

**Área = (1/2)·√20·√20 = 10**

> **¿Por qué esos catetos?** En un triángulo rectángulo, los dos lados del ángulo recto son base y altura el uno del otro.
