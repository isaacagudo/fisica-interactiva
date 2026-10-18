---
slug: cuestiones
titulo: Cuestiones de teoría
nombre: Cuestiones de teoría
corto: Cuestiones
eyebrow: Categoría 8
desc: Respuestas razonadas, cada una con su fórmula y un ejemplo.
resueltos: 8.2, 8.4
---
## Cómo responder una cuestión de teoría

En las cuestiones no hay números, pero se corrigen igual de estrictas: una respuesta sin razón física vale poco. Un esquema que funciona siempre:

1. **Respuesta corta:** sí o no, verdadero o falso.
2. **Razón física con su fórmula:** la ley o la definición que lo justifica (por ejemplo, Ec = ½·m·v² o W = F·Δs·cos φ).
3. **Un ejemplo o un contraejemplo concreto:** para «sí puede», un caso donde ocurre; para «es falso», un caso que lo contradice.

Las respuestas de abajo siguen ese esquema y enlazan con los ejercicios de las otras categorías.

=== 8.1 | Teoría 4 | Ejemplos de sistemas que tienen energía
--- enunciado
Poned distintos ejemplos de sistemas (objetos o conjuntos de objetos) que tengan energía y explicad a qué es debido que la tengan.
--- solucion
Según los apuntes, en el fondo solo hay dos formas de energía: cinética (por moverse) y potencial (por la posición de las partes del sistema y las fuerzas entre ellas).

| Sistema | Por qué tiene energía | Tipo |
| --- | --- | --- |
| Un coche en marcha, el viento, un río | Se mueven | Cinética |
| El agua de un embalse y la Tierra | El agua está alta y la Tierra la atrae | Potencial gravitatoria |
| Un muelle comprimido, un arco tensado | Están deformados; las fuerzas elásticas los devuelven a su forma | Potencial elástica |
| Dos cargas del mismo signo cerca | Se repelen y, al separarse, ganarían velocidad | Potencial eléctrica |
| La gasolina, los alimentos, una pila | Las fuerzas eléctricas entre átomos y moléculas de sus enlaces | Potencial (química) |
| Un objeto caliente | Sus partículas se mueven más deprisa | Cinética de las partículas (térmica) |

=== 8.2 | Cuestiones 1 | ¿Pueden ser negativas Ec, Ep y E M?
--- enunciado
¿Puede ser negativa la energía cinética de un cuerpo? ¿Por qué? ¿Y la energía potencial? ¿Por qué? ¿Y la energía mecánica? ¿Por qué?
--- solucion
- **Energía cinética: nunca.** Ec = ½·m·v², con m > 0 y v² ≥ 0. Como mucho vale 0 (cuerpo en reposo).
- **Energía potencial: sí.** Ep = m·g·h depende de dónde se ponga h = 0, que se elige libremente. Un cuerpo por debajo de ese nivel (una piedra en el fondo de un pozo, con h = 0 en el suelo) tiene h < 0 y Ep < 0. No pasa nada: en los ejercicios solo importan las diferencias de Ep.
- **Energía mecánica: sí.** E M = Ec + Ep es negativa si la Ep es negativa y mayor en valor absoluto que la Ec (la piedra del pozo moviéndose despacio).

=== 8.3 | Cuestiones 2 | «¿Sólo las fuerzas conservativas realizan trabajo?»
--- enunciado
Decid si es cierta la siguiente afirmación y por qué: «sólo las fuerzas conservativas realizan trabajo».
--- solucion
**Falso.** Las fuerzas no conservativas también trabajan: el rozamiento hace trabajo negativo (ejercicios 2.1 y 6.1) y una persona o un motor hacen trabajo positivo (ejercicios 1.4 y 6.7). Lo que distingue a las conservativas no es que trabajen, sino cómo: su trabajo no depende del camino, se puede recuperar y vale W = −ΔEp. El trabajo del rozamiento depende del camino y no se recupera: se pierde como calor.

=== 8.4 | Cuestiones 3 | Trabajo nulo y trabajo del rozamiento
--- enunciado
a) ¿Puede un cuerpo desplazarse y realizar un trabajo nulo? ¿Por qué? b) Explica por qué el trabajo que hace la fuerza de rozamiento es siempre negativo.
--- solucion
**a) Sí, un cuerpo puede desplazarse y que una fuerza haga trabajo nulo.** W = F·Δs·cos φ vale cero si φ = 90°: la fuerza es perpendicular al desplazamiento. Ejemplos: el peso y la normal cuando un cuerpo se mueve en horizontal (ejercicio 2.3, apartado d); la fuerza que haces para sostener una mochila mientras caminas en llano. También puede ser nulo el trabajo **total** con fuerzas que sí trabajan, si sus trabajos se compensan (velocidad constante, ejercicio 6.7).

