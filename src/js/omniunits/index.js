import SearchForm from "./components/SearchForm.js";
import searchOmniUnits from "./behaviours/search.js";
import Skeleton from "./components/Skeleton.js";
import { getOmniUnitKeywords } from "../utils/keywords.js";
import setActiveMenu from "../utils/setActiveMenu.js";
import trackUrl from "../utils/trackUrl.js";
import { requestOmniUnits } from "../utils/request.js";

let searchOmniUnitKeywordsEl;
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
  searchOmniUnitKeywordsEl = new Choices(document.getElementById('searchOmniUnitKeywords'), {
    items: getOmniUnitKeywords(),
    choices: getOmniUnitKeywords(),
    removeItemButton: true,
    maxItemCount: 3,
    maxItemText: (maxItemCount) => {
      return `Only ${maxItemCount} values can be added`;
    }
  });
  let filteredOmniUnits;
  if (ctx.state.omniunits) {
    filteredOmniUnits = filterOmniUnits(ctx);
    import("./components/Content.js").then(module => {
      module.default(filteredOmniUnits);
      searchOmniUnits();
    });
  } else {
    requestOmniUnits().then(data => {
      ctx.state.omniunits = data;
      ctx.save();
      filteredOmniUnits = filterOmniUnits(ctx);
      import("./components/Content.js").then(module => {
        module.default(filteredOmniUnits);
        searchOmniUnits();
      });
    });
  }
}

function filterOmniUnits(ctx) {
  let filteredOmniUnits;
  if (ctx.querystring) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchName = searchParams.get('name');
    const searchElement = searchParams.get('element');
    const searchKeywords = searchParams.get('keywords');
    const selectedKeywords = (searchKeywords) ? searchKeywords.split(",") : [];
    if (searchName && searchElement && searchKeywords) {
      document.getElementById('searchOmniUnitName').value = searchName;
      document.getElementById('searchOmniUnitElement').value = searchElement;
      searchOmniUnitKeywordsEl.setChoiceByValue(selectedKeywords);
      filteredOmniUnits = ctx.state.omniunits.filter(omniunit => {
        let unitName = omniunit.name.toLowerCase();
        let unitElement = omniunit.element;
        if (unitName.includes(searchName.toLowerCase()) && unitElement === searchElement) {
          for (let keyword of omniunit.keywords) {
            if (selectedKeywords.includes(keyword)) {
              return omniunit;
            }
          }
        }
      });
    } else if (searchName && searchKeywords) {
      document.getElementById('searchOmniUnitName').value = searchName;
      searchOmniUnitKeywordsEl.setChoiceByValue(selectedKeywords);
      filteredOmniUnits = ctx.state.omniunits.filter(omniunit => {
        let unitName = omniunit.name.toLowerCase();
        if (unitName.includes(searchName.toLowerCase())) {
          for (let keyword of omniunit.keywords) {
            if (selectedKeywords.includes(keyword)) {
              return omniunit;
            }
          }
        }
      });
    } else if (searchElement && searchKeywords) {
      document.getElementById('searchOmniUnitElement').value = searchElement;
      searchOmniUnitKeywordsEl.setChoiceByValue(selectedKeywords);
      filteredOmniUnits = ctx.state.omniunits.filter(omniunit => {
        let unitElement = omniunit.element;
        if (unitElement === searchElement) {
          for (let keyword of omniunit.keywords) {
            if (selectedKeywords.includes(keyword)) {
              return omniunit;
            }
          }
        }
      });
    } else if (searchName) {
      document.getElementById('searchOmniUnitName').value = searchName;
      filteredOmniUnits = ctx.state.omniunits.filter(omniunit => {
        if (omniunit.name.toLowerCase().includes(searchName.toLowerCase())) {
          return omniunit;
        }
      });
    } else if (searchElement) {
      document.getElementById('searchOmniUnitElement').value = searchElement;
      filteredOmniUnits = ctx.state.omniunits.filter(omniunit => {
        if (omniunit.element === searchElement) {
          return omniunit;
        }
      });
    } else if (searchKeywords) {
      searchOmniUnitKeywordsEl.setChoiceByValue(selectedKeywords);
      filteredOmniUnits = ctx.state.omniunits.filter(omniunit => {
        for (let keyword of omniunit.keywords) {
          if (selectedKeywords.includes(keyword)) {
            return omniunit;
          }
        }
      });
    }
  } else {
    filteredOmniUnits = ctx.state.omniunits;
  }

  window.omniunits = filteredOmniUnits;
  let end = 99;
  if (window.selectedOmniUnitIndex && window.selectedOmniUnitIndex > end) {
    end = window.selectedOmniUnitIndex + 5;
  }

  return (filteredOmniUnits) ? filteredOmniUnits.slice(0, end) : [].slice(0, end);
}