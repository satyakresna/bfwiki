export default function (spRecommendation) {
  const $section = document.createElement('section');
  $section.setAttribute('class', 'w-full')
  for (const sp of spRecommendation) {
    const fragment = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    for (const item of sp.list) {
      const $li = document.createElement('li');
      $li.setAttribute('class', 'flex text-sm justify-between items-center my-4 py-4 border-b');
      $li.innerHTML = `<span class="w-9/12 inline-block">${item.option}</span> <button class="border rounded-full border-yellow-600 bg-blue-600 text-white w-10 h-10">${item.cost}</button>`;
      fragment.appendChild($li);
    }
    $ul.appendChild(fragment);
    $section.innerHTML += `
      <div class="my-16">
        <div class="flex justify-between my-4 py-4">
        <h2 class="text-xl"><strong>${sp.title}</strong></h2>
        <button class="border rounded-full border-yellow-600 bg-blue-600 text-white w-10 h-10 text-center"><strong>${sp.total}</strong></button>
        </div>
        ${$ul.outerHTML}
        <h3 class="mt-4 text-lg leading-loose"><strong>Analysis</strong></h3>
        <p class="mt-4 text-sm leading-loose">${sp.analysis}</p>
      </div>
    `;
  }
  return $section.outerHTML;
}