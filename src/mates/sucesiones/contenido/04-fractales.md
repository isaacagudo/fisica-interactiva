---
slug: fractales
titulo: Fractales: Koch y Sierpinski
nombre: Fractales
corto: Fractales
eyebrow: Apartado 4 · diapositivas 7, 11 y 13
desc: Cada iteración multiplica lados, longitudes o áreas por una razón: son progresiones geométricas.
icono: fractal
---
## Idea clave: cada iteración multiplica por una razón

En un fractal cada paso repite la misma regla, así que cada magnitud (lado, número de lados, perímetro, área) **se multiplica por un número fijo** en cada iteración: son **progresiones geométricas**. Para cada una, pregúntate por cuánto se multiplica.

[[widget:fractal|{"tipo":"koch","lado":81}]]

## Copo de nieve de Koch (lado inicial 81 cm)

En cada iteración, cada lado se divide en 3 y el trozo central se cambia por dos lados de un triángulo:

| Magnitud | Se multiplica por | Iteración n |
| --- | --- | --- |
| Lado | 1/3 | **81/3ⁿ cm** |
| Número de lados | 4 | **3·4ⁿ** |
| Perímetro | 4·(1/3) = 4/3 | **243·(4/3)ⁿ cm** |

> **¿Por qué el perímetro crece sin límite?** Porque se multiplica por 4/3 > 1 en cada paso: es una geométrica de razón mayor que 1.

**El área sí tiene límite.** En la iteración n se añaden 3·4ⁿ⁻¹ triángulos de lado 81/3ⁿ. Si A₀ es el área del triángulo inicial, cada iteración añade (1/3)·(4/9)ⁿ⁻¹·A₀, una geométrica de razón 4/9 < 1:

**A∞ = A₀ + (A₀/3)/(1 − 4/9) = A₀ + 3A₀/5 = 8A₀/5**

Con 81 cm, A₀ = (√3/4)·81² ≈ 2841 cm² y **A∞ ≈ 4546 cm²**.

## Triángulo de Sierpinski

Cada triángulo se divide en 4 iguales y se quita el del centro. Quedan **3ⁿ triángulos** de lado ℓ/2ⁿ, cada uno con área **A₀/4ⁿ**, y el área total es

**Aₙ = 3ⁿ·A₀/4ⁿ = A₀·(3/4)ⁿ**

que tiende a 0, porque 3/4 < 1.

[[widget:fractal|{"tipo":"sierpinski","lado":81}]]

=== D7·1 | Diapositiva 7 | Koch: el lado en cada iteración
nivel: 2
pide: Copo de Koch, lado inicial 81 cm: lado en cada iteración
resultado: **81, 27, 9, 3, 1, … cm: ℓₙ = 81/3ⁿ**
widget: fractal {"tipo":"koch","lado":81}
--- enunciado
Supóngase que la longitud de cada lado del primer triángulo es **81 cm**. Encuentra la longitud de cada lado de la figura en cada iteración (copo de nieve de Koch).
--- pista La regla
En cada iteración, cada lado se parte en 3 trozos iguales.
--- solucion
Cada iteración divide el lado entre 3: es geométrica con razón 1/3.

**ℓₙ = 81·(1/3)ⁿ = 81/3ⁿ**: 81, 27, 9, 3, 1, 1/3, … cm.

=== D11·1 | Diapositiva 11 | Sierpinski: el área de cada triángulo
nivel: 2
pide: Triángulo de Sierpinski: área de cada triángulo y conjetura
resultado: **Cada triángulo: A₀/4ⁿ; hay 3ⁿ; área total A₀·(3/4)ⁿ → 0**
widget: fractal {"tipo":"sierpinski","lado":81}
--- enunciado
Calcula el área de cada triángulo verde y realiza una conjetura del área de las siguientes iteraciones (triángulo de Sierpinski). Llama A₀ al área del triángulo inicial (con lado 81 cm, A₀ ≈ 2841 cm²).
--- pista Un paso
Al unir los puntos medios, el triángulo queda dividido en 4 iguales de lado la mitad: cada uno tiene área A₀/4. Se quita el central y quedan 3.
--- pista La regla
En cada iteración, cada triángulo verde se cambia por 3 de área 1/4 de la suya.
--- solucion
En la iteración n hay **3ⁿ triángulos** y cada uno tiene **área A₀/4ⁿ**. El área total es

**Aₙ = 3ⁿ·A₀/4ⁿ = A₀·(3/4)ⁿ**

Conjetura: el área total se multiplica por 3/4 en cada paso y **tiende a 0**. Con A₀ ≈ 2841 cm²: 2841, 2131, 1598, 1199, … cm².

=== D13·1 | Diapositiva 13 | Koch: perímetro y área en el límite
nivel: 3
pide: Copo de Koch (81 cm): perímetro y área en cada iteración y con infinitas iteraciones
resultado: **Pₙ = 243·(4/3)ⁿ → ∞; A∞ = 8A₀/5 ≈ 4546 cm²**
widget: fractal {"tipo":"koch","lado":81}
--- enunciado
Con el lado del primer triángulo de **81 cm**, encuentra el perímetro de la figura en cada iteración y el área. Trata de encontrar un modelo para cualquier iteración. ¿Cuál será el área si realizamos infinitas iteraciones?
--- pista El perímetro
Lados: 3·4ⁿ. Longitud de cada uno: 81/3ⁿ. Multiplica.
--- pista Lo que se añade de área
En la iteración n se añaden 3·4ⁿ⁻¹ triángulos de lado 81/3ⁿ: cada uno con área A₀/9ⁿ.
--- pista La serie
Área añadida en la iteración n: 3·4ⁿ⁻¹·A₀/9ⁿ = (A₀/3)·(4/9)ⁿ⁻¹. Es geométrica con razón 4/9.
--- solucion
**Perímetro:** Pₙ = 3·4ⁿ·81/3ⁿ = **243·(4/3)ⁿ cm**. Como 4/3 > 1, crece sin límite: **P → ∞**.

**Área:** A₀ = (√3/4)·81² ≈ 2841 cm². En la iteración n se añaden 3·4ⁿ⁻¹ triángulos de área A₀/9ⁿ:

**Aₙ = A₀ + (A₀/3)·[1 + 4/9 + (4/9)² + ⋯ + (4/9)ⁿ⁻¹]**

Con infinitas iteraciones, la serie es geométrica de razón 4/9 < 1:

**A∞ = A₀ + (A₀/3)/(1 − 4/9) = A₀ + 3A₀/5 = 8A₀/5 ≈ 4546 cm²**

Perímetro infinito con área finita.
