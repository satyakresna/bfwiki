export default function (omniunit) {
  return document.createRange().createContextualFragment(`
  <li class="omniunit-card">
    <div class="omniunit-card-container">
      <img data-src="${omniunit.thumbnail}" width="50" height="50" alt="${omniunit.name}'s thumbnail" />
      <p class="omniunit-card-name font-semibold tracking-wide"><a href="omniunits/${omniunit.name.split(' ').join('_')}">${omniunit.name}</a></p>
    </div>
  </li>
  `);
}