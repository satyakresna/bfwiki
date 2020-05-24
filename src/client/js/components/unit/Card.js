export default function (unit) {
  return document.createRange().createContextualFragment(`
  <li class="flex flex-col items-center p-4 md:p-0 m-4 w-1/2 md:w-1/6 h-32 bg-white shadow rounded">
    <div class="flex flex-col items-center m-auto">
      <img data-src="${unit.thumbnail}" width="50" height="50"/>
      <p class="text-sm text-center mt-2"><a href="units/${unit.name.split(' ').join('_')}" class="hover:underline hover:text-blue-700"><strong>${unit.name}</strong></a></p>
    </div>
  </li>
  `);
}