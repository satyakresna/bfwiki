import { requestUnits } from "../utils/request.js";

export function loadUnit(ctx, next) {
  ctx.state.unitname = ctx.params.unit.split('_').join(' ');
  next();
}

export function showUnit(ctx) {
  requestUnits().then(data => {
    let selectedUnit;
    for (const unit of data) {
      if (unit.name === ctx.state.unitname) {
        selectedUnit = unit;
      }
    }
    document.title = `${ctx.state.unitname} - ${ctx.title}`;
    document.querySelector('main').innerHTML = unitTemplate(selectedUnit);
  })
    .catch(error => {
      document.querySelector('main').textContent = 'Not found.';
    });
}

function unitTemplate(unit) {
  return `
  <article class="flex flex-col items-center m-auto">
    <img src="${unit.artwork}" alt="${unit.name}'s artwork" width="150" height="150" />
    <h1>${unit.name}</h1>
    <p>${unit.gender}</p>
  </article>`
}