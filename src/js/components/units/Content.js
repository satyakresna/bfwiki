import UnitCard from "../unit/Card.js";
import observeUnitsContent from "../../behaviours/units/observeContent.js";

export default function (units) {
  if (Array.isArray(units) && units.length > 0) {
    const fragement = document.createDocumentFragment();
    const $unitList = document.getElementById('unit-list');
    $unitList.textContent = '';
    for (const unit of units) {
      fragement.appendChild(UnitCard(unit));
    }
    $unitList.appendChild(fragement);
    document.querySelector('main').appendChild($unitList);
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