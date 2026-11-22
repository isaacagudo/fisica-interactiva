---
titulo: Geometría analítica
corto: Geometría analítica
eyebrow: Matemáticas · Tema 2 · Sección 1
desc: Distancia y punto medio en el plano y en el espacio, ecuaciones de la recta y posición relativa de dos rectas (diapositivas 5 a 7).
portada: Distancia y punto medio en 2D y 3D, las seis formas de la ecuación de la recta, pendiente, rectas paralelas y perpendiculares y punto de corte.
icono: analitica
---
## La idea: restar coordenadas y hacer medias

Casi todo en esta sección sale de dos operaciones con coordenadas:

1. **Restar** (punto final menos punto inicial) da el **vector** que va de un punto a otro. De él salen la distancia (su longitud, con Pitágoras) y la pendiente (cuánto sube por cada unidad que avanza).
2. **Hacer la media** de las coordenadas da el **punto medio**.

[[figura:geo|{"ejes":{"x":[-1,7],"y":[-1,6],"rejilla":true},"pts":{"A":[1,1],"B":[5,4],"C":[5,1],"M":[3,2.5]},"el":[["seg","A","C",{"dash":true,"k":"n"}],["seg","C","B",{"dash":true,"k":"n"}],["seg","A","B",{"k":"p"}],["recto","C","A","B"],["cota","A","C","Δx = 4",{"lado":-1,"k":"n"}],["cota","C","B","Δy = 3",{"lado":-1,"k":"n"}],["cota","A","B","d = 5",{"lado":1,"k":"p"}],["pt","A","no"],["pt","B","ne"],["pt","M","no"]],"alto":300}|De A a B: se avanza 4 y se sube 3. La distancia es la hipotenusa (5), la pendiente es 3/4 y el punto medio, la media de las coordenadas.]]

[[apartados]]

## Las fórmulas en una tabla

| Qué | Fórmula | Cuándo se usa |
| --- | --- | --- |
| Distancia en 3D | **d = √[(x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²]** | Longitud de un segmento (en 2D, sin la z) |
| Punto medio | **M = ((x₁ + x₂)/2, (y₁ + y₂)/2, (z₁ + z₂)/2)** | Centro de un segmento, mediatrices |
| Pendiente | **m = (y₂ − y₁)/(x₂ − x₁) = v₂/v₁ = −a/b** | Inclinación de una recta |
| Punto-pendiente | **y − y₀ = m(x − x₀)** | Recta conocidos un punto y la pendiente |
| Paralelas | **m₁ = m₂** | Misma inclinación |
| Perpendiculares | **m₁·m₂ = −1** | Forman 90° |

## Errores típicos

| Error | Cómo se ve | Cómo evitarlo |
| --- | --- | --- |
| Restar en distinto orden | m = (3 − 1)/(2 − 5) mezclando puntos | Arriba y abajo, siempre «segundo menos primero» |
| Perpendicular mal | m⊥ = −m | La perpendicular es −1/m: le das la vuelta y cambias el signo |
| Confundir vectores | Usar (a, b) como director de ax + by + c = 0 | Director (−b, a); normal (perpendicular) (a, b) |
| Punto medio con resta | M = (x₂ − x₁)/2 | Es una media: se suma |

## Vocabulario en inglés

*Distance between two points* (distancia entre dos puntos), *midpoint* (punto medio), *gradient* o *slope* (pendiente), *y-intercept* (ordenada en el origen), *parallel / perpendicular lines* (rectas paralelas / perpendiculares), *point of intersection* (punto de corte), *perpendicular bisector* (mediatriz), *direction vector* (vector director).

## Los ejercicios, clasificados

[[indice]]
