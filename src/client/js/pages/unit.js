import { requestUnits } from "../utils/request.js";
import trackUrl from "../behaviours/trackUrl.js";

export function loadUnit(ctx, next) {
  // check if we have .state.unit already available
  // this could for example be a cached html fragment.
  if (ctx.state.unit) {
    ctx.unit = ctx.state.unit;
    next();
    return;
  }

  requestUnits().then(data => {
    for (const unit of data) {
      if (unit.name === ctx.params.unit.split('_').join(' ')) {
        ctx.state.unit = unit;
        ctx.unit = unit;
        ctx.save();
        next();
      }
    }
  })
  .catch(error => {
    const $p = document.createElement('p');
    $p.setAttribute('class', 'text-center m-auto font-bold');
    $p.textContent = 'Opps, failed to get detail of unit. Please try again in 3 minutes...';
    document.querySelector('main').appendChild($p);
  });
}

export function showUnit(ctx) {
  document.title = ctx.title = `${ctx.unit.name} - Brave Frontier Wiki`;
  import("../components/unit/Profile.js").then(({ default: UnitProfile }) => {
    document.querySelector('main').innerHTML = UnitProfile(ctx.unit);
    document.getElementById('shareBtn').addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const module = await import("../behaviours/unit/share.js");
        module.default(ctx);
      } catch (error) {
        console.log(error);
      }
    })
  });

  trackUrl(ctx);
}