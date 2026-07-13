/* Aenigma Press - hero "Planetario": parallasse (mouse+scroll),
   meteore, brillamenti, pausa fuori viewport. Locale, zero richieste esterne. */
(function(){
  var mq = matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) return;
  var heaven = document.querySelector('.heaven');
  if (!heaven) return;
  var targets = [].slice.call(document.querySelectorAll('.plx, .sky'));
  var setVar = function(n, v){
    for (var i = 0; i < targets.length; i++) targets[i].style.setProperty(n, v);
  };
  var alive = true, inview = true;

  /* parallasse al puntatore (solo pointer fine) */
  if (matchMedia('(pointer: fine)').matches) {
    var tx = 0, ty = 0, px = 0, py = 0, raf = null;
    var step = function(){
      px += (tx - px) * .055;
      py += (ty - py) * .055;
      setVar('--px', px.toFixed(4));
      setVar('--py', py.toFixed(4));
      if (Math.abs(tx - px) + Math.abs(ty - py) > .001) raf = requestAnimationFrame(step);
      else raf = null;
    };
    addEventListener('pointermove', function(e){
      if (!alive || !inview) return;
      tx = (e.clientX / innerWidth - .5) * -2;
      ty = (e.clientY / innerHeight - .5) * -2;
      if (raf === null) raf = requestAnimationFrame(step);
    }, {passive:true});
  }

  /* parallasse allo scroll, con early-return a valore fermo */
  var lastSc = -1;
  var onScroll = function(){
    if (!alive) return;
    var y = Math.min(scrollY, innerHeight * 1.2);
    if (y === lastSc) return;
    lastSc = y;
    setVar('--sc', y.toFixed(1) + 'px');
  };
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* pausa totale quando l'hero esce dal viewport */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function(en){
      inview = en[0].isIntersecting;
      heaven.classList.toggle('asleep', !inview);
    }).observe(heaven);
  }

  /* stelle cadenti a intervalli casuali */
  var host = heaven.querySelector('.meteors');
  var FIRST = 4000, MIN = 3500, RANGE = 5500;
  var spawn = function(){
    if (alive && inview && !document.hidden && host) {
      var m = document.createElement('div');
      m.className = 'meteor';
      if (Math.random() < .28) m.classList.add('meteor--big');
      m.style.setProperty('--t', (4 + Math.random() * 44).toFixed(1) + '%');
      m.style.setProperty('--l', (5 + Math.random() * 62).toFixed(1) + '%');
      m.style.setProperty('--a', (24 + Math.random() * 14).toFixed(1) + 'deg');
      m.style.setProperty('--d', (0.7 + Math.random() * 0.5).toFixed(2) + 's');
      m.addEventListener('animationend', function(){ m.remove(); });
      setTimeout(function(){ if (m.parentNode) m.remove(); }, 2600);
      host.appendChild(m);
    }
    if (alive) setTimeout(spawn, MIN + Math.random() * RANGE);
  };
  setTimeout(spawn, FIRST);

  /* brillamenti: ogni tanto una stella del campo medio divampa */
  var mids = document.querySelectorAll('.plx--mid .st');
  var flare = function(){
    if (alive && inview && !document.hidden && mids.length) {
      var s = mids[Math.floor(Math.random() * mids.length)];
      s.classList.add('flare');
      s.addEventListener('animationend', function h(){
        s.classList.remove('flare');
        s.removeEventListener('animationend', h);
      });
    }
    if (alive) setTimeout(flare, 5000 + Math.random() * 5000);
  };
  setTimeout(flare, 6500);

  /* se reduced-motion si attiva a pagina aperta, si spegne tutto */
  mq.addEventListener('change', function(e){
    if (e.matches) { alive = false; heaven.classList.add('asleep'); }
  });
})();
