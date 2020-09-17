import setActiveMenu from "../behaviours/setActiveMenu.js";
import trackUrl from "../behaviours/trackUrl.js";
import { requestDbbs } from "../utils/request.js";
import Skeleton from "../components/dbbs/Skeleton.js";
import SearchForm from "../components/dbbs/SearchForm.js";

export default function (ctx) {
    if (document.body.classList.contains('bg-white')) {
        document.body.classList.remove('bg-white');
        document.body.classList.add('bg-gray-300');
    }
    trackUrl(ctx);
    setActiveMenu(ctx.path);
    document.title = ctx.title = 'Brave Frontier Wiki';
    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(SearchForm());
    document.querySelector('main').appendChild(Skeleton());
    requestDbbs().then(data => {
        ctx.state.dbbs = data;
        ctx.save();
        import("../components/dbbs/Content.js").then(module => {
            module.default(data);
        });
    });
}