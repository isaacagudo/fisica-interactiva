---
slug: muelles
titulo: Muelles: energía potencial elástica
nombre: Muelles: energía potencial elástica
corto: Muelles
eyebrow: Categoría 5
desc: Ley de Hooke, ½·k·x² y compresión máxima.
---
## Idea clave: un muelle guarda energía al deformarse

**Ley de Hooke: F = k·x** (k en N/m; x = cuánto se estira o comprime desde su longitud natural, en metros)

**Energía potencial elástica: Ep el = ½·k·x²**

> **¿Por qué ½?** La fuerza del muelle no es constante: crece de 0 a k·x mientras se deforma. El trabajo es el área bajo la gráfica F–x, que es un triángulo de base x y altura k·x: área = ½ · x · k·x = ½·k·x² (página 6 de los apuntes). Por eso no se puede usar W = F·d con una sola fuerza.

La fuerza del muelle es conservativa: si no hay rozamiento, la energía mecánica (ahora con tres términos) se conserva:

**Ec + Ep gravitatoria + Ep elástica = constante**

Para ver cómo pasa la energía de una forma a otra, abre el [simulador de muelles](../../../simuladores/muelle/): tiene los tres montajes de esta categoría (bloque contra un muelle, caída sobre un resorte y rampa con muelle). La solución de cada ejercicio lleva además su simulación, ya preparada con los datos del enunciado.

**Las claves de estos ejercicios**

1. **Compresión máxima ⟺ v = 0.** El muelle deja de comprimirse cuando el cuerpo se para un instante: toda la energía está en el muelle (y, si cae en vertical, algo en la altura).
2. **Si el cuerpo cae sobre un muelle vertical, sigue bajando mientras lo comprime.** La altura total que baja es h + x, no h. Si pones h = 0 en el punto de máxima compresión, la Ep gravitatoria inicial es m·g·(h + x).
3. **Eso da una ecuación de segundo grado en x.** Se resuelve con la fórmula y se descarta la solución negativa (sería un estiramiento, no una compresión). Si x es mucho menor que h, se puede aproximar h + x ≈ h, pero hay que decirlo.
4. **Con rozamiento** se añade el trabajo del rozamiento con su signo: Ec₀ + Ep₀ + W roz = Ec + Ep + Ep el.
5. **Un muelle en equilibrio con un peso colgado:** k·x = m·g, de ahí sale k (Repaso 4).

**Método**

1. Estados: inicial, contacto con el muelle y máxima compresión (v = 0).
2. Nivel h = 0 (en los muelles verticales, en el punto más bajo).
3. Ecuación de energía con todos los términos; decir cuáles valen 0.
4. Unidades: x en metros (5 cm = 0,05 m).
5. Resolver y comprobar el sentido físico (¿es razonable la compresión?).

=== 5.1 | Teoría 12 | Bola de 100 g que cae 2 m sobre un resorte
figura: e_t12
pide: Bola de 100 g desde 2 m, comprime 5 cm
indice: k = 1,61·10³ N/m; v = 6,26 m/s
widget: muelle {"escenario": "vertical", "m": 0.1, "h": 2, "k": 1607, "v0": 0}
--- enunciado
Desde 2 m de altura dejamos caer una bola de 100 g sobre un resorte que se comprime 5 cm. Calcula: a) la constante elástica del resorte; b) la velocidad con la que saldrá despedida la bola cuando el resorte se distienda.
--- resultado
a) k = 1,61·10³ N/m (1 607 N/m) · b) v = 6,26 m/s al salir despedida.
--- solucion
Datos: m = 100 g = 0,1 kg · h = 2 m (desde la bola hasta lo alto del resorte, como en el dibujo) · x = 5 cm = 0,05 m · sin rozamiento · g = 9,8 m/s².

[[diagrama:w51_resorte|Teoría 12 · la bola en tres momentos]]

De A a C la bola baja h + x; de B a C el resorte se comprime los 5 cm.

