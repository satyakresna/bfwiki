export default function (unit) {
  return document.createRange().createContextualFragment(`
  <li class="unit-card">
    <div class="flex flex-col items-center m-auto">
      <img data-src="${unit.thumbnail}" width="50" height="50" alt="${unit.name}'s thumbnail" />      
      <p class="text-sm text-center mt-2"><a href="units/${unit.name.split(' ').join('_')}" class="hover:underline hover:text-blue-700"><strong>${unit.name}</strong></a></p>
    </div>
  </li>
  `);
}