---
slug: razones
titulo: Seno, coseno y tangente
nombre: Razones en el triángulo rectángulo
corto: Razones
eyebrow: Apartado 2 · diapositivas 9 y 10
desc: Cocientes entre lados de un triángulo rectángulo, y sus gráficas al dar vueltas a la circunferencia.
icono: rrtt
---
## Idea clave: cocientes entre lados

En un triángulo rectángulo, para un ángulo agudo θ:

- **seno** = cateto opuesto entre hipotenusa
- **coseno** = cateto contiguo entre hipotenusa
- **tangente** = cateto opuesto entre cateto contiguo

**tan θ = sen θ/cos θ**

[[figura:tri|{"a":3,"b":4,"c":5,"recto":"C","etq":{"a":"opuesto","b":"contiguo","c":"hipotenusa","A":"θ"},"espejo":false}|El cateto opuesto está enfrente de θ; el contiguo forma θ con la hipotenusa.]]

> **¿Por qué no dependen del tamaño?** Todos los triángulos rectángulos con el ángulo θ son semejantes: sus lados son proporcionales y los cocientes no cambian.

Como sen θ y cos θ son las coordenadas de un punto de la circunferencia unidad, están siempre **entre −1 y 1**. La tangente puede valer cualquier número y no existe en 90° y 270° (allí cos θ = 0).

[[figura:grafica|{"f":"sen","rad":true,"x":[0,2],"y":[-1.4,1.4]}|sen x: periodo 2π, entre −1 y 1.]]

[[figura:grafica|{"f":"cos","rad":true,"x":[0,2],"y":[-1.4,1.4]}|cos x: la misma onda desplazada π/2.]]

[[figura:grafica|{"f":"tan","rad":true,"x":[0,2]}|tan x: periodo π y asíntotas en π/2 y 3π/2.]]

## Ejemplo · El triángulo 5-12-13

Para el ángulo opuesto al lado 5: **sen θ = 5/13, cos θ = 12/13, tan θ = 5/12**, y θ = arctan(5/12) ≈ 22,6°.

=== T1 | Nuevo | El triángulo 3-4-5
nivel: 1
pide: sen, cos, tan y el ángulo en un triángulo de lados 3, 4 y 5
resultado: **sen θ = 3/5 · cos θ = 4/5 · tan θ = 3/4 · θ ≈ 36,87°**
--- enunciado
Un triángulo rectángulo tiene catetos de 3 y 4 cm y una hipotenusa de 5 cm. Para el ángulo θ opuesto al cateto de 3 cm, calcula sen θ, cos θ y tan θ, y después θ.
--- pista Haz el dibujo
Dibuja el triángulo, marca el ángulo recto y el ángulo θ, y escribe junto a cada lado si es el opuesto, el contiguo o la hipotenusa.

[[dibujo:tri|{"a":3,"b":4,"c":5,"recto":"C","etq":{"a":"3 (opuesto)","b":"4 (contiguo)","c":"5","A":"θ"}}|El lado de 3 está enfrente de θ.]]
--- pista Los cocientes
El seno es el opuesto entre la hipotenusa; el coseno, el contiguo entre la hipotenusa; y la tangente, el opuesto entre el contiguo.
--- solucion
**sen θ = 3/5 · cos θ = 4/5 · tan θ = 3/4**

**θ = arctan(3/4) ≈ 36,87°**

Comprobación: (3/5)² + (4/5)² = 9/25 + 16/25 = 1. ✓

=== D26·3 | Diapositivas 26 y 28 | Las gráficas de sen, cos y tan
nivel: 1
pide: Representar sen x, cos x y tan x en radianes
resultado: **Periodos 2π, 2π y π · recorridos [−1, 1], [−1, 1] y ℝ · asíntotas de tan en π/2 + kπ**
widget: ecuacion {"f":"sen","k":0}
--- enunciado
Representa gráficamente sen x, cos x y tan x usando radianes (en la calculadora, en modo RAD). Indica de cada una el periodo, el recorrido y los ceros, y las asíntotas de la tangente.
--- pista Haz el dibujo
Dibuja unos ejes con x de 0 a 2π, marcando π/2, π, 3π/2 y 2π, y en y el −1 y el 1. Sitúa los puntos de los ángulos notables (sen 0 = 0, sen π/2 = 1, sen π = 0…) y únelos con una curva suave.

[[dibujo:grafica|{"f":"sen","rad":true,"x":[0,2],"y":[-1.4,1.4]}|Así queda el seno; el coseno es la misma onda empezando en 1.]]
--- pista La tangente
tan x = sen x/cos x: no existe donde cos x = 0 (π/2 y 3π/2) y vale 0 donde sen x = 0.
--- solucion
[[figura:grafica|{"f":"sen","rad":true,"x":[0,2],"y":[-1.4,1.4]}|**sen x**: periodo 2π, recorrido [−1, 1], ceros en 0, π, 2π.]]

[[figura:grafica|{"f":"cos","rad":true,"x":[0,2],"y":[-1.4,1.4]}|**cos x**: periodo 2π, recorrido [−1, 1], ceros en π/2 y 3π/2.]]

[[figura:grafica|{"f":"tan","rad":true,"x":[0,2]}|**tan x**: periodo π, recorrido ℝ, ceros en 0, π, 2π y asíntotas en π/2 y 3π/2.]]

> **¿Por qué la tangente tiene periodo π?** Al sumar π al ángulo, el seno y el coseno cambian los dos de signo, y su cociente no cambia.
