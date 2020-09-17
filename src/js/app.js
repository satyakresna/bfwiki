import page from "page";
import Units from "./pages/units.js";
import Dbbs from "./pages/dbbs.js";
import { loadUnit, showUnit } from "./pages/unit.js";
import NotFound from "./pages/notfound.js";
import Home from "./pages/home.js";

page('/', Home);
page('/units', Units);
page('/units/:unit', loadUnit, showUnit);
page('/dbbs', Dbbs);
page('*', NotFound);
// Call it!
page();

window.prerenderReady = true;