---
slug: identidades
titulo: Identidades trigonométricas
nombre: Identidades
corto: Identidades
eyebrow: Apartado 1 · diapositivas 18, 26 y 27
desc: sen²θ + cos²θ = 1 y las que salen de ella. Se demuestran partiendo de un lado y llegando al otro.
icono: identidades
---
## Idea clave: de un lado al otro

Una **identidad** es una igualdad que se cumple para **todos** los ángulos (donde tenga sentido). Para demostrarla:

1. **Elige el lado más complicado** y trabaja solo con él.
2. **Pasa todo a sen y cos** (tan = sen/cos, sec = 1/cos…).
3. **Opera**: común denominador, factor común, sen² + cos² = 1.
4. **Para** cuando llegues al otro lado.

> **¿Por qué no se «pasa al otro lado»?** Si operas a la vez con los dos lados das por cierto lo que quieres demostrar. Partir de un lado y llegar al otro sí demuestra que son iguales.

## Ejemplo · tan θ + cot θ = sec θ·cosec θ

**tan θ + cot θ = sen θ/cos θ + cos θ/sen θ = (sen²θ + cos²θ)/(sen θ cos θ)**

**= 1/(sen θ cos θ) = sec θ·cosec θ**

=== D18·1 | Diapositiva 18, ejercicio 1 | 1 + tan²θ = sec²θ
nivel: 1
pide: Demostrar 1 + tan²θ = sec²θ
resultado: **sen²θ + cos²θ = 1**, dividido entre cos²θ
--- enunciado
Demuestra la identidad 1 + tan²θ = sec²θ.
--- pista Haz el dibujo
Dibuja el triángulo de la circunferencia unidad (hipotenusa 1, catetos sen θ y cos θ) y escribe Pitágoras.

[[dibujo:geo|{"pts":{"O":[0,0],"P":[0.8,0.6],"Q":[0.8,0]},"el":[["pol",["O","P","Q"],{"fill":"p"}],["pol",["O","P","Q"]],["recto","Q","O","P"],["ang","O","Q","P","θ"],["cota","O","P","1",{"lado":1}],["cota","P","Q","sen θ",{"lado":1,"k":"n"}],["cota","O","Q","cos θ",{"lado":-1,"k":"fr"}]],"alto":200}|Pitágoras: sen²θ + cos²θ = 1.]]
--- pista Divide
Divide los dos términos de sen²θ + cos²θ = 1 entre cos²θ.
--- solucion
Partiendo de la identidad fundamental y dividiendo entre cos²θ (con cos θ ≠ 0):

**sen²θ/cos²θ + cos²θ/cos²θ = 1/cos²θ ⟹ tan²θ + 1 = sec²θ**

=== D18·2 | Diapositiva 18, ejercicio 2 | 1 + cot²θ = cosec²θ
nivel: 1
pide: Demostrar 1 + cot²θ = cosec²θ
resultado: **sen²θ + cos²θ = 1**, dividido entre sen²θ
--- enunciado
Demuestra la identidad 1 + cot²θ = cosec²θ.
--- pista Haz el dibujo
El mismo triángulo de la circunferencia unidad: Pitágoras con sen θ, cos θ y 1.

[[dibujo:geo|{"pts":{"O":[0,0],"P":[0.8,0.6],"Q":[0.8,0]},"el":[["pol",["O","P","Q"],{"fill":"p"}],["pol",["O","P","Q"]],["recto","Q","O","P"],["ang","O","Q","P","θ"],["cota","O","P","1",{"lado":1}],["cota","P","Q","sen θ",{"lado":1,"k":"n"}],["cota","O","Q","cos θ",{"lado":-1,"k":"fr"}]],"alto":200}|Pitágoras otra vez.]]
--- pista Divide
Ahora divide entre sen²θ.
--- solucion
**sen²θ/sen²θ + cos²θ/sen²θ = 1/sen²θ ⟹ 1 + cot²θ = cosec²θ** (con sen θ ≠ 0)

