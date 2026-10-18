---
slug: potencia-y-rendimiento
titulo: Potencia, rendimiento y consumo
nombre: Potencia, rendimiento y consumo
corto: Potencia
eyebrow: Apartado 7
desc: Vatios, caballos, kWh, euros y rendimiento.
resueltos: 7.2, 7.4
icono: potencia
---
## Idea clave: potencia es trabajo por segundo; rendimiento, la parte que se aprovecha

**Potencia: P = W / Δt** (vatios: 1 W = 1 J/s)

> **¿Por qué?** Dos máquinas pueden hacer el mismo trabajo, pero la más potente lo hace en menos tiempo. La potencia mide la rapidez con que se transfiere la energía.

**Con velocidad constante: P = F·v**

> **¿Por qué?** P = F·Δs / Δt, y Δs / Δt es la velocidad. Sirve para comprobar (Teoría 19).

**Unidades que salen en los ejercicios**

| Unidad | Qué mide | Equivalencia |
| --- | --- | --- |
| kW (kilovatio) | Potencia | 1 kW = 1000 W |
| CV (caballo de vapor) | Potencia | 1 CV = 736 W |
| kWh (kilovatio hora) | **Energía**, no potencia | 1 kWh = 1000 W · 3600 s = 3,6·10⁶ J |
| MJ (megajulio) | Energía | 1 MJ = 10⁶ J |

**Rendimiento: η = P útil / P total = E útil / E total** (entre 0 y 1; en % se multiplica por 100)

> **¿Por qué nunca llega al 100 %?** Parte de la energía que consume una máquina se pierde (calor por rozamiento, ruido, calentamiento de los cables). La útil es la que hace lo que queremos: subir la carga, calentar el agua.

[[diagrama:w7_flujo|Teoría 19 · dónde va la energía del motor]]

Lo que consume el motor se reparte entre la parte útil y las pérdidas; el rendimiento es la fracción útil.

**Calentar agua** (Cuestiones 11 y 12): la energía útil es el calor que absorbe el agua, **Q = m·c·ΔT**, con c = 4180 J/(kg·K) y ΔT la subida de temperatura (en °C o en K da lo mismo, porque es una diferencia).

**Método**

1. Identificar qué es lo útil (subir algo: m·g·h; calentar: m·c·ΔT) y qué es lo total (lo que consume el aparato: P·t).
2. Tiempos en segundos para julios y vatios; en horas para kWh.
3. Rendimiento: útil = η · total. Si te sale η > 1, has dividido al revés.
4. Coste: energía consumida en kWh × precio del kWh.

## Simuladores

La potencia es la rapidez con que se hace el trabajo: sube la misma carga en menos tiempo y mira cómo crece. Con rendimiento menor que 100 %, el motor consume más energía de la que gana la carga.

[[simulador:potencia|{"modo": "completo", "titulo": "Simulador: subir cargas con un motor", "m": 450, "n": 1, "h": 12, "t": 30, "eta": 0.6, "cuerpo": "carga", "controles": ["m", "h", "t", "eta"], "ejemplos": [{"nombre": "Teoría 19", "valores": {"m": 450, "n": 1, "h": 12, "t": 30, "eta": 0.6, "cuerpo": "carga", "incognita": "P"}}, {"nombre": "Teoría 16", "valores": {"m": 80, "n": 15, "h": 1, "t": 1800, "eta": 1, "cuerpo": "sacos", "incognita": "P"}}, {"nombre": "Teoría 18", "valores": {"h": 12, "t": 1200, "eta": 0.78, "cuerpo": "agua", "incognita": "m", "Pcv": 2}}]}]]

El contador marca los kWh consumidos y lo que cuestan. Al calentar agua, solo una parte de la energía llega al agua: el rendimiento.

[[simulador:calentador|{"modo": "completo", "selector": true, "titulo": "Simulador: consumo eléctrico y rendimiento", "escenario": "agua", "P": 1500, "m": 50, "T0": 20, "Tf": 80, "t": 10800, "eta": 0.8, "precio": 0.08, "incognita": "eta", "controles": ["P", "m", "Tf", "t", "precio"], "ejemplos": [{"nombre": "Teoría 17", "valores": {"escenario": "estufa", "P": 2000, "horas": 8, "precio": 0.09}}, {"nombre": "Cuestiones 11", "valores": {"escenario": "agua", "m": 2.5, "T0": 12, "Tf": 80, "t": 900, "eta": 0.85, "precio": 0.08, "incognita": "P", "controles": ["m", "Tf", "t", "eta"]}}, {"nombre": "Cuestiones 12", "valores": {"escenario": "agua", "P": 1500, "m": 50, "T0": 20, "Tf": 80, "t": 10800, "precio": 0.08, "incognita": "eta", "controles": ["P", "m", "Tf", "t"]}}]}]]

