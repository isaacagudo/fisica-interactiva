---
slug: trabajo-de-una-fuerza
titulo: Trabajo de una fuerza
nombre: Trabajo de una fuerza
corto: Trabajo
eyebrow: Categoría 1
desc: Con módulos y ángulo o con vectores: el producto escalar y el signo del trabajo.
---
## Idea clave: el trabajo de una fuerza constante

Una fuerza **trabaja** cuando el cuerpo se desplaza y la fuerza tiene una componente en la dirección del desplazamiento. Solo cuenta esa componente:

**W = F · Δs · cos φ** (en julios: 1 J = 1 N · 1 m)

> **¿Por qué?** La parte de la fuerza que va a lo largo del desplazamiento es F·cos φ. La parte perpendicular (F·sen φ) no empuja al cuerpo en el sentido en que se mueve, así que no le da ni le quita energía. φ es el ángulo entre la fuerza y el desplazamiento, no el ángulo con el suelo.

| Ángulo φ | cos φ | Signo de W | Ejemplo |
| --- | --- | --- | --- |
| 0° | 1 | Positivo: W = F·Δs | Tirar en el sentido del movimiento |
| Entre 0° y 90° | Entre 0 y 1 | Positivo | Cuerda inclinada que arrastra un bloque |
| 90° | 0 | W = 0 | Peso y normal en un suelo horizontal |
| Entre 90° y 180° | Negativo | Negativo | El peso cuando el cuerpo sube por una rampa |
| 180° | −1 | Negativo: W = −F·Δs | Rozamiento |

Con vectores (fuerza y posiciones dadas con i y j):

**W = F⃗ · Δr⃗ = Fx·Δx + Fy·Δy** con **Δr⃗ = r⃗ final − r⃗ inicial**

> **¿Por qué?** Es la misma fórmula escrita de otra forma: el producto escalar de dos vectores vale |F|·|Δr|·cos φ, y en componentes se calcula multiplicando x por x e y por y y sumando. Así no hace falta conocer el ángulo.

También se puede ver en una gráfica: **el trabajo es el área bajo la curva fuerza–posición**. Con una fuerza constante el área es un rectángulo (F·Δs); con un muelle es un triángulo (categoría 5).

**Método en 4 pasos**

1. Desplazamiento: Δr = final − inicial, componente a componente.
2. Producto escalar: un número, en julios, sin i ni j.
3. Signo: positivo si la fuerza ayuda al movimiento; negativo si se opone.
4. Comprobación: cos φ = W / (|F|·|Δr|) da el ángulo; debe cuadrar con el signo.

=== 1.1 | Teoría 1 | Trabajo de F = 3i − 5j de A(−2, 1) a B(4, 3)
pide: W de F = 3i − 5j de A(−2, 1) a B(4, 3)
indice: W = 8 J
widget: vectores {"Fx": 3, "Fy": -5, "Ax": -2, "Ay": 1, "Bx": 4, "By": 3}
--- enunciado
Un cuerpo se desplaza desde el punto A(−2, 1) m hasta el B(4, 3) m. Sobre él actúa una fuerza constante **F = 3i − 5j N**. ¿Qué trabajo realiza la fuerza F en el citado desplazamiento?
--- resultado
W = 8 J.
--- solucion
Datos: F⃗ = 3i − 5j N · A(−2, 1) m · B(4, 3) m.

[[diagrama:w11_vectores|Teoría 1 · F, Δr y el ángulo entre ellos]]

La fuerza apunta hacia abajo a la derecha y el cuerpo sube a la derecha: forman 77,5°, así que el trabajo es positivo pero pequeño.

**Qué herramienta usar.** La fuerza y las posiciones vienen dadas con vectores, así que se usa el producto escalar. No hace falta conocer el ángulo.

**Paso 1. Desplazamiento**

**Δr⃗ = r⃗B − r⃗A = [4 − (−2)] i + (3 − 1) j = 6i + 2j m**

> **¿Por qué?** El desplazamiento va del punto inicial al final: se resta la posición inicial a la final, componente a componente. Cuidado con el doble signo: 4 − (−2) = 4 + 2 = 6.

**Paso 2. Producto escalar**

**W = F⃗ · Δr⃗ = 3 · 6 + (−5) · 2 = 18 − 10 = 8 J**

> **¿Por qué?** Se multiplica la componente x de la fuerza por la componente x del desplazamiento, lo mismo con y, y se suman. El resultado es un número (una energía), sin i ni j.

**Comprobación con el ángulo.** |F| = √(3² + 5²) = √34 = 5,83 N y |Δr| = √(6² + 2²) = √40 = 6,32 m.

