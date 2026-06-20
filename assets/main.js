// Black Wall Street LLC — shared interactions
(function(){
  // mobile nav
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if(toggle){ toggle.addEventListener('click', function(){ nav.classList.toggle('open'); }); }
  if(nav){ nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ nav.classList.remove('open'); }); }); }

  // scroll reveal
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });

  // animated counters
  function animate(el){
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var dur = 1400, start = null;
    function tick(ts){
      if(!start) start = ts;
      var p = Math.min((ts-start)/dur,1);
      var val = Math.floor(p*target);
      el.textContent = (target % 1 === 0 ? val : (p*target).toFixed(0)) + suffix;
      if(p<1) requestAnimationFrame(tick); else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
  var cObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ animate(e.target); cObs.unobserve(e.target); } });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cObs.observe(el); });

  // form fake-submit
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit', function(ev){
      ev.preventDefault();
      var b = f.querySelector('button');
      b.textContent = "Thank you — we'll be in touch ✓";
      b.style.background = '#2f7d4f'; b.style.color = '#fff';
    });
  });

  // ===== accessibility =====
  // skip-to-content link
  var main = document.querySelector('section') ;
  if(main && !document.querySelector('.skip-link')){
    if(!main.id) main.id = 'main';
    var sk = document.createElement('a');
    sk.className='skip-link'; sk.href='#'+main.id; sk.textContent='Skip to content';
    document.body.insertBefore(sk, document.body.firstChild);
  }
  // hamburger ARIA
  if(toggle){
    toggle.setAttribute('aria-label','Toggle navigation menu');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-controls','nav');
    toggle.addEventListener('click', function(){
      toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true':'false');
    });
  }

  // ===== privacy notice (one-time) =====
  try{
    if(!localStorage.getItem('bws_privacy_ack')){
      var c = document.createElement('div');
      c.className='consent';
      c.setAttribute('role','region'); c.setAttribute('aria-label','Privacy notice');
      c.innerHTML = '<span>We respect your privacy. This site loads <strong>no third-party trackers or cookies</strong> by default — the map loads only when you click it. <a href="privacy-policy.html">Privacy&nbsp;Policy</a>.</span><button class="ok" type="button">Got it</button>';
      document.body.appendChild(c);
      c.querySelector('.ok').addEventListener('click', function(){
        try{ localStorage.setItem('bws_privacy_ack','1'); }catch(e){}
        c.remove();
      });
    }
  }catch(e){}

  // ===== click-to-load map (no Google request until user opts in) =====
  document.querySelectorAll('.map-facade').forEach(function(fa){
    fa.addEventListener('click', function(){
      var src = fa.getAttribute('data-map');
      if(!src) return;
      var ifr = document.createElement('iframe');
      ifr.title='Black Wall Street LLC location'; ifr.width='100%'; ifr.height='380';
      ifr.style.border='0'; ifr.style.display='block'; ifr.loading='lazy';
      ifr.referrerPolicy='no-referrer-when-downgrade'; ifr.src=src;
      fa.replaceWith(ifr);
    });
  });
})();
