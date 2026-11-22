---
titulo: Resolución de triángulos
corto: Triángulos
eyebrow: Matemáticas · Tema 2 · Sección 4
desc: Teoremas del seno y del coseno, área de un triángulo y problemas de alturas, distancias y ángulos en 3D (diapositivas 18, 24, 27 y 28).
portada: Teorema del seno (con el caso ambiguo), teorema del coseno, área con ½ab sen C y Herón, y problemas de alturas, distancias y ángulos en el espacio.
icono: triangulos
---
## La idea: ¿qué datos tengo?

Resolver un triángulo es calcular sus tres lados y sus tres ángulos. Se nombran siempre igual: **a, b y c son los lados opuestos a los ángulos A, B y C**.

[[figura:tri|{"a":7,"b":8,"c":5,"etq":{"a":"a","b":"b","c":"c","A":"A","B":"B","C":"C"}}|Cada lado está enfrente de su ángulo con la misma letra.]]

| Datos | Herramienta | Por qué |
| --- | --- | --- |
| Un lado y su ángulo opuesto, y otro dato | **Teorema del seno** | Relaciona cada lado con su ángulo opuesto |
| Tres lados | **Teorema del coseno** (para un ángulo) | Es el único que relaciona los tres lados |
| Dos lados y el ángulo que forman | **Teorema del coseno** (para el tercer lado) | El ángulo está entre los dos lados |
| Dos lados y un ángulo que no forman | **Seno**, con cuidado: puede haber dos triángulos | Caso ambiguo |

Prueba los cuatro casos con el simulador:

[[widget:triangulo|{"caso":"LLA","a":7,"b":9,"A":40}]]

[[apartados]]

## Las fórmulas en una tabla

| Qué | Fórmula |
| --- | --- |
| Teorema del seno | **a/sen A = b/sen B = c/sen C** |
| Teorema del coseno | **a² = b² + c² − 2bc·cos A** |
| Ángulo con el coseno | **cos A = (b² + c² − a²)/(2bc)** |
| Área | **Área = (1/2)·a·b·sen C** |
| Herón | **Área = √[s(s − a)(s − b)(s − c)]**, con s = (a + b + c)/2 |
| Suma de ángulos | **A + B + C = 180°** |

## Errores típicos

| Error | Cómo se ve | Cómo evitarlo |
| --- | --- | --- |
| Lado y ángulo que no se corresponden | a/sen B | Cada lado con el ángulo que tiene enfrente |
| Olvidar la segunda solución | Caso LLA con B = 55,7° y ya | Prueba también 180° − B: vale si A + B < 180° |
| Despejar mal el coseno | cos A = (a² − b² − c²)/(2bc) | El lado opuesto a A es el que va restando |
| Calculadora en radianes | sen 40 = 0,745 | Modo DEG |

## Vocabulario en inglés

*Sine rule* (teorema del seno), *cosine rule* (teorema del coseno), *ambiguous case* (caso ambiguo), *included angle* (ángulo comprendido), *Heron's formula* (fórmula de Herón), *angle of elevation / depression* (ángulo de elevación / depresión), *angle between a line and a plane* (ángulo entre una recta y un plano).

## Los ejercicios, clasificados

[[indice]]
