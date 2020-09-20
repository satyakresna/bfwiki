import OmniUnitCard from "../components/Card.js";
import observeOmniUnitsThumbnail from "./observeThumbnails.js";

export default function observeOmniUnitsContent(omniunits) {
  if (Array.isArray(omniunits) && omniunits.length > 0) {
    const lastElementChild = document.querySelector('ul#omniunit-list').lastElementChild;
    const childrenElement = document.querySelector('ul#omniunit-list').children;
    // Observe and do infinite scroll
    let contentObserver = new IntersectionObserver(function (entries, self) {
      if (entries[0].isIntersecting) {
        const begin = (childrenElement.length - 1) + 1;
        const end = childrenElement.length + 100;
        if (childrenElement.length < omniunits.length) {
          const nextOmniUnits = omniunits.slice(begin, end);
          const fragement = document.createDocumentFragment();
          for (const omniunit of nextOmniUnits) {
            fragement.appendChild(OmniUnitCard(omniunit));
          }
          document.querySelector('ul#omniunit-list').appendChild(fragement);
          observeOmniUnitsContent(units);
        }
        self.unobserve(entries[0].target);
      }
    }, {
      root: null, // page as root
      rootMargin: '0px',
      threshold: 1.0
    });

    contentObserver.observe(lastElementChild);

    observeOmniUnitsThumbnail();
  }
}