import { closeMenu } from "../utils/utils.js";
import { requestUnits } from "../utils/request.js";
import renderUnitsContent from "../components/units/renderUnitsContent.js";
import observeUnitsContent from "../components/units/observeUnitsContent.js";
import observeUnitsThumbnail from "../components/units/observeUnitsThumbnail.js";
import searchUnits from "../components/units/searchUnits.js";

export function units(ctx) {
  document.title = 'Brave Frontier Wiki';
  document.querySelector('main').innerHTML = '';
  if (ctx.querystring !== '') {
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchUnitName = searchParams.get('unitname');
    const searchUnitElement = searchParams.get('unitelement');

    if (ctx.state.units) {
      let filteredUnits;
      if (searchUnitName !== null && searchUnitElement !== null) {
        filteredUnits = ctx.state.units.filter(item => {
          if ((item.name.toLowerCase().indexOf(searchUnitName.toLowerCase()) > -1) && item.element === searchUnitElement) {
            return item;
          }
        });
      } else if (searchUnitName !== null && searchUnitElement === null) {
        filteredUnits = ctx.state.units.filter(item => {
          if ((item.name.toLowerCase().indexOf(searchUnitName.toLowerCase()) > -1)) {
            return item;
          }
        });
      } else if (searchUnitName === null && searchUnitElement !== null) {
        filteredUnits = ctx.state.units.filter(item => {
          if (item.element === searchUnitElement) {
            return item;
          }
        });
      }

      renderUnitsContent(filteredUnits);

      if (searchUnitName !== null) {
        document.getElementById('searchUnitName').value = searchUnitName;
      }

      if (searchUnitElement !== null) {
        document.getElementById('searchUnitElement').value = searchUnitElement;
      }

      observeUnitsThumbnail();

      searchUnits(ctx);
    } else {
      requestUnits().then(data => {
        let filteredUnits;

        if (searchUnitName !== null && searchUnitElement !== null) {
          filteredUnits = data.filter(item => {
            if ((item.name.toLowerCase().indexOf(searchUnitName) > -1) && item.element === searchUnitElement) {
              return item;
            }
          });
        } else if (searchUnitName !== null && searchUnitElement === null) {
          filteredUnits = data.filter(item => {
            if ((item.name.toLowerCase().indexOf(searchUnitName) > -1)) {
              return item;
            }
          });
        } else if (searchUnitName === null && searchUnitElement !== null) {
          filteredUnits = data.filter(item => {
            if (item.element === searchUnitElement) {
              return item;
            }
          });
        }

        renderUnitsContent(filteredUnits);

        if (searchUnitName !== null) {
          document.getElementById('searchUnitName').value = searchUnitName;
        }
  
        if (searchUnitElement !== null) {
          document.getElementById('searchUnitElement').value = searchUnitElement;
        }

        observeUnitsThumbnail();

        searchUnits(ctx);
      })
      .catch(error => {
        const $p = document.createElement('p');
        $p.setAttribute('class', 'text-center m-auto font-bold');
        $p.textContent = 'Opps, failed to get omni units. Please try again in 3 minutes...';
        document.querySelector('main').appendChild($p);
      });
    }
  } else {
    if (ctx.state.units) {
      const begin = 0;
      const end = 100;
      renderUnitsContent(ctx.state.units.slice(begin, end));

      // Observe units content
      observeUnitsContent(ctx.state.units);

      searchUnits(ctx);
    } else {
      closeMenu();
      requestUnits().then(data => {
        const units = [];
        for (const unit of data) {
          delete unit.spRecommendation;
          delete unit.gender;
          delete unit.artwork;
          delete unit.gender;
          units.push(unit);
        }
        ctx.state.units = units;
        ctx.save();

        const begin = 0;
        const end = 100;
        renderUnitsContent(units.slice(begin, end));

        // Observe units content
        observeUnitsContent(units);

        searchUnits(ctx);
      })
    }
  }
}