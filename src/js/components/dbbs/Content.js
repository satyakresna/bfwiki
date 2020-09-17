import DbbCard from "../dbb/Card.js";

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
    // if (window.previousPage) {
    //   window.scrollTo(0, window.previousPage);
    // }
    // if (window.units) {
    //   observeUnitsContent(window.units);
    // } else {
    //   observeUnitsContent(units);
    // }
  } else {
    document.querySelector('main #dbb-list').remove();
    document.querySelector('main').appendChild(document.createRange().createContextualFragment(`
      <p class="text-center mt-4">
        <strong>Opps.. Not found. :(</strong>
      </p>
    `));
  }
}