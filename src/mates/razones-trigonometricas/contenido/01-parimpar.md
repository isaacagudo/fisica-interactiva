---
slug: par-impar
titulo: Funciones par e impar
nombre: Funciones par e impar
corto: Par e impar
eyebrow: Apartado 1 · diapositiva 8
desc: f(−x) = f(x) es simétrica respecto al eje Y; f(−x) = −f(x), respecto al origen.
icono: parimpar
---
## Idea clave: qué pasa al cambiar x por −x

- **Par**: f(−x) = f(x). La gráfica es **simétrica respecto al eje Y**: lo de la izquierda es el espejo de lo de la derecha. Ejemplo: x².
- **Impar**: f(−x) = −f(x). La gráfica es **simétrica respecto al origen**: si giras la gráfica media vuelta, queda igual. Ejemplo: x³.
- Muchas funciones **no son ni par ni impar**.

[[figura:geo|{"ejes":{"x":[-2.2,2.2],"y":[-3,4]},"pts":{"a":[-1.5,2.25],"b":[1.5,2.25],"c":[-1.2,-1.728],"d":[1.2,1.728]},"el":[["curva","x*x",-2.2,2.2,{"k":"p"}],["curva","x*x*x",-2.2,2.2,{"k":"fr"}],["seg","a","b",{"dash":true,"k":"p"}],["seg","c","d",{"dash":true,"k":"fr"}],["txt",[1.95,3.6],"x² (par)",{"k":"p","pos":"o"}],["txt",[1.6,-2.6],"x³ (impar)",{"k":"fr","pos":"e"}]],"alto":320}|x² vale lo mismo en −1,5 y en 1,5; x³ cambia de signo.]]

> **¿Para qué sirve aquí?** El coseno es par y el seno y la tangente, impares: cos(−θ) = cos θ y sen(−θ) = −sen θ. Así se calculan las razones de ángulos negativos.

## Ejemplo · ¿Es par f(x) = x⁴ − 3x²?

**f(−x) = (−x)⁴ − 3(−x)² = x⁴ − 3x² = f(x)**: es **par**.

> **¿Por qué desaparecen los signos?** Una potencia par de −x es positiva: (−x)⁴ = x⁴ y (−x)² = x².

=== T4 | Nuevo | ¿Par, impar o ninguna?
nivel: 1
pide: Clasificar x³ − x, x² + cos x y x + 1
resultado: **x³ − x impar · x² + cos x par · x + 1 ninguna**
--- enunciado
Estudia si son pares, impares o ninguna de las dos:

a) f(x) = x³ − x   b) g(x) = x² + cos x   c) h(x) = x + 1
--- pista Haz el dibujo
Esboza las tres gráficas (o usa la calculadora) y mira la simetría: ¿espejo respecto al eje Y, media vuelta respecto al origen o ninguna?

[[dibujo:geo|{"ejes":{"x":[-2.2,2.2],"y":[-3,4]},"pts":{},"el":[["curva","x*x*x-x",-2.2,2.2,{"k":"p"}],["curva","x*x+cos(x)",-2.2,2.2,{"k":"n"}],["curva","x+1",-2.2,2.2,{"k":"fr"}],["txt",[1.7,3.3],"g",{"k":"n"}],["txt",[2,1.5],"f",{"k":"p"}],["txt",[-2,-0.6],"h",{"k":"fr"}]],"alto":320}|f gira con media vuelta; g es un espejo; h no tiene ninguna de las dos simetrías.]]
--- pista Sustituye −x
Calcula f(−x), g(−x) y h(−x) y compáralas con la función y con su opuesta.
--- solucion
a) **f(−x) = (−x)³ − (−x) = −x³ + x = −f(x)**: **impar**.

b) **g(−x) = (−x)² + cos(−x) = x² + cos x = g(x)**: **par** (el coseno es par).

c) **h(−x) = −x + 1**, que no es ni h(x) = x + 1 ni −h(x) = −x − 1: **ninguna**.

> **¿Basta con un valor?** Para probar que es par o impar hay que hacerlo con x genérico. Para probar que no lo es, basta un contraejemplo: h(1) = 2 y h(−1) = 0.
