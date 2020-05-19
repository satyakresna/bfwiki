import page from "page";
import Units from "./pages/units.js";
import { loadUnit, showUnit } from "./pages/unit.js";
import NotFound from "./pages/notfound.js";
import About from "./pages/about.js";
import openMenu from "./behaviours/openMenu.js";
import closeMenu from "./behaviours/closeMenu.js";

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    page('/', Units);
    page('/about', About);
    page('/units/:unit', loadUnit, showUnit);
    page('*', NotFound);
    // Call it!
    page();

    document.querySelector('button.header__hamburger-btn').addEventListener('click', function () {
      openMenu();
    });

    document.querySelector('button.nav__hide-btn').addEventListener('click', function () {
      closeMenu();
    });

    document.querySelector('div.menu-underlay').addEventListener('click', function () {
      closeMenu();
    });
  }
}