export default function unitsTemplate(unit) {
  const path = unit.name.split(' ').join('_');
  return `
      <img data-src="${unit.thumbnail}" width="50" height="50"/>
      <p class="text-sm mt-2"><a href="units/${path}" class="hover:underline hover:text-blue-700"><strong>${unit.name}</strong></a></p>`
}