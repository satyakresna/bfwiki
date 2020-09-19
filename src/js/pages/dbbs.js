import setActiveMenu from "../behaviours/setActiveMenu.js";
import trackUrl from "../behaviours/trackUrl.js";
import { requestDbbs } from "../utils/request.js";
import Skeleton from "../components/dbbs/Skeleton.js";
import SearchForm from "../components/dbbs/SearchForm.js";
import searchDbbs from "../behaviours/dbbs/search.js";

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
    let filteredDbbs;
    requestDbbs().then(data => {
        ctx.state.dbbs = data;
        ctx.save();
        filteredDbbs = filterDbbs(ctx);
        import("../components/dbbs/Content.js").then(module => {
            module.default(filteredDbbs);
            searchDbbs();
        });
    });
}

function filterDbbs(ctx) {
    let filteredDbbs;
    if (ctx.querystring) {
        const searchParams = new URLSearchParams(ctx.querystring);
        const searchName = searchParams.get('name');
        const searchEsName = searchParams.get('esname');
        if (searchName && searchEsName) {
            document.getElementById('searchUnitName').value = searchName;
            document.getElementById('searchElementalSynergy').value = searchEsName;
            filteredDbbs = ctx.state.dbbs.filter(dbb => {
                let firstUnitName = dbb.firstUnitName.toLowerCase();
                let secondUnitName = dbb.secondUnitName.toLowerCase();
                let esName = dbb.elementalSynergyName;
                if (firstUnitName.includes(searchName.toLowerCase()) || secondUnitName.includes(searchName.toLocaleLowerCase())) {
                    if (esName === searchEsName) {
                        return dbb;
                    }
                }
            });
        } else if (searchName) {
            document.getElementById('searchUnitName').value = searchName;
            filteredDbbs = ctx.state.dbbs.filter(dbb => {
                let firstUnitName = dbb.firstUnitName.toLowerCase();
                let secondUnitName = dbb.secondUnitName.toLowerCase();
                if (firstUnitName.includes(searchName.toLowerCase()) || secondUnitName.includes(searchName.toLocaleLowerCase())) {
                    return dbb;
                }
            });
        } else if (searchEsName) {
            document.getElementById('searchElementalSynergy').value = searchEsName;
            filteredDbbs = ctx.state.dbbs.filter(dbb => {
                let esName = dbb.elementalSynergyName;
                if (esName === searchEsName) {
                    return dbb;
                }
            });
        }
    } else {
        filteredDbbs = ctx.state.dbbs;
    }
    window.dbbs = filteredDbbs;
    let end = 49;
    return (filteredDbbs) ? filteredDbbs.slice(0, end) : [].slice(0, end);
}