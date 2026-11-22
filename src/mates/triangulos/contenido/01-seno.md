---
slug: seno
titulo: Teorema del seno
nombre: Teorema del seno
corto: Seno
eyebrow: Apartado 1 · diapositiva 18
desc: a/sen A = b/sen B = c/sen C. Con dos lados y un ángulo no comprendido puede haber dos triángulos.
icono: seno
---
## Idea clave: cada lado con su ángulo opuesto

**a/sen A = b/sen B = c/sen C**

> **¿De dónde sale?** Traza la altura h desde C. En un triángulo rectángulo h = b·sen A y en el otro, h = a·sen B. Igualando: a/sen A = b/sen B.

[[figura:geo|{"pts":{"A":[0,0],"B":[10,0],"C":[3.5,5],"H":[3.5,0]},"el":[["pol",["A","B","C"],{"fill":"p"}],["pol",["A","B","C"]],["seg","C","H",{"dash":true,"k":"fr"}],["recto","H","B","C"],["ang","A","B","C","A"],["ang","B","C","A","B"],["cota","C","H","h",{"lado":1,"k":"fr"}],["cota","A","C","b",{"lado":1}],["cota","C","B","a",{"lado":1}],["pt","A","so"],["pt","B","se"],["pt","C","n"]],"alto":240}|La altura h se puede escribir de dos maneras: b·sen A y a·sen B.]]

**Caso ambiguo.** Si se conocen dos lados y el ángulo opuesto a uno de ellos (LLA), sen B da dos ángulos, B y 180° − B. Hay dos triángulos si los dos dejan sitio para el tercer ángulo (A + B < 180°).

## Ejemplo · A = 50°, B = 70° y c = 12

**C = 180° − 50° − 70° = 60°**

**a = 12·sen 50°/sen 60° ≈ 10,61 · b = 12·sen 70°/sen 60° ≈ 13,02**

=== R1 | Nuevo | Un lado con el seno
nivel: 1
pide: a = 10, A = 40°, B = 60°: calcular b
resultado: **b ≈ 13,47**
widget: triangulo {"caso":"ALA","A":40,"B":60,"c":15.32}
--- enunciado
En un triángulo, a = 10 cm, A = 40° y B = 60°. Calcula el lado b.
--- pista Haz el dibujo
Dibuja el triángulo, marca A y B y escribe a enfrente de A. El lado b es el que está enfrente de B.

[[dibujo:tri|{"a":10,"b":13.47,"c":15.32,"etq":{"a":"10","b":"b = ?","A":"40°","B":"60°"},"foco":["b"]}|a y A se conocen; b está enfrente de B.]]
--- pista El teorema
a/sen A = b/sen B ⟹ b = a·sen B/sen A.
--- solucion
**b = 10·sen 60°/sen 40° ≈ 10·0,8660/0,6428 ≈ 13,47** cm

> **¿Por qué el seno?** Se conoce una pareja completa (a y A) y el ángulo opuesto al lado que se busca.

=== R6 | Nuevo | El caso ambiguo
nivel: 3
pide: a = 7, b = 9, A = 40°: todos los triángulos posibles
resultado: **B ≈ 55,73°, C ≈ 84,27°, c ≈ 10,84 · o bien B ≈ 124,27°, C ≈ 15,73°, c ≈ 2,95**
widget: triangulo {"caso":"LLA","a":7,"b":9,"A":40}
--- enunciado
En un triángulo, a = 7 cm, b = 9 cm y A = 40°. Resuélvelo, teniendo en cuenta que puede haber más de una solución.
--- pista Haz el dibujo
Dibuja el ángulo A y el lado b. Con centro en C, el lado a = 7 puede cortar a la otra semirrecta en **dos** puntos: dibuja los dos triángulos.

[[dibujo:geo|{"pts":{"A":[0,0],"C":[6.894,5.785],"B1":[10.836,0],"B2":[2.953,0]},"el":[["pol",["A","B1","C"],{"fill":"p"}],["seg","A","B1"],["seg","A","C"],["seg","C","B1",{"k":"p"}],["seg","C","B2",{"k":"fr"}],["ang","A","B1","C","40°"],["cota","A","C","9",{"lado":1}],["cota","C","B1","7",{"lado":-1,"k":"p"}],["cota","B2","C","7",{"lado":1,"k":"fr"}],["pt","A","so"],["pt","C","n"],["pt","B1","se","B₁"],["pt","B2","s","B₂"]],"alto":240}|Desde C, un segmento de 7 llega a la base en dos sitios: B₁ y B₂.]]
--- pista Teorema del seno
sen B = 9·sen 40°/7. La calculadora da un ángulo; el otro es 180° menos ese.
--- pista Comprobar los dos
Para cada B, C = 180° − 40° − B tiene que ser positivo.
--- solucion
**sen B = 9·sen 40°/7 ≈ 0,8264**, así que **B₁ ≈ 55,73°** o bien **B₂ = 180° − 55,73° ≈ 124,27°**.

Los dos valen: 40° + 124,27° < 180°.

Triángulo 1: **C ≈ 84,27°** y **c = 7·sen 84,27°/sen 40° ≈ 10,84** cm.

Triángulo 2: **C ≈ 15,73°** y **c = 7·sen 15,73°/sen 40° ≈ 2,95** cm.

> **¿Por qué hay dos?** El lado a (7) es más corto que b (9) pero más largo que la altura desde C (9·sen 40° ≈ 5,79): puede «caer» a los dos lados.
