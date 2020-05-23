import trackUrl from "../behaviours/trackUrl.js";
import closeMenu from "../behaviours/closeMenu.js";
import setActiveMenu from "../behaviours/setActiveMenu.js";

export default function (ctx) {
  trackUrl(ctx);
  setActiveMenu(ctx.path);
  closeMenu();
  document.title = ctx.title = `About - Brave Frontier Wiki`;
  import('../components/About.js').then(module => {
    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(module.default());
  });
}