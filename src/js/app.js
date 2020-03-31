import { units } from "./pages/units.js";
import { loadUnit, showUnit } from "./pages/unit.js";
import { notfound } from "./pages/notfound.js";
import { about } from "./pages/about.js";
import closeMenu from "./behaviours/closeMenu.js";
import page from "./plugins/page.mjs";

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    page('/', units);
    page('/about', about);
    page('/units/:unit', loadUnit, showUnit);
    page('*', notfound);
    // Call it!
    page();

    document.querySelector('button.header__hamburger-btn').addEventListener('click', function () {
      document.getElementById('sidebarMenu').style.transform = "translateX(0)";
      document.getElementById('sidebarMenu').style.transition = "transform 250ms ease-in-out";
      document.querySelector('div.menu-underlay').style.display = "block";
      document.querySelector('div.menu-underlay').style.pointerEvents = "auto";
      document.getElementById('sidebarMenu').addEventListener('transitionend', function (e) {
        e.target.style.transitionProperty = "none";
      });
      document.body.style.overflow = "hidden";
    });

    document.querySelector('button.nav__hide-btn').addEventListener('click', function () {
      closeMenu();
    });

    document.querySelector('div.menu-underlay').addEventListener('click', function () {
      closeMenu();
    });
  }
}