=== 7.1 | Teoría 16 | Cargar 15 sacos de 80 kg en media hora
pide: 15 sacos de 80 kg a 1 m en media hora
indice: P = 6,53 W
widget: potencia {"m": 80, "n": 15, "h": 1, "t": 1800, "eta": 1, "cuerpo": "sacos", "controles": ["m", "n", "h", "t"]}
--- enunciado
Un hombre tarda media hora en cargar un camión, elevando hasta una altura de un metro 15 sacos de 80 kg cada uno. Calcula la potencia desarrollada.
--- resultado
P = 6,53 W (6,67 W con g = 10 m/s²).
--- solucion
Datos: 15 sacos · 80 kg cada uno · h = 1 m · Δt = 30 min = 1 800 s · g = 9,8 m/s².

**Qué herramienta usar.** Potencia = trabajo / tiempo. El trabajo para subir cada saco a velocidad constante es m·g·h (ejercicio 1.4).

**Paso 1. Trabajo total**

**W = 15 · m·g·h = 15 · 80 · 9,8 · 1 = 11 760 J**

> **¿Por qué m·g·h?** Para subir un saco sin acelerarlo, el hombre hace una fuerza igual a su peso a lo largo de 1 m. Ese trabajo queda guardado como energía potencial de los sacos.

**Paso 2. Potencia**

**P = W / Δt = 11 760 / 1 800 = 6,53 W**

> **¿Por qué 1 800 s?** El vatio es julio por segundo: media hora son 30 · 60 = 1 800 s.

**Sentido físico.** Parece muy poco (una bombilla LED gasta unos 10 W), pero es la potencia media en media hora, contando las pausas entre saco y saco. Mientras levanta cada saco, el hombre desarrolla mucha más potencia durante uno o dos segundos. Además el cuerpo humano tiene un rendimiento bajo: consume bastante más energía de la que convierte en trabajo.
--- simulacion
La simulación va acelerada: los 15 sacos se cargan en media hora. La potencia es pequeña (6,53 W) porque el trabajo se reparte en mucho tiempo.

=== 7.2 | Teoría 17 | Estufa de 2000 W durante 8 horas
pide: Estufa de 2000 W durante 8 h
indice: 16 kWh = 57,6 MJ; 1,44 €
widget: calentador {"escenario": "estufa", "P": 2000, "horas": 8, "precio": 0.09}
--- enunciado
Calcula los kWh que consume en 8 h una estufa cuya potencia es de 2000 W. Expresa el resultado en MJ. ¿Cuánto costará mantenerla las 8 h si el kWh está a 0,09 €?
--- resultado
16 kWh = 57,6 MJ · coste 1,44 €.
--- solucion
Datos: P = 2000 W = 2 kW · t = 8 h · precio 0,09 €/kWh.

**Qué herramienta usar.** Energía = potencia × tiempo (despejando de P = E / t). Si la potencia va en kW y el tiempo en h, la energía sale directamente en kWh, que es como se paga la luz.

**Paso 1. Energía en kWh**

**E = P·t = 2 kW · 8 h = 16 kWh**

**Paso 2. En megajulios**

**E = 16 kWh · 3,6 MJ/kWh = 57,6 MJ**

> **¿Por qué 3,6?** 1 kWh = 1000 W · 3600 s = 3 600 000 J = 3,6 MJ.

**Comprobación en el SI.** E = 2000 W · (8 · 3600 s) = 2000 · 28 800 = 57 600 000 J = 57,6 MJ. Coincide.

**Paso 3. Coste**

**Coste = 16 kWh · 0,09 €/kWh = 1,44 €**

> **¿Por qué en kWh?** El precio de la electricidad se da por kWh. Multiplicar julios por €/kWh daría un disparate.
--- simulacion
En la simulación el contador marca los kWh y el coste a medida que pasan las 8 horas.

