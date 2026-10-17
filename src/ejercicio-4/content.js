// Contenido de los pasos. $...$ = fórmula en línea, $$...$$ = fórmula destacada.
// Cada fórmula destacada va seguida de un <p class="why"> que explica por qué se usa.
const W = (t) => `<p class="why"><span class="why-tag">¿Por qué?</span> ${t}</p>`;
module.exports = [
{
  title: "El problema",
  note: "Mismo color, misma idea: peso ↔ energía potencial, rozamiento ↔ calor, velocidad ↔ energía cinética.",
  html: String.raw`
<p>Un cuerpo de 0,5 kg se lanza hacia arriba por un plano inclinado 30° con una velocidad de 5 m/s. El coeficiente de rozamiento es 0,2.</p>
<ul class="datos">
  <li>$m = 0{,}5\ \text{kg}$</li><li>$\alpha = 30^\circ$</li><li>$v_A = 5\ \text{m/s}$</li><li>$\mu = 0{,}2$</li><li>$g = 9{,}8\ \text{m/s}^2$</li>
</ul>
<p>Piden: i) las fuerzas al subir y al bajar; ii) la altura máxima; iii) la velocidad al volver al punto de partida.</p>
<p>La herramienta será la <strong>ecuación de trabajo</strong>:</p>
$$E_{c,A}+E_{p,A}+W_{nc}^{\,A\to B}=E_{c,B}+E_{p,B}$$
` + W(String.raw`Compara dos instantes, A y B, sin necesidad de saber qué pasa entre medias. Aquí nos piden una altura y una velocidad, no un tiempo, así que es la herramienta perfecta. $W_{nc}$ es el trabajo de las fuerzas no conservativas: en este problema, solo el rozamiento.`)
},
{
  title: "Referencia, eje y tramos",
  note: "d se mide sobre el plano; h es la altura vertical. No los confundas.",
  html: String.raw`
<p>Antes de escribir ninguna ecuación hay que decidir tres cosas:</p>
<ul>
  <li><strong>Nivel h = 0</strong> en el punto de salida A. Así $E_{p,A}=0$.</li>
  <li><strong>Eje x</strong> paralelo al plano y positivo hacia arriba. Con este eje, v es positiva al subir y negativa al bajar: míralo en el marcador.</li>
  <li><strong>Dos tramos</strong>: de A a B, donde se para, y de B otra vez a A.</li>
</ul>
$$h=d\operatorname{sen}\alpha$$
` + W(String.raw`El plano es la hipotenusa de un triángulo rectángulo: si el cuerpo recorre d sobre el plano, sube el cateto opuesto al ángulo, d·sen α. La necesitamos porque la energía potencial usa la altura h, pero el rozamiento trabaja a lo largo de la distancia d.`)
},
{
  title: "Fuerzas al subir",
  note: "¡N no es m·g! En el plano inclinado, N = m·g·cos α.",
  html: String.raw`
<p>Sobre el cuerpo actúan tres fuerzas: el <strong class="k-p">peso</strong>, la <strong class="k-n">normal</strong> y el <strong class="k-fr">rozamiento</strong>.</p>
$$P=m\,g=0{,}5\cdot9{,}8=4{,}90\ \text{N}$$
$$\begin{aligned}P_x&=m\,g\operatorname{sen}30^\circ=2{,}45\ \text{N}\\P_y&=m\,g\cos30^\circ=4{,}24\ \text{N}\end{aligned}$$
` + W(String.raw`El cuerpo se mueve a lo largo del plano, así que descomponemos el peso en un eje paralelo y otro perpendicular. $P_x$ es la parte que tira hacia abajo del plano y $P_y$ la que aprieta contra él. El ángulo entre P y $P_y$ también vale α, por eso $P_y$ lleva el coseno y $P_x$ el seno.`) + String.raw`
$$N=P_y=4{,}24\ \text{N}$$
` + W(String.raw`En la dirección perpendicular al plano el cuerpo no se mueve, así que la suma de fuerzas en ese eje es cero (primera ley de Newton): $N-P_y=0$.`) + String.raw`
$$F_r=\mu\,N=0{,}2\cdot4{,}24=0{,}849\ \text{N}$$
` + W(String.raw`Es la ley del rozamiento dinámico: proporcional a la normal. Su sentido es siempre opuesto a la velocidad; como el cuerpo sube, apunta <strong>hacia abajo del plano</strong>.`)
},
{
  title: "Qué trabajo hace cada fuerza",
  note: "O pones Ep, o el trabajo del peso. Nunca los dos.",
  html: String.raw`
$$W=F\,d\cos\varphi$$
` + W(String.raw`El trabajo mide cuánta energía da o quita una fuerza mientras el cuerpo se desplaza. Solo cuenta la parte de la fuerza en la dirección del movimiento, por eso aparece cos φ. Esta fórmula es la que decide el signo.`) + String.raw`
<ul>
  <li><strong class="k-p">Peso</strong>: es conservativa. No calculamos su trabajo aparte porque ya aparece como energía potencial.</li>
  <li><strong class="k-n">Normal</strong>: φ = 90°, cos 90° = 0. No hace trabajo.</li>
  <li><strong class="k-fr">Rozamiento</strong>: φ = 180°, cos 180° = −1. Su trabajo es negativo.</li>
</ul>
$$W_{roz}=F_r\,d\cos180^\circ=-\,\mu\,m\,g\cos\alpha\cdot d$$
` + W(String.raw`Es la fórmula anterior con φ = 180°. Es la única fuerza no conservativa que trabaja, así que $W_{nc}=W_{roz}$, y ya lleva su signo menos dentro.`)
},
{
  title: "La subida, en energía",
  note: "La barra siempre suma 6,25 J: la energía no se pierde, se transforma.",
  html: String.raw`
<p>Pulsa reproducir y mira la barra: la <span class="k-ec">energía cinética</span> se convierte en <span class="k-ep">energía potencial</span> y en <span class="k-q">calor</span>.</p>
$$\begin{aligned}&\underbrace{\tfrac12 m v_A^2}_{E_{c,A}}+\underbrace{0}_{E_{p,A}}\underbrace{-\,\mu m g\cos\alpha\, d}_{W_{roz}\,<\,0}\\&\quad=\underbrace{0}_{E_{c,B}}+\underbrace{m g\, d\operatorname{sen}\alpha}_{E_{p,B}}\end{aligned}$$
` + W(String.raw`Es la ecuación de trabajo entre A y B, término a término. $E_{c,A}$ sale de los 5 m/s; $E_{p,A}=0$ porque A es el nivel de referencia; $E_{c,B}=0$ porque en el punto más alto se para; $E_{p,B}=m\,g\,h$ con $h=d\operatorname{sen}\alpha$. Escribimos h en función de d para que solo quede una incógnita.`)
},
{
  title: "Despejar d y h",
  note: "Despeja con letras y sustituye al final: así ves que la masa se va.",
  html: String.raw`
$$d=\frac{v_A^2}{2g\,(\operatorname{sen}\alpha+\mu\cos\alpha)}$$
` + W(String.raw`La masa está en todos los términos, así que se simplifica. Luego se saca d factor común. En el paréntesis los dos términos se <strong>suman</strong>: al subir, el peso y el rozamiento frenan los dos.`) + String.raw`
$$\begin{aligned}d&=\frac{5^2}{2\cdot9{,}8\cdot(0{,}5+0{,}2\cdot0{,}866)}\\&=\frac{25}{13{,}19}\approx1{,}89\ \text{m}\end{aligned}$$
$$h=d\operatorname{sen}\alpha=1{,}895\cdot0{,}5\approx\boxed{0{,}95\ \text{m}}$$
` + W(String.raw`Nos piden la altura, no la distancia sobre el plano: volvemos a usar $h=d\operatorname{sen}\alpha$.`) + String.raw`
<p>Comprobación con la barra: 6,25 J = 4,64 J de energía potencial + 1,61 J de calor ✓</p>`
},
{
  title: "¿Vuelve a bajar?",
  note: "Si μ fuera mayor que tg α, se quedaría parado arriba.",
  html: String.raw`
<p>En B la velocidad es cero. Que vuelva a bajar no es automático:</p>
$$\begin{aligned}P_x>F_r&\iff m\,g\operatorname{sen}\alpha>\mu\,m\,g\cos\alpha\\&\iff\tan\alpha>\mu\end{aligned}$$
` + W(String.raw`Parado en B, el cuerpo solo empieza a deslizar si la componente del peso que tira hacia abajo supera al rozamiento máximo. Dividiendo entre $m\,g\cos\alpha$ queda una condición muy cómoda: $\tan\alpha>\mu$.`) + String.raw`
<p>Como $\tan30^\circ=0{,}577>0{,}2$, sí baja. En fuerzas: $P_x=2{,}45\ \text{N}$ frente a $F_r=0{,}85\ \text{N}$. En el dibujo, esas dos flechas están a escala entre sí.</p>
<p class="small">Suponemos, como el enunciado, que el coeficiente estático es parecido al dinámico.</p>`
},
{
  title: "Fuerzas al bajar",
  note: "Cambia el sentido de la fuerza, no el signo de su trabajo.",
  html: String.raw`
<p>El peso y la normal son exactamente iguales que al subir. Solo cambia el <strong class="k-fr">rozamiento</strong>: ahora apunta <strong>hacia arriba del plano</strong>, porque la velocidad apunta hacia abajo.</p>
<p>Su módulo es el mismo, $F_r=0{,}849\ \text{N}$, y su trabajo sigue siendo negativo, $W_{roz}=-F_r\,d$: el rozamiento siempre frena.</p>
<p>Compara este dibujo con el del paso 3: Fr ha dado la vuelta.</p>`
},
{
  title: "La bajada, en energía",
  note: "La energía da el módulo de v; el sentido lo decides mirando el dibujo.",
  html: String.raw`
<p>Tramo B → A: la <span class="k-ep">energía potencial</span> se convierte en <span class="k-ec">cinética</span> y en más <span class="k-q">calor</span>.</p>
$$\begin{aligned}&\underbrace{0}_{E_{c,B}}+\underbrace{m g\, d\operatorname{sen}\alpha}_{E_{p,B}}\underbrace{-\,\mu m g\cos\alpha\, d}_{W_{roz}\,<\,0}\\&\quad=\underbrace{\tfrac12 m v^2}_{E_{c,A}}+\underbrace{0}_{E_{p,A}}\end{aligned}$$
` + W(String.raw`Elegimos el tramo B → A porque en B la energía cinética es cero y la ecuación queda corta. Recorre la misma distancia d que al subir y vuelve a la altura h = 0.`) + String.raw`
$$v=\sqrt{2g\,d\,(\operatorname{sen}\alpha-\mu\cos\alpha)}$$
` + W(String.raw`Se simplifica m y se despeja v. Ahora el paréntesis <strong>resta</strong>: el peso ayuda a bajar y el rozamiento frena.`) + String.raw`
$$\begin{aligned}v&=\sqrt{2\cdot9{,}8\cdot1{,}895\cdot(0{,}5-0{,}173)}\\&=\sqrt{12{,}14}\approx\boxed{3{,}48\ \text{m/s}}\end{aligned}$$
<p>La raíz da el módulo. El sentido es hacia abajo del plano; con nuestro eje, el marcador muestra v = −3,48 m/s.</p>`
},
{
  title: "Comprobación y resumen",
  note: "Con rozamiento, siempre vuelve más despacio de lo que salió.",
  html: String.raw`
$$\begin{aligned}\tfrac12 m v^2&=\tfrac12 m v_A^2-2\,\mu m g\cos\alpha\cdot d\\v^2&=25-12{,}86=12{,}14\ \text{m}^2/\text{s}^2\ \checkmark\end{aligned}$$
` + W(String.raw`Es el viaje completo A → B → A. La energía potencial empieza y acaba en cero, así que la energía cinética que falta es el calor de los dos tramos, $2F_r\,d$. Llegar al mismo número por otro camino confirma el resultado.`) + String.raw`
<table class="res">
  <thead><tr><th>Apartado</th><th>Resultado</th></tr></thead>
  <tbody>
    <tr><td>ii) Altura máxima</td><td>h = 0,95 m (d = 1,89 m)</td></tr>
    <tr><td>iii) Velocidad al volver</td><td>3,48 m/s, hacia abajo del plano</td></tr>
    <tr><td>Calor total</td><td>3,22 J de los 6,25 J iniciales</td></tr>
    <tr><td>Tiempos</td><td>sube en 0,76 s y baja en 1,09 s</td></tr>
  </tbody>
</table>
<p>Tiene sentido físico: vuelve más despacio (3,48 &lt; 5 m/s) y tarda más en bajar que en subir, porque al bajar el rozamiento resta y la aceleración es menor.</p>
<p class="small"><strong>Vocabulario BI en inglés:</strong> energía cinética = kinetic energy (E<sub>k</sub>); energía potencial gravitatoria = gravitational potential energy (E<sub>p</sub>); trabajo = work done; calor disipado = energy dissipated as thermal energy.</p>`
}
];
