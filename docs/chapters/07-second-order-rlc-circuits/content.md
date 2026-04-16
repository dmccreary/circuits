---
title: Chapter 7 Content — Second-Order RLC Circuits
description: Teaching content for Chapter 7 covering damping, natural frequency, resonance, and quality factor
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 7 — Second-Order RLC Circuits

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

When both a capacitor and an inductor are present in the same circuit, energy can oscillate back and forth between them, producing behaviors far richer than the simple exponential decay of first-order circuits. This chapter analyzes series and parallel RLC circuits through their characteristic equation, classifying responses as overdamped, critically damped, or underdamped based on the damping ratio.

**Key Takeaways**

1. The characteristic equation of a second-order circuit has two roots whose nature — real and distinct, real and equal, or complex conjugate — determines whether the circuit is overdamped, critically damped, or underdamped.
2. An underdamped circuit oscillates at the damped natural frequency before settling, while an overdamped circuit decays to steady state without oscillation.
3. The natural frequency ω₀ and damping ratio ζ are the two key parameters that fully characterize the transient behavior of any second-order circuit.

</details>

## 7.1 Introduction: When Circuits Get Dramatic

If first-order RC and RL circuits are like a polite conversation — one thing leads smoothly to another — then second-order RLC circuits are like a heated debate. Things can swing back and forth, overshoot their targets, or even oscillate indefinitely.

In Chapter 6, you learned how capacitors and inductors store and release energy exponentially. But what happens when you put *both* energy storage elements in the same circuit? The energy sloshes back and forth between the electric field of the capacitor and the magnetic field of the inductor, like two friends tossing a ball between them. Add some resistance, and the ball gradually loses energy with each toss until everyone gets tired.

This energy exchange creates behaviors you won't see in simpler circuits:

- **Oscillations** that ring like a bell
- **Overshoot** that rockets past the target before settling back
- **Resonance** that amplifies signals at specific frequencies

Understanding these behaviors unlocks your ability to design everything from radio tuners to shock absorbers to audio equalizers.

---

## 7.2 Second-Order Circuits: The Mathematical Upgrade

A **second-order circuit** is any circuit whose behavior is described by a second-order differential equation. This happens whenever a circuit contains two independent energy storage elements — typically an inductor and a capacitor.

The general form of a second-order differential equation is:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\frac{d^2x}{dt^2} + 2\alpha\frac{dx}{dt} + \omega_0^2 x = f(t)\]

where \(x\) is the response (voltage or current), \(\alpha\) is the damping coefficient, \(\omega_0\) is the undamped natural frequency, and \(f(t)\) is the source.

</div>

| Order | Energy Storage Elements | Equation Type | Example Response |
|-------|------------------------|---------------|------------------|
| First | 1 (C or L) | First-order ODE | Exponential decay/rise |
| Second | 2 (C and L) | Second-order ODE | Oscillatory, damped |
| Higher | 3+ | Higher-order ODE | Complex multi-frequency |

---

## 7.3 Series and Parallel RLC Circuits

**Series RLC** — all components share the same current. Applying KVL and differentiating:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\frac{d^2i}{dt^2} + \frac{R}{L}\frac{di}{dt} + \frac{1}{LC}i = \frac{1}{L}\frac{dV_S}{dt}\]

Series RLC: \(\quad \alpha = \dfrac{R}{2L}, \qquad \omega_0 = \dfrac{1}{\sqrt{LC}}\)

</div>

**Parallel RLC** — all components share the same voltage. Applying KCL:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

Parallel RLC: \(\quad \alpha = \dfrac{1}{2RC}, \qquad \omega_0 = \dfrac{1}{\sqrt{LC}}\)

</div>

Notice that \(\omega_0\) is the same for both configurations — it depends only on L and C.

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

---

## 7.4 The Characteristic Equation

To solve the homogeneous equation, assume \(x = Ae^{st}\). Substituting gives the **characteristic equation**:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[s^2 + 2\alpha s + \omega_0^2 = 0\]

\[s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\]

</div>

The nature of the roots determines everything about the circuit response:

| Condition | Root Type | Response Type |
|-----------|-----------|---------------|
| \(\alpha > \omega_0\) | Two distinct real roots | Overdamped |
| \(\alpha = \omega_0\) | Repeated real root | Critically damped |
| \(\alpha < \omega_0\) | Complex conjugate roots | Underdamped |

---

## 7.5 Natural Frequency