=== 7.3 | Teoría 18 | Litros de agua que sube un motor de 2 CV con rendimiento del 78 %
pide: Motor de 2 CV, 12 m, 20 min, η = 78 %
indice: 1,17·10⁴ L
widget: potencia {"h": 12, "t": 1200, "eta": 0.78, "cuerpo": "agua", "incognita": "m", "Pcv": 2, "controles": ["Pcv", "h", "t", "eta"]}
--- enunciado
¿Cuántos litros de agua podrá elevar un motor de 2 CV hasta una altura de 12 m en 20 minutos, si el proceso tiene un rendimiento del 78 %?
--- resultado
unos 1,17·10⁴ L (11 716 L).
--- solucion
Datos: P total = 2 CV · h = 12 m · t = 20 min = 1 200 s · η = 78 % = 0,78 · g = 9,8 m/s² · 1 L de agua = 1 kg.

**Qué herramienta usar.** Rendimiento para pasar de la potencia del motor a la útil; después, la energía útil se convierte en energía potencial del agua (m·g·h).

**Paso 1. Potencia total y útil**

**P total = 2 · 736 = 1 472 W  P útil = η · P total = 0,78 · 1 472 = 1 148 W**

> **¿Por qué?** De cada 100 J que consume el motor, solo 78 J suben agua; el resto se pierde.

**Paso 2. Energía útil en 20 minutos**

**E útil = P útil · t = 1 148,16 · 1 200 = 1,378·10⁶ J**

**Paso 3. Masa de agua**

**E útil = m·g·h ⟹ m = E útil / (g·h) = 1 377 792 / (9,8 · 12) = 11 716 kg ⟹ 11 716 L**

> **¿Por qué m·g·h?** Subir agua a velocidad constante es darle energía potencial. Como 1 L de agua tiene 1 kg de masa, los kilos son litros.

**Comprobación.** Al revés: subir 11 716 kg a 12 m son 1,378·10⁶ J; en 1 200 s, 1 148 W útiles; dividido por 0,78, 1 472 W = 2 CV. Cuadra.
--- simulacion
En la simulación el depósito de arriba se llena con los litros que sube el motor en 20 minutos. Cambia el rendimiento y mira cuántos litros se pierden.

=== 7.4 | Teoría 19 | Motor de un montacargas con rendimiento del 60 %
pide: Montacargas de 450 kg, 12 m en 30 s, η = 60 %
indice: P = 2 940 W ≈ 4,0 CV
widget: potencia {"m": 450, "n": 1, "h": 12, "t": 30, "eta": 0.6, "cuerpo": "carga", "controles": ["m", "h", "t", "eta"]}
--- enunciado
Un montacargas de masa 450 kg tiene que subir hasta una altura de 12 m en 30 s. Calcula la potencia que debe tener el motor si se estima que el rendimiento de la instalación será del 60 %.
--- resultado
P motor = 2 940 W ≈ 4,0 CV.
--- solucion
Datos: m = 450 kg · h = 12 m · t = 30 s · η = 60 % = 0,6 · g = 9,8 m/s².

**Qué herramienta usar.** La potencia útil es la que sube el montacargas (m·g·h en 30 s); la del motor es mayor, porque solo aprovecha el 60 %.

**Paso 1. Potencia útil**

**P útil = m·g·h / t = 450 · 9,8 · 12 / 30 = 52 920 / 30 = 1 764 W**

**Paso 2. Potencia del motor**

**P total = P útil / η = 1 764 / 0,6 = 2 940 W = 2 940 / 736 CV ≈ 4,0 CV**

> **¿Por qué se divide?** P útil = η · P total, así que P total = P útil / η. La potencia del motor tiene que salir mayor que la útil; si sale menor, se ha multiplicado por error.

**Comprobación con P = F·v.** Si sube a velocidad constante, v = 12 / 30 = 0,4 m/s y la fuerza del cable es su peso, 450 · 9,8 = 4 410 N. P útil = F·v = 4 410 · 0,4 = 1 764 W. Coincide.

**Dónde va la energía.** De los 2 940 W, 1 764 W suben la carga y 1 176 W se pierden (calor en el motor, rozamientos de poleas y guías). Es el ejemplo del diagrama de la idea clave.
--- simulacion
La barra de la simulación separa la energía útil (azul) de la que se pierde (roja): con η = 60 %, 4 de cada 10 julios se pierden.

