---
slug: suma-y-doble
titulo: Suma, resta y ángulo doble
nombre: Suma, resta y ángulo doble
corto: Ángulo doble
eyebrow: Apartado 2 · diapositivas 20 y 28
desc: sen(A ± B), cos(A ± B) y tan(A ± B); con A = B salen sen 2θ, cos 2θ y tan 2θ.
icono: angdoble
---
## Idea clave: las fórmulas de la suma, y A = B

**sen(A ± B) = sen A cos B ± cos A sen B**

**cos(A ± B) = cos A cos B ∓ sen A sen B**

**tan(A ± B) = (tan A ± tan B)/(1 ∓ tan A tan B)**

> **Cuidado con el signo del coseno.** En cos(A + B) aparece un menos, y en cos(A − B), un más. Por eso se escribe ∓.

Haciendo B = A salen las del **ángulo doble**:

**sen 2θ = 2 sen θ cos θ**

**cos 2θ = cos²θ − sen²θ = 1 − 2sen²θ = 2cos²θ − 1**

**tan 2θ = 2tan θ/(1 − tan²θ)**

> **¿Por qué tres formas para cos 2θ?** Sustituyendo cos²θ = 1 − sen²θ, o sen²θ = 1 − cos²θ. Se elige la que deja **una sola razón** en la ecuación.

## Ejemplo · cos 15° exacto

[[figura:unidad|{"ang":45,"otros":[30],"etq":"45°","etqOtros":["30°"],"etqAng":"15°"}|15° = 45° − 30°: dos ángulos notables.]]

**cos 15° = cos(45° − 30°) = cos 45° cos 30° + sen 45° sen 30°**

**= (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4 ≈ 0,9659**

=== D20·1 | Diapositiva 20 | sen 2θ, cos 2θ y tan 2θ
nivel: 1
pide: Deducir sen 2θ, cos 2θ y tan 2θ de las fórmulas de la suma
resultado: **sen 2θ = 2 sen θ cos θ · cos 2θ = cos²θ − sen²θ · tan 2θ = 2tan θ/(1 − tan²θ)**
--- enunciado
A partir de las fórmulas de sen(A + B), cos(A + B) y tan(A + B), calcula sen 2θ, cos 2θ y tan 2θ. Escribe cos 2θ de tres formas.
--- pista Haz el dibujo
En la circunferencia unidad, dibuja θ y, a continuación, otro θ: el ángulo total es 2θ = θ + θ.

[[dibujo:unidad|{"ang":70,"otros":[35],"etq":"2θ","etqOtros":["θ"],"etqAng":""}|2θ es la suma de θ y θ.]]
--- pista Sustituye
Haz A = θ y B = θ en las fórmulas de la suma.
--- pista Las otras formas
En cos²θ − sen²θ, cambia cos²θ por 1 − sen²θ, o sen²θ por 1 − cos²θ.
--- solucion
**sen 2θ = sen(θ + θ) = sen θ cos θ + cos θ sen θ = 2 sen θ cos θ**

**cos 2θ = cos θ cos θ − sen θ sen θ = cos²θ − sen²θ**

**cos 2θ = 1 − 2sen²θ = 2cos²θ − 1** (con sen² + cos² = 1)

**tan 2θ = (tan θ + tan θ)/(1 − tan θ tan θ) = 2tan θ/(1 − tan²θ)**

=== D28·3 | Diapositiva 28, ejercicio | sen θ = cos(π/2 − θ)
nivel: 1
pide: Demostrar sen θ = cos(π/2 − θ)
resultado: **cos(π/2 − θ) = cos(π/2) cos θ + sen(π/2) sen θ = sen θ**
--- enunciado
Demuestra que sen θ = cos(π/2 − θ).
--- pista Haz el dibujo
En un triángulo rectángulo, los dos ángulos agudos suman π/2. El cateto opuesto a uno es el contiguo al otro.

[[dibujo:tri|{"a":3,"b":4,"c":5,"recto":"C","etq":{"a":"a","A":"θ","B":"π/2 − θ"}}|El lado a es opuesto a θ y contiguo a π/2 − θ.]]
--- pista La fórmula de la resta
cos(A − B) = cos A cos B + sen A sen B, con A = π/2 y B = θ.
--- solucion
**cos(π/2 − θ) = cos(π/2) cos θ + sen(π/2) sen θ = 0·cos θ + 1·sen θ = sen θ**

> **En el triángulo:** sen θ = a/c y cos(π/2 − θ) = a/c, porque a es contiguo al otro ángulo.

=== E5 | Nuevo | sen 75° exacto
nivel: 2
pide: Valor exacto de sen 75°
resultado: **sen 75° = (√6 + √2)/4 ≈ 0,9659**
--- enunciado
Calcula el valor exacto de sen 75°.
--- pista Haz el dibujo
Escribe 75° como suma de dos ángulos notables y dibújalos uno a continuación del otro en la circunferencia unidad.

[[dibujo:unidad|{"ang":75,"otros":[45],"etq":"75°","etqOtros":["45°"],"etqAng":""}|75° = 45° + 30°.]]
--- pista Fórmula
sen(45° + 30°) = sen 45° cos 30° + cos 45° sen 30°.
--- solucion
**sen 75° = sen 45° cos 30° + cos 45° sen 30° = (√2/2)(√3/2) + (√2/2)(1/2)**

**sen 75° = (√6 + √2)/4 ≈ 0,9659**

=== E8 | Nuevo | Conocida la tangente
nivel: 3
pide: tan θ = 1/3: tan 2θ y tan(θ + 45°)
resultado: **tan 2θ = 3/4 · tan(θ + 45°) = 2**
--- enunciado
Si tan θ = 1/3, calcula sin calculadora tan 2θ y tan(θ + 45°).
--- pista Haz el dibujo
Dibuja un triángulo rectángulo con catetos 1 y 3 para θ. Puedes comprobar al final con la calculadora: θ = arctan(1/3).

[[dibujo:tri|{"a":1,"b":3,"c":3.1623,"recto":"C","etq":{"a":"1","b":"3","A":"θ"}}|tan θ = 1/3: opuesto 1, contiguo 3.]]
--- pista Fórmulas
tan 2θ = 2tan θ/(1 − tan²θ) y tan(θ + 45°) = (tan θ + 1)/(1 − tan θ), porque tan 45° = 1.
--- solucion
**tan 2θ = (2/3)/(1 − 1/9) = (2/3)/(8/9) = 3/4**

**tan(θ + 45°) = (1/3 + 1)/(1 − 1/3) = (4/3)/(2/3) = 2**

Comprobación: θ ≈ 18,43°, tan 36,87° ≈ 0,75 y tan 63,43° ≈ 2. ✓
