document.addEventListener('DOMContentLoaded', function() {
  var darkModeCheckbox = document.getElementById('darkMode');
  var fontButtons = document.querySelectorAll('.font-btn');
  var settingsContainer = document.querySelector('.settings-container');
  var openHelpButton = document.getElementById('openHelpButton');
  var closeHelpButton = document.getElementById('closeHelpButton');
  var helpPopup = document.getElementById('helpPopup');
  var logoutButton = document.getElementById('logout-button');
  var termsLink = document.getElementById('termsLink');
  var termsModal = document.getElementById('termsModal');
  var closeTermsButton = document.getElementById('closeTermsButton');

  // Dark mode
  darkModeCheckbox.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', darkModeCheckbox.checked);
  });

  // Font size
  fontButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var size = '16px';
      if (btn.classList.contains('small')) size = '12px';
      if (btn.classList.contains('large')) size = '20px';
      settingsContainer.style.fontSize = size;
      fontButtons.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // Help popup
  openHelpButton.addEventListener('click', function() { helpPopup.style.display = 'flex'; });
  closeHelpButton.addEventListener('click', function() { helpPopup.style.display = 'none'; });
  helpPopup.addEventListener('click', function(e){ if(e.target === helpPopup) helpPopup.style.display = 'none'; });

  // Logout
  logoutButton.addEventListener('click', function() {
    alert("User logged out (simulate redirect)");
  });

  // Terms modal
  termsLink.addEventListener('click', function(e){ 
    e.preventDefault(); 
    termsModal.style.display = 'flex'; 
  });
  closeTermsButton.addEventListener('click', function(){ termsModal.style.display = 'none'; });
  termsModal.addEventListener('click', function(e){ if(e.target === termsModal) termsModal.style.display = 'none'; });
});