**Qué herramienta usar.** Solo trabajan el peso y el resorte, dos fuerzas conservativas: conservación de la energía mecánica con Ep elástica.

**a) Constante elástica**

Nivel h = 0 en el punto de máxima compresión. A: bola quieta arriba. C: resorte comprimido 5 cm, bola parada un instante.

**Ec,A + Ep,A + Ep el,A = Ec,C + Ep,C + Ep el,C ⟹ 0 + m·g·(h + x) + 0 = 0 + 0 + ½·k·x²**

> **¿Por qué h + x?** La bola baja 2 m hasta tocar el resorte y otros 5 cm mientras lo comprime. Toda esa caída (2,05 m) es energía potencial gravitatoria que acaba guardada en el resorte. Ec = 0 en A porque «dejamos caer» (parte del reposo) y en C porque es la compresión máxima.

**k = 2·m·g·(h + x) / x² = 2 · 0,1 · 9,8 · 2,05 / 0,05² = 4,018 / 0,0025 = 1 607 N/m**

> Si se desprecian los 5 cm frente a los 2 m (h + x ≈ h), sale k = 1 568 N/m, un 2,4 % menos. Las dos respuestas se aceptan si se dice qué se ha hecho.

**b) Velocidad con la que sale despedida**

El resorte devuelve toda la energía y la bola deja de tocarlo cuando recupera su longitud natural, es decir, a la misma altura donde lo tocó al caer (estado B). Entre A y B:

**m·g·h = ½·m·v² ⟹ v = √(2·g·h) = √(2 · 9,8 · 2) = 6,26 m/s**

> **¿Por qué la misma velocidad que al llegar?** Sin rozamiento la energía mecánica se conserva: en la misma posición (misma Ep, resorte sin deformar) la bola tiene la misma Ec. Sale hacia arriba con 6,26 m/s y volvería a subir 2 m.

**Comprobación.** De C a B: ½·k·x² = ½·m·v² + m·g·x ⟹ 2,009 = 0,05·v² + 0,049 ⟹ v² = 39,2 ⟹ v = 6,26 m/s. Coincide.
--- simulacion
Pruébalo en el simulador: la bola cae, comprime el resorte 5 cm y vuelve a salir a 6,26 m/s. Cambia la altura o la constante k y mira cómo cambian la compresión y la fuerza máxima.

=== 5.2 | Cuestiones 8 | Bloque de 4 kg a 6 m/s contra un muelle de K = 900 N/m
pide: 4 kg a 6 m/s contra K = 900 N/m
indice: x = 0,40 m; v = 5,81 m/s
widget: muelle {"escenario": "horizontal", "m": 4, "v0": 6, "k": 900, "mu": 0, "L": 1}
--- enunciado
Un cuerpo de 4 kg que se mueve a 6 m/s sobre una superficie horizontal sin rozamiento choca contra un muelle de constante elástica K = 900 N/m. Calcula: a) la deformación máxima experimentada por el muelle; b) la velocidad del cuerpo cuando el muelle se halla comprimido 10 cm.
--- resultado
a) x máx = 0,40 m · b) v = 5,81 m/s cuando el muelle está comprimido 10 cm.
--- solucion
Datos: m = 4 kg · v₀ = 6 m/s · K = 900 N/m · superficie horizontal sin rozamiento.

[[diagrama:w52_muelle|Cuestiones 8 · antes del choque y en la compresión máxima]]

Arriba toda la energía es cinética; abajo el bloque está parado y toda la energía está en el muelle.

**Qué herramienta usar.** Sin rozamiento y en horizontal, solo trabaja el muelle: la energía cinética se convierte en elástica. La Ep gravitatoria no cambia y no se escribe.

**a) Deformación máxima**

**½·m·v₀² = ½·K·x² ⟹ x = v₀·√(m/K) = 6 · √(4/900) = 6 · 0,0667 = 0,40 m**

