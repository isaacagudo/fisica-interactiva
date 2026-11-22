---
slug: sector
titulo: Circunferencia, arco y sector
nombre: Circunferencia, arco y sector
corto: Sector
eyebrow: Apartado 3 · diapositivas 14, 15 y 25
desc: Cuerda, diámetro, radio, secante y tangente. Con θ en radianes, el arco mide R·θ y el sector (1/2)·R²·θ.
icono: sector
---
## Idea clave: con radianes, todo es proporcional

[[figura:geo|{"pts":{"O":[0,0],"A":[-0.8,0.6],"B":[0.8,0.6],"C":[-1,0],"D":[1,0],"T":[0,-1],"T1":[-1.2,-1],"T2":[1.2,-1],"S1":[-1.3,-0.55],"S2":[1.3,0.25]},"el":[["circ","O",1,{"k":"eje"}],["seg","A","B",{"k":"p"}],["seg","C","D",{"k":"n"}],["seg","O","B",{"k":"v"}],["seg","T1","T2",{"k":"fr"}],["seg","S1","S2",{"k":"eje","dash":true}],["pt","O","s","centro"],["txt",[0,0.6],"cuerda",{"pos":"n","k":"p"}],["txt",[-0.6,0],"diámetro",{"pos":"s","k":"n"}],["txt",[0.45,0.35],"radio",{"pos":"e","k":"v"}],["txt",[0.9,-1],"tangente",{"pos":"s","k":"fr"}],["txt",[1.3,0.25],"secante",{"pos":"e","k":"eje"}]],"alto":260}|Cuerda (une dos puntos), diámetro (cuerda por el centro), radio, secante (corta dos veces) y tangente (toca una vez).]]

La circunferencia completa (2π rad) mide 2πR y el círculo, πR². Un sector de ángulo θ es la fracción θ/(2π) de todo:

**L = R·θ · A = (1/2)·R²·θ · perímetro = 2R + R·θ**

> **¿Por qué solo en radianes?** L = (θ/2π)·2πR = Rθ. Con grados la fracción sería θ/360 y la fórmula llevaría π/180: L = πRθ/180.

[[widget:sector|{"r":6,"ang":120}]]

## Ejemplo · R = 6 y θ = 2π/3

**L = 6·(2π/3) = 4π ≈ 12,57 · A = (1/2)·36·(2π/3) = 12π ≈ 37,70**

=== V3 | Nuevo | Arco y área
nivel: 1
pide: Arco y área de un sector de r = 8 y 60°
resultado: **L = 8π/3 ≈ 8,38 · A = 32π/3 ≈ 33,51**
widget: sector {"r":8,"ang":60}
--- enunciado
Un sector circular tiene 8 cm de radio y un ángulo de 60°. Calcula la longitud de su arco y su área.
--- pista Haz el dibujo
Dibuja el sector, marca el radio, el ángulo y el arco.

[[dibujo:sector|{"r":8,"ang":60,"etq":{"r":"8","ang":"60°","arco":"L = ?"}}|El arco es la parte curva.]]
--- pista Radianes primero
60° = π/3 rad.
--- solucion
**θ = 60·π/180 = π/3**

**L = 8·π/3 ≈ 8,38** cm

**A = (1/2)·64·(π/3) = 32π/3 ≈ 33,51** cm²

=== D25·1 | Diapositiva 25, ejercicio 1 | Del perímetro al ángulo
nivel: 2
pide: Sector de r = 10 cm y perímetro 20 + 9π: ángulo y área
resultado: **θ = 0,9π** rad = 162° · **A = 45π ≈ 141,37** cm²
widget: sector {"r":10,"ang":162}
--- enunciado
Un sector circular tiene un radio de 10 cm y un perímetro de 20 + 9π cm. Encuentra el área y el ángulo del sector.
--- pista Haz el dibujo
Dibuja el sector y fíjate en qué partes forman el perímetro: dos radios y el arco.

[[dibujo:sector|{"r":10,"ang":162,"etq":{"r":"10","ang":"θ","arco":"9π"}}|Perímetro = 10 + 10 + arco: el arco es 9π.]]
--- pista El arco
2·10 + 10θ = 20 + 9π.
--- solucion
**20 + 10θ = 20 + 9π ⟹ θ = 9π/10 = 0,9π rad = 162°**

**A = (1/2)·100·(9π/10) = 45π ≈ 141,37** cm²

=== D25·2 | Diapositiva 25, ejercicio 2 | El radio a partir del perímetro
nivel: 1
pide: Comprobar que r = p/(2 + θ)
resultado: **p = 2r + rθ = r(2 + θ)**
--- enunciado
Comprueba que el radio de un sector de perímetro p y ángulo θ (en radianes) es r = p/(2 + θ).
--- pista Haz el dibujo
Dibuja un sector y escribe la longitud de cada trozo de su borde en función de r y de θ.

[[dibujo:sector|{"r":6,"ang":100,"etq":{"r":"r","ang":"θ","arco":"rθ"}}|Dos radios rectos y un arco rθ.]]
--- pista Factor común
p = r + r + rθ.
--- solucion
**p = r + r + rθ = r(2 + θ) ⟹ r = p/(2 + θ)**

Comprobación con el ejercicio anterior: (20 + 9π)/(2 + 0,9π) = 10. ✓

=== V7 | Nuevo | De sector a cono
nivel: 3
pide: Cono que se forma al enrollar un sector de r = 10 y 216°
resultado: **radio 6 · altura 8 · V = 96π ≈ 301,59**
--- enunciado
Se recorta un sector de 10 cm de radio y 216° de amplitud y se enrolla hasta formar un cono (sin base). Calcula el radio de la base del cono, su altura y su volumen.
--- pista Haz el dibujo
Dibuja el sector y, al lado, el cono. El radio del sector pasa a ser la **generatriz** del cono y el arco, la **circunferencia de su base**.

[[dibujo:sector|{"r":10,"ang":216,"etq":{"r":"10 = g","ang":"216°","arco":"arco = 2πr"}}|El arco se convierte en el borde de la base del cono.]]
--- pista Dos igualdades
Arco = 10·(216π/180) = 12π. Base: 2πr = 12π. Después h² = g² − r².
--- solucion
**arco = 10·(216·π/180) = 12π ⟹ 2πr = 12π ⟹ r = 6** cm

**h = √(10² − 6²) = 8** cm

**V = (1/3)·π·36·8 = 96π ≈ 301,59** cm³

[[figura:solido|{"tipo":"cono","r":6,"h":8,"etq":{"r":"6","h":"8","g":"10"}}|El cono resultante: generatriz 10, radio 6 y altura 8.]]
