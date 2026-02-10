const toggleSwitch = document.getElementById("dark-mode-toggle");
const body = document.body;
const ball = document.querySelector(".toggle-switch .ball");
const logo = document.getElementById("logo");
let nbRetourAccueil = 0;

let toggleDisabled = false;

function disableTransitionsOnLoad() {
  body.classList.add("disable-transitions");
  window.requestAnimationFrame(() => {
    body.classList.remove("disable-transitions");
  });
}

function updateToggleAria(isDark) {
  toggleSwitch.setAttribute("role", "switch");
  toggleSwitch.setAttribute("aria-checked", isDark);
  toggleSwitch.setAttribute("aria-label", "Toggle dark mode");
}

function loadDarkModePreference() {
  const saved = localStorage.getItem("dark-mode");
  if (saved === null) {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      body.classList.add("dark-mode");
      updateToggleAria(true);
    } else {
      updateToggleAria(false);
    }
  } else if (saved === "true") {
    body.classList.add("dark-mode");
    updateToggleAria(true);
  } else {
    updateToggleAria(false);
  }
}

function animateBallSpin() {
  ball.classList.add("spin");
  ball.addEventListener(
    "animationend",
    () => {
      ball.classList.remove("spin");
    },
    { once: true }
  );
}

function debounceToggle() {
  if (toggleDisabled) return false;
  toggleDisabled = true;
  setTimeout(() => {
    toggleDisabled = false;
  }, 700);
  return true;
}

function toggleDarkMode() {
  if (!debounceToggle()) return;
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem("dark-mode", isDark);
  updateToggleAria(isDark);
  animateBallSpin();
  showToggleToast(isDark);
}

function showToggleToast(isDark) {
  if (document.getElementById("toast-toggle")) return;
  const toast = document.createElement("div");
  toast.id = "toast-toggle";
  toast.textContent = isDark ? "Mode sombre activé" : "Mode clair activé";
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "rgba(0,0,0,0.7)";
  toast.style.color = "white";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";
  toast.style.border = isDark ? "1.5px solid rgba(255, 255, 255, 0.75)" : "1.5px solid rgba(0, 0, 0, 0.75)";
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 2500);
}

function handleKeydownToggle(e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleDarkMode();
  }
}

function setupSwipeToggle() {
  let touchstartX = 0;
  let touchendX = 0;
  toggleSwitch.addEventListener("touchstart", e => {
    touchstartX = e.changedTouches[0].screenX;
  }, {passive: true});
  toggleSwitch.addEventListener("touchend", e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  }, {passive: true});
  function handleSwipeGesture() {
    const deltaX = touchendX - touchstartX;
    if (Math.abs(deltaX) > 50) {
      toggleDarkMode();
    }
  }
}

let logoAnimTimeout;
function animateLogoClick() {
  if (logoAnimTimeout) {
    clearTimeout(logoAnimTimeout);
    logo.style.transition = "";
    logo.style.transform = "";
  }
  body.classList.remove("spin");
  void body.offsetWidth;
  body.classList.add("spin");
  logo.style.transition = "transform 0.3s ease";
  logo.style.transform = "translateY(-20px)";
  if (body.classList.contains("dark-mode")) {
    body.style.border = "2px solid white";
  } else {
    body.style.border = "2px solid black";
  }
  logoAnimTimeout = setTimeout(() => {
    logo.style.transform = "translateY(0)";
    body.style.border = "";
  }, 300);
}

function watchSystemThemeChange() {
  if (!window.matchMedia) return;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", e => {
    if (localStorage.getItem("dark-mode") === null) {
      if (e.matches) {
        body.classList.add("dark-mode");
        updateToggleAria(true);
      } else {
        body.classList.remove("dark-mode");
        updateToggleAria(false);
      }
    }
  });
}

function initialize() {
  disableTransitionsOnLoad();
  toggleSwitch.setAttribute("tabindex", "0");
  loadDarkModePreference();
  watchSystemThemeChange();
  toggleSwitch.addEventListener("click", toggleDarkMode);
  toggleSwitch.addEventListener("keydown", handleKeydownToggle);
  setupSwipeToggle();
  if ("loading" in HTMLImageElement.prototype) {
    logo.setAttribute("loading", "lazy");
  }
  logo.addEventListener("click", animateLogoClick);
}

document.addEventListener("DOMContentLoaded", initialize);