=== 7.5 | Cuestiones 11 | Hornillo que calienta 2,5 kg de agua en 15 minutos
pide: Hornillo: 2,5 kg de agua de 12 a 80 °C en 15 min
indice: P = 929 W; 0,02 €
widget: calentador {"escenario": "agua", "m": 2.5, "T0": 12, "Tf": 80, "t": 900, "eta": 0.85, "precio": 0.08, "incognita": "P", "controles": ["m", "Tf", "t", "eta"]}
--- enunciado
Calcula la potencia de un hornillo eléctrico que tarda 15 minutos en calentar 2,5 kg de agua desde 12 °C hasta 80 °C, si sabemos que solo se aprovecha el 85 % de la energía producida. ¿Cuánto cuesta calentar el agua si está a 0,08 € el kWh? Calor específico del agua: 4180 J/(kg·K).
--- resultado
P = 929 W · coste ≈ 0,019 € (unos 2 céntimos).
--- solucion
Datos: m = 2,5 kg de agua · de 12 °C a 80 °C (ΔT = 68 °C) · t = 15 min = 900 s · se aprovecha el 85 % (η = 0,85) · c = 4180 J/(kg·K) · 0,08 €/kWh. El «(1,5)» del enunciado es la puntuación.

**Qué herramienta usar.** La energía útil es el calor que absorbe el agua (Q = m·c·ΔT). Con el rendimiento se pasa a la energía que consume el hornillo, y con el tiempo, a su potencia.

**Paso 1. Energía útil (calor que absorbe el agua)**

**Q = m·c·ΔT = 2,5 · 4180 · 68 = 710 600 J**

> **¿Por qué ΔT = 68 y no 80?** Importa cuánto sube la temperatura: 80 − 12 = 68 °C. Una subida de 68 °C es también una subida de 68 K.

**Paso 2. Energía consumida**

**E total = Q / η = 710 600 / 0,85 = 836 000 J**

> **¿Por qué se divide?** Solo el 85 % de lo consumido llega al agua, así que el hornillo consume más de lo que recibe el agua.

**Paso 3. Potencia del hornillo**

**P = E total / t = 836 000 / 900 = 929 W**

**Paso 4. Coste**

**E = 836 000 / 3,6·10⁶ = 0,232 kWh ⟹ coste = 0,232 · 0,08 = 0,019 €**

> **¿Por qué se paga la energía consumida y no la útil?** El contador mide lo que gasta el aparato, incluida la parte que se pierde.
--- simulacion
En la simulación el termómetro sube de 12 a 80 °C en 15 minutos. Baja el rendimiento y mira cómo tiene que crecer la potencia.

=== 7.6 | Cuestiones 12 | Rendimiento de un calentador de 1500 W
pide: Calentador de 1500 W, 50 kg de 20 a 80 °C en 3 h
indice: η = 77,4 %; 0,36 €
widget: calentador {"escenario": "agua", "P": 1500, "m": 50, "T0": 20, "Tf": 80, "t": 10800, "eta": 0.8, "precio": 0.08, "incognita": "eta", "controles": ["P", "m", "Tf", "t"]}
--- enunciado
Calcula el rendimiento de un calentador eléctrico cuya potencia es 1500 W, si sabemos que tarda 3 h en calentar 50 kg de agua desde 20 °C hasta 80 °C (c agua = 4180 J/(kg·K)). ¿Cuánto costaría calentar los 50 kg si el kWh está a 0,08 €?
--- resultado
η = 77,4 % · coste 0,36 €.
--- solucion
Datos: P = 1500 W · t = 3 h = 10 800 s · m = 50 kg de agua · de 20 °C a 80 °C (ΔT = 60 °C) · c = 4180 J/(kg·K) · 0,08 €/kWh.

**Qué herramienta usar.** Es el ejercicio 7.5 al revés: ahora se conocen la energía consumida (P·t) y la útil (m·c·ΔT), y se pide el cociente.

**Paso 1. Energía útil**

**Q = m·c·ΔT = 50 · 4180 · 60 = 12 540 000 J = 12,54 MJ**

**Paso 2. Energía consumida**

**E total = P·t = 1500 · 10 800 = 16 200 000 J = 16,2 MJ**

> **¿Por qué 10 800 s?** Para que vatios por segundos dé julios: 3 h = 3 · 3600 s.

