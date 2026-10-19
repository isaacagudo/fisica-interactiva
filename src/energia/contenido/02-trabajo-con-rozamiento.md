---
slug: trabajo-con-rozamiento
titulo: Trabajo con rozamiento en un plano horizontal
nombre: Trabajo con rozamiento en un plano horizontal
corto: Rozamiento
eyebrow: Apartado 2
desc: Fuerza oblicua: primero la normal, después el rozamiento y el trabajo.
resueltos: 2.1, 2.2
icono: rozamiento
---
## Idea clave: primero el diagrama, después la normal, después el rozamiento

En estos ejercicios un cuerpo se arrastra por un suelo horizontal y actúan cuatro fuerzas: el peso P, la normal N, la fuerza aplicada F y el rozamiento Fr. Para calcular el trabajo del rozamiento hace falta Fr = μ·N, y **N no siempre vale m·g**: depende de si la fuerza aplicada tira un poco hacia arriba o empuja hacia abajo.

**Eje vertical (el cuerpo no se mueve en vertical): ΣFy = 0**

> **¿Por qué?** Si no hay movimiento vertical, la aceleración vertical es cero, y por la segunda ley de Newton las fuerzas verticales se compensan. De ahí sale N.

**Eje horizontal: ΣFx = m·a**

> **¿Por qué?** En la dirección del movimiento las fuerzas no se compensan: la resultante acelera el cuerpo. De ahí sale la aceleración, y con ella las ecuaciones del MRUA si dan el tiempo.

**Qué fuerzas no trabajan.** El peso y la normal son verticales y el desplazamiento es horizontal: φ = 90°, cos 90° = 0, trabajo nulo. De una fuerza inclinada solo trabaja su componente horizontal.

**Método**

1. Diagrama de fuerzas; descomponer F en Fx = F·cos φ y Fy = F·sen φ.
2. ΣFy = 0 ⟹ N.
3. Fr = μ·N.
4. ΣFx = m·a ⟹ a; si dan el tiempo: v = v₀ + a·t y Δx = v₀·t + ½·a·t².
5. Trabajo de cada fuerza con W = F·Δs·cos φ.
6. Comprobación: la suma de todos los trabajos debe ser igual a ΔEc.

## Simulador

Cambia el ángulo de la fuerza y mira la normal: al tirar hacia arriba disminuye (y con ella el rozamiento); al empujar hacia abajo (ángulo negativo) aumenta. La barra de energías reparte el trabajo de F entre la energía cinética y el calor.

[[simulador:bloque|{"modo": "completo", "titulo": "Simulador: tirar de un bloque con rozamiento", "escenario": "arrastre", "m": 5, "F": 30, "alpha": 30, "mu": 0.2, "v0": 0, "hasta": "t", "t": 10, "controles": ["m", "F", "alpha", "mu", "t"], "ejemplos": [{"nombre": "Teoría 2 (g = 10)", "valores": {"escenario": "arrastre", "m": 5, "F": 40, "alpha": 0, "mu": 0.5, "g": 10, "v0": 0, "hasta": "d", "d": 8, "controles": ["m", "F", "alpha", "mu", "d"]}}, {"nombre": "Ejercicios 1", "valores": {"escenario": "arrastre", "m": 5, "F": 30, "alpha": 30, "mu": 0.2, "v0": 0, "hasta": "t", "t": 10}}, {"nombre": "Repaso 5", "valores": {"escenario": "arrastre", "m": 5, "F": 30, "alpha": 30, "mu": 0.4, "v0": 0, "hasta": "t", "t": 10}}, {"nombre": "Empujar hacia abajo", "valores": {"escenario": "arrastre", "m": 10, "F": 60, "alpha": -30, "mu": 0.25, "v0": 0, "hasta": "d", "d": 5, "controles": ["m", "F", "alpha", "mu", "d"]}}]}]]

