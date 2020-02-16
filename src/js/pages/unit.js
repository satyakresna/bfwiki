import { requestUnits } from "../utils/request.js";

export function loadUnit(ctx, next) {
  // check if we have .state.unit already available
  // this could for example be a cached html fragment.
  if (ctx.state.unit) {
    ctx.unit = ctx.state.unit;
    next();
    return;
  }

  // pretend we're querying some database etc
  setTimeout(function () {
    // you can assign properties to the context
    // for use between these functions. The .state
    // property is what's saved in history.
    requestUnits().then(data => {
      for (const unit of data) {
        if (unit.name === ctx.params.unit.split('_').join(' ')) {
          ctx.state.unit = unit;
          ctx.unit = unit;
          ctx.save();
          next();
        }
      }
    });
  }, 300);
}

export function showUnit(ctx) {
  document.title = `${ctx.unit.name} - ${ctx.title}`;
  document.querySelector('main').innerHTML = unitTemplate(ctx.unit);
}

function unitTemplate(unit) {
  return `
  <article class="flex flex-col items-center m-auto w-full md:w-1/2 p-4 bg-white my-8">
    <img src="${unit.artwork}" alt="${unit.name}'s artwork" width="300" height="300" />
    <h1>${unit.name}</h1>
    <p>${unit.gender}</p>
    ${unit.hasOwnProperty('spRecommendation') ? renderSPRecommendation(unit.spRecommendation) : ''}
  </article>`
}

function renderSPRecommendation(spRecommendation) {
  const $section = document.createElement('section');
  $section.setAttribute('class', 'w-full')
  for (const sp of spRecommendation) {
    var title, analysis;
    const fragment = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    for (const item of sp) {
      if (item.hasOwnProperty('title')) {
        title = item.title;
      }
      if (item.hasOwnProperty('analysis')) {
        analysis = item.analysis;
      }
      if (item.hasOwnProperty('cost') && item.hasOwnProperty('option')) {
        const $li = document.createElement('li');
        $li.setAttribute('class', 'flex text-sm justify-between items-center my-4');
        $li.innerHTML = `<span class="w-9/12 inline-block">${item.option}</span> <button class="border rounded-full border-yellow-600 bg-blue-600 text-white w-8 h-8 inline-block">${item.cost}</button>`;
        fragment.appendChild($li);
      }
    }
    $ul.appendChild(fragment);
    $section.innerHTML += `
      <div class="my-8">
        ${ (title !== undefined) ? `<h2 class="mb-4"><strong>${title}</strong></h2>` : ''}
        ${$ul.outerHTML}
        ${ (analysis !== undefined) ? `<p class="mt-4 text-xs"><em>Analysis: ${analysis}</em></p>` : ''} 
      </div>
    `;
  }
  return $section.outerHTML;
}