import setActiveMenu from "../behaviours/setActiveMenu.js";
import trackUrl from "../behaviours/trackUrl.js";
import closeMenu from "../behaviours/closeMenu.js";
import { requestUnits } from "../utils/request.js";
import UnitsContent from "../components/units/UnitsContent.js";
import observeUnitsContent from "../behaviours/units/observeUnitsContent.js";
import searchUnits from "../behaviours/units/searchUnits.js";

export default function (ctx) {
  setActiveMenu(ctx.path);
  document.title = ctx.title = 'Brave Frontier Wiki';
  document.querySelector('main').innerHTML = '';
  if (ctx.querystring) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchName = searchParams.get('name');
    const searchElement = searchParams.get('element');

    if (ctx.state.units) {
      let filteredUnits;
      if (searchName && searchElement) {
        filteredUnits = ctx.state.units.filter(item => {
          if ((item.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1) && item.element === searchElement) {
            return item;
          }
        });
      } else if (searchName) {
        filteredUnits = ctx.state.units.filter(item => {
          if ((item.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1)) {
            return item;
          }
        });
      } else if (searchElement) {
        filteredUnits = ctx.state.units.filter(item => {
          if (item.element === searchElement) {
            return item;
          }
        });
      }

      UnitsContent(filteredUnits);

      if (searchName) {
        document.getElementById('searchUnitName').value = searchName;
      }

      if (searchElement) {
        document.getElementById('searchUnitElement').value = searchElement;
      }

      if (filteredUnits.length > 0) {
        observeUnitsContent(filteredUnits);
      }

      searchUnits(ctx);
    } else {
      requestUnits().then(data => {
        let filteredUnits;

        if (searchName && searchElement) {
          filteredUnits = data.filter(item => {
            if ((item.name.toLowerCase().indexOf(searchName) > -1) && item.element === searchElement) {
              return item;
            }
          });
        } else if (searchName) {
          filteredUnits = data.filter(item => {
            if ((item.name.toLowerCase().indexOf(searchName) > -1)) {
              return item;
            }
          });
        } else if (searchElement) {
          filteredUnits = data.filter(item => {
            if (item.element === searchElement) {
              return item;
            }
          });
        }

        UnitsContent(filteredUnits);

        if (searchName) {
          document.getElementById('searchUnitName').value = searchName;
        }
  
        if (searchElement) {
          document.getElementById('searchUnitElement').value = searchElement;
        }

        observeUnitsContent(filteredUnits);

        searchUnits(ctx);
      })
      .catch(error => {
        const $p = document.createElement('p');
        $p.setAttribute('class', 'text-center m-auto font-bold');
        $p.textContent = 'Opps, failed to get omni units. Please try again...';
        document.querySelector('main').appendChild($p);
      });
    }
  } else {
    if (ctx.state.units) {
      const begin = 0;
      const end = 100;
      UnitsContent(ctx.state.units.slice(begin, end));

      // Observe units content
      observeUnitsContent(ctx.state.units);

      searchUnits(ctx);
    } else {
      requestUnits().then(data => {
        const units = [];
        for (const unit of data) {
          delete unit.spRecommendation;
          delete unit.cost;
          units.push(unit);
        }
        ctx.state.units = units;
        ctx.save();

        const begin = 0;
        const end = 100;
        UnitsContent(units.slice(begin, end));

        // Observe units content
        observeUnitsContent(units);

        searchUnits(ctx);
      })
    }
  }
  closeMenu();
  trackUrl(ctx);
}