> **¿Por qué?** Al principio todo es energía cinética (½ · 4 · 6² = 72 J) y el muelle está sin deformar. En la máxima compresión el bloque está parado un instante: los 72 J están en el muelle.

**b) Velocidad con el muelle comprimido 10 cm**

**½·m·v₀² = ½·m·v² + ½·K·x² ⟹ 72 = 2·v² + ½ · 900 · 0,1² = 2·v² + 4,5**

**v = √[(72 − 4,5) / 2] = √33,75 = 5,81 m/s**

> **¿Por qué ahora hay dos términos a la derecha?** A mitad de la compresión el bloque todavía se mueve (tiene Ec) y el muelle ya guarda algo de energía (Ep elástica). Entre los dos suman los 72 J del principio.

**Sentido físico.** Con 10 cm de compresión el muelle solo guarda 4,5 J de 72 J (un 6 %), porque la energía va con x²: la velocidad apenas ha bajado de 6 a 5,81 m/s. Al llegar a 40 cm (cuatro veces más) guarda 16 veces más: los 72 J.
--- simulacion
En el simulador, mueve la barra de tiempo hasta que el muelle lleve unos 10 cm comprimido y lee la velocidad: unos 5,8 m/s. Sube el rozamiento μ para ver qué parte de la energía se convierte en calor antes de llegar.

=== 5.3 | Cuestiones 9 | Cuerpo de 200 g que cae 4 m sobre un resorte de 1200 N/m
pide: 200 g desde 4 m sobre K = 1200 N/m
indice: x = 0,116 m
widget: muelle {"escenario": "vertical", "m": 0.2, "h": 4, "k": 1200, "v0": 0}
--- enunciado
Desde una altura de 4 m se deja caer un cuerpo de 200 g sobre un resorte cuya constante elástica es de 1200 N/m. Calcula la deformación que experimenta el resorte.
--- resultado
x = 0,116 m (11,6 cm).
--- solucion
Datos: m = 200 g = 0,2 kg · h = 4 m hasta lo alto del resorte · k = 1200 N/m · parte del reposo · sin rozamiento · g = 9,8 m/s².

**Qué herramienta usar.** Igual que en 5.1, pero ahora la incógnita es x: conservación de la energía con Ep gravitatoria y elástica. El esquema es el mismo que el diagrama de 5.1.

**Paso 1. Ecuación de energía** (h = 0 en el punto de máxima compresión)

**m·g·(h + x) = ½·k·x²**

> **¿Por qué?** Arriba: parado (Ec = 0) y a una altura h + x sobre el punto más bajo. Abajo: parado otra vez (compresión máxima) y con el resorte comprimido x.

**Paso 2. Ecuación de segundo grado**

**0,2 · 9,8 · (4 + x) = 600·x² ⟹ 600·x² − 1,96·x − 7,84 = 0**

**x = [1,96 + √(1,96² + 4 · 600 · 7,84)] / (2 · 600) = (1,96 + 137,19) / 1200 = 0,116 m**

> **¿Por qué solo el signo +?** La otra solución es negativa (x = −0,113 m) y significaría que el resorte se estira, lo que no tiene sentido aquí.

**Comprobación.** Energía que pierde el cuerpo: 0,2 · 9,8 · 4,116 = 8,07 J. Energía del resorte: ½ · 1200 · 0,116² = 8,07 J. Coinciden.

**Aproximación.** Si se desprecia x frente a 4 m: x ≈ √(2·m·g·h / k) = √(15,68 / 1200) = 0,114 m. Difiere en un 1,4 %: aquí la aproximación es buena porque 11 cm es poco comparado con 4 m (en Repaso 4 no lo será).
--- simulacion
En el simulador, compara la compresión máxima (11,6 cm) con lo que bajaría el resorte con el cuerpo colgado en reposo: x₀ = m·g/k ≈ 1,6 mm.

