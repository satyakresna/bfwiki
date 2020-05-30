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
  let filteredUnits;
  if (ctx.state.units) {
    filteredUnits = filterUnits(ctx);
    import("../components/units/Content.js").then(module => {
      module.default(filteredUnits);
      searchUnits(ctx);
    });
  } else {
    requestUnits().then(data => {
      ctx.state.units = data;
      ctx.save();
      filteredUnits = filterUnits(ctx);
      import("../components/units/Content.js").then(module => {
        module.default(filteredUnits);
        searchUnits(ctx);
      });
    });
  }
}

function filterUnits(ctx) {
  let filteredUnits;
  if (ctx.querystring) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchName = searchParams.get('name');
    const searchElement = searchParams.get('element');
    if (searchName && searchElement) {
      document.getElementById('searchUnitName').value = searchName;
      document.getElementById('searchUnitElement').value = searchElement;
      filteredUnits = ctx.state.units.filter(unit => {
        if (unit.name.toLowerCase().includes(searchName) && unit.element === searchElement) {
          return unit;
        }
      });
    } else if (searchName) {
      document.getElementById('searchUnitName').value = searchName;
      filteredUnits = ctx.state.units.filter(unit => {
        if (unit.name.toLowerCase().includes(searchName)) {
          return unit;
        }
      });
    } else if (searchElement) {
      document.getElementById('searchUnitElement').value = searchElement;
      filteredUnits = ctx.state.units.filter(unit => {
        if (unit.element === searchElement) {
          return unit;
        }
      });
    }
  } else {
    filteredUnits = ctx.state.units;
  }
  
  window.units = filteredUnits;
  let end = 99;
  if (window.lastUnitIndex && window.lastUnitIndex > end) {
    end = window.lastUnitIndex + 5;
  }

  return filteredUnits.slice(0, end);
}