**cos φ = W / (|F|·|Δr|) = 8 / (5,83 · 6,32) = 0,217 ⟹ φ = 77,5°**

El ángulo es menor de 90°, así que el trabajo debe ser positivo, y lo es. Es pequeño porque la fuerza va casi perpendicular al desplazamiento.

> **Ojo con un error frecuente.** A veces se escribe (3i − 5j)·(6, 4) = 18i − 20j = −2j. Tiene dos fallos: Δy = 3 − 1 = 2, no 4; y el producto escalar no lleva i ni j, porque se suman los productos. Lo correcto es W = 8 J.
--- simulacion
En la simulación el cuerpo va de A a B y el trabajo se va sumando. Cambia las componentes de F o el punto B y comprueba el signo del resultado.

=== 1.2 | Ejercicios 3 | Trabajo de F = 30i − 20j de A(−6, 2) a B(4, 10)
pide: W de F = 30i − 20j de A(−6, 2) a B(4, 10)
indice: W = 140 J
widget: vectores {"Fx": 30, "Fy": -20, "Ax": -6, "Ay": 2, "Bx": 4, "By": 10}
--- enunciado
Calcula el trabajo realizado por la fuerza **F = 30i − 20j (N)** cuando su punto de aplicación se desplaza desde el punto A(−6, 2) al B(4, 10) m.
--- resultado
W = 140 J.
--- solucion
Datos: F⃗ = 30i − 20j N · A(−6, 2) m · B(4, 10) m.

**Qué herramienta usar.** Igual que en 1.1: vectores, así que producto escalar.

**Paso 1. Desplazamiento**

**Δr⃗ = [4 − (−6)] i + (10 − 2) j = 10i + 8j m**

> **¿Por qué?** Final menos inicial en cada componente; 4 − (−6) = 10.

**Paso 2. Producto escalar**

**W = 30 · 10 + (−20) · 8 = 300 − 160 = 140 J**

> **¿Por qué?** La componente x de la fuerza (30 N, hacia la derecha) ayuda, porque el cuerpo se mueve hacia la derecha: aporta +300 J. La componente y (−20 N, hacia abajo) se opone, porque el cuerpo sube: resta 160 J. El trabajo total es la suma.

**Comprobación.** |F| = √(30² + 20²) = 36,1 N; |Δr| = √(10² + 8²) = 12,8 m; cos φ = 140 / (36,1 · 12,8) = 0,303 ⟹ φ = 72,3° < 90°, trabajo positivo. Cuadra.
--- simulacion
Mira en la simulación cómo la parte x de la fuerza trabaja a favor (+300 J) y la parte y en contra (−160 J). Activa el camino curvo: el trabajo final es el mismo.

=== 1.3 | Repaso 2 | Trabajo de F = −5i + 9j de A(−5, 3) a B(−3, −8)
pide: W de F = −5i + 9j de A(−5, 3) a B(−3, −8)
indice: W = −109 J
widget: vectores {"Fx": -5, "Fy": 9, "Ax": -5, "Ay": 3, "Bx": -3, "By": -8}
--- enunciado
Calcula el trabajo realizado por la fuerza **F = −5i + 9j N** cuando su punto de aplicación se desplaza desde el punto A(−5, 3) al B(−3, −8) m.
--- resultado
W = −109 J (la fuerza se opone al desplazamiento).
--- solucion
Datos: F⃗ = −5i + 9j N · A(−5, 3) m · B(−3, −8) m.

[[diagrama:w13_vectores|Repaso 2 · F y Δr desde el mismo punto]]

Al dibujar los dos vectores desde el mismo punto se ve que forman 161°: la fuerza va casi en contra del movimiento.

**Qué herramienta usar.** Producto escalar, como en 1.1.

**Paso 1. Desplazamiento**

**Δr⃗ = [−3 − (−5)] i + (−8 − 3) j = 2i − 11j m**

> **¿Por qué?** Final menos inicial: −3 + 5 = 2 en x y −8 − 3 = −11 en y. El cuerpo se mueve un poco a la derecha y mucho hacia abajo.

**Paso 2. Producto escalar**

**W = (−5) · 2 + 9 · (−11) = −10 − 99 = −109 J**

> **¿Por qué sale negativo?** Las dos componentes de la fuerza van en contra del movimiento: Fx = −5 N apunta a la izquierda y el cuerpo va a la derecha; Fy = +9 N apunta hacia arriba y el cuerpo baja. Una fuerza que se opone al desplazamiento quita energía al cuerpo: trabajo negativo.

