import DbbCard from "./Card.js";

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
      observeContent(window.dbbs);
    } else {
      observeContent(dbbs);
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

function observeContent (dbbs) {
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
          observeContent(dbbs);
        }
        self.unobserve(entries[0].target);
      }
    }, {
      root: null, // page as root
      rootMargin: '0px',
      threshold: 1.0
    });

    contentObserver.observe(lastElementChild);

    observeThumbnails();
  }
}

function observeThumbnails () {
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