export default function (dbb) {
    return document.createRange().createContextualFragment(`
    <li class="dbb-card">
        <div class="dbb-card-container">
            <p class="dbb-elemental-synergy">${dbb.elementalSynergyName}</p>
            <div class="flex m-4">
                <a href="/units/${dbb.firstUnitName.split(' ').join('_')}"><img class="mx-4" data-src="${dbb.firstUnitThumbnail}" width="50" height="50" alt="${dbb.firstUnitName}'s thumbnail" /></a>
                <a href="/units/${dbb.secondUnitName.split(' ').join('_')}"><img class="mx-4" data-src="${dbb.secondUnitThumbnail}" width="50" height="50" alt="${dbb.secondUnitName}'s thumbnail" /></a>
            </div>
            <p class="dbb-card-name">${dbb.dbbName}</p>
        </div>
        <div class="dbb-card-desc-wrapper">
            <p class="dbb-card-desc">${dbb.dbbDesc}</p>
        </div>
    </li>
    `);
}