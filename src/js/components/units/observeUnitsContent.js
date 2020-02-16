import unitsTemplate from "./unitsTemplate.js";
import observeUnitsThumbnail from "./observeUnitsThumbnail.js";

export default function observeUnitsContent(units) {
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