**b) El rozamiento siempre hace trabajo negativo** porque el rozamiento de deslizamiento va siempre en sentido contrario al movimiento sobre la superficie: φ = 180°, cos 180° = −1, W = −Fr·d < 0. Por eso siempre quita energía mecánica y la convierte en calor, tanto al subir como al bajar (ejercicio 6.5).

> Para curiosos: el rozamiento estático sí puede hacer trabajo positivo. Es el que arrastra una caja colocada en la plataforma de un camión que acelera. En los ejercicios de este tema, el rozamiento es siempre de deslizamiento sobre un suelo quieto.

=== 8.5 | Cuestiones 4 | Una fuerza que no cambia la energía cinética
--- enunciado
¿De qué forma puede conseguirse que sobre un cuerpo en movimiento actúe una fuerza sin que se modifique su energía cinética?
--- solucion
Si la fuerza es **perpendicular a la velocidad en todo momento**, su trabajo es cero y, por el teorema de las fuerzas vivas, la Ec no cambia: cambia la dirección de la velocidad, pero no su módulo. Es lo que pasa en un **movimiento circular uniforme**: la cuerda de una honda, la gravedad sobre un satélite en órbita circular o la fuerza magnética sobre una carga.

[[diagrama:w8_circular|Cuestiones 4 · fuerza perpendicular a la velocidad]]

En cada punto la fuerza apunta al centro y la velocidad es tangente: forman 90°.

Otra forma: que actúen otras fuerzas que compensen su trabajo, de modo que el trabajo total sea cero (empujar una caja a velocidad constante contra el rozamiento).

=== 8.6 | Cuestiones 5 | Principio de conservación de la energía mecánica
--- enunciado
Principio de conservación de la energía mecánica. Decid claramente en qué condiciones se cumple este principio.
--- solucion
**Enunciado:** si sobre un sistema solo realizan trabajo fuerzas conservativas (peso, fuerzas elásticas, fuerzas eléctricas), su energía mecánica permanece constante: **Ec₀ + Ep₀ = Ec + Ep**.

**Condiciones:** que no haya rozamiento ni resistencia del aire, y que ninguna fuerza exterior (persona, motor, cuerda que tira) haga trabajo. Las fuerzas que no trabajan no estropean la conservación: la normal sobre un plano sin rozamiento (ejercicio 4.1) o la tensión de un péndulo.

=== 8.7 | Repaso 1 | Enunciado, demostración y relación con Ep
--- enunciado
a) Enuncia y demuestra el principio de conservación de la energía mecánica. b) ¿Qué relación existe entre el trabajo realizado por una fuerza conservativa y la energía potencial?
--- solucion
**a) Enunciado:** el de la cuestión 5.

**Demostración** en tres pasos:

1. Teorema de las fuerzas vivas: el trabajo de todas las fuerzas es **W total = ΔEc** (categoría 3).
2. Si solo trabajan fuerzas conservativas, W total = W conservativas, y para ellas **W cons = −ΔEp**.
3. Igualando: −ΔEp = ΔEc ⟹ ΔEc + ΔEp = 0 ⟹ Δ(Ec + Ep) = 0 ⟹ **Ec₀ + Ep₀ = Ec + Ep**. La energía mecánica no cambia.

**b) Relación entre trabajo conservativo y energía potencial:** **W cons = −ΔEp = Ep inicial − Ep final**. El trabajo de una fuerza conservativa es igual a la disminución de la energía potencial. Al caer un cuerpo, el peso hace trabajo positivo y la Ep disminuye; al subirlo, el peso hace trabajo negativo y la Ep aumenta (ejercicio 1.4).

=== 8.8 | Nuevo | ¿Puede ser negativo el trabajo total?
--- enunciado
¿Puede ser negativo el trabajo total realizado sobre un cuerpo? En ese caso, ¿qué le ocurre a su velocidad? Pon un ejemplo.
--- solucion
**Sí.** Por el teorema de las fuerzas vivas, **W total = ΔEc = ½·m·v² − ½·m·v₀²**. Si el trabajo total es negativo, la energía cinética final es menor que la inicial: **la rapidez del cuerpo disminuye**.

