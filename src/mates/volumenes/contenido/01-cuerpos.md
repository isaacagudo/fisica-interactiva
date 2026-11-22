---
slug: cuerpos
titulo: Volúmenes y áreas de cuerpos
nombre: Cuerpos geométricos
corto: Cuerpos
eyebrow: Apartado 1 · diapositiva 14
desc: Prisma, pirámide, cilindro, cono y esfera. Pitágoras para la generatriz y la apotema.
icono: cuerpos
---
## Idea clave: un tercio, y Pitágoras para lo que falta

- La **pirámide** es un tercio del prisma con la misma base y altura; el **cono**, un tercio del cilindro.
- La **generatriz** g del cono (lo que mide su lado inclinado) y la **apotema** de la pirámide (la altura de cada cara) salen con **Pitágoras**.
- La **esfera**: V = (4/3)πR³ y A = 4πR².

[[figura:solido|{"tipo":"piramide","r":6,"h":4,"etq":{"a":"lado","h":"h","ap":"apotema"}}|Pirámide: altura (azul), media base (verde) y apotema (naranja) forman un triángulo rectángulo.]]

> **¿Por qué el área del cono es πR(R + g)?** πR² es la base. La superficie lateral, desenrollada, es un sector de radio g y arco 2πR: su área es (1/2)·g·2πR = πRg.

## Ejemplo · Un cono de r = 3 y h = 4

**g = √(3² + 4²) = 5**

**A = π·3·(3 + 5) = 24π ≈ 75,40**

**V = (1/3)·π·3²·4 = 12π ≈ 37,70**

=== V1 | Nuevo | Una esfera
nivel: 1
pide: Volumen y área de una esfera de radio 6 cm
resultado: **V = 288π ≈ 904,78** cm³ · **A = 144π ≈ 452,39** cm²
--- enunciado
Calcula el volumen y el área de una esfera de 6 cm de radio. Da el resultado exacto (con π) y aproximado.
--- pista Haz el dibujo
Dibuja la esfera con su ecuador y marca el radio desde el centro.

[[dibujo:solido|{"tipo":"esfera","r":6,"etq":{"r":"6 cm"}}|Solo hace falta el radio.]]
--- pista Fórmulas
V = (4/3)πR³ y A = 4πR².
--- solucion
**V = (4/3)·π·6³ = (4/3)·216π = 288π ≈ 904,78** cm³

**A = 4·π·6² = 144π ≈ 452,39** cm²

=== V2 | Nuevo | Un vaso cilíndrico
nivel: 1
pide: Volumen de un cilindro de r = 3 cm y h = 10 cm, en litros
resultado: **V = 90π ≈ 282,74** cm³ ≈ 0,283 L
--- enunciado
Un vaso cilíndrico tiene 3 cm de radio y 10 cm de altura. ¿Cuántos litros caben?
--- pista Haz el dibujo
Dibuja el cilindro, marca el radio de la base y la altura.

[[dibujo:solido|{"tipo":"cilindro","r":3,"h":10,"etq":{"r":"3 cm","h":"10 cm"}}|Base circular de radio 3 y altura 10.]]
--- pista Unidades
V = πR²h en cm³. 1 L = 1000 cm³.
--- solucion
**V = π·3²·10 = 90π ≈ 282,74** cm³

**282,74/1000 ≈ 0,283** L

=== V4 | Nuevo | Un cono completo
nivel: 2
pide: Generatriz, área total y volumen de un cono de r = 5 y h = 12
resultado: **g = 13 · A = 90π ≈ 282,74 · V = 100π ≈ 314,16**
--- enunciado
Un cono tiene 5 cm de radio y 12 cm de altura. Calcula su generatriz, su área total y su volumen.
--- pista Haz el dibujo
Dibuja el cono y, dentro, el triángulo rectángulo formado por la altura, el radio y la generatriz.

[[dibujo:solido|{"tipo":"cono","r":5,"h":12,"etq":{"r":"5","h":"12","g":"g"}}|La generatriz es la hipotenusa.]]
--- pista Pitágoras
g² = 5² + 12². Después A = πR(R + g) y V = (1/3)πR²h.
--- solucion
**g = √(25 + 144) = √169 = 13** cm

**A = π·5·(5 + 13) = 90π ≈ 282,74** cm²

**V = (1/3)·π·25·12 = 100π ≈ 314,16** cm³

=== V5 | Nuevo | Una pirámide
nivel: 2
pide: Pirámide de base cuadrada de lado 6 y altura 4: apotema, área y volumen
resultado: **apotema 5 · A = 96 · V = 48**
--- enunciado
Una pirámide tiene base cuadrada de 6 cm de lado y 4 cm de altura. Calcula la apotema de sus caras, su área total y su volumen.
--- pista Haz el dibujo
Dibuja la pirámide y el triángulo rectángulo que une el centro de la base, el punto medio de un lado de la base y el vértice.

[[dibujo:solido|{"tipo":"piramide","r":6,"h":4,"etq":{"a":"6","h":"4","ap":"?"}}|Catetos: la altura (4) y media base (3).]]
--- pista Pitágoras
apotema² = 4² + 3². Cada cara es un triángulo de base 6 y altura la apotema.
--- solucion
**apotema = √(16 + 9) = 5** cm

**A = 6² + 4·(6·5/2) = 36 + 60 = 96** cm²

**V = (1/3)·36·4 = 48** cm³

> **¿Por qué 3 y no 6?** Desde el centro de la base hasta el lado hay medio lado: 3 cm.

=== D24·2 | Diapositiva 24, ejercicio 2 | El material de una tubería
nivel: 2
pide: Tubería de 2 m, radio interior 6 mm y exterior 7 mm: volumen de material
resultado: **V = 26000π ≈ 81681** mm³ ≈ 81,7 cm³
--- enunciado
Una tubería de dos metros de longitud tiene un radio interior de 6 mm y un radio exterior de 7 mm. Encuentra el volumen de material requerido para fabricar la tubería.
--- pista Haz el dibujo
Dibuja el tubo como un cilindro grande al que se le quita un cilindro más pequeño de la misma longitud. Marca los dos radios.

[[dibujo:solido|{"tipo":"tubo","r":7,"r2":6,"h":20,"etq":{"r":"7 mm","r2":"6 mm","h":"2000 mm"}}|Material = cilindro exterior − hueco interior.]]
--- pista Unidades
Pasa los 2 m a mm: 2000 mm. Resta los dos volúmenes (o las dos áreas de base y multiplica por la longitud).
--- solucion
**V = π·7²·2000 − π·6²·2000 = π·(49 − 36)·2000 = 26000π ≈ 81681** mm³

**81681 mm³ ≈ 81,7** cm³

> **¿Por qué se resta?** El tubo es un cilindro macizo de radio 7 mm al que se le quita el hueco de radio 6 mm.