**Paso 3. Rendimiento**

**η = E útil / E total = 12,54 / 16,2 = 0,774 = 77,4 %**

> **¿Por qué tiene sentido?** Es menor que 1: el calentador consume más energía de la que recibe el agua. El 22,6 % restante se pierde calentando el depósito, las tuberías y el aire.

**Paso 4. Coste**

**E = 1,5 kW · 3 h = 4,5 kWh ⟹ coste = 4,5 · 0,08 = 0,36 €**

**Comprobación.** 16,2 MJ / 3,6 MJ/kWh = 4,5 kWh. Coincide con el cálculo directo en kW·h.
--- simulacion
Si en la simulación acortas el tiempo por debajo de 2 h 19 min, el rendimiento saldría mayor que el 100 %: es imposible.

=== 7.7 | Nuevo | Grúa que sube 800 kg de ladrillos a 15 m
pide: Grúa: 800 kg a 15 m en 40 s, motor de 4,5 kW
indice: P útil = 2 940 W; η = 65,3 %
widget: potencia {"m": 800, "n": 1, "h": 15, "t": 40, "eta": 0.6533, "cuerpo": "carga", "controles": ["m", "h", "t", "eta"]}
--- enunciado
Una grúa sube un palé de ladrillos de 800 kg hasta una altura de 15 m en 40 s, con velocidad constante. El motor de la grúa consume una potencia de 4,5 kW. Calcula: a) el trabajo útil realizado; b) la potencia útil; c) el rendimiento de la grúa; d) la energía que se pierde durante la subida.
--- resultado
a) W útil = 1,18·10⁵ J · b) P útil = 2 940 W · c) η = 65,3 % · d) se pierden 6,24·10⁴ J.
--- solucion
Datos: m = 800 kg · h = 15 m · t = 40 s · P consumida = 4,5 kW = 4 500 W · g = 9,8 m/s².

**Qué herramienta usar.** A velocidad constante la grúa tira con una fuerza igual al peso: su trabajo útil es la energía potencial que gana la carga. Después, P = W/t y η = P útil / P total.

**a) Trabajo útil**

**W útil = m·g·h = 800 · 9,8 · 15 = 1,18·10⁵ J**

> **¿Por qué m·g·h?** Con velocidad constante, ΣF = 0: la tensión del cable es igual al peso. El trabajo de esa fuerza en 15 m es m·g·h, la energía potencial ganada.

**b) Potencia útil**

**P útil = W / t = 117 600 / 40 = 2 940 W**

**c) Rendimiento**

**η = P útil / P total = 2 940 / 4 500 = 0,653 = 65,3 %**

> **¿Por qué P útil entre P total?** El rendimiento es la fracción de lo que se consume que se aprovecha; siempre es menor que 1. Si sale mayor, se ha dividido al revés.

**d) Energía perdida**

**E consumida = P·t = 4 500 · 40 = 1,8·10⁵ J ; E perdida = 180 000 − 117 600 = 6,24·10⁴ J**

**Comprobación.** E perdida = (1 − η)·E consumida = 0,347 · 180 000 = 6,24·10⁴ J. Coincide.
--- simulacion
La barra de la simulación separa la energía útil (azul, la Ep de los ladrillos) de la que se pierde (roja). Sube el rendimiento y mira cómo baja la potencia del motor necesaria.

=== 7.8 | Nuevo | Ascensor con 880 kg a 1,5 m/s
pide: Ascensor de 880 kg a 1,5 m/s, η = 75 %, 30 m
indice: P útil = 12,9 kW; P motor = 17,2 kW; 0,096 kWh
widget: potencia {"m": 880, "n": 1, "h": 30, "t": 20, "eta": 0.75, "cuerpo": "carga", "controles": ["m", "h", "t", "eta"]}
--- enunciado
Un ascensor de 600 kg sube a cuatro personas de 70 kg cada una con una velocidad constante de 1,5 m/s. El rendimiento del motor es del 75 %. Calcula: a) la potencia útil (usa P = F·v); b) la potencia que consume el motor, en W y en CV; c) la energía que consume en subir 30 m, en julios y en kWh.
--- resultado
a) P útil = 1,29·10⁴ W · b) P motor = 1,72·10⁴ W = 23,4 CV · c) E = 3,45·10⁵ J = 0,096 kWh.
--- solucion
Datos: m = 600 + 4 · 70 = 880 kg · v = 1,5 m/s constante · η = 0,75 · h = 30 m · g = 9,8 m/s² · 1 CV = 736 W.

