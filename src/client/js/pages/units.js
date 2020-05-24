import setActiveMenu from "../behaviours/setActiveMenu.js";
import trackUrl from "../behaviours/trackUrl.js";
import { requestUnits } from "../utils/request.js";
import SearchForm from "../components/SearchForm.js";
import closeMenu from "../behaviours/closeMenu.js";
import searchUnits from "../behaviours/units/search.js";

export default function (ctx) {
  closeMenu();
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
      import("../components/units/Content.js").then(module => {
        module.default(data);
      });
    })
    .catch(error => {
      const $p = document.createElement('p');
      $p.setAttribute('class', 'text-center m-auto font-bold');
      $p.textContent = 'Opps, failed to get omni units. Please try again...';
      document.querySelector('main').appendChild($p);
    });
  } else {
    requestUnits().then(data => {
      import("../components/units/Content.js").then(module => {
        module.default(data);
      });
    });
  }

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    searchUnits(ctx);
  });

  document.getElementById('searchUnitElement').onchange = (e) => {
    e.preventDefault();
    searchUnits(ctx);
  }
}