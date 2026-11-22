---
slug: condiciones
titulo: Problemas con condiciones
nombre: Problemas con condiciones
corto: Condiciones
eyebrow: Apartado 4 · diapositiva 35
desc: Repartos, «al menos uno», elementos que van juntos y posiciones obligadas. Se parte el problema en decisiones y se multiplica.
icono: condiciones
---
## Idea clave: partir en decisiones y multiplicar

En los problemas de examen casi nunca vale una sola fórmula. El método:

1. **Empieza por la condición.** Si un número debe ser par, decide primero la última cifra; si dos personas van juntas, júntalas en un bloque.
2. **Divide en decisiones** que se toman una detrás de otra y cuenta cada una con su fórmula.
3. **Multiplica** las decisiones que se toman a la vez («y»); **suma** los casos que se excluyen entre sí («o»).
4. **«Al menos uno»**: casi siempre es más fácil **el total menos el caso contrario** (ninguno).

> **¿Por qué el contrario?** «Al menos una mujer» son cuatro casos (1, 2, 3 o 4 mujeres). «Ninguna mujer» es uno solo. Total − ninguna = al menos una.

## Ejemplo · 2 hombres y 2 mujeres de 5 hombres y 6 mujeres

Se eligen los hombres **y** las mujeres: se multiplica.

**C(5, 2)·C(6, 2) = 10·15 = 150**

## Ejemplo · 5 personas en fila con Ana y Berta juntas

Ana y Berta forman un **bloque**: se ordenan 4 «piezas» (el bloque y las otras 3) y, dentro del bloque, Ana y Berta pueden ir en 2 órdenes.

**2·4! = 2·24 = 48**

=== C10 | Nuevo | Números pares
nivel: 2
pide: Números de 3 cifras distintas con 1 a 5 que sean pares
resultado: **2·4·3 = 24**
--- enunciado
¿Cuántos números de **3 cifras distintas** se pueden formar con los dígitos **1, 2, 3, 4 y 5** que sean **pares**?
--- pista Empieza por la condición
Para que sea par, ¿qué cifras pueden ir al final?
--- pista El resto
Fijada la última, quedan 4 dígitos para las otras dos posiciones, sin repetir.
--- solucion
**Última cifra**: 2 o 4 (2 opciones). Las otras dos posiciones se llenan con los 4 dígitos restantes, con orden y sin repetir: V(4, 2) = 4·3 = 12.

**2·12 = 24**

=== C11 | Nuevo | Comité con al menos una chica
nivel: 2
pide: Comité de 4 entre 6 chicos y 4 chicas con al menos una chica
resultado: **C(10, 4) − C(6, 4) = 210 − 15 = 195**
--- enunciado
Se elige un comité de **4 personas** entre **6 chicos y 4 chicas**. ¿Cuántos comités tienen **al menos una chica**?
--- pista El contrario
¿Cuántos comités hay en total? ¿Cuántos no tienen ninguna chica?
--- solucion
**Total: C(10, 4) = 210.** Sin chicas (solo chicos): **C(6, 4) = 15**.

**Al menos una chica: 210 − 15 = 195**

> **Comprobación caso a caso.** 1 chica: 4·20 = 80; 2: 6·15 = 90; 3: 4·6 = 24; 4: 1. Total 80 + 90 + 24 + 1 = 195.

=== C12 | Nuevo | Juntos y separados
nivel: 3
pide: 5 personas en fila: Ana y Berta juntas; y separadas
resultado: **Juntas: 48 · Separadas: 72**
--- enunciado
Cinco amigos, entre ellos Ana y Berta, se colocan en una fila para una foto.
1. ¿De cuántas maneras pueden colocarse si **Ana y Berta van juntas**?
2. ¿Y si **no pueden ir juntas**?
--- pista El bloque
Pega a Ana y Berta: cuentan como una sola pieza. ¿Cuántas piezas ordenas?
--- pista Dentro del bloque
AB y BA son filas distintas.
--- pista Separadas
Total de filas menos las que tienen a Ana y Berta juntas.
--- solucion
1. Bloque (Ana-Berta) + 3 personas = 4 piezas: 4! órdenes. Dentro del bloque, 2 órdenes.

**Juntas: 2·4! = 48**

2. Total de filas: 5! = 120.

**Separadas: 120 − 48 = 72**

=== D35·12 | Diapositiva 35, ejercicio 12 | Siete juguetes para tres niños
nivel: 3
pide: Repartir 7 juguetes: 3 al menor y 2 a cada uno de los otros
resultado: **C(7, 3)·C(4, 2)·C(2, 2) = 35·6·1 = 210**
--- enunciado
Encuentre el número de maneras en que se pueden dar **siete juguetes diferentes a tres niños**, si el más joven recibirá **tres juguetes** y los otros recibirán **dos juguetes cada uno**.
--- pista Por turnos
Primero eliges los juguetes del más joven; después, los del segundo entre los que quedan; el tercero se lleva el resto.
--- pista Cada turno
El orden dentro del lote de cada niño no importa: combinaciones.
--- solucion
**Más joven**: 3 de 7, C(7, 3) = 35. **Segundo**: 2 de los 4 restantes, C(4, 2) = 6. **Tercero**: los 2 que quedan, C(2, 2) = 1.

**35·6·1 = 210**

> **Otra forma.** Es una permutación con repetición: 7!/(3!·2!·2!) = 5040/24 = 210. Cada orden de los 7 juguetes, cortado en lotes de 3, 2 y 2, da un reparto.

=== D35·13 | Diapositiva 35, ejercicio 13 | Grupos de cuatro personas
nivel: 3
pide: 4 de 5 hombres y 6 mujeres: total, 2 y 2, al menos una mujer
resultado: **330 · 150 · 325**
--- enunciado
De un grupo compuesto por **cinco hombres y seis mujeres** se eligen **cuatro personas**.
1. Determine cuántos grupos posibles se pueden elegir.
2. Determine cuántos grupos se pueden formar que estén compuestos por **dos hombres y dos mujeres**.
3. Determine cuántos grupos se pueden formar en los que haya **al menos una mujer**.
--- pista Apartado 1
4 personas de 11, sin orden.
--- pista Apartado 2
Eliges 2 hombres de 5 y 2 mujeres de 6, a la vez: se multiplica.
--- pista Apartado 3
Total menos los grupos sin ninguna mujer (solo hombres).
--- solucion
1. **C(11, 4) = (11·10·9·8)/(4·3·2·1) = 330**

2. **C(5, 2)·C(6, 2) = 10·15 = 150**

3. Grupos sin mujeres: C(5, 4) = 5.

**330 − 5 = 325**
