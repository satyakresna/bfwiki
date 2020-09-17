import DbbCard from "../../components/dbb/Card.js";
import observeDbbsThumbnail from "./observeThumbnails.js";

export default function (dbbs) {
  if (Array.isArray(dbbs) && dbbs.length > 0) {
    // const lastElementChild = document.querySelector('ul#unit-list').lastElementChild;
    // const childrenElement = document.querySelector('ul#unit-list').children;

    // // Observe and do infinite scroll
    // let contentObserver = new IntersectionObserver(function (entries, self) {
    //   if (entries[0].isIntersecting) {
    //     const begin = (childrenElement.length - 1) + 1;
    //     const end = childrenElement.length + 100;
    //     if (childrenElement.length < units.length) {
    //       const nextUnits = units.slice(begin, end);
    //       const fragement = document.createDocumentFragment();
    //       for (const unit of nextUnits) {
    //         fragement.appendChild(UnitCard(unit));
    //       }
    //       document.querySelector('ul#unit-list').appendChild(fragement);
    //       observeUnitsContent(units);
    //     }
    //     self.unobserve(entries[0].target);
    //   }
    // }, {
    //   root: null, // page as root
    //   rootMargin: '0px',
    //   threshold: 1.0
    // });

    // contentObserver.observe(lastElementChild);

    observeDbbsThumbnail();
  }
}