The **natural frequency** \(\omega_0\) is the frequency at which an undamped circuit would oscillate forever — the circuit's preferred rhythm:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\omega_0 = \frac{1}{\sqrt{LC}} \text{ rad/s} \qquad f_0 = \frac{1}{2\pi\sqrt{LC}} \text{ Hz}\]

</div>

The natural frequency depends only on L and C, not on R. Resistance controls how quickly oscillations die out, but not their frequency.

| L (mH) | C (μF) | f₀ (Hz) | Audio Equivalent |
|--------|--------|---------|------------------|
| 100 | 100 | 50.3 | Low bass hum |
| 10 | 10 | 503 | Mid-range tone |
| 1 | 1 | 5,033 | High-pitched whistle |
| 0.1 | 0.1 | 50,330 | Ultrasonic |

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
  var cv=document.getElementById('nfRawCanvas'),ctx=cv.getContext('2d');
  var W=cv.width,H=cv.height,ml=55,mr=15,mt=30,mb=35,pw=W-ml-mr,ph=H-mt-mb;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#FAFAFA';ctx.fillRect(ml,mt,pw,ph);
  ctx.strokeStyle='#E8E8E8';ctx.lineWidth=1;
  for(var g=0;g<=4;g++){var gy=mt+g*ph/4;ctx.beginPath();ctx.moveTo(ml,gy);ctx.lineTo(ml+pw,gy);ctx.stroke();}
  for(var g=0;g<=6;g++){var gx=ml+g*pw/6;ctx.beginPath();ctx.moveTo(gx,mt);ctx.lineTo(gx,mt+ph);ctx.stroke();}
  ctx.strokeStyle='#333';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(ml,mt);ctx.lineTo(ml,mt+ph);ctx.lineTo(ml+pw,mt+ph);ctx.stroke();
  var zeroY=mt+ph/2;
  ctx.strokeStyle='#ccc';ctx.lineWidth=1;ctx.setLineDash([4,4]);
  ctx.beginPath();ctx.moveTo(ml,zeroY);ctx.lineTo(ml+pw,zeroY);ctx.stroke();
  ctx.setLineDash([]);
  var tMax=3*T;
  ctx.strokeStyle='#5A3EED';ctx.lineWidth=2.5;ctx.beginPath();
  for(var i=0;i<=300;i++){
    var t=i*tMax/300,x=ml+i*pw/300,y=zeroY-Math.cos(w0*t)*(ph/2-5);
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  ctx.stroke();
  ctx.fillStyle='#333';ctx.font='12px Arial';ctx.textAlign='center';
  ctx.fillText('Time ('+tUnit+')',ml+pw/2,H-3);
  ctx.font='10px Arial';
  for(var g=0;g<=6;g++){var tv=(g*tMax/6*tDiv).toFixed(1);ctx.fillText(tv,ml+g*pw/6,mt+ph+14);}
  ctx.textAlign='right';
  ctx.fillText('1.0',ml-4,mt+8);ctx.fillText('0',ml-4,zeroY+4);ctx.fillText('-1.0',ml-4,mt+ph+2);
  ctx.save();ctx.translate(12,mt+ph/2);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.font='12px Arial';ctx.fillText('Amplitude',0,0);ctx.restore();
  ctx.fillStyle='#333';ctx.font='bold 13px Arial';ctx.textAlign='center';
  ctx.fillText('Undamped Oscillation at f₀ = '+f0.toFixed(1)+' Hz  (T = '+(T*tDiv).toFixed(2)+' '+tUnit+')',W/2,18);
}
updateNF();
</script>

---

## 7.6 Damping Ratio

The **damping ratio** \(\zeta\) is the single dimensionless number that classifies circuit response:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\zeta = \frac{\alpha}{\omega_0}\]

Series RLC: \(\zeta = \dfrac{R}{2}\sqrt{\dfrac{C}{L}}\) &nbsp;&nbsp; Parallel RLC: \(\zeta = \dfrac{1}{2R}\sqrt{\dfrac{L}{C}}\)

</div>

| Damping Ratio | Condition | Response Type | Behavior |
|---------------|-----------|---------------|----------|
| \(\zeta > 1\) | \(\alpha > \omega_0\) | Overdamped | Slow, no oscillation |
| \(\zeta = 1\) | \(\alpha = \omega_0\) | Critically damped | Fastest without overshoot |
| \(0 < \zeta < 1\) | \(\alpha < \omega_0\) | Underdamped | Oscillation with decay |
| \(\zeta = 0\) | \(\alpha = 0\) | Undamped | Endless oscillation |

---

## 7.7 Overdamped Response (\(\zeta > 1\))

