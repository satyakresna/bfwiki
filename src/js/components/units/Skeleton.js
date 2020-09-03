export default function () {
    const fragement = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    $ul.setAttribute('id', 'unit-list');
    for (let index = 0; index < 100; index++) {
        fragement.appendChild(document.createRange().createContextualFragment(`
        <li class="unit-card"></li>
        `));
    }
    $ul.appendChild(fragement);
    return $ul;
}