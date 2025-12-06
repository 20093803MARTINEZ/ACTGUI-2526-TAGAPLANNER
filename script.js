document.addEventListener('DOMContentLoaded', () => {
  const darkModeCheckbox = document.getElementById('darkMode');
  const fontSizeSlider = document.getElementById('font-size-slider');
  const openHelpButton = document.getElementById('openHelpButton');
  const closeHelpButton = document.getElementById('closeHelpButton');
  const helpPopup = document.getElementById('helpPopup');
  const logoutButton = document.getElementById('logout-button');
  const termsLink = document.getElementById('termsLink');
  const termsModal = document.getElementById('termsModal');
  const closeTermsButton = document.getElementById('closeTermsButton');

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  darkModeCheckbox.checked = savedDarkMode;
  document.body.classList.toggle('dark-mode', savedDarkMode);

  darkModeCheckbox.addEventListener('change', () => {
    const isDark = darkModeCheckbox.checked;
    localStorage.setItem('darkMode', isDark.toString());
    document.body.classList.toggle('dark-mode', isDark);
  });

  fontSizeSlider.addEventListener('input', () => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSizeSlider.value}px`);
  });

  openHelpButton.addEventListener('click', () => {
    helpPopup.style.display = 'flex';
  });

  closeHelpButton.addEventListener('click', () => {
    helpPopup.style.display = 'none';
  });

  helpPopup.addEventListener('click', (event) => {
    if (event.target === helpPopup) {
      helpPopup.style.display = 'none';
    }
  });

  logoutButton.addEventListener('click', () => {
    console.log('User logged out');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  });

  termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    termsModal.style.display = 'flex';
  });

  closeTermsButton.addEventListener('click', () => {
    termsModal.style.display = 'none';
  });

  termsModal.addEventListener('click', (event) => {
    if (event.target === termsModal) {
      termsModal.style.display = 'none';
    }
  });

    if (document.body.classList.contains('calendar-page')) {
    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];
    var weekTitles = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    var today = new Date();
    var activeYear = today.getFullYear();
    var activeMonth = today.getMonth();
    var activeWeekYear = today.getFullYear();
    var activeWeekMonth = today.getMonth();
    var activeWeekDate = new Date(activeWeekYear, activeWeekMonth, 1);

    function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
    function getFirstDay(y, m) { return new Date(y, m, 1).getDay(); }
    function setHeaderText(txt) { var t = document.getElementById('title'); if (t) t.innerText = txt; }
    function weekKey(y, m) { return 'weekNotes-' + y + '-' + m; }
    function renderHeaderControls(view) {
      var hc = document.getElementById('headerControls');
      if (!hc) return;
      hc.innerHTML = '';
      function addBtn(id, label, onClick) {
        var b = document.createElement('button');
        b.className = 'btn';
        b.id = id;
        b.innerText = label;
        b.addEventListener('click', onClick);
        hc.appendChild(b);
      }
      if (view === 'year') {
        addBtn('prevYear', 'Prev Year', function(){ activeYear--; showYearView(activeYear); });
        addBtn('nextYear', 'Next Year', function(){ activeYear++; showYearView(activeYear); });
      }
      if (view === 'month') {
        addBtn('prevMonth', 'Prev', function(){
          activeMonth--; if (activeMonth < 0) { activeMonth = 11; activeYear--; }
          showMonthView(activeYear, activeMonth);
        });
        addBtn('nextMonth', 'Next', function(){
          activeMonth++; if (activeMonth > 11) { activeMonth = 0; activeYear++; }
          showMonthView(activeYear, activeMonth);
        });
      }
      if (view === 'week') {
        addBtn('prevWeekYear', 'Prev Year', function(){
          activeWeekYear--; activeWeekDate = new Date(activeWeekYear, activeWeekMonth, 1); showWeekView(activeWeekDate);
        });
        addBtn('nextWeekYear', 'Next Year', function(){
          activeWeekYear++; activeWeekDate = new Date(activeWeekYear, activeWeekMonth, 1); showWeekView(activeWeekDate);
        });
        addBtn('prevWeekMonth', 'Prev Month', function(){
          activeWeekMonth--; if (activeWeekMonth < 0) { activeWeekMonth = 11; activeWeekYear--; }
          activeWeekDate = new Date(activeWeekYear, activeWeekMonth, 1); showWeekView(activeWeekDate);
        });
        addBtn('nextWeekMonth', 'Next Month', function(){
          activeWeekMonth++; if (activeWeekMonth > 11) { activeWeekMonth = 0; activeWeekYear++; }
          activeWeekDate = new Date(activeWeekYear, activeWeekMonth, 1); showWeekView(activeWeekDate);
        });
        addBtn('saveWeekNotes', 'Save', function(){
          var notes = document.querySelectorAll('#weekBoard .note');
          var data = {};
          for (var i = 0; i < notes.length; i++) {
            var d = notes[i].dataset.day;
            var f = notes[i].dataset.field;
            if (!data[d]) data[d] = {};
            data[d][f] = notes[i].value;
          }
          localStorage.setItem(weekKey(activeWeekYear, activeWeekMonth), JSON.stringify(data));
          alert('Saved');
        });
      }
    }

    function showYearView(y) {
      setHeaderText(String(y));
      renderHeaderControls('year');
      var grid = document.getElementById('yearGrid');
      if (!grid) return;
      grid.innerHTML = '';
      for (var m = 0; m < 12; m++) {
        var wrap = document.createElement('div');
        wrap.className = 'month-box';
        var head = document.createElement('div');
        head.className = 'month-title';
        head.innerText = monthNames[m];
        var weeknames = document.createElement('div');
        weeknames.className = 'month-weekdays';
        for (var i = 0; i < dayNames.length; i++) {
          var el = document.createElement('div');
          el.innerText = dayNames[i];
          weeknames.appendChild(el);
        }
        var days = document.createElement('div');
        days.className = 'month-days';
        var start = getFirstDay(y, m);
        var count = getDaysInMonth(y, m);
        for (var p = 0; p < start; p++) {
          var pad = document.createElement('div');
          pad.className = 'pad';
          pad.innerText = '.';
          days.appendChild(pad);
        }
        for (var d = 1; d <= count; d++) {
          var cell = document.createElement('div');
          var wd = new Date(y, m, d).getDay();
          cell.innerText = d;
          if (wd === 0) cell.className = 'sun';
          days.appendChild(cell);
        }
        wrap.appendChild(head);
        wrap.appendChild(weeknames);
        wrap.appendChild(days);
        grid.appendChild(wrap);
      }
    }

    function showMonthView(y, m) {
      setHeaderText(y + ' | ' + monthNames[m]);
      renderHeaderControls('month');
      var weeknames = document.getElementById('monthWeeknames');
      if (!weeknames) return;
      weeknames.innerHTML = '';
      for (var i = 0; i < dayNames.length; i++) {
        var el = document.createElement('div');
        el.innerText = dayNames[i];
        if (i === 0) el.style.color = '#d65a4a';
        weeknames.appendChild(el);
      }
      var grid = document.getElementById('monthGrid');
      if (!grid) return;
      grid.innerHTML = '';
      var start = getFirstDay(y, m);
      var count = getDaysInMonth(y, m);
      for (var p = 0; p < start; p++) {
        grid.appendChild(document.createElement('div'));
      }
      for (var d = 1; d <= count; d++) {
        var el = document.createElement('div');
        var wd = new Date(y, m, d).getDay();
        el.className = 'day' + (wd === 0 ? ' sun' : '');
        el.innerText = d;
        grid.appendChild(el);
      }
    }

    function startMonday(date) {
      var copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      var day = copy.getDay();
      var diff = (day === 0 ? -6 : 1) - day;
      copy.setDate(copy.getDate() + diff);
      return copy;
    }

    function showWeekView(date) {
      var y = date.getFullYear();
      var m = date.getMonth();
      var title = monthNames[m];
      setHeaderText(y + ' | ' + title);
      renderHeaderControls('week');
      var board = document.getElementById('weekBoard');
      if (!board) return;
      board.innerHTML = '';
      var count = getDaysInMonth(y, m);
      var saved = {};
      try {
        var raw = localStorage.getItem(weekKey(y, m));
        saved = raw ? JSON.parse(raw) : {};
      } catch (e) { saved = {}; }
      var grid = document.createElement('div');
      grid.className = 'calendar-grid';
      for (var d = 1; d <= count; d++) {
        var card = document.createElement('div');
        card.className = 'card';
        var dayLabel = document.createElement('div');
        dayLabel.className = 'labels';
        dayLabel.innerText = 'Day ' + d;

        var accLabel = document.createElement('div');
        accLabel.className = 'labels';
        accLabel.innerText = 'Accomplishments:';
        var accNote = document.createElement('textarea');
        accNote.className = 'note';
        accNote.dataset.day = String(d);
        accNote.dataset.field = 'acc';
        accNote.value = (saved[d] && saved[d].acc) ? saved[d].acc : '';

        var todoLabel = document.createElement('div');
        todoLabel.className = 'labels';
        todoLabel.innerText = "To-Do's:";
        var todoNote = document.createElement('textarea');
        todoNote.className = 'note';
        todoNote.dataset.day = String(d);
        todoNote.dataset.field = 'todo';
        todoNote.value = (saved[d] && saved[d].todo) ? saved[d].todo : '';

        var blockLabel = document.createElement('div');
        blockLabel.className = 'labels';
        blockLabel.innerText = 'Blockers:';
        var blockNote = document.createElement('textarea');
        blockNote.className = 'note';
        blockNote.dataset.day = String(d);
        blockNote.dataset.field = 'block';
        blockNote.value = (saved[d] && saved[d].block) ? saved[d].block : '';

        card.appendChild(dayLabel);
        card.appendChild(accLabel);
        card.appendChild(accNote);
        card.appendChild(todoLabel);
        card.appendChild(todoNote);
        card.appendChild(blockLabel);
        card.appendChild(blockNote);
        grid.appendChild(card);
      }
      board.appendChild(grid);
    }

    function switchView(viewName) {
      var sections = document.querySelectorAll('.section');
      for (var i = 0; i < sections.length; i++) sections[i].classList.remove('active');
      var target = document.getElementById(viewName);
      if (target) target.classList.add('active');
      var links = document.querySelectorAll('.nav a');
      for (var j = 0; j < links.length; j++) {
        links[j].classList.toggle('active', links[j].dataset.view === viewName);
      }
    }

    var navLinks = document.querySelectorAll('.nav a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        var v = this.dataset.view;
        switchView(v);
        if (v === 'year') showYearView(activeYear);
        if (v === 'month') showMonthView(activeYear, activeMonth);
        if (v === 'week') showWeekView(activeWeekDate);
      });
    }


    showYearView(activeYear);
  }
});