=== E3 | Nuevo | Un cuadrado con seno y coseno
nivel: 1
pide: Demostrar (sen x + cos x)² = 1 + sen 2x
resultado: **sen²x + 2 sen x cos x + cos²x = 1 + sen 2x**
--- enunciado
Demuestra que (sen x + cos x)² = 1 + sen 2x.
--- pista Haz el dibujo
Dibuja un cuadrado de lado sen x + cos x dividido en cuatro trozos: dos cuadrados (sen²x y cos²x) y dos rectángulos iguales (sen x·cos x).

[[dibujo:geo|{"pts":{"a":[0,0],"b":[1.6,0],"c":[1.6,1.6],"d":[0,1.6],"e":[1,0],"f":[1,1.6],"g":[0,1],"h":[1.6,1]},"el":[["pol",["a","e",[1,1],"g"],{"fill":"p"}],["pol",[[1,1],"h","c","f"],{"fill":"n"}],["pol",["a","b","c","d"]],["seg","e","f"],["seg","g","h"],["txt",[0.5,0.5],"sen²x",{"k":"p"}],["txt",[1.3,1.3],"cos²x",{"k":"n"}],["txt",[1.3,0.5],"sen·cos",{"size":12}],["txt",[0.5,1.3],"sen·cos",{"size":12}]],"alto":220}|El cuadrado de una suma: dos cuadrados y dos rectángulos.]]
--- pista Desarrolla
(a + b)² = a² + 2ab + b². Después junta sen²x + cos²x y reconoce sen 2x.
--- solucion
**(sen x + cos x)² = sen²x + 2 sen x cos x + cos²x**

**= (sen²x + cos²x) + 2 sen x cos x = 1 + sen 2x**

=== D26·1 | Diapositiva 26, ejercicio 1 | Simplificar dos expresiones
nivel: 2
pide: Simplificar (2tan θ + sec²θ)/(sen θ + cos θ)² y (1 + 2 sen θ cos θ)/(sen θ + cos θ)
resultado: **a) sec²θ · b) sen θ + cos θ**
--- enunciado
Simplifica: a) (2tan θ + sec²θ)/(sen θ + cos θ)²; b) (1 + 2 sen θ cos θ)/(sen θ + cos θ).
--- pista Haz el dibujo
Vuelve al cuadrado de E3: (sen θ + cos θ)² = 1 + 2 sen θ cos θ. Esa expresión aparece en los dos apartados.

[[dibujo:geo|{"pts":{"a":[0,0],"b":[1.6,0],"c":[1.6,1.6],"d":[0,1.6],"e":[1,0],"f":[1,1.6],"g":[0,1],"h":[1.6,1]},"el":[["pol",["a","e",[1,1],"g"],{"fill":"p"}],["pol",[[1,1],"h","c","f"],{"fill":"n"}],["pol",["a","b","c","d"]],["seg","e","f"],["seg","g","h"],["txt",[0.5,0.5],"sen²θ",{"k":"p"}],["txt",[1.3,1.3],"cos²θ",{"k":"n"}],["txt",[1.3,0.5],"sen·cos",{"size":12}],["txt",[0.5,1.3],"sen·cos",{"size":12}]],"alto":220}|(sen θ + cos θ)² = 1 + 2 sen θ cos θ.]]
--- pista a) Todo a sen y cos
2tan θ + sec²θ = 2 sen θ/cos θ + 1/cos²θ = (2 sen θ cos θ + 1)/cos²θ.
--- pista b) El cuadrado
1 + 2 sen θ cos θ = (sen θ + cos θ)².
--- solucion
a) **2tan θ + sec²θ = (2 sen θ cos θ + 1)/cos²θ = (sen θ + cos θ)²/cos²θ**

Dividiendo entre (sen θ + cos θ)²: **resultado = 1/cos²θ = sec²θ**

b) **(1 + 2 sen θ cos θ)/(sen θ + cos θ) = (sen θ + cos θ)²/(sen θ + cos θ) = sen θ + cos θ**
