import trackUrl from "../behaviours/trackUrl.js";
import setActiveMenu from "../behaviours/setActiveMenu.js";

export default function (ctx) {
  trackUrl(ctx);
  setActiveMenu(ctx.path);
  document.title = ctx.title = `Brave Frontier Wiki | Unofficial`;
  import('../components/Home.js').then(module => {
    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(module.default());
  });
}