=== 2.1 | Teoría 2 | Bloque de 5 kg arrastrado con una fuerza de 40 N
pide: Trabajo del peso, de F y del rozamiento en 8 m
indice: 0 J; 320 J; −200 J
widget: bloque {"escenario": "arrastre", "m": 5, "F": 40, "alpha": 0, "mu": 0.5, "g": 10, "v0": 0, "hasta": "d", "d": 8, "controles": ["m", "F", "mu", "d"]}
--- enunciado
Un bloque de masa m = 5 kg es arrastrado sobre una superficie plana y horizontal tirando de él por medio de una cuerda, que ejerce una fuerza F paralela a la superficie de 40 N. El coeficiente de rozamiento cinético entre el cuerpo y la superficie es 0,5. Calcula el trabajo que realizan las siguientes fuerzas cuando el cuerpo se desplaza 8 m: a) la fuerza peso; b) la fuerza F; c) la fuerza de rozamiento. (Tomar g = 10 m/s².)
--- resultado
a) W peso = 0 J · b) W F = 320 J · c) W roz = −200 J.
--- solucion
Datos: m = 5 kg · F = 40 N paralela al suelo · μ = 0,5 · Δs = 8 m · g = 10 m/s² (la da el enunciado).

[[diagrama:w21_horizontal|Teoría 2 · fuerzas sobre el bloque arrastrado]]

Las fuerzas verticales (P y N) no trabajan; F trabaja a favor y el rozamiento en contra.

**Qué herramienta usar.** Se piden trabajos de fuerzas constantes: W = F·Δs·cos φ para cada una. Para el rozamiento hace falta antes N, que sale del eje vertical.

**a) Trabajo del peso**

**W peso = m·g · Δs · cos 90° = 50 · 8 · 0 = 0 J**

> **¿Por qué cos 90°?** El peso es vertical y el bloque se mueve en horizontal: el peso ni ayuda ni frena el movimiento.

**b) Trabajo de F**

**W F = F · Δs · cos 0° = 40 · 8 · 1 = 320 J**

> **¿Por qué cos 0°?** F es paralela al suelo y tira en el sentido del movimiento.

**c) Trabajo del rozamiento**

Eje vertical: **N − m·g = 0 ⟹ N = m·g = 5 · 10 = 50 N**

> **¿Por qué aquí N = m·g?** Porque F es horizontal y no tiene componente vertical: en vertical solo están N y el peso.

**Fr = μ·N = 0,5 · 50 = 25 N**

**W roz = Fr · Δs · cos 180° = 25 · 8 · (−1) = −200 J**

> **¿Por qué cos 180°?** El rozamiento siempre va en sentido contrario al movimiento.

**Comprobación.** Trabajo total = 0 + 320 − 200 + 0 (la normal tampoco trabaja) = 120 J. Por el teorema de las fuerzas vivas esto es ΔEc: si el bloque salía del reposo, ½·5·v² = 120 ⟹ v = 6,93 m/s. Por dinámica: a = (40 − 25)/5 = 3 m/s² y v² = 2·3·8 = 48 ⟹ v = 6,93 m/s. Los dos métodos coinciden.
--- simulacion
En la simulación (con g = 10 m/s², como dice el enunciado) se ve el reparto: de los 320 J que hace F, 200 J se van en calor y 120 J quedan como energía cinética.

