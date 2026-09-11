/* Mensa Korea — English site */
(function () {
  'use strict';

  /* ---------------------------------------------------------- nav ------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function isMobile() { return window.matchMedia('(max-width: 940px)').matches; }

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  }

  function syncNav() {
    if (!nav) return;
    if (isMobile()) {
      setNav(false);
    } else {
      nav.hidden = false;
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(nav.hidden);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && isMobile()) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMobile() && !nav.hidden) {
        setNav(false);
        toggle.focus();
      }
    });
    window.addEventListener('resize', syncNav);
    syncNav();
  }

  /* ------------------------------------------------------- puzzle ------- */
  var puzzle = document.getElementById('puzzle');
  if (!puzzle) return;

  var blank = document.getElementById('puzzle-blank');
  var feedback = document.getElementById('puzzle-feedback');
  var options = puzzle.querySelectorAll('.puzzle__option');
  var ANSWER = 'b';
  var solved = false;

  var SOLVED_SVG =
    '<svg viewBox="0 0 100 100" aria-hidden="true">' +
    '<rect class="glyph glyph--answer" x="34" y="11" width="32" height="32" rx="2"/>' +
    '<rect class="glyph glyph--answer" x="11" y="54" width="32" height="32" rx="2"/>' +
    '<rect class="glyph glyph--answer" x="57" y="54" width="32" height="32" rx="2"/>' +
    '</svg>';

  var MISSES = [
    'Not that one. Each row uses one shape, and each column shows a different quantity.',
    'Still not it. Follow the shapes across each row and the quantities down each column.',
    'Try the bottom-right cell again: it needs three squares.'
  ];
  var missCount = 0;

  Array.prototype.forEach.call(options, function (btn) {
    btn.addEventListener('click', function () {
      if (solved) return;

      if (btn.dataset.key === ANSWER) {
        solved = true;
        blank.innerHTML = SOLVED_SVG;
        blank.classList.remove('puzzle__cell--blank');
        blank.classList.add('puzzle__cell--solved');
        blank.setAttribute('role', 'img');
        blank.setAttribute('aria-label', '3 squares');
        btn.classList.add('is-right');
        feedback.innerHTML =
          '<strong>That is the idea.</strong> The admission test uses visual figures like these — ' +
          'no Korean, English, or math. A score in the top 2% makes you eligible to apply for membership.';
        Array.prototype.forEach.call(options, function (o) { o.disabled = true; });
      } else {
        btn.classList.add('is-wrong');
        btn.disabled = true;
        feedback.textContent = MISSES[Math.min(missCount, MISSES.length - 1)];
        missCount += 1;
      }
    });
  });
})();
