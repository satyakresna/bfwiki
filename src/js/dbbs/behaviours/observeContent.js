import DbbCard from "../components/Card.js";
import observeDbbsThumbnail from "./observeThumbnails.js";

export default function observeDbbsContent (dbbs) {
  if (Array.isArray(dbbs) && dbbs.length > 0) {
    const lastElementChild = document.querySelector('ul#dbb-list').lastElementChild;
    const childrenElement = document.querySelector('ul#dbb-list').children;
    // Observe and do infinite scroll
    let contentObserver = new IntersectionObserver(function (entries, self) {
      if (entries[0].isIntersecting) {
        const begin = (childrenElement.length - 1) + 1;
        const end = childrenElement.length + 50;
        if (childrenElement.length < dbbs.length) {
          const nextDbbs = dbbs.slice(begin, end);
          const fragement = document.createDocumentFragment();
          for (const dbb of nextDbbs) {
            fragement.appendChild(DbbCard(dbb));
          }
          document.querySelector('ul#dbb-list').appendChild(fragement);
          observeDbbsContent(dbbs);
        }
        self.unobserve(entries[0].target);
      }
    }, {
      root: null, // page as root
      rootMargin: '0px',
      threshold: 1.0
    });

    contentObserver.observe(lastElementChild);

    observeDbbsThumbnail();
  }
}