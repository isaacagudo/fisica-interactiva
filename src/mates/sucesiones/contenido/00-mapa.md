---
titulo: Sucesiones, series y progresiones
corto: Sucesiones
eyebrow: Matemáticas · Tema 1 · Sección 1
desc: Término general, sumatorios, progresiones aritméticas y geométricas, series infinitas y fractales (diapositivas 2 a 13).
portada: Término general, sumatorios, progresiones aritméticas y geométricas, series infinitas (Aquiles y la tortuga) y fractales.
icono: sucesiones
---
## La idea: ¿se suma o se multiplica?

Casi todo en esta sección empieza con dos preguntas:

1. **¿Qué tipo de sucesión es?** Si para pasar de un término al siguiente **se suma** siempre lo mismo, es aritmética (diferencia d). Si **se multiplica** siempre por lo mismo, es geométrica (razón R). Si no, hay que buscar otro patrón (cuadrados, signos alternos…).
2. **¿Qué me piden?** Un término (aₙ), una suma finita (Sₙ) o una suma infinita (S∞).

> **Aquiles y la tortuga (D2).** 0,9 + 0,09 + 0,009 + ⋯ tiene infinitos sumandos y, sin embargo, vale 1. Es una serie geométrica de razón 0,1, y como |R| < 1 su suma es finita. Lo verás en el apartado 3.

[[apartados]]

## Las fórmulas en una tabla

| | Aritmética | Geométrica |
| --- | --- | --- |
| Cómo se pasa al siguiente | Se suma d: **aₙ₊₁ = aₙ + d** | Se multiplica por R: **aₙ₊₁ = aₙ·R** |
| Término general | **aₙ = a₁ + (n − 1)d** | **aₙ = a₁·Rⁿ⁻¹** |
| Suma de n términos | **Sₙ = n(a₁ + aₙ)/2** | **Sₙ = (a₁ − aₙ·R)/(1 − R)** |
| Suma infinita | No existe (salvo que todo sea 0) | **S∞ = a₁/(1 − R)**, solo si −1 < R < 1 |

## Errores típicos

| Error | Cómo se ve | Cómo evitarlo |
| --- | --- | --- |
| n en vez de n − 1 | aₙ = a₁ + nd | El primer término no lleva d: a₁ = a₁ + 0·d |
| S∞ cuando no converge | Sumar 1 + 2 + 4 + ⋯ con la fórmula | Comprueba antes que −1 < R < 1 |
| Signo de R | 81, −27, 9, … con R = 1/3 | R = a₂/a₁ = −27/81 = −1/3 |
| Contar mal los términos | 7, 11, …, 203: «hay 196/4 = 49» | Plantea aₙ = 203 y despeja n: son 50 |
| Koch | Multiplicar el perímetro por 4 | Hay 4 veces más lados, pero cada uno mide 1/3: × 4/3 |

## Vocabulario en inglés

*Sequence* (sucesión), *series* (serie), *arithmetic / geometric sequence* (progresión aritmética / geométrica), *common difference* (diferencia), *common ratio* (razón), *sum to infinity* (suma infinita), *converge / diverge* (converge / diverge), *sigma notation* (notación de sumatorio).

## Los ejercicios, clasificados

[[indice]]

> **Para pensar (TdC, D37).** El copo de Koch tiene un perímetro infinito y, sin embargo, encierra un área finita. ¿Cómo explican los matemáticos resultados que chocan con la intuición?
