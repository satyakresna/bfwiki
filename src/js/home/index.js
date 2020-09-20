import trackUrl from "../utils/trackUrl.js";
import setActiveMenu from "../utils/setActiveMenu.js";

export default function (ctx) {
  if (document.body.classList.contains('bg-gray-300')) {
    document.body.classList.remove('bg-gray-300');
    document.body.classList.add('bg-white');
  }
  trackUrl(ctx);
  setActiveMenu(ctx.path);
  document.title = ctx.title = `Brave Frontier Wiki | Unofficial`;
  import('./components/Home.js').then(module => {
    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(module.default());
  });
}