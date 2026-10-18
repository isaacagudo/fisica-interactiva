---
slug: conservacion
titulo: Conservación de la energía mecánica
nombre: Conservación de la energía mecánica
corto: Conservación
eyebrow: Apartado 4
desc: Solo trabaja el peso: tiros, caídas y planos sin rozamiento.
resueltos: 4.1, 4.3
icono: conservacion
---
## Idea clave: si solo trabajan el peso y los muelles, la energía mecánica no cambia

**Energía mecánica: E M = Ec + Ep**

**Conservación: Ec₀ + Ep₀ = Ec + Ep** (si solo trabajan fuerzas conservativas)

> **¿Por qué?** Dos ideas que ya conoces. El teorema de las fuerzas vivas dice que el trabajo total es ΔEc. Y el trabajo del peso es −ΔEp (ejercicio 1.4: al subir, el peso hace trabajo negativo y la Ep aumenta). Si el peso es la única fuerza que trabaja: −ΔEp = ΔEc, es decir, ΔEc + ΔEp = 0. Lo que pierde una la gana la otra.

**Cuándo se puede usar.** Sin rozamiento, sin aire y sin fuerzas aplicadas (motores, personas, cuerdas que tiran). La normal no estropea la conservación porque es perpendicular al movimiento y no trabaja.

**Las tres claves de estos ejercicios**

1. **Elige tú el nivel h = 0** (normalmente el punto más bajo) y dílo. Solo importan las diferencias de altura: con otro nivel cambian las Ep, pero no el resultado.
2. **La trayectoria no importa.** El trabajo del peso solo depende de la altura inicial y final (fuerza conservativa). Por eso da igual subir por una rampa, en vertical o en parábola.
3. **La dirección de la velocidad no importa.** Ec = ½·m·v² solo depende del módulo de v. Si te piden una dirección, eso ya es cinemática.

**Si alguien aporta energía** (un motor, una persona), la energía mecánica cambia justo en el trabajo que hace: **W exterior = ΔE M** (apartado 2.1 de los apuntes; ejercicio 4.4).

**Método**

1. Comprobar que no hay rozamiento ni fuerzas aplicadas que trabajen.
2. Elegir h = 0 y dibujar los estados inicial y final.
3. Escribir Ec₀ + Ep₀ = Ec + Ep con cada término (y decir cuáles valen 0).
4. Despejar con letras: normalmente la masa se simplifica.
5. Sustituir y comprobar con cinemática si se puede.

## Simulador

La barra de energías cambia de ámbar (Ec) a azul (Ep) al subir y vuelve al bajar, pero la suma no cambia. Prueba «Comparar direcciones»: con la misma rapidez de salida, todos los lanzamientos llegan al suelo con la misma rapidez.

[[simulador:tiro|{"modo": "completo", "selector": true, "titulo": "Simulador: lanzamientos sin rozamiento", "escenario": "tiro", "m": 1, "h0": 0, "v0": 25, "angulo": 16.26, "ejemplos": [{"nombre": "Ejercicios 4", "valores": {"escenario": "tiro", "m": 1, "h0": 0, "v0": 25, "angulo": 16.26}}, {"nombre": "Ejercicios 5", "valores": {"escenario": "comparar", "m": 1, "h0": 5, "v0": 15.03, "angulos": [90, -90, 0]}}, {"nombre": "Tiro vertical", "valores": {"escenario": "tiro", "m": 1, "h0": 1.5, "v0": 12, "angulo": 90}}, {"nombre": "Caída desde 10 m", "valores": {"escenario": "tiro", "m": 1, "h0": 10, "v0": 0, "angulo": 0}}]}]]

=== 4.1 | Teoría 11 | Cuerpo lanzado a 3 m/s por un plano de 30° sin rozamiento
pide: Plano de 30° sin rozamiento a 3 m/s
indice: h = 0,46 m; d = 0,92 m
widget: plano {"escenario": "sube", "m": 5, "alpha": 30, "mu": 0, "v0": 3, "controles": ["m", "alpha", "v0"]}
--- enunciado
Se lanza un cuerpo de 5 kg con una rapidez de 3 m/s por un plano inclinado 30°. ¿Qué altura máxima alcanzará? ¿Qué distancia recorre sobre el plano? (Considerar despreciable el rozamiento.)
--- resultado
h máx = 0,46 m · d = 0,92 m sobre el plano.
--- solucion
Datos: m = 5 kg · v₀ = 3 m/s · α = 30° · sin rozamiento · g = 9,8 m/s².

[[diagrama:w41_plano|Teoría 11 · plano sin rozamiento]]

