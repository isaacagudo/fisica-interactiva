---
titulo: Identidades y ecuaciones trigonométricas
corto: Identidades y ecuaciones
eyebrow: Matemáticas · Tema 2 · Sección 5
desc: Identidades, fórmulas de suma, resta y ángulo doble, ecuaciones trigonométricas en un intervalo y la función a·sen[b(x + c)] + d (diapositivas 18, 20 y 25 a 28).
portada: Identidades trigonométricas, suma, resta y ángulo doble, ecuaciones en un intervalo (todas las soluciones) y la sinusoide a·sen[b(x + c)] + d.
icono: identidades
---
## La idea: dejar una sola razón

Es la parte más algebraica del tema. Casi todo se reduce a **transformar** una expresión con las fórmulas hasta que quede algo que sepamos manejar:

1. **Demostrar una identidad**: se parte de un lado (el más complicado), se pasa todo a sen y cos y se llega al otro lado.
2. **Resolver una ecuación**: se deja **una sola razón** (con sen² + cos² = 1 o con el ángulo doble), se **factoriza** y se buscan **todas** las soluciones del intervalo.

[[figura:geo|{"pts":{"O":[0,0],"P":[0.8,0.6],"Q":[0.8,0]},"el":[["circ","O",1,{"k":"eje","dash":true}],["pol",["O","P","Q"],{"fill":"p"}],["seg","O","P",{"k":"p"}],["seg","P","Q",{"k":"n"}],["seg","O","Q",{"k":"fr"}],["recto","Q","O","P"],["ang","O","Q","P","θ"],["cota","O","P","1",{"lado":1}],["cota","P","Q","sen θ",{"lado":1,"k":"n"}],["cota","O","Q","cos θ",{"lado":-1,"k":"fr"}]],"alto":240}|Pitágoras en la circunferencia unidad: sen²θ + cos²θ = 1.]]

[[apartados]]

## Las fórmulas en una tabla

| Qué | Fórmula |
| --- | --- |
| Fundamental | **sen²θ + cos²θ = 1** |
| Derivadas | **1 + tan²θ = sec²θ · 1 + cot²θ = cosec²θ** |
| Suma y resta | **sen(A ± B) = sen A cos B ± cos A sen B** |
| | **cos(A ± B) = cos A cos B ∓ sen A sen B** |
| | **tan(A ± B) = (tan A ± tan B)/(1 ∓ tan A tan B)** |
| Ángulo doble | **sen 2θ = 2 sen θ cos θ** |
| | **cos 2θ = cos²θ − sen²θ = 1 − 2sen²θ = 2cos²θ − 1** |
| | **tan 2θ = 2tan θ/(1 − tan²θ)** |
| Sinusoide | amplitud **a = (máx − mín)/2**, eje **d = (máx + mín)/2**, periodo **2π/b** |

## Errores típicos

| Error | Cómo se ve | Cómo evitarlo |
| --- | --- | --- |
| Dividir entre cos x | sen 2x = cos x ⟹ 2 sen x = 1, y se pierden 90° y 270° | Pasa todo a un lado y saca factor común |
| Solo la solución de la calculadora | sen x = 1/2 ⟹ x = 30° | Busca la segunda: 180° − 30° |
| Intervalo de 2x | 0 ≤ x < 2π, pero 2x solo hasta 2π | Si x llega a 2π, 2x llega a 4π |
| Soluciones que anulan un denominador | Dar una x con cos x = 0 en una ecuación con sec x | Comprueba cada solución en la ecuación original |
| sen(A + B) = sen A + sen B | sen 75° = sen 45° + sen 30° | Usa la fórmula de la suma |

## Vocabulario en inglés

*Trigonometric identity* (identidad trigonométrica), *Pythagorean identity* (identidad fundamental), *compound angle formulae* (fórmulas de suma y resta), *double angle formulae* (fórmulas del ángulo doble), *solve for 0 ≤ x < 2π* (resolver en el intervalo), *amplitude* (amplitud), *period* (periodo), *principal axis* (eje de la sinusoide), *horizontal / vertical translation* (traslación horizontal / vertical).

## Los ejercicios, clasificados

[[indice]]

> **Para pensar (TdC).** Los grados vienen de los babilonios, que contaban en base 60; los radianes salen de la propia circunferencia. ¿Por qué las fórmulas del cálculo (por ejemplo, que sen x ≈ x para x pequeño) solo funcionan en radianes?