**Comprobación.** |F| = √(5² + 9²) = 10,3 N; |Δr| = √(2² + 11²) = 11,2 m; cos φ = −109 / (10,3 · 11,2) = −0,947 ⟹ φ = 161°. Está entre 90° y 180°, así que el trabajo es negativo. Cuadra.
--- simulacion
Aquí el ángulo entre F y el desplazamiento es mayor de 90°: el trabajo acumulado va siendo cada vez más negativo.

=== 1.4 | Teoría 3 | Subir 50 kg a 18 m con una polea a velocidad constante
pide: Subir 50 kg a 18 m con una polea
indice: W hombre = 8 820 J; W peso = −8 820 J
widget: potencia {"m": 50, "n": 1, "h": 18, "t": 20, "eta": 1, "cuerpo": "carga", "controles": ["m", "h", "t"]}
--- enunciado
Calcula el trabajo realizado por un hombre que levanta mediante una polea y con velocidad constante una carga de 50 kg hasta una altura de 18 m. ¿Qué trabajo realiza la fuerza peso?
--- resultado
el hombre hace W = 8 820 J y el peso hace W = −8 820 J (con g = 10 m/s² saldrían 9 000 J y −9 000 J).
--- solucion
Datos: m = 50 kg · h = 18 m · velocidad constante · g = 9,8 m/s² (el enunciado no la da).

[[diagrama:w14_polea|Teoría 3 · fuerzas sobre la carga de la polea]]

Sobre la carga, la tensión (hacia arriba) y el peso (hacia abajo) son iguales porque sube a velocidad constante.

**Qué herramienta usar.** «Velocidad constante» es la pista: la aceleración es cero, así que por la segunda ley de Newton las fuerzas se compensan. Primero dinámica para saber cuánto vale la fuerza del hombre; después W = F·Δs·cos φ para cada fuerza.

**Paso 1. Fuerza que hace el hombre**

**ΣF = m·a = 0 ⟹ T − m·g = 0 ⟹ T = m·g = 50 · 9,8 = 490 N**

> **¿Por qué?** Sobre la carga actúan la tensión de la cuerda T (hacia arriba) y el peso m·g (hacia abajo). Si no acelera, son iguales. Una polea fija solo cambia la dirección de la cuerda: el hombre tira con 490 N y su mano recorre los mismos 18 m.

**Paso 2. Trabajo del hombre**

**W hombre = T · h · cos 0° = 490 · 18 · 1 = 8 820 J**

> **¿Por qué cos 0°?** La tensión apunta hacia arriba y la carga sube: fuerza y desplazamiento en el mismo sentido.

**Paso 3. Trabajo del peso**

**W peso = m·g · h · cos 180° = 490 · 18 · (−1) = −8 820 J**

> **¿Por qué cos 180°?** El peso apunta hacia abajo y la carga sube: sentidos opuestos, trabajo negativo.

**Comprobación.** El trabajo total es 8 820 − 8 820 = 0 J, y debe serlo: la velocidad no cambia, así que ΔEc = 0 (teorema de las fuerzas vivas, categoría 3). Además, la energía potencial de la carga aumenta ΔEp = m·g·h = +8 820 J, justo lo contrario del trabajo del peso: **W peso = −ΔEp**. La energía que pone el hombre queda guardada como energía potencial.
--- simulacion
El enunciado no da el tiempo: en la simulación son 20 s. Cámbialo y verás que el trabajo no cambia; solo la potencia.

=== 1.5 | Nuevo | Trabajo de F = 4i + 3j de A(1, −2) a B(−3, 5)
pide: W de F = 4i + 3j de A(1, −2) a B(−3, 5) y ángulo entre F y Δr
indice: W = 5 J; φ = 82,9°
widget: vectores {"Fx": 4, "Fy": 3, "Ax": 1, "Ay": -2, "Bx": -3, "By": 5}
--- enunciado
Una fuerza constante **F = 4i + 3j N** actúa sobre un cuerpo que se desplaza desde el punto A(1, −2) m hasta el punto B(−3, 5) m. Calcula: a) el trabajo que realiza la fuerza; b) el ángulo que forman la fuerza y el desplazamiento.
--- resultado
a) W = 5 J · b) φ = 82,9°.
--- solucion
Datos: F = 4i + 3j N · A(1, −2) m · B(−3, 5) m.

**Qué herramienta usar.** La fuerza y las posiciones vienen dadas con vectores: el trabajo es el producto escalar W = F⃗ · Δr⃗. Después, el ángulo sale de la otra forma del producto escalar, W = |F|·|Δr|·cos φ.