=== 5.4 | Repaso 4 | Muelle que se alarga 2 cm con una pesa de 500 g
figura: e_r4
pide: Muelle que se alarga 2 cm con 500 g
indice: k = 245 N/m; x = 0,221 m
widget: muelle {"escenario": "vertical", "m": 0.5, "h": 1, "k": 245, "v0": 0}
--- enunciado
Un muelle se alarga 2 cm al colgar de él una pesa de 500 g. Colocamos el resorte sobre el suelo y dejamos caer sobre él la pesa de 500 g desde una altura de 1 m, medida desde la parte más alta del resorte. Calcula: a) la constante elástica del resorte; b) la máxima deformación que experimenta el resorte.
--- resultado
a) k = 245 N/m · b) x máx = 0,221 m (22,1 cm).
--- solucion
Datos: m = 500 g = 0,5 kg · alargamiento en equilibrio x₀ = 2 cm = 0,02 m · caída desde h = 1 m sobre lo alto del resorte · g = 9,8 m/s².

[[diagrama:w54_dos|Repaso 4 · equilibrio y caída sobre el resorte]]

A la izquierda el muelle sostiene la pesa en reposo; a la derecha la pesa cae y lo comprime mucho más.

**a) Constante elástica**

**Qué herramienta usar.** La pesa cuelga quieta: es un problema de equilibrio (dinámica), no de energía.

**ΣF = 0: k·x₀ − m·g = 0 ⟹ k = m·g / x₀ = 0,5 · 9,8 / 0,02 = 245 N/m**

> **¿Por qué no ½·k·x² = m·g·x?** Porque la pesa no se ha soltado de golpe: se ha colgado con cuidado hasta que queda quieta. En equilibrio, la fuerza del muelle (ley de Hooke) compensa el peso. Usar energía aquí daría el doble de k, un error típico.

**b) Máxima deformación al dejarla caer desde 1 m**

**Qué herramienta usar.** Ahora sí hay movimiento: conservación de la energía con Ep gravitatoria y elástica, como en 5.1 (h = 0 en el punto de máxima compresión).

**m·g·(h + x) = ½·k·x² ⟹ 0,5 · 9,8 · (1 + x) = ½ · 245 · x² ⟹ 122,5·x² − 4,9·x − 4,9 = 0**

**x = [4,9 + √(4,9² + 4 · 122,5 · 4,9)] / (2 · 122,5) = (4,9 + 49,24) / 245 = 0,221 m**

> **¿Por qué h + x?** La pesa baja 1 m hasta tocar el resorte y luego x más mientras lo comprime. Aquí la x no es despreciable: si se aproxima h + x ≈ h, sale x = 0,20 m, un 10 % menos.

**Comprobación.** Energía perdida por la pesa: 0,5 · 9,8 · 1,221 = 5,98 J. Energía del resorte: ½ · 245 · 0,221² = 5,98 J. Coinciden.

**Sentido físico.** Colgada en reposo, la pesa solo comprime (o estira) 2 cm; caída desde 1 m, lo comprime 22 cm, once veces más. Por eso un golpe deforma mucho más que un peso en reposo.
--- simulacion
En el simulador se ven las dos líneas de referencia: en reposo la pesa comprime el resorte 2 cm y, caída desde 1 m, 22,1 cm.

=== 5.5 | Ejercicios 7 | Rampa de 30° y muelle de 20 N/m
figura: e_e7
pide: Rampa de 1 m y muelle de 20 N/m
indice: a) 0,99 m; b) 0,80 m
widget: muelle {"escenario": "rampa", "m": 1, "h": 1, "alpha": 30, "muRampa": 0.2, "mu": 0, "L": 1, "k": 20, "ejemplos": [{"nombre": "a) sin rozamiento", "valores": {"muRampa": 0}}, {"nombre": "b) μ = 0,2 en la rampa", "valores": {"muRampa": 0.2}}]}
--- enunciado
Dado el esquema de la figura, determinad la máxima compresión del muelle, cuya constante elástica es de 20 N/m, cuando el cuerpo impacte sobre él: a) en ausencia de rozamiento; b) si el coeficiente de rozamiento en el tramo AB es 0,2 y en el tramo horizontal se considera despreciable.
--- resultado
a) sin rozamiento, x = 0,99 m · b) con μ = 0,2 en la rampa, x = 0,80 m.
--- solucion
Datos: m = 1 kg · A a h = 1 m · α = 30° · k = 20 N/m · tramo horizontal sin rozamiento · en b), μ = 0,2 en AB · sale del reposo en A · g = 9,8 m/s².

