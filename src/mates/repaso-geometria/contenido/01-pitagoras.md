---
slug: pitagoras
titulo: Pitágoras y semejanza
nombre: Pitágoras y semejanza
corto: Pitágoras
eyebrow: Apartado 1 · diapositiva 2
desc: h² = c₁² + c₂² en triángulos rectángulos, y triángulos semejantes: mismos ángulos, lados proporcionales.
icono: pitagoras
---
## Idea clave: un triángulo rectángulo y sus proporciones

En un triángulo rectángulo, el lado opuesto al ángulo recto es la **hipotenusa** (el más largo) y los otros dos, los **catetos**:

**h² = c₁² + c₂²**

> **¿Por qué funciona?** Los cuadrados construidos sobre los catetos ocupan, juntos, lo mismo que el cuadrado sobre la hipotenusa. Solo vale si hay un ángulo de 90°.

Dos triángulos son **semejantes** si se cumple uno de estos criterios:

1. Tienen **dos ángulos iguales** (y por tanto los tres).
2. Tienen los **tres lados proporcionales**.
3. Tienen **dos lados proporcionales y el ángulo comprendido igual**.

Entonces sus lados correspondientes están en la misma razón: **a/a′ = b/b′ = c/c′**.

## Ejemplo · Hipotenusa y cateto

[[figura:tri|{"a":6,"b":8,"c":10,"recto":"C","etq":{"a":"6","b":"8","c":"h"},"foco":["c"]}|Los catetos miden 6 y 8; la hipotenusa está enfrente del ángulo recto.]]

**h² = 6² + 8² = 100 ⟹ h = 10**

Si en otro triángulo rectángulo la hipotenusa mide 17 y un cateto 8, el otro cateto es:

**c² = 17² − 8² = 225 ⟹ c = 15**

> **¿Por qué se resta?** El cuadrado grande es el de la hipotenusa. Para un cateto, se le quita al cuadrado de la hipotenusa el del otro cateto.

## Ejemplo · La sombra de un árbol

A la misma hora, un palo de 1 m da una sombra de 0,8 m y un árbol, una sombra de 6 m. Los rayos del sol son paralelos, así que los dos triángulos tienen los mismos ángulos: **son semejantes**.

[[figura:geo|{"pts":{"P":[0,0],"Q":[0,1],"S":[0.8,0],"A":[2.2,0],"T":[2.2,7.5],"U":[8.2,0]},"el":[["pol",["P","Q","S"],{"fill":"p"}],["pol",["P","Q","S"]],["pol",["A","T","U"],{"fill":"v"}],["pol",["A","T","U"]],["recto","P","Q","S"],["recto","A","T","U"],["cota","P","Q","1 m",{"lado":1}],["cota","P","S","0,8 m",{"lado":-1}],["cota","A","T","h",{"lado":1,"k":"fr"}],["cota","A","U","6 m",{"lado":-1}]]}|Palo y árbol: mismos ángulos, lados proporcionales.]]

**h/1 = 6/0,8 ⟹ h = 7,5** m

=== P1 | Nuevo | Hipotenusa y cateto
nivel: 1
pide: Lados que faltan en dos triángulos rectángulos
resultado: **a) h = 15 · b) c = 12**
--- enunciado
a) Los catetos de un triángulo rectángulo miden 9 cm y 12 cm. Calcula la hipotenusa.

b) En otro triángulo rectángulo, la hipotenusa mide 13 cm y un cateto 5 cm. Calcula el otro cateto.
--- pista Haz el dibujo
Dibuja los dos triángulos rectángulos, marca el ángulo recto y escribe la medida de cada lado conocido. Pon una letra al lado que buscas y fíjate en si es la hipotenusa (enfrente del ángulo recto) o un cateto.

[[dibujo:tri|{"a":9,"b":12,"c":15,"recto":"C","etq":{"a":"9","b":"12","c":"h"},"foco":["c"]}|a) Se buscan la hipotenusa, h.]]
--- pista El teorema
a) h² = 9² + 12². b) Ahora la hipotenusa es dato: c² = 13² − 5².
--- solucion
a) **h² = 9² + 12² = 81 + 144 = 225 ⟹ h = 15** cm

b) **c² = 13² − 5² = 169 − 25 = 144 ⟹ c = 12** cm

> **¿Por qué se resta en b?** La hipotenusa es el lado más largo: su cuadrado es la suma de los otros dos. Para un cateto, se resta.

=== P2 | Nuevo | La altura de un árbol
nivel: 1
pide: Altura de un árbol por semejanza con un palo
resultado: **h = 10,5** m
--- enunciado
Un palo vertical de 1,5 m da una sombra de 2 m. A la misma hora, la sombra de un árbol mide 14 m. ¿Cuánto mide el árbol?
--- pista Haz el dibujo
Dibuja dos triángulos rectángulos: el palo con su sombra y el árbol con la suya. Los rayos del sol son paralelos: márcalos con la misma inclinación.

[[dibujo:geo|{"pts":{"P":[0,0],"Q":[0,1.5],"S":[2,0],"A":[3.5,0],"T":[3.5,10.5],"U":[17.5,0]},"el":[["pol",["P","Q","S"],{"fill":"p"}],["pol",["P","Q","S"]],["pol",["A","T","U"],{"fill":"v"}],["pol",["A","T","U"]],["recto","P","Q","S"],["recto","A","T","U"],["cota","P","Q","1,5",{"lado":1}],["cota","P","S","2",{"lado":-1}],["cota","A","T","h",{"lado":1,"k":"fr"}],["cota","A","U","14",{"lado":-1}]]}|Dos triángulos semejantes: mismos ángulos.]]
--- pista La proporción
Altura entre sombra es lo mismo en los dos triángulos: h/14 = 1,5/2.
--- solucion
Los rayos del sol son paralelos, así que los dos triángulos tienen los mismos ángulos: son **semejantes**.

**h/14 = 1,5/2 ⟹ h = 14·0,75 = 10,5** m

> **¿Por qué se pueden dividir así?** En triángulos semejantes, el cociente entre dos lados que se corresponden es el mismo. Aquí, la altura entre la sombra vale 0,75 en los dos.
