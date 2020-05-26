export default function (unit) {
  const THUMBNAILS_URL = 'https://raw.githubusercontent.com/satyakresna/bravefrontier/master/src/omniunits/thumbnails';
  return document.createRange().createContextualFragment(`
  <li class="flex flex-col items-center p-4 md:p-0 m-4 w-1/2 md:w-1/6 h-32 bg-white shadow rounded">
    <div class="flex flex-col items-center m-auto">
      <picture>
        <source type="image/webp" srcset="${THUMBNAILS_URL}/${unit.id}.webp">
        <source type="image/png" srcset="${THUMBNAILS_URL}/${unit.id}.png">
        <img data-src="${THUMBNAILS_URL}/${unit.id}.png" width="50" height="50" alt="${unit.name}'s thumbnail" />
      </picture>
      <p class="text-sm text-center mt-2"><a href="units/${unit.name.split(' ').join('_')}" class="hover:underline hover:text-blue-700"><strong>${unit.name}</strong></a></p>
    </div>
  </li>
  `);
}