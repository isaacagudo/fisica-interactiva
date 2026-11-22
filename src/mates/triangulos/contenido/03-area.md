---
slug: area
titulo: Área de un triángulo
nombre: Área: ½ab sen C y Herón
corto: Área
eyebrow: Apartado 3 · diapositiva 18
desc: Con dos lados y el ángulo que forman, (1/2)·a·b·sen C; con los tres lados, la fórmula de Herón.
icono: area
---
## Idea clave: base por altura, con trigonometría

**Área = (1/2)·a·b·sen C**

> **¿Por qué?** Tomando a como base, la altura sobre ella es b·sen C. Área = (1/2)·base·altura.

[[figura:geo|{"pts":{"C":[0,0],"B":[9,0],"A":[3.5,4.6],"H":[3.5,0]},"el":[["pol",["A","B","C"],{"fill":"p"}],["pol",["A","B","C"]],["seg","A","H",{"dash":true,"k":"fr"}],["recto","H","B","A"],["ang","C","B","A","C"],["cota","C","B","a",{"lado":-1}],["cota","C","A","b",{"lado":1}],["cota","A","H","b·sen C",{"lado":1,"k":"fr"}],["pt","A","n"],["pt","B","se"],["pt","C","so"]],"alto":240}|La altura sobre el lado a es b·sen C.]]

**Fórmula de Herón** (solo con los tres lados): con el semiperímetro s = (a + b + c)/2,

**Área = √[s(s − a)(s − b)(s − c)]**

## Ejemplo · El triángulo 5, 7, 8 por los dos caminos

Con Herón: s = 10, **Área = √(10·5·3·2) = √300 ≈ 17,32**.

El ángulo entre los lados 5 y 8 es 60° (cos = (25 + 64 − 49)/80 = 1/2): **Área = (1/2)·5·8·sen 60° = 10√3 ≈ 17,32**.

=== R3 | Nuevo | Dos lados y el ángulo
nivel: 1
pide: Área con a = 8, b = 11 y C = 35°
resultado: **Área ≈ 25,24**
--- enunciado
Calcula el área de un triángulo en el que a = 8 cm, b = 11 cm y el ángulo que forman es C = 35°.
--- pista Haz el dibujo
Dibuja los dos lados saliendo del vértice C con 35° entre ellos, y la altura sobre uno de ellos.

[[dibujo:tri|{"a":8,"b":11,"c":6.38,"etq":{"a":"8","b":"11","C":"35°"},"girar":0}|El ángulo de 35° está entre los dos lados conocidos.]]
--- pista Fórmula
Área = (1/2)·a·b·sen C.
--- solucion
**Área = (1/2)·8·11·sen 35° ≈ 44·0,5736 ≈ 25,24** cm²

=== R5 | Nuevo | Herón
nivel: 2
pide: Área del triángulo 5, 7, 9 con Herón y con ½ab sen C
resultado: **Área ≈ 17,41**
--- enunciado
Calcula el área del triángulo de lados 5, 7 y 9 cm con la fórmula de Herón. Compruébalo con (1/2)·a·b·sen C usando C ≈ 95,74° (el ángulo entre los lados 5 y 7).
--- pista Haz el dibujo
Dibuja el triángulo y escribe el perímetro y el semiperímetro al lado.

[[dibujo:tri|{"a":5,"b":7,"c":9,"etq":{"a":"5","b":"7","c":"9","C":"95,74°"}}|s = (5 + 7 + 9)/2 = 10,5.]]
--- pista Herón
s = 10,5; s − a = 5,5; s − b = 3,5; s − c = 1,5.
--- solucion
**s = 21/2 = 10,5**

**Área = √(10,5·5,5·3,5·1,5) = √303,1875 ≈ 17,41** cm²

Comprobación: **(1/2)·5·7·sen 95,74° ≈ 17,41**. ✓
