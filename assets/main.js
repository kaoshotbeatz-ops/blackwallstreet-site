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
})();
