import setActiveMenu from "../behaviours/setActiveMenu.js";
import trackUrl from "../behaviours/trackUrl.js";
import { requestUnits } from "../utils/request.js";
import UnitsContent from "../components/units/UnitsContent.js";
import observeUnitsContent from "../behaviours/units/observeUnitsContent.js";
import SearchForm from "../components/SearchForm.js";
import searchUnits from "../behaviours/units/searchUnits.js";

export default function (ctx) {
  trackUrl(ctx);
  setActiveMenu(ctx.path);
  document.title = ctx.title = 'Brave Frontier Wiki';
  document.querySelector('main').textContent = '';
  document.querySelector('main').appendChild(SearchForm());
  if (ctx.querystring) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchName = searchParams.get('name');
    const searchElement = searchParams.get('element');

    if (searchName) {
      document.getElementById('searchUnitName').value = searchName;
    }

    if (searchElement) {
      document.getElementById('searchUnitElement').value = searchElement;
    }

    requestUnits(ctx.querystring).then(data => {
      UnitsContent(data);

      observeUnitsContent(data);

      searchUnits(ctx);
    })
    .catch(error => {
      const $p = document.createElement('p');
      $p.setAttribute('class', 'text-center m-auto font-bold');
      $p.textContent = 'Opps, failed to get omni units. Please try again...';
      document.querySelector('main').appendChild($p);
    });
  } else {
    requestUnits().then(data => {

      UnitsContent(data.slice(0, 100));

      observeUnitsContent(data);

      searchUnits(ctx);
    });
  }
}