=== 2.2 | Ejercicios 1 | Fuerza de 30 N a 30° con μ = 0,2: velocidad y trabajo del rozamiento
pide: 30 N a 30°, μ = 0,2: v a los 10 s y W del rozamiento
indice: v = 38,4 m/s; W roz = −1,30·10³ J
widget: bloque {"escenario": "arrastre", "m": 5, "F": 30, "alpha": 30, "mu": 0.2, "v0": 0, "hasta": "t", "t": 10}
--- enunciado
Un cuerpo de 5 kg de masa se mueve sobre un plano horizontal por acción de una fuerza de 30 N, que se aplica al cuerpo formando un ángulo de 30° con la horizontal. El coeficiente de rozamiento es 0,2. Calcula la velocidad del cuerpo después de 10 s de haber sido aplicada la fuerza y el trabajo de la fuerza de fricción durante ese tiempo.
--- resultado
v = 38,4 m/s a los 10 s · W roz = −1,30·10³ J (−1 304 J).
--- solucion
Datos: m = 5 kg · F = 30 N a 30° sobre la horizontal · μ = 0,2 · t = 10 s · parte del reposo · g = 9,8 m/s². Se supone que la fuerza tira hacia arriba, como en el dibujo de la página 1 de los apuntes.

[[diagrama:w22_oblicua|Ejercicios 1 · fuerza a 30° descompuesta en Fx y Fy]]

Fx arrastra el bloque; Fy lo levanta un poco, y por eso el suelo empuja menos: N = 34 N en vez de 49 N.

**Qué herramienta usar.** Piden la velocidad al cabo de un **tiempo**: eso es dinámica y cinemática (la energía no maneja tiempos). Después, el trabajo del rozamiento con W = Fr·Δs·cos 180°, que necesita la distancia recorrida.

**Paso 1. Componentes de F**

**Fx = F·cos 30° = 30 · 0,866 = 25,98 N  Fy = F·sen 30° = 30 · 0,5 = 15 N**

> **¿Por qué?** Fx es la parte que arrastra el bloque; Fy es la parte que tira hacia arriba y «aligera» el bloque contra el suelo.

**Paso 2. Normal y rozamiento**

**ΣFy = 0: N + Fy − m·g = 0 ⟹ N = 49 − 15 = 34 N**

> **¿Por qué N no es m·g?** La cuerda sostiene parte del peso (15 N), así que el suelo solo tiene que empujar 34 N hacia arriba.

**Fr = μ·N = 0,2 · 34 = 6,8 N**

**Paso 3. Aceleración**

**ΣFx = m·a: Fx − Fr = m·a ⟹ a = (25,98 − 6,8) / 5 = 3,84 m/s²**

**Paso 4. Velocidad y distancia a los 10 s (MRUA desde el reposo)**

**v = a·t = 3,836 · 10 = 38,4 m/s  Δx = ½·a·t² = ½ · 3,836 · 10² = 191,8 m**

> **¿Por qué MRUA?** Las fuerzas son constantes, así que la aceleración también lo es. Usa a sin redondear (3,836) para no arrastrar errores.

**Paso 5. Trabajo del rozamiento**

**W roz = Fr · Δx · cos 180° = 6,8 · 191,8 · (−1) = −1 304 J**

**Comprobación por energía.** Trabajo de F: Fx·Δx = 25,98 · 191,8 = 4 983 J. Trabajo total = 4 983 − 1 304 = 3 679 J. Energía cinética final: ½ · 5 · 38,36² = 3 679 J. Coinciden, como dice el teorema de las fuerzas vivas.

> **Si la fuerza empujara hacia abajo** (desde arriba, a 30°), Fy apretaría el bloque contra el suelo: N = 49 + 15 = 64 N, Fr = 12,8 N, a = 2,64 m/s² y v = 26,4 m/s. El mismo enunciado da otro resultado: por eso el diagrama va primero.
--- simulacion
Cambia el ángulo en la simulación: al tirar más hacia arriba baja la normal (y el rozamiento), pero también la parte de F que tira hacia delante.

