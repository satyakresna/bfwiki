export default function searchUnits(ctx) {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const $searchUnitName = document.getElementById('searchUnitName');
    if ($searchUnitName.value !== '') {
      const searchUnitName = encodeURI($searchUnitName.value);
      page.show(`${window.location.pathname}?search=${searchUnitName}`, ctx.state);
    } else {
      page.show(`${window.location.pathname}`, ctx.state);
    }
  });
}