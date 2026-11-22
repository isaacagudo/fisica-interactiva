---
slug: errores
titulo: Aproximaciones, errores y cifras significativas
nombre: Aproximaciones y errores
corto: Errores
eyebrow: Apartado 4 · diapositiva 4
desc: Error absoluto, error relativo y cuántas cifras son significativas.
icono: errores
---
## Idea clave: cuánto me equivoco y cuánto importa

- **Error absoluto**: la distancia entre el valor real y el aproximado: **E_a = |real − aproximado|**.
- **Error relativo**: el error absoluto comparado con el tamaño del valor: **E_r = E_a/|real|** (en %, por 100).
- **Cifras significativas**: las que se conocen con seguridad. Se cuentan desde la **primera cifra no nula**; los ceros de la izquierda no cuentan, los de en medio sí. 0,0056 tiene 2 y 7,020 tiene 4.

> **¿Por qué hace falta el relativo?** Equivocarse en 1 cm es mucho al medir un lápiz y nada al medir una carretera. El error relativo lo dice: divide entre el tamaño de lo que se mide.

## Ejemplo · π ≈ 3,14

[[figura:geo|{"pts":{"I":[3139,0],"D":[3143.5,0],"a":[3140,0],"p":[3141.59,0],"b":[3142.86,0]},"el":[["flecha","I","D",{"k":"eje"}],["pt","a","s","3,14"],["pt","p","n","π"],["pt","b","s","22/7"],["cota","a","p","0,0016",{"lado":1,"k":"fr"}],["cota","p","b","0,0013",{"lado":1,"k":"n"}]],"alto":120}|22/7 queda más cerca de π que 3,14.]]

**E_a = |π − 3,14| ≈ 0,0016 · E_r ≈ 0,0016/π ≈ 0,051 %**

=== P5 | Nuevo | Redondear con cifras significativas
nivel: 1
pide: Redondear y contar cifras significativas
resultado: **a) 0,00457 · b) 0,0046 · c) 305000 · d) 2 y 4**
--- enunciado
a) Redondea 0,004 567 8 a 3 cifras significativas.

b) Redondéalo a 2 cifras significativas.

c) Redondea 304 560 a 3 cifras significativas.

d) ¿Cuántas cifras significativas tienen 0,0056 y 7,020?
--- pista Haz el dibujo
Sitúa 0,004 567 8 en una recta entre 0,004 56 y 0,004 57 (a 3 cifras). ¿A cuál de los dos está más cerca?

[[dibujo:geo|{"pts":{"I":[455.5,0],"D":[457.5,0],"a":[456,0],"p":[456.78,0],"b":[457,0]},"el":[["flecha","I","D",{"k":"eje"}],["pt","a","s","0,00456"],["pt","p","n","0,0045678"],["pt","b","s","0,00457"],["cota","p","b","más cerca",{"lado":1,"k":"n"}]],"alto":110}|Las 3 primeras cifras significativas son 4, 5 y 6; la siguiente (7) redondea hacia arriba.]]
--- pista Dónde empiezan
Las cifras significativas empiezan en la primera cifra no nula: el 4. Mira la cifra siguiente a la última que te quedas: si es 5 o más, se sube.
--- solucion
a) Cifras 4, 5, 6 y la siguiente es 7 (≥ 5): **0,00457**

b) Cifras 4, 5 y la siguiente es 6: **0,0046**

c) Cifras 3, 0, 4 y la siguiente es 5: **305000** (los ceros finales mantienen el tamaño del número).

d) 0,0056 tiene **2** (los ceros de la izquierda no cuentan) y 7,020 tiene **4** (el cero final se ha escrito a propósito).

=== P6 | Nuevo | Dos aproximaciones de π
nivel: 2
pide: Errores absoluto y relativo de 3,14 y 22/7
resultado: **3,14: E_a ≈ 0,0016, E_r ≈ 0,051 % · 22/7: E_a ≈ 0,0013, E_r ≈ 0,040 %**
--- enunciado
Se usan 3,14 y 22/7 como aproximaciones de π. Calcula el error absoluto y el error relativo (en %) de cada una. ¿Cuál es mejor?
--- pista Haz el dibujo
Dibuja una recta numérica con π, 3,14 y 22/7 ≈ 3,142857. Cada error absoluto es la distancia entre π y la aproximación.

[[dibujo:geo|{"pts":{"I":[3139,0],"D":[3143.5,0],"a":[3140,0],"p":[3141.59,0],"b":[3142.86,0]},"el":[["flecha","I","D",{"k":"eje"}],["pt","a","s","3,14"],["pt","p","n","π"],["pt","b","s","22/7"],["cota","a","p","E₁",{"lado":1,"k":"fr"}],["cota","p","b","E₂",{"lado":1,"k":"n"}]],"alto":120}|Una aproximación queda por debajo de π y la otra por encima.]]
--- pista Las fórmulas
E_a = |π − aproximación| y E_r = E_a/π. Usa π de la calculadora.
--- solucion
**3,14: E_a = |π − 3,14| ≈ 0,0016 · E_r ≈ 0,0016/π ≈ 0,00051 = 0,051 %**

**22/7: E_a = |π − 3,142857| ≈ 0,0013 · E_r ≈ 0,00040 = 0,040 %**

**22/7 es mejor aproximación**: su error es menor.

> **¿Por qué el valor absoluto?** 3,14 se queda corto y 22/7 se pasa. El error mide la distancia, sin signo.
