export default function () {
    const fragement = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    $ul.setAttribute('id', 'omniunit-list');
    for (let index = 0; index < 100; index++) {
        fragement.appendChild(document.createRange().createContextualFragment(`
        <li class="omniunit-card"></li>
        `));
    }
    $ul.appendChild(fragement);
    return $ul;
}