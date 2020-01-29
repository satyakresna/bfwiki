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

    function units() {
      document.querySelector('main').innerHTML = '';
      closeMenu();
      requestUnits().then(data => {
        const fragement = document.createDocumentFragment();
        const $ul = document.createElement('ul');
        $ul.setAttribute('class', 'flex flex-col items-center md:flex-row md:flex-wrap md:justify-center');
        data.forEach(unit => {
          const $li = document.createElement('li');
          $li.setAttribute('class', 'flex flex-col items-center p-4 m-4 w-1/2 md:w-1/6 bg-white shadow');
          $li.innerHTML = unitsTemplate(unit);
          fragement.appendChild($li);
        });
        $ul.appendChild(fragement);
        document.querySelector('main').appendChild($ul);

        // Lazy image
        observeUnitsContent();
      })
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