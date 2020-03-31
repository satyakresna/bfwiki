import closeMenu from "../behaviours/closeMenu.js";

export function notfound() {
  closeMenu();
  document.querySelector('main').textContent = 'Not found';
}