=== 2.3 | Repaso 5 | El mismo bloque con μ = 0,4
pide: 30 N a 30°, μ = 0,4: a, desplazamiento y W del rozamiento
indice: a = 2,48 m/s²; 124 m; W roz = −1,68·10³ J
widget: bloque {"escenario": "arrastre", "m": 5, "F": 30, "alpha": 30, "mu": 0.4, "v0": 0, "hasta": "t", "t": 10}
--- enunciado
Un cuerpo de 5 kg de masa comienza a moverse sobre un plano horizontal por acción de una fuerza de 30 N que se aplica al cuerpo formando un ángulo de 30° con la horizontal. El coeficiente de rozamiento entre el cuerpo y la superficie es de 0,4. Calcula: a) la aceleración; b) el desplazamiento realizado por el cuerpo a los 10 s de haber sido aplicada la fuerza; c) el trabajo realizado por la fuerza de rozamiento; d) ¿qué fuerza o fuerzas no realizan trabajo? ¿Por qué?
--- resultado
a) a = 2,48 m/s² · b) Δx = 124 m · c) W roz = −1,68·10³ J (−1 684 J) · d) no trabajan el peso, la normal ni la componente vertical de F.
--- solucion
Datos: m = 5 kg · F = 30 N a 30° hacia arriba · μ = 0,4 · t = 10 s desde el reposo · g = 9,8 m/s².

[[figura:horizontal|{"alpha": 30, "F": 30, "P": 49, "N": 34, "Fr": 13.6, "v": "v"}]]

El mismo esquema que en 2.2: solo cambia μ, así que la normal no cambia y el rozamiento se duplica.

**Qué herramienta usar.** Igual que 2.2: dinámica (ΣF = m·a), cinemática del MRUA y W = F·Δs·cos φ. Solo cambia μ.

**a) Aceleración**

Las componentes y la normal no dependen de μ: **Fx = 25,98 N, Fy = 15 N, N = 49 − 15 = 34 N**.

**Fr = μ·N = 0,4 · 34 = 13,6 N**

**a = (Fx − Fr) / m = (25,98 − 13,6) / 5 = 2,48 m/s²**

> **¿Por qué?** Segunda ley de Newton en el eje del movimiento: la fuerza que queda después de restar el rozamiento es la que acelera.

**b) Desplazamiento a los 10 s**

**Δx = ½·a·t² = ½ · 2,476 · 10² = 123,8 m ≈ 124 m**

> **¿Por qué sin v₀·t?** «Comienza a moverse» significa que parte del reposo: v₀ = 0.

**c) Trabajo del rozamiento**

**W roz = Fr · Δx · cos 180° = 13,6 · 123,8 · (−1) = −1 684 J**

**d) Fuerzas que no realizan trabajo**

El **peso** y la **normal** son perpendiculares al desplazamiento (φ = 90°, cos 90° = 0). De la fuerza F solo trabaja Fx; su componente vertical Fy tampoco trabaja.

> **¿Por qué?** Una fuerza perpendicular al movimiento no lo acelera ni lo frena: puede cambiar otras cosas (aquí, cuánto aprieta el bloque contra el suelo), pero no la energía cinética.

**Comprobación por energía.** W F = 25,98 · 123,8 = 3 217 J; trabajo total = 3 217 − 1 684 = 1 533 J. Con v = a·t = 24,76 m/s, Ec = ½ · 5 · 24,76² = 1 533 J. Coinciden.

**Comparación con 2.2.** Al duplicar μ, el rozamiento se duplica (de 6,8 a 13,6 N), la aceleración baja de 3,84 a 2,48 m/s² y el bloque recorre menos (124 m frente a 192 m), pero el trabajo del rozamiento es mayor en valor absoluto (1 684 J frente a 1 304 J).
--- simulacion
Compara con el ejercicio 2.2: con el doble de rozamiento el bloque llega a 124 m en lugar de 192 m.

