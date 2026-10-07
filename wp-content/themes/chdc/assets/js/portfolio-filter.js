/* CHDC – Our Work: client-side filter + sort. Cards are server-rendered; without JS all projects show. */
(function () {
  'use strict';
  var form = document.getElementById('project-filters');
  var grid = document.getElementById('project-grid');
  if (!form || !grid) return;
  var cards = Array.prototype.slice.call(grid.children);
  var count = document.getElementById('results-count');
  var empty = document.getElementById('empty-note');
  var sort = document.getElementById('f-sort');
  var total = cards.length;

  function val(name) { var el = form.querySelector('[data-filter="' + name + '"]'); return el ? el.value : ''; }

  function apply() {
    var status = val('status'), decade = val('decade'), tag = val('tag'), shown = 0;
    cards.forEach(function (c) {
      var tags = (c.dataset.tags || '').split(' ');
      var ok = (!status || c.dataset.status === status) &&
               (!decade || c.dataset.decade === decade) &&
               (!tag || tags.indexOf(tag) > -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    var s = sort.value;
    cards.sort(function (a, b) {
      switch (s) {
        case 'year-asc': return a.dataset.year - b.dataset.year;
        case 'units-desc': return b.dataset.units - a.dataset.units;
        case 'title-asc': return a.dataset.title.localeCompare(b.dataset.title);
        default: return b.dataset.year - a.dataset.year;
      }
    }).forEach(function (c) { grid.appendChild(c); });
    count.textContent = (shown === total ? 'Showing all ' + total + ' projects' : 'Showing ' + shown + ' of ' + total + ' projects');
    empty.hidden = shown !== 0;
  }
  form.addEventListener('change', apply);
  form.addEventListener('reset', function () { setTimeout(apply, 0); });
  apply();
})();