Ocurre siempre que las fuerzas que se oponen al movimiento trabajan más que las que lo favorecen. Ejemplos:

- Un coche que frena: el trabajo de la fuerza de frenado es negativo y el coche pierde velocidad (ejercicio 3.1: W = −4,38·10⁵ J al pasar de 108 a 18 km/h).
- Un bloque que sube por un plano: el peso y el rozamiento hacen trabajo negativo y el bloque se va frenando hasta pararse (ejercicio 6.2).

Lo que no puede ocurrir es que la energía cinética sea negativa: el trabajo total negativo, como mucho, deja el cuerpo parado (Ec = 0).

=== 8.9 | Nuevo | Dos bloques de masas m y 2m frenados por el rozamiento
widget: bloque {"escenario": "deslizar", "m": 2, "v0": 6, "mu": 0.3, "controles": ["m", "v0", "mu"], "ejemplos": [{"nombre": "m = 2 kg", "valores": {"m": 2}}, {"nombre": "2m = 4 kg", "valores": {"m": 4}}]}
--- enunciado
Dos bloques de masas m y 2m se lanzan con la misma velocidad sobre el mismo suelo horizontal, con el mismo coeficiente de rozamiento. ¿Cuál recorre más distancia hasta pararse? ¿Cuál pierde más energía? Razónalo.
--- solucion
**Recorren la misma distancia; el de masa 2m pierde el doble de energía.**

Teorema de las fuerzas vivas para un bloque de masa m que se para por el rozamiento:

**−μ·m·g·d = 0 − ½·m·v₀² ⟹ d = v₀² / (2·μ·g)**

La masa se simplifica: **d no depende de m**. El bloque más pesado tiene el doble de energía cinética, pero también el doble de rozamiento (Fr = μ·m·g), así que se frena con la misma aceleración, a = μ·g.

La energía que pierde cada uno (que se convierte en calor) es su energía cinética inicial, **½·m·v₀²**: el bloque de masa 2m pierde el doble.

Ejemplo: con v₀ = 6 m/s y μ = 0,3, los dos recorren 36 / (2 · 0,3 · 9,8) = 6,12 m. Con m = 2 kg se disipan 36 J y con m = 4 kg, 72 J (ejercicio 3.7 con un esquiador).
--- simulacion
Pulsa los dos botones: la distancia de frenado es la misma, pero la barra de calor del bloque de 4 kg llega al doble.

=== 8.10 | Nuevo | Subir una maleta por la escalera o en ascensor
widget: potencia {"m": 15, "n": 1, "h": 9, "t": 60, "eta": 1, "cuerpo": "carga", "controles": ["m", "h", "t"], "ejemplos": [{"nombre": "Por la escalera (60 s)", "valores": {"t": 60}}, {"nombre": "En ascensor (20 s)", "valores": {"t": 20}}]}
--- enunciado
Una persona sube una maleta de 15 kg por la escalera hasta un tercer piso, a 9 m de altura, y tarda 1 minuto. Otra persona sube una maleta igual en el ascensor y tarda 20 s. ¿Se hace el mismo trabajo contra el peso en los dos casos? ¿Se desarrolla la misma potencia? Razónalo con números.
--- solucion
**El mismo trabajo, distinta potencia.**

El trabajo contra el peso, a velocidad constante, es la energía potencial que gana la maleta:

**W = m·g·h = 15 · 9,8 · 9 = 1 323 J** en los dos casos.

> **¿Por qué no depende del camino?** El peso es una fuerza conservativa: su trabajo solo depende de la altura inicial y final (W P = −ΔEp), no de si la maleta sube por una escalera o en vertical.

La potencia es el trabajo por unidad de tiempo, así que sí cambia:

**P escalera = 1 323 / 60 = 22,1 W ; P ascensor = 1 323 / 20 = 66,2 W**

El ascensor desarrolla el triple de potencia porque hace el mismo trabajo en la tercera parte del tiempo. (Además, la persona de la escalera gasta mucha más energía de la que gana la maleta: tiene que subir también su propio cuerpo, y el cuerpo humano tiene un rendimiento bajo.)
--- simulacion
Compara los dos casos con los botones: la energía útil final es la misma y la potencia, el triple en el ascensor.
