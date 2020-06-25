export default function () {
    const fragement = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    $ul.setAttribute('id', 'unit-list');
    for (let index = 0; index < 100; index++) {
        fragement.appendChild(document.createRange().createContextualFragment(`
        <li class="unit-card">
            <div class="unit-card-container">
                <div class="unit-image loading"></div>
                <p class="unit-card-name loading"><a href=""><strong></strong></a></p>
            </div>
        </li>
        `));
    }
    $ul.appendChild(fragement);
    return $ul;
}