Sin rozamiento solo hay peso y normal; la normal es perpendicular al movimiento y no trabaja.

**Qué herramienta usar.** Sin rozamiento, la normal no trabaja (es perpendicular al plano) y solo trabaja el peso: se conserva la energía mecánica.

**Paso 1. Nivel y estados.** h = 0 en la base. Estado A: base, v = 3 m/s. Estado B: punto más alto, v = 0.

**Paso 2. Conservación**

**Ec,A + Ep,A = Ec,B + Ep,B ⟹ ½·m·v₀² + 0 = 0 + m·g·h**

> **¿Por qué cada cero?** Ep,A = 0 porque A está en el nivel h = 0. Ec,B = 0 porque en el punto más alto el cuerpo se para un instante antes de volver a bajar.

**Paso 3. Despejar**

**h = v₀² / (2·g) = 3² / (2 · 9,8) = 9 / 19,6 = 0,459 m**

> **¿Por qué no aparecen la masa ni el ángulo?** La masa está en los dos lados y se simplifica. El ángulo no influye en la altura porque la energía no depende del camino: lanzado en vertical a 3 m/s, subiría a la misma altura.

**Paso 4. Distancia sobre el plano**

**sen α = h / d ⟹ d = h / sen 30° = 0,459 / 0,5 = 0,918 m**

> **¿Por qué?** En el triángulo del plano, la altura es el cateto opuesto al ángulo y la distancia recorrida es la hipotenusa.

**Comprobación por dinámica.** Sin rozamiento, la aceleración a lo largo del plano es a = −g·sen 30° = −4,9 m/s², y d = v₀² / (2·|a|) = 9 / 9,8 = 0,918 m. Coincide.
--- simulacion
Sin rozamiento, en la simulación el cuerpo sube 0,92 m por el plano y vuelve a la base con los mismos 3 m/s. Prueba a cambiar el ángulo: la altura máxima no cambia.

=== 4.2 | Ejercicios 4 | Tiro oblicuo: velocidad en el punto más alto
pide: Tiro oblicuo a 25 m/s, punto más alto a 2,5 m
indice: v = 24 m/s
widget: tiro {"escenario": "tiro", "m": 1, "h0": 0, "v0": 25, "angulo": 16.26, "controles": ["v0", "angulo", "h0"]}
--- enunciado
Desde el suelo se lanza oblicuamente hacia arriba un cuerpo de masa m con una velocidad de 25 m/s. Suponiendo despreciable la resistencia del aire, aplica la conservación de la energía mecánica para calcular su velocidad en el punto más alto de la trayectoria, si este se halla a 2,5 m de altura.
--- resultado
v = 24 m/s en el punto más alto.
--- solucion
Datos: v₀ = 25 m/s desde el suelo · punto más alto a h = 2,5 m · sin rozamiento del aire · g = 9,8 m/s² · m no se da.

[[diagrama:w42_parabola|Ejercicios 4 · trayectoria del tiro oblicuo]]

En el punto más alto la velocidad es horizontal y vale lo mismo que la componente horizontal del lanzamiento.

**Qué herramienta usar.** El enunciado lo pide: conservación de la energía mecánica. Sin aire, solo trabaja el peso.

**Paso 1. Nivel y estados.** h = 0 en el suelo. A: lanzamiento, v = 25 m/s. B: punto más alto, h = 2,5 m, v desconocida.

**Paso 2. Conservación**

**½·m·v₀² + 0 = ½·m·v² + m·g·h**

> **¿Por qué en B no es v = 0?** En un tiro oblicuo, en el punto más alto solo se anula la componente vertical de la velocidad. La horizontal sigue, así que el cuerpo tiene energía cinética. Solo en un lanzamiento vertical la velocidad es cero arriba.

**Paso 3. Despejar**

**v = √(v₀² − 2·g·h) = √(25² − 2 · 9,8 · 2,5) = √(625 − 49) = √576 = 24 m/s**

> **¿Por qué no hace falta el ángulo?** La energía solo ve el módulo de la velocidad y la altura. El ángulo está «escondido» en que la altura máxima es 2,5 m.

**Comprobación por cinemática.** Para subir 2,5 m, la componente vertical inicial cumple v₀y² = 2·g·h = 49, así que v₀y = 7 m/s. La horizontal es v₀x = √(25² − 7²) = 24 m/s y no cambia durante el vuelo. En el punto más alto v = v₀x = 24 m/s. Coincide (y el ángulo de lanzamiento era sen θ = 7/25, θ = 16,3°).
--- simulacion
En la simulación (escala vertical ampliada) se ve que en el punto más alto la velocidad no es cero: queda la componente horizontal, 24 m/s.

