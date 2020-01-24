document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    page('/', index);
    page('/about', about);
    page('/users', users);
    page('/users/:username', users);
    page('*', notfound);
    // Call it!
    page();

    function index() {
      document.querySelector('main').textContent = 'Index';
    }

    function about() {
      closeMenu();
      document.querySelector('main').textContent = 'About';
    }

    function users(ctx) {
      closeMenu();
      document.querySelector('main').textContent = `User ${ctx.params.username || ''}`;
    }

    function notfound() {
      document.querySelector('main').textContent = 'Not found';
    }

    function closeMenu() {
      const $menuToggle = document.getElementById('menuToggle');
      if ($menuToggle.checked) {
        $menuToggle.checked = false; 
        setTransition();
      }
    }

    document.getElementById('menuToggle').addEventListener('click', function () {
      setTransition();
    });

    function setTransition() {
      const $sidebarMenu = document.getElementById('sidebarMenu');
      $sidebarMenu.style.transition = "transform 250ms ease-in-out";
      setTimeout(function () {
        $sidebarMenu.style.transitionProperty = "none";
      }, 300);
    }
  }
}