[[diagrama:w55_rampa|Ejercicios 7 · rampa, tramo liso y muelle]]

El bloque sale de A, baja la rampa hasta B, recorre el tramo liso y comprime el muelle.

**Qué herramienta usar.** Ecuación de energía desde A hasta la máxima compresión: la energía potencial de A acaba en el muelle. En b) se resta lo que se pierde por rozamiento en la rampa.

**a) Sin rozamiento**

h = 0 en el suelo. A: parado a 1 m. Final: parado con el muelle comprimido x (el muelle está en el suelo, Ep gravitatoria = 0).

**m·g·h = ½·k·x² ⟹ x = √(2·m·g·h / k) = √(2 · 1 · 9,8 · 1 / 20) = √0,98 = 0,99 m**

> **¿Por qué no hace falta el ángulo?** Sin rozamiento solo importa la altura que baja (fuerza conservativa). El tramo horizontal tampoco cambia nada: no hay rozamiento ni cambio de altura.

**b) Con rozamiento en la rampa (μ = 0,2)**

Longitud de la rampa: **d = h / sen 30° = 1 / 0,5 = 2 m**

Trabajo del rozamiento: **W roz = −μ·m·g·cos 30°·d = −0,2 · 1 · 9,8 · 0,866 · 2 = −3,39 J**

> **¿Por qué cos 30°?** En el plano inclinado N = m·g·cos α (la normal solo compensa la componente del peso perpendicular al plano). El rozamiento actúa a lo largo de toda la rampa (d = 2 m, no h = 1 m) y es negativo.

**Ecuación de energía de A a la máxima compresión**

**m·g·h + W roz = ½·k·x² ⟹ 9,8 − 3,39 = 10·x² ⟹ x = √(6,41 / 10) = 0,80 m**

> **¿Por qué se suma W roz?** Es la forma Ec₀ + Ep₀ + W nc = Ec + Ep + Ep el con W nc = W roz, que ya es negativo. Sumar un número negativo es restar los 3,39 J que se convierten en calor.

**Comprobación.** Velocidad en B: sin rozamiento, √(2·9,8·1) = 4,43 m/s; con rozamiento, √(2 · 6,41 / 1) = 3,58 m/s. Con menos velocidad llega menos energía al muelle y se comprime menos (0,80 m < 0,99 m). Tiene sentido.
--- simulacion
El simulador arranca con el apartado b (μ = 0,2 en la rampa). Pulsa «a) sin rozamiento» y compara: 0,99 m frente a 0,80 m.

=== 5.6 | Cuestiones 10 | Bola a 8 m/s, 2 m con rozamiento y muelle de 900 N/m
figura: e_c10
pide: Bola a 8 m/s, 2 m con μ = 0,2, K = 900 N/m
indice: Falta la masa: 0,248 m si m = 1 kg
widget: muelle {"escenario": "horizontal", "m": 1, "v0": 8, "L": 2, "mu": 0.2, "k": 900, "rozMuelle": true, "ejemplos": [{"nombre": "m = 0,5 kg", "valores": {"m": 0.5}}, {"nombre": "m = 1 kg", "valores": {"m": 1}}, {"nombre": "m = 2 kg", "valores": {"m": 2}}, {"nombre": "m = 5 kg", "valores": {"m": 5}}]}
--- enunciado
En el sistema de la figura, en donde el coeficiente de rozamiento es μ = 0,2 y la constante elástica del resorte es K = 900 N/m, calcula la distancia que se comprime el resorte.
--- resultado
el enunciado no da la masa, y la compresión depende de ella. La bola llega al muelle a 7,49 m/s (eso no depende de m) y, por ejemplo, con m = 1 kg el muelle se comprime x = 0,248 m.
--- solucion
Datos: v₀ = 8 m/s · 2 m hasta el muelle · μ = 0,2 (también mientras comprime el muelle) · K = 900 N/m · g = 9,8 m/s² · **m no se da**.