=== 2.4 | Nuevo | Empujar hacia abajo un bloque de 10 kg con 60 N a 30°
pide: Empujar 10 kg con 60 N dirigida 30° hacia abajo, μ = 0,25, 5 m
indice: N = 128 N; W F = 260 J; W roz = −160 J; v = 4,47 m/s
widget: bloque {"escenario": "arrastre", "m": 10, "F": 60, "alpha": -30, "mu": 0.25, "v0": 0, "hasta": "d", "d": 5, "controles": ["F", "alpha", "mu", "d"], "ejemplos": [{"nombre": "Empujar hacia abajo (−30°)", "valores": {"alpha": -30}}, {"nombre": "Tirar hacia arriba (30°)", "valores": {"alpha": 30}}]}
--- enunciado
Un bloque de 10 kg en reposo sobre un suelo horizontal se empuja con una fuerza de 60 N dirigida hacia abajo, formando 30° con la horizontal (como cuando se empuja un carro desde arriba). El coeficiente de rozamiento es 0,25. Cuando el bloque ha recorrido 5 m, calcula: a) la fuerza normal y la de rozamiento; b) el trabajo de cada fuerza; c) la velocidad del bloque. d) ¿Qué cambiaría si la misma fuerza tirase hacia arriba con el mismo ángulo?
--- resultado
a) N = 128 N y Fr = 32 N · b) W F = 260 J, W roz = −160 J, W P = W N = 0 · c) v = 4,47 m/s · d) tirando hacia arriba N = 68 N, Fr = 17 N y el trabajo total sería 175 J en lugar de 100 J.
--- solucion
Datos: m = 10 kg · F = 60 N, 30° por debajo de la horizontal · μ = 0,25 · Δx = 5 m · v₀ = 0 · g = 9,8 m/s².

[[figura:horizontal|{"alpha": -30, "F": 60, "P": 98, "N": 128, "Fr": 32, "v": "v"}]]

Al empujar desde arriba, Fy aprieta el bloque contra el suelo: la normal crece y, con ella, el rozamiento.

**Qué herramienta usar.** Primero el diagrama de fuerzas y el eje vertical (para N y Fr); después W = F·d·cos φ para cada fuerza y el teorema de las fuerzas vivas, W total = ΔEc, para la velocidad.

**a) Normal y rozamiento**

Componentes de F: **Fx = F·cos 30° = 60 · 0,866 = 52,0 N** (hacia delante) y **Fy = F·sen 30° = 60 · 0,5 = 30 N** (hacia abajo).

**ΣFy = N − m·g − F·sen 30° = 0 ⟹ N = 98 + 30 = 128 N**

> **¿Por qué N es mayor que el peso?** Al empujar hacia abajo, aprietas el bloque contra el suelo: el suelo tiene que sostener el peso y además la componente vertical de tu fuerza. Es el caso contrario a tirar hacia arriba con una cuerda.

**Fr = μ·N = 0,25 · 128 = 32 N**

**b) Trabajos**

**W F = F·Δx·cos 30° = 60 · 5 · 0,866 = 260 J**

> **¿Por qué cos 30° y no el ángulo con la vertical?** φ es el ángulo entre la fuerza y el desplazamiento, que es horizontal. Solo trabaja la componente de F a lo largo del movimiento, Fx; la componente vertical no trabaja.

**W roz = −Fr·Δx = −32 · 5 = −160 J**

**W P = W N = 0** (son perpendiculares al desplazamiento).

**c) Velocidad a los 5 m**

**W total = 260 − 160 = 100 J = ½·m·v² − 0 ⟹ v = √(2 · 100 / 10) = 4,47 m/s**

> **¿Por qué así?** El teorema de las fuerzas vivas: el trabajo de todas las fuerzas es la variación de energía cinética. Sale del reposo, así que Ec₀ = 0.

**Comprobación por dinámica.** a = (Fx − Fr)/m = (52,0 − 32)/10 = 2,00 m/s² y v² = 2·a·Δx = 2 · 2,00 · 5 = 20,0 ⟹ v = 4,47 m/s. Coincide.

**d) Tirando hacia arriba con el mismo ángulo**

**N = m·g − F·sen 30° = 98 − 30 = 68 N ; Fr = 0,25 · 68 = 17 N**

