import { requestUnits } from "../utils/request.js";
import unitTemplate from "../components/unit/unitTemplate.js";

export function loadUnit(ctx, next) {
  // check if we have .state.unit already available
  // this could for example be a cached html fragment.
  if (ctx.state.unit) {
    ctx.unit = ctx.state.unit;
    next();
    return;
  }

  // pretend we're querying some database etc
  setTimeout(function () {
    // you can assign properties to the context
    // for use between these functions. The .state
    // property is what's saved in history.
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
  }, 300);
}

export function showUnit(ctx) {
  document.title = `${ctx.unit.name} - ${ctx.title}`;
  document.querySelector('main').innerHTML = unitTemplate(ctx.unit);
}