[[diagrama:w56_muelle|Cuestiones 10 · la bola, los 2 m y el muelle]]

La bola roza durante los 2 m y mientras comprime el muelle.

**Qué herramienta usar.** Ecuación de energía con rozamiento: Ec₀ + W roz = Ep elástica. Despejando con letras se ve que la masa no se simplifica.

**Paso 1. Velocidad al llegar al muelle (no depende de m)**

**½·m·v₀² − μ·m·g·2 = ½·m·v₁² ⟹ v₁ = √(v₀² − 4·μ·g) = √(64 − 7,84) = 7,49 m/s**

> **¿Por qué aquí sí se va la masa?** Todos los términos (cinética y rozamiento) llevan m.

**Paso 2. Compresión máxima**

**½·m·v₀² − μ·m·g·(2 + x) = ½·K·x²**

> **¿Por qué 2 + x?** La bola roza durante los 2 m y también mientras comprime el muelle. La energía del muelle, ½·K·x², no lleva m: por eso la masa ya no se simplifica y hace falta su valor.

Con los datos: **450·x² + 1,96·m·x − 28,08·m = 0**, una ecuación de segundo grado para cada masa.

| Masa | Compresión máxima x |
| --- | --- |
| 0,5 kg | 0,176 m |
| 1 kg | 0,248 m |
| 2 kg | 0,349 m |
| 5 kg | 0,548 m |

> **Cómo leer la tabla.** Todas las bolas llegan al muelle a la misma velocidad, pero una bola más pesada lleva más energía (½·m·v²) y comprime más el muelle. Si en clase dan la masa, basta con sustituirla en la ecuación.

**Comprobación (m = 1 kg).** Energía inicial 32 J; rozamiento en 2,248 m: 0,2 · 9,8 · 2,248 = 4,41 J; muelle: ½ · 900 · 0,248² = 27,6 J. 4,41 + 27,6 = 32 J. Cuadra. Si se desprecia el rozamiento mientras se comprime el muelle, x = v₁·√(m/K) = 0,250 m: casi lo mismo.
--- simulacion
Como el enunciado no da la masa, el simulador deja cambiarla. La velocidad al llegar al muelle no varía (7,49 m/s), pero la compresión sí: pulsa cada masa y comprueba la tabla.

=== 5.7 | Nuevo | Muelle que se comprime 8 cm con 40 N y lanza un bloque
pide: k de un muelle (40 N, 8 cm), energía y velocidad de lanzamiento de 0,5 kg
indice: k = 500 N/m; Ep = 1,6 J; v = 2,53 m/s
widget: muelle {"escenario": "horizontal", "m": 0.5, "k": 500, "v0": 2.53, "L": 0.3, "mu": 0, "controles": ["m", "k", "v0"]}
--- enunciado
Para comprimir 8 cm un muelle hace falta una fuerza de 40 N. Calcula: a) la constante elástica del muelle; b) la energía potencial elástica almacenada con esa compresión; c) si el muelle comprimido se usa para lanzar un bloque de 0,5 kg sobre una superficie horizontal sin rozamiento, la velocidad con la que sale el bloque.
--- resultado
a) k = 500 N/m · b) Ep el = 1,6 J · c) v = 2,53 m/s.
--- solucion
Datos: F = 40 N · x = 8 cm = 0,08 m · m = 0,5 kg · sin rozamiento.

