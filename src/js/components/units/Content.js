import UnitCard from "../unit/Card.js";
import observeUnitsContent from "../../behaviours/units/observeContent.js";

export default function (units) {
  if (Array.isArray(units) && units.length > 0) {
    const fragement = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    $ul.setAttribute('id', 'unit-list');
    for (const unit of units) {
      fragement.appendChild(UnitCard(unit));
    }
    $ul.appendChild(fragement);
    document.querySelector('main').appendChild($ul);
    if (window.previousPage) {
      window.scrollTo(0, window.previousPage);
    }
    if (window.units) {
      observeUnitsContent(window.units);
    } else {
      observeUnitsContent(units);
    }
  } else {
    document.querySelector('main').appendChild(document.createRange().createContextualFragment(`
      <p class="text-center mt-4">
        <strong>Opps.. Not found. :(</strong>
      </p>
    `));
  }
}