**a) Trabajo**

**Δr⃗ = r⃗_B − r⃗_A = (−3 − 1)·i + (5 − (−2))·j = −4i + 7j m**

> **¿Por qué se resta así?** El desplazamiento es «dónde acaba menos dónde empieza», componente a componente. Cuidado con el doble signo menos de la componente y: 5 − (−2) = 7.

**W = Fx·Δx + Fy·Δy = 4·(−4) + 3·7 = −16 + 21 = 5 J**

> **¿Por qué se multiplican las componentes y se suman?** Es la definición del producto escalar: i·i = j·j = 1 e i·j = 0. El resultado es un número (un trabajo), sin i ni j.

**b) Ángulo entre F y Δr**

**|F| = √(4² + 3²) = 5 N ; |Δr| = √((−4)² + 7²) = √65 = 8,06 m**

**cos φ = W / (|F|·|Δr|) = 5 / (5 · 8,06) = 0,124 ⟹ φ = 82,9°**

> **¿Por qué así?** Las dos formas del producto escalar dan el mismo número: Fx·Δx + Fy·Δy = |F|·|Δr|·cos φ. Conocido W, se despeja cos φ.

**Sentido físico.** El ángulo es casi 90°: la fuerza es casi perpendicular al desplazamiento, por eso el trabajo es pequeño (5 J) aunque la fuerza y el desplazamiento no lo sean. Al ser φ < 90°, el trabajo es positivo: F ayuda un poco al movimiento.

**Comprobación.** Componente a componente: la parte x de la fuerza trabaja en contra (−16 J, porque Fx > 0 y el cuerpo va hacia x negativas) y la parte y a favor (+21 J). La suma, 5 J, coincide con |F|·|Δr|·cos φ = 5 · 8,06 · 0,124 = 5,0 J.
--- simulacion
En la simulación se ve el cuerpo ir de A a B con la fuerza siempre igual. Mira cómo el trabajo acumulado primero se queda casi quieto: la fuerza es casi perpendicular al camino. Activa «camino curvo»: el trabajo final sigue siendo 5 J.

=== 1.6 | Nuevo | Subir una caja de 20 kg a 1,2 m por una rampa de 3 m
pide: Subir 20 kg a 1,2 m por una rampa lisa de 3 m o en vertical
indice: F = 78,4 N; W = 235 J (igual que en vertical); W peso = −235 J
widget: plano {"escenario": "empuje", "m": 20, "alpha": 23.58, "mu": 0, "d": 3, "v": 0.5, "sentido": "sube", "controles": ["m", "alpha", "d"]}
--- enunciado
Para subir una caja de 20 kg a la plataforma de un camión, que está a 1,2 m del suelo, se empuja por una rampa de 3 m de largo, con velocidad constante y sin rozamiento. Calcula: a) la fuerza paralela a la rampa que hay que hacer y su trabajo; b) el trabajo del peso; c) la fuerza y el trabajo si la caja se subiera en vertical, también con velocidad constante. ¿Qué ventaja tiene la rampa?
--- resultado
a) F = 78,4 N y W F = 235 J · b) W peso = −235 J · c) en vertical F = 196 N y W = 235 J: el mismo trabajo con menos fuerza.
--- solucion
Datos: m = 20 kg · h = 1,2 m · d = 3 m sobre la rampa · sin rozamiento · v constante · g = 9,8 m/s².

**Qué herramienta usar.** Velocidad constante significa aceleración cero: la fuerza sale de **ΣF = 0** (dinámica). El trabajo de cada fuerza, de W = F·d·cos φ.

**a) Fuerza y trabajo por la rampa**

**sen α = h / d = 1,2 / 3 = 0,4 ⟹ α = 23,6°**

> **¿Por qué el seno?** La rampa es la hipotenusa del triángulo y la altura el cateto opuesto a α.

**ΣF (a lo largo de la rampa) = F − m·g·sen α = 0 ⟹ F = m·g·sen α = 20 · 9,8 · 0,4 = 78,4 N**

> **¿Por qué solo Px?** Sin rozamiento, a lo largo de la rampa solo hay dos fuerzas: la que hacemos (hacia arriba) y la componente del peso Px = m·g·sen α (hacia abajo). La normal es perpendicular a la rampa y no entra en este eje.

**W F = F · d · cos 0° = 78,4 · 3 = 235 J**

**b) Trabajo del peso**

**W P = −m·g·h = −20 · 9,8 · 1,2 = −235 J**

