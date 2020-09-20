import page from "page";
import Home from "./home/index.js";
import OmniUnits from "./omniunits/index.js";
import { loadOmniUnit, showOmniUnit } from "./omniunit/index.js";
import Dbbs from "./dbbs/index.js";
import NotFound from "./notfound.js";

page('/', Home);
page('/omniunits', OmniUnits);
page('/omniunits/:omniunit', loadOmniUnit, showOmniUnit);
page('/dbbs', Dbbs);
page('*', NotFound);
// Call it!
page();

window.prerenderReady = true;