import UnitCard from "../unit/Card.js";
import observeUnitsContent from "../../behaviours/units/observeContent.js";

export default function (units) {
  if (Array.isArray(units) && units.length > 0) {
    const fragement = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    $ul.setAttribute('id', 'unitList');
    $ul.setAttribute('class', 'flex flex-col items-center md:flex-row md:flex-wrap md:justify-center');
    for (const unit of units.slice(0, 100)) {
      fragement.appendChild(UnitCard(unit));
    }
    $ul.appendChild(fragement);
    document.querySelector('main').appendChild($ul);
    observeUnitsContent(units);
  } else {
    document.querySelector('main').appendChild(document.createRange().createContextualFragment(`
      <p class="text-center mt-4">
        <strong>Opps.. Not found. :(</strong>
      </p>
    `));
  }
}