When \(\zeta > 1\), the characteristic equation has two distinct negative real roots. The general solution is:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[x(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}\]

where \(s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\) (both negative real)

</div>

The response creeps slowly toward its final value with no oscillation. Think of a door closer adjusted too tight — it closes without bouncing, but takes forever. Overdamping is preferred in precision instruments and safety systems where overshoot is unacceptable.

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

---

## 7.8 Underdamped Response (\(0 < \zeta < 1\))

When \(\zeta < 1\), the characteristic equation has complex conjugate roots, giving oscillatory behavior:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[s_{1,2} = -\alpha \pm j\omega_d \qquad \omega_d = \omega_0\sqrt{1 - \zeta^2}\]

\[x(t) = Ce^{-\alpha t}\cos(\omega_d t + \phi)\]

</div>

The response oscillates at the **damped natural frequency** \(\omega_d\) while decaying with time constant \(1/\alpha\). Two key performance metrics:

**Percent Overshoot:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[PO = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%\]

**Settling time** (to within 2%): \(\displaystyle t_s \approx \frac{4}{\alpha} = \frac{4}{\zeta\omega_0}\)

</div>

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

---

## 7.9 Critically Damped Response (\(\zeta = 1\))

When \(\zeta = 1\), there is a repeated root \(s = -\alpha = -\omega_0\). The general solution is:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[x(t) = (A + Bt)e^{-\omega_0 t}\]

</div>

Critical damping gives the fastest possible return to equilibrium *without* overshoot. It's the design target for galvanometers, analog meters, automotive suspension, and camera stabilization — any application where overshoot is unacceptable but speed matters.

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

---

## 7.10 Resonant Frequency

**Resonance** occurs when inductive reactance equals capacitive reactance:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[X_L = X_C \implies \omega_r L = \frac{1}{\omega_r C} \implies \omega_r = \frac{1}{\sqrt{LC}} = \omega_0\]

</div>

At resonance in a **series RLC** circuit: impedance is minimum (= R), current is maximum, and \(V_L = V_C\) (they cancel). Voltage across L or C individually can *exceed* the source voltage!

At resonance in a **parallel RLC** circuit: impedance is maximum, current from source is minimum, and circulating current between L and C can exceed source current.

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

---

## 7.11 Quality Factor

The **quality factor** Q characterizes the sharpness of resonance and efficiency of energy storage:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

Series RLC: \(\displaystyle Q = \frac{\omega_0 L}{R} = \frac{1}{R}\sqrt{\frac{L}{C}}\)

Parallel RLC: \(\displaystyle Q = \omega_0 CR = R\sqrt{\frac{C}{L}}\)

Relationship to damping: \(\displaystyle Q = \frac{1}{2\zeta}\)

</div>

Q also defines bandwidth:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[BW = \frac{f_0}{Q}\]

</div>

| Q | Bandwidth (at f₀ = 1 MHz) | Application |
|---|---------------------------|-------------|
| 10 | 100 kHz | Audio filter |
| 100 | 10 kHz | IF stage |
| 1000 | 1 kHz | Crystal oscillator |

!!! warning "Practical Q limits"
    Real inductors have winding resistance that caps practical Q at 100–200 for discrete LC circuits. Higher Q requires quartz crystals or mechanical resonators.

---

## 7.12 Key Formulas Summary

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 28px; margin: 1rem 0;" markdown>

| Parameter | Series RLC | Parallel RLC |
|-----------|------------|--------------|
| Damping coefficient α | \(R/2L\) | \(1/2RC\) |
| Natural frequency ω₀ | \(1/\sqrt{LC}\) | \(1/\sqrt{LC}\) |
| Damping ratio ζ | \((R/2)\sqrt{C/L}\) | \((1/2R)\sqrt{L/C}\) |
| Quality factor Q | \((1/R)\sqrt{L/C}\) | \(R\sqrt{C/L}\) |
| Bandwidth BW | \(R/L\) | \(1/RC\) |

**Response classification:**

- Overdamped (\(\zeta > 1\)): \(x(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}\), two distinct real roots
- Critically damped (\(\zeta = 1\)): \(x(t) = (A+Bt)e^{-\omega_0 t}\), repeated root
- Underdamped (\(\zeta < 1\)): \(x(t) = Ce^{-\alpha t}\cos(\omega_d t + \phi)\), \(\omega_d = \omega_0\sqrt{1-\zeta^2}\)

**Key relationships:** \(Q = 1/(2\zeta)\), \(\quad BW = f_0/Q\), \(\quad PO = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%\)

</div>

</div>