**Qué herramienta usar.** a) Ley de Hooke; b) energía potencial elástica; c) conservación de la energía (solo trabaja la fuerza del muelle, que es conservativa).

**a) Constante elástica**

**F = k·x ⟹ k = 40 / 0,08 = 500 N/m**

> **¿Por qué x en metros?** k se mide en N/m: si se pone x = 8, saldría 5 N/cm, un valor 100 veces menor en N/m.

**b) Energía almacenada**

**Ep el = ½·k·x² = ½ · 500 · 0,08² = 1,6 J**

> **¿Por qué ½?** La fuerza del muelle crece de 0 a 40 N mientras se comprime; el trabajo es el área del triángulo bajo la gráfica F–x: ½ · 0,08 · 40 = 1,6 J. Es el mismo número.

**c) Velocidad de salida**

Al soltar, toda la energía elástica pasa a energía cinética:

**½·k·x² = ½·m·v² ⟹ v = x·√(k/m) = 0,08 · √(500/0,5) = 0,08 · 31,6 = 2,53 m/s**

**Comprobación.** Ec = ½ · 0,5 · 2,53² = 1,60 J. Coincide con la energía almacenada.
--- simulacion
La simulación muestra el proceso al revés (el bloque llega a 2,53 m/s y comprime el muelle 8 cm); sin rozamiento es lo mismo, y después sale lanzado a 2,53 m/s.

=== 5.8 | Nuevo | Bloque con rozamiento que choca con un muelle de 300 N/m
pide: 2 kg a 4 m/s, 1,5 m con μ = 0,25 y muelle de 300 N/m
indice: v = 2,94 m/s al llegar; x = 0,224 m
widget: muelle {"escenario": "horizontal", "m": 2, "k": 300, "v0": 4, "L": 1.5, "mu": 0.25, "rozMuelle": true}
--- enunciado
Un bloque de 2 kg se lanza con una velocidad de 4 m/s sobre una superficie horizontal con coeficiente de rozamiento 0,25. Después de recorrer 1,5 m choca contra un muelle de constante 300 N/m. Suponiendo que el rozamiento también actúa mientras el muelle se comprime, calcula: a) la velocidad del bloque al llegar al muelle; b) la compresión máxima del muelle; c) ¿volverá el bloque a moverse hacia atrás?
--- resultado
a) v = 2,94 m/s · b) x = 0,224 m · c) sí: la fuerza del muelle (67 N) supera al rozamiento máximo (4,9 N).
--- solucion
Datos: m = 2 kg · v₀ = 4 m/s · μ = 0,25 · L = 1,5 m · k = 300 N/m · g = 9,8 m/s².

**Qué herramienta usar.** Ecuación de trabajo y energía con el rozamiento (W nc = W roz): Ec₀ + Ep₀ + W roz = Ec + Ep + Ep el.

**Fr = μ·m·g = 0,25 · 2 · 9,8 = 4,9 N**

**a) Velocidad al llegar al muelle**

**½·m·v₀² − Fr·L = ½·m·v₁² ⟹ v₁² = 16 − 2 · 0,25 · 9,8 · 1,5 = 8,65 ⟹ v₁ = 2,94 m/s**

**b) Compresión máxima**

Desde que toca el muelle hasta que se para (v = 0), el bloque recorre x más con rozamiento:

**½·m·v₁² − Fr·x = ½·k·x² ⟹ 150·x² + 4,9·x − 8,65 = 0**

> **¿Por qué el rozamiento lleva x?** Mientras comprime el muelle, el bloque sigue deslizando sobre el suelo una distancia x: el rozamiento también trabaja en ese tramo.

**x = [−4,9 + √(4,9² + 4 · 150 · 8,65)] / (2 · 150) = (−4,9 + 72,2) / 300 = 0,224 m**