W F es el mismo (260 J), pero W roz = −17 · 5 = −85 J y el trabajo total sería 175 J (v = 5,91 m/s). **Tirar hacia arriba es más eficaz que empujar hacia abajo**: aligera el bloque y reduce el rozamiento.
--- simulacion
Compara en la simulación empujar hacia abajo y tirar hacia arriba con los dos botones: la flecha de la normal cambia de tamaño y, con ella, el rozamiento.

=== 2.5 | Nuevo | Trineo de 30 kg arrastrado con velocidad constante
pide: Trineo de 30 kg, 100 N a 20°, velocidad constante: μ y trabajos en 15 m
indice: μ = 0,362; W F = 1,41·10³ J; W roz = −1,41·10³ J; W total = 0
widget: bloque {"escenario": "arrastre", "m": 30, "F": 100, "alpha": 20, "mu": 0.3617, "v0": 1.5, "hasta": "d", "d": 15, "controles": ["F", "alpha", "mu", "d"]}
--- enunciado
Un niño arrastra un trineo de 30 kg sobre un suelo horizontal tirando de una cuerda que forma 20° con la horizontal, con una fuerza de 100 N. El trineo avanza con velocidad constante. Calcula: a) el coeficiente de rozamiento; b) el trabajo que realiza cada fuerza en un recorrido de 15 m; c) el trabajo total. Interprétalo.
--- resultado
a) μ = 0,362 · b) W F = 1,41·10³ J, W roz = −1,41·10³ J, W P = W N = 0 · c) W total = 0: la energía cinética no cambia.
--- solucion
Datos: m = 30 kg · F = 100 N a 20° hacia arriba · v constante · Δx = 15 m · g = 9,8 m/s².

[[figura:horizontal|{"alpha": 20, "F": 100, "P": 294, "N": 259.8, "Fr": 94, "v": "v constante"}]]

Cuatro fuerzas: peso, normal, la cuerda (descompuesta en Fx y Fy) y el rozamiento, contra el movimiento.

**Qué herramienta usar.** Velocidad constante ⟹ aceleración nula ⟹ **ΣF = 0 en los dos ejes** (dinámica). De ahí salen N y μ. Los trabajos, con W = F·d·cos φ.

**a) Coeficiente de rozamiento**

Eje vertical: **N + F·sen 20° − m·g = 0 ⟹ N = 294 − 34,2 = 259,8 N**

> **¿Por qué se resta F·sen 20°?** La cuerda tira un poco hacia arriba y aligera el trineo: el suelo lo sostiene menos.

Eje horizontal: **F·cos 20° − Fr = 0 ⟹ Fr = 100 · 0,940 = 94,0 N**

> **¿Por qué Fr = F·cos 20°?** A velocidad constante, la fuerza que tira hacia delante y el rozamiento se compensan exactamente.

**μ = Fr / N = 94,0 / 259,8 = 0,362**

**b) Trabajos en 15 m**

**W F = F·Δx·cos 20° = 100 · 15 · 0,940 = 1,41·10³ J**

**W roz = −Fr·Δx = −94,0 · 15 = −1,41·10³ J**

**W P = W N = 0** (perpendiculares al desplazamiento).

**c) Trabajo total**

**W total = 1 410 − 1 410 + 0 + 0 = 0 J = ΔEc**

> **¿Por qué cero?** Por el teorema de las fuerzas vivas: si la velocidad no cambia, ΔEc = 0 y el trabajo de todas las fuerzas juntas es nulo. No quiere decir que nadie trabaje: el niño hace 1 410 J de trabajo, y el rozamiento convierte justo esa energía en calor.

**Comprobación.** Sin la cuerda inclinada (tirando en horizontal), N sería 294 N y haría falta Fr = 0,362 · 294 = 106 N: tirar un poco hacia arriba ahorra fuerza.
--- simulacion
En la simulación el trineo sale ya a 1,5 m/s (el enunciado no da la velocidad, que no influye). La barra de energías muestra cómo todo el trabajo de F se convierte en calor mientras la energía cinética se queda igual.

