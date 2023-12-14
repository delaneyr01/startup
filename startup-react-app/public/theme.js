// Function to apply the selected theme color
function applyTheme() {
    const colorPicker = document.getElementById('colorPicker').value;
    document.documentElement.style.setProperty('--theme-color', colorPicker);
  }

  const applyThemeButton = document.getElementById('applyThemeButton');
  applyThemeButton.addEventListener('click', applyTheme);