<div class="chapter-styled" markdown>

# Chapter 7 — Second-Order Circuits and RLC Behavior

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

<div class="concepts-box" markdown>

1. Second-Order Circuits
2. RLC Circuit
3. Overdamped Response
4. Underdamped Response
5. Critically Damped Response
6. Damping Ratio
7. Natural Frequency
8. Pulse Response
9. Resonant Frequency
10. Quality Factor

</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

<div class="prereq-box" markdown>

- **Chapter 5:** Passive Components: Resistors, Capacitors, and Inductors
- **Chapter 6:** Transient Analysis of RC and RL Circuits

</div>

---

## Introduction: When Circuits Get Dramatic

If first-order RC and RL circuits are like a polite conversation—one thing leads smoothly to another—then second-order RLC circuits are like a heated debate. Things can swing back and forth, overshoot their targets, or even oscillate indefinitely. Welcome to the world where circuits get *dramatic*.

In Chapter 6, you learned how capacitors and inductors store and release energy exponentially. But what happens when you put *both* energy storage elements in the same circuit? The energy sloshes back and forth between the electric field of the capacitor and the magnetic field of the inductor, like two friends tossing a ball between them. Add some resistance, and the ball gradually loses energy with each toss until everyone gets tired.

This energy exchange creates behaviors you won't see in simpler circuits:

- **Oscillations** that ring like a bell
- **Overshoot** that rockets past the target before settling back
- **Resonance** that amplifies signals at specific frequencies

Understanding these behaviors unlocks your ability to design everything from radio tuners to shock absorbers to audio equalizers. It's the physics of musical instruments, earthquake dampers, and your car's suspension—all described by the same beautiful mathematics.

## Second-Order Circuits: The Mathematical Upgrade

A **second-order circuit** is any circuit whose behavior is described by a second-order differential equation. This happens whenever a circuit contains two independent energy storage elements—typically an inductor and a capacitor. (Two capacitors in series/parallel still act as one equivalent capacitor, so they count as one energy storage element.)

The general form of a second-order differential equation is:

\[\frac{d^2x}{dt^2} + 2\alpha\frac{dx}{dt} + \omega_0^2 x = f(t)\]

Where:

- \(x\) is the response variable (voltage or current)
- \(\alpha\) is the damping coefficient (also written as \(\zeta\omega_0\))
- \(\omega_0\) is the undamped natural frequency
- \(f(t)\) is the forcing function (source input)

Don't let this equation intimidate you. It's just saying: "The acceleration of the response, plus some friction times the velocity, plus a spring force times position, equals the external push."

| Order | Energy Storage Elements | Equation Type | Example Response |
|-------|------------------------|---------------|------------------|
| First | 1 (C or L) | First-order ODE | Exponential decay/rise |
| Second | 2 (C and L) | Second-order ODE | Oscillatory, damped |
| Higher | 3+ | Higher-order ODE | Complex multi-frequency |

## RLC Circuits: The Dynamic Trio

An **RLC circuit** contains all three passive components: a **R**esistor, an indu**L**tor, and a **C**apacitor. These components can be connected in series or parallel, and each configuration has its own personality.

### Series RLC Circuit

In a series RLC circuit, all components share the same current. The voltage equation around the loop is:

\[V_R + V_L + V_C = V_S\]

\[iR + L\frac{di}{dt} + \frac{1}{C}\int i \, dt = V_S\]

Taking the derivative and rearranging:

\[\frac{d^2i}{dt^2} + \frac{R}{L}\frac{di}{dt} + \frac{1}{LC}i = \frac{1}{L}\frac{dV_S}{dt}\]

For a series RLC circuit:

- **Damping coefficient:** \(\alpha = \frac{R}{2L}\)
- **Undamped natural frequency:** \(\omega_0 = \frac{1}{\sqrt{LC}}\)
- **Resonant frequency:** \(\omega_r = \omega_0\) (for series)

### Parallel RLC Circuit

In a parallel RLC circuit, all components share the same voltage. The current equation at a node is:

\[i_R + i_L + i_C = I_S\]

\[\frac{v}{R} + \frac{1}{L}\int v \, dt + C\frac{dv}{dt} = I_S\]

For a parallel RLC circuit:

- **Damping coefficient:** \(\alpha = \frac{1}{2RC}\)
- **Undamped natural frequency:** \(\omega_0 = \frac{1}{\sqrt{LC}}\)

Notice that the undamped natural frequency \(\omega_0\) is the same for both configurations—it only depends on L and C.

