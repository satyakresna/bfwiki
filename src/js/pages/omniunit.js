import { requestOmniUnit } from "../utils/request.js";
import trackUrl from "../behaviours/trackUrl.js";
import setOgMeta from "../behaviours/setOgMeta.js";

export function loadOmniUnit(ctx, next) {
  // check if we have .state.omniunit already available
  // this could for example be a cached html fragment.
  if (document.body.classList.contains('bg-gray-300')) {
    document.body.classList.remove('bg-gray-300');
    document.body.classList.add('bg-white');
  }
  if (ctx.state.omniunit) {
    ctx.omniunit = ctx.state.omniunit;
    next();
    return;
  }
  NProgress.start();
  requestOmniUnit(encodeURIComponent(ctx.params.omniunit)).then(data => {
    ctx.state.omniunit = data;
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

export function showOmniUnit(ctx) {
  window.previousOmniUnitsPage = window.scrollY;
  trackUrl(ctx);
  document.title = ctx.title = `${ctx.state.omniunit.name} - Brave Frontier Wiki`;
  setOgMeta({
    title: ctx.state.omniunit.name,
    description: `${ctx.state.omniunit.name}'s Profile`,
    image: `${ctx.state.omniunit.artwork}`,
    url: window.location.href
  });
  if (window.units) {
    window.selectedOmniUnitIndex = window.units.findIndex((unit) => {
      return unit.name === ctx.state.omniunit.name;
    });
  }
  import("../components/omniunit/Profile.js").then(({ default: OmniUnitProfile }) => {
    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(OmniUnitProfile(ctx.state.omniunit));
    document.getElementById('shareBtn').addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const module = await import("../behaviours/omniunit/share.js");
        module.default(ctx.state.omniunit);
      } catch (error) {
        console.log(error);
      }
    });
    // Scroll to the top page.
    window.scrollTo(0, 0);
    NProgress.done();
  })
  .catch(error => console.log(error));
}