**Qué herramienta usar.** Con velocidad constante, P = F·v con F igual al peso. El rendimiento relaciona la potencia útil con la consumida.

**a) Potencia útil**

**F = m·g = 880 · 9,8 = 8 624 N ; P útil = F·v = 8 624 · 1,5 = 1,29·10⁴ W**

> **¿Por qué P = F·v?** P = W/t = F·Δx/t, y Δx/t es la velocidad cuando es constante. Es la forma cómoda cuando se conoce la velocidad y no el tiempo.

**b) Potencia del motor**

**P motor = P útil / η = 12 936 / 0,75 = 1,72·10⁴ W = 17 248 / 736 = 23,4 CV**

**c) Energía en 30 m**

**t = h / v = 30 / 1,5 = 20 s ; E = P motor · t = 17 248 · 20 = 3,45·10⁵ J**

**E = 3,45·10⁵ / 3,6·10⁶ = 0,096 kWh**

> **¿Por qué se usa la potencia del motor y no la útil?** La energía que se paga es la que consume el motor, incluida la que se pierde.

**Comprobación.** Energía útil = m·g·h = 880 · 9,8 · 30 = 2,59·10⁵ J, que es el 75 % de 3,45·10⁵ J. Cuadra.
--- simulacion
En la simulación la cabina sube 30 m en 20 s (1,5 m/s). Cambia la masa: la potencia necesaria crece en proporción.

=== 7.9 | Nuevo | Hervidor de 2200 W que calienta 1,5 L de agua
pide: Hervidor de 2200 W: 1,5 L de 15 a 100 °C en 4,5 min
indice: η = 89,7 %; 0,165 kWh; 0,025 €
widget: calentador {"escenario": "agua", "P": 2200, "m": 1.5, "T0": 15, "Tf": 100, "t": 270, "eta": 0.9, "precio": 0.15, "incognita": "eta", "controles": ["P", "m", "t", "precio"]}
--- enunciado
Un hervidor eléctrico de 2200 W calienta 1,5 L de agua desde 15 °C hasta 100 °C en 4 minutos y 30 segundos. Calcula: a) la energía que absorbe el agua; b) la energía eléctrica consumida; c) el rendimiento del hervidor; d) el coste si el kWh está a 0,15 €. (c agua = 4180 J/(kg·K); 1 L de agua = 1 kg.)
--- resultado
a) Q = 5,33·10⁵ J · b) E = 5,94·10⁵ J = 0,165 kWh · c) η = 89,7 % · d) 0,025 €.
--- solucion
Datos: P = 2200 W · m = 1,5 kg · T₀ = 15 °C · T = 100 °C · t = 4 min 30 s = 270 s · c = 4180 J/(kg·K) · precio 0,15 €/kWh.

**Qué herramienta usar.** La energía útil es el calor que gana el agua (Q = m·c·ΔT); la consumida, P·t. El rendimiento es su cociente.

**a) Energía que absorbe el agua**

**Q = m·c·(T − T₀) = 1,5 · 4180 · 85 = 5,33·10⁵ J**

> **¿Por qué ΔT en °C sirve?** Una diferencia de temperaturas vale lo mismo en °C que en K: 100 − 15 = 85 °C = 85 K.

**b) Energía eléctrica consumida**

**E = P·t = 2200 · 270 = 5,94·10⁵ J = 5,94·10⁵ / 3,6·10⁶ = 0,165 kWh**

**c) Rendimiento**

**η = Q / E = 532 950 / 594 000 = 0,897 = 89,7 %**

**d) Coste**

**coste = 0,165 kWh · 0,15 €/kWh = 0,025 €**

> **¿Por qué con la energía consumida?** La compañía eléctrica cobra lo que marca el contador, que es la energía consumida, no la útil.

**Comprobación.** Con un rendimiento del 100 %, el tiempo sería Q/P = 532 950 / 2200 = 242 s; tarda 270 s porque una parte (61 000 J) calienta el propio hervidor y el aire.
--- simulacion
En la simulación el contador avanza mientras sube el termómetro. Cambia el tiempo: si fuese menor de 242 s, el rendimiento saldría mayor que 100 %, que es imposible.
