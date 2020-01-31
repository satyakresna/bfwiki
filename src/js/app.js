const requestUnits = async () => {
  const response = await fetch('https://raw.githubusercontent.com/satyakresna/scraping-bravefrontier/master/units.json');
  const json = await response.json();
  return json;
}

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    page('/', index);
    page('/about', about);
    page('/units', units);
    page('/units/:unit', showUnit);
    page('*', notfound);
    // Call it!
    page();

    function index() {
      // Empty the previous content
      document.querySelector('main').innerHTML = `
        <h1>Brave Frontier Wiki</h1>
        <p>This wiki to help you search units and spheres in Brave Frontier</p>
      `;
    }

    function about() {
      closeMenu();
      document.querySelector('main').textContent = 'About';
    }

    function units(ctx) {
      document.querySelector('main').innerHTML = '';
      if (ctx.querystring !== '') {
        const searchValue = decodeURI(ctx.querystring.split('=')[1]).toLowerCase();
        requestUnits().then(data => {
          const units = data.filter(item => {
            if ((item.name.toLowerCase().indexOf(searchValue) > -1)) {
              return item;
            }
          });
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
              <input class="focus:outline-0 bg-transparent border-b border-gray-500 focus:border-green-500 placeholder-gray-600 py-2 pr-4 pl-10 w-full appearance-none leading-normal" type="text" placeholder="Search the unit" id="unitName">
            </span>
            <div class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
              <svg class="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
            </div>
          </div>
        </form>
          `);
          document.querySelector('main').insertBefore($form, $ul);

          document.getElementById('unitName').value = decodeURI(ctx.querystring.split('=')[1]);

          observeUnitsThumbnail();

          document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const $unitName = document.getElementById('unitName');
            if ($unitName.value !== '') {
              const unitName = encodeURI($unitName.value);
              page.show(`${window.location.pathname}?search=${unitName}`, ctx.state);
            } else {
              page.show(`${window.location.pathname}`, ctx.state);
            }
          });
        })
      } else {
        closeMenu();
        requestUnits().then(data => {
          // Stupid way (?): store unit length in window.
          if (window.unitLength == undefined) {
            window.unitLength = data.length;
          }

          const begin = 0;
          const end = 100;
          const units = data.slice(begin, end);
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
              <input class="focus:outline-0 bg-transparent border-b border-gray-500 focus:border-green-500 placeholder-gray-600 py-2 pr-4 pl-10 w-full appearance-none leading-normal" type="text" placeholder="Search the unit" id="unitName">
            </span>
            <div class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
              <svg class="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
            </div>
          </div>
        </form>
        `);
          document.querySelector('main').insertBefore($form, $ul);

          // Observe units content
          observeUnitsContent();

          document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const $unitName = document.getElementById('unitName');
            if ($unitName.value !== '') {
              const unitName = encodeURI($unitName.value);
              page.show(`${window.location.pathname}?search=${unitName}`, ctx.state);
            } else {
              page.show(`${window.location.pathname}`, ctx.state);
            }
          });
        })
      }
    }

    function showUnit(ctx) {
      requestUnits().then(data => {
        let selectedUnit;
        for (const unit of data) {
          if (unit.name === ctx.params.unit.split('_').join(' ')) {
            selectedUnit = unit;
          }
        }
        document.querySelector('main').innerHTML = unitTemplate(selectedUnit);
      })
        .catch(error => {
          document.querySelector('main').textContent = 'Not found.';
        });
    }

    function unitsTemplate(unit) {
      const path = unit.name.split(' ').join('_');
      return `
          <img data-src="${unit.thumbnail}" width="50" height="50"/>
          <p class="text-sm mt-2"><a href="units/${path}">${unit.name}</a></p>`
    }

    function observeUnitsContent() {
      const lastElementChild = document.querySelector('ul#unitList').lastElementChild;
      const childrenElement = document.querySelector('ul#unitList').children;

      // Observe and do infinite scroll
      let contentObserver = new IntersectionObserver(function (entries, self) {
        if (entries[0].isIntersecting) {
          const begin = (childrenElement.length - 1) + 1;
          const end = childrenElement.length + 100;
          if (childrenElement.length < window.unitLength) {
            requestUnits().then(data => {
              const units = data.slice(begin, end);
              const fragement = document.createDocumentFragment();
              for (const unit of units) {
                const $li = document.createElement('li');
                $li.setAttribute('class', 'flex flex-col items-center p-4 m-4 w-1/2 md:w-1/6 bg-white shadow unit');
                $li.innerHTML = unitsTemplate(unit);
                fragement.appendChild($li);
              }
              document.querySelector('ul#unitList').appendChild(fragement);
              observeUnitsContent();
            })
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

    function observeUnitsThumbnail() {
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

    function unitTemplate(unit) {
      return `
      <article>
        <h1>${unit.name}</h1>
        <img src="${unit.artwork}" alt="${unit.name}'s artwork" width="150" height="150" />
        <p>${unit.gender}</p>
        <p>${unit.rarity}</p>
      </article>`
    }

    function notfound() {
      closeMenu();
      document.querySelector('main').textContent = 'Not found';
    }

    function closeMenu() {
      const $menuToggle = document.getElementById('menuToggle');
      if ($menuToggle.checked) {
        $menuToggle.checked = false;
        setTransition();
      }
    }

    document.getElementById('menuToggle').addEventListener('click', function () {
      setTransition();
    });

    function setTransition() {
      const $sidebarMenu = document.getElementById('sidebarMenu');
      $sidebarMenu.style.transition = "transform 250ms ease-in-out";
      setTimeout(function () {
        $sidebarMenu.style.transitionProperty = "none";
      }, 300);
    }
  }
}