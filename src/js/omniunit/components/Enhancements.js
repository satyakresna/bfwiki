export default function (enhancements) {
  const $ul = document.createElement('ul');
  const fragment = document.createDocumentFragment();
  for (const enhancement of enhancements) {
    fragment.appendChild(document.createRange().createContextualFragment(
      `<li class="my-4 py-2 border-b">
        <div class="flex justify-between items-center">
          <span class="w-9/12 inline-block leading-loose">${enhancement.option}</span> <button class="border rounded-full border-yellow-600 bg-blue-600 text-white w-10 h-10">${enhancement.cost}</button>
        </div>
        ${ enhancement.detail_option !== "" ? `<span class="text-sm italic">${enhancement.detail_option}</span>` : ''}
      </li>`
    ));
  }
  $ul.appendChild(fragment);
  return $ul.outerHTML;
}