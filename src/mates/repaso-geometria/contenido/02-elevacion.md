---
slug: elevacion
titulo: Ángulos de elevación, depresión y demora
nombre: Elevación, depresión y demora
corto: Elevación
eyebrow: Apartado 2 · diapositiva 2
desc: Elevación y depresión se miden desde la horizontal; la demora, desde el norte en sentido horario.
icono: elevacion
---
## Idea clave: ¿desde dónde se mide el ángulo?

- **Ángulo de elevación**: entre la horizontal y la visual cuando el objeto está **por encima** del observador.
- **Ángulo de depresión**: entre la horizontal y la visual cuando el objeto está **por debajo**.
- **Demora** (*bearing*): desde el **norte**, en el sentido de las agujas del reloj, con tres cifras (045°, 230°).

[[widget:elevacion|{"h":30,"d":50}]]

> **¿Por qué la depresión es igual a la elevación?** La horizontal de arriba y el suelo son paralelos y la visual los corta: los dos ángulos son **alternos internos**. Por eso el ángulo de depresión desde la torre al observador mide lo mismo que el de elevación desde el observador a la torre.

Con el ángulo, el triángulo rectángulo se resuelve con una razón trigonométrica:

La tangente es el cateto opuesto entre el contiguo, es decir, **la altura entre la distancia**: **tan α = h/d**.

## Ejemplo · La altura de una torre

Desde 40 m del pie de una torre, su punto más alto se ve con un ángulo de elevación de 35°.

[[figura:alturas|{"h":28,"d":[40],"ang":["35°"],"etqh":"h","etqd":["40 m"],"objeto":"torre","foco":["h"]}|El ángulo está en el observador, entre el suelo y la visual.]]

**tan 35° = h/40 ⟹ h = 40·tan 35° ≈ 28,0** m

## Ejemplo · Una demora

Un barco sale del puerto con demora 060° y navega 20 km. ¿Cuánto se ha alejado hacia el norte y hacia el este?

[[figura:geo|{"pts":{"P":[0,0],"Q":[17.32,10],"E":[17.32,0]},"el":[["norte","P",8],["seg","P","Q",{"k":"p"}],["seg","P","E",{"dash":true,"k":"eje"}],["seg","E","Q",{"dash":true,"k":"eje"}],["rumbo","P",60,"60°",3],["recto","E","P","Q"],["cota","P","Q","20 km",{"lado":1}],["cota","P","E","este",{"lado":-1}],["cota","E","Q","norte",{"lado":-1}],["pt","P","so","Puerto"],["pt","Q","ne","Barco"]]}|La demora se mide desde el norte (N), en sentido horario.]]

El ángulo con el norte es 60°, así que con el este forma 30°:

**norte = 20·cos 60° = 10** km

**este = 20·sen 60° ≈ 17,32** km

=== P7 | Nuevo | Entre dos edificios
nivel: 2
pide: Ángulos de elevación y depresión entre dos edificios
resultado: **Elevación ≈ 39,81° · depresión ≈ 33,69°**
--- enunciado
Dos edificios están separados 30 m. El primero mide 20 m y el segundo 45 m. Desde lo alto del primero, calcula:

a) el ángulo de elevación con el que se ve lo alto del segundo;

b) el ángulo de depresión con el que se ve su base.
--- pista Haz el dibujo
Dibuja los dos edificios y una **horizontal** desde lo alto del primero hasta el segundo. Las dos visuales salen del mismo punto: una hacia arriba y otra hacia abajo. Marca las alturas que quedan por encima y por debajo de la horizontal.

[[dibujo:geo|{"pts":{"A":[0,0],"T":[0,20],"B":[30,0],"S":[30,45],"H":[30,20]},"el":[["seg","A","T",{"w":4}],["seg","B","S",{"w":4}],["seg","A","B",{"k":"eje"}],["seg","T","H",{"dash":true,"k":"eje"}],["seg","T","S",{"k":"p"}],["seg","T","B",{"k":"n"}],["ang","T","H","S","α",{"k":"v"}],["ang","T","H","B","β",{"k":"n"}],["cota","A","T","20 m",{"lado":1}],["cota","H","S","25 m",{"lado":-1}],["cota","B","H","20 m",{"lado":-1}],["cota","A","B","30 m",{"lado":-1}]]}|La horizontal desde lo alto del primer edificio parte el segundo en 25 m y 20 m.]]
--- pista Dos triángulos rectángulos
Por encima de la horizontal: catetos 25 y 30. Por debajo: catetos 20 y 30.
--- solucion
a) Por encima de la horizontal quedan 45 − 20 = 25 m:

**tan α = 25/30 ⟹ α ≈ 39,81°**

b) Por debajo quedan los 20 m del propio edificio:

**tan β = 20/30 ⟹ β ≈ 33,69°**

> **¿Por qué desde la horizontal?** Los ángulos de elevación y de depresión se miden siempre desde la horizontal del observador, no desde la vertical del edificio.

=== P8 | Nuevo | Navegar con una demora
nivel: 2
pide: Barco con demora 060°: distancia al norte y al este
resultado: **10 km al norte · ≈ 17,32 km al este**
--- enunciado
Un barco sale del puerto con demora 060° y navega 20 km en línea recta. ¿Cuántos kilómetros se ha desplazado hacia el norte? ¿Y hacia el este?
--- pista Haz el dibujo
Dibuja el puerto, una flecha hacia el norte y el trayecto del barco girado 60° desde el norte **en sentido horario**. Completa un triángulo rectángulo con un tramo hacia el este y otro hacia el norte.

[[dibujo:geo|{"pts":{"P":[0,0],"Q":[17.32,10],"E":[17.32,0]},"el":[["norte","P",8],["seg","P","Q",{"k":"p"}],["seg","P","E",{"dash":true,"k":"eje"}],["seg","E","Q",{"dash":true,"k":"eje"}],["rumbo","P",60,"60°",3],["recto","E","P","Q"],["cota","P","Q","20 km",{"lado":1}],["cota","P","E","este = ?",{"lado":-1,"k":"fr"}],["cota","E","Q","norte = ?",{"lado":-1,"k":"fr"}]]}|La demora 060° se mide desde el norte.]]
--- pista El ángulo del triángulo
El trayecto forma 60° con el norte. El lado «norte» es el contiguo a ese ángulo, y el lado «este», el opuesto.
--- solucion
En el triángulo, el ángulo con el norte es 60° y la hipotenusa mide 20 km.

**norte = 20·cos 60° = 10** km

**este = 20·sen 60° = 10√3 ≈ 17,32** km

> **¿Por qué coseno para el norte?** El tramo norte es contiguo al ángulo de 60°: contiguo = hipotenusa·cos. El tramo este es opuesto: opuesto = hipotenusa·sen.
