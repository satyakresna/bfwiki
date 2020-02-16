export default function renderSPRecommendation(spRecommendation) {
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
        $li.setAttribute('class', 'flex text-sm justify-between items-center my-4 py-4 border-b');
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