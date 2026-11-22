---
slug: cientifica
titulo: Notación científica e interés compuesto
nombre: Notación científica e interés compuesto
corto: Notación e interés
eyebrow: Apartado 3 · diapositiva 3
desc: m·10ᶜ con una sola cifra entera no nula, y el capital que crece C_F = C_i(1 + r)ⁿ.
icono: cientifica
---
## Idea clave: potencias de 10 y potencias de (1 + r)

**Notación científica**: un número escrito como **m·10ᶜ**, con **1 ≤ m < 10** (una sola cifra entera, no nula). El exponente c es el **orden de magnitud**.

- 384 000 000 = 3,84·10⁸ (la coma se mueve 8 lugares a la izquierda).
- 0,000 052 = 5,2·10⁻⁵ (5 lugares a la derecha: exponente negativo).

> **¿Para qué?** Para escribir y comparar números muy grandes o muy pequeños sin contar ceros. Al multiplicar, se multiplican las m y se **suman** los exponentes.

**Interés compuesto**: cada año, los intereses se añaden al capital y producen nuevos intereses.

**C_F = C_i(1 + r)ⁿ**

con C_i el capital inicial, r el interés en **tanto por uno** (5 % ⟹ r = 0,05) y n el número de periodos.

[[widget:interes|{"C":2000,"r":3,"n":5}]]

> **¿Por qué (1 + r)?** Al final de cada año se tiene lo que había (1·C) más los intereses (r·C): C·(1 + r). Repetido n años, se multiplica n veces por (1 + r).

## Ejemplo · 1000 € al 5 % durante 3 años

**C_F = 1000·1,05³ = 1157,63** €

[[figura:geo|{"pts":{"a":[0,0],"b":[0.8,0],"c":[0.8,5],"d":[0,5],"e":[1.2,0],"f":[2,0],"g":[2,5.25],"h":[1.2,5.25],"i":[2.4,0],"j":[3.2,0],"k":[3.2,5.51],"l":[2.4,5.51],"m":[3.6,0],"n":[4.4,0],"o":[4.4,5.79],"p":[3.6,5.79]},"el":[["pol",["a","b","c","d"],{"fill":"p"}],["pol",["e","f","g","h"],{"fill":"p"}],["pol",["i","j","k","l"],{"fill":"p"}],["pol",["m","n","o","p"],{"fill":"v"}],["txt","d","1000",{"pos":"ne","d":6}],["txt","h","1050",{"pos":"ne","d":6}],["txt","l","1102,50",{"pos":"ne","d":6}],["txt","p","1157,63",{"pos":"ne","d":6,"k":"v"}],["txt","a","año 0",{"pos":"se","d":4}],["txt","m","año 3",{"pos":"se","d":4}]],"alto":240}|Cada barra es la anterior por 1,05: crecen un poco más cada año.]]

=== P3 | Nuevo | Notación científica
nivel: 1
pide: Escribir y operar en notación científica
resultado: **a) 5,2·10⁻⁵ y 3,84·10⁸ · b) 7,5·10⁵ · c) 4·10⁶**
--- enunciado
a) Escribe en notación científica 0,000 052 y 384 000 000.

b) Calcula (3·10⁸)·(2,5·10⁻³).

c) Calcula (6·10⁴)/(1,5·10⁻²).
--- pista Haz el dibujo
Sitúa cada número en una «recta de potencias de 10»: cuenta cuántos saltos hay que dar desde el 1 hasta su primera cifra no nula. A la derecha del 1 los exponentes son positivos; a la izquierda, negativos.

[[dibujo:geo|{"pts":{"O":[0,0],"I":[-6,0],"D":[9,0],"a":[-5,0],"b":[8,0]},"el":[["flecha","I","D",{"k":"eje"}],["pt","O","n","10⁰ = 1"],["pt","a","n","5,2·10⁻⁵"],["pt","b","n","3,84·10⁸"],["cota","a","O","5 saltos",{"lado":-1,"k":"fr"}],["cota","O","b","8 saltos",{"lado":-1,"k":"p"}]],"alto":120}|El exponente cuenta cuántas posiciones se mueve la coma.]]
--- pista Multiplicar y dividir
Se opera con las m por un lado y con las potencias por otro: 10ᵃ·10ᵇ = 10ᵃ⁺ᵇ y 10ᵃ/10ᵇ = 10ᵃ⁻ᵇ.
--- solucion
a) **0,000052 = 5,2·10⁻⁵** y **384000000 = 3,84·10⁸**

b) **(3·2,5)·10⁸⁻³ = 7,5·10⁵**

c) **(6/1,5)·10⁴⁺² = 4·10⁶**

> **¿Por qué 10⁴⁺²?** Dividir entre 10⁻² es multiplicar por 10²: se restan los exponentes, 4 − (−2) = 6.

=== P4 | Nuevo | Un capital que crece
nivel: 1
pide: Capital al 3 % compuesto y años para superar 2500 €
resultado: **a) 2318,55 € · b) 8 años**
widget: interes {"C":2000,"r":3,"n":8}
--- enunciado
Se ingresan 2000 € al 3 % de interés compuesto anual.

a) ¿Qué capital habrá al cabo de 5 años? ¿Cuántos euros son intereses?

b) ¿Cuántos años completos hacen falta para superar los 2500 €?
--- pista Haz el dibujo
Dibuja una barra por año: cada una es la anterior multiplicada por 1,03. Marca la altura de 2500 € para ver en qué año se pasa.

[[dibujo:geo|{"ejes":{"x":[-0.5,9],"y":[0,3],"xt":[[1,"1"],[2,"2"],[3,"3"],[4,"4"],[5,"5"],[6,"6"],[7,"7"],[8,"8"]],"yt":[[2,"2000"],[2.5,"2500"]],"xl":"años","yl":"€"},"pts":{"a":[0,2],"b":[8.6,2.5],"c":[5,2.319],"d":[8,2.534],"e":[7,2.46]},"el":[["recta",0,2.5,{"k":"fr","dash":true}],["pt","a","so","2000"],["pt","c","n","2318,55"],["pt","e","se","2459,75"],["pt","d","n","2533,54"]],"alto":260}|Al 3 %, en el año 7 aún no se llega a 2500 €; en el 8, sí.]]
--- pista La fórmula
C_F = 2000·1,03ⁿ. En b) prueba n = 7 y n = 8, o resuelve 1,03ⁿ > 1,25 con logaritmos.
--- solucion
a) **C_F = 2000·1,03⁵ = 2318,55** €, así que los intereses son 318,55 €.

b) **2000·1,03⁷ = 2459,75** € y **2000·1,03⁸ = 2533,54** €: hacen falta **8 años**.

Con logaritmos: 1,03ⁿ > 1,25 ⟹ n > log 1,25/log 1,03 ≈ 7,55, así que n = 8.

> **¿Por qué no 2000 + 5·60?** Eso sería interés simple (siempre 60 € al año). En el compuesto, los intereses de cada año también producen intereses.
