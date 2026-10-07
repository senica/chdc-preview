/* CHDC – accessible navigation: mobile menu toggle + sub-menu disclosure buttons. No dependencies. */
(function () {
  'use strict';
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;
  var desktop = window.matchMedia('(min-width: 78rem)');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
  }
  function setSub(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var sub = document.getElementById(btn.getAttribute('aria-controls'));
    if (sub) sub.classList.toggle('is-open', open);
  }
  function closeAllSubs(except) {
    nav.querySelectorAll('.submenu-toggle[aria-expanded="true"]').forEach(function (b) { if (b !== except) setSub(b, false); });
  }

  toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });

  nav.querySelectorAll('.submenu-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      closeAllSubs(btn);
      setSub(btn, open);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openBtn = nav.querySelector('.submenu-toggle[aria-expanded="true"]');
    if (openBtn) { setSub(openBtn, false); openBtn.focus(); return; }
    if (toggle.getAttribute('aria-expanded') === 'true' && !desktop.matches) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeAllSubs(); });
  nav.addEventListener('focusout', function (e) { if (e.relatedTarget && !nav.contains(e.relatedTarget)) closeAllSubs(); });
  var onChange = function () { if (desktop.matches) { setMenu(false); } closeAllSubs(); };
  desktop.addEventListener ? desktop.addEventListener('change', onChange) : desktop.addListener(onChange);
})();
