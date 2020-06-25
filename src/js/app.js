import page from "page";
import Units from "./pages/units.js";
import { loadUnit, showUnit } from "./pages/unit.js";
import NotFound from "./pages/notfound.js";
import Home from "./pages/home.js";

page('/', Home);
page('/units', Units);
page('/units/:unit', loadUnit, showUnit);
page('*', NotFound);
// Call it!
page();

window.prerenderReady = true;