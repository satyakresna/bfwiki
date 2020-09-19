import setActiveMenu from "../behaviours/setActiveMenu.js";
import trackUrl from "../behaviours/trackUrl.js";
import { requestUnits } from "../utils/request.js";
import SearchForm from "../components/units/SearchForm.js";
import searchUnits from "../behaviours/units/search.js";
import Skeleton from "../components/units/Skeleton.js";
import { getUnitKeywords } from "../utils/keywords.js";

let searchUnitKeywordsEl;
export default function (ctx) {
  if (document.body.classList.contains('bg-white')) {
    document.body.classList.remove('bg-white');
    document.body.classList.add('bg-gray-300');
  }
  trackUrl(ctx);
  setActiveMenu(ctx.path);
  document.title = ctx.title = 'Brave Frontier Wiki';
  document.querySelector('main').textContent = '';
  document.querySelector('main').appendChild(SearchForm());
  document.querySelector('main').appendChild(Skeleton());
  searchUnitKeywordsEl = new Choices(document.getElementById('searchUnitKeywords'), {
    items: getUnitKeywords(),
    choices: getUnitKeywords(),
    removeItemButton: true,
    maxItemCount: 3,
    maxItemText: (maxItemCount) => {
      return `Only ${maxItemCount} values can be added`;
    }
  });
  let filteredUnits;
  if (ctx.state.units) {
    filteredUnits = filterUnits(ctx);
    import("../components/units/Content.js").then(module => {
      module.default(filteredUnits);
      searchUnits();
    });
  } else {
    requestUnits().then(data => {
      ctx.state.units = data;
      ctx.save();
      filteredUnits = filterUnits(ctx);
      import("../components/units/Content.js").then(module => {
        module.default(filteredUnits);
        searchUnits();
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
    const searchKeywords = searchParams.get('keywords');
    const selectedKeywords = decodeURIComponent(searchKeywords).split(",");
    if (searchName && searchElement && searchKeywords) {
      document.getElementById('searchUnitName').value = searchName;
      document.getElementById('searchUnitElement').value = searchElement;
      searchUnitKeywordsEl.setChoiceByValue(selectedKeywords);
      filteredUnits = ctx.state.units.filter(unit => {
        let unitName = unit.name.toLowerCase();
        let unitElement = unit.element;
        if (unitName.includes(searchName.toLowerCase()) && unitElement === searchElement) {
          for (let keyword of unit.keywords) {
            if (selectedKeywords.includes(keyword)) {
              return unit;
            }
          }
        }
      });
    } else if (searchName && searchKeywords) {
      document.getElementById('searchUnitName').value = searchName;
      searchUnitKeywordsEl.setChoiceByValue(selectedKeywords);
      filteredUnits = ctx.state.units.filter(unit => {
        let unitName = unit.name.toLowerCase();
        if (unitName.includes(searchName.toLowerCase())) {
          for (let keyword of unit.keywords) {
            if (selectedKeywords.includes(keyword)) {
              return unit;
            }
          }
        }
      });
    } else if (searchElement && searchKeywords) {
      document.getElementById('searchUnitElement').value = searchElement;
      searchUnitKeywordsEl.setChoiceByValue(selectedKeywords);
      filteredUnits = ctx.state.units.filter(unit => {
        let unitElement = unit.element;
        if (unitElement === searchElement) {
          for (let keyword of unit.keywords) {
            if (selectedKeywords.includes(keyword)) {
              return unit;
            }
          }
        }
      });
    } else if (searchName) {
      document.getElementById('searchUnitName').value = searchName;
      filteredUnits = ctx.state.units.filter(unit => {
        if (unit.name.toLowerCase().includes(searchName.toLowerCase())) {
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
    } else if (searchKeywords) {
      searchUnitKeywordsEl.setChoiceByValue(selectedKeywords);
      filteredUnits = ctx.state.units.filter(unit => {
        for (let keyword of unit.keywords) {
          if (selectedKeywords.includes(keyword)) {
            return unit;
          }
        }
      });
    }
  } else {
    filteredUnits = ctx.state.units;
  }

  window.units = filteredUnits;
  let end = 99;
  if (window.selectedUnitIndex && window.selectedUnitIndex > end) {
    end = window.selectedUnitIndex + 5;
  }

  return (filteredUnits) ? filteredUnits.slice(0, end) : [].slice(0, end);
}