=== 2.6 | Nuevo | Empujar 4 m y soltar: distancia hasta pararse
pide: 4 kg empujado 4 m con 30 N, μ = 0,3, y después suelto
indice: v = 6,04 m/s al soltar; 6,20 m más; W roz total = −120 J
widget: bloque {"escenario": "arrastre", "m": 4, "F": 30, "alpha": 0, "mu": 0.3, "v0": 0, "hasta": "parar", "dF": 4, "controles": ["m", "F", "mu", "dF"]}
--- enunciado
Un bloque de 4 kg, inicialmente en reposo sobre un suelo horizontal, se empuja con una fuerza horizontal de 30 N durante 4 m. Después se deja de empujar y el bloque sigue deslizando hasta pararse. El coeficiente de rozamiento es 0,3. Calcula: a) la velocidad del bloque cuando se deja de empujar; b) la distancia que recorre después hasta pararse; c) el trabajo total realizado por el rozamiento en todo el recorrido. ¿Por qué vale lo mismo que el trabajo de la fuerza, cambiado de signo?
--- resultado
a) v = 6,04 m/s · b) 6,20 m más (10,2 m en total) · c) W roz = −120 J, igual que el trabajo de F (120 J) con signo contrario, porque el bloque empieza y acaba parado.
--- solucion
Datos: m = 4 kg · F = 30 N horizontal durante d₁ = 4 m · μ = 0,3 · v₀ = 0 · g = 9,8 m/s².

[[figura:horizontal|{"alpha": 0, "F": 30, "P": 39.2, "N": 39.2, "Fr": 11.76, "v": "v"}]]

Mientras se empuja actúan F y el rozamiento; al soltar desaparece F y solo queda el rozamiento, que lo acaba parando.

**Qué herramienta usar.** Dos tramos con fuerzas distintas: el teorema de las fuerzas vivas en cada tramo. En horizontal y con F horizontal, N = m·g en los dos.

**Fr = μ·m·g = 0,3 · 4 · 9,8 = 11,76 N**

> **¿Por qué el rozamiento no cambia al dejar de empujar?** Porque F es horizontal: no aprieta ni aligera el bloque, así que N = m·g antes y después.

**a) Primer tramo (empujando)**

**W F = F·d₁ = 30 · 4 = 120 J ; W roz,1 = −Fr·d₁ = −11,76 · 4 = −47,0 J**

**W total = 120 − 47,0 = 73,0 J = ½·m·v₁² ⟹ v₁ = √(2 · 73,0 / 4) = 6,04 m/s**

**b) Segundo tramo (sin empujar)**

Solo trabaja el rozamiento, que se lleva toda la energía cinética:

**−Fr·d₂ = 0 − ½·m·v₁² ⟹ d₂ = 73,0 / 11,76 = 6,20 m**

> **¿Por qué así?** Teorema de las fuerzas vivas en el segundo tramo: Ec final = 0 (se para) y el único trabajo es el del rozamiento, negativo.

**c) Trabajo total del rozamiento**

**W roz = −Fr·(d₁ + d₂) = −11,76 · 10,2 = −120 J**

> **¿Por qué vale −120 J?** Teorema de las fuerzas vivas en todo el viaje: empieza y acaba parado, así que ΔEc = 0 ⟹ W F + W roz = 0 ⟹ W roz = −W F = −120 J. Todo el trabajo que hizo la persona ha acabado como calor.

**Comprobación.** d₂ también sale directamente: W F − Fr·(d₁ + d₂) = 0 ⟹ d₁ + d₂ = 120 / 11,76 = 10,2 m ⟹ d₂ = 6,20 m. Coincide.
--- simulacion
En la simulación la flecha de F desaparece a los 4 m y desde ahí solo frena el rozamiento. Fíjate en la barra: al final toda la energía es calor.