> **¿Por qué la raíz positiva?** La otra solución es negativa (sería un estiramiento) y no tiene sentido físico.

**c) ¿Vuelve hacia atrás?**

En la compresión máxima el muelle empuja con **k·x = 300 · 0,224 = 67,3 N**, mucho más que el rozamiento máximo, **4,9 N**: el bloque vuelve a moverse.

**Comprobación en julios.** Energía inicial ½ · 2 · 16 = 16 J. Calor: 4,9 · (1,5 + 0,224) = 8,45 J. Muelle: ½ · 300 · 0,224² = 7,55 J. Suma: 16,0 J. Cuadra.
--- simulacion
En la simulación la barra roja (calor) crece en todo el recorrido, también mientras el muelle se comprime.

=== 5.9 | Nuevo | Caja de 5 kg que cae 0,5 m sobre un muelle de 2000 N/m
pide: 5 kg desde 0,5 m sobre k = 2000 N/m; altura para comprimir 10 cm
indice: x = 0,183 m (7,5 veces x₀ = 2,45 cm); h = 10,4 cm
widget: muelle {"escenario": "vertical", "m": 5, "h": 0.5, "k": 2000, "v0": 0, "controles": ["m", "k", "h"], "ejemplos": [{"nombre": "a) Desde 0,5 m", "valores": {"h": 0.5}}, {"nombre": "c) Desde 10,4 cm", "valores": {"h": 0.104}}]}
--- enunciado
Una caja de 5 kg se deja caer desde 0,5 m de altura sobre un muelle vertical de constante 2000 N/m (la altura se mide desde la parte de arriba del muelle sin comprimir). Calcula: a) la compresión máxima del muelle; b) cuánto se comprimiría el muelle si la caja se dejase apoyada encima, en reposo; c) desde qué altura habría que soltarla para que el muelle se comprimiera solo 10 cm.
--- resultado
a) x = 0,183 m · b) x₀ = 2,45 cm (la caída comprime 7,5 veces más) · c) h = 10,4 cm.
--- solucion
Datos: m = 5 kg · h = 0,5 m · k = 2000 N/m · g = 9,8 m/s². Nivel h = 0 en el punto de máxima compresión.

**Qué herramienta usar.** Conservación de la energía (solo trabajan el peso y el muelle). Para b), equilibrio de fuerzas.

**a) Compresión máxima**

La caja baja h + x en total: **m·g·(h + x) = ½·k·x²**

> **¿Por qué h + x?** Después de tocar el muelle, la caja sigue bajando mientras lo comprime. Toda la energía potencial perdida acaba en el muelle cuando la caja se para.

**1000·x² − 49·x − 24,5 = 0 ⟹ x = [49 + √(49² + 4 · 1000 · 24,5)] / 2000 = (49 + 316,9) / 2000 = 0,183 m**

**b) Caja apoyada en reposo**

**k·x₀ = m·g ⟹ x₀ = 49 / 2000 = 0,0245 m = 2,45 cm**

> **¿Por qué no ½·k·x² = m·g·x?** En reposo no se compara energía, sino fuerzas: el muelle sostiene el peso. Con la energía, la caja bajaría hasta 2·x₀ y oscilaría.

La caída comprime el muelle **0,183 / 0,0245 = 7,5 veces más**: un golpe deforma mucho más que el mismo peso en reposo.

**c) Altura para comprimir 10 cm**

**m·g·(h + 0,1) = ½ · 2000 · 0,1² = 10 J ⟹ h + 0,1 = 10/49 = 0,204 m ⟹ h = 0,104 m = 10,4 cm**

**Comprobación de a).** Energía perdida por la caja: 5 · 9,8 · 0,683 = 33,5 J. Muelle: ½ · 2000 · 0,183² = 33,5 J. Coinciden.
--- simulacion
Usa los botones para comparar la caída desde 0,5 m y desde 10,4 cm. En la escena se ven a la vez la compresión máxima y la de la caja en reposo.
