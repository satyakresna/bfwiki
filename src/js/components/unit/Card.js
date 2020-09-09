export default function (unit) {
  return document.createRange().createContextualFragment(`
  <li class="unit-card">
    <div class="unit-card-container">
      <img data-src="${unit.thumbnail}" width="50" height="50" alt="${unit.name}'s thumbnail" />
      <p class="unit-card-name font-semibold tracking-wide"><a href="units/${unit.name.split(' ').join('_')}">${unit.name}</a></p>
    </div>
  </li>
  `);
}