import page from "page";
import OmniUnits from "./pages/omniunits.js";
import Dbbs from "./pages/dbbs.js";
import { loadOmniUnit, showOmniUnit } from "./pages/omniunit.js";
import NotFound from "./pages/notfound.js";
import Home from "./pages/home.js";

page('/', Home);
page('/omniunits', OmniUnits);
page('/omniunits/:omniunit', loadOmniUnit, showOmniUnit);
page('/dbbs', Dbbs);
page('*', NotFound);
// Call it!
page();

window.prerenderReady = true;