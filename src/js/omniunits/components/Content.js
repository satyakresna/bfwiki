import OmniUnitCard from "./Card.js";
import observeOmniUnitsContent from "../behaviours/observeContent.js";

export default function (omniunits) {
  if (Array.isArray(omniunits) && omniunits.length > 0) {
    const fragement = document.createDocumentFragment();
    const $omniUnitList = document.getElementById('omniunit-list');
    $omniUnitList.textContent = '';
    for (const omniunit of omniunits) {
      fragement.appendChild(OmniUnitCard(omniunit));
    }
    $omniUnitList.appendChild(fragement);
    document.querySelector('main').appendChild($omniUnitList);
    if (window.previousOmniUnitsPage) {
      window.scrollTo(0, window.previousOmniUnitsPage);
    }
    if (window.omniunits) {
      observeOmniUnitsContent(window.omniunits);
    } else {
      observeOmniUnitsContent(omniunits);
    }
  } else {
    document.querySelector('main #omniunit-list').remove();
    document.querySelector('main').appendChild(document.createRange().createContextualFragment(`
      <p class="text-center mt-4">
        <strong>Opps.. Not found. :(</strong>
      </p>
    `));
  }
}