=== 4.3 | Ejercicios 5 | Desde 5 m de altura, llegar al suelo a 18 m/s
pide: Desde 5 m, llegar al suelo a 18 m/s
indice: v₀ = 15,0 m/s en los tres casos
widget: tiro {"escenario": "comparar", "m": 1, "h0": 5, "v0": 15.03, "angulos": [90, -90, 0], "controles": ["v0", "h0"]}
--- enunciado
¿Con qué velocidad inicial se ha de lanzar un cuerpo verticalmente hacia arriba desde una altura de 5 m para que su velocidad al llegar al suelo sea de 18 m/s? ¿Y si se lanza verticalmente hacia abajo? ¿Y horizontalmente?
--- resultado
v₀ = 15,0 m/s, igual si se lanza hacia arriba, hacia abajo u horizontalmente.
--- solucion
Datos: h = 5 m · v al llegar al suelo = 18 m/s · sin aire · g = 9,8 m/s² · m no se da.

[[diagrama:w43_tres|Ejercicios 5 · tres lanzamientos desde 5 m]]

Las tres trayectorias son distintas, pero todas empiezan con la misma energía y bajan los mismos 5 m.

**Qué herramienta usar.** Solo trabaja el peso: conservación de la energía mecánica. Y como la energía no depende de la dirección de la velocidad ni del camino, las tres preguntas tienen la misma respuesta.

**Paso 1. Nivel y estados.** h = 0 en el suelo. A: lanzamiento a 5 m con v₀. B: suelo, v = 18 m/s.

**Paso 2. Conservación**

**½·m·v₀² + m·g·h = ½·m·v² + 0**

> **¿Por qué?** Arriba el cuerpo tiene energía cinética (la del lanzamiento) y potencial (está a 5 m). En el suelo, Ep = 0 por el nivel elegido, y todo es cinética.

**Paso 3. Despejar**

**v₀ = √(v² − 2·g·h) = √(18² − 2 · 9,8 · 5) = √(324 − 98) = √226 = 15,0 m/s**

**¿Y hacia abajo? ¿Y horizontalmente?** Lo mismo: v₀ = 15,0 m/s.

> **¿Por qué da igual la dirección?** Ec = ½·m·v² solo depende del módulo de la velocidad, no de hacia dónde apunta. Y el trabajo del peso entre 5 m y el suelo es m·g·5 sea cual sea la trayectoria (fuerza conservativa). Lo que sí cambia es el tiempo que tarda y el punto donde cae, pero eso no lo preguntan.

**Comprobación por cinemática (lanzamiento vertical hacia arriba).** Tomando hacia arriba como positivo, el desplazamiento total es −5 m: v² = v₀² − 2·g·(−5) = 226 + 98 = 324, v = 18 m/s. Coincide.
--- simulacion
Las tres pelotas salen a 15,0 m/s en tres direcciones y llegan al suelo en momentos distintos, pero las tres a 18 m/s.

=== 4.4 | Ejercicios 8 | Energía que hay que suministrar a un cuerpo de 40 kg
pide: 40 kg de 30 m y 15 m/s a 90 m y 12 m/s
indice: W = 2,19·10⁴ J
--- enunciado
Un cuerpo de 40 kg que está a 30 m de altura lleva una velocidad de 15 m/s. ¿Qué energía hay que suministrarle si queremos que ascienda hasta una altura de 90 m y se mueva con una velocidad de 12 m/s?
--- resultado
W = 21 900 J = 2,19·10⁴ J.
--- solucion
Datos: m = 40 kg · estado inicial: h₀ = 30 m, v₀ = 15 m/s · estado final: h = 90 m, v = 12 m/s · g = 9,8 m/s².

**Qué herramienta usar.** Aquí la energía mecánica **no** se conserva: alguien (un motor, una grúa) tiene que aportar energía para subir el cuerpo. Se usa la versión general del apartado 2.1 de los apuntes: el trabajo exterior es la variación de energía mecánica.

**W exterior = E M final − E M inicial = (Ec + Ep) final − (Ec + Ep) inicial**

> **¿Por qué?** Es la ecuación de conservación con un término más: Ec₀ + Ep₀ + W ext = Ec + Ep. Si W ext es positivo, la energía mecánica aumenta en esa cantidad.

**Paso 1. Energías (h = 0 en el suelo)**

