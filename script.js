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
});