#### Diagram: Series vs Parallel RLC Configuration

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px;">
<label style="font-size:0.9em;">R (Ω): <input type="range" id="rlcR" min="1" max="200" value="20" step="1" oninput="drawRLC()"><strong id="rlcRv">20</strong></label>
<label style="font-size:0.9em;">L (mH): <input type="range" id="rlcL" min="1" max="200" value="100" step="1" oninput="drawRLC()"><strong id="rlcLv">100</strong></label>
<label style="font-size:0.9em;">C (μF): <input type="range" id="rlcC" min="1" max="200" value="100" step="1" oninput="drawRLC()"><strong id="rlcCv">100</strong></label>
</div>
<canvas id="rlcCanvas" width="690" height="360"></canvas>
<div id="rlcInfo" style="font-size:0.9em;margin-top:6px;padding:8px;background:#F8F6FF;border-radius:6px;"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<style>
.msim-box{background:#fff;border:1px solid #e0e0e0;border-radius:8px;padding:12px;margin:1rem 0;position:relative;transition:all 0.3s ease;}
.msim-box.msim-fs{position:fixed!important;top:0;left:0;width:100vw!important;height:100vh!important;z-index:9999;border-radius:0;overflow-y:auto;padding:20px 30px;box-sizing:border-box;}
.msim-btn{position:absolute;top:8px;right:8px;padding:4px 12px;border:1px solid #5A3EED;border-radius:4px;background:#F8F6FF;color:#5A3EED;cursor:pointer;font-size:0.8em;font-weight:600;z-index:10;}
.msim-btn:hover{background:#5A3EED;color:#fff;}
.msim-box.msim-fs .msim-btn{position:fixed;top:12px;right:12px;}
</style>
<script>
function toggleFS(btn){var box=btn.closest('.msim-box');box.classList.toggle('msim-fs');btn.textContent=box.classList.contains('msim-fs')?'✕ Back to Doc':'⛶ Fullscreen';}
</script>
<script>
var rlcChart=null;
function stepResp(alpha,w0,t){
  var z=alpha/w0;
  if(Math.abs(z-1)<0.01){return 1-(1+w0*t)*Math.exp(-w0*t);}
  if(z<1){var wd=w0*Math.sqrt(1-z*z);return 1-(1/Math.sqrt(1-z*z))*Math.exp(-alpha*t)*Math.sin(wd*t+Math.acos(z));}
  var d=Math.sqrt(alpha*alpha-w0*w0),s1=-alpha+d,s2=-alpha-d;
  return 1+s2/(s1-s2)*Math.exp(s1*t)+s1/(s2-s1)*Math.exp(s2*t);
}
function dampLabel(z){return Math.abs(z-1)<0.02?'Crit. Damped':z<1?'Underdamped':'Overdamped';}
function drawRLC(){
  var R=+document.getElementById('rlcR').value,Lm=+document.getElementById('rlcL').value,Cu=+document.getElementById('rlcC').value;
  document.getElementById('rlcRv').textContent=R;document.getElementById('rlcLv').textContent=Lm;document.getElementById('rlcCv').textContent=Cu;
  var L=Lm*1e-3,C=Cu*1e-6,w0=1/Math.sqrt(L*C);
  var aS=R/(2*L),aP=1/(2*R*C),zS=aS/w0,zP=aP/w0;
  var tMax=Math.max(5/aS,5/aP,6*Math.PI/w0);tMax=Math.min(tMax,2);
  var N=300,labels=[],sD=[],pD=[],ssLine=[];
  for(var i=0;i<=N;i++){var t=i*tMax/N;labels.push((t*1000).toFixed(1));sD.push(stepResp(aS,w0,t));pD.push(stepResp(aP,w0,t));ssLine.push(1);}
  var datasets=[
    {label:'Series (ζₛ='+zS.toFixed(3)+', '+dampLabel(zS)+')',data:sD,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Parallel (ζₚ='+zP.toFixed(3)+', '+dampLabel(zP)+')',data:pD,borderColor:'#E53935',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Steady State = 1',data:ssLine,borderColor:'#D4A017',borderWidth:1,borderDash:[6,4],pointRadius:0,fill:false}
  ];
  if(rlcChart){rlcChart.data.labels=labels;rlcChart.data.datasets=datasets;rlcChart.options.plugins.title.text='Series vs Parallel RLC Step Response';rlcChart.update();}
  else{rlcChart=new Chart(document.getElementById('rlcCanvas'),{type:'line',data:{labels:labels,datasets:datasets},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Series vs Parallel RLC Step Response',font:{size:15},color:'#333'},legend:{labels:{font:{size:11}}}},scales:{x:{title:{display:true,text:'Time (ms)',font:{size:12}},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized Voltage',font:{size:12}},min:-0.3,max:2.0,ticks:{font:{size:10}}}}}});}
  document.getElementById('rlcInfo').innerHTML='<b>ω₀ = '+(w0).toFixed(1)+' rad/s</b> &nbsp;|&nbsp; <span style="color:#5A3EED">Series: αₛ='+aS.toFixed(1)+', ζₛ='+zS.toFixed(3)+'</span> &nbsp;|&nbsp; <span style="color:#E53935">Parallel: αₚ='+aP.toFixed(1)+', ζₚ='+zP.toFixed(3)+'</span>';
}
drawRLC();
</script>

## The Characteristic Equation: Finding the Roots

To solve the homogeneous second-order equation (no forcing function), we assume a solution of the form \(x = Ae^{st}\). Substituting this into the differential equation gives us the **characteristic equation**:

\[s^2 + 2\alpha s + \omega_0^2 = 0\]

Using the quadratic formula:

\[s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\]

The nature of these roots—real, repeated, or complex—determines everything about how the circuit responds. This is where the magic happens!

| Condition | Root Type | Response Type |
|-----------|-----------|---------------|
| \(\alpha > \omega_0\) | Two distinct real roots | Overdamped |
| \(\alpha = \omega_0\) | Repeated real root | Critically damped |
| \(\alpha < \omega_0\) | Complex conjugate roots | Underdamped |

!!! tip "The Damping Sweet Spot"
    The relationship between α and ω₀ is the single most important factor in determining circuit behavior. It's like the Goldilocks problem of circuit design—too much damping is sluggish, too little is bouncy, and just right is critically damped.

## Natural Frequency: The Circuit's Heartbeat

The **natural frequency** \(\omega_0\) is the frequency at which an undamped circuit would oscillate forever. Think of it as the circuit's preferred rhythm—the tempo it naturally wants to follow when left to its own devices.

\[\omega_0 = \frac{1}{\sqrt{LC}} \text{ rad/s}\]

Or in Hertz:

\[f_0 = \frac{1}{2\pi\sqrt{LC}} \text{ Hz}\]

The natural frequency depends only on the energy storage elements (L and C), not on resistance. This makes physical sense: L and C determine how fast energy can slosh between the magnetic and electric fields, while R only determines how quickly that sloshing dies out.

**Physical intuition:**

- **Larger L** → More "inertia" in current changes → Lower frequency
- **Larger C** → More charge storage capacity → Lower frequency
- Think of a heavy pendulum (large L) swinging slowly, or a deep swimming pool (large C) with slow waves

| L (mH) | C (μF) | f₀ (Hz) | Audio Equivalent |
|--------|--------|---------|------------------|
| 100 | 100 | 50.3 | Low bass hum |
| 10 | 10 | 503 | Mid-range tone |
| 1 | 1 | 5,033 | High-pitched whistle |
| 0.1 | 0.1 | 50,330 | Ultrasonic |

#### Diagram: Natural Frequency Calculator

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:6px;">
<label style="font-size:0.9em;">L (mH): <input type="range" id="nfL" min="0.1" max="100" value="10" step="0.1" oninput="updateNF()"> <strong id="nfLval">10.0</strong></label>
<label style="font-size:0.9em;">C (μF): <input type="range" id="nfC" min="0.01" max="100" value="1" step="0.01" oninput="updateNF()"> <strong id="nfCval">1.00</strong></label>
</div>
<div id="nfResult" style="padding:10px;background:#F8F6FF;border-radius:8px;margin-bottom:8px;font-size:0.95em;"></div>
<canvas id="nfRawCanvas" width="690" height="250" style="display:block;width:100%;border-radius:6px;"></canvas>
</div>
<script>
function updateNF(){
  var Lm=+document.getElementById('nfL').value,Cu=+document.getElementById('nfC').value;
  document.getElementById('nfLval').textContent=Lm.toFixed(1);
  document.getElementById('nfCval').textContent=Cu.toFixed(2);
  var L=Lm*1e-3,C=Cu*1e-6,w0=1/Math.sqrt(L*C),f0=w0/(2*Math.PI),T=1/f0;
  var tUnit='ms',tDiv=1000;if(T<0.001){tUnit='μs';tDiv=1e6;}
  document.getElementById('nfResult').innerHTML=
    '<b>Formula:</b> ω₀ = 1/√(LC) = 1/√('+(L*C).toExponential(3)+') = <span style="color:#5A3EED;font-size:1.15em"><b>'+w0.toFixed(1)+' rad/s</b></span><br>'+
    '<b>f₀</b> = ω₀/(2π) = <span style="color:#D4A017;font-size:1.15em"><b>'+f0.toFixed(1)+' Hz</b></span> &nbsp;|&nbsp; <b>T</b> = '+(T*tDiv).toFixed(3)+' '+tUnit+'<br>'+
    '<b>L</b> = '+Lm+' mH &nbsp;|&nbsp; <b>C</b> = '+Cu+' μF';
  // Draw with raw Canvas 2D
  var cv=document.getElementById('nfRawCanvas'),ctx=cv.getContext('2d');
  var W=cv.width,H=cv.height,ml=55,mr=15,mt=30,mb=35,pw=W-ml-mr,ph=H-mt-mb;
  ctx.clearRect(0,0,W,H);
  // Background
  ctx.fillStyle='#FAFAFA';ctx.fillRect(ml,mt,pw,ph);
  // Grid
  ctx.strokeStyle='#E8E8E8';ctx.lineWidth=1;
  for(var g=0;g<=4;g++){var gy=mt+g*ph/4;ctx.beginPath();ctx.moveTo(ml,gy);ctx.lineTo(ml+pw,gy);ctx.stroke();}
  for(var g=0;g<=6;g++){var gx=ml+g*pw/6;ctx.beginPath();ctx.moveTo(gx,mt);ctx.lineTo(gx,mt+ph);ctx.stroke();}
  // Axes
  ctx.strokeStyle='#333';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(ml,mt);ctx.lineTo(ml,mt+ph);ctx.lineTo(ml+pw,mt+ph);ctx.stroke();
  // Zero line
  var zeroY=mt+ph/2;
  ctx.strokeStyle='#ccc';ctx.lineWidth=1;ctx.setLineDash([4,4]);
  ctx.beginPath();ctx.moveTo(ml,zeroY);ctx.lineTo(ml+pw,zeroY);ctx.stroke();
  ctx.setLineDash([]);
  // Plot waveform
  var tMax=3*T;
  ctx.strokeStyle='#5A3EED';ctx.lineWidth=2.5;ctx.beginPath();
  for(var i=0;i<=300;i++){
    var t=i*tMax/300,x=ml+i*pw/300,y=zeroY-Math.cos(w0*t)*(ph/2-5);
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  ctx.stroke();
  // Labels
  ctx.fillStyle='#333';ctx.font='12px Arial';ctx.textAlign='center';
  ctx.fillText('Time ('+tUnit+')',ml+pw/2,H-3);
  // X ticks
  ctx.font='10px Arial';
  for(var g=0;g<=6;g++){var tv=(g*tMax/6*tDiv).toFixed(1);ctx.fillText(tv,ml+g*pw/6,mt+ph+14);}
  // Y ticks
  ctx.textAlign='right';
  ctx.fillText('1.0',ml-4,mt+8);ctx.fillText('0',ml-4,zeroY+4);ctx.fillText('-1.0',ml-4,mt+ph+2);
  // Y label
  ctx.save();ctx.translate(12,mt+ph/2);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.font='12px Arial';ctx.fillText('Amplitude',0,0);ctx.restore();
  // Title
  ctx.fillStyle='#333';ctx.font='bold 13px Arial';ctx.textAlign='center';
  ctx.fillText('Undamped Oscillation at f₀ = '+f0.toFixed(1)+' Hz  (T = '+(T*tDiv).toFixed(2)+' '+tUnit+')',W/2,18);
}
updateNF();
</script>

## Damping Ratio: How Quickly the Drama Fades

The **damping ratio** \(\zeta\) (Greek letter "zeta") is the dimensionless quantity that tells you how heavily damped a circuit is. It's defined as:

\[\zeta = \frac{\alpha}{\omega_0}\]

For a series RLC circuit:

\[\zeta = \frac{R}{2}\sqrt{\frac{C}{L}}\]

For a parallel RLC circuit:

\[\zeta = \frac{1}{2R}\sqrt{\frac{L}{C}}\]

The damping ratio is the single number that classifies circuit response:

| Damping Ratio | Condition | Response Type | Behavior |
|---------------|-----------|---------------|----------|
| \(\zeta > 1\) | \(\alpha > \omega_0\) | Overdamped | Slow, no oscillation |
| \(\zeta = 1\) | \(\alpha = \omega_0\) | Critically damped | Fastest without overshoot |
| \(0 < \zeta < 1\) | \(\alpha < \omega_0\) | Underdamped | Oscillation with decay |
| \(\zeta = 0\) | \(\alpha = 0\) | Undamped | Endless oscillation |

!!! note "Why Dimensionless Ratios Matter"
    The damping ratio ζ is powerful because it's dimensionless—it works the same whether you're analyzing tiny MEMS devices or massive power systems. A ζ of 0.5 means the same relative behavior regardless of the actual frequency or component values.

## Overdamped Response: The Cautious Approach

When \(\zeta > 1\) (or \(\alpha > \omega_0\)), the circuit is **overdamped**. The characteristic equation has two distinct negative real roots:

\[s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\]

Both roots are negative (ensuring stability), but they're different values. The general solution is:

\[x(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}\]

**Characteristics of overdamped response:**

- No oscillation occurs
- Returns to equilibrium slowly
- The response "crawls" toward its final value
- One exponential dominates at first, then the slower one takes over

Think of overdamped response like a door closer that's been adjusted too tight—the door closes slowly without bouncing, but it takes forever to fully close.

**When overdamping is desirable:**

- Precision instruments that shouldn't overshoot
- Safety systems where oscillation could be dangerous
- Damping mechanical vibrations in sensitive equipment

#### Diagram: Overdamped Step Response

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:6px;">
<label style="font-size:0.9em;">ζ: <input type="range" id="odZ" min="1.05" max="5" value="2" step="0.05" oninput="drawOD()"> <strong id="odZv">2.00</strong></label>
<label style="font-size:0.9em;">ω₀: <input type="range" id="odW" min="1" max="20" value="5" step="0.5" oninput="drawOD()"> <strong id="odWv">5.0</strong></label>
</div>
<canvas id="overdampedCanvas" width="690" height="320"></canvas>
<div id="odInfo" style="font-size:0.85em;margin-top:4px;color:#555;"></div>
</div>
<script>
var odChart=null;
function drawOD(){
  var z=+document.getElementById('odZ').value,w0=+document.getElementById('odW').value;
  document.getElementById('odZv').textContent=z.toFixed(2);document.getElementById('odWv').textContent=w0.toFixed(1);
  var a=z*w0,d=Math.sqrt(a*a-w0*w0),s1=-a+d,s2=-a-d;
  var tMax=5/Math.abs(s1),N=250,labels=[],data=[],ssLine=[];
  for(var i=0;i<=N;i++){var t=i*tMax/N;labels.push(t.toFixed(3));
    data.push(1+s2/(s1-s2)*Math.exp(s1*t)+s1/(s2-s1)*Math.exp(s2*t));ssLine.push(1);}
  var ds=[
    {label:'Overdamped Response (ζ='+z.toFixed(2)+')',data:data,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Steady State = 1',data:ssLine,borderColor:'#D4A017',borderWidth:1,borderDash:[6,4],pointRadius:0,fill:false}
  ];
  if(odChart){odChart.data.labels=labels;odChart.data.datasets=ds;odChart.update();}
  else{odChart=new Chart(document.getElementById('overdampedCanvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Overdamped Step Response',font:{size:14},color:'#333'},legend:{labels:{font:{size:11}}}},scales:{x:{title:{display:true,text:'Time (s)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Voltage (V)'},min:0,max:1.15}}}});}
  document.getElementById('odInfo').innerHTML='s₁ = '+s1.toFixed(2)+' &nbsp;|&nbsp; s₂ = '+s2.toFixed(2)+' &nbsp;|&nbsp; α = '+a.toFixed(2)+' &nbsp;|&nbsp; No oscillation — two real negative roots';
}
drawOD();
</script>

## Underdamped Response: The Exciting One

When \(0 < \zeta < 1\) (or \(\alpha < \omega_0\)), the circuit is **underdamped**. Now the characteristic equation has complex conjugate roots:

\[s_{1,2} = -\alpha \pm j\omega_d\]

Where \(\omega_d\) is the **damped natural frequency**:

\[\omega_d = \omega_0\sqrt{1 - \zeta^2} = \sqrt{\omega_0^2 - \alpha^2}\]

The general solution is:

\[x(t) = e^{-\alpha t}(A\cos\omega_d t + B\sin\omega_d t)\]

Or equivalently:

\[x(t) = Ce^{-\alpha t}\cos(\omega_d t + \phi)\]

**Characteristics of underdamped response:**

- Oscillates around the final value
- Amplitude decays exponentially with time constant \(1/\alpha\)
- Frequency of oscillation is \(\omega_d\), not \(\omega_0\)
- Overshoots the target before settling

The underdamped response is what gives RLC circuits their musical quality. It's the reason bells ring, guitar strings vibrate, and radio tuners can select stations. This is where circuits get *interesting*.

**The damped frequency relationship:**

\[\omega_d = \omega_0\sqrt{1 - \zeta^2}\]

| Damping Ratio ζ | ω_d / ω₀ | Percent of Natural Frequency |
|-----------------|----------|------------------------------|
| 0.1 | 0.995 | 99.5% |
| 0.3 | 0.954 | 95.4% |
| 0.5 | 0.866 | 86.6% |
| 0.7 | 0.714 | 71.4% |
| 0.9 | 0.436 | 43.6% |

Notice that light damping barely affects the frequency, but heavy damping significantly reduces it.

#### Diagram: Underdamped Oscillation Anatomy

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:6px;">
<label style="font-size:0.9em;">ζ: <input type="range" id="udZ" min="0.02" max="0.95" value="0.2" step="0.02" oninput="drawUD()"> <strong id="udZv">0.20</strong></label>
<label style="font-size:0.9em;">ω₀: <input type="range" id="udW" min="1" max="20" value="5" step="0.5" oninput="drawUD()"> <strong id="udWv">5.0</strong></label>
</div>
<canvas id="underdampedCanvas" width="690" height="340"></canvas>
<div id="udInfo" style="font-size:0.85em;margin-top:4px;padding:6px;background:#FFF8E1;border-radius:6px;"></div>
</div>
<script>
var udChart=null;
function drawUD(){
  var z=+document.getElementById('udZ').value,w0=+document.getElementById('udW').value;
  document.getElementById('udZv').textContent=z.toFixed(2);document.getElementById('udWv').textContent=w0.toFixed(1);
  var a=z*w0,wd=w0*Math.sqrt(1-z*z),phi=Math.acos(z);
  var os=100*Math.exp(-Math.PI*z/Math.sqrt(1-z*z)),ts=4/(z*w0);
  var tMax=Math.max(ts*1.5,8/a),N=350,labels=[],resp=[],envU=[],envL=[],ssLine=[];
  for(var i=0;i<=N;i++){var t=i*tMax/N;labels.push(t.toFixed(3));
    var e=Math.exp(-a*t)/Math.sqrt(1-z*z);
    resp.push(1-e*Math.sin(wd*t+phi));envU.push(1+e);envL.push(1-e);ssLine.push(1);}
  var ds=[
    {label:'Response (ζ='+z.toFixed(2)+')',data:resp,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Decay Envelope',data:envU,borderColor:'#D4A017',borderWidth:1.5,borderDash:[6,4],pointRadius:0,fill:false},
    {label:'',data:envL,borderColor:'#D4A017',borderWidth:1.5,borderDash:[6,4],pointRadius:0,fill:false},
    {label:'Steady State',data:ssLine,borderColor:'#43A047',borderWidth:1,borderDash:[4,4],pointRadius:0,fill:false}
  ];
  if(udChart){udChart.data.labels=labels;udChart.data.datasets=ds;udChart.options.plugins.title.text='Underdamped Oscillation Anatomy';udChart.update();}
  else{udChart=new Chart(document.getElementById('underdampedCanvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Underdamped Oscillation Anatomy',font:{size:14},color:'#333'},legend:{labels:{font:{size:10},filter:function(item){return item.text!=='';}}}},scales:{x:{title:{display:true,text:'Time (s)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Voltage (V)'},min:-0.4,max:2.2}}}});}
  document.getElementById('udInfo').innerHTML='<b>Overshoot:</b> <span style="color:#E53935">'+os.toFixed(1)+'%</span> &nbsp;|&nbsp; <b>Settling Time (2%):</b> '+ts.toFixed(3)+' s &nbsp;|&nbsp; <b>ω_d:</b> '+wd.toFixed(2)+' rad/s &nbsp;|&nbsp; <b>f_d:</b> '+(wd/(2*Math.PI)).toFixed(2)+' Hz';
}
drawUD();
</script>

### Overshoot and Settling Time

Two key performance metrics for underdamped systems:

**Percent Overshoot (PO):**

\[PO = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%\]

| ζ | Percent Overshoot |
|---|-------------------|
| 0.1 | 72.9% |
| 0.3 | 37.2% |
| 0.5 | 16.3% |
| 0.7 | 4.6% |
| 0.9 | 0.2% |

**Settling Time** (to within 2% of final value):

\[t_s \approx \frac{4}{\alpha} = \frac{4}{\zeta\omega_0}\]

This creates a design trade-off: lower damping gives faster response but more overshoot; higher damping reduces overshoot but slows things down.

## Critically Damped Response: The Goldilocks Zone

When \(\zeta = 1\) (or \(\alpha = \omega_0\)), the circuit is **critically damped**. This is the boundary case with a repeated root:

\[s_1 = s_2 = -\alpha = -\omega_0\]

The general solution is:

\[x(t) = (A + Bt)e^{-\omega_0 t}\]

**Why critical damping is special:**

- Fastest possible return to equilibrium *without* overshoot
- Just barely on the edge of oscillation
- Optimal for many applications where overshoot is unacceptable
- The "perfect" door closer

**Characteristics:**

- No oscillation
- May appear to overshoot very slightly due to initial conditions, but mathematically returns to equilibrium faster than overdamped
- Response rises quickly then smoothly approaches final value

Critical damping is often the design target for:

- Automotive suspension systems
- Galvanometers and analog meters
- Camera stabilization systems
- Precision positioning systems

#### Diagram: Three Damping Regimes Comparison

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:6px;">
<label style="font-size:0.9em;">ω₀: <input type="range" id="dcW" min="1" max="20" value="5" step="0.5" oninput="drawDC()"> <strong id="dcWv">5.0</strong></label>
<label style="font-size:0.9em;">ζ (under): <input type="range" id="dcZu" min="0.05" max="0.9" value="0.2" step="0.05" oninput="drawDC()"> <strong id="dcZuv">0.20</strong></label>
<label style="font-size:0.9em;">ζ (over): <input type="range" id="dcZo" min="1.5" max="5" value="3" step="0.1" oninput="drawDC()"> <strong id="dcZov">3.0</strong></label>
</div>
<canvas id="dampingCanvas" width="690" height="340"></canvas>
</div>
<script>
var dcChart=null;
function drawDC(){
  var w0=+document.getElementById('dcW').value,zu=+document.getElementById('dcZu').value,zo=+document.getElementById('dcZo').value;
  document.getElementById('dcWv').textContent=w0.toFixed(1);document.getElementById('dcZuv').textContent=zu.toFixed(2);document.getElementById('dcZov').textContent=zo.toFixed(1);
  var tMax=Math.max(4/(zu*w0),4/w0,4/(zo*w0)),N=300,labels=[],under=[],cr=[],over=[],ss=[];
  for(var i=0;i<=N;i++){var t=i*tMax/N;labels.push(t.toFixed(3));
    var au=zu*w0,wdu=w0*Math.sqrt(1-zu*zu);
    under.push(1-(1/Math.sqrt(1-zu*zu))*Math.exp(-au*t)*Math.sin(wdu*t+Math.acos(zu)));
    cr.push(1-(1+w0*t)*Math.exp(-w0*t));
    var ao=zo*w0,d=Math.sqrt(ao*ao-w0*w0),s1=-ao+d,s2=-ao-d;
    over.push(1+s2/(s1-s2)*Math.exp(s1*t)+s1/(s2-s1)*Math.exp(s2*t));ss.push(1);}
  var ds=[
    {label:'Underdamped (ζ='+zu.toFixed(2)+') — oscillates',data:under,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Critically Damped (ζ=1.0) — fastest, no overshoot',data:cr,borderColor:'#D4A017',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Overdamped (ζ='+zo.toFixed(1)+') — slow, no oscillation',data:over,borderColor:'#E53935',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Steady State',data:ss,borderColor:'#999',borderWidth:1,borderDash:[4,4],pointRadius:0,fill:false}
  ];
  if(dcChart){dcChart.data.labels=labels;dcChart.data.datasets=ds;dcChart.update();}
  else{dcChart=new Chart(document.getElementById('dampingCanvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Three Damping Regimes Comparison',font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Time (s)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Voltage (V)'},min:-0.3,max:2.0}}}});}
}
drawDC();
</script>

## Resonant Frequency: When Circuits Sing

**Resonant frequency** \(\omega_r\) is the frequency at which a circuit's response is maximum. For a series RLC circuit driven by a sinusoidal source, resonance occurs when the inductive reactance equals the capacitive reactance:

\[X_L = X_C\]
\[\omega_r L = \frac{1}{\omega_r C}\]
\[\omega_r = \frac{1}{\sqrt{LC}} = \omega_0\]

At resonance in a series RLC circuit:

- Impedance is minimum (equals R)
- Current is maximum
- Voltage across L and C can exceed source voltage!
- Phase angle is zero (current in phase with voltage)

For a parallel RLC circuit at resonance:

- Impedance is maximum
- Current from source is minimum
- Circulating current between L and C can exceed source current

**The resonance phenomenon:**

At resonance, energy continuously sloshes between the inductor and capacitor. In each half-cycle:
1. C releases energy → L absorbs energy (as magnetic field)
2. L releases energy → C absorbs energy (as electric field)

With no losses (R = 0), this would continue forever. With resistance, some energy is dissipated each cycle, and the source replenishes it.

| Circuit Type | At Resonance | Impedance | Current |
|--------------|--------------|-----------|---------|
| Series RLC | Z = R (minimum) | I = V/R (maximum) | V_L = V_C (cancel) |
| Parallel RLC | Z → ∞ (maximum) | I → 0 (minimum) | I_L = I_C (cancel) |

#### Diagram: Series RLC Resonance Explorer

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:6px;">
<label style="font-size:0.9em;">R (Ω): <input type="range" id="resR" min="1" max="200" value="10" step="1" oninput="drawRes()"> <strong id="resRv">10</strong></label>
<label style="font-size:0.9em;">L (mH): <input type="range" id="resL" min="1" max="100" value="10" step="1" oninput="drawRes()"> <strong id="resLv">10</strong></label>
<label style="font-size:0.9em;">C (μF): <input type="range" id="resC" min="0.1" max="10" value="1" step="0.1" oninput="drawRes()"> <strong id="resCv">1.0</strong></label>
</div>
<canvas id="resonanceCanvas" width="690" height="340"></canvas>
<div id="resInfo" style="font-size:0.9em;margin-top:4px;padding:6px;background:#F8F6FF;border-radius:6px;"></div>
</div>
<script>
var resChart=null;
function drawRes(){
  var R=+document.getElementById('resR').value,Lm=+document.getElementById('resL').value,Cu=+document.getElementById('resC').value;
  document.getElementById('resRv').textContent=R;document.getElementById('resLv').textContent=Lm;document.getElementById('resCv').textContent=Cu.toFixed(1);
  var L=Lm*1e-3,C=Cu*1e-6,f0=1/(2*Math.PI*Math.sqrt(L*C)),Q=(1/R)*Math.sqrt(L/C),BW=f0/Q;
  var fMin=f0*0.05,fMax=f0*20,N=350,labels=[],mag=[],db3Line=[];
  var peak=0;
  for(var i=0;i<=N;i++){var f=fMin*Math.pow(fMax/fMin,i/N);labels.push(f.toFixed(0));
    var XL=2*Math.PI*f*L,XC=1/(2*Math.PI*f*C),H=1/Math.sqrt(R*R+(XL-XC)*(XL-XC));
    if(H>peak)peak=H;mag.push(H);}
  for(var i=0;i<mag.length;i++){mag[i]/=peak;db3Line.push(0.707);}
  var ds=[
    {label:'Normalized |I/V|',data:mag,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'-3dB (0.707)',data:db3Line,borderColor:'#E53935',borderWidth:1,borderDash:[5,5],pointRadius:0,fill:false}
  ];
  if(resChart){resChart.data.labels=labels;resChart.data.datasets=ds;resChart.update();}
  else{resChart=new Chart(document.getElementById('resonanceCanvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Series RLC Resonance Explorer',font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Frequency (Hz)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized |I|'},min:0,max:1.15}}}});}
  document.getElementById('resInfo').innerHTML='<b style="color:#5A3EED">f₀ = '+f0.toFixed(1)+' Hz</b> &nbsp;|&nbsp; <b style="color:#D4A017">Q = '+Q.toFixed(2)+'</b> &nbsp;|&nbsp; <b>BW = '+BW.toFixed(1)+' Hz</b> &nbsp;|&nbsp; f_low ≈ '+(f0-BW/2).toFixed(1)+' Hz, f_high ≈ '+(f0+BW/2).toFixed(1)+' Hz';
}
drawRes();
</script>

## Quality Factor: How Sharp is the Resonance?

The **quality factor** Q is a dimensionless parameter that characterizes the sharpness of resonance and the efficiency of energy storage. Higher Q means sharper resonance peaks and lower energy loss per cycle.

**Definition for series RLC:**

\[Q = \frac{\omega_0 L}{R} = \frac{1}{\omega_0 CR} = \frac{1}{R}\sqrt{\frac{L}{C}}\]

**Definition for parallel RLC:**

\[Q = \omega_0 CR = \frac{R}{\omega_0 L} = R\sqrt{\frac{C}{L}}\]

Notice that Q has opposite relationships with R for series vs. parallel circuits!

**Relationships with damping:**

\[Q = \frac{1}{2\zeta}\]

\[\zeta = \frac{1}{2Q}\]

| Damping Ratio ζ | Quality Factor Q | Response Type |
|-----------------|------------------|---------------|
| 0.05 | 10 | Highly underdamped |
| 0.1 | 5 | Underdamped |
| 0.25 | 2 | Moderately underdamped |
| 0.5 | 1 | Boundary |
| 1.0 | 0.5 | Critically damped |

**Physical interpretations of Q:**

1. **Energy ratio:**
   \[Q = 2\pi \times \frac{\text{Energy stored}}{\text{Energy dissipated per cycle}}\]

2. **Bandwidth relationship:**
   \[Q = \frac{f_0}{BW}\]
   Where BW is the 3dB bandwidth (the frequency range where response is above 70.7% of peak)

3. **Number of oscillations:**
   A high-Q circuit oscillates many times before its amplitude decays significantly

**Bandwidth and selectivity:**

\[BW = \frac{f_0}{Q} = \frac{\omega_0}{Q} \text{ (rad/s)}\]

| Q | f₀ = 1 MHz | Bandwidth | Application |
|---|------------|-----------|-------------|
| 10 | 100 kHz | Wide, poor selectivity | Audio filter |
| 100 | 10 kHz | Moderate selectivity | IF stage |
| 1000 | 1 kHz | Sharp selectivity | Crystal oscillator |
| 10000 | 100 Hz | Very sharp | Atomic clock |

!!! warning "Q and Practical Limits"
    Very high Q values are difficult to achieve with real components because all inductors have some resistance and all capacitors have some leakage. Practical Q factors for discrete L-C circuits rarely exceed 100-200. For higher Q, engineers use quartz crystals or mechanical resonators.

#### Diagram: Quality Factor and Bandwidth

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:6px;">
<label style="font-size:0.9em;">Highlight Q: <input type="range" id="qfQ" min="1" max="100" value="10" step="1" oninput="drawQF()"> <strong id="qfQv">10</strong></label>
<label style="font-size:0.9em;">f₀ (Hz): <input type="range" id="qfF" min="100" max="10000" value="1000" step="100" oninput="drawQF()"> <strong id="qfFv">1000</strong></label>
</div>
<canvas id="qfactorCanvas" width="690" height="340"></canvas>
<div id="qfInfo" style="font-size:0.9em;margin-top:4px;padding:6px;background:#FFF8E1;border-radius:6px;"></div>
</div>
<script>
var qfChart=null;
function drawQF(){
  var Qh=+document.getElementById('qfQ').value,f0=+document.getElementById('qfF').value;
  document.getElementById('qfQv').textContent=Qh;document.getElementById('qfFv').textContent=f0;
  var fMin=f0*0.1,fMax=f0*10,N=300,labels=[];
  var fixedQ=[{q:2,c:'#E5393588'},{q:10,c:'#43A04788'},{q:50,c:'#FF980088'}];
  var ds=fixedQ.map(function(qo){var data=[];
    for(var i=0;i<=N;i++){var f=fMin*Math.pow(fMax/fMin,i/N);if(qo===fixedQ[0])labels.push(f.toFixed(0));
      var r=f/f0-f0/f;data.push(1/Math.sqrt(1+qo.q*qo.q*r*r));}
    return{label:'Q='+qo.q,data:data,borderColor:qo.c,borderWidth:1.5,pointRadius:0,fill:false};});
  // Highlighted Q
  var hData=[],db3=[];
  for(var i=0;i<=N;i++){var f=fMin*Math.pow(fMax/fMin,i/N),r=f/f0-f0/f;hData.push(1/Math.sqrt(1+Qh*Qh*r*r));db3.push(0.707);}
  ds.push({label:'Highlight Q='+Qh,data:hData,borderColor:'#5A3EED',borderWidth:3,pointRadius:0,fill:false});
  ds.push({label:'-3dB (0.707)',data:db3,borderColor:'#E53935',borderWidth:1,borderDash:[5,5],pointRadius:0,fill:false});
  if(qfChart){qfChart.data.labels=labels;qfChart.data.datasets=ds;qfChart.update();}
  else{qfChart=new Chart(document.getElementById('qfactorCanvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Quality Factor and Bandwidth',font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Frequency (Hz)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized Response'},min:0,max:1.1}}}});}
  var BW=f0/Qh;
  document.getElementById('qfInfo').innerHTML='<b style="color:#5A3EED">Q = '+Qh+'</b> &nbsp;→&nbsp; <b>BW = '+BW.toFixed(1)+' Hz</b> &nbsp;|&nbsp; ζ = '+(1/(2*Qh)).toFixed(4)+' &nbsp;|&nbsp; Higher Q = sharper peak, narrower bandwidth';
}
drawQF();
</script>

## Pulse Response: Ringing and Transients

The **pulse response** is how a circuit responds to a sudden rectangular pulse input rather than a step. This is crucial for digital circuits where signals switch between 0 and 1.

When an underdamped RLC circuit receives a pulse:

1. **Leading edge:** Circuit begins oscillating in response to the step-up
2. **Pulse duration:** Oscillations continue, possibly settling partially
3. **Trailing edge:** Second disturbance adds to (or cancels) existing oscillation
4. **Ring-out:** Damped oscillations continue after pulse ends

**Why ringing matters:**

- In digital circuits, ringing can cause false triggers
- Oscillations might be interpreted as additional pulses
- High-speed digital buses require careful impedance matching to minimize ringing

**Pulse width effects:**

| Pulse Width vs Period | Result |
|----------------------|--------|
| Much shorter than T_d | Minimal energy transfer, weak response |
| Equal to T_d/2 | Maximum energy transfer, strongest ringing |
| Much longer than T_d | Settles during pulse, two separate step responses |

#### Diagram: Pulse Response and Ringing

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:6px;">
<label style="font-size:0.9em;">ζ: <input type="range" id="prZ" min="0.02" max="0.5" value="0.1" step="0.02" oninput="drawPR()"> <strong id="prZv">0.10</strong></label>
<label style="font-size:0.9em;">ω₀: <input type="range" id="prW" min="5" max="30" value="10" step="1" oninput="drawPR()"> <strong id="prWv">10</strong></label>
<label style="font-size:0.9em;">Pulse (s): <input type="range" id="prP" min="0.1" max="2" value="0.5" step="0.05" oninput="drawPR()"> <strong id="prPv">0.50</strong></label>
</div>
<canvas id="pulseCanvas" width="690" height="340"></canvas>
<div id="prInfo" style="font-size:0.85em;margin-top:4px;color:#555;"></div>
</div>
<script>
var prChart=null;
function drawPR(){
  var z=+document.getElementById('prZ').value,w0=+document.getElementById('prW').value,pw=+document.getElementById('prP').value;
  document.getElementById('prZv').textContent=z.toFixed(2);document.getElementById('prWv').textContent=w0;document.getElementById('prPv').textContent=pw.toFixed(2);
  var a=z*w0,wd=w0*Math.sqrt(1-z*z),phi=Math.acos(z);
  function stp(t){if(t<0)return 0;return 1-(1/Math.sqrt(1-z*z))*Math.exp(-a*t)*Math.sin(wd*t+phi);}
  var tMax=Math.max(pw+5/a,3),N=400,labels=[],pulse=[],resp=[],zero=[];
  for(var i=0;i<=N;i++){var t=i*tMax/N;labels.push(t.toFixed(3));
    pulse.push(t>=0&&t<=pw?1:0);resp.push(stp(t)-stp(t-pw));zero.push(0);}
  var ds=[
    {label:'Input Pulse',data:pulse,borderColor:'#D4A017',borderWidth:2,pointRadius:0,fill:false,stepped:true},
    {label:'RLC Output (ringing)',data:resp,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'',data:zero,borderColor:'#ccc',borderWidth:0.5,borderDash:[2,2],pointRadius:0,fill:false}
  ];
  if(prChart){prChart.data.labels=labels;prChart.data.datasets=ds;prChart.update();}
  else{prChart=new Chart(document.getElementById('pulseCanvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Pulse Response and Ringing',font:{size:14},color:'#333'},legend:{labels:{font:{size:10},filter:function(it){return it.text!=='';}}}},scales:{x:{title:{display:true,text:'Time (s)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Amplitude'},min:-1.8,max:2.2}}}});}
  document.getElementById('prInfo').innerHTML='ω_d = '+wd.toFixed(2)+' rad/s &nbsp;|&nbsp; Ringing period ≈ '+(2*Math.PI/wd).toFixed(3)+' s &nbsp;|&nbsp; Settling ~'+(4/a).toFixed(2)+' s after pulse ends';
}
drawPR();
</script>

## Energy Exchange in RLC Circuits

The oscillatory behavior of RLC circuits comes from energy continuously exchanging between the electric field of the capacitor and the magnetic field of the inductor.

**Energy expressions:**

- Capacitor energy: \(W_C = \frac{1}{2}Cv^2\)
- Inductor energy: \(W_L = \frac{1}{2}Li^2\)
- Total energy: \(W_{total} = W_C + W_L\)

In an ideal LC circuit (no resistance):

- Total energy remains constant
- Energy oscillates completely between L and C
- When all energy is in C: maximum voltage, zero current
- When all energy is in L: maximum current, zero voltage

With resistance:

- Total energy decreases exponentially
- Energy is dissipated as heat in R
- Rate of energy loss: \(P_R = i^2R\)

#### Diagram: Energy Exchange Animation

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:6px;align-items:center;">
<label style="font-size:0.9em;">ζ: <input type="range" id="enZ" min="0.02" max="0.5" value="0.1" step="0.02" oninput="resetEn()"> <strong id="enZv">0.10</strong></label>
<label style="font-size:0.9em;">ω₀: <input type="range" id="enW" min="2" max="15" value="5" step="0.5" oninput="resetEn()"> <strong id="enWv">5.0</strong></label>
<button id="enBtn" onclick="toggleEn()" style="padding:4px 14px;border:1px solid #5A3EED;border-radius:4px;background:#F8F6FF;color:#5A3EED;cursor:pointer;font-weight:600;">▶ Play</button>
</div>
<canvas id="energyCanvas" width="690" height="350"></canvas>
<div style="display:flex;gap:20px;margin-top:6px;">
<div style="flex:1;text-align:center;padding:8px;background:#E3F2FD;border-radius:6px;"><strong>Capacitor E<sub>C</sub></strong><br><span id="enEc" style="font-size:1.3em;color:#1565C0;">100%</span></div>
<div style="flex:1;text-align:center;padding:8px;background:#FFF3E0;border-radius:6px;"><strong>Inductor E<sub>L</sub></strong><br><span id="enEl" style="font-size:1.3em;color:#E65100;">0%</span></div>
<div style="flex:1;text-align:center;padding:8px;background:#FFEBEE;border-radius:6px;"><strong>Dissipated</strong><br><span id="enEd" style="font-size:1.3em;color:#C62828;">0%</span></div>
</div>
</div>
<script>
var enChart=null,enAnim=null,enIdx=0,enPlaying=false;
var enData={labels:[],ec:[],el:[],etot:[]};
function computeEn(){
  var z=+document.getElementById('enZ').value,w0=+document.getElementById('enW').value;
  document.getElementById('enZv').textContent=z.toFixed(2);document.getElementById('enWv').textContent=w0.toFixed(1);
  var a=z*w0,wd=w0*Math.sqrt(1-z*z),L=1,C=1/(w0*w0),V0=10,E0=0.5*C*V0*V0;
  var tMax=8/a,N=400;enData={labels:[],ec:[],el:[],etot:[]};
  for(var i=0;i<=N;i++){var t=i*tMax/N;enData.labels.push(t.toFixed(3));
    var v=V0*Math.exp(-a*t)*Math.cos(wd*t);
    var dvdt=V0*Math.exp(-a*t)*(-a*Math.cos(wd*t)-wd*Math.sin(wd*t));
    var iL=C*dvdt,Ec=0.5*C*v*v/E0,El=0.5*L*iL*iL/E0;
    enData.ec.push(Ec);enData.el.push(El);enData.etot.push(Ec+El);}
}
function drawEnFrame(){
  var ec=enData.ec.slice(0,enIdx+1),el=enData.el.slice(0,enIdx+1),et=enData.etot.slice(0,enIdx+1),lb=enData.labels.slice(0,enIdx+1);
  // Pad rest with null
  var pad=enData.labels.length-lb.length;
  var ds=[
    {label:'Capacitor Energy',data:ec.concat(Array(pad).fill(null)),borderColor:'#2196F3',backgroundColor:'rgba(33,150,243,0.2)',borderWidth:2,pointRadius:0,fill:true},
    {label:'Inductor Energy',data:el.concat(Array(pad).fill(null)),borderColor:'#FF9800',backgroundColor:'rgba(255,152,0,0.2)',borderWidth:2,pointRadius:0,fill:true},
    {label:'Total Energy (decaying)',data:et.concat(Array(pad).fill(null)),borderColor:'#E53935',borderWidth:1.5,borderDash:[5,5],pointRadius:0,fill:false}
  ];
  if(enChart){enChart.data.labels=enData.labels;enChart.data.datasets=ds;enChart.update();}
  else{enChart=new Chart(document.getElementById('energyCanvas'),{type:'line',data:{labels:enData.labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Energy Exchange in RLC Circuit (animated)',font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Time (s)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized Energy'},min:0,max:1.1}}}});}
  // Update bars
  var ecv=enData.ec[enIdx]||0,elv=enData.el[enIdx]||0,etv=enData.etot[enIdx]||1,dis=Math.max(0,1-etv);
  document.getElementById('enEc').textContent=(ecv*100).toFixed(0)+'%';
  document.getElementById('enEl').textContent=(elv*100).toFixed(0)+'%';
  document.getElementById('enEd').textContent=(dis*100).toFixed(0)+'%';
}
function stepEn(){if(!enPlaying)return;enIdx=Math.min(enIdx+2,enData.labels.length-1);drawEnFrame();if(enIdx<enData.labels.length-1)enAnim=requestAnimationFrame(stepEn);else{enPlaying=false;document.getElementById('enBtn').textContent='↺ Replay';}}
function toggleEn(){if(enPlaying){enPlaying=false;cancelAnimationFrame(enAnim);document.getElementById('enBtn').textContent='▶ Play';}else{if(enIdx>=enData.labels.length-1)enIdx=0;enPlaying=true;document.getElementById('enBtn').textContent='⏸ Pause';stepEn();}}
function resetEn(){enPlaying=false;cancelAnimationFrame(enAnim);document.getElementById('enBtn').textContent='▶ Play';computeEn();enIdx=enData.labels.length-1;drawEnFrame();}
computeEn();enIdx=enData.labels.length-1;drawEnFrame();
</script>

## Design Applications

Understanding second-order systems empowers you to design circuits for specific behaviors:

### Radio Tuning

Radio receivers use LC resonance to select stations. The resonant frequency determines which radio frequency passes through:

\[f_0 = \frac{1}{2\pi\sqrt{LC}}\]

By varying C (using a variable capacitor), you "tune" to different frequencies. Higher Q gives better selectivity between adjacent stations.

### Shock Absorbers and Mechanical Analogy

Mechanical systems follow the same mathematics! A mass-spring-damper system is described by:

\[m\frac{d^2x}{dt^2} + b\frac{dx}{dt} + kx = F(t)\]

Comparing to the electrical equation:

| Electrical | Mechanical |
|------------|------------|
| L (inductance) | m (mass) |
| R (resistance) | b (damping coefficient) |
| 1/C (elastance) | k (spring constant) |
| Voltage V | Force F |
| Current i | Velocity v |
| Charge q | Displacement x |

Car suspension is designed for critical damping (ζ ≈ 1) so the car returns to level quickly after hitting a bump without bouncing.

### Audio Crossover Networks

Speaker crossover networks use RLC filters to direct different frequencies to appropriate drivers:

- Low frequencies → Woofer (large speaker)
- High frequencies → Tweeter (small speaker)

The Q factor determines how sharply the crossover separates frequencies.

### Bandpass Filters

A series RLC circuit naturally acts as a bandpass filter, passing frequencies near resonance while attenuating others. The bandwidth and center frequency are controlled by component selection.

| Application | Typical Q | Bandwidth |
|-------------|-----------|-----------|
| Audio tone control | 1-5 | Wide |
| Radio IF stage | 20-50 | Moderate |
| Frequency reference | 100-1000 | Narrow |

## Practical Considerations

### Real Component Limitations

Ideal RLC analysis assumes perfect components, but real parts have limitations:

**Inductors:**
- Series resistance (wire resistance)
- Self-capacitance (between windings)
- Saturation at high currents

**Capacitors:**
- Equivalent series resistance (ESR)
- Equivalent series inductance (ESL)
- Leakage current
- Voltage rating limits

**Resistors:**
- Temperature coefficient
- Parasitic inductance at high frequencies

These parasitics can cause unexpected resonances or damping in high-frequency circuits.

### Initial Conditions

The complete solution to a second-order equation requires two initial conditions (because it's second-order). Typically:

- Initial voltage: \(v(0)\) or \(v_C(0)\)
- Initial current: \(i(0)\) or \(i_L(0)\)

These determine the constants in the general solution and can dramatically affect the transient response.

## Key Formulas Summary

| Parameter | Series RLC | Parallel RLC |
|-----------|------------|--------------|
| Damping coefficient α | R/2L | 1/2RC |
| Natural frequency ω₀ | 1/√(LC) | 1/√(LC) |
| Damping ratio ζ | (R/2)√(C/L) | (1/2R)√(L/C) |
| Quality factor Q | (1/R)√(L/C) | R√(C/L) |
| Resonant frequency ω_r | 1/√(LC) | 1/√(LC) |
| Bandwidth BW | R/L | 1/RC |

**Response classification:**

- Overdamped: \(\zeta > 1\), roots = \(-\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\)
- Critically damped: \(\zeta = 1\), root = \(-\omega_0\) (repeated)
- Underdamped: \(\zeta < 1\), roots = \(-\alpha \pm j\omega_d\), where \(\omega_d = \omega_0\sqrt{1-\zeta^2}\)

## Self-Check Questions

??? question "1. What determines whether a circuit is overdamped, underdamped, or critically damped?"
    The relationship between the damping coefficient α and the natural frequency ω₀ determines the damping type:

    - **Overdamped:** α > ω₀ (or ζ > 1)
    - **Critically damped:** α = ω₀ (or ζ = 1)
    - **Underdamped:** α < ω₀ (or ζ < 1)

    For a series RLC circuit, α = R/2L and ω₀ = 1/√(LC). So increasing R increases damping, while increasing L or C changes both α and ω₀.

??? question "2. A series RLC circuit has R = 100Ω, L = 10mH, and C = 1μF. Calculate ω₀, α, and ζ. What type of response will it have?"
    Given: R = 100Ω, L = 10mH = 0.01H, C = 1μF = 10⁻⁶F

    Natural frequency:
    ω₀ = 1/√(LC) = 1/√(0.01 × 10⁻⁶) = 1/√(10⁻⁸) = 10,000 rad/s

    Damping coefficient:
    α = R/2L = 100/(2 × 0.01) = 5,000 rad/s

    Damping ratio:
    ζ = α/ω₀ = 5,000/10,000 = 0.5

    Since ζ = 0.5 < 1, the circuit is **underdamped** and will oscillate.

    The damped frequency will be:
    ω_d = ω₀√(1-ζ²) = 10,000√(1-0.25) = 10,000 × 0.866 = 8,660 rad/s

??? question "3. Why is critical damping often preferred in practical applications despite not being the 'fastest' in all senses?"
    Critical damping provides the fastest return to equilibrium **without overshoot**. While an underdamped system might initially reach the target faster, it then overshoots and oscillates before settling.

    Critical damping is preferred when:
    - Overshoot could cause damage (mechanical systems hitting limits)
    - False readings are unacceptable (measuring instruments)
    - Oscillation could trigger unwanted events (digital circuits)
    - Smooth motion is required (camera stabilization)

    The "fastest" actually depends on what you're optimizing. If you need to reach 90% of the target quickly and can tolerate overshoot, underdamped is faster. If you need to stay within ±2% of the target, critical damping usually wins.

??? question "4. How does the quality factor Q relate to both the damping ratio and the bandwidth of a resonant circuit?"
    Q is inversely related to damping ratio:
    Q = 1/(2ζ)  or  ζ = 1/(2Q)

    Q is also related to bandwidth:
    Q = f₀/BW  or  BW = f₀/Q

    This means:
    - High Q → Low damping → Narrow bandwidth → Sharp resonance
    - Low Q → High damping → Wide bandwidth → Broad resonance

    For example, a circuit with Q = 100 at f₀ = 1 MHz has:
    - ζ = 1/(2×100) = 0.005 (very underdamped)
    - BW = 1 MHz/100 = 10 kHz (very selective)

    A circuit with Q = 2 at f₀ = 1 MHz has:
    - ζ = 1/(2×2) = 0.25 (moderately underdamped)
    - BW = 1 MHz/2 = 500 kHz (not selective at all)

## Summary

Second-order RLC circuits introduce the rich dynamics of oscillation and resonance that first-order circuits can't produce. The key insights from this chapter:

1. **Second-order means two energy storage elements** - The interplay between L and C creates oscillatory behavior

2. **The damping ratio ζ controls everything** - It determines whether the response is overdamped (sluggish), critically damped (optimal), or underdamped (oscillatory)

3. **Natural frequency depends only on L and C** - Resistance affects damping but not the fundamental frequency of oscillation

4. **Resonance is powerful** - At the resonant frequency, series circuits maximize current and parallel circuits maximize impedance

5. **Quality factor Q indicates selectivity** - High Q means sharp resonance and narrow bandwidth; Q and ζ are inversely related

6. **Energy sloshes between L and C** - The electric field and magnetic field continuously exchange energy, with R dissipating some each cycle

7. **The same math describes mechanical systems** - Mass-spring-dampers follow identical equations, making RLC circuit analysis a universal skill

These concepts prepare you for AC analysis, where sinusoidal signals interact with resonant circuits to create the filters, tuners, and oscillators that make modern electronics possible. The dramatic behavior of second-order circuits—the ringing, the resonance, the critical balance between too much and too little damping—is where circuit analysis becomes genuinely exciting.

Next chapter, we'll see how AC signals and sinusoidal analysis build on these foundations to analyze circuits in the frequency domain.

</div>