| | Ec = ½·m·v² | Ep = m·g·h | E M |
| --- | --- | --- | --- |
| Inicial (30 m, 15 m/s) | ½ · 40 · 15² = 4 500 J | 40 · 9,8 · 30 = 11 760 J | 16 260 J |
| Final (90 m, 12 m/s) | ½ · 40 · 12² = 2 880 J | 40 · 9,8 · 90 = 35 280 J | 38 160 J |
| Variación | −1 620 J | +23 520 J | +21 900 J |

**Paso 2. Energía que hay que suministrar**

**W ext = 38 160 − 16 260 = 21 900 J**

> **¿Por qué es menor que el aumento de Ep?** El cuerpo llega más despacio (12 m/s en vez de 15 m/s): parte de la energía potencial que gana sale de su propia energía cinética (1 620 J). El resto, 21 900 J, lo pone el motor.

**Comprobación.** Con otro nivel de referencia (por ejemplo h = 0 a 30 m), las Ep cambian pero la variación no: ΔEp = 40 · 9,8 · 60 = 23 520 J. El resultado sigue siendo 21 900 J.

=== 4.5 | Nuevo | Pelota lanzada hacia arriba desde 1,5 m
pide: Pelota a 12 m/s hacia arriba desde 1,5 m
indice: h máx = 8,85 m; v = 9,75 m/s a 4 m; v = 13,2 m/s en el suelo
widget: tiro {"escenario": "tiro", "m": 0.2, "h0": 1.5, "v0": 12, "angulo": 90, "controles": ["v0", "h0", "angulo"]}
--- enunciado
Se lanza verticalmente hacia arriba una pelota de 200 g con una velocidad de 12 m/s desde 1,5 m de altura sobre el suelo. Despreciando el rozamiento con el aire, calcula aplicando la conservación de la energía: a) la altura máxima que alcanza; b) su velocidad cuando pasa por 4 m de altura; c) la velocidad con la que llega al suelo.
--- resultado
a) h máx = 8,85 m sobre el suelo · b) v = 9,75 m/s (al subir y al bajar) · c) v = 13,2 m/s.
--- solucion
Datos: m = 0,2 kg · v₀ = 12 m/s hacia arriba · h₀ = 1,5 m · g = 9,8 m/s². Nivel h = 0 en el suelo.

**Qué herramienta usar.** Solo trabaja el peso: **conservación de la energía mecánica**, Ec₀ + Ep₀ = Ec + Ep.

**a) Altura máxima**

En el punto más alto v = 0:

**½·m·v₀² + m·g·h₀ = 0 + m·g·h máx ⟹ h máx = h₀ + v₀²/(2·g) = 1,5 + 144/19,6 = 8,85 m**

> **¿Por qué v = 0 arriba?** En un tiro vertical la pelota se para un instante antes de bajar. (En un tiro oblicuo no: queda la velocidad horizontal.)

**b) Velocidad a 4 m**

**½·v₀² + g·h₀ = ½·v² + g·h ⟹ v = √[v₀² − 2·g·(h − h₀)] = √(144 − 2 · 9,8 · 2,5) = √95 = 9,75 m/s**

> **¿Por qué desaparece la masa?** Está en todos los términos: se divide la ecuación entre m. Por eso el resultado vale para cualquier pelota.

La energía no distingue entre subir y bajar: pasa por 4 m a 9,75 m/s hacia arriba y, más tarde, a 9,75 m/s hacia abajo.

**c) Velocidad en el suelo**

**v = √(v₀² + 2·g·h₀) = √(144 + 29,4) = 13,2 m/s**

**Comprobación en julios.** E = ½ · 0,2 · 144 + 0,2 · 9,8 · 1,5 = 14,4 + 2,94 = 17,34 J. Arriba: 0,2 · 9,8 · 8,85 = 17,34 J. En el suelo: ½ · 0,2 · 13,17² = 17,34 J. Se conserva.
--- simulacion
La barra de energías de la simulación cambia de ámbar (Ec) a azul (Ep) al subir y vuelve al bajar; la suma no cambia. Prueba con otros ángulos: la velocidad al llegar al suelo es siempre la misma.

