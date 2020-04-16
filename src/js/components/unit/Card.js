export default function (unit) {
  return document.createRange().createContextualFragment(`
  <li class="flex flex-col items-center p-4 m-4 w-1/2 md:w-1/6 bg-white shadow border border-gray-400 rounded">
      <img data-src="${unit.thumbnail}" width="50" height="50"/>
      <p class="text-sm mt-2"><a href="units/${unit.name.split(' ').join('_')}" class="hover:underline hover:text-blue-700"><strong>${unit.name}</strong></a></p>
  </li>
  `);
}