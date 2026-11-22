---
slug: coseno
titulo: Teorema del coseno
nombre: Teorema del coseno
corto: Coseno
eyebrow: Apartado 2 · diapositiva 18
desc: a² = b² + c² − 2bc·cos A. Con tres lados, o dos lados y el ángulo que forman.
icono: coseno
---
## Idea clave: Pitágoras con una corrección

**a² = b² + c² − 2bc·cos A**

> **¿Por qué es Pitágoras?** Si A = 90°, cos A = 0 y queda a² = b² + c². Si A es agudo, el lado a es más corto y se resta algo; si es obtuso, cos A < 0 y a sale más largo.

Para calcular un **ángulo** a partir de los tres lados, se despeja:

**cos A = (b² + c² − a²)/(2bc)**

[[widget:triangulo|{"caso":"LAL","b":5,"c":8,"A":60}]]

## Ejemplo · b = 5, c = 8 y A = 60°

[[figura:tri|{"b":5,"c":8,"A":60,"etq":{"b":"5","c":"8","A":"60°","a":"a = ?"},"foco":["a"]}|A es el ángulo comprendido entre b y c.]]

**a² = 25 + 64 − 2·5·8·cos 60° = 89 − 40 = 49 ⟹ a = 7**

=== R2 | Nuevo | El tercer lado
nivel: 1
pide: b = 7, c = 9, A = 50°: calcular a
resultado: **a ≈ 7,00**
widget: triangulo {"caso":"LAL","b":7,"c":9,"A":50}
--- enunciado
En un triángulo, b = 7 cm, c = 9 cm y el ángulo comprendido entre ellos es A = 50°. Calcula el lado a.
--- pista Haz el dibujo
Dibuja los lados b y c saliendo del vértice A con 50° entre ellos. El lado a cierra el triángulo, enfrente de A.

[[dibujo:tri|{"b":7,"c":9,"A":50,"etq":{"b":"7","c":"9","A":"50°","a":"a = ?"},"foco":["a"]}|Dos lados y el ángulo que forman: teorema del coseno.]]
--- pista El teorema
a² = 7² + 9² − 2·7·9·cos 50°.
--- solucion
**a² = 49 + 81 − 126·cos 50° ≈ 130 − 80,99 = 49,01 ⟹ a ≈ 7,00** cm

=== R4 | Nuevo | Los ángulos de un triángulo
nivel: 2
pide: Ángulos del triángulo de lados 5, 7 y 9
resultado: **A ≈ 33,56° (opuesto a 5) · B ≈ 50,70° (opuesto a 7) · C ≈ 95,74° (opuesto a 9)**
widget: triangulo {"caso":"LLL","a":5,"b":7,"c":9}
--- enunciado
Calcula los tres ángulos del triángulo de lados 5, 7 y 9 cm.
--- pista Haz el dibujo
Dibuja el triángulo (aproximadamente) y llama a = 5, b = 7 y c = 9. El ángulo mayor está enfrente del lado mayor.

[[dibujo:tri|{"a":5,"b":7,"c":9,"etq":{"a":"5","b":"7","c":"9","A":"A","B":"B","C":"C"},"foco":["A","B","C"]}|C, enfrente del lado de 9, es el mayor.]]
--- pista Empieza por el mayor
cos C = (5² + 7² − 9²)/(2·5·7). Si sale negativo, C es obtuso.
--- solucion
**cos C = (25 + 49 − 81)/70 = −0,1 ⟹ C ≈ 95,74°**

**cos A = (49 + 81 − 25)/(2·7·9) = 105/126 ⟹ A ≈ 33,56°**

**B = 180° − 95,74° − 33,56° ≈ 50,70°**

> **¿Por qué empezar por el mayor?** Es el único que puede ser obtuso, y el coseno lo detecta (sale negativo). Los otros dos ya son agudos seguro.

=== R7 | Nuevo | Dos barcos
nivel: 3
pide: Barcos con demoras 040° y 110° que recorren 12 y 18 km: distancia entre ellos
resultado: **≈ 17,90** km
--- enunciado
Dos barcos salen a la vez del mismo puerto. Uno navega 12 km con demora 040° y el otro, 18 km con demora 110°. ¿Qué distancia los separa?
--- pista Haz el dibujo
Dibuja el norte en el puerto y los dos trayectos con sus demoras (desde el norte, en sentido horario). El ángulo entre los trayectos es la diferencia de las demoras.

[[dibujo:geo|{"pts":{"P":[0,0],"A":[7.71,9.19],"B":[16.91,-6.16]},"el":[["norte","P",7],["seg","P","A",{"k":"p"}],["seg","P","B",{"k":"n"}],["seg","A","B",{"k":"fr","dash":true}],["ang","P","A","B","70°",{"k":"v"}],["cota","P","A","12",{"lado":1,"k":"p"}],["cota","P","B","18",{"lado":-1,"k":"n"}],["cota","A","B","d = ?",{"lado":-1,"k":"fr"}],["pt","P","so","Puerto"],["pt","A","n"],["pt","B","se"]],"alto":280}|110° − 40° = 70° entre los dos trayectos.]]
--- pista El teorema
Dos lados (12 y 18) y el ángulo que forman (70°): coseno.
--- solucion
**ángulo en el puerto = 110° − 40° = 70°**

**d² = 12² + 18² − 2·12·18·cos 70° ≈ 468 − 147,75 = 320,25 ⟹ d ≈ 17,90** km