=== 4.6 | Nuevo | Bloque que baja 3 m por un plano liso de 30°
pide: Bloque de 2 kg que baja 3 m de altura por un plano liso
indice: v = 7,67 m/s en la base; 5,42 m/s a media altura
widget: plano {"escenario": "baja", "m": 2, "alpha": 30, "h": 3, "mu": 0, "v0": 0, "controles": ["m", "alpha", "h", "mu"]}
--- enunciado
Un bloque de 2 kg se suelta desde lo alto de un plano inclinado 30°, sin rozamiento, situado a 3 m de altura. Calcula: a) la velocidad con la que llega a la base del plano; b) la velocidad cuando está a mitad de altura; c) ¿cambiaría la velocidad final si el plano estuviera inclinado 60°? ¿Y el tiempo de bajada?
--- resultado
a) v = 7,67 m/s · b) v = 5,42 m/s · c) la velocidad final es la misma (solo depende de la altura); el tiempo es menor con 60°.
--- solucion
Datos: m = 2 kg · α = 30° · h = 3 m · sin rozamiento · v₀ = 0 · g = 9,8 m/s². Nivel h = 0 en la base.

**Qué herramienta usar.** Sobre el bloque actúan el peso y la normal. La normal es perpendicular al plano y no trabaja; solo trabaja el peso, así que **se conserva la energía mecánica**.

**a) Velocidad en la base**

**m·g·h = ½·m·v² ⟹ v = √(2·g·h) = √(2 · 9,8 · 3) = 7,67 m/s**

> **¿Por qué no aparece el ángulo?** La energía potencial depende solo de la altura. La normal no quita ni da energía, así que toda la Ep inicial llega a la base como Ec, sea cual sea la inclinación.

**b) A mitad de altura (1,5 m)**

**m·g·h = ½·m·v² + m·g·(h/2) ⟹ v = √(g·h) = √(9,8 · 3) = 5,42 m/s**

> **¿Por qué no es la mitad de 7,67?** A mitad de altura se ha convertido la mitad de la energía; como Ec va con v², la velocidad es 7,67/√2 = 5,42 m/s, el 71 % de la final.

**c) Plano de 60°**

La velocidad final no cambia: **v = √(2·g·h) = 7,67 m/s**. El tiempo sí: con 60° la aceleración es mayor (g·sen 60° = 8,49 m/s² frente a g·sen 30° = 4,9 m/s²) y el recorrido menor (3,46 m frente a 6 m), así que baja antes (0,90 s frente a 1,56 s). La energía dice «con qué velocidad», no «en cuánto tiempo».
--- simulacion
Cambia el ángulo en la simulación: el resultado «Velocidad en la base» no se mueve, pero la animación dura menos con más pendiente.

=== 4.7 | Nuevo | Canica que cae de una mesa de 0,8 m
pide: Canica a 2 m/s que cae de una mesa de 0,8 m
indice: v = 4,44 m/s al llegar al suelo
widget: tiro {"escenario": "tiro", "m": 0.02, "h0": 0.8, "v0": 2, "angulo": 0, "controles": ["v0", "h0", "angulo"]}
--- enunciado
Una canica de 20 g rueda por una mesa de 0,8 m de altura con una velocidad de 2 m/s y cae por el borde. Despreciando el rozamiento con el aire: a) calcula, por consideraciones energéticas, la velocidad con la que llega al suelo; b) ¿podrías calcular con la energía la dirección de esa velocidad? Calcúlala con la cinemática del tiro horizontal.
--- resultado
a) v = 4,44 m/s · b) la energía da el módulo, no la dirección: la velocidad forma 63,2° con la horizontal, hacia abajo.
--- solucion
Datos: m = 0,02 kg · v₀ = 2 m/s horizontal · h₀ = 0,8 m · g = 9,8 m/s². Nivel h = 0 en el suelo.

**Qué herramienta usar.** Solo trabaja el peso: conservación de la energía mecánica para el módulo de la velocidad.

**a) Velocidad al llegar al suelo**

**½·m·v₀² + m·g·h₀ = ½·m·v² ⟹ v = √(v₀² + 2·g·h₀) = √(4 + 15,68) = 4,44 m/s**

> **¿Por qué no importa que el tiro sea horizontal?** La energía cinética es ½·m·v² con el módulo de la velocidad, sin dirección. Se llega a la misma rapidez lanzando hacia arriba, hacia abajo o en horizontal (ejercicio 4.3).

**b) Dirección**

La energía es un escalar: no da direcciones. Con la cinemática del tiro horizontal:

**vx = 2 m/s (constante) ; vy = √(2·g·h₀) = √15,68 = 3,96 m/s (hacia abajo)**

**tg β = vy / vx = 3,96 / 2 = 1,98 ⟹ β = 63,2° por debajo de la horizontal**

**Comprobación.** √(vx² + vy²) = √(4 + 15,68) = 4,44 m/s. Coincide con el resultado por energía.
--- simulacion
En la simulación se ven las dos componentes de la velocidad: la horizontal no cambia y la vertical crece. La energía solo «ve» el módulo de la flecha naranja.
