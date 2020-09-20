import DbbCard from "../dbb/Card.js";
import observeDbbsContent from "../../behaviours/dbbs/observeContent.js";

export default function (dbbs) {
  if (Array.isArray(dbbs) && dbbs.length > 0) {
    const fragement = document.createDocumentFragment();
    const $dbbList = document.getElementById('dbb-list');
    $dbbList.textContent = '';
    for (const dbb of dbbs) {
      fragement.appendChild(DbbCard(dbb));
    }
    $dbbList.appendChild(fragement);
    document.querySelector('main').appendChild($dbbList);
    // if (window.previousOmniUnitsPage) {
    //   window.scrollTo(0, window.previousOmniUnitsPage);
    // }
    if (window.dbbs) {
      observeDbbsContent(window.dbbs);
    } else {
      observeDbbsContent(dbbs);
    }
  } else {
    document.querySelector('main #dbb-list').remove();
    document.querySelector('main').appendChild(document.createRange().createContextualFragment(`
      <p class="text-center mt-4">
        <strong>Opps.. Not found. :(</strong>
      </p>
    `));
  }
}