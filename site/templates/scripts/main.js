// theme switcher
const html = document.querySelector('html');
html.dataset.theme = `theme-dark`;
let darkMode = localStorage.getItem('dark-mode');

function switchTheme(theme) {
    html.dataset.theme = `theme-${theme}`;
}

function switchAssets(theme) {

    if (theme === "dark") {
        document.getElementById("dark-mode-btn").innerHTML = '<svg width="16pt" height="16pt" viewBox="0 0 16 18" fill="currentColor"><path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/></svg>';
        document.getElementById("dark-mode-btn-desktop").innerHTML = '<svg width="16pt" height="16pt" viewBox="0 0 16 18" fill="currentColor"><path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/></svg>';
    } else {
        document.getElementById("dark-mode-btn").innerHTML = '<svg width="16pt" height="16pt" viewBox="0 0 16 18"><path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/></svg>';
        document.getElementById("dark-mode-btn-desktop").innerHTML = '<svg width="16pt" height="16pt" viewBox="0 0 16 18" fill="inherit"><path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/></svg>';
    }
}

// logos switcher
function toggleTheme() {
  if (html.dataset.theme === 'theme-light') {
      switchTheme('dark');
      switchAssets('dark');
      localStorage.setItem("dark-mode", "enabled");
  } else {
      switchTheme('light');
      switchAssets('light');
      localStorage.setItem("dark-mode", "disabled");
  }
}

if (darkMode === "disabled") { // set state of darkMode on page load
  document.addEventListener('DOMContentLoaded', (event) => {
      switchAssets();
  });
}

/*
// listen to os preference
const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const matchMediaPrefDark = window.matchMedia('(prefers-color-scheme: dark)');

function startListeningToOSTheme() {
    matchMediaPrefDark.addEventListener('change', onSystemThemeChange);
}

function stopListeningToOSTheme() {
    matchMediaPrefDark.removeEventListener('change', onSystemThemeChange);
}

function onSystemThemeChange(e) {
    const isDark = e.matches;
    document.querySelector('html').dataset.theme = `theme-${isDark ? 'dark' : 'light'}`;
}
*/