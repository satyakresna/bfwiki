import { units } from "./pages/units.js";
import { loadUnit, showUnit } from "./pages/unit.js";
import { notfound } from "./pages/notfound.js";
import { about } from "./pages/about.js";
import { setTransition } from "./utils/utils.js";

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    page('/', units);
    page('/about', about);
    page('/units/:unit', loadUnit, showUnit);
    page('*', notfound);
    // Call it!
    page();

    document.getElementById('menuToggle').addEventListener('click', function () {
      setTransition();
    });
  }
}