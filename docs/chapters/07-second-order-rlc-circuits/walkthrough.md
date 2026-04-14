# Chapter 7 — Interactive Walkthrough: Second-Order RLC Circuits

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700;">Guided Exploration</h2>

Work through each station below in order. Each one builds on the previous. Adjust the sliders, observe the results, and answer the checkpoint questions before moving on.

---

## Station 1: Natural Frequency — The Circuit's Heartbeat

The natural frequency \(\omega_0 = \frac{1}{\sqrt{LC}}\) depends only on the inductor and capacitor — resistance plays no role.

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<h4 style="margin:0 0 8px;color:#5A3EED;">Station 1 — Explore Natural Frequency</h4>
<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;">
<label style="font-size:0.9em;">L (mH): <input type="range" id="w1L" min="1" max="200" value="50" step="1" oninput="updateW1()"> <strong id="w1Lv">50</strong></label>
<label style="font-size:0.9em;">C (μF): <input type="range" id="w1C" min="1" max="200" value="50" step="1" oninput="updateW1()"> <strong id="w1Cv">50</strong></label>
</div>
<canvas id="w1Canvas" width="690" height="280"></canvas>
<div id="w1Info" style="font-size:0.95em;margin-top:8px;padding:10px;background:#F8F6FF;border-radius:8px;"></div>
<div style="margin-top:10px;padding:10px;background:#E8F5E9;border-radius:8px;font-size:0.9em;">
<strong>✋ Checkpoint:</strong><br>
1. Set L = 100 mH and C = 100 μF. What is ω₀?<br>
2. Now halve both (L = 50, C = 50). What happened to ω₀?<br>
3. Can you find L and C values that give f₀ ≈ 500 Hz?
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<style>
.msim-box{background:#fff;border:1px solid #e0e0e0;border-radius:8px;padding:12px;margin:1rem 0;position:relative;transition:all 0.3s ease;}
.msim-box.msim-fs{position:fixed!important;top:0;left:0;width:100vw!important;height:100vh!important;z-index:9999;border-radius:0;overflow-y:auto;padding:20px 30px;box-sizing:border-box;}
.msim-btn{position:absolute;top:8px;right:8px;padding:4px 12px;border:1px solid #5A3EED;border-radius:4px;background:#F8F6FF;color:#5A3EED;cursor:pointer;font-size:0.8em;font-weight:600;z-index:10;}
.msim-btn:hover{background:#5A3EED;color:#fff;}
.msim-box.msim-fs .msim-btn{position:fixed;top:12px;right:12px;}
.station-reveal{display:none;margin-top:8px;padding:10px;background:#FFF8E1;border-radius:8px;font-size:0.9em;}
.reveal-btn{padding:4px 14px;border:1px solid #D4A017;border-radius:4px;background:#FFF8E1;color:#D4A017;cursor:pointer;font-weight:600;font-size:0.85em;margin-top:6px;}
.reveal-btn:hover{background:#D4A017;color:#fff;}
</style>
<script>
function toggleFS(btn){var box=btn.closest('.msim-box');box.classList.toggle('msim-fs');btn.textContent=box.classList.contains('msim-fs')?'✕ Back to Doc':'⛶ Fullscreen';}
function toggleReveal(btn){var el=btn.nextElementSibling;el.style.display=el.style.display==='block'?'none':'block';}

/* ── Station 1: Natural Frequency ─────────────────────────────────── */
var w1Chart=null;
function updateW1(){
  var Lm=+document.getElementById('w1L').value, Cu=+document.getElementById('w1C').value;
  document.getElementById('w1Lv').textContent=Lm;
  document.getElementById('w1Cv').textContent=Cu;
  var L=Lm*1e-3, C=Cu*1e-6, w0=1/Math.sqrt(L*C), f0=w0/(2*Math.PI), T=1/f0;
  var tUnit='ms',tDiv=1000;if(T<0.001){tUnit='μs';tDiv=1e6;}
  var tMax=3*T, N=300, labels=[], data=[];
  for(var i=0;i<=N;i++){var t=i*tMax/N;labels.push((t*tDiv).toFixed(1));data.push(Math.cos(w0*t));}
  var ds=[
    {label:'Undamped oscillation cos(ω₀t)',data:data,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false}
  ];
  if(w1Chart){w1Chart.data.labels=labels;w1Chart.data.datasets=ds;w1Chart.options.scales.x.title.text='Time ('+tUnit+')';w1Chart.update();}
  else{w1Chart=new Chart(document.getElementById('w1Canvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Undamped Oscillation at Natural Frequency',font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Time ('+tUnit+')'},ticks:{maxTicksLimit:8,font:{size:10}}},y:{title:{display:true,text:'Amplitude'},min:-1.2,max:1.2}}}});}
  document.getElementById('w1Info').innerHTML=
    '<b>ω₀</b> = 1/√(LC) = 1/√('+(L*C).toExponential(2)+') = <span style="color:#5A3EED;font-size:1.15em"><b>'+w0.toFixed(1)+' rad/s</b></span><br>'+
    '<b>f₀</b> = '+f0.toFixed(1)+' Hz &nbsp;|&nbsp; <b>Period T</b> = '+(T*tDiv).toFixed(2)+' '+tUnit+
    '<br><span style="color:#888;font-size:0.9em;">↑ Larger L or C → lower frequency (slower oscillation) &nbsp;|&nbsp; Smaller L or C → higher frequency</span>';
}
updateW1();
</script>

??? tip "Checkpoint Answers"
    1. With L = 100 mH and C = 100 μF: ω₀ = 1/√(0.1 × 10⁻⁴) = **316.2 rad/s** (f₀ ≈ 50.3 Hz)
    2. Halving both to L = 50 mH and C = 50 μF: ω₀ = 1/√(0.05 × 5×10⁻⁵) = **632.5 rad/s** — it doubled!
    3. For f₀ ≈ 500 Hz: try L ≈ 10 mH and C ≈ 10 μF → f₀ = 503 Hz

---

## Station 2: Damping Ratio — Three Personalities

The damping ratio \(\zeta = \alpha / \omega_0\) determines the circuit's personality. Adjust R and watch the response change between three regimes.

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<h4 style="margin:0 0 8px;color:#5A3EED;">Station 2 — Discover the Three Damping Regimes</h4>
<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px;">
<label style="font-size:0.9em;">R (Ω): <input type="range" id="w2R" min="1" max="500" value="20" step="1" oninput="updateW2()"> <strong id="w2Rv">20</strong></label>
<label style="font-size:0.9em;">L (mH): <input type="range" id="w2L" min="10" max="200" value="100" step="1" oninput="updateW2()"> <strong id="w2Lv">100</strong></label>
<label style="font-size:0.9em;">C (μF): <input type="range" id="w2C" min="10" max="200" value="100" step="1" oninput="updateW2()"> <strong id="w2Cv">100</strong></label>
</div>
<canvas id="w2Canvas" width="690" height="320"></canvas>
<div id="w2Info" style="font-size:0.95em;margin-top:8px;padding:10px;border-radius:8px;"></div>
<div id="w2Task" style="margin-top:10px;padding:10px;background:#E8F5E9;border-radius:8px;font-size:0.9em;">
<strong>✋ Tasks:</strong><br>
1. <b>Find critical damping:</b> Slowly increase R until the oscillations just disappear. Note the R value.<br>
2. <b>Verify:</b> The info box shows R_crit. Does your experimental value match?<br>
3. <b>Compare speeds:</b> At R = R_crit, the response is the fastest without overshoot. Now double R — is it faster or slower?<br>
4. <b>Halve R from critical:</b> How many oscillations do you see before settling?
</div>
</div>
<script>
/* ── Station 2: Damping Ratio ─────────────────────────────────────── */
var w2Chart=null;
function stepResp2(alpha,w0,t){
  var z=alpha/w0;
  if(Math.abs(z-1)<0.01) return 1-(1+w0*t)*Math.exp(-w0*t);
  if(z<1){var wd=w0*Math.sqrt(1-z*z);return 1-(1/Math.sqrt(1-z*z))*Math.exp(-alpha*t)*Math.sin(wd*t+Math.acos(z));}
  var d=Math.sqrt(alpha*alpha-w0*w0),s1=-alpha+d,s2=-alpha-d;
  return 1+s2/(s1-s2)*Math.exp(s1*t)+s1/(s2-s1)*Math.exp(s2*t);
}
function updateW2(){
  var R=+document.getElementById('w2R').value, Lm=+document.getElementById('w2L').value, Cu=+document.getElementById('w2C').value;
  document.getElementById('w2Rv').textContent=R;document.getElementById('w2Lv').textContent=Lm;document.getElementById('w2Cv').textContent=Cu;
  var L=Lm*1e-3, C=Cu*1e-6, w0=1/Math.sqrt(L*C), alpha=R/(2*L), z=alpha/w0;
  var Rcrit=2*Math.sqrt(L/C);
  var tMax=Math.max(8/Math.max(alpha,0.01),8*Math.PI/w0); tMax=Math.min(tMax,3);
  var N=350, labels=[], resp=[], critResp=[], ssLine=[];
  var alphaCrit=Rcrit/(2*L);
  for(var i=0;i<=N;i++){
    var t=i*tMax/N; labels.push((t*1000).toFixed(1));
    resp.push(stepResp2(alpha,w0,t));
    critResp.push(stepResp2(alphaCrit,w0,t));
    ssLine.push(1);
  }
  var dampLabel=z<0.99?'Underdamped':z<1.01?'Critically Damped':'Overdamped';
  var dampColor=z<0.99?'#5A3EED':z<1.01?'#43A047':'#E53935';
  var ds=[
    {label:'Your Response (ζ='+z.toFixed(3)+', '+dampLabel+')',data:resp,borderColor:dampColor,borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Critical Damping Reference (ζ=1)',data:critResp,borderColor:'#D4A017',borderWidth:1.5,borderDash:[6,4],pointRadius:0,fill:false},
    {label:'Steady State',data:ssLine,borderColor:'#999',borderWidth:1,borderDash:[3,3],pointRadius:0,fill:false}
  ];
  if(w2Chart){w2Chart.data.labels=labels;w2Chart.data.datasets=ds;w2Chart.options.plugins.title.text='Step Response — '+dampLabel;w2Chart.update();}
  else{w2Chart=new Chart(document.getElementById('w2Canvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Step Response — '+dampLabel,font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Time (ms)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized Voltage'},min:-0.3,max:2.0}}}});}
  var bgColor=z<0.99?'#E3F2FD':z<1.01?'#E8F5E9':'#FFF3E0';
  document.getElementById('w2Info').style.background=bgColor;
  document.getElementById('w2Info').innerHTML=
    '<b style="color:'+dampColor+';font-size:1.1em;">'+dampLabel+'</b> &nbsp;(ζ = '+z.toFixed(3)+')<br>'+
    'α = '+alpha.toFixed(1)+' rad/s &nbsp;|&nbsp; ω₀ = '+w0.toFixed(1)+' rad/s &nbsp;|&nbsp; <b>R_crit = '+Rcrit.toFixed(1)+' Ω</b><br>'+
    (z<1?'ω_d = '+(w0*Math.sqrt(1-z*z)).toFixed(1)+' rad/s &nbsp;|&nbsp; Overshoot ≈ '+(100*Math.exp(-Math.PI*z/Math.sqrt(1-z*z))).toFixed(1)+'%':'No oscillation — response approaches steady state exponentially');
}
updateW2();
</script>

---

## Station 3: Overshoot and Settling Time Trade-off

For underdamped circuits, lower damping means faster initial response but more overshoot. This station lets you visualize the trade-off.

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<h4 style="margin:0 0 8px;color:#5A3EED;">Station 3 — Overshoot vs. Settling Time</h4>
<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px;">
<label style="font-size:0.9em;">ζ: <input type="range" id="w3Z" min="0.05" max="0.95" value="0.3" step="0.05" oninput="updateW3()"> <strong id="w3Zv">0.30</strong></label>
<label style="font-size:0.9em;">ω₀ (rad/s): <input type="range" id="w3W" min="5" max="50" value="20" step="1" oninput="updateW3()"> <strong id="w3Wv">20</strong></label>
</div>
<canvas id="w3Canvas" width="690" height="320"></canvas>
<div id="w3Info" style="font-size:0.95em;margin-top:8px;padding:10px;background:#FFF8E1;border-radius:8px;"></div>
<div style="margin-top:10px;padding:10px;background:#E8F5E9;border-radius:8px;font-size:0.9em;">
<strong>✋ Tasks:</strong><br>
1. Set ζ = 0.1. Read the overshoot percentage and settling time.<br>
2. Increase ζ to 0.5. How did both values change?<br>
3. Find the ζ value that gives approximately 5% overshoot.<br>
4. <b>Design challenge:</b> What ζ gives < 10% overshoot AND settling time < 0.5 s with ω₀ = 20?
</div>
</div>
<script>
/* ── Station 3: Overshoot vs Settling ─────────────────────────────── */
var w3Chart=null;
function updateW3(){
  var z=+document.getElementById('w3Z').value, w0=+document.getElementById('w3W').value;
  document.getElementById('w3Zv').textContent=z.toFixed(2);document.getElementById('w3Wv').textContent=w0;
  var a=z*w0, wd=w0*Math.sqrt(1-z*z), phi=Math.acos(z);
  var os=100*Math.exp(-Math.PI*z/Math.sqrt(1-z*z));
  var ts=4/(z*w0), tp=Math.PI/wd;
  var tMax=Math.max(ts*1.3,6*Math.PI/wd), N=400;
  var labels=[], resp=[], envU=[], envL=[], ssLine=[], band2u=[], band2l=[];
  for(var i=0;i<=N;i++){
    var t=i*tMax/N; labels.push((t*1000).toFixed(1));
    var e=Math.exp(-a*t)/Math.sqrt(1-z*z);
    resp.push(1-e*Math.sin(wd*t+phi));
    envU.push(1+e); envL.push(1-e); ssLine.push(1);
    band2u.push(1.02); band2l.push(0.98);
  }
  var ds=[
    {label:'Step Response (ζ='+z.toFixed(2)+')',data:resp,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Decay Envelope',data:envU,borderColor:'#D4A017',borderWidth:1.5,borderDash:[5,4],pointRadius:0,fill:false},
    {label:'',data:envL,borderColor:'#D4A017',borderWidth:1.5,borderDash:[5,4],pointRadius:0,fill:false},
    {label:'±2% Band',data:band2u,borderColor:'#43A047',borderWidth:1,borderDash:[2,2],pointRadius:0,fill:false},
    {label:'',data:band2l,borderColor:'#43A047',borderWidth:1,borderDash:[2,2],pointRadius:0,fill:false},
    {label:'Steady State',data:ssLine,borderColor:'#999',borderWidth:1,borderDash:[3,3],pointRadius:0,fill:false}
  ];
  if(w3Chart){w3Chart.data.labels=labels;w3Chart.data.datasets=ds;w3Chart.update();}
  else{w3Chart=new Chart(document.getElementById('w3Canvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Overshoot and Settling Time Analysis',font:{size:14},color:'#333'},legend:{labels:{font:{size:10},filter:function(i){return i.text!=='';}}}},scales:{x:{title:{display:true,text:'Time (ms)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized Voltage'},min:-0.2,max:2.0}}}});}
  document.getElementById('w3Info').innerHTML=
    '<b style="color:#E53935;">Overshoot = '+os.toFixed(1)+'%</b> &nbsp;|&nbsp; '+
    '<b style="color:#5A3EED;">Peak Time = '+(tp*1000).toFixed(1)+' ms</b> &nbsp;|&nbsp; '+
    '<b style="color:#43A047;">Settling Time (2%) = '+(ts*1000).toFixed(1)+' ms</b><br>'+
    '<span style="font-size:0.9em;color:#666;">ω_d = '+wd.toFixed(1)+' rad/s &nbsp;|&nbsp; f_d = '+(wd/(2*Math.PI)).toFixed(1)+' Hz &nbsp;|&nbsp; α = '+a.toFixed(1)+' rad/s</span>';
}
updateW3();
</script>

??? tip "Task Answers"
    1. At ζ = 0.1: Overshoot ≈ 72.9%, Settling time ≈ 2000 ms
    2. At ζ = 0.5: Overshoot ≈ 16.3%, Settling time ≈ 400 ms — both improved
    3. ζ ≈ 0.7 gives approximately 4.6% overshoot
    4. With ω₀ = 20: settling time = 4/(ζ×20) < 500 ms → ζ > 0.4. And ζ > 0.6 gives < 10% overshoot. So **ζ ≈ 0.65** works.

---

## Station 4: Quality Factor and Bandwidth

The quality factor Q controls how sharp the resonance peak is. Higher Q = narrower bandwidth = more selective filtering.

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<h4 style="margin:0 0 8px;color:#5A3EED;">Station 4 — Q Factor, Bandwidth, and Selectivity</h4>
<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px;">
<label style="font-size:0.9em;">R (Ω): <input type="range" id="w4R" min="1" max="200" value="10" step="1" oninput="updateW4()"> <strong id="w4Rv">10</strong></label>
<label style="font-size:0.9em;">L (mH): <input type="range" id="w4L" min="1" max="100" value="10" step="1" oninput="updateW4()"> <strong id="w4Lv">10</strong></label>
<label style="font-size:0.9em;">C (μF): <input type="range" id="w4C" min="0.1" max="10" value="1" step="0.1" oninput="updateW4()"> <strong id="w4Cv">1.0</strong></label>
</div>
<canvas id="w4Canvas" width="690" height="320"></canvas>
<div id="w4Info" style="font-size:0.95em;margin-top:8px;padding:10px;background:#F8F6FF;border-radius:8px;"></div>
<div style="margin-top:10px;padding:10px;background:#E8F5E9;border-radius:8px;font-size:0.9em;">
<strong>✋ Tasks:</strong><br>
1. With L = 10 mH and C = 1 μF, increase R from 10 to 100. What happens to the peak shape?<br>
2. At R = 10 Ω, what is Q and the bandwidth?<br>
3. <b>Radio tuning:</b> If you need to separate two stations 10 kHz apart at f₀ = 1 MHz, what Q do you need? (Q = f₀/BW)<br>
4. Set R = 1 Ω. Is this Q achievable with real components?
</div>
</div>
<script>
/* ── Station 4: Q Factor ──────────────────────────────────────────── */
var w4Chart=null;
function updateW4(){
  var R=+document.getElementById('w4R').value, Lm=+document.getElementById('w4L').value, Cu=+document.getElementById('w4C').value;
  document.getElementById('w4Rv').textContent=R;document.getElementById('w4Lv').textContent=Lm;document.getElementById('w4Cv').textContent=Cu.toFixed(1);
  var L=Lm*1e-3, C=Cu*1e-6, f0=1/(2*Math.PI*Math.sqrt(L*C)), Q=(1/R)*Math.sqrt(L/C), BW=f0/Q;
  var fMin=f0*0.1, fMax=f0*10, N=400, labels=[], mag=[], db3=[];
  var peak=0;
  for(var i=0;i<=N;i++){
    var f=fMin*Math.pow(fMax/fMin,i/N); labels.push(f.toFixed(0));
    var XL=2*Math.PI*f*L, XC=1/(2*Math.PI*f*C), H=1/Math.sqrt(R*R+(XL-XC)*(XL-XC));
    if(H>peak)peak=H; mag.push(H);
  }
  for(var i=0;i<mag.length;i++){mag[i]/=peak;db3.push(0.707);}
  // Also show Q = 2 and Q = 50 reference curves
  var ref2=[], ref50=[];
  for(var i=0;i<=N;i++){
    var f=fMin*Math.pow(fMax/fMin,i/N), r=f/f0-f0/f;
    ref2.push(1/Math.sqrt(1+4*r*r));
    ref50.push(1/Math.sqrt(1+2500*r*r));
  }
  var ds=[
    {label:'Your Circuit (Q='+Q.toFixed(1)+')',data:mag,borderColor:'#5A3EED',borderWidth:3,pointRadius:0,fill:false},
    {label:'Reference Q=2',data:ref2,borderColor:'#E5393566',borderWidth:1.5,borderDash:[4,3],pointRadius:0,fill:false},
    {label:'Reference Q=50',data:ref50,borderColor:'#43A04766',borderWidth:1.5,borderDash:[4,3],pointRadius:0,fill:false},
    {label:'-3dB (0.707)',data:db3,borderColor:'#D4A017',borderWidth:1,borderDash:[5,5],pointRadius:0,fill:false}
  ];
  if(w4Chart){w4Chart.data.labels=labels;w4Chart.data.datasets=ds;w4Chart.update();}
  else{w4Chart=new Chart(document.getElementById('w4Canvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Frequency Response — Resonance and Selectivity',font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Frequency (Hz)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized |I/V|'},min:0,max:1.15}}}});}
  var zeta=1/(2*Q);
  document.getElementById('w4Info').innerHTML=
    '<b style="color:#5A3EED;">Q = '+Q.toFixed(1)+'</b> &nbsp;|&nbsp; '+
    '<b>f₀ = '+f0.toFixed(1)+' Hz</b> &nbsp;|&nbsp; '+
    '<b style="color:#E53935;">BW = '+BW.toFixed(1)+' Hz</b> &nbsp;|&nbsp; '+
    'ζ = '+zeta.toFixed(4)+'<br>'+
    '<span style="font-size:0.9em;color:#666;">f_low ≈ '+(f0-BW/2).toFixed(1)+' Hz &nbsp;|&nbsp; f_high ≈ '+(f0+BW/2).toFixed(1)+' Hz &nbsp;|&nbsp; '+
    (Q>100?'⚠️ Very high Q — difficult with real components!':'')+'</span>';
}
updateW4();
</script>

---

## Station 5: Energy Exchange — Watch Energy Slosh

In an RLC circuit, energy moves back and forth between the capacitor (electric field) and the inductor (magnetic field). Resistance dissipates energy as heat.

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<h4 style="margin:0 0 8px;color:#5A3EED;">Station 5 — Energy Exchange Visualization</h4>
<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px;align-items:center;">
<label style="font-size:0.9em;">ζ: <input type="range" id="w5Z" min="0.02" max="0.5" value="0.08" step="0.02" oninput="updateW5()"> <strong id="w5Zv">0.08</strong></label>
<label style="font-size:0.9em;">ω₀: <input type="range" id="w5W" min="2" max="20" value="8" step="0.5" oninput="updateW5()"> <strong id="w5Wv">8.0</strong></label>
<button id="w5Btn" onclick="toggleW5()" style="padding:4px 14px;border:1px solid #5A3EED;border-radius:4px;background:#F8F6FF;color:#5A3EED;cursor:pointer;font-weight:600;">▶ Play</button>
</div>
<canvas id="w5Canvas" width="690" height="300"></canvas>
<div style="display:flex;gap:16px;margin-top:8px;">
<div style="flex:1;text-align:center;padding:10px;background:#E3F2FD;border-radius:8px;"><strong>⚡ Capacitor E<sub>C</sub></strong><br>
<div style="height:20px;background:#ddd;border-radius:4px;margin:4px 0;overflow:hidden;"><div id="w5BarC" style="height:100%;width:100%;background:#2196F3;transition:width 0.05s;"></div></div>
<span id="w5Ec" style="font-size:1.2em;color:#1565C0;">100%</span></div>
<div style="flex:1;text-align:center;padding:10px;background:#FFF3E0;border-radius:8px;"><strong>🧲 Inductor E<sub>L</sub></strong><br>
<div style="height:20px;background:#ddd;border-radius:4px;margin:4px 0;overflow:hidden;"><div id="w5BarL" style="height:100%;width:0%;background:#FF9800;transition:width 0.05s;"></div></div>
<span id="w5El" style="font-size:1.2em;color:#E65100;">0%</span></div>
<div style="flex:1;text-align:center;padding:10px;background:#FFEBEE;border-radius:8px;"><strong>🔥 Dissipated</strong><br>
<div style="height:20px;background:#ddd;border-radius:4px;margin:4px 0;overflow:hidden;"><div id="w5BarD" style="height:100%;width:0%;background:#E53935;transition:width 0.05s;"></div></div>
<span id="w5Ed" style="font-size:1.2em;color:#C62828;">0%</span></div>
</div>
<div style="margin-top:10px;padding:10px;background:#E8F5E9;border-radius:8px;font-size:0.9em;">
<strong>✋ Observe:</strong><br>
1. Press Play. Watch how energy alternates between capacitor and inductor.<br>
2. Increase ζ to 0.3. How many full exchanges happen before most energy is dissipated?<br>
3. Set ζ to 0.02 (very low damping). Energy exchanges many times — this is a high-Q circuit.
</div>
</div>
<script>
/* ── Station 5: Energy Exchange ───────────────────────────────────── */
var w5Chart=null, w5Anim=null, w5Idx=0, w5Playing=false;
var w5Data={labels:[],ec:[],el:[],etot:[]};
function computeW5(){
  var z=+document.getElementById('w5Z').value, w0=+document.getElementById('w5W').value;
  document.getElementById('w5Zv').textContent=z.toFixed(2);document.getElementById('w5Wv').textContent=w0.toFixed(1);
  var a=z*w0,wd=w0*Math.sqrt(1-z*z),L=1,C=1/(w0*w0),V0=10,E0=0.5*C*V0*V0;
  var tMax=10/a,N=500;w5Data={labels:[],ec:[],el:[],etot:[]};
  for(var i=0;i<=N;i++){
    var t=i*tMax/N;w5Data.labels.push((t*1000).toFixed(1));
    var v=V0*Math.exp(-a*t)*Math.cos(wd*t);
    var dvdt=V0*Math.exp(-a*t)*(-a*Math.cos(wd*t)-wd*Math.sin(wd*t));
    var iL=C*dvdt,Ec=0.5*C*v*v/E0,El=0.5*L*iL*iL/E0;
    w5Data.ec.push(Ec);w5Data.el.push(El);w5Data.etot.push(Ec+El);
  }
}
function drawW5Frame(){
  var ec=w5Data.ec.slice(0,w5Idx+1),el=w5Data.el.slice(0,w5Idx+1),et=w5Data.etot.slice(0,w5Idx+1);
  var pad=w5Data.labels.length-ec.length;
  var ds=[
    {label:'Capacitor Energy',data:ec.concat(Array(pad).fill(null)),borderColor:'#2196F3',backgroundColor:'rgba(33,150,243,0.15)',borderWidth:2,pointRadius:0,fill:true},
    {label:'Inductor Energy',data:el.concat(Array(pad).fill(null)),borderColor:'#FF9800',backgroundColor:'rgba(255,152,0,0.15)',borderWidth:2,pointRadius:0,fill:true},
    {label:'Total Energy',data:et.concat(Array(pad).fill(null)),borderColor:'#E53935',borderWidth:1.5,borderDash:[5,5],pointRadius:0,fill:false}
  ];
  if(w5Chart){w5Chart.data.labels=w5Data.labels;w5Chart.data.datasets=ds;w5Chart.update();}
  else{w5Chart=new Chart(document.getElementById('w5Canvas'),{type:'line',data:{labels:w5Data.labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Energy Exchange: Capacitor ↔ Inductor',font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Time (ms)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized Energy'},min:0,max:1.1}}}});}
  var ecv=w5Data.ec[w5Idx]||0,elv=w5Data.el[w5Idx]||0,etv=w5Data.etot[w5Idx]||1,dis=Math.max(0,1-etv);
  document.getElementById('w5Ec').textContent=(ecv*100).toFixed(0)+'%';
  document.getElementById('w5El').textContent=(elv*100).toFixed(0)+'%';
  document.getElementById('w5Ed').textContent=(dis*100).toFixed(0)+'%';
  document.getElementById('w5BarC').style.width=(ecv*100).toFixed(0)+'%';
  document.getElementById('w5BarL').style.width=(elv*100).toFixed(0)+'%';
  document.getElementById('w5BarD').style.width=(dis*100).toFixed(0)+'%';
}
function stepW5(){if(!w5Playing)return;w5Idx=Math.min(w5Idx+2,w5Data.labels.length-1);drawW5Frame();if(w5Idx<w5Data.labels.length-1)w5Anim=requestAnimationFrame(stepW5);else{w5Playing=false;document.getElementById('w5Btn').textContent='↺ Replay';}}
function toggleW5(){if(w5Playing){w5Playing=false;cancelAnimationFrame(w5Anim);document.getElementById('w5Btn').textContent='▶ Play';}else{if(w5Idx>=w5Data.labels.length-1)w5Idx=0;w5Playing=true;document.getElementById('w5Btn').textContent='⏸ Pause';stepW5();}}
function updateW5(){w5Playing=false;if(w5Anim)cancelAnimationFrame(w5Anim);document.getElementById('w5Btn').textContent='▶ Play';computeW5();w5Idx=0;drawW5Frame();}
computeW5();w5Idx=w5Data.labels.length-1;drawW5Frame();
</script>

---

## Station 6: Series vs. Parallel — Same Components, Different Behavior

The same R, L, and C values produce different damping in series vs. parallel configurations. This station lets you compare them side by side.

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<h4 style="margin:0 0 8px;color:#5A3EED;">Station 6 — Series vs. Parallel Comparison</h4>
<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px;">
<label style="font-size:0.9em;">R (Ω): <input type="range" id="w6R" min="1" max="300" value="50" step="1" oninput="updateW6()"> <strong id="w6Rv">50</strong></label>
<label style="font-size:0.9em;">L (mH): <input type="range" id="w6L" min="10" max="200" value="100" step="1" oninput="updateW6()"> <strong id="w6Lv">100</strong></label>
<label style="font-size:0.9em;">C (μF): <input type="range" id="w6C" min="10" max="200" value="100" step="1" oninput="updateW6()"> <strong id="w6Cv">100</strong></label>
</div>
<canvas id="w6Canvas" width="690" height="340"></canvas>
<div id="w6Info" style="font-size:0.95em;margin-top:8px;padding:10px;background:#F8F6FF;border-radius:8px;"></div>
<div style="margin-top:10px;padding:10px;background:#E8F5E9;border-radius:8px;font-size:0.9em;">
<strong>✋ Tasks:</strong><br>
1. Set R = 50 Ω, L = 100 mH, C = 100 μF. Which configuration is more heavily damped?<br>
2. Increase R. What happens to series damping? What about parallel?<br>
3. Find an R value where one configuration is underdamped and the other is overdamped.<br>
4. <b>Key insight:</b> Why does increasing R increase series damping but decrease parallel damping?
</div>
</div>
<script>
/* ── Station 6: Series vs Parallel ────────────────────────────────── */
var w6Chart=null;
function dampLabel6(z){return Math.abs(z-1)<0.02?'Crit.':z<1?'Under':'Over';}
function updateW6(){
  var R=+document.getElementById('w6R').value,Lm=+document.getElementById('w6L').value,Cu=+document.getElementById('w6C').value;
  document.getElementById('w6Rv').textContent=R;document.getElementById('w6Lv').textContent=Lm;document.getElementById('w6Cv').textContent=Cu;
  var L=Lm*1e-3,C=Cu*1e-6,w0=1/Math.sqrt(L*C);
  var aS=R/(2*L),aP=1/(2*R*C),zS=aS/w0,zP=aP/w0;
  var tMax=Math.max(5/Math.max(aS,0.01),5/Math.max(aP,0.01),6*Math.PI/w0);tMax=Math.min(tMax,3);
  var N=350,labels=[],sD=[],pD=[],ssLine=[];
  for(var i=0;i<=N;i++){var t=i*tMax/N;labels.push((t*1000).toFixed(1));sD.push(stepResp2(aS,w0,t));pD.push(stepResp2(aP,w0,t));ssLine.push(1);}
  var ds=[
    {label:'Series (ζ='+zS.toFixed(3)+', '+dampLabel6(zS)+')',data:sD,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Parallel (ζ='+zP.toFixed(3)+', '+dampLabel6(zP)+')',data:pD,borderColor:'#E53935',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Steady State',data:ssLine,borderColor:'#D4A017',borderWidth:1,borderDash:[6,4],pointRadius:0,fill:false}
  ];
  if(w6Chart){w6Chart.data.labels=labels;w6Chart.data.datasets=ds;w6Chart.options.plugins.title.text='Series vs Parallel Step Response';w6Chart.update();}
  else{w6Chart=new Chart(document.getElementById('w6Canvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Series vs Parallel Step Response',font:{size:14},color:'#333'},legend:{labels:{font:{size:11}}}},scales:{x:{title:{display:true,text:'Time (ms)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Normalized Voltage'},min:-0.3,max:2.0}}}});}
  document.getElementById('w6Info').innerHTML=
    '<b>ω₀ = '+w0.toFixed(1)+' rad/s</b> (same for both)<br>'+
    '<span style="color:#5A3EED"><b>Series:</b> α = '+aS.toFixed(1)+', ζ = '+zS.toFixed(3)+' — '+dampLabel6(zS)+'damped</span><br>'+
    '<span style="color:#E53935"><b>Parallel:</b> α = '+aP.toFixed(1)+', ζ = '+zP.toFixed(3)+' — '+dampLabel6(zP)+'damped</span><br>'+
    '<span style="font-size:0.9em;color:#666;">Series: α = R/2L (↑R = ↑damping) &nbsp;|&nbsp; Parallel: α = 1/2RC (↑R = ↓damping)</span>';
}
updateW6();
</script>

??? tip "Key Insight"
    In a **series** RLC circuit, resistance dissipates energy from the shared current — more R means more energy loss per cycle, so more damping.
    
    In a **parallel** RLC circuit, resistance provides an alternative current path. More R means *less* current through R, so *less* energy dissipation and *less* damping. The formulas reflect this: series has α = R/2L (R in numerator), parallel has α = 1/2RC (R in denominator).

---

## Station 7: Pulse Response and Ringing

Digital circuits send rectangular pulses. When these hit an underdamped RLC circuit, they cause ringing — potentially triggering false signals.

<div class="msim-box"><button class="msim-btn" onclick="toggleFS(this)">⛶ Fullscreen</button>
<h4 style="margin:0 0 8px;color:#5A3EED;">Station 7 — Pulse Response and Ringing</h4>
<div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px;">
<label style="font-size:0.9em;">ζ: <input type="range" id="w7Z" min="0.02" max="0.5" value="0.1" step="0.02" oninput="updateW7()"> <strong id="w7Zv">0.10</strong></label>
<label style="font-size:0.9em;">ω₀: <input type="range" id="w7W" min="5" max="40" value="15" step="1" oninput="updateW7()"> <strong id="w7Wv">15</strong></label>
<label style="font-size:0.9em;">Pulse width (ms): <input type="range" id="w7P" min="20" max="500" value="150" step="10" oninput="updateW7()"> <strong id="w7Pv">150</strong></label>
</div>
<canvas id="w7Canvas" width="690" height="340"></canvas>
<div id="w7Info" style="font-size:0.9em;margin-top:8px;padding:10px;background:#FFF3E0;border-radius:8px;"></div>
<div style="margin-top:10px;padding:10px;background:#E8F5E9;border-radius:8px;font-size:0.9em;">
<strong>✋ Tasks:</strong><br>
1. Set a short pulse (50 ms) with ω₀ = 15. How does the ringing compare to the pulse duration?<br>
2. Make the pulse width equal to about half the ringing period (T_d/2). This maximizes energy transfer.<br>
3. Use a very long pulse (500 ms). Now it looks like two separate step responses.<br>
4. <b>Digital design question:</b> If ringing crosses a logic threshold (say 0.5), it could cause a false trigger. Increase ζ until the ringing stays below 0.5 after the pulse ends.
</div>
</div>
<script>
/* ── Station 7: Pulse Response ────────────────────────────────────── */
var w7Chart=null;
function updateW7(){
  var z=+document.getElementById('w7Z').value,w0=+document.getElementById('w7W').value,pwMs=+document.getElementById('w7P').value;
  document.getElementById('w7Zv').textContent=z.toFixed(2);document.getElementById('w7Wv').textContent=w0;document.getElementById('w7Pv').textContent=pwMs;
  var pw=pwMs/1000, a=z*w0, wd=w0*Math.sqrt(1-z*z), phi=Math.acos(z);
  function stp(t){if(t<0)return 0;return 1-(1/Math.sqrt(1-z*z))*Math.exp(-a*t)*Math.sin(wd*t+phi);}
  var tMax=Math.max(pw+5/a,2), N=500, labels=[], pulse=[], resp=[], thresh=[];
  for(var i=0;i<=N;i++){
    var t=i*tMax/N;labels.push((t*1000).toFixed(1));
    pulse.push(t>=0&&t<=pw?1:0);
    resp.push(stp(t)-stp(t-pw));
    thresh.push(0.5);
  }
  var ds=[
    {label:'Input Pulse',data:pulse,borderColor:'#D4A017',borderWidth:2,pointRadius:0,fill:false,stepped:true},
    {label:'RLC Output',data:resp,borderColor:'#5A3EED',borderWidth:2.5,pointRadius:0,fill:false},
    {label:'Logic Threshold (0.5)',data:thresh,borderColor:'#E5393588',borderWidth:1,borderDash:[4,4],pointRadius:0,fill:false}
  ];
  if(w7Chart){w7Chart.data.labels=labels;w7Chart.data.datasets=ds;w7Chart.update();}
  else{w7Chart=new Chart(document.getElementById('w7Canvas'),{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,animation:{duration:0},plugins:{title:{display:true,text:'Pulse Response and Ringing',font:{size:14},color:'#333'},legend:{labels:{font:{size:10}}}},scales:{x:{title:{display:true,text:'Time (ms)'},ticks:{maxTicksLimit:10,font:{size:10}}},y:{title:{display:true,text:'Amplitude'},min:-1.5,max:2.2}}}});}
  var Td=2*Math.PI/wd;
  document.getElementById('w7Info').innerHTML=
    'ζ = '+z.toFixed(2)+' &nbsp;|&nbsp; ω_d = '+wd.toFixed(1)+' rad/s &nbsp;|&nbsp; <b>Ringing period T_d = '+(Td*1000).toFixed(1)+' ms</b><br>'+
    'Pulse width = '+pwMs+' ms &nbsp;|&nbsp; Settling after pulse ≈ '+(4/a*1000).toFixed(0)+' ms<br>'+
    (pw<Td/2?'<span style="color:#E53935;">⚠ Pulse shorter than T_d/2 — weak energy coupling</span>':
     pw<Td?'<span style="color:#D4A017;">Pulse ≈ T_d/2 — strong ringing!</span>':
     '<span style="color:#43A047;">Pulse longer than T_d — approaches two step responses</span>');
}
updateW7();
</script>

---

## Summary: What You Explored

| Station | Key Concept | Core Formula |
|---------|-------------|-------------|
| 1 | Natural Frequency | \(\omega_0 = 1/\sqrt{LC}\) |
| 2 | Damping Ratio & Three Regimes | \(\zeta = \alpha/\omega_0\) |
| 3 | Overshoot & Settling Trade-off | \(PO = e^{-\pi\zeta/\sqrt{1-\zeta^2}}\), \(t_s = 4/\alpha\) |
| 4 | Quality Factor & Bandwidth | \(Q = 1/(2\zeta) = f_0/BW\) |
| 5 | Energy Exchange (L ↔ C) | \(W_C = \frac{1}{2}Cv^2\), \(W_L = \frac{1}{2}Li^2\) |
| 6 | Series vs. Parallel Damping | Series: \(\alpha = R/2L\), Parallel: \(\alpha = 1/2RC\) |
| 7 | Pulse Response & Ringing | Superposition of shifted step responses |

!!! success "You've completed the Chapter 7 Interactive Walkthrough!"
    You now have hands-on intuition for how second-order RLC circuits behave. The key takeaway: **the damping ratio ζ is the single most important parameter** — it determines whether the circuit oscillates, how much it overshoots, and how quickly it settles. Everything else (Q, bandwidth, settling time, overshoot) can be derived from ζ and ω₀.
