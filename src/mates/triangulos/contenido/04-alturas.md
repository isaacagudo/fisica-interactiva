---
slug: alturas
titulo: Alturas, distancias y ángulos en 3D
nombre: Alturas, distancias y 3D
corto: Alturas y 3D
eyebrow: Apartado 4 · diapositivas 24, 27 y 28
desc: Dos triángulos rectángulos que comparten un lado, y el ángulo de una recta con un plano a través de su proyección.
icono: elevacion
---
## Idea clave: dos triángulos y una incógnita común

En los problemas de alturas con **dos ángulos medidos desde dos sitios**, hay dos triángulos rectángulos que comparten la altura. El método:

1. **Dibuja** los dos triángulos y llama h a la altura y x a la distancia que no conoces.
2. **Escribe una tangente en cada triángulo**: tan α = h/x y tan β = h/(x + d).
3. **Resuelve el sistema** (despeja h de las dos e iguala).

[[figura:alturas|{"h":38.97,"d":[22.5,67.5],"ang":["60°","30°"],"etqh":"h","etqd":["x","d"],"objeto":"torre"}|Desde más cerca se ve con más ángulo: los dos triángulos comparten h.]]

**En 3D**, el ángulo entre una recta y un plano es el que forma la recta con su **proyección** sobre el plano (su «sombra» vista desde arriba). Se busca un triángulo rectángulo con la recta, su proyección y la altura.

## Ejemplo · La diagonal de un cubo

En un cubo de arista 1, la diagonal de la base mide √2 y la altura, 1:

[[figura:caja|{"a":4,"b":4,"c":4,"diag":["F","D"],"etq":{"proy":"√2","ang":"θ"}}|La diagonal FD, su proyección BD en la base y la arista BF forman un triángulo rectángulo.]]

**tan θ = 1/√2 ⟹ θ ≈ 35,26°**

=== D24·3 | Diapositiva 24, ejercicio 3 | La diagonal de un ortoedro
nivel: 2
pide: Ángulo entre la diagonal FD y la base del ortoedro 12 × 5 × 4
resultado: **θ ≈ 17,10°**
--- enunciado
Calcula el ángulo entre la diagonal FD y la base ABCD del paralelepípedo de la figura, con AD = 12 cm, DC = 5 cm y CG = 4 cm.

[[figura:caja|{"a":12,"b":5,"c":4,"etq":{"a":"12 cm","b":"5 cm","c":"4 cm"}}|El ortoedro: base ABCD y caras verticales de 4 cm.]]
--- pista Haz el dibujo
Dibuja la diagonal FD y su proyección sobre la base (desde el pie de F, que es B, hasta D). Con la arista BF forman un triángulo rectángulo.

[[dibujo:caja|{"a":12,"b":5,"c":4,"diag":["F","D"],"etq":{"a":"12","b":"5","c":"4","proy":"BD","ang":"θ"}}|Triángulo FBD, rectángulo en B.]]
--- pista Dos pasos
BD es la diagonal de un rectángulo de 12 × 5. Después tan θ = BF/BD.
--- solucion
**BD = √(12² + 5²) = 13** cm

**tan θ = 4/13 ⟹ θ ≈ 17,10°**

> **¿Por qué BD?** F está justo encima de B: la «sombra» de FD sobre la base es BD.

=== D27·1 | Diapositiva 27, ejercicio | El globo y el lago
nivel: 3
pide: Globo a 250 m; ángulos de depresión de 68° y 32° a los extremos del lago
resultado: **≈ 299,08** m
--- enunciado
Desde un globo de aire caliente, los ángulos de depresión a cada extremo del lago son 68° y 32°. Si el globo está a 250 m de altitud, encuentra la longitud del lago. (El globo está sobre tierra, a un lado del lago, como en el dibujo de clase.)
--- pista Haz el dibujo
Dibuja el globo, la vertical hasta el suelo y una horizontal desde el globo. Las dos visuales bajan hacia los dos extremos del lago: los ángulos se miden **desde la horizontal**.

[[dibujo:alturas|{"h":250,"d":[101,400],"ang":["68°","32°"],"arriba":true,"objeto":"globo","etqh":"250 m","etqd":["x₁","lago"],"lago":[101,400],"etqlago":""}|El extremo cercano se ve con más ángulo (68°) que el lejano (32°).]]
--- pista Pasar a elevación
El ángulo de depresión desde el globo es igual al de elevación desde el suelo (alternos). En cada triángulo, tan α = 250/x, siendo x la distancia horizontal.
--- pista Restar
Longitud del lago = distancia al extremo lejano − distancia al cercano.
--- solucion
**x₁ = 250/tan 68° ≈ 101,01** m (extremo cercano)

**x₂ = 250/tan 32° ≈ 400,08** m (extremo lejano)

**longitud ≈ 400,08 − 101,01 ≈ 299,08** m

> **¿Por qué se divide?** La tangente es la altura entre la distancia; despejando, la distancia es la altura entre la tangente.

=== D28·1 | Diapositiva 28, ejercicio | La estatua del lago
nivel: 3
pide: Estatua en el centro de un lago: 60° desde la orilla, 30° a 45 dm más: altura y superficie del lago
resultado: **x = 22,5 dm · h = 22,5√3 ≈ 38,97 dm · superficie 506,25π ≈ 1590,43** dm²
--- enunciado
Se quiere medir la altura de una estatua colocada en el centro de un lago circular. Desde el borde del lago, la visual al extremo superior de la estatua forma 60° con la horizontal; nos alejamos 45 dm y volvemos a medir: 30°. Averigua la altura de la estatua y la superficie del lago.
--- pista Haz el dibujo
Dibuja la estatua en el centro del lago y los dos puntos de observación en la misma línea: el borde (a distancia x, que es el radio del lago) y otro 45 dm más lejos. Marca los dos ángulos.

[[dibujo:alturas|{"h":38.97,"d":[22.5,67.5],"ang":["60°","30°"],"etqh":"h","etqd":["x (radio)","45 dm"],"objeto":"estatua","lago":[-22.5,22.5]}|Los dos triángulos rectángulos comparten la altura h.]]
--- pista Dos tangentes
tan 60° = h/x y tan 30° = h/(x + 45).
--- pista Iguala
h = x√3 y h = (x + 45)/√3.
--- solucion
**h = x·tan 60° = x√3** y **h = (x + 45)·tan 30° = (x + 45)/√3**

**x√3 = (x + 45)/√3 ⟹ 3x = x + 45 ⟹ x = 22,5** dm

**h = 22,5√3 ≈ 38,97** dm

El radio del lago es x = 22,5 dm:

**S = π·22,5² = 506,25π ≈ 1590,43** dm²

> **¿Por qué x es el radio?** La primera medida se toma desde el borde y la estatua está en el centro: esa distancia es el radio.
