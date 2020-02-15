export function closeMenu () {
  const $menuToggle = document.getElementById('menuToggle');
  if ($menuToggle.checked) {
    $menuToggle.checked = false;
    setTransition();
  }
}

export function setTransition() {
  const $sidebarMenu = document.getElementById('sidebarMenu');
  $sidebarMenu.style.transition = "transform 250ms ease-in-out";
  setTimeout(function () {
    $sidebarMenu.style.transitionProperty = "none";
  }, 300);
}