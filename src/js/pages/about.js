import trackUrl from "../behaviours/trackUrl.js";
import closeMenu from "../behaviours/closeMenu.js";
import setActiveMenu from "../behaviours/setActiveMenu.js";

export default function (ctx) {
  closeMenu();
  setActiveMenu(ctx.path);
  console.log('ctx title before:', ctx.title);
  document.title = ctx.title = `About - Brave Frontier Wiki`;
  console.log('ctx title after:', ctx.title);
  import('../components/About.js').then(module => {
    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(module.default());
  });

  trackUrl(ctx);
}