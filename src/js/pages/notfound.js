import closeMenu from "../behaviours/closeMenu.js";

export default function () {
  closeMenu();
  document.querySelector('main').textContent = 'Not found';
}