import UnitCard from "./UnitCard.js";
import SearchForm from "../SearchForm.js";

export default function (units) {
  // Search form
  document.querySelector('main').appendChild(SearchForm());

  if (Array.isArray(units) && units.length > 0) {
    const fragement = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    $ul.setAttribute('id', 'unitList');
    $ul.setAttribute('class', 'flex flex-col items-center md:flex-row md:flex-wrap md:justify-center');
    for (const unit of units) {
      fragement.appendChild(UnitCard(unit));
    }
    $ul.appendChild(fragement);
    document.querySelector('main').appendChild($ul);
  } else {
    const $p = document.createElement('p');
    $p.setAttribute('class', 'text-center mt-4');
    $p.innerHTML = `<strong>Opps.. Not found. :(</strong>`;
    document.querySelector('main').appendChild($p);
  }
}