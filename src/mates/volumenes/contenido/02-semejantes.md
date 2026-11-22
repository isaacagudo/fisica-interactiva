---
slug: semejantes
titulo: Cuerpos semejantes
nombre: Cuerpos semejantes
corto: Semejantes
eyebrow: Apartado 2 · diapositiva 24
desc: Si las longitudes se multiplican por k, las áreas se multiplican por k² y los volúmenes por k³.
icono: semejantes
---
## Idea clave: k, k² y k³

Dos cuerpos son **semejantes** si uno es una ampliación o una reducción del otro: todas sus longitudes están multiplicadas por el mismo número **k** (la razón de semejanza).

**longitudes × k · áreas × k² · volúmenes × k³**

> **¿Por qué al cuadrado y al cubo?** Un área es un producto de dos longitudes (cada una se multiplica por k) y un volumen, de tres.

[[widget:semejanza|{"k":2,"r":3,"h":4}]]

## Ejemplo · Un cono el doble de alto

Si un cono tiene un volumen de 50 cm³ y otro semejante tiene el doble de altura (k = 2), su volumen es **50·2³ = 400** cm³, no 100.

=== V6 | Nuevo | Una maqueta
nivel: 2
pide: Maqueta a escala 1:50: área y volumen reales
resultado: 7,5 m² y 15 m³
widget: semejanza {"k":2.5,"r":2,"h":3}
--- enunciado
La maqueta de un depósito está hecha a escala 1:50. En la maqueta, el depósito tiene una superficie de 30 cm² y un volumen de 120 cm³. ¿Cuáles son la superficie y el volumen reales, en m² y m³?
--- pista Haz el dibujo
Dibuja el depósito pequeño y el grande uno al lado del otro y escribe sobre cada uno cuánto se multiplican sus longitudes, sus áreas y sus volúmenes.

[[dibujo:geo|{"pts":{"a":[0,0],"b":[1,0],"c":[1,1],"d":[0,1],"e":[2,0],"f":[7,0],"g":[7,5],"h":[2,5]},"el":[["pol",["a","b","c","d"],{"fill":"p"}],["pol",["a","b","c","d"]],["pol",["e","f","g","h"],{"fill":"v"}],["pol",["e","f","g","h"],{"k":"v"}],["txt",[0.5,1],"maqueta",{"pos":"n"}],["txt",[4.5,5],"real: longitudes ×50",{"pos":"n","k":"v"}],["txt",[4.5,2.5],"áreas ×50²",{"k":"v"}],["txt",[4.5,1.5],"volúmenes ×50³",{"k":"v"}]],"alto":220}|Escala 1:50: k = 50.]]
--- pista Las razones
k = 50, k² = 2500, k³ = 125 000. Después pasa las unidades: 1 m² = 10 000 cm² y 1 m³ = 1 000 000 cm³.
--- solucion
**A = 30·50² = 75000** cm² = **7,5** m²

**V = 120·50³ = 15000000** cm³ = **15** m³

=== D24·1 | Diapositiva 24, ejercicio 1 | Un cono y su semejante
nivel: 3
pide: Cono de 40 cm de diámetro y 4,8 L: relación h/r y capacidad de un cono semejante de r = 15 cm
resultado: **h = 36/π ≈ 11,46** cm · **h/r = 1,8/π ≈ 0,573** · **2,025** L
widget: semejanza {"k":0.75,"r":4,"h":2.3}
--- enunciado
Un cono tiene como base una circunferencia de 40 cm de diámetro y una capacidad de 4,8 litros.

1. Calcula la relación entre la altura y el radio.
2. Calcula la capacidad de un cono semejante de 15 cm de radio.
--- pista Haz el dibujo
Dibuja el cono con el radio de la base (la mitad de 40 cm) y la altura desconocida. Al lado, un cono semejante más pequeño de radio 15 cm.

[[dibujo:solido|{"tipo":"cono","r":20,"h":11.46,"etq":{"r":"20 cm","h":"h = ?"}}|Radio 20 cm (la mitad del diámetro) y volumen 4800 cm³.]]
--- pista La altura
4,8 L = 4800 cm³. Despeja h de (1/3)·π·20²·h = 4800.
--- pista El semejante
La razón es k = 15/20. El volumen se multiplica por k³.
--- solucion
1. Con r = 20 cm y V = 4800 cm³:

**(1/3)·π·400·h = 4800 ⟹ h = 14400/(400π) = 36/π ≈ 11,46** cm

**h/r = (36/π)/20 = 1,8/π ≈ 0,573**

2. **k = 15/20 = 0,75 ⟹ V′ = 4,8·0,75³ = 4,8·0,421875 = 2,025** L

> **¿Por qué k³?** La capacidad es un volumen: si el radio y la altura se multiplican por 0,75, el volumen se multiplica por 0,75³.
