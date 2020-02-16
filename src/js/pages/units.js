import { closeMenu } from "../utils/utils.js";
import { requestUnits } from "../utils/request.js";

export function units(ctx) {
  document.title = 'Brave Frontier Wiki';
  document.querySelector('main').innerHTML = '';
  if (ctx.state.units) {
    const begin = 0;
    const end = 100;
    renderUnitsContent(ctx.state.units.slice(begin, end));

    // Observe units content
    observeUnitsContent(ctx.state.units);
  } else {
    closeMenu();
    requestUnits().then(data => {
      const units = [];
      for (const unit of data) {
        delete unit.spRecommendation;
        delete unit.gender;
        delete unit.artwork;
        delete unit.gender;
        units.push(unit);
      }
      ctx.state.units = units;
      ctx.save();

      const begin = 0;
      const end = 100;
      renderUnitsContent(units.slice(begin, end));

      // Observe units content
      observeUnitsContent(units);
    })
  }
}

export function unitsTemplate(unit) {
  const path = unit.name.split(' ').join('_');
  return `
      <img data-src="${unit.thumbnail}" width="50" height="50"/>
      <p class="text-sm mt-2"><a href="units/${path}">${unit.name}</a></p>`
}

export function observeUnitsContent(units) {
  const lastElementChild = document.querySelector('ul#unitList').lastElementChild;
  const childrenElement = document.querySelector('ul#unitList').children;

  // Observe and do infinite scroll
  let contentObserver = new IntersectionObserver(function (entries, self) {
    if (entries[0].isIntersecting) {
      const begin = (childrenElement.length - 1) + 1;
      const end = childrenElement.length + 100;
      if (childrenElement.length < units.length) {
        const nextUnits = units.slice(begin, end);
        const fragement = document.createDocumentFragment();
        for (const unit of nextUnits) {
          const $li = document.createElement('li');
          $li.setAttribute('class', 'flex flex-col items-center p-4 m-4 w-1/2 md:w-1/6 bg-white shadow unit');
          $li.innerHTML = unitsTemplate(unit);
          fragement.appendChild($li);
        }
        document.querySelector('ul#unitList').appendChild(fragement);
        observeUnitsContent(units);
      }
      self.unobserve(entries[0].target);
    }
  }, {
    root: null, // page as root
    rootMargin: '0px',
    threshold: 1.0
  });

  contentObserver.observe(lastElementChild);

  observeUnitsThumbnail();
}

export function observeUnitsThumbnail() {
  const $images = document.querySelectorAll('[data-src]');
  const config = {
    rootMargin: '0px 0px 50px 0px',
    threshold: 0
  };

  let imageObserver = new IntersectionObserver(function (entries, self) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const src = entry.target.getAttribute('data-src');
        if (!src) { return; }
        entry.target.src = src;
        self.unobserve(entry.target);
      }
    });
  }, config);

  $images.forEach(image => {
    imageObserver.observe(image);
  });
}

export function renderUnitsContent(units) {
  console.log(units);
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