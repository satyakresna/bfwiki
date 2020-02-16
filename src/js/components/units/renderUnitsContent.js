import unitsTemplate from "./unitsTemplate.js";

export default function renderUnitsContent(units) {
  const fragement = document.createDocumentFragment();
  const $ul = document.createElement('ul');
  $ul.setAttribute('id', 'unitList');
  $ul.setAttribute('class', 'flex flex-col items-center md:flex-row md:flex-wrap md:justify-center');
  for (const unit of units) {
    const $li = document.createElement('li');
    $li.setAttribute('class', 'flex flex-col items-center p-4 m-4 w-1/2 md:w-1/6 bg-white shadow unit');
    $li.innerHTML = unitsTemplate(unit);
    fragement.appendChild($li);
  }
  $ul.appendChild(fragement);
  document.querySelector('main').appendChild($ul);

  // Search form
  const $form = document.createRange().createContextualFragment(`
  <form method="GET" class="w-3/4 mx-auto py-2 my-4">
  <div class="relative">
    <span>
      <input class="focus:outline-0 bg-transparent border-b border-gray-500 focus:border-green-500 placeholder-gray-600 py-2 pr-4 pl-10 w-full appearance-none leading-normal" type="text" placeholder="Search the unit" id="searchUnitName">
    </span>
    <div class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
      <svg class="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
    </div>
  </div>
</form>
  `);
  document.querySelector('main').insertBefore($form, $ul);
}