---
slug: recta
titulo: Ecuaciones de la recta
nombre: Ecuaciones de la recta
corto: Recta
eyebrow: Apartado 2 · diapositiva 6
desc: Un punto y un vector bastan para escribir la recta de seis formas: vectorial, paramétrica, continua, general, explícita y punto-pendiente.
icono: recta
---
## Idea clave: un punto y una dirección

Una recta queda fija con **un punto** P(x₀, y₀) por el que pasa y **un vector director** v = (v₁, v₂) que marca su dirección. Si conocemos dos puntos, el vector es su resta: v = (x₁ − x₀, y₁ − y₀).

| Forma | Ecuación | Para qué sirve |
| --- | --- | --- |
| Vectorial | (x, y) = (x₀, y₀) + λ(v₁, v₂) | Recorrer la recta: cada λ es un punto |
| Paramétrica | x = x₀ + λv₁, y = y₀ + λv₂ | La misma, coordenada a coordenada |
| Continua | (x − x₀)/v₁ = (y − y₀)/v₂ | Despejando λ de las dos e igualando |
| General | ax + by + c = 0 | Posiciones relativas, sistemas |
| Explícita | y = mx + n | Leer la pendiente m y la ordenada en el origen n |
| Punto-pendiente | y − y₀ = m(x − x₀) | Escribirla rápido con un punto y m |

> **¿Por qué m = v₂/v₁?** La pendiente es lo que se sube por cada unidad que se avanza: v₂ arriba por cada v₁ a la derecha. En la forma general, m = −a/b.

Mueve A y B y mira cómo cambian todas las formas a la vez:

[[widget:recta|{"A":[-1,2],"B":[3,4]}]]

## Ejemplo · La recta por (−1, 2) y (3, 4)

**v = (3 − (−1), 4 − 2) = (4, 2) ⟹ m = 2/4 = 1/2**

**y − 2 = (1/2)(x + 1) ⟹ y = x/2 + 5/2**

Multiplicando por 2 y pasando todo a un lado: **x − 2y + 5 = 0** (forma general).

[[figura:geo|{"ejes":{"x":[-3,5],"y":[-1,6],"rejilla":true},"pts":{"A":[-1,2],"B":[3,4]},"el":[["recta",0.5,2.5,{"k":"p"}],["flecha","A","B",{"k":"fr"}],["pt","A","no"],["pt","B","no"],["txt",[1.3,2.6],"v = (4, 2)",{"k":"fr"}]],"alto":280}|El vector director va de A a B: avanza 4 y sube 2.]]

=== A2 | Nuevo | Por dos puntos
nivel: 1
pide: Pendiente y ecuación de la recta por A(1, 3) y B(4, −3)
resultado: **m = −2 · y = −2x + 5**
widget: recta {"A":[1,3],"B":[4,-3]}
--- enunciado
Halla la pendiente y la ecuación explícita de la recta que pasa por A(1, 3) y B(4, −3).
--- pista Haz el dibujo
Sitúa A y B, une los puntos y dibuja el «escalón»: cuánto se avanza en x y cuánto se baja en y al ir de A a B.

[[dibujo:geo|{"ejes":{"x":[-1,6],"y":[-4,6],"rejilla":true},"pts":{"A":[1,3],"B":[4,-3],"C":[4,3]},"el":[["recta",-2,5,{"k":"p"}],["seg","A","C",{"dash":true,"k":"n"}],["seg","C","B",{"dash":true,"k":"n"}],["cota","A","C","+3",{"lado":1,"k":"n"}],["cota","C","B","−6",{"lado":1,"k":"n"}],["pt","A","no"],["pt","B","so"]],"alto":300}|Avanza 3 y baja 6: la recta cae 2 por cada unidad.]]
--- pista Pendiente
m = (−3 − 3)/(4 − 1). Después, punto-pendiente con A.
--- solucion
**m = (−3 − 3)/(4 − 1) = −6/3 = −2**

**y − 3 = −2(x − 1) ⟹ y = −2x + 5**

Comprobación con B: −2·4 + 5 = −3. ✓

=== A3 | Nuevo | De la forma general a la explícita
nivel: 1
pide: Pendiente, ordenada en el origen y vectores de 3x − 2y + 6 = 0
resultado: **y = 1,5x + 3 · m = 3/2 · v = (2, 3) · normal (3, −2)**
--- enunciado
Para la recta 3x − 2y + 6 = 0, halla: a) su forma explícita, su pendiente y su ordenada en el origen; b) un vector director y un vector perpendicular.
--- pista Haz el dibujo
Busca dos puntos fáciles: el corte con el eje Y (x = 0) y con el eje X (y = 0). Dibuja la recta y, desde un punto, el vector director y el perpendicular.

[[dibujo:geo|{"ejes":{"x":[-4,3],"y":[-1,6],"rejilla":true},"pts":{"P":[0,3],"Q":[-2,0],"V":[2,6],"N":[3,1]},"el":[["recta",1.5,3,{"k":"p"}],["flecha","P","V",{"k":"fr"}],["flecha","P","N",{"k":"n"}],["pt","P","no","(0, 3)"],["pt","Q","no","(−2, 0)"],["txt","V","director (2, 3)",{"pos":"e","k":"fr"}],["txt","N","normal (3, −2)",{"pos":"e","k":"n"}]],"alto":300}|El director va a lo largo de la recta; el normal, perpendicular.]]
--- pista Despeja y
2y = 3x + 6. Para los vectores: director (−b, a) y normal (a, b), con a = 3 y b = −2.
--- solucion
a) **2y = 3x + 6 ⟹ y = 1,5x + 3**: pendiente **m = 3/2** y ordenada en el origen **n = 3**.

b) Con a = 3 y b = −2: **director (−b, a) = (2, 3)** y **normal (a, b) = (3, −2)**.

> **¿Por qué (−b, a) es director?** Su pendiente es a/(−b) = 3/2, la de la recta. Y (a, b) es perpendicular porque (a, b)·(−b, a) = −ab + ab = 0.
