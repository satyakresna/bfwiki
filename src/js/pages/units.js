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
    const searchValue = decodeURI(ctx.querystring.split('=')[1]).toLowerCase();

    if (ctx.state.units) {
      const filteredUnits = ctx.state.units.filter(item => {
        if ((item.name.toLowerCase().indexOf(searchValue) > -1)) {
          return item;
        }
      });

      renderUnitsContent(filteredUnits);

      document.getElementById('searchUnitName').value = searchValue;

      observeUnitsThumbnail();

      searchUnits(ctx);
    } else {
      requestUnits().then(data => {
        const filteredUnits = data.filter(item => {
          if ((item.name.toLowerCase().indexOf(searchValue) > -1)) {
            return item;
          }
        });

        renderUnitsContent(filteredUnits);

        document.getElementById('searchUnitName').value = searchValue;

        observeUnitsThumbnail();

        searchUnits(ctx);
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