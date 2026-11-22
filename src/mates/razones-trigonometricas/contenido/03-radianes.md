---
slug: radianes
titulo: Radianes y ángulos notables
nombre: Radianes y ángulos notables
corto: Radianes
eyebrow: Apartado 3 · diapositivas 11 y 14
desc: 360° = 2π rad. Valores exactos de 30°, 45° y 60° a partir de dos triángulos.
icono: radianes
---
## Idea clave: 180° = π rad

Un **radián** es el ángulo que abarca un arco tan largo como el radio. La circunferencia completa mide 2πr, así que tiene **2π radianes**:

**360° = 2π rad ⟺ 180° = π rad**

**rad = grados·π/180 · grados = rad·180/π**

[[figura:sector|{"r":3,"ang":57.3,"etq":{"r":"r","ang":"1 rad","arco":"arco = r"}}|Un radián: el arco mide lo mismo que el radio (≈ 57,3°).]]

## Ejemplo · Los valores exactos

Los ángulos de 30°, 45° y 60° salen de dos triángulos:

[[figura:tri|{"a":1,"b":1,"c":1.4142,"recto":"C","etq":{"a":"1","b":"1","c":"√2","A":"45°","B":"45°"}}|Medio cuadrado de lado 1: diagonal √2.]]

[[figura:tri|{"a":1,"b":1.7321,"c":2,"recto":"C","etq":{"a":"1","b":"√3","c":"2","A":"30°","B":"60°"}}|Medio triángulo equilátero de lado 2: altura √3.]]

Así, **sen 30° = 1/2**, **cos 30° = √3/2**, **sen 45° = cos 45° = √2/2** (= 1/√2) y **tan 60° = √3**.

> **El truco de la diapositiva 11.** Los senos de 0°, 30°, 45°, 60° y 90° son √0/2, √1/2, √2/2, √3/2 y √4/2. Los cosenos, los mismos al revés.

=== T2 | Nuevo | Grados y radianes
nivel: 1
pide: 150° a radianes, 5π/4 y 2 rad a grados
resultado: **150° = 5π/6 rad · 5π/4 = 225° · 2 rad ≈ 114,59°**
--- enunciado
a) Expresa 150° en radianes. b) Expresa 5π/4 rad y 2 rad en grados.
--- pista Haz el dibujo
Dibuja una circunferencia con 0, π/2, π y 3π/2 en los ejes. Sitúa 150° (un poco antes de π) y 5π/4 (un poco después de π).

[[dibujo:unidad|{"ang":150,"otros":[225],"etq":"150°","etqOtros":["5π/4"],"etqAng":"","cuadrantes":true}|150° está en el 2.º cuadrante; 5π/4, en el 3.º.]]
--- pista La regla de tres
180° son π rad. Multiplica por π/180 o por 180/π.
--- solucion
a) **150·π/180 = 5π/6 rad**

b) **(5π/4)·180/π = 225°** y **2·180/π ≈ 114,59°**

> **¿Por qué 2 rad no lleva π?** Es un número de radianes sin más: 2 rad es algo menos que π rad ≈ 3,14 rad (180°).

=== T3 | Nuevo | Valores exactos
nivel: 1
pide: sen 30°·cos 60° + tan 45° y cos²45° + sen²60°
resultado: **5/4 y 5/4**
--- enunciado
Calcula, sin calculadora:

a) sen 30°·cos 60° + tan 45°   b) cos²45° + sen²60°
--- pista Haz el dibujo
Dibuja los dos triángulos de los ángulos notables (medio cuadrado de lado 1 y medio triángulo equilátero de lado 2) y lee en ellos cada razón.

[[dibujo:tri|{"a":1,"b":1.7321,"c":2,"recto":"C","etq":{"a":"1","b":"√3","c":"2","A":"30°","B":"60°"}}|sen 30° = 1/2 y cos 60° = 1/2: los dos son el lado 1 entre la hipotenusa 2.]]
--- pista Los valores
sen 30° = 1/2, cos 60° = 1/2, tan 45° = 1, cos 45° = √2/2, sen 60° = √3/2.
--- solucion
a) **(1/2)·(1/2) + 1 = 1/4 + 1 = 5/4**

b) **(√2/2)² + (√3/2)² = 2/4 + 3/4 = 5/4**

=== D16·3 | Diapositiva 16, ejercicio 3 | De grados a radianes
nivel: 1
pide: Fórmula para pasar de grados a radianes y al revés
resultado: **rad = grados·π/180 · grados = rad·180/π**
--- enunciado
Encuentra una fórmula para cambiar grados sexagesimales a radianes y viceversa.
--- pista Haz el dibujo
Dibuja la circunferencia y marca media vuelta: en grados son 180° y en radianes, la mitad de la longitud de la circunferencia de radio 1.

[[dibujo:sector|{"r":3,"ang":180,"girar":0,"etq":{"r":"1","ang":"180° = π rad","arco":"π"}}|Media vuelta: un arco de longitud π en la circunferencia de radio 1.]]
--- pista Regla de tres
Si 180° son π rad, ¿cuántos radianes son x grados?
--- solucion
**180° ↔ π rad ⟹ x grados ↔ x·π/180 rad**

**rad = grados·π/180 · grados = rad·180/π**

Por ejemplo, 90° = π/2 rad y 1 rad = 180°/π ≈ 57,3°.
