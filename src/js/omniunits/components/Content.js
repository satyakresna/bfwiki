import OmniUnitCard from "./Card.js";

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
      observeContent(window.omniunits);
    } else {
      observeContent(omniunits);
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

function observeContent(omniunits) {
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
          observeContent(omniunits);
        }
        self.unobserve(entries[0].target);
      }
    }, {
      root: null, // page as root
      rootMargin: '0px',
      threshold: 1.0
    });

    contentObserver.observe(lastElementChild);

    observeThumbnail();
  }
}

function observeThumbnail () {
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