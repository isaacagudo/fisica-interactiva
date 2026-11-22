---
titulo: Técnicas de recuento
corto: Recuento
eyebrow: Matemáticas · Tema 1 · Sección 3
desc: Factorial, números combinatorios, permutaciones, variaciones y combinaciones, con y sin repetición (diapositivas 17 a 27 y 35).
portada: Factorial y número combinatorio, permutaciones, variaciones y combinaciones, con y sin repetición, y problemas con condiciones.
icono: recuento
---
## La idea: tres preguntas antes de cualquier fórmula

Contar «a mano» es imposible en cuanto hay muchos casos. Las fórmulas de recuento salen de responder siempre las mismas preguntas:

1. **¿Entran todos los elementos?** Ordenar 5 libros en 5 huecos (todos) no es lo mismo que sentar 3 alumnos en 5 sillas (solo algunos).
2. **¿Importa el orden?** Un podio (oro, plata, bronce) cambia si cambias el orden; un grupo de trabajo, no.
3. **¿Se puede repetir?** En un PIN el 7 puede salir dos veces; en un podio, un corredor no.

Prueba el cuadro resumen de la diapositiva 22 como un juego de preguntas:

[[widget:cuadro|{}]]

> **El principio de multiplicación.** Detrás de todas las fórmulas está una sola idea: si una decisión se toma de a maneras y, después, otra de b maneras, hay **a·b** maneras de tomar las dos. Por eso V(5, 3) = 5·4·3: 5 opciones para la primera silla, 4 para la segunda y 3 para la tercera.

[[apartados]]

## Las fórmulas en una tabla

| | ¿Todos? | ¿Orden? | ¿Repite? | Fórmula | Ejemplo |
| --- | --- | --- | --- | --- | --- |
| Permutaciones | Sí | Sí | No | **Pₙ = n!** | 5 libros: 5! = 120 |
| Permutaciones con repetición | Sí | Sí | Hay iguales | **n!/(a!·b!·…)** | HORROR: 6!/(1!·2!·3!) = 60 |
| Variaciones | No | Sí | No | **V(n, r) = n!/(n − r)!** | 3 alumnos en 5 sillas: 60 |
| Variaciones con repetición | No | Sí | Sí | **VR(n, k) = nᵏ** | 5 lanzamientos de moneda: 32 |
| Combinaciones | No | No | No | **C(n, r) = n!/(r!·(n − r)!)** | Grupos de 2 entre 5: 10 |

> **En la calculadora (D23 a D25 y D27).** Las teclas **x!**, **nPr** (variaciones) y **nCr** (combinaciones) hacen las cuentas, pero la calculadora no decide qué fórmula toca: eso es lo que se evalúa.

## Errores típicos

| Error | Cómo se ve | Cómo evitarlo |
| --- | --- | --- |
| Usar V cuando no importa el orden | Grupos de 4 entre 28: 28·27·26·25 | Pregúntate si AB y BA son el mismo caso. Si lo son, divide entre 4!: C(28, 4) |
| Olvidar dividir por las repeticiones | HORROR: 6! = 720 | Las dos O y las tres R son iguales: 6!/(2!·3!) = 60 |
| Simplificar mal factoriales | 8! − 6! = 2! | Saca factor común: 6!(8·7 − 1) = 720·55 = 39600 |
| «Al menos uno» caso a caso | Sumar 1, 2, 3 y 4 mujeres y olvidar alguno | Total menos el caso contrario (ninguna mujer) |
| Sumar en vez de multiplicar | Elegir 2 hombres y 2 mujeres: 10 + 15 | Las dos decisiones se toman a la vez: 10·15 = 150 |

## Vocabulario en inglés

*Factorial* (factorial), *permutation* (permutación), *arrangement* (ordenación), *combination* (combinación), *selection* (elección), *binomial coefficient* (número combinatorio), *with repetition / without repetition* (con / sin repetición), *at least* (al menos), *the product principle* (principio de multiplicación). En la calculadora y en el examen se escriben nPr y nCr.

## Los ejercicios, clasificados

[[indice]]
