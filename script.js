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

  function setFontSize(size: 'small' | 'medium' | 'large'): void {
    let fontSize: string;
  
    if (size === 'small') fontSize = '12px';
    else if (size === 'medium') fontSize = '16px';
    else fontSize = '20px';
  
    const settingsContainer = document.querySelector('.settings-container') as HTMLElement;
    if (settingsContainer) {
      settingsContainer.style.fontSize = fontSize;
    }
      document.querySelectorAll('.font-btn').forEach(btn => btn.classList.remove('active'));
  
    const activeBtn = document.querySelector(`.font-btn.${size}`);
    if (activeBtn) activeBtn.classList.add('active');
  }
  
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
