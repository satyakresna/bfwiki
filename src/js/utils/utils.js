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

export function trackUrl(ctx) {
  if (window.ga !== undefined) {
    ga('set', 'page', {
      page: ctx.canonicalPath,
      title: document.title
    });
    ga('send', 'pageview');
  }
}