> **¿Por qué negativo?** El peso apunta hacia abajo y la caja sube: el peso se opone al movimiento. Para el peso basta la altura: W P = −ΔEp, sin importar el camino.

La normal no trabaja (es perpendicular a la rampa). El trabajo total es 235 − 235 = 0 J, de acuerdo con ΔEc = 0 (velocidad constante).

**c) En vertical**

**F = m·g = 196 N ; W = F·h = 196 · 1,2 = 235 J**

**Conclusión.** Por la rampa hace falta 2,5 veces menos fuerza (78,4 N frente a 196 N), pero hay que empujar a lo largo de una distancia 2,5 veces mayor (3 m frente a 1,2 m): **el trabajo es el mismo**, 235 J, porque en los dos casos la caja gana la misma energía potencial, m·g·h. Esa es la ventaja de una rampa (una máquina simple): reduce la fuerza, no el trabajo.
--- simulacion
Prueba a cambiar el ángulo de la rampa en la simulación (manteniendo la altura con la distancia): la fuerza cambia, pero el trabajo de F siempre acaba siendo la energía potencial ganada, m·g·h.

=== 1.7 | Nuevo | Trabajo nulo y trabajo negativo con F = 6i + 2j
pide: F = 6i + 2j: W de A(2, 1) a B(5, −8) y de A a C(−1, 3)
indice: W AB = 0 J (φ = 90°); W AC = −14 J (φ = 128°)
widget: vectores {"Fx": 6, "Fy": 2, "Ax": 2, "Ay": 1, "Bx": 5, "By": -8, "controles": ["Fx", "Fy", "Bx", "By"], "ejemplos": [{"nombre": "a) De A a B", "valores": {"Bx": 5, "By": -8}}, {"nombre": "b) De A a C", "valores": {"Bx": -1, "By": 3}}]}
--- enunciado
Sobre un cuerpo actúa una fuerza constante **F = 6i + 2j N**. Calcula el trabajo que realiza: a) cuando el cuerpo va del punto A(2, 1) m al B(5, −8) m; b) cuando va de A al punto C(−1, 3) m. c) Interpreta el signo de cada resultado y calcula el ángulo entre F y el desplazamiento en cada caso.
--- resultado
a) W = 0 J (F es perpendicular al desplazamiento, φ = 90°) · b) W = −14 J (φ = 128°: F se opone al movimiento).
--- solucion
Datos: F = 6i + 2j N · A(2, 1) · B(5, −8) · C(−1, 3), en metros.

**Qué herramienta usar.** Producto escalar W = Fx·Δx + Fy·Δy para el trabajo, y cos φ = W / (|F|·|Δr|) para el ángulo.

**a) De A a B**

**Δr⃗ = (5 − 2)·i + (−8 − 1)·j = 3i − 9j m**

**W = 6·3 + 2·(−9) = 18 − 18 = 0 J**

> **¿Por qué sale cero si hay fuerza y desplazamiento?** Porque son perpendiculares: cos 90° = 0. Las dos contribuciones se compensan exactamente. La fuerza no ayuda ni frena; si fuera la única fuerza, no cambiaría la rapidez del cuerpo.

Comprobación del ángulo: **cos φ = 0 / (|F|·|Δr|) = 0 ⟹ φ = 90°**.

**b) De A a C**

**Δr⃗ = (−1 − 2)·i + (3 − 1)·j = −3i + 2j m**

**W = 6·(−3) + 2·2 = −18 + 4 = −14 J**

**|F| = √(36 + 4) = 6,32 N ; |Δr| = √(9 + 4) = 3,61 m**

**cos φ = −14 / (6,32 · 3,61) = −0,614 ⟹ φ = 128°**

> **¿Por qué negativo?** φ > 90°: la fuerza apunta, en parte, en contra del desplazamiento (el cuerpo va hacia x negativas y la fuerza empuja hacia x positivas). Un trabajo negativo quita energía al cuerpo.

**c) Resumen del signo**

| Ángulo φ | cos φ | Trabajo | Qué hace la fuerza |
| --- | --- | --- | --- |
| Menor que 90° | Positivo | W > 0 | Ayuda al movimiento |
| 90° | 0 | W = 0 | Ni ayuda ni frena |
| Mayor que 90° | Negativo | W < 0 | Se opone al movimiento |

**Comprobación.** Con la otra forma del producto escalar: |F|·|Δr|·cos φ = 6,32 · 3,61 · (−0,614) = −14,0 J. Coincide.
--- simulacion
Usa los dos botones para ver los dos desplazamientos. En el de A a B el trabajo acumulado se queda en cero todo el camino: fuerza y desplazamiento forman 90°.
