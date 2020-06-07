import { requestUnit } from "../utils/request.js";
import trackUrl from "../behaviours/trackUrl.js";
import setOgMeta from "../behaviours/setOgMeta.js";

export function loadUnit(ctx, next) {
  // check if we have .state.unit already available
  // this could for example be a cached html fragment.
  if (ctx.state.unit) {
    ctx.unit = ctx.state.unit;
    next();
    return;
  }

  requestUnit(encodeURIComponent(ctx.params.unit)).then(data => {
    ctx.state.unit = data;
    ctx.save();
    next();
  })
  .catch(error => {
    console.log(error);
    const $p = document.createElement('p');
    $p.setAttribute('class', 'text-center m-auto font-bold');
    $p.textContent = 'Opps, failed to get detail of unit. Please try again in 3 minutes...';
    document.querySelector('main').appendChild($p);
  });
}

export function showUnit(ctx) {
  window.previousPage = window.scrollY;
  trackUrl(ctx);
  document.title = ctx.title = `${ctx.state.unit.name} - Brave Frontier Wiki`;
  setOgMeta({
    title: ctx.state.unit.name,
    description: `${ctx.state.unit.name}'s Profile`,
    image: `${ctx.state.unit.artwork}`,
    url: window.location.href
  });
  if (window.units) {
    window.selectedUnitIndex = window.units.findIndex((unit) => {
      return unit.name === ctx.state.unit.name;
    });
  }
  import("../components/unit/Profile.js").then(({ default: UnitProfile }) => {
    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(UnitProfile(ctx.state.unit));
    document.getElementById('shareBtn').addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const module = await import("../behaviours/unit/share.js");
        module.default(ctx.state.unit);
      } catch (error) {
        console.log(error);
      }
    });
    // Scroll to the top page.
    window.scrollTo(0, 0);
  })
  .catch(error => console.log(error));
}