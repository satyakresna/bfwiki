export default function (unit) {
  return document.createRange().createContextualFragment(`
  <li class="flex flex-col items-center lg:p-4 m-4 max-w-xs w-2/3 md:w-1/3 lg:w-1/5 h-40 bg-white shadow rounded">
    <div class="flex flex-col items-center m-auto">
      <img data-src="${unit.thumbnail}" width="50" height="50" alt="${unit.name}'s thumbnail" />      
      <p class="text-sm text-center mt-2"><a href="units/${unit.name.split(' ').join('_')}" class="hover:underline hover:text-blue-700"><strong>${unit.name}</strong></a></p>
    </div>
  </li>
  `);
}