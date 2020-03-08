import { requestUnits } from "../utils/request.js";
import { trackUrl } from "../utils/utils.js";
import unitTemplate from "../components/unit/unitTemplate.js";

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
  document.title = `${ctx.unit.name} - ${ctx.title}`;
  document.querySelector('main').innerHTML = unitTemplate(ctx.unit);
  const $shareBtn = document.getElementById('shareBtn');
  $shareBtn.addEventListener('click', (e) => {
    if (navigator.share) {
      const title = document.title;
      const text = ctx.unit.name;
      const url = document.querySelector('link[rel=canonical]') && document.querySelector('link[rel=canonical]').href || window.location.href;
      navigator.share({
        title,
        text,
        url
      })
      .then(() => {
        console.log('Successful share');
      })
      .catch(error => {
        console.log('Error sharing', error);
      })
    } else {
      console.log('Not supported, sorry');
    }